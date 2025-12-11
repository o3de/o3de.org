---
linkTitle: Registry Settings for Robotics Gems
title: Registry Settings for Robotics Gems
description: List of registry settings for the robotics Gems in O3DE.
toc: true
weight: 200
---

## Overview

The O3DE registry setting allows you to configure multiple aspect of engine and gem behavior. 
More on registry settings can be found in the [Settings Registry](docs/user-guide/settings/) document.

This document lists the available registry settings for the ROS 2 Gem and other robotics-related Gems in O3DE.

## ROS 2 Gem Registry Settings
The following table lists the available registry settings for the ROS 2 Gem:
| Registry Path                                                 | Description                                                                                       | Default Value                 |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------- |
| `/Amazon/Physics/EnableReducedCoordinateArticulations`        | Enables reduced coordinate articulations in the PhysX 5 gem.                                      | true                          |
| `/O3DE/InputSystem/Mouse/CaptureMouseCursor`                  | Disables capturing the mouse cursor by O3DE's input system.                                       | false                         |
| `/O3DE/ROS2/Camera/AllowPipelineModification`                 | Allows other Gems to add theirs feature processors to the ROS 2 camera pipeline.                  | false                         |
| `/O3DE/ROS2/PublishClock`                                     | Enables publishing of simulation clock to ROS 2.                                                  | true                          |
| `/O3DE/ROS2/ClockType`                                        | Simulation clock type. Refer to [Simulation Time](simulation-time.md)                             | `simulation`                  |
| `/O3DE/ROS2/SteadyClock/ResetTimestampOnLevelReload`          | Resets `simulation_time` to zero on level reload when using `simulation` clock.                   | true                          |
| `/O3DE/ROS2/xacro_executable_path`                            | Path to the xacro executable used for processing xacro files.                                     | `xacro`                       |
| `/O3DE/ROS2/GlobalFrameName`                                  | The name of the global frame used in the ROS 2 Gem. More in [ROS 2 Frame Component](docs/user-guide/components/reference/ros2/core/ros2-frame/). | `odom`                        |
| `/SimulationInterfaces/PrintStateNameInGui`                   | Enables printing the current state name of the Simulation Interfaces state machine in the GUI.    | true                          |
| `/SimulationInterfaces/StartInStoppedState`                   | Starts the Simulation Interfaces state machine in the Stopped state.                              | false                         |
| `/SimulationInterfaces/KeyboardTransitions/StoppedToPlaying`  | Keyboard binding to change simulation state from Stopped to Playing.                              | `keyboard_key_alphanumeric_R` |
| `/SimulationInterfaces/KeyboardTransitions/PausedToPlaying`   | Keyboard binding to change simulation state from Paused to Playing.                               | `keyboard_key_alphanumeric_R` |
| `/SimulationInterfaces/KeyboardTransitions/PlayingToPaused`   | Keyboard binding to change simulation state from Playing to Paused.                               | `keyboard_key_alphanumeric_P` |
| `/SimulationInterfaces/KeyboardTransitions/SimulatorFrame`    | The ROS 2 frame that is in Simulation Interface gem.                                              | `world`                       |

{{< note >}}
Setting `/O3DE/ROS2/Camera/AllowPipelineModification` to `true` allows other Gems to modify the ROS 2 camera pipeline by adding their own feature processors. 
It is useful if you want to extend the camera functionality with additional processing steps (e.g. global illumination, stars, weather). 
However, enabling this setting may lead to unexpected behavior if the added feature processors are not compatible with the ROS 2 camera pipeline.
{{< /note >}}
