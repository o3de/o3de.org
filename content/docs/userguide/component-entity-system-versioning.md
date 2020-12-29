# Versioning your Component Serialization<a name="component-entity-system-versioning"></a>

As requirements, code, and data representation change, you may need to modify your implementation of data reflection\. However, changes to serialized data can result in incompatibilities\. To manage compatibility, you can assign a version number increment to your serialized data structures\. With this approach, you can perform validation during serialization to ensure that the data being read matches the format that the reflection system specifies\. We recommend that you increase the version number of serialized data anytime there is a change to the reflected fields\.

The following code shows how to specify a version number for the serialization context\.

```
serializeContext->Class<SerializedStruct>()
    ->Version(1)
```

Successful conversion of serialized data to a newer version requires careful planning\. Use the information in the following sections to help with your planning\.
+ [Version Converters](#component-entity-system-versioning-converters)
+ [Upgrade Class Builders](#component-entity-system-versioning-builders)
+ [Deprecation](#component-entity-system-versioning-deprecation)

**Important**  
If you upgraded to Lumberyard v1\.23 or later from a previous version of Lumberyard, and you have not converted your slice files to the new slice file format, you must upgrade these files using the Slice Upgrade Pipeline before you can use the NameChange and TypeChange class builders\. For more information about this upgrade tool and how to use it, see [Converting Slices with the Slice Upgrade Pipeline](component-slice-upgrade-process.md)\.

**Important**  
If you are using Lumberyard v1\.22 or earlier, be sure to read important information about [Avoiding Data Loss when Serializing Component Data](best-practices-for-component-data-serialization.md)\.

## Version Converters<a name="component-entity-system-versioning-converters"></a>

A version change can create incompatibilities that require data to be converted from one format to another\. To resolve this, you can implement a version converter that reformats data "on the spot" to maintain data compatibility\. For example, you might require a version converter if you change a data type or a container \(for example, an `AZStd::vector` becomes an `AZStd::unordered_map`\)\.

Use the `Version` function mentioned in the previous section to specify a version converter, as in the following example\.

```
serializeContext->Class<EditorEntitySortComponent, EditorComponentBase>()
    ->Version(2, &SerializationConverter)
```

Version converters operate directly on the serialized data\.

To facilitate the creation of version converters, Lumberyard provides helper functions and examples such as the following:
+ To locate a specific element to manipulate, you can use the `AZ::Utils::FindDescendantElements` helper function\.
+ To access serialized data and manipulate it, you can use the public functions in the `DataElementNode` class \(`\dev\Code\Framework\AzCore\AzCore\Serialization\SerializeContext.h`\)\.
+ For version converter examples, see the AZ core serialization unit test in the `dev\Code\Framework\AzCore\Tests\Serialization.cpp` file\.

A version conversion operation that replaces a container might follow this common pattern:

1. Compare the version number of the data being serialized with the current version\. If the versions do not match, perform the steps that follow\.

1. Locate the element to convert by its `Crc32` key\.

1. Create a container to store the updated elements\.

1. Populate the new container with the existing data\.

1. Delete the old element from the root data\.

1. Use the same `Crc32` key to add the new container as a new element in the root data\.

After this operation is completed, the data exists in the new format\. When the data is serialized again, it is stored in the latest format\.

The following code shows an example of data conversion:

```
if (rootElement.GetVersion() <= 1)
{
	// This line of code:
	//  using Events = AZStd::vector<EBusEventEntry>;
	//  is changed to this:
	//  using EventMap = AZStd::unordered_map<AZ::Crc32, EBusEventEntry>; 
	auto ebusEventEntryElements = AZ::Utils::FindDescendantElements(serializeContext, rootElement, AZStd::vector<AZ::Crc32>{AZ_CRC("m_events", 0x191405b4), AZ_CRC("element", 0x41405e39)}); 
	EBusEventHandler::EventMap eventMap;
	for (AZ::SerializeContext::DataElementNode* ebusEventEntryElement : ebusEventEntryElements)
	{
		EBusEventEntry eventEntry;
		if (!ebusEventEntryElement->GetDataHierarchy(serializeContext, eventEntry))
		{
			return false;
		}
		AZ::Crc32 key = AZ::Crc32(eventEntry.m_eventName.c_str());
		AZ_Assert(eventMap.find(key) == eventMap.end(), "Duplicated event found while converting EBusEventHandler from version 1 to 2.");
		eventMap[key] = eventEntry;
	} 
    // Remove the previous Events element.
	rootElement.RemoveElementByName(AZ_CRC("m_events", 0x191405b4)); 
    // Replace it with the new EventMap element.
	if (rootElement.AddElementWithData(serializeContext, "m_eventMap", eventMap) == -1)
	{
		return false;
	} 
	return true;
}
```

**Note**  
If you need to emit a warning or error when a conversion fails \(for example, for asset builds\), use the `AZ_Warning` or `AZ_Error` macro\. For related source code, see `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Debug\Trace.h`\. 

## Upgrade Class Builders<a name="component-entity-system-versioning-builders"></a>

Slice data patches present a unique challenge to versioning your component data structures\. Data patches cannot be upgraded by version converters because they do not contain all the information about a component class\. Changing the serialization of a component without upgrading data patches that contain partial component data can lead to crashes, corrupted slice data, or invalid slice files that cannot be loaded or manipulated and must be rebuilt from scratch\.

In most cases, the solution is to use NameChange and TypeChange class builders alongside your version converters\. This causes the serializer to update the data patch and apply basic type changes and field name changes\. These builders can be chained together to upgrade across multiple version changes, and can also be written to skip versions entirely\.

### Class Builder Syntax<a name="versioning-class-builder-format"></a>

Name\-change class builders require an input and output version, followed by the input serialized name and a new output name\.

```
NameChange(InputVersion, OutputVersion, "OldFieldName", "NewFieldName")
```

Type\-change class builders require input and output data types as template arguments, followed by the relevant field name, the input and output version, and a conversion function\.

```
TypeChange<InputType, OutputType>("FieldName", InputVersion, OutputVersion, Function<OutputType(InputType)>)
```

### NameChange Class Builder Examples<a name="versioning-name-change-builder"></a>

In the following example, we use a `NameChange` class builder to change a serialized name of a field from `"MyData"`, used in version `4` of the component serialization, to `"Data"` in version `5`\.

```
serializeContext->Class<ExampleClass>()
    ->Version(5)
    ->Field("Data", &ExampleClass::m_data)
    ->NameChange(4, 5, "MyData", "Data");
```

You can also change the serialized name of a struct or class member when reflecting a class to the serialize context\. In the following example, we use a `NameChange` class builder to change the name from `"MyStructData"` in version `4`, to `"StructData"` in version `5`\.

```
class ExampleClass
{
    ...
    DataStruct m_data;
};
 
serializeContext->Class<ExampleClass>()
    ->Version(5)
    ->Field("StructData", &ExampleClass::m_data)
    ->NameChange(4, 5, "MyStructData", "StructData");
```

### TypeChange Class Builder Examples<a name="versioning-type-change-builder"></a>

In the following example, class member `m_data` has changed from an `int` in version `4` to a `float` in version `5`\. We add a `TypeChange` class builder to the serialization context so that any data patches containing the serialized field name `"MyData"` will be applied using the new data type\.

```
// Serialization Context for Version 4:
class ExampleClass
{
    ...
    int m_data;
    reflect(...)
    {
        serializeContext->Class<ExampleClass>()
        ->Version(4)
        ->Field("MyData", &ExampleClass::m_data);
    }
};
 
// Serialization Context for Version 5:
class ExampleClass
{
    ...
    float m_data;
    reflect(...)
    {
        serializeContext->Class<ExampleClass>()
        ->Version(5)
        ->Field("MyData", &ExampleClass::m_data)
        ->TypeChange<int, float>("MyData", 4, 5, [](int in)->float { return (float)in; });
    }
};
```

You can also handle nesting value changes\. In the following example, the field `m_data` has become nested inside of the new `MyData` struct in version `5`\. We use a `TypeChange` class builder to instruct the serializer to convert the simple `int` data type to the more complex `MyData` type\.

```
// Serialization Context for Version 4:
class ExampleClass
{
    ...
    int m_data;
    reflect(...)
    {
        serializeContext->Class<ExampleClass>()
        ->Version(4)
        ->Field("MyData", &ExampleClass::m_data);
    }
};
 
// Serialization Context for Version 5:
struct MyData
{
    int m_data;
};
 
class ExampleClass
{
    ...
    MyData m_data;
    reflect(...)
    {
        serializeContext->Class<ExampleClass>()
        ->Version(5)
        ->Field("MyData", &ExampleClass::m_data)
        ->TypeChange<int, MyData>("MyData", 4, 5, [](int in)->MyData { MyData out; out.m_data = in; return out; });
    }
};
```

### Advanced Class Builder Examples<a name="versioning-class-builder-advanced-examples"></a>

The following examples demonstrate more complex usage of class builders\.

**Example : Multiple Upgrades in One Version**  
Type changes take priority over name changes\. You can apply both in the same version upgrade, but the type change is applied first\. Therefore, always specify the *old* field name in the `TypeChange` when changing both a type and a name at the same time\.  
In the following example, a `TypeChange` changes the type from `float` to `int`\. It is immediately followed by a `NameChange` that changes the serialized name from `"FloatData"` to `"IntData"`\.  

```
// Serialization Context for Version 4:
class ExampleClass
{
    ...
    float m_data;
    static void Reflect(...)
    {
        serializeContext->Class<ExampleClass>()
            ->Version(4)
            ->Field("FloatData", &ExampleClass::m_data);
    }
};
 
// Serialization Context for Version 5:
class ExampleClass
{
    ...
    int m_data;
    static void Reflect(...)
    {
        serializeContext->Class<ExampleClass>()
            ->Version(5)
            ->Field("IntData", &ExampleClass::m_data)
            ->TypeChange<float, int>("FloatData", 4, 5, [](float in)->int { return (int)in; })
            ->NameChange(4, 5, "FloatData", "IntData");
    }
};
```

**Example : Version Skipping**  
A `TypeChange` can skip multiple versions\. Skipping versions should be used only when intermediate type changes contain conversions that could lose data\.  
In the following example, using `ExampleClass`, the member variable `m_data` changes from a `float` in version 1 to an `int` in version 2\. Then in version 3, `m_data` changes back to a `float`\. Multiple `TypeChange` class builders are used to avoid losing the floating point precision when upgrading older overrides to version 3, while still providing the ability to fix data patches written using version 2 of `ExampleClass`\.  

```
// Version 1 of ExampleClass:
class ExampleClass
{
    ...
    float m_data;
    static void Reflect(...)
    {
        serializeContext->Class<ExampleClass>()
            ->Version(1)
            ->Field("Data", &ExampleClass::m_data);
    }
};
 
// Version 2 of ExampleClass:
class ExampleClass
{
    ...
    int m_data;
    static void Reflect(...)
    {
        serializeContext->Class<ExampleClass>()
            ->Version(2)
            ->Field("Data", &ExampleClass::m_data)
            ->TypeChange<float, int>("Data", 1, 2, [](float in)->int { return (int)in; });
    }
};
 
// Version 3 of ExampleClass:
class ExampleClass
{
    ...
    float m_data;
    static void Reflect(...)
    {
        serializeContext->Class<ExampleClass>()
            ->Version(3)
            ->Field("Data", &ExampleClass::m_data)
            ->TypeChange<float, int>("Data", 1, 2, [](float in)->int { return (int)in; })
            ->TypeChange<int, float>("Data", 2, 3, [](int in)->float { return (float)in; })
            ->TypeChange<float, float>("Data", 1, 3, [](float in)->float { return in; });
    }
};
```
We strongly recommend that you do not use this version skipping technique with the `NameChange` builder\. Doing so will cause problems for any `TypeChange` builders used on the same field in between the skipped versions as they try to match the serialized field name\.

## Deprecation<a name="component-entity-system-versioning-deprecation"></a>

The serialization context also supports deprecation of a previously reflected class name\. To deprecate a class, use the `ClassDeprecate` method\. After a class is deprecated, any instances of the class are silently discarded during load\.

The following example shows the use of the `ClassDeprecate` method\.

```
serializeContext->ClassDeprecate("DeprecatedClass", "{893CA46E-6D1A-4D27-94F7-09E26DE5AE4B}"); 
```