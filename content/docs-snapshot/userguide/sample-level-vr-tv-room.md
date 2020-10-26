# VR TV Room Level<a name="sample-level-vr-tv-room"></a>

The VR TV Room level demonstrates a simple VR level that is set up to play 2D video, 3D video, and 360 video on a VR device\. This level contains the following:
+ 2D video
+ 3D video
+ `Input Configurator` entity – Initiates an input event when you press the trigger button\.
+ `VideoPlayback_Toggle` entity – Contains a **[Script Canvas](component-script-canvas.md)** component that listens for the input event and then toggles visibility\.
+ `Screen_Toggle_Sphere` entity – Contains a Lua script that enables the 3D video sphere to follow the VR camera\.

For more information about installing the project that includes the VR TV Room level, see [Virtual Reality Samples Project](sample-project-virtual-reality.md)\.

## Using Components in the VR TV Room Level<a name="sample-level-vr-tv-room-using-video-playback-script-canvas-components"></a>

You can use the **[Video Playback](component-videoplayback.md)** component to assign a diffuse texture to the specified video\. You can then assign the material that uses the diffuse texture to any mesh\. 

![\[Video Playback and Script Canvas components for the VR TV Room level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/tv-room-level-video-playback-script-canvas-components-example.png)

You can use the **Script Canvas** component and graph to set the playback to loop mode and to start playing immediately\.

![\[Example Script Canvas graph for the VR TV Room level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/tv-room-level-script-canvas-graph.png)

## Cycling Through Video Playback Options<a name="sample-level-vr-tv-room-cycling-through-video-playback-options"></a>

The TV Room level shows you how to cycle through video playback options\. When you use the trigger button in\-game, the television cycles through 2D video, 3D video, 360 video, and an off state\. In Lumberyard, this is achieved with four entities, one for each video playback option\. You can toggle the visibility of each entity to reflect the playback on the television in the level\.

The 2D and 3D videos were created with the same static mesh, but different materials\. The 360 video was created by attaching a sphere to a camera with a 3D video material\.