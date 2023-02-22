---
linkTitle: ROS 2
title: ROS 2 Gem
description: The ROS 2 Gem helps build robotic simulations with Robot Operating System (ROS) 2 in Open 3D Engine (O3DE).
toc: true
---

<!-- # O3DE ROS2 Gem -->

The **ROS 2** Gem provides integration with the [Robot Operating System (ROS) 2](https://docs.ros.org/en/rolling/index.html) library and enables design of simulation of robotics systems.
It features configurable components for sensor simulation, control of different type of drives as well as manipulator arms,
dynamic spawning of robots, and plenty of utilities.

## Features

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

## Example project

You can test O3DE ROS 2 Gem with the [Robot Vacuum Sample](https://github.com/o3de/RobotVacuumSample) project. This project allows you to run robot navigation. All necessary assets are included.

## Related topics

| Topic                                                                                                                  | Description                                                  |
|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [ROS2 Gem User Guide](ros2-gem-user-guide.md)                                                                          | The complete C++ API reference for the O3DE Multiplayer Gem. |
| [Gem documentation](https://github.com/o3de/o3de-extras/blob/development/Gems/ROS2/docs/guides/development_in_clion.md)| CLion IDE project setup to support the Gem                   |
| [Open 3D Engine Contributor guide](/docs/contributing)                                                                 | Read this guide if you wish to contribute to the Gem         |
