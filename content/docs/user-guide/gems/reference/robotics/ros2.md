---
linkTitle: ROS 2
title: ROS 2 Gem
description: The ROS 2 Gem helps build robotic simulations with Robot Operating System (ROS) 2 in Open 3D Engine (O3DE).
toc: true
---

<!-- # O3DE ROS2 Gem -->

Open 3D Engine enables robotic simulation thanks to ROS 2 Gem. It has the following features:

* Direct and natural support of ROS 2 ecosystem:
    * No bridges. Your simulation node will function as any other ROS 2 node.
        * Enables you to directly include ROS 2 headers and write ROS 2 code in O3DE.
        * This is also good for performance.
    * Easy way to include ROS 2 dependencies.
* Sensors:
    * Sensor Component serves as a handy abstraction and takes care of publishing as well as common settings such as frequency. 
    * Configurable, extendable implementations of several types of sensors such as Lidar, Camera (including Depth channel), IMU, GNSS.
* Utilities for automated handling of:
    * Simulation time: publishing `/clock` supporting non-real time.
    * Publishing of transformation frames (`/tf`, `/tf_static`).
    * Namespaces: robotic simulation in O3DE is multi-robot by default!
    * Validation for topic and namespace names.
    * Dynamic spawning of robots through ROS 2 services.
* Robot Control Component:
    * A quick to use method of controlling your robot.
    * Supports Twist as well as AckermannDrive message interfaces.
* Vehicle dynamics: 
    * Ackermann Steering, subscribes to message of type [AckermannDrive](http://docs.ros.org/en/api/ackermann_msgs/html/msg/AckermannDrive.html).
    * Differential drive, subscribes to message of type [Twist](http://docs.ros.org/en/noetic/api/geometry_msgs/html/msg/Twist.html).
* URDF/XACRO (experimental).
    * Allows to import robot from URDF format.

## Related topics

| Topic                                                                        | Description                                       |
|------------------------------------------------------------------------------|---------------------------------------------------|
| [Robotics in O3DE](/docs/user-guide/interactivity/robotics)                  | Gems, Templates and Demos for Robotics            |
| [Concepts and components - an overview](/docs/user-guide/interactivity/robotics/concepts-and-components-overview.md) | Overview of concepts and components               |
| [ROS 2 Gem API reference](/docs/api/gems/ros2)                               | ROS 2 Gem API reference (generated documentation) |
