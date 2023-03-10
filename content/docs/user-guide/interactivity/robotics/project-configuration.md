---
linkTitle: Project Configuration
title: ROS 2 Project Configuration
description: How to install dependencies and build a project with the ROS 2 Gem in Open 3D Engine (O3DE).
toc: true
---

## Requirements

* Ubuntu 22.04 or 20.04. Other Ubuntu versions and Linux distributions can also work as long as they support ROS 2.
  **The O3DE ROS 2 Gem is not available for Windows.**
* [O3DE built from source on Linux](/docs/welcome-guide/setup/setup-from-github/building-linux). **The ROS 2 Gem does not work with a release version of O3DE yet**.
* The [latest version](https://docs.ros.org/en/rolling/Releases.html) of ROS 2. This instruction assumes that the `desktop` version is installed. Otherwise, some packages might be missing. The O3DE ROS 2 has been tested with:
  * [ROS 2 Humble](https://docs.ros.org/en/humble/Installation.html) with Ubuntu 22.04.
  * [ROS 2 Galactic](https://docs.ros.org/en/galactic/Installation.html) with Ubuntu 20.04.

## Setting up

### ROS 2 ecosystem

#### Source your ROS 2 workspace

To build or run projects using ROS 2 Gem, you must [source your ROS 2 workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html) in your console. The best way to ensure that ROS 2 is sourced at all times is by adding the following line to the `~/.profile` file:
```
source /opt/ros/<distro>/setup.bash
```
Replace `<distro>` with the ROS 2 distribution name (`humble`, `galactic`, and so on).
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

* gazebo_msgs: `sudo apt install ros-${ROS_DISTRO}-gazebo-msgs`
    * gazebo_msgs are used for robot spawning (no dependency on Gazebo).
* Ackermann messages: `sudo apt install ros-${ROS_DISTRO}-ackermann-msgs`
* Control toolbox `sudo apt install ros-${ROS_DISTRO}-control-toolbox`
* XACRO `sudo apt install ros-${ROS_DISTRO}-xacro`

If a `desktop` installation of ROS 2 distro was selected, everything else should be there.

Use this helpful command to install:

```
sudo apt install ros-${ROS_DISTRO}-ackermann-msgs ros-${ROS_DISTRO}-control-toolbox ros-${ROS_DISTRO}-nav-msgs ros-${ROS_DISTRO}-gazebo-msgs
```

### Clone this repository

The ROS 2 Gem lives in the [`o3de/o3de-extras`](https://github.com/o3de/o3de-extras) repository. Clone the GitHub repository to your machine:

```
git clone https://github.com/o3de/o3de-extras
```

### Adding Gem to your project

To use the ROS 2 Gem in your O3DE project, you need to register the Gem with O3DE. Then, you can enable the Gem in your project. Run the following commands from the O3DE folder:
```
scripts/o3de.sh register --gem-path <PATH_TO_CLONED_O3DE_EXTRAS>/Gems/ROS2
scripts/o3de.sh enable-gem -gn ROS2 -pp <PATH_TO_YOUR_PROJECT>
```

For more information, refer to [Adding and Removing Gems](/docs/user-guide/project-config/add-remove-gems/) and [Registering Gems](/docs/user-guide/project-config/register-gems/).

### Building

The ROS 2 Gem is built when you build an O3DE project and enable the ROS 2 Gem. For more information, refer to [Project Creation](/docs/welcome-guide/create/) and [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/). Make sure to [source your ROS 2 workspace](#source-your-ros-2-workspace) before building.
