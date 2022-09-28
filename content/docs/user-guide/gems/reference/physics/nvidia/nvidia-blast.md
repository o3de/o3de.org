---
linkTitle: NVIDIA Blast
description: ' Use the NVIDIA Blast Gem to simulate destruction in your Open 3D Engine
  project. '
title: NVIDIA Blast Gem
draft: true
---

The NVIDIA Blast Gem uses the NVIDIA Blast library to provide fast, high-fidelity destruction simulation in Open 3D Engine.

{{< note >}}
NVIDIA Blast for O3DE requires a SideFX Houdini commercial or indie license to create assets. The apprentice license is not sufficient. For more information on Houdini, see [SideFX's home page](https://www.sidefx.com/).
The precompiled Houdini plug-ins supplied with the NVIDIA Blast Gem require Houdini 18.0.
{{< /note >}}

For NVIDIA Blast developer information, see [Simulated destruction with NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/).

## Functionality provided by the NVIDIA Blast Gem

The NVIDIA Blast Gem provides the following:

* **Blast Family Mesh Data** component that adds NVIDIA Blast meshes to an entity.

* **Blast Family** component that enables NVIDIA Blast simulation for an entity.

* **Blast Configuration** editor available in the **Tools** menu in O3DE Editor.

* **Blast Materials** to set physical properties for NVIDIA Blast assets available in **Asset Editor**.

* **Blast Script Canvas** nodes to script destruction simulation.

* Plug-ins and Houdini Digital Assets for SideFX Houdini to fracture geometry and export NVIDIA Blast assets.

* A Python Asset Builder to process NVIDIA Blast assets and generate blast slices.

* A public C++ API that allows other systems and Gems to access NVIDIA Blast simulation functionality.

## Enable the NVIDIA Blast Gem

1. Use **Project Manager** to add the NVIDIA Blast Gem to your project. The NVIDIA Blast Gem requires the following Gems as dependencies:

   * **LmbrCentral**

   * **PhysX**

   {{< important >}}
   Though not required, we highly recommend that you enable the [Python Asset Builder Gem](/docs/user-guide/gems/reference/script/python/python-asset-builder) with the NVIDIA Blast Gem. The NVIDIA Blast Gem includes a Python asset builder script that automatically processes mesh assets for NVIDIA Blast and creates a blast slice asset.
   {{< /important >}}

1. Configure the build:

   ```cmd
   cmake -B <CMake build dir> -S . -G "Visual Studio 16" 
   ```

   {{< note >}}
Use `Visual Studio 16` as the generator for Visual Studio 2019, and `Visual Studio 17` for Visual Studio 2022. For a complete list of common generators for each supported platform, refer to [Configuring projects](/docs/user-guide/build/configure-and-build/#configuring-projects).
   {{< /note >}}

1. Build your project:

   ```cmd
   cmake --build <CMake build dir> --target <Project name> --config profile -- -m
   ```
