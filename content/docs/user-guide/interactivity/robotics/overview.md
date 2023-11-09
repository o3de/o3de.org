---
linkTitle: Overview
title: Robotics Overview
description: An overview of concepts, Gems, templates and demos for robotics in Open 3D Engine (O3DE).
weight: 100
---

The ROS 2 Gem helps to build robotic simulations with [ROS 2 / Robot Operating System](https://www.ros.org/).

The ROS 2 Gem contains a number of components to build robotic simulations, such as sensors,
controllers of different types of drives, manipulator arms, and dynamic spawning of robots. It also comes with plenty of utilities.

## Gems

There are several Gems to power robotic simulations with **Open 3D Engine (O3DE)**.
- [ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2), the central and the most important one. It provides most features and other robotics Gems depend on it. 
- Project Templates for Robotics and connected Asset Gems. These provide a good starting point for simulation development and a set of assets to use.
- Robots ready to use in your simulation:
  - [OTTO Motors robots](https://github.com/RobotecAI/o3de-otto-robots-gem), OTTO 600 and OTTO 1500.
  - [Universal Robots manipulator arms](https://github.com/RobotecAI/o3de-ur-robots-gem), UR 10 and UR 20.
- [Human Worker Gem](https://github.com/RobotecAI/o3de-humanworker-gem), including animation and navigation. 
- [Warehouse Automation Gem](https://github.com/o3de/o3de-extras/tree/development/Gems/WarehouseAutomation), which includes conveyor belt and other similar assets useful for creating automated warehouses.
- 3rd party Gems: 
  - [Robotec GPU Lidar (RGL) Gem](https://github.com/RobotecAI/o3de-rgl-gem) - GPU accelerated LIDAR simulation in O3DE using CUDA.

## Templates

There are three templates for robotics:
- [ROS 2 project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2ProjectTemplate):
  - A simple interior scene with ROSBot XL robot:
  - It is the most lightweight and basic robotic project template.
  - The project starts with a differential drive (skid steering) robot.
- [Warehouse project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2FleetRobotTemplate):
  - A photorealistic warehouse with a Proteus robot.
  - Easily customizable, extendable environment.
  - It is easy to add more robots using the included spawning component.
- [Manipulation project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2RoboticManipulationTemplate):
  - Two levels: Manipulation R&D and Palletization.
  - Suitable for use-cases with robotic arms.
  - Two robotic arm models, two kinds of grippers and items for manipulation are included.

## Demos

There are open-source project demonstrating what can be done with the ROS 2 Gem:
- [Robot Vacuum Sample](https://github.com/o3de/RobotVacuumSample): a robot vacuum navigating in a beautiful apartment: 
- [Robot Harvesting Sample](https://github.com/o3de/ROSConDemo): agricultural robots orchestrated through ROS 2 to pick apples in a scenic orchard.

