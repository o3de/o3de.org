---
title: Behavior Context
description: Use the behavior context to make runtime code accessible to scripting systems such as Script Canvas or Lua.
weight: 300
---

The behavior context makes runtime code accessible to O3DE scripting systems such as Script Canvas or Lua. It provides script bindings that invoke runtime C++ methods, read constants, write properties, and create and handle EBus events. You can have multiple behavior contexts that are specialized for different purposes, and you can unreflect the behavior contexts to implement reloading.

Use the behavior context to bind the following C++ constructs for scripting:

+ [Classes](#classes)
+ [Methods](#methods)
+ [Properties](#properties)
+ [Constants](#constants)
+ [Enums](#enums)

In addition, the behavior context supports the O3DE [EBus](/docs/user-guide/programming/ebus) and [AZ::Event](/docs/user-guide/programming/az-event) event systems:

+ [EBus](#ebus)
  + [Events](#ebus-events)
  + [Event Handlers](#ebus-event-handlers)

## Classes

Reflects a C++ class or struct. You can provide an optional name. If you do not provide a name, the class name from `AzTypeInfo` is used. That name must be unique for the scope. Because the system uses `AzRTTI` to build the class hierarchy, you can use RTTI if you want to reflect base class functionality.

Classes that are bound to the behavior context become objects that can be instantiated in a script environment. To reflect a class, you must provide the type that is reflected as a template argument to the class function.

```cpp
if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
    behaviorcontext->Class<MyClass>();
}
```

The base class should also be specified, if applicable:

```cpp
if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
    behaviorcontext->Class<MyClass, TheBaseClass>();
}
```

### Additional class information

+ **Allocator** - You can provide a custom allocator/ deallocator for your class. This allows you to override any existing allocation schema. If you do not provide a custom allocator, `aznew` is used (`AZ_CLASS_ALLOCATOR`).
+ **Constructor** - Allows you to enumerate the class constructors that you want to reflect. You must pass all constructor arguments as template arguments.
+ **Wrapping/WrappingMember** - Allows code to inform the system that it is a wrapper of another class. This is useful when you reflect smart pointers and string wrappers.
+ **Userdata** - Allows you to provide a pointer to user data. The pointer is accessible from all callbacks (like a custom allocator) that you implement for the class.
+ **Method** - Reflects a C++ class function. The first argument is the class pointer. This is the same usage as global methods.
+ **Property** - Reflects class data. The first argument is the class pointer. This is the same usage as global properties.
+ **Enum** - Enums are read-only `int` properties.
+ **Constant** - Constants are read-only properties.

### Attributes

You can use the following, optional built-in attributes to decorate a class.

| Attribute | Description | Type | Values |
| --- | --- | --- | --- |
| **Category** | Used by the editor to categorize the object in a list. You can use the forward slash (`/`) separator to nest categories: <br> `Attribute(AZ::Script::Attributes::Category, "Gameplay/Triggers")` | `string` | |
| **ExcludeFrom** | An optional flag that hides this object from editor lists, self-documentation, preview builds, or all of the above. This flag is primarily used for internal objects that are not intended to be accessible by script. | `AZ::Script::Attributes::ExcludeFlags` | `List`, <br> `Documentation`, <br> `Preview`, <br> `All` |
| **Storage** | Specifies the owner of the memory storage for the reflected object. Possible values include the script system, runtime native code, and stored by value in the script system's virtual machine (VM). | `AZ::Script::Attributes::StorageType` | `ScriptOwn`, <br> `RuntimeOwn`, <br> `Value` |
| **ConstructibleFromNil** | Specifies whether the class is constructed by default when nil is provided. | `bool` | `true`, <br> `false` |
| **ClassNameOverride** | Provides a custom name for script reflection that is different from the behavior context name. | `string` | |
| **Ignore** | Specifies whether the element is ignored during reflection. | `bool` | `true`, <br> `false` |
| **Deprecated** | Marks a reflected class, method, EBus, or property as deprecated. | `bool` | `true`, <br> `false` |
| **ToolTip** | Used by the editor to display additional information in a tooltip. | `string` | |

### Lua usage examples

Classes reflected for scripting become objects that can be instanced in Lua:

```lua
local myObj = MyClass()
```

To use non-default constructors in Lua, first reflect the constructor to the behavior context:

```cpp
behaviorContext->Class<MyClass>("MyClass")
    ->Constructor<int>();
```

Then you can instantiate in Lua:

```lua
local myClass = MyClass(10)
```

### Using nested classes

To bind a nested class to the behavior context, you must do it from within a function on the nested class. C++ rules about nested class member access from outside scopes make this requirement necessary.

The following counterexample shows a _poorly_ formed nested class. The code does not work.

```cpp
// Bad nested class.
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

The following code shows a well formed nested class.

```cpp
// Good nested class.
// Contains a Reflect method in both the outer and the inner classes.
// The outer reflect calls the inner reflect, which contains the inner property that's reflected.
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

## Methods

Use the behavior context `Method` function to reflect C++ global methods and class methods. Each method must have a unique name for its scope.

You can reflect methods either as free functions or as parts of classes:

```cpp
// This method is reflected as a free function:
behaviorContext->Method("AZTestAssert", &AZTestAssert);

// This method is reflected as a part of a class:
behaviorContext->Class<MyMath>("MyMath")
    ->Method("Cos", &cosf);
```

Class methods that are reflected for scripting are accessible through the reflected class:

```lua
-- Method from a class:
local math = MyMath()
local result = math:Cos(3.14)

-- Free method:
AZTestAssert(ScriptClass ~= nil)
```

To supply default values for a method, use `AZ::BehaviorDefaultValuePtr`:

```cpp
int globalMethod(int a)
{
    return a + 3;
}

behaviorContext->Method("GlobalMethod", &globalMethod, AZ::BehaviorDefaultValuePtr(aznew AZ::BehaviorDefaultValue(255)));
```

To improve usability and facilitate documentation when binding a method, provide strings that describe the method's arguments:

```cpp
// Given this method:
bool BoundsCheck(float value, float minBounds, float maxBounds)
{
    return value >= minBounds && value < maxBounds;
}

// Bind the given method to the behavior context with friendly argument names.
behaviorContext->Method("BoundsCheck", &BehaviorTestClass::BoundsCheck,
      {{{"Value", "Value which will be checked to be within the two bounds arguments."},
        {"Minimum Bound Value", "Check if value is greater than or equal to this minimum value.", AZ::BehaviorDefaultValuePtr(aznew AZ::BehaviorDefaultValue(static_cast<float>(0.0)))},
        {"Maximum Bound Value", "Check if value is less than this maximum value.", AZ::BehaviorDefaultValuePtr(aznew AZ::BehaviorDefaultValue(static_cast<float>(1.0)))}}}
    );
```

This approach is especially useful in Script Canvas so that users can understand the meaning of the arguments that they are expected to provide.

## Properties

Use behavior context properties to expose global and class data to scripts. Each property must have a unique name for its scope. You can query and set property values using getter and setter methods. If you don't provide a setter method for a property, the property is read only. If you don't provide a getter method, the property is write only.

You can use global functions, member functions, or lambda expressions as property getters and setters.

For convenience, O3DE provides macros that implement getter and setter functions as lambda expressions. Use `BehaviorValueProperty(&value)` to implement both a getter and setter method for a property. Or, you can implement getter and setter functions individually using `BehaviorValueGetter` and `BehaviorValueSetter`. The following table contains usage examples of each macro:

| Operation | Macro | Example |
| --- | --- | --- |
| Getter | BehaviorValueGetter |  <pre>->Property("ReadOnlyFlag", BehaviorValueGetter(&MyClass::m_readOnlyFlag), nullptr)</pre> |
| Setter | BehaviorValueSetter |  <pre>->Property("WriteOnlyFlag", nullptr, BehaviorValueSetter(&MyClass::m_writeOnlyFlag))</pre> |
| Both | BehaviorValueProperty |  <pre>->Property("ReadWriteFlag", BehaviorValueProperty(&MyClass::m_readWriteFlag))</pre> |

In the following example, class member data `m_upperDistanceInMeters` is exposed as the read-write property `UpperDistanceInMeters`:

```cpp
behaviorContext->Class<SurfaceTagDistance>()
    ->Attribute(AZ::Script::Attributes::Category, "Vegetation")
    ->Property("UpperDistanceInMeters", BehaviorValueProperty(&SurfaceTagDistance::m_upperDistanceInMeters));
```

To perform more complex operations other than simply getting or setting the value, you can implement your own getters and setters instead of using the property macros:

```cpp
behaviorContext->Property("SpawnerType", &Descriptor::GetSpawnerType, &Descriptor::SetSpawnerType);

AZ::TypeId Descriptor::GetSpawnerType() const
{
    // do stuff, then...
    return m_spawnerType;
}

void Descriptor::SetSpawnerType(const AZ::TypeId& spawnerType)
{
    m_spawnerType = spawnerType;
    SpawnerTypeChanged();
}
```

## Constants

Constants are implemented in the behavior context as read-only [properties](#properties). The `BehaviorContext` class provides two helper functions to simplify the reflection of constants: `Constant` and `ConstantProperty`. These functions help define the getter function that's needed to enable scripts to read a constant's value. Note that to associate additional attributes to the reflected constant, you must use the `ConstantProperty` function.

### `Constant` function

Use the `Constant` helper function to define a getter for a C++ constant in the behavior context. You can use the behavior context macro `BehaviorConstant` to implement the lambda getter for you.

For convenience, you can chain calls to `Constant` and many other behavior context functions together:

```cpp
behaviorContext->Constant("SystemEntityId", BehaviorConstant(SystemEntityId))
               ->Constant("PI", BehaviorConstant(3.14f));
```

To associate a constant with a class, invoke it on a `ClassBuilder` object that's returned by the `BehaviorContext::Class` function:

```cpp
behaviorContext->Class<AxisWrapper>("AxisType")
    ->Constant("XPositive", BehaviorConstant(AZ::Transform::Axis::XPositive))
    ->Constant("XNegative", BehaviorConstant(AZ::Transform::Axis::XNegative))
    ->Constant("YPositive", BehaviorConstant(AZ::Transform::Axis::YPositive))
    ->Constant("YNegative", BehaviorConstant(AZ::Transform::Axis::YNegative))
    ->Constant("ZPositive", BehaviorConstant(AZ::Transform::Axis::ZPositive))
    ->Constant("ZNegative", BehaviorConstant(AZ::Transform::Axis::ZNegative));
```

An associated class that is reflected with a name acts as a kind of namespace for the constant. For example, to get the value for `XPositive` from the preceding example in Lua, you would use `AxisType.XPositive`.

If a name is not specified for the associated class, no namespace prefix is needed.

### `ConstantProperty` function

The `ConstantProperty` function is similar to `Constant`, helping you to define a getter for a constant in the behavior context. Additionally, because it returns a `GlobalPropertyBuilder` object, you can use it to associate additional attributes to the reflected constant:

```cpp
behaviorContext->ConstantProperty("DefaultMaterialAssignment", BehaviorConstant(DefaultMaterialAssignment))
    ->Attribute(AZ::Script::Attributes::Scope, AZ::Script::Attributes::ScopeFlags::Common)
    ->Attribute(AZ::Script::Attributes::Category, "render")
    ->Attribute(AZ::Script::Attributes::Module, "render");
```

## Enums

Similar to constants, C++ enums are also implemented in the behavior context as read-only [properties](#properties). The `BehaviorContext` class provides two helper functions to simplify the reflection of enums: `Enum` and `EnumProperty`. These functions help define the getter function that's needed to enable scripts to read an enum's value. Note that to associate additional attributes to the reflected enum, you must use the `EnumProperty` function.

### `Enum` function

Use the `Enum` helper function to define a getter for a C++ enum in the behavior context. Since each enum value is itself a property, to reflect an entire enum into the behavior context, you must reflect each of its values.

For convenience, you can chain calls to `Enum` and many other behavior context functions together:

```cpp
enum class MyTypes
{
    One = 1,
    Two = 2,
};

behaviorContext->Enum<aznumeric_cast<int>(MyTypes::One)>("MyTypes_One")
    ->Enum<aznumeric_cast<int>(MyTypes::Two)>("MyTypes_Two");
```

When enum values are reflected in this way, care should be taken to give each value a unique name, since each property must have a unique name in the behavior context.

To associate an enum with a class, invoke it on a `ClassBuilder` object that's returned by the `BehaviorContext::Class` function:

```cpp
behaviorContext->Class<PhotometricValue>("PhotometricUnit")
    ->Enum<static_cast<int>(PhotometricUnit::Candela>("Candela")
    ->Enum<static_cast<int>(PhotometricUnit::Lumen>("Lumen")
    ->Enum<static_cast<int>(PhotometricUnit::Lux>("Lux")
    ->Enum<static_cast<int>(PhotometricUnit::Unknown>("Unknown");
```

An associated class that is reflected with a name acts as a kind of namespace for the constant. For example, to get the value for `Lumen` from the preceding example in Lua, you would use `PhotometricUnit.Lumen`.

If a name is not specified for the associated class, no namespace prefix is needed.

### `EnumProperty` function

The `EnumProperty` function is similar to `Enum`, helping you to define a getter for an enum in the behavior context. Additionally, because it returns a `GlobalPropertyBuilder` object, you can use it to associate additional attributes to the reflected enum:

```cpp
behaviorContext->EnumProperty<static_cast<int>(FrameCaptureResult::None)>("FrameCaptureResult_None")
    ->Attribute(AZ::Script::Attributes::Scope, AZ::Script::Attributes::ScopeFlags::Automation)
    ->Attribute(AZ::Script::Attributes::Module, "atom");
```

### `AZ_ENUM` utility macro

O3DE `AzCore` provides a utility macro called `AZ_ENUM_DEFINE_REFLECT_UTILITIES` that works in conjunction with the `AZ_ENUM` macros to generate utility functions that can reflect _all_ values of an enum for you, saving you from the need to reflect each value individually. This might be useful for enums that are expected to change during the course of development, or that contain a large number of values. It requires the enum to be defined using either of the AZ_ENUM macros, including `AZ_ENUM`, `AZ_ENUM_WITH_UNDERLYING_TYPE`, `AZ_ENUM_CLASS`, or `AZ_ENUM_CLASS_WITH_UNDERLYING_TYPE`.

To use this macro, include `<AzCore/Preprocessor/EnumReflectUtils.h>` in the source where you wish to reflect the enum.

```cpp
// Define the enum and its values.
AZ_ENUM_CLASS(TestEnum, Walk, Run, Fly);

// Generate the utility functions for reflection.
AZ_ENUM_DEFINE_REFLECT_UTILITIES(TestEnum)

// Call the generated reflect function from within your component's Reflect function.
TestEnumReflect(*behaviorContext);
```

For additional context on how to use these macros, examine the test code in `Code\Framework\AzCore\Tests\EnumTests.cpp` or a Gem where they are used, such as `Gems\Atom\RHI\Code\Source\RHI.Reflect\RenderStates.cpp` and `Gems\Atom\RHI\Code\Include\Atom\RHI.Reflect\RenderStates.h`.

## EBus

Enable scripts to send and receive events by binding EBus events and event handlers to the behavior context:

### Events

EBus provides a mechanism to broadcast an event to all handlers or send an event directly to handlers connected at a specific ID. When you bind an event, O3DE automatically reflects `Broadcast`, `Event`, `QueueBroadcast`, and `QueueEvent`, as needed for your EBus configuration.

```cpp
behaviorContext.EBus<TestBus>("TestBus")->
    Handler<TestBusHandler>()->
    Event("SetSum1", &TestBus::Events::SetSum1)->
    Event("GetSum1", &TestBus::Events::GetSum1)->
;
```

Once compiled, the events can be used in Script Canvas and called in Lua:

```lua
local result = TestBus.Broadcast.GetSum1(1)
```

### Event handlers

An event handler reflects a class that you must implement to forward messages from the EBus to behavior context methods. You must create a class that can monitor the specified EBus and forward messages to the behavior context. This is a requirement because the behavior context cannot guarantee that there is a handler for each message. If a message expects a result, you must provide a default result in case the message is not handled by the behavior context user. Keep in mind that the system creates as many of these handlers as the behavior context requires. Handlers can also execute in different threads. As a result, you should avoid static storage for values that change. The best way to understand this is to examine the example that follows.

Example:

1. Given the following EBus:

    ```cpp
    class TestBusMessages
        : public AZ::EBusTraits
    {
    public:
        virtual void    SetSum1(int) = 0;
        virtual int     GetSum1(int) = 0;
    };

    using TestBus = AZ::EBus<TestBusMessages>;
    ```

1. Implement the event handler bindings:

    ```cpp
    class TestBusHandler
        : public TestBus::Handler
        , public AZ::BehaviorEBusHandler
    {
    public:
        AZ_EBUS_BEHAVIOR_BINDER(TestBusHandler, "{CD26E702-6F40-4FF9-816D-4DCB652D97DF}", AZ::SystemAllocator,
                SetSum1,
                GetSum1);
            void SetSum1(int d1) override
            {
                Call(FN_SetSum1, d1);
            }
            int GetSum1(int d1) override
            {
                int result = 0;
                CallResult(result, FN_GetSum1, d1);
                return result;
            }
        };
    ```

   This handler is what binds a C++ EBus interface to a script language such as Lua.

1. Tell the behavior context reflection that the event handler is available:

    ```cpp
    behaviorContext.EBus<TestBus>("TestBus")->
        Handler<TestBusHandler>()->
        Event("SetSum1", &TestBus::Events::SetSum1)->
        Event("GetSum1", &TestBus::Events::GetSum1)->
    ;
    ```

1. Optionally provide the implementation for the EBus handler:

   ```cpp
   MyBusHandlerMetaTable1 = {
       SetSum1 = function(self, _1)
           -- custom handler code can go here!
           TestAssert(_1 == 1)
       end,
       GetSum1 = function(self, _1)
           -- custom handler code can go here!
           return _1
       end,
   }
   handler = TestBus.Connect(MyBusHandlerMetaTable1)
   ```

