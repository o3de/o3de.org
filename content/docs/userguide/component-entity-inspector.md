# Entity Inspector<a name="component-entity-inspector"></a>

The **Entity Inspector** manages all the components for each entity\. Select an entity in the **Entity Outliner** or the viewport to see the attached components in the **Entity Inspector**\. 

**To open the Entity Inspector**

1. In Lumberyard Editor, choose **Tools**, **Entity Inspector**\. 

1. Select an entity in the viewport or the **Entity Outliner**\.

1. In the **Entity Inspector**, you can see the following:
   + **Name** – Name of the entity\. You can enter a different name for the entity\.
   + **Entity Icon** – Customizable icon to help you recognize entities in the viewport\.
   + **Status** – Active status of the entity\. When the level starts, the entity can be active, inactive, or active but only in editor mode\.
   + **Entity ID** – If this entity ID is called out in messages, errors, or asserts, you can find the entity by searching for it in the **Entity Outliner**\.
   + Components attached to the entity appear below\.  
![\[Find entities and its attached components in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-inspector.png)

Use the **Entity Inspector** to do the following:
+ [Add components to entities](component-working-adding.md)
+ [Modify component properties](editing-component-properties.md)
+ [Remove, copy, cut, and paste components](creating-adding-components.md)
+ [Set the entity status](component-entity-inspector-status.md)
+ [Customize the entity icon](component-entity-inspector-customize-icon.md)
+ [Pin an entity's inspector](component-entity-inspector-pin.md)
+ [Create your own help topic for your custom component](editing-component-properties.md#component-entity-inspector-help)

**Note**  
For a list and descriptions of available components, see [Component Reference](component-components.md)\. You can also click the **Help** icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/entity-inspector-help.png) in the header of each component to open a help topic\.