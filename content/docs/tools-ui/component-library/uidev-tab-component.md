---
linktitle: Tab
title: O3DE UI Tab Component
description: Learn how to use the O3DE UI tab widget component to create tabs and tab action bars in O3DE tools and Gems.
toc: true
---

Use tabs to enable users to organize content at a high level, such as switching between views, data sets, or functional aspects of an application.

Tabs are also used in the widget headers. When there is more than one widget docked together, the widget headers are shown as tabs. Users can drag the tab/widget header to move it around and dock it elsewhere.

![component tab style](/images/tools-ui/component-tab-style.png)

A tab can also display an action toolbar, where action buttons can be added and removed as needed.

![component tab action bar](/images/tools-ui/component-tab-action-bar.png)

## Usage guidelines<a name="tab-usage"></a>

Follow these guidelines as you design your UI with tabs:

1.  Present tabs as a single row above their associated content.

1.  Tab labels should succinctly describe the content within.

## Basic tab<a name="tab-basic"></a>

![component tab basic](/images/tools-ui/component-tab-basic.png)

Create a simple tab widget with movable, closeable tabs and an action in the action toolbar.

Note that you can also customize the tab action toolbar using the `AzQtComponents::TabWidgetActionToolBar` class. To do this, you will need to include `AzQtComponents/Components/Widgets/TabWidgetActionToolBar.h`. You can add your customized toolbar using the tab widget's `setActionToolBar()` function.

 **Example**

```
#include <AzQtComponents/Components/Widgets/TabWidget.h>
#include <QAction>

// Create the tab widget.
AzQtComponents::TabWidget* tabWidget = new AzQtComponents::TabWidget(parent);

// Add tabs to the tab widget.
QWidget* tabA = new QWidget();
QWidget* tabB = new QWidget();

tabWidget->addTab(tabA, "Tab A");
tabWidget->addTab(tabB, "Tab B");

// Make the tabs movable.
tabWidget->setMovable(true);

// Make the tabs closeable.
tabWidget->setTabsClosable(true);

// For the tabs to close, TabCloseRequested signal must be connected.
connect(tabWidget, &QTabWidget::tabCloseRequested, tabWidget, &QTabWidget::removeTab);

// Make the action toolbar visible.
tabWidget->setActionToolBarVisible();

// Create an action for the action toolbar and add it to the tab widget.
QAction* action1 = new QAction(QIcon(":/stylesheet/img/table_error.png"), "Action 1", parent);
tabWidget->addAction(action1);

// NOTE: To perform an action when the action button is pressed, you will also need to connect the QAction::triggered signal.
```

## C++ API reference<a name="tab-api-ref"></a>

For details on the **tab** API's, see the following topics in the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::TabWidget](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_tab_widget.html)
+  [AzQtComponents::TabWidgetActionToolBar](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_tab_widget_action_tool_bar.html)

Relevant Qt documentation includes the following topics:
+  [QTabBar Class](https://doc.qt.io/qt-5/qtabbar.html)
+  [QTabWidget Class](https://doc.qt.io/qt-5/qtabwidget.html)
