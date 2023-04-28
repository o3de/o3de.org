---
title: Material Editor
description: Learn how to use the Material Editor to create materials in Atom.
toc: true
---

The **Material Editor** is a standalone application that allows artists to view, edit, and create new materials. This section introduces the Material Editor and describes the editor layout and its individual panels.

For more information about features common to Atom tools, menus, dockable panels, and working with documents, see [Atom Tools Common Features](/docs/atom-guide/look-dev/tools/atom-tools-common-features/). 

## Quick Start
To get started, launch the Material Editor and create or edit a material. 

### Launching Material Editor
There are multiple ways to launch Material Editor.
- From **Open 3D Engine (O3DE)** Editor select **Main Menu > Tools > Material Editor**
- From the Material Component context menu, select **Open Material Editor...**
- From the Asset Browser, double click on a ".material" or ".materialtype".
- From the Asset Browser, right click on a ".material" or ".materialtype", then select **Open in Material Editor...** 
- Material Editor is also a standalone executable that can be launched directly from a file browser or command console.
  - Launch the executable `<build>\bin\profile\MaterialEditor.exe`
  - This requires passing the —project-path, followed by the path your project, as a command line argument.

### Creating Materials
You have multiple options to start editing a material.
- Create a new material from a material type.
  - Select **Main Menu > File > New...**.
    - This opens the "Create Material Document" dialog.
  - Select a material type as the basis for your new material.
  - Select a path and file name for the new material.
- Open an existing material
  - Select **Main Menu > File > Open...**.
- Open or create a material from the Asset Browser.

### Editing Materials
- All material editing is done by changing properties in the Material Editor inspector.
- Changes are recorded as properties are edited and can be undone and redone. 

### Child materials
Materials can reference a parent material to inherit and override its properties. Changes to the parent or another ancestor automatically reflect in the child material, unless the child overrides those properties.

To create child materials, open an existing material and select **Main Menu > File > Save As Child...**. 

### Mirroring Changes in The O3DE Editor
- Materials saved in the Material Editor will be processed by the Asset Processor.
- If the O3DE Editor is open and the saved material is assigned to a Material Component or terrain it will automatically not reload to reflect the changes.
- Enabling the autosave in Material Editor settings dialog will causes updates to be continuously mirrored in the O3DE Editor.

## Navigating Material Editor
When you launch Material Editor, you will see the following main window.

![Material Editor](/images/atom-guide/tools/material-editor.jpg)

For more information about features common to Atom tools, menus, dockable panels, and working with documents, see [Atom Tools Common Features](/docs/atom-guide/look-dev/tools/atom-tools-common-features/). 

### Document types and views
Material Editor supports material documents, `.material` and `.materialtype`. 

#### Material Documents
You can create, open, and edit `.material files`.  You can also open `.materialtype` files to view it's properties, but you cannot edit them in the Material Editor. 

The material that you're currently editing displays on the model in the viewport. As you edit the material through the inspector or script, the material shown in the viewport automatically updates to reflect the changes.

## Main Menu
The main menu contains all of the submenus and actions common to all Atom tools. 

For more information about features common to Atom tools, menus, dockable panels, and working with documents, see [Atom Tools Common Features](/docs/atom-guide/look-dev/tools/atom-tools-common-features/). 

## Viewport
Use the **Viewport** panel to preview materials applied to models under different lighting conditions.

{{< note >}}
The Viewport cannot be closed entirely. If all the tabs are closed, the Viewport shows a default scene that contains a blank model, ground, and natural light. 
{{< /note >}}

For more information about the viewport and how to interact with it, see [Atom Tools Viewport](/docs/atom-guide/look-dev/tools/atom-tools-viewport/).  

## Viewport Settings
The Viewport Settings panel displays options to configure the Viewport properties. These properties control how the Viewport appears and which features are active. You can also create or edit configuration presets for the viewport model and the lighting environments. 

For more information about the viewport settings, see [Atom Tools Viewport](/docs/atom-guide/look-dev/tools/atom-tools-viewport/).

## Troubleshooting
### Material Editor Fails To Launch
Material Editor normally initializes all of the gems enabled by the active project. In order to reduce start times and system resource utilization, Material Editor, and the other atom tools, includes registry setting files that forcibly disable several standard O3DE gems that are not likely to be needed within the tool.

If Material Editor fails to launch then it may be because of dependency issues with gems in the active project. Check MaterialEditor.log for any system entity or module initialization errors. If necessary, change or delete the custom registry settings from the Material Editor project registry folder.
