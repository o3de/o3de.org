---
linkTitle: Create with O3DE
title: Create with Open 3D Engine
description: Understand the different ways you can create with Open 3D Engine as a technical artist, designer, or programmer.
weight: 200
toc: true
---

Previously in this guide, we covered [key concepts](../key-concepts) and how to [set up **Open 3D Engine (O3DE)**](../setup). This topic provides an overview of creating with O3DE, beginning with some concepts all creators should keep in mind, then highlighting areas of interest for different creative roles.

## Modular tools and features

Development in O3DE is best understood if you keep a key O3DE design philosophy in mind as you learn: *Modularity*. The packages that make up O3DE, many of the creative tools, and even the visual scripting systems in O3DE use modular concepts to provide building blocks for your creative vision.

### Gems, the modules of O3DE

O3DE, its systems, and its environment are built as a collection of C++ modules called *Gems*. Gems are packaged code and assets that provide tools and functionality. The Atom Gem, for example, is a Gem containing several smaller Gems that provide the Atom libraries, interfaces, and tools such as **Material Editor**. The Atom Gem provides everything that is required to render your creations in real time. O3DE's Gems can contain just about anything, from runtime systems for game states and simulations, creative tools, utilities for profiling, debugging, and project management, or even assets such as models, animation, and textures.

 Choosing the right Gems based on the combination of your project's design and your workflows will keep your development process focused and likewise simplify managing your project.

All the functionality of **O3DE Editor**, the central creative tool of O3DE, is provided by Gems. O3DE ships with dozens of Gems as part of the installation, and you can acquire additional Gems from third parties, or write new ones yourself. When you build your project, the functionality of the Gems you've added are combined to create your project's runtime systems. You can obtain or create a Gem with just the functionality you need - and even maintain the code for it independent of your project! This means, for example, that a systems developer can work on AI functionality in a Gem and provide their AI Gem to creative teams. When the AI Gem is updated, designers can add or update the Gem in their project, with minimal disruption, and immediately use the new functionality the AI Gem provides.

Embracing the concept of modularity and creating your own Gems has a lot of benefits. By creating your own Gems you can reuse functionality and assets across projects easily, share your work with other creators, and even permit other contributors to extend and improve your Gem's functionality.

### Components, the modules of entities

You'll notice this philosophy of modularity throughout the tools and functionality of O3DE. For example, consider the concept of an *entity* in O3DE. An entity can represent just about anything in your project under O3DE's component entity system. By giving the entity components, you begin to shape the functionality and utility of the entity. The components are modules that specify entity behaviors and properties.

You might have an entity that you want to see and interact with that uses all of the following components:

* The default **Transform** component to define its position
* A **Mesh** component to define its visual geometry
* **NVIDIA PhysX** components to define collision characteristics and other aspects for a realistic, rigid body simulation
* An **Input** component to reference an input event-binding definition
* A **Script** component to automate some sort of behavior, or process input events from the player

...and many more!

Other entities that you create will be invisible and provide runtime utilities and features. These entities might exist to implement triggers, spawn environmental effects, or reference assets created with tools, such as a UI that you created in **UI Editor**.

## Working with O3DE Editor

O3DE Editor is the central hub for O3DE's creative tools. A major part of assembling a project in O3DE revolves around using the O3DE Editor to do the following:

* Place and group entities
* Add components to the entities
* Configure properties on the components
* Use tools associated with the components

Tools you might use that are associated to specific components include:

* **Script Canvas**, O3DE's visual editor for creating scripts, then reference the script from the **Script Canvas** component
* **Animation Editor** to animate actors, then reference from the **Anim Graph** component
* **Asset Editor** to create input bindings that bind raw player input, such as keystrokes, to events, then reference from the **Input** component
* **Audio Controls Editor** to setup sound effects that map to audio engine controls, then reference from the **Audio Trigger** and **Audio Switch** components

...and many more.

Some tools can be opened directly from their associated component. Others require you to open them from the **Tools** menu in O3DE Editor. The modular nature of O3DE means there are additional assets, components, and tools that you can add by enabling Gems in Project Manager. O3DE comes with a library of Gems that can include new code, new assets, or both! Check the Project Manager to see the full list of Gems available with O3DE.

You'll get a quick overview and navigation tutorial for O3DE Editor in the next topic, [O3DE Editor Tour](./editor-tour).

## Development roles

Depending on your role as an artist, designer, engineer, and the scope of the project that you're working on, you might not encounter all of the tools and technologies that O3DE provides. In the next section, we'll take a look at what tools and features you might want to focus on depending on your role.

### Artist

While much of your work as an artist might involve using tools outside O3DE, the tools O3DE provides bring all of your assets together into worlds and actors for people to visualize, interact with, and experience. You might work closely with a designer or double as a designer yourself. There is some overlap between the tools and functionality artists and designers use.

As an example, let's consider the workflow for setting up an actor in your project.

1.  Outside of O3DE, you create a character model, materials, textures, and rig for the actor.

1.  O3DE's **Asset Processor** automatically processes source assets into platform-specific runtime assets, ensuring new or modified files are ready to use in O3DE as soon as possible. You can use **Scene Settings** to modify how Asset Processor produces the runtime assets if needed.

1.  You import your actor file in Animation Editor and create a motion set to specify the motions that you want for your actor.

1.  Next, you create an animation graph using nodes, including blend trees, events, and states, to create complex animated behaviors for your actor.

1.  When you've built and previewed the animations and are ready to try them out in a runtime environment, you can switch over to O3DE Editor.

1.  In O3DE Editor, you create or open an existing test level.

1.  To see your animated character, you need an entity with:

    * An **Actor** component to create a controllable character with the actor file from Animation Editor and a material linked to your actor asset.
    * An **AnimGraph** component to use the animation graph and motion set assets that you created in the Animation Editor.

1.  To control your character in your level, you might want to work with a designer or programmer to add an **Input** component, **PhysX** components, and script components so you can test all of your character's animations in your project's specific environment.

We suggest that you begin your learning path by browsing the following set of O3DE tools and technologies, and then focusing on the ones that apply to your needs:

*  [O3DE Editor](/docs/user-guide/editor/)
*  [Asset Pipeline](/docs/user-guide/assets/pipeline/)
*  [Component Reference](/docs/user-guide/components/reference/)
*  [Animation Editor](/docs/user-guide/visualization/animation/animation-editor/)
*  [Scene Settings Tool](/docs/user-guide/assets/scene-settings/)
*  [Gem Library](/docs/user-guide/gems/)
*  [Cinematics and the Track View Editor](/docs/user-guide/visualization/cinematics/)
*  [Shaders and Materials](/docs/atom-guide/look-dev/)


### Designer

O3DE Editor is an important, core tool for designers. It's where you create your levels, populate them with entities, and assign components to those entities. It also provides access to important tools such as the UI Editor for UI designers, the Audio Controls Editor for sound designers, and Script Canvas for all designers who will be working with the visual scripting system in O3DE.

Here's how you might start out:

1.  When you start O3DE Editor for the first time, you can create a new level.

1.  You start populating your level in the viewport by creating entities. In O3DE, an entity can be just about anything, from the static objects you see, to the triggers you script, to interactive objects, and user interfaces.

1.  You add components to your entities through the Entity Inspector tool. You can add **White Box** components, for example, to quickly sketch 3D proxy geometry to design objects and obstacles for the level.

1.  To provide player control for your entities, you'll need an input binding. Using the **Asset Editor** tool, you bind raw player input from keyboard, mouse, and game controllers to events that you create. Then you can listen for and respond to these events using one of the scripting tools.

1.  Script Canvas and Lua are common scripting tools that are used in O3DE. Script Canvas provides a visual, node-based scripting system for scripting your runtime logic, while Lua provides a more traditional scripting environment based on the Lua API. Add a **Script Canvas** component or **Lua Script** component to an entity. Develop a script in one of the script editors. Then, you can add that script to the component to control that entity at runtime. Script can control an entities by responding to player input events, spawn dynamic entities at runtime, trigger audio and visual effects, and much more.

1.  As you populate your world with entities, you'll learn that a great way to save time is to use the prefab system. Prefabs allow you to group and nest component entities together, save the group as a prefab, and then create multiple instances of that prefab throughout the levels of your project. In each instance of the prefab, you have the ability to make changes to that specific instance.

1.  When you're ready to compose a UI, you use the UI Editor, where you can establish a UI canvas and layout and script the interface.

1.  When you're ready to add sound to your project, you establish audio events and triggers in the **Audio Controls Editor**. You can then add this audio to entities through components, and script its playback using one of the scripting systems.

We suggest that you begin your learning path by browsing the following set of O3DE tools and technologies, and then focusing on the ones that apply to your needs:

*  [O3DE Editor](/docs/user-guide/editor/)
*  [Asset Pipeline](/docs/user-guide/assets/pipeline/)
*  [Component Reference](/docs/user-guide/components/reference/)
*  [Gem Library](/docs/user-guide/gems/)
*  [Player Input / Asset Editor](/docs/user-guide/interactivity/input/using-player-input/)
*  [Script Canvas](/docs/user-guide/scripting/script-canvas/)
*  [Lua Editor](/docs/user-guide/scripting/lua/)
*  [Audio Controls Editor](/docs/user-guide/interactivity/audio/)
*  [Animation Editor](/docs/user-guide/visualization/animation/animation-editor/)
*  [UI Editor](/docs/user-guide/interactivity/user-interface/editor/)

### Engineer

As an engineer, you will likely need to learn both how to support the designers and artists, and how to author individual components. These new components can then be added to entities in the O3DE Editor to add new functionality. You might also learn how to develop new Script Canvas nodes. These new nodes can then be used by designers in the **Script Canvas Editor** to handle new events that you created, or change the properties of your new components. On a larger scale, when you need to work on a system that can be distributed as a shareable container of code and assets, you can learn how to create a Gem.

We suggest that your learning path looks like this:

1.  Follow the intro tutorials to learn about the component entity system and the existing library of components.

1.  Browse the Gem library to see examples of the larger functionality they can add compared to individual components.

1.  Learn about authoring your own components and Gems, where you will also learn about working with EBuses, O3DE's event bus and general-purpose messaging system; AZ Modules, a collection of C++ code built as a static or dynamic library, and more.

Here is a basic set of O3DE tools and technologies to focus on:
*  [O3DE Editor](/docs/user-guide/editor/)
*  [Programming Guide](/docs/user-guide/programming/)
*  [Gems](/docs/user-guide/gems/)
*  [Component Reference](/docs/user-guide/components/reference/)
*  [Animation Editor](/docs/user-guide/visualization/animation/animation-editor/)
*  [Script Canvas](/docs/user-guide/scripting/script-canvas/)
*  [Lua Editor](/docs/user-guide/scripting/lua/)
