---
description: ' Understand the different ways you can participate in AAA-game development
  with Amazon Lumberyard as a technical artist, game designer, or game programmer. '
title: Create with Amazon Lumberyard
---
# Create with Amazon Lumberyard<a name="wg-create-intro"></a>

Previously in this guide, we covered [How Amazon Lumberyard works](wg-how-lumberyard-works.md) and [Setting up Amazon Lumberyard](wg-setup-intro.md)\.

Now, let’s get started creating your game\! In this topic, we provide an overview of creating a game with Lumberyard, and help you identify where to focus your learning, based on your role in game development\. If you’re proficient in all roles, read everything\!

## How do I create a game with Lumberyard?<a name="ly-create-overview"></a>

 **Keeping it Modular** 

Game development in Lumberyard is best understood if you keep a key Lumberyard design philosophy in mind as you learn: the concept of **modularity**\. The Lumberyard game engine, its systems, and its environment are built as a collection of C\+\+ modules\. Choosing the right modules based on the combination of your game’s design and your workflows will keep your game development process focused and likewise keep the overhead of managing your game project simpler\.

Even the Lumberyard Editor – the most common tool associated with Lumberyard – uses these modules, which we call **Gems**\. Lumberyard ships with well over 100 Gems as part of the installation, and you can acquire other Gems from third parties, or write new ones yourself\. When you build your game, the functionality of these Gems is combined to create the systems of your game\. This means that you don’t have to hard\-code the systems and features of your game\. Instead, you can either obtain or create a Gem with the functionality you need – and even maintain the code for it independent of the game\! This isolation means that a game developer can work on game\-specific AI functionality in a Gem\. When the Gem is updated, level designers can access the new functionality after a rebuild of the game project, and without impacting any other Gem\. Gems can also add new features to the Lumberyard Editor and provide new asset processing behaviors\.

You’ll notice this philosophy of modularity in the individual entities you create, up through the most complex functionality you add\.

For example, consider the concept of an entity in Lumberyard\. An entity can represent just about anything in your game under Lumberyard’s component entity system\. By giving the entity components, you begin to shape their utility in your game\. The components specify entity behaviors and properties\.

You might have an entity that you want to see and interact with in your game world that uses all of the following components:
+ The default transform component to define its position
+ A mesh component to define its visual geometry
+ NVIDIA PhysX components to define collision characteristics and other aspects for a realistic, rigid body simulation
+ An input component to reference an input event\-binding definition
+ A script component to automate some sort of behavior, or process input events from the player
+ A camera component to allow the entity to be used as a camera

\.\.\.and many more\!

Other entities that you create will be invisible to players\. These entities might exist to implement triggers, spawn environmental effects, or reference assets created with tools, such as the game UI that you created in UI Editor\.

A major part of assembling a game in Lumberyard revolves around using the Lumberyard Editor to do the following:
+ Place and group entities
+ Add components to these entities
+ Configure properties on these components
+ Use tools associated with the components

Tools you might use that are associated to specific components include:
+ Script Canvas to create and edit scripts using a visual scripting system, then reference from the Script Canvas component\.
+ Emotion FX Animation Editor to animate characters, then reference from the **Anim Graph** component\.
+ Asset Editor to create input bindings that bind raw player input, such as keystrokes, to events, then reference from the **Input** component\.
+ Audio Controls Editor to setup sound effects that map to Wwise controls, then reference from the **Audio Trigger** and **Audio Switch** components\.

\.\.\.and many more\.

Some tools can be opened directly from their associated component\. Others require you to open them from the **Tools** menu in Lumberyard Editor\. For a tour of Lumberyard Editor, see [Introduction to the Lumberyard Editor](wg-editor.md)\. For an overview of the tools provided with Lumberyard, see the following topic on [Tools available in Amazon Lumberyard](wg-tools.md)\.

The modular nature of Lumberyard means there are additional assets, components, and tools that you can add by enabling Gems in Project Configurator\. Lumberyard comes with a library of Gems\. Gems can include new code, new assets, or both\! You can even write your own\. In fact, this is what a game’s C\+\+ programmers will often spend their time doing, to help create the gameplay that makes your game unique\.

 **Starting the Journey** 

Are you starting a new project, maybe to start a prototype of your game? Or to just play around with Lumberyard – take it for a spin and learn what it can do? You’ll probably need to know how to get the minimum systems going, which typically include:
+ Camera
+ Rendering
+ Physics
+ Input

You’ll use the Project Configurator tool to set the project that you’re working on\. You can use one of the projects that ship with Lumberyard, such as the Samples Project, if you want to learn or play around with something premade\. Or, if you want to start something new, this is also where you create a brand new project, based on the template of your choice\.

Then, launch the Lumberyard Editor, open one of the sample levels in the Sample Project, and start exploring\! We suggest following along with one of these written or video tutorials:
+  [Learn Lumberyard in 20 Minutes](https://www.youtube.com/watch?v=E1NgI8urJ7o) 
+  [Set Up Amazon Lumberyard](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-setting-up.html) series
+  [Creating a Controllable Entity](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-written-basics-of-motion-overview.html) 
+  [Basics of Motion](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-game-engine-101.html) series

 **Joining a Team** 

Depending on your role in your game development team and the scope of the game project that you’re working on, you might not encounter all of the tools and technologies that Lumberyard provides\. In the next section, we’ll take a look at how you might want to focus your learning path\.

## Work as an artist<a name="ly-create-artist"></a>

Lumberyard provides all of the basic tools that you need to import, assemble, and blend animations in a AAA game, creating new worlds or environments for the player to visualize, interact with, and experience\.

While much of your work as an artist might involve using tools outside Lumberyard, you will use Lumberyard tools when you want to control your character animations, and manipulate the look and feel of your assets or the environment\. You might be working with designers to create the game environment\.

As an example, let’s take a look at the workflow for setting up an actor in your game\.

1.  Outside of Lumberyard, you create a character model, materials, textures, and rig for the character\. 

1.  Lumberyard’s Asset Processor automatically processes source assets into platform\-specific game assets, ensuring new or modified files are ready to use in Lumberyard as soon as possible\. Use FBX Settings if you want to modify the processor settings\. 

1.  You import your actor file in Animation Editor and create a motion set to specify the motions that you want for your character\. 

1.  Next, you create an animation graph using nodes\. 

1.  Then, you build a blend tree to blend the animations together\. 

1.  When you’ve built and previewed the animations and are ready to try them out in a game environment, you can switch over to Lumberyard Editor\. 

1.  In the Lumberyard Editor, you create or open an existing test level\. 

1.  To see your animated character, you need an entity with: 
   + an **Actor** component to create a controllable character with the actor file from Animation Editor and a material linked to your actor asset\.
   + an **AnimGraph** component to use the animation graph and motion set assets that you created in the Animation Editor\.

1.  To control your character in your level, you might want to work with a gameplay designer or programmer at this point to add an **Input** component, **PhysX** components, and script components so you can run through and playtest all of your character’s animations in your game’s specific environment\. 

We suggest that you begin your learning path by browsing the following set of Lumberyard tools and technologies, and then focusing on the ones that apply to your needs:
+  [Lumberyard Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/lumberyard-editor-intro.html) 
+  [Asset Pipeline](https://docs.aws.amazon.com/lumberyard/latest/userguide/asset-pipeline-intro.html) 
+  [Component Entity System](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-intro.html) 
+  [Component Reference](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-components.html) 
+  [Emotion FX Animation Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/char-intro.html) 
+  [FBX Settings Tool](https://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer.html) 
+  [Gem Library](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-ref.html) 
+  [Cinematics and the Track View Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/cinematics-intro.html) 
+  [Shaders and Materials](https://docs.aws.amazon.com/lumberyard/latest/userguide/mat-intro.html) 
+  [Terrain and Environment](https://docs.aws.amazon.com/lumberyard/latest/userguide/level-intro.html) 
+  [Vegetation Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/dynamic-vegetation-intro.html) 

Some specific tutorials you might want to look at include:
+  [Import Assets into Lumberyard](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-importing-assets.html) 
+  [Animation System and Emotion FX](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-animation-intro.html) 
+  [Lighting](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-lighting.html) 

## Work as a designer<a name="ly-create-designer"></a>

Lumberyard Editor is an important, core tool for game designers and level designers\. It’s where you create your levels, populate them with entities, and assign components to those entities\. It also provides access to important tools such as the UI Editor for UI designers, the Audio Controls Editor for sound designers, and Script Canvas for all designers who will be working with the visual scripting system in Lumberyard\.

Here’s how you might start out:

1.  When you start Lumberyard Editor for the first time, you can create a new level, or you might prefer to open one of the existing levels in the Samples Project to play around with\. If the Samples Project is not your current project, use Project Configurator first, and set it as the default project\. 

1.  You start populating your level in the viewport by creating entities\. In Lumberyard, an entity can be just about anything, from the static objects you see, to the triggers you script, to the placeholder objects that reference game UI\. 

1.  You add components to your entities through the Entity Inspector tool\. 

1.  To provide player control for your entities, you’ll need an input binding\. Using the Asset Editor tool, you bind raw player input from keyboard, mouse, and game controllers to events that you create\. Then you can listen for and respond to these events using one of the scripting tools\. 

1.  Script Canvas and Lua are common scripting tools that are used in Lumberyard\. Script Canvas provides a visual, node\-based scripting system for scripting your gameplay logic, while Lua provides a more traditional scripting environment based on the Lua API\. Add a Script Canvas component or Lua Script component to an entity\. Develop a script in one of the script editors\. Then you can add that script to the component to control that entity at runtime\. For example, using a script, you can control an entity by responding to player input events, spawning dynamic entities at runtime, producing visual effects, and much more\. 

1.  As you populate your world with entities, you’ll learn that a great way to save time is to use the slice system\. Slices are a type of prefab system that allows you to group and nest component entities together, save the group as a slice, and then create multiple instances of that slice throughout the levels of your project\. In each instance of the slice, you have the ability to make changes to that specific instance\. This change is referred to as a slice override\. You can also choose to save the override to the original slice, which then pushes that change to every other instance, too\. 

1.  When you’re ready to author game UI, you use the UI Editor, where you can establish a UI canvas and layout your interface and script your workflows\. 

1.  When you’re ready to add sound to your game, you establish audio events and triggers in the Audio Controls Editor\. You can then add this audio to entities through components, and script its playback using one of the scripting systems\. 

To get the most out of Lumberyard, browse the Components library and the Gems library to see what Lumberyard has to offer\. Then talk to your programmers to see what additional components need to be authored for your game\.

We suggest that you begin your learning path by browsing the following set of Lumberyard tools and technologies, and then focusing on the ones that apply to your needs:
+  [Lumberyard Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/lumberyard-editor-intro.html) 
+  [Asset Pipeline](https://docs.aws.amazon.com/lumberyard/latest/userguide/asset-pipeline-intro.html) 
+  [Component Entity System](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-intro.html) 
+  [Component Reference](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-components.html) 
+  [Gem Library](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-ref.html) 
+  [Script Canvas](https://docs.aws.amazon.com/lumberyard/latest/userguide/script-canvas-intro.html) 
+  [Lua Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/lua-scripting-intro.html) 
+  [AI Navigation](https://docs.aws.amazon.com/lumberyard/latest/userguide/ai-nav-intro.html) 
+  [Audio Controls Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/audio-intro.html) 
+  [Emotion FX Animation Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/char-intro.html) 
+  [Cloud Canvas](https://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-intro.html) 
+  [UI Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-intro.html) 

Some specific tutorials you might want to look at include:
+  [Creating a Controllable Entity](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-written-basics-of-motion-overview.html) 
+  [Script Canvas](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-script-canvas-intro.html) series
+  [Basics of Motion](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-game-engine-101.html) series
+  [Working with Slices](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-slices.html) 
+  [Simulate Physics](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-physics.html) 
+  [Modify Terrain](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-terrain.html) 
+  [Import Assets into Lumberyard](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-importing-assets.html) 
+  [Animation System and Emotion FX](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-animation-intro.html) 

## Work as a game engineer<a name="ly-create-programmer"></a>

As a Lumberyard game engineer, you will likely need to learn both how to support the designers and artists in the design of the game and environment, and how to author individual components\. These new components can then be added to entities in the Lumberyard Editor to create custom gameplay\. You might also learn how to develop new Script Canvas nodes\. These new nodes can then be used by designers in the Script Canvas editor to handle new events that you created, or change the properties of your new components\. On a larger scale, when you need to work on a system that can be distributed as a shareable container of code and assets, you can learn how to create a Gem\.

We suggest that your learning path looks like this:

1.  Follow the intro tutorials to learn about the component entity system and the existing library of components\. 

1.  Browse the Gem library to see examples of the larger functionality they can add compared to individual components\. 

1.  Learn about authoring your own components and Gems, where you will also learn about working with EBuses, Lumberyard’s event bus and general\-purpose messaging system; AZ Modules, a collection of C\+\+ code built as a static or dynamic library; and more\. 

Here is a basic set of Lumberyard tools and technologies to focus on:
+  [Lumberyard Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/lumberyard-editor-intro.html) 
+  [Programming Concepts](https://docs.aws.amazon.com/lumberyard/latest/userguide/lumberyard-programming-concepts.html) 
+  [Gems](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-gems.html) 
+  [Component Entity System](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-intro.html) 
+  [Component Reference](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-components.html) 
+  [Programmer’s Guide to Entities and Components](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-entity-system-pg-intro.html) 
+  [Emotion FX Animation Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/char-intro.html) 
+  [Script Canvas](https://docs.aws.amazon.com/lumberyard/latest/userguide/script-canvas-intro.html) 
+  [Lua Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/lua-scripting-intro.html) 

Some specific tutorials you might want to look at include:
+  [Creating a Controllable Entity](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-written-basics-of-motion-overview.html) 
+  [Import Assets into Lumberyard](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-importing-assets.html) 
+  [Script Canvas](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-script-canvas-intro.html) series
+  [Working with Slices](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-slices.html) 
+  [Working with Gems](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-gems.html) 
+  [Simulate Physics](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-physics.html) 
+  [Animation System and Emotion FX](https://docs.aws.amazon.com/lumberyard/latest/tutorials/tutorials-animation-intro.html) 