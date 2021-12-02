---
linkTitle: Camera Rig
title: Camera Rig Component
description: ' Use the Camera Rig component to add and remove behaviors to drive your camera entity in Open 3D Engine (O3DE). '
---

Use the **Camera Rig** component to add and remove behaviors to drive your camera entity.

## Provider ##

[Camera Framework Gem](/docs/user-guide/gems/reference/rendering/camera-framework/)

## Dependencies ##

Entity with [Camera component](./camera).

## Camera Rig properties 

![Camera Rig properties](/images/user-guide/components/reference/camera/camera-rig-component.png)

Target acquirers
: Array of behaviors that define how the camera rig selects a target. The rig tries each acquirer in the order listed until one successfully finds a target. 

Look-at behaviors
: Array of behaviors that modify the look-at target transform. The rig runs each in order to generate a final target transform.

Transform behaviors
: Array of behaviors that modify the camera's transform based on the look-at target transform. The rig runs each in order before setting the camera's transform.

## Target acquirers properties 

{{< tabs name="target-acquirers-ui" >}}
{{% tab name="Acquire By EntityId" %}}

![Acquire by entityId properties](/images/user-guide/components/reference/camera/camera-rig-acquire-by-entityid.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Entity target** | Choose an entity for the camera rig to target. | EntityId | None |
| **Use target rotation** | If enabled, the camera rig uses the target entity's rotation when determining behavior. | Boolean | `Enabled` |
| **Use target position** | If enabled, the camera rig uses the target entity's position when determining behavior. | Boolean | `Enabled` |

{{% /tab %}}
{{% tab name="Acquire By Tag" %}}

![Acquire by tag properties](/images/user-guide/components/reference/camera/camera-rig-acquire-by-tag.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Target tag** | Find a target by tag. If multiple entities are found, the camera target's the first entity to respond. | Crc32 | None |
| **Use target rotation** | If enabled, the camera rig uses the target entity's rotation when determining behavior. | Boolean | `Enabled` |
| **Use target position** | If enabled, the camera rig uses the target entity's position when determining behavior. | Boolean | `Enabled` |

{{% /tab %}}
{{< /tabs >}}

## Look-at behaviors properties 

{{< tabs name="look-at-behaviours-ui" >}}
{{% tab name="Offset Position" %}}

Use **OffsetPosition** to change the position of the target's transform. For example, you can set the camera to target a position 1.8 meters up from a character's base.

![Offset position properties](/images/user-guide/components/reference/camera/camera-rig-offset-position.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Positional Offset** | Vector displacement of the target transform's position. | Vector3 |  X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Offset Is Relative** | If enabled, **Positional Offset** is in local space. If disabled, **Positional Offset** is in world space. | Boolean | `Disabled` |

{{% /tab %}}
{{% tab name="Rotate Camera Target" %}}

Use **Rotate Camera Target** to rotate the camera target separately from its source target. For example, you can set the camera to pitch on the X axis to simulate a character looking up or down.

![Rotate camera target properties](/images/user-guide/components/reference/camera/camera-rig-rotate-camera-target.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Axis Of Rotation** | The axis of the target that the camera rotates around. | **X**, **Y**, or **Z** axis. | `Camera Target's X Axis` |
| **Event Name** | Name of Input Event that provides the value for the rotation. | String | None |
| **Invert Axis** | If enabled, inverts the **Axis Of Rotation**. | Boolean | `Disabled` |
| **Rotation Speed Scale** | Multiplier for Input Event values used to scale the speed of rotation. | 0.001 to Infinity | `1.0` |

For more information about Input Events, refer to [Working with the Input component](/docs/user-guide/interactivity/input/using-player-input).

{{% /tab %}}
{{% tab name="Slide Along Axis Based On Angle" %}}

Use **SlideAlongAxisBasedOnAngle** to modify the position of the look-at target based on an angle. For example, you can set the camera to move in front of the character when the character looks down. 

![Slide along axis based on angle properties](/images/user-guide/components/reference/camera/camera-rig-slide-along-axis-based-on-angle.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Axis to slide along** | The axis to slide the camera on. | `Forwards and Backwards`, `Right and Left`, `Up and Down` | `Forwards and Backwards` |
| **Angle Type** | The type of rotation to base the slide on. | `Pitch`, `Roll`, `Yaw` | `Pitch` |
| **Vector Component To Ignore** | Choose a vector component to ignore to limit camera movement to a single plane.  | `None`, `X`, `Y`, `Z` | `None` |
| **Max Positive Slide Distance** | The maximum camera slide (in meters) when the angle of rotation is 90 degrees. | -Infinity to Infinity | `0.0` |
| **Max Negative Slide Distance** | The maximum camera slide (in meters) when the angle of rotation is -90 degrees. | -Infinity to Infinity | `0.0` |

{{% /tab %}}
{{< /tabs >}}

## Transform behaviors properties 

{{< tabs name="transform-behaviours-ui" >}}
{{% tab name="Offset Position" %}}

**Offset Position** sets the camera's position in relation to the target's position.

![Offset position properties](/images/user-guide/components/reference/camera/camera-rig-transform-offset-position.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Offset** | Vector displacement of the target transform's position. | Vector3 |  X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Is Offset Relative** | If enabled, **Offset** is in local space. If disabled, **Offset** is in world space. | Boolean | `Disabled` |

{{% /tab %}}
{{% tab name="Follow Target From Distance" %}}

**FollowTargetFromDistance** causes the camera to follow the target from a specified distance. You can also set Input Events to trigger the camera to zoom in on or out from a target.

![Follow target from distance properties](/images/user-guide/components/reference/camera/camera-rig-follow-target-from-distance.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Follow Distance** | The distance (in meters) from which the camera follows the target. Must be greater than or equal to **Minimum Follow Distance** and less than or equal to **Maximum Follow Distance**. | 0 to Infinity | `0.0` |
| **Minimum Follow Distance** | Minimum distance (in meters) from which the camera follows the target. Must be less than or equal to **Maximum Follow Distance**. | 0 to Infinity | `0.0` |
| **Maximum Follow Distance** | Maximum distance (in meters) from which the camera follows the target. | 0 to Infinity | `0.0` |
| **Zoom In Event Name** | Input Event name that reduces the current follow distance, in effect, zooming in. | String | None |
| **Zoom Out Event Name** | Input Event name that increases the current follow distance, in effect, zooming out. | String | None |
| **Zoom Speed Scale** | Multiplier for Input Event values used to scale the speed of zooming. | -Infinity to Infinity | `1.0` |

For more information about Input Events, refer to [Working with the Input component](/docs/user-guide/interactivity/input/using-player-input).

{{% /tab %}}
{{% tab name="Rotate" %}}

Use **Rotate** to rotate a camera about one of its axes (**X**, **Y**, or **Z**).

![Rotate properties](/images/user-guide/components/reference/camera/camera-rig-rotate.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Angle** | Angle (in degrees) to rotate the camera. | -Infinity to Infinity | `0.0` |
| **Axis** | Axis about which to rotate the camera. | `X`, `Y`, `Z` | `X` |

{{% /tab %}}
{{% tab name="Follow Target From Angle" %}}

**FollowTargetFromAngle** causes the camera to follow the target from a specified angle. This feature works well for top-down, isometric, and side scrolling cameras.

![Follow target from angle properties](/images/user-guide/components/reference/camera/camera-rig-follow-target-from-angle.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Angle** | Angle (in degrees) at which to follow the target. | -Infinity to Infinity | `0.0` |
| **Rotation Type** | The rotation type of **Angle**. | `Pitch`, `Roll`, `Yaw` | `Pitch` |
| **Distance From Target** | The distance (in meters) from which the camera follows the target. | -Infinity to Infinity | `1.0` |

{{% /tab %}}
{{% tab name="Face Target" %}}

**FaceTarget** causes the camera to change the rotation of its transform to look at the target. To use this feature, simply add it. There are no additional properties to configure.

![Face target properties](/images/user-guide/components/reference/camera/camera-rig-face-target.png)

{{% /tab %}}
{{< /tabs >}}
