---
title: Material Editor
description: Learn how to use the Material Editor to create materials in Atom.
toc: true
---

The **Material Editor** is a standalone application that allows artists to view, edit, and create new materials. This section introduces the Material Editor and describes the editor layout and its individual panels.

## Quick Start
To get started, launch the Material Editor and create or edit a material. 

#### Launch the Material Editor
You can launch the Material Editor from the **Open 3D Engine (O3DE)** Editor, or as a standalone application:   

- From the O3DE Editor, you can launch Material Editor in two ways.
  
  - Select **Main Menu > Tools > Material Editor**.
  
  - From a Material component in the Inspector, select **Edit Material in Material Editor...** in the hamburger menu of a material assignment slot.

- As a standalone application, launch the executable `<build>\bin\profile\MaterialEditor.exe`.

#### Create or edit a material
You can create a new material or edit an existing material from the File menu in the Material Editor, or from the Context menu in the Asset Browser: 

- From the File menu in the Material Editor:
  
  - To create a new material, choose **New** and choose a material type for the new material.
  
  - To open an existing material, choose **Open...** or **Open Recent**, and select an existing material.

- From the Context menu in the Asset Browser:
  
  1. Select a `.material` file.
 
  2. Then, right-click the `.material` file to open the context menu.
  
  3. Choose **Open in Material Editor...** to open the material in the Material Editor.

![Material Editor](/images/atom-guide/tools/material-editor.jpg)

## Title bar
The title bar of the main window displays which rendering backend is being used (DX12 or Vulkan).

## Main Menus
At the top of the Material Editor are the following menus: File, Edit, View, and Help. 

### File Menu
The File menu contains options to manage the Material Editor and material files.
| Menu item | Hotkey | Function |
| - | - | - |
| New | **Ctrl+N** | Create a new material. Choose a material type from the list to create a new material of that type. |
| Open... | **Ctrl+O** | Open an existing material.|
| Save | **Ctrl+S** | Save the edits in the active material tab. |
| Save As... |  | Save the edits in the active material tab to the specified folder and file name.  |
| Save As Child... |  | Save a new child material of the current material.  |
| Save All |  | Save the edits in all open material tabs. |
| Close | **Ctrl+F4** | Close the active material tab. |
| Close All |  | Close all of the open material tabs. |
| Close Others |  | Close all of the material tabs except the active one. |
| Run Python... |  | Opens a folder to select a Python script to run. |
| Exit |  | Close the Material Editor. |

### Edit Menu
The Edit menu contains options that are useful while editing materials. 

| Menu item | Hotkey | Function |
| - | - | - |
| Undo | **Ctrl+Z** | Undo the most recent action.  |
| Redo | **Ctrl+Y** | Redo the most recent action that was undone.  |

### View Menu
The view menu lets you open or close panels and switch to different tabs in the Material Editor.

| Menu item | Hotkey | Function |
| - | - | - |
| Previous Tab | **Ctrl+Shift+Tab** | Switches to the previously opened tab. |
| Next Tab | **Ctrl+Tab** | Switches to the next opened tab. |
| Asset Browser | | Toggles the Asset Browser panel. |
| Inspector | | Toggles the Inspector panel. |
| Viewport Settings | | Toggles the Viewport Settings panel. |
| Performance Monitor | | Toggles the Performance Monitor panel. |
| Python Terminal | | Toggles the Python Terminal panel. |

### Help Menu
The Help menu provides support and resources for the Material Editor.

| Menu item | Function |
| - | - |
| Help...  | Launches the Material Editor Help window and displays a list of controls in the Material Editor. |
| About... | Displays information about the Material Editor. |

## Viewport
Use the **Viewport** panel to preview opened materials. To preview materials in various environments, configure the 3D model and lighting setup (see the [Viewport Toolbar](#viewport-toolbar) and [Viewport Settings](#viewport-settings) sections below).

For more information about the viewport and how to interact with it, see [Atom Tools Viewport](/docs/atom-guide/look-dev/tools/atom-tools-viewport/).  

## Viewport Settings
The Viewport Settings panel displays options to configure the Viewport properties. These properties control how the Viewport appears and which features are active. You can also create or edit configuration presets for the viewport model and the lighting environments. 

For more information about the viewport settings, see [Atom Tools Viewport](/docs/atom-guide/look-dev/tools/atom-tools-viewport/).  

### Material Viewport Tabs
Each opened material is contained in its own Viewport Tab, allowing you to edit multiple materials at once. This is useful for editing the materials of complex assets, such as characters or vehicles, since they are often made of multiple materials.

You can switch tabs to edit different materials; this will change the properties and settings in the Inspector and the Viewport Toolbar. You can reorder tabs, but you can't undock them from the Viewport. 

{{< note >}}
The Viewport cannot be closed entirely. If all the tabs are closed, the Viewport shows a default scene that contains a blank model, ground, and natural light. 
{{< /note >}}

## Inspector
In the **Inspector**, you can configure the properties for the active material. The **Details** group shows the material's material type and optional parent material properties. All other property groups depend on the material type and are defined in the `.materialtype` file. See the [Material Type Reference](/docs/atom-guide/look-dev/materials/material-type-file-spec/) for all the material types in Atom and the property groups in each. 

## Asset Browser
The **Asset Browser** allows you to search for assets across O3DE, Gems, and other project folders. In the Material Editor, the Asset Browser is automatically filtered to show image and material assets. You can display more assets by changing the filter. When an asset is selected, a preview of the asset is shown on the side. 

## Python Terminal
With the **Python Terminal**, you can run Python commands to modify, import, and process various assets that the Material Editor uses, such as shaders, textures, and materials. 
