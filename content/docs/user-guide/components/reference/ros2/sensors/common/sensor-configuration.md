---
title: Sensor Configuration
linktitle: Sensor Configuration
description: Robot Operating System (ROS 2) sensor configuration in Open 3D Engine (O3DE).
---

**Sensor Configuration** is a common part of all sensors, encapsulating topics as well as
[Quality of Service](https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Quality-of-Service-Settings.html) settings and frequency for publishing.

## Properties

| Property       | Description                                                                                                 | Values  | Default |
|----------------|-------------------------------------------------------------------------------------------------------------|---------|---------|
| **Visualise**  | Whether to show visualisation of sensor working in the simulation, such as drawing point clouds for lidars. | Boolean | true    |
| **Publishing Enabled** | Turn publishing sensor data on or off.                                                                      | Boolean | true    |
| **Frequency**  | How often to publish sensor data (per second).                                                              | Float   | 10.0    |

**Sensor Configuration** can include multiple topics. For each topic, the following properties are listed:

| Property               | Description                                                                                                                                                      | Values      | Default           |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|-------------------|
| **Topic**              | Name of topic. Note that it should not include namespace, since namespaces are handled by **ROS 2 Frame** components.                                            | String      | Depends on sensor |
| **Reliability Policy** | Quality of Service (QoS) reliability setting. It controls whether published data needs to be delivered (with confirmation) or is only sent on best-effort basis. | Enumeration | Best Effort       |
| **Durability Policy**  | Quality of Service (QoS) durability setting. It controls whether published data persists for subscribers that join later.                                        | Enumeration | Volatile          |
| **History**            | Quality of Service (QoS) history depth, which is how many messages are kept in the sender queue.                                                                 | Integer     | 5                 |
