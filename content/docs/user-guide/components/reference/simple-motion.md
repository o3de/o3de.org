---
description: ' Use the Simple Motion component to add motion effects to your actor
  in Open 3D Engine. '
title: Simple Motion
---

{{< preview-migrated >}}

You can use the **Simple Motion** component to play a motion without an animation graph\. Add this component to the **[Actor](/docs/user-guide/components/reference/actor/)** component to use a single motion for your actor\. For complex motions, see the **[AnimGraph](/docs/user-guide/components/reference/animgraph/)** component\.

For creating cinematics with the **Simple Motion** component, see [Creating Character Animations with the Simple Motion Component](/docs/user-guide/visualization/cinematics/create-cinematics-with-simple-motion-animations-in-track-view-editor/)\.

## Simple Motion Component Properties {#component-simple-motion-properties}

![\[Add the Simple Motion component to an entity to assign a motion for the actor.\]](/images/user-guide/component/component-simple-motion-properties.png)


****

| Property | Description |
| --- | --- |
|  **Preview in Editor**  | Plays the motion in O3DE Editor\.  |
| Motion |  Specifies the motion that you want the actor to play\.  |
| Loop motion |  Runs the animation continuously\.  |
| Retarget motion |  Allows motion that was created with an actor that was configured with specific bone lengths to be played on another actor with different bone lengths\. When applied, the motion does not affect bone lengths\. The skeleton must follow the same hierarchy and the bone names must be identical to work properly\.   |
| Reverse motion |  Runs the animation in reverse\.   |
| Mirror motion |  Mirrors the animation of the character's body parts\. For example, if the actor kicks with the right leg while the left leg is planted, the mirror effect causes the left leg to kick while the right leg is planted\.  |
| Play speed |  Specifies the rate at which the motion is played\.  |
|  **Blend in time**  | Specifies the blend in time for the motion, in seconds\. You can set this parameter for a motion that you want to start and that is blending from a previous motion\. |
|  **Blend out time**  | Specifies the blend out time for the motion, in seconds\. You can set this parameter for a motion that is currently playing and that will blend into the next motion\.  |
