---
linkTitle: Asset Browser
title: Asset Browser
description: Manage your assets with the Asset Browser in Open 3D Engine (O3DE).
weight: 400
---

The **Asset Browser** shows all the assets in Open 3D Engine (O3DE) and your O3DE project. You can view and manage assets, switch between different viewing modes, navigate directories, and create search filters.

## Opening Asset Browser

1. In [O3DE Editor](/docs/user-guide/editor/), choose **Tools** > **Asset Browser**.

1. In the Asset Browser, you can create, rename, delete, duplicate, move, select, open, search, and filter for assets.

     ![Asset Browser startup view.](/images/user-guide/assetbrowser/asset-browser-welcome.png)

    - To select multiple assets, press **Ctrl+LMB** on one asset at a time to be part of a multi-selection.

    - To open multiple **Asset Browser windows**, **right-click** on an asset to bring up the context menu, and choose **Open in another Asset Browser**.

## Viewing assets

When viewing assets in the **Asset Browser**, you can switch between *list*, *thumbnail*, and *table* view.

### List view

To switch to list view, click the **List View** button.

![Asset Browser List View Button.](/images/user-guide/assetbrowser/list-view-button.png)

This is a single column view that is the simplest of the three views. It is a flat, long scrollable list that displays all assets.

![Asset Browser List View.](/images/user-guide/assetbrowser/list-view.png)

### Thumbnail view

To switch to thumbnail view, click the **Thumbnail View** button.

![Asset Browser Thumbnail View Button.](/images/user-guide/assetbrowser/thumbnail-view-button.png)

This is a two column view that displays asset thumbnails. The first column is a list that only displays folders for easy directory navigation, and the second column displays thumbnails to quickly view asset previews. Click on an asset's toggle arrow to expand it and show its children.

![Asset Browser Thumbnail View.](/images/user-guide/assetbrowser/thumbnail-view.png)

### Table view

To switch to table view, click the **Table View** button.
    
![Asset Browser Table View Button.](/images/user-guide/assetbrowser/table-view-button.png)

This is a two column view that displays assets in a table grid. The first column is a list that only displays folders for easy directory navigation, and the second column displays a table grid with more information about your assets. In this column, you can view the **Name**, **Type**, **Disk Size**, **Vertices**, and **Approximate World Size** of an asset.

![Asset Browser Table View.](/images/user-guide/assetbrowser/table-view.png)

## Managing assets

In the Asset Browser, you can create, rename, delete, duplicate, move, open, and drag-and-drop assets. These actions are available in all Asset Browser views.

### Creating assets
Create new assets by doing one of the following:

- **Right-click** a folder to open the context menu, and choose **Create**.

- Select a folder in the first column, and click the **Create New (+)** button.

![Asset Browser Folder Management.](/images/user-guide/assetbrowser/folder-context-menu.png)

### Deleting assets

Delete assets by doing one of the following:

- **Right-click** on an asset to bring up the context menu, and choose **Delete Asset**. 
- Select an asset and press **Delete**.

### Renaming assets

Rename assets by doing one of the following:

- **Right-click** on an asset to bring up the context menu, and choose **Rename Asset**. 
- Select an asset and press **F2**.

### Duplicating assets

Duplicate assets by doing one of the following:

- **Right-click** on an asset to bring up the context menu, and choose **Duplicate Asset**. 
- Select an asset and press **Ctrl+D**.

### Moving assets
Move assets by doing one of the following:

- **Right-click** on an asset to bring up the context menu, and choose **Move To**. 
- **Drag-and-drop** an asset to the location of your choice.

![Asset Browser Asset Management.](/images/user-guide/assetbrowser/asset-management.png)

## Navigating directories

In the Asset Browser, you can navigate directories using the *breadcrumbs navigation bar*, which indicates the currently selected directory.

The breadcrumbs navigation bar includes the following useful features:

- Previous {{< icon "arrow_left-default.svg" >}} and foward {{< icon "arrow_right-default.svg" >}} navigation arrows to navigate through recently selected directories.
- Breadcrumbs to navigate through parent directories.

    ![Asset Browser Click Navigate.](/images/user-guide/assetbrowser/breadcrumbs-click-navigate.png)

- An address bar to specify file locations

    ![Asset Browser Edit.](/images/user-guide/assetbrowser/breadcrumbs-edit.png)

## Opening Assets

In the Asset Browser, you can open and edit assets by **double-clicking** on an asset.

- To open your asset in the editor, **drag-and-drop** your asset from the Asset Browser into the [Entity Outliner](/docs/user-guide/editor/entity-outliner/) or [Viewport](/docs/user-guide/editor/viewport/).
- To open your asset with an associated application, **right-click** on an asset to open the context menu, and choose **Open with associated application...**.
- To view your asset in File Explorer, **right-click** to open the context menu, and choose **Open in Explorer**.

## Searching and filtering assets

For projects that have many assets, it's useful to search and filter for the assets that you want. Enter text in the search filter box to find specific assets.

### Search field and type filters

To search and filter assets in the Asset Browser, do one of the following:
- Enter the name of the asset in the search field.

- Filter by **Asset Type** by clicking the filter icon and doing one of the following:

  - Enter the asset type in the filter's search field 
  - Scroll through the filter options and select the asset type that you want. 
  
  Any asset of the selected asset type appears in the results.

- Clear search results, by choosing **Clear**.

In the following example image, either **Material** or **Physics Material** assets appear.

![Asset Browser Asset Type Filter.](/images/user-guide/assetbrowser/asset-type-filter.png)

### Advanced asset filter options

1. In the **Asset Browser**, open the **Asset Browser Menu**

    ![Asset Browser Advanced Filter Options.](/images/user-guide/assetbrowser/advanced-filter-options.png)

2. Use the following options as needed:

   - Disable **Hide Engine Folders** to display assets that are not inside of your project folder.
     
        This must be disabled to view any external directories that you may have added, including **Asset Gems**.

   - Disable **Hide Unusable Product Assets** to display assets that the Editor cannot use.

        You can add or remove **Unusable Product Assets** using the  [Settings Registry System](/docs/user-guide/settings) by creating a JSON with a `.setreg` extension.

        In your new JSON file, specify the desired **Product Asset** along with its **UUID**, and use the following JSON path: `/O3DE/AssetBrowser/AssetTypeUuidExcludes`. 
        
        **Example**

        ```json
        {
        "O3DE": {
            "AssetBrowser": {
                "AssetTypeUuidExcludes": {
                    "AzslOutcomeAsset":  "{6977AEB1-17AD-4992-957B-23BB2E85B18B}",
                    "ModelLodAsset": "{65B5A801-B9B9-4160-9CB4-D40DAA50B15C}",
                    "ImageMipChainAsset": "{CB403C8A-6982-4C9F-8090-78C9C36FBEDB}", 
                    "BufferAsset": "{F6C5EA8A-1DB3-456E-B970-B6E2AB262AED}", 
                    "ShaderVariantAsset": "{51BED815-36D8-410E-90F0-1FA9FF765FBA}"
                                        }
                            }
                }
        }
        ```
