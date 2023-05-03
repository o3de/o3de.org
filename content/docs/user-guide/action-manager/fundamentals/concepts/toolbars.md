---
linkTitle: Toolbars
title: Toolbars
description: An overview of the Action Manager ToolBar API.
weight: 103
---

The toolbar manager system provides interfaces to register and extend toolbars for use in the Open 3D Engine (O3DE) Editor UI.


## Registration

A new toolbar can be registered by providing its string identifier.

```
AzToolsFramework::ToolBarProperties toolBarProperties;
toolBarProperties.m_name = "ToolBar Name";

toolBarManagerInterface->RegisterToolBar(
    "o3de.toolBar.identifier",
    toolBarProperties
);
```

The toolbar properties structure can also specify additional information:

* A **name** string, which is meant to be a human-readable description to show in UI (currently unused);


## Displaying the toolbar

When a toolbar is registered, it is possible to retrieve their `QToolBar*` and display them in the interface.

```
QToolBar* toolBar = m_toolBarManagerInterface->GetToolBar("o3de.toolbar.identifier);

// Show the toolbar in widget
mainWindow->addToolBar(toolBar);
```

{{< note >}}
The toolbar manager system automatically clears and re-populates the toolbar when an action is added to it, or when the enabled state of the actions added to the toolbar changes. As such, the `QToolBar*` must only be used to display the toolbar and not to edit its structure since any change will be lost at the next update.
{{< /note >}}


## Adding actions

It is possible to add actions to a toolbar via this API call:

```
int sortKey = 100;

toolBarManagerInterface->AddActionToToolBar(
    "o3de.toolBar.identifier",
    "o3de.action.identifier", 
    sortKey 
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about toolbar item ordering.


## Adding separators

To divide a toolbar into sections, it is possible to add separators.

```
int sortKey = 100;

toolBarManagerInterface->AddSeparatorToToolBar(
    "o3de.toolBar.identifier",
    sortKey 
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about toolbar item ordering.

If multiple separators are added one after the other in order, or at the beginning or end of the toolbar, they may be collapsed into one or not displayed at all (default Qt behavior).


## Adding actions with sub-menus

It is possible to add sub-menus to actions while they are being added. The menu will be accessible via a downward-facing arrow next to the action's icon.

```
int sortKey = 100;

toolBarManagerInterface->AddActionWithSubMenuToToolBar(
    "o3de.toolBar.identifier",
    "o3de.action.identifier", 
    "o3de.subMenu.identifier", 
    sortKey 
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about toolbar item ordering.


## Adding widget actions

Widgets can also be added to toolbar as follows:

```
int sortKey = 100;

toolBarManagerInterface->AddWidgetToToolBar(
    "o3de.toolBar.identifier", 
    "o3de.widgetAction.identifier", 
    sortKey
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about toolbar item ordering.


# Toolbar area

It is possible to register a MainWindow's toolbar area to the toolbar manager, so that is can be accessed via the toolbar manager APIs.

```
// Retrieve an existing Main Window
QMainWindow* mainWindow;

toolBarManagerInterface->RegisterToolBarArea(
    "o3de.toolBarArea.identifier", 
    mainWindow, 
    Qt::ToolBarArea::TopToolBarArea
);
```

When the toolbar area is registered, external Gems can add new toolbars to the toolbar area via its string identifier.


## Adding toolbars

```
int sortKey = 100;

menuManagerInterface->AddMenuToMenuBar(
    "o3de.toolBarArea.identifier",
    "o3de.toolBar.identifier", 
    100
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about toolbar item ordering.