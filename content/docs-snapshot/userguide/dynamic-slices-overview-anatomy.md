# Anatomy of a Slice<a name="dynamic-slices-overview-anatomy"></a>

The following diagram illustrates an example slice A, which contains references to two other slices B and C\. Slice A has two instances each of B and C: 

![\[Anatomy of an example slice\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/dynamic-slices-anatomy.png)

Each instance contains a data patch, which may be empty if no changes or overrides are present\. If the instantiation of slice B in slice A has been modified in comparison with the source asset B, the data patch contains the differences\. When slice A is instantiated again, it contains instances of slice B, but with the modifications applied\. Any nonoverridden fields propagate through the hierarchy\. If you change a property value in the slice B asset on disk, the instance of B contained in slice A will reflect that change — if the property for that instance has not already been overridden, as reflected in the instance's data patch\. 

In addition to references to other slices, slices can contain zero or more entities\. These entities are original to this slice and are not acquired through referenced slice instances\. A slice does not have to contain references to other slices\. A slice that contains only original entities \(as represented by the bottom box in the diagram\) and no references to other slices is called a *leaf slice*\. 

Slice files in a Lumberyard project have the extension `".slice"`\. They are stored in an XML format\.

## Anatomy of a Slice Data Patch<a name="slice-data-patch-anatomy"></a>

When a slice contains a reference to another slice, and an override is made to this reference, the difference between the two is captured in a data patch\. The overrides can be simple, such as a change to a value in a field, or more complex, such as the addition or removal of entire components or entities\. The format of the serialized data in a slice file depends on the version of Lumberyard\.

### Readable XML Data Patch Format \(v1\.23\+\)<a name="slice-data-patch-readable"></a>

Component names, data types, and version information are readily identifiable in this data patch format\. There is no need to launch Lumberyard Editor to see this information\. The following example shows that:
+ This data patch is for the `EditorCommentComponent`\.
+ This is version `1` of the component\.
+ It contains an override for the `Configuration` field with the value `"Test Override"`\.
+ The type of this field is `AZStd::string`\.

```
<Class name="EditorCommentComponent" field="m_data" version="1" type="{5181117D-CD69-4C05-8804-C1FBE5F0C00F}">
    <Class name="EditorComponentBase" field="BaseClass1" version="1" type="{D5346BD4-7F20-444E-B370-327ACD03D4A0}">
        <Class name="AZ::Component" field="BaseClass1" type="{EDFCB2CF-F75D-43BE-B26B-F35821B29247}">
            <Class name="AZ::u64" field="Id" value="5131819312902549068" type="{D6597933-47CD-4FC8-B911-63F3E2B0993A}"/>
        </Class>
    </Class>
    <Class name="AZStd::string" field="Configuration" value="Test Override" type="{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}"/>
</Class>
```

**Note**  
The Slice Upgrade Pipeline introduced in Lumberyard v1\.23 helps you convert your slices to this new format\. For more information about this upgrade tool and how to use it, see [Converting Slices with the Slice Upgrade Pipeline](component-slice-upgrade-process.md)\.

### Hexadecimal Data Patch Format \(v1\.22 and earlier\)<a name="slice-data-patch-hexadecimal"></a>

The original data patch format uses a serialization of data and an address element from a binary stream converted into hexadecimal characters\. Even though the original version is shorter than the newer version, it is impossible to tell from inspection what data is contained inside of this patch\.

```
<Class name="AddressType" field="value1" value="E564EC5000000000FFC1B4571E5634DCFDF548EE00000000F0F034C2DFE9535660EA016E00000000065EBCB500000000BF54BF3600000000" type="{90752F2D-CBD3-4EE9-9CDD-447E797C8408}"/>
<Class name="ByteStream" field="value2" value="00000000011C43DA906B7DEF4CA89790854106D3F983000000FF0000" type="{6F949CC5-24A4-4229-AC8B-C5E6C70E145E}"/>
```