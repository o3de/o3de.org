---
linkTitle: Global Configuration
title: PhysX System Global Configuration
description: ' Configure global settings for the PhysX system in Open 3D Engine (O3DE). '
weight: 200
toc: true
---

On the **Global Configuration** tab, you can configure global PhysX settings and debug visualization settings.

![PhysX Global Configuration tab](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-1.png)

## System configuration 

The following table describes the **System Configuration** settings.

| Property | Description |
| - | - |
| **Max Time Step** `m_maxTimeStep` | Specifies the largest time step that the simulation can process. This setting sets a limit for how long a simulation step can be, and prevents instability in the simulation if `m_fixedTimeStep` is not set. If the time between frames is greater than `m_maxTimeStep`, the simulation step's time is limited to this value. The value should be a small increment. The default value is `0.05` (1/20th of a second). |
| **Fixed Time Step** `m_fixedTimeStep` | Sets the frequency of the PhysX simulation. The default is `0.017` (1/60th of a second). Lower values result in more accurate simulations, but at a higher runtime cost. Higher values can cause results that are less stable. If this value is set to `0`, the simulation uses the time between frames, which can vary. If the frame time is greater than this value, O3DE splits the time into the number of steps yielded by the following calculation: <pre>frame_time/m_fixedTimeStep</pre> |
| **Raycast Buffer Size** | Maximum number of hits that can be returned from a raycast query.  The default is `32`. |
| **Shapecast Buffer Size** | Maximum number of hits that can be returned from a shapecast query.  The default is `32`. |
| **Overlap Query Buffer Size** | Maximum number of hits that can be returned from an overlap query.  The default is `32`. |

## Scene configuration 

The following table describes the settings for **Scene Configuration**.

| Property | Description |
| - | - |
| **Gravity** |  The world space gravity vector in meters per second squared. The default **X**, **Y**, and **Z** values are `0.0`, `0.0`, and `-9.81`. |
| **Continuous Collision Detection (CCD)** |  Enables continuous collision detection (CCD) which can improve simulation results at the cost of performance. Disabled by default. |
| **Persistent Contact Manifold** |  If enabled, the data of colliding surfaces is preserved between frames. This is enabled by default and it's recommended to keep this setting enabled. Persistent manifolds store the contact data created in one time step for potential use in subsequent time steps. This requires more memory for simulation, but can improve the speed and accuracy of collision calculations. If a collision occurs, the data is stored in a persistent contact manifold for use in the next time step. If the surfaces are no longer colliding in the next time step, the data is discarded. Otherwise, the data is used to speed up the calculation, improve accuracy, and reduce jitter and other unwanted simulation artifacts. |
| **Bounce Threshold Velocity** |  The relative velocity below which colliding objects will not bounce. The default is `2.0`.  |

## Editor configuration 

The following options control the appearance of PhysX debug visualizations in **O3DE Editor**, including the **Debug Draw COM** (center of mass) option of the [PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/) component.

{{< note >}}
These options are part of the [PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/) Gem and are not related to the [Debug Draw](/docs/user-guide/gems/reference/debug/debug-draw/) Gem or the [PhysX Debug](/docs/user-guide/gems/reference/physics/nvidia/physx-debug/) Gem.

The joint hierarchy options apply to PhysX joints only. They do not apply to actor skeletons or simulated object joints.
{{< /note >}}

| Property | Description |
| - | - |
| **Debug Draw Center of Mass Size** | The size of the debug draw circle that represents the center of the mass. Possible values are from `0.1` to `5.0` meters.  The default value is `0.1`.  |
| **Debug Draw Center of Mass Color** | The color of the debug draw circle that represents the center of mass. To specify a color, enter its RGB values in the text box. The icon displays the selected color. The default values are `255`, `0`, `0` (red).  |
| **Global Collision Debug** | Set the global collision debug draw visibility options.<br />**Enable all colliders** Displays all PhysX colliders, including colliders set as hidden.<br />**Disable all colliders** Hides all PhysX colliders, including colliders set as visible.<br />**Set manually** You can set PhysX collider visibility on each collider component individually. This is the default setting. |
| **Global Collision Debug Color Mode** | Set the debug color mode.<br />**Material Color Mode** Uses physics material's debug color.<br />**Error Mode** Shows glowing red for error cases such as meshes with too many triangles. |
| **Display Joints Hierarchy** | When enabled, PhysX joint lead-follower connections are displayed in the viewport as a line with two colors. One color for the lead and one color for the follower. Enabled by default. |
| **Joints Hierarchy Lead Color** | The color of the lead half of a lead-follower joint connection line. |
| **Joints Hierarchy Follower Color** | The color of the follower half of a lead-follower joint connection line. |
| **Joints Hierarchy Distance Threshold** | The minimum distance required to draw the line for the follower connection. Distances shorter than this threshold only draw the line for the lead connection. The default is `1.0`. |

## Wind configuration 

The following table describes the settings for **Wind Configuration**. For more information, refer to [Create Wind Forces](/docs/learning-guide/tutorials/physx/wind-provider).

| Property | Description |
| --- | --- |
| **Global wind tag** | This tag is used by PhysX wind system to specify entities that provide *global* wind forces. |
| **Local wind tag** | This tag is used by PhysX wind system to specify entities that provide wind forces *localized* to a collider volume. |
