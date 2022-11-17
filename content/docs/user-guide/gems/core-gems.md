---
linktitle: Core Gems
title: Gems Providing Core Open 3D Engine Functionality
description: An overview of Open 3D Engine Gems which offer common functionality core to games and simulations.
weight: 300
---

While Open 3D Engine's architecture and core frameworks provide the backbone and infrastructure to support game and simulation development, most features that are usually required for creating projects come in the form of extensions to the core through the Gem system. Not all of these Gems are used by released projects using the O3DE runtime - some are specific to the Editor, Asset Processor, or other O3DE tools.

Even if a Gem only adds Editor or Asset Processor functionality, it should be included as part of your project's Gems. 

{{< note >}}
All projects require the O3DE Core (LmbrCentral) Gem to provide core Editor functionality.  O3DE Core (LmbrCentral) also provides many components for gameplay.  Read the [O3DE Core (LmbrCentral) documentation](../reference/o3de-core) for more information.
{{< /note >}}

These Gems are only built and loaded for products that require them:

* **Atom** - The real-time physically based renderer used by O3DE. In addition to rendering at runtime, Atom provides Editor components and asset processing tools. For more information on Atom, read the [Atom Guide](/docs/atom-guide).

* **CameraFramework** - Components for placing and controlling cameras. Read the [Cameras documentation](/docs/user-guide/components/reference/camera/camera) for more information.

* **EMotionFX** - The EMotionFX Gem includes a suite of Editor and asset processing tools for artists and animators. It also brings support for processing animations from network traffic, and the ability to control animation states via C++ APIs.

* **AudioSystem** - The core set of audio abstractions used by O3DE. This provides the set of interfaces used by audio implementations for O3DE, such as the Wwise Audio Gem. Read the [Audio documentation](/docs/user-guide/interactivity/audio/) for more information on how audio works with O3DE.

* **PhysX** - Support for physics simulations with NVIDIA PhysX. Read the [NVIDIA PhysX in O3DE documentation](/docs/user-guide/interactivity/physics/nvidia-physx/) for more information.

* **ScriptCanvas** and **GraphCanvas** - Script Canvas is the graphical scripting language used by O3DE, with its Editor UX tools powered by the GraphCanvas Gem. The ScriptCanvas Gem itself provides the Script Canvas tools and runtimes. Read the [Script Canvas documentation](/docs/user-guide/scripting/script-canvas/) for more information.

* **EditorPythonBindings** - Support for dynamic Python scripting of the Editor. Read the [Python Bindings Examples](/docs/user-guide/editor/editor-automation/#python-editor-bindings-gem-examples) for more information.

* **PythonAssetBuilder** - Adds Asset Processor support for building assets via Python scripts. Read the [Python Asset Builder Gem documentation](/docs/user-guide/assets/builder/) for more information.

* **ImageProcessing** - Adds the ability to handle common image formats to the Asset Processor.
