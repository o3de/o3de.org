---
title: Action Visibility
linktitle: Visibility
description: 
weight: 204
---

The visibility properties of an action determines when actions are displayed in the User Interface as part of a toolbar or a menu based on their active state and assigned Action Context Modes.
These behaviors are dynamic, as in they will be re-evaluated whenever the state of the Editor changes and an action's enabled state is toggled, or the currently active Action Context Mode changes.


## Visibility Setting Values

The Visibility properties of an action can be set to one of three values.


#### AlwaysShow

The Action will always be shown as part of the menus or toolbars it is assigned to.
In case the action's enabled state is set to false, or the action is assigned to action context modes different from the currently active one, the action will be visible but greyed out/inaccessible.


#### OnlyInActiveMode

The Action will only be shown if it was assigned to the currently active Action Context Mode, or to no Action Context Mode.
In case the action's enabled state is set to false, the action will be visible but greyed out/inaccessible.
If the action is assigned to Action Context Modes different from the currently active one, the action will not appear in the menu or toolbar.


#### HideWhenDisabled

The Action will only be shown if it was assigned to the currently active Action Context Mode, or to no Action Context Mode, and its enabled state is set to true.
In case the action's enabled state is set to false, or the action is assigned to Action Context Modes different from the currently active one, the action will not appear in the menu or toolbar.
The action will never be displayed as greyed out/inaccessible.


## Default Values

The default value for visibility properties differ to match the Editor's intended User Experience:

- Menu Visibility is set to HideWhenDisabled by default. The intention is to have menus only display actions that are available in the current situation, and actions should only be displayed as greyed out whenever there is a clear path in the current context to satisfy the requirements that enable that action, or if it improves the discoverability of a workflow.
- ToolBar Visibility is set to OnlyInActiveMode by default. Since they are always displayed, it would be jarring if buttons and widgets in a ToolBar were to shift around whenever the user interacted with elements that change the enabled state of actions, like entity selection. It is instead valuable for actions in a toolbar to be drastically altered whenever the active Action Context Mode is changed.


## Assigning a Visibility property to an action

Visibility properties can be set at Action registration using the `ActionProperties` structure as follows:

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