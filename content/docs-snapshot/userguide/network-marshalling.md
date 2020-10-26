# Marshalling<a name="network-marshalling"></a>

Data is written to the network using `WriteBuffer`, and data received is read using `ReadBuffer`\. Each buffer specifies the [endianness](https://en.wikipedia.org/wiki/Endianness) used\.

All data marshalling, whether for a `DataSet` or RPC, is written using a specialization of the `Marshaler` type\. There are a number of pre\-defined marshalers for fundamental types \(`int32`, `uint16`, `bool`, `float`, etc\), as well as other common types like containers and bitfields\.

Marshalers and read/write buffers have a close relationship\. A marshaler reads or writes its data types from or to the buffer\. If the type is a complex type like a class or container, then that marshaler marshals each of its fields with nested marshalers\. The nested invocation of marshaler types continues until a fundamental type is written to the buffer with the endianness of the network\. Additional custom marshalers can be implemented to support custom types or to perform domain\-based compression\. Default marshalers are implemented through [template specialization](http://en.cppreference.com/w/cpp/language/template_specialization)\.

The base `Marshaler` class in GridMate follows\.

```
namespace GridMate
{
    template<typename T>
    class Marshaler
    {
    public:
        void Marshal(WriteBuffer& wb, const T& value);
        void Unmarshal(T& value, ReadBuffer& rb);
    };
}
```

If a `Marshaler` instance is not specified with the data set or RPC declaration, the template specialization is used\.

Implementation of the default marshaler for AZCore's `Vector3` math type can be found in `Code/Framework/GridMate/GridMate/Serialize/MathMarshal.h`:

```
namespace GridMate
{
    template<>
    class Marshaler<AZ::Vector3>
    {
    public:
        typedef AZ::Vector3 DataType;
        static const AZStd::size_t MarshalSize = sizeof(float) * 3;
        void Marshal(WriteBuffer& wb, const AZ::Vector3& vec) const
        {
            Marshaler<float> marshaler;
            marshaler.Marshal(wb, vec.GetX());
            marshaler.Marshal(wb, vec.GetY());
            marshaler.Marshal(wb, vec.GetZ());
        }
        void Unmarshal(AZ::Vector3& vec, ReadBuffer& rb) const
        {
            float x, y, z;
            Marshaler<float> marshaler;
            marshaler.Unmarshal(x, rb);
            marshaler.Unmarshal(y, rb);
            marshaler.Unmarshal(z, rb);
            vec.Set(x, y, z);
        }
    };
}
```

## Markers<a name="network-marshalling-markers"></a>

Notice the declaration of `MarshalSize` above\. `WriteBuffer` supports the concept of markers\. A marker is a placeholder that can be inserted into the buffer, so its value can be filled after additional data is written to the buffer\. This is useful for prepending a length field in front of the actual data\. Markers require that the data that is inserted be of fixed length, and `MarshalSize` is used to query this length\. Therefore, marshalers that write data to the marker need to declare a valid `MarshalSize`\.

## Buffers<a name="network-marshalling-buffers"></a>

### Write Buffers<a name="write-buffers"></a>

Write buffers are backed by the following three types of allocation schemes:

**Dynamic** – Dynamically allocated and automatically grown

**Static** – Fixed size, allocated on the stack

**Static In Place** – Uses another buffer as its backing store

By default, the `write` function uses the default marshaler for the data type, but you can override the marshaler to create a custom marshaler\.

There are two ways to write a type to a network buffer:

1\) The following example uses the default marshaler for the type passed into `Write()`\. In this example, the float marshaler is used\.

```
WriteBuffer wb;
wb.Write(1.0f);
```

2\) The following example uses the `HalfMarshaler`, which compresses the float by half\.

```
WriteBuffer wb;
wb.Write(1.0f, HalfMarshaler());
```

### Read Buffers<a name="network-marshalling-read-buffers"></a>

Read buffers have built\-in overflow detection and do not read any data fields after the end of the buffer has been reached\. You can check this by looking at the return value of the `Read` method\. Note that if data isn’t read for a given value, then the value is left uninitialized\.

## Predefined Marshalers<a name="network-marshalling-predefined-marshalers"></a>

GridMate includes the following predefined marshalers:

### Fundamental C\+\+ Types<a name="network-marshalling-predefined-marshalers-fundamental"></a>


****  

| **Floating point** | **Misc ** | **Unsigned ** | **Signed ** | 
| --- | --- | --- | --- | 
| `float` `double` | `char` `bool` `enum` \(specify marshaled size by inheriting `enum` from a type\) | `AZ::u8` `AZ::u16` `AZ::u32` `AZ::u64` | `AZ::s8` `AZ::s16` `AZ::s32` `AZ::s64` | 

### Container Types<a name="network-marshalling-predefined-marshalers-container"></a>


****  

| **Sequence** | **Associative ** | **Explicit Marshalers ** | 
| --- | --- | --- | 
| `vector` `list` `string` | `map` `set` `unordered_map` `unordered_set` `multimap` `multiset`  | `ContainerMarshaler` `MapContainerMarshaler` \(Use these marshalers when the subtypes of the container require a non\-default marshaler\) | 

### Utility Types<a name="network-marshalling-predefined-marshalers-utility"></a>


****  

| **Name ** | **Description ** | 
| --- | --- | 
| ConversionMarshaler<SerializedType, OriginalType> | Performs static casts between SerializedType \(type on the wire\) and OriginalType \(type declared in user code\)\. | 
| AZ::Crc32 | A CRC32 value\. | 
| AZStd::bitset | A class for arbitrary flags\. | 
| AZStd::pair | A std pair class\. Implicitly used by the map, unordered\_map, and multimap marshalers\. | 
| AZ::Aabb | An axis aligned bounding box\. | 
| AZStd::chrono::duration | A time duration in 32 bit milliseconds\. | 
| GridMate::UnionDataSet | A type safe tagged union designed for network transmission\. | 

### Compression Types<a name="network-marshalling-predefined-marshalers-compression"></a>


****  

| **Name ** | **Description ** | 
| --- | --- | 
| Float16Marshaler | Compresses a float32 to float16\. | 
| HalfMarshaler | Compresses a float to half precision\. | 
| IntegerQuantizationMarshaler<Min, Max, Bytes> | Quantizes an integer in the range \[Min, Max\] to the number of bytes specified in Bytes\. | 

## Custom Marshalers<a name="network-marshalling-custom-marshalers"></a>

Creating a custom data marshaler is as simple as specializing the `GridMate::Marshaler` type, and implementing the expected `Marshal` and `Unmarshal` methods\. If the data written is constant size, adding the member `MarshalSize` allows you to use the marshaler in scenarios where fixed sizes are required \(such as markers\)\.

### Fixed Size Custom Marshaler<a name="network-marshalling-custom-marshalers-fixed-size"></a>

The following is an example of a fixed size custom marshaler\.

```
namespace GridMate
{
    template<>
    class Marshaler<MyClass>
    {
    public:
        static const AZStd::size_t MarshalSize = sizeof(m_field1) + sizeof(m_field2);
        void Marshal(GridMate::WriteBuffer& wb, const MyClass& value) const
        {
            wb.Write(value.m_field1);
            wb.Write(value.m_field2);
        }
        void Unmarshal(MyClass& value, ReadBuffer& rb) const
        {
            rb.Read(value.m_field1);
            rb.Read(value.m_field2);
        }
    };
}
```