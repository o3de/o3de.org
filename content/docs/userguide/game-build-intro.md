---
description: ' Create a variety of game builds in &ALYlong; for different purposes. '
title: Building &ALY; projects
---
# Building Lumberyard projects {#game-build-intro}

Building your Amazon Lumberyard game is the most important part of the development process \- it's how you debug, test, and distribute\. In this section of the guide, you'll learn how to configure your Lumberyard builds, get started with your first build, see which build types are available and what they offer, and how to use the Waf build system\. 

For instructions on bundling assets and distributing them with a release build, see [Build and bundle assets for release in Lumberyard](/docs/userguide/assets/bundle/tutorial-release.md)\. 

## Your First Lumberyard Build {#game-build-intro-config-and-build}

One of the first things you'll want to do with Lumberyard is configure the build system and see your [configured game project](/docs/userguide/configurator/intro.md) running as a stand\-alone executable or Visual Studio Solution\. 

**Note**  
You will need a copy of [Microsoft Visual Studio 2017](https://visualstudio.microsoft.com/) to build your Lumberyard game if you selected any of the following options in Lumberyard Setup Assistant:   
Compile the game code
Compile the engine and asset pipeline
Compile the Lumberyard Editor and tools

**Configure and build a Lumberyard game**

1. Open a command line window and navigate to the `Lumberyard_version\dev` directory\.

1. Configure the build system:

   ```
   lmbr_waf configure
   ```

1. Build your game project in profiling mode:

   ```
   lmbr_waf build_win_x64_vs2017_profile -p game_and_engine
   ```

   Depending on your hardware, the build may take a while to complete\.

To learn the general steps for creating a release build in Lumberyard, see [Build and bundle assets for release in Lumberyard](/docs/userguide/assets/bundle/tutorial-release.md)\. For more information about creating release builds for Android and iOS, see [Developing for Android and iOS with Lumberyard](/docs/userguide/mobile/support-intro.md)\.

## Topics {#game-build-intro-topics}


| Topic | Description | 
| --- | --- | 
| [Game Build Types in Amazon Lumberyard](/docs/userguide/game-build-types.md) | Learn about the available types of Amazon Lumberyard builds and when to use them during development\. | 
| [Using the Waf Build System](/docs/userguide/waf/intro.md) | Learn about the Waf build system, which is used by Lumberyard to configure and build game code\. | 
| [Build and bundle assets for release in Lumberyard](/docs/userguide/assets/bundle/tutorial-release.md) | Run through a tutorial and learn how to use the Asset Bundler, along with Waf, to create release builds\.  | 
| [Adding Custom Game Icons](/docs/userguide/game-build-custom-game-icons.md) | Add a custom icon to display in your game's window as part of a release\. | 