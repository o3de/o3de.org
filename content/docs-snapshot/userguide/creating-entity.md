# Creating an Entity<a name="creating-entity"></a>

[Entities](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#entity) are objects with which the player interacts\.

**To create an entity**  
 Do one of the following:
+ In the Lumberyard Editor viewport, right\-click and choose **Create entity**\. This creates an entity at the cursor location with a basic **[Transform](component-transform.md)** component, which gives the entity a 3D location in the level\.
+ In the [**Entity Outliner**](component-entity-outliner.md), right\-click and choose **Create entity**\. This creates an entity in the center of your viewport\.
+ Use the [**Asset Browser**](asset-browser-intro.md) to create entities that already have the preferred configuration, depending on the particular asset\. 

  For example, if you drag a `.cgf` mesh asset from the **Asset Browser** into the viewport, Lumberyard creates an entity, adds a **[Mesh](component-static-mesh.md)** component, and assigns the asset to the **Mesh** component\. The same is possible for particles, slices, and Lua scripts\.

**To assign entities to a parent entity**

1. In the viewport or the **Entity Outliner**, right\-click and then choose **Create entity**\. This creates a an empty entity, which will be the parent entity\.

1. Do one of the following:
   + In the **Entity Outliner**, select and drag the child entities on top of the new parent entity\.
   + Select one or more entities that are to be the child entities\. In the **Entity Inspector**, for the **Transform** component, beside the **Parent Entity** property, click the picker icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/picker.png) and then select the parent entity in the viewport\.
   + Select one or more entities that are to be the child entities\. From the **Entity Outliner**, drag the parent entity into the **Entity Inspector** and drop it beneath the **Transform** component into the **Parent Entity** property\.