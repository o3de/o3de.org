---
description: ' Create a project for your macOS applications using &ALY; tools. '
title: Creating a Project for Your macOS Games
---
# Creating a Project for Your macOS Games {#osx-game-creating}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

The topics in [Create macOS projects in Lumberyard](/docs/userguide/macos/intro.md) demonstrate how to use the Samples Project that is included with Lumberyard to build game assets, shaders, and macOS applications\. You can follow the same instructions to create a project for your own macOS game\.

**Note**
Ensure you have the prerequisites \(see [Create macOS projects in Lumberyard](/docs/userguide/macos/intro.md)\) and your Mac is properly set up to compile for macOS computers\.

**To create a project for your macOS game**

1. On your PC, use the Project Configurator to create a new project\. For information, see [Creating Lumberyard projects](/docs/userguide/configurator/intro.md)\.

1. Submit the new project into your revision control system and then check out the project onto your Mac\.

1. Edit the `user_settings.options` file \(located in the `lumberyard_version\dev\_WAF_` directory\) to set `enabled_game_projects` to the name of the project you created:

   ```
   [Game Projects]
   enabled_game_projects = MyProject
   ```

   You can simultaneously build multiple projects by separating each project name with a comma:

   ```
   [Game Projects]
   enabled_game_projects = SamplesProject,MyProject,OtherProject
   ```

1. In a command line window, configure and build your project using the instructions on the [Building macOS Games](/docs/userguide/macos/game-building.md) and [Running macOS Games](/docs/userguide/macos/game-deploying.md) pages\.
**Note**
If you enabled multiple projects, you can switch between multiple targets in your Xcode project\.