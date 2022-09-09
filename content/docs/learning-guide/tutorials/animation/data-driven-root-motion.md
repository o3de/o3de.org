---
linkTitle: Root Motion
title: Data Driven Root Motion
description: Learn about data driven root motion, how to extract root motion from animation, and how to enable root motion on actors in Open 3D Engine (O3DE).
weight: 100
toc: true
---

*Root motion* is animation that is applied to the root bone of an actor's skeleton hierarchy that moves the actor entity. This tutorial explains what root motion is, how to extract and generate root motion, and how to enable it for an actor in a data driven solution.

For this tutorial you'll need an actor asset with animation that has been processed for your project by **Asset Processor**. The animation should move the actor off the origin, such as a walk or run cycle.

## Root motion methods

Root motion can be *code driven* or *data driven*. This tutorial focuses on data driven root motion, but it's helpful to understand both methods.

### Code driven

With a code driven method, the actor's animation cycles happen in place because the root of the skeletal hierarchy isn't animated. The following movie demonstrates a forward run cycle that doesn't have root motion:

{{< video src="/images/learning-guide/tutorials/animation/jack-run-no-root-motion.mp4" info="Example run cycle without root motion." autoplay="true" loop="true" poster="/images/learning-guide/tutorials/animation/jack-run-poster.png" >}}

When a forward input event is received, the code driven root motion method plays the preceding forward run cycle, and moves the actor entity forward through an event handler that's most often implemented in script. Code driven root motion might be preferable in scenarios where precise actor movement for play mechanics is more critical than visual performance.

### Data driven

With data driven root motion, the animation cycle has root motion data applied. The root motion is usually created by an animator and baked into the animation cycle. The following movie demonstrates a forward run cycle with root motion:

{{< video src="/images/learning-guide/tutorials/animation/jack-run-root-motion.mp4" info="Example run cycle with root motion." autoplay="true" loop="true" poster="/images/learning-guide/tutorials/animation/jack-run-poster.png" >}}
<br>
{{< note >}}
The preceding example movies display the actor's bones as green lines. The green line that extends from the actor's pelvis to the ground plane is the root bone of the skeleton that the root motion is applied to.
{{< /note >}}

When a forward input event is received, the data driven solution plays the forward run cycle. The animation data from the root of the actor's skeleton drives the movement of the actor entity. Data driven root motion can give animators more control over the actor's performance.

### Which method should you use?

Which method you use depends on your project's needs. When using a [PhysX Character Controller](/docs/user-guide/components/reference/physx/character-controller) component, the root motion is usually data driven. You can opt to use the code driven method with a PhysX Character Controller component by not applying root motion to the actor entity.

The following tutorial focuses on the data driven method and shows you how to generate root motion if your animation doesn't have root motion baked in. You'll also learn how to enable root motion in **Animation Editor**.

## Generate data driven root motion

The *data* referred to in data driven root motion is keyframe animation applied to the root bone of an actor's skeleton. The best case scenario is that the source scene files have a root bone that is placed at the origin and connected to the actor's pelvis (or a relative bone on an actor that isn't a biped), and that motion is keyed on the root bone. It's possible, though, that the source scene files don't have a root bone at the origin, but instead have motion applied to another bone such as the pelvis.

To determine if the actor has a root bone with motion baked into the animation, do the following:

1. In **O3DE Editor**, from the **Tools** menu, choose **Animation Editor**.

1. In Animation Editor, press **Ctrl + O** to open the actor. Select an actor from the file window.

1. Choose the {{< icon "visibility-on.svg" >}} **Visibility** button above the viewport, and select **Line skeleton** from the list to display the actor's skeleton as green lines.

1. In the **Motion Sets** tab, in the **Motion Set** group, choose the {{< icon "file-folder.svg" >}} **Folder** button to add a motion. Select a motion from the file window.

1. Choose the motion you just added to the Motion Set to enable it.

1. In the **Time View** tab, click the {{< icon "play.svg" >}} **Play** button to play the animation.

Examine the animation as it plays. If the skeleton has a root bone (a green line extending to the ground) that moves with the actor, then the actor has root motion. The following movie shows a run cycle on an actor that has a root bone with motion baked in. Notice the green line that represents the root bone extends to the ground and moves with the actor:

{{< video src="/images/learning-guide/tutorials/animation/jack-run-root-motion.mp4" info="Example run cycle with root motion." autoplay="true" loop="true" poster="/images/learning-guide/tutorials/animation/jack-run-poster.png" >}}

If you animation resembles the preceding movie, but the actor snaps back to the origin after each time the animation cycle plays, you can move on to the [Enable root motion](#enable-root-motion) section. If the root bone remains at the origin as the actor moves, the source scene files might not have a root bone, and the motion has been applied to another bone such as the pelvis. You'll need to generate root motion for the animation.

For the best result, edit the source scene files in your digital content creation application (Blender or Maya, for example) and add a root bone with animation. Alternatively, if the actor has motion applied to a different bone such as the pelvis, you can try to extract the root motion automatically.

### Root motion extraction

You can extract root motion from an animation by customizing how the animation is processed with the [Scene Settings](/docs/user-guide/assets/scene-settings/) tool. To create a custom processing rule with a **Root motion extraction** modifier, do the following:

1. In O3DE Editor in **Asset Browser** locate the `.fbx` file containing the animation you want to extract the root motion from.

1. In Asset Browser, right-click the animation file and choose **Edit settings...** from the context menu.

1. In Scene Settings, select the **Motions** tab.

1. Choose **Add Modifier** and select **Root motion extraction** from the modifier list.

    {{< note >}}
A source scene file might contain more than one motion. You'll need to add a Root motion extraction modifier to each motion that requires it.
    {{< /note >}}

1. In the Root motion extraction modifier, ensure the **Sample joint** property is set to the bone containing the motion you want to extract as in the following example:

    {{< image-width src="/images/learning-guide/tutorials/animation/root-motion-extraction-modifier-bone.png" alt="Selecting the bone for root motion extraction in Scene Settings." >}}

1. By default, the bone's translation is extracted. You can choose to ignore the X or Y axis translation, and extract rotations by setting the properties in the modifier.

1. With the modifier configured, choose **Update** to save your custom processing rule. The animation is automatically processed by Asset Processor. Close the output window and exit scene settings.

When the motion is processed, the root motion is extracted and applied to the root bone in the motion product asset. You can verify if the root motion extraction was successful by repeating the previous steps in the [Generate data driven root motion](#generate-data-driven-root-motion) section.

The following table provides additional detail on the options provided by the Root motion extraction modifier:

| Option | Description |
| - | - |
| **Sample Joint** | The bone root motion is extracted from. Usually this is the hip or pelvis (or some relative bone for actors that aren't bipeds). |
| **Ignore X-Axis transition** | When enabled, X-axis translations aren't extracted. The X translation of the root motion is set to `0.0`. |
| **Ignore Y-Axis transition** | When enabled, Y-axis translations aren't extracted. The Y translation of the root motion is set to `0.0`. |
| **Rotation extraction** | When enabled, rotations are extracted for the root motion. |
| **Smoothing method** | Select a smoothing method you want to apply to the motion data. Smoothing the data reduces any drastic position or rotation changes. |
| **Smooth position** | When enabled, translations of the root motion animation data are smoothed. |
| **Smooth rotation** | When enabled, rotations of the root motion animation data are smoothed. |
| **Smooth frame number** | The number of samples, specified in frames, that each data point should use to apply smoothing. Larger values usually result in smoother animation data. |

## Enable root motion

Once you have root motion applied to the actor's root bone, you must enable root motion for the actor. Follow these steps to enable root motion for the actor:

1. In Animation Editor, press **Ctrl + O** to open the actor. Select an actor from the file window.

1. In the **Motion Sets** tab, in the **Motion Set** group, choose the {{< icon "file-folder.svg" >}} **Folder** button to add the motion. Select a motion that contains root motion from the file window.

1. Choose the motion you just added to the Motion Set to enable it.

1. In the **Actor Manager** tab, click the actor instance to select it.

1. In the **Actor Properties** pane, ensure the root bone is selected in the **Motion extraction joint** property. If you choose **Find best match**, Animation Editor will try to select the appropriate bone.

    {{< image-width src="/images/learning-guide/tutorials/animation/enable-root-motion-bone.png" alt="Enable root motion for the actor in Animation Editor." >}}

1. Press **Ctrl + S** to save the actor.

If root motion is successfully enabled, you'll see the character repeat the animation cycle without popping back to the origin. This means the root movement of the actor is driven by animation data.

{{< video src="/images/learning-guide/tutorials/animation/enable-root-motion.mp4" info="Example run cycle with root motion." autoplay="true" loop="true" poster="/images/learning-guide/tutorials/animation/enable-root-motion-poster.png" >}}
