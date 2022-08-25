---
title: Network Serializers
linktitle: Serializers
weight: 300
description: An overview and reference for data serializers used by the Open 3D Engine networking stack.
---

Open 3D Engine supports a variety of Serializers for visiting an object hierarchy and performing operations upon that hierarchy, typically reading from or writing data to the object hierarchy for reasons of persistence or network transmission.

AzNetworking and Multiplayer both have Serialization usage integrated by default for the purposes of performantly serializing network communication via packets and RPCs. Consequently serialization directly relates to bandwidth utilization for network communication. For cases when a bespoke serializer may be desired, AzNetworking and Multiplayer's default usage of Serialization provide good examples of serializer usage.

This section describes the various Serializer implementations included in AzNetworking and how to author a serialization function for an object model. It also describes Serializers that function as wrappers that can be used to supplement other Serializer types.

## ISerializer

[ISerializer](https://github.com/o3de/o3de/blob/main/Code/Framework/AzNetworking/AzNetworking/Serialization/ISerializer.h) describes an interface all AzNetworking Serializers implement. It describes methods for the serialization of base data types in addition to template machinery to handle serialization of object types.

## Included Serializers

AzNetworking provides several implementations of ISerializer.

### NetworkInputSerializer 

NetworkInputSerializer writes object model data into a bytestream. It's generally used to serialize data for transport via packets in AzNetworking.

### NetworkOutputSerializer 

NetworkOutputSerializer reads object model data from a bytestream. It's generally used to deserialize data to an object that was received via packet that was previously serialized by NetworkInputSerializer. 

### DeltaSerializer 

DeltaSerializer encodes information used by DeltaSerializer to create and apply serialization deltas. An example usage is serialization of network inputs. Network inputs are generally close in value so they are serialized relative to each other using the DeltaSerializer.

### HashSerializer 

HashSerializer generates a 32 bit integer hash for a serializable object. These hashes can be used to compare serialization results which can be useful to detect desyncs.

### StringifySerializer

StringifySerializer writes object model data into a map of string keys and string values. It can be used to generate a human readable map of an object model.

### TrackChangedSerializer 

An output serializer that tracks if any delta is actually serialized. TrackChangedSerializer can wrap other ISerializer types to supplement the wrapped type serializer with its tracking functionality. The tracking it performs comes at a slight memory and performance cost.

### TypeValidatingSerializer 

TypeValidatingSerializer is a debug serializer that wraps other ISerializer types to supplement the wrapped type serializer with type and name information for serialized values. These values can then be checked to ensure data consistency. TypeValidatingSerializer will assert when a mismatch is detected to help aid debugging. Its functionality is gated by the cvar `net_validateSerializedTypes` as described in [Settings](../settings). TypeValidatingSerializer adds a bandwidth cost when `net_validateSerializedTypes` is enabled in order to serialize type and name information.

The Multiplayer Gem [makes use of TypeValidatingSerializer by default](https://github.com/o3de/o3de/blob/main/Gems/Multiplayer/Code/Include/Multiplayer/IMultiplayer.h) for non-Release builds.

## Authoring a Serialization for an object model

Since Serializers follow the ISerializer interface, a serialization function can be authored to accept any Serializer by using the ISerializer type. 

As an example, consider the following struct and its Serialize method:
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

PlayerState's Serialize can be used to both serialize for network transport via NetworkInputSerializer and back into a PlayerState via NetworkOutputSerializer. In fact, any type implementing ISerializer could be used as a parameter to PlayerState's Serialize method.