# VR Islands Level<a name="sample-level-vr-islands"></a>

The VR Islands level \(`VR_Islands_Sample`\) shows you how to create a simple VR level with the `instantvr` entity and physics collision on controllers\. This level features floating islands between which a player can teleport with the trigger button on the Oculus or Vive motion controllers\. The player can hold the trigger button to pick the location and then release the button to initiate the teleport\.

**Note**  
This level uses Script Canvas and Lua for game logic\. [Legacy systems](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/introduction.html) have been replaced or removed, with the exception of the navigation mesh\. The **[VR Preview](component-vrpreview-component.md)** component generates the navigation mesh, which is required for teleporting in gameplay\.

This level uses an `instantvr` slice that has the following child entities:
+ `Controller_One` – Represents the player's right hand\.
+ `Controller_Zero` – Represents the player's left hand\. 
+ `Camera` – Represents the player's head\. 
+ `InvalidLocationSpawner` – Spawns an invalid location marker when the player teleports within the terrain or navigation mesh\.
+ `ValidLocationSpawner` – Spawns a valid location marker when the player teleports within the terrain or navigation mesh\.
+ `InputConfiguration` – Contains the input bindings for teleportation events\.

For more information about installing the project that includes the VR Islands level, see [Virtual Reality Samples Project](sample-project-virtual-reality.md)\.

## Using the InstantVR Entity<a name="sample-level-vr-islands-using-instantvr-entity"></a>

The VR Islands level is created with the `instantvr` entity, which has the following components:
+ **[Lua Script](component-lua-script.md)** – This component uses the `instantvr.lua` script for VR device tracking and teleportation functionality\. You can find the script in the `lumberyard_version\dev\VirtualRealityProject\Scripts\vr` directory\.  
![\[Lua Script component that shows the properties for the instantvr entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/instantvr-lua-script-component-example.png)
+ **[VR Preview](component-vrpreview-component.md)** – This component automatically generates a 50x50 meter navigation area, and a navigation mesh within the navigation area\. The navigation mesh is required for the `instantvr.lua` script to detect valid teleportation locations\. 
**Note**  
You must select the **Static** check box on the **[Transform](component-transform.md)** component for all entities in the navigation area\. This ensures that the navigation mesh generates correctly\. The **Static** check box is cleared by default\.  
![\[Example of the navigation mesh and the navigation area for the instantvr entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/instantvr-navigation-area-navigation-mesh-example.png)

## Using the HideOcean Entity<a name="sample-level-vr-islands-using-hideocean-entity"></a>

The VR Islands level includes a `HideOcean` entity that allows you to hide the ocean when the level runs in VR mode\.

**To hide the ocean**

1. Open the **Console Variables** window\. For instructions, see [Viewing the Console Window](console-intro.md#viewing-the-console-window)\.

1. In the **Console Variables** window, search for the `e_WaterOcean` console variable\.

1. Set the `e_WaterOcean` console variable to **0**\.