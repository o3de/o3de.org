---
title: Action Visibility
linktitle: Visibility
description: An overview of the visibility properties for actions in the Open 3D Engine (O3DE) Action Manager.
weight: 204
---

The visibility properties of an action determines when actions are displayed in the UI as part of a toolbar or a menu based on their active state and assigned action context modes.
These behaviors are dynamic, as in they will be re-evaluated whenever the state of the Editor changes and an action's enabled state is toggled, or the currently active action context mode changes.


## Visibility setting values

The visibility properties of an action can be set to one of three values.


#### `AlwaysShow`

The action always shows as part of the menus or toolbars it is assigned to.
In case the action's enabled state is set to false, or the action is assigned to action context modes different from the currently active one, the action will be visible but greyed out and inaccessible.


#### `OnlyInActiveMode`

The action only shows if it was assigned to the currently active action context mode, or to no action context mode.
In case the action's enabled state is set to false, the action is visible but greyed out and inaccessible.
If the action is assigned to action context modes that are different from the currently active one, the action will not appear in the menu or toolbar.


#### `HideWhenDisabled`

The action only shows if it was assigned to the currently active action context mode, or to no action context mode, and its enabled state is set to true.
In case the action's enabled state is set to false, or the action is assigned to action context modes that are different from the currently active one, the action will not appear in the menu or toolbar.
The action is never displayed as greyed out and inaccessible.


## Default Values

The default value for visibility properties differ to match the Editor's intended user experience:

- Menu visibility is set to `HideWhenDisabled` by default. The intention is to have menus only display actions that are available in the current situation, and actions should only be displayed as greyed out whenever there is a clear path in the current situation to satisfy the requirements that enable that action, or if it improves the discoverability of a workflow.
- ToolBar visibility is set to `OnlyInActiveMode` by default. Since they are always displayed, it would be jarring if buttons and widgets in a ToolBar were to shift around whenever the user interacted with elements that change the enabled state of actions, like entity selection. It is instead valuable for actions in a toolbar to be drastically altered whenever the active action context mode is changed.


## Assigning a visibility property to an action

Visibility properties can be set at action registration using the `ActionProperties` structure as follows:

```
AzToolsFramework::ActionProperties actionProperties;
actionProperties.m_menuVisibility = AzToolsFramework::ActionVisibility::AlwaysShow;
actionProperties.m_toolBarVisibility = AzToolsFramework::ActionVisibility::AlwaysShow;

m_actionManagerInterface->RegisterAction(
    "o3de.context.identifier",
    "o3de.action.identifier",
    actionProperties,
    []() {}
);
```