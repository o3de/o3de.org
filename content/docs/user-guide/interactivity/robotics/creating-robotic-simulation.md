---
linkTitle: Creating a Robotic Simulation
title: Creating a Robotic Simulation
description: A step-by-step process on how to create a robotic simulation using the ROS 2 Gem in Open 3D Engine (O3DE).
toc: true
---

## How to create your own robotic simulation

### Tutorials

>This section is to be filled in

### High-level steps

>This section is to be detailed.

Once you are set up and familiar with the example project, consider the following steps:
1. [Create a new O3DE project](/docs/welcome-guide/create/)
   1. It is best to use one of [Project Templates](/docs/user-guide/interactivity/robotics/overview/#templates) for robotics to start quickly.
2. [Registering ROS2 Gem for your Project](/docs/user-guide/project-config/register-gems/) guide.
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
7. Develop your scene and simulation scenario, placing Assets and configuring components.
8. Run the simulation with your ROS 2 robot stack. You can build quickly one with some of many [ROS 2 packages](https://index.ros.org/packages/#humble) and projects in [ROS 2 ecosystem](https://project-awesome.org/fkromer/awesome-ros2).


