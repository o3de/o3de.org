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

| Property                         | Description                                                                                                                                                                                                                                | Values      | Default         |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-----------------|
| **Sensor Configuration**         | See [Sensor Configuration properties](common/sensor-configuration.md)                                                                                                                                                                      |             |                 |
| **Lidar Model**                  | What kind of lidar it is. This can be a custom one or corresponding to a real device.                                                                                                                                                      | Enumeration | `Custom3DLidar` |
| **Lidar Implementation**         | Which mechanism to use for ray-casting (or other methods of acquiring data). Implementations can be registered by external Gems.                                                                                                           | Enumeration | `SceneQueries`  |
| **Ignore Collision Layers**      | Collision layers to ignore when acquiring data. This is useful to avoid obstruction by the sensor mesh itself.                                                                                                                             | List        | empty           |
| **Enable Segmentation**          | Whether to enable the class and instance segmentation feature. See [Class Segmentation Configuration Component](common/class-segmentation-configuration.md)                                                                                | Boolean     | false           |
| **Points At Max**                | Whether to return points for values above maximum range (with infinity value).                                                                                                                                                             | Boolean     | false           |
| **Point Cloud 2 message format** | Ordered list of message fields. See **Point Cloud 2 Message format** below.                                                                                                                                                                | List        | empty           |
| **Dense pointcloud**             | Whether to return only hits (i.e. the points that resulted from a ray intersecting with geometry). If enabled, **Points At Max** and **Pointcloud ordering** are set to false.                                                             | Boolean     | true            |
| **Pointcloud ordering**          | When enabled, all points are returned (non hits' values are filled with zeros) and the poincloud's width and height are included in the message (width=**Points per Layer**, height=**Layers**). Only available for non-dense point clouds.| Boolean     | false           |

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

### Point Cloud 2 Message format
![Point Cloud 2 Message format example](/images/user-guide/components/reference/robotics/ros2/point-cloud2-message-example.png)

The **Point Cloud 2 Message format** property consists of ordered field formats (with field types selected from a predefined set). Each field format represents one or more ROS2 Point Cloud 2 message point fields (for example the Position format represents the fields x, y and z).
You can configure field names using the name property. For fields that represent more than one actual field, specify the names using comas as seperators (as shown on example above for the position field). All fields have a size, type and an offset. You can configure point field
offset and memory alignment using the padding fields.

If a field is not supported by the selected lidar implementation, its values will be set according to the field's default value. The message structure will remain as specified by the user.

| Field                  | Description                                                                                                                                                                         | DataType                    | Size (bytes, may include padding) | Default Value | Actual PC2 field count |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------------|---------------|------------------------|
| **Position (x,y,z)**   | Position of the point, relative to the lidar sensor.                                                                                                                                | float x 3                   | 12                                | 0.0f          | 3                      |
| **Intensity**          | Point intensity. Values between 0 and 255. Not supported by Scene Queries. Supported by the RGL gem.                                                                                | float                       | 4                                 | 0.0f          | 1                      |
| **T**                  | Time difference between point cloud timestamp and the ray timestamp. Currently not supported.                                                                                       | AZ::u32                     | 4                                 | 0U            | 1                      |
| **Reflectivity**       | Point reflectivity. Currently not supported.                                                                                                                                        | AZ::u16                     | 2                                 | 0U            | 1                      |
| **Ring**               | Point ring (layer) ID. There are 1 and 2 byte variations of this field type. Not supported by Scene Queries. Supported by the RGL gem.                                              | AZ::u8 or AZ::u16           | 1 / 2                             | 0U            | 1                      |
| **Ambient**            | Point ambient factor. Currently not supported.                                                                                                                                      | AZ::u16                     | 2                                 | 0U            | 1                      |
| **Range**              | Distance from the raycaster to the point.                                                                                                                                           | AZ::u32                     | 4                                 | 0U            | 1                      |
| **Segmentation**       | Point segmentation entity and class IDs along with an rgba color associated with the segmentation class. For this field to be field with data make sure to **Enable Segmentation**. | AZ::s32, AZ::u32 and AZ::u8 | 12                                | 0, 0U and 0U  | 3                      |
| **Padding**            | Used to manipulate field offsets. This field is not filled by any data. There are 1, 2 and 4 byte variations of this field type.                                                    | N/A                         | 1, 2 or 4                         | N/A           | 0                      |

## Usage

Add **ROS 2 Lidar Sensor** to your robot to simulate lidar data. Select lidar implementation and the model you would like to simulate.

If you have an NVIDIA graphics card, consider an efficient GPU implementation provided by [RGL Gem](https://github.com/RobotecAI/o3de-rgl-gem).
It is orders of magnitude faster than the default implementation, based on Physics scene queries. RGL Gem also supports several popular lidar models.
