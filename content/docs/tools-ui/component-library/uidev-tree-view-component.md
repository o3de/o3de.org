---
linktitle: Tree View
title: O3DE UI Tree View Component
description: Learn how to use the O3DE UI tree view component to give users a file or list navigation interface in O3DE tools and Gems.
toc: true
---

{{< preview-migrated >}}

With the **tree view** component, users can navigate file system directories or a list of hierarchical data in O3DE. Each item, such as a node or a branch, can have sub-items. Items can be expanded to reveal sub-items.

The **tree view** component is often used in the following scenarios:
+ Show system or predefined contents, such as the settings in Inspector or system settings page.
+ Show user created contents, such as in File Directory or Outliner.

Example from O3DE **Asset Browser**:

![\[component tree view example\]](/images/tools-ui/component-tree-view-example.png)

## Usage guidelines<a name="tree-view-usage"></a>

Follow these guidelines as you design your UI with tree views:

1.  When the tree hierarchy is anticipated to be deep, such as a tree view used in file directories, it is suggested to add a file path to help users know where they are in the path.

## Basic tree view<a name="tree-view-basic"></a>

![\[component tree view basic\]](/images/tools-ui/component-tree-view-basic.png)

Create a simple tree view, with support for showing branch lines.

 **Example**

```
#include <AzQtComponents/Components/Widgets/TreeView.h>
#include <QTreeView>

// Create the tree view.
auto treeView = new QTreeView(parent);

// Set the model on the tree.
treeView->setModel(new MyModel);

// Set a BranchDelegate to support branch lines in your tree view.
treeView->setItemDelegate(new AzQtComponents::BranchDelegate());

// Show the connecting branch lines.
AzQtComponents::TreeView::setBranchLinesEnabled(treeView, true);
```

## C++ API reference<a name="tree-view-api-ref"></a>

For details on the **tree view** API, see the following topic in the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::TreeView](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_tree_view.html)

Relevant Qt documentation includes the following topics:
+  [QTreeView Class](https://doc.qt.io/qt-5/qtreeview.html)
+  [QAbstractListModel Class](https://doc.qt.io/qt-5/qabstractlistmodel.html)
