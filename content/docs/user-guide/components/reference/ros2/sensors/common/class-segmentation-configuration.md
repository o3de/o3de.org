---
title: Class Segmentation Configuration
linktitle: Class Segmentation Configuration
description: Robot Operating System (ROS 2) sensor configuration in Open 3D Engine (O3DE).
---

**Class Segmentation Configuration** is a level entity component that allows to globally configure lidar segmentation classes.

## Provider

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2)

## Properties

![Class Segmentation Configuration component properties](/images/user-guide/components/reference/robotics/ros2/ros2-class-segmentation-configuration-component.png)

| Property                    | Description                                                                                                                                                                | Values      | Default         |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-----------------|
| **Segmentation classes**    | A list of all segmentation classes. Each class consists of a name, class ID and a class color.                                                                             | List        | Unknown, Ground |

## Usage

Add **Class Segmentation Configuration** to the level  entity; then add the desired segmentation classes. Tag entities associated with each class using their respective class names (See [Tag](/docs/user-guide/components/reference/gameplay/tag.md)).
Additionally, make sure to enable segmentation in the ROS2 Lidar sensors (See [ROS 2 Lidar Sensor](../ros2-lidar-sensor.md)).
