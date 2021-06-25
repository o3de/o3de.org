---
title: Audio System
description: Use an Audio System component to manage global audio in Open 3D Engine.
toc: true
---

The Audio System Component exposes an API that is used for working with audio at a global scope. For instance, playing sounds without an Entity (using a global audio object under the hood), or setting parameters that affect the Master Mix Bus, or putting the audio system into global game states.

## EBuses

The Audio System component works with the following request buses.

### Request Bus Interface

| | |
|-|-|
| Name | `GlobalExecuteAudioTrigger` |
| Description | Executes an ATL Trigger globally (not associated with an in-game entity). |
| Parameters | `triggerName` - Name of the ATL Trigger to execute. |
| | `callbackOwnerEntityId` - (Advanced) Specify another Entity as the target for a finished callback. Normal usage should pass the default AZ::EntityId. |
| Return | None |
| Scriptable | Yes |

| | |
|-|-|
| Name | `GlobalKillAudioTrigger` |
| Description | Stops an ATL Trigger globally (not associated with an in-game entity). |
| Parameters | `triggerName` - Name of the ATL Trigger to execute. |
| | `callbackOwnerEntityId` - (Advanced) Specify another Entity as the target for a finished callback. Normal usage should pass the default AZ::EntityId. |
| Return | None |
| Scriptable | Yes |

| | |
|-|-|
| Name | `GlobalStopAllSounds` |
| Description | Stops all audio globally. |
| Parameters | None |
| Return | None |
| Scriptable | Yes |

| | |
|-|-|
| Name | `GlobalSetAudioRtpc` |
| Description | Sets an ATL Rtpc parameter applied at Global scope rather than Audio Object scope. |
| Parameters | `rtpcName` - Name of the ATL Rtpc to set. |
| | `value` - Float value to set. |
| Return | None |
| Scriptable | Yes |

| | |
|-|-|
| Name | `GlobalResetAudioRtpcs` |
| Description | Resets all Rtpcs globally. |
| Parameters | None |
| Return | None |
| Scriptable | Yes |

| | |
|-|-|
| Name | `GlobalSetAudioSwitchState` |
| Description |  Sets an ATL Switch to a given     state at Global scope. (e.g. For  setting Wwise States)             |
| Parameters |  `switchName` - Name of the ATL Switch to set. |
| |  `stateName` - Name of the ATL State to set the switch to. |
| Return | None |
| Scriptable | Yes |

### Notification Bus Interface

| | |
|-|-|
| Name | `OnGamePaused` |
| Description | A notification for communicating when game enters Paused state. |
| Parameters | None |
| Return | None |
| Scriptable | Yes |

| | |
|-|-|
| Name | `OnGameUnpaused` |
| Description | A notification for communicating when game leaves Paused state. |
| Parameters | None |
| Return | None |
| Scriptable | Yes |

{{< note >}}
These notifications aren't hooked up to get called. Usually game pause/unpause functionality is in game-specific code. This bus is available for your game pause/unpause to call the notification bus, and it should be handled appropriately via a custom bus handler.
{{< /note >}}
