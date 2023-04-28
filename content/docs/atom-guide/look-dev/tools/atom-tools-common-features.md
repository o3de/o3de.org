---
title: Atom Tools Common Features
description: Learn how to navigate and use the common features of Atom tools such as Material Editor and Material Canvas.
toc: true
---

## Overview
The tools included with Atom are built upon a common foundation. They share the same core concepts, features, workflows, and user experience.

![Basic Tool](/images/atom-guide/tools/empty-tool.jpg)

## The Document System
All of the Atom tools use a multi-document, multi-view system. This allows all of the tools to follow the same patterns, so they share the same features, UI, and basic interactions. You'll have a familiar experience across the tools, regardless of the type of data you edit.

A _document_ is the representation of a file or other data that you can create, open, and edit from within a tool. At a minimum, all document types support actions to open, save, undo, redo, and provide a list of properties that you can edit in an inspector, 

A _view_ is usually a window or other UI that allows you to visualize, inspect, or interact with a document.

Each tool is designed specifically for a set of document types:
- Material Editor currently only supports one document type for editing ".material" and viewing ".materialtype" files
- Material Canvas supports multiple document types for ".materialgraph", ".materialgraphnode", and ".shader" files. 
- Shader Management Console supports one document type for ".shadervariantlist" files. 

You can open and edit multiple documents at the same time.
- Access each document using a tab at the top of the central window. 
- Each document tab displays the file name of the document.
- **Right-click** on a tab to open a context menu with document-centric actions.
- Select a tab to activate the corresponding document, display any associated views, and update other windows, like the inspector, with content from the document.

## Single Instance
By default, the tools are set up to only allow a single instance to run at a time. If you attempt to relaunch a tool that is already running, it instead focuses on the existing instance. If a tool is running and you attempt to open an associated file type from the O3DE Editor or file browser, then it opens in the same tool in a new tab. 

## Python Scripting
All tools built on this foundation have common APIs for scripting, automation, and extension with Python. While there are differences from the main O3DE Editor environment and scripting API, you should have access to all other scripting features from your project and enabled Gems.
- The document system is fully scriptable.
- Several utility functions used in C++ are also available in Python.
- Use PyQt for controlling and extending the UI. 
- Run scripts from the file menu, Asset Browser context menu, or passed in as command line arguments. 

## Main Window
The main window is the hub and owns all of the user interface for a tool.

### Title bar
The title bar at the top of the main window displays the name of the application and the active RHI, rendering back end (DX12 or Vulkan).

### Layouts
The position, size, and state of the main window and any child windows save and restore each time you open the tool. You can save, restore, and manage custom layouts from the view menu.

### Docked Windows
The main window contains several child windows for different features that you can dock, float, stack, or rearrange into custom layouts.

All of the tools come with a common set of basic panels but you can add more panels based on the needs of each tool. 

#### Inspector
The Inspector displays context-sensitive, editable properties for the active document.

#### Asset Browser
Use the Asset Browser panel to explore and manage assets in the active project and Gems. Set up filters, select, create, rename, move, delete, and perform other operations on assets. The Asset Browser automatically selects the file corresponding to the most recently opened or activated document. This only happens if the filters are set up to display the document type. Drag assets from the Asset Browser into asset properties in the Inspector and other windows supporting the dropped file types.

#### Logging
Use the Logging window to review all of the trace, warning, and error messages reported since the tool was launched.

#### Python Terminal
Use the Python terminal to invoke script commands directly from within the tool. It will also display the output, warnings, and errors from any Python code executed during the session. There are other buttons to display available script commands and buses.

## Main menus
The main menu bar in every tool contains a common set of options but can be customized by each tool. 

### File Menu
The file menu contains all of the common actions for creating, opening, closing, and saving documents. There are also actions for running Python scripts.
| Menu item | Hotkey | Function |
| - | - | - |
| New... | **Ctrl+N** | Opens a dialog to create a new document. If the tool supports multiple document types, this first displays a sub menu that lists them. |
| Open... | **Ctrl+O** | Opens a dialog to open an existing document. If the tool supports multiple document types, this first displays a sub menu listing them. |
| Save | **Ctrl+S** | Saves the active document. |
| Save As... | | Saves the active document to the specified folder and file name. |
| Save As Child... | | Saves a new child document of the current document. Only Material Canvas and Material Editor has this action. |
| Save All | | Saves the edits in all open documents. |
| Close | **Ctrl+F4** | Closes the active document. |
| Close All | | Closes all of the open documents. |
| Close Others | | Closes all of the documents except the active one. |
| Run Python... | | Opens a dialog to select and run a Python script. |
| Exit | | Closes the application. |

### Edit Menu
The edit menu has actions to undo and redo changes on the active document. Other actions may be added by tools for specific document types. 
| Menu item | Hotkey | Function |
| - | - | - |
| Undo | **Ctrl+Z** | Undo the most recent action. |
| Redo | **Ctrl+Y** | Redo the most recent action that was undone. |

### View Menu
The view menu includes actions for switching between documents. Other actions may be added by tools for specific document types. 

| Menu item | Hotkey | Function |
| - | - | - |
| Previous Tab | **Ctrl+Shift+Tab** | Switches to the previously opened tab. |
| Next Tab | **Ctrl+Tab** | Switches to the next opened tab. |

### Tools Menu
The tools menu includes actions for toggling visibility of dockable panels and opening the settings dialog. Other actions may be added by tools for specific document types. 

| Menu item | Hotkey | Function |
| - | - | - |
| Asset Browser | | Toggles the Asset Browser window. |
| Inspector | | Toggles the Inspector window. |
| Logging | | Toggles the Logging window. |
| Python Terminal | | Toggles the Python Terminal window. |

### Help Menu
The help menu includes actions for opening the help and about dialogs.

| Menu item | Hotkey | Function |
| - | - | - |
| Help... | | Opens the help dialog with information about how to use the tool. |
| About... | | Opens the about dialog with information about the tool. |

## Settings
Tools can be customized and configured through the settings registry. The settings dialog in each tool provides access to several common and application specific settings. Values for all modified settings will be saved between sessions. 

![Settings Dialog](/images/atom-guide/tools/settings-dialog.png)
