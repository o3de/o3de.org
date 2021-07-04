---
linkTitle: Wwise Audio Engine
title: Wwise Audio Engine Gem
description: The Wwise Audio Engine Gem provides support for using Audiokinetic Wave Works Interactive Sound Engine (Wwise) in Open 3D Engine (O3DE) projects.
toc: true
---

The Wwise Audio Engine Gem provides support for using the Audiokinetic Wave Works Interactive Sound Engine (Wwise) in Open 3D Engine (O3DE) projects.

The Wwise Audio Engine Gem requires the Audio System Gem.

For more information, refer to [Audio System Overvieew](/docs/user-guide/interactivity/audio/overview/).

## Enabling the Wwise Audio Engine Gem

To enable the Wwise Audio Engine Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the Wwise Audio Engine Gem to your project. Note that Wwise Audio Engine requires the [Audio System Gem](/docs/user-guide/gems/reference/audio/audio-system) as a dependency.

1. Download the [Wwise Launcher](https://www.audiokinetic.com/download/) and use it to install the Wwise audio SDK version 2019.2.8.7432 or later.

1. Add an environment variable named `LY_WWISE_INSTALL_PATH` to your computer that specifies the path to the version of the Wwise audio SDK that you want to use with O3DE.

1. Build your project using Project Manager, Visual Studio, or CMake.
