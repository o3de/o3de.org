---
title: Material Canvas
description: Learn how to use the Material Canvas to create material types and shaders from material graphs in Atom.
toc: true
---

**Material Canvas** drastically simplifies, accelerates, and automates creating custom shaders and material types by providing a visual scripting editor with familiar tools, workflows, status reporting, and live previews.

Drag, drop, connect, and configure nodes to construct material graphs that will automatically be transformed into standard source files for shaders, material types, and materials.  The generated source files will be recognized by the Asset Processor, processed, and usable in any systems or components that consume materials.  With the default settings, Material Canvas regenerates and overwrites files whenever a graph is opened, edited, or saved. The viewport updates to display the results as quickly as changes are made and processed.

Material Canvas is built on top of the same foundations as established tools like Script Canvas and Material Editor.  It is data-driven, customizable, extensible, and scriptable through the settings registry, Python, and C++. All of the current material graph nodes are defined in JSON files that contain snippets of AZSL. These files can be edited, and new ones created, from within Material Canvas.

This section introduces Material Canvas and describes the editor layout and its individual panels.

## Quick Start
To get started, launch Material Canvas to open or create a new material graph. 

#### Launching Material Canvas

There are multiple ways to launch Material Canvas.

- From **Open 3D Engine (O3DE)** Editor select **Main Menu > Tools > Material Canvas**

- From the Material Component context menu, select **Open Material Canvas...**

- From the Asset Browser, double click on a material graph or other Material Canvas compatible file type.

- From the Asset Browser, right click on a material graph or other Material Canvas compatible file type, then select **Open in Material Canvas...** 

- Material Canvas is also a standalone executable that can be launched directly from a file browser or command console.

  - Launch the executable `<build>\bin\profile\MaterialCanvas.exe`

    - This requires passing the —project-path, followed by the path your project, as a command line argument.

#### Create or edit a material graph
You can create a new material graph or open an existing material graph from the File menu in Material Canvas, or from the Context menu in the Asset Browser: 

- From the File menu in Material Canvas:
  
  - To create a new material graph, choose **New**, New Material Graph Document. Then select a template as the starting point for your new material graph.
  
  - To open an existing material, choose **Open...**, Open Material Graph Document. Then select the material graph file from the browser.
  
  - You may also use the **Open Recent** menu option to select a previously opened document.
  
    - Material Canvas supports editing other document types like Material Graph Node Config and Shader Source Data config files. These will also appear in the recent files list.

- From the Context menu in the Asset Browser:
  
  1. Select a `.materialgraph` file.
 
  2. Then, right-click the `.materialgraph` file to open the context menu.
  
  3. Choose **Open in Material Canvas...** to open the material in Material Canvas.

![Material Canvas](/images/atom-guide/materials/material-canvas.jpg)

## Title bar
The title bar at the top of the main window displays the active RHI, rendering back end (DX12 or Vulkan).

## Main Menus
At the top of Material Canvas are the following menus: File, Edit, View, Tools, and Help. 

### File Menu
The File menu contains options to manage the Material Canvas and material files.
| Menu item | Hotkey | Function |
| - | - | - |
| New | **Ctrl+N** | Opens a sub menu allowing you to create a new material graph, material graph node, or one of the other supported document types. |
| Open... | **Ctrl+O** | Opens a sub menu allowing you to select different document types to open in Material Canvas .|
| Save | **Ctrl+S** | Save the edits in the active document tab. |
| Save As... |  | Save the edits in the active document tab to the specified folder and file name.  |
| Save As Child... |  | Save a new child document of the current document.  |
| Save All |  | Save the edits in all open document tabs. |
| Close | **Ctrl+F4** | Close the active document tab. |
| Close All |  | Close all of the open document tabs. |
| Close Others |  | Close all of the document tabs except the active one. |
| Run Python... |  | Opens a folder to select a Python script to run. |
| Exit |  | Close the Material Canvas. |

### Edit Menu
The Edit menu contains options that are useful while editing the selected, open document. The available menu actions may change based on the type of open document.

| Menu item | Hotkey | Function |
| - | - | - |
| Undo | **Ctrl+Z** | Undo the most recent action.  |
| Redo | **Ctrl+Y** | Redo the most recent action that was undone.  |

### View Menu
The view menu lets you switch between document tabs and manage layouts within Material Canvas. The available menu actions may change based on the type of open document.

| Menu item | Hotkey | Function |
| - | - | - |
| Previous Tab | **Ctrl+Shift+Tab** | Switches to the previously opened tab. |
| Next Tab | **Ctrl+Tab** | Switches to the next opened tab. |

### Tools Menu
The tools menu lets you open or close panels and access the settings dialog in the Material Canvas.

| Menu item | Hotkey | Function |
| - | - | - |
| Asset Browser | | Toggles the Asset Browser window. |
| Inspector | | Toggles the Inspector window. |
| Viewport Settings | | Toggles the Viewport Settings window. |
| Performance Monitor | | Toggles the Performance Monitor window. |
| Python Terminal | | Toggles the Python Terminal window. |
| Bookmarks l | | Toggles the Bookmarks window. |
| Mini map | | Toggles the mini map window. |
| Node palette  | | Toggles the nude palette window. |
| Viewport  | | Toggles the viewport window. |

### Help Menu
The Help menu provides support and resources for the Material Canvas.

| Menu item | Hotkey | Function |
| - | - | - |
| Help...  | | Launches the Material Canvas Help window and displays a list of controls in the Material Canvas. |
| About... | | Displays information about the Material Canvas. |

## Central Window
Material Canvas and other Atom Tools support opening and editing multiple document types, documents, and views. The main views and content for each document will be displayed as part of the central window.

### Document Tabs
The top of the central window displays tabs for each open document. The tab bar highlights the tab for the active document. You can switch between open documents by clicking on their title in the tab bar. You can close each document by clicking the X on its tab and perform other actions made available by right clicking on the tab. Tabs can be dragged and reordered but they cannot be undocked. Switching tabs will also update the inspector to display properties for the newly selected document.

### Graph View
The main document type in Material Canvas is the material graph. Each material graph document tab displays a gridded, graph view as the main workspace for viewing and editing graph nodes and connections.

## Node Palette 
The node palette displays a tree of items for all of the nodes that can be dragged on to the graph. Dragging a node from the node palette on to the graph view will create the corresponding node at the drop position. 

## Bookmarks
Use the bookmarks window to manage a list of bookmarks that have been added to the graph. Bookmarks can be added to the graph by right clicking and using the context menu in the graph view. Double clicking on a bookmark in the bookmark window will move the graph view its position. 

## Mini Map 
Use the minimap window to view and navigate a zoomed out version of the graph view. 

## Inspector
In the **Inspector**, you can configure the properties for the active document. Each document type will show relevant groups of editable properties in the inspector. 

 - Material graph documents will display properties for each selected node.

 - Material graph node config documents will display editable properties for the node and each of its slots.

 - Shader graph source data documents will display all of the available settings 4 shader source data, render states, compilation settings, and so on.

## Asset Browser
The **Asset Browser** allows you to search for assets across O3DE, Gems, and other project folders. In the Material Canvas, the Asset Browser is automatically filtered to show image and material assets. You can display more assets by changing the filter. When an asset is selected, a preview of the asset is shown on the side. 

## Python Terminal
With the **Python Terminal**, you can run Python commands to modify, import, and process various assets that the Material Canvas uses, such as shaders, textures, and materials. 

## Performance Monitor
The **Performance Monitor** provides an overview of the Material Canvas's run-time performance. It displays the frame rate, and the GPU and CPU frame times. This is useful to gauge the CPU and GPU performance of materials and assets.

## Viewport
Use the **Viewport** window to preview open materials. To preview materials in various environments, configure the 3D model and lighting setup (see the [Viewport Toolbar](#viewport-toolbar) and [Viewport Settings](#viewport-settings) sections below).

### Interacting with the Viewport
You can view your material in the Viewport in different perspectives by moving the camera, model, or lighting environment.

#### Camera Controls
These controls adjust the camera view.
| Control | Action |
| - | - |
| **LMB+Drag**, **RMB+Drag** | Tumble the camera around a pivot or point of interest. |
| **MMB Scroll** | Dolly the camera toward or away from a pivot or point of interest. |
| **MMB+Drag** | Track the camera left, right, up, and down in the direction of mouse movement. |
| **Z** | Reset camera view. |

#### Model and Lighting Controls
These controls adjust the model and lighting within the current camera view. 
| Control | Action |
| - | - |
| **Ctrl+LMB+Drag** | Tumble the model. |
| **Shift+LMB+Drag** | Rotate the lighting environment horizontally around the model. |

#### Industry-standard Controls
Industry-standard controls to orbit, zoom, and pan in the Viewport. 
| Control | Action |
| - | - |
| **Alt+LMB+Drag** | Tumble the camera around a pivot or point of interest. |
| **Alt+RMB+Drag** | Dolly the camera toward or away from a pivot or point of interest. |
| **Alt+MMB+Drag** | Track the camera left, right, up, and down in the direction of mouse movement. |

## Viewport Toolbar
The Viewport Toolbar contains the following set of functions to configure the Viewport:

| Function | Description |
| - | - |
| **Display Grid** | Show or hide the ground plane in the Viewport.    |  |  |
| **Display Shadow** | Show or hide the shadow effect in the Viewport.    |  |  |
| **Alternate Skybox** | Toggle between the primary and alternate skybox settings for the active lighting preset.    |  |  |
| **Tone Mapping** | Select which tone mapping effect will be applied to the viewport.    |  |  |
| **Model Preset** | Select a model preset to preview the material on. A model preset can be configured in the [Model property group](#model) in the Viewport Settings.   |  |  |
| **Lighting Preset** | Select a lighting preset to view your material in a specific image-based lighting (IBL) environment. A lighting preset is a set of image-based lighting (IBL) data that can be configured in the [Lighting property group](#lighting) in the Viewport Settings. |  |  |
| **Render Pipeline** | Select the render pipeline that will be used to render the scene in the viewport. |  |  |

## Viewport Settings
The Viewport Settings window displays options to configure the Viewport properties. These properties control how the Viewport appears and which features are active. You can also create or edit configuration presets for the viewport model and the lighting environments. 

![Model Preset Browser](/images/atom-guide/materials/viewport-settings.png)

Viewport Settings contains the following settings groups:

### General
The General property group contains basic properties that are required by the Viewport. 

| Property | Description |
| - | - |
| **Enable Grid** | Show or hide the ground plane. (This property is also accessible in the Viewport Toolbar.) |
| **Enable Shadow Catcher** | Show or hide shadow effects. (This property is also accessible in the Viewport Toolbar.) |
| **Enable Alternate Skybox** | Toggle to display the alternate skybox image if one is specified by the **Skybox Image Asset (Alt)** property in the lighting preset.  |
| **Field of View** | Adjust the camera's field of view. |
| **Display Mapper Type** | Configure tone mapping and color grading |

### Model
The Model property group allows you to manage the list of available model presets, and configure their properties. Model presets are useful for previewing materials on a variety of surfaces. Atom includes a collection of basic models, and you can create additional presets with custom models. Model presets are stored in JSON files (`*.modelpreset.azasset`) and can be configured in the Viewport Settings. 

#### Buttons
These controls are used to create, edit, save, or reset a specific model preset.  
| Button | Description |
| - | - |
| **Add** | Create a new model preset and select a save file location. Model presets can be saved anywhere in your project folder.  |  |  |
| **Select** | Open the **Model Preset Browser**, browse, and select from the list of available model presets. |  |  |
| **Save** | Save changes made to the selected model preset. |  |  |

#### Properties
The following are properties you can configure for the selected model preset.  
| Property | Description |
| - | - |
| **Display Name** | Specify the name of this preset. The name appears in the Viewport Model drop-down list in the Viewport Toolbar.  |  |  |
| **Model Asset** | Assign a model asset for this preset. The model asset must be in FBX format (`.fbx`). |  |  |
| **Preview Image Asset** | Assign an image as the preview icon for this preset. The image appears in the Viewport Model drop-down list in the Model Preset Browser. |  |  |

#### Model Preset Browser
The **Model Preset Browser** window opens when the **Select** button is pressed. The Model Preset Browser window is a separate window that cannot be docked.

### Lighting
The Lighting property group allows you to manage the list of available lighting presets, and configure their properties. Lighting presets are useful for previewing materials in a variety of lighting conditions. Atom includes a collection of lighting presets, and you can create additional presets with a custom skymap image and lighting properties. Lighting presets are stored in JSON files (`*.lightingpreset.azasset`), and can be configured in the Viewport Settings. 

#### Buttons  
These controls are used to create, edit, save, or reset a specific lighting preset.  

| Button | Description |
| - | - |
| **Add** | Create a new lighting preset and select a save file location. Lighting presets can be saved anywhere in your project folder.  |  |  |
| **Select** | Open the **Lighting Preset Browser**, browse, and select from the list of available lighting presets. |  |  |
| **Save** | Save changes made to the selected lighting preset. |  |  |

#### Properties  
The following are properties you can configure for the selected lighting preset.  

| Property | Description |
| - | - |
| **Display Name** | Specify the name of this preset. The name appears in the Viewport Model drop-down list in the Viewport Toolbar.  |  |  |
| **IBL Diffuse Image Asset** | Assign a diffuse lighting cubemap to use for IBL. |  |  |
| **IBL Specular Image Asset** | Assign a specular lighting cubemap to use for IBL. |  |  |
| **Skybox Image Asset** | Assign a diffuse lighting cubemap to use as the skybox, or background. |  |  |
| **Skybox Image Asset (Alt)** | Assign a diffuse lighting cubemap to use an alternative skybox, or background. This allows you to have a different background while using the same lighting settings. Enable this skybox using the **Enable Alternate Skybox** property in the [General](#general) settings. |  |  |
| **Skybox Exposure** | Adjust the brightness of the skybox. |  |  |
| **Shadow Catcher Opacity** | Adjust the opacity level of the ground plane that catches the model's shadows.  |  |  |
| **Exposure** | A group of settings to configure the exposure. |  |  |
| **Lights** | Manage a list of lights for the active lighting preset. |  |  |

#### Lighting Preset Browser  
The **Lighting Preset Browser** window opens when the **Select** button is pressed. The Lighting Preset Browser window is a separate window that cannot be docked.

![Lighting Preset Browser](/images/atom-guide/materials/lighting-preset-browser.png)

{{< note >}}  
The collection of lighting presets are stored in the folder `Gems/Atom/Tools/MaterialCanvas/Assets/MaterialCanvas/LightingPresets`. 
{{< /note >}}  
