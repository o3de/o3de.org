---
description: ' Use the Attachment component to attach an entity''s bone to a bone
  on the skeleton of another entity in Open 3D Engine. '
title: Attachment
---

The **Attachment** component lets an entity attach to a bone on the skeleton of another entity\.

## Attachment Component Properties {#component-attachment-properties}

![\[Attachment component properties.\]](/images/user-guide/component/attachment-component-properties.png)

The **Attachment** component has the following properties\.


****

| Name | Description |
| --- | --- |
| Target entity |  Specifies the character entity that you want to attach\.  |
| Joint name |  Specifies the joint that you want to attach to the entity\.  |
| Position offset |  Specifies the x, y, and z local position offset from the target bone\.  |
| Rotation offset |  Specifies the x, y, and z local rotation offset from the target bone\.  |
|  **Scale offset**  |  Specifies the x, y, and z local scale offset from the target bone\.  |
| Attached initially |  Specifies whether to attach to the target entity automatically\.  |
|  **Scaling**  |  Specifies how the object scaling is determined\. You can specify the following values: [\[See the AWS documentation website for more details\]](/docs/userguide/components/attachment)  |

## EBus Request Bus Interface {#component-attachment-legacy-ebusrequest}

Use the following request functions with the event bus \(EBus\) interface to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/features/engine/ebus/_index.md)\.


****

| Function Name | Description | Parameters | Scriptable |
| --- | --- | --- | --- |
| Attach |  Changes the attachment target for an entity\. The entity will detach from its previous target\.  |  `targetEntityId` - ID of the entity in which to attach\. `targetBoneName` - Name of bone in which to attach the entity\. If a bone is not found, then attach to target entity's transform origin\. `offsetTransform` - Attachment's offset from target\.  | Yes |
| Detach |  Detaches the target from the entity\.  | None | Yes |
| SetAttachmentOffset |  Update entity's offset from target\.  | offsetTransform - Attachment's offset from target\. | Yes |

## EBus Notification Bus Interface {#component-attachment-legacy-ebusnotification}

Use the following notification functions with the EBus interface to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/features/engine/ebus/_index.md)\.


****

| Function Name | Description | Parameters | Scriptable |
| --- | --- | --- | --- |
| OnAttached |  Indicates that the entity has attached to the target\.  | targetEntityId - ID of the target in which is being attached\. | Yes |
| OnDetached |  Indicates that the entity is detaching from its target\.  |  `targetEntityId` - ID of the target in which is being detached\.  | Yes |