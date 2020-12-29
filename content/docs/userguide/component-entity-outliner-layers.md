# Working with Layers<a name="component-entity-outliner-layers"></a>

Use the Lumberyard layer system to organize level data into discrete files\. The layer system segments level content so that members of a development team can work on different aspects of a level asynchronously\.

Layers are standard Lumberyard entities with a special editor\-only layer component\. In your game, this component appears as an empty entity in your hierarchy\. When you export your game, the behavior you designed is unchanged and all entities in your level are added to the exported data\.

**Topics**
+ [Creating a Layer](#creating-layers)
+ [Modifying a Layer](#modifying-layers)
+ [Adding Entities to a Layer](#adding-entities-to-layers)
+ [Saving a Layer](#saving-layers)
+ [Recovering a Layer](#recovering-layers)
+ [Layer\-Specific Components](#layer-specific-components)

## Creating a Layer<a name="creating-layers"></a>

When you create a layer, you can add entities to that layer\. This helps you organize the content in your game\. For example, you might create a layer for all character entities and another layer for vegetation\.

**To create a layer**

1. In Lumberyard Editor, choose **Tools**, **Entity Outliner**\.

1. In the **Entity Outliner**, right\-click and choose **Create layer**\.  
![\[Right-click in the Entity Outliner and choose Create layer.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/creating-layers.png)

1. With the layer selected in the **Entity Outliner**, you can modify its properties in the **Entity Inspector**\.  
![\[Select a layer in the Entity Outliner and then modify its properties in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/modifying-layers-inspector.png)  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-entity-outliner-layers.html)

## Modifying a Layer<a name="modifying-layers"></a>

After you create a layer, you can modify it by adding entities, reorganizing its hierarchy, adding nested layers, renaming the layer, and so on\.

**To show a layer's context menu**

1. In the **Entity Outliner**, right\-click the layer\.

1. You can do the following in the context menu\. 

   Actions highlighted in yellow affect the selected layer\. The other options are standard context menu actions that don't affect the selected layer\.  
![\[Right-click a layer to expose its context menu.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/modifying-layers.png)

   The following options in the context menu perform actions on the selected layer\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-entity-outliner-layers.html)

### Layer Hierarchies<a name="layer-hierarchy"></a>

You can nest layers within other layers\. This is useful if you want to organize the enitites in your level\. This behavior is similar to creating hierarchies for parent and child entities\.

![\[A layer nested within another layer.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/layer-hierarchies.png)

**Note**  
You can't make a layer a child of a non\-layer entity and you can't save a layer in a slice\.

You can nest layers to break up your level into smaller, more workable sections\. If you are creating a large level, for example, you might have a single vegetation layer\. If you have just one vegetation layer, then only one environment artist could edit this layer at a time\. To allow multiple artists to work on the vegetation layer at once, you can nest other layers within the vegetation layer and assign each nested layer to different artists\. This helps build a well\-organized hierarchy to keep the game's structure efficient\.

## Adding Entities to a Layer<a name="adding-entities-to-layers"></a>

Layers can contain freestanding \(non\-slice\) entities and slices\.

**To add an entity to a layer**
+ In the **Entity Outliner**, do one of the following:

  1. Select and drag an entity to a layer or within the layer hierarchy\.

  1. Right\-click an entity, pause on **Assign to layer**, and then select a layer\.

## Saving a Layer<a name="saving-layers"></a>

The component entity system saves references to layers and their hierarchies in the level data\. When you add or remove a layer from your level, you must save your level before making more changes\. If you don't save your level, layers and their contents will not load correctly the next time you open the level\.

Lumberyard layers are saved as `.layer` files in the `level_name/layers` directory\. The layer's filename is saved as `layer_name.layer`\. If a layer is nested within another layer, then the parent layer name is prepended to the layer filename\. 

When a layer contains unsaved changes, an asterisk \(\*\) appears next to the layer name\. After you save the level or the layer, the asterisk is removed\.

![\[Asterisk (*) next to a layer with unsaved information.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-saving-layers.png)

Layer names at the same hierarchy level must be unique\. Layers at the same hierarchy level with duplicate names display a warning \(**\!**\) and can't be saved until you rename them\.

![\[Layer at the same hierarchy level must have unique names.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/saving-layers-duplicate.png)

**To save your level and all layers**
+ In Lumberyard Editor, choose **File**, **Save** or press **Ctrl\+S**\.

**To save specific layers only**

1. Select the layer you want to save, or press **CTRL** and then select multiple layers\.

1. In the **Entity Outliner**, right\-click the selection and choose **Save**\.

## Recovering a Layer<a name="recovering-layers"></a>

If you delete a layer from a level in Lumberyard Editor, you can reimport it\.

**To reimport a deleted layer**

1. Using a file browser, copy onto your desktop the layer file for the layer that you want to recover, such as `level_name\layer\layer_name.layer`\.

1. In Lumberyard Editor, create a new layer in your level and enter the same name as the deleted layer\.

1. Save the level and close Lumberyard Editor\.

1. Copy the layer file from your desktop into Lumberyard's layer directory, such as `level_name/layers`\.

1. Rename the copied layer file to match and replace the layer that you created in Lumberyard Editor\.

1. Reopen the level\. The newly created layer now references the recovered layer information\.

## Layer\-Specific Components<a name="layer-specific-components"></a>

A layer is simply an entity with special rules\. As such, you can add layer\-specific components to layers\. By default, Lumberyard doesn't contain any layer\-specific components, but you can create your own, such as special layer components for streaming or tags\.

Any given component can appear in only one context menu\. By default, Lumberyard has the **Game**, **System**, and **Layer** contexts for components\. 

You can test creating a layer\-specific component by editing the **Comment** component\.

**To modify the Comment component**

1. In a text editor, open the `EditorCommentComponent.cpp` file\.

1. Change the `AZ_CRC` attribute to **Layer** and delete the CRC value\.

1. Save the file\. 

1. In Lumberyard Editor, add the **Comment** component to a layer\.