---
linkTitle: Hotkeys
title: Hotkeys
description: An overview of the Action Manager HotKey API.
weight: 104
---

The hotkey manager system provides interfaces to bind hotkeys to actions so that they can be triggered via keyboard shortcuts in the Open 3D Engine (O3DE) Editor UI.


## Assigning a widget to a context

To determine which hotkeys are accessible from which part of the Editor, it is possible to assign a widget to an action context with the following call:

```
QWidget* widget = new QWidget();

hotKeyManagerInterface->AssignWidgetToActionContext("o3de.context.identifier", widget);
```

Whenever the user inputs a keyboard shortcut, the event will be triggered on the currently focused widget in the Editor; if no shortcuts are defined on that widget, the event will be delivered to the parent of the widget, and up the widget hierarchy until either an action with the corresponding HotKey is found, or the root is reached.

It is possible to assign multiple widgets to the same Action Context. Multiple shortcuts can be triggered with the same key press if multiple actions on the same Action Context were set to the same HotKey.

## Setting an hotkey to an action

Setting a hotkey to an action is a matter of defining which input combination triggers the action's behavior like so:

```
hotKeyManagerInterface->SetActionHotKey(
    "o3de.action.identifier",
    "Ctrl+N"
);
```

