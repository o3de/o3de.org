# Asset Browser<a name="asset-browser-intro"></a>

The **Asset Browser** displays all project assets in a source folder and file view to enable quick access and interaction\. You can use the **Asset Browser** with other editor components to improve your development workflow, such as the viewport and the **Entity Inspector**\.

The **Asset Browser** shows all files inside your watch folders that are specified in the `lumberyard_version\dev\AssetProcessorPlatformConfig.ini` file\. In the **Asset Browser**, usable files appear white\. Non\-usable files such as `.exe` or `.zip` appear gray\.

**To open the Asset Browser**

1. From Lumberyard Editor, choose **Tools**, **Asset Browser**\.   
![\[Search and view assets in your game project with the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_browser_preview.png)

1. Dock the **Asset Browser** window in Lumberyard Editor as needed\.

The **Asset Browser** displays source assets along with their products\. For example, an `.fbx` file appears with its meshes and animations\. However, if the source and product asset have the same name and extension, then the products are hidden to save space\.

**Example**  
The `WombearActor.fbx` file has two products, an actor and mesh\.   

![\[A WombearActor.fbx source file with two products.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-1.png)

Files that are unprocessed or not usable in Lumberyard Editor appear gray\.

![\[Ignored or unprocessed files are grayed out in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-grayed-out-files.png)

With the **Asset Browser**, you can do the following:

**Contents**
+ [Drag and Drop](#asset-browser-intro-drag-drop)
+ [Context Menu Operations](#asset-browser-intro-right-click-context)
+ [Finding a Slice in the Asset Browser from the Viewport](#asset-browser-intro-viewport)
+ [Filtering](#asset-browser-intro-filtering)

## Drag and Drop<a name="asset-browser-intro-drag-drop"></a>

You can drag assets from the **Asset Browser** into the viewport or the **Entity Inspector**\. 

When you drag an asset from the **Asset Browser** into the viewport, Lumberyard Editor does the following:
+ Creates a new entity at the cursor's location\.
+ Adds the associated component, which is indicated by the icon next to the asset in the **Asset Browser**\.
+ Assigns the asset for that component's property\.

**Example**  
You can drag the `brokenrobot05.cgf` file to the viewport, which creates a new entity, adds a **[Mesh](component-static-mesh.md)** component, and assigns the asset into the **Mesh asset** property in the **Entity Inspector**\.  

![\[Dragging an asset from the Asset Browser into the viewport automatically creates an entity and assigns a Mesh asset.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-2.png)

**Example**  
You can select multiple entities in the **Entity Outliner** and then select and drag an asset into the **Entity Inspector**\. This adds the **Mesh** component and the associated mesh asset to the selected entities\.  

![\[Animation showing a boulder mesh asset dragged into the Entity Inspector while three empty entities are selected in the Entity Outliner. Three boulders appear in the viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-4.gif)

You can also drag the appropriate file type into a component property's field\. 

**Example**  
You can drag an asset file \(`.cfg`\) into the **Material asset** field on the **Mesh** component\. The boulder in the viewport displays the new asset\.  

![\[Animation showing a material dragged from the Asset Browser into the Entity Inspector. The material is dropped onto the Mesh component's Material override field.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-3.gif)

## Context Menu Operations<a name="asset-browser-intro-right-click-context"></a>

In the **Asset Browser**, right\-click an asset to display a context menu\. The following menu options appear:
+ **Open with associated application** – Opens the file with the default application that you specify\. For example, if you specified Photoshop to open `.tiff` files, this opens the file in Photoshop\.
+ **Open in Explorer** – Opens the asset in Windows Explorer\.
+ **Copy Name To Clipboard** – Copies the asset name\.
+ **Copy Path To Clipboard** – Copies the path of the asset\.
+ **Edit Texture Settings** – Opens the asset in the Texture Settings Editor\. For more information, see [Texture Settings Editor](texture-settings-editor.md)\.

**Note**  
You can also open some files in their respective Lumberyard tool, such as the **Lua Editor** for `.lua` files\.  

![\[Right-click context menu for assets in the Asset Browser\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-right-click-context.png)

**FBX Files**  
Some files, such as `.fbx` files, have an additional **Edit Settings** option, which opens the **FBX Settings** tool\. For more information, see [Working with the FBX Settings Tool](char-fbx-importer.md)\.

![\[Right-click context menu for an .fbx file in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-right-click-context-fbx-tool.png)

**Slices**  
The following additional options appear for slices:
+ **Set Dynamic Slice** – Create a runtime version of a slice\. For more information, see [Working with Dynamic Slices](dynamic-slices-what-is.md)\.
+ **Unset Dynamic Slice** – Remove a dynamic slice\.
+ **Open in Slice Relationship View** – Show the dependencies and dependent members of the slice in a hierarchical view\.  
**Example**  

  The following image shows the **Slice Relationship View** for the **Maze\_Decor\_Interior** slice from the Starter Game\. For more information, see [Working with Slices](component-slices.md)\.  
![\[Slice Relationship View dialog box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/slice-relationship-view.png)

**Source Control**  
If source control is enabled, the following additional options appear:
+ **Check Out** – Check out the file in source control\.
+ **Undo Check Out** – Undo check out for the file\.
+ **Get Latest Version** – Get the latest version of the file\.
+ **Add To Source Control** – Add the file to source control\.  
![\[Right-click context menu in the Asset Browser with source control enabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-right-click-context-1.png)

## Finding a Slice in the Asset Browser from the Viewport<a name="asset-browser-intro-viewport"></a>

In the viewport, right\-click the slice or slice entity and choose **Find slice in Asset Browser**\. The **Asset Browser** navigates to the corresponding slice\.

![\[Right-click the context menu in the viewport to locate a slice in the Asset Browser .\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-viewport.png)

## Filtering<a name="asset-browser-intro-filtering"></a>

You can filter what appears in the **Asset Browser** by file name, asset type, or both\.

**To filter your assets**

1. In the **Asset Browser**, choose the filter icon in the upper right\.

1. Select one or more asset types\.  
![\[Filter assets by type in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-filter-by-types.png)

1. To filter by file name, type search terms into the search bar\. 

   The filtering process is dynamic, which means that search results update as you type\.  
![\[Type search terms into the Asset Browser's search bar.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset-browser-intro-filtering-1.png)

1. To reset your selection, in the **Filter by** drop\-down menu, click **Reset** or **Clear**\.

The search function also has the following features:
+ Recognizes multiple words and performs an `and` search on assets and directories that contain all of the search terms in any order\.
+ Is not case sensitive\.
+ Displays product assets that match the search string\.
+ Displays source assets that match the search string and contain at least one valid product\.
+ Displays directories that match the search string and contain at least one valid product\. All products in each displayed directory and its subdirectories are displayed\.