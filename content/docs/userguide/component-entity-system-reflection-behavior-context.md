# Behavior Context<a name="component-entity-system-reflection-behavior-context"></a>

You can use the behavior context to reflect runtime code to make it accessible to scripting languages like Lua or scripting environments like Lumberyard's Script Canvas\. The behavior context provides bindings that invoke runtime C\+\+ code\.

You can use the behavior context to bind the following C\+\+ constructs for scripting:
+ [Classes](#component-entity-system-reflection-behavior-context-classes)
+ [Methods](#component-entity-system-reflection-behavior-context-methods)
+ [Properties](#component-entity-system-reflection-behavior-context-properties)
+ [Constants](#component-entity-system-reflection-behavior-context-constants)
+ [Enums](#component-entity-system-reflection-behavior-context-enums)

In addition to the bindings for C\+\+ constructs, the behavior context provides bindings for Lumberyard's [EBus](ebus-intro.md)\.
+ [EBus](#component-entity-system-reflection-behavior-context-ebus)
+ [Event Handlers](#component-entity-system-reflection-behavior-context-ebus-event-handlers)
+ [Events](#component-entity-system-reflection-behavior-context-ebus-events)

## Classes<a name="component-entity-system-reflection-behavior-context-classes"></a>

Classes that are bound to the behavior context become objects that can be instantiated in a script environment\. To reflect a class, you must provide the type that is reflected as a template argument to the class function\. The base classes should also be specified, as in the following example:

```
if (BehaviorContext* behaviorContext = azrtti_cast<BehaviorContext*>(reflection))
{
    behaviorcontext->Class<MyClass, TheBaseClass>();
}
```

### Attributes<a name="component-entity-system-reflection-behavior-context-classes-attributes"></a>

You can use the built\-in attributes described in this section to decorate a class\.

**Category**  
Used by the editor to categorize the object in a list\.   
Type: `string`  
You can use the forward slash \(`/`\) separator to nest categories, as in the following example:  

```
Attribute(AZ::Script::Attributes::Category, "Gameplay/Triggers")
```

**ExcludeFrom**  
A flag that optionally hides this object from specific types of exposure\. This flag is primarily used for internal objects that are not intended to be accessible by script\.   
Type: `AZ::Script::Attributes::ExcludeFlags`  
Possible values: `List`, `Documentation`, `Preview`, `All`      
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-entity-system-reflection-behavior-context.html)

**Storage**  
Specifies the owner of the memory storage for the reflected object\.  
Type: `AZ::Script::Attributes::StorageType`  
Possible values: `ScriptOwn`, `RuntimeOwn`, `Value`      
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-entity-system-reflection-behavior-context.html)

**ConstructibleFromNil**  
Specifies whether the class is constructed by default when nil is provided\.  
Type: `bool`  
Possible values: `true`, `false`

**ClassNameOverride**  
Provides a custom name for script reflection that is different from the behavior context name\.  
Type: `string`

**Ignore**  
Specifies whether the element is used script reflection\.  
Type: `bool`  
Possible values: `true`, `false`

**Deprecated**  
Marks a reflected class, method, EBus, or property as deprecated\.   
Type: `bool`  
Possible values: `true`, `false`

**ToolTip**  
Used by the editor to display additional information in a tool tip\.  
Type: `string`

### Class Reflection Examples<a name="component-entity-system-reflection-behavior-context-classes-examples"></a>

Classes reflected for scripting become objects that can be instanced in Lua, as in the following example:

```
local myObj = MyClass()
```

Classes can also specify custom constructors for scripting purposes\. For example, the following constructor enables a custom constructor that specifies an integer:

```
behaviorContext->Class<MyClass>("MyClass")
    ->Constructor<int>()
;
```

This constructor enables the class to be instantiated in Lua in the following way:

```
-- Constructor in Lua 
local myClass = MyClass(10)
```

## Methods<a name="component-entity-system-reflection-behavior-context-methods"></a>

You can reflect methods either as free functions or as part of classes, as in the following examples:

```
// This method is reflected as a free function:
behaviorContext->Method("AZTestAssert", &AZTestAssert);

// This method is reflected as a part of a class:
behaviorContext->Class<MyMath>("MyMath")
    ->Method("Cos", &cosf)
;
```

As in the previous example, class methods that are reflected for scripting are accessible through the reflected class:

```
-- Method from a class
local math = MyMath()
local result = math:Cos(3.14) 

-- Free method
AZTestAssert(ScriptClass ~= nil)
```

Methods can specify parameters and default values for those parameters, as in the following example:

```
int globalMethod(int a)
{
    return a + 3;
} 
behaviorContext->Method("globalMethod", &globalMethod, BehaviorMakeDefaultValues(555))
```

When you bind a method to the behavior context, you can provide an array of strings that contain the method's name and describe its arguments\. This is useful when you want to provide friendly names or facilitate documentation\.

The following example shows a method whose arguments contain descriptive strings\.

```
// Given this method:
bool BoundsCheckMethodWithDefaultValue(float value, float epsilon, float minBounds, float maxBounds)
{
    (void)epsilon;
    return value >= minBounds && value < maxBounds;
} 
// Bind the given method to the behavior context with friendly argument names. 
Method("MemberWithDefaultValues", &BehaviorTestClass::BoundsCheckMethodWithDefaultValue,
                                  { {{"value", "Value which will be checked to be within the two bounds arguments"},
                                     {"delta", "The epsilon value", BehaviorMakeDefaultValue(0.1f)},
                                     {"minBound", "The minimum bounds value,", BehaviorMakeDefaultValue(0.0f)},
                                     {"maxBound", "The maximum bounds value", BehaviorMakeDefaultValue(1.0f)}} }
                       );
```

This approach is especially useful in Lumberyard's Script Canvas so that users can understand the meaning of the arguments that they are expected to provide\.

## Properties<a name="component-entity-system-reflection-behavior-context-properties"></a>

You can reflect properties as parts of classes or as global properties\. You can reflect properties as write only, read only or read/write\. To do this, provide either a getter, a setter, or both for the property\.

The following table shows helper macros that you can use to simplify the specification of a property's getter or setter or both\.


****  

| Operation | Helper | Macro Code | 
| --- | --- | --- | 
| Setter | BehaviorValueSetter |  <pre>->Property("boolean", nullptr, BehaviorValueSetter(&TestBehaviorContextProperties::m_booleanProp))</pre>  | 
| Getter | BehaviorValueGetter |  <pre>->Property("boolean", BehaviorValueGetter(&TestBehaviorContextProperties::m_booleanProp), nullptr)</pre>  | 
| Both | BehaviorValueProperty |  <pre>->Property("isStatic", BehaviorValueProperty(&AZ::TransformConfig::m_isStatic))</pre>  | 

## Constants<a name="component-entity-system-reflection-behavior-context-constants"></a>

You can reflect constants into the behavior context\. Constants are by definition read\-only\. The following examples reflect two constants into the behavior context:

```
behaviorContext->Constant("SystemEntityId", BehaviorConstant(SystemEntityId)); 
behaviorContext->Constant("PI", BehaviorConstant(3.14f));
```

## Enums<a name="component-entity-system-reflection-behavior-context-enums"></a>

Enums are reflected globally into the behavior context\. For this reason, it is important to give them unique names\.

The following example reflects the enum `GE_VALUE1` and two of its possible values globally into the behavior context\.

```
behaviorContext->Enum<(int)GE_VALUE1>("GE_VALUE1"); 
behaviorContext->Enum<(int)GlobalClassEnum::Value1>("Value1");
behaviorContext->Enum<(int)GlobalClassEnum::Value2>("Value2");
```

## EBus<a name="component-entity-system-reflection-behavior-context-ebus"></a>

The ability to bind an EBus to the behavior context enables scripting to become driven and modular\. The two main use cases for reflecting EBuses to the behavior context are event handlers and events\.

Because EBuses are highly configurable, the features that become available depend on how the EBus was created\. For more information, see the [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### Event Handlers<a name="component-entity-system-reflection-behavior-context-ebus-event-handlers"></a>

By reflecting event handlers, you can enable events to be implemented directly in script\.

**To implement an event handler**

1. Given the following EBus, reflect an event handler:

   ```
   class TestBusMessages
       : public AZ::EBusTraits
   {
   public:
       virtual void    SetSum1(int) = 0;
       virtual int     GetSum1(int) = 0;
   };
   using TestBus = AZ::EBus<TestBusMessages>;
   ```

1. Implement the event handler bindings, as in the following example:

   ```
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

   This handler is what binds a C\+\+ EBus interface to a script language such as Lua\.

1. Tell the behavior context reflection that the event handler is available, as in the following example\.

   ```
   behaviorContext.EBus<TestBus>("TestBus")->
       Handler<TestBusHandler>()->
       Event("SetSum1", &TestBus::Events::SetSum1)->
       Event("GetSum1", &TestBus::Events::GetSum1)->
   ;
   ```

1. Optionally provide the implementation for the EBus handler, as in the following example\.

   ```
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

### Events<a name="component-entity-system-reflection-behavior-context-ebus-events"></a>

Events provide a mechanism to broadcast or send an event directly to any object that is connected to the EBus through an ID\. 

By reflecting events to an EBus, you can broadcast or send the events in scripting, as the following examples show\.

```
behaviorContext.EBus<TestBus>("TestBus")->
    Handler<TestBusHandler>()->
    Event("SetSum1", &TestBus::Events::SetSum1)->
    Event("GetSum1", &TestBus::Events::GetSum1)->
;

-- Lua: 
local result = TestBus.Broadcast.GetSum1(1)
```

For information on addressing EBuses, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

For more information about the behavior context, see [Behavior Context in Depth](component-entity-system-behavior-context-in-depth.md)\.