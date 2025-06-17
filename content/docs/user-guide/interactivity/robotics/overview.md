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
- [Georeferencing Gem](georeference.md), a helper Gem enabling simulated robots to use global positioning devices and geo-reference APIs.
- Asset Gems providing sample ROS 2 prefabs (robots) and scene decorations, including:
  - [ROS 2 Sample Robots Gem](https://github.com/o3de/o3de-extras/tree/main/Gems/ROS2SampleRobots) providing assets of `ProteusRobot`, `ROSBot XL`, and `Panda Franka` robots.
  - [WarehouseAssets](https://github.com/o3de/o3de-extras/tree/main/Gems/WarehouseAssets) and [WarehouseAutomation](https://github.com/o3de/o3de-extras/tree/main/Gems/WarehouseAutomation) Gems providing useful assets for warehouse environments
- 3rd party Gems: 
  - [Robotec GPU Lidar (RGL) Gem](https://github.com/RobotecAI/o3de-rgl-gem) - GPU accelerated LIDAR simulation in O3DE using CUDA.
  - [Robotec Vehicle Dynamics Gem](https://github.com/RobotecAI/o3de-vehicle-dynamics-gem) - simple vehicle controller.

## Templates

There are three templates for robotics:
- [ROS 2 project template](https://github.com/o3de/o3de-extras/tree/main/Templates/Ros2ProjectTemplate):
  - A small warehouse scene with `ROSBot XL` robot (differential drive AMR) and a sample implementation of a ROS 2 _subscriber_ and a ROS 2 _publisher_ linked with ImGui interface.
  - It is the most lightweight and basic robotic project template.
  - It is possible to navigate the AMR with a provided ROS 2 launcher script.
- [Warehouse project template](https://github.com/o3de/o3de-extras/tree/main/Templates/Ros2FleetRobotTemplate):
  - A large warehouse scene ready to spawn multiple `Proteus robots` (differential drive AMRs).
  - It is easy to add more robots using the included spawning component.
  - It is possible to spawn and navigate three AMRs with a provided ROS 2 launcher script.
- [Manipulation project template](https://github.com/o3de/o3de-extras/tree/main/Templates/Ros2RoboticManipulationTemplate):
  - A small room level with a `Panda Franka` robotic arm for R&D in manipulation domain.
  - Suitable for use-cases with robotic arms, presenting a gripper. Items for manipulation are included.
  - It is possible to manipulate the items with a provided ROS 2 launcher script.

## Demos

There are open-source project demonstrating what can be done with the ROS 2 Gem:
- [Robot Vacuum Sample](https://github.com/o3de/RobotVacuumSample): a robot vacuum navigating in a beautiful apartment: 
- [Robot Harvesting Sample](https://github.com/o3de/ROSConDemo): agricultural robots orchestrated through ROS 2 to pick apples in a scenic orchard.
- [Automated Fulfillment Center](https://github.com/RobotecAI/ROSCon2023Demo): robotic arms and Autonomous Mobile Robots working on palletization and intra-logistics.
