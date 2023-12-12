---
title: ROS 2 Frame Component
linktitle: ROS 2 Frame
description: ROS 2 Frame component for Robot Operating System (ROS 2) in Open 3D Engine (O3DE).
---

The **ROS 2 Frame** component reflects the concept of ROS frames of reference for coordinates, which follow a [REP103 standard](https://www.ros.org/reps/rep-0103.html).
It is commonly used in any robotic system, for example sensors typically publish in their own reference frame, and
localization is about finding a transformation from robot local frame to a more general frame of reference. 
**ROS 2 Frame** component also handles namespaces which are essential for multi-robot simulations.

## Provider

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2)

## Dependencies

The **ROS 2 Frame** component depends on Transform Service, which is provided by **Transform** component.

## Properties

![ROS 2 Frame component properties - default namespace](/images/user-guide/components/reference/robotics/ros2/ros2-frame-component-namespace-default.png)  
![ROS 2 Frame component properties - custom namespace](/images/user-guide/components/reference/robotics/ros2/ros2-frame-component-namespace-custom.png)  

| Property                    | Description                                                                                                                            | Values      | Default                                                     |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------|-------------------------------------------------------------|
| **Namespace Configuration** | Determines how to set the namespace for the component, which can be empty, custom, or derived from entity name.                        | Enumeration | Default (from name for top level entities, empty otherwise) |
| **Frame Name**              | Name of the frame, which is used as `frame_id` field for published messages and broadcasted transforms.                                | String      | `sensor_frame`                                              |
| **Joint Name**              | Name of the joint for this entity, which is supplementary information required by joint control APIs.                                  | String      | empty                                                       |
| **Publish Transform**       | Determines whether the transformation to this frame's parent is included in the broadcasted transforms.                                | Boolean     | true                                                        |
| **Effective namespace**     | Read only value providing the effective namespace of the frame. It is automatically updated and takes other frames into consideration. | String      | empty                                                       |

## Usage

**ROS 2 Frame** component handles namespace, frame id, and joint name associated with an entity, which is a part of a robot.
Many other components such as sensors and controllers depend on it. **ROS 2 Frame** works internally with these components to
ensure namespacing of topics, sending of proper `frame_id` in each message, and broadcasting of transforms to `/tf` and `/tf_static` topics.
