---
description: ' How JSON types convert to internal &ALY; data types. '
title: Data types in serialized JSON
---
# Data types in serialized JSON {#serialization-json-data-types}

 In addition to primitive C\+\+ types that map directly to JSON types, Lumberyard supports serializing many `AZStd` library objects\. JSON output and deserialized objects are entirely deterministic based on the appropriate C\+\+ type\. For some more information on how members are registered and how their types are determined through the reflection system, see [JSON serialization](/docs/userguide/programming/serialization/json-serialize-deserialize#serialization-json-serialize)\. 

 This topic is a reference of the types supported by Lumberyard serialization and deserialization, how the serializer maps them by default, and information on how JSON types are coerced back to C\+\+ types\. 

## Primitives {#serialization-json-data-types-primitives}

 The primitive types used in serialization are *booleans*, *integers*, *floating point numbers*, and *strings*\. These C\+\+ types map naturally to the native JSON boolean, number, and string types\. The only string types supported for serialization are `AZstd::string` and `OSString`\.

Deserialization can be conducted from any primitive JSON type to these C\+\+ types as follows:


**Basic type mappings**  

| C\+\+ Type | JSON boolean | JSON number | JSON string | 
| --- | --- | --- | --- | 
| bool | Direct mapping\. | 0 maps to false, all other values are true\. | Case\-insensitive comparison against "true" and "false" to map to the respective C\+\+ values\. | 
| Integer types | True maps to 1, False to 0\. | Direct mapping, where floating point values are truncated\. | Tries to extract a 64\-bit integer and convert to the target integer type\.  | 
| Floating point types | True maps to 1, False to 0\. | Direct mapping\. | Tries to extract a 64\-bit floating point and convert it to the target type\. | 
| Strings \(AZstd::string and OSString only\) | True is converted to "True", and False to "False"\. | String representation of the number\. | Direct mapping\. | 

## Pointers {#serialization-json-data-types-pointers}

 Pointers and smart pointer types are serialized out to the type that they point to as JSON values, following all of the rules for that type\. For pointers to C\+\+ objects, this means that the pointed\-to object must be registered with the serialization context being used\. While most types can be safely serialized without any metadata, for derived classes, an additional `$type` key is serialized into the JSON object with the class' name\. If there could possibly be a conflict in the class name, fully namespaced names or a class' UUID in the Lumberyard runtime can be used\. 

 When deserializing, the `$type` value is used as a hint to determine which object to reconstruct if necessary\. Otherwise, only the C\+\+ type of the member is inspected\. Deserialization proceeds memberwise, using the field mapping that was registered with the serialization context to map JSON object keys to C\+\+ members\. 

## Enums {#serialization-json-data-types-enums}

 In order to serialize enums, they need to be [registered](/docs/userguide/programming/serialization/register-objects#serialization-register-objects-enums) with the same serialization context as the class being serialized\. How values from an enum are serialized and deserialized depend on the details of the enum registration\. 
+ **Enum value matches the value of a registered field** - The value is serialized as a string containing the field name\.
+ **Enum value can't be represented as ORed registered values** - The value is serialized as an integer\.
+  **Enum value can be represented as ORed registered values** - The value is serialized to an array containing strings of the field names that were ORed together\. 
+  **Enum value can be represented as a mix of ORed registered values and unregistered values** - The value is serialized to an array containing the strings of the appropriate field names and a single integer that when ORed together, produce the serialized value\. 

**Example Serializing an enum**  
These rules are best illustrated with a simple example to show an enum definition, its registration with the serialization context, and the serialization output for various values\.  

```
enum ExampleEnum : uint8_t
{
    Flag1 = 1,
    Flag2 = 2,
    Flag3 = 4,
    Flag4 = 8,
    Flag5 = Flag2 | Flag3
}

//------

// Registration with SerializedContext
serializeContext->Enum<ExampleEnum>()
    ->Value("Flag1", ExampleEnum::Flag1)
    ->Value("Flag2", ExampleEnum::Flag2)
    ->Value("Flag4", ExampleEnum::Flag4)
    ->Value("Flag2Flag3Combo", ExampleEnum::Flag5)

//------

// ExampleEnum initialization with int
ExampleEnum(0) // Serializes as 0
ExampleEnum(1) // Serializes as "Flag1"
ExampleEnum(-1) // Serializes as 255
ExampleEnum(10) // Serializes as ["Flag2", "Flag4"]

// Declared ExampleEnum values
ExampleEnum::Flag1 // Serializes as "Flag1"
ExampleEnum::Flag3 // Serializes as 4
ExampleEnum::Flag5 // Serializes as "Flag2Flag3Combo"

// ORed together values
ExampleEnum::Flag1 | ExampleEnum::Flag4 // Serializes as ["Flag1", "Flag4"]
ExampleEnum::Flag2 | ExampleEnum::Flag3 // Serializes as "Flag2Flag3Combo"
ExampleEnum::Flag1 | ExampleEnum::Flag3 // Serializes as ["Flag1", 4]
ExampleEnum::Flag2 | ExampleEnum::Flag3 | ExampleEnum::Flag1 // Serializes as ["Flag1", "Flag2Flag3Combo"]
ExampleEnum::Flag4 | 16 // Serializes as ["Flag4", 16]
```

 Deserialization behaves as expected based on these serialization outputs\. Strings are first attempted to be mapped to a field name, and then the enum is assigned the field's value\. If the string contains something other than a field name, a type conversion to an integer is attempted\. Arrays have each element evaluated to convert to the enum field or an integer value, and then the results of those evaluations are ORed to produce the final deserialized value\. 

## Vectors {#serialization-json-data-types-vectors}

Serialization supports 2D, 3D, and 4D vectors\. An N\-dimensional vector is serialized as a JSON array of N floating point numbers, in the order of the X, Y, Z, and W coordinate\.

For deserialization, vectors can be read from an array of any length, but will only read up to the number of elements in the target type\. If the array has fewer elements than the vector type, those vector components are assigned the default value of 0\. Array elements follow the rules of deserialization for the C\+\+ floating point type of the vector elements\. Vectors can also be deserialized from JSON objects where the object keys map to the vector component name in a case\-insensitive compare\. Other keys are ignored, and components with missing keys use the default value\.

## Containers {#serialization-json-data-types-containers}

 Serialization supports a number of containers from `AZStd`\. These include the *array*, *vector*, *list*, *set*, *map*, and *tuple* types\.

### Array types {#serialization-json-data-types-containers-arrays}

The following types are serialized to JSON arrays:
+ `AZStd::array`
+ `AZStd::fixed_vector`
+ `AZStd::forward_list`
+ `AZStd::list`
+ `AZStd::vector`
+ `AZStd::pair`
+ `AZStd::tuple`
+ `AZStd::set` \- Values in the serialized array are sorted
+ `AZStd::unordered_set` \- Values in the serialized array are sorted

Deserialization of a JSON array to a C\+\+ array, list, vector, set, pair, or tuple type is a direct element\-by\-element conversion\. The types of each array element are converted to the target container's value type according to the other JSON deserialization rules\. Missing elements map to the default for the container's value type, and additional elements are ignored\. Types other than JSON arrays will result in a conversion error when attempting to deserialize to one of these C\+\+ types\.

### Map types {#serialization-json-data-types-containers-maps}

The serialization of map types \(`AZStd::map`, `AZStd::unordered_map`, `AZStd::unordered_multimap`\) depends on the map's key type\. Maps with a serializable string type \(`AZStd::string` or `OSString`\) as the key are serialized directly to JSON objects with equivalent key/value pairs\. Maps with any other key type are serialized to JSON arrays, where every element is a key/value pair\. For example, the map `AZStd::map<uint8_t,uint8_t> = {0:1, 2:3}` serializes to the JSON array `[{"Key": 0, "Value": 1}, {"Key": 2, "Value": 3}]`\.

## Miscellaneous types {#serialization-json-data-types-misc}

Other internal types supported by JSON serialization are *UUID* and *color*\.

`AZ::Uuid` are mapped to JSON strings by `AZ::Uuid::ToString()`, and strings are converted back to UUIDs from `AZ::Uuid::CreateString()`\.

Color types are serialized to JSON arrays containing 3 float values for RGB colors, and 4 values for RGBA\. JSON arrays of 3 or 4 values can be deserialized directly back to RGB or RGBA, but JSON objects can also be deserialized to colors\. For an object to be deserialized to a color, it must have exactly one key of the following names, with an equivalent value type\.


**Color deserialization from JSON objects**  

| Key | Value type | Example | 
| --- | --- | --- | 
| RGB | Array of 3 floating point elements\. | \{ "RGB" : \[1\.0, 0\.3, 0\.2\] \} | 
| RGBA | Array of 4 floating point elements\. | \{ "RGBA" : \[1\.0, 0\.3, 0\.2, 0\.8\] \} | 
| RGB8 | Array of 3 integer elements with values in the range \[0, 255\]\. | \{ "RGB8" : \[255, 77, 51\] \} | 
| RGBA8 | Array of 4 integer elements with values in the range \[0, 255\]\. | \{ "RGBA8" : \[255, 77, 51, 204\] \} | 
| HEX | A string containing 3 8\-bit hex values representing the colors\. | \{ "HEX" : "FF4D33" \} | 
| HEXA | A string containing 4 8\-bit hex values representing the colors and alpha channel\. | \{ "HEXA" : "FF4D33CC" \} | 