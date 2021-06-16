---
description: ' Learn how to use O3DE UI 2.0 checkboxes in O3DE gems and
  tools. '
title: O3DE UI checkbox component
---

{{< preview-migrated >}}

Use checkboxes to enable users to select from a list of choices, when users can select any number of choices \(including zero, one, or several\)\. Each checkbox is independent of all other checkboxes in the list, so checking one box doesn't uncheck the others\.

![\[component checkbox style\]](/images/tools-ui/component-checkbox-style.png)

## Usage guidelines<a name="checkbox-usage"></a>

Follow these guidelines as you design your UI with checkboxes:

1.  Each checkbox should have a clear yes/no state for its choice\.

1.  Default a checkbox to "checked" only when there is clear reason to believe that a user will expect that, or when it reflects the user's current state\.

1.  Ensure that clicking or tapping the label selects the checkbox\.

1.  When using checkboxes in tree views, the partial selected states should be included\.

Avoid these design choices when using checkboxes:
+ Don't order checkboxes horizontally\.
+ Don't trigger an event upon selection of a radio button, such as spawning a popover, popup, new page, or new window\.

## Basic checkbox<a name="checkbox-basic"></a>

![\[component checkbox basic\]](/images/tools-ui/component-checkbox-basic.png)

Set up and control checkboxes in Qt Designer or in code\.

Note that to set the "partially checked" state in tri\-state checkboxes, you must use code\.

 **Example**

```
#include <QCheckBox>

QCheckBox* checkBox = new QCheckBox(parent);

// To set a checkBox to checked, do one of the following:
checkBox->setCheckState(Qt::Checked);
checkBox->setChecked(true);

// To set a checkbox to unchecked, do one of the following:
checkBox->setCheckState(Qt::Unchecked);
checkBox->setChecked(false);

// To turn a checkBox into a tri-state checkbox, so it can be on, off, or partial:
checkBox->setTristate(true);

// To set a checkBox to partially on:
checkBox->setCheckState(Qt::PartiallyChecked);

// To disable the checkBox:
checkBox->setEnabled(false);
```

## C\+\+ API reference<a name="checkbox-api-ref"></a>

For details on the **checkbox** API, see the following topic in the [O3DE UI Extensions C\+\+ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::CheckBox](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_check_box.html)

Relevant Qt documentation includes the following topics:
+  [QCheckBox Class](https://doc.qt.io/qt-5/qcheckbox.html)

## Related links<a name="checkbox-related-links"></a>

For additional information related to the **checkbox** component, see the following topics:
+  [Toggle switch](uidev-toggle-switch-component.md)
