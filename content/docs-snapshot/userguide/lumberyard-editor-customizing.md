# Customizing Lumberyard Editor<a name="lumberyard-editor-customizing"></a>

You can customize your workspace by adjusting how the windows and tools are docked, customizing which toolbars and menus display, and updating the global editor settings\. 

**Note**  
To change the size setting for the toolbar icon, open the `Editor.cfg` file and enter a value for the `ed_toolbarIconSize` parameter\. By default, the toolbar icon size is set to `0` \(32 pixels\)\.

**Topics**
+ [Docking Windows and Toolbars](#lumberyard-editor-customizing-docking)
+ [Customizing Toolbars and Menus](#lumberyard-editor-customizing-tabs)
+ [Changing Preferences](#lumberyard-editor-customizing-preferences)

## Docking Windows and Toolbars<a name="lumberyard-editor-customizing-docking"></a>

When you drag a window or toolbar over an interface element or the edges of the editor, docking targets appear to show you where you can dock them\. These targets appear for the top, bottom, left, and right quadrants of the pane\. You can dock windows relative to any open pane, whether it is already docked, floating as a tab, or split in a column or row\.

**To split a row or column**  
To split a row or column, drop the window or toolbar on a docking target\.

![\[Split the column into two panes\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/lumberyard-editor-customize-splitting-column.gif)

**To dock a window or toolbar as a tab**  
To dock a window or toolbar as a tab, drop it on the docking target in the middle of a pane\.

![\[Dock the window into a tabbed view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/lumberyard-editor-customize-docking-tabs.gif)

**To dock a window or toolbar to the editor window**  
To dock a window or toolbar to the editor window, drop it on the outer docking target\. This creates a new column next to the existing column\.

![\[Dock the window to the editor window and create a new column\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/lumberyard-editor-customize-docking-to-editor-window.gif)

**To undock a window or toolbar**  
To undock a window or toolbar, drag the title bar and move the selection window away\. Avoid the docking targets to prevent from accidentally redocking the window\. To help prevent accidental docking, a brief delay occurs before a docking target becomes active\. You can also undock a window by right\-clicking the title bar and choosing **Undock**\.

![\[Undock the window from the tabbed view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/lumberyard-editor-customize-undocking-tabs.gif)

**To prevent a window from docking**  
To prevent a window from docking, press and hold **Ctrl** while moving the window\.

**To snap windows**  
To snap a window in place, move the window close to a stationary window\. Snapping works on the top, bottom, left, and right borders of the pane\.

## Customizing Toolbars and Menus<a name="lumberyard-editor-customizing-tabs"></a>

You can also give toolbars and menus your own personal touch\.

**To customize preset toolbars or create custom toolbars and menus**

1.  Right\-click the top toolbar and choose **Customize**\.

1. In the **Customize** window, for **Toolbars**, create, rename, and delete any custom toolbars and menus, or reset them to the default settings\.  
![\[Toolbars tab in the Customize window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/editor-customizing-toolbars.png)

1. In the **Commands** tab, drag and drop menu commands to any menu category\.  
![\[Commands tab in the Customize window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/editor-customizing-commands.png)

## Changing Preferences<a name="lumberyard-editor-customizing-preferences"></a>

You can change the default settings to customize the look and functionality of the editor\.

**To customize the look and features of Lumberyard Editor**
+ In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Global Preferences**\.  
![\[General Settings tab in the Preferences window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/editor-preferences.png)

### General Settings<a name="lumberyard-editor-customizing-preferences-general"></a>

You can change the general Lumberyard Editor settings and file settings\.


**General Settings**  

| Parameter | Description | 
| --- | --- | 
| Show Geometry Preview Panel |  Displays a preview window for the selected object\.  | 
| Hide objects by config spec |  Hides objects as determined by the minimal specifications and configuration specifications\.  | 
| Enable Source Control |  Enables Perforce version control\.  | 
| External Layers: Save only Modified |  Saves only the modified external layers\.  | 
| Freeze Read\-only external layer on Load |  Freezes the read\-only external layers when loading the level\.  | 
| Frozen layers are selectable |  Allows objects in frozen layers to be selected\.  | 
| Console Background |  Changes the background color for the console\.  | 
| Auto\-load last level at startup |  Loads the level that was last loaded\.  | 
| Show Time in Console |  Displays the time in the console window\.  | 
| Toolbar Icon Size |  Adjusts the toolbar icon size\.  Default: `16` \(32 pixels\)\.  | 
| Stylus Mode |  Enables stylus mode for tablets and other pointing devices\.  | 
|  **Enable UI 2\.0 \(EXPERIMENTAL\)**  |  Enables the updated user interface \(UI\) in Lumberyard Editor\.  | 
|  **Enable Scene Inspector \(EXPERIMENTAL\)**  | Enables the option to inspect scenes in files such as \.fbx files\. | 
|  **Restore Viewport Camera on Game Mode Exit**  |  Returns the camera to the original transform when you exit gameplay mode\.  | 
|  **Enable Legacy UI \(DEPRECATED\)**  |  Enable the legacy user interface \(UI\) in Lumberyard Editor\.  | 
|  **Enable New Viewport Interaction Model \(EXPERIMENTAL\)**  |  Replaces the old interaction model in the viewport\. For more information, see [Working with the Viewport Interaction Model](working-with-viewport-interaction-model.md)\.  | 


**Messaging**  

| Parameter | Description | 
| --- | --- | 
| Show Welcome to Lumberyard at startup |  Displays the **Welcome to Lumberyard** dialog box at startup\.  | 
|  **Show Error: Circular dependency**  |  Shows an error message when adding a slice instance to a target would create cyclic asset dependency\. All other overrides to slices will be saved\.  | 


**Undo**  

| Parameter | Description | 
| --- | --- | 
| Undo Levels |  Specifies the maximum number of times you can undo a level\.  Default: `50`  | 
|  **Undo Slice Override Saves**  | Allows you to undo override saves to slices\.  | 


**Selection**  

| Parameter | Description | 
| --- | --- | 
|  **Deep selection range**  |  | 
|  **Stick duplicate to cursor**  |  | 


**Vertex Snapping**  

| Parameter | Description | 
| --- | --- | 
| Vertex Cube Size |  Adjusts the vertex cube size\.  | 
|  **Render Penetrated Boundboxes**  |  Renders penetrated bound boxes\.  | 


**Metrics**  

| Parameter | Description | 
| --- | --- | 
| Enable Metrics Tracking |  Enables metrics tracking\.  | 


**Slices**  

| Parameter | Description | 
| --- | --- | 
|  **New Slices Dynamic By Default**  | When you create a slice, the slice is set to dynamic\. | 


**Files**  

| Parameter | Description | 
| --- | --- | 
| Append numeric value to slices |  Automatically adds a number to the slice file name\. For example, if you create a slice from an entity named *NewSlice*, the slice will be named `NewSlice001.slice`\.  For more information, see [Creating a Slice](component-slices-creating.md)\.  | 
| Backup on Save |  Creates a backup file when you save\.  | 
| Maximum Save Backups |  Specifies the maximum number of saved backups\.  | 
| Standard Temporary Directory |  Specifies the default temporary directory to use\. Default = `[root]\Temp`  | 
| Auto Save Camera Tag Points |  Saves the modified camera tag points\.  | 
| Scripts Editor |  Specifies the text editor to use for scripts\.  | 
| Shaders Editor |  Specifies the text editor to use for shaders\.  | 
| BSpace Editor |  Specifies the text editor to use for blend spaces\.  | 
| Texture Editor |  Specifies the program to use for textures\.  | 
| Animation Editor |  Specifies the program to use for animations\.  | 
| Enable |  Enables auto backup\.  | 
| Time Interval |  Specifies the frequency of auto backup \(in minutes\)\.  | 
| Maximum Backups |  Specifies the maximum number of auto backups\.  | 
| Remind Time |  Specifies the frequency of auto backup reminders \(in minutes\)\.  | 

### Viewport<a name="lumberyard-editor-customizing-preferences-viewports"></a>

You can change the default settings for the viewport\.


**General**  

| Parameter | Description | 
| --- | --- | 
| Synchronize 2D Viewports |  Enables synchronization of 2D viewports to move and correspond with each other\.  | 
| Perspective View FOV |  Specifies the field of vision for the viewport\.  | 
| Perspective View Aspect Ratio |  Specifies the length of the aspect ratio for the viewport, where height = `1`\.  | 
| Enable Right\-Click Context Menu |  Enables the context menu that appears when you right\-click in the viewport\.  | 
| Show 4:3 Aspect Ratio Frame |  Displays a 4:3 aspect ratio frame to show what is visible in game mode\.  | 
| Highlight Selected Geometry |  Highlights the selected geometry\.  | 
| Highlight Selected Vegetation |  Highlights the selected vegetation\.  | 
| Highlight Geometry on Mouse Over |  Highlights geometry on hover over\.  | 
| Hide Cursor when Captured |  Shows or hides the mouse pointer in the viewport\.  | 
| Drag Square Size |  Specifies the size of the drag square to prevent from accidentally moving objects when selecting\.  | 
| Display Object Links |  Displays entity links in the viewport\.  | 
| Display Animation Tracks |  Displays the animation path for any objects in the Track View\. One line = one frame\.  | 
| Always Show Radii |  Displays the area of effect \(radius\) for certain entities\.  | 
| Always Show Prefab Bounds |  Displays the prefab boundary helpers\.  | 
| Always Show Prefab Objects |  Displays the prefab object helpers\.  | 
| Show Bounding Boxes |  Displays a bounding box around each object\.  | 
| Always Draw Entity Labels |  Displays entity names\.  | 
| Always Show Trigger Bounds |  Displays the trigger boundary helpers\.  | 
| Show Object Icons |  Displays object icons\.  | 
| Scale Object Icons with Distance |  Scales object icons relative to distance\.  | 
| Show Helpers of Frozen Objects |  Displays the frozen object helper icons\.  | 
| Fill Selected Shapes |  Highlights the inside area of a selected shape\.  | 
| Show Snapping Grid Guide |  Displays the grid in the viewport\.  | 
| Display Dimension Figures |  Displays the measurement dimensions of selected assets; you must enable helpers\.  | 
| Swap X/Y Axis |  Reverses the x\-axis and y\-axis\.  | 
| Map Texture Resolution |  Specifies the resolution for the displayed map\.  | 
| Enabled |  Displays object names\.  | 
| Distance |  Specifies the visibility distance for text labels\.  | 
| Prefab Bounding Box |  Specifies the color for the prefab bounding box\.  | 
| Group Bounding Box |  Specifies the color for the group bounding box\.  | 
| Entity Bounding Box |  Specifies the color for the entity bounding box\.  | 
| Bounding Box Highlight Alpha |  Specifies the amount of highlight alpha to add to the bounding box\.  | 
| Geometry Color |  Specifies the geometry color\.  | 
| Solid Brush Geometry Color |  Specifies the color of the solid brush geometry\.  | 
| Geometry Highlight Alpha |  Specifies the amount of highlight alpha to add to the geometry\.  | 
| Child Geometry Highlight Alpha |  Specifies the amount of highlight alpha to add to the child geometry\.  | 


**Movement**  

| Parameter | Description | 
| --- | --- | 
| Camera Movement Speed |  Specifies the speed of all movements in the viewport\.  | 
| Camera Rotation Speed |  Specifies the speed of movement while you control the viewport camera\.  | 
| Fast Movement Scale |  Specifies the multiplier for the camera speed; for example, a value of two doubles the movement speed of the camera\.  | 
| Wheel Zoom Speed |  Specifies the speed of the camera zoom when using the mouse wheel\.  | 
| Invert Y Axis |  Inverts the direction that the camera moves on the y\-axis when holding the right button on the mouse and moving the mouse up or down\.  | 
| Invert Pan |  Inverts the direction that the camera moves when holding the middle button on the mouse and moving the mouse left or right\.  | 


**Gizmos**  

| Parameter | Description | 
| --- | --- | 
| Size |  Specifies the size of the xyz\-axes gizmo\.  | 
| Text Labels |  Displays the xyz\-axes labels\.  | 
| Max Count |  Specifies the maximum number of xyz\-axes gizmos that can display onscreen at one time\.  | 
| Helpers Scale |  Specifies the size of onscreen helpers, including AIAnchors, Tagpoints, and CoverSurfaces\.  | 
| Tagpoint Scale Multiplier |  Specifies the scale of the tagpoint helper sphere and the base helper scale value\.  | 
| Ruler Sphere Scale |  Specifies the scale of the locator sphere size when using the **Ruler** tool\.  | 
| Ruler Sphere Transparency |  Specifies the transparency level of the locator sphere when using the **Ruler** tool\.  | 


**Debug**  

| Parameter | Description | 
| --- | --- | 
| Show Mesh Statistics |  Displays the level of detail information, such as tris and verts, for selectable objects\.  | 
| Warning Icons Draw Distance |  Specifies the distance to which to display warning icons in the viewport\.  | 
| Show Scale Warnings |  Displays an icon and warning text for objects that have been scaled\.  | 
| Show Rotation Warnings |  Displays an icon and warning text for objects that have been rotated\.  | 

### Experimental Features<a name="lumberyard-editor-customizing-preferences-experimental-features"></a>

You can change the default settings for experimental features such as total illumination\.


**Lighting Settings**  

| Parameter | Description | 
| --- | --- | 
| Total Illumination |  Enables the total illumination lighting feature  | 