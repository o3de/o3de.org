---
description: ' Learn how to apply the O3DE UI 2.0 toggle switch style to a checkbox
  component in O3DE gems and tools. '
title: O3DE UI toggle switch component
---

{{< preview-migrated >}}

Use a toggle switch to enable users to quickly switch between two states with a minimum of effort. The state will be clearly reflected back to them and persisted across sessions.

![\[component toggle switch style\]](/images/tools-ui/component-toggle-switch-style.png)

## Usage guidelines<a name="toggle-switch-usage"></a>

Follow these guidelines as you design your UI with toggle switches:

1.  Use the toggle switch when your widget has two binary states, for example: "on/off" or "yes/no". There should be no ambiguity about potential states.

1.  Always use the active state of the toggle switch for the affirmative state. Affirmative states are those such as "on", "yes", or "active". Consistency here will help customers better understand at a glance the state of a setting.

1.  Even if the active state always means "on", clearly indicate the consequences of the switch.

Avoid these design choices when using toggle switches:
+ Don't use when the options presented to the user are not binary. For example, if a mail setting has IMAP and POP as the two mail retrieval options, use a radio group instead. In this example there are actually four states - IMAP on, IMAP off, POP on, and POP off.
+ Don't use if the state does not persist or get serialized across sessions. For example, don't use for search filters, since filters are reset each time a user performs a new search.

## Basic toggle switch<a name="toggle-switch-basic"></a>

![\[component toggle switch basic\]](/images/tools-ui/component-toggle-switch-basic.png)

Toggle switches are implemented using the **QCheckBox** Qt class. The toggle switch style is then applied using the static function, `AzQtComponents::CheckBox::applyToggleSwitchStyle()`.

 **Example**

```
#include <AzQtComponents/Components/Widgets/CheckBox.h>
#include <QCheckBox>

// Apply the toggle switch style to a QCheckBox.
QCheckBox* toggleSwitch = new QCheckBox(parent);
AzQtComponents::CheckBox::applyToggleSwitchStyle(toggleSwitch);

// To set the switch to the "on" state:
toggleSwitch->setChecked(true);

// To set the switch to the "off" state:
toggleSwitch->setChecked(false);

// To disable the toggle switch:
toggleSwitch->setEnabled(false);
```

## C++ API reference<a name="toggle-switch-api-ref"></a>

For details on the **checkbox** API used to style a toggle switch, see the following topic in the [O3DE UI Extensions C++ API Reference](/docs/api/frameworks/azqtcomponents/namespace_az_qt_components.html):
+  [AzQtComponents::CheckBox](/docs/api/frameworks/azqtcomponents/class_az_qt_components_1_1_check_box.html)

Relevant Qt documentation includes the following topics:
+  [QCheckBox Class](https://doc.qt.io/qt-5/qcheckbox.html)

## Related links<a name="checkbox-related-links"></a>

For additional information related to the **toggle switch** component, see the following topics:
+  [Checkbox](uidev-checkbox-component.md)
