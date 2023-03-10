---
linkTitle: Overview
title: Robotics Overview
description: An overview of concepts, Gems, templates and demos for robotics in Open 3D Engine (O3DE).
---

The ROS 2 Gem helps to build robotic simulations with [ROS 2 / Robot Operating System](https://www.ros.org/).

The ROS 2 Gem contains a number of components to build robotic simulations, such as sensors,
control of different type of drives, manipulator arms, and dynamic spawning of robots. It also comes with plenty of utilities.

## Gems

There are several Gems to power robotic simulations with **Open 3D Engine (O3DE)**.
- [ROS 2 Gem](/docs/gems/reference/ros2), the central and the most important one. It provides most features and other robotics Gems depend on it. 
- Project Templates for Robotics and connected Asset Gems. These provide good starting point for simulation development and a set of assets to use.
- 3rd party Gems: 
  - [Robotec GPU Lidar (RGL) Gem](https://github.com/RobotecAI/o3de-rgl-gem) - GPU accelerated LIDAR simulation in O3DE using CUDA.

## Templates

There are two templates for robotics:
- [ROS 2 project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2ProjectTemplate):
  - A simple interior scene with ROSBot XL robot:
  - It is the most lightweight and basic robotic project template.
  - The project starts with a differential drive (skid steering) robot.
- [Warehouse project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2FleetRobotTemplate):
  - A photorealistic warehouse with a Proteus robot.
  - Easily customizable, extendable environment.
  - It is easy to add more robots using the included spawning component.

## Demos

There are open-source project demonstrating what can be done with the ROS 2 Gem:
- [Robot Vacuum Sample](https://github.com/o3de/RobotVacuumSample): a robot vacuum navigating in a beautiful apartment: 
- [Robot Harvesting Sample](https://github.com/o3de/ROSConDemo): agricultural robots orchestrated through ROS 2 to pick apples in a scenic orchard.

