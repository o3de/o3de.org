# Setting an Entity Status<a name="component-entity-inspector-status"></a>

By default, an entity starts as active in a level\. When you create a game, you can specify that an entity remain inactive until activated through some mechanism such as a script or player action\. You can also set an entity as editor only if you want to disable an entity during gameplay mode or you want to create test entities or visual comments for users working in your game\. 

**To set an entity's status**

1. In the **Entity Outliner** or the viewport, select an entity\.

1. In the **Entity Inspector**, choose the **Status** drop\-down menu, and select one of the following options:
   + **Start active** – Entity is active when the level starts\.
   + **Start inactive** – Entity is inactive when the level starts\.
   + **Editor only** – Entity is only active in editor mode\.  
![\[Specify whether component is active, inactive, or active in editor mode only.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-component-entity-inspector-startactive.png)

1. When you set an entity as **Start Inactive** or **Editor only**, select the entity to view its status in the **Entity Outliner** and the viewport\.  
**Example Start Inactive**  

   Inactive entities have a strikethrough icon and inactive text appears in the viewport\.  
![\[Specify whether component is active, inactive, or active in editor mode only.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-component-entity-inspector-inactive-example.png)  
**Example Editor only**  

   Editor only entities have an icon that is not shaded and editor only text appears in the viewport\.  
![\[Specify whether component is active, inactive, or active in editor mode only.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-component-entity-inspector-editor-only-example.png)