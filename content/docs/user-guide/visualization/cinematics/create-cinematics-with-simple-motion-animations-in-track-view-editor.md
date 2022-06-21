---
description: null
title: Creating Character Animations with the Simple Motion Component
draft: true
---

To create character animations with the Track View, you can add the **Simple Motion** component and the **Actor** component to an entity. You then add the entity to a track view sequence and specify the motions that you want your character to animate. When you add a motion track to a track view sequence, the Track View drives animation on the **Simple Motion** component and its properties:
+ **Motion**
+ **Play speed**
+ **Play time**
+ **Blend in time**
+ **Blend out time**

For more information, see the **[Simple Motion](/docs/user-guide/components/reference/animation/simple-motion/)** component.

{{< note >}}
The **Play speed** property is always set to `0.0`. This is because the Track View will set the **Play time** value every frame to drive the playback of the motion. This allows scrubbing and playback in the Track View as well as playback in the game.

When you add the **Simple Motion** component to a track view sequence, the **Preview in Editor** property is automatically enabled.
{{< /note >}}

**To add the Simple Motion component in the Track View editor**

1. In O3DE Editor, right-click in the viewport and choose **Create entity**.

1. Enter a name for the entity.

1. In the **Entity Inspector**, click **Add Component**, and then choose the **Simple Motion** component.

1. Add the **[Actor](/docs/user-guide/components/reference/animation/actor/)** component.

1. In the **Actor** component, for **Actor asset**, specify an actor file. For example, you can specify the `Jack.fbx` file.
**Example**

   Your entity should look like the following.

   ![Components for the entity to add to the track view sequence.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-1.png)

1. In O3DE Editor, choose **Tools**, **Track View**.

1. Click the **Add Sequence **icon ![Add track view sequence icon](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-2.png), enter a sequence name, and then click **OK**.

1. Select the entity in the viewport, right-click the sequence, and then choose **Add Selected Entity**.

   This adds the entity and its components to the track view sequence.

   ![Entity and components added to the track view sequence.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-3.png)

1. Right-click** Simple Motion**, choose **Add Track**, and then choose the **Motion** option.

1. In the timeline, for **Simple Motion**, double-click to create to a key.

1. Click the key and in the **Key Properties** dialog box, specify the following:

   1. For **Motion**, click the folder icon and specify the motion file, such as `jack_idle_to_walk.motion`.

   1. Specify the parameters that you want, such as the **Start Time** and **End Time**.

        {{< note >}}
You can set the **Loop** parameter so that motion continues to play as long as the track view sequence is set.
{{< /note >}}

**Example**

![Key properties for the first motion.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-4.png)

1. Click the play icon ![Play the track view sequence](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-5.png) to view the animation in the track view sequence. You can also drag the Track View needle across the timeline.
**Example**

   The following shows the actor animating the idle to walk motion.

   ![Example animation of a single motion in the track view sequence.](/images/shared/shared-cinematics-track-view-simple-motion-component-6-example.gif)

{{< note >}}
When you update properties in the Track View, the original values for the entity properties are overwritten and are not restored. For example, if you set the **Start time** to `3.0` in the Track View, this updates the **Simple Motion** component properties in the **Entity Inspector**. If you want to reuse an entity with a **Simple Motion** component after a track view sequence is completed, update the **Play speed** parameter; the **Play speed** parameter always resets to zero in the Track View. You can also avoid this issue by not reusing entities in this way.
{{< /note >}}

## Blending Motions in the Track View Editor

The **Simple Motion** component supports two motions at a time for blending: the currently playing motion and the previously played motion. For example, you can blend two motions so that your actor smoothly transitions between a walk motion to a run motion.

You can set the **Blend In Time** and **Blend Out Time** properties for simple animation blending.
+ **Blend In Time** - Specifies how long it takes for the motion that is set to fully blend in from zero to one second.
+ **Blend Out Time** - Specifies how long it will take for a motion to fully blend out from one to zero second.

To blend two motions, overlap two animations and set the **Blend Out Time** of the last motion to `0.33` seconds, and the **Blend In Time** of the next motion by `0.33` seconds. This allows the two motions to smoothly chain together in the track view sequence.

{{< note >}}
If you want your animation to start when the game starts, click the **Edit Sequence** icon ![Edit track view sequence icon](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-6.png) and in the **Edit Sequence** dialog box, select **Autostart**, and then click **OK**. For more information, see [Setting Sequence Properties](/docs/user-guide/visualization/cinematics/sequence-props).
{{< /note >}}

The **Blend In Time** and **Blend Out Time** parameters affect the bone weight that are set in your DCC.

**To blend motions in the Track View Editor**

1. Double-click the first key and for **Blend Out Time**, enter `0.33`. This allows the first motion, `jack_idle_to_walk.motion`, to blend into the next motion.
**Example**

![Key properties for the first motion for blending.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-7.png)

1. For the **Simple Motion** track, double-click the timeline to create a second key.

1. Double-click the key again and in the **Key Properties** dialog box, specify the following:

   1. For **Motion**, click the folder icon and specify the next motion, such as the `jack_strafe_run_forwards.motion` file.

   1. Specify the parameters that you want, such as the **Start Time** and **End Time**. For **Blend In Time**, enter `0.33`. This allows enough time to overlap with the previous motion.
**Example**


![Key properties for the second motion for blending.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-8.png)

1. Select and drag the second key so that overlaps with the first motion track.

1. Repeat steps 2 to 4 to add additional motions. For a motion that is ending, enter `0.33` for **Blend Out Time**. For the motion that starts next, enter `0.33` for **Blend In Time**.
**Example**

   The following is a timeline with four motions blended together.

   ![Timeline in a track view sequence with four motions.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-9.png)

1. Click the play icon to view the track view sequence. You can also drag the Track View needle across the timeline. The motions blend together in the track view sequence.
**Example**

![Example of blending motions together in the track view sequence.](/images/user-guide/cinematics/cinematics-track-view-simple-motion-component-10.gif)
