---
description: ' Learn about the tools used to create content in Open 3D Engine. '
title: Tools available in Open 3D Engine
---
# Tools available in Open 3D Engine<a name="wg-tools"></a>

The default **O3DE Editor** layout contains tools common to most development workflows, but there are a lot of additional tools available\. Depending on your development role, these may not always be the tools you need \- or even the right tools for your job\. The **O3DE Editor** supports custom layout options so that you can add all of the tools you need to use most frequently right where you need them\. Some tools that have multiple panes, such as the **Animation Editor**, can have their own custom and preset layouts\.

These tools are available in the **Tools** menu of the **O3DE Editor**\.

## Animation Editor<a name="tool-animation-editor"></a>

![\[O3DE Animation Editor.\]](/images/welcomeguide/ui-animation-editor-1.25.png)

With **Animation Editor**, build animated *behaviors* for your *actors*\.

Use the Animation Editor to build animation loops and set up smooth transitions between them\. To create behaviors, begin by loading an actor, which is a skinned mesh, and its corresponding animations\. The animations are added to *motion sets*\. You create *motion graphs* using motion sets that can blend animation based on states and events\. The motion graphs that you create define your actor's behaviors\.

## FBX Settings<a name="tool-fbx-settings-editor"></a>

![\[O3DE FBX Settings.\]](/images/welcomeguide/ui-fbx-settings-editor-1.25.png)

The **FBX Settings** tool converts static `.fbx` meshes, actors, PhysX meshes, and motions into O3DE assets\.

When you export or copy `.fbx` files to a directory in your current game project, Asset Processor detects the files\. Using these files as input, O3DE calculates default settings\. These settings specify how Asset Processor converts the files into the appropriate mesh, materials, or animation assets\.

To customize `.fbx` settings, find the asset in **Asset Browser**\. Right\-click the asset and select **Edit Settings** to open **FBX Settings**\. The available options in **FBX Settings** vary depending on the contents of the `.fbx` file\.

## Texture Settings Editor<a name="tool-texture-settings-editor"></a>

![\[O3DE Texture Settings Editor.\]](/images/welcomeguide/ui-texture-settings-editor-1.25.png)

 **Texture Settings Editor** converts image files into O3DE assets\.

When you export or copy image files to a directory in your current game project, Asset Processor detects the files\. Using these files as input, O3DE calculates default settings\. These settings specify how Asset Processor converts the files into the appropriate textures\.

To customize the texture settings, find the image asset in **Asset Browser**\. Right\-click the asset and select **Edit Image Settings** to open **Texture Settings Editor**\. In **Texture Settings Editor**, you can choose from presets based on the texture type and specify settings for various platforms\. **Texture Settings Editor** displays a preview image of the texture so you can view the settings results\.
+  `.bmp`
+  `.gif`
+  `.jpg`
+  `.jpeg`
+  `.png`
+  `.tga`
+  `.tif`
+  `.tiff`

## Asset Editor<a name="tool-asset-editor"></a>

![\[O3DE Asset Editor.\]](/images/welcomeguide/ui-asset-editor-1.25.png)

Create and edit O3DE\-specific assets in **Asset Editor**\.

O3DE has a small number of specialized assets such as *script events* that allow scripts to communicate with each other, *physics materials* that give surfaces physical properties like friction, and *input bindings* that bind input to events\. Create and edit these specialized asset types with the **Asset Editor**\.

## Level Inspector<a name="tool-level-inspector"></a>

![\[O3DE Level Inspector.\]](/images/welcomeguide/ui-level-inspector-1.25.png)

Add and modify level components in **Level Inspector**\.

 **Level Inspector** allows you to add and modify level components, similar to **Entity Inspector**\. In **Level Inspector**, you can add terrain components and NVIDIA PhysX terrain components for terrain collisions\.

## Material Editor<a name="tool-material-editor"></a>

![\[O3DE Material Editor.\]](/images/welcomeguide/ui-material-editor-1.25.png)

Create and edit the appearance of the entities in your project with **Material Editor**\.

A material has a set of properties that determines how its surface reacts to physical actions, other materials, and its environment\. **Material Editor** is the primary tool used to create materials and map textures, and lets you configure texture properties like opacity, lighitng effects, shader parameters, and more\.

## Particle Editor<a name="tool-particle-editor"></a>

![\[O3DE Particle Editor.\]](/images/welcomeguide/ui-particle-editor-1.25.png)

Build layered, dynamic visual effects with **Particle Editor**\.

O3DE includes an advanced particle effects system that you can use to simulate environment effects like fire and sparks, or weather effects like fog, snow, or rain\. Use **Particle Editor** to create and manage libraries of particle effects in your project\.

## PhysX Configuration<a name="tool-physx-configuration"></a>

![\[O3DE PhysX Configuration.\]](/images/welcomeguide/ui-physx-configuration-1.25.png)

Set the global PhysX properties for your project with **PhysX Configuration**\.

O3DE integrates NVIDIA PhysX for real\-time physics simulation\. With **PhysX Configuration**, you can set global properties for NVIDIA PhysX such as gravity, balance simulation performance and accuracy, create filters with collision layers and groups, and set up a PhysX visual debugger\.

## Script Canvas<a name="tool-script-canvas"></a>

![\[O3DE Script Canvas.\]](/images/welcomeguide/ui-script-canvas-1.25.png)

Program logic and behaviors visually with **Script Canvas**\.

 **Script Canvas** is one of O3DE's most powerful tools\. With **Script Canvas**, you can create behaviors, functions, and logic in a visual programming environment\. **Script Canvas** is designed to use O3DE's serialization, reflection, modularization, and EBus messaging systems\. It's tightly integrated with O3DE's component entity system and built on the `AzCore` library\. This means that you can create event\-driven logic and behaviors without programming experience\.

## Terrain Editor<a name="tool-terrain-editor"></a>

![\[O3DE Terrain Editor.\]](/images/welcomeguide/ui-terrain-editor-1.25.png)

Create terrain with **Terrain Editor**\.

With **Terrain Editor**, you can paint heightmaps to create peaks and valleys in your terrain and add megaterrain textures for sweeping vistas\.

## Terrain Tool<a name="tool-terrain-tool"></a>

![\[O3DE Terrain Tool.\]](/images/welcomeguide/ui-terrain-tool-1.25.png)

Add fine detail to terrain with **Terrain Tool**\.

With **Terrain Tool**, you can sculpt accurate details on your terrain and paint texture layers live in the **Perspective** viewport\.

## Track View<a name="tool-track-view"></a>

![\[O3DE Track View.\]](/images/welcomeguide/ui-track-view-1.25.png)

Create cinematic sequences with **Track View**\.

 **Track View** is the primary tool to create and manage cinematic sequences like cuscenes or scripted animation events\.

## UI Editor<a name="tool-ui-editor"></a>

![\[O3DE UI Editor.\]](/images/welcomeguide/ui-ui-editor-1.25.png)

Design dynamic user interfaces with **UI Editor**\.

You can use **UI Editor** to create, customize, and animate various game user interface elements and components such as menus, buttons, and heads\-up displays\.

## Audio Controls Editor<a name="tool-audio-controls-editor"></a>

![\[O3DE Audio Controls Editor.\]](/images/welcomeguide/ui-audio-controls-editor-1.25.png)

Map audio controls in **Audio Controls Editor**\.

Your project communicates all actions, events, and parameters to the audio system with Audio Translation Layer \(ATL\) controls\. These ATL controls are mapped to one or more controls inside your selected middleware \(Wwise or Wwise LTX\)\. With **Audio Controls Editor**, you can create controls and make connections between the ATL controls and the middleware controls\.

## Console Variables Editor<a name="tool-console-variables"></a>

![\[O3DE Console Variables Editor.\]](/images/welcomeguide/ui-console-variables-1.25.png)

Find and set console variables in **Console Variables Editor**\.

O3DE has many console variables,or *CVARs*, that control all aspects of the editor and your project\. CVARs can enable and disable debug features, set output verbosity, modify system performance, and much more\. **Console Variables Editor** presents a searchable list of available CVARs so you can modify their values\.

## Lens Flare Editor<a name="tool-lens-flare-editor"></a>

![\[O3DE Lens Flare Editor.\]](/images/welcomeguide/ui-lens-flare-editor-1.25.png)

Design unique lens flare effects for specific lights in **Lens Flare Editor**\.

## Sun Trajectory Tool<a name="tool-sun-trajectory-tool"></a>

![\[O3DE Sun Trajectory Tool.\]](/images/welcomeguide/ui-sun-trajectory-tool-1.25.png)

Create dynamic time\-of\-day lighting with the **Sun Trajectory Tool**\.

With **Sun Trajectory Tool**, you define the current time, sunrise and sunset, and sun direction to create dynamic dawn, daylight, dusk, and night skies\.

## Terrain Texture Layers<a name="tool-terrain-texture-layers"></a>

![\[O3DE Terrain Texture Layers.\]](/images/welcomeguide/ui-terrain-texture-layers-1.25.png)

Build realistic natural terrain with **Terrain Texture Layers**\.

Texture layers are used to create natural\-looking terrain that transitions between surface types such as sand, dirt, mud, grass, and stone\. With **Terrain Texture Layers** you create and order terrain layers, and apply materials and textures that create transitions between terrain surface types\.

## Time of Day Editor<a name="tool-time-of-day"></a>

![\[O3DE Time of Day Editor.\]](/images/welcomeguide/ui-time-of-day-editor-1.25.png)

Create natural lighting and atmosphere transitions over time with **Time of Day Editor**\.

 **Time of Day Editor** configures changes to environment parameters over time to mimic a day\-night lighting cycle\. The **Time of Day Editor** uses a 24\-hour time line graph and a recording function to store changing environment parameter values\.