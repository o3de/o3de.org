---
linkTitle: Deploying Simulation 
title: Deploying Simulation
description: Deploying a headless test tool with O3DE.
toc: true
weight: 520
---

## Overview

Robotic simulations are often deployed as part of a CI/CD pipeline. In such scenarios, running simulations with the Editor is not recommended.

## Deploying Release Build Game Launcher

For detailed instructions, please refer to the [Packaging and Release](docs/user-guide/packaging/) section. Deploying a robotic simulation is akin to deploying a game, but the result is an executable that has ROS 2 communication channels.

## Step-by-Step Project Template Release Example

This is an example of how to build a standalone package that can be run without the need for installing O3DE.
We will use one of [project templates](/docs/user-guide/interactivity/robotics/overview/#templates) to create a new project that will be build as monohlitic GameLauncher.
This is a step-by-step example of a minimal use case. 
You can use different project names and modify the process (e.g., by bundling assets).
Note that several prerequisites are required:

- O3DE setup from source
- [ROS2](https://github.com/o3de/o3de-extras/tree/development/Gems/ROS2) Gem registered
- [WarehouseSample](https://github.com/o3de/o3de-extras/tree/development/Gems/WarehouseSample) Gem registered
- [RosRobotSample](https://github.com/o3de/o3de-extras/tree/development/Gems/RosRobotSample) Gem registered

Ensure that other Gems are enabled if you intend to build other project templates.

### Creating a Project

Export variables pointing to the necessary paths:
```bash
export O3DE_HOME=/home/User/github/o3de/
export O3DE_EXTRAS_HOME=/home/User/github/o3de-extras/
export PROJECT_NAME=Ros2Project
export PROJECT_PATH=`pwd`/${PROJECT_NAME}
```

Adjust the locations for the variables `O3DE_HOME` and `O3DE_EXTRAS_HOME` to match your environment.
If you are deploying an existing project, adjust `PROJECT_NAME` to the project's name and `PROJECT_PATH` to the project's location.

Create a project from a template:
```bash
${O3DE_HOME}/scripts/o3de.sh create-project --project-path $PROJECT_PATH --template-path ${O3DE_EXTRAS_HOME}/Templates/Ros2ProjectTemplate -f 
```

## Toolset build

Build the toolset to process all necessary assets:
```bash
cd ${PROJECT_PATH}
cmake -B build/linux -G "Ninja Multi-Config" -DLY_DISABLE_TEST_MODULES=ON -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DLY_STRIP_DEBUG_SYMBOLS=ON
cmake --build build/linux --config profile --target ${PROJECT_NAME} ${PROJECT_NAME}.Assets
```

In the command above, you are instructed to build the `${PROJECT_NAME}.Assets` target, triggering the processing of all assets during the build. In larger projects, it is recommended to run the AssetProcessor directly. Refer to the [Process assets](docs/user-guide/packaging/windows-release-builds/#process-assets) section to learn more. Note that you can re-use your development build.
Note that you can re-use your development build. 
In that case, you need to run Asset Processor and verify if all assets were built (without any errors).

## Monolithic build

With assets processed, you can build a monolithic build, which includes all Gems and most libraries linked statically. 
It also excludes large editor-only frameworks like Qt.
Refer to [Create a project game release layout](docs/user-guide/packaging/windows-release-builds/#create-a-project-game-release-layout) to learn more.

To perform a monolithic build, use the `install` target:
```bash
cmake -B build/linux_mono -S . -G "Ninja Multi-Config"  -DLY_MONOLITHIC_GAME=1
cmake --build build/linux_mono --target install --config release
```

In the install directory `${PROJECT_PATH}/install/bin/Linux/release/Monolithic/`, you can find a package containing all necessary binaries and archives to run your simulation in the cloud or on another computer.

```
# tree ${PROJECT_PATH}/install/bin/Linux/release/Monolithic/
.
├── Cache
│   └── linux
│       └── engine.pak
├── libVkLayer_khronos_validation.so
├── Ros2Project.GameLauncher
├── Ros2Project.ServerLauncher
├── Ros2Project.UnifiedLauncher
└── VkLayer_khronos_validation.json
```

# Headless simulation

Often simulation needs to be run headless (e.g., as a part of CI/CD pipeline).
This can be achieved by disabling RHI in the GameLauncher. 
To run headless, start with `-NullRenderer -rhi=null`.
```bash 
./Ros2Project.GameLauncher -NullRenderer -rhi=null
```
The above command should work for environments that have no GPU. 
If your simulation relies on the ROS 2 Camera component, you will need RHI. 
In such cases, it can be simulated with third-party tools like `xvfb-run`, which creates a virtual X server environment.
```bash
xvfb-run ./Ros2Project.GameLauncher
```
