---
title: ROS 2 Lidar Sensor Component
linktitle: ROS 2 Lidar Sensor
description: ROS 2 Lidar Sensor component for Robot Operating System (ROS 2) in Open 3D Engine (O3DE).
---

The **ROS 2 Lidar Sensor** component encapsulates simulation of lidar including data acquisition and publishing.
It uses abstraction to enable easily replaceable implementations, differing in how to acquire points.
Lidars are useful for tasks such as obstacle detection, localization, and navigation.


## Provider

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2)

## Dependencies

[ROS 2 Frame component](/user-guide/components/reference/ros2/core/ros2-frame)

## Properties

![ROS 2 Lidar Sensor component properties](/images/user-guide/components/reference/robotics/ros2/ros2-lidar-sensor-component.png)

| Property                    | Description                                                                                                                      | Values      | Default         |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------|-----------------|
| **Sensor Configuration**    | See [Sensor Configuration properties](common/sensor-configuration.md)                                                            |             |                 |
| **Lidar Model**             | What kind of lidar it is. This can be a custom one or corresponding to a real device.                                            | Enumeration | `Custom3DLidar` |
| **Lidar Implementation**    | Which mechanism to use for ray-casting (or other methods of acquiring data). Implementations can be registered by external Gems. | Enumeration | `SceneQueries`  |
| **Ignore Collision Layers** | Collision layers to ignore when acquiring data. This is useful to avoid obstruction by the sensor mesh itself.                   | List        | empty           |
| **Points At Max**           | Whether to return points for values above maximum range (with infinity value).                                                   | Boolean     | false           |

Note that depending on the lidar implementation, some additional properties may be present.
You can modify lidar parameters for custom lidars, but not for specific lidar models, 
which have more complex firing patterns which are only approximately reflected by these properties.

| Property                  | Description                                                                                                                                         | Values  | Default       |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|---------|---------------|
| **Name**                  | Name of the lidar, which reflects the choice of model                                                                                               | String  | `CustomLidar` |
| **Layers**                | How many vertical layers the lidar has.                                                                                                             | Integer | 24            |
| **Points per layer**      | How many point for each layer the lidar returns.                                                                                                    | Integer | 924           |
| **Layers**                | How many vertical layers the lidar has.                                                                                                             | Integer | 24            |
| **Min Horizontal Angle**  | Minimal horizontal angle for lidar firing pattern (degrees).                                                                                        | Float   | -180.0        |
| **Max Horizontal Angle**  | Maximum horizontal angle for lidar firing pattern (degrees).                                                                                        | Float   | 180.0         |
| **Min Vertical Angle**    | Minimal vertical angle for lidar firing pattern (degrees).                                                                                          | Float   | -35.0         |
| **Max Vertical Angle**    | Maximum vertical angle for lidar firing pattern (degrees).                                                                                          | Float   | 35.0          |
| **Min range**             | Smallest distance at which lidar returns a point.                                                                                                   | Float   | 0.0           |
| **Max range**             | Largest distance at which lidar returns a real point. Note that if **Points At Max** is set, data will include infinity value points for max range. | Float   | 100.0         |

## Usage

Add **ROS 2 Lidar Sensor** to your robot to simulate lidar data. Select lidar implementation and the model you would like to simulate.

If you have an NVIDIA graphics card, consider an efficient GPU implementation provided by [RGL Gem](https://github.com/RobotecAI/o3de-rgl-gem).
It is orders of magnitude faster than the default implementation, based on Physics scene queries. RGL Gem also supports several popular lidar models.
