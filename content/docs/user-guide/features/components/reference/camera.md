---
description: ' Use the Camera component to allow an entity to be used as a camera
  in Open 3D Engine. '
title: Camera
---

The **Camera** component allows an entity to be used as a camera\. To use the **Camera** component, you must first add a Camera Framework gem to your project\. For information, see [Camera Framework Gem](/docs/user-guide/features/gems/camera.md)\.

## Camera Component Properties {#component-camera-properties}

![\[Camera component properties in the Entity Inspector.\]](/images/user-guide/component/component-camera-properties.png)

The **Camera** component has the following properties:


****

| Name | Description |
| --- | --- |
|  **Field of view**  |  Vertical field of view in degrees\. Valid values: `0` to `180`  Default value: `75`  |
|  **Near clip distance**  |  Distance to the near clip plane of the view frustum in meters\. Default value: `0.2`  |
|  **Far clip distance**  |  Distance to the near far plane of the view frustum in meters\. Default value: `1024`  |
|  **Be this camera**  |  Editor uses the selected camera as its view\. For more information, see [Changing the Camera View](/docs/userguide/editor/viewport#lumberyard-editor-viewport-camera)\.  |
| Frustum length |  Length of the frustum shape\. Default value: `1.0` percent  |
|  **Frustum color**  |  Color of the frustum shape\. Default value: `255`, `255`, `0`  |

## EBus Request Bus Interface {#component-camera-ebusrequest}

Use the following request functions with the event bus \(EBus\) interface, `CameraRequestBus`, to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/features/engine/ebus/_index.md)\.


****

| Request Name | Description |
| --- | --- |
|  `GetFov`  |  Gets the current field of view\.  |
|  `SetFov`  |  Sets the current field of view\.  |
|  `GetNearClipDistance`  |  Gets the current near clip distance\.  |
|  `SetNearClipDistance`  |  Sets the current near clip distance\.  |
|  `GetFarClipDistance`  |  Gets the current far clip distance\.  |
|  `SetFarClipDistance`  |  Sets the current far clip distance\.  |

The following is an example of script using the **Request Bus Interface**\.

```
local camerasample =
{
    Properties =
    {
    }
}

function camerasample:OnActivate()
    CameraRequestBus.Event.SetFov(self.entityId, 85)
    local nearClip = CameraRequestBus.Event.GetNearClipDistance(self.entityId)
    CameraRequestBus.Event.SetFarClipDistance(self.entityId, nearClip + 1024)
end

return camerasample
```

## Creating Camera Entity from View {#component-slice-camera-entity}

You can create a static camera view from a specific entity by right\-clicking an entity in the viewport and choosing **Create camera entity from view**\. This places a new entity with a camera component at the same point\. You can adjust the view of the camera by modifying its transform component\.