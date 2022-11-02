---
linktitle: Serializers
title: Network Serializers
description: An overview and reference for data serializers that the Open 3D Engine (O3DE) networking stack uses.
weight: 400
---

**Open 3D Engine (O3DE)** supports a variety of serializers that visit an object hierarchy and perform operations upon that hierarchy. These operations typically include reading data from or writing data to the object hierarchy for the purpose of persistence or network transmission.

Both `AzNetworking` and the **Multiplayer Gem** use serialization for performant network communication through packets and RPCs. Consequently, serialization directly relates to bandwidth utilization in network communication. For cases when a bespoke serializer is desirable, `AzNetworking` and the Multiplayer Gem provide good examples of how to use a serializer.

This section describes the various serializer implementations that are included in `AzNetworking`, and how to author a serialization function for an object model. It also describes serializers that function as wrappers that can be used to supplement other serializer types.

## ISerializer

[AzNetworking::ISerializer](https://github.com/o3de/o3de/blob/main/Code/Framework/AzNetworking/AzNetworking/Serialization/ISerializer.h) describes an interface that all `AzNetworking` serializers implement. It describes methods for the serialization of base data types in addition to template machinery to handle serialization of object types.

## Included serializers

`AzNetworking` provides several implementations of `ISerializer`.

### NetworkInputSerializer 

`NetworkInputSerializer` writes object model data into a bytestream. It's generally used to serialize data for transport using packets in `AzNetworking`.

### NetworkOutputSerializer 

`NetworkOutputSerializer` reads object model data from a bytestream. It's generally used to deserialize data to an object that was received in a packet that was previously serialized by `NetworkInputSerializer`. 

### DeltaSerializer 

`DeltaSerializer` encodes information used by `DeltaSerializer` to create and apply serialization deltas. An example usage is serialization of network inputs. Network inputs are generally close in value so they are serialized relative to each other using the `DeltaSerializer`.

### HashSerializer 

`HashSerializer` generates a 32 bit integer hash for a serializable object. These hashes can be used to compare serialization results which can be useful to detect desyncs.

### StringifySerializer

`StringifySerializer` writes object model data into a map of string keys and string values. It can be used to generate a human readable map of an object model.

### TrackChangedSerializer 

TrackChangedSerializer is an output serializer that tracks if any delta is actually serialized. It can wrap other `ISerializer` types to supplement the wrapped type serializer with its tracking functionality. The tracking it performs comes with a slight memory and performance cost.

### TypeValidatingSerializer 

`TypeValidatingSerializer` is a debug serializer that wraps other `ISerializer` types to supplement the wrapped type serializer with type and name information for serialized values. These values can then be checked to ensure data consistency. `TypeValidatingSerializer` will assert when a mismatch is detected to help aid debugging. Its functionality is gated by the `net_validateSerializedTypes` cvar as described in [Settings](../settings). `TypeValidatingSerializer` adds a bandwidth cost when `net_validateSerializedTypes` is enabled in order to serialize type and name information.

The Multiplayer Gem uses `TypeValidatingSerializer` in non-release builds. To see the implementation, refer to [IMultiplayer.h](https://github.com/o3de/o3de/blob/main/Gems/Multiplayer/Code/Include/Multiplayer/IMultiplayer.h).

## Authoring a serialization for an object model

Because serializers implement the `ISerializer` interface, you can use this interface when authoring new serialization functions so that they can accept any serializer of this type.

As an example, consider the following struct and its `Serialize` method:
```cpp
    struct PlayerState
    {
        PlayerNameString m_playerName;
        uint32_t m_score = 0;          // coins collected
        uint8_t m_remainingShield = 0; // % of shield left, max of ~200% allowed for buffs
        bool operator!=(const PlayerState& rhs) const;
        bool Serialize(AzNetworking::ISerializer& serializer);
    };

    inline bool PlayerState::Serialize(AzNetworking::ISerializer& serializer)
    {
        return serializer.Serialize(m_playerName, "playerName")
            && serializer.Serialize(m_score, "score")
            && serializer.Serialize(m_remainingShield, "remainingShield");
    }
```

`PlayerState's` `Serialize` function can be used to both serialize data for network transport using `NetworkInputSerializer` and deserialize data back into a `PlayerState` using `NetworkOutputSerializer`. In fact, any type implementing `ISerializer` could be used as a parameter to `PlayerState's` `Serialize` method.