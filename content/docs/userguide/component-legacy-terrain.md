# Legacy Terrain level component<a name="component-legacy-terrain"></a>

The **Legacy Terrain** level component enables the legacy terrain system\. This component works as a switch\. When the **Legacy Terrain** level component is added to a level, terrain is displayed and can be edited\. When the **Legacy Terrain** level component is removed from the level, terrain is not displayed and cannot be edited\. Adding or removing the Legacy Terrain level component is a non\-destructive operation\. Existing terrain heightmap and texture data remains intact when the **Legacy Terrain** level component is removed from the level\. 

**Note**  
The **Legacy Terrain** component is a *level component* and is added to the level through the **Level Inspector**\. 

![\[The Legacy Terrain level component for Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/legacyterrain/ui-legacy-terrain-component-1.24.png)

**To enable the Legacy Terrain system in a level**

1. In the Lumberyard Editor, open the **Level Inspector** by choosing its tab, or by choosing **Level Inspector** from **Tools** in the main menu bar\. 

1. In the **Level Inspector**, choose **Add Component**\. In the components list, choose **Legacy Terrain**\.

The terrain is displayed in the **Perspective** view\. 

**Note**  
The **Legacy Terrain** level component has no properties because it is a switch that enables the legacy terrain system\. 

## Resize legacy terrain<a name="resize-legacy-terrain"></a>

Terrain size is defined by a *heightmap*, which is a gray scale texture that contains elevation information, and a *meters per texel* property\. The meters per texel property sets the relationship between texels in the heightmap and the terrain size in world space\. A **1024** x **1024** heightmap with **1** meter per texel creates a terrain that's 1\.024 square kilometers in size\. Each texel in the heightmap defines one square meter of the terrain\. 

![\[Resize Terrain options in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/legacyterrain/ui-resize-terrain-1.24.png)

**To resize terrain**

1. In the Lumberyard Editor main menu bar, open the **Terrain Editor** by choosing **Terrain Editor** from **Tools** in the main menu bar\.\. 

1. In the main menu bar for the **Terrain Editor**, choose **Resize Terrain** from the **Modify** menu\.\. 

1. Choose from the lists to set the **Heightmap Resolution** and **Meters Per Texel** properties for the legacy terrain\. 

## Generate a legacy terrain texture<a name="generate-legacy-terrain-texture"></a>

Terrain textures for the legacy terrain system are generated within Lumberyard Editor\. 

![\[Generate Terrain Texture options in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/legacyterrain/ui-generate-terrain-texture-1.24.png)

**To generate a legacy terrain texture**

1. In the Lumberyard Editor, main menu bar, choose the **Game** menu\.

1. In the **Game** menu, choose the **Terrain** group, and then **Generate Terrain Texture**\.

1. Select one of the **Texture Dimensions** options in the **Generate Terrain Texture** window and choose **OK**\. 

## Use PhysX or legacy physics with legacy terrain<a name="legacy-terrain-and-physics"></a>

If your project uses legacy physics components, interactions between the terrain and physics entities will work without additional steps\. 

If your project uses the PhysX system, you must add a **PhysX Terrain** level component to enable PhysX entities to interact with the terrain\. The **PhysX Terrain** level component is added in the **Level Inspector** with the **Legacy Terrain** level component\. 

![\[Add a PhysX Terrain component in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/legacyterrain/ui-legacy-terrain-and-physx-1.24.png)

**To enable PhysX with the Legacy Terrain system in a level**

1. In the Lumberyard Editor, open the **Level Inspector** by choosing its tab, or by choosing **Level Inspector** from **Tools** in the main menu bar\. 

1. Choose **Add Component** in the **Level Inspector** and select **PhysX Terrain** from the components list\. 

**Important**  
For historical reasons, the **PhysX Terrain** component can be added to the level via the **Entity Inspector** but this is **not** recommended\. This functionality has been maintained for compatibility\. The **PhysX Terrain** component should not be instantiated more than once in a level\. In the future and for new projects, use the **Level Inspector** to add the **PhysX Terrain** level component to the level\. 