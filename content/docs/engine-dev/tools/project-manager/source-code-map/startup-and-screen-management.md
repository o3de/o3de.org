---
linkTitle: Startup and Screen Management Classes
title: Startup and Screen Management Classes
description: Classes that facilitate Project Manager startup, and screen transition logic
---

{{< note >}}
This information is for developers of the **Project Manager** tool. If you're a user working with Project Manager, please refer to the [Project Manager User Guide](/docs/user-guide/project-config/project-manager).
{{< /note >}}

{{< note >}}
This contains brief summaries of various class's functionality and role. If available, there are additional links in the table of contents, either with expanded information, or github links. All documentation reflects code as of commit [(b79bd3df1f)](https://github.com/o3de/o3de/tree/b79bd3df1fe5d4c2a639d3921a29bd0d95712f6c) 
{{< /note >}}

## Overview

| Class | Source Code | Description |
| - | - | - |
| main.cpp | [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/main.cpp) | Entry point for the Project Manager. Initiates the [Application main loop](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/main.cpp#L28).
| [Application](#application) | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.h) [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp)  | Houses core startup code and configuration loading for Qt framework, Logging, Python Bindngs and O3DE Engine Registration. Facilitates prior housework to starting up the application main loop, and clean up when tearing down. |
|[ProjectManagerWindow](#projectmanagerwindow) | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectManagerWindow.h)  [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectManagerWindow.cpp) | Constructs the application's `QMainWindow` and `DownloadController`, and prepares all relevant transition screens for the Project Manager.
|[ScreensCtrl](#screensctrl) | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.h) [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp) | Container structure for all Project Manager Screens and GUI Widgets. Also houses primary transition code for facilitating Project Manager's business logic.
|ScreenFactory | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenFactory.h) [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenFactory.cpp) | Helper class for `ScreensCtrl` that routes `ProjectManagerScreen` enums to appropriate `ScreenWidget` constructor, invokes that constructor, and returns an instance of a given screen for the Project Manager's business logic.
|ScreenDefs | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenDefs.h) | Contains definitions for `ProjectManagerScreen` enum, which describes all possible types of screens in Project Manager. It also defines a hash function, and a mapping to appropriate string equivalents for each enum.|
|[ScreenWidget](#screenwidget) | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenWidget.h) | The parent class to all screens in Project Manager. It contains all necessary stubs for screen management and transition. `ScreensCtrl` is defined in terms of `ScreenWidget`, so that all transition logic is polymorphic.|


### Application

Inherits from `AzFramework::Application`.

The functions of the Application class are exclusively run by `main.cpp`.

The two primary functions to keep track of are `Init` and `Run`. [`TearDown`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/Application.cpp#L260-L272) is invoked at `Application`'s deconstruction.


##### [`Application::Init`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/Application.cpp#L34)
* Sets various `QApplication` and `QCoreApplication` attributes and parameters.
* Registers components for system logging, and invokes [`InitLog`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/Application.cpp#L152).
* Creates new instance of `QApplication`, feeding in command line arguments.
* Sets up PythonBindings.
* Calls [`RegisterEngine`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/Application.cpp#L181) to setup the O3DE engine that Project Manager ships with.
* Gets connection to CommandLine, and parses for screen and projectPath parameters.
* Creates ProjectManagerWindow.

##### [`Application::Run`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/Application.cpp#L274)
* Sets up Qt GUI stylesheets.
* Sets up Window decoration and MainWindow Geometry.
* Shows the MainWindow.
* Run the QApplication's main loop.

[Back to Overview](#overview)



### ProjectManagerWindow
This inherits all primary functionality from `QMainWindow`.

All logic unique to the Project Manager occurs at the constructor, which is summarized as follows:
* Fetch Engine Info to set Window Title with correct engine version information.
* Instantiate the `DownloadController`.
* Instantiate the `ScreensCtrl` for screen management.
* Construct a list of relevant `ProjectManagerScreen` enums, and use `ScreensCtrl` to construct each screen widget for Project Manager's GUI.
* Set instance of `ScreensCtrl` as central widget of the window.
* Retrieve passed in arguments for `startScreen` and `projectPath`.
    * If `startScreen` is set, first force load the main Projects screen, then transition to the desired screen. If not set, the Projects screen is the default.
    * If `projectPath` is set, notify the `ScreensCtrl` instance of the currently highlighted project path.

[Back to Overview](#overview)




### ScreensCtrl
ScreensCtrl is the central widget which stores all GUI information for Project Manager. It is comprised of these data structures:

* `m_screenMap` - used to access all available Screens in Project Manager.
* `m_screenStack` - stores all screens in a `QStackedWidget`.
* `m_tabWidget` - The three primary tabs of Project Manager (Project, Gem, and Engine), are stored here. This tab widget, in turn, is stored as the first element of `m_screenStack`.
* `m_screenVisitOrder` - Traversal history through the screens of ProjectManager can be tracked using this.

All functions are summarized as follows:

| Function | Description |
| - | - |
| [`ScreensCtrl::ScreensCtrl`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L19) | Sets up primary screen layout. `m_tabWidget` is the first widget pushed to `m_screenStack`.|
| [`ScreensCtrl::BuildScreens`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L39) | For each requested screen, calls `ResetScreen`. Because this is called at the beginning of Application life cycle, this will trigger initialization logic in `ResetScreen`.|
| [`ScreensCtrl::FindScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L47) | Searches for the pointer to the `ScreenWidget` of the requested `ProjectManagerScreen` enum and returns it if found. Otherwise returns a `nullptr`.|
| [`ScreensCtrl::GetCurrentScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L60) | First checks if the current widget in `m_screenStack` is `m_tabWidget`. If so, it returns the current tab of `m_tabWidget`. Otherwise it returns whatever the current widget of `m_screenStack` is.|
| [`ScreensCtrl::ChangeToScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L72) | If able, we transition to the desired screen using `ForceChangeToScreen`.|
| [`ScreensCtrl::ForceChangeToScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L85) | Driver code to change screen GUIs in Project Manager. More info can be found [below](#screensctrlforcechangetoscreenhttpsgithubcomo3deo3deblobce9765f7fca8feed2eefaaea3764805679d7425fcodetoolsprojectmanagersourcescreensctrlcppl85)| 
| [`ScreensCtrl::GoToPreviousScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L147) | If `m_screenVisitOrder` is not empty, we call `ForceChangeToScreen` by popping `m_screenVisitOrder`.|
|[`ScreensCtrl::ResetScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L158) | Deletes the old screen, and recreates it. More info can be found [below](#screensctrlresetscreenhttpsgithubcomo3deo3deblobce9765f7fca8feed2eefaaea3764805679d7425fcodetoolsprojectmanagersourcescreensctrlcppl158)|
| [`ScreensCtrl::ResetAllScreens`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L208) | Call `ResetScreen` for every screen.|
| [`ScreensCtrl::DeleteScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L216) | If screen can be found in `m_screenMap`, we proceed to delete the screen either from `m_tabWidget` if it is a tab, or from `m_screenStack` otherwise. Afterwards we erase the entry from `m_screenMap`.|
| [`ScreensCtrl::DeleteAllScreens`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L243) | Call `DeleteScreen` for all screens.|
| [`ScreensCtrl::TabChanged`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L251) | A [Slot function](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.h#L50), which is invoked anytime `m_tabWidget` changes tabs. This just causes the current tab to refresh itself via `NotifyCurrentScreen`.|
| [`ScreensCtrl::GetScreenTabIndex`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L260) | Retrieves the index position of the screen in `m_tabWidget` if it is a tab screen, otherwise returns -1.|

#### In-Depth Explanations
###### [`ScreensCtrl::ForceChangeToScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L85)
* First we search for the desired screen in `m_screenMap`. 
* If we can find it, then if it is already the current screen, we run `NotifyCurrentScreen` to refresh it. 
* Otherwise we set the current widget of `m_screenStack` (and `m_tabWidget` if the desired screen is one of the main tabs). 
    - If we are tracking previous visits, we make sure to update `m_screenVisitOrder` as well.
* Finally we run `NotifyCurrentScreen` and `GoToScreen` to prepare for our arrival.



###### [`ScreensCtrl::ResetScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L158)
* Delete the old screen using `DeleteScreen`.
* Rebuild screen using [`ScreenFactory::BuildScreen`](https://github.com/o3de/o3de/blob/ce9765f7fca8feed2eefaaea3764805679d7425f/Code/Tools/ProjectManager/Source/ScreenFactory.cpp#L27).
* If the screen is supposed to be a Tab.
    - Update `m_tabWidget` with screen.
    - Update current widget for `m_tabWidget` and `m_screenStack`.
    - If we should restore the screen, call `NotifyCurrentScreen`.
* Otherwise add the screen to `m_screenStack` and set the current widget.
    - `NotifyCurrentScreen` for newly created screen.
* Update `m_screenMap` with pointer to the new screen.
* Connect slots for transition functions for new screen.

[Back to Overview](#overview)


### ScreenWidget
If you were to check the header file, it would only contain stub functions. In this section we will explain the high level purpose of each function, so that it's easier to recognize what the subclasses are doing when they override a given function.

| Function | Description |
| - | - |
| [`ScreenWidget::GetScreenEnum`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L33) | Each subclass of `ScreenWidget` will use this function to define what type of screen is currently active. |
| [`ScreenWidget::IsReadyForNextScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L37) | Meant to validate if a given [screen is ready for a transition](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L77), or if it must pause for some reason (for example, an uninterruptable task is taking place). Currently it is unused.|
| [`ScreenWidget::IsTab`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L41) | This function declares if a given screen is a tab in the `m_tabWidget` data structure. This is used to process tabs as an edgecase in [`ScreensCtrl::ForceChangeToScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L118) and [`ScreensCtrl::DeleteScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L223). The classes which override this function are [`GemCatalogScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/GemCatalog/GemCatalogScreen.cpp#L782), [`ProjectsScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ProjectsScreen.cpp#L431), [`ProjectGemCatalogScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ProjectGemCatalogScreen.cpp#L121), and [`EngineScreenCtrl`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/EngineScreenCtrl.cpp#L68).|
| [`ScreenWidget::GetTabText`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L45) | Gets the corresponding string value of a tab screen, if defined by the subclass.|
| [`ScreenWidget::ContainsScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L50) | There exist some screens in Project Manager, like [`EngineScreenCtrl`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/EngineScreenCtrl.cpp#L75), that contain other smaller screens inside of them. This can be used to check if a given screen exists inside of a parent screen. |
| [`ScreenWidget::GoToScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L54) | Defines a transition function where the subclass decides whether or not to move onto a certain screen. |
| [`ScreenWidget::Init`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L57) | This function occurs shortly after a screen's constructor runs in [`ScreenFactory::BuildScreen`](https://github.com/o3de/o3de/blob/c33daa6fc7f2ce175fca1e8325b9feac0c0d4d4e/Code/Tools/ProjectManager/Source/ScreenFactory.cpp#L78). This is meant to setup any hooks into the system that cannot be done at construction time. Two examples of this can be found in [`CreateAGemScreen`](https://github.com/o3de/o3de/blob/c33daa6fc7f2ce175fca1e8325b9feac0c0d4d4e/Code/Tools/ProjectManager/Source/CreateAGemScreen.cpp#L79-L93) and [`EditAGemScreen`](https://github.com/o3de/o3de/blob/c33daa6fc7f2ce175fca1e8325b9feac0c0d4d4e/Code/Tools/ProjectManager/Source/EditAGemScreen.cpp#L48-L64), the reasoning of which can be found [here](https://github.com/o3de/o3de/pull/12732/files/a8af31a375ed97152b0c0ae785c85a538c918de0#r1014510710). |
| [`ScreenWidget::NotifyCurrentScreen`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L61) | A function that is called anytime the screen needs to refresh itself. All necessary refresh logic should be expressed here. |

`ScreenWidget` also defines various Qt [`signals`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreenWidget.h#L65-L70) that are used to facilitate transitions by connecting to Qt [`slots`](https://github.com/o3de/o3de/blob/99f713702e5e0a8949e38c7b92bf00682c2633ca/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L201-L205) as defined in `ScreensCtrl::ResetScreen`.

[Back to Overview](#overview)