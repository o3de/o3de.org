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

| Interface                            | Components                                                                     | Role                                                                                  |
|--------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| __JointsPositionControllerRequests__ | __JointsArticulationControllerComponent__<br/>__JointsPIDControllerComponent__ | Move joints towards desired positions.                                                |
| __JointsManipulationRequests__       | __JointsManipulationComponent__                                                | Hold and publish joints state information, relay commands to controllers              |
| __JointsTrajectoryRequests__         | __JointsTrajectoryComponent__                                                  | Host action server for trajectory commands, control trajectory through goal positions |

## Getting started

If your goal is to simulate a robotic arm, the quickest way to start is to [create a project](/docs/welcome-guide/create/) from Manipulation Template.

__To be detailed when Manipulation Template is ready__

Once your project is up, use the [robot import](importing-robot.md) feature to load your robot of choice into O3DE.

## Running with MoveIt2

![MoveIt2](/images/user-guide/interactivity/robotics/robotic_arm_moveIt.png)

- Install moveIt packages for your ROS distribution:
    ``` 
    sudo apt install ros-${ROS_DISTRO}-moveit 
    ```
- Make sure your entities with joints have joint name filled in __ROS2Frame__. This should happen automatically for imported robots.
- Add JointsTrajectoryComponent and its dependencies. Configure parameters such as action name, starting positions, etc.
- Start simulation in O3DE.
- Run your MoveIt2 launch file. An RViz2 windows should appear.
- Set a new robot arm configuration, click Plan & Execute in RViz2. The robot should move to a new pose.

  ![MoveIt2](/images/user-guide/interactivity/robotics/robotic_arm_moveIt.png)

__To be detailed__

## Related topics

| Topic                   | Description                         |
|-------------------------|-------------------------------------|
| [Grippers](grippers.md) | Simulating robotic grippers in O3DE |


