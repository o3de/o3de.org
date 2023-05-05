---
title: Actions
linkTitle: Actions
description: Actions are an element of the Action Manager that allow users to register and trigger editor behaviors in Open 3D Engine (O3DE).
weight: 101
---

The [Action Manager](/docs/user-guide/action-manager) system provides interfaces to register actions and related frameworks to interact with the **Open 3D Engine (O3DE)** Editor.


## Action context

An action context is an object that owns a collection of actions.

An action context is comprised of:

* A string **identifier** that makes it possible to reference it in API calls;
* A **name** string, which is a human-readable description to show in UI;


### Registration

It is possible to register a new action context via the following API call:

```
AzToolsFramework::ActionContextProperties contextProperties;
contextProperties.m_name = "Test Action Context";

actionManagerInterface->RegisterActionContext(
    "o3de.context.identifier", 
    contextProperties
);
    
```

### Associating widgets

The purpose of action contexts is to bind the group of actions it owns to a widget in the Editor so that they can be accessed via keyboard shortcuts contextually to what part of the Editor the user is interacting with.
See the [Hotkeys](./hotkeys) page for more information.


## Action

An action is an abstraction of a re-usable Editor interaction. It is not accessible upon creation, but becomes available to the user once it's added to a menu or toolbar, or if a hotkey is assigned to it.

An action is comprised of

* A string **identifier** that makes it possible to reference it in API calls;
* A string **context identifier** that defines the action context that owns this action;
* A behavior in the form of a function to be called whenever the action is triggered.


### Registration

An action can be registered via the following API call:

```
actionManagerInterface->RegisterAction(
    "o3de.context.identifier",
    "o3de.action.identifier",
    {},
    []
    {
        /* Trigger Behavior */
    }
);
```

The behavior can either be provided as a lambda or a function reference.

Additional descriptors and decorators can be added as action properties:

* A **name** string, which succinctly describes the effect of the action and is used in UI like menus or toolbars;
* A **description** string, which can be used to provide additional information to the user, usually shown in a tooltip when hovering over the action in a UI;
* A **category** string, which is meant to be used to categorize similar strings in the UI;
* An **icon path** pointing to an svg image that will be used to represent the action in menus and toolbars. It needs to be a Qt path for an svg file defined in a qrc resource file.

```
AzToolsFramework::ActionProperties actionProperties;
actionProperties.m_name = "Action Name";
actionProperties.m_description = "A longer description of what the action does.";
actionProperties.m_category = "Category";
actionProperties.m_iconPath = ":Path/to/icon.svg";

actionManagerInterface->RegisterAction(
    "o3de.context.identifier",
    "o3de.action.identifier",
    actionProperties,
    []
    {
        /* Trigger Behavior */
    }
);
```


### Enabled state callbacks

An action’s enabled state can be changed based on the state of the Editor; for example, some actions may only be enabled when the entity selection is not empty.

To do that, it is possible to install an enabled state callback on actions which will return what the enabled state should be based on an arbitrary criteria.

```
actionManagerInterface->InstallEnabledStateCallback(
    "o3de.action.identifier",
    []() -> bool
    {
        bool enabledState = true;
        return enabledState;
    }
);    
```

When an enabled state callback is installed, the enabled state of the action is recomputed and set automatically.
Note that the state of actions won’t be updated periodically, and there needs to be a mechanism to update the action whenever the criteria used in the callback may have changed its result. Check the Updating Actions section for more information.

It is possible to install multiple enabled state callbacks on an action. When that happens, the result of all callbacks will be computed and resolved as an AND chain, meaning that the action will only be enabled if all callbacks return true.

Also note, the action may get deactivated from the action context mode system even if it’s deemed enabled after computing the callbacks. For more information, refer to the [action context mode switching](/docs/user-guide/action-manager/fundamentals/concepts/actions/#action-context-mode-switching) section.


### Checkable actions

Actions that implement a toggle for Editor behavior can be registered as checkable actions. These will make use of the QAction’s `checked` state to visualize the state of the underlying feature to the user in the UI.

{{< note >}}
The value of the checkable action can be queried and updated, but not set directly. Use checkable actions to visualize an underlying setting, not to store or query its value.
{{< /note >}}

To register a checkable action, a separate registration call is provided:

```
actionManagerInterface->RegisterCheckableAction(
    "o3de.context.identifier",
    "o3de.action.identifier",
    {},
    []
    {
        /* Trigger Behavior */
    },
    []() -> bool
    {
        /* Checked State Callback */
        bool checkedState = true;
        return checkedState;
    }
);
```

The checked state callback will automatically be called on registration, and the returned value will be used to set the checked state. To refresh the value over time, refer to the [Updating Actions](#updating-actions) section.

A checkable action's state is visualized in different ways based on the UI element it appears in:
- If added to a menu, a checked checkable action will display a small checkmark to the left of the action's name;
- If added to a toolbar, a checked checkable action's icon will be surrounded by a rectangle to signify its active/checked state.


### Visibility

The `ActionProperties` structure includes settings to provide visibility behavior with a per-action granularity.

* `m_menuVisibility` can be used to determine whether the action is displayed in menus;
* `m_toolBarVisibility` can be used to determine whether the action is displayed in toolbars.

For more information, refer to [Action Visibility](/docs/user-guide/action-manager/fundamentals/architecture/visibility/).


## Updating actions

An action has two states that need to be kept up to date: the enabled state, which determines whether the action can be triggered, and the checked state, which is used in UI to visualize the state of an internal setting. As described earlier, both of these states are driven by the corresponding callbacks attached to the action; nonetheless, to optimize performance, the system does not refresh the state of the actions automatically . Instead, it relies on the owning system to keep its actions up to date whenever an event that could potentially trigger either state to change.

To streamline operations but still allow for more customized solutions, the architecture provides two different ways of refreshing actions when needed.


### Action updaters

As the Action Manager architecture is built to support modularity and extensibility, it strives to allow Gems to easily hook onto Editor-defined events to drive the state of their custom actions without having to directly include their definitions or repeat a lot of boilerplate code.

Action updaters were devised to help achieve this. An action updater is essentially a list of action identifiers grouped under a label, the updater identifier. A system that implements an event that will trigger UI changes to actions can define an action updater with the following API call:

```
actionManagerInterface->RegisterActionUpdater("o3de.updater.identifier");
```

Whenever the event fires, the system then has to trigger the updater:

```
actionManagerInterface->TriggerActionUpdater("o3de.updater.identifier");
```

When that is set, any system can opt-in their actions to be added to the updater with the following call:

```
actionManagerInterface->AddActionToUpdater(
    "o3de.updater.identifier", "o3de.action.identifier");
```

This way, whenever the event fires, all actions that were added to the updater will be refreshed.
Actions can be added to as many updaters as needed with no limitation.

{{< note >}}
The system that registers an updater must also trigger it when appropriate.
{{< /note >}}


### Manual updates

In very specific cases, it may be necessary to trigger an update for a single action manually. This is not the recommended implementation, as it hinders extensibility, but may be helpful in specific cases especially when working with legacy code.

```
actionManagerInterface->UpdateAction("o3de.action.identifier");
```

## Action context mode switching

The O3DE Editor is a complex tool that supports multiple workflows; these sometimes require a set of actions to be enabled or disabled in bulk as some interactions become unsupported.

To streamline this process, the Action Manager architecture integrated a mechanism called Action Context Modes.

### Register a new mode

It is possible to register a new mode to an action context as follows:

```
actionManagerInterface->RegisterActionContextMode(
    "o3de.context.identifier",
    "o3de.context.mode.identifier"
);
```

Each action context will have its own set of modes.


### Adding actions to a mode

When a mode has been registered, it is possible to assign actions to it. This works similarly to adding actions to an updater.

```
actionManagerInterface->AssignModeToAction(
    "o3de.context.mode.identifier",
    actionIdentifier
);    
```

An action can be assigned to any number of modes. The mode needs to have been registered for the action context the action is assigned to for this operation to complete correctly.

Actions assigned to no modes (which is the default state after registration) will appear in all modes. If an action is only assigned to modes that are different from the active action context mode, the action will be deactivated until the active mode is changed.

For more info about the visibility of deactivated actions in menus and toolbars, see the [Action Visibility](/docs/user-guide/action-manager/fundamentals/architecture/visibility/) section.


### Switching between modes

To change the currently active action context mode, this API function can be called.

```
actionManagerInterface->SetActiveActionContextMode(
    EditorIdentifiers::MainWindowActionContextIdentifier,
    modeIdentifier
);
```

When the active action context mode changes, all actions that were not assigned to the new mode will be deactivated; then all actions that are assigned to the mode will be activated. If an action is assigned to both the previous and the new active mode, or is assigned to neither, its activation state will remain unchanged.


### Defaults

Each Action Context is initialized with a default Action Context Mode whose identifier is just `default`. It is possible to assign an action to the default mode to ensure that it gets deactivated for any other mode that is defined elsewhere (unless it gets assigned to the new mode as well).

By default, actions are assigned to no modes. This means that they appear in every registered mode. When a mode is assigned, then the behavior switches to only appearing in modes it was assigned to.


## Widget Actions

The system supports the addition of Widget Actions so that they can be used in interfaces.

### Registration

Registering a Widget Action is very similar to registering a regular action, with a few differences:

* Widget Actions do not need to be assigned to an Action Context.
* Instead of a trigger function, a factory function is provided. It will be used by the system whenever an instance of the widget is needed, allowing for multiple copies of the widget to be shown in the interface.

```
AzToolsFramework::WidgetActionProperties widgetActionProperties;
widgetActionProperties.m_name = "Widget Name";
widgetActionProperties.m_category = "Category";

auto outcome = m_actionManagerInterface->RegisterWidgetAction(
    "o3de.widgetAction.identifier",
    widgetActionProperties,
    []() -> QWidget*
    {
        /* Widget Factory */
        return new PrefabEditVisualModeWidget();
    }
);
```

{{< note >}}
The widget created via the factory will be parented to the interface that requests it, be it a menu or a toolbar, which will take control of it and guarantee it is deallocated correctly when no longer needed.
{{< /note >}}