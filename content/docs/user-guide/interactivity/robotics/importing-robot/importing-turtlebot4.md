---
linkTitle: Importing Turtlebot 4
title: Importing Turtlebot 4
description: Robot Importer example - importing Turtlebot 4
weight: 100
---

## Introduction

[TurtleBot 4](https://clearpathrobotics.com/turtlebot-4/) is an open-source robotics platform for education and research. The URDF description of this robot is available as a ROS 2 package, which makes it easy to install and to test with Robot Importer. You should refer to the [introduction](./_index.md) to the Robot Importer tool for a more detailed explanation of the importing steps. 

### Prerequisite

Install necessary packages from ROS 2:
```bash 
sudo apt install ros-${ROS_DISTRO}-turtlebot4-description ros-${ROS_DISTRO}-turtlebot4-msgs ros-${ROS_DISTRO}-turtlebot4-navigation ros-${ROS_DISTRO}-turtlebot4-node
```

## Importing the robot

### Robot importer wizard

Open the Robot Importer tool and select the input file. You should find it in your ROS 2 install folder: `/opt/ros/${ROS_DISTRO}/share/turtlebot4_description/urdf/standard/turtlebot4.urdf.xacro` is a default path. Next, switch off the first two toggles, as in the picture below.

![Turtlebot tutorial](/images/user-guide/gems/ros2/URDF_importer_turtlebot0.png)

`Use Articulations` toggle determines whether [PhysX articulation components](https://nvidia-omniverse.github.io/PhysX/physx/5.1.0/docs/Articulations.html) should be used for joints and rigid bodies. Although articulations are often superior to simulating mechanisms over adding joints, they are more difficult to set up (e.g., they are very sensitive to the configuration of links' inertia). Using joints might allow you to skip some of the problems. The second toggle, `Preserve URDF fixed joints`, will let the importer reduce the complexity of the model. The usability of this method depends on the URDF implementation and you might want to try importing the robot with and without this option set to check for better results.

## Post-import modifications

Depending on the robot description, the importer might create colliders that intersect with each other, causing _explosion_ of the robot when starting the simulation. Turtlebot 4 has a collision between `base_link` and `wheels`. To alleviate this problem, you could either remove the `base_link` collider or put the colliders on different collision layers. Last but not least, you could redesign the colliders so they do not intersect. We recommend disabling the collider in `base_link` as a quick fix, and setting the collision layers accordingly as the final touch.

### The robot control

Turtlebot 4 is controlled by `libgazebo_ros2_control` plugin, which is currently not supported by the Robot Importer. Instead, you might manually add [Skid Steering](https://www.docs.o3de.org/docs/user-guide/interactivity/robotics/vehicle-dynamics/) to the robot to make it drive. 

You need to add three components to `base_link`:
- `Skid Steering Twist Control`
- `ROS2 Robot Control`
- `Skid Steering Vehicle Model`

The last component, `Skid Steering Vehicle Model`, is crucial, as it contains the parameters of the vehicle dynamics and links to wheel entities. First, set the vehicle limits, track and wheelbase. Next, add an axle, and links to `left_wheel` and `right_wheel` entities. Switch the toggle to mark this axle as a drive axle. Finally, set the wheel radius. The ROS 2 topic configuration can be changed in `ROS2 Robot Control` component. The sample configuration is presented below:

![Turtlebot tutorial](/images/user-guide/gems/ros2/URDF_importer_turtlebot1.png)

Finally, you need to add `Wheel Controller` components to `left_wheel` and `right_wheel` entities, and switch `Use Motor` flags in hinge joints of both wheel entities. You might change the `Force Limit Value` to a higher value to ensure smooth driving. The configuration of the `right_wheel` is presented below.

![Turtlebot tutorial](/images/user-guide/gems/ros2/URDF_importer_turtlebot2.png)

### The sensors

The Robot Importer correctly imports multiple [sensors](./sdformat-sensors.md) that are attached to the Turtlebot 4 robot, however not all sensors are parsed correctly and not all sensors are added as designed - depending on your needs, some manual tuning is necessary:
- the _LiDAR_ sensor is attached to `rplidar_link`, as defined in the robot description
- the _IMU_ sensor is missing in `imu_link` due to unsupported `libgazebo_ros_create_imu` plugin
- the _RGBD_ camera sensor is added to `oakd_rgb_camera_frame` link, but the orientation of the sensor should be adjusted
- the _contact sensors_ and _ir_ sensors are skipped by the Robot Importer completely as unsupported
