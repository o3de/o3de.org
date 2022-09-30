---
linkTitle: Create Terrain from Images
title: Create Terrain from Images
description: Learn to create terrain in Open 3D Engine (O3DE) using two methods - by directly creating the entities and by using Landscape Canvas to create the entities.
weight: 300
toc: true
---

Terrain in Open 3D Engine (O3DE) is generated from *gradients*. Gradients, in the context of this tutorial, represent changes in elevation and weight masks for materials. Gradients can be generated procedurally or processed from an image. In this tutorial, you'll create terrain elevation and apply detail materials using image gradients, and add support for PhysX simulations with a heightfield collider and physics materials.

This tutorial requires that you have the **Terrain**, **Landscape Canvas**, and **PhysX** Gems enabled in your project.

## Required image asset

To complete this tutorial, you need a *heightmap* that's similar to the following example:

{{< image-width src="/images/learning-guide/tutorials/environments/heightmap-example.png" width="480" alt="An example heightmap image." >}}

In a heightmap, dark values are low elevation areas and light values are high elevation areas. To use a heightmap for terrain in O3DE, it must be processed as a *gradient signal image (GSI)* by [Asset Processor](/docs/user-guide/assets/asset-processor/). To ensure the heightmap is processed correctly, keep the following recommendations in mind:

* 16-bit color depths are recommended. 8-bit images may not provide enough gradient steps to represent elevation, and 32-bit images might be unnecessarily large. 16-bit images can provide up to 65,536 elevation steps.

* Use `.png` or `.tif` formats for 16-bit heightmap images.

* Use `.tif` format for 32-bit heightmap images.

* Postfix the heightmap file name with `_gsi` so that the heightmap is automatically processed by Asset Processor as a GSI (`LevelOneTerrainHeight_gsi.png`, for example). If you don't use the `_gsi` postfix, you can use [Texture Settings](/docs/user-guide/assets/texture-settings/) to configure the heightmap source asset to be processed as a GSI.

{{< tip >}}
The default **Heigh Query Resolution** for terrain in O3DE is 1.0 meters. This means a 1000 x 1000 heightmap represents one square kilometer of terrain. The **Height Query Resolution** can be changed in the [**Terrain World**](/docs/user-guide/components/reference/terrain/world) level component.
{{< /tip >}}


## Enable the terrain system

First, you must enable the terrain system by adding two level components to the level prefab.

1. In **O3DE Editor**, create a new level or open an existing level.

    {{< tip >}}
If your level contains the **Atom Default Environment**, delete or hide the Grid, Ground, and Shader Ball entities so that the terrain you build is not visually obstructed.
    {{< /tip >}}

2. In **Entity Outliner**, select the Level.prefab.

    {{< image-width src="/images/learning-guide/tutorials/environments/enable-terrain-select.png" alt="Select the level.prefab." >}}

3. In **Entity Inspector**, choose **Add Component** and add both the **Terrain World** and **Terrain World Renderer** level components to the level.prefab.

    {{< image-width src="/images/learning-guide/tutorials/environments/enable-terrain-components.png" width="600" alt="Add terrain level components." >}}

There are many properties available in the terrain level components that configure the terrain settings for the level. Later in the tutorial, you might need to make some adjustments to these properties.

{{< important >}}
For this tutorial, you'll set the world size of the heightmap image so that one pixel is equal to one meter. The rendering distances might need to be adjusted to make the entire terrain visible if the heightmap image is larger than the default terrain rendering distance of 4096 meters or the default camera view distance of 1024 meters.

1. In the **Terrain World Renderer** level component, set the **Mesh render distance** to a value that is greater than the resolution of the heightmap, so that the entire terrain will be visible.

2. If the heightmap is larger than 256 x 256, do the following:

    i. Set the **First LOD distance** property to `256`. This sets the terrain's highest level of detail (LOD) display to a distance of 256 meters from the camera.

    ii. Set the **CLOD Distance** property to `32`. This sets the blend distance between LODs to 32 meters. Larger values make the LOD transitions smoother, but the value should be less than 1/4 the **First LOD distance** value to ensure that there is enough distance to blend each LOD.

3. In the Camera entity, in the **Camera** component, set the **Far clip distance** property to a value that is greater than the resolution of the heightmap.

4. In the Camera entity, in the **Camera** component, choose **Be this camera** to view the level through the camera entity.

5. In the viewport camera settings in the upper-right of the viewport {{< icon "camera.svg" >}} set the **Camera Speed** to an appropriate value for the size of the terrain. `100.0` is a good reference point for large terrains.

These suggestions are meant to help you view the entire terrain while you build it in O3DE Editor. In Launcher applications, these settings should be tuned for an appropriate balance of performance and quality.
{{< /important >}}

## Terrain setup

Generating terrain requires multiple entities that reference each other. You can set up the entities and references manually, or you can use [Landscape Canvas](/docs/user-guide/gems/reference/environment/landscape-canvas) to place and connect nodes in a visual graph that generates terrain. The advantage of using Landscape Canvas is that it provides an artist-friendly node graph interface for creating and configuring terrain entities in the level, as well as providing a visual representation of the relationships between those entities and components.

It's helpful to understand how the various gradient and terrain components work together, so it's recommended that you work through both versions of the tutorial in the tabs below.

{{< tabs name="terrain-setup-tutorials" >}}

{{% tab name="Terrain setup with entities" %}}

In this section, you'll create a terrain spawner entity and a gradient entity. The terrain spawner entity defines the terrain and references a gradient that provides elevation data. The gradient entity provides the gradient (a heightmap image in this example) that contains the elevation data.

### Create a terrain spawner entity

1. Create a new entity (hotkey **Ctrl + Alt + N**). Name the entity `Terrain Spawner`.

2. With the entity selected, add a **Terrain Layer Spawner** component. This component enables the entity to generate terrain.

3. The **Terrain Layer Spawner** component displays a warning about missing a required component. Choose **Add Required Component** and select **Axis Aligned Box Shape** from the list. This box shape defines the extents of the generated terrain.

4. To generate terrain that is the same resolution as the heightmap, in the **Axis Aligned Box Shape** component, set the value of the **Dimensions:** **X** and **Y** properties to the resolution (in pixels) of the heightmap. The **Dimensions: Z** property can be used to scale the elevation. Enter a value for the **Dimensions: Z** property that roughly represents the maximum desired elevation in meters.

    {{< tip >}}
For the best results, the dimensions of the **Axis Aligned Box Shape** should be set to the heightmap pixel size multiplied by the **Height Query Resolution**. This ensures that there is exactly one heightmap pixel for each world unit used by the terrain system. When the **Height Query Resolution** is set to 1 meter (the default), the box size in meters should be exactly the same as the heightmap pixel resolution. If the box dimensions are too small, some heightmap pixels won't get used, which can cause unexpected smooth areas or areas of excessively sharp elevation changes.
    {{< /tip >}}

5. The default minimum terrain elevation is 0, so the bottom of the box shape needs to be at least at 0 on the world Z axis, otherwise, the lower elevation values will be clipped. In the Terrain Spawner entity, in the **Transform** component, set the **Translate: Z** property to a value that is half of the value you used for the **Dimensions: Z** property in the previous step. For example, if you entered `100.0` in the previous step, use `50.0` for the **Translate: Z** property to move the entity up so that the bottom of the box is at 0 on the world Z axis.

    {{< tip >}}
Once you have set the dimensions of the box shape, you can hide it by disabling the **Filled** property in the **Axis Aligned Box Shape** component.
    {{< /tip >}}

6. In Entity Inspector, add a **Terrain Height Gradient List** component to the Terrain Spawner entity. This component will reference the gradient entity in a later step. The following image is the complete Terrain Spawner entity:

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-spawner-entity.png" width="450" alt="The completed Terrain Spawner entity." >}}

### Create a terrain gradient entity

1. With the Terrain Spawner entity selected, create a new child entity (hotkey **Ctrl + Alt + N**). Name the new entity `Terrain Gradient`.

2. Add an **Image Gradient** component to the Terrain Gradient entity. You'll use the **Image Gradient** component to add and configure the heightmap for the terrain.

3. The **Image Gradient** component displays a warning about missing a required component. Choose **Add Required Component** and select **Gradient Transform Modifier** from the list. The **Gradient Transform Modifier** component can be used to transform the gradient in world space.

4. The **Gradient Transform Modifier** component displays a warning about missing a required component. Choose **Add Required Component** and select **Shape Reference** from the list. In a later step, you'll add a reference to the **Axis Aligned Box Shape** component in the Terrain Spawner entity to ensure the terrain bounds and the gradient bounds are identical.

5. Add a heightmap to the Terrain Gradient entity. In the **Image Gradient** component, to the right of the **Image Asset** property, click the {{< icon "file-folder.svg" >}} **File** button and select your heightmap asset.

    {{< tip >}}
Changing the **Sampling Type** property in the **Image Gradient** component from `Point` to `Bilinear` might make the elevation changes smoother if the heightmap resolution and the dimensions of the **Axis Aligned Box Shape** component differ.
    {{< /tip >}}

6. The **Shape Reference** component needs to reference the **Axis Aligned Box Shape** component in the Terrain Spawner entity. In the **Shape Reference** component, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Spawner entity in Entity Outliner to create the reference. The following image shows the final Terrain Gradient entity:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-gradient-entity.png" width="450" alt="The completed Terrain Gradient entity." >}}

7. Select the Terrain Spawner entity. In the **Terrain Height Gradient List** component, click the {{< icon "add.svg" >}} **Add** button to add a new gradient slot. Click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Gradient entity in Entity Outliner to create a reference.

8. Select the Terrain Gradient entity. In the **Gradient Transform Modifier** component, set the **Wrapping Type** property to either `Clamp To Zero` or `Clamp To Edge`. Leaving this property set to `Unbounded` might create artifacts at the edges of the terrain.

9. **Save** the level (hotkey **Ctrl + S**).

{{< note >}}
Before continuing to the next section, be sure to learn about terrain setup with Landscape Canvas by selecting the tab at the top of this section.
{{< /note >}}

{{% /tab %}}

{{% tab name="Terrain setup with Landscape Canvas" %}}

If you worked through terrain setup with entities in the left tab, you can see how terrain creation might be time consuming and difficult to troubleshoot. Landscape Canvas can greatly simplify the process and provide an easy to understand visual graph for the relationships between the various entities that generate the terrain. Landscape Canvas is particularly useful when you create complex networks of gradients and gradient modifiers to define terrain elevation.

In this section, you'll create terrain based on a heightmap with Landscape Canvas.

1. If there is an existing terrain in your level, delete it.

2. In O3DE Editor, from the **Tools** menu, select **Landscape Canvas**.

3. In Landscape Canvas, from the **File** menu, choose **New Asset** (hotkey **Ctrl + N**). Notice that a new graph named Entity1 appears in the Landscape Canvas view. In O3DE Editor, a corresponding entity is created that contains a **Landscape Canvas** component. As you work in Landscape Canvas, additional entities are created and added as children of Entity1. You can rename the entities created by Landscape Canvas.

4. In Landscape Canvas, in the **Node Palette**, expand the **Terrain** node list, and drag a **Terrain Layer Spawner** node into the graph. Notice that in O3DE Editor, a new child entity named Entity2 is created with the necessary components for a terrain spawner. Also notice that the components are displayed in **Node Inspector** in Landscape Canvas.

5. In Landscape Canvas, on the **Terrain Layer Spawner** node, choose **Add Extenders** and select **Terrain Height Gradient List** from the list. This adds a **Terrain Height Gradient List** component to the terrain spawner entity that you'll use to reference the heightmap later in this tutorial.

6. In Node Inspector, in the **Axis Aligned Box Shape** component, set the value of the **Dimensions:** **X** and **Y** properties to the resolution (in pixels) of the heightmap. Enter a value for the **Dimensions: Z** property that roughly represents the maximum desired elevation in meters.

7. In Node Inspector, in the **Transform** component, set the **Translate: Z** property to a value that is half of the value you used for the **Dimensions: Z** property in the previous step. For example, if you entered `100.0` in the previous step, use `50.0` for the **Translate: Z** property to move the entity up so that the bottom of the box is at 0 on the world Z axis.The following image shows the completed Terrain Layer Spawner node:

    {{< image-width src="/images/learning-guide/tutorials/environments/landscape-canvas-terrain-layer-spawner.png" width="650" alt="The configured terrain layer spawner node in Landscape Canvas." >}}

8. In Landscape Canvas, in the Node Palette, expand the **Gradients** node list, and drag an **Image** node into the graph. Notice that in O3DE Editor, a new child entity named Entity3 is created with the necessary components for an image gradient. Also notice that the components are displayed in Node Inspector in Landscape Canvas.

9. In the **Image** node, in the **Image Gradient** component, to the right of the **Image Asset** property, click the {{< icon "file-folder.svg" >}} **File** button and select your heightmap asset.

10. In the **Image** node, in the **Shape Reference** component, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Layer Spawner node in the graph to create a reference.

11. Click the **Outbound Gradient** pin of the **Image** node, and drag to the **Inbound Gradient** of the **Terrain Layer Spawner** node to connect the nodes and generate the terrain. The final graph and the **Image** node configuration are shown in the following image:

    {{< image-width src="/images/learning-guide/tutorials/environments/landscape-canvas-terrain-spawner-image-gradient.png" width="650" alt="The configured image gradient node and terrain network in Landscape Canvas." >}}

8. **Save** the level (hotkey **Ctrl + S**).

{{% /tab %}}

{{< /tabs >}}

## Terrain tips

With the entities complete, the Terrain Spawner generates terrain similar to the following example:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-generated.png" width="800" alt="An example one square kilometer terrain generated from a 1024 pixel square heightmap." >}}

You might, however, have issues where the valleys and peaks in your terrain appear flat due to clipping. The following image shows a terrain that has been placed so that the bottom of its box shape falls below the **Min Height** specified in the **Terrain World** level component:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-clipping-example.png" width="800" alt="An example one square kilometer terrain demonstrating clipping due to entity placement." >}}

The following properties are closely related and might require special attention if you have issues with your terrain such as clipping:

* The **Min Height** and **Max Height** properties of the **Terrain World** level component define the vertical range in the level for terrain generation. This range should be large enough to encompass the vertical extents of the box shape of the Terrain Spawner entity. If the box shape extends below the **Min Height** value or above the **Max Height** value, the terrain valleys or peaks are clipped.

* The **Dimensions** property of the **Axis Aligned Box Shape** component specifies the terrain area. The **Dimensions: Z** property, in particular, specifies the height of the terrain. Its value should not exceed the range defined in the **Terrain World** level component by the **Min Height** and **Max Height** properties.

* The **Translate** property of the **Transform** component of the Terrain Spawner entity places the terrain entity in the level. The translate position of the Terrain Spawner entity is at the center of the box shape that defines the terrain area. This means that if the box shape is a 512 unit cube, and the **Translate** property is `0.0` on each axis, then the terrain extends 256 units in each direction from the origin of the level. Care should be taken to ensure that the **Translate: Z** value places the box shape within the range defined by the **Min Height** and **Max Height** properties of the **Terrain World** level component.

## Apply terrain materials

There are two types of materials that are needed for terrain, the *macro material* and *detail materials*.

The macro material is a basic material that applies to the entire terrain. It supports a simple color texture and a normal texture. These textures provide low fidelity color and normal information across the entire terrain that is blended with detail materials. The macro material is the only material displayed at distances from the camera farther than the **Detail material render distance**.

Detail materials are standard materials that you can create with [Material Editor](/docs/atom-guide/look-dev/materials/material-editor/). They are assigned to the terrain through surface tag names that are generated by gradients, similar to how this tutorial used an image gradient to create elevation. This allows you to assign many materials across a large terrain surface and blend between them. Detail materials are displayed on the terrain within the **Detail material render distance** from the camera..

This blending of detail materials with the macro material enables you to use small, high fidelity, tiled detail materials by creating variations in color and lighting across the terrain. In the following example, the grass on the left is a detail material that is not blended with the macro material. The grass on the right is the same detail material, but it has been blended over a low fidelity macro material. Notice the variations in color and lighting that create a less uniform and much more natural appearance:

{{< image-width src="/images/learning-guide/tutorials/environments/macro-material-blending.png" width="800" alt="An example of the difference in variation created by macro material blending." >}}

{{< tip >}}
In the **Terrain World Renderer** level component, there is a property group named **Detail material configuration** that you can use to configure how far from the camera to stop blending detail materials into the macro material, and the distance over which to fade out the blended detail materials.
{{< /tip >}}

The following example image demonstrates various material assignments and how they interact on a terrain surface:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-materials-example.png" width="800" alt="An example of macro and detail materials applied to a terrain." >}}

In this example, there are four materials:

* Magenta - This is the macro material. It's displayed on terrain that is 512 meters from the camera. The blend distance between this macro material and the detail materials is 64 meters.

* Green - This is the default detail material. Detail materials are layered, and the default material is the base layer. The default material is displayed on areas that aren't assigned a detail material through a surface tag name, but are close to the camera.

* Red - This is a detail material. It's applied to the terrain through a surface tag name. The surface tag name is generated by a tiled image gradient that contains a white triangle on a black background.

* Blue - This is a detail material. It's applied to the terrain through a surface tag name. The surface tag name is generated by a tiled image gradient that contains a white circle on a black background.

{{< note >}}
Notice that the red and blue detail materials blend to purple in areas where the triangles and circles overlap. The is because the image gradients are generating surface tags for both materials in these overlap areas.
{{< /note >}}

### Apply a macro material

1. With the Terrain Spawner entity selected, add a **Terrain Macro Material** component.

1. In the **Terrain Macro Material** component, supply a color texture and a normal texture.

### Apply detail materials

This section assumes you have created the materials you want to apply to your terrain in Material Editor, and that you have created image gradients that define the detail material areas. To apply the materials to the terrain as detail materials, do the following:

#### Create a surface tag name list

Surface tag names are strings that you can use to refer to parts of the terrain that are associated with specific gradients.

1. From the **Tools** menu, select **Asset Editor**.

2. In Asset Editor, choose **File → New → Surface Tag Name List**.

3. In the surface tag name list click the {{< icon "add.svg" >}} **Add** button to a add a tag name.

4. Supply a string for the tag name.

5. Repeat steps 3 and 4 for each detail material you want to apply to the surface.

6. Save the surface tag name list to your project's assets directory (hotkey **Ctrl + S**).

#### Create gradient entities for each detail material

This process is the same as creating a gradient entity for a heightmap. Each gradient entity should have three components:

* An **Image Gradient** component that references a gradient image.

    {{< tip >}}
Other gradient types can be used, but image gradients offer the most control and are used in many scenarios when creating terrain.
    {{< /tip >}}

* A **Gradient Transform Modifier** component that places the gradient in the level. The default settings are fine for this tutorial.

* A shape component. Most often, this is a **Shape Reference** component that references the **Axis Aligned Box Shape** component in the Terrain Spawner entity.

#### Add a Terrain Surface Gradient List

These steps associate the gradient entities with the surface tag names you created.

1. With the Terrain Spawner selected, add a **Terrain Surface Gradient List** component.

2. In the **Terrain Surface Gradient List** component, click the {{< icon "add.svg" >}} **Add** button to add a new gradient slot.

3. To the right of the **Gradient Entity** property, click the {{< icon "picker.svg" >}} **Picker** button, then click a gradient entity in Entity Outliner to reference it.

4. For the **Surface Tag** property, select the appropriate surface tag name from the list. Note that the list contains the surface tag names you created in Asset Editor.

5. Repeat steps 4 though 6 for each detail material you want to apply to the surface.

#### Add a Terrain Surface Materials List

This final task assigns the detail materials to the terrain based on the surface tag names and associated gradient entities.

1. With the Terrain Spawner selected, add a **Terrain Surface Materials List** component.

2. To the right of the **Default Material** property, click the {{< icon "file-folder.svg" >}} **File** button and select your default material asset.

3. To the right of the **Material Mappings** property group, click the {{< icon "add.svg" >}} **Add** button to add a new material slot.

4. In the **Surface Tag** property, select one of the surface name tags you created.

5. To the right of the **Material asset** property, click the {{< icon "file-folder.svg" >}} **File** button and select the material asset to associate with the surface tag.

6. Repeat steps 10 through 12 for each remaining detail material you want to apply to the terrain.

As you add detail materials and surface tag name pairs to the **Terrain Surface Materials List** component, the materials appear on the terrain surface.

## Add terrain physics

You can add collision to terrain for PhysX simulation and apply [physics materials](/docs/user-guide/interactivity/physics/nvidia-physx/materials/) that define the physical properties of the terrain such as dynamic and static friction. To add physics to a terrain, do the following:

1. Add a **PhysX Heightfield Collider** component to the **Terrain Spawner** entity.

2. The **PhysX Heightfield Collider** component displays a warning about missing a required component. Choose **Add Required Component** and select **Terrain Physics Heightfiled Collider** from the list.

3. The **PhysX Heightfield Collider** component adds a collider to the terrain so that dynamic PhysX objects collide with it. You can enable the **Use Baked Heightfield** property for better performance if the heightfield doesn't change at runtime, such as when the terrain in generated from an image gradient (heightmap).

4. The **Terrain Physics Heightfiled Collider** component works just like the **Terrain Surface Materials List** component. Add a default physics material for the terrain to define its physical properties. You can also add specific physics materials that match the detail materials you applied in the previous section. For example, if you have detail materials for mud, grass, and rock, you can apply physics materials that are appropriate for those different detail materials.
