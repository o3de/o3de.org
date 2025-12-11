---
linkTitle: Simulation Time for ROS2 Gem
title: Simulation Time for ROS2 Gem
description: Configure simulation time settings for the ROS 2 Gem in Open 3D Engine (O3DE).
toc: true
weight: 200
---

## Overview
In robotics simulations, managing simulation time is crucial for synchronizing various components and ensuring accurate behavior. 
The Open 3D Engine (O3DE) provides configurable settings to control how simulation time is handled within the ROS 2 Gem and other robotics-related Gems.


## Simulation Time Settings
The simulation time can be configured using the following registry `/O3DE/ROS2/ClockType`. The available values are:
- `realtime`: Uses the real-world time as the simulation clock.
- `simulation`: Uses the simulation time, which can be faster or slower than real-world time
- `ros2`: Uses the ROS 2 time, which is synchronized with other ROS 2 nodes.


### Realtime Clock
The RealTimeSource starts from 0 at the start of the simulation.
This time source could be affected by the jitter in the data, simulation computations or other similar events. On the other hand RealTimeSource can remain consistent with the other independent clocks if it is synchronized (e.g. through NTP).
Does not allow to adjust the time at runtime.

### Simulation Clock
The SimulationTimeSource provides timestamps calculated using updates from the physics engine.
Simulation paces the clock with stable steps, and as a result, this time source eliminates data jitter.
The simulated time can be faster or slower than the real-time, according to the configuration of the physics engine.
SimulationTimeSource is used as the default time source for the projects.
The simulated clock is incremented with delta times that were simulated by physics.
The time source registers and observes AZ::PhysicsScene and when the
simulation starts, it attaches and starts counting the updates.
It is recommended to use it with high-frequency sensors such as odometry and IMUs.
Allows runtime adjustment of the time by implementing the `AdjustTime` method.

### ROS 2 Clock
The ROS2Clock provides ROS timestamps as builtin_interface::msg::Time messages.
The clock can use different types of the time sources and publish the current
time to the ROS 2 `/clock` topic. The published time can be used with
the /use_sim_time parameter set to true.
Does not allow to adjust the time at runtime.

# API Reference

The following C++ interface is provided by `Gem::ROS2.API` target:

```cpp
#include <ROS2/Clock/ROS2ClockRequestBus.h>

// Getting current ROS 2 time
const builtin_interfaces::msg::Time ros2Time = ROS2::ROS2ClockInterface::Get()->GetROSTime();

// Some timers allows to modify adjust the time source
const auto outcome = ROS2::ROS2ClockInterface::Get()->AdjustTime(ros2Time);
```

Simplified API (that uses standard types) is provided for LUA and Script Canvas : `AdjustTimeSec` and `GetROSTimestampSec` functions.


