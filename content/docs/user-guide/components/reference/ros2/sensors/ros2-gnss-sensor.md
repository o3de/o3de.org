---
title: ROS 2 GNSS Sensor Component
linktitle: ROS 2 GNSS Sensor
description: The ROS 2 GNSS Sensor component for the Robot Operating System (ROS 2) in Open 3D Engine (O3DE) simulates a GNSS (GPS) receiver and publishes corresponding messages.
---

The **ROS 2 GNSS Sensor** component encapsulates the simulation of a Global Navigation Satellite System (GNSS) receiver, providing data as if it were a real sensor. GNSSs include systems such as Global Positioning System (GPS) and Galileo. The GNSS component publishes messages containing the current geographical location as specified in the [NavSatFix](https://docs.ros2.org/latest/api/sensor_msgs/msg/NavSatFix.html) message format.

## Provider

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2)

## Dependencies

[ROS 2 Frame Component](/user-guide/components/reference/ros2/core/ros2-frame)

## Properties

![ROS 2 GNSS Sensor Component Properties](/images/user-guide/components/reference/robotics/ros2/ros2-gnss-sensor-component.png)

| Property                    | Description                                                                                                                      | Values      | Default         |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------|-----------------|
| **Sensor Configuration**    | See [Sensor Configuration properties](common/sensor-configuration.md)                                                            |             |                 |

## Usage

1. Utilize the **ROS 2 Georeference Component** to establish the geographical localization of your level.
2. Add the **ROS 2 GNSS Sensor** to your robot to simulate data emanating from a GNSS receiver.
