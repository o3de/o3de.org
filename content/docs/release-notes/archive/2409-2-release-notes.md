---
linktitle: 24.09.2 Release Notes
title: Release Notes for Open 3D Engine 24.09.2
description: Full release notes for Open 3D Engine (O3DE) version 24.09.2.
weight: 888
toc: true
---

## 24.09.2 Release Notes

24.09.2 is a maintenance release to fix issues found in the 24.09.0 release. Primarily focused on performance optimizations and bug fixes. 

**General**

* GameLift server will only bring in Multiplayer gem server, resolving issues with GameLift in O3DE
* Fixed a linker error when building the ScriptCanvas.Editor gem in release mode, but only when unity builds are turned off. Resolves build issues with new projects.
* Fixed slow helper icon rendering (FPS going from 60 to 3) in high densisty scenes. Turning on Icon helpers in the editor no longer has an appreciable impact on performance.
* Fixes and improves the built-in crash reporting dialog by replacing invalid MFC code with NativeUIRequests dialog. The MFC dialogs were compiling but never showing up as their resources IDS were never registered. New Dialog: ![crash-dialog](https://github.com/user-attachments/assets/12de1db0-112a-4e4d-a587-059b1d3c1150)
* Fixed a shader reload bug
* Fixed race condition related with Material::m_shaderVariantReadyEvent
* Fixes race conditions and deadlocks when loading levels
* Fixed two race conditions in InstanceDatabase
* Fixed PreviewRenderer material update crash
* Fixed DX12::StreamingImagePool related deadlock
* Fixed deadlocks that occurred on some ASV tests
* Fixed an assert that occurs if you undo/redo prefab focus
* Fixed many issues discovered by the Address Sanitizer
* Fixed shadows not working after switching levels


**Robotics and Simulation**

* Resolved issues with the star component rendering with ROS2 Camera
* Resolved issues with sky component rendering with ROS2 Camera
* Experimental feature (hidden behind the registry setting) to allow pipeline modifications in render-to-texture functionality (used in ROS2 Camera) 
* Fixed issue with terrain rendering in ROS2 Camera
* Added if statement for 'remove' operations in FrameConversion script
* Fixed Gem dependency issue for projects created from ROS2 templates
* Fixed the templated DemoLevel prefab by restoring concrete component name to templated component name
* Removed reference to non-existing file in template in Ros2ProjectTemplate
* RobotImporter: Removed unused_variable warnings when release mode
* Moved Joint Trajectory State to TrajectoryComponent. Fixes issue with goals for robotics movement
* Fixed bug where joints weren't clearing in JointPositionEditorComponent
* Fixed PostProcessFeatureProcessor view aliasing in ROS2 camera
