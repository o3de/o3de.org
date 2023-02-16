---
linkTitle: Menus
title: Menus
description:
weight: 102
---

## Menu

The Menu Manager system provides interfaces to register and extend menus for use in the O3DE Editor UI.


### Registration

A new menu can be registered by just providing its string identifier.

```

AzToolsFramework::MenuProperties menuProperties;
menuProperties.m_name = "Menu Name";

menuManagerInterface->RegisterMenu(
    "o3de.menu.identifier",
    menuProperties
);

```

The menu properties structure can also specify additional information:

* A **name** string, which is meant to be a human-readable description to show in UI (currently unused);


### Displaying the Menu

Once a menu is registered, it is possible to retrieve their `QMenu*` and display them in the interface.

```

menuManagerInternalInterface->GetMenu("o3de.menu.identifier");

// Show the menu at position
QPoint position;
menu.exec(position);

```

Note that the Menu Manager system will automatically clear and re-populate the menu whenever an action is added to it, or the enabled state of the actions added to the menus changes. As such, the `QMenu*` should only be used to display the menu and not to edit its structure since any change will be lost at the next update.


### Adding Actions

It is possible to add actions to a menu via this API call:

```

int sortKey = 100;

menuManagerInterface->AddActionToMenu(
    "o3de.menu.identifier",
    "o3de.action.identifier", 
    sortKey 
);

```

See the Sort Keys section for more information about menu item ordering.


### Adding Separators

To divide a menu into sections, it is possible to add separators.

```

int sortKey = 100;

menuManagerInterface->AddSeparatorToMenu(
    "o3de.menu.identifier",
    sortKey 
);

```

See the Sort Keys section for more information about menu item ordering.

If multiple separators are added one after the other in order, or at the beginning or end of the menu, they may be collapsed into one or just not displayed at all (default Qt behavior).


### Adding Sub-Menus

It is possible to add existing menus as sub-menus via the following API call.

```

int sortKey = 100;

menuManagerInterface->AddSubMenuToMenu(
    "o3de.menu.identifier",
    "o3de.subMenu.identifier",
    sortKey 
);

```

See the Sort Keys section for more information about menu item ordering.

Note that the function call will fail if a user tries to add a menu to itself, or if the operation would cause the creating of a circular dependency that could stall the Editor.


### Adding Widget Actions

Widgets can also be added to menus as follows:

```

int sortKey = 100;

menuManagerInterface->AddWidgetToMenu(
    "o3de.menu.identifier", 
    "o3de.widgetAction.identifier", 
    sortKey
);

```

See the Sort Keys section for more information about menu item ordering.


## Menu Bar

It is possible to register a MainWindow's menu bar region to the Menu Manager, so that is can be accessed via the Menu Manager APIs.

```

// Retrieve an existing Main Window
QMainWindow* mainWindow;

menuManagerInterface->RegisterMenuBar(
    "o3de.menuBar.identifier", 
    mainWindow
);

```

Once the menu bar is registered, external Gems can add new menus to the menu bar via the string identifier.


### Adding Menus

Adding menus to a menu bar works the same as adding sub-menus to menus.

```

int sortKey = 100;

menuManagerInterface->AddMenuToMenuBar(
    "o3de.menuBar.identifier",
    "o3de.menu.identifier", 
    100
);
    
```

See the Sort Keys section for more information about menu item ordering.
