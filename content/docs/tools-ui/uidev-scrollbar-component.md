---
description: ' Learn about the Lumberyard UI 2.0 customizations to the scrollbar style
  in Lumberyard tools and gems. '
title: Lumberyard UI scrollbar styles
---
# Lumberyard UI scrollbar styles<a name="uidev-scrollbar-component"></a>

Lumberyard provides several style choices for your scrollbars\. With the default style, the scrollbar is always visible\. However, you have the option to set the scrollbar display mode so that it only appears when users hover over the scroll area\.

Additionally, in 1\.26, you can apply a dark style to the scrollbar to make it more visible on light backgrounds\.

The following examples demonstrate how to apply these styles\.

## Scrollbar display modes<a name="scrollbar-display-modes"></a>

![\[component scrollbar display modes\]](/images/tools-ui/component-scrollbar-display-modes.gif)

Use `AzQtComponents::ScrollBar::setDisplayMode` to set the scrollbar display mode\. The default mode is `AlwaysShow`\.

 **Example** 

```
#include <AzQtComponents/Components/Widgets/ScrollBar.h>
#include <QScrollArea>

using namespace AzQtComponents;

// Use a scroll area that was created earlier in your code or .ui file.
QScrollArea* scrollArea;

// Set the scrollbar to appear only when users hover over the scroll area.
ScrollBar::setDisplayMode(scrollArea, ScrollBar::ScrollBarMode::ShowOnHover);

// Set it back to default so that it always appears.
ScrollBar::setDisplayMode(scrollArea, ScrollBar::ScrollBarMode::AlwaysShow);
```

## Scrollbar with dark style<a name="scrollbar-dark-style"></a>

Use `AzQtComponents::ScrollBar::applyDarkStyle` to make the scrollbar more visible on light backgrounds\.

 `ScrollBar::applyLightStyle` reverts the scrollbar back to the default style\.

 **Example** 

```
#include <AzQtComponents/Components/Widgets/ScrollBar.h>
#include <QScrollArea>

// Use a scroll area that was created earlier in your code or .ui file.
QScrollArea* scrollArea;

// Set the scrollbar style to dark, to make the scrollbar more visible on light backgrounds.
AzQtComponents::ScrollBar::applyDarkStyle(scrollArea);

// Revert the scrollbar style back to the default light style.
AzQtComponents::ScrollBar::applyLightStyle(scrollArea);
```

## C\+\+ API reference<a name="scrollbar-api-ref"></a>

For details on the **scrollbar** API, see the following topic in the [Lumberyard UI Extensions C\+\+ API Reference](https://d3bqhfbip4ze4a.cloudfront.net/api/ui/namespace_az_qt_components.html):
+  [AzQtComponents::ScrollBar](https://d3bqhfbip4ze4a.cloudfront.net/api/ui/class_az_qt_components_1_1_scroll_bar.html) 

Relevant Qt documentation includes the following topics:
+  [QScrollArea Class](https://doc.qt.io/qt-5/qscrollarea.html) 
