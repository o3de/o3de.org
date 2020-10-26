# Lumberyard Programming Concepts and Resources<a name="lumberyard-programming-concepts"></a>

This topic provides brief explanations of some important Lumberyard programming concepts and resources\. More information links are provided\.

**Topics**
+ [Asset System](#lumberyard-programming-concepts-asset-system)
+ [AZ Code Generator](#lumberyard-programming-concepts-az-code-generator)
+ [Building](#lumberyard-programming-concepts-building)
+ [Cloud Canvas](#lumberyard-programming-concepts-cloud-canvas)
+ [Debugging](#lumberyard-programming-concepts-debugging)
+ [EBuses](#lumberyard-programming-concepts-ebuses)
+ [Entities and Components](#lumberyard-programming-concepts-entities-and-components)
+ [Gems and AZ Modules](#lumberyard-programming-concepts-gems-and-modules)
+ [Input](#lumberyard-programming-concepts-input)
+ [Lua](#lumberyard-programming-concepts-lua)
+ [Networking](#lumberyard-programming-concepts-networking)
+ [Reflection System](#lumberyard-programming-concepts-reflection)
+ [Script Canvas](#lumberyard-programming-concepts-script-canvas)
+ [Slices](#lumberyard-programming-concepts-slices)
+ [C\+\+ Best Practices for Amazon Lumberyard](cpp-best-practices-lumberyard.md)

## Asset System<a name="lumberyard-programming-concepts-asset-system"></a>

The Lumberyard Editor and Lumberyard runtime code use the Lumberyard [asset system](asset-pipeline-intro.md) to asynchronously stream and activate assets\.

For information on using the runtime asset system to load already\-built assets into a running instance of the engine, see [Programming the Lumberyard AZCore Runtime Asset System](asset-pipeline-asset-system-programming.md)\. 

For information on adding a custom asset type to Lumberyard, see [Adding an Asset Type to Lumberyard](asset-pipeline-asset-type-adding.md)\.

For information on creating a builder for custom assets, see [Creating a Custom Asset Builder](asset-builder-custom.md)\.

## AZ Code Generator<a name="lumberyard-programming-concepts-az-code-generator"></a>

You can use the AZ Code Generator command line utility to generate boilerplate code when the structure of the intended code is known in advance\. AZ Code Generator generates source code \(or any data or text\) from source code that is specially tagged\. 

For more information, see [Automating boilerplate with AZ Code Generator](az-code-gen-intro.md)\.

## Building<a name="lumberyard-programming-concepts-building"></a>

You can build your Lumberyard projects in *profile* mode, *debug* mode, or *release* mode\.

For more information, see [Building Lumberyard projects](game-build-intro.md)\. 

## Cloud Canvas<a name="lumberyard-programming-concepts-cloud-canvas"></a>

Lumberyard's [Cloud Canvas](cloud-canvas-intro.md) enables connected game features that use AWS cloud computing\. You can use the [cloud gems](cloud-canvas-cloud-gems-intro.md) that are included with Lumberyard to provide prepackaged cloud\-connected game features\. You can use the [Cloud Gem Framework](cloud-canvas-cloud-gem-framework-intro.md) to [create your own cloud gems](cloud-canvas-cgf-getting-started-create-gem.md)\. Each cloud gem has a web management interface called the [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md)\. You can use the Cloud Gem Framework to [develop your own Cloud Gem Portal](cloud-canvas-cgf-cgp-dev-gs.md)\.

For more information about programming with Cloud Canvas, see [Getting Started with the Cloud Gem Framework](cloud-canvas-cgf-getting-started.md)\.

## Debugging<a name="lumberyard-programming-concepts-debugging"></a>

Lumberyard includes a number of programming tools for testing, profiling, and debugging\.

For more information, see [Profiling, Testing, and Debugging Game Projects](testing-debugging-intro.md)\.

## EBuses<a name="lumberyard-programming-concepts-ebuses"></a>

EBuses \(event buses\) are Lumberyard's general\-purpose messaging system\. They dispatch notifications and receive requests\.

Components commonly use EBuses in two ways: to dispatch events from a `notification` bus or to handle requests using a `request` bus\. Some components provide one type of bus, and some components provide both types\. You use the EBus class for both EBus types\. Some components do not provide an EBus at all\.

To interact with the engine or other components in Lumberyard, include the component or system's EBus or API header in your code\. Then make calls to the exposed EBuses\. With this approach you can replace engine level system APIs with implementations that you define in a gem\. For example, you could replace Lumberyard's audio system with your own EBus handler\. This would give you complete control over audio without having to recompile the engine\.

For information about EBuses, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

For information about using EBuses in Lua, see [Using EBuses in Lua](lua-scripting-ces-using-ebuses.md)\.

## Entities and Components<a name="lumberyard-programming-concepts-entities-and-components"></a>

Lumberyard uses a lightweight entity/component model called the component entity system for both game objects and systems\. Lumberyard entities are simply an ID and a container of components\. They have no functionality associated with them\. Lumberyard's component model is granular: It expects each component to provide independent functionality\. It expects game objects to be made up of one or more entities with many components attached to each entity\. Lumberyard components communicate with each other using a messaging system called EBuses \(explained later\)\. Lumberyard expects you to use EBuses instead of holding references to other entities or their components\.

Lumberyard’s components have a simple lifecycle\. When an entity is activated, it calls `Activate()` on all of its components\. When the entity is deactivated, it calls `Deactivate()` on all of its components\. In the `Activate()` function a component sets itself up, connects to EBuses, and allocates resources or requests assets\. In the `Deactivate()` function, a component should release all resources and disconnect from all EBuses\. Components should be completely dormant after deactivation, and they should be in more or less the same state that they are in after `Init()` is called\. The `Init()` function is only called once and allows a component to initialize its internal state\. Note that a component can be activated and deactivated many times before it is deleted\. For example, it might be deactivated temporarily while it is being streamed out\.

The remaining API operations of a component should be established by the EBus that it implements\.

Components can depend on services\. Such services usually have a one\-to\-one relationship with EBuses\. If a component declares that it depends on \(requires\) a service, any entity that uses the component must also contain a component that provides the required services\.

Components are always activated in order of their dependency\. For this reason, a component can always assume that the services that it requires are available when the component is activated\.

Entities are never allowed to be in a state in which one of their component dependencies is missing, even during authoring\. In Lumberyard's editing tools, this means that components whose dependencies are missing are actually removed from the entity and stored in a temporary list\. When all of the component's dependencies become available, the component is restored to the entity\.

For more information about entities and components, see [Programmer's Guide to Entities and Components](component-entity-system-pg-intro.md)\.

## Gems and AZ Modules<a name="lumberyard-programming-concepts-gems-and-modules"></a>

Lumberyard is designed to create applications that are small executables\. A Lumberyard application has a simple application class \(`AZ::ComponentApplication`\)\. The application class reads a manifest \(a `gems.json` file\) and loads modules that provide functionality for your game\. Lumberyard calls these modules `gems`\. Lumberyard's goal is to have you choose a set of gems that match the requirements of your game and only compile what you need\. Lumberyard includes a variety of prebuilt gems that add functionality to the game engine, such as VR, cloud connectivity, and the EMotion FX animation system\. 

[Cloud gems](cloud-canvas-cloud-gems-intro.md) are gems that add AWS cloud\-connected functionality to your game\. 

When you create a game, your game code and assets go into one or more gems\. Each code gem contains an [AZ::Module](az-modules-intro.md)\. An AZ module is a collection of C\+\+ code built as a static or dynamic library \(\.lib or \.dll file\) that implements specific initialization functions\. The AZ module is the interface that Lumberyard uses to extract the contents of your gem into the global environment\.

Each application has a single entity associated with it that is referred to as the [system entity](az-module-system-entities-configuring.md)\. AZ modules can add components to this entity before it is activated\. 

Components that are added to the system entity are called [system components](az-module-system-components.md)\. System components are often singleton/manager\-type objects that aggregate or provide resources to game components or other systems\. Like other entities, a system entity must have its dependencies present\. You can assume that any systems that you depend on are booted and available when your system component is activated\.

For information on programming with gems, see [Programming with Gems](gems-system.md)\.

For information on creating system components, see [Creating System Components](component-entity-system-pg-creating-system-components.md)\.

## Input<a name="lumberyard-programming-concepts-input"></a>

Lumberyard provides independent, extensible, and efficient access to input data from supported operating systems and devices\. Lumberyard's AZ framework input interface provides abstracted interfaces for OS\-specific features like file I/O and application lifecycle management\. 

For more information, see [Input in Amazon Lumberyard](input-intro.md)\. 

## Lua<a name="lumberyard-programming-concepts-lua"></a>

[Lua](https://www.lua.org/) is a powerful, fast, lightweight, scripting language\. You can use Lua in Lumberyard to facilitate quick iteration of your game project\. When you construct new gameplay and game systems, you can run your changes immediately, without compiling your source code\. 

For more information on using Lua in Lumberyard, see [Writing Lua Scripts](lua-scripting-intro.md)\.

## Networking<a name="lumberyard-programming-concepts-networking"></a>

Lumberyard's networking system is designed for efficient bandwidth usage and low\-latency communications\. It uses a replica framework to synchronize objects over the network, and its session management integrates with major online console services\. Lumberyard networking lets you handle peer\-to\-peer and client\-server topologies with host migration and supports in\-game achievements, leaderboards, and cloud\-based saved games\. 

For more information, see [Using Lumberyard Networking](network-intro.md)\.

## Reflection System<a name="lumberyard-programming-concepts-reflection"></a>

You can use Lumberyard's reflection system to expose runtime code for C\+\+\-based objects, for Lumberyard Editor, and for scripting \(Lua and Script Canvas\)\. Lumberyard provides three reflection contexts for this purpose: a [serialization context](component-entity-system-reflection-serialization-context.md), a [behavior context](component-entity-system-reflection-behavior-context.md), and an [edit context](component-entity-system-reflection-edit-context.md)\.

For more information, see [Reflecting Lumberyard Classes, Methods, and EBus Interfaces](component-entity-system-reflection-intro.md)\. 

## Script Canvas<a name="lumberyard-programming-concepts-script-canvas"></a>

[Script Canvas](script-canvas-intro.md) is Lumberyard's visual scripting environment\.

For information on creating your own nodes in Script Canvas, see [Creating Custom Nodes in Script Canvas](script-canvas-custom-nodes.md)\. 

For information on using the behavior context to expose runtime code to Script Canvas, see [Script Canvas and the Behavior Context](script-canvas-behavior-context.md)\.

## Slices<a name="lumberyard-programming-concepts-slices"></a>

Slices are practical and powerful way to create units of content in Lumberyard and manage them\. A slice is a collection of one or more entities\. You can instantiate a slice as many times as you require\. Many game engines use levels and/or sublevels for their content, but Lumberyard loads content into its engine in the form of slices\. Because slices can inherit from each other and be nested, they are powerful tools for managing content\.

Like most systems that use prefabs or archetypes, you can use inheritance to override properties in Lumberyard\. However, you can use Lumberyard's slices to add or remove components or even entire entity hierarchies\. 

For more information, see [Working with Slices](component-slices.md)\.