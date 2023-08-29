---
linkTitle: Joints Manipulation 
title: Joints Manipulation
description: Controlling joint systems such as manipulator arms with ROS 2 Gem Open 3D Engine (O3DE).
toc: true
weight: 510
---

## Overview

Manipulating joints is crucial for applications involving robotic arms or other joint systems such as legged locomotion.
O3DE supports control of joint systems with ROS through packages such as [ros2_controllers](https://github.com/ros-controls/ros2_controllers),
and through integration with [MoveIt2](https://moveit.ros.org/).

### Supported features

With manipulation components, you can:
- Publish [JointState](https://docs.ros2.org/latest/api/sensor_msgs/msg/JointState.html) ROS messages automatically with __JointsManipulationComponent__.
- Control joint systems through [FollowJointTrajectory](https://github.com/ros-controls/control_msgs/blob/humble/control_msgs/action/FollowJointTrajectory.action) ROS action.
- Control systems based on articulations as well as hinge and prismatic joints.
- Extend interfaces for developers to implement your own control components through __JointsManipulationRequests__ and __JointsPositionControllerRequests__.
- Use manipulation components in multi-robot scenarios.

### Limitations

Manipulation components only work with single degree of freedom joints.

### Components and their interactions

Movement of joints is handled through a set of interfaces and components that implement them.

| Interface                            | Components                                                                     | Role                                                                                           |
|--------------------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| __JointsPositionControllerRequests__ | __JointsArticulationControllerComponent__<br/>__JointsPIDControllerComponent__ | Move joints towards desired positions.                                                         |
| __JointsManipulationRequests__       | __JointsManipulationComponent__                                                | Hold and publish joints state information, relay commands to controllers.                      |
| __JointsTrajectoryRequests__         | __JointsTrajectoryComponent__                                                  | Host action server for trajectory commands, control trajectory through a sequence of positions. |

## Simulating joint systems

### Start quickly with Manipulation Template

If your goal is to simulate a robotic arm, the quickest way to start is to [create a project](/docs/welcome-guide/create/) from Manipulation Template.

If you followed the steps of [project configuration](project-configuration.md), your environment variables for `O3DE_HOME` and `PROJECT_PATH` will be set, and the templates registered.
Create a new project with the following command:

```shell
${O3DE_HOME}/scripts/o3de.sh create-project --project-path $PROJECT_PATH --template-name Ros2RoboticManipulationTemplate
```

The template comes with a couple of examples which you can run following its [README](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2RoboticManipulationTemplate).

### Configure your robot

#### Import the robot
Once your project is up, use the [robot import](importing-robot.md) feature to load your robot of choice into O3DE.
Make sure that the checkbox ```Use articulation for joints and rigid bodies``` is checked on the last page of the importer.
Using articulations is strongly recommended for stable simulation of robotic arms and other joint systems.

#### Add necessary components
If the import proceeded without issues, open the root entity of your newly created prefab and add three new components:
- `JointsArticulationControllerComponent` to control the robot`s movement.
- `JointsTrajectoryComponent` to listen for the MoveIt trajectory messages.
- `JointsManipulationEditorComponent` which publishes ```joint_states``` and sets the initial position.

#### Enable motors in joints

Enable motors on all joints and set ```motor force limit```, ```stiffness``` and ```damping``` values. Joints with motors enabled will keep their 
set position.

#### Set initial positions and topic name

- In the `JointsManipulationEditorComponent`, add initial positions for all joints.
Joint names can be found in the prefabs entities inside the `ROS2FrameComponent` joint name. The initial positions are in radians.  
- In the `JointsTrajectoryComponent`, set the topic for controlling the trajectory.
Typically, this topic name ends with ```joint_trajectory_controller```, but should be same as in your MoveIt configuration files.  

#### Start the simulation

Start the simulation and see as the robot sets itself into its initial position. If something is not right, check the O3DE console for logs, which include all joint names.
The robot is now ready for being controlled using MoveIt.

### Running with MoveIt2

![MoveIt2](/images/user-guide/interactivity/robotics/robotic_arm_moveIt.png)

Install moveIt packages for your ROS distribution:
```shell
sudo apt install ros-${ROS_DISTRO}-moveit ros-${ROS_DISTRO}-moveit-resources
```

Following that, prepare MoveIt launch files. This can be achieved by creating the files manually, using configuration provided with your robot,
or using the [MoveIt Setup Assistant](https://moveit.picknik.ai/main/doc/examples/setup_assistant/setup_assistant_tutorial.html).

You can see two examples in the [Manipulation Template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2RoboticManipulationTemplate).

Finally, run the launch file and control your simulated joint system with MoveIt.

![MoveIt2](/images/user-guide/interactivity/robotics/rviz2_moveit.png)

## Related topics

| Topic                   | Description                         |
|-------------------------|-------------------------------------|
| [Grippers](grippers.md) | Simulating robotic grippers in O3DE |


