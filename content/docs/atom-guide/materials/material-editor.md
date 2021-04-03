---
title: Material Editor
description: Learn how to use the Material Editor to create materials in Atom.
---

The **Material Editor** is a stand-alone application that allows artists to view, edit, and create new materials. This section introduces the Material Editor and covers the editor layout and its individual panels.

## Quick start
You can launch the Material Editor in one of the following ways: 

- From the Open 3D Engine (O3DE) Editor:
  1. Select **Main Menu > Tools > Material Editor**.
  2. From a Material component in the Inspector, select **Edit Material in Material Editor...** in the hamburger menu of a material assignment slot.

- As a standalone application, launch the executable `<build>\bin\profile\MaterialEditor.exe`.

You can create a new material or edit an existing material in one of the following ways: 

- From the File menu in the Material Editor:
  1. To create a new material, choose **New** and choose a material type that you want to create a new material of.
  2. To open an existing material, choose **Open...** or **Open Recent**, and select an existing material.

- From the Context Menu in the Asset Browser:
  1. Select a `.material` file.
  2. Right-click the `.material` file to open the context menu.
  3. Choose one of the following options from the context menu:
        - Choose **Create a Child Material...** to create a new material based on the material highlighted.
        - Choose **Open Parent Material** to open the selected material. 

The following subsections cover each component of the Material Editor. 

![Material Editor](/images/atom-guide/materials/material-editor.jpg)

## Title bar
The title bar of the main window displays which rendering backend is being used (DX12 or Vulkan).

## Main Menu
The Main Menu contains the menus: File, Edit, View, and Help. 

#### File Menu
The File menu contains options to manage files, or exit the application. 
| Menu item | Hotkey | Function |
| - | - | - |
| New |  | Create a new material. Choose a material type from the list to create a new material of that type. |
| Open... | `Ctrl + O` | Open an existing material.|
| Open Recent |  | Open an existing material you recently worked with. |
| Save | `Ctrl + S` | Save the edits in the active material tab. |
| Save As... | `F12`, `Ctrl + Shift + S` | Save the edits in the active material tab to the specified folder and file name.  |
| Save As Child... |  | Save a new child material of the current material.  |
| Save All |  | Save the edits in all open material tabs. |
| Close | `Ctrl + W` | Close the active material tab. |
| Close All | `Ctrl + Alt + W` | Close all of the open material tabs. |
| Close Others | `Ctrl + Alt + P` | Close all of the material tabs except the active one. |
| Run Python... |  |  |
| Exit | `Ctrl + Q` | Close the Material Editor. |

#### Edit Menu
The Edit menu contains options that are useful while editing materials. 

| Menu item | Hotkey | Function |
| - | - | - |
| Undo | `Ctrl+Z` | Undo the most recent action.  |
| Redo | `Ctrl+Shift+Z` | Redo the most recent action that was undone.  |

#### View Menu
The view menu lets you open or close panels and switch to different tabs in the Material Editor.

| Menu item | Function |
| - | - |
| Asset Browser | Toggles the Asset Browser panel. |
| Inspector | Toggles the Inspector panel. |
| Console | Toggles the Console panel. |
| Python Terminal | Toggles the Python Terminal panel. |
| Performance Monitor | Toggles the Performance Monitor panel. |
| Viewport Settings | Toggles the Viewport Settings panel. |
| Previous Tab | Switches to the previously opened tab. |
| Next Tab | Switches to the next opened tab. |

#### Help Menu
The Help menu provides support and resources for the Material Editor.

| Menu item | Hotkey | Function |
| - | - | - |
| Material Editor Help | `F1` | Launches a web browser to the Material Editor documentation.|
| About Material Editor |  | Displays information about the Material Editor. |


## Viewport
The **Viewport** displays the material you are creating or editing. The Viewport is set up with a 3D model and different lighting effects. To configure these settings, see the **Viewport Toolbar** and **Viewport Settings** sections below. 

The Viewport contains the following panels: 

- **Viewport Tabs**: To view multiple materials in separate tabs.
- **Viewport Toolbar**: To configure the Viewport with quick tools, such as changing the model and lighting preset. 
- **Viewport Settings**: To further configure properties and settings in the Viewport, such as model and lighting properties.

#### Viewport Tabs
Viewport Tabs allow you to edit multiple materials in the Material Editor. This is useful for editing the materials of complex assets, such as characters or vehicles, because they are often made of multiple materials. 

Each material is contained in their own Viewport Tab. To edit a different material, switch to another tab. This will change the properties and settings in the Inspector and the Viewport Toolbar. Note that the tabs cannot be undocked from the Viewport. 

The Viewport cannot be closed entirely; if all the tabs are closed, the Viewport shows a default scene that contains a blank model, ground, and natural light. 

#### Viewport Toolbar
The Viewport Toolbar contains the following set of functions to configure the Viewport:

- **Display Ground**: Show or hide the ground grid.
  
- **Display Shadow**: Show or hide the shadow effect. 

- **Tone Mapping**: Select the tone mapping option to use for rendering the material preview. These options include:
  - **None**: No effect. 
  - **Gamma 2.2**: Uses a standard gamma curve.
  - **ACES**: Uses the ACES color space.

- **Model**: Select a 3D model to preview the material on. The dropdown looks like below:
  - Select Open model library... to open the preset folder, where you can further manage model presets.

- **Lighting Preset**: Select a lighting preset to view your material in a specific IBL lighting. A lighting preset is a set of image-based lighting (IBL) data that configures the following properties for the Viewport: 
  - A collection of one or more lights.
  - **HDRi LatLong (panoramic)**: A thumbnail image for selecting the lighting preset.
  - **HDRi Skybox:** A skybox displayed behind the viewport's 'Global Skylight (IBL)'. The IBL lighting applies to the following material surfaces:
    - Specular Radiance Cubemap (reflections)
    - Diffuse Irradiance Cubemap (ambient)

  {{< note >}}  
The collection of lighting presets are stored in the folder `Gems/Atom/Tools/MaterialEditor/Assets/MaterialEditor/LightingPresets`. 
  {{< /note >}}  

#### Viewport Settings
The Viewport Settings panel display options for configuring the Viewport properties, which indicate how the Viewport scene appears. This includes properties such as lighting, skymap, and other settings.

Viewport Settings contains the following components:

General
: The General group contains basic properties that are required by the Viewport. 
- **Model**: Select a 3D model for previewing the material.
- **Display ground**: Show or hide the ground. 

Skydome Light (IBL)
: The Skydome Light (IBL) component provides image-based lighting in the scene. You can configure the lighting source, skydome mode, and other properties. For more information on setting up the Skydome Light (IBL), see the [Skydome Light (IBL) Component](TBD) documentation. 

Physical Sky
: The Physical Sky component allows you to change the properties of the sky in the scene, such as the sky intensity, sun intensity, time of day, and other settings. For more information on setting up the Physical Sky component, see the [Physical Sky Component](TBD) documentation. 


#### Interacting with the Viewport
You can view your material in the Viewport from different angles by moving the camera, rotating the model, or rotating the IBL skymap. 
Use the following controls in the Viewport to change your view:
| Action | Function |
| - | - |
| Left-click and drag| Rotate the camera and look around the scene. |
| `Ctrl`, left-click, and drag | Rotate the 3D model. |
| `Shift`, left-click, and drag | Rotate the IBL skymap. |


## Inspector
The **Inspector** is your main interaction with materials. Here, you can configure all the material's properties. The **Details** group shows the material's material type and optional parent material properties. All other property groups depend on the material type and are defined in the `.materialtype` file. See the [Material Type Reference](TBD) for all the material types in Atom and the property groups in each. 

## Asset Browser
The **Asset Browser** allows you to search for assets across O3DE, Gems, and other project folders. In the Material Editor, the Asset Browser is automatically filtered to show image and material assets. You can display more assets by changing the filter. When an asset is selected, a preview of the asset is shown on the side. 

## Python Terminal
With the **Python Terminal**, you can run Python commands to modify, import, and process various assets the Material Editor uses, such as shaders, textures, and materials.  

## Performance Monitor
The **Performance Monitor** provides an overview of the Material Editor's run-time performance. It displays the frame rate, and the GPU and CPU frame times. This is especially useful if you are working with materials or shaders that are CPU or GPU heavy. 