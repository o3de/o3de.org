# Pinning an Entity's Inspector<a name="component-entity-inspector-pin"></a>

You can pin an entity's inspector to keep it open and visible even when you select another entity\. You can pin inspectors for multiple entities, and also pin multiple inspector instances of the same entity\. This helps you compare the entities and their components to each other\.

A pinned inspector has the following features:
+ Always shows the pinned entity even when you select a different entity\.
+ Functions like the main **Entity Inspector** window\.
+ Closes when you open a different level or exit Lumberyard\.
+ If you convert a loose entity to a slice, the pinned inspector points to the new slice entity that corresponds to the previously loose entity\.
+ Persists when entering and exiting game mode\.
+ Updates all pinned inspectors for a particular entity when you modify that entity\.

You can pin an inspector from the **Entity Outliner** or the **Entity Inspector**\.

**To pin an inspector**

1. Select an entity\.

1. Do one of the following:

   1. In the **Entity Outliner**, right\-click the entity and then choose **Open pinned Inspector**\.  
![\[In the Entity Outliner, choose Open pinned Inspector to pin an inspector for that entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-inspector-pin-1.png)

   1. In the **Entity Inspector**, click the pin icon\.  
![\[In the Entity Inspector, click the pin icon to pin an inspector for the entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-inspector-pin-2.png)

1. In Lumberyard Editor, you can view the pinned entity inspectors\.  
**Example**    
![\[Multiple pinned inspectors open in a level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-inspector-pin.png)