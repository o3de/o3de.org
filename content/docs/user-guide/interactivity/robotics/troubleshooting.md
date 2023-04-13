---
linkTitle: Troubleshooting
title: Troubleshooting
description: Troubleshooting common issues with Robot Operating System (ROS) and and the ROS 2 Gem in Open 3D Engine (O3DE).
weight: 500
---

In this section, you will learn helpful hints and what to check when your robotics simulation in Open 3D Engine (O3DE) is not working as expected.
You will also find solutions for some of the most commonly occurring problems.

## Is it a ROS 2 issue?

### Look into error messages and logs

- Check the console outputs for errors.
- Look into the Editor logs. From the Project folder, check `user/log/Editor.log`.

### Check your ROS configuration

#### Correct installation
Is your ROS 2 installed? Is it sourced properly? Was it also true when your project was built? Check `ROS_DISTRO` and `AMENT_PREFIX_PATH`.
  - `echo $ROS_DISTRO` should show non-empty value, for example `humble`.
  - `echo $AMENT_PREFIX_PATH` should include your ROS 2 distribution installation path as well as any additional workspaces you have sourced (if any). 
  - If you are using ROS services in your project, make sure that the `RMW_IMPLEMENTATION` environment variable is the same on the both ends (check in each).

#### Node and topic visibility

If your simulation is running, you should see both ROS node(s) and topics.
  - Run `ros2 node list`. You should see at least `/o3de_ros2_node`.
  - Run `ros2 topic list` to list the topics. You should always see `/parameters` and `/rosout`.
    - You should see additional topics such as `/clock` and `/tf` if your simulation is running.

#### Message traffic

- Is there traffic on ROS 2 topics? When your simulation is running, messages should be published.
  - Check `ros2 topic hz` or `ros2 topic echo`. If you are seeing no traffic it could be caused by a firewall, disabled multicast or issues with your docker (if running from a docker).
  - Please refer to the [Troubleshooting guide](#troubleshooting-guide).
  
#### ROS 2 troubleshooting guide

For additional solution, refer to ROS 2's [Installation troubleshooting](https://docs.ros.org/en/rolling/How-To-Guides/Installation-Troubleshooting.html) page.

## Is it a Gem or O3DE issue?

If your debugging confirmed that the issue is either with the ROS 2 Gem or O3DE, please help the community by raising an issue.

Even better, help us to fix it and make the open source simulation for robotics better for everyone.
Follow the [Contribution Guide](/docs/contributing/) to learn how to submit fixes and improvements.