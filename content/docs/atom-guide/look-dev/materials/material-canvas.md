---
title: Material Canvas
description: Learn how to use the Material Canvas to create material types and shaders from material graphs in Atom.
toc: true
---

## Overview

Creating material types and shaders in O3DE ordinarily requires familiarity with the engine, renderer, AZSL shading language, data types, file formats, and how everything fits together. It involves hand editing and manually managing multiple files, writing AZSL shader code, editing JSON, launching the Asset Processor to compile them, addressing any reported errors, then using the O3DE Editor or Material Editor to preview and customize assets.

**Material Canvas** drastically simplifies, accelerates, and automates creating custom shaders and material types by providing a visual scripting editor with familiar tools, workflows, status reporting, and live previews.

Drag, drop, connect, and configure nodes to construct material graphs that will automatically be transformed into standard source files for shaders, material types, and materials. The generated source files will be recognized by the Asset Processor, processed, and usable in any systems or components that consume materials.  With the default settings, Material Canvas regenerates and overwrites files whenever a graph is opened, edited, or saved. The viewport updates to display the results as quickly as changes are made and processed.

Material Canvas is built on top of the same foundations as established tools like Script Canvas and Material Editor. It is data-driven, customizable, extensible, and scriptable through the settings registry, Python, and C++. All of the current material graph nodes are defined in JSON files that contain snippets of AZSL. These files can be edited, and new ones created, from within Material Canvas.

## Quick Start
### Launch Material Canvas
To get started, launch Material Canvas from
- the **Open 3D Engine (O3DE)** Editor by selecting **Main Menu > Tools > Material Canvas**.
- the Material Component context menu, select **Open Material Canvas...**.
- or using one of the other methods described in the “Launching Material Canvas” section.

### Create/Open a Material Graph
You have multiple options to start editing a material graph.
- By default, Material Canvas starts with an untitled, blank material graph document that is ready for immediate use.
  - Until you save the graph, generated files will be output to your project Assets/Materials/Generated folder.
  - If you save the graph, generated files will be output to the same folder as the graph.  
- Create a new material graph from a template.
  - Select **Main Menu > File > New > New Material Graph Document...**.
    - This opens the "Create Material Graph Document" dialog.
  - Select a template as the basis for your new material graph.
    - Templates are material graphs saved with a special ".materialgraphtemplate" extension that designates them as a starting point for new graphs.
  - Select a path and file name for the new material graph.
- Open an existing material graph
  - Select **Main Menu > File > Open > Open Material Graph Document...**.
  - You can also open a material graph from the Asset Browser.

### Create Nodes
You can create nodes by dragging them from the node palette to the graph view or using the graph view context menu.
- Start by dragging one of the output nodes, like Base PBR, from the node palette to the graph view.
  - You can start with any nodes but no processing will take place without an output node to drive it.
- You will see the status bar indicate files are being generated and processed after this node is added to the graph.
- You will see the viewport update to show the generated material on the model after files have finished processing.

### Configure Nodes
If you chose Base PBR or Standard PBR as your output node the material will initially be white.
- You can change node properties directly on the node in the graph view or in the inspector.
- For example, change the base color to red (1, 0, 0, 1).
- You will see the status bar indicate the files are being regenerated and reprocessed.
- You will see the viewport update again, after changing this, or any other, property.
- The material and model in the viewport should now be red.

### Connect Nodes
You can create connections that cause output values from one node to be assigned to input values on another.
- Create additional nodes on the graph, like Constant or Input.
  - It can be any node with output slots but these are used as variables that can be connected as inputs to one or more other nodes on the graph.
  - Constant nodes generate immutable variables declared inline in shader code.
  - Input nodes generate named, Material SRG variables that are connected to configurable material properties.
    - These will show up and can be set in the Material Editor and Material Component.
- For example, create an Float4 or Color Input node anywhere on the graph.
  - These are interchangeable but represent the value with different controls in the UI.
- Click and hold the output slot for the value.
- Drag and drop the connection wire from that output slot to the base color slot on the output node.
- Once the connection is made, the editable value will disappear from the node and be grayed out in the inspector.
- You will see the graph reprocess and the viewport update.
- The viewport model will change from red to the color from the connected node.
- You can change the property values of the input node to see the colors changing in the viewport.
- if this was an input node, you should also be able to open the generated material or material type in the Material Editor to see the property can be configured from there as well.

More interesting and advanced graphs can be created by adding and nesting connections between function, texture sampling, time, transformations, and other nodes. Several examples can be found in the Material Canvas assets folder.

## Launching Material Canvas
There are multiple ways to launch Material Canvas.
- From **Open 3D Engine (O3DE)** Editor select **Main Menu > Tools > Material Canvas**
- From the Material Component context menu, select **Open Material Canvas...**
- From the Asset Browser, double click on a material graph or other Material Canvas compatible file type.
- From the Asset Browser, right click on a material graph or other Material Canvas compatible file type, then select **Open in Material Canvas...** 
- Material Canvas is also a standalone executable that can be launched directly from a file browser or command console.
  - Launch the executable `<build>\bin\profile\MaterialCanvas.exe`
  - This requires passing the —project-path, followed by the path your project, as a command line argument.

### Asset Processor
Material Canvas automatically launches the Asset Processor if it is not already running.  Some graphics related assets must be processed before the main window opens.

The shader compilation process is expensive, complex, and currently managed by the Shader Asset Builder.  Material Canvas relies on the Asset Processor and Shader Asset Builder to process, validate, and preview content generated by material graphs. The Asset Processor reports status, error messages, and other notifications as shader and material assets are built. The viewport updates with shader and material previews as quickly as those assets can be processed.

Building shader assets takes more time on Windows than Linux, or other platforms.  This is partially because Windows builds shaders for the null renderer, DX12, and Vulkan by default.  Registry settings can be configured to disable unused targets and vastly improve shader compilation and preview times.  Use the Material Canvas settings dialog to override these settings.

### Gem Initialization
Material Canvas normally initializes all of the gems enabled by the active project. In order to reduce start times and system resource utilization, Material Canvas, and the other atom tools, includes registry setting files that forcibly disable several standard O3DE gems that are not likely to be needed within the tool.

If Material Canvas, or Material Editor, fails to launch then it may be because of dependency issues with gems in the active project. Check the Material Canvas, or corresponding, log file for any system entity or module initialization errors. If necessary, change or delete the custom registry settings from the Material Canvas project registry folder.

## Navigating Material Canvas
After Material Canvas has opened and initialized it will display the main window, as shown below.

![Material Canvas](/images/atom-guide/materials/material-canvas.jpg)

## Title bar
The title bar at the top of the main window displays the active RHI, rendering back end (DX12 or Vulkan).

## Main Menus
At the top of Material Canvas are the following menus: File, Edit, View, Tools, and Help. 

### File Menu
The file menu contains all of the common actions for creating, opening, closing, and saving documents. There are other actions for opening recent documents and running Python scripts.
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
The basic edit menu has actions for performing undo and redo for modified documents. When a material graph document is open and active, several options will be added to manage the graph and its elements.  These are mostly the same options available in Script Canvas and Landscape Canvas, to control node selection, alignment, deletion, duplication, cutting, copying, and pasting.
| Menu item | Hotkey | Function |
| - | - | - |
| Undo | **Ctrl+Z** | Undo the most recent action.  |
| Redo | **Ctrl+Y** | Redo the most recent action that was undone.  |

### View Menu
The basic view menu for all of the atom tools provides actions for switching between open documents. Material Canvas adds options for managing and navigating the graph view. Additional options are available to open an editor for configuring comment node and node group presets.

| Menu item | Hotkey | Function |
| - | - | - |
| Previous Tab | **Ctrl+Shift+Tab** | Switches to the previously opened tab. |
| Next Tab | **Ctrl+Tab** | Switches to the next opened tab. |

### Tools Menu
The tools menu displays the names of all dockable panels. Clicking a panel name will toggle visibility of that panel. This menu also gives access to the settings dialog, where application registry settings can be configured.

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
The help menu gives access to actions for opening the help and about dialogs.

| Menu item | Hotkey | Function |
| - | - | - |
| Help...  | | Launches the Material Canvas Help window and displays a list of controls in the Material Canvas. |
| About... | | Displays information about the Material Canvas. |

### Multiple Documents, Types, and Views
Material Canvas and the main window operate using a multiple document and view Interface. A document is any file with a registered type that can be opened and edited in the tool. Material Canvas supports multiple document types.  This allows one application to support editing multiple types of data.

Multiple documents can be opened and edited simultaneously. Each document will be represented and accessible using a tab at the top of the main window. Each document tab contains an associated view that is usually the main workspace for viewing and editing the document.  Selecting a tab will activate the corresponding document, switch to its views, and update other windows, such as the inspector, with content from the current document.

#### Material Graph Documents
Material Graph Documents ".materialgraph" are the main documents type in Material Canvas. Each open material graph has a corresponding, two dimensional, gridded, graph view, where most editing will take place. All of the data related to nodes, connections, slot values, positioning, selection, and any other metadata about the graph will be stored in the material graph document.

#### Material Graph Node Documents
Material Graph Node Documents ".materialgraphnode" are JSON files defining each type of node that can be created in Material Canvas. They contain settings for a unique ID, unique names, display names, descriptions, data types, and default values for the node and its slots.  Additionally, they declare fragments of AZSL shader code and other metadata that Material Canvas uses to assemble complete shaders.  All of the current Material Canvas nodes are specified using material graph node configuration files.  Nodes can also be created and registered programmatically using C++ or Python.

#### Shader Source Data Config Documents
Shader Source Data Config Documents ".shader" are for editing shader configuration files. All of the supporting data types have been reflected so that shader source data files can be edited in the inspector or using Python. All of the options are enumerated and populated in the UI. This is useful for editing shader source data files and creating new templates for material graph output nodes, described later.

### Docked Windows
Several other windows are docked around the main window. This includes, but is not limited to, the Inspector, Node Palette, Bookmarks, Mini Map, Asset Browser, Logging Window, Python Terminal, Viewport, and Viewport Settings.

#### Inspector
The Inspector displays context sensitive, editable properties of the active document. For material graph documents, the inspector displays properties of each selected node in the graph view.  Changing properties in the inspector will update the graph and regenerate files.

#### Node Palette
The node palette contains a tree of all available material graph nodes, and other utility nodes, that can be added to a graph. The nodes are organized by category and color coded by type. Hovering the mouse cursor over each node in the tree will display a tool tip describing its purpose. Drag nodes from the palette into the active graph view to create an instance of that node at the drop position on the graph.

#### Bookmarks
Use the bookmarks panel to manage all of the bookmarks on the active graph. Place bookmarks on the graph, like pins on a map, as a point of reference for any important positions. Double clicking on a bookmark will center the graph view on that position. Bookmark descriptions and colors are configurable in the bookmarks panel and inspector.

#### Mini Map
The mini map window displays a zoomed-out overview of the nodes and graph. Quickly navigate to different parts of the graph by clicking and dragging the mini map.

#### Asset Browser
Use the Asset Browser panel to explore and manage assets in the active project and gems. Set up filters, select, create, rename, move, delete, and perform other operations on assets. The Asset Browser automatically selects the file corresponding to the most recently opened or activated document. This will only happen if the filters are set up to display the document type. Assets can be dragged from the Asset Browser into asset properties in the inspector and other windows supporting the dropped file types.

#### Logging
The logging window displays a list of trace, warning, and error messages emitted since the application was launched.

#### Python Terminal
Use the Python terminal to invoke script commands directly from within the application. It will also display the output, warnings, and errors from any Python code executed during the session.  Other views display available script commands and buses.

#### Viewport
The viewport renders a scene containing a model, with the current material applied to it, under configurable lighting conditions. The viewport window has a toolbar with controls for setting different options related to the grid, shadow catcher, and tone mapping mode. There are also drop downs for selecting the viewport model, lighting preset, and render pipeline. Lighting presets contain all the settings for the skybox, image-based lighting, directional lights, and other settings used in the viewport. Since the introduction of the material pipeline system, render pipelines can also be changed at runtime.

#### Viewport Settings
Use the viewport settings panel to edit the active lighting preset. The changes will be reflected in the viewport. Lighting presets can be selected, created, and saved from this panel. Model presets, which are sidecar files for identifying which models are available in the viewport, can also be managed from this panel. The viewport settings panel does not currently support undo/redo.

## Editing Material Graphs

### Node Creation and Placement
Nodes are the building blocks of every material graph.  Every node serves a purpose, providing data or a distinct piece of functionality that can be added to the graph.  Drag nodes from the node palette onto the material graph view.  Nodes can also be created by right clicking on the graph view and choosing a node from the embedded node palette. Doing either of these will cause the node to appear at the drop or click position.  The node will be selected and its properties will be displayed in the inspector for editing.

Depending on system constraints, this process can be repeated to add any number of nodes to a graph.  Some operations may take longer to perform based on the number of nodes on a graph or the number of selected nodes.

After nodes are added to the graph they can be moved and reorganized by dragging them to new positions.  There are actions on the toolbar and in the edit menu for changing the placement and alignment of selected nodes.

### Node Slots and Connections
Every Material Canvas node will have some number of slots.  Slots define properties, inputs, and outputs for a node.

Properties are slots that have no incoming or outgoing connections.  They are often used as constant values or to describe other details about the node.

Input slots have default values that are consumed by and assigned to variables used inside the node.  Input slots can only have one incoming connection.

Output slots represent return values from some operation performed by the node.  Output slots can have connections to multiple input slots on other nodes.  When an output slot is connected to an input slot on another node, the output slot value replaces the input slot value.

Connections are made between input slots and output slots by dragging a connection wire between them.  Material Canvas will prevent invalid, recursive or cyclic, connections between nodes.

### Node Types
Material Canvas has different node types that are broken into logical groups and color coded based on the function of the node.

#### Output Nodes (Main Nodes)
The most important node type for a material graph is the main, output node. These nodes provide all of the templates and meta data that instruct Material Canvas on what to generate.  Material Canvas will begin generating data once an output node, with properly configured template data, has been added to a material graph.

At this time, Material Canvas has two output nodes. The Base PBR and Standard PBR nodes contain input slots, options, and templates that can be used to create custom shaders and materials with lighting models and features similar to the core material type counterpart. Not all features have been exposed to the Standard PBR node.

Experiment by dragging one of these nodes onto a material graph.  If the automatic graph compilation settings are enabled, which they are by default, several shader files, the material type, and the default material will be generated in the folder containing the material graph file.

#### Constant Nodes
Constant nodes represent constant variables defined in line in shader code.  There are several constant nodes corresponding to different data types supported by the AZSL.  These nodes should be used to setup any variables that do not need to be exposed to outside of the shader or configurable through materials.

#### Input Nodes
Input nodes represent named variables that will be added to the Material SRG structure with properties and connections exposed in the material type.  These properties will be displayed and configurable in the material editor and material component.  They can also be controlled through script.  Input nodes have additional property slots for you to specify their name, description, and other data to make them easily identifiable.  As with constant nodes, there are several different nodes corresponding to data types supported by AZSL and the material system.

#### Vertex Nodes
The vertex node category contains nodes that correspond to different vertex attributes like positions, normals, texture coordinates, and so on.  There are nodes for the same attribute in local and world space.

#### Function Nodes
The function node category contains several math related and utility function nodes that process property and input values and return a result.  Currently, the majority of the function nodes are wrappers for AZSL intrinsic functions.

#### Scene Nodes
This category is intended to contain nodes for elements of the Scene SRG.  At this time, the only exposed node is Time.

#### Utility Nodes
The utility node category contains standard comment and group nodes used by all of the O3DE, graph editing tools.  Comment nodes can be placed throughout the graph to leave notes and descriptions about a particular part of the graph.  Group nodes can be used as a container for other nodes on the graph.  Groups containing other nodes can then be expanded, collapsed, and treated as a single node.

## Creating New Material Graph Nodes
Material Canvas nodes, with the exception of utility nodes, are completely defined in JSON configuration files.  As mentioned earlier, these files describe the nodes UUID, name, description, category, as well as the layout and details for each slot on the node.  Node configurations may have additional settings or meta data to drive the code and data generation process.

The material graph node document inspector supports creating unique node UUIDs, adding and removing slots, selecting data types, configuring default values, and managing custom settings for nodes and slots.  The inspector also has custom controls for making selections and editing AZSL.

It is possible to create nodes from scratch using tooling provided by Material Canvas.  However, some of the nodes are simple enough that it might be easier and faster to copy an existing material graph node file, update the UUID, and make changes using the tool or directly in JSON.  Future revisions to the material graph node inspector could further simplify this process.

### Material Graph Node Configuration Example
Below is a material graph node configuration for a floating-point constant node with one property and one output slot.

```
{
    "Type": "JsonSerialization",
    "Version": 1,
    "ClassName": "DynamicNodeConfig",
    "ClassData": {
        "id": "{5E2A378E-D27D-43C0-B708-3586FA2293F3}",
        "category": "Constants",
        "title": "Float Constant",
        "titlePaletteName": "ConstantNodeTitlePalette",
        "description": "Create a shader constant with the type and value defined by this node.",
        "slotDataTypeGroups": [
            "inValue|outValue"
        ],
        "propertySlots": [
            {
                "name": "inValue",
                "displayName": "Value",
                "description": "Value",
                "supportedDataTypeRegex": "float", 
                "defaultDataType": "float",
                "settings": {
                    "instructions": [
                        "SLOTTYPE SLOTNAME = SLOTVALUE;"
                    ]
                }
            }
        ],
        "outputSlots": [
            {
                "name": "outValue",
                "displayName": "Value",
                "description": "Value",
                "supportedDataTypeRegex": "float",
                "defaultDataType": "float",
                "settings": {
                    "instructions": [
                        "SLOTTYPE SLOTNAME = inValue;"
                    ]
                }
            }
        ]
    }
}
```

#### Material Graph Node Configuration Attributes
Every node configuration must have a unique ID.  This ensures that they are uniquely identifiable, regardless of location on disk, project, name collisions, or other factors.

The node category determines how nodes will be grouped together in the node palette tree.

The node title is the name displayed in the node palette and on the top of the node in the graph view.  It will also be used to help create unique symbol names and variable names in shader code.

The node title palette name is an optional field specifying which style sheet palette to use for the title bar on the node.  Style sheets configure styling, coloring, fonts, and other attributes that control how elements in the node palette and graph view are displayed.  Style sheets are defined in a separate, application wide file.

The node description is an optional field that will be presented as a tool tip when hovering over a node in the palette.

Slot data type groups contains a delimited list of slots names.  The material canvas graph traversal and code generation process will enforce that all slot names listed in this field are promoted to the same data type, if they are compatible.  Currently, if all of the listed slots reference scalar or vector values than all of the slot values will be promoted to the largest data type.  For example, if all of the slots on the node are scalar values but an incoming connection is a three-dimensional vector then all of the other slots will be up converted to three dimensional vectors.  This is necessary, in addition to other forms of casting, so that variables generated from different incoming types will be compatible with code and function calls defined in the node.

#### Material Graph Node Slot Configuration Attributes
Every slot configuration must have a unique name with respect to the node.  The slot name is used to uniquely identify and address the slot, setup connections between slots, and is used to create a unique variable name in generated shader code and other files.  The name will also be used as the display name in the UI if there is no specific display name specified.  Changing the name will break connections and lose any data associated with the slot.

The display name can be specified as a more user-friendly name to present in the UI.  If no note display name is assigned then one will be inferred from the slot name.

The description provides more detail about what slots do or represent.  These will be presented as tool tips when hovering the mouse cursor over the node and slot in the graph view.

The supporting data types regular expression field is used to acquire which data types are compatible with a slot.  The regular expression makes it easier to match several data types with a single expression instead of listing them all individually.  However, individual data types can be listed using vertical bar separators between them.

The default value field is used to set a specific default value for a slot.  This is optional because the system specifies a standard default value when registering all the data types.  No explicit default value is assigned in the node configuration then the registered default value will be used.

#### Material Graph Node Settings
Material Graph Nodes and slots provide a field for arbitrary settings.  Material graph nodes use the settings for data like blocks of AZSL instructions, template file lists, include file lists, and other entries used for material inputs and shader options.

In the previous example, the settings are used to add AZSL instruction blocks and code snippets to create a variable from a property slot and return its value on an output slot.

#### Material Graph Node Settings for AZSL Instructions
Material graph node and slot configurations can both contain settings for AZSL instruction blocks.  These instructions settings are simply lines of AZSL code that create variables, assign values, call functions, and anything else that can be done in AZSL.

In the above example, unique instruction sets are added to each input and output slot. The input slots have instructions for creating variables with the slot type and value assigned. The output slot instructions create another variable to hold the result of the multiplication.

During the code generation process, the entire graph will be traversed in depth order, and instructions will be stitched together from each node to fill in the shader program. For each node, instructions will be added in the following order: property slot instructions, input slot instructions, node instructions, output slot instructions. This gives a deterministic flow of data from inputs to outputs. In the final shader code, each variable name is prefixed with a unique identifier for the contributing node.

Various macros are available to insert details about the node or slot in instruction settings.
-	SLOTTYPE will be substituted with the AZSL data type for the current slot.
-	SLOTTYPE(name) will be substituted with the AZSL data type for the slot with the specified name.
-	SLOTNAME will be substituted with the unique, decorated variable name for the current slot.
-	SLOTNAME(name) will be substituted with the unique, decorated variable name for the slot with the specified name.
-	SLOTVALUE will be substituted with the value for the current slot unless it has an incoming connection. If there is an incoming connection, it will be replaced with the unique variable name for that connection.
-	SLOTVALUE(name) will be substituted with the value for the slot with the specified name unless it has an incoming connection. If there is an incoming connection, it will be replaced with the unique variable name for that connection.

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
