---
description: ' Build a macOS game using the &ALY; build tools. '
slug: osx-game-building
title: Building macOS Games
---
# Building macOS Games<a name="osx-game-building"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Before you can run your game on a macOS computer, you must ensure the shader compiler \(located in the `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile` directory\) is running on your PC\. For more information, see [Building Shaders for macOS Games](osx-shaders-building.md)\.

**To build your game for macOS**

1. On your Mac, in a Terminal window, navigate to the root directory of your Lumberyard installation \(`lumberyard_version/dev`\)\.

1. To generate an Xcode project and prepare the Lumberyard build system to build your app, run the following command: `sh lmbr_waf.sh configure xcode_mac`
**Note**  
Metal is the default renderer\.

1. Do one of the following to build your game:
   + Use a command line to build various targets of your game:
     + To build debug, run the following command: `sh lmbr_waf.sh build_darwin_x64_debug -p all`
     + To build profile, run the following command: `sh lmbr_waf.sh build_darwin_x64_profile -p all`
     + To build release, run the following command: `sh lmbr_waf.sh build_darwin_x64_release -p all`
   + Use Xcode and the generated solution located in the `Solutions` folder in the directory where you installed Lumberyard to build your game\.