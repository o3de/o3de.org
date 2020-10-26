# VR Box Garden Level<a name="sample-level-vr-box-garden"></a>

The VR Box Garden level shows you how to use the Lumberyard component entity system to set up a VR playspace, basic VR gameplay, and controller tracking\. You use Script Canvas and Lua for VR device tracking, input events, and corresponding gameplay events\.

For more information about installing the project that includes the VR Box Garden level, see [Virtual Reality Samples Project](sample-project-virtual-reality.md)\.

## VR Device Tracking and Controller Gameplay<a name="sample-level-vr-box-garden-vr-device-tracking-controller-gameplay"></a>

The VR Box Garden level uses the following:
+ `Input Configurator` entity – Handles VR device tracking and input events\.
+ **[Input](component-input.md)** component – Defines input events that are initiated when you use the trigger button on the Oculus or Vive motion controllers\.
+ **[Lua Script](component-lua-script.md)** component – Uses the `vrdevice_tracking.lua` script to track the movement and orientation of the VR controllers\. Passes the transforms to specific controller entities\.

The level uses a `controller_right.slice` for the right controller and a `controller_left.slice` for the left controller\. These controllers listen for input events and spawn projectiles when an event is detected\. The projectile entities use the **[Script Canvas](component-script-canvas.md)** component to move forward\.

All slices for the VR Box Garden level are located in the `lumberyard_version\dev\VirtualRealityProject\slices` directory\.

The VR Box Garden level uses the following scripts:
+ `vrdevice_tracking` Lua script – Matches the in\-game movement and orientation of the controller entities with the physical controllers\.
+ `input_play_sound` Lua script – Plays a spawning sound when an input event is triggered\. The **Lua Script** component specifies the sound to play\.
**Note**  
To play sound correctly, you must add both the **[Audio Proxy](component-audio-proxy.md)** component and the **[Audio Trigger](component-audio-trigger.md)** component on the entity\.
+ Script Canvas graph – Spawns a projectile\. The **[Spawner](component-spawner.md)** component specifies the dynamic slice to spawn\. This graph is on the controller entity\. In the **Input Handler** node, the **Event Name** is the event that is defined in the **Input Configurator**\.

## VR Playspace<a name="sample-level-vr-box-garden-vr-playspace"></a>

The level's playspace includes the following:
+ Base – Uses the `Playspace_Base` entity that has a `vrplayspace_base.lua` script\. The Lua script adjusts the scale of the static mesh to match the dimension of the VR playspace\. The dimension is derived from the position of four corners of the playspace from the VR device\.
+ Posts – Spawns at runtime from the `Playspace_Posts` entity\. This entity uses a Lua script to calculate the number and position of posts, and spawn the posts along the playspace edges at a fixed interval\.
+ Corners – Uses a Lua script to locate the corner position and move to the correct position\. There are four entities, one for each corner\. You can use the Lua script to assign a number for each corner\.

![\[Example of the playspace area in the VR Box Garden level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-box-garden-level-playspace-example.png)

## Procedurally\-Spawned Stacking Boxes<a name="sample-level-vr-box-garden-spawned-stacking-boxes"></a>

The level uses six `Box Spawner` entities with the `random_spawner.lua` script to demonstrate how to procedurally generate a specified number of boxes at runtime\. These boxes are used in\-game as shooting targets\.

You can modify the following parameters in the **Spawner** component to affect random generation\.

![\[Spawner component parameters in the VR Box Garden level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-box-garden-level-spawner-parameters.png)

For more information, see [Spawner Component Properties](component-spawner.md#component-spawner-properties)\.

To enable triggering spawn events, you can add a **Lua Script** component to the entity with the **Spawner** component attached\. The spawned box uses a dynamic slice called `greybox.slice`\.

![\[Lua Script component parameters to trigger spawn events.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-box-garden-level-lua-script-spawn-entity.png)