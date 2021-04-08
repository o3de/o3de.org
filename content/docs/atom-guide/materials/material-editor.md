---
title: Material Editor
description: Learn how to use the Material Editor to create materials in Atom.
toc: true
---

The **Material Editor** is a stand-alone application that allows artists to view, edit, and create new materials. This section introduces the Material Editor and covers the editor layout and its individual panels.

## Quick start
#### Launch the Material Editor
You can launch the Material Editor in one of the following ways: 

- From the Open 3D Engine (O3DE) Editor:
  1. Select **Main Menu > Tools > Material Editor**.
  2. From a Material component in the Inspector, select **Edit Material in Material Editor...** in the hamburger menu of a material assignment slot.

- As a standalone application, launch the executable `<build>\bin\profile\MaterialEditor.exe`.

#### Create a new material
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
  

## Layout
![Material Editor](/images/atom-guide/materials/material-editor.jpg)

### Title bar
The title bar of the main window displays which rendering backend is being used (DX12 or Vulkan).

### Main Menus
At the top of the Material Editor are the following menus: File, Edit, View, and Help. 

#### File Menu
The File menu contains options to manage the Material Editor and material files.
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


### Viewport
The **Viewport** panel is used to preview opened materials. Materials can be previewed under various environments by configuring the 3D model and lighting setup (see the [Viewport Toolbar](#viewport-toolbar) and [Viewport Settings](#viewport-settings) sections below).

#### Material Viewport Tabs
Each opened material is contained in their own Viewport Tab, allowing you to edit multiple materials at once. This is useful for editing the materials of complex assets, such as characters or vehicles, since they are often made of multiple materials.

You can switch tabs to edit different materials; this will change the properties and settings in the Inspector and the Viewport Toolbar. Tabs can be reordered, but they cannot be undocked from the Viewport. 

{{< note >}}
The Viewport cannot be closed entirely; if all the tabs are closed, the Viewport shows a default scene that contains a blank model, ground, and natural light. 
{{< /note >}}

#### Interacting with the Viewport
You can view your material in the Viewport in different perspectives by moving the camera, model, or lighting environment.

##### Camera Controls
These controls adjust the camera view.
| Control | Action |
| - | - |
| **LMB + Drag** / **RMB + Drag** | Rotates, pans, and tumbles the camera view around the model. |
| **MMB Scroll** | Dolly. Moves the camera view toward or away from a single point. |
| **MMB** | Side Dolly. Moves the camera view up and down, or side-to-side. |

##### Model and Lighting Controls
These controls adjust the model and lighting within the current camera view. 
| Control | Action |
| - | - |
| **Ctrl + Drag** | Tumbles the model. |
| **Shift + Drag** | Rotates the lighting environment horizontally around the model. |

##### Industry-standard Controls
Industry-standard controls to pan, orbit, and zoom in the Viewport. 
| Control | Action |
| - | - |
| **Alt + LMB + Drag** | Tumbles the viewport around a single pivot or point of interest. |
| **Alt + RMB + Drag** | Dollies the camera toward and away from a single pivot or point of interest. |
| **Alt + MMB + Drag** | Tracks the camera left, right, up, and down in the direction of mouse movement. |



### Viewport Toolbar
The Viewport Toolbar contains the following set of functions to configure the Viewport:

- **Display Ground**: Show or hide the ground plane in the Viewport. 
  
- **Display Shadow**: Show or hide the shadow effect in the Viewport. 

<!-- [todo] Not implemented yet. -->
<!-- - **Tone Mapping**: Select the tone mapping option to use for rendering the material preview. These options include:
  - **None**: No effect. 
  - **Gamma 2.2**: Uses a standard gamma curve.
  - **ACES**: Uses the ACES color space. -->

- **View Model Preset**: Select a 3D model to preview the material on. The dropdown looks like below:
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

### Viewport Settings
The Viewport Settings panel displays options to configure the Viewport properties, controlling how the Viewport appears and which features are active. You can also create or edit configuration presets for the viewport model and the lighting environments. 

![Model Preset Browser](/images/atom-guide/materials/viewport-settings.png)

Viewport Settings contains the following settings groups:

#### General
The General group contains basic properties that are required by the Viewport. 

**Properties**
- **Enable Grid**: Show or hide the ground plane. (This property is also accessible in the Viewport Toolbar.)
- **Enable Shadow Catcher**: Show or hide shadow effects. (This property is also accessible in the Viewport Toolbar.)
- **Enable Alternate Skybox**: Toggle to display the alternate skybox image if one is specified by the **Skybox Image Asset (Alt)** property in the lighting preset. 
- **Field of View**: Adjust the camera's field of view.

#### Model
The Model group allows you to manage the list of available model presets, and configure their properties. Model presets are useful for previewing materials on a variety of surfaces. There's a collection of basic models already included, however you can create additional presets with custom models. Model presets are stored in JSON files (`*.modelpreset.azasset`) and can be created or edited directly; however, it is much more convenient to configure presets in the Viewport Settings. 

##### Buttons
These controls are used to create, edit, save, or reset a specific model preset.  
- **Add**: Create a new model preset and select a save file location. Model presets can be saved anywhere in your project folder. 
- **Select**: Open the **Model Preset Browser**, browse, and select from the list of available model presets.
- **Save**: Save changes made to the selected model preset.
- **Refresh**: Remove any unsaved changes made to the model preset.

##### Properties
The following are properties you can configure for the selected model preset.  
- **Auto Select**: When enabled, this preset can be automatically selected at start-up.
- **Display Name**: Specify the name of this preset. The name appears in the Viewport Model drop-down list in the Viewport Toolbar. 
- **Model Asset**: Assign a model asset for this preset. The model asset must be in FBX format (`.fbx`).
- **Preview Image Asset**: Assign an image as the preview icon for this preset. The image appears in the Viewport Model drop-down list in the Model Preset Browser.

##### Model Preset Browser
The **Model Preset Browser** panel opens when the **Select** button is pressed. The Model Preset Browser panel is a separate window that cannot be docked.

<!-- This image is a placeholder, as this is still in development -->
![Model Preset Browser](/images/atom-guide/materials/model-preset-browser.png)


#### Lighting
The Lighting group allows you to manage the list of available lighting presets, and configure their properties. Lighting presets are useful for previewing materials in a variety of lighting conditions. There's a collection of lighting presets already available, however you can create additional presets with a custom skymap image and lighting properties. Lighting presets are stored in JSON files (`*.lightingpreset.azasset`), and can be created or edited directly; however, it is much more convenient to configure presets in the Viewport Settings. 

##### Buttons  
These controls are used to create, edit, save, or reset a specific lighting preset.  

- **Add**: Create a new lighting preset and select a save file location. Lighting presets can be saved anywhere in your project folder. 
- **Select**: Open the **Lighting Preset Browser**, browse, and select from the list of available lighting presets.
- **Save**: Save changes made to the selected lighting preset.
- **Refresh**: Remove any unsaved changes made to the lighting preset.

##### Properties  
The following are properties you can configure for the selected lighting preset.  

- **Auto-select**: When enabled, this preset can be automatically selected at start-up.
- **Display Name**: Specify the name of this preset. The name appears in the Viewport Model drop-down list in the Viewport Toolbar. 
- **IBL Diffuse Image Asset**: Assign a diffuse lighting cubemap to use for IBL.
- **IBL Specular Image Asset**: Assign a specular lighting cubemap to use for IBL.
- **Skybox Image Asset**: Assign a diffuse lighting cubemap.
- **Skybox Image Asset (Alt)**: Assign an alternative diffuse lighting cubemap.
- **Skybox Exposure**: Adjust the brightness of the skybox.
- **Shadow Catcher Opacity**: Adjust the opacity level of the ground plane that catches the model's shadows. 
- **Exposure**: A group of settings to configure the exposure. <!-- More details coming soon -->
- **Lights**: Manage a list of lights for the active lighting preset. <!-- More details coming soon -->

##### Lighting Preset Browser  
The **Lighting Preset Browser** panel opens when the **Select** button is pressed. The Lighting Preset Browser panel is a separate window that cannot be docked.

![Lighting Preset Browser](/images/atom-guide/materials/lighting-preset-browser.png)


### Inspector
The **Inspector** is your main interaction with materials. Here, you can configure all the material's properties. The **Details** group shows the material's material type and optional parent material properties. All other property groups depend on the material type and are defined in the `.materialtype` file. See the [Material Type Reference](TBD) for all the material types in Atom and the property groups in each. 

### Asset Browser
The **Asset Browser** allows you to search for assets across O3DE, Gems, and other project folders. In the Material Editor, the Asset Browser is automatically filtered to show image and material assets. You can display more assets by changing the filter. When an asset is selected, a preview of the asset is shown on the side. 

### Python Terminal
With the **Python Terminal**, you can run Python commands to modify, import, and process various assets the Material Editor uses, such as shaders, textures, and materials.  

### Performance Monitor
The **Performance Monitor** provides an overview of the Material Editor's run-time performance. It displays the frame rate, and the GPU and CPU frame times. This is especially useful if you are working with materials or shaders that are CPU or GPU heavy. 