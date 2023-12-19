---
linkTitle: OTTO Robots
title: OTTO Autonomous Mobile Robots (AMRs) Gem
description: The OTTO Robots Gem provides a collection of autonomous mobile robots assets that can be used in robotic simulations with Robot Operating System (ROS) 2 in Open 3D Engine (O3DE).
toc: true
---

<!-- # OTTO Robots Gem -->

![O3DE showing a level with OTTO 1500 and OTTO 600 robots](/images/user-guide/gems/otto-robots-gem-demo.png)

The **OTTO Robots Gem** provides simplified models of the following Autonomous Mobile Robots (AMRs) developed by [OTTO Motors by Rockwell Automation](https://ottomotors.com):
- [OTTO 1500 v2](https://ottomotors.com/1500)
- [OTTO 600](https://ottomotors.com/600)

OTTO 1500 v2 robot is delivered with basic and high-lifting platforms, while OTTO 600 is available with a low-lifting platform only. Additionally, it contains the assets of the stands:
- High and low stands for OTTO 1500 v2
- Stand for OTTO 600

The lifting platforms can be manually steered using PhysX Debug Gem or controlled from code using the Pid Motor Controller Component of [ROS&nbsp;2 Gem](./ros2.md). Similarly, OTTO 600 lights can be modified via ROS 2 interfaces to visually inform about the status. You can easily extend the models with forward- and backward-facing 3D perception cameras and IMU sensors available in [ROS&nbsp;2 Gem](./ros2.md) to make fully functional AMRs.

This Gem was used in [ROSCon2023Demo](https://github.com/RobotecAI/ROSCon2023Demo). You can download it from a [GitHub repository](https://github.com/RobotecAI/o3de-otto-robots-gem/). For more information, refer to the _README_ file of the Gem.

## License

The Gem is licensed under [Apache License, Version 2.0](https://opensource.org/licenses/Apache-2.0). You may elect at your option to use the [MIT License](https://opensource.org/licenses/MIT) instead. Contributions must be made under both licenses.

Models were created based on STL files kindly shared by [OTTO Motors by Rockwell Automation](https://ottomotors.com).
