---
title: Network Serializers
linktitle: Serializers
weight: 300
description: An overview and reference for data serializers used by the Open 3D Engine networking stack.
---

Open 3D Engine has support for a variety of Serializers for visiting an object hierarchy and performing operations upon that hierarchy, typically reading from or writing data to the object hierarchy for reasons of persistence or network transmission.

This section describes the ISerializer interface and various Serializer implementations included in AzNetworking. It also describes Serializers that function as wrappers that can be used to supplement other Serializer types.

## ISerializer

ISerializer describes an interface all AzNetworking Serializers implement. It describes methods for base data types in addition to template machinery to handle object types.

```cpp
enum class SerializerMode
{
    ReadFromObject,
    WriteToObject
};
 
//! Returns true if the serializer is valid and in a consistent state.
//! @return boolean true if the serializer is valid and in a consistent state
virtual bool IsValid() const;
 
//! Mark the serializer as invalid.
void Invalidate();
 
//! Returns an enum the represents the serializer mode.
//! returns WriteToObject if the serializer is writing values to the objects it visits, otherwise returns ReadFromObject
//! @return boolean true if the serializer is writing to objects that it visits
virtual SerializerMode GetSerializerMode() const = 0;
 
//! Serialize a boolean.
//! @param value    boolean input value to serialize
//! @param name     string name of the value being serialized
//! @return boolean true for success, false for serialization failure
virtual bool Serialize(bool& value, const char* name) = 0;
 
//! Serialize a character.
//! @param value    character input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(char& value, const char* name, char minValue, char maxValue) = 0;
 
//! Serialize a signed byte.
//! @param value    signed byte input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(int8_t& value, const char* name, int8_t minValue, int8_t maxValue) = 0;
 
//! Serialize a signed short.
//! @param value    signed short input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(int16_t& value, const char* name, int16_t minValue, int16_t maxValue) = 0;
 
//! Serialize a signed integer.
//! @param value    signed integer input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(int32_t& value, const char* name, int32_t minValue, int32_t maxValue) = 0;
 
//! Serialize a signed 64-bit integer.
//! @param value    signed 64-bit integer input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(int64_t& value, const char* name, int64_t minValue, int64_t maxValue) = 0;
 
//! Serialize an unsigned byte.
//! @param value    unsigned byte input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(uint8_t& value, const char* name, uint8_t minValue, uint8_t maxValue) = 0;
 
//! Serialize an unsigned short.
//! @param value    signed integer short value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(uint16_t& value, const char* name, uint16_t minValue, uint16_t maxValue) = 0;
 
//! Serialize an unsigned integer.
//! @param value    signed integer input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(uint32_t& value, const char* name, uint32_t minValue, uint32_t maxValue) = 0;
 
//! Serialize an unsigned 64-bit integer.
//! @param value    signed 64-bit integer input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(uint64_t& value, const char* name, uint64_t minValue, uint64_t maxValue) = 0;
 
//! Serialize a 32-bit floating point number.
//! @param value    32-bit floating point input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(float& value, const char* name, float minValue, float maxValue) = 0;
 
//! Serialize a 64-bit floating point number.
//! @param value    64-bit floating point input value to serialize
//! @param name     string name of the value being serialized
//! @param minValue the minimum value expected during serialization
//! @param maxValue the maximum value expected during serialization
//! @return boolean true for success, false for failure
virtual bool Serialize(double& value, const char* name, double minValue, double maxValue) = 0;
 
//! Serialize a raw set of bytes.
//! @param buffer         buffer to serialize
//! @param bufferCapacity size of the buffer
//! @param isString       true if the data being serialized is a string
//! @param outSize        bytes serialized
//! @param name           string name of the object
//! @return boolean true for success, false for serialization failure
virtual bool SerializeBytes(uint8_t* buffer, uint32_t bufferCapacity, bool isString, uint32_t& outSize, const char* name) = 0;
 
//! Serialize interface for deducing whether or not TYPE is an enum or an object.
//! @param value    object instance to serialize
//! @param name     string name of the object
//! @param typeInfo basic type information for the value being serialized
//! @return boolean true for success, false for serialization failure
template <typename TYPE>
bool Serialize(TYPE& value, const char* name);
 
//! Begins serializing an object.
//! @param name     string name of the object
//! @param typeInfo basic type information for the value being serialized
//! @return Result. In the case of Skip, Serialize is not called.
virtual bool BeginObject(const char* name, const char* typeName) = 0;
 
//! Ends serializing an object.
//! @param name     string name of the object
//! @param typeInfo basic type information for the value being serialized
//! @return boolean true for success, false for serialization failure
virtual bool EndObject(const char* name, const char* typeName) = 0;
 
//! Returns a pointer to the internal serialization buffer.
//! @return pointer to the internal serialization buffer
virtual const uint8_t* GetBuffer() const = 0;
 
//! Returns the total capacity serialization buffer in bytes.
//! @return total capacity serialization buffer in bytes
virtual uint32_t GetCapacity() const = 0;
 
//! Returns the size of the data contained in the serialization buffer in bytes.
//! @return size of the data contained in the serialization buffer in bytes
virtual uint32_t GetSize() const = 0;
 
//! This is a helper for network serialization.
//! It clears the track changes flag internal to some serializers
virtual void ClearTrackedChangesFlag() = 0;
 
//! This is a helper for network serialization.
//! It allows the owner of the serializer to query whether or not the serializer modified the state of an object during serialization
//! @return boolean true if the track changes flag is raised
virtual bool GetTrackedChangesFlag() const = 0;
```

## Included Serializers

AzNetworking provides several implementations of ISerializer.

### NetworkInputSerializer 

NetworkInputSerializer writes object model data into a bytestream. It's generally used to serialize data for transport via packets in AzNetworking.

### NetworkOutputSerializer 

 NetworkOutputSerializer reads object model data from a bytestream. It's generally used to deserialize data to an object that was received via packet that was previously serialized by NetworkInputSerializer. 

### DeltaSerializer 

DeltaSerializer encodes information used by DeltaSerializer to create and apply serialization deltas. An example usage if serialization of network inputs. Network inputs are generally close in value so they are serialized relative to each other using the DeltaSerializer.

### HashSerializer 

HashSerializer generates a 32bit integer hash for a serializable object. These hashes can be used to compare serialization results which can be useful to detect desyncs.

### StringifySerializer

StringifySerializer writes object model data into a map of string keys and string values. It can be used to generate a human readable map of an object model.

### TrackChangedSerializer 

An output serializer that tracks if it actually writes changes to memory or not. TrackChangedSerializer can wrap other ISerializer types to supplement the wrapped type serializer with its tracking functionality. The tracking it performs comes at a slight memory and performance cost.

### TypeValidatingSerializer 

TypeValidatingSerializer is a debug serializer that wraps other ISerializer types to supplement the wrapped type serializer with type and name information for serialized values. These values can then be checked to ensure data consistency. TypeValidatingSerializer will assert when a mismatch is detected to help aid debugging. Its functionality is gated by the cvar `net_validateSerializedTypes` as described in [Settings](../settings). TypeValidatingSerializer adds a bandwidth cost when `net_validateSerializedTypes` is enabled in order to serialize type and name information.