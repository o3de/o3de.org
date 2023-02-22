---
linkTitle: Guide
title: O3DE ROS 2 Gem Details
description: User guide to develop ROS 2 enabled simulation
toc: true
---

The ROS 2 Gem helps to build robotic simulations with [ROS 2 / Robot Operating System](https://www.ros.org/). 
An example of usage can be seen at [Robot Vacuum Sample](https://github.com/o3de/RobotVacuumSample).
The ROS 2 Gem contains a number of components that gives you a set of tools for robotic simulation.
Components allow you to:
- add locomotion to robotics platforms ([Vehicle Dynamics](#vehicle-model)),
- simulate sensors ([Sensors](#sensors)),
- provide tools to interact with simulation (e.g. [Robot Control](#robot-control), [Spawner](#spawner)).

## Components overview

- __Central Singleton__
  - ROS2SystemComponent
- __Core abstractions__
  - ROS2FrameComponent
  - ROS2SensorComponent
- __Sensors__
  - ROS2CameraSensorComponent
  - ROS2GNSSSensorComponent
  - ROS2IMUSensorComponent
  - ROS2LidarSensorComponent
  - ROS2OdometrySensorComponent
- __Robot control__
  - AckermannControlComponent
  - RigidBodyTwistControlComponent
  - SkidSteeringControlComponent
- __Spawner__
  - ROS2SpawnerComponent
  - ROS2SpawnPointComponent
- __Vehicle dynamics__
  - AckermannVehicleModelComponent
  - SkidSteeringModelComponent
  - WheelControllerComponent
- __Robot Import (URDF) system component__
  - ROS2RobotImporterSystemComponent

### ROS 2 Concepts

Please refer to [ROS 2 Concepts documentation](https://docs.ros.org/en/humble/Concepts.html).

### Structure and Communication

The Gem creates a [ROS 2 node](https://docs.ros.org/en/humble/Tutorials/Understanding-ROS2-Nodes.html) which is directly a part of the ROS 2 ecosystem. As such, your simulation will not use any bridges to communicate and is subject to configuration through settings such as Environment Variables. It is truly a part of the ecosystem.

Note that the simulation node is handled through `ROS2SystemComponent` - a singleton. However, you are free to create and use your own nodes if you need more than one.

Typically, you will be creating publishers and subscriptions. This is done through [rclcpp API](https://docs.ros2.org/humble/api/rclcpp/classrclcpp_1_1Node.html). Example:

```
auto ros2Node = ROS2Interface::Get()->GetNode();
AZStd::string fullTopic = ROS2Names::GetNamespacedName(GetNamespace(), m_MyTopic);
m_myPublisher = ros2Node->create_publisher<sensor_msgs::msg::PointCloud2>(fullTopic.data(), QoS());
```

Note that QoS class is a simple wrapper to [`rclcpp::QoS`](https://docs.ros.org/en/humble/p/rclcpp/generated/classrclcpp_1_1QoS.html).

### Frames

`ROS2FrameComponent` is a representation of an interesting physical part of the robot. It handles spatio-temporal relationship between this part and other frames of reference. It also encapsulates namespaces, which help to distinguish between different robots and different parts of the robot, such in the case of multiple identical sensors on one robot.

All Sensors and the Robot Control component require `ROS2FrameComponent`.

### Sensors

Sensors are components deriving from `ROS2SensorComponent`. They acquire data from the simulated environment and publish it to ROS 2 domain.

- Each sensor has a configuration, including one or more Publishers.
- Sensors publish at a given rate (frequency).
- Some sensors can be visualized.

If you intend to add your own sensor, it might be useful to look at how sensors already provided within the O3DE ROS2 Gem are implemented.

Sensors can be fall into one of two categories:
- sensors which replicate real devices to some degree of realism.
- ground truth "sensors", which can be useful for development and machine learning.

### Robot Control

The Gem comes with `ROS2RobotControlComponent`, which you can use to move your robot through:

- [Twist](https://github.com/ros2/common_interfaces/blob/master/geometry_msgs/msg/Twist.msg) messages.
- [AckermannDrive](https://index.ros.org/p/ackermann_msgs/#humble)
  The component subscribes to these command messages on a configured topic. The topic is "cmd_vel" by default, in a namespace as dictated by ROS2Frame.

To make use of received command messages, use either `AckermannControlComponent`, `RigidBodyTwistControlComponent` or `SkidSteeringControlComponent` , depending on steering type. You can also implement your own control component or use LUA scripting to handle these commands. Unless scripting is used, control components should translate ROS 2 commands to events on `VehicleInputControlBus`. These events will be handled by a [`VehicleModelComponent`](#vehicle-model) if it is present. You can use tools such as [rqt_robot_steering](https://index.ros.org/p/rqt_robot_steering/) to move your robot with Twist messages. `RobotControl` is suitable to use with [ROS 2 navigation stack](https://navigation.ros.org/). It is possible to implement your own control mechanisms with this Component.

### Vehicle Model

`VehicleModelComponent` serves the purpose of converting inputs such as target velocity, steering or acceleration to physical forces on parts of a vehicle (robot). `VehicleModel` has a `VehicleConfiguration` which is used to define axles, parametrize and assign wheels. The model requires a `WheelControllerComponent` present in each wheel entity. It also uses an implementation of `DriveModel`, which converts vehicle inputs to forces acting on steering elements and wheels.

#### Wheel Controller

A wheel controller is a controller that should be attached to the vehicle's wheel. The wheel entity should have PhysX Hinge Joint attached. The Joint controller should have:
 - `Motor Configuration / Use Motor` enabled,
 - `Motor Configuration / Force Limit Value` set to a desirable value.

![PhysX Joint](/images/user-guide/gems/ros2/physx_joint.png)

The wheel controller has the following parameters shown below.

![Wheel Controller](/images/user-guide/gems/ros2/wheelController.png)  

| Parameter Name               | Description                                                                      |
|------------------------------|----------------------------------------------------------------------------------|
| `Steering Entity`            | The entity that has a PhysX Hinge Joint that changes the direction of the wheel. |
| `Scale of steering axis`     | Allows the user to change the ratio or / and direction of wheel steering.        |

#### Ackermann Drive Model

The implementation of `AckermannDriveModel` uses [PID controllers](https://en.wikipedia.org/wiki/PID_controller) from [control_toolbox](https://github.com/ros-controls/control_toolbox) package. The model computes velocities or forces in the joints of the vehicle and applies it accordingly to commanded velocity.

![AckermannModel](/images/user-guide/gems/ros2/ackermanModel.png)

Parameters of the model are exposed to the user via `AckermannVehicleModelComponent`:

| Parameter Name                                 | Description                                                              |
|------------------------------------------------|--------------------------------------------------------------------------|
| `DriveModel / Axles `                          | List of axles of the vehicle.                                            |
| `DriveModel / Axles / Axle Wheels `            | List of wheels in axis.                                                  |
| `DriveModel / Axles / Is it a steering`        | If it is enabled the Ackermann Drive Model will apply a steering angle.  |
| `DriveModel / Axles / Is it a drive`           | If it is enabled the Ackermann Drive Model will apply drive force.       |
| `DriveModel / Axles / Track`                   | Distance between front and rear axis.                                    |
| `DriveModel / Axles / Wheelbase`               | Distance between left and right wheel.                                   |
| `DriveModel / Steering PID / P`                | Proportional gain of PID controller for steering servo.                  |
| `DriveModel / Steering PID / I`                | Integral gain of PID controller for steering servo.                      |
| `DriveModel / Steering PID / D`                | Derivative gain of PID controller for steering servo.                    |
| `DriveModel / Steering PID / IMin`             | Minimum integration impact of PID.                                       |
| `DriveModel / Steering PID / IMax`             | Maximum integration impact of PID.                                       |
| `DriveModel / Steering PID / AntiWindUp`       | Prevents integral wind-up in PID.                                        |
| `DriveModel / Steering PID / OutputLimit`      | Clamps output to maximum value.                                          |
| `DriveModel / Vehicles Limits / Speed limit `  | Maximum achievable linear speed in meters per second.                    |
| `DriveModel / Vehicles Limits / Steering limit`| Maximum achievable steering angle.                                       |

#### Skid Steering Drive Model
The model computes velocities in the joints of the vehicle and applies it accordinlgy to commanded velocity and configuration.

![SkidSteeringModel](/images/user-guide/gems/ros2/skidSteeringModel.png)  
Parameters of the model are exposed to the user via `AckermannVehicleModelComponent`:

| Parameter Name                                       | Description                                                        |
|------------------------------------------------------|--------------------------------------------------------------------|
| `DriveModel / Axles `                                | List of axles of the vehicle.                                      |
| `DriveModel / Axles / Axle Wheels `                  | List of wheels in axis.                                            |
| `DriveModel / Axles / Is it a steering`              | It is ignored in this model.                                       |
| `DriveModel / Axles / Is it a drive`                 | If it is enabled, the Skid Steering Drive Model will apply velocities to the axis' wheels.|
| `DriveModel / Axles / Track`                         | Distance between front and rear axis.                              |
| `DriveModel / Axles / Wheelbase`                     | Distance between left and right wheel.                             |
| `DriveModel / Vehicles Limits / Linear speed limit ` | Maximum achievable linear speed in meters per second.              |
| `DriveModel / Vehicles Limits / Angular speed limit` | Maximum achievable angular speed in radians per second.            |

 #### Manual control

The `VehicleModel` will handle input events with names "steering" and "accelerate". This means you can add an [InputComponent](/docs/user-guide/components/reference/gameplay/input/) to the same entity and define an input map for your input devices (such as keyboard or a game pad) to control the vehicle manually.

You can use tools such as [rqt_robot_steering](https://index.ros.org/p/rqt_robot_steering/) to move your robot with Twist messages. `RobotControl` is suitable to use with [ROS 2 navigation stack](https://navigation.ros.org/).

It is possible to implement your own control mechanisms with this Component.

### Spawner

`ROS2SpawnerComponent` handles spawning entities during simulation. Available spawnables have to be set up as the component's field before the simulation. User is able to define named spawn points inside the Editor. This can be done by adding `ROS2SpawnPointComponent` to a child entity of an entity with `ROS2SpawnerComponent`. During the simulation user can access names of available spawnables and request spawning using ros2 services. The names of services are `/get_available_spawnable_names` and `/spawn_entity` respectivly. GetWorldProperties.srv and SpawnEntity.srv types are used to handle these features. In order to request defined spawn points names user can use `/get_spawn_points_names` service with GetWorldProperties.srv type. Detailed information about specific spawn point (e.g. pose) can be accessed using `/get_spawn_point_info` service with GetModelState.srv type. All used services types are defined in gazebo_msgs package.

- **Spawning**: The spawnable name must be passed in `request.name` and the position of entity in `request.initial_pose`.
  - Example call: 
  ```
  ros2 service call /spawn_entity gazebo_msgs/srv/SpawnEntity '{name: 'robot', initial_pose: {position:{ x: 4, y: 4, z: 0.2}, orientation: {x: 0.0, y: 0.0, z: 0.0, w:.0}}}
  ```
- Spawning in defined spawn point: spawnable name should be passed in request.name and the name of the spawn point in request.xml
  - example call: `ros2 service call /spawn_entity gazebo_msgs/srv/SpawnEntity '{name: 'robot', xml: 'spawn_spot'}'`
- Available spawnable names access: names of available spawnables are sent in response.model_names
  - example call: `ros2 service call /get_available_spawnable_names gazebo_msgs/srv/GetWorldProperties`
- Defined spawn points' names access: names of defined points are sent in response.model_names
  - example call: `ros2 service call /get_spawn_points_names gazebo_msgs/srv/GetWorldProperties`
- Detailed spawn point info access: spawn point name should be passed in request.model_name. Defined pose is sent in response.pose.
  - example call: `ros2 service call /get_spawn_point_info gazebo_msgs/srv/GetModelState '{model_name: 'spawn_spot'}'`
