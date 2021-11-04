---
linktitle: Creating Script Events
title: Creating Script Events in Open 3D Engine
description: Learn how to create script events in Open 3D Engine (O3DE).
weight: 100
---

Create script events using the **Asset Editor** tool in **O3DE Editor**.

**To create a script event**

1. In O3DE Editor, choose **Tools**, **Asset Editor**.

    ![Choose Tools, Asset Editor.](/images/user-guide/scripting/script-events/creating-1.png)

1. In the **Asset Editor**, choose **File**, **New**, **Script Events**.

    ![Choose File, New, Script Events in the Asset Editor.](/images/user-guide/scripting/script-events/creating-2.png)

1. In the **Asset Editor**, enter the information that defines the script event. For a description of each field, see the [Script event properties](#script-event-properties) tables that follow.

    ![Creating a script event in the Asset Editor.](/images/user-guide/scripting/script-events/creating-3.png)

1. Choose **File**, **Save**, or press **Ctrl+S**.

1. In the **Save As** dialog box, enter a file name for your `.scriptevents` file, and click **Save**.

    {{< note >}}
To ensure that the script event asset saved correctly, check the bottom of the Asset Editor for the "<_`file_name`_>`.scriptevents` - Asset loaded!" message. If you see the error message Failed to save asset due to validation error, check the O3DE Editor **Console** window or the `Editor.log` file for more information.
    {{< /note >}}

## Script event properties

| Script Event Field | Description |
| --- | --- |
| Name | Enter a name that identifies the script event in Lua and in the Script Canvas Editor **Node Palette**. Event names must have only alphanumeric characters and cannot start with a number or contain white space. |
| Category | Enter a name for the category in the **Script Canvas Editor** **Node Palette** in which the script events appear. The default category is **Script Events**. To nest categories, use the syntax _category/sub_category/sub_category_. |
| Tooltip | Enter a description for the script event. The description appears when the user pauses a pointer on the script event in the **Node Palette** or on the event node in a graph. |
| Address Type | (Optional) Choose a data type for the value that addresses this script event. Possible types are **String**, **Entity Id**, or **Tag**. |
| Events | Specify a list of events that are sent and received by the scripting system. Define the events in the same way that you define functions in a programming language. The events that you create are available for dragging and dropping from the Script Canvas **Node Palette**. |

### Event properties

| Event Field | Description |
| --- | --- |
| Name | The name of the event. |
| Tooltip | Enter the description for the event that appears when the user pauses a pointer on the event name. |
| Return value type | (Optional) Choose the data type of the value that the handler of the event returns to the sender of the event. If Return Type is not **None**, a value of the specified type must be connected from the receiver node to the sender node. |
| Parameters | Choose the plus (+) icon to add one or more parameters for the event function. |

#### Event parameter properties

| Parameter Field | Description |
| --- | --- |
| Name | Enter the name of a function parameter. |
| Tooltip | Enter the description for the parameter that appears when the user pauses a pointer on the parameter name. |
| Type | Choose the data type of the parameter. |
