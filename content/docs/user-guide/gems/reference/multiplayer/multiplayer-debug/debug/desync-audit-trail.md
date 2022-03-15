---
title: Multiplayer Desync Audit Trail
description: Analyze and Debug Multiplayer Desyncs
linkTitle: Desync Audit Trail
---

When a client and server disagree on the value of a networked variable, a desync occurs. Desyncs can be extremely difficult to debug which is where the *Multiplayer Desync Audit Trail* can help.

The Multiplayer Desync Audit Trail is a tool available with the multiplayer gem for `debug`-configuration builds. It details all network desyncs that occur and categorizes network activity leading up to a desync, allowing you to root cause the desync itself.

![Audit Trail Overlay](/images/user-guide/gems/reference/multiplayer/audit_trail_default.png)

The Audit Trail will capture a desync including the input ID and host frame it occurred on. For every desync, the UI will list all the captured activity leading to the desync. The depth of this history can be controlled by a cvar.

## Configuration

Various cvars can be modified to enable additional data capture. Enabling additional capture both adds a performance cost and density to the Audit Trail. If you require capturing a longer event history, consider increasing the value of `net_DebutAuditTrail_HistorySize`.

| Property | Description | Type |
|---|---|---|---|
| `cl_EnableDesyncDebugging` | If true, enables output of desyncs to both standard logs and Audit Trail capture. | `bool` |
| `cl_DesyncDebugging_AuditInputs` | If true, adds inputs to audit trail. | `bool` |
| `net_DebutAuditTrail_HistorySize` | Maximum number of events the Audit Trail will aggregate. Raising this value is recommended if input or event auditing is enabled to compensate for increased event volume. | `int` |

## Auditing Categories
### Desync

Desyncs are the primary event captured by the Audit Trail. Consequently the Audit Trail organizes all activity around Desyncs. On the client, desyncs generally include a delta map of variables and the values the client and server disagreed on

### Input

Network inputs detail actions that create deltas in the networked state of the simulation. The audit trail lists all network inputs that were sent. In addition it also lists non default values for each member per network input. This allows the correlation of inputs to desynchronized data. This can help clarify what actions may have led to a desync.

![Audit Trail Inputs](/images/user-guide/gems/reference/multiplayer/audit_trail_input.png)

The above screenshot shows Inputs that occured on the Player entity relative to the desync including those that are processed locally. For the Host Frames in question, the actions were exclusively the Player moving via NetworkPlayerMovementComponent.

### Custom Event

Custom Events are custom auditing events the developer can specify via macros.

| Property | Description |
|---|---|---|
| AZ_MPAUDIT_INPUT_REWINDABLE | Allows the developer to audit a RewindableObject's current local value in comparison to its last known server value |
| AZ_MPAUDIT_INPUT_VALUE | Allows the developer to audit a non-networked value using the timing data of an input |
| AZ_MPAUDIT_VALUE | Allows the developer to audit a non-networked value without any timing data (such as Input ID and Host Frame ID) |

Custom Events allow the developer to specify additional information they'd like to track. In order to use these macros, including "MultiplayerDebug.h" is required. The parameters the macros require are:
* The variable in question
* The variable's underlying type
    * For a RewindableObject<T>, T
    * For a variable of type T, T
* A NetworkInput for commands starting with AZ_MPAUDIT_INPUT
    * This allows the binding of the macro usage to a specific HostFrame and Input ID for chronological categorization

![Audit Trail Custom Events](/images/user-guide/gems/reference/multiplayer/audit_trail_event.png)