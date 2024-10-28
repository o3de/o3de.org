---
linkTitle: Overview
title: Robotics Overview
description: An overview of concepts, Gems, templates and demos for robotics in Open 3D Engine (O3DE).
weight: 100
---

The ROS 2 Gem helps to build robotic simulations with [ROS 2 / Robot Operating System](https://docs.ros.org/en/jazzy/index.html).

The ROS 2 Gem contains a number of components to build robotic simulations, such as sensors,
controllers of different types of drives, manipulator arms, and dynamic spawning of robots. It also comes with plenty of utilities.

## Gems

There are several Gems to power robotic simulations with **Open 3D Engine (O3DE)**.
- [ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2), the central and the most important one. It provides most features and other robotics Gems depend on it. 
- Asset Gems providing sample ROS 2 prefabs (robots) and scene decorations, including `ProteusRobot`, `RosRobotSample`, `WarehouseAssets`, `WarehouseAutomation`, and `WarehouseSample`.
- 3rd party Gems: 
  - [Robotec GPU Lidar (RGL) Gem](https://github.com/RobotecAI/o3de-rgl-gem) - GPU accelerated LIDAR simulation in O3DE using CUDA.
  - [Robotec Vehicle Dynamics Gem](https://github.com/RobotecAI/robotec-vehicle-dynamics-gem) - simple vehicle controller.

## Templates

There are three templates for robotics:
- [ROS 2 project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2ProjectTemplate):
  - A simple interior scene with ROSBot XL robot, a differential drive (skid steering) robot.
  - It is the most lightweight and basic robotic project template.
- [Warehouse project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2FleetRobotTemplate):
  - A photorealistic warehouse with a Proteus robot.
  - It is easy to add more robots using the included spawning component.
- [Manipulation project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2RoboticManipulationTemplate):
  - Two levels for use-cases with robotic arms: Manipulation R&D and Palletization.
  - Suitable for use-cases with robotic arms, presenting two kinds of grippers. Items for manipulation are included.

## Demos

There are open-source project demonstrating what can be done with the ROS 2 Gem:
- [Robot Vacuum Sample](https://github.com/o3de/RobotVacuumSample): a robot vacuum navigating in a beautiful apartment: 
- [Robot Harvesting Sample](https://github.com/o3de/ROSConDemo): agricultural robots orchestrated through ROS 2 to pick apples in a scenic orchard.
- [Automated Fulfillment Center](https://github.com/RobotecAI/ROSCon2023Demo): robotic arms and Autonomous Mobile Robots working on palletization and intra-logistics.
