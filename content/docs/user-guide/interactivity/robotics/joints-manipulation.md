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

## Manipulation Template

To be detailed.

## Running with MoveIt2

To be detailed.

## Related topics

| Topic                   | Description                         |
|-------------------------|-------------------------------------|
| [Grippers](grippers.md) | Simulating robotic grippers in O3DE |


