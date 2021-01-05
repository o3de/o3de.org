---
description: ' Learn the functions of each area of the &asset-processor; interface
  in &ALYlong;. '
slug: asset-pipeline-processor-ui
title: '&asset-processor; Interface'
---
# Asset Processor Interface<a name="asset-pipeline-processor-ui"></a>

The Asset Processor interface provides areas containing detailed information about the assets that it processes\. These areas are shown in the following example\.

![\[The main window of the Lumberyard Asset Processor. The window is annotated with markers that identify the visual components and features described below.\]](/images/userguide/asset_processor/asset-processor-ui.png)



![\[The top of the Lumberyard Asset Processor window after the processing completes. The window displays the total time to scan, analyze, and build. The time is annotated with the identifier "I".\]](/images/userguide/asset_processor/asset-processor-timer.png)



A – Processing status  
Displays asset processing status, the project name, its root location, and the processor port\.

B – Tabs  
Displays scoped views of Asset Processor functionality\. Tabs are described in detail in the following sections\.

C – Asset Status  
Displays the asset status and details about the source asset in a sortable table\.

D – Asset status search with filter  
Filters your search by keyword, regular expressions, or status\.

E – Event log details  
Provides additional information for the selected row in the asset status table\.

F – Event log details filter  
Filters by warnings and errors\.

G – Context details  
When enabled, shows specific debugging information for the asset\. This setting is disabled by default\.

H – Event log line details table  
Displays debugging values set in the program for the selected line in the **Event log details**\. These values are emitted during processing\.

I – Asset processing timer  
 After asset processing completes, displays information about the time that it took to perform scans, analyze assets, and produce a build\. 

## Jobs<a name="jobs-tab"></a>

 The **Jobs** tab displays information about the current state of asset processor jobs\. This includes information on the state of jobs, events that occurred during processing, and detailed logging information from the asset processor\. 

### Asset Status<a name="asset-status-table"></a>

The **Asset Status** table displays the status of assets that Lumberyard is processing\. Select a row to display contextual asset processing information in the **Event Log Details** table\.

The columns in the **Asset Status** table display the following information about each asset:
+ **Source** – Asset's file name and location
+ **Completed** – Timestamp of the process completion
+ **Platform** – Game platform
+ **Job Key** – Specific job process

![\[The Asset Status table displays specific information about assets in each column.\]](/images/userguide/asset_processor/asset-status-table.png)

#### Status Column<a name="status-column"></a>

In the **Status** column, you can sort by status types\.

The column headers display the following information about each asset:
+ **Completed ** – Completely processed and converted for use in the game
+ **Failed** – Failed and needs investigation and debugging
+ **In Process** – Currently processing and will display **Completed** or **Failed** when complete
+ **Pending** – Awaiting processing

#### Filtering by Keyword and Status<a name="keyword-status-filtering"></a>

In the filter box, you can filter the table view by entering keywords and regular expressions\. The regular expressions are standard `std::regex` in extended format\. The standard `std::regex` rules apply\.

**Example**  
A regular expression \(regex\) to search for all files ending with `.png`:  

```
*.png
```
The asterisk \(\*\) indicates any character 0 or more times\.

**Example**  
A regex to search for any files under a `Slices` subdirectory:  

```
/Slices/.+
```
The dot plus \(\.\+\) indicates any character 1 or more times\.

To view all assets with a particular status, do one of the following:
+ Type the status keyword \(for example, "failed"\)\.
+ Click the filter icon and select the status types that you want to see\.

Filters that you apply remain active until you remove them\. You can either clear the status type box, or click the X next to the filter's label\.

![\[Filter the Asset Status table using keywords or regular expressions. Remove filters by clearing the status type box or removing the label.\]](/images/userguide/asset_processor/keyword-status-filtering.png)

#### Using a Row's Context Menu<a name="row-asset-context-menu"></a>

You can perform actions on each row in the **Asset Status** table\. Right\-click on the row to expose a context menu with the following actions:

**Show in Asset Browser**  
Highlights the asset in the Editor's Asset Browser\. The Editor must be open and running\.

**Open in Explorer**  
Opens the asset in Windows Explorer\.

**Copy**  
Copies the asset name\.

**Open log file**  
Opens the most recent log file for the asset, if one has been made\. File copies and other simple asset processing steps don't generate logs\.

**Open folder with log file**  
Opens the directory with the log file for the asset\.

![\[Right-click on a row to expose the context menu in the Asset Table.\]](/images/userguide/asset_processor/row-asset-context-menu.png)

### Event Log Details<a name="event-log-details-table"></a>

In the **Event Log Details** table, you can view asset processing information for an asset that you select in the **Asset Status** table\. This table provides an activity log that shows how the asset was processed and any errors or warnings generated during processing\.

The **Status** column displays icons for the following message types:

**![\[Information icon in Status table.\]](/images/userguide/asset_processor/event-log-details-information.png)Information**  
Additional supporting messages are available about the processing of the asset\.

**![\[Warning icon in Status table.\]](/images/userguide/asset_processor/event-log-details-warning.png) Warning**  
See the **Message** column for information about a potential processing issue for this asset\.

**![\[Error icon in Status table.\]](/images/userguide/asset_processor/event-log-details-error.png) Error**  
The location of the asset and the specific error generated by attempting to process that asset\.

The **Source** column indicates the subsystem that generated the message \(such as **AssetBuilder**\) or a generic type, such as **Warning** or **Error**\.

The **Message** column displays information related to the processing details of the selected asset\.

**Note**  
The **Message** column occasionally prefixes **Errors** with **E:** and warnings with **W:**\.

![\[Event log details table.\]](/images/userguide/asset_processor/event-log-details-table.png)

The **Event Log Details** table also features a context menu to perform copy actions\. You can copy the following to the clipboard:
+ **Copy Line** – Selected line of the log
+ **Copy Line With Details** – Selected line and any related details that appear in the **Event log line details** table
+ **Copy All** – All log lines and any hidden details for each item

![\[Event log details table context menu actions.\]](/images/userguide/asset_processor/event-log-details-context.png)

#### Event Log Line Details<a name="event-log-line-details"></a>

The **Event Log Line Details** table displays when you enable the **Context Details** option\. This table displays any additional information about the selected line in the **Event Log Details** table\. These details and additional information is generally useful only when debugging issues with a particular asset\.

![\[Event Log Line Details table with Context Details enabled.\]](/images/userguide/asset_processor/event-log-details-context-on.png)

The **Event Log Line Details** table also features a context menu to perform copy actions\. You can copy the following to the clipboard:
+ **Copy Selected Key** – Text in the **Key** column of the selected row
+ **Copy Selected Value** – Text in the **Value** column of the selected row
+ **Copy All Values** – All keys and values in the table

![\[Event Log Line Details table context menu.\]](/images/userguide/asset_processor/event-log-line-details-context.png)

## Assets<a name="assets-tab"></a>

 The **Assets** tab displays information about the assets associated with your active project\. The data you get includes things like the name of the asset, what files are produced by the resource compiler, and dependencies\. In addition to seeing information on source assets, you can also look through generated assets and try to locate missing dependencies\. 

### Source assets<a name="assets-tab-source"></a>

 Using the **Source Assets** view of the **Assets** tab shows you the assets picked up during asset processing and lets you investigate their dependencies, products, associated jobs, and force asset rebuilds\. 

![\[The Asset Processor with the Assets tab selected, and the Source Assets view visible. The view is annotated with red markers calling out each individual section.\]](/images/userguide/asset_processor/assets-source.png)

A – Search bar  
 Search for assets\. The search bar is visible in both the Source Assets and Product Assets views\. The search will match partial file names and supports regular expressions\. Search bar functionality is the same between **Source Assets** and **Product Assets** views\. 

B – Source asset list  
 The list of all source assets which match the current search filter\. When the search is empty, shows all of the source assets used by the project\. 

C – Asset information  
 Detailed information about the asset currently selected in the asset list\. This includes the name of the asset, the containing folder on the filesystem, and the GUID associated with the asset in the Lumberyard asset system\. 

D – Products  
 The compiled asset products that are produced from the source asset\. Selecting the popout icon \( ![\[The popout icon, a white box containing an arrow originating at the lower left and pointing towards the upper right.\]](/images/userguide/asset_processor/popout-icon.png) \) next to a product name takes you to that asset within the **Product Assets** view\. 

E – Outgoing source dependencies  
 The list of source assets which require an output from this source asset to process\. See [Why define product dependencies?](asset-bundler-overview.md#why-use-product-dependencies) for more information on product dependencies\. 

F – Incoming source dependencies  
 The list of source assets which must have their jobs completed before the processing of this asset\. See [Why define product dependencies?](asset-bundler-overview.md#why-use-product-dependencies) for more information on product dependencies\. 

### Product assets<a name="assets-tab-product"></a>

![\[The Asset Processor with the Assets tab selected, and the Product Assets view visible. The view is annotated with red markers calling out each individual section.\]](/images/userguide/asset_processor/assets-product.png)

A – Product asset list  
 The list of all product assets which match the current search filter\. When the search is empty, shows all of the available products\. 

B – Asset information  
 The information for the product asset\. Includes the asset GUID, the last time the product was generated, which type of job generated the asset, which platform the asset was producted for, and which source asset is the primary input for the product\. 

C – Outgoing product dependencies  
 The list of product assets which depend on this product\. In order for your project to function and be distributed properly, all of these assets need to be in the final bundle\. See [Why define product dependencies?](asset-bundler-overview.md#why-use-product-dependencies) for more information on product dependencies\. 

D – Outgoing unmet path product dependencies  
 The list of product assets which are hardcoded paths to be loaded by the Lumberyard runtime that this asset depends upon\. Because these products aren't necessarily generated by the asset processor, they're placed into a separate category of dependencies\. See [Hardcoded File Loads](asset-bundler-assets-resolving.md#asset-bundler-assets-resolving-hardcoded-file-loads) for information on resolving path product dependency issues\. 

E – Incoming product dependencies  
 The list of product assets which this product depends on\. In order for your project to function and be distributed properly, all of these assets need to be in the final bundle\. See [Why define product dependencies?](asset-bundler-overview.md#why-use-product-dependencies) for more information on product dependencies\. 

F – Missing dependency scanner  
 Run the missing dependency scanner from inside the Asset Processor\. See [Using the Missing Dependency Scanner](asset-bundler-missing-dependency-scanner.md) for more information\. 

## Logs<a name="logs-tab"></a>

The **Logs** tab displays events for the internal operation of the Asset Processor\. This area doesn't display logs for the processing of individual assets\. The information in these logs is helpful for troubleshooting the Asset Processor if an issue occurs\. 

![\[Logs tab in Asset Processor.\]](/images/userguide/asset_processor/logs.png)

Right\-click to access the **Logs** context menu\.

![\[Logs tab context menu in Asset Processor.\]](/images/userguide/asset_processor/logs-context.png)

## Shaders<a name="shaders-tab"></a>

The **Shaders** tab displays a table with information related to shader compiler proxies\. Shader failures appear in this table\. For more information, see [Shader Compiler Proxy](asset-pipeline-shader-compiler.md)\.

## Connections<a name="connections-tab"></a>

The **Connections** tab displays devices and programs that the Asset Processor is connected to and the platform they are running on\. You can add approved connections in the **White Listed Connections** box and disapproved connections in **Rejected Connections**\.

In the **Active Connections** table's **Enabled** column, automatic connections are labeled as **Auto**\. This means that it's a connection that the Asset Processor created\. One example of such a connection is Asset Builder connections\. User\-created connections show a check box\. If you select the check box, the Asset Processor continually attempts to reconnect to those connections\. You can use these custom connections for specialized cases, such as when connecting to mobile devices outside of a company's internal network\.

![\[Connections tab in the Asset Processor.\]](/images/userguide/asset_processor/connections-tab.png)

You can edit or remove a user\-created connection, or add a connection\.

![\[Edit a user-created connection in Asset Processor.\]](/images/userguide/asset_processor/edit-connection.png)

## Tools<a name="tools-tab"></a>

On the **Tools** tab, you control how your assets are scanned\. Use **Faster Scanning Mode** when you don't need to perform a full asset scan\. For more information, see [Enabling Asset Processor's Faster Scanning Mode](asset-processor-faster-scanning.md)\.

![\[Tools tab in Asset Processor.\]](/images/userguide/asset_processor/faster-scanning.png)