---
linkTitle: Concepts and Structure
title: ROS 2 Concepts and Structure
description: Understanding basic concepts and structure of the ROS 2 Gem in Open 3D Engine (O3DE).
weight: 300
toc: true
---

This topic describes the underlying concepts and structure of the [ROS 2 Gem](/docs/user-guide/gems/reference/robotics/ros2/) in **Open 3D Engine (O3DE)**.
You will learn about how ROS 2 and O3DE communicate, and how ROS 2 components interface with each other to perform various functions in a robotics simulation.

## ROS 2 Concepts

For a quick introduction to ROS 2 concepts, please refer to [ROS 2 Concepts documentation](https://docs.ros.org/en/humble/Concepts.html).

## Structure and Communication

The Gem creates a [ROS 2 node](https://docs.ros.org/en/humble/Tutorials/Understanding-ROS2-Nodes.html) which is directly a part of the ROS 2 ecosystem. As such, your simulation will not use any bridges to communicate and is subject to configuration through settings such as Environment Variables. It is truly a part of the ecosystem.

Note that the simulation node is handled through `ROS2SystemComponent` - a singleton. However, you are free to create and use your own nodes if you need more than one.

Typically, you will be creating publishers and subscriptions in order to communicate with the ROS 2 ecosystem using common topics.
This is done through [rclcpp API](https://docs.ros.org/en/humble/p/rclcpp/generated/classrclcpp_1_1Node.html#classrclcpp_1_1Node). Example:

```
auto ros2Node = ROS2Interface::Get()->GetNode();
AZStd::string fullTopic = ROS2Names::GetNamespacedName(GetNamespace(), m_MyTopic);
m_myPublisher = ros2Node->create_publisher<sensor_msgs::msg::PointCloud2>(fullTopic.data(), QoS());
```

Note that QoS class is a simple wrapper to [`rclcpp::QoS`](https://docs.ros.org/en/humble/p/rclcpp/generated/classrclcpp_1_1QoS.html).

## Components overview

- __Central Singleton__
  - `ROS2SystemComponent`
- __Core abstractions__
  - `ROS2FrameComponent`
  - `ROS2SensorComponent`
- __Sensors__
  - `ROS2CameraSensorComponent`
  - `ROS2GNSSSensorComponent`
  - `ROS2IMUSensorComponent`
  - `ROS2LidarSensorComponent`
  - `ROS2Lidar2DSensorComponent`
  - `ROS2OdometrySensorComponent`
  - `ROS2ContactSensorComponent`
- __Robot control__
  - `AckermannControlComponent`
  - `RigidBodyTwistControlComponent`
  - `SkidSteeringControlComponent`
- __Spawner__
  - `ROS2SpawnerComponent`
  - `ROS2SpawnPointComponent`
- __Vehicle dynamics__
  - `AckermannVehicleModelComponent`
  - `SkidSteeringModelComponent`
  - `WheelControllerComponent`
- __Robot Import (URDF) system component__
  - `ROS2RobotImporterSystemComponent`
- __Joints and Manipulation__
  - `JointsManipulationComponent`
  - `JointsTrajectoryComponent`
  - `JointsArticulationControllerComponent`
  - `JointsPIDControllerComponent`

### Frames

`ROS2FrameComponent` is a representation of an interesting physical part of the robot. It handles the spatio-temporal relationship between this part and other frames of reference. It also encapsulates namespaces, which help to distinguish between different robots and different parts of the robot, such as in the case of multiple identical sensors on one robot.

All Sensors and the Robot Control components require `ROS2FrameComponent`.

### Sensors

Sensors acquire data from the simulated environment and publish it to ROS 2 domain. Sensor components derive from `ROS2SensorComponentBase`.

- Each sensor has a configuration, including one or more Publishers.
- Sensors publish at a given rate (frequency), using one of two event sources: frame update or physics scene simulation events.
- Some sensors can be visualized.

If your sensor is not supported by the provided sensor components, you will most likely need to create a new component deriving from `ROS2SensorComponentBase`. 
When developing a new sensor, it is useful to look at how sensors that are already provided within the ROS2 Gem are implemented. 
Consider adding your new sensor as a separate Gem. A good example of such sensor Gem is the [RGL Gem](https://github.com/RobotecAI/o3de-rgl-gem).

### Robot Control

The Gem comes with `ROS2RobotControlComponent`, which you can use to move your robot through:

- [Twist](https://github.com/ros2/common_interfaces/blob/master/geometry_msgs/msg/Twist.msg) messages
- [AckermannDrive](https://github.com/ros-drivers/ackermann_msgs/blob/master/msg/AckermannDrive.msg)
 
The component subscribes to these command messages on a configured topic. The topic is `cmd_vel` by default, in a namespace as dictated by __ROS2Frame__.

To make use of received command messages, use either `AckermannControlComponent`, `RigidBodyTwistControlComponent`, or `SkidSteeringControlComponent`, depending on the steering type.
You can also implement your own control component or use Lua scripting to handle these commands. 
Unless scripting is used, control components should translate ROS 2 commands to events on `VehicleInputControlBus`.
These events will be handled by a [`VehicleModelComponent`](#vehicle-model) if it is present.
You can use tools such as [rqt_robot_steering](https://index.ros.org/p/rqt_robot_steering/) to move your robot with Twist messages.
`RobotControl` is suitable to use with [ROS 2 navigation stack](https://navigation.ros.org/).
It is possible to implement your own control mechanisms with this component.

### Joints and Manipulators

To control robotic joints systems such as manipulator arms, some integration with [MoveIt2](https://github.com/ros-planning/moveit2) is in place.
Two kinds of simulated joint systems are supported:
- Articulation links, which benefit from stability of reduced coordinate articulations in the physics engine.
- Hinge and prismatic joint components.
When [importing a robot](importing-robot.md) with joints, you decide which of these systems to use.

There are three interfaces to control joint systems: `JointsPositionControllerRequests`, `JointsManipulationRequests` and `JointsTrajectoryRequest`.
Each of these has one or more implementations within ROS 2 Gem, and it is possible to develop custom behaviors in a modular way using these interfaces.

`JointManipulationComponent` allows you to set target positions for all joints. If you wish to control the movement using trajectory through 
[FollowJointTrajectory action](https://github.com/ros-controls/control_msgs/blob/master/control_msgs/action/FollowJointTrajectory.action), use `JointsTrajectoryComponent`.

#### Joint States

`JointsManipulationComponent` also publishes [joint states](https://docs.ros2.org/latest/api/sensor_msgs/msg/JointState.html) by default.

### Vehicle Model

`VehicleModelComponent` serves the purpose of converting inputs such as target velocity, steering or acceleration to physical forces on parts of a vehicle (robot). `VehicleModel` has a `VehicleConfiguration` which is used to define axles, parametrize and assign wheels. The model requires a `WheelControllerComponent` present in each wheel entity. It also uses an implementation of `DriveModel`, which converts vehicle inputs to forces acting on steering elements and wheels.

### Vehicle Dynamics

See the [Vehicle Dynamics](vehicle-dynamics.md) section.

### Spawner

`ROS2SpawnerComponent` handles spawning entities during a simulation.
Before the simulation, you must set up as the component's available spawnables and define the named spawn points in the component's properties via the **O3DE Editor**.
This can be done by adding `ROS2SpawnPointComponent` to a child entity of an entity with `ROS2SpawnerComponent`. 
During the simulation you can access the names of available spawnables and request spawning by using ROS 2 services.
The names of services are `/get_available_spawnable_names` and `/spawn_entity` respectivly.
GetWorldProperties.srv and SpawnEntity.srv types are used to handle these features.
In order to request the defined spawn point names, you can use the `/get_spawn_points_names` service with the `GetWorldProperties.srv` type.
Detailed information about specific spawn point, such as pose, can be accessed using the `/get_spawn_point_info` service with the `GetModelState.srv` type.
All used services types are defined in the **gazebo_msgs** package.

- **Spawning**: To spawn, you must pass in the spawnable name into `request.name` and the position of entity into `request.initial_pose`.
  - Example call: 
  ```
  ros2 service call /spawn_entity gazebo_msgs/srv/SpawnEntity '{name: 'robot', initial_pose: {position:{ x: 4, y: 4, z: 0.2}, orientation: {x: 0.0, y: 0.0, z: 0.0, w:.0}}}
  ```
- **Spawning in defined spawn point**: Pass in a spawnable into `request.name` and the name of the spawn point into `request.xml`.
  - Example call:
    ``` 
    ros2 service call /spawn_entity gazebo_msgs/srv/SpawnEntity '{name: 'robot', xml: 'spawn_spot'}'
    ```
- **Available spawnable names access**: Send the names of available spawnables into `response.model_names`.
  - Example call:
    ```
    ros2 service call /get_available_spawnable_names gazebo_msgs/srv/GetWorldProperties
    ```
- **Defined spawn points' names access**: Send the names of defined points into `response.model_names`
  - Example call:
    ```
    ros2 service call /get_spawn_points_names gazebo_msgs/srv/GetWorldProperties
    ```
- **Detailed spawn point info access**: Pass in the spawn point name into `request.model_name` and the defined pose into `response.pose`.
  - Example call:
    ```
    ros2 service call /get_spawn_point_info gazebo_msgs/srv/GetModelState '{model_name: 'spawn_spot'}'
    ```
