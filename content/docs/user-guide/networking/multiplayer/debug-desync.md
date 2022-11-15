---
linkTitle: Debugging Multiplayer Desyncs
title: Debugging Multiplayer Desync Using Audit Trail
description: Analyze and debug multiplayer desyncs using the Multiplayer Desync Audit Trail tool in Open 3D Engine (O3DE).
weight: 800
---

When a client and server disagree on the value of a networked variable, a desync occurs. Desyncs can be extremely difficult to debug, but the *Multiplayer Audit Trail* tool can help.

The Multiplayer Audit Trail tool in **Open 3D Engine (O3DE)** is available with the **Multiplayer Gem** for `debug`-configuration builds. The tool details all network desyncs that occur and it categorizes network activity leading up to a desync, allowing you to root cause the desync itself.

![Audit Trail Overlay](/images/user-guide/networking/multiplayer/audit_trail_default.png)

The Audit Trail tool captures a desync, including the input ID and host frame that it occurred on. For every desync, the UI lists all the captured activity leading to the desync. You can control the depth of this history by a cvar.

## Auditing Categories

The Audit Trail tool is designed to capture desync events, but can also be configured to capture *input events* and *custom events*.

### Desync

Desyncs are the primary event captured by the Audit Trail. Consequently the Audit Trail organizes all activity around desyncs. On the client, desyncs generally include a delta map of variables and the values the client and server disagreed on. 

### Input events

Network inputs detail actions that create deltas in the networked state of the simulation. The Audit Trail tool lists all network inputs that were sent. In addition, it also lists non-default values for each member per network input. This allows the correlation of inputs to desynchronized data. By tracking client inputs and desyncs together, you can identify if player actions affect specific desyncs.

![Audit Trail Inputs](/images/user-guide/networking/multiplayer/audit_trail_input.png)

The preceding screenshot shows inputs that occurred on the client's player entity, relative to the desync, including those that are processed locally. For the host frames in question, the actions were exclusively the player moving via `NetworkPlayerMovementComponent`.

### Capturing custom events

Custom events are custom auditing events the developer can specify via macros in their C++ source.

| Property | Description |
|---|---|---|
| `AZ_MPAUDIT_INPUT_REWINDABLE` | Allows the developer to audit a `RewindableObject` object's current local value in comparison to its last known server value. |
| `AZ_MPAUDIT_INPUT_VALUE` | Allows the developer to audit a non-networked value using the timing data of an input. Timing data includes input ID and host frame. |
| `AZ_MPAUDIT_VALUE` | Allows the developer to audit a non-networked value without any timing data. |

Custom events allow the developer to specify additional information they'd like to track. In order to use these macros, including `MultiplayerDebug.h` is required. The parameters the macros require are:

* The variable in question
* The variable's underlying type. This should always be `T`, even for `RewindableObject<T>` values being captured.
* A `NetworkInput` for commands starting with `AZ_MPAUDIT_INPUT`. This binds the macro usage to a specific host frame and input ID, giving the ability to categorize by event time.

```cpp
Multiplayer::RewindableObject<AZ::Vector3> NetworkExampleComponent::GetVelocity()
{
    return m_velocity;
}

void NetworkExampleComponent::OnExampleEvent(Multiplayer::NetworkInput& input)
{
    // Pass the input, the RewindableObject and its templated type of Vector3
    AZ_MPAUDIT_INPUT_REWINDABLE(input, GetVelocity(), AZ::Vector3);
}
```

![Audit Trail Custom Events](/images/user-guide/networking/multiplayer/audit_trail_event.png)

## Configuration

Various cvars can be modified to enable additional data capture. Enabling additional capture both adds a performance cost and density to the Audit Trail. If you require capturing a longer event history, consider increasing the value of `net_DebutAuditTrail_HistorySize`.

| Property | Description | Type |
|---|---|---|---|
| `cl_EnableDesyncDebugging` | If true, enables output of desyncs to both standard logs and Audit Trail capture. | `bool` |
| `cl_DesyncDebugging_AuditInputs` | If true, adds inputs to Audit Trail. | `bool` |
| `net_DebutAuditTrail_HistorySize` | Maximum number of events the Audit Trail will aggregate. Raising this value is recommended if input or event auditing is enabled to compensate for increased event volume. | `int` |