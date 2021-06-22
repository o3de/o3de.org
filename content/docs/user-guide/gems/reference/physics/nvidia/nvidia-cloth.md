---
linkTitle: NVIDIA Cloth
title: NVIDIA Cloth Gem
description: The NVIDIA Cloth Gem provides functionality to create fast, realistic cloth simulation with the NVIDIA Cloth library.
toc: true
---

Physical cloth simulations can create more immersive environments and characters\. The **NVIDIA Cloth** gem uses the NVIDIA Cloth library to provide fast, robust cloth simulation in Open 3D Engine\.

For information on using **NVIDIA Cloth**, see [Simulate cloth with NVIDIA Cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/)\.

## Functionality provided by the NVIDIA Cloth gem {#nvidia-cloth-functionality}

The NVIDIA Cloth gem provides the following:
+ **Cloth** modifier for Mesh and Actor import in **FBX Settings**\.
+ **Cloth** component for entities that contain a **Mesh** or **Actor** component\.
+ Cloth colliders that can be added to actors in **Animation Editor**\.
+ Mesh and Actor example assets and slices located in: *lumberyard\_version*\\dev\\Gems\\NvCloth\\Assets\\
+ A public C\+\+ API that allows other systems and gems to access cloth simulation functionality\.

## Enable the NVIDIA Cloth gem {#enable-gem-nvidia-cloth}

To enable the NVIDIA Cloth gem, do the following:

1. Use [Project Configurator](/docs/userguide/configurator/projects.md) to add the **NVIDIA Cloth** gem to your project\. The **NVIDIA Cloth** gem requires the following gems as dependencies:
   + **LmbrCentral**
   + **Emotion FX Animation**

1. Configure the build:

   ```
   cmake -B <CMake build dir> -S . -G "Visual Studio 16 2019" 
   ```

1. Build your project:

   ```
   cmake --build <CMake build dir> --config profile --target <Project name> -- /m
   ```

For more information on gems, see the [Gems system documentation](/docs/user-guide/gems/_index.md)\.
