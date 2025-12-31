---
linktitle: 25.10.1 Release Notes
title: Release Notes for Open 3D Engine 25.10.1
description: Full release notes for Open 3D Engine (O3DE) version 25.10.1.
weight: 884
toc: true
---

# 25.10.1 Release Notes
The O3DE 25.10.1 is a maintenance release that resolves a few issues found in the [25.10.0 release](./2510-0-release-notes.md):
- Git is no longer required when using O3DE installers for Windows and Linux,
- Support for latest Android SDK (with Android Gradle Plugin 8.13),
- Support for Visual Studio 2026,
- Fix crashes when using Diffuse Probe Grid (regression in 25.10),
- ScriptCanvas is temporarily reverted from a standalone application to be again part of the main O3DE Editor. This resolves the slowness at startup and other several crashes when authoring visual scripts (regression in 25.10). The new behavior will be restored in the next major release together with the proper fixes, as the standalone version is the basis for introducing the debugging in ScriptCanvas.

# Full List of Changes

## SIG-Build
- Fix the setup process of new Android build nodes for the Automated Review on GitHub Actions. [o3de#19178]
- Remove the requirement to install Git when the SDK installer is used. [o3de#19355]
- Fix a compilation error on the latest MSVC 2026. [o3de#19371]

## SIG-Content
- Fix a potential crash due to a mismatching registration of the `AZ::s64` type. [o3de#19300]
- Add a compilation option to build ScriptCanvas Editor as a standalone application, rather than being part of the main O3DE Editor. It is now set to **off** by default, reverting the setting that was introduced in the previous release. [o3de#19356]

## SIG-Graphics-Audio
- Fix crashes when using the `DiffuseProbeGrid` component. [o3de#19175, o3de#19341]
- Fix the mapping of buffers that are not on the GPU devices where the `BufferPool` is enabled. [o3de#19210]
- Fix a warning message on Clang when building a project in the release mode. [o3de#19299]

## SIG-Platform
- Upgrade the build scripts to support the latest Android Gradle plugin 8.13. [o3de#19318]

## SIG-Simulation
- CameraSensor: Fix for sensors that were crashing if skinned meshes existed. [o3de-extras#1002]
- GNSSSensor: Fix for `NavSatFix` message (frame_id and timestamp set correctly). [o3de-extras#1005]
- ROS2: Add optional handlers to simplify implementation of services, actions and subscribers. [o3de-extras#1007]
- ROS2Controllers: Fix a compilation error in release mode. [o3de-extras#1000]
- Fix activation of the `SurfaceDataCollider` component. [o3de#19340]

# Known Bugs
- Resizing the Editor window while using Vulkan may cause noticeable lag.
- On Linux with Vulkan, resizing the Game Launcher window may cause the launcher to crash.
- The `DiffuseProbeGrid` component may not receive contributions from lights in the scene, resulting in a final image that is darker than expected. The proper behavior will be restored in the next `26.04.0` release but, in case you need a quicker solution, you can try to use the nightly build that already contains the required fix. Due to on-going changes to the render pipeline, this fix cannot be backported and applied to the current stable version.

# Additional Notes
- The minimum requirement of **CMake** for using **Microsoft Visual Studio 2026** with O3DE projects is set to version **4.2.0**. For any other compiler - such as Microsoft Visual Studio 2022 (and older) or Clang - it is still set to version **3.24**.
