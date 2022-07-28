---
description: ' Use cinematic lighting for track view sequences in the <guilabel>Track View</guilabel> editor
  in Open 3D Engine. '
title: Adding Lighting
---

You can set up a different lighting scenario in a sequence using light components and/or a time of day settings that are only triggered during the sequence. You can add light components to the sequence and then add the tracks that you want to animate. You can then set the [Console Variable Node](/docs/user-guide/visualization/cinematics/track-view/nodes-cvar/) to specify the time of day settings.

## Cinematic Lighting Best Practices 

See the following recommended guidelines and best practices for cinematics lighting.
+ Lights should be turned on and off while in the Track View. If lights are off by default, they won't accidentally render in game or interfere with a scene shot. You can animate the **Visible** track for each light to determine when a light should be turned on or off.
+ Disable gameplay and cubemap lights as needed for shots to avoid interference.
+ For pre-rendered cinematic scenes, use the console variable `e_timeofday` to trigger the correct time of day.

  For more information, see [Using the Console Window](/docs/user-guide/editor/console/).
+ For real-time cinematics, use a track event node to trigger the correct time of day. For more information, see [Event Node](/docs/user-guide/visualization/cinematics/track-view/nodes-event/).
+ For pre-rendered cinematic scenes, use the [Shadows Setup Node](/docs/user-guide/visualization/cinematics/track-view/nodes-shadows/) to enable high quality shadows mode.
+ For pre-rendered cinematic scenes, because performance isn't an issue, you should always enable shadow casting and use as many spotlights as needed. Projector textures should be used as much as possible for spotlights. The **SpecularMultiplier** value should always be `1`.
+ Shadowmap quality from point lights improves greatly when the **ProjectorFOV** value is as low as possible. To soften shadows, you can increase the **ProjectorFOV** value slightly, but this also decreases the accuracy of the shadowmap.
+ Don't use ambient lights as they can weaken contrast and illuminate unwanted areas. Instead, use cubemaps to make the deepest shadow as dark as possible, and then add lights to increase the overall illumination.

## Light Components and Exposed Tracks 

For information on light components available for cinematics, read the [Atom Light Components](/docs/user-guide/components/reference/atom/light/) documentation.
