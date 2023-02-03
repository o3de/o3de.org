---
linkTitle: Source Code Map
title: Source Code Map
description: Summaries of classes and code files in Project Manager
---

{{< note >}}
This information is for developers of the **Project Manager** tool. If you're a user working with Project Manager, please refer to the [Project Manager User Guide](/docs/user-guide/project-config/project-manager).
{{< /note >}}

{{< note >}}
This contains brief summaries of various class's functionality and role. If available, there are additional links in the table of contents, either with expanded information, or github links.
{{< /note >}}

## Map
- <b>Startup Classes</b>
    - main.cpp [[cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/main.cpp) ]
        - Entry point for the Project Manager. Initiates the [Application main loop](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/main.cpp#L28).
    - [Application](#application)  [[header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.h) ] [[cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp) ]
        - Houses core startup code and configuration loading for Qt framework, Logging, Python Bindngs and O3DE Engine Registration. Facilitates prior housework to starting up the application main loop, and clean up when tearing down.
    - [ProjectManagerWindow](#projectmanagerwindow)  [[header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectManagerWindow.h) ] [[cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectManagerWindow.cpp) ]
        - Constructs the application's `QMainWindow` and `DownloadController`, and prepares all relevant transition screens for the Project Manager.
    - [ScreensCtrl](#screensctrl)  [[header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.h) ] [[cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp) ]
        - Container structure for all Project Manager Screens and GUI Widgets. Also houses primary transition code for facilitating Project Manager's business logic.
    - ScreenFactory  [[header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenFactory.h) ] [[cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenFactory.cpp) ]
        - Helper class for ScreensCtrl that routes `ProjectManagerScreen` enums to appropriate ScreenWidget constructor, invokes that construtor, and returns an instance of a given screen for the Project Manager's business logic.


### Application

Inherits from `AzFramework::Application`.

The functions of the Application class are exclusively run by `main.cpp`.

The two primary functions to keep track of are `Init` and `Run`. [`TearDown`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp#L260-L272) is invoked at `Application`'s deconstruction.


##### [`Application::Init`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp#L34)
* Sets various `QApplication` and `QCoreApplication` attributes and parameters
* Registers components for system logging, and invokes [`InitLog`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp#L152)
* Creates new instance of `QApplication`, feeding in command line arguments
* Sets up PythonBindings
* Calls [`RegisterEngine`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp#L181) to setup the O3DE engine that Project Manager ships with
* Gets connection to CommandLine, and parses for screen and projectPath parameters
* Creates ProjectManagerWindow

##### [`Application::Run`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Application.cpp#L274)
* Sets up Qt GUI stylesheets
* Sets up Window decoration and MainWindow Geometry
* Shows the MainWindow
* Run the QApplication's main loop

[Back to Top](#map)



### ProjectManagerWindow
This inherits all primary functionality from `QMainWindow`.

All logic unique to the Project Manager occurs at the constructor, which is summarized as follows:
* Fetch Engine Info to set Window Title with correct engine version information
* Instantiate the `DownloadController`
* Instantiate the `ScreensCtrl` for screen management
* Construct a list of relevant `ProjectManagerScreen` enums, and use `ScreensCtrl` to construct each screen widget for Project Manager's GUI
* Set instance of `ScreensCtrl` as central widget of the window
* Retrieve passed in arguments for `startScreen` and `projectPath`.
    * If `startScreen` is set, first force load the main Projects screen, then transition to the desired screen. If not set, the Projects screen is the default.
    * If `projectPath` is set, notify the `ScreensCtrl` instance of the currently highlighted project path.

[Back to Top](#map)



### ScreensCtrl
ScreensCtrl is the central widget which stores all GUI information for Project Manager. 

Screens are typically accessed using `m_screenMap`. All screens are stored in `m_screenStack`. The three primary tabs of Project Manager (Project, Gem, and Engine), are stored in `m_tabWidget`. Traversal history through the screens of ProjectManager can be tracked via `m_screenVisitOrder`.

All functions are summarized as follows:
* [`ScreensCtrl::ScreensCtrl`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L19) - Sets up primary screen layout. `m_tabWidget` is the first widget pushed to `m_screenStack`.
* [`ScreensCtrl::BuildScreens`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L39) - For each requested screen, calls `ResetScreen`. Because this is called at the beginning of Application life cycle, this will trigger initialization logic in `ResetScreen`.
* [`ScreensCtrl::FindScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L47) - Searches for the pointer to the `ScreenWidget` of the requested `ProjectManagerScreen` enum and returns it if found. Otherwise returns a `nullptr`.
* [`ScreensCtrl::GetCurrentScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L60) - First checks if the current widget in `m_screenStack` is `m_tabWidget`. If so, it returns the current tab of `m_tabWidget`. Otherwise it returns whatever the current widget of `m_screenStack` is.
* [`ScreensCtrl::ChangeToScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L72) - If able, we transition to the desired screen using `ForceChangeToScreen`.
* [`ScreensCtrl::ForceChangeToScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L85) 
    - First we search for the desired screen in `m_screenMap`. 
    - If we can find it, then if it is already the current screen, we run `NotifyCurrentScreen` to refresh it. 
    - Otherwise we set the current widget of `m_screenStack` (and `m_tabWidget` if the desired screen is one of the main tabs). 
        - If we are tracking previous visits, we make sure to update `m_screenVisitOrder` as well.
    - Finally we run `NotifyCurrentScreen` and `GoToScreen` to prepare for our arrival.
* [`ScreensCtrl::GoToPreviousScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L147) - If `m_screenVisitOrder` is not empty, we call `ForceChangeToScreen` by popping `m_screenVisitOrder`.
* [`ScreensCtrl::ResetScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L158)
    - Delete the old screen using `DeleteScreen`
    - Rebuild screen using [`ScreenFactory::BuildScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreenFactory.cpp#L27)
    - If the screen is supposed to be a Tab
        - Update `m_tabWidget` with screen
        - Update current widget for `m_tabWidget` and `m_screenStack`
        - If we should restore the screen, call `NotifyCurrentScreen`
    - Otherwise add the screen to `m_screenStack` and set the current widget
        - `NotifyCurrentScreen` for newly created screen
    - Update `m_screenMap` with pointer to the new screen
    - Connect slots for transition functions for new screen
* [`ScreensCtrl::ResetAllScreens`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L208) - Call `ResetScreen` for every screen.
* [`ScreensCtrl::DeleteScreen`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L216) - If screen can be found in `m_screenMap`, we proceed to delete the screen either from `m_tabWidget` if it is a tab, or from `m_screenStack` otherwise. Afterwards we erase the entry from `m_screenMap`.
* [`ScreensCtrl::DeleteAllScreens`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L243) - Call `DeleteScreen` for all screens
* [`ScreensCtrl::TabChanged`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L251) - A [Slot function](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.h#L50), which is invoked anytime `m_tabWidget` changes tabs. This just causes the current tab to refresh itself via `NotifyCurrentScreen`.
* [`ScreensCtrl::GetScreenTabIndex`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ScreensCtrl.cpp#L260) - Retrieves the index position of the screen in `m_tabWidget` if it is a tab screen, otherwise returns -1


[Back to Top](#map)
