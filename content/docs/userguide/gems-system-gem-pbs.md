# Physically Based Shaders \(PBS\) Gem<a name="gems-system-gem-pbs"></a>

The Physically Based Shader \(PBS\) Reference Gem is a simple collection of 32 example materials that you can apply to a **[Mesh](component-static-mesh.md#component-static-mesh-properties)** component\. They demonstrate a wide range of surface material types that make use of the [Illum Shader](shader-ref-illum.md)\. These materials range from matte to shiny and metallic or reflective\. For more information about rendering physically based materials, see [Shader Rendering System](mat-shaders-intro.md)\.

The PBS Reference Gem is enabled by default in new projects and is also enabled in the default **Samples Project**\. You use the **Material Editor** to preview, modify, and apply a material to a mesh\.

The following procedure describes a very simple example work flow for applying a PBS Reference Gem material to an object\. This procedure assumes your project is **Samples Project** \(the default project for Lumberyard\)\.

**To apply materials contained in PBS Reference Gem**

1. Open a level in Lumberyard\.

1. [Create a new entity](creating-entity.md)\.

1. [Add](component-working-adding.md) a [Mesh](component-static-mesh.md#component-static-mesh-properties) component to your entity\.

1. In the [**Entity Inspector**](component-entity-inspector.md), in the **Mesh** component, next to the **Mesh Asset** property, click '**…**' to specify an asset\. 

   In the **Pick Static Mesh** dialog, browse to `\SamplesProject\Objects\Primitives`\. Pick one of the `.cgf` files in that directory\. Click **OK**\.  
![\[The file cylinder_001.cgf is selected in the Pick Static Mesh dialog\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-pbs-1.png)

   The object that you picked now appears in your **Viewport**\.  
![\[The cylinder appears in the Viewport\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-pbs-2.png)

1. Make sure your object is still selected\.

   Open the Material Editor by pressing **M** or by navigating to **Tools**, **Material Editor**\.

1. In the **Material Editor**'s navigation pane, browse to `\Gems\PBSreferenceMaterials\Assets\materials\pbs_reference`\.

   Select one of the `.mtl` files listed\.  
![\[The file car_paint.mtl is selected in the Material Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-pbs-3.png)

1. In the **Material Editor**'s toolbar, click the **Assign Item to Selected Object** icon\.  
![\[Click the Assign Item to Selected Objects icon in the toolbar\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-pbs-4.png)

   Close or move the **Material Editor** to see your **Viewport**\.

   The assigned material is now applied to your object\.  
![\[The assigned material is applied to the cylinder in the Viewport\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-pbs-5.png)