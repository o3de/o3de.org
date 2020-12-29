# PhysX Debug<a name="gems-system-gem-physx-debug"></a>

The PhysX Debug gem provides features to debug visualizations for your PhysX scene geometry, such as the **[PhysX Collider](component-physx-collider.md)** , **[PhysX Rigid Body](component-physx-rigid-body-physics.md)** component, and so on\. 

When you enter console variables or the use the **ImGui** tool, you can view the PhysX debug lines in editor and game modes\. This gem uses data directly from PhysX to show a culled \(limited by proximity to the camera\) view of the simulated world in real time\.

In editor mode, this gem displays PhysX shapes within a given distance of the viewport camera\. In game mode, this gem uses the currently active camera to visualize a culled view of the the PhysX scene\.

![\[PhysX Debug gem in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/physx/gems-system-physx-debug.png)

This gem includes the following features:
+ Visualize debug rendering of physics geometry, such as collision primitives, terrain, shapes, and forces\.
+ Control mechanisms using console variables, the PhysX settings menu, and the **ImGui** tool\.
+ Visualization frustum culling\.
+ PhysX visual debugger hooks and controls using the third\-party tool visual debgger\. 
+ Proximity based debug visualizations of collision meshes\.

**Note**  
This feature is similar to the legacy `p_draw_helpers=1` console variable\.

To enable the PhysX Debug gem, you must first enable the [PhysX](gems-system-gem-physx.md) and ImGui gems\.

For more information, see [Debugging PhysX](debugging-physx.md)\.