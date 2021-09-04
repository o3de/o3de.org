---
description: ' Move a camera in the <guilabel>Track View</guilabel> editor in Open 3D Engine. '
title: Positioning a Camera
---

You can control a camera's position and rotation to manipulate the facing direction during a sequence. These can be animated over time to make the camera dynamic. If you have multiple cameras, you can also control if the cameras switch immediately or if they should blend over time.

## Animating the Camera 

As a recommended workflow, enter record mode and then animate the camera while viewing from the specific camera's perspective. For more information, see [Using Record Mode](/docs/user-guide/visualization/cinematics/using-record-mode.md).

{{< note >}}
You can still manipulate the component entity camera within the level from the default editor camera. However, this method makes it more difficult to determine where the camera is facing.
{{< /note >}}

**Example**

1. In a level, you have a component entity with a **Camera** component attached. This component entity is part of your sequence.

1. By default, the **Transform** component attached to the entity has the **Position** and **Rotation** tracks in the sequence.
![\[Create animation keys in the timeline for a sequence for a camera entity.\]](/images/user-guide/cinematics/cinematics-track-view-editor-using-record-mode-4.png)

1. To maintain the current position and rotation of the game object, add animation keys on both tracks at `0` on the timeline.
![\[Create animation keys in the timeline for a sequence for a camera entity.\]](/images/user-guide/cinematics/cinematics-track-view-editor-using-record-mode-5.png)

1. Select and drag the playhead to a different location on the timeline.

1. Move the Track View window to the side or dock it so that it's open but not blocking the viewport for the currently open level

1. Click the **Start Animation Recording** icon to enter record mode.

1. In the left-corner of the viewport window, right-click **Perspective** and choose **Camera** and then specify the camera that is part of your sequence. The text will change from **Perspective** to **Camera entity: *NameOfYourCamera***.

1. While you are viewing from the perspective of the camera, as you move in the level, the camera moves as well. This includes any rotations. In record mode, this adds animation keys at the current playhead location.
![\[Create animation tracks for a Camera component in the timeline for a sequence.\]](/images/user-guide/cinematics/cinematics-track-view-editor-using-record-mode-6.png)

1. Move the playhead when you need to add another animation key in the timeline and then move the camera view around in the level.

1. When finished, Click the **Start Animation Recording** icon again to exit record mode.

## Blending Cameras 

By default, when you switch between cameras, the change is immediate. However, if you want a smoother transition, you can blend the cameras together. You can blend a camera in and out of the camera-controlled sequence, or blend between cameras that are part of the sequence.

### Blending from Game Camera to Sequence Camera 

**To use the default game camera**

1. Under the **Director** node, for the **Camera** track, add an animation key to the timeline.

1. Double-click the animation key and verify that the **Camera** property is set to **None**.

1. Add another key on the timeline for the **Camera** track. You can add the key at the beginning or end of the sequence, or both.

1. Double-click the animation key before a camera change, and for **Blend time**, specify a value in seconds. This value determines how the current camera will blend into the next.

    {{< note >}}
This creates a blend between the game camera to the sequence camera, or from the sequence camera back to the game camera, depending on where you place the key and adjust the **Blend time**.
{{< /note >}}

### Blending Cameras within a Sequence 

Blended camera keys will blend the position, rotation, and field of view of the current camera into the next camera on the **Camera** track. This allows the cut to appear as a continuous single camera motion rather than an abrupt jump cut.

**To create a blended camera key**

1. Select the key for the first camera of the blend.

1. Double-click the key and do the following:

   1. For **Camera**, select the camera that you want to start.

   1. For **Blend time**, specify a value greater than `0`. This is the time in seconds over which the blend will occur.
**Example**

      If you add the first camera as a track view node, then you must add at least one animation key for the **Position**, **Rotation**, and **Field of View** tracks when using blended sequence cameras.

      In this sequence, the **Camera** track starts at `0` seconds for **CinematicsCamera** and will blend into **Camera5** at `2` seconds.
![\[Create animation tracks for a Camera component in the timeline for a sequence.\]](/images/user-guide/cinematics/cinematics-track-view-editor-blending-cameras-in-sequences.png)
