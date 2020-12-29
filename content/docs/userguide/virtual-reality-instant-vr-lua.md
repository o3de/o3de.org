# InstantVR Lua Script Properties<a name="virtual-reality-instant-vr-lua"></a>

You can view **instantVR**'s assets in the **Entity Outliner**\. The **instantVR** slice contains a Lua script called `instantVR`, which includes many of the child entities that add controller tracking and provide teleport support\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr/virtual-reality-instant-vr-outliner.png)

The `instantVR` Lua script has the following properties:

**TeleportInputEventNameRight**  
Name of the input event that triggers the right controller teleport\.

**ControllerEntityRight**  
Name of the right controller entity\.

**TeleportUseNavMesh**  
If selected, teleport function uses the navigation area for validation\.  
If you select **TeleportUseNavMesh** without selecting **TeleportUseTerrain**, then teleport ray cast uses only the nav mesh to determine the valid area\. If it finds no nav mesh, it displays an 'invalid' indicator on terrain\.  
If both are selected, then teleport validation uses a ray cast to the terrain and to the navigation mesh\. If both beams hit terrain and nav mesh, then the teleport location is valid, otherwise it is invalid\.

**TeleportEntityInvalid**  
Name of the entity that spawns the invalid teleport location entity\.

**TeleportEntityValid**  
Name of the entity that spawns the valid teleport location entity\.

**TeleportInputEventNameLeft**  
Name of the input event that triggers the left controller teleport\.

**TeleportMaxDistance**  
Maximum distance for teleporting\.

**CameraEntity**  
Name of the camera entity, which determines the transform of the HMD and controllers\.

**TeleportUseTerrain**  
If selected, the teleport function uses the terrain for validation\.  
If you select **TeleportUseTerrain** without selecting **TeleportUseNavMesh**, then the teleport ray cast uses the terrain for validation only\. Teleport will be valid as long as it is in contact with terrain\.  
If both are selected, then teleport validation uses a ray cast to the terrain and to the navigation mesh\. If both beams hit terrain and nav mesh, then the teleport location is valid, otherwise it is invalid\.

**TeleportBeamSpawner**  
The name of the teleport beam arc entity along which to spawn entities, though this does not follow the ray cast line exactly\.

To customize the `instantVR` Lua script, try the following modifications:
+ Change the controllers to a different model by changing the **Static asset** of the **Static Mesh** component\.
+ Change the **TeleportMaxDistance** to a large value\.
+ Deselect **TeleportUseNavMesh** and climb the walls\.
+ Open the **InvalidLocationSpawner** and **ValidLocationSpawner** dynamic slices and change the entities they spawn\.

## InstantVR Known Issue<a name="virtual-reality-instant-vr-knownissues"></a>

If you modify the size and position of the navigation area in the Lumberyard Editor, you must manually rebuild by clicking **Game**, **AI**, **Generate Triangulation**\. Restarting the Lumberyard Editor or reloading the level also automatically rebuilds the navigation area\.