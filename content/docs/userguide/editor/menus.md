---
description: ' This topic provides brief descriptions of the main menu bar in Lumberyard Editor. '
title: Using the Menu Bar
---
# Using the Menu Bar {#lumberyard-editor-menus}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

The main menu bar in Lumberyard Editor provides access to the features and tools to design, run, and deploy your game, as well as, work with external tools and find online information\. To access the available features and tools, you can use the menu, the buttons on the toolbars, or the keyboard\. You can pause on the buttons to see tool tips\. Some editors and tools have keyboard shortcuts\. For a comprehensive list, see [Using Keyboard Shortcuts](/docs/userguide/editor/shortcut-keys.md)\.

![\[Lumberyard Editor main menu bar.\]](/images/userguide/lumberyard-editor-menu-bar.png)

The main menu bar has the following categories of features and functionality\.


****

| Menu Item | Description |
| --- | --- |
| File | Manage your resource files for your level, project, and other file management tools\. |
| Edit | Select objects in your level and make changes\. |
| Game | Perform operations that affect the whole game\. |
| Tools | Launch a variety of editors and specialty tools\. |
| AWS | Set and configure Amazon Web Services and manage your profile\. |
| Help | Get information about this version of Lumberyard and how to use it\. |

## File {#lumberyard-editor-menus-file}

In the **File** menu, you can manage your game project such as opening and saving level files, show a log file, and modify your project's settings\.

![\[Lumberyard Editor File menu\]](/images/userguide/lumberyard-editor-file-menu.png)


****

| File Menu Item | Description |
| --- | --- |
| New | Create a new level\. For more information, see [Creating a New Level](/docs/userguide/level-create.md)\. |
| Open | Switch to another level in your project\. |
| Open Recent | Open a recently opened level\. |
| Save | Update the level file with your changes\. |
| Save as | Create a copy of the open level with a new name\. |
| Save Level Resources | Update all of the assets with changes made in the open level\. |
| Save Level Statistics | Save statistics for the open level to an \.xml file\. |
| Save Modified External Layers | Save only the external layers that have been modified since the last save\. |
| Project Settings | Launch other file management tools:[\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus)  |
| Show Log File | Show the log file that contains all text printed in the console to a \.log file in the project's directory\. |
| Upgrade Legacy Entities | Launch the Legacy Converter tool to convert your legacy entities to components that you can edit in Lumberyard Editor\. For more information, see [Converting Entities with the Legacy Converter](/docs/userguide/components/entity-data-converter.md)\. |
| Exit | Close Lumberyard Editor\. At the prompt, you can save any changes made since the last save was performed\. |

## Edit {#lumberyard-editor-menus-edit}

In the **Edit** menu, you can select and manipulate objects, such as undo and redo actions, and select and hide objects\.

![\[Lumberyard Editor edit menu\]](/images/userguide/lumberyard-editor-menus-edit.png)


****

| Edit Menu Item | Description |
| --- | --- |
| Undo | Revert the last action\. |
| Redo | Apply the last action\. |
| Duplicate | Create a copy of the selected object |
| Delete | Remove the selected object from the level and its base object remains available in the Asset Browser\. |
| Select All | Specify that all visible, unlocked objects are selected for changing or applying settings\. |
| Deselect All | Remove focus from the objects that are currently selected\. |
| Next Selection Mask | Select the next selection mask\. |
| Invert Selection | Swap the selection set from the currently, selected set of objects to the other available objects\. |
| Hide Selection | Set the selected object as invisible\. |
| Show Selection | Set the selected object as visible\. |
| Show Last Hidden | Reverse the visibility setting of the hidden object last modified\. |
| Unhide All | Set all invisible objects as visible\. |
| Group | Specify multiple selected objects as a set to manipulate and modify\. The viewport displays a green box around the objects\. |
| Modify | Show a submenu of actions\. See the [Modify](#lumberyard-editor-menus-modify) section\. |
| Lock Selection | Set the selected object as frozen\. Frozen objects are uneditable\. |
| Unlock All | Set all frozen objects as editable\. |
| Rename Object\(s\) | Opens a dialog box to specify a new name\. If you rename multiple objects at once, each object is appended with a number\. |
| Set Object\(s\) Height | Opens a dialog box to specify a specified height \(in meters\) above the terrain\. |
| Editor Settings | See the [Editor Settings](#lumberyard-editor-menus-config-spec) section\. |

### Group {#lumberyard-editor-menus-group}

In the **Group** menu, you can apply changes to multiple objects as a set, such as grouping and ungrouping objects\.

![\[Lumberyard Editor Group submenu of the Edit menu.\]](/images/userguide/lumberyard-menusedit-group.png)


****

| Group Menu Item | Description |
| --- | --- |
| Group | Specify multiple objects as a set to manipulate\. |
| Ungroup | Separate all of the objects that are in the selected group\. |
| Open Group  | Allow an object within a set to be selected and manipulated independently of the group\. |
| Attach to Group | Add selected objects to a group\. |
| Detach from Group | Remove selected objects from a group\. |
| Hold | Save the current state for the group temporarily, so that you can test and experiment with alternative settings\. You can keep the new settings or click Fetch to undo them\. |
| Fetch | Restores the state of the group to the saved state specified with Hold\. This option is only available if you placed a Hold at some point\. |

### Modify {#lumberyard-editor-menus-modify}

In the **Modify** menu, you can manipulate attributes and properties of objects and entities, such as height, alignment, and material\.

![\[Lumberyard Editor Modify submenu of the Edit menu\]](/images/userguide/lumberyard-menusedit-modify.png)


****

| Modify Menu Item | Description |
| --- | --- |
| Link | Create hierarchies between objects\. |
| Unlink | Remove the connection between linked objects\. |
| Align | Display a submenu with options for placing an object in relationship to the grid, to another object, or to the selected surface, which moves the pivot point of the object\. If you align an object to another object that has modified scale or rotation, the original object will use the modified settings along with the position data\. To override this action, use the following keys \(single or combination\) when you select the original object:[\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus) |
| Constrain | Limit the movement of an object to the XYZ axes, XY planes, or to the surface of the terrain and objects\. |
| Snap | Place an object on the grid or a rotational increment\. |
| Transform Mode | Displays a submenu to apply the following changes to an object:[\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus) |
| Convert to | Change the selected object to another type of entity: brush, geometry entity, designer object, static entity, game volume, or component entity\. For more information, see the [Converting Entities with the Legacy Converter](/docs/userguide/components/entity-data-converter.md)\. |
| Fast Rotate | Quickly spin the selected object on the specified axis or with the degree value that you set for Rotate Angle\. |
| Sub Object Mode | If the Edit Mesh function is enabled, select and edit the geometry components of the object\. |
| Save Object\(s\) | Update the file with the changes made to the selected objects\. |
| Load Object\(s\) | Open the dialog box to browse and select objects from the game directory\. |
| Update Procedural Vegetation | Reapply settings in the \.sbsar files\. |

### Editor Settings {#lumberyard-editor-menus-config-spec}

In the **Editor Settings** menu, you can customize your editing experience\.

![\[Lumberyard Editor Editor Settings of the Edit menu\]](/images/userguide/lumberyard-menusedit-config.png)


****

| Editor Settings Menu Item | Description |
| --- | --- |
| Global Preferences | Modify the global settings for Lumberyard Editor and its tools\. For more information, see [Changing Preferences](/docs/userguide/editor/customizing#lumberyard-editor-customizing-preferences)\. |
| Graphics Performance | Select your preferred display setting: [\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus) |
| Keyboard Customization | Configure toolbars, menus, and keyboard shortcuts\. You can customize your keyboard settings, with the option to import or export saved custom keyboard settings\. |

## Game {#lumberyard-editor-menus-game}

In the **Game** menu, you can add and test enhancements to your game project\.

![\[Lumberyard Editor Game menu\]](/images/userguide/lumberyard-editor-menus-game.png)


****

| Game Menu Item | Description |
| --- | --- |
| Play Game | Switch to game mode \(runtime\)\. To return to edit mode, press Esc\. |
| Enable Physics/AI | Toggle physics and AI in your level to use the PhysX system if the event bus and handlers are not specified\. For more information, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\. |
| Export to Engine | Export the level data to a level\.pak file in order to play the level in game mode\. |
| Export Selected Objects | Save the selected geometry to an \.obj or \.fbx file to make it available for use with other entities\. |
| Export Occlusion Mesh | Save the occlusion mesh for application to other entities\. |
| Terrain Collision | Toggle the ability of the camera to move with the terrain surface and prevent flying under the terrain surface\. |
| Edit Equipment Packs | Open the Edit Equipment Packs window to add, delete, rename, or reorder the equipment for an actor\. |
| Toggle SP/MP GameRules | Toggle between single player and multiplayer game rules\. |
| Synchronize Player with Camera | Set the player's position relative to the camera position\. |
| AI | Submenu for artificial intelligence options\. See the [AI](#lumberyard-editor-menus-ai) section\. |
| Audio | Submenu for sound options\. See the [Audio](#lumberyard-editor-menus-audio) section\. |
| Clouds | Submenu enabled when the Sky Clouds gem is included in the project\. See the [Clouds](#lumberyard-editor-menus-clouds) section\. |
| Prefabs | Submenu for the legacy version of slices\. See the [Prefabs](#lumberyard-editor-menus-prefabs) section\. |
| Terrain | Submenu for managing the terrain\. See the [Terrain](#lumberyard-editor-menus-terrain) section\. |
| Debugging | Submenu offer options for reloading specific files and for error checking\. See the [Tools](#lumberyard-editor-menus-tools) section\. |

### AI {#lumberyard-editor-menus-ai}

In the **AI** menu, you can manage AI settings such as generating AI navigation and updating the AI system within a level\. For more information, see the **[Navigation Area](/docs/userguide/components/nav-area.md)** component\.

![\[Lumberyard Editor Artificial Intelligence (AI) submenu of the Game menu\]](/images/userguide/lumberyard-menusgame-ai.png)


****

| AI Menu Item | Description |
| --- | --- |
| Generate All AI | Generates the AI navigation to include triangulation, 3D navigation volumes, flight navigation, and waypoints\. |
| Generate Triangulation | Generates only the triangulation of the navigation mesh that is used for outdoor levels\. |
| Generate 3D Navigation Volumes | Generates only the 3D navigation data for 3D volumes that are used by alien AI agents; volumes are defined by AINavigationModifier and a Volume navigation type\. |
| Generate Flight Navigation | Generates only the 2\.5D navigation data for volumes used by flying AI agents; volumes are defined by AINavigationModifier and a Flight navigation type\. |
| Generate Waypoints | Generates only the links for indoor waypoints\. |
| Validate Navigation | Check the generated data for various problems and display warnings if any problems are found \(for example, bad object placement, overlapping forbidden areas, or corruptions\)\. |
| Clear All Navigation | Remove the triangulation, 3D navigation volumes, flight navigation, and waypoint data from the level\. |
| Generate Spawner Entity Code | Search for AI entity classes and generate an \.ent file for each; associate an entity class name with the Lua base file for that entity\. |
| Generate 3D Debug Voxels | Generate debugging information for volume navigation regions when the ai\_DebugDraw console variable is enabled\. |
| Create New Navigation Area | Create a navigation area\.  |
| Request a full MNM rebuild | Perform a full rebuild of all multi\-layer navigation mesh \(MNM\) data\. Use this periodically if the Continuous Update feature is off \(see below\)\. |
| Show Navigation Areas | Enable blue areas to highlight MNM areas on the terrain in the viewport\. |
| Add Navigation Seed | Add an entity designated as points of off\-mesh accessibility of an MNM\. |
| Continuous Update | Enable automatic updates to the MNM data\. If disabled, you need to select Request a full MNM rebuild in order for the mesh data to update\. |
| Visualize Navigation Accessibility | Display areas that are inaccessible to the AI agent in red and accessible areas in blue in the viewport\. |
| View Agent Type  | Select from a submenu of agent types such as MediumSizedCharacters\. You can add agent types to the navigation\.xml file in the lumberyard\_version\\dev\\your\_project\\scripts directory\. |
| Generate Cover Surfaces | Generate the data specifying areas available for hiding and avoiding danger\. |
| AIPoint Pick Link | Combine AI navigation modifier points\. |
| AIPoint Pick Impass Link | Restricts AI navigation modifier points to prevent AI from walking on the points\. |

### Audio {#lumberyard-editor-menus-audio}

In the **Audio** menu, you can stop all sounds or refresh the audio\.

![\[Lumberyard Editor Audio submenu of the Game menu\]](/images/userguide/lumberyard-editor-menusgame-audio.png)


****

| Audio Menu Item | Description |
| --- | --- |
| Stop All Sounds | Silence all sounds in the level\. |
| Refresh Audio | Reapply settings to all of the sounds in the level\. |

### Clouds {#lumberyard-editor-menus-clouds}

In the **Clouds** menu, you can create, open, close, and delete your custom cloud assets\. The project must have the [Sky Clouds Gem](/docs/userguide/gems/builtin/cloud.md) enabled\. For more information, see [Sky Clouds Gem](/docs/userguide/gems/builtin/cloud.md)\.

![\[Lumberyard Editor Clouds submenu of the Game menu with Sky Clouds gem enabled.\]](/images/userguide/lumberyard-menusgame-clouds.png)


****

| Clouds Menu Item | Description |
| --- | --- |
| Create | Create a new cloud asset\. |
| Destroy | Remove a custom cloud asset\. |
| Open | Open the selected cloud asset\. |
| Close | Close the selected cloud asset\. |

### Prefabs {#lumberyard-editor-menus-prefabs}

In the **Prefabs** menu, you can modify CryEntities defined in the prefab library\.

**Note**
We recommend that you use slices instead\. For more information, see [Working with Slices](/docs/userguide/components/slices.md)\.



![\[Lumberyard Editor Prefabs submenu of the Game menu.\]](/images/userguide/lumberyard-menusgame-prefabs.png)


****

| Prefabs Menu Item | Description |
| --- | --- |
| Create Prefab from Selected Object\(s\) | Create a prefab from selected objects\. |
| Add Selected Object\(s\) to Prefab | Add the selected objects to the prefab\. |
| Clone Selected Object\(s\) | Clone the selected objects\. |
| Extract Selected Object\(s\) | Extract the selected objects from the prefab\. |
| Open All | Open all prefabs\. |
| Close All | Close all prefabs\. |
| Reload All | Reload all prefabs\. |

### Terrain {#lumberyard-editor-menus-terrain}

In the **Terrain** menu, you can specify changes that affect the game world and terrain appearance\.

![\[Lumberyard Editor Terrain submenu of the Game menu.\]](/images/userguide/lumberyard-menusgame-terrain.png)


****

| Terrain Menu Item | Description |
| --- | --- |
| Generate Terrain Texture | Generate the terrain surface texture in a compressed format into the terraintexture\.pak file; you must do this in order for changes made by the terrain painter to be visible in game mode\. |
| Generate Terrain | Open the Terrain Editor to generate terrain for the level\. |
| Edit Terrain | Open the Terrain Editor to modify the terrain settings\. |
| Export/Import Megaterrain Texture | Save or include a megaterrain texture, which is a diffuse texture that provides changes in detail as the camera moves closer to the terrain\. |
| Export Terrain Block | Save a section of the terrain to a terrain block \.trb file\. |
| Import Terrain Block | Include terrain from a saved \.trb file\. |
| Resize Terrain | Open the Terrain Resize tool to modify the terrain size\. |
| Terrain Modify | Flatten or smooth the terrain\. |
| Edit Vegetation | Open the Vegetation section on the Terrain tab in the Rollup Bar in order to modify the vegetation\. |
| Paint Layers | Open the Layer Painter section on the Terrain tab in the Rollup Bar in order to modify settings on the layer\. |
| Refine Terrain Texture Tiles | Divide the terrain tiles into smaller sections\. |
| Export Terrain Area | Save the selected terrain area to an \.obj or \.fbx file\. |
| Export Terrain Area with Objects | Save the selected terrain area and all objects within to an \.obj or \.fbx file\. |

### Debugging {#lumberyard-editor-menus-debugging}

In the **Debugging** menu, you can reload scripts, textures, geometry, and terrain\. Other debugging options include configuring user commands and checking the level for errors\.

![\[Lumberyard Editor Debug submenu of the Game menu.\]](/images/userguide/lumberyard-menusgame-debug.png)


****

| Debugging Menu Item | Description |
| --- | --- |
| Reload Scripts | Reapply all scripts or apply scripts separately for actor, AI, entity, item, and UI\. |
| Reload Textures/Shaders | Reapply the settings for all of the textures and shaders used in the level\. |
| Reload Geometry | Reapply the settings for all of the geometry used in the level\. |
| Reload Terrain | Reapply the settings for the selected terrain\. |
| Resolve Missing Objects/Materials | Check the level and resolve all object and material issues\. |
| Enable File Change Monitoring | Enable tracking to detect changes to files\.  |
| Check Object Positions | Check the position of all objects in the level\.  |
| Clear Registry Data | Remove the registry data stored for all custom toolbars\. |
| Check Level for Errors | Compile a list of errors within the level \(such as duplicate objects and missing assets\) and display it in the console window\. |
| Save Level Statistics | Update the your\_level\_name\.xml file in the C:\\Amazon\\Lumberyard\\your\_version\\dev\\Cache\\your\_game\\pc\\your\_game\\testresults directory with current data\. |
| Compile Script | Compile an entity script\. |
| Reduce Working Set | Reduce memory consumption\. |
| Update Procedural Vegetation | Apply modifications made to the procedural vegetation\. |
| Configure Toolbox Macros | Open the Tools Configuration window to create shortcuts for the console commands\. |
| Toolbox Macros | Display the shortcuts in the console and Lumberyard Editor commands that you created\. |
| Script Help | Open the Script Help window to view a list of commands, descriptions, and examples\. |

## Tools {#lumberyard-editor-menus-tools}

In the **Tools** menu, you can access Lumberyard Editor tools and plugins\. For more information, see [Lumberyard Editors and Tools](/docs/userguide/lumberyard-tools.md)\.

![\[Lumberyard Editor Tools menu\]](/images/userguide/lumberyard-editor-menus-tools.png)

## View {#lumberyard-editor-menus-view}

In the **View** menu, you can customize the layout and the viewport of Lumberyard Editor\.

![\[Lumberyard Editor View menu\]](/images/userguide/lumberyard-editor-menus-view.png)


****

| View Menu Item | Description |
| --- | --- |
| Center on Selection | Select an object to zoom to its boundaries\. You can then press Alt and use the mouse to pan around the object, which remains centered on the screen\. |
| Show Quick Access Bar | Show or hide the quick access bar\. |
| Error report | Open the file with details about errors\. |
| Layouts | Choose or save the pane layout shown in Lumberyard Editor: [\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus) |
| Viewport | Submenu for the Perspective panel\. See the [Viewport](#lumberyard-editor-menus-viewport) section\. |
| Refresh Style | Reapply the stylesheet from of the editor's stylesheet\. |

### Viewport {#lumberyard-editor-menus-viewport}

In the **Viewport** menu, you can change settings that affect the display for level design, entity placement, and object manipulation\. For more information, see [Using the Viewport](/docs/userguide/editor/viewport.md)\.

![\[Lumberyard Editor Viewport submenu of the View menu.\]](/images/userguide/lumberyard-editors-menusview-viewport.png)


****

| Viewport Menu Item | Description |
| --- | --- |
| Wireframe | Enable or disable the wireframe view\. |
| Ruler | Add a tool measure the distance from one point to another\. |
| Grid Settings | Set grid line spacing, angle snapping, and rotation and translation settings\. |
| Configure Layout | Select a preconfigured layout\. |
| Goto Coordinates | Specify the camera position in XYZ coordinates and move the camera to that position\. |
| Center on Selection | Go to the currently selected object in the viewport\. |
| Goto Location | Go to one of 10 predefined locations in the viewport\. |
| Remember Location | Save up to 10 locations in the viewport\. |
| Change Move Speed | Change the movement speed for all objects in the level\. |
| Switch Camera | Change the camera for the viewport: [\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus) |
| Show/Hide Helpers | Show or hide all helper objects\. |

## AWS {#lumberyard-editor-menus-aws}

In the **AWS** menu, you can sign up for an Amazon Web Services \(AWS\) account, set up services using Cloud Canvas and Amazon GameLift, and open the **Cloud Gem Portal**\.

![\[Lumberyard Editor Amazon Web Services (AWS) menu.\]](/images/userguide/lumberyard-editors-menu-AWS.png)


****

| AWS Menu Item | Description |
| --- | --- |
| Credentials manager | Add or edit an AWS profile\. |
| Cloud Canvas | Select a deployment or see more information in [Understanding Cloud Canvas Resource Manager](/docs/userguide/gems/cloud-canvas/ui-rm-overview.md) or [Using Dynamic Content Manager](/docs/userguide/gems/cloud-canvas/dc-manager.md)\. |
| Commerce | Learn how to submit your game to Amazon's Digital Software store using [Merch by Amazon](https://merch.amazon.com/landing) or [Publishing on Amazon](https://developer.amazon.com/appsandservices/solutions/platforms/mac-pc)\. |
| GameLift | Access the Amazon GameLift console or learn more about the game server hosting and matchmaking solution built on AWS\. |
| Open AWS Console | Open the AWS Management Console and access Amazon Cognito, user management services; Amazon DynamoDB, NoSQL database service; Amazon S3, cloud storage; and AWS Lambda, serverless computing\. |
| Open Cloud Gem Portal | Open the [Cloud Gem Portal](/docs/userguide/gems/cloud-canvas/portal.md), a gem specifying the configuration to the API Gateway to AWS Lambda\. |

## Help {#lumberyard-editor-menus-help}

In the **Help** menu, you can search the Lumberyard documentation, open Lumberyard tutorials and resources, and view information about Lumberyard Editor\.

![\[Help menu\]](/images/userguide/lumberyard-editor-menus-help.png)


****

| Help Menu Item | Description |
| --- | --- |
| Search documentation | Type keywords to search the Lumberyard documentation\. |
| Getting Started | Open the [Amazon Lumberyard Getting Started Guide](https://docs.aws.amazon.com/lumberyard/latest/gettingstartedguide/)\. |
| Tutorials | Open the Amazon GameDev Tutorials website to view written and video tutorials\. |
| Documentation |  Select the following documentation:  [\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus)   |
| GameDev Resources |  Select the following resources:  [\[See the AWS documentation website for more details\]](/docs/userguide/editor/menus)  |
| Give Us Feedback | Send feedback to the Lumberyard email alias\. |
| About Lumberyard | View copyright, build, and version information for Lumberyard Editor\. |