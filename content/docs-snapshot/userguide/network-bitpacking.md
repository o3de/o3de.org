# Using Bit Packing in Lumberyard Networking<a name="network-bitpacking"></a>

Most built\-in C\+\+ types use more than one byte in memory\. Even a Boolean value uses one byte\. On some operating systems, it can use more\. However, the Lumberyard networking system, GridMate, optimizes networking traffic by tightly packing your data into the network payload\.

## Boolean Values<a name="network-bitpacking-boolean-values"></a>

GridMate is intelligent enough to pack a Boolean value into a single bit\. For example, if a replica chunk contains several Boolean fields, each field uses a single bit during network transmission\. In the following example, GridMate serializes the payload for `MyChunk` into just three bits\.

```
class MyChunk : public ReplicaChunk
{
...
public:
......DataSet<bool> m_field1; // This field occupies only one bit.
......DataSet<bool> m_field2; // This field occupies only one bit.
......DataSet<bool> m_field3; // This field occupies only one bit.
};
```

**Tip**  
Using `AZStd::bitset` is unnecessary and is often less efficient\. Because `AZStd::bitset` writes its payload in full bytes, packing one Boolean or eight Booleans into `AZStd::bitset` takes a whole byte\. It is better to use `DataSet<bool>` instead of `DataSet<AZStd::bitset>`\.

## Implementing Bit Packing for a Custom Class<a name="network-bitpacking-custom-class"></a>

The following steps show you how to implement bit packing for a custom class\.

### 1\. Declare an Integer Variable That Uses Only the Required Number of Bits<a name="network-bitpacking-custom-class-declare-an-integer-variable-bits"></a>

If you have some custom types that you want to pack efficiently, declare an integer variable that uses only the required number of bits\. The following simple example declares a `flags` variable for storing flags in a bit field\.

```
struct CustomClass
{
	int flags : 4; // C declaration of an integer value that uses only 4 bits.
};
```

### 2\. Provide a Custom Marshaler<a name="network-bitpacking-custom-class-provide-a-custom-marshaler"></a>

For best results, provide a custom marshaler as in the following example:

```
class MarshalerCustomClass
{
public:
void Marshal(WriteBuffer& wb, const CustomClass& value) const
{
       AZ::u8 tmp = value.flags;
       wb.WriteRaw(&tmp, { 0, 4 }); // Writes 4 bits and 0 bytes from 'tmp'.
}

void Unmarshal(CustomClass& value, ReadBuffer& rb) const
{
       AZ::u8 tmp;
       rb.ReadRaw(&tmp, { 0, 4 }); // Reads just 4 bits and no full bytes.
       value.flags = tmp;
};
```

### 3\. Pass the Marshaler Type as a `DataSet` Argument<a name="network-bitpacking-custom-class-pass-the-marshaler-type"></a>

Now, when you declare a `DataSet` for a `CustomClass` variable, you can simply pass the marshaler type into the template arguments for `DataSet`\. The following example shows the syntax\.

```
DataSet<CustomClass, MarshalerCustomClass> m_value;
```

In this implementation, the example uses a total of only 4 bits to serialize `CustomClass`\.

### 4\. Read and Write Data at the Bit Level<a name="network-bitpacking-custom-class-read-write-at-bit-level"></a>

The following example shows how `ReadBuffer` supports direct control over reading data at the bit level\.

```
bool ReadBuffer::ReadRaw(void* source, PackedSize size);
// PackedSize is a special type that you can use to define granularity at the bit level.
// For example PackedSize(0, 1) means 1 bit.
// PackedSize(4, 5) means 4 bytes and 5 bits.
// PackedSize(10) means 10 bytes.
```

The `WriteBuffer` method has the same capability\. The following example uses both the `ReadBuffer` and `WriteBuffer` methods\.

```
/*
* This example takes advantage of the bit packing feature in GridMate.
*/
struct CustomClass3
{
       int flags : 7; // Uses only seven bits.
       bool b; // Uses only one bit.
};
/*
* Marshaler for PackedSize objects.
*
* Note that PackedSize::additionalBits requires only 3 bits because it has a range of [0..7].
*/
class MarshalerCustomClass3
{
public:
       void Marshal(WriteBuffer& wb, const CustomClass3& value) const
       {
              AZ::u8 tmp = value.flags;
              wb.WriteRaw(&tmp, { 0, 7 });
              wb.WriteRawBit(value.b);
       }

       void Unmarshal(CustomClass3& value, ReadBuffer& rb) const
       {
              AZ::u8 tmp;
              rb.ReadRaw(&tmp, { 0, 7 });
              value.flags = tmp;
              rb.ReadRawBit(value.b);
       }
};
//////
DataSet<CustomClass3, MarshalerCustomClass3> m_field;
```