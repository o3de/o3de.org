# Global Configuration<a name="physx-configuration-global"></a>

On the **Global Configuration** tab, you can configure world settings and editor settings\.

![\[PhysX Global Configuration tab\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-1.png)

## World Configuration<a name="physx-configuration-global-world"></a>

The following table describes the settings for **World Configuration**\.


****  

| Property | Description | 
| --- | --- | 
|  **Max Time Step** `m_maxTimeStep`  |  Specifies the largest time step that the simulation can process\. This setting prevents instability in the simulation if `m_fixedTimeStep` is not set\. It also prevents the simulation from taking too long\. If the time between frames is greater than `m_maxTimeStep`, the time is limited to this value\. Specify small increments\.  The default is `0.05` \(1/20th of a second\)\.  | 
|  **Fixed Time Step** `m_fixedTimeStep`  |  Controls the frequency of the interval at which Lumberyard does the simulation\. The default is `0.017` \(1/60th of a second\)\.    A lower value results in a more accurate simulation, but at a higher runtime cost\.   Higher values can cause results that are less stable\.   If this value is set to `0`, the simulation does not use the fixed time and uses the time between frames, which can vary\.   If the frame time is greater than this value, Lumberyard splits the time to the number of steps yielded by the following calculation: <pre>frame_time/m_fixedTimeStep</pre>     | 
| Gravity |  Gravity vector in the world\.  The default **X**, **Y**, and **Z** values are `0.0`, `0.0`, and `-9.81`\.  | 
| Raycast Buffer Size |  Maximum number of hits that can be returned from a raycast query\.  The default is `32`\.  | 
| Shapecast Buffer Size |  Maximum number of hits that can be returned from a shapecast query\.  The default is `32`\.  | 
| Overlap Query Buffer Size |  Maximum number of hits that can be returned from an overlap query\.  The default is `32`\.  | 
| Continuous Collision Detection |  If set, enables continuous collision detection in the world\.  Disabled by default\.  | 
| Persistent Contact Manifold |  If set, attempts to improve the calculation of the entities that are colliding and preserves this data between frames\.  Enabled by default, which is the recommended setting\. Persistent manifolds store the contact data created in one frame for potential reuse in subsequent frames\. For example, if the corner of box A collides with the side of box B, the contact data is stored and the manifold stores the collision point\. If box A's corner no longer collides in approximately in the same location in the next frame, the data is disregarded\. If box A moves too far \(for example, if it rotates so far that the corner no longer touches\), that data is discarded\. Otherwise, the manifold provides faster collision results by using the data from the previous frame to calculate the collision\. Although persistent manifolds require more memory, they improve performance and the accuracy of the simulation by reducing jitter and other unwanted physics artifacts\.  | 

## Editor Configuration<a name="physx-configuration-global-editor"></a>

The following options relate to the **Debug Draw COM** \(center of mass\) option of the [PhysX Rigid Body](component-physx-rigid-body-physics.md) component\.


****  

| Property | Description | 
| --- | --- | 
| Debug Draw Center of Mass Size  |  The size of the debug draw circle that represents the center of the mass\. Possible values are from `0.1` to `5.0` meters\.  The default value is `0.1`\.  | 
| Debug Draw Center of Mass Color  |  The color of the debug draw circle that represents the center of mass\. To specify a color, enter its RGB values in the text box\. The color of the icon next to the text box shows the color that you entered\. The default values are `255`, `0`, `0` \(red\)\.  | 

**Note**  
These options are part of the PhysX gem and are not related to the Debug Draw gem or the [PhysX Debug](gems-system-gem-physx-debug.md) gem\.