---
linkTitle: Create Terrain from Images
title: Create Terrain from Images
description: Learn to create terrain in Open 3D Engine (O3DE) using two methods - by directly creating the entities and by using Landscape Canvas to create the entities.
weight: 300
toc: true
---

Terrain in **Open 3D Engine (O3DE)** is generated from *gradients*. Gradients, in the context of this tutorial, represent changes in elevation and weight masks for materials. Gradients can be generated procedurally or processed from an image. In this tutorial, you'll create terrain elevation and apply detail materials using image gradients, and add support for PhysX simulations with a heightfield collider and physics materials.

This tutorial requires that you have the **Terrain**, **Gradient Signal**, **Landscape Canvas**, and **PhysX** Gems enabled in your project.

## Create a new level

1. In **O3DE Editor**, create a new level. (Refer to the [Create a new level](/docs/learning-guide/tutorials/reference/environments/create-a-level) tutorial for more details)

2. Delete the Grid, Ground, and Shader Ball entities underneath the **Atom Default Environment** so that the terrain you will build is fully visible.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/delete-default-entities.png" alt="Delete several default entities." >}}

3. On the Global Sky entity, delete the [**HDRi Skybox**](/docs/user-guide/components/reference/atom/hdri-skybox/) component. The default skybox has terrain in the skybox image which will clash with the terrain that you will create below. Instead, we will use the **Sky Atmosphere** component, which provides an empty sky to work with.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/delete-hdri-skybox.png" alt="Delete the HDRi Skybox component." >}}

4. In **Entity Outliner**, select the Sun entity.

5. In **Entity Inspector**, choose **Add Component** and add the **Sky Atmosphere** component. By adding it to the Sun entity, the sky lighting will automatically align with the sun's orientation in the sky.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/add-sky-atmosphere.png" alt="Add the Sky Atmosphere component." >}}

At this point, the level should appear empty except for a blue sky.

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-empty-level.png" alt="Illustration of the new empty level with the sky component configured." >}}

## Terrain image assets

To complete this tutorial, you can use the following example images or you can use your own. To use these images, right-click on each image, choose `Save Image As...`, and save the image into the folder that contains your tutorial level.

| Heightmap | Macro Color | Surface Weight Mask |
| - | - | - |
| {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/tutorial_terrain_heightmap_gsi.png" width="256" alt="An example heightmap image." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/tutorial_terrain_basecolor.png" width="256" alt="An example macro color image." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/tutorial_grass_splatmap_gsi.png" width="256" alt="An example surface weight mask image." >}} |

A heightmap is an image in which dark values represent low elevation areas and light values represent high elevation areas. Heightmaps can be used for terrain by assigning them to Image Gradients. To use a heightmap with an Image Gradient, it must be processed as a *gradient signal image (GSI)* by [Asset Processor](/docs/user-guide/assets/asset-processor/) to prevent the texture processing from applying color corrections or lossy compression. To ensure the heightmap is processed correctly, keep the following recommendations in mind:

* 16-bit color depths are recommended. 8-bit images may not provide enough gradient steps to represent elevation, and 32-bit images might be unnecessarily large. 16-bit images can provide up to 65,536 elevation steps.

* Use `.png` or `.tif` formats for 16-bit heightmap images.

* Use `.tif` format for 32-bit heightmap images.

* Postfix the heightmap file name with `_gsi` so that the heightmap is automatically processed by Asset Processor as a GSI (`LevelOneTerrainHeight_gsi.png`, for example). If you don't use the `_gsi` postfix, you can use [Texture Settings](/docs/user-guide/assets/texture-settings/) to configure the heightmap source asset to be processed as a GSI.

{{< tip >}}
The default **Height Query Resolution** for terrain in O3DE is 1.0 meters. This means a 1000 x 1000 heightmap represents one square kilometer of terrain. The **Height Query Resolution** can be changed in the [**Terrain World**](/docs/user-guide/components/reference/terrain/world) level component.
{{< /tip >}}

A macro color texture is an image that provides low-fidelity color variation to the terrain. Any texture format can be used, though the name should have a postfix of `_basecolor` to ensure that it is processed as a color texture.

A surface weight mask is an image in which dark values are low surface weights and light values are high surface weights. Surface weight mask images are also used with Image Gradients, so they should also be postfixed with `_gsi`. Precision isn't as noticeable in surface weight masks, so 8-bit images are nearly always sufficient.

## Terrain materials

There are two types of materials that are needed for terrain, the [*macro material*](/docs/user-guide/components/reference/terrain/terrain-macro-material) and [*detail materials*](/docs/user-guide/components/reference/terrain/terrain-detail-material).

The macro material is a basic material that applies to the entire terrain. It supports a simple color texture and a normal texture. These textures provide low fidelity color and normal information across the entire terrain that is blended with detail materials. The macro material is the only material displayed at distances from the camera that are farther than the **Detail material render distance**.

Detail materials are standard materials that you can create with the [Material Editor](/docs/atom-guide/look-dev/materials/material-editor/). They are assigned to the terrain through surface tag names with weight values that are generated by gradients. This allows you to assign many materials across a large terrain surface and blend between them. Detail materials are displayed on the terrain within the **Detail material render distance** from the camera.

This blending of detail materials with the macro material enables you to use small, high fidelity, tiled detail materials by creating variations in color and lighting across the terrain. In the following example, the grass on the left is a detail material that is not blended with the macro material. The grass on the right is the same detail material, but it has been blended over a low fidelity macro material. Notice the variations in color and lighting that create a less uniform and much more natural appearance:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/macro-material-blending.png" width="800" alt="An example of the difference in variation created by macro material blending." >}}

{{< tip >}}
In the **Terrain World Renderer** level component, there is a property group named **Detail material configuration** that you can use to configure how far from the camera to stop blending detail materials into the macro material, and the distance over which to fade out the blended detail materials.
{{< /tip >}}

The following example image demonstrates various material assignments and how they interact on a terrain surface:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-materials-example.png" width="800" alt="An example of macro and detail materials applied to a terrain." >}}

In this example, there are four materials:

* Magenta - This is the macro material. It's displayed on terrain that is 512 meters from the camera. The blend distance between this macro material and the detail materials is 64 meters.

* Green - This is the default detail material. Detail materials are layered, and the default material is the base layer. The default material is displayed on areas that aren't assigned a detail material through a surface tag name, but are close to the camera.

* Red - This is a detail material. It's applied to the terrain through a surface tag name. The surface tag name is generated by a tiled image gradient that contains a white triangle on a black background.

* Blue - This is a detail material. It's applied to the terrain through a surface tag name. The surface tag name is generated by a tiled image gradient that contains a white circle on a black background.

{{< note >}}
Notice that the red and blue detail materials blend to purple in areas where the triangles and circles overlap. The is because the image gradients are generating surface tags for both materials in these overlap areas.
{{< /note >}}

### Create terrain detail materials

To create terrain detail materials for use with this tutorial, we will follow the steps in [Creating a StandardPBR Material](/docs/learning-guide/tutorials/rendering/create-standardpbr-material) with a few modifications. You may wish to familiarize yourself with that tutorial first as the steps here will be abbreviated.

1. Download texture files. We will use two ready-made materials from [Poly Haven](https://polyhaven.com/): [Forest Ground 01](https://polyhaven.com/a/forrest_ground_01)
and [Rock Boulder Dry](https://polyhaven.com/a/rock_boulder_dry). You can download them at any resolution; the example images in this tutorial use the 4k resolution. Download the AO, Diffuse, Displacement, Normal, and Rough textures into your tutorial level folder and rename them as follows:

    * forrest_ground_01_**ao**\_4k &rarr; forrest_ground_01\_**ao**
    * forrest_ground_01_**diff**\_4k &rarr; forrest_ground_01\_**basecolor**
    * forrest_ground_01_**disp**\_4k &rarr; forrest_ground_01\_**displ**
    * forrest_ground_01_**nor**\_gl_4k &rarr; forrest_ground_01\_**normal**
    * forrest_ground_01_**rough**\_4k &rarr; forrest_ground_01\_**roughness**
    * rock_boulder_dry_**ao**\_4k &rarr; rock_boulder_dry\_**ao**
    * rock_boulder_dry_**diff**\_4k &rarr; rock_boulder_dry\_**basecolor**
    * rock_boulder_dry_**disp**\_4k &rarr; rock_boulder_dry\_**displ**
    * rock_boulder_dry_**nor**\_gl_4k &rarr; rock_boulder_dry\_**normal**
    * rock_boulder_dry_**rough**\_4k &rarr; rock_boulder_dry\_**roughness**

2. Create a Terrain Detail Material with the Material Editor. Open the Material Editor, select File -> New Material Document..., and create a `Terrain Detail Material`. Note that we aren't choosing `Standard PBR` here because we would like the additional terrain texture controls that are available on a `Terrain Detail Material`. Name the material `forrest_ground_01.material` and save it in your tutorial level folder.

3. Select the `forrest_ground_01_basecolor` texture under Base Color, `forrest_ground_01_roughness` texture under Roughness, `forrest_ground_01_normal` under Normal, `forrest_ground_01_ao` under Occlusion, and `forrest_ground_01_displ` under Displacement.

4. The normal maps from Poly Haven need their normals flipped by default, so enable Flip Y Channel under Normal.

5. Under Base Color, set the blend mode to `Lerp` and the Factor to `0.5`. For terrain detail materials, we will typically use a blend mode of `Linear Light` to blend between a high-frequency detail material and a low-frequency macro material. Refer to [Terrain Detail Material](/docs/user-guide/components/reference/terrain/terrain-detail-material) and the [Understanding Frequency Separation](/docs/learning-guide/tutorials/environments/understanding-frequency-separation) tutorial for more details. Less often, we might choose to use a blend mode of `Lerp` with a Factor of `0.0` to blend from just the macro material at far distance to just the detail material at close distances. This is used in workflows where the detail materials contain full-color information and the macro material is just a low-resolution composite of the detail materials, not a separate texture used for color variation. However, for this tutorial we would like to demonstrate blending between the macro material and the detail materials for color variation without walking through the additional texture processing steps. We can achieve a lesser-quality version of the blending by setting the Texture Blend Mode under Base Color to `Lerp` and a Factor of 0.5. This will perform a 50% alpha blend between the macro material and the detail material which lets them both be visible, but will produce a softer lower-quality result than the full frequency separation workflow. The chart below shows the effects of the different Lerp factors to help visualize how the blending changes the outputs.

    | Base Macro Color | Detail Lerp 1.0 | Detail Lerp 0.5 | Detail Lerp 0.0 |
    | - | - | - | - |
    | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-macro-only.png" alt="Comparison image showing only the macro material." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-macro-lerp-1.png" alt="Comparison image showing the macro material plus a detail material with Lerp 1.0." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-macro-lerp-0.5.png" alt="Comparison image showing the macro material plus a detail material with Lerp 0.5." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-macro-lerp-0.png" alt="Comparison image showing the macro material plus a detail material with Lerp 0.0." >}} |

6. Scale the textures larger. This is purely an aesthetic choice, it helps the details in the textures become more visible. Set Tile U and Tile V under UVs to 0.25 to make the textures 4x larger.

7. Set the terrain height blending parameters. Under Terrain, enable Override parallax settings, set Height offset to 0.25, Height scale to 0.5, Blend factor to 0.5, and Weight clamp factor to 0.2. These values should be tuned based on the aesthetics, they control how the detail material blends with other detail materials when height-based blending is enabled.

8. Follow all of the steps above for rock_boulder_dry, except set Tile U and Tile V to 0.125, Height offset to 0.0, Height scale to 1.0, Blend factor to 0.2, and Weight clamp factor to 0.2.

## Enable the terrain system

To enable the terrain system, you must add two level components to the Level entity. After adding these components, the terrain system will be enabled, but no terrain will be visible yet.

1. In **Entity Outliner**, select the Level entity.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/enable-terrain-select.png" alt="Select the Level entity." >}}

2. In **Entity Inspector**, choose **Add Component** and add both the [**Terrain World**](/docs/user-guide/components/reference/terrain/world) and [**Terrain World Renderer**](/docs/user-guide/components/reference/terrain/world-renderer) level components to the Level entity.

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/enable-terrain-components.png" width="600" alt="Add terrain level components." >}}

There are many properties available in the terrain level components that configure the terrain system settings for the level. For now, leave the settings at the default values, but later in the tutorial, you will make some adjustments to these properties.

## Terrain setup

Generating terrain requires multiple entities that reference each other. You can set up the entities and references manually, or you can use [Landscape Canvas](/docs/user-guide/gems/reference/environment/landscape-canvas) to place and connect nodes in a visual graph that generates terrain. The advantage of using Landscape Canvas is that it provides an artist-friendly node graph interface for creating and configuring terrain entities in the level, as well as providing a visual representation of the relationships between those entities and components.

It's helpful to understand how the various gradient and terrain components work together, so it's recommended that you work through both versions of the tutorial in the tabs below.

{{< tabs name="terrain-setup-tutorials" >}}

{{% tab name="Terrain setup with entities" %}}

In this section, you'll create a terrain spawner entity and a gradient entity. The terrain spawner entity defines the terrain and references a gradient that provides elevation data. The gradient entity provides the gradient (a heightmap image in this example) that contains the elevation data.

### Create a terrain spawner entity

1. Create a new entity (hotkey **Ctrl + Alt + N**). Name the entity `Terrain Spawner`.

2. With the entity selected, set each dimension of the [**Transform**](/docs/user-guide/components/reference/transform) component's Translate values to `0.0 m` so that the entity exists at the origin of the world.

3. Add a [**Terrain Layer Spawner**](/docs/user-guide/components/reference/terrain/layer_spawner) component. This component enables the entity to generate terrain.

4. The **Terrain Layer Spawner** component displays a warning about missing a required component. Choose **Add Required Component** and select [**Axis Aligned Box Shape**](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) from the list. This box shape defines the extents of the generated terrain.

5. To generate terrain that is the same resolution as the heightmap, in the **Axis Aligned Box Shape** component, set the value of the **Dimensions:** **X** and **Y** properties to the resolution (in pixels) of the heightmap. The **Dimensions: Z** property can be used to scale the elevation. Enter a value for the **Dimensions: Z** property that roughly represents the maximum desired elevation in meters. Our tutorial heightmap image is 256 x 256 pixels and represents a 50 meter change in elevation, so set the dimensions to `(256.0, 256.0, 50.0)`. If you wish to use a different heightmap, set the dimensions as appropriate for that heightmap's resolution.

    {{< tip >}}
For the best results, the **X** and **Y** dimensions of the **Axis Aligned Box Shape** should be set to the heightmap pixel size multiplied by the **Height Query Resolution**. This ensures that there is exactly one heightmap pixel for each world unit used by the terrain system. When the **Height Query Resolution** is set to 1 meter (the default), the box size in meters should be exactly the same as the heightmap pixel resolution. If the box dimensions are too small, some heightmap pixels won't get used, which can cause unexpected smooth areas or areas of excessively sharp elevation changes.
    {{< /tip >}}

6. The **Axis Aligned Box Shape** is centered around the entity's position, so with the entity at `(0.0, 0.0, 0.0)` the box extends from `-25.0` to `25.0` on the Z axis. However, by default the minimum terrain elevation is set to `0.0`. The bottom of the box shape needs to be at least at the minimum terrain elevation value on the world Z axis because any terrain below the minimum elevation will be clipped. In the Terrain Spawner entity, in the **Transform** component, set the **Translate: Z** property to a value that is half of the value you used for the **Dimensions: Z** property in the previous step. For example, if you entered `50.0` in the previous step, use `25.0` for the **Translate: Z** property to move the entity up so that the bottom of the box is at `0.0` on the world Z axis and the top of the box extends to `50.0`.

    {{< tip >}}
Once you have set the dimensions of the box shape, you can hide it by disabling the **Filled** property in the **Axis Aligned Box Shape** component.
    {{< /tip >}}

7. In Entity Inspector, add a [**Terrain Height Gradient List**](/docs/user-guide/components/reference/terrain/height_gradient_list) component to the Terrain Spawner entity. This component will reference the gradient entity in a later step. 

The following image is the complete Terrain Spawner entity:

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-spawner-entity.png" width="450" alt="The completed Terrain Spawner entity." >}}

### Create a terrain height gradient entity

1. With the Terrain Spawner entity selected, create a new child entity (hotkey **Ctrl + Alt + N**). Name the new entity `Terrain Height`.

2. Add an [**Image Gradient**](/docs/user-guide/components/reference/gradients/image-gradient) component to the Terrain Height entity. You'll use the **Image Gradient** component to add and configure the heightmap for the terrain.

3. The **Image Gradient** component displays a warning about missing a required component. Choose **Add Required Component** and select [**Gradient Transform Modifier**](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier) from the list. The **Gradient Transform Modifier** component can be used to transform the gradient in world space.

4. The **Gradient Transform Modifier** component displays a warning about missing a required component. Choose **Add Required Component** and select **Shape Reference** from the list. In a later step, you'll add a reference to the **Axis Aligned Box Shape** component in the Terrain Spawner entity to ensure the terrain bounds and the gradient bounds are identical.

5. Add the heightmap to the Terrain Height entity. In the **Image Gradient** component, to the right of the **Image Asset** property, click the {{< icon "file-folder.svg" >}} **File** button and select the `tutorial_terrain_heightmap_gsi` heightmap asset that you saved in your tutorial level folder, or optionally any other heightmap image you would like to use.

    {{< tip >}}
Change the **Sampling Type** property in the **Image Gradient** component from `Point` to `Bilinear` or `Bicubic` to make the elevation changes smoother in case the heightmap resolution and the dimensions of the **Axis Aligned Box Shape** component should ever differ.
    {{< /tip >}}

6. The **Shape Reference** component needs to reference the **Axis Aligned Box Shape** component in the Terrain Spawner entity. In the **Shape Reference** component, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Spawner entity in Entity Outliner to create the reference. The following image shows the final Terrain Height entity:

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-gradient-entity.png" width="450" alt="The completed Terrain Gradient entity." >}}

7. Select the Terrain Spawner entity. In the **Terrain Height Gradient List** component, click the {{< icon "add.svg" >}} **Add** button to add a new gradient slot. Click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Height entity in Entity Outliner to create a reference.

8. Select the Terrain Height entity. In the **Gradient Transform Modifier** component, set the **Wrapping Type** property to `Clamp To Edge`. Leaving this property set to `Unbounded` might create artifacts at the edges of the terrain.

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

6. In Node Inspector, in the **Axis Aligned Box Shape** component, set the value of the **Dimensions:** **X** and **Y** properties to the resolution (in pixels) of the heightmap. Enter a value for the **Dimensions: Z** property that represents the maximum desired elevation change in meters. Our tutorial heightmap image is 256 x 256 pixels and represents a 50 meter change in elevation, so set the dimensions to `(256.0, 256.0, 50.0)`. If you wish to use a different heightmap, set the dimensions as appropriate for that heightmap's resolution.

7. In Node Inspector, in the **Transform** component, set the **Translate: Z** property to a value that is half of the value you used for the **Dimensions: Z** property in the previous step. For example, if you entered `50.0` in the previous step, use `25.0` for the **Translate: Z** property to move the entity up so that the bottom of the box is at 0 on the world Z axis. The following image shows the completed Terrain Layer Spawner node:

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/landscape-canvas-terrain-layer-spawner.png" width="650" alt="The configured terrain layer spawner node in Landscape Canvas." >}}

8. In Landscape Canvas, in the Node Palette, expand the **Gradients** node list, and drag an **Image** node into the graph. Notice that in O3DE Editor, a new child entity named Entity3 is created with the necessary components for an image gradient. Also notice that the components are displayed in Node Inspector in Landscape Canvas.

9. In the **Image** node, in the **Image Gradient** component, to the right of the **Image Asset** property, click the {{< icon "file-folder.svg" >}} **File** button and select the `tutorial_terrain_heightmap_gsi` heightmap asset that you saved in your tutorial level folder, or optionally any other heightmap image you would like to use.

10. Click the **Bounds** pin of the **Axis Aligned Box Shape** node, and drag to the **Inbound Shape** of the **Shape Reference** node to connect the nodes and point the **Image Gradient** to use the same box as the terrain.

11. Click the **Outbound Gradient** pin of the **Image** node, and drag to the **Inbound Gradient** of the **Terrain Layer Spawner** node to connect the nodes and generate the terrain. The final graph and the **Image** node configuration are shown in the following image:

    {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/landscape-canvas-terrain-spawner-image-gradient.png" width="938" alt="The configured image gradient node and terrain network in Landscape Canvas." >}}

12. **Save** the level (hotkey **Ctrl + S**).

{{% /tab %}}

{{< /tabs >}}

With the entities complete, the Terrain Spawner generates untextured terrain with varying heights similar to the following example:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/level-with-untextured-terrain.png" width="810" alt="Illustration of the level with an untextured terrain added to it." >}}

You might, however, have issues where the valleys and peaks in your terrain appear flat due to clipping. The following image shows a terrain that has been placed so that the bottom of its box shape falls below the **Min Height** specified in the **Terrain World** level component:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-clipping-example.png" width="550" alt="An example terrain demonstrating clipping due to entity placement." >}}

The following properties are closely related and might require special attention if you have issues with your terrain such as clipping:

* The **Min Height** and **Max Height** properties of the **Terrain World** level component define the vertical range in the level for terrain generation. This range should be large enough to encompass the vertical extents of the box shape of the Terrain Spawner entity. If the box shape extends below the **Min Height** value or above the **Max Height** value, the terrain valleys or peaks are clipped.

* The **Dimensions** property of the **Axis Aligned Box Shape** component specifies the terrain area. The **Dimensions: Z** property, in particular, specifies the height of the terrain. Its value should not exceed the range defined in the **Terrain World** level component by the **Min Height** and **Max Height** properties.

* The **Translate** property of the **Transform** component of the Terrain Spawner entity places the terrain entity in the level. The translate position of the Terrain Spawner entity is at the center of the box shape that defines the terrain area. This means that if the box shape is a 512 unit cube, and the **Translate** property is `0.0` on each axis, then the terrain extends 256 units in each direction from the origin of the level. Be careful to ensure that the **Translate: Z** value places the box shape within the range defined by the **Min Height** and **Max Height** properties of the **Terrain World** level component.

### Adjust the terrain mesh rendering settings

If you are using the tutorial assets, the default terrain mesh rendering settings should be sufficient. However, if you chose to use a different heightmap and terrain spawner box size than what's listed in the tutorial, and if the box size is larger than the default terrain rendering distance of 4096 meters or the default camera view distance of 1024 meters, you will need to adjust the rendering distances to make the entire terrain visible.

1. In the **Terrain World Renderer** level component, set the **Mesh render distance** to a value that is greater than the terrain spawner box size so that the entire terrain will be visible.

2. If the box size is larger than 256 x 256, do the following:

    i. Set the **First LOD distance** property to `256`. This sets the terrain's highest level of detail (LOD) display to a distance of 256 meters from the camera.

    ii. Set the **CLOD Distance** property to `32`. This sets the blend distance between LODs to 32 meters. Larger values make the LOD transitions smoother, but the value should be less than 1/4 of the **First LOD distance** value to ensure that there is enough distance to blend each LOD.

3. In the Camera entity, in the **Camera** component, set the **Far clip distance** property to a value that is greater than the box size.

4. In the Camera entity, in the **Camera** component, choose **Be this camera** to view the level through the camera entity.

5. In the **Edit** menu, **Editor Settings**, **Global Preferences...**, in the Camera preferences set the **Camera Movement Speed** to an appropriate value for the size of the terrain. `100.0` is a good reference point for large terrains.

These suggestions are meant to help you view the entire terrain while you build it in O3DE Editor. In Launcher applications, these settings should be tuned for an appropriate balance of performance and quality.

## Apply terrain materials

### Apply a macro material

1. With the Terrain Spawner entity selected, add a **Terrain Macro Material** component.

2. In the **Terrain Macro Material** component, select the `tutorial_terrain_basecolor` macro color texture that you saved in your tutorial level folder, or optionally any other color texture of your choosing. This tutorial doesn't use a macro normal texture, but if your terrain authoring software supports generating one, you can select it here as well.

{{< important >}}
If you use a macro normal texture, the terrain area size must exactly match the size of the terrain in the terrain authoring software or else the normals won't point in the correct directions.
{{< /important >}}

At this point, the terrain should be colored, but up close it lacks any surface details:

| | |
| - | - |
| {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/level-with-macro-color.png" width="550" alt="An example of a macro material applied to a terrain." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/level-with-macro-color-up-close.png" width="550" alt="An zoomed-in example of a macro material applied to a terrain." >}} |

### Apply detail materials

To apply the materials to the terrain as detail materials, do the following:

#### Add a default surface material

We start by adding a default surface material so that we can verify that the surface materials are working and providing the look that we expect.

1. With the Terrain Spawner selected, add a **Terrain Surface Materials List** component.

2. To the right of the **Default Material** property, click the {{< icon "file-folder.svg" >}} **File** button and select the `rock_boulder_dry` material asset. The entire terrain should get redrawn with the rock material you created.

3. Now set the **Default Material** property to the `forrest_ground_01` material asset. This should change the entire terrain surface to grass.

At this point, the terrain should have height variation, color variation, and a grass texture:

{{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-default-surface.png" alt="Terrain covered with a single default surface material." >}}

#### Create a surface tag name list

[_Surface tag names_](/docs/user-guide/gems/reference/environment/surface-data) are strings that you can use to refer to parts of the terrain that are associated with specific gradients. These tags will be used to describe which parts of the terrain are grass surfaces and which parts are rock surfaces.

1. From the **Tools** menu, select **Asset Editor**.

2. In Asset Editor, choose **File → New → Surface Tag Name List**.

3. In the surface tag name list click the {{< icon "add.svg" >}} **Add** button to a add a tag name.

4. Supply a string for the tag name.

5. Repeat steps 3 and 4 for each detail material you want to apply to the surface. For this tutorial, create `tutorial_grass` and `tutorial_rock` as surface tag names.

6. Save the surface tag name list to your tutorial level directory with the name `tutorial_tags.surfaceTagNameList` (hotkey **Ctrl + S**).

#### Create gradient entity for the grass surface weights

This process is the same as creating a gradient entity for a heightmap. Each gradient entity should have three components:

* An **Image Gradient** component that references a gradient image.

    {{< tip >}}
Other gradient types can be used, but image gradients offer the most control and are used in many scenarios when creating terrain.
    {{< /tip >}}

* A **Gradient Transform Modifier** component that places the gradient in the level.

* A shape component. Most often, this is a **Shape Reference** component that references the **Axis Aligned Box Shape** component in the Terrain Spawner entity.

1. Create a child entity of the Terrain Spawner entity named `Terrain Grass` and add an **Image Gradient**, a **Gradient Transform Modifier**, and a **Shape Reference** component.

2. On the Shape Reference component, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Spawner entity in Entity Outliner to create a reference.

3. On the Image Gradient, set the Image Asset to the `tutorial_grass_splatmap_gsi` image that you downloaded into your tutorial level folder.

#### Create gradient entity for the rock surface weights

In levels that have many different types, you will typically use separate images for each surface weight. However, for this tutorial, we only have two surface types, so we will make our rock gradient the inverse of the grass gradient.

1. Create a child entity of the Terrain Spawner entity named `Terrain Rock` and add an [**Invert Gradient Modifier**](/docs/user-guide/components/reference/gradient-modifiers/invert-gradient-modifier) component and a **Shape Reference** component to it.

2. On the Shape Reference component, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Spawner entity in Entity Outliner to create a reference.

3. On the Invert Gradient Modifier component, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Grass entity in Entity Outliner to create a reference.

#### Add a Terrain Surface Gradient List

These steps associate the gradient entities with the surface tag names you created.

1. With the Terrain Spawner selected, add a **Terrain Surface Gradient List** component.

2. In the **Terrain Surface Gradient List** component, click the {{< icon "add.svg" >}} **Add** button to add a new gradient slot.

3. To the right of the **Gradient Entity** property, click the {{< icon "picker.svg" >}} **Picker** button, then click the Terrain Grass entity in Entity Outliner to reference it.

4. For the **Surface Tag** property, select the `tutorial_grass` surface tag name from the list. Note that the list contains the surface tag names you created in Asset Editor.

5. Repeat steps 2 though 4 to add the Terrain Rock entity and associate it with the `tutorial_rock` surface tag.

#### Add surface weights to the Terrain Surface Materials List

This assigns the detail materials to the terrain based on the surface tag names and associated gradient entities.

1. Select the Terrain Spawner entity in the Entity Outliner.

2. In the **Terrain Surface Materials List** component, clear the entry for the default material. Our surface maps will cover the entire terrain, so the default material will no longer be necessary.

3. To the right of the **Material Mappings** property group, click the {{< icon "add.svg" >}} **Add** button to add a new material slot.

4. In the **Surface Tag** property, select `tutorial_grass`.

5. To the right of the **Material asset** property, click the {{< icon "file-folder.svg" >}} **File** button and select the `forest_ground_01` material asset to associate with the surface tag.

6. Repeat steps 3 through 5 to add `tutorial_rock` and associate it with the `rock_boulder_dry` material asset.

As you add detail materials and surface tag name pairs to the **Terrain Surface Materials List** component, the materials appear on the terrain surface.

### Tune material rendering settings

Now that the terrain is fully textured, the settings on the **Terrain World Renderer** component can be tuned to provide better results.

1. Select the Level entity in the Entity Outliner.

2. In the Terrain World Renderer component, enable Height based texture blending. This changes the terrain renderer from using pure alpha blending on detail materials to using the displacement maps on the materials to blend based on material heights. Height-based blending provides crisper details and more realistic transitions between the detail materials.

| Alpha blending | Height-based blending |
| - | - |
| {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/detail-alpha-blending.png" alt="Detail materials blended with alpha blending." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/detail-height-based-blending.png" alt="Detail materials blended with height-based blending." >}} |

If performance becomes an issue, the detail material render and fade distances can be tuned to reduce the draw distance for the detail materials.

## Add terrain physics

You can add collision to terrain for PhysX simulation and apply [physics materials](/docs/user-guide/interactivity/physics/nvidia-physx/materials/) that define the physical properties of the terrain such as dynamic and static friction. To add physics to a terrain, do the following:

1. Add a **PhysX Heightfield Collider** component to the **Terrain Spawner** entity.

2. The **PhysX Heightfield Collider** component displays a warning about missing a required component. Choose **Add Required Component** and select **Terrain Physics Heightfield Collider** from the list.

3. The **PhysX Heightfield Collider** component adds a collider to the terrain so that dynamic PhysX objects collide with it. You can enable the **Use Baked Heightfield** property for better performance if the heightfield doesn't change at runtime, such as when the terrain is generated from an image gradient (heightmap).

4. The **Terrain Physics Heightfield Collider** component works just like the **Terrain Surface Materials List** component. Add a default physics material for the terrain to define its physical properties. You can also add specific physics materials that match the detail materials you applied in the previous section. For example, if you have detail materials for mud, grass, and rock, you can apply physics materials that are appropriate for those different detail materials.

## Scale the terrain

At this point, the terrain is 256 m x 256 m in size. However, the scale can be adjusted if desired.

1. Select the Terrain Spawner entity.

2. Set the Dimensions of the **Axis Aligned Box Shape** to `512.0, 512.0, 100.0`.

3. Set the Z Dimension of the Transform to `50.0`.

4. If either the heights or the surface materials look blocky, make sure that the Sampling Type on the Image Gradients is set to either `Bilinear` or `Bicubic`.

## Results

The final level should look like this:

| | |
| - | - |
| {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-final-level.png" alt="Illustration of the final tutorial level results." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-final-level-2.png" alt="Illustration of the final tutorial level results." >}} |
