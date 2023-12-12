---
linkTitle: OTTO Robots
title: OTTO Autonomous Mobile Robots (AMRs) Gem
description: The OTTO Robots Gem provides a collection of autonomous mobile robots assets that can be used in robotic simulations with Robot Operating System (ROS) 2 in Open 3D Engine (O3DE).
toc: true
---

<!-- # OTTO Robots Gem -->

The **OTTO Robots Gem** provides a collection of Autonomous Mobile Robots (AMRs) assets that can be used in robotic simulations with [ROS&nbsp;2 Gem](./ros2.md) in **Open 3D Engine (O3DE)**. In particular, this Gem contains the simplified models of the following robots developed by [OTTO Motors](https://ottomotors.com):
- [OTTO 1500 v2](https://ottomotors.com/1500)
- [OTTO 600](https://ottomotors.com/600)

Additionally, it contains the assets of the stands:
- High and low stands for OTTO 1500 v2
- Stand for OTTO 600

This Gem includes implementation to control lifting platforms of OTTO 600 and OTTO 1500 robots. Movement of the platform can be manually steered using PhysX Debug Gem or controlled from code using the Pid Motor Controller Component of [ROS&nbsp;2 Gem](./ros2.md). Additionally, it includes the code to control the lights of OTTO 600 via ROS 2 interfaces.

An example of its use can be found in [ROSCon2023Demo](https://github.com/RobotecAI/ROSCon2023Demo) project. The Gem is available from our [Github repository](https://github.com/RobotecAI/o3de-otto-robots-gem/). For more information, refer to the _README_ file of the Gem.

## License

The Gem is licensed under [Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0). You may elect at your option to use the [MIT License](https://opensource.org/licenses/MIT) instead. Contributions must be made under both licenses.

Models were created based on STL files kindly shared by [OTTO Motors](https://ottomotors.com).
