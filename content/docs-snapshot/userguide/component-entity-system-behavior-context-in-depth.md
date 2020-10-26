# Behavior Context in Depth<a name="component-entity-system-behavior-context-in-depth"></a>

In Lumberyard 1\.8, the *behavior context* replaces *script context*\. The behavior context works with *serialize context*, *edit context*, and *network context* to provide rich C\+\+ reflection\. The behavior context focuses on the runtime aspects of C\+\+ code and allows you to manipulate C\+\+ code and objects while they are being created\. All script bindings, including Lua, use this reflection\. Reflection is also used for modification of objects while in running state \(such as animating object properties\) and reading of current properties for component state transitions\. You can have multiple behavior contexts that are specialized for different purposes, and you can unreflect the behavior contexts in order to implement reloading\. At a high level, the behavior context uses only a few primitives on which to build: properties, methods, classes, EBuses and attributes\.

For C\+\+ API reference documentation on the behavior context, see the [BehaviorContext Class Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_behavior_context.html) in the [Amazon Lumberyard C\+\+ API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/)\.

## Reflection API<a name="component-entity-system-behavior-context-reflection-api"></a>

This section describes how methods, properties, classes, and other primitives are used in the Lumberyard reflection API\.

### Method<a name="component-entity-system-behavior-context-methods"></a>

Methods reflect a C\+\+ function\. You can have global or class methods\. Each method must have a unique name for its scope \(global or class\)\. You can also provide default values; this allows you to call reflected methods with fewer arguments\. Default values are used right to left\. You can also provide a debug description for your method\. It's highly recommended that you do so\. The debug description information is provided to users for context when they use the reflection, as is done with `ClassView` in the Lua editor\. The system automatically generates a description that includes result and argument types\. However, adding intent and additional details to your descriptions greatly improves the usability of your reflection\. This is especially important when a method has many attributes\.

### Property<a name="component-entity-system-behavior-context-properties"></a>

Properties access data and can be global properties or class properties\. Each property must have a unique name for its scope\. As is customary, a property has getter and setter methods\. If you don't provide a setter method for a property, the property is read only\. If you don't provide a getter method, the property is write only\.

Lumberyard does support global functions, member functions, and Lambda functions as property getters and setters\.

Lumberyard provides macros that you can use to wrap a class value\. You can use `BehaviorValueProperty(&value)` to implement getter and setter methods, or you can implement them individually by using `BehaviorValueGetter` and `BehaviorValueSetter`\. These macros implement Lambda functions for those values\. When the state of your object is modified, you might have to perform operations other than simply setting the value\. For this reason, it is a best practice to always implement your getters and setters\. You can always change your implementation later\.

### Constant<a name="component-entity-system-behavior-context-constants"></a>

Constants are implemented as read\-only properties and can be global or restricted to a class\. A behavior context macro called `BehaviorConstant` implements the Lambda getter for you\.

### Enum<a name="component-entity-system-behavior-context-enum"></a>

Because class enums often require casting, Lumberyard currently treats all enums values as `int`\. Enums are implemented as read\-only `int` properties\.

### Class<a name="component-entity-system-behavior-context-class"></a>

Reflects a C\+\+ class or struct\. You can provide an optional name\. If you do not provide a name, the class name from `AzTypeInfo` is used\. That name must be unique for the scope\. Because the system uses `AzRTTI` to build the class hierarchy, you can use RTTI if you want to reflect base class functionality\.
+ **Allocator** \- You can provide a custom allocator/ deallocator for your class\. This allows you to override any existing allocation schema\. If you do not provide a custom allocator, aznew/delete is used \(`AZ_CLASS_ALLOCATOR`\)\.
+ **Constructor** \- Allows you to enumerate the class constructors that you want to reflect\. You must pass all constructor arguments as template augments\.
+ **Wrapping/WrappingMember** \- Allows code to inform the system that it is a wrapper of another class\. This is useful when you reflect smart pointers and string wrappers\.
+ **Userdata** \- Allows you to provide a pointer to user data\. The pointer is accessible from all callbacks \(like a custom allocator\) that you implement for the class\.
+ **Method** \- Reflects a C\+\+ class function\. The first argument is the class pointer\. This is the same usage as global methods\.
+ **Property** \- Reflects class data\. The first argument is the class pointer\. This is the same usage as global properties\.
+ **Enum** \- Enums are int read\-only properties\.
+ **Constant** \- Constants are read\-only properties\.

#### Nested Classes<a name="component-entity-system-behavior-context-nested-classes"></a>

To bind a nested class to the behavior context, you must do it from within a function on the nested class\. C\+\+ rules about nested class member access from outside scopes make this requirement necessary\.

The following counterexample shows a poorly formed nested class\. The code does not work\.

```
//Bad nested class
class Outer
{
public:
    AZ_TYPE_INFO(Outer, "...");
    static void Reflect(AZ::ReflectContext* context);
    class Inner
    {
    public:
        AZ_TYPE_INFO(Inner, "...");
 
        int m_member = 0;
    }; 
};

void Outer::Reflect(AZ::ReflectContext* context)
{
    if (AZ::BehaviorContext* behavior = azrtti_cast<AZ::BehaviorContext*>(context))
    {
        behavior->Class<Inner>("OuterInner")
            ->Property("member", BehaviorValueProperty(&Inner::m_member))
            ;
    }
}
```

The following code shows a well formed nested class\.

```
//Good nested class 
class Outer
{
public:
    AZ_TYPE_INFO(Outer, "...");
    static void Reflect(AZ::ReflectContext* context);

    class Inner
    {
    public:
        AZ_TYPE_INFO(Inner, "...");
        static void Reflect(AZ::ReflectContext* context);

        int m_member = 0;
    };
};

void Outer::Reflect(AZ::ReflectContext* context)
{
    Inner::Reflect(context);
}

void Outer::Inner::Reflect(AZ::ReflectContext* context)
{
    if (AZ::BehaviorContext* behavior = azrtti_cast<AZ::BehaviorContext*>(context))
    {
        behavior->Class<Inner>("OuterInner")
            ->Property("member", BehaviorValueProperty(&Inner::m_member))
            ;
    }
}
```

### EBus<a name="component-entity-system-behavior-context-ebus"></a>

`EBus` Reflects Lumberyard event bus messages\. Depending on your EBus configuration, `Broadcast`, `Event` \(with ID\) and `Queuing` are reflected\. Queuing is a generic function to be executed when the bus messages are consumed\.
+ **Event** \- Reflects an EBus event\. Depending on your EBus configuration, Lumberyard automatically reflects `Broadcast`, `Event`, `QueueBroadCast`, and `QueueEvent.`
+ **Handler** \- Reflects a class that you must implement to forward messages from the EBus to behavior context methods\. You must create a class that can monitor the specified EBus and forward messages to the behavior context\. This is a requirement because the behavior context can not guarantee that there is a handler for each message\. If a message expects a result, you must provide a default result in case the message is not handled by the behavior context user\. Keep in mind that the system creates as many of these handlers as the behavior context requires\. Handlers can also execute in different threads\. As a result, you should avoid static storage for values that change\. The best way to understand this is to examine the example that follows\.

## Example<a name="component-entity-system-behavior-context-example"></a>

The following code example shows the use of the Lumberyard reflection API\.

```
// Global Property
behaviorContext.Property("globalProperty",&GlobalPropertyGetter, &GlobalPropertySetter); // Property with getter and setter function
behaviorContext.Property("globalProperty",[]() { return g_globalValue; }, [](int value) { g_globalValue = value;}); // Property with Lambda functions.
behaviorContext.Property("globalProperty", BehaviorValueProperty(&g_globalValue)); // Property from a value with helper macro. The macro implements the code above.
behaviorContext.Property("globalReadOnlyProperty", &GlobalPropertyGetter, nullptr); // Read only property with a getter function.
behaviorContext.Property("globalReadOnlyProperty", []() { return g_globalValue; }, nullptr); // Read only property with a Lambda function.
behaviorContext.Property("globalReadOnlyProperty", BehaviorValueGetter(&g_globalValue), nullptr); // Read only property with a value and a helper macro.
// Write only is the same as ReadOnly, but with the setter enabled and the getter set to nullptr. These properties are rare.
 
// Global Methods
behaviorContext.Method("GlobalMethod",&GlobalMethod);
 
// Global Constants and Enums (implemented using properties). The functions are provided for clarity.
behaviorContext.Constant("PI", []() { return 3.14f; }); 
behaviorContext.Constant("PI", BehaviorConstant(3.14f));
behaviorContext.Enum<EnumIntValue>("EnumIntValue");
 
// Class - When you declare a class, if you want to reflect base class functionality, just use RTTI.
behaviorContext.Class<MyClass>() // The name of the class comes from AzTypeInfo. In this case the name is "MyClass". 
                                 // AzType information is a requirement for all classes used with reflection in 
                                 // Lumberyard (including serialization and networking)
    ->Constructor<int>() // Optional additional constructors. You can have as many as needed.
    ->Constant("epsilon",BehaviorConstant(0.001f)) // Class constant. All features from the global versions apply.
    ->Enum<MyClass::ENUM_VALUE>("ENUM_VALUE") // Class enum. All features from the global versions apply.
    ->Method("Method",&MyClass::Method)    // Class method. All features from the global versions apply.
    ->Property("data", &MyClass::GetData(), &MyClass::SetData) // Class features. All features from the global versions apply.
    ;
 
// EBus
class MyEBusBehaviorHandler : public MyEBus::Handler, public AZ::BehaviorEBusHandler
{
public:
    AZ_EBUS_BEHAVIOR_BINDER(MyEBusBehaviorHandler ,"{19F5C8C8-4260-46B1-B624-997CD3F10CBD}", AZ::SystemAlloctor, // Name, TypeId and default allocator.
                                OnEvent); // List of event names to handle and support for BehaviorContext.
 
    void OnEvent(int a) override // This is an event listener like other EBus listeners.
    {
        Call(FN_OnEvent,a); // Forward the event to a behavior listener if there is one. FN_***EventName*** events are declared by the AZ_EBUS_BEHAVIOR_BINDER macro.
    }
};
 
behaviorClass.EBus<MyEBus>("MyEBus") // EBuses are not required to have TypeInfo, so you must always provide a name.
    ->Handler<MyEBusBehaviorHandler >() // Allow systems that use behavior context to create handlers for this EBus every time 
                                           // they must listen for events. If you reflect a bus without a handler, behavior context users can only send events.
    ->Event("OnEvent",&amp;MyEBus::Events::OnEvent) // Allow behavior context system to send an "OnEvent" event. The code automatically generates
                                                   // Broadcast, Event, QueueBroadcast, QueueEvent, and QueueFunctions if the EBus configuration 
                                                   // supports them. You don't have to provide events; you can provide only a handler if 
                                                   // you don't have behavior context systems to send events.
    ;
 
// Properties, methods, classes and ebuses can have attributes. An attribute is a combination of a Crc32 ID and a value. The value 
// can be a constant, a variable address, a global function, a class member function, or a class member variable address.
behaviorClass.Method("GlobalMethod",&GlobalMethod)
    ->Attribute("ValueAttr",10)        // Value attribute.
    ->Attribute("MethodAttr", &SomeOtherGlobalMethod)
    ;
// You add the same attributes to a property...
behaviorClass.Property("GlobalProperty", BehaviorValueProperty(&g_globalValue)    
    ->Attribute("MyAttr",20)
    ;
 
// or to a class or class method or property.
behaviorClass.Class<MyClass>()
    ->Attribute("ClassAttr",100)
    ->Attribute("CalssAttr1",&MyClass::SomeMethod)
    ->Method("Method",&MyClass::Method)
        ->Attribute("MethodAttr",100)
    ->Property("data", BehaviorValueProperty(&MyClass::m_data))
        ->Attribute("PropertyAttr",500)
    ;
```