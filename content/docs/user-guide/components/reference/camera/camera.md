---
linkTitle: Camera
title: Camera Component
description: ' Use the Camera component to allow an entity to be used as a camera in Open 3D Engine (O3DE). '
---

The **Camera** component adds a camera to an entity.

## Provider ##

[Camera Gem](/docs/user-guide/gems/reference/rendering/camera)

## Camera properties 

![Camera component properties in the Entity Inspector.](/images/user-guide/components/reference/camera/camera-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Be this camera** | Choose the **Be this camera** button to activate the camera's view in the viewport.  For more information, see [Changing the Camera View](/docs/user-guide/editor/camera-space/). |||
| **Orthographic** | If set to enabled, this camera will use an orthographic projection instead of a perspective projection. Objects will appear the same size, regardless of their distance from the camera. | Boolean | `Disabled` |
| **Field of view** | Vertical field of view in degrees. | 0.0 - 180.0 | `75` |
| **Near clip distance** | Distance to the near clip plane of the view frustum in meters. Must be less than **Far clip distance**. | 0.001 to Infinity | `0.2` |
| **Far clip distance** | Distance to the near far plane of the view frustum in meters. Must be greater than **Near clip distance**. | 0.001 to Infinity | `1024` |
| **Make active camera on activation** | If set to enabled, this camera will become the active render camera when the component activates. | Boolean | `Enabled` |
| **Debug - Frustrum length**| Length of the frustum shape as a percentage of the **Far clip distance**. | 0.01 - 100.0 | `1.0` |
| **Debug - Frustrum color** | Color of the frustum shape. | Eight bits per channel color: 0-255 | `255,255,0` |

## CameraRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetFarClipDistance` | Returns the **Far clip distance** of the camera in meters. | None | Far Clip Distance: Float | Yes |
| `GetFov` | Returns the **Field of view** of the camera in degrees. | None | FOV: Float | Yes |
| `GetFovDegrees` | Returns the **Field of view** of the camera in degrees. | None | FOV: Float | Yes |
| `GetFovRadians` | Returns the **Field of view** of the camera in radians. | None | FOV: Float | Yes |
| `GetNearClipDistance` | Returns the **Near clip distance** of the camera in meters. | None | Near Clip Distance: Float | Yes |
| `GetOrthographicHalfWidth` | Returns the orthographic half-width of the camera. | None | Half-Width: Float | Yes |
| `IsActiveView` | Returns `True` if the camera is the current active view. | None | Boolean | Yes |
| `IsOrthographic` | Returns `True` if the camera is set to use an orthographic perspective. | None | Boolean | Yes |
| `MakeActiveView` | Sets the camera to be the active view. | None | None | Yes |
| `SetFarClipDistance` | Sets the **Far clip distance** of the camera in meters. | Far Clip Distance: Float | None | Yes |
| `SetFov` | Sets the **Field of view** of the camera in degrees. | FOV: Float | None | Yes |
| `SetFovDegrees` | Sets the **Field of view** of the camera in degrees. | FOV: Float | None | Yes |
| `SetFovRadians` | Sets the **Field of view** of the camera in radians. | FOV: Float | None | Yes |
| `SetNearClipDistance` | Sets the **Near clip distance** of the camera in meters. | Near Clip Distance: Float | None | Yes |
| `SetOrthographic` | If `True`, sets the camera to use an orthographic perspective. | Boolean | None | Yes |
| `SetOrthographicHalfWidth` | Sets the orthographic half-width of the camera. | Half-Width: Float | None | Yes |


## CameraNotificationBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnActiveViewChanged` | Notifies listeners that a new camera has been made the active view. | None | EntityId | Yes |
| `OnCameraAdded` | Notifies listeners that a new camera is active in the level. | None | EntityId | Yes |
| `OnCameraRemoved` | Notifies listeners that a camera has been deactivated in the level. | None | EntityId | Yes |

## CameraSystemRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetActiveCamera` | Returns the EntityId of the active camera. | None | EntityId | Yes |

For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

## Example Lua script

The following is an example of Lua script using the `CameraRequestBus`.

```lua
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

## Create camera entity from view 

You can create a static camera view from a specific entity by right-clicking an entity in the viewport and choosing **Create camera entity from view**. This places a new entity with a camera component at the same point. You can adjust the view of the camera by modifying its transform component.
