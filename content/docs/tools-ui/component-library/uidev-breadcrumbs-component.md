---
description: ' Use the O3DE UI 2.0 breadcrumbs component as a navigational tool
  to show users where they are along a hierarchical path. Breadcrumbs also enable
  users to jump to a different point in the path. '
title: O3DE UI breadcrumb navigation component
---

{{< preview-migrated >}}

Use the breadcrumbs component to enable users to track their position along a hierarchical path\. Breadcrumbs include a path from the home page to the user's current location\. The points in the breadcrumbs refer to a directory or node\. Users can easily move positions in the path by selecting one of the breadcrumbs\.

For an example of the "breadcrumb" concept, see the **Anim Graph** navigation in the O3DE **Animation Editor**\.

![\[component breadcrumbs navigation example\]](/images/tools-ui/component-breadcrumbs-navigation-example.gif)

In an **Anim Graph** breadcrumb, the graph's name is displayed as the top level of navigation\. Each node that you open appears as a clickable hyperlink\.

## Anatomy of the breadcrumbs widget<a name="breadcrumbs-anatomy"></a>

Breadcrumbs have several customization options\. The standard, horizontal layout includes the following features:

![\[component breadcrumbs anatomy\]](/images/tools-ui/component-breadcrumbs-anatomy.png)

1.  **Path history navigation**

   \(Optional\) Enable users to navigate backwards and forwards in their history of breadcrumb paths selections\. For example, if you browse to, or choose, a new path in the list, then choose the **back** button, you will navigate back to the previous breadcrumb position\.

1.  **Breadcrumb trail**

   Shows the full path from root to tail\. Users can select any point in the path to set a new path\. Previously selected paths are automatically added to the navigational history\.

1.  **Browse button**

   \(Optional\) Technically not part of the breadcrumb\. The browse button is often useful because it enables a user to select a completely new path, instead of choosing a different point in the current path\. You push the new path to your breadcrumbs widget in your browse button handler code\.
![\[component breadcrumbs truncation menu\]](/images/tools-ui/component-breadcrumbs-truncation-menu.png)

1.  **Truncation menu**

   If the entire breadcrumb path cannot fit in the allotted space, the points on the path that don't fit are stacked in a dropdown menu\. Users can select these points from the truncation menu\.

## Basic breadcrumb<a name="breadcrumbs-basic"></a>

![\[component breadcrumbs basic\]](/images/tools-ui/component-breadcrumbs-basic.png)

The simplest breadcrumb example includes the **breadcrumbs** widget and an optional, initial path\. Your code can react to path changes by connecting to the `pathChanged` signal\. Alternatively, you can call `pushPath` to set the breadcrumb state to match the current state of your project\.

When passing a path QString into `pushPath`, use either forward slash \('/'\) or backward slash \('\\\\'\) as a path separator\.

 **Example**

```
#include <AzQtComponents/Components/Widgets/BreadCrumbs.h>

// Create a new breadcrumbs widget.
AzQtComponents::BreadCrumbs* breadCrumbs = new AzQtComponents::BreadCrumbs(parent);

// (Optional) Set the initial path.
QString initialPath = "C:/Documents/SubDirectory1/Subdirectory2/SubDirectory3";
breadCrumbs->pushPath(initialPath);

// Add the widget to a previously defined QHBoxLayout.
layout->addWidget(breadCrumbs);

// Listen for path changes.
connect(breadCrumbs, &AzQtComponents::BreadCrumbs::pathChanged, this, [](const QString& newPath) {
    // Handle path change as needed by your project.
});

// Add breadcrumbs to a UI layout as needed.
```

## Breadcrumb with path navigation and browse<a name="breadcrumbs-navigation-and-browse"></a>

![\[component breadcrumbs navigation and browse\]](/images/tools-ui/component-breadcrumbs-navigation-and-browse.png)

In some scenarios, it's useful for users to be able to navigate back and forth in their navigation history\. In addition, you might want to offer a browse button to select a new path\.

In the following example, `createBackForwardToolBar` provides the forward and backward navigation arrows, and a `NavigationButton::Browse` from AzQtComponents provides a file browser button\.

 **Example**

```
#include <AzQtComponents/Components/Widgets/BreadCrumbs.h>
#include <QFileDialog>

// Create a new breadcrumbs widget.
AzQtComponents::BreadCrumbs* breadCrumbs = new AzQtComponents::BreadCrumbs(parent);

// (Optional) Set the initial path.
QString initialPath = "C:/Documents/SubDirectory1/Subdirectory2/SubDirectory3";
breadCrumbs->pushPath(initialPath);

// Create the browse button widget.
auto browseButton = breadCrumbs->createButton(AzQtComponents::NavigationButton::Browse);

// Add the widgets to a previously defined QHBoxLayout.
layout->addWidget(breadCrumbs->createBackForwardToolBar());
layout->addWidget(breadCrumbs->createSeparator());
layout->addWidget(breadCrumbs);
layout->addWidget(breadCrumbs->createSeparator());
layout->addWidget(browseButton);

// Update the breadcrumb path from the output of the browse button.
connect(browseButton, &QPushButton::pressed, breadCrumbs, [breadCrumbs] {
    QString newPath = QFileDialog::getExistingDirectory(breadCrumbs, "Select a new path");
    if (!newPath.isEmpty())
    {
        breadCrumbs->pushPath(newPath);
    }
});

// Listen for path changes.
connect(breadCrumbs, &AzQtComponents::BreadCrumbs::pathChanged, this, [](const QString& newPath) {
    // Handle path change as needed by your project.
});

// Add the breadcrumbs to a UI layout as needed.
```

## C\+\+ API reference<a name="breadcrumbs-api-ref"></a>

For details on the **breadcrumbs** API, see the following topic in the [O3DE UI Extensions C\+\+ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::BreadCrumbs](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_bread_crumbs.html)
