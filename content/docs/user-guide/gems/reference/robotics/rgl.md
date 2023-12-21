---
linkTitle: RGL
title: Robotec GPU Lidar (RGL) Gem
description: The Robotec GPU Lidar (RGL) Gem for Open 3D Engine (O3DE) enables GPU-accelerated LiDAR simulation for robotics.
toc: true
---

<!-- # Robotec GPU Lidar (RGL) Gem -->

The **Robotec GPU Lidar (RGL) Gem** is a module working with [ROS&nbsp;2 Gem](./ros2.md) and extending it with a GPU-accelerated implementation of _Lidar Sensor Component_. It uses an open source [Robotec GPU Lidar library](https://github.com/RobotecAI/RobotecGPULidar) simulating LiDAR through raycasting based on GPU with [CUDA](https://docs.nvidia.com/cuda/) and [OptiX](https://raytracing-docs.nvidia.com/optix8/index.html). 

The Gem provides a faithful representation of the simulated environment by supporting the following visuals:
* Mesh Component
* Terrain created using the [O3DE Terrain Gem](../environment/terrain)

You can fully customize the LiDAR's settings using the O3DE Level Editor. Those include properties like:
* configurable raycasting pattern
* lidar range
* entities excluded from raycasting

You can also choose one of the presets provided by the ROS&nbsp;2 Gem to create a LiDAR model that fits your needs.

The Gem is available from our website at [Github repository](https://github.com/RobotecAI/o3de-rgl-gem). For more information, refer to the _README_ file of the Gem and/or the [README file](https://github.com/RobotecAI/RobotecGPULidar) of the library.

## License

Both [Robotec GPU Lidar (RGL) Gem](https://github.com/RobotecAI/o3de-rgl-gem/blob/development/LICENSE) and [Robotec GPU Lidar library](https://github.com/RobotecAI/RobotecGPULidar/blob/develop/LICENSE) are licensed under [Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0).