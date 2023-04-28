---
linkTitle: HotKeys
title: HotKeys
description:
weight: 104
---

The HotKey Manager system provides interfaces to bind HotKeys to actions so that they can be triggered via keyboard shortcuts in the O3DE Editor UI.


### Assigning a Widget to a Context

To determine which hotkeys are accessible from which part of the Editor, it is possible to assign a widget to an Action Context with the following call:

```
QWidget* widget = new QWidget();

hotKeyManagerInterface->AssignWidgetToActionContext("o3de.context.identifier", widget);
```

Whenever the user inputs a keyboard shortcut, the event will be triggered on the currently focused widget in the Editor; if no shortcuts are defined on that widget, the event will be delivered to the parent of the widget, and up the widget hierarchy until either an action with the corresponding HotKey is found, or the root is reached.

It is possible to assign multiple widgets to the same Action Context. Multiple shortcuts can be triggered with the same key press if multiple actions on the same Action Context were set to the same HotKey.

## Setting an HotKey to an Action

Setting a HotKey to an Action is just a matter of defining which input combination should trigger the action's behavior like so:

```
hotKeyManagerInterface->SetActionHotKey(
    "o3de.action.identifier",
    "Ctrl+N"
);
```

