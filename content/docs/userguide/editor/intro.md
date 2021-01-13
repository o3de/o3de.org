---
description: ' Launch &ly-editor; and understand the viewport, &asset-browser; , &entity-outliner;
  , &entity-inspector; , and console. '
title: Using &ly-editor;
---
# Using Lumberyard Editor {#lumberyard-editor-intro}

Lumberyard Editor is your primary workplace for game development\. The editor provides access to the tools to create, design, and deploy your game project\. You can also play the game to test your changes\.

**Note**  
If you receive errors from the `AssetProcessor.exe` or `AssetProcessor_temp.exe`, check for the quarantined file in your antivirus software\. You can grant exceptions for the affected files\.

**To open Lumberyard Editor**
+ After installation, launch Lumberyard Editor with your preferred method:
  + From the desktop, double\-click the Lumberyard Editor icon\. ![\[Lumberyard Editor desktop icon\]](/images/userguide/lumberyard-editor-launch.png) 
**Note**  
The Lumberyard Editor desktop shortcut points to the `lumberyard_installation\dev\Bin64vcxxx\Editor.exe` file that corresponds to the version of Visual Studio that you chose in Lumberyard Setup Assistant during setup\. If you later change the version of Visual Studio that you use with Lumberyard, this desktop shortcut may no longer be valid\.
  + From Lumberyard Setup Assistant, on the **Summary** page, click **Launch Editor**\.
  + For Visual Studio 2017, navigate to the `lumberyard_version\dev\Bin64vc141` directory and double\-click `Editor.exe`\.
  + For Visual Studio 2019, navigate to the `lumberyard_version\dev\Bin64vc142` directory and double\-click `Editor.exe`\.

After the first launch and each time you change projects, Asset Processor runs in the background using the project configuration settings to populate the **Asset Browser**\. Messages appear with status information before the editor opens\. For more information about Asset Processor, see [Using Asset Processor](/docs/userguide/assets/processor.md)\.

**Topics**
+ [Lumberyard Editor Interface](/docs/userguide/editor/interface.md)
+ [Using the Menu Bar](/docs/userguide/editor/menus.md)
+ [Using the Top Toolbar](/docs/userguide/editor/toolbars.md)
+ [Using the Bottom Toolbar](/docs/userguide/editor/toolbar-bottom.md)
+ [Using Keyboard Shortcuts](/docs/userguide/editor/shortcut-keys.md)
+ [Using the Viewport](/docs/userguide/editor/viewport.md)
+ [Using the Console Window](/docs/userguide/console-intro.md)
+ [Automating the Lumberyard Editor with the Python Editor Bindings gem](/docs/userguide/editor-automation.md)
+ [Demo and Video Capture](/docs/userguide/demo-video-capture-intro.md)
+ [Customizing Lumberyard Editor](/docs/userguide/editor/customizing.md)
+ [Restoring the Default Layout for Lumberyard Editor](/docs/userguide/editor/default-settings.md)