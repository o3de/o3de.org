---
title: ROS 2 Georeference Level Component
linktitle: ROS 2 Georeference Level Component
description: The ROS 2 Georeference Level component enables you to specify the geographical location of your simulation within the Robot Operating System (ROS 2) in Open 3D Engine (O3DE).
---

The **ROS 2 Georeference Level** component allows you to choose the geographical location of your simulation. This component is a level component and should be added to the level entity. If you are using, for example, the [GNSS Sensor Component](../sensors/ros2-gnss-sensor.md), it complements its functionality.

## Provider

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2)

## Dependencies

None

## Properties

![ROS 2 Georeference Level Component Properties](/images/user-guide/components/reference/robotics/ros2/ros2-georeference-component.png)

| Property                    | Description                                                                                                                      | Values      | Default         |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------|-----------------|
| **Altitude**                | The elevation of the ENU origin entity above Earth's WGS84 ellipsoid                                                             | meters      |  0              |
| **Latitude**                | The north-south geographical coordinate in WGS84, where north is positive                                                        | degrees     |  0              |
| **Longitude**               | The east-west geographical coordinate in WGS84, where east is positive                                                           | degrees     |  0              |
| **ENU Origin Transform**    | Entity that has a geographical location assigned, and its local coordinate system follows ENU (East-North-Up) directions         | Entity      |                 |
 
## Usage

1. Identify a location in your level with a known geographical position. This could be a corner of a building or an intersection of roads.
2. Create an empty entity in known location.
3. Rotate the entity so that its local coordinate system aligns with mapping:
   - X should point East.
   - Y should point North.
   - Z should point up.
4. In the **ROS 2 Georeference Level component**, enter the geographical location of the entity and set the **ENU Origin Transform** to reference the entity mentioned above.