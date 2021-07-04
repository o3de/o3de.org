---
description: ' Use the O3DE UI 2.0 context menu component to display a popup
  menu with a list of context-appropriate actions. '
title: O3DE UI menu component
---

{{< preview-migrated >}}

A context menu \(also called contextual or pop\-up menu\) appears upon user interaction, such as a right\-click mouse operation. Use a context menu to offer users a limited set of choices that are related to the current state, or context, of the component to which the menu belongs. Typically, the available choices are actions related to the selected object.

![\[component context menu style\]](/images/tools-ui/component-context-menu-style.png)

## Usage guidelines<a name="context-menu-usage"></a>

Follow these guidelines as you design your UI with context menus:

1.  Include only the most commonly used commands that are appropriate in the current context. For example, in the context menu for selected text, it makes sense to include editing commands, but not a save or print command.

1.  Limit the hierarchical depth of context menus to one or two levels. Sub\-menus in context menus can be difficult to navigate without accidentally dismissing the parent menu. If you must include sub\-menus, restrict them to a single level.

1.  Make context menu items available in a menu bar, if available. A context menu is hidden by default and a user might not know it exists, so it shouldn't be the only way to access a command. In particular, avoid using a context menu as the only way to access an advanced feature.

1.  Use a pop\-up button to elevate context menu functionality. You can use a pop\-up button to provide application\-wide context menu functionality in a toolbar. The toolbar of a **Finder** window, for example, includes a pop\-up button that gives users access to the same commands that are displayed in a context menu when control\-clicking the selected item.

1.  Context menus can also be used in the **list view**. Your UI should provide a hint to users that they can use right\-click to show the context menu.

Avoid these design choices when using context menus:
+ Don't set a default item in a context menu. If a user opens the menu and closes it without selecting anything, no action should occur.

## Basic context menu<a name="context-menu-basic"></a>

![\[component context menu basic\]](/images/tools-ui/component-context-menu-basic.png)

Context menus are based on the `QMenu` Qt widget. You can create one in Qt Designer or in your code. You can also modify them in code at runtime.

 **Example**

```
#include <QMenu>

// Create the menu.
QMenu* menu = new QMenu(parent);

// Add some actions.
menu->addAction(QStringLiteral("Load"));
menu->addAction(QStringLiteral("Save"));

// Add an action with a search icon.
menu->addAction(QIcon(QStringLiteral(":/stylesheet/img/search.svg")), QStringLiteral("Search"));

// Add a separator.
menu->addSeparator();

// Add a submenu.
auto submenu = menu->addMenu(QStringLiteral("Submenu"));

// Add some checkable actions in the submenu.
auto appleAction = submenu->addAction(QStringLiteral("Show Apples"));
appleAction->setCheckable(true);
appleAction->setChecked(true);

auto orangeAction = submenu->addAction(QStringLiteral("Show Oranges"));
orangeAction->setCheckable(true);

auto pearAction = submenu->addAction(QStringLiteral("Show Pears"));
pearAction->setCheckable(true);

// Add an action that is disabled.
auto disabledAction = menu->addAction(QStringLiteral("Disabled"));
disabledAction->setEnabled(false);
```

## C++ API reference<a name="context-menu-api-ref"></a>

For details on the **menu** API used for styling of context menus, see the following topic in the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::Menu](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_menu.html)

Relevant Qt documentation includes the following topics:
+  [QMenu Class](https://doc.qt.io/qt-5/qmenu.html)
