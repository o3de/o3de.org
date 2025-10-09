---
linkTitle: ROS 2
title: ROS 2 Gem
description: The ROS 2 Gem helps build robotic simulations with Robot Operating System (ROS) 2 in Open 3D Engine (O3DE).
toc: true
---

<!-- # O3DE ROS 2 Gem -->

The **ROS 2 Gem** uses the [Robot Operating System (ROS)](https://docs.ros.org/en/rolling/index.html) to enable robotic simulation in **Open 3D Engine (O3DE)**. 

The ROS 2 Gem has the following features:
* Direct and natural support of the ROS 2 ecosystem:
    * Does not use any bridges to communicate between ROS and O3DE. A simulation node will function as any other ROS 2 node.
        * Enables you to directly include ROS 2 headers and write ROS 2 code in O3DE.
        * Having no bridge improves communication performance.
        * Custom messages, services, and actions just work!
    * Provides an easy way to include ROS 2 dependencies.
* Sensors:
    * Are abstracted through the Sensor Component Base, which takes care of the publishing of sensor data and common settings such as frequency.
* Utilities for automated handling of:
    * Simulation time: - publishing `/clock`, with support for non-real time.
    * Computing and publishing of transformation frames (`/tf`, `/tf_static`).
    * Namespaces- allowing multi-robot simulation in O3DE by default!
    * Validation for topic and namespace names.
    * Dynamic spawning of robots through ROS 2 services.

This Gem is a base for any ROS 2 project. It provides the necessary components and functionality to build robotic simulations effectively. It can be extended with additional features available in [ROS 2 Sensors Gem](/docs/user-guide/gems/reference/robotics/ros2sensors.md) and [ROS 2 Controllers Gem](/docs/user-guide/gems/reference/robotics/ros2controllers.md).

## Related topics

| Topic                                                                                                           | Description                                                                                      |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [Robotics in O3DE](/docs/user-guide/interactivity/robotics)                                                     | Learn about robotics in O3DE, including Gems, Templates and demos to help you get started.       |
| [ROS 2 Gem Concepts and Structure](/docs/user-guide/interactivity/robotics/concepts-and-components-overview.md) | Overview of the concepts and structure of the ROS 2 Gem, including an overview of its components |
| [ROS 2 Gem API reference](/docs/api/gems/ros2)                                                                  | Generated documentation for ROS 2 Gem's API reference.                                           |
