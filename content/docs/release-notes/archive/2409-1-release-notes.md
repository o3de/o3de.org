---
linktitle: 24.09.1 Release Notes
title: Release Notes for Open 3D Engine 24.09.1
description: Full release notes for Open 3D Engine (O3DE) version 24.09.1.
weight: 889
toc: true
---

# O3DE 24.09.1 Release Notes

24.09.1 is a maintenance release to fix issues found in the 24.9.0 release. 

**General**

* Fix leaking of Decal textures when reloading levels  
* Fix  iOS performance issue due to new version of spirv-cross
* Fix shadow banding on mobile  
* Windows installer tar fix   
* Double-quote windows command calls to support spaces in paths   
* Fixes for script-only mode on Windows   
* Fixes for two AR test crashes
* Python boot-strapping fixes for the Linux installer
* 
**Robotics and Simulation**

* Update ros2 template package \#769 fixes version numbers of the project templates;  
* Fix ROS2FrameComponent::UpdateNamespaceConfiguration()   
* Extend functionality of FrameConversion.py to handle overrides.  
* Allow ROS2 Frame Component to be present on Level Entity.  
* Fix FollowingCameraComponent: allow fly camera   
* Registry setting for pipeline modification  
* Revert of \`Fix bug in a spawner component\`

**O3DE Binaries Site**

* Allows download of current version \- 1 installers and debian package  
* Now also hosts an offline installer
