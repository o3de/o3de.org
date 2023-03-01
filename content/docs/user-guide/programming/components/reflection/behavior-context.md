---
linkTitle: Behavior Context
title: Behavior Context in O3DE
description: Use the behavior context in Open 3D Engine (O3DE) to make runtime code accessible to scripting systems such as Script Canvas and Lua.
weight: 300
---

The behavior context makes runtime code accessible to **Open 3D Engine (O3DE)** scripting systems such as Script Canvas or Lua. It provides script bindings that invoke runtime C++ methods, read constants, write properties, and create and handle **Event Bus (Ebus)** events. You can have multiple behavior contexts that are specialized for different purposes, and you can unreflect the behavior contexts to implement reloading.

Use the behavior context to bind the following C++ constructs for scripting:

+ [Classes](#classes)
+ [Methods](#methods)
+ [Properties](#properties)
+ [Constants](#constants)
+ [Enums](#enums)

In addition, the behavior context supports the O3DE [EBus](/docs/user-guide/programming/messaging/ebus) and [AZ::Event](/docs/user-guide/programming/messaging/az-event) event systems:

+ [EBus](#ebus)
  + [Events](#events)
  + [Event Handlers](#event-handlers)

## Classes

Classes in the behavior context reflect a C++ class or struct. You can provide an optional name for a class. If you don't provide a name, the class name from `AzTypeInfo` is used. That name must be unique for the scope. Because the system uses `AzRTTI` to build the class hierarchy, you can use RTTI if you want to reflect base class functionality.

Classes that you bind to the behavior context become objects that can be instantiated in a script environment. To reflect a class, you must provide the type that is reflected as a template argument to the class function. For example:

```cpp
if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
    behaviorContext->Class<MyClass>();
}
```

You should also specify the base class, if applicable:

```cpp
if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
    behaviorContext->Class<MyClass, TheBaseClass>();
}
```

### Class builder functions

To provide additional configuration for the class binding, you can chain class builder functions after the behavior context `Class` function. The following builder functions are available:

| Builder function | Description |
| --- | --- |
| **Allocator** | Allows you to provide a custom allocator/deallocator for your class to override any existing allocation schema. If you don't provide a custom allocator, `aznew` is used (`AZ_CLASS_ALLOCATOR`). |
| **Constant** | Read-only properties. For more information about this builder function, refer to the section on [constants](#constants). |
| **Constructor** | Allows you to enumerate the class constructors that you want to reflect. You must pass all constructor arguments as template arguments. |
| **Enum** | Read-only `int` properties. For more information about this builder function, refer to the section on [enums](#enums). |
| **Method** | Reflects a C++ class method. Can also reflect global methods. For more information about this builder function, refer to the section on [methods](#methods). |
| **Property** | Reflects class data. Can also reflect global properties. For more information about this builder function, refer to the section on [properties](#properties). |
| **UserData** | Allows you to provide a pointer to user data. This pointer is accessible from all callbacks (such as a custom allocator) that you implement for the class. |
| **Wrapping <br> WrappingMember** | Signifies to the behavior context that the class is a wrapper of another class. This is useful when you reflect smart pointers and string wrappers. |

#### C++ examples of class builder functions

```cpp
// Custom allocator and deallocator.
void* ScriptClassAllocate(void* userData);
void ScriptClassFree(void* obj, void* userData);

// Reflect the custom allocator and deallocator for use with ScriptClass.
behaviorContext->Class<ScriptClass>()
    ->Allocator(&ScriptClassAllocate, &ScriptClassFree);

// Reflect two constructors for BoxShapeConfig.
behaviorContext->Class<BoxShapeConfig>()
    ->Constructor()
    ->Constructor<AZ::Vector3&>()
    ->Property("Dimensions", BehaviorValueProperty(&BoxShapeConfig::m_dimensions));

// Allow BehaviorEntity to be passed to functions expecting AZ::Entity*.
behaviorContext->Class<BehaviorEntity>("Entity")
    ->WrappingMember<AZ::Entity*>(&BehaviorEntity::GetRawEntityPtr);

// Reflect a method, two properties, a constant, and an enum for ScriptClass.
behaviorContext->Class<ScriptClass>()
    ->Method("MemberFunc0", &ScriptClass::MemberFunc0)
    ->Property("data", &ScriptClass::GetData, &ScriptClass::SetData)
    ->Property("data1", BehaviorValueProperty(&ScriptClass::m_data1))
    ->Constant("EPSILON", BehaviorConstant(0.001f))
    ->Enum<ScriptClass::SC_ET_VALUE2>("SC_ET_VALUE2");
```

For more information about these functions, refer to [ClassBuilder](/docs/api/frameworks/azcore/struct_a_z_1_1_behavior_context_1_1_class_builder.html) in the O3DE `AzCore` API Reference.

### Attributes

In addition to the builder functions, you can also use the following attributes to decorate a class:

| Attribute | Description | Type | Values |
| --- | --- | --- | --- |
| **Category** | Used by the editor to categorize the object in a list. To nest categories, you can use the forward slash (`/`) separator. For example: <br> `Attribute(AZ::Script::Attributes::Category, "Gameplay/Triggers")` | `string` | |
| **ClassNameOverride** | Provides a custom name for script reflection that is different from the behavior context name. | `string` | |
| **ConstructibleFromNil** | Specifies whether to construct the class by default when nil is provided. | `bool` | `true`, <br> `false` |
| **ConstructorOverride** | Provides a custom constructor to be called when created from Lua script. | function pointer | |
| **Deprecated** | Marks a reflected class, method, EBus, or property as deprecated. | `bool` | `true`, <br> `false` |
| **ExcludeFrom** | Hides the object from editor lists, self-documentation, preview builds, or all of the above. Use this optional flag primarily for internal objects that aren't intended to be accessible by script. | `AZ::Script::Attributes::ExcludeFlags` | `List`, <br> `Documentation`, <br> `Preview`, <br> `All` |
| **Ignore** | Specifies whether to ignore the element during reflection. | `bool` | `true`, <br> `false` |
| **Storage** | Specifies the owner of the memory storage for the reflected object. The owner can be the script system (`ScriptOwn`), the native runtime code (`RuntimeOwn`), or the script system's virtual machine (`Value`). | `AZ::Script::Attributes::StorageType` | `ScriptOwn`, <br> `RuntimeOwn`, <br> `Value` |
| **ToolTip** | Used by the editor to display additional information in a tooltip. | `string` | |

#### C++ examples of attributes

```cpp
behaviorContext->Class<AreaBlenderConfig>()
    ->Attribute(AZ::Script::Attributes::Category, "Vegetation");

behaviorContext->Class<BlastFamilyComponent>()
    ->Attribute(AZ::Script::Attributes::Scope, AZ::Script::Attributes::ScopeFlags::Common);

behaviorContext->Class<AZ::GameplayNotificationId>("GameplayNotificationId")
    ->Attribute(AZ::Script::Attributes::Deprecated, true)
    ->Constructor<AZ::EntityId, AZ::Crc32>()
        ->Attribute(AZ::Script::Attributes::Storage, AZ::Script::Attributes::StorageType::Value)
        ->Attribute(AZ::Script::Attributes::ConstructorOverride, &GameplayEventIdNonIntrusiveConstructor);

behaviorContext->Class<MathUtils>("MathUtils")
    ->Method("ConvertTransformToEulerRadians", &AZ::ConvertTransformToEulerRadians)
        ->Attribute(AZ::Script::Attributes::ExcludeFrom, AZ::Script::Attributes::ExcludeFlags::All);
```

For a complete list of script attributes, refer to [`Code/Framework/AzCore/AzCore/Script/ScriptContextAttributes.h`](https://github.com/o3de/o3de/blob/main/Code/Framework/AzCore/AzCore/Script/ScriptContextAttributes.h) in the O3DE source.

### Lua usage examples

Classes reflected for scripting become objects that you can instance in Lua:

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

Use behavior context properties to expose global and class data to scripts. Each property must have a unique name for its scope. You can query and set property values using getter and setter methods. If you don't provide a getter method for a property, the property is write only. If you don't provide a setter method, the property is read only.

You can use global functions, member functions, or lambda expressions as property getters and setters.

For convenience, O3DE provides macros that implement getter and setter functions as lambda expressions. Use `BehaviorValueProperty(&value)` to implement both a getter and setter method for a property. Or, you can implement getter and setter functions individually using `BehaviorValueGetter` and `BehaviorValueSetter`. The following table contains usage examples for each macro:

| Operation | Macro | Example |
| --- | --- | --- |
| Getter | BehaviorValueGetter |  <pre>->Property("ReadOnlyFlag", BehaviorValueGetter(&MyClass::m_readOnlyFlag), nullptr)</pre> |
| Setter | BehaviorValueSetter |  <pre>->Property("WriteOnlyFlag", nullptr, BehaviorValueSetter(&MyClass::m_writeOnlyFlag))</pre> |
| Both | BehaviorValueProperty |  <pre>->Property("ReadWriteFlag", BehaviorValueProperty(&MyClass::m_readWriteFlag))</pre> |

The following example exposes class member data `m_upperDistanceInMeters` as the read-write property `UpperDistanceInMeters`:

```cpp
behaviorContext->Class<SurfaceTagDistance>()
    ->Attribute(AZ::Script::Attributes::Category, "Vegetation")
    ->Property("UpperDistanceInMeters", BehaviorValueProperty(&SurfaceTagDistance::m_upperDistanceInMeters));
```

To perform operations more complex than simply getting or setting the value, you can implement your own getters and setters instead of using the property macros:

```cpp
behaviorContext->Property("SpawnerType", &Descriptor::GetSpawnerType, &Descriptor::SetSpawnerType);

AZ::TypeId Descriptor::GetSpawnerType() const
{
    // Do stuff, then...
    return m_spawnerType;
}

void Descriptor::SetSpawnerType(const AZ::TypeId& spawnerType)
{
    m_spawnerType = spawnerType;
    SpawnerTypeChanged();
}
```

## Constants

Constants are implemented in the behavior context as read-only [properties](#properties). To simplify the reflection of constants, the `BehaviorContext` class provides two helper functions: `Constant` and `ConstantProperty`. These functions help define the getter function that's needed to enable scripts to read a constant's value. Note that to associate additional attributes to the reflected constant, you must use the `ConstantProperty` function.

### `Constant` function

Use the `Constant` helper function to define a getter for a C++ constant in the behavior context. You can use the behavior context macro `BehaviorConstant` to implement the lambda getter for you.

For convenience, you can chain together calls to `Constant` and many other behavior context functions:

```cpp
behaviorContext->Constant("SystemEntityId", BehaviorConstant(SystemEntityId))
               ->Constant("PI", BehaviorConstant(3.14f));
```

To associate a constant with a class, invoke it on a `ClassBuilder` object that the `BehaviorContext::Class` function returns:

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

If no name is specified for the associated class, no namespace prefix is needed.

### `ConstantProperty` function

The `ConstantProperty` function is similar to `Constant`, helping you define a getter for a constant in the behavior context. Additionally, because the function returns a `GlobalPropertyBuilder` object, you can use it to associate additional attributes with the reflected constant:

```cpp
behaviorContext->ConstantProperty("DefaultMaterialAssignment", BehaviorConstant(DefaultMaterialAssignment))
    ->Attribute(AZ::Script::Attributes::Scope, AZ::Script::Attributes::ScopeFlags::Common)
    ->Attribute(AZ::Script::Attributes::Category, "render")
    ->Attribute(AZ::Script::Attributes::Module, "render");
```

## Enums

Similar to constants, C++ enums are also implemented in the behavior context as read-only [properties](#properties). To simplify the reflection of enums, the `BehaviorContext` class provides two helper functions: `Enum` and `EnumProperty`. These functions help define the getter function that's needed to enable scripts to read an enum's value. Note that to associate additional attributes to the reflected enum, you must use the `EnumProperty` function.

### `Enum` function

Use the `Enum` helper function to define a getter for a C++ enum in the behavior context. Since each enum value is itself a property, to reflect an entire enum into the behavior context, you must reflect each of its values.

For convenience, you can chain together calls to `Enum` and many other behavior context functions:

```cpp
enum class MyTypes
{
    One = 1,
    Two = 2,
};

behaviorContext->Enum<aznumeric_cast<int>(MyTypes::One)>("MyTypes_One")
    ->Enum<aznumeric_cast<int>(MyTypes::Two)>("MyTypes_Two");
```

When you reflect enum values in this way, take care to give each value a unique name, since each property must have a unique name in the behavior context.

To associate an enum with a class, invoke it on a `ClassBuilder` object that the `BehaviorContext::Class` function returns:

```cpp
behaviorContext->Class<PhotometricValue>("PhotometricUnit")
    ->Enum<static_cast<int>(PhotometricUnit::Candela>("Candela")
    ->Enum<static_cast<int>(PhotometricUnit::Lumen>("Lumen")
    ->Enum<static_cast<int>(PhotometricUnit::Lux>("Lux")
    ->Enum<static_cast<int>(PhotometricUnit::Unknown>("Unknown");
```

An associated class that you reflect with a name acts as a kind of namespace for the constant. For example, to get the value for `Lumen` from the preceding example in Lua, you would use `PhotometricUnit.Lumen`.

If no name is specified for the associated class, no namespace prefix is needed.

### `EnumProperty` function

The `EnumProperty` function is similar to `Enum`, helping you define a getter for an enum in the behavior context. Additionally, because the function returns a `GlobalPropertyBuilder` object, you can use it to associate additional attributes with the reflected enum:

```cpp
behaviorContext->EnumProperty<static_cast<int>(FrameCaptureResult::None)>("FrameCaptureResult_None")
    ->Attribute(AZ::Script::Attributes::Scope, AZ::Script::Attributes::ScopeFlags::Automation)
    ->Attribute(AZ::Script::Attributes::Module, "atom");
```

### `AZ_ENUM` utility macro

O3DE `AzCore` provides a utility macro called `AZ_ENUM_DEFINE_REFLECT_UTILITIES`. This macro works in conjunction with the `AZ_ENUM` macros to generate utility functions that can reflect all values of an enum for you, so you don't need to reflect each value individually. This can be useful for enums that you expect to change during the course of development, or that contain a large number of values.

To use this macro, you must define the enum using either of the `AZ_ENUM` macros, including `AZ_ENUM`, `AZ_ENUM_WITH_UNDERLYING_TYPE`, `AZ_ENUM_CLASS`, or `AZ_ENUM_CLASS_WITH_UNDERLYING_TYPE`. You must also include `<AzCore/Preprocessor/EnumReflectUtils.h>` in the source where you wish to reflect the enum.

```cpp
// Define the enum and its values.
AZ_ENUM_CLASS(TestEnum, Walk, Run, Fly);

// Generate the utility functions for reflection.
AZ_ENUM_DEFINE_REFLECT_UTILITIES(TestEnum)

// Call the generated reflect function from within your component's Reflect function.
TestEnumReflect(*behaviorContext);
```

For additional context on how to use these macros, examine the test code in `Code\Framework\AzCore\Tests\EnumTests.cpp` or in a Gem where they are used, such as `Gems\Atom\RHI\Code\Source\RHI.Reflect\RenderStates.cpp` or `Gems\Atom\RHI\Code\Include\Atom\RHI.Reflect\RenderStates.h`.

## EBus

To enable scripts to send and receive events, bind EBus events and event handlers to the behavior context.

### Events

The EBus provides a mechanism to broadcast an event to all handlers or to send an event directly to handlers connected at a specific ID. When you bind an event, O3DE automatically reflects `Broadcast`, `Event`, `QueueBroadcast`, and `QueueEvent` as needed for your EBus configuration.

```cpp
behaviorContext.EBus<TestBus>("TestBus")->
    Handler<TestBusHandler>()->
    Event("SetSum1", &TestBus::Events::SetSum1)->
    Event("GetSum1", &TestBus::Events::GetSum1)->
;
```

When compiled, you can use the events in Script Canvas and call them in Lua:

```lua
local result = TestBus.Broadcast.GetSum1(1)
```

### Event handlers

An event handler reflects a class that you must implement to forward messages from the EBus to behavior context methods. To implement the event handler, you must create a class that can monitor the specified EBus and forward messages to the behavior context.
 
This is required because the behavior context cannot guarantee that there is a handler for each message. If a message expects a result, you must provide a default result in case the behavior context user does not handle the message. Keep in mind that the system creates as many of these handlers as the behavior context requires. Handlers can also execute in different threads. As a result, you should avoid static storage for values that change. For example:

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

