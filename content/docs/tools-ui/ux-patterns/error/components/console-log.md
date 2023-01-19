---
linktitle: Console Log
title: Error Messages in Console Log
description: Learn how to design Error/Warning/Success/Information messages in console logs using the Blue Jay Design System (BJDS) in Open 3D Engine (O3DE).
weight: 100
toc: true
---

A *console log* displays a collection of *console messages*, which notify the user of errors or failures, warnings, and other information that occurred during an event. Console messages are color-coded and prefixed with their status to help users differentiate between the messages.

#### Example

For example, when you open your project in the **Open 3D Engine (O3DE) Editor**, the console log informs you of the statuses of the different systems and objects in your project. Warning messages are colored a variation of orange and prefixed with "\[Warning\]" and an error message is colored a variation of red and prefixed with "\[Error\]".


![Example of console log with console messages](/images/tools-ui/console-log/console-log-messages.png)

## Specification

Review these specifications when creating a console log:

- Console messages must follow the format:
  
  ```
  [<status>] (<system affected>) - [<number of problems>] - <problem>. <ways to resolve the problem>.
  ```
  - `<status>`: "Error", "Failure", or "Warning".
  - `<system affected>`: The name of the system where the error, failure, or warning occurred. 
  - `<number of problems>`: Quantify the number of problems that occurred for in a single message, if applicable.
  - `<problem>`: Describe the problem.
  - `<ways to resolve the problem>`: Describe actionable steps the user can take to resolve or work around the problem.

  For help on how to describe the problem and ways to resolve the problem, refer to [Guidelines for Writing Error Messages](../guidelines).

- Color-code and prefix console messages depending on the following use cases.

  ![Console Log decision table](/images/tools-ui/console-log/console-log-decision-table.png)

  Use the following colors for the text, depending on the console message's status and console log's theme:
  - Dark theme: 
    - **Error/Failure**: `#FA2727`
    - **Warning**: `#FFAA22`
  - Light theme: 
    - **Error/Failure**: `#C80000`
    - **Warning**: `#807000`

  ![Console Log - Error and Warning examples](/images/tools-ui/console-log/console-log-state-colors.png)

## Best practice

* Use only plain text in console messages. Do not use rich text such as icons and formatted text.

* Use console messages to display passive notifications to the user. Console messages may not be seen by the user.
  
* Show multiple messages of the same status in succession. For example, list all warnings, then list all errors/failures.


## Custom theme

You can customize the theme of the console log to suit your preference. There are two themes, **Light** and the default **Dark**.
- Light theme background color: `#FFFFFF`
- Dark theme background color: `#111111`

![Console Log - Global Preferences](/images/tools-ui/console-log/global-preferences.png)

To customize the background: 

1. In the O3DE Editor, open the **Edit** dropdown in the tools menu. 

2. Select **Editor Settings** > **Global Preferences...** to open the **Preferences** dialog.

3. Next to **Console Background** under the **General Settings** group, select a theme option. 

4. Save your settings by clicking **OK**. 