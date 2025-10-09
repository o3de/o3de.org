---
title: ROS 2 Components
linktitle: ROS 2
description: Using Robot Operating System (ROS 2) components in Open 3D Engine (O3DE).
---

There are multiple ROS 2 related Gems available in O3DE, which provide components that can be used to create and simulate robots. These components allow you to integrate ROS 2 functionality into your O3DE projects, enabling communication with ROS 2 nodes, publishing and subscribing to topics, and simulating various robot behaviors.

ROS 2 Gem components can be divided into the following categories:
-  [Core components](./core), essential to running simulations independent of the type of robot. These components are implemented in the `ROS2` Gem and are required for any ROS 2 simulation.
-  [Sensor components](./sensors), responsible for creating and publishing data of simulated robot sensors. These components are implemented in the `ROS2Sensors` Gem and can be used to simulate cameras, lidars, and other sensors.
-  [Control components](./control), handling movement of mobile bases and robot arms due to control commands. These components are implemented in the `ROS2Controllers` Gem and can be used to simulate robot movement and manipulation.

Additionally, there are other Gems that provide extended functionality for specific use cases, that can be used in conjunction with the ROS 2 components, such as components implemented in `LevelGeoreference` Gem:
-  [GeoReference Level Component](./ros2-georeference.md)

Refer to the [Robotics](/docs/user-guide/interactivity/robotics) documentation to learn more about robotics simulation features of O3DE.
