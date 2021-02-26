---
description: " Dive into how Amazon Lumberyard\u2019s tools and systems work together\
  \ to help you create games and immersive experiences. "
title: How Amazon Lumberyard works
---
# How Amazon Lumberyard works<a name="wg-how-lumberyard-works"></a>

Amazon Lumberyard provides a complete, end\-to\-end environment for developing and delivering games and simulations, and supports a wide variety of platforms. Since it's such a large development environment with so many different features and tools, it can be intimidating to new users, especially for those who don't have a traditional developer background\. This topic covers the various parts of Lumberyard at a high level and the common ways you can work with it depending on your role or task as a new or experienced game developer or designer\.

Lumberyard has several tools, editors, and systems that work together to help you assemble a game\. Central to this is the "Lumberyard game engine", which provides the following:
+ Graphics rendering and output
+ Game logic execution
+ Messaging across game systems and components
+ Memory and resource abstraction and management
+ Multi\-threading support for input, audio, physics simulation, user interfaces \(UI\), artificial intelligence \(AI\), networking and multiplayer, and other common game features
+ Asset management and packaging

The engine itself is really just a collection of components and modules, called *Gems*\. When developing, you use the Lumberyard Editor and tools to assemble the engine for your game, choosing and adding these gems and modules as you develop it\. You also use the Lumberyard tools to add your assets-​including textures, meshes, sounds, music, and scripts-​to construct your game's unique experience and gameplay\.

Think of Lumberyard as a collection of discrete elements: code, scripts, various GUI\-based editors, and command line tools\. When you compile a game project, Lumberyard's build scripts pull in all the pieces specified in your project's configuration to build your game\. The parts of the engine that go into your game are only those you've configured your project to use, and there's very little functionality included in the final compiled code that you didn't ask to have in it\. Likewise, the asset bundling and management tools make sure you only ship with the assets you actually use in your game\.

You can build a game in Lumberyard just using the Lumberyard Editor, but you will be constrained to the Gems and tools provided \(along with the assets and scripts you create\)\. If your ambitions are greater-​if you want to evolve Lumberyard to support features and systems we haven't provided in the box-​read on\.

## Overview of the Lumberyard framework<a name="how-ly-works-overview"></a>

The Lumberyard installation provides a sandbox of different bits to combine, including over 100 gems and modules for you to use in your game\. As a high\-level concept, think of Lumberyard as a framework-​a conceptual structure from which you can add new features or remove anything you don't plan to use in your game\. When you need to change or extend the behavior of something, you don't need to go to some massively over\-architected set of code files and hack or refactor a feature in to your game's code\. Rather, you just work with only the gem or module that contains the functionality you want to change\. By focusing on modularity, you can safely experiment with different feature changes without risking progress on the entire game with an unintended regression\.

Central to Lumberyard is the **AzFramework** library, which relates all of the systems, modules, and Gems into the infrastructure for your game\. The Event Bus \(EBus\) system provides request and notification messaging across the DLLs for these systems, modules, and Gems\. As a developer, you write C\+\+ code to implement methods defined in C\+\+ API headers that define the functionality you need\.

The default Lumberyard installation is to `{drive-letter}:\Amazon\Lumberyard{lumberyard-version-number}\` on your PC\. There are two folders under it: `\dev` and `\3rdParty`\. We'll examine the most important contents of \\dev, which is where AzFramework and all of the various Gem and module interfaces are defined, as well as the EBus interfaces\. It also contains scripts, samples, and Editor assets\.
+  `\dev\Bin64vc142` \(or, in versions prior to 1\.24, `\dev\devBin64vc141`\) contains the asset builder libraries, the Lumberyard editor modules \(plugins\) and libraries \(under `\EditorPlugins`\), among other things\. Build and configuration logs are under `\Logs`\.
+  `\dev\Code` contains the C\+\+ API headers that you'll include in any code you create to extend the core functionality of Lumberyard\. They are organized under folders for each of the systems or features that you want to extend\. Most of them are virtual interfaces that you'll implement so you connect that functionality to the relevant Lumberyard system or feature through EBus, or contain the expected type and template definitions to use\. These include:
  +  `\Code\CryEngine` contains API headers and C\+\+ code files for CryEngine systems and features\. If you need to tweak the behaviors of CryEngine, including the 3D renderer, the legacy physics engine, the GridMate networking engine, or other components of the CryEngine, start with the source files in this directory\.
  +  `\Code\Framework` contains the AzFramework APIs\. AzFramework is the core Lumberyard framework that defines all the systems, including Gems, systems engines, and EBus\.
    +  `\Code\Framework\AzCore\AzCore`: Contains all of the APIs for interoperating with Lumberyard's systems, modules, and Gems\. If you are extending Lumberyard's default functionality, this is where you'll find all the APIs you need\.
    +  `\Code\Framework\GridMate`: Contains the GridMate networking APIs\.
+  `\Editor` contains all the assets, scripts, and configuration files for the Lumberyard Editor as well as some of the various editors it manages, such as the Materials Editor, the UI Canvas Editor, and the Particle Editor\.
+  `\Engine` contains all the default asset binaries, script files \(`.lua`\), entity configuration files \(`.ent`\), material definition files \(`.mtl`\), shader extensions \(`.ext`\), and engine configuration files for Lumberyard\.
+  `\Gems` contains all the source and build files for the Gems that ship with Lumberyard\. When you create a new Gem, you'll add the code and build sources here, and then enable the Gem through the Project Configurator\.
+  `\ProjectTemplates` contains the game project templates you can choose from when initially configuring Lumberyard for your game's development\.
+  `\SamplesProject` and `\StarterGame` contain samples and a complete game level for you to review\.
+  `\Tools` contains a number of tools and SDKs you'll use throughout the development of your game, including:
  +  `\Tools\AWSNativeSDK`: Contains scripts for obtaining various platform\-specific SDKs for working with Amazon's cloud services in their native languages\.
  +  `\Tools\AWSPythonSDK`: Contains Python SDKs for working with Amazon's cloud services\.
  +  `\Tools\AzCodeGenerator`: Contains the binaries and configuration files for AZ Code Generator, which is a command\-line utility that generates source code \(or any data or text\) from specially tagged source code\. For more details, see [Automating Boilerplate with Az Code Generator](/docs/userguide/codegen/intro)\.
  +  `\Tools\build`: Contains scripts and tools for building your game project with Waf including the `lmbr_waf` command\-line build utility\.
  +  `\Tools\CrySCompileServer`: Contains the executable and libraries for the CryEngine shader compiler service\.
  +  `\Tools\LuaRemoteDebugger`: Contains the executable and libraries for the Lua script remote debugging tool\.
  +  `\Tools\Python`: Contains all basic Python libraries and the interpreter\. Lumberyard supports a minimum version of 3\.7\.5\.
  +  `\Tools\Redistributables`: Contains common packages and files that you can ship with your game, including DirectX and Visual Studio DLLs\.
  +  `\Tools\RemoteConsole`: Contains the Lumberyard remote console application\.

Lumberyard also provides two command\-line tools, `Lmbr.exe` and `Lmbr_waf.exe`, which you use to manage your game project overall and configure the details of your game project during development\.
+  `Lmbr.exe`\-\-Provides a set of commands for managing and tracking Gems, capabilities, and 3rd party tools and packages\.
+  `Lmbe_waf.exe`\-\-Provides a set of commands for automating the building and packaging of game projects with [the Waf build automation framework](https://waf.io/book/)\.

All of these parts-​plus some not listed here-​define Lumberyard, and can be used to construct your game\. As you incorporate Lumberyard systems and develop your own, you will want to communicate across them\. For that, we have EBus\.

## Working with Gems<a name="how-ly-works-extending"></a>

Many of Lumberyard's capabilities are implemented through *Gems\.* A Gem is a packaged extension that can be enabled in a project to add functionality or features\. Gems might contain module code, assets, scripts, supporting files and references to other Gems\. Using Gems enables you to choose the features you need for your project and exclude those that aren't necessary\. By keeping everything modular and only using what you need, the Gem system lets you iterate faster\. Asset collections, code samples, components, libraries, tools, and even entire game projects can be distributed as Gems\.

You enable Gems when you create your project in Project Configurator\. You can return to Project Configurator at any time to enable additional Gems and disable unused Gems\. When you create your first project, be sure to click the **Enable Gems** option in Project Configurator to see the list of Gems available\. Some Gems are core systems and required for all Lumberyard projects\. Other Gems are extensions for existing Gems and require their dependencies be enabled for your project\. Gems you enable are detected and built automatically when you build your project\.

You can create your own Gems and easily reuse and distribute your own code and assets\. To get a better idea what goes into creating a Gem, have a look at the Gems directory of your Lumberyard installation and examine the included Gems\. The process for creating your own Gem is through Project Configurator, and is very similar to creating a project\.

## Messaging between systems with EBus<a name="how-ly-works-messaging"></a>

All of Lumberyard's Gems and systems, as well as the components in your projects need a way to communicate with each other\. Lumberyard uses a general\-purpose communication system called Event Bus \(EBus for short\)\.

As discussed earlier, Gems and systems are typically implemented as DLLs\. EBus is used to communicate between them-​and specifically, to invoke functions in one Gem or system from another\. EBus provides both request and publish/subscribe event interfaces \(buses\) that allow calls across those DLLs\. For example, if you've created a Gem for custom physics behaviors and you'd like to provide data to the CryEngine renderer, you'd do so by implementing an EBus interface in your Gem\.

We provide the interfaces for the Gems and systems DLLs we ship as headers in the default installation\. To use the functionality in these DLLs, you use the interfaces in these headers to register for a single cast \(Event\) or broadcast \(Broadcast\) event, or through supplying a data request functor to a Request Bus handler\.

Likewise, to expose functionality from your own gems and provide data to another system, you must inherit the virtual interface declared in the corresponding header file and implement the handlers on that interface in your Gem's classes, and then register that handler with the EBus system\. Specifically, you'll register a handler you create with EBus, which will pass a pointer to your class method to the targeted system or post a notification to the systems that are subscribed to it\.

Inside of your Gem code, you also manage the connection and disconnection of your implemented handler for the EBus\. EBus is just a list of handlers that calls all the functors \(function pointers\) registered with it\.\.

For singleton handlers where you only need one interface to communicate across DLLs, consider using [AZ::Interface](/docs/userguide/az-interface) and [AZ:Event](/docs/userguide/az-event) directly, without EBus\.

There are two types of EBus:
+ Request bus: This EBus type registers a handler for a method that can be called by other systems\.
+ Notification bus: This EBus type provides a messaging interface for notifications that systems can publish or subscribe to\.

EBuses have many advantages over traditional polling methods:
+ Abstraction - Minimize hard dependencies between systems\.
+ Event\-driven programming - Eliminate polling patterns for more scalable and higher performance software\.
+ Cleaner application code - Safely dispatch messages without concern for what is handling them or whether they are being handled at all\.
+ Concurrency - Queue events from various threads for safe execution on another thread or for distributed system applications\.
+ Predictability - Provide support for ordering of handlers on a given bus\.
+ Debugging - Intercept messages for reporting, profiling, and introspection purposes\.

EBuses are configurable and support many different use cases:
+ As a direct global function call\.
+ Dispatch processing to multiple handlers\.
+ Queue all calls, acting like a command buffer\.
+ As an addressable mailbox\.
+ For imperative delivery\.
+ For queued delivery\.
+ Automatic marshaling of a function call into a network message or other command buffer\.

For details on using EBus, read:
+  [Working with the Event Bus \(EBus\) System](/docs/userguide/programming/ebus/intro)
+  [Event Buses in Depth](/docs/userguide/programming/ebus/in-depth)

## The Component Entity system<a name="how-ly-works-component-entity"></a>

But what about the parts of your game that are actually in the game proper? Lumberyard has a model for that as well, called the component entity system\.

Understanding the component entity system is fundamental to using Lumberyard\. It's conceptually simple: Every in\-game object you create for your project is an *entity*, with a unique ID and container\. Each entity contains *components* that provide functionality\. The functionality components provide is broad and includes primitive shapes, meshes, audio, artificial intelligence behaviors, animation, visual effects, physics, scripts, and so much more\. There are even components that provide tool and debugging functionality\.

As an example, suppose you want to create a door entity that can be opened and closed\. You made a mesh and a couple audio files\. Now, consider the functionality your door must have\.
+ Display the door model\.
+ Play back the audio files when the door opens and closes\.
+ Prevent passing through the door when it's closed\.
+ Animate the door open and close\.
+ Trigger the door open and close by some mechanism\.

Knowing the functionality your door entity needs, you add components to the entity for each aspect of the door, including its presence in the game world and the ways a player can interact with it\. A *Mesh* component visually represents the door in the game world\. *Audio Trigger* components provide the audio when it opens or closes\. A *PhysX Collider* component prevents a player from passing through the door when it's closed\. *Script Canvas* components define the behaviors, including animation and sound playback, when the door is opened or closed\. Whatever behavior you need to model, each entity is going to have a collection of components to support it\. The only component common to all entities is the *Transform* component, which provides the position, orientation and scale of your entity in the game world\.

Entities are easy to grasp and create, but can become complex\. If the entity requires a lot of functionality, the list of components grows quickly\. What if you want to add a latch with its own animation and audio to the door? What if you want to add a breakable glass pane to the door? Suddenly, the entity goes from having five components to dozens of components\. This is where *slices* come in\.

A slice, like an entity, is a container with a transform behavior\. Instead of containing components, a slice contains one or more configured entities and might contain other slices as well\. To create a more complex door, you could have the initial door entity, a second entity for the latch and its components, and a third entity for the breakable glass pane and its components\. These three small entities are collected into a slice that provides a reusable, fully functional door asset\. You may have heard similar concepts referred to as *prefabs* in other software\. In Lumberyard, a slice is a collection of entities and/or other slices in a single reusable asset\.

Behaviors applied to a slice can potentially cascade down to all of the entities it contains, and then down to the components of that entity\. However, the reverse is not true, as it would make no sense for a window shattering to apply to a door latch\.

Once you've internalized the slice > entity > component hierarchy, consider how you would use these concepts to develop the various elements potentially populating your game levels and world\.

## The Lumberyard Asset Pipeline<a name="how-ly-works-assets"></a>

We've discussed what's in the Lumberyard installation, the basic framework of Lumberyard and how its various parts communicate with one another, and how you represent objects in your game\. But how do you create and manage assets for your game? After all, a door doesn't truly exist in your game if it doesn't have some form of representation\.

For the purposes of Lumberyard, we'll define an asset as a resource file, saved on disk, consumed by your project in some way\. An asset might be a font for your user interface, a bitmap file that contains a grassy terrain texture, a rock mesh you sculpted, animations for a character, etc\. Some assets might be created in Lumberyard\. Specialized files called *inputbindings* that map buttons from a game pad to input events for your project and *physicsmaterials* that describe the physical properties of surfaces, for example, are both created in Lumberyard's Asset Editor\.

For many reasons, the primary being performance considerations, these different assets cannot be consumed by Lumberyard without being converted to operating system specific, *game ready* data\. This process, going from a source asset file on disk to game ready data is the Asset Pipeline\. The processing is performed automatically by Asset Processor\.

Asset Processor is a background process \(you'll see its icon in the task tray when it's running\) that constantly scans directories in your project for changes in files\. When changes are detected, Asset Processor uses configurable rules to determine how to handle the changes\. The objective is to have game ready versions of all assets for each OS and each game directory in a location called the *asset cache*\. The asset cache is kept separate from your asset directories and can be automatically rebuilt entirely from your source assets by the Asset Processor\.

The asset cache contains a full image of all files \(except executables and related files\) needed to run your project\. Asset Processor keeps the image up to date, ensuring that new files are ready to use in the project runtime and Lumberyard Editor as soon as possible\. Your project runtime will only load assets from the asset cache and never directly from your asset source directories\.

Projects like modern games can have thousands of assets that need to be monitored and processed for multiple target operating systems\. To manage this complexity, the Asset Pipeline is completely configurable\. Here are just some of the configuration options available:
+ Specify what directories should be monitored for changes\.
+ Specify target operating systems and tailor the Asset Pipeline's behavior per target operating system\.
+ Set the number of concurrent processing tasks\.
+ Use metadata information to associate file types and process side\-by\-side assets\.
+ Add your own asset types to the Asset Pipeline\.
+ Batch process assets on a build server\.

When you're preparing to ship, you'll need to package the assets your project uses\. Even small projects can have hundreds of assets, including multiple versions of assets, many of them not required in your final project\. Manually tracking and determining which assets you need to ship can be tedious, time consuming an error prone\. Asset Bundler solves this for you\.

Asset Bundler makes shipping the specific assets used for the release of your game more reliable and repeatable\. Reliability is based on an underlying dependency system\. If you make changes to your project and add, remove, or update assets, Asset Bundler uses the dependencies to automatically determine which assets to include\. Repeatability is based on underlying configuration files that provide consistency each time you run Asset Bundler\.

## Scripting for the Lumberyard framework<a name="how-ly-works-scripting"></a>

Now, you've created assets and defined them in your game using slices, entities, and components\. You have an empty level or world to roam, but where's the game? That's where scripting comes in\.

Lumberyard includes two scripting technologies for creating logic and behaviors: Script Canvas and Lua\.

Script Canvas is a visual scripting environment\. In the Script Canvas editor, you create, connect, and rearrange graphical nodes that provide a visual representation of the logic flow\. Script Canvas offers an approachable and easy\-to\-read environment to author behaviors using the same framework as Lua and C\+\+\. You can use Script Canvas to create scripts without needing to know how to code\.

To enable Script Canvas for Lumberyard, you must enable the Script Canvas Gem\.

Lua is powerful, fast, lightweight, embeddable scripting language\. Lua facilitates quick iteration in your project because you can run your changes immediately without needing to recompile your source code\.

Lumberyard's functionality is exposed to Script Canvas and Lua by the behavior context\. The behavior context reflects runtime code and makes it accessible to scripts by providing bindings to C\+\+ classes, methods, properties, constants, and enums\. The behavior context also provides bindings for Lumberyard's EBus so you can dispatch and handle events through Script Canvas and Lua\.

Functionality for both Script Canvas and Lua is added to entities through components\. You can have multiple script components and mix and match between Lua and Script Canvas within your entities\. This approach enables you to create small, manageable modules of logic and behavior that can be reused throughout your projects\.

## Further learning<a name="how-ly-works-further-reading"></a>

As you've probably suspected, there's a lot more to Lumberyard than this, but we hope this gives you a good sense of where to start your searches for greater detail in our docs and code\. Here's a few additional links to help you explore further:

For some great videos on getting started with Lumberyard, check out our [Getting Started video tutorial series](https://aws.amazon.com/lumberyard/gettingstarted/)\.

For some docs to get you started, check out the following topics:
+  [Lumberyard Editor](/docs/userguide/editor/intro)
+  [Programming Concepts](/docs/userguide/lumberyard-programming-concepts)
+  [Gems](/docs/userguide/gems/builtin/s)
+  [Component Entity System](/docs/userguide/components/intro)
+  [Component Reference](/docs/userguide/components/components)
+  [Programmer's Guide to Entities and Components](/docs/userguide/components/entity-system-pg-intro)
+  [Emotion FX Animation Editor](/docs/userguide/char-intro)
+  [Script Canvas](/docs/userguide/scripting/scriptcanvas/intro)
+  [Lua Editor](/docs/userguide/scripting/lua/intro)
