---
linktitle: Progress Indicators
title: O3DE UI Progress Indicators
description: Learn about the O3DE UI progress indicators, including the spinner and progress bar components.
toc: true
---

Use progress and status indicators to communicate to users that the O3DE application is working on a process, and what the result of that process is when it's finished. Indicators should be employed when there's a chance the user could be left wondering whether or not a process is working or hung.

![\[component progress indicators style\]](/images/tools-ui/component-progress-indicators-style.png)

## Usage guidelines<a name="progress-indicators-usage"></a>

Follow these guidelines as you design your UI with progress indicators:

1.  Display progress when a latency of 3 milliseconds or more is expected.

1.  Consider context and flow when determining where and when to show progress.

1.  Progress indicators are animated to reinforce that an activity is occurring.

**Note**
See additional usage guidelines in the following sections, which apply to specific types of progress indicators.

Avoid these design choices when using progress indicators:
+ Don't use more than one progress indicator at a time.

## Basic progress bar<a name="progress-bar-basic"></a>

![\[component progress bar determinate\]](/images/tools-ui/component-progress-bar-determinate.png)

Display determinate progress as a linear progress bar, to show a process or a task that has a definite start and end. In this scenario, the system is aware of how many steps are taken, and a likelihood of time for completion.

In the case where a system is malfunctioning, or doesn't have either of these data points, consider using a spinner.

Additional usage guidelines for progress bars include the following:

1.  If possible, use text to clearly display to the user that the system is working. For particularly long processes, consider using a combination of text to indicate where they are in the process, as shown in the previous image.

1.  When available, display a numeric count under the progress bar, too.

1.  For progress bars in a dialog, provide a single button to cancel the process.

The following example demonstrates the initialization of a simple progress bar. Refer to the Qt documentation on [QProgressBar](https://doc.qt.io/qt-5/qprogressbar.html) to learn additional features.

 **Example**

```
#include <QProgressBar>

// Create the progress bar.
QProgressBar* progressBar = new QProgressBar(parent);

// Set the numeric range of the bar.
progressBar->setRange(0, 36);

// Set the current progress value.
progressBar->setValue(12);

// Hide the progress text, as specified by the UX spec. It defaults to on, so it should be turned off.
progressBar->setTextVisible(false);
// Note that it can also be set from the .ui file, or from Qt Designer or Creator.
```

## Basic progress spinner<a name="progress-spinner-basic"></a>

![\[component progress spinner basic\]](/images/tools-ui/component-progress-spinner-basic.gif)

Use spinners when it's unclear when the process will finish.

Additional usage guidelines for spinners include the following:

1.  Display spinners in the context of windows, panels, lists, or inline with other elements.

 **Example**

```
#include <AzQtComponents/Components/StyledBusyLabel.h>

// Create the spinner.
AzQtComponents::StyledBusyLabel* spinner = new AzQtComponents::StyledBusyLabel(parent);

// Set the spinner icon size.
spinner->SetBusyIconSize(18);

// Start the spinner.
spinner->SetIsBusy(true);
```

## C++ API reference<a name="progress-indicators-api-ref"></a>

For details on the **progress indicator** API's, see the following topics in the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::ProgressBar](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_progress_bar.html)
+  [AzQtComponents::StyledBusyLabel](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_styled_busy_label.html) (spinner)

Relevant Qt documentation includes the following topics:
+  [QProgressBar](https://doc.qt.io/qt-5/qprogressbar.html)
