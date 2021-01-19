---
description: ' Precompile shaders for release builds of &ALYlong; projects into .pak
  files. '
title: Compiling Shaders for Release Builds
---
# Compiling Shaders for Release Builds {#asset-pipeline-shader-compilation}

If you build game projects with Lumberyard, shaders for release builds should be compiled and packaged into `.pak` files\. 

**Mobile devices** – On mobile devices, runtime shader compilation is not supported for release builds\. Shaders will compile at run time only if you are running in profile mode or debug mode and can connect to a [remote shader compiler server](/docs/userguide/materials/shaders/custom-dev-remote-compiler.md)\. For more information, see the following:
+ [Connect to the Shader Compiler](/docs/userguide/mobile/android/build-deploy#running-the-shader-compiler-for-android)
+ [Creating a Release App](/docs/userguide/mobile/ios/creating-release-app.md)
+ [Running the Shader Compiler on Amazon EC2](/docs/userguide/mobile/running-shader-compiler-amazon-EC2.md)

**macOS** – On macOS, the shader compilation pipeline depends on the High\-Level Shader Language \(HLSL\) optimizer\. You must connect to a shader compiler on your PC or macOS when running a game on macOS during development\. This compiles the required subset of shaders for your game, on demand\. For more information, see [Building Shaders for macOS Games](/docs/userguide/macos/shaders-building.md)\.

**Windows DirectX** – On Windows builds that use the DirectX module, runtime shader compilation is supported for release builds\. However, it is highly recommended that you compile shaders into `.pak` files for performance reasons\. Compiling shaders at run time can cause unwanted frame rate fluctuations\. In addition, objects that use shaders compiled at run time may fail to appear until the shaders are successfully compiled\.

The following shader `.pak` files are required for release builds:
+ `Shaders.pak` – Required only if you want to support runtime compilation\. Source shaders are located in the `lumberyard_version\dev\Engine\Shaders\` directory\. 
+ `ShaderCache.pak` – Compiled shaders of all possible combinations that Lumberyard uses\.
+ `ShaderCacheStartup.pak` – Compiled shaders that are used during start\.



## Generating Shader \.pak Files {#generating-shader-pak-files}

To generate shader `.pak` files, use the following tools:
+ **Shader Compiler** – The shader compiler server generates the `ShaderList.txt` file that contains the list of all shaders for your game\. This server can run locally or on a remote PC\. 

  For more information, see [Remote Shader Compiler](/docs/userguide/materials/shaders/custom-dev-remote-compiler.md)\. 
+ **`ShaderCacheGen.exe`** – File that populates the local shader cache folder with all the shaders contained in the `ShaderList.txt` file\. 

  For more information, see [ShaderCache\.pak File Generation](/docs/userguide/materials/shaders/custom-dev-cache-intro#mat-shaders-custom-dev-cache-generation)\.
+ **`lmbr_pak_shaders.bat`** – Batch file that generates the `ShaderCache.pak` files\. 

  For more information, see [ShaderCache\.pak File Generation](/docs/userguide/materials/shaders/custom-dev-cache-intro#mat-shaders-custom-dev-cache-generation)\.