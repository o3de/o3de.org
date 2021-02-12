---
description: ' Use the Sky Cloud component to create realistic and detailed cloud
  effects in your Amazon Lumberyard game levels. '
title: Sky Cloud
---
# Sky Cloud {#component-sky-cloud}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

The **Sky Cloud** component creates realistic and detailed cloud effects in your game levels\. To use the **Sky Cloud** component, you must enable the [**Sky Clouds**](/docs/userguide/gems/builtin/cloud.md) gem in your project\. For more information, see [Add modular features and assets with Gems](/docs/userguide/gems/builtin/s.md)\.

For information about cloud shading settings, placing distance clouds, and adding cloud shadows, see [Adding Clouds](/docs/userguide/weather/clouds-intro.md)\.

**Note**
The **Sky Cloud** component replaces [legacy clouds](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/cloud-effects.html)\.

**Example Sky Cloud Component**

![\[Example Sky Cloud component in Lumberyard.\]](/images/shared/gems-system-gem-clouds.png)

Lumberyard features two variations of cloud rendering:

**Common clouds**
This sprite\-based rendering path uses simple shading to optimize performance\. Close up, these clouds appear in 3D but once the clouds are a certain configurable distance from the viewer, an [imposter](/docs/userguide/ly-glos-chap#imposter) is substituted\.

**Volumetric clouds**
This implementation uses advanced shading to create realistic [voxelized](/docs/userguide/ly-glos-chap#voxel) 3D clouds but is slower to render\.

With the **Sky Cloud** component, you can do the following:
+ Randomly generate common and volumetric clouds in controlled areas\.
+ Control where clouds generate by using entities with **[Box Shape](/docs/userguide/components/shapes.md)** components\.
+ Define the area in which clouds can move with a loop box\.
+ Programmatically manage **Sky Cloud** component properties with the **Script Canvas** editor, Lua scripting, and the **Track Editor**\.
+ Create and use slices that include cloud components\.

The following procedure demonstrates how to create a common or volumetric cloud with the **Sky Cloud** component\. After you create a cloud, you can customize its appearance and movement using the procedures in this chapter\.

**Topics**
+ [Creating a Cloud with the Sky Cloud Component](#creating-a-cloud-with-the-sky-cloud-component)
+ [Sky Cloud Component Properties](#component-sky-cloud-properties)
+ [Creating a Loop Box](#component-sky-cloud-loop-box)
+ [Setting Fade Distance](#component-sky-cloud-fade-distance)
+ [Changing the Cloud Display](#component-sky-cloud-display)
+ [Setting Up Cloud Generation Areas](#component-sky-cloud-generation-area)

## Creating a Cloud with the Sky Cloud Component {#creating-a-cloud-with-the-sky-cloud-component}

**To create a cloud**

1. [Create an entity\.](/docs/userguide/creating-entity.md)

1. In the **Entity Outliner**, select the new entity and in the **Entity Inspector**, click **Add Component** and then click the **Sky Cloud** component\.
![\[Under Environment, select the Sky Cloud component.\]](/images/userguide/component/component-sky-cloud-1.png)

1. Click **Add Required Component** to add the **[Box Shape](/docs/userguide/components/shapes.md)** component\. {#adding-loop-box}
![\[Click Add Required Component to add the Box Shape component\]](/images/userguide/component/component-sky-cloud-2.png)

1. In the **Entity Inspector**, at the bottom of the **Sky Cloud** component properties, click **Generate**\. This generates a common cloud that uses sprite\-based shading in the viewport\.
![\[At the bottom of the Sky Cloud component box, click Generate to create a cloud in the viewport.\]](/images/userguide/component/component-sky-cloud-3.png)

1. To turn the common cloud into a volumetric cloud, select the [**Volumetric Rendering**](#component-sky-cloud-properties-volumetric) property\.
![\[Under Volumetric Rendering, select Enabled to create a volumetric cloud.\]](/images/userguide/component/component-sky-cloud-4.png)

## Sky Cloud Component Properties {#component-sky-cloud-properties}

![\[Sky Cloud component properties in Lumberyard Editor.\]](/images/userguide/component/component-sky-cloud-properties-1.png)

The **Sky Cloud** component properties are grouped into the following categories\. See the individual sections for detailed descriptions for the available parameters\.

**Cloud material**
Sets the material for [common cloud rendering](/docs/userguide/shaders/common-cloud.md)\. The default material is `baseclouds.mtl`\. To select a different material, click \(**…**\) and choose a material based on the common cloud shader\.

**[Volumetric Rendering](#component-sky-cloud-properties-volumetric)**
Enables [volumetric cloud rendering](/docs/userguide/shaders/volumeobject.md) and specifies the cloud's material and density\.

**[Movement](#component-sky-cloud-properties-movement)**
Defines how the clouds move over time\.

**[Display](#component-sky-cloud-properties-display)**
Controls which visual aids are displayed when viewing the cloud in Lumberyard Editor\.

**[Generation](#component-sky-cloud-properties-generation)**
Defines parameters for cloud generation when you click **Generate**\.

### Volumetric Rendering Parameters {#component-sky-cloud-properties-volumetric}

When you enable **Volumetric Rendering**, you create a realistic\-looking volumetric cloud that is [voxelized](/docs/userguide/ly-glos-chap#voxel) and uses the [Volume Object shader](/docs/userguide/shaders/volumeobject.md)\.

When **Volumetric Rendering** is not enabled, you create a sprite\-based common cloud, which uses the [Common Cloud shader](/docs/userguide/shaders/common-cloud.md)\.


| Name | Description |
| --- | --- |
| Enabled | If selected, this cloud is drawn with volumetric rendering\. If not selected, the common cloud shader is used\. |
| Volume material | [Volume Object](/docs/userguide/shaders/volumeobject.md) based material used for rendering volumetric clouds\. Volumetric rendering must be enabled for this parameter\. Th default material is volumeClouds\.mtl\. |
| Density | Defines the volumetric cloud's density\. Volumetric rendering must be enabled for this parameter\. |

### Movement Parameters {#component-sky-cloud-properties-movement}

The **Movement** parameters define how the cloud moves within its [loop box](#component-sky-cloud-loop-box)\.


| Name | Description |
| --- | --- |
| AutoMove | If selected, the cloud moves on its own\. |
| Velocity | Velocity in meters per second and cloud movement in the X, Y, and Z axes\. |
| FadeDistance | Distance in meters from the loop box edge\. Defines where the cloud begins to fade out before wrapping around to the other side\. |

### Display Parameters {#component-sky-cloud-properties-display}

Enable **Display** parameters to help visualize the cloud while editing\.


| Name | Description |
| --- | --- |
| Display Spheres | Displays a sphere for each particle\. Enable this parameter to visualize the overall volume of the cloud\. |
| Display Volumes | Displays the box for each volume that is part of the cloud\. Enable this parameter to see the general shape of the cloud\. For more information, see [Setting Up Cloud Generation Areas](#component-sky-cloud-generation-area)\. |
| Display Bounds | Displays the bounds of the entire cloud including all particles\. Enable this parameter to help you place clouds\. |

### Generation Parameters {#component-sky-cloud-properties-generation}

The **Generation** parameters define variables to create clouds through procedural generation\.


| Name | Description |
| --- | --- |
| Rows | Number of rows in cloud texture\. If the default cloud material or volume material is specified, keep the value at 4\. |
| Seed | Seed for random number generator\. A particular seed generates the same set of clouds regardless of where it's used\. |
| Columns | Number of columns in cloud texture\. If the default cloud material or volume material is specified, keep the value at 4\. |
| Sprites | Number of sprites to be generated\. |
| Render Row | Row in the cloud texture that is designated for rendering\. |
| Scale | Base scale of the sprites in the cloud\. |
| Size Variation | Random variance in size of the sprites within the cloud\. |
| Min Distance | Minimum distance between the generated sprites within the cloud\. |
| Fill By Volume | Fills boxes on the child entities based on volume\. |
| Fill By Loopbox | Fills the loop box volume \(as opposed to the box volumes on the child entities\)\. |
| Generate | Creates a cloud based on the current generation variables\. |

## Creating a Loop Box {#component-sky-cloud-loop-box}

When you add a **Sky Cloud** component to an entity, you also add a **Box Shape** component to function as a loop box\. The loop box specifies the bounds in which the cloud can move\. When the cloud reaches one side of the loop box, the cloud automatically repositions to the other end so that its movement loops\.

**To set up the loop box**

1. In the **Entity Outliner**, select the entity with the **Sky Cloud** component\.

1. In the **Entity Inspector**, modify the **[Box Shape](#adding-loop-box)** component\. Set the **Dimensions** values to your preferred loop box size\.

   For example, **X** = **500\.00** m, **Y** = **500\.00** m, **Z** = **200\.00** m\.
![\[Modify the Box Shape component's Dimension property to specify the size of the cloud's loop box\]](/images/userguide/component/component-sky-cloud-loop-box-1.png)

1. To see the cloud's movement within the loop box, select **AutoMove** in the **Sky Cloud** component properties\.
![\[In the Sky Cloud component's properties, under Movement, select AutoMove to enable cloud movement.\]](/images/userguide/component/component-sky-cloud-loop-box-2.png)

## Setting Fade Distance {#component-sky-cloud-fade-distance}

The **Fade Distance** determines where the cloud begins to fade out as it reaches the edge of the loop box\. This prevents the cloud from popping in and out at the edges of the box\.

With smaller values, the cloud fades out close to the edge of the loop box\. With larger values, the cloud begins to fade closer to the middle of the loop box\.

**Example**
The following images show two clouds\.
Cloud \(1\) is near the edge of the loop box but appears solid because of a small fade value\. Cloud \(2\) is equally near the edge but appears faded because of a larger fade value\.

![\[Example Setting Fade Distance parameter for the Sky Cloud component to make clouds fade as they closer to the loop box.\]](/images/userguide/component/component-sky-cloud-fade-distance-1.png)

**To set the fade distance**

1.  In the **Entity Outliner**, select the entity with the **Sky Cloud** component\.

1. In the **Entity Inspector**, in the **Sky Cloud** component properties, adjust the **FadeDistance** slider or enter a value in the **FadeDistance** box\.
**Note**
This value, measured in meters, should not exceed half of the length of the loop box in the direction that the cloud is moving\.

## Changing the Cloud Display {#component-sky-cloud-display}

The **Sky Cloud** component's **Display** parameters change how the cloud is displayed in the viewport\. You can use these parameters to visualize aspects of the cloud\.

![\[The Sky Cloud component's available Display parameters include Display Spheres, Display Volumes, and Display Bounds.\]](/images/userguide/component/component-sky-cloud-display-1.png)

When **Display Spheres** is selected, the viewport displays a sphere for each cloud particle\.

**To display the cloud as spheres**

1. In the **Entity Outliner**, select the entity with the **Sky Cloud** component\.

1. In the **Entity Inspector**, in the **Sky Cloud** component properties, select **Display Spheres**\.
**Example**
![\[Example Sky Cloud component with the Display Spheres parameter which displays a sphere for each cloud particle.\]](/images/userguide/component/component-sky-cloud-display-2.png)

When **Display Volumes** is selected, the viewport displays the boxes that make up each part of the cloud volume\. For more information, see [Setting Up Cloud Generation Areas](#component-sky-cloud-generation-area)\.

**To display the cloud as volumes**

1. In the **Entity Outliner**, select the entity with the **Sky Cloud** component\.

1. In the **Entity Inspector**, in the **Sky Cloud** component properties, select **Display Volumes**\.
**Example**
![\[Example Sky Cloud component with the Display Volumes which displays the box for each volume that is part of the cloud.\]](/images/userguide/component/component-sky-cloud-display-3.png)

When **Display Bounds** is selected, the viewport displays a box that includes all areas of the cloud\.

**To display the cloud's bounds**

1. In the **Entity Outliner**, select the entity with the **Sky Cloud** component\.

1. In the **Entity Inspector**, in the **Sky Cloud** component properties, select **Display Bounds**\.
**Example**
![\[Example Sky Cloud component with the Display Bounds which displays a box that contains all areas of the cloud.\]](/images/userguide/component/component-sky-cloud-display-4.png)

## Setting Up Cloud Generation Areas {#component-sky-cloud-generation-area}

You can set up cloud generation areas to customize the shape of your cloud\. To define these areas, add **Box Shape** components to child entities under the main parent entity\.

![\[Create child entities and add Box Shape components to define the size and shape of the cloud.\]](/images/userguide/component/component-sky-cloud-generation-area-1.png)

**To define cloud generation areas**

1. [Create an entity](/docs/userguide/creating-entity.md) with a descriptive name, such as **CloudGenerator**\.

   This will be the parent entity for your cloud generation areas\.

1. Add the **Sky Cloud** and **Box Shape** components to the entity\.

1. In the **Entity Inspector**, for the **Sky Cloud** component, clear the **Fill by Loopbox** check box\.

   Clearing this option makes the clouds render inside the child entities rather than in the current entity's box shape\.
![\[Clear the Fill By Loopbox option.\]](/images/userguide/component/component-sky-cloud-generation-area-clearloopbox.png)

1. Create another entity with a descriptive name, such as **CloudVolume1**, and then add the **Box Shape** component\.

1. Modify the dimensions and position of the **Box Shape** component to accommodate a cloud that you want to create\.

1. Repeat the previous two steps, adding new entities until you achieve the configuration that you want for your clouds\.
![\[Position the box shapes to form the cloud's shape and volume\]](/images/userguide/component/component-sky-cloud-generation-area-configure.png)

1. To parent all of the entities to the **CloudGenerator** entity, select all of the entities and drag it to the parent entity\.
![\[Parent the CloudVolume entities by selecting and dragging them to the CloudGenerator entity.\]](/images/userguide/component/component-sky-cloud-generation-area-parent.png)

1. Select the parent entity and in the **Entity Inspector**, for the **Sky Cloud** component, click **Generate**\.
![\[Click Generate to create the clouds.\]](/images/userguide/component/component-sky-cloud-generation-area-generate.png)