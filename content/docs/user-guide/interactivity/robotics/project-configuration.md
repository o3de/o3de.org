---
linkTitle: Project Configuration
title: ROS 2 Project Configuration
description: How to install dependencies and build a project with the ROS 2 Gem in Open 3D Engine (O3DE).
weight: 110
toc: true
---

## Requirements

The O3DE ROS 2 Gem has been tested with [ROS 2 Humble](https://docs.ros.org/en/humble/Installation.html) and [ROS 2 Jazzy](https://docs.ros.org/en/jazzy/Installation.html) with Ubuntu 22.04 and 24.04, respectively.
  {{< important >}}
  The ROS 2 Gem is not available for Windows.
  {{< /important >}}

This instruction assumes that the `desktop` version of ROS 2 is installed. Otherwise, some packages might be missing. It asssumes that you have a working O3DE installation or a source code checkout of O3DE.
Please visit the [instructions](/docs/welcome-guide/setup/setup-from-github/building-linux) to learn how to build O3DE from the source code.

## Setting up

### ROS 2 ecosystem

#### Source your ROS 2 workspace

To build or run projects using ROS 2 Gem, you must [source your ROS 2 workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html) in your console. The best way to ensure that ROS 2 is sourced at all times is by adding the following line to the `~/.profile` file:
```shell
source /opt/ros/<distro>/setup.bash
```
Replace `<distro>` with the ROS 2 distribution name (such as `humble`).
Then, you must log out and log in from Ubuntu for the change to take effect.

#### Custom packages

The Gem fully supports [workspace overlaying](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay).
Source your workspace on top of the ROS 2 installation to include custom packages.

The Gem comes with a number of ROS 2 packages already included and linked, but you might want to include additional packages in your project.
To do so, use the `target_depends_on_ros2` function in your project's `Gem/CMakeLists.txt`:

```cmake
target_depends_on_ros2_packages(<your_target> <ros_package1> <ros_package2>)
```

#### Working with multiple ROS versions

If you have multiple ROS 2 versions installed, make sure you [source](https://docs.ros.org/en/humble/Tutorials/Workspace/Creating-A-Workspace.html#source-the-overlay) the one you would like to use. You can check which version is sourced in your console by checking the value of `ROS_DISTRO` environment variable (`echo $ROS_DISTRO`).

> You currently need to rebuild your project if it was previously built with another ROS version.

### Additional ROS 2 packages required

* Ackermann messages: `ros-${ROS_DISTRO}-ackermann-msgs`
* Control messages `ros-${ROS_DISTRO}-control-msgs`
* XACRO `ros-${ROS_DISTRO}-xacro`
* Vision msgs `ros-${ROS_DISTRO}-vision-msgs`

If a `desktop` installation of ROS 2 distro was selected, everything else should be there.

Use this helpful command to install:

```shell
sudo apt install ros-${ROS_DISTRO}-ackermann-msgs ros-${ROS_DISTRO}-control-msgs ros-${ROS_DISTRO}-nav-msgs ros-${ROS_DISTRO}-xacro ros-${ROS_DISTRO}-vision-msgs
```

{{<note>}}
You might want to install `gazebo_msgs` package to use some of the features, such as dynamic spawning of robots and contact sensor. However, it is not required for the `ROS2` Gem to work. The `gazebo_msgs` package is deprecated in ROS 2 _Jazzy_ and will not be available as of ROS 2 _Kilted_.
{{</note>}}

### Clone the Gem repository

To use the `ROS2` Gem in any O3DE project, you need to register it with O3DE. Similarly, you need to register the `ROS2Sensors`, `ROS2Controllers`, and assets' Gems to use their features. They live in the [`o3de/o3de-extras`](https://github.com/o3de/o3de-extras) repository. Clone the GitHub repository to your machine:

```shell
git clone https://github.com/o3de/o3de-extras
```

For convenience, set a couple of environment variables: `O3DE_HOME` to where your O3DE is located and `O3DE_EXTRAS_HOME`
to the path of your cloned o3de-extras repository, for example:

```shell
export O3DE_HOME=${HOME}/o3de
export O3DE_EXTRAS_HOME=${HOME}/o3de-extras
```

Enable Git Large File Storage (LFS), if you haven't already. Asset Gems use LFS to store large files.
```shell
cd ${O3DE_EXTRAS_HOME}
git lfs install && git lfs pull
```

### Registering robotic project templates and Gems

Robotics project templates can help you quickly start your simulation project. We recommend that you register the robotics project template Gems and their Asset Gems, which you downloaded with the `o3de-extras` repository.
```shell
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
- _Ros2ProjectTemplate_: a warehouse template that includes a differential drive robot and a C++ example that shows how to use the ROS 2 functionality in O3DE.
- _Ros2FleetRobotTemplate_:a warehouse template with a differential drive robot, easy to customize and scale up (multi-robot).
- _Ros2RoboticManipulationTemplate_: a template for robotic manipulation with a robotic arm and a set of objects that can be grabbed.

See more details about the templates in the  [overview](/docs/user-guide/interactivity/robotics/overview.md)

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
cmake -B build/linux -G "Ninja Multi-Config" -DLY_DISABLE_TEST_MODULES=ON -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_STRIP_DEBUG_SYMBOLS=ON
cmake --build build/linux --config profile --target ${PROJECT_NAME} Editor ${PROJECT_NAME}.Assets ${PROJECT_NAME}.GameLauncher
```
{{<note>}}
Before version 24.09.0, PhysX 5 was experimental and compiled during the engine's source code compilation process. 
If you're utilizing version 23.10.3 or an earlier release, you'll need to specify an additional flag: `-DAZ_USE_PHYSX5:BOOL=ON` :
```shell
cmake -B build/linux -G "Ninja Multi-Config" -DLY_DISABLE_TEST_MODULES=ON -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_STRIP_DEBUG_SYMBOLS=ON -DAZ_USE_PHYSX5:BOOL=ON 
```
{{</note>}}

### Launching your project in O3DE Editor

Once your project is built, run the following command to start the Editor:

```shell
${PROJECT_PATH}/build/linux/bin/profile/Editor
```

You might also use the `GameLauncher` to run your project without the Editor. The `GameLauncher` is built as part of the build process and can be found in the same directory as the Editor.

```shell
${PROJECT_PATH}/build/linux/bin/profile/${PROJECT_NAME}.GameLauncher
```
