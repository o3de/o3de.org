# VR Xylophone Level<a name="sample-level-vr-xylophone"></a>

The VR Xylophone level shows you how to create basic VR gameplay with the Lumberyard component entity system\. You use Script Canvas and Lua for VR device tracking, input events, and corresponding gameplay events\.

For more information about installing the project that includes the VR Xylophone level, see [Virtual Reality Samples Project](sample-project-virtual-reality.md)\.

## VR Device Tracking<a name="sample-level-vr-xylophone-vr-device-tracking"></a>

The VR Xylophone level uses the following:
+ `Input Configurator` entity – Handles VR device tracking and input events\.
+ **[Input](component-input.md)** component – Defines two input events \(**FireLargeBox** and **FireSmallBox**\) that are initiated when you use the trigger button on the Oculus or Vive motion controllers\.  
![\[Input component in the VR Xylophone level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-xylophone-level-input-component.png)  
![\[Input bindings file with input event groups in the VR Xylophone level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-xylophone-level-input-event-boxgarden-inputbindings.png)
+ **[Lua Script](component-lua-script.md)** component – Uses the `vrdevice_tracking.lua` script to track the movement and orientation of the VR controllers\. Passes the transforms to specific controller entities\.  
![\[Input and Lua Script components in the VR Xylophone level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-xylophone-level-lua-script-component.png)

## VR Controllers and Projectiles<a name="sample-level-vr-xylophone-controllers-and-projectiles"></a>

The VR Xylophone level uses a `controller_right.slice` for the right controller and a `controller_left.slice` for the left controller\. You can find these slices in the `lumberyard_version\dev\VirtualRealityProject\slices` directory\.

The right and left controllers are set up similarly, except that they spawn different projectiles and use different materials\. The following image shows the entities for the left controller \(green\) and right controller \(red\), as well as their respective projectile entities\.

![\[Entities for left and right controllers and projectile entities in the VR Xylophone level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-xylophone-level-left-right-controllers-and-projectiles.png)

The projectile entities are also set up similarly, except for size and color\. They use the **[Rigid Body](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-rigid-body.html)** component, **[Primitive Collder](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-physics-primitive-collider.html)** and **[Box Shape](component-shapes.md#box-shape-component-properties)** components to collide and interact with the domino entities in a physically realistic way\. Upon spawning, the projectile entities use the **[Script Canvas](component-script-canvas.md)** component to move forward\.

You can find the `projectile_largebox.slice` and `projectile_smallBox.slice` files in the `lumberyard_version\dev\VirtualRealityProject\slices` directory\.

The VR Xylophone level uses the following scripts:
+ `vrdevice_tracking` Lua script – Matches the in\-game movement and orientation of the controller entities with the physical controllers\.
+ Script Canvas graph – Spawns a projectile and plays a spawning sound when an input event is triggered\. This graph is on the controller entity\.
  + In the **Input Handler** node, the **Event Name** is the event that is defined in the **Input Configurator**\.
  + The **Audio Trigger** component specifies the sound to play\.
  + The **Spawner** component specifies the dynamic slice to spawn\.  
![\[Script Canvas graph in the VR Xylophone level to spawn a projectile and play a spawning sound.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-xylophone-script-canvas-graph.png)

## Domino Tiles<a name="sample-level-vr-xylophone-domino-tiles"></a>

The projectile entities interact with the domino tiles\. These tiles are instances of eight slices, each differing in color, letter, and sound pitch\. The sound pitch occurs when the tile's trigger makes contact with another collider\.

Each domino tile slice has a child entity with the **Trigger Area** and **Lua Script** components\. The **Trigger Area** component triggers an event to play the sound that's specified in the `triggerarea_play_sound.lua` script\.

![\[Domino tile slices in the VR Xylophone level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr-xylophone-level-domino-tiles.png)