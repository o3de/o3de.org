---
description: ' Use the Simple Motion component to add motion effects to your actor
  in &ALYlong;. '
slug: component-simple-motion
title: Simple Motion
---
# Simple Motion<a name="component-simple-motion"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **Simple Motion** component to play a motion without an animation graph\. Add this component to the **[Actor](component-actor.md)** component to use a single motion for your actor\. For complex motions, see the **[AnimGraph](component-animgraph.md)** component\.

For creating cinematics with the **Simple Motion** component, see [Creating Character Animations with the Simple Motion Component](create-cinematics-with-simple-motion-animations-in-track-view-editor.md)\.

## Simple Motion Component Properties<a name="component-simple-motion-properties"></a>

![\[Add the Simple Motion component to an entity to assign a motion for the actor.\]](/images/userguide/component/component-simple-motion-properties.png)


****  

| Property | Description | 
| --- | --- | 
|  **Preview in Editor**  | Plays the motion in Lumberyard Editor\.  | 
| Motion |  Specifies the motion that you want the actor to play\.  | 
| Loop motion |  Runs the animation continuously\.  | 
| Retarget motion |  Allows motion that was created with an actor that was configured with specific bone lengths to be played on another actor with different bone lengths\. When applied, the motion does not affect bone lengths\. The skeleton must follow the same hierarchy and the bone names must be identical to work properly\.   | 
| Reverse motion |  Runs the animation in reverse\.   | 
| Mirror motion |  Mirrors the animation of the character's body parts\. For example, if the actor kicks with the right leg while the left leg is planted, the mirror effect causes the left leg to kick while the right leg is planted\.  | 
| Play speed |  Specifies the rate at which the motion is played\.  | 
|  **Blend in time**  | Specifies the blend in time for the motion, in seconds\. You can set this parameter for a motion that you want to start and that is blending from a previous motion\. | 
|  **Blend out time**  | Specifies the blend out time for the motion, in seconds\. You can set this parameter for a motion that is currently playing and that will blend into the next motion\.  | 