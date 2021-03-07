---
description: ' Register objects int the O3DE engine for JSON or XML serialization. '
title: Register objects for serialization
---

 Serialization in O3DE is done by registering classes with a *serialization context*, which takes information about the provided class and uses reflection mechanisms to determine which class members to emit and their types\. Serialization is controlled through the `AZ::SerializeContext` class, declared in `AZCore/Serialization/SerializeContext.h` as part of the `AzCore` library\.

 Serialization requires access to an `AZ::ReflectContext` instance that can be safely cast to a `AZ::SerializeContext` object through the AzCore reflection system\. There's a globally managed serialization context within the O3DE engine that you can retrieve through the `AZComponentApplicationBus`\.

```
AZ::SerializeContext* serializeContext = nullptr;
AZ::ComponentApplicationBus::BroadcastResult(serializeContext, &AZ::ComponentApplicationBus::Events::GetSerializeContext);
```

**Warning**
 When using the global serialization context, only register an object for serialization in a `Reflect` function call\. Registering outside of this function can cause race conditions\. If you need to register for serialization at any other time, use a custom serialization context\.

## Register classes {#serialization-register-objects-classes}

Classes are registered on a serialization context with the `AZ::SerializeContext::Class<T>()` method, using the type `T` to determine which class to register\. In order to be serialized, the class **must** be a specialization of `AzTypeInfo` registered with the `AZ_TYPE_INFO_SPECIALIZE()` macro, or have RTTI information set with the `AZ_RTTI` macro\. The `AZ::SerializeContext::Class<T>()` method returns an `AZ::SerializeContext::ClassBuilder` object, which is used to store version and field information for the class\.

### `AZ::SerializeContext::ClassBuilder` {#serialization-register-objects-classes-classbuilder}

`Version(unsigned int version, VersionConverter converter = nullptr)`
Sets version information for the serialization\.
+  `version` - The version of the class\. Whenever the internal structure of the class changes, the version should be updated\.
+  `converter` - Converter function which translates older versions of the class to the provided `version`\.

`template<class ClassType, class FieldType> Field(const char* name, FieldType ClassType::* address, AZStd::initializer_list<AttributePair> attrbuteIds = {})`
Tags a field in a class for storage\.
+ `name` \- The name to store the field as\. Field names for the same class must be unique\. Matching the member name isn't required\.
+ `address` \- The address of the field to store, as a pointer to member or offset from the start of an instance of `ClassType`\. If a pointer to member is used, all type information is inferred\.
+ `attributeIds` \- Associate other attribute objects with this field\.

`template<class ClassType, class BaseType, class FieldType> FieldFromBase(const char* name, FieldType BaseType:* address)`
Create a field from a base class member\. This can be used if you want to serialize a base class member without registering and serializing a whole base class, to decouple the serialized class from its base\.
+ `name` \- The name to store the field as\. Field names for the same class must be unique\. Matching the member name isn't required\.
+ `address` \- The address of the field to store, as a pointer to member or offset from the start of an instance of `BaseType`\. If a pointer to member is used, all type information is inferred\.

**Example Registering a class for serialization**
The following is an example from the O3DE Asset Processor code, demonstrating how a class can be registered for serialization\.

```
if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
{
    serializeContext->Class<AssetBuilderDesc>()
        ->Version(2)
        ->Field("Flags", &AssetBuilderDesc::m_flags)
        ->Field("Name", &AssetBuilderDesc::m_name)
        ->Field("Patterns", &AssetBuilderDesc::m_patterns)
        ->Field("BusId", &AssetBuilderDesc::m_busId)
        ->Field("Version", &AssetBuilderDesc::m_version)
        ->Field("AnalysisFingerprint", &AssetBuilderDesc::m_analysisFingerprint);
}
```

## Register enums {#serialization-register-objects-enums}

Enums are registered on a serialization context with the `AZ::SerializeContext::Enum<T>()` method, using the type `T` to determine which enum to register\. In order to be serialized, the enum **must** be a specialization of the `AzTypeInfo` using the `AZ_TYPE_INFO_SPECIALIZE()` macro\. The `AZ::SerializeContext::Enum<T>()` method returns an `AZ::SerializeContext::EnumBuilder` object, which is used to store version and value information for the enum\.

### `AZ::SerializeContext::EnumBuilder` {#serialization-register-objects-enums-enumbuilder}

`Version(unsigned int version, VersionConverter converter = nullptr)`
Sets version information for the serialization\.
+  `version` - The version of the enum\. Unlike classes, this doesn't need to change whenever an enum's definition is updated, and is mostly for conversion purposes\.
+  `converter` - Converter function which translates older versions of the enum to the provided `version`\.

`template<class EnumType> Value(const char* name, EnumType value)`
Tags an enum value for serialization as part of the enum's information\.
+ `name` \- The name to store the value as\. Field names for the same enum must be unique\. Matching the internal value name isn't required\.
+ `value` \- The associated value to store for the enum\. If this is a value associated with the enum, all type information is inferred\.

**Important**
 If you're serializing a member from a class with an enum type, that enum **must** be registered with the serializer\.

**Example Registering an enum for serialization**
The following is an example showing a sample declaration of an enum, and a short function that can be called to register it with the serialization system\.

```
enum ExampleEnum : uint8_t
{
    BaseValue   = 0,
    Flag1       = 0x1,
    Flag2       = 0x2,
    Flag3       = 0x4,
    Flag4       = 0x8
}

// AzTypeInfo must be set from within the AZ namespace
namespace AZ
{
    AZ_TYPE_INFO_SPECIALIZE(ExampleEnum, "{7ebef8a5-b40d-4a9a-8511-162da1dc02f0}");
}

void registerEnum(AZ::SerializeContext* context)
{
    if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        context->Enum<ExampleEnum>()
            ->Value("Base", ExampleEnum::BaseValue)
            ->Value("Flag1", ExampleEnum::Flag1)
            ->Value("Flag2", ExampleEnum::Flag2)
            ->Value("Flag3", ExampleEnum::Flag3)
            ->Value("Flag4", ExampleEnum::Flag4)
    }
}
```