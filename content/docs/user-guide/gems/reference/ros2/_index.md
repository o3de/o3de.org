---
linkTitle: ROS 2
title: ROS 2 Gem
description: The ROS 2 Gem helps to build robotic simulations with ROS 2 / Robot Operating System.
toc: true
---

<!-- # O3DE ROS2 Gem -->

This Gem enables users to develop robotic simulations through ROS 2 tools and components.

## Requirements

* Ubuntu 20.04 or 22.04. 
  Other Ubuntu versions and Linux distributions could also work as long as they can support ROS 2.
  **The O3DE ROS 2 Gem is not available for Windows.**
* [O3DE](https://www.o3de.org/)
* The modern version of ROS 2. This instruction assumes that the `desktop` version is installed. Otherwise, some packages might be missing. It has been tested with:
  * [ROS 2 Galactic](https://docs.ros.org/en/galactic/Installation.html) with Ubuntu 20.04
  * [ROS 2 Humble](https://docs.ros.org/en/humble/Installation.html) with Ubuntu 22.04

Please note that to build or run projects using this Gem, you will need to have ROS [sourced](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html) in your console .
The best way to ensure this is the case at all times is to add the following line to the `~/.profile` file:
```
source /opt/ros/<distro>/setup.bash
```
Replace \<distro\> with the ROS 2 distribution name (galactic, humble, ..).
Note that you need to re-log for the change to take effect.

#### Additional ROS 2 packages required

* gazebo_msgs: `sudo apt install ros-${ROS_DISTRO}-gazebo-msgs`
* Ackermann messages: `sudo apt install ros-${ROS_DISTRO}-ackermann-msgs`
* Control toolbox `sudo apt install ros-${ROS_DISTRO}-control-toolbox`
* XACRO `sudo apt install ros-${ROS_DISTRO}-xacro`

If a `desktop` installation of ROS 2 distro was selected, everything else should be there.

Use this helpful command to install:

```
sudo apt install ros-${ROS_DISTRO}-ackermann-msgs ros-${ROS_DISTRO}-control-toolbox ros-${ROS_DISTRO}-nav-msgs ros-${ROS_DISTRO}-gazebo-msgs
```

## Features

* Direct and natural support of ROS 2 ecosystem:
  * No bridges. Your simulation node will function as any other ROS 2 node.
    * This is also good for performance
  * Easy way to include ROS 2 dependencies.
* Sensors:
  * Sensor Component serves as a handy abstraction.
  * Example implementations of Lidar, Camera, IMU sensors.
    * Including a few Assets and prefabs which are ready to use. 
* Automated handling of:
  * Simulation time, publishing `/clock` supporting non-real time.
  * Publishing of transformation frames (`/tf`, `/tf_static`).
  * Validation for topic and namespace names.
* Robot Control Component:
  * A quick to use method of controlling your robot with Twist messages.
  * Can be used with custom LUA scripting. 
* Vehicle dynamics:
  * Ackermann Steering, subscribes to message of type [AckermannDrive](http://docs.ros.org/en/api/ackermann_msgs/html/msg/AckermannDrive.html).
  * Differential drive, subscribes to message of type [Twist](http://docs.ros.org/en/noetic/api/geometry_msgs/html/msg/Twist.html).
* URDF/XACRO (experimental).
  

For a "feel" of these features, see an [example project](https://github.com/o3de/RobotVacuumSample) which uses this Gem to run navigation stack.

## Clone this repository

Clone the gem repository from Github:

```
git clone https://github.com/o3de/o3de-extras
```

## Building

The Gem is built through building a project which uses it. 
Make sure to [source your ROS 2 workspace](https://docs.ros.org/en/humble/Tutorials/Configuring-ROS2-Environment.html#source-the-setup-files) before building.

## Adding Gem to your project

To use O3DE ROS 2 Gem in your project, you need to register the Gem with O3DE. First, clone this repository. Then,
in O3DE folder:
```
scripts/o3de.sh register --gem-path <PATH_TO_CLONED_O3DE_EXTRAS>/Gems/ROS2
scripts/o3de.sh enable-gem -gn ROS2 -pp <PATH_TO_YOUR_PROJECT>
```

## Example project

You can test O3DE ROS 2 Gem with [this project](https://github.com/o3de/RobotVacuumSample).
It will allow you to run robot navigation.
All necessary assets are included.

## User Guides

Follow the [O3DE ROS2 Gem User Guide](ros2-gem-user-guide.md) to understand its concepts and components.
For additional developer's documentation, check the [Gem documentation](https://github.com/o3de/o3de-extras/blob/development/Gems/ROS2/docs/guides/development_in_clion.md) and
[Open 3D Engine Contributor guide](/docs/contributing)

## How to create your own robotic simulation

>This section is to be detailed.

Once you are set up and familiar with the example project, consider the following steps:
1. [Create a new O3DE project](/docs/welcome-guide/create/) 
2. [Register ROS 2 Gem](#adding-gem-to-your-project) and other useful Gems to created project. 
Follow [Registering Gems to a Project](/docs/user-guide/project-config/register-gems/) guide. 
3. Create or import Assets for your robots and environment. 
   1. You can use formats supported by O3DE.
   2. You can import your robot from URDF/XACRO.
   3. Imported models might require some adjustments to be simulation-ready.
   4. Mobilize robot with Vehicle Dynamics controllers.
4. Determine which sensors you need to simulate. 
   1. Some sensors are already implemented in this Gem.
      1. They might require specialization (implementation specific for particular models).
      2. You might like to consider tradeoffs between performance and realism in each case.
   2. Use `ROS2SensorComponent` as a base class if you are implementing a new sensor.
5. Develop necessary sensors and their prefabs.
6. Consider developing additional abstraction to handle spawning and despawning robots.
   1. This would also be a valuable contribution to the Gem.
7. Develop your scene and simulation scenario, placing Assets and configuring Components.

Enjoy simulation with some of many [ROS 2 packages](https://index.ros.org/packages/#humble) and projects in [ROS 2 ecosystem](https://project-awesome.org/fkromer/awesome-ros2).