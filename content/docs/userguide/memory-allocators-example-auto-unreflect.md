# Code Example: Automatic Unreflection of Module Classes<a name="memory-allocators-example-auto-unreflect"></a>

To automatically unreflect a module's reflected classes from the `SerializeContext` when the module unloads, you can create a class that contains an instance of a memory allocator separate from the `SerializeContext`\. 

To manage memory allocations of reflected `GenericClassInfo` classes within the module until the module is unloaded, use the class in a static variable context\. Because static variable destructors are invoked when the module unloads, the destructor for the static variable can use the opportunity to unreflect all of the module's reflected `GenericClassInfo` classes\.

This is a safety measure that can prevent shutdown errors\. For example, if a gem that is no longer loaded has a reflected class, and you attempt to use `SerializeContext` to serialize that class, a shutdown error can occur\.

**Example DLL Cleanup Class**  
In the following code example, the `PerModuleGenericClassInfo` class tracks module\-specific reflections of `GenericClassInfo` for each `SerializeContext` that is registered with the module \(`.dll` file\)\.  

```
/// DLL Cleanup Class
class SerializeContext::PerModuleGenericClassInfo final
{
public:
    PerModuleGenericClassInfo();
    ~PerModuleGenericClassInfo();

    /// Creates GenericClassInfo and registers it with the current module if it
    /// has not already been registered.
    /// Returns a pointer to the class that was created by deriving from GenericClassInfo.
    template <typename T>
    typename SerializeGenericTypeInfo<T>::ClassInfoType* CreateGenericClassInfo();
private:

    /// Creates a local OSAllocator which will be used by the data members to 
    /// allocate memory from the operating system heap.
    AZ::OSAllocator m_moduleOSAllocator;
  
    /// Creates a type alias to associative containers with a custom allocator interface.
    /// AZ::AZStdIAllocator wraps an IAllocator interface allocator and dynamically
    /// associates an allocator with a type.
    using GenericInfoModuleMap = AZStd::unordered_map<AZ::Uuid, AZ::GenericClassInfo*, AZStd::hash<AZ::Uuid>, AZStd::equal_to<AZ::Uuid>, AZ::AZStdIAllocator>;
    using SerializeContextSet = AZStd::unordered_set<SerializeContext*, AZStd::hash<SerializeContext*>, AZStd::equal_to<SerializeContext*>, AZ::AZStdIAllocator>;
    GenericInfoModuleMap m_moduleLocalGenericClassInfos;
    SerializeContextSet m_serializeContextSet;
};
 
/// Initializes the OSAllocator and constructs the associative containers with OSAllocator.
SerializeContext::PerModuleGenericClassInfo::PerModuleGenericClassInfo()
    : m_moduleLocalGenericClassInfos(AZ::AZStdIAllocator(&m_moduleOSAllocator))
    , m_serializeContextSet(AZ::AZStdIAllocator(&m_moduleOSAllocator))
{
}
 
/// Cleans up all GenericClassInfo objects created within the current .dll and 
/// unregisters them from the SerializeContext.
SerializeContext::PerModuleGenericClassInfo::~PerModuleGenericClassInfo()
{
    // Cleans up the memory for the GenericClassInfo objects.
    for (const AZStd::pair<AZ::Uuid, AZ::GenericClassInfo*>& moduleGenericClassInfoPair : genericClassInfoContainer)
    {
        GenericClassInfo* genericClassInfo = moduleGenericClassInfoPair.second;
        // Explicitly invokes the destructor and clears the memory from the OSAllocator module.
        genericClassInfo->~GenericClassInfo();
        m_moduleOSAllocator.DeAllocate(genericClassInfo);
    }

    // Reconstructs the associative containers with the OSAllocator so that the previously 
    // allocated memory is cleared. This ensures that the associative containers do not 
    // attempt to deallocate memory within their destructors.
    {
        m_moduleLocalGenericClassInfos = GenericInfoModuleMap(AZ::AZStdIAllocator(&m_moduleOSAllocator));
        m_serializeContextSet = SerializeContextSet(AZ::AZStdIAllocator(&m_moduleOSAllocator));
    }
}

/// Creates a GenericClassInfo object and registers it with the SerializeContext that is 
/// managed by PerModuleGenericClassInfo class instance in the current .dll.
/// It will be unregistered with the SerializeContext when the current .dll unloads.
template<typename T>
typename SerializeGenericTypeInfo<T>::ClassInfoType* SerializeContext::PerModuleGenericClassInfo::CreateGenericClassInfo()
{
    using GenericClassInfoType = typename SerializeGenericTypeInfo<T>::ClassInfoType;
     
    // Uses OSAllocator to allocate memory for the GenericClassInfoType and constructs it.
    // OSAllocator is then used to add the GenericClassInfoType to an associative container.
 
    void* rawMemory = m_moduleOSAllocator.Allocate(sizeof(GenericClassInfoType), alignof(GenericClassInfoType));
    new (rawMemory) GenericClassInfoType();
    auto genericClassInfo = static_cast<GenericClassInfoType*>(rawMemory);
    if (genericClassInfo)
    {
        m_moduleLocalGenericClassInfos.emplace(genericClassInfo->GetSpecializedTypeId(), genericClassInfo);
    }
    return genericClassInfo;
}
 
// Static variable in a .cpp file.
// Constructs a static instance of the PerModuleGenericClassInfo class that manages 
// GenericClassInfo objects for each loaded .dll or executable.
static SerializeContext::PerModuleGenericClassInfo s_ModuleCleanupInstance;
```