---
linkTitle: ROS2
title: ROS2 Gem
description: The ROS 2 Gem helps to build robotic simulations with ROS 2 / Robot Operating System.
toc: true
---

<!-- # O3DE ROS2 Gem -->

This Gem enables users to develop robotic simulations through ROS2 tools and components.

## Requirements

* Ubuntu 20.04 or 22.04. Other Ubuntu versions and Linux distros could also work as long as they can support ROS 2.
* [O3DE](https://www.o3de.org/)
* Modern version of ROS 2. This instruction assumes that the `desktop` version is installed. Otherwise some packages might be missing. We support and tested with:
  * [ROS 2 Galactic](https://docs.ros.org/en/galactic/Installation.html) with Ubuntu 20.04.

#### Additional ros packages required

Once the desired version of ROS 2 is installed, you will need to install additional ROS 2 packages. 
Before running the following commands, make sure that the ROS 2 environment is setup. Replace \<distro\> with the ROS 2 distribution name (galactic, humble, ..) below and run the following command:
```
source /opt/ros/<distro>/setup.bash
```

* gazebo_msgs: `sudo apt install ros-${ROS_DISTRO}-gazebo-msgs`
* Ackermann messages: `sudo apt install ros-${ROS_DISTRO}-ackermann-msgs`
* Control toolbox `sudo apt install ros-${ROS_DISTRO}-control-toolbox`

If a `desktop` installation of ROS 2 distro was selected, everything else should be there.

Use this helpful command to install:

```
sudo apt install ros-${ROS_DISTRO}-ackermann-msgs ros-${ROS_DISTRO}-control-toolbox ros-${ROS_DISTRO}-nav-msgs ros-${ROS_DISTRO}-gazebo-msgs
```

## Features

* Direct and natural support of ROS2 ecosystem:
  * No bridges. Your simulation node will function as any other ROS2 node.
    * This is also good for performance
  * Easy way to include ROS2 dependencies.
* Sensors:
  * Sensor Component serving as a handy abstraction.
  * Example implementations of Lidar, Camera, IMU sensors.
    * Including a few Assets and prefabs which are ready to use. 
* Automated handling of:
  * Simulation time, publishing `/clock` supporting non-real time.
  * Publishing of transformation frames (`/tf`, `/tf_static`).
  * Validation for topic and namespace names.
* Robot Control Component:
  * A quick to use method of controlling your robot with Twist messages.
  * Can be used with custom LUA scripting. 

For a "feel" of these features, see an [example project](https://github.com/o3de/RobotVacuumSample) which uses this Gem to run navigation stack.

<!-- ## Clone this repository

Clone the gem repository from Github:

```
git clone https://github.com/RobotecAI/o3de-ros2-gem.git
```

## Building

The Gem is built through building a project which uses it. Make sure to
[source your ros2 workspace](https://docs.ros.org/en/rolling/Tutorials/Configuring-ROS2-Environment.html#source-the-setup-files)
before building.

## Adding Gem to your project

To use this Gem in your project, you need to register the Gem with O3DE. First, clone this repository. Then,
in o3de folder:
```
scripts/o3de.sh register --gem-path <PATH_TO_CLONED_ROS2_GEM>
scripts/o3de.sh enable-gem -gn ROS2 -pp <PATH_TO_YOUR_PROJECT>
```

## Example project

You can test O3DE ROS2 Gem with [this project](https://github.com/RobotecAI/Ros2WarehouseDemo).
It will allow you to run robot navigation. All necessary assets are included. -->

## User Guides

Follow the [ROS 2 Gem User Guide](ros2-gem-user-guide.md) to understand its concepts and components.

<!-- If you plan on contributing please follow the [Pull Request Publishing](docs/guides/pr_publishing.md) guide. For those using the Clion IDE we advise to follow the [Development in Clion](docs/guides/development_in_clion.md) guide. -->

## How to create your own robotic simulation

>This section is to be detailed.

Once you are set up and familiar with the example project, consider the following steps:
1. [Create a new O3DE project](/docs/welcome-guide/create/) 
2. Register ROS2 Gem and other useful Gems to created project. 
Follow [Registering Gems to a Project](/docs/user-guide/project-config/register-gems/) guide. 
3. Create or import Assets for your robots and environment. 
   1. You can use formats supported by O3DE.
   2. You can import your robot from URDF.
   3. Imported models might require some adjustments to be simulation-ready.
4. Determine which sensors you need to simulate. 
   1. Some sensors are already implemented in this Gem.
      1. They might require specialization (implementation specific for particular models).
      2. You might want to consider tradeoffs between performance and realism in each case.
   2. Use ROS2SensorComponent as a base class if you are implementing a new sensor.
5. Develop necessary sensors and their prefabs.
6. Consider developing additional abstraction to handle spawning and despawning robots.
   1. This would also be a valuable contribution to the Gem.
7. Develop your scene and simulation scenario, placing Assets and configuring Components.

Enjoy simulation with some of many [ROS2 packages](https://index.ros.org/packages/#humble) and projects in [ROS2 ecosystem](https://project-awesome.org/fkromer/awesome-ros2).

## Acknowledgements

This project was originally developed by [Robotec.ai](https://robotec.ai) in cooperation with [AWS Game Tech](https://aws.amazon.com/gametech/) and [AWS RoboMaker](https://aws.amazon.com/robomaker/).