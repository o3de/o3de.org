---
linkTitle: Menus
title: Menus
description: An overview of the Action Manager Menu API.
weight: 102
---

The menu manager system provides interfaces to register and extend menus for use in the Open 3D Engine (O3DE) Editor UI.


## Registration

A new menu can be registered by providing its string identifier.

The menu properties structure can also specify additional information:

* A **name** string, which is meant to be a human-readable description to show in UI;


```
AzToolsFramework::MenuProperties menuProperties;
menuProperties.m_name = "Menu Name";

menuManagerInterface->RegisterMenu(
    "o3de.menu.identifier",
    menuProperties
);
```


## Displaying the menu

When a menu is registered, it is possible to display it in the interface.

```
// Display a menu at a specific screen position.
menuManagerInternalInterface->DisplayMenuAtScreenPosition("o3de.menu.identifier", screenPosition);

// Display a menu under the cursor.
menuManagerInternalInterface->DisplayMenuUnderCursor("o3de.menu.identifier");
```


## Adding actions

It is possible to add actions to a menu via this API call:

```
int sortKey = 100;

menuManagerInterface->AddActionToMenu(
    "o3de.menu.identifier",
    "o3de.action.identifier", 
    sortKey 
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about menu item ordering.


## Adding separators

To divide a menu into sections, it is possible to add separators.

```
int sortKey = 100;

menuManagerInterface->AddSeparatorToMenu(
    "o3de.menu.identifier",
    sortKey 
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about menu item ordering.

If multiple separators are added one after the other in order, or at the beginning or end of the menu, they may be collapsed into one or not displayed at all (default Qt behavior).


## Adding sub-menus

It is possible to add existing menus as sub-menus via the following API call.

```
int sortKey = 100;

menuManagerInterface->AddSubMenuToMenu(
    "o3de.menu.identifier",
    "o3de.subMenu.identifier",
    sortKey 
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about menu item ordering.

Note that the function call will fail if a user tries to add a menu to itself, or if the operation would cause the creating of a circular dependency that could stall the Editor.


## Adding widget actions

Widgets can also be added to menus as follows:

```
int sortKey = 100;

menuManagerInterface->AddWidgetToMenu(
    "o3de.menu.identifier", 
    "o3de.widgetAction.identifier", 
    sortKey
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about menu item ordering.


# Menu bar

It is possible to register a MainWindow's menu bar region to the Menu Manager, so that is can be accessed via the Menu Manager APIs.

```
// Retrieve an existing Main Window
QMainWindow* mainWindow;

menuManagerInterface->RegisterMenuBar(
    "o3de.menuBar.identifier", 
    mainWindow
);
```

When the menu bar is registered, external Gems can add new menus to the menu bar via the string identifier.


## Adding menus

Adding menus to a menu bar works the same as adding sub-menus to menus.

```
int sortKey = 100;

menuManagerInterface->AddMenuToMenuBar(
    "o3de.menuBar.identifier",
    "o3de.menu.identifier", 
    100
);
```

See the [Sort Keys](/docs/user-guide/action-manager/fundamentals/architecture/sort-keys/) section for more information about menu item ordering.
