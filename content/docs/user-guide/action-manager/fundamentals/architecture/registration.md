---
title: Registration
linktitle: Registration
description: Best practices and specifics on the Action Manager registration API calls.
weight: 202
---

The Action Manager architecture requires items to be registered before they can be used. This measure allows the system to provide error messages if an API is called with unknown identifiers, especially if due to a typo.
A second limitation, although it’s not enforced, is to register all items at Editor startup. Since the system has been designed for extensibility and customization, registering all elements at a defined time makes them available for use from other system while still enforcing a strict ownership.

To simplify the registration process, the Action Manager architecture provides a set of notification hooks that are triggered on Editor startup. These notifications are split by item type; this allows systems to be certain that an item they require, but is defined elsewhere, has already been registered by the time the hook corresponding to a different item type that has a dependency on it is called. For example, the action context registration hook is called first, so by the time the action registration hook is triggered we can assume all action contexts have been registered already and are available.

## Registration Hooks

#### `OnActionContextRegistrationHook`

Synchronization signal to register Action Contexts.

#### `OnActionContextModeRegistrationHook`

Synchronization signal to register Action Context Modes.
It can be assumed that Action Contexts have already been registered when this is called.

#### `OnActionUpdaterRegistrationHook`

Synchronization signal to register Action Updaters.

#### `OnMenuBarRegistrationHook`

Synchronization signal to register Menu Bars.

#### `OnMenuRegistrationHook`

Synchronization signal to register Menus.

#### `OnToolBarAreaRegistrationHook`

Synchronization signal to register ToolBar Areas.

#### `OnToolBarRegistrationHook`

Synchronization signal to register ToolBars.

#### `OnActionRegistrationHook`

Synchronization signal to register Actions.
It can be assumed that Action Contexts and Action Updaters have already been registered when this is called.

#### `OnWidgetActionRegistrationHook`

Synchronization signal to register Widget Actions.
`
#### `OnActionContextModeBindingHook`

Synchronization signal to bind Actions to Action Context Modes.
It can be assumed that Action Contexts Modes have already been registered when this is called.

#### `OnMenuBindingHook`

Synchronization signal to add actions/widgets to Menus, and Menus to Menu Bars.
It can be assumed that Action, Widget Actions, Menus and Menu Bars have already been registered when this is called.

#### `OnToolBarBindingHook`

Synchronization signal to add actions/widgets/menus to ToolBars, and ToolBars to ToolBar Areas.
It can be assumed that Action, Widget Actions, Menus, ToolBars and ToolBar Areas have already been registered when this is called.

#### `OnPostActionManagerRegistrationHook`

Synchronization signal for any post-registration activity.
This is mostly to future-proof the system, but other hooks should be used as appropriate if possible before resorting to this.


## Accessing the registration hooks

### C++

To handle the registration hooks, you need to connect an instance of your class to the `ActionManagerRegistrationNotificationBus`.
The hooks are called at Editor initialization, after the Main Window, Gems and Editor systems has been initialized, but before the UI is shown to the user. As such, the class instance needs to be connected to the bus before the end of the Editor initialization; usually, using a system component is the best choice.

Have your class extend `ActionManagerRegistrationNotificationBus`.

```
class TestSystemComponent
    : private AzToolsFramework::ActionManagerRegistrationNotificationBus::Handler
{
}
```

In the class initialization, connect to the bus. This could be in the constructor, the `Init` or `Activate` function of a system component, or any other form on initialization function.
Remember to also disconnect on the destructor.

```
void TestSystemComponent::Init()
{
    ActionManagerRegistrationNotificationBus::Handler::BusConnect();
}
```

This class can then handle the functions as appropriate.

```
void TestSystemComponent::OnActionRegistrationHook()
{
    // ...
}

```

### Python

Gems can also handle the registration hooks via a `bootstrap.py` file added to the `Editor\Scripts\` folder of the Gem.

```
import azlmbr.action as action
import azlmbr.bus as bus

def OnActionRegistrationHookHandler(parameters):
    # Create an Action

handler = action.ActionManagerRegistrationNotificationBusHandler()
handler.connect()
handler.add_callback('OnActionRegistrationHook', OnActionRegistrationHookHandler)
```
