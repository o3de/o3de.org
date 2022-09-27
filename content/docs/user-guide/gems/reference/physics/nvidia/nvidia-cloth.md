---
linkTitle: NVIDIA Cloth
title: NVIDIA Cloth Gem
description: The NVIDIA Cloth Gem provides functionality to create fast, realistic cloth simulation with the NVIDIA Cloth library.
toc: true
---

Physical cloth simulations can create more immersive environments and characters. The NVIDIA Cloth Gem uses the NVIDIA Cloth library to provide fast, robust cloth simulation in Open 3D Engine.

For information on using NVIDIA Cloth, see [Simulate cloth with NVIDIA Cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/).

## Functionality provided by the NVIDIA Cloth Gem 

The NVIDIA Cloth Gem provides the following:

* **Cloth** modifier for Mesh and Actor import in **FBX Settings**.

* **Cloth** component for entities that contain a **Mesh** or **Actor** component.

* Cloth colliders that can be added to actors in **Animation Editor**.

* Mesh and Actor example assets and prefabs located in: `\Gems\NvCloth\Assets\`.

* A public C++ API that allows other systems and Gems to access cloth simulation functionality.

## Enable the NVIDIA Cloth Gem

To enable the NVIDIA Cloth Gem, do the following:

1. Use Project Manager to add the NVIDIA Cloth Gem to your project. The NVIDIA Cloth Gem requires the following Gems as dependencies:

   * **LmbrCentral**
   
   * **Emotion FX Animation**

1. Configure the build:

   ```
   cmake -B <CMake build dir> -S . -G "Visual Studio 16" 
   ```

1. Build your project:

   ```
   cmake --build <CMake build dir> --target <Project name> --config profile -- -m
   ```
