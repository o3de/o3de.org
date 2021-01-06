---
description: ' Use the Lua Editor to author, debug, and edit Lua scripts in &ALYlong;. '
title: Lua Editor
---
# Lua Editor<a name="lua-editor-debugger"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Lumberyard Lua Editor \(Lua IDE\) offers an intuitive integrated development environment \(IDE\) that makes it easy to author, debug, and edit Lua scripts when you create or extend your game\. Lua Editor is a standalone application, but can be opened directly from Lumberyard Editor using the Tools menu\.

## Tutorial: Using Lua Editor for Debugging with Lumberyard Editor<a name="lua-editor-debugger-tutorial"></a>

This tutorial shows you how to use Lumberyard Editor to create a sample level in the **SamplesProject** project with a component entity that contains a Lua script component\. You will learn how to open the script in Lua Editor and perform some sample debugging steps on the script\.

**Debugging Lua scripts using Lua Editor**

1. Set the **SamplesProject** as the default project using Project Configurator\.

1. In Lumberyard Editor, create a new level by performing *one* of the following steps:
   + In the **Welcome to Lumberyard Editor** window, click **New level**
   + Click **File**, **New**
   + Press **Ctrl\+N**

1. In the **New Level** dialog box, give the level a name, and then click **OK**\.

1. In **Asset Browser**, expand **SamplesProject**, **Objects**, and **SamplesAssets**\.

1. Drag **mover\_display\_smooth\.cgf** to the perspective viewport\.

1. In **Entity Inspector**, click **Add Component**, and then choose **Scripting**, **Lua Script**\.

1. In the **Entity Inspector** window, locate the **Lua Script** component, and then click the **Pick Lua Script** button next to the empty **Script** field\.  
![\[Open the Pick Lua Script window from the Lua Script component\]](/images/userguide/scripting/lua/lua-component-pick-lua-script.png)

1. In the **Pick Lua Script** window, expand **SamplesProject**, **Scripts**, and **Components**\.

1. Click **ConstantRotation\.lua**, and then click **OK**\.

1. In the **Lua Script** component, click the **Open in Lua Editor** button to launch Lua Editor\.  
![\[Launch Lua Editor from Lua Script component in Lumberyard Editor\]](/images/userguide/scripting/lua/lua-component-open-in-lua-editor.png)

   Because the debugging functionality is enabled through network sockets, you must connect Lua Editor to the target that is running the script before you can debug\. In this tutorial, you connect to Lumberyard Editor\.
**Note**  
Connection is facilitated by [GridHub](gridhub-intro.md), which is Lumberyard's central connection hub for debugging\. GridHub starts automatically when Lua Editor is started and must be running in the background for Lua Editor to find targets it can connect to\.

1. In the Lua Editor toolbar, click **Target: None**, and then click **Editor\(*ID*\)** to connect to Lumberyard Editor\.  
![\[Target selector\]](/images/userguide/lua-editor-debugger-target-editor.png)
**Note**  
You may need to expand the Lua Editor window to see the buttons on the Lua Editor toolbar for the next few steps\.

1. In the Lua Editor toolbar, leave **Context** setting at **Default** for the debugging context\. The default setting is good for debugging component entity scripts such as the one in this tutorial\. The **Cry** context option is for debugging legacy scripts such as those associated with Cry entities or the Game SDK\.  
![\[Context selector\]](/images/userguide/lua-editor-debugger-context-choose.png)

1. The **Debugging** icon turns green to show that Lua Editor and Lumberyard Editor are connected:  
![\[Lua Editor connected to Lumberyard Editor\]](/images/userguide/lua-editor-debugger-connected-icon.png)

   Click **Classes** in the **Class Reference** to show the available Lua libraries\. You can do the same for **EBuses** and **Globals**\.  
![\[Classes Reference\]](/images/userguide/lua-editor-debugger-class-reference-pane.png)  
![\[Classes\]](/images/userguide/lua-editor-debugger-class-reference-pane-open.png)
**Note**  
The class reference feature is active only for the default context and component entity scripts\. This feature is not active in the Cry context, which exists only for backward compatibility\.

   After you connect, you can pause the execution of a given script by setting breakpoints\.

1. In the Lua Editor toolbar, click the **Breakpoints** icon ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-breakpoints-icon.png) to show the **Breakpoints** window\.

1. In Lua Editor, click one or more line numbers in the `constantrotation.lua` script to set one or more breakpoints\. As you add breakpoints, the line number and script path for each are added to the **Breakpoints** window\.

1. In Lumberyard Editor, press **Ctrl\+G** to run the game, or click the **Simulate** icon at the bottom of the viewport to enable game simulation and run scripts\. Lua Editor opens with a yellow marker stopped on the first breakpoint that it encounters\.  
![\[Debugger stopped on breakpoint\]](/images/userguide/lua-editor-debugger-stopped-on-breakpoint.png)

   When execution is halted at a breakpoint, more information becomes available in the **Lua Locals**, **Stack**, and **Watched Variables** panes\.

1. Click the **Stack** icon ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-stack-icon.png) to show the **Stack** window\.

1. Click the **Lua Locals** icon ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-lua-locals-icon.png) to show local Lua variables\.

1. Click **Watched Variables** icon ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-watched-variables-icon.png) to open the **Watched Variables** window, where you can specify variables to watch\.

1. Press **F11** a few times to step through the code\. Note how the contents of the **Stack**, **Lua Locals**, and **Watched Variables** windows change\.
**Tip**  
For greater convenience, you can float or dock these windows\.

1. To detach from debugging, click **Debugging**\.  
![\[Click to detach from debugging\]](/images/userguide/lua-editor-debugger-detach-icon.png)

1. In Lumberyard Editor, Press **Esc** to stop the game\.

### Options Available While Debugging<a name="lua-editor-debugger-debugging-options"></a>

The following table summarizes common options available while debugging\.


****  

| **Icon** | **Action** | **Keyboard Shortcut** | **Description** | 
| --- | --- | --- | --- | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-run-in-editor.png) | Run in Editor | Alt\+F5 | Run in Lumberyard Editor\. | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-run-on-target.png) | Run on Target | Ctrl\+F5 | Send script to the connected target and run it\. | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-run-continue.png) | Run/Continue | F5 | Run or continue running the current script\. | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-step-into.png) | Step Into | F11 | Step into the function called on the current line\. | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-step-out.png) | Step Out | Shift\+F11 | Step out of the called function\. | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-step-over.png) | Step Over | F10 | Step over the function called on the current line\. | 
| ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-toggle-breakpoint.png) | Toggle Breakpoint | F9 | Enable or disable a breakpoint on the current line\. | 

## Maintaining Separate Search Results<a name="lua-editor-debugger-separate-search-results"></a>

In addition to the usual search capabilities, the **Find** feature can display the results of four different searches separately\.

**To maintain separate search results**

1. Click the **Find** icon ![\[Image NOT FOUND\]](/images/userguide/lua-editor-debugger-find-results-icon.png) or press **Ctrl\+F** to perform searches in the currently open file, or in all open files\.  
![\[Lua Editor Find dialog\]](/images/userguide/lua-editor-debugger-find-dialog.png)

1. Before starting a search, choose **Find 1**, **Find 2**, **Find 3**, or **Find 4** to choose the window in which you want to see the results\. You can maintain the results of four searches separately in the tabbed windows\. The search results in the other windows remain unchanged\.  
![\[Find Results\]](/images/userguide/lua-editor-debugger-find-results-window.png)

1. To go directly to the line in the code which a search result was found, double\-click the line in the search results\.
**Note**  
In Lua Editor Preview, the line number shown in the **Find Results** window and the line number in the script pane differ by one\.
**Tip**  
For convenience, you can also dock or float the **Find Results** window\.

## Editing<a name="lua-editor-debugger-editing"></a>

Lua Editor can open multiple scripts at the same time\. Each script has its own tab in the editor\. The editor provides a standard set of capabilities for text editing but also includes useful features for editing source code\.

The following table summarizes the options available while editing and debugging\.


****  

| **Action** | **Keyboard Shortcut** | 
| --- | --- | 
| Comment selected block | Ctrl\+K | 
| Copy | Ctrl\+C | 
| Cut | Ctrl\+X | 
| Find | Ctrl\+F | 
| Find in open files | Ctrl\+Shift\+F | 
| Find next | F3 | 
| Fold source functions | Alt\+0 | 
| Go to line | Ctrl\+G | 
| Paste | Ctrl\+V | 
| Quick find local | Ctrl\+F3 | 
| Quick find local reverse | Ctrl\+Shift\+F3 | 
| Redo | Ctrl\+Y | 
| Replace | Ctrl\+R | 
| Replace in open files | Ctrl\+Shift\+R | 
| Select all | Ctrl\+A | 
|  Select to brace¹  | Ctrl\+Shift\+\] | 
| Transpose lines down | Ctrl\+Shift\+Down Arrow | 
| Transpose lines up | Ctrl\+Shift\+Up Arrow | 
| Uncomment selected block | Ctrl\+Shift\+K | 
| Undo | Ctrl\+Z | 
| Unfold source functions | Alt\+Shift\+0 | 

¹ Select to brace selects a block bounded by braces\. Before using this option, the cursor must be immediately next to the beginning or ending brace of the block\.

## Perforce Integration<a name="lua-editor-debugger-perforce-integration"></a>

Lua Editor includes Perforce integration features\. When you open a file from your Perforce environment, Lua Editor displays the file's status in the top right of the text editing window\.

![\[Not Checked Out\]](/images/userguide/lua-editor-debugger-p4-not-checked-out.png)

![\[Checked Out By You\]](/images/userguide/lua-editor-debugger-p4-checked-out-by-you.png)

The **Source Control** menu offers **Check Out/Check In** functionality\.

![\[Source Control Menu\]](/images/userguide/lua-editor-debugger-check-out-icon.png)