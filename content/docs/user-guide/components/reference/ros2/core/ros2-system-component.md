---
title: ROS 2 System Component
linktitle: ROS 2 System
description: System Component for Robot Operating System (ROS 2) in Open 3D Engine (O3DE).
---

The **ROS 2 System** component creates a default ROS 2 Node with an executor, 
and handles singleton behaviors such as publishing simulation clock and broadcasting transforms.

## Provider

[ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2)

## Dependencies

The ROS 2 System Component depends only on Physics System Service.

## Properties

The system component has no properties.

## Usage

ROS 2 System Component handles several singleton-like behaviors of the simulation. 
You can make use of its **Node** to conveniently create publishers and subscribers.
When creating or updating ROS messages, you can use it to get current ROS timestamp from the simulation clock. 
It is also internally used to publish static and dynamic transforms which are computed through **ROS 2 Frame** components.

Note that the simulation ROS node accessible through component's API is there as a convenience, and you can create your own nodes and executors if you wish.

## ROS2RequestsBus and ROS2Interface

The `ROS2RequestBus` alongside the `ROS2Interface` is an API system bus and interface
intended for both internal ROS 2 Gem components and external Gems.

| Request Name           | Description                                                                                                      | Parameters                                                              | Return                                                     | Scriptable |
|------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------|-|
| `GetNode`              | Returns simulation node which is already setup and executing.                                                    | None                                                                    | Node: rclcpp::Node                                         | No |
| `GetROSTimestamp`      | Returns a ROS timestamp based on simulation clock. Timestamps are useful for any message with a header.          | None                                                                    | Time: simulation time in ROS format                        | No |
| `BroadcastTransform`   | Broadcasts static or dynamic transforms. This API is used internally to handle ROS 2 Frame transform publishing. | T: transform to broadcast; IsDynamic: whether it is a dynamic transform | None                                                       | No |
