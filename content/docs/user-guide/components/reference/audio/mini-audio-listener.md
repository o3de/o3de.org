---
linkTitle: MiniAudio Listener 
title: MiniAudio Listener Component
description: Use the MiniAudio Listener component to play audio in your game in O3DE.
toc: true
---

The **MiniAudio Listener** component provides the ability to designate an entity whose position is used for spatial audio playback, or let the user manually control the audio listener position through the `MiniAudioListenerRequestBus`.  Typically, the entity with an active camera is designated as the audio listener entity so that spatial audio playback is relative to the viewer's location and orientation.

## MiniAudio Listener Properties

The MiniAudio Listener component has the following properties.

| Name | Description | Default |
|------|-------------|---------|
| **Follow Entity** | The entity to use as the listener for spatial audio playback. | `<Empty>` |
| **Listener Index** | MiniAudio listener index.  When a sound is spatialized, it will be done so relative to the closest listener.  | `0` |

## EBus Request Bus Interface 

Use the `MiniAudioListenerRequestBus` EBus interface to communicate with the MiniAudio Listener component.

For more information about using the Event Bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus).

| Name | Description | Parameters | Return | Scriptable |
|------|-------------|------------|--------|------------|
| SetFollowEntity | Set the entity for the audio listener to use for position and orientation. | `followEntity` - EntityId of the entity to follow. | None | Yes |
| SetPosition | Set the position for the audio listener. | `position` - Vector3 world coordinates to use. | None | Yes |