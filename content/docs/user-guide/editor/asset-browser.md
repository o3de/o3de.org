---
linkTitle: Asset Browser
title: Asset Browser
description: Manage your assets with the Asset Browser in Open 3D Engine (O3DE).
weight: 400
---

The **Asset Browser** shows all the assets in your project and engine. You can view and manage assets, switch between different viewing modes, navigate directories, and create search filters.

## Opening Asset Browser

1. In O3DE Editor, choose **Tools**, **Asset Browser**.

1. In the Asset Browser, you can create, rename, delete, duplicate, move, select, open, search, and filter for assets.

   *pic*

   You can select multiple assets by doing the following in the **Asset Browser**:

- Use **Ctrl + Left Mouse Button** to select multiple entities one at a time to be part of a multi-selection.

1. You can open multiple Asset Browser windows by doing one of the following:

- Use **Right Mouse Button** on an asset in any of the views to bring up the **context menu**, choose **Open in another Asset Browser**.
- Using the **Tools Menu**, choose **Open another Asset Browser**.

## Viewing Assets

When viewing assets in the **Asset Browser**, you can switch between **List View**, **Thumbnail View**, and **Table View**.

1. To switch to **List View**, click the **List View Button**.

     *pic*
     
     This is a single column view that is the simplest of the three views. It is a flat, long scrollable list that displays all folders and the assets inside of them.

     *pic*

1. To switch to **Thumbnail View**, click the **Thumbnail View** button**.

    *pic*

    This is a two column view that displays asset thumbnails. The first column is a list that only displays folders for easy directory navigation, and the second column displays thumbnails to quickly view asset previews. In this column, clicking on an asset's toggleable arrow will expand it to show thumbnails of all its children.

    *pic*

1. To switch to **Table View**, click the **Table View** button**.
    
    *pic*

    This is a two column view that displays assets in a table grid. The first column is a list that only displays folders for easy directory navigation, and the second column displays a table grid with more information about your assets. In this column, you can view the **Name**, **Type**, **Disk Size**, **Vertices**, and **Approximate World Size** of an asset.

    *pic*

## Managing Assets

In the **Asset Browser**, you can create, rename, delete, duplicate, move, open, drag and drop assets.

1. You can **create** new assets by doing one of the following in the **Asset Browser**:

- Use **Right Mouse Button** on a folder in any of the views to bring up the **context menu**, choose **Create**.
- Select a folder in the first column of any view and click the **Create New Button (+)**.

1. You can **delete** assets by doing one of the following in the **Asset Browser**:

- Use **Right Mouse Button** on an asset in any of the views to bring up the **context menu**, choose **Delete Asset**. 
- Select an asset in any of the views and use the **Del** keyboard shortcut.

1. You can **rename** assets by doing one of the following in the **Asset Browser**:

- Use **Right Mouse Button** on an asset in any of the views to bring up the **context menu**, choose **Rename Asset**. 
- Select an asset in any of the views and use the **F2** keyboard shortcut.

1. You can **duplicate** assets by doing one of the following in the **Asset Browser**:

- Use **Right Mouse Button** on an asset in any of the views to bring up the **context menu**, choose **Duplicate Asset**. 
- Select an asset in any of the views and use the **Ctrl + D** keyboard shortcut.

1. You can **move** assets by doing one of the following in the **Asset Browser**:

- Use **Right Mouse Button** on an asset in any of the views to bring up the **context menu**, choose **Move To**. 
- Use the drag and drop functionality to drag an asset to the location of your choice.

     *pic*

## Navigating Directories

In the **Asset Browser**, you can navigate directories using the **Breadcrumbs Navigation Bar**, which indicates the currently selected directory.

1. The **Breadcrumbs Navigation Bar** includes several useful features to make navigating directories easier, such as:

- **Previous** and **Foward** navigation arrows that allow you to navigate through previously selected directories.
- Clickable breadcrumbs to navigate through parent directories.
- URL bar that includes the ability to edit, cut, copy, and paste file locations.

     *pic*

## Opening Assets

1. Using the **Asset Browser**, you can open and edit assets by double clicking the **Left Mouse Button** on an asset.

- To open your asset in the editor, drag and drop your asset from the **Asset Browser** into the **Entity Outliner** or **Viewport**.
- To open your asset with an associated application, use **Right Mouse Button** on an asset to bring up the **context menu**, choose **Open with associated application...**
- To view your asset in your operating system's **File Explorer**, use **Right Mouse Button** to bring up the **context menu** and choose **Open in Explorer**.

     *pic*

## Search, Sort and Filter Assets

For projects that have many assets, you can search and filter for the assets that you want. Enter text in the search filter box to find specific assets.

**Search for assets and use type filters**

1. In the **Asset Browser**, enter the name of the asset.

1. To create a filter by **Asset Type**, click the filter icon.

1. Enter the asset type in the search field that appears or scroll and select the asset type that you want. Any asset that has that specified asset type appears in the results.

     The assets that appear are either **Material** assets or **Physics Material** assets.

     *pic*

1. To clear search results, click **Clear**.

**To sort assets**

You can also sort assets so that they appear in the order that you want in the **Asset Browser**.

1. In the **Asset Browser**, use **Right Mouse Click** to bring up the **context menu**, choose **Sort By**

     *pic*

1. Choose the following options:

     - **Sort: Name** - Sort assets by alphabetical name.
     - **Sort: Type** - Sort assets by alphabetical type.
     - **Sort: Last Modified** - Sort assets by time they were last modified.
     - **Sort: Size** - Sort assets by disk size.

**Advanced asset filter options**

1. In the **Asset Browser**, open the **Tools Menu**

- Uncheck **Hide Engine Folders** to display all assets outside of your project.
- Uncheck **Hide Unusable Product Assets** to display assets that are unusable by the editor.

     *pic*
     You can add or remove **Unusable Product Assets** by creating a JSON with a `.setreg` extension, which will use the ![Settings Registry System.](././settings)

     In your new JSON file, use the following JSON path: `/O3DE/AssetBrowser/AssetTypeUuidExcludes`. **Example**

     ```
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
