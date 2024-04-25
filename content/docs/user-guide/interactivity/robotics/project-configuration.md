---
linkTitle: Project Configuration
title: ROS 2 Project Configuration
description: How to install dependencies and build a project with the ROS 2 Gem in Open 3D Engine (O3DE).
weight: 200
toc: true
---

## Requirements

* Ubuntu 22.04. Other Ubuntu versions and Linux distributions can also work as long as they support ROS 2 Humble or ROS 2 Iron.
  {{< important >}}
  The ROS 2 Gem is not available for Windows.
  {{< /important >}}
* [O3DE built from source on Linux](/docs/welcome-guide/setup/setup-from-github/building-linux).
* The [latest released version](https://docs.ros.org/en/rolling/Releases.html#list-of-distributions ) of ROS 2. This instruction assumes that the `desktop` version is installed. Otherwise, some packages might be missing. 
  * The O3DE ROS 2 has been tested with [ROS 2 Humble](https://docs.ros.org/en/humble/Installation.html) and [ROS 2 Iron](https://docs.ros.org/en/iron/Installation.html) with Ubuntu 22.04.

## Setting up

### ROS 2 ecosystem

#### Source your ROS 2 workspace

To build or run projects using ROS 2 Gem, you must [source your ROS 2 workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html) in your console. The best way to ensure that ROS 2 is sourced at all times is by adding the following line to the `~/.profile` file:
```
source /opt/ros/<distro>/setup.bash
```
Replace `<distro>` with the ROS 2 distribution name (such as `humble`).
Then, you must log out and log in from Ubuntu for the change to take effect.

#### Custom packages

The Gem fully supports [workspace overlaying](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay).
Source your workspace on top of the ROS 2 installation to include custom packages.

The Gem comes with a number of ROS 2 packages already included and linked, but you might want to include additional packages in your project.
To do so, use the `target_depends_on_ros2` function in your project's `Gem/CMakeLists.txt`:

```
target_depends_on_ros2_packages(<your_target> <ros_package1> <ros_package2>)
```

#### Working with multiple ROS versions

If you have multiple ROS 2 versions installed, make sure you [source](https://docs.ros.org/en/humble/Tutorials/Workspace/Creating-A-Workspace.html#source-the-overlay) the one you would like to use. You can check which version is sourced in your console by checking the value of `ROS_DISTRO` environment variable (`echo $ROS_DISTRO`).

> You currently need to rebuild your project if it was previously built with another ROS version.

### Additional ROS 2 packages required

* gazebo_msgs: `ros-${ROS_DISTRO}-gazebo-msgs`
    * gazebo_msgs are used for robot spawning (no dependency on Gazebo).
* Ackermann messages: `ros-${ROS_DISTRO}-ackermann-msgs`
* Control toolbox `ros-${ROS_DISTRO}-control-toolbox`
* XACRO `ros-${ROS_DISTRO}-xacro`

If a `desktop` installation of ROS 2 distro was selected, everything else should be there.

Use this helpful command to install:

```
sudo apt install ros-${ROS_DISTRO}-ackermann-msgs ros-${ROS_DISTRO}-control-toolbox ros-${ROS_DISTRO}-nav-msgs ros-${ROS_DISTRO}-gazebo-msgs ros-${ROS_DISTRO}-xacro
```

### Clone the Gem repository

The ROS 2 Gem lives in the [`o3de/o3de-extras`](https://github.com/o3de/o3de-extras) repository. Clone the GitHub repository to your machine:

```
git clone https://github.com/o3de/o3de-extras
```

### Registering the Gem

To use the ROS 2 Gem in any O3DE project, you need to register it with O3DE.

For convenience, set a couple of environment variables: `O3DE_HOME` to where your O3DE is located and `O3DE_EXTRAS_HOME`
to the path of your cloned o3de-extras repository, for example:

```shell
export O3DE_HOME=${HOME}/o3de
export O3DE_EXTRAS_HOME=${HOME}/o3de-extras
```

Run the following command to register the ROS 2 Gem:
```bash
${O3DE_HOME}/scripts/o3de.sh register --gem-path ${O3DE_EXTRAS_HOME}/Gems/ROS2
```

### Registering robotic project templates

Robotics project templates can help you quickly start your simulation project. We recommend that you register the robotics project template Gems and their Asset Gems, which you downloaded with the `o3de-extras` repository.

To register robotic templates and assets:
1. Enable Git Large File Storage (LFS), if you haven't already.  Asset Gems use LFS to store large files.
    ```bash
    cd ${O3DE_EXTRAS_HOME}
    git lfs install && git lfs pull
    ```
2. Register the following templates and assets from o3de-extras.
    ```bash
    ${O3DE_HOME}/scripts/o3de.sh register --all-gems-path ${O3DE_EXTRAS_HOME}/Gems/
    ${O3DE_HOME}/scripts/o3de.sh register --all-templates-path ${O3DE_EXTRAS_HOME}/Templates/
    ```
   
For more information, refer to [Adding and Removing Gems](/docs/user-guide/project-config/add-remove-gems/) and [Registering Gems](/docs/user-guide/project-config/register-gems/).

### Creating a new robotic simulation project 

#### Robotic Project Templates

Project templates are useful tools to shape your initial project.
When created with a template, a new project can start with a specific configuration. include certain enabled Gems and starting levels.

Robotic project templates are designed to help you to quickly start simulating robots in O3DE with ROS 2.

#### ROS 2 Project Templates

There are three templates for robotics:
- [ROS 2 project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2ProjectTemplate):
  - A versatile, lightweight template that is good for a starting project and includes a robot with differential drive.
- [Warehouse project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2FleetRobotTemplate):
  - A photorealistic warehouse with a Proteus robot, easy to customize and scale up (multi-robot).
- [Manipulation project template](https://github.com/o3de/o3de-extras/tree/development/Templates/Ros2RoboticManipulationTemplate):
  - Includes two levels with robotic manipulator arms: one focused on palletization, the other one on R&D.

:bulb: The template repositories also include examples that you can try out by following their README files.

#### Create a new project with a template

To create a project with a template, you may use GUI or command line.
The quickest way is to run the following commands (adjust `PROJECT_NAME`, `PROJECT_PATH` and the template as you wish):

```shell
export PROJECT_NAME=MySimulationProject
export PROJECT_PATH=${HOME}/projects/${PROJECT_NAME}
${O3DE_HOME}/scripts/o3de.sh create-project --project-path $PROJECT_PATH --template-path ${O3DE_EXTRAS_HOME}/Templates/Ros2ProjectTemplate 
```

For more information, refer to [Project Creation](/docs/welcome-guide/create/)

### Building

The ROS 2 Gem is built when you build an O3DE project with the ROS 2 Gem enabled. 

Make sure to [source your ROS 2 workspace](#source-your-ros-2-workspace) before building.

For convenience, here is an example of parametrized CMake calls:

```shell
cd $PROJECT_PATH
cmake -B build/linux -G "Ninja Multi-Config" -DLY_DISABLE_TEST_MODULES=ON -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_STRIP_DEBUG_SYMBOLS=ON -DAZ_USE_PHYSX5:BOOL=ON 
cmake --build build/linux --config profile --target ${PROJECT_NAME} Editor ${PROJECT_NAME}.Assets 
```
{{<note>}}
Before version 24.10, PhysX 5 was experimental and compiled during the engine's source code compilation process. 
If you're utilizing version 23.10.2 or an earlier release, you'll need to specify an additional flag: `-DAZ_USE_PHYSX5:BOOL=ON`.
```shell
cmake -B build/linux -G "Ninja Multi-Config" -DLY_DISABLE_TEST_MODULES=ON -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_STRIP_DEBUG_SYMBOLS=ON -DAZ_USE_PHYSX5:BOOL=ON 
```
{{</note>}}
### Launching your project in O3DE Editor

Once your project is built, run the following command to start the Editor:

```shell
${PROJECT_PATH}/build/linux/bin/profile/Editor
```
