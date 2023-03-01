---
linkTitle: Serialization Context
title: Serialization Context in O3DE
description: Use the serialization context in Open 3D Engine (O3DE) to provide persistence for C++ objects or O3DE types.
weight: 100
---

You can use the **Open 3D Engine (O3DE)** serialization context to provide persistence for C++ objects or any O3DE type. The `SerializeContext` class is defined in `Code/Framework/AzCore/AzCore/Serialization/SerializeContext.*`. To implement this, make an `AzTypeInfo` declaration or use `AZ_RTTI` (runtime type information), as in the following example:

```cpp
class SerializedObject
{
public:
    AZ_RTTI(SerializedObject, "");
    static void Reflect(AZ::ReflectContext* context)
    {
        SerializeContext* serializeContext = azrtti_cast<SerializeContext*>(reflection);
        if (serializeContext)
        {
            serializeContext->Class<SerializedObject>()
                ;
        }
    }
};
```

You can also reflect native types and [POD structs](https://en.wikipedia.org/wiki/C++_classes#POD-structs) for serialization by creating an `AZ_TYPE_INFO` specialization, as in the following code example:

```cpp
AZ_TYPE_INFO_SPECIALIZE(AZStd::chrono::system_clock::time_point, "{5C48FD59-7267-405D-9C06-1EA31379FE82}");
AZ_TYPE_INFO_SPECIALIZE(float, "{EA2C3E90-AFBE-44d4-A90D-FAAF79BAF93D}");
```

## Fields

To associate a text string with the address to a field of a serialized object, use the `Field` function, as in the following example. You can use the builder pattern to serialize multiple fields.

```cpp
serializedContext->Class<SerializedObject>()
    ->Field("myIntField", &SerializedObject::myIntField)
    ->Field("myFloatField", &SerializedObject::myFloatField)
;
```

## Serializers

Serializers are a useful way to provide custom data formats. If you want to do custom processing on an object before writing or reading it, you can override O3DE's default serializer.

To override the default serializer, implement the `AZ::SerializeContext::IDataSerializer` interface. Use the interface to override how data is handled as it is streamed into its persistent format. You can also use the interface to determine the actions that occur when the reflected object is serialized (read or written).

The `AZ::Uuid` class `(Code/Framework/AzCore/AzCore/Math/MathScriptHelpers.h)` provides a good example of a custom serializer. To save a UUID value, the code writes it directly into the stream. This part of the code is straightforward.

```cpp
/// Store the class data into a binary buffer.
size_t Uuid::Save(const void* classPtr, IO::GenericStream& stream, bool)
{
    const Uuid* uuidPtr = reinterpret_cast<const Uuid*>(classPtr);
    return static_cast<size_t>(stream.Write(16, reinterpret_cast<const void*>(uuidPtr->data)));
}
```

Loading a UUID is also straightforward, but the code does some error checking to ensure that the data loads as expected:

```cpp
/// Load the class data from a stream.
bool Uuid::Load(void* classPtr, IO::GenericStream& stream, unsigned int /*version*/, bool)
{
    if (stream.GetLength() < 16)
    {
        return false;
    }
    Uuid* uuidPtr = reinterpret_cast<Uuid*>(classPtr);
    if (stream.Read(16, reinterpret_cast<void*>(&uuidPtr->data)) == 16)
    {
        return true;
    }
    return false;
}
```

The custom serializer has functions that convert the data between binary and text formats. By converting the data into text format, you can store it in `.xml` or `.json` files.

The following `DataToText` function reads the binary value for the UUID from the incoming stream. The function converts the binary value into an `AZStd::string` and then writes it to the outgoing stream.

```cpp
size_t Uuid::DataToText(IO::GenericStream& in, IO::GenericStream& out, bool)
{
    if (in.GetLength() < 16)
    {
        return 0;
    }
    Uuid value;
    void* dataPtr = reinterpret_cast<void*>(&value.data);
    in.Read(16, dataPtr);
    char str[128];
    value.ToString(str, 128);
    AZStd::string outText = str;
    return static_cast<size_t>(out.Write(outText.size(), outText.data()));
}
```

The following `TextToData` function converts the text input string into binary UUID format and then writes the binary data out to the stream.

```cpp
/// Convert text data to binary to support the loading of legacy formats.
// Respect the text version if the text->binary format has changed!
size_t Uuid::TextToData(const char* text, unsigned int, IO::GenericStream& stream, bool)
{
    Uuid uuid = Uuid::CreateString(text);
    stream.Seek(0, IO::GenericStream::ST_SEEK_BEGIN);
    return static_cast<size_t>(stream.Write(16, uuid.data));
}
```

## Data containers

To create custom serialization for templates and types that are not directly reflected through the `SerializeContext::Reflect` function, you can use data containers.

To create a data container, implement the `AZ::SerializeContext::IDataContainer` interface. You can use this interface to provide serialization for a class or template of classes and let the user choose the elements to be serialized. This is possible because `IDataContainer` allows the user to override an `EnumElements` function. The `EnumElements` function determines which elements of the serialized class are enumerated and are therefore capable of being serialized.

### Templates

Data containers provide the best way to add support for templates to the serialization context. The following templates have a [metaclass](https://en.wikipedia.org/wiki/Metaclass) that implements the `IDataContainer` interface and serializes the templates.

```cpp
AZStd::vector<T>
AZStd::basic_string<T>
AZStd::unique_ptr<T>
```

### Nontemplate types

You can use the `IDataContainer` interface to serialize nontemplate types like `AZStd::any`. This is because the type of element that is serialized is dependent on the type that is stored in the `AZStd::any` object.

**Stable Elements**
Elements are considered stable if their pointers do not change when other elements are added to or removed from a container. O3DE's implementation of stable elements corresponds to the [C++17](https://en.wikipedia.org/wiki/C++17) rules for iterator invalidation as documented in section 26 of the [ISO/IEC 14882:2017(E)](https://www.iso.org/standard/68564.html) standard. The elements in types like `AZStd::vector` are not stable because they are stored in a contiguous sequence. When an element that is not at the end of the vector is removed, all elements after it in memory must shift to the left to keep the sequence contiguous. Stable elements can be removed from a container without affecting other elements in the container. You can use the `IsStableElements` function to determine the status of a container's elements. If a container's elements are not stable, you must enumerate them in order for them to be serialized.

The following code example shows how to set up serialization for a container that stores a dynamic sequence of homogenous elements.

```cpp
template<class T, bool IsStableIterators>
class AZStdBasicContainer
    : public SerializeContext::IDataContainer
{
public:
    typedef typename T::value_type ValueType;
    typedef typename AZStd::remove_pointer<typename T::value_type>::type ValueClass;
    ///... Functions implementing the IDataContainer interface
};
```

A `SerializeContext::ClassElement` is a struct that uniquely identifies a serialized element of a class. It includes fields like the following:

+ `TypeId` -- An ID for looking up data in `ClassData` within the `SerializeContext`.
+ `Name`, `NameCrc` -- The name and CRC with which the element is serialized.
+ Element-specific serialization attributes.

To look up the name of the `SerializeContext::ClassElement` that the data container supports, override the `GetElement` function, as in the following example.

```cpp
// Returns the class element by looking up the CRC value of the element.
// Returns null if the element with the specified name can't be found.
const SerializeContext::ClassElement* GetElement(u32 elementNameCrc) const override
{
    if (elementNameCrc == m_classElement.m_nameCrc)
    {
        return &m_classElement;
    }
    return nullptr;
}
// The following GetElement method uses the supplied DataElement object to lookup the ClassElement with the supplied parameter. Returns true if it finds a ClassElement.
bool GetElement(SerializeContext::ClassElement& classElement, const SerializeContext::DataElement& dataElement) const override
{
    if (dataElement.m_nameCrc == m_classElement.m_nameCrc)
    {
        classElement = m_classElement;
        return true;
    }
    return false;
}
```

The following example shows how to override the `EnumElement` method to specify the elements that are enumerated. Enumerating them enables them to be saved.

```cpp
/// Enumerate elements in the array.
/// The ElementCB callback enumerates the children of the elements in the array.
/// By invoking the callback on an element, the enumeration continues down the path for that element.
void EnumElements(void* instance, const ElementCB& cb) override
{
    T* arrayPtr = reinterpret_cast<T*>(instance);
    typename T::iterator it = arrayPtr->begin();
    typename T::iterator end = arrayPtr->end();
    for (; it != end; ++it)
    {
        ValueType* valuePtr = &*it;
        if (!cb(valuePtr, m_classElement.m_typeId, m_classElement.m_genericClassInfo ? m_classElement.m_genericClassInfo->GetClassData() : nullptr, &m_classElement))
        {
            break;
        }
    }
}
```

To make a template editable in **O3DE Editor** and the reflected property editor, override the constraint functions in the following code:

```cpp
// The following code defines the characteristics of the container that is serialized.
// The editing facilities use this information to determine how to edit the elements within the container.

/// Return the number of elements in the container.
size_t  Size(void* instance) const override
{
    const T* arrayPtr = reinterpret_cast<const T*>(instance);
    return arrayPtr->size();
}
/// Return the capacity of the container. Return 0 for objects without fixed capacity.
size_t Capacity(void* instance) const override
{
    (void)instance;
    return 0;
}

/// Return true if the element pointers do not change when the element is added to or removed from the container. If false, you MUST enumerate all elements.
bool    IsStableElements() const override           { return IsStableIterators; }

/// Return true if the container has a fixed size; otherwise false.
bool    IsFixedSize() const override                { return false; }

/// Return true if the container has a fixed capacity; otherwise false.
bool    IsFixedCapacity() const override            { return false; }

/// Return true if the container is a smart pointer.
bool    IsSmartPointer() const override             { return false; }

/// Return true if the elements can be retrieved by index.
bool    CanAccessElementsByIndex() const override   { return false; }
```

{{< note >}}
+ When `IsFixedSize` and `IsFixedCapacity` are false, the plus (+) and minus (-) buttons in the property editor can be used to add and remove elements from the data container.
+ When `IsSmartPointer` is false, the data container does not create an instance of the `SmartPointer` type when an element is added to the container.
+ When `CanAccessElementsByIndex` is false, the serialization system checks whether to allocate memory for new elements. `CanAccessElementsByIndex` is true for fixed-size containers like `AZStd::array`, `AZStd::pair`, and `AZStd::tuple` because those containers already have memory storage allocated for their elements.
{{< /note >}}

To load an element into the template class instance, override the `ReserveElement`, `StoreElement`, and `RemoveElements` functions, as in the following example.

```cpp
/// Use the reserve element function.
/// The reserve element function allows creation of the element on the data container instance.
/// The following code serializes an element and returns an address to the reserved element.
void*   ReserveElement(void* instance, const SerializeContext::ClassElement* classElement) override
{
    (void)classElement;
    T* arrayPtr = reinterpret_cast<T*>(instance);
    arrayPtr->push_back();
    return &arrayPtr->back();
}
/// Use the GetElementByIndex function to get an element's address by its index.
// Call this function before the element is loaded.
void*   GetElementByIndex(void* instance, const SerializeContext::ClassElement* classElement, size_t index) override
{
    (void)instance;
    (void)classElement;
    (void)index;
    return nullptr;
}
/// Use the store element function.
void    StoreElement(void* instance, void* element) override
{
    (void)instance;
    (void)element;
    // Do nothing; you have already pushed the element.
    // However, you can assert and check if the element belongs to the container.
}
/// Remove the element from the container.
/// This also deletes the memory associated with the element.
bool    RemoveElement(void* instance, const void* element, SerializeContext* deletePointerDataContext) override
{
    T* arrayPtr = reinterpret_cast<T*>(instance);
    for (typename T::iterator it = arrayPtr->begin(); it != arrayPtr->end(); ++it)
    {
        void* arrayElement = &(*it);
        if (arrayElement == element)
        {
            if (deletePointerDataContext)
            {
                DeletePointerData(deletePointerDataContext, &m_classElement, arrayElement);
            }
            arrayPtr->erase(it);
            return true;
        }
    }
    return false;
}
/// Remove elements (remove an array of elements) whether the container is stable or not. Stability can be tested by IsStableElements.
size_t  RemoveElements(void* instance, const void** elements, size_t numElements, SerializeContext* deletePointerDataContext) override
{
    if (numElements == 0)
    {
        return 0;
    }
    size_t numRemoved = 0;
    // Handle the case when the container does not have stable elements.
    if (!IsStableIterators)
    {
        // If the elements are in order, you can remove all of them from the container.
        // Otherwise, they must be sorted again locally (not done in this example).
        // Or, ask the user to pass the elements in order and remove the first N possible in order.
        for (size_t i = 1; i < numElements; ++i)
        {
            if (elements[i - 1] >= elements[i])
            {
                AZ_TracePrintf("Serialization", "RemoveElements for AZStd::vector will perform optimally when the elements (addresses) are sorted in accending order!");
                numElements = i;
            }
        }
        // Traverse the vector in reverse order, and then addresses of elements that should not change.
        for (int i = static_cast<int>(numElements); i >= 0; --i)
        {
            if (RemoveElement(instance, elements[i], deletePointerDataContext))
            {
                ++numRemoved;
            }
        }
    }
    else
    {
        for (size_t i = 0; i < numElements; ++i)
        {
            if (RemoveElement(instance, elements[i], deletePointerDataContext))
            {
                ++numRemoved;
            }
        }
    }
    return numRemoved;
}
/// Clear elements in the instance.
void    ClearElements(void* instance, SerializeContext* deletePointerDataContext) override
{
    T* arrayPtr = reinterpret_cast<T*>(instance);
    if (deletePointerDataContext)
    {
        for (typename T::iterator it = arrayPtr->begin(); it != arrayPtr->end(); ++it)
        {
            DeletePointerData(deletePointerDataContext, &m_classElement, &(*it));
        }
    }
    arrayPtr->clear();
}
```

## Using the data container to serialize a template class

After you have defined a data container, you can use it to serialize a specific type. For example, to set up serialization for the templated `AZStd::vector<T>`, you must serialize `SerializeGenericTypeInfo<T>` for `AZStd::vector`. To create the class data structure, you use the following `Create<ContainerType>` function:

```cpp
SerializeContext::ClassData::Create<ContainerType>("AZStd::vector", GetSpecializedTypeId(), Internal::NullFactory::GetInstance(), nullptr, &m_containerStorage);
```

The `Create<ContainerType>` function parameters are explained in the following table.

| Parameter | Description |
| --- | --- |
| "AZStd::vector" | Specifies the user friendly name of the class in a JSON or XML stream. |
| GetSpecializedTypeId() | Creates an ID that enables serialization of different types. For example, an `AZStd::vector` of integers can be serialized as a type that is different from an `AZStd::vector` of floats. The unique ID is made by aggregating the template type `AZStd::vector` with the contained type `T`.  |
| Internal::NullFactory::GetInstance() | NullFactory is used to prevent heap memory from being used to create an `AZStd::vector`. To load an `AZStd::vector` element of a pointer type, change this to `Serialize::InstanceFactory<AZStd::vector<T,A>>`. |
| nullptr  | This is the serializer parameter. Because the serialization occurs through a data container, this parameter is nullptr. |
| &m_containerStorage | The `m_containerStorage` structure is an `AZStdBasicContainer` that ClassData uses to serialize the `AZStd::vector` element array. |

The following code example uses the `Create<ContainerType>` function to set up serialization for the templated `AZStd::vector<T>`.

```cpp
/// Generic serialization example for AZStd::vector.
template<class T, class A>
struct SerializeGenericTypeInfo< AZStd::vector<T, A> >
{
    typedef typename AZStd::vector<T, A> ContainerType;
    class GenericClassInfoVector
        : public GenericClassInfo
    {
    public:
        AZ_TYPE_INFO(GenericClassInfoVector, "{2BADE35A-6F1B-4698-B2BC-3373D010020C}");
        GenericClassInfoVector()
        {
            // The following code creates the ClassData structure that specifies how an element is serialized.
            m_classData = SerializeContext::ClassData::Create<ContainerType>("AZStd::vector", GetSpecializedTypeId(), Internal::NullFactory::GetInstance(), nullptr, &m_containerStorage);
        }
        SerializeContext::ClassData* GetClassData() override
        {
            return &m_classData;
        }
        size_t GetNumTemplatedArguments() override
        {
            return 1;
        }
        const Uuid& GetTemplatedTypeId(size_t element) override
        {
            (void)element;
            return SerializeGenericTypeInfo<T>::GetClassTypeId();
        }
        const Uuid& GetSpecializedTypeId() const override
        {
            return azrtti_typeid<ContainerType>();
        }
        const Uuid& GetGenericTypeId() const override
        {
            return TYPEINFO_Uuid();
        }
        void Reflect(SerializeContext* serializeContext)
        {
            if (serializeContext)
            {
                serializeContext->RegisterGenericClassInfo(GetSpecializedTypeId(), this, &AnyTypeInfoConcept<ContainerType>::CreateAny);
                if (GenericClassInfo* containerGenericClassInfo = m_containerStorage.m_classElement.m_genericClassInfo)
                {
                    containerGenericClassInfo->Reflect(serializeContext);
                }
            }
        }
        static GenericClassInfoVector* Instance()
        {
            static GenericClassInfoVector s_instance;
            return &s_instance;
        }
        Internal::AZStdBasicContainer<ContainerType, false> m_containerStorage;
        SerializeContext::ClassData m_classData;
    };
    static GenericClassInfo* GetGenericInfo()
    {
        return GenericClassInfoVector::Instance();
    }
    static const Uuid& GetClassTypeId()
    {
        return GenericClassInfoVector::Instance()->m_classData.m_typeId;
    }
};
```

## Events

To process data before or after you read or write serialized data, you can write serialization event handlers. For example, by handling serialization events, you can perform runtime initializations specific to the data that is serialized.

To create a serialization event handler, implement the `AZ::SerializeContext::IEventHandler` interface as in the following example.

The example uses an event handler to update a map container within the `SceneData` class after a `SceneData` instance has been serialized.

```cpp
class SceneDataEventHandler : public AZ::SerializeContext::IEventHandler
{
public:
    /// Rebuild the endpoint map.
    void OnWriteEnd(void* classPtr) override
    {
        auto* sceneData = reinterpret_cast<SceneData*>(classPtr);
        BuildEndpointMap((*sceneData));
    }
};

// Next add the event handler to the reflection of the class that needs to perform additional data processing.

if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
{
    serializeContext->Class<SceneData>()
          ->EventHandler<SceneDataEventHandler>()
          ;
}
```

## Data overlays

You can use the serialization context to provide data from an external source during serialization. These external sources of data are called *data overlays*.

To create a data overlay, you implement an [**Event Bus (EBus)**](/docs/user-guide/programming/messaging/ebus/) through which the data is serialized. The following example is the code that implements unit testing for the data overlay feature:

```cpp
struct DataOverlayTestStruct
{
    AZ_TYPE_INFO(DataOverlayTestStruct, "{AD843B4D-0D08-4CE0-99F9-7E4E1EAD5984}");
        AZ_CLASS_ALLOCATOR(DataOverlayTestStruct, AZ::SystemAllocator, 0);
        DataOverlayTestStruct()
        : m_int(0)
        , m_ptr(nullptr) {}
    int                     m_int;
    AZStd::vector<int>      m_intVector;
    DataOverlayTestStruct*  m_ptr;
};
```

The `DataOverlayTestStruct` holds data fields to be reflected for serialization:

```cpp
serializeContext.Class<DataOverlayTestStruct>()
                  ->Field("int", &DataOverlayTestStruct::m_int)
                  ->Field("intVector", &DataOverlayTestStruct::m_intVector)
                  ->Field("pointer", &DataOverlayTestStruct::m_ptr);
```

Next, implement the data overlay provider. The provider represents the data source that is overlaid into the serialized data.

The following code shows an example of a data overlay provider:

```cpp
class DataOverlayProviderExample
    : public DataOverlayProviderBus::Handler
{
public:
    static DataOverlayProviderId    GetProviderId() { return AZ_CRC("DataOverlayProviderExample", 0x60dafdbd); }
    static u32                      GetIntToken() { return AZ_CRC("int_data", 0xd74868f3); }
    static u32                      GetVectorToken() { return AZ_CRC("vector_data", 0x0aca20c0); }
    static u32                      GetPointerToken() { return AZ_CRC("pointer_data", 0xa46a746e); }
    DataOverlayProviderExample()
    {
        m_ptrData.m_int = 5;
        m_ptrData.m_intVector.push_back(1);
        m_ptrData.m_ptr = nullptr;
        m_data.m_int = 3;
        m_data.m_intVector.push_back(10);
        m_data.m_intVector.push_back(20);
        m_data.m_intVector.push_back(30);
        m_data.m_ptr = &m_ptrData;
    }
    void FillOverlayData(DataOverlayTarget* dest, const DataOverlayToken& dataToken) override
    {
        if (*reinterpret_cast<const u32*>(dataToken.m_dataUri.data()) == GetIntToken())
        {
            dest->SetData(m_data.m_int);
        }
        else if (*reinterpret_cast<const u32*>(dataToken.m_dataUri.data()) == GetVectorToken())
        {
            dest->SetData(m_data.m_intVector);
        }
        else if (*reinterpret_cast<const u32*>(dataToken.m_dataUri.data()) == GetPointerToken())
        {
            dest->SetData(*m_data.m_ptr);
        }
    }
    DataOverlayTestStruct   m_data;
    DataOverlayTestStruct   m_ptrData;
};
```

`DataOverlayProviderExample` uses the `Crc32` ID for the reflected `DataOverlayTestStruct` source data fields. Then the example implements the `DataOverlayProviderBus::Handler` `FillOverlayData` function. The `FillOverlayData` function is where the actual data overlay occurs. The `DataOverlayToken` holds the ID of the field that is serialized. If the ID matches one of the fields that you want to overlay, you can use `DataOverlayTarget` to set the data.
