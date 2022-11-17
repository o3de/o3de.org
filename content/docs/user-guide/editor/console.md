---
linkTitle: Console
title: Working with O3DE Console
description: Use the console in O3DE Editor to update the value for console variables or type commands.
weight: 500
---

In O3DE Editor, the console window shows a running list of all editor commands, processes, and output. For example, when you delete an entity, the console shows the action and the output. You can use the console to enter or modify console variables (CVARs). Console variables are a type of variable that you can manipulate in O3DE Editor.

## Viewing the Console Window 

You can enter commands directly in the console window or search and edit console variables.

**To view the console window**

1. In O3DE Editor, choose **Tools**, **Console**.

1. Click the **X** icon in the left corner to open the **Console Variables** window. The **Console Variables** window lists all available console variables.

    ![View all available console variables in the console window.](/images/shared/console-x-window.png)

1. Enter a name to search for a specific console variable. To learn more about the console variable, pause on the name.

    ![View console variables in the console window.](/images/user-guide/console-variables.png)

## Exporting All Console Commands and Variables 

You can retrieve a complete list of console commands and variables, including their descriptions and assigned values.

**To export a list of all console commands and variables**

1. In the **Console** window, enter the following command: DumpCommandsVars

1. Navigate to the O3DE directory and then open the `consolecommandandvars.txt` file.
**Example**

       You can see the available commands and variables in the file.

       ![Open the consolecommandandvars.txt file to see all console commands and variables.](/images/user-guide/console-variables-test-file.png)

1. You can specify a sub-string parameter to restrict the results that you want. For example, the DumpCommandsVars i\_ command exports all commands and variables that begin with the prefix `i_`, such as `i_giveallitems` and `i_debug_projectiles`.

## Configuring Console Variables 

Console variables can also be set in code or specified in configuration files. Console variables are executed in the following order:

1. Configuration files:
     - The `game.cfg` file in your project directory
     - The `system_gamesystem.cfg` file for your game system
     - The `engine\config\user.cfg` file
     - The `level.cfg` file in your project's level directory

1. Code

1. Console variables typed directly into the console

The order of execution is also the override order. For example, console variables set in code override those set in configuration files \(and `level.cfg` overrides `user.cfg`, and so on\). Console variables set in flow graphs override any identical console variables set in code. Finally, console variables typed directly into the console override all the other console variable settings.

### Configuring Console Variables in the Console 

You can specify values for console variables in the console to apply changes to your level.

**To configure console variables in the console**

Do one of the following:
     - In the **Console Variables** window, search for the variable name, double-click the value, and then enter the value that you want.
     - In the **Console** command line, enter the console variable and its value, and then press **Enter**. For example, enter the r\_DisplayInfo=1 command to display debugging information in the viewport.

### Configuring Console Variables in Configuration Files 

You can specify values for console variables in the configuration files, such as the level configuration file \( `level.cfg`\).

**To configure console variables with a configuration file**

1. Navigate to the directory that has the configuration file. For example, if you want to configure the `level.cfg` file, navigate to the `Levels\level_name` directory in your project.

1. Use a text editor to edit the file or to create one.

1. Specify the console variable name and the value. For example: `r_DisplayInfo=1` shows debugging information in the viewport.

1. Save the file.
