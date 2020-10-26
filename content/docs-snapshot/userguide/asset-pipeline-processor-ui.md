# Asset Processor Interface<a name="asset-pipeline-processor-ui"></a>

The Asset Processor interface provides areas containing detailed information about the assets that it processes\. These areas are shown in the following example\.

![\[The main window of the Lumberyard Asset Processor. The window is annotated with markers that identify the visual components and features described below.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/asset-processor-ui.png)

![\[The top of the Lumberyard Asset Processor window after the processing completes. The window displays the total time to scan, analyze, and build. The time is annotated with the identifier "I".\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/asset-processor-timer.png)

A – Processing status  
Displays asset processing status, the project name, its root location, and the processor port\.

B – Tabs  
Displays scoped views of Asset Processor functionality\. **Assets** is the default tab\. You can also choose **Shaders**, **Connections**, **Logs**, and **Tools**\. These tabs are described in detail in the following section\.

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

The following sections describe these areas and the additional tabs in more detail\.

## Asset Status<a name="asset-status-table"></a>

The **Asset Status** table displays the status of assets that Lumberyard is processing\. Select a row to display contextual asset processing information in the **Event Log Details** table\.

The columns in the **Asset Status** table display the following information about each asset:
+ **Source** – Asset's file name and location
+ **Completed** – Timestamp of the process completion
+ **Platform** – Game platform
+ **Job Key** – Specific job process

![\[The Asset Status table displays specific information about assets in each column.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/asset-status-table.png)

### Status Column<a name="status-column"></a>

In the **Status** column, you can sort by status types\.

The column headers display the following information about each asset:
+ **Completed ** – Completely processed and converted for use in the game
+ **Failed** – Failed and needs investigation and debugging
+ **In Process** – Currently processing and will display **Completed** or **Failed** when complete
+ **Pending** – Awaiting processing

### Filtering by Keyword and Status<a name="keyword-status-filtering"></a>

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

![\[Filter the Asset Status table using keywords or regular expressions. Remove filters by clearing the status type box or removing the label.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/keyword-status-filtering.png)

### Using a Row's Context Menu<a name="row-asset-context-menu"></a>

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

![\[Right-click on a row to expose the context menu in the Asset Table.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/row-asset-context-menu.png)

## Event Log Details<a name="event-log-details-table"></a>

In the **Event Log Details** table, you can view asset processing information for an asset that you select in the **Asset Status** table\. This table provides an activity log that shows how the asset was processed and any errors or warnings generated during processing\.

The **Status** column displays icons for the following message types:

**![\[Information icon in Status table.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-details-information.png)Information**  
Additional supporting messages are available about the processing of the asset\.

**![\[Warning icon in Status table.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-details-warning.png) Warning**  
See the **Message** column for information about a potential processing issue for this asset\.

**![\[Error icon in Status table.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-details-error.png) Error**  
The location of the asset and the specific error generated by attempting to process that asset\.

The **Source** column indicates the subsystem that generated the message \(such as **AssetBuilder**\) or a generic type, such as **Warning** or **Error**\.

The **Message** column displays information related to the processing details of the selected asset\.

**Note**  
The **Message** column occasionally prefixes **Errors** with **E:** and warnings with **W:**\.

![\[Event log details table.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-details-table.png)

The **Event Log Details** table also features a context menu to perform copy actions\. You can copy the following to the clipboard:
+ **Copy Line** – Selected line of the log
+ **Copy Line With Details** – Selected line and any related details that appear in the **Event log line details** table
+ **Copy All** – All log lines and any hidden details for each item

![\[Event log details table context menu actions.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-details-context.png)

### Event Log Line Details<a name="event-log-line-details"></a>

The **Event Log Line Details** table displays when you enable the **Context Details** option\. This table displays any additional information about the selected line in the **Event Log Details** table\. These details and additional information is generally useful only when debugging issues with a particular asset\.

![\[Event Log Line Details table with Context Details enabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-details-context-on.png)

The **Event Log Line Details** table also features a context menu to perform copy actions\. You can copy the following to the clipboard:
+ **Copy Selected Key** – Text in the **Key** column of the selected row
+ **Copy Selected Value** – Text in the **Value** column of the selected row
+ **Copy All Values** – All keys and values in the table

![\[Event Log Line Details table context menu.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/event-log-line-details-context.png)

## Shaders<a name="shaders-tab"></a>

The **Shaders** tab displays a table with information related to shader compiler proxies\. Shader failures appear in this table\. For more information, see [Shader Compiler Proxy](asset-pipeline-shader-compiler.md)\.

## Connections<a name="connections-tab"></a>

The **Connections** tab displays devices and programs that the Asset Processor is connected to and the platform they are running on\. You can add approved connections in the **White Listed Connections** box and disapproved connections in **Rejected Connections**\.

In the **Active Connections** table's **Enabled** column, automatic connections are labeled as **Auto**\. This means that it's a connection that the Asset Processor created\. One example of such a connection is Asset Builder connections\. User\-created connections show a check box\. If you select the check box, the Asset Processor continually attempts to reconnect to those connections\. You can use these custom connections for specialized cases, such as when connecting to mobile devices outside of a company's internal network\.

![\[Connections tab in the Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/connections-tab.png)

You can edit or remove a user\-created connection, or add a connection\.

![\[Edit a user-created connection in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/edit-connection.png)

## Logs<a name="logs-tab"></a>

The **Logs** tab displays events for the internal operation of the Asset Processor\. This area doesn't display logs for the processing of individual assets\. The information in these logs is helpful for troubleshooting the Asset Processor if an issue occurs\. 

![\[Logs tab in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/logs.png)

Right\-click to access the **Logs** context menu\.

![\[Logs tab context menu in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/logs-context.png)

## Tools<a name="tools-tab"></a>

On the **Tools** tab, you control how your assets are scanned\. Use **Faster Scanning Mode** when you don't need to perform a full asset scan\. For more information, see [Enabling Asset Processor's Faster Scanning Mode](asset-processor-faster-scanning.md)\.

![\[Tools tab in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/faster-scanning.png)