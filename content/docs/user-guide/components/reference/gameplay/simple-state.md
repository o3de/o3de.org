---
linkTitle: Simple State
title: Simple State Component
description: Use the Simple State component in Open 3D Engine (O3DE) to provide a simple state
  machine.
---

The **Simple State** component provides a simple state machine. Each state is represented by a name and an array of zero or more entities. The entities are activated upon entering the state and deactivated upon exiting it. A simple state component may be in `NullState`, which means no state is active.

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Simple State properties

![Simple State component properties](/images/user-guide/components/reference/gameplay/simple-state-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Initial state** | The active state when the Simple State component is first activated. | `<None>` or state **Name** | `<None>` |
| **Reset on activate** | If enabled, Simple State component returns to the **Initial state** when activated, and not the state held before deactivating. | Boolean | `Enabled` |
| **States** | An array of states. |  |  |
| **States** - **Name** | Defines the name of the state. | String | `New State` |
| **States** - **Entities** | An array of entities that are associated with a state. | EntityId | None |

## SimpleStateComponentRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCurrentState` | Returns the **Name** of the current state. | None | State: String | Yes |
| `GetNumStates` | Returns the total number of states. | None | Count: Integer | Yes |
| `SetState` | Sets the component to a specific state by **Name**. | State: String | None | Yes |
| `SetStateByIndex` | Sets the component to a specific state by its index in the **States** array. | State Index: Integer | None | Yes |
| `SetToFirstState` | Sets the component to State[0], the first state in the **States** array. | None | None | Yes |
| `SetToLastState` | Sets the component to the last state in the **States** array. | None | None | Yes |
| `SetToNextState` | Sets the component to the next state in the **States** array. | None | None | Yes |
| `SetToPreviousState` | Sets the component to the previous state in the **States** array. | None | None | Yes |


## SimpleStateComponentNotificationBus

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnStateChanged` | Notifies listeners that the state has changed. | None | Old State: String, New State: String | Yes |

For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).
