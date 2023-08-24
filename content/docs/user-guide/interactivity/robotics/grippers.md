---
linkTitle: Grippers 
title: Grippers
description: Simulating robotic grippers with ROS 2 Gem Open 3D Engine (O3DE).
toc: true
weight: 520
---

## Overview

Grippers are one of the most widely used effectors in robotic manipulation. 
The simulated robotic grippers are controlled by ROS 2 action servers that allow the user to track the current status of the gipping operation.
The API that allows to control of the gripper using the above-mentioned action server is available in [control_msgs](https://github.com/ros-controls/control_msgs/blob/master/control_msgs/action/GripperCommand.action).
### Supported features

Two grippers are currently simulated :
 - Vacuum gripper
 - Finger gripper

#### Vacuum gripper
The vacuum gripper affects the manipulated object with a fixed joint.
The fixed joint is an equivalent to a vacuum that is created and attaches the object to the sucker.
The vacuum gripper has a very limited range of operation - the seal that is essential to create a vacuum needs to be created with precision movement.
To simulate such behavior the Vacuum Gripper component has the following parameters:
 - Effector Trigger Collider
 - Effector Articulation link

The effector trigger collider is an entity with a PhysX collider component. \
The PhysX collider component has to be set to be a **trigger**. Please refer to [PhysX Collider component section](/docs/user-guide/components/reference/physx/collider/) \
The PhysX collider component needs to be adjusted to the expected range of the simulated gripper. \
The sample configuration of the trigger collider is shown below:

![Gripper Screenshot](/images/user-guide/interactivity/robotics/gripper_screen.svg)\
The effector articulation link is an entity with PhysX Articulation Link. 
This entity will be a parent to the joint which is created with the manipulated object.

**Note that** objects that are to be gripped in your simulation needs to have a "Grippable" tag added to [Tag Component](/docs/user-guide/components/reference/gameplay/tag/):\
![Gripper tag](/images/user-guide/interactivity/robotics/tag.png)

To summarize here is a sample configuration of the vacuum gripper from ROS2 Manipulation Template.\
![Gripper Config](/images/user-guide/interactivity/robotics/vacuumGripperConfig.png)


#### Finger gripper

Finger gripper affects manipulated objects with collision and contact. 
It is a component that controls the motor at the top of the PhysX Articulation link that is attached to the same entity tree.

The Finger Gripper component has the following parameters:
- Velocity epsilon
- Goal tolerance
- Stall time

Those three values are necessary to fine-tune the feedback provided by the gripper.
Velocity epsilon is a maximum rate of movement that considers the gripper to be stationary. \
Goal tolerance is the maximum distance to consider that the gripper reached a goal. \
Stall time is the minimum time used to determine if the gripper is stationary or reached goal.

#### Gripper action server
The Gripper action server is a component that internally communicates with the Vacuum gripper or the Finger gripper and exposes their API as an action server to ROS.
It has one parameter called Gripper Action server which is the name of the action server.
### Limitations 

- Currently, both grippers work only with PhysX articulations. 
- They can interact with rigid bodies and articulations but can be attached to articulation links only.
- Vacuum gripper can grip only objects with a "Grippable" tag.

## Running with MoveIt2

The MoveIt2 framework can be configured to have a move group that can plan the movement of the gripper. 
Such a move group is implemented in [ROS 2 launch](https://github.com/o3de/o3de-extras/blob/development/Templates/Ros2RoboticManipulationTemplate/Template/Examples/panda_moveit_config_demo.launch.py) file provided with [Ros2RoboticManipulationTemplate](https://github.com/o3de/o3de-extras/blob/development/Templates/Ros2RoboticManipulationTemplate/README.md)  
In provided example, in the "MotionPlanning" plugin in Rviz2 one can change the "Planning Group" to hand.
Next, the joints of the gripper can be moved using the "Joints" tag.

![Panda Gripper](/images/user-guide/interactivity/robotics/panda_gripper.png)

See [Joints Manipulation](joints-manipulation.md) to learn more about integration and control with MoveIt2.