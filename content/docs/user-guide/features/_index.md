---
description: ' This section describes the major O3DE systems. '
title: 'O3DE Systems'
weight: 300
---

O3DE consists of the following major systems that help you develop levels within the editor:
+ [Employing artificial intelligence](/docs/userguide/ai/intro.md)

  Artificial Intelligence \(AI\) is a technology or system that endows seemingly intelligent actions and behaviors to an agent or character, called the AI agent\. An AI agent is a game entity that uses information to make decisions in pursuit of one or more goals\.

   
+ [Adding Audio and Sound Effects](/docs/user-guide/features/interactivity/audio/intro.md)

  The audio translation layer \(ATL\) provides an interface between O3DE and third\-party audio middleware so you can change your audio implementation without affecting the game logic\.

   
+ [Create and animate characters](/docs/user-guide/features/visualization/animation/char-intro.md)

  The character animation system combines skeletal\-based deformation of meshes with morph\-based vertex deformation to facilitate complex animation\. You can create realistic character movements by playing and blending animation sequences, controlling facial expressions, and applying damage effects\. Characters can play scripted movements, employ AI navigation\.

   
+ [Create cinematic sequences](/docs/user-guide/features/visualization/cinematics/intro.md)

  Cinematics are interactive movie animations\. You can use O3DE to add cutscenes to your game\. You can also add scripted events so that a sequence of objects, animations, and sounds are triggered in the game\. The players can view these from their own \(first person\) or another's \(third person\) perspective\.

   
+ [Working with component entities](/docs/userguide/components/intro.md)

  The component entity system provides a modular and intuitive construction of game elements, such as lights, cameras, trigger areas, and objects\. The component entity system works at both the system level and the entity level\. It employs reflection, serialization, event bus \(EBus\) messaging, fully cascading slices, and the ability to drag and drop and edit entities and their components in O3DE Editor\.

   
+ [Add modular features and assets with Gems](/docs/user-guide/features/gems)

  Gems are packages that contain code and assets to augment your game projects, such as the ChatPlay and Woodland Asset Collection gems\. You can select gems to include in your project through the O3DE [Project Configurator](/docs/userguide/configurator/intro.md) and from the command line\.

   
+ [Creating levels and adding environment effects](/docs/userguide/level-intro.md)

  A level, also known as world or map, represents the space or area available to the player while completing a game objective\. A level's environment includes lighting, terrain, bodies of water, vegetation, sky, and weather effects\.

   
+ [Materials](/docs/userguide/materials/intro.md)

  You can use the **Material Editor** to create and apply materials, map textures, set opacity and lighting effects, set shader parameters, create vertex deformations, tessellation, and more\.

   
+ [Adding particle effects](/docs/userguide/particles/intro.md)

  The particle effects system simulates explosions, fire, smoke, sparks, water spray, fog, snow, rain, and other effects\.

   
+ [Script Canvas](/docs/user-guide/features/scripting/script-canvas/intro.md)

  Create game logic and behaviors with O3DE's new visual scripting environment\.

   
+ [Shader Rendering System](/docs/userguide/materials/shaders/intro.md)

  O3DE's physically based rendering \(PBR\) shaders use real\-world physical rules and properties to describe how incoming light interacts with objects\. This means that object materials look more convincing under different lighting conditions\.

   
+ [Twitch ChatPlay System](/docs/user-guide/features/gems/chatplay/intro.md)

  The Twitch ChatPlay Gem provides a flexible framework to create customized game interactions between broadcasters and spectators on Twitch, the world's leading social video platform and community for gamers\. Twitch ChatPlay includes support for chat commands, polls, and surveys that can be triggered by Twitch viewers through the Twitch chat channel\.

   
+ [Creating and Customizing Project User Interfaces](/docs/user-guide/features/interactivity/user-interface/editor/intro.md)

  With the **UI Editor**, you can create and customize various parts of the game user interface, such as images, text, buttons, menus, scroll boxes, and heads\-up displays \(HUDs\)\.

   
+ [Create virtual reality projects in O3DE](/docs/userguide/vr/_index.md)

  Virtual reality \(VR\) is a technology that replicates the gaming environment and simulates a user's presence in it\. With virtual reality players, feel as if they are in the game world as they interact with the environment, characters, and objects\. O3DE's virtual reality system integrates the use of the Oculus Rift and HTC Vive head\-mounted displays \(HMD\) on PC gaming systems\.

   

The following O3DE tools are outside of the main editor and are used for project and game development:
+ [Working with the Asset Pipeline and asset files](/docs/user-guide/features/assets/intro.md)

  The Asset Pipeline converts source art and other assets into platform\-specific, game ready data\.

   
+ [Managing Game Projects with Lmbr\.exe](/docs/userguide/lmbr-exe.md)

  `Lmbr.exe` is a command\-line tool for managing capabilities, game projects, and gems\.

   
+ [Developing for Android and iOS with O3DE](/docs/user-guide/features/platforms/mobile-support.md)

  You can use O3DE to build your games for Android devices such as the NVIDIA Shield, Samsung Galaxy Note 5, and Motorola Nexus 6, and iOS devices that use the A8 GPUs or later\. See [Apple's GPU list](https://developer.apple.com/library/archive/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/HardwareGPUInformation/HardwareGPUInformation.html) for a list of these devices\.

   
+ [Create macOS projects in O3DE](/docs/user-guide/features/platforms/macos/intro.md)

  You can use O3DE to build macOS applications\.

   
+ [Creating O3DE Executables for Linux](/docs/user-guide/features/platforms/linux/intro.md)

  O3DE supports compiling and deploying the Windows client for a multiplayer project on a Linux dedicated server\.

   
+ [Project Configurator](/docs/userguide/configurator/intro.md)

  The Project Configurator is a standalone application that allows you to specify to the Waf build system which game projects and assets \(gems\) to include in a game build\. With it, you can create new projects, save active projects, configure advanced settings, and enable, disable, or create new gems\.

   
+ [Profiling, Testing, and Debugging Game Projects](/docs/userguide/programming/testing/debugging-intro.md)

  O3DE includes a number of tools for testing builds, profiling performance, and debugging\.

   
+ [Using the Waf Build System](/docs/userguide/waf/intro.md)

  With the Waf build system, you can switch between various build pipelines and ensure that you build only what is needed\. You can use extensions, such as automatic project generation, or a simple GUI to modify the command line base system for your project requirements\.