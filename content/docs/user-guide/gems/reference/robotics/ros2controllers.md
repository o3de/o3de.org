---
linkTitle: ROS 2 Controllers
title: ROS 2 Controllers Gem
description: The ROS 2 Controllers Gem extends the ROS 2 Gem with robot control, manipulation, grippers, and vehicle dynamics.
toc: true
---

<!-- # O3DE ROS 2 Controllers Gem -->

The **ROS 2 Controllers Gem** uses the [Robot Operating System (ROS)](https://docs.ros.org/en/rolling/index.html) to enable
robot control, manipulation, grippers, and vehicle dynamics in **Open 3D Engine (O3DE)**. 
It requires the [ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2.md) to be enabled.

The ROS 2 Controllers Gem has the following features:
* Robot Control Component:
    * Provides a quick-to-use method of controlling your robot.
    * Includes support for Twist and AckermannDrive message interfaces.
* Manipulation and Grippers:
    * Support for robot arms and other joint systems.
    * Configurable components, easy to integrate with MoveIt2.
    * Finger and vacuum gripper.
* Vehicle dynamics: 
    * Ackermann Steering subscribes to the message of type [AckermannDrive](http://docs.ros.org/en/api/ackermann_msgs/html/msg/AckermannDrive.html).
    * Differential drive subscribes to the message of type [Twist](http://docs.ros.org/en/noetic/api/geometry_msgs/html/msg/Twist.html).

## Related topics

| Topic                                                                                                           | Description                                                                                       |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Robotics in O3DE](/docs/user-guide/interactivity/robotics)                                                     | Learn about robotics in O3DE, including Gems, Templates and demos to help you get started.        |
| [ROS 2 Gem Concepts and Structure](/docs/user-guide/interactivity/robotics/concepts-and-components-overview.md) | Overview of the concepts and structure of the ROS 2 Gem, including an overview of its components. |
| [Joints Manipulation](/docs/user-guide/interactivity/robotics/joints-manipulation.md)                           | Overview of components, which allows you to control robotic joints systems.                       |
| [Vehicle Dynamics](/docs/user-guide/interactivity/robotics/vehicle-dynamics.md)                                 | Overview of components, which allows you to control vehicles.                                     |
