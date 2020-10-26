# VR Preview<a name="component-vrpreview-component"></a>

The **VR Preview** component, when added to an entity or spawned from a slice, creates a user\-editable [navigation mesh](component-navigation.md)\. The navigation mesh is used to define valid areas that users can teleport to\. The **VR Preview** component sets up necessary dependencies for exploring or navigating a scene in virtual reality\. This component contains no editable properties\.

**To use the VR Preview component**

1. [Create a new entity](creating-entity.md)\.

1. Open the [**Entity Inspector**](component-entity-inspector.md)\. Add the **VR Preview** component to the entity by clicking **Add Component**, **VR**, **VR Preview**\.

   A navigation mesh of 50x50x50 size is generated around the entity\.

1. [Save the entity to a slice](component-slice-push-changes.md)\.

   Now you can drag the saved slice to another part of the level, and the navigation mesh will be generated around the entity\.

The navigation mesh that is generated is a separate entity from the original entity\. Lumberyard names the new nav mesh entity by appending `_NavMesh` to the original entity name\. 

If you delete the original entity, the nav mesh entity continues to exist\. However, if you delete the nav mesh entity, it won't be generated again\.