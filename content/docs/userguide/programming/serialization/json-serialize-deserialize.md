---
description: ' Serialize objects to JSON from the ALY; engine and load them back through
  deserialization. '
title: Serialize and deserialize JSON objects
---
# Serialize and deserialize JSON objects {#serialization-json-serialize-deserialize}

 Once a class has been [registered with a serialization context](/docs/userguide/programming/serialization/register-objects.md) objects of that class can be serialized and deserialized\. Objects are serialized to JSON with the `AZ::JsonSerialization::Store()` function, and deserialized from JSON with `AZ::JsonSerialization::Load()`\. 

 This article includes reference for these methods, examples of using serialization and deserialization, and how to interpret result codes from JSON the serializer\. For information on how specific types are serialized, see [Data types in serialized JSON](/docs/userguide/programming/serialization/json-data-types.md)\. 

## Serialization {#serialization-json-serialize}

Serialization into JSON is done with the `static AZ::JsonSerialization::Store()` method\. This method has several overloads, depending on how you want the object to be serialized and what information is available at the time of serialization\. By default, the global serialization context is used\.

### `AZ::JsonSerialization::Store()` overloads {#serialization-json-serialize-store}

`template<typename T> static AZ::JsonSerializationResult::ResultCode AZ::JsonSerialization::Store(rapidjson::Value& output, rapidjson::Document::AllocatorType& allocator, const T& object, AZ::JsonSerializerSettings settings = AZ::JsonSerializerSettings{});`  
+ `output` - The RapidJSON document or value to write to\. Objects can be serialized at an arbitrary point in a JSON document by providing the appropriate value\.
+ `allocator` - The memory allocator used by RapidJSON\.
+  `object` - The object to serialize\. This object's class must be registered with the provided serialization context\. 

   When serializing, a second object of type `T` is created from the default constructor \(if possible\) to provide default values\. 
+ `settings` - Configuration for how to treat the serialization\. If not provided, the default settings are used\.

`template<typename T> static AZ::JsonSerializationResult::ResultCode AZ::JsonSerialization::Store(rapidjson::Value& output, rapidjson::Document::AllocatorType& allocator, const T& object, const T& defaultObject, AZ::JsonSerializerSettings settings = AZ::JsonSerializerSettings{});`   
+ `output` - The RapidJSON document or value to write to\. Objects can be serialized at an arbitrary point in a JSON document by providing the appropriate value\.
+ `allocator` - The memory allocator used by RapidJSON\.
+  `object` - The object to serialize\. This object's class must be registered with the provided serialization context\.
+ `defaultObject` \- An object providing the values to treat as the defaults during serialization\. Any members of `object` with values that don't match `defaultObject` are guaranteed to be serialized\.
+ `settings` - Configuration for how to treat the serialization\. If not provided, the default settings are used, except that default values will be stored in the output\.

`static AZ::JsonSerializationResult::ResultCode AZ::JsonSerialization::Store(rapidjson::Value& output, rapidjson::Document::AllocatorType& allocator, const void* object, const void* defaultObject, const AZ::Uuid& objectType, AZ::JsonSerializerSettings settings = AZ::JsonSerializerSettings{});`   
+ `output` - The RapidJSON document or value to write to\. Objects can be serialized at an arbitrary point in a JSON document by providing the appropriate value\.
+ `allocator` - The memory allocator used by RapidJSON\.
+  `object` - The object to serialize, as anonymous data\. 
+ `defaultObject` \- An object providing the values to treat as the defaults during serialization\. Any members of `object` with values that don't match `defaultObject` are guaranteed to be serialized\. If a null pointer is passed as the default object, a temporary default may be created during serialization\.
+ `objectType` \- The UUID registered with the Lumberyard runtime representing the class for the provided `object`\. The class represented by this UUID must be registered with the provided serialization context\. 
+ `settings` - Configuration for how to treat the serialization\. If not provided, the default settings are used, except that default values will be stored in the output provided `defaultObject` is not null\.

### `AZ::JsonSerializerSettings` {#serialization-json-serialize-store-settings}

The behavior of the `AZ::JsonSerialization::Store()` methods can be controlled by setting an instance of `AZ::JsonSerializerSettings` as the `settings` argument\.

`bool m_keepDefaults`  
If `true`, then defaults are written to the JSON value when serialized\.  
*Default*: `false`

`AZ::SerializeContext* m_serializeContext`  
The serialization context to query for information about how to serialize the provided object\.  
*Default*: The global seralization context retrieved from the `ComponentApplicationBus` event bus\.

`AZ::JsonSerializationResult::JsonIssueCallback m_reporting`  
Callback method invoked when an error is encountered during serialization\. This function has no access to the object being serialized or the JSON value being written to, but can be used for altering result codes\.  
*Default*: The default issue reporter, which logs warnings and errors encountered in serialization\.

`AZ::JsonRegistrationContext* m_registrationContext`  
JSON registration context\. For examples of how to use a custom JSON context, see the source code\.  
*Default*: The global registration context retrieved from the event bus\.

**Example Serialization example**  
The following is a short example demonstrating how to serialize a simple class\. Details regarding registering the class with the serialization context are omitted\.  

```
class SerializableClass
{
    double  m_var1;
    int     m_var2;
}

// ... Register with serialization context

SerializableClass instance;
instance.m_var1 = 42.0;
instance.m_var2 = 88;
 
rapidjson::Document document;
AZ::JsonSerializationResult::ResultCode result = AZ::JsonSerialization::Store(document, document.GetAllocator(), instance);
if (result.GetProcessing() == AZ::JsonSerializationResult::Processing::Halted)
{
    AZ_Warning("Serialization", false,
        "Unable to fully serialize SerializableClass to json because %s.",
        result.ToString().c_str());
}
 
rapidjson::StringBuffer buffer;
rapidjson::Writer<decltype(buffer)> writer(buffer);
document.Accept(writer);
AZ_TracePrintf("Serialization", "SerializableClass as Json:\n%s", buffer.GetString());
```

## Deserialization {#serialization-json-deserialize}

Deserialization from JSON into an object is done with the `static AZ::JsonSerialization::Load()` method\. This method has two overloads \- one for use when an instance of the deserialized object type is available, and the other using `void*` and RTTI information\.

### `AZ::JsonSerialization::Load()` overloads {#serialization-json-deserialize-load}

`template<typename T> static AZ::JsonSerializationResult::ResultCode AZ::JsonSerialization::Load(T& object, const rapidjson::Value& root, AZ::JsonDeserializerSettings settings = AZ::JsonDeserializerSettings{});`   
+ `object` \- The object to load data into\.
+ `root` \- The root of the JSON tree to deserialize from\. This is normally a full JSON document, but can be any JSON value that will deserialize correctly to type `T`\.
+ `settings` \- Configuration for how to treat deserialization\.

 `static AZ::JsonSerializationResult::ResultCode AZ::JsonSerialization::Load(void* object, const AZ::Uuid& objectType, const rapidjson::Value& root, AZ::JsonDeserializerSettings settings = AZ::JsonDeserializerSettings{});`   
+ `object` \- A pointer to memory allocated as an object matching the type registered for `objectType`\.
+ `objectType` \- The UUID registered with the Lumberyard runtime representing the class for the provided `object`\. The class represented by this UUID must be registered with the provided serialization context\.
+ `root` \- The root of the JSON tree to deserialize from\. This is normally a full JSON document, but can be any JSON value that will deserialize correctly to the type identified by `objectType`\.
+ `settings` \- Configuration for how to treat deserialization\.

### `AZ::JsonDeserializerSettings` {#serialization-json-deserialize-load-settings}

The behavior of the `AZ::JsonSerialization::Load()` methods can be controlled by setting an instance of `AZ::JsonDeserializerSettings` as the `settings` argument\.

`bool m_clearContainers`  
If `true`, then container members of the target `object` to deserialize into are cleared before beginning deserialization\. This option has no effect for classes with a fixed layout\.  
*Default*: `false`

`AZ::SerializeContext* m_serializeContext`  
The serialization context to query for information about how to deserialize to the object\.  
*Default*: The global seralization context retrieved from the `ComponentApplicationBus` event bus\.

`AZ::JsonSerializationResult::JsonIssueCallback m_reporting`  
Callback method invoked when an error is encountered during deserialization\. This function has no access to the object being serialized or the JSON value being written to, but can be used for altering result codes\.  
*Default*: The default issue reporter, which logs warnings and errors encountered in deserialization\.

`AZ::JsonRegistrationContext* m_registrationContext`  
JSON registration context\. For examples of how to use a custom JSON context, see the source code\.  
*Default*: The global registration context retrieved from the event bus\.

**Example Deserialization example**  
The following is a short example demonstrating how to deserialize\. Details regarding how to load JSON data into memory and registering with the serialization context are omitted\.  

```
rapidjson::Document document;
// ...read json document from file.
 
SerializableClass instance;
AZ::JsonSerializationResult::ResultCode result = AZ::JsonSerialization::Load(instance, document);
if (result.GetProcessing() == AZ::JsonSerializationResult::Processing::Halted)
{
    AZ_Warning("Deserialization", false,
        "Unable to fully deserialize SerializableClass from json because %s.",
        result.ToString().c_str());
}
```

## Result codes {#serialization-json-result-codes}

 The JSON serializer uses the `AZ::JsonSerializationResult::ResultCode` type to report errors, warnings, and successful serialization and deserialization of objects\. Result codes are broken down into three parts: task, processing result, and final outcome\. These values can be obtained with the `GetTask()`, `GetProcessing()`, and `GetOutcome()` methods respectively\. When checking results, you should first start with the processing to see if the task was successfully completed or if an error was encountered\. For non\-`Success` values, the task indicates where in processing the error was encountered, and the outcome reflects why the failure occurred\. 

 To write serialization results to a string, use the `AZ::JsonSerializationResult::ResultCode::AppendToString()` and `AZ::JsonSerializationResult::ResultCode::ToString()`, or `AZ::JsonSerializationResult::ResultCode::ToOSString()` methods\. 

**Processing results**

`Completed`  
Processing completed successfully\.

`Altered`  
Processing completed after encountering an error\. Error recovery was performed, so the input and output will not necessarily match\.

`PartialAlter`  
Processing completed after encountering multiple errors, and was able to perform error recovery by making multiple alterations\.

`Halted`  
Processing failed and was unable to complete\. This indicates an unrecoverable error or other serious failure\.

**Tasks**

`RetrieveInfo`  
Retrieve information from the system, such as querying a serialization context\.

`CreateDefault`  
Creation of a default instance to use to provide default values during processing\.

`Convert`  
Type conversion between values\.

`Clear`  
Clearing a field or value\.

`ReadField`  
Reading a field from JSON to write to an object value\.

`WriteValue`  
Writing from an object value to a JSON field\.

`Merge`  
Merging two JSON values or documents together\.

`CreatePatch`  
Creation of a patch to transform one JSON value to another\.

**Outcomes**

`Success`  
The task completed successfully\.

`Skipped`  
The task skipped a field or value\.

`PartialSkip`  
The task skipped one or more fields while processing a JSON object or array\.

`DefaultsUsed`  
Task completed using only default values\.

`PartialDefaults`  
Task completed using defaults for some values\.

`Unavailable`  
Task tried to use space which isn't available\.

`Unsupported`  
An unsupported action was requested while performing the task\.

`TypeMismatch`  
The source and target were unrelated, and no type conversion could be performed\.

`TestFailed`  
A test check against a value failed\.

`Missing`  
A required field or value was missing\.

`Invalid`  
A field or element contained an invalid value\.

`Unknown`  
Unknown information was encountered during the task\.

`Catastrophic`  
An unidentifiable or unknown catastrophic error occurred during the task\.