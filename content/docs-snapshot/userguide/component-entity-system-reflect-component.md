# Reflecting a Component for Serialization and Editing<a name="component-entity-system-reflect-component"></a>

Components use AZ reflection to describe the data they serialize and how content creators interact with them\.

The following example reflects a component for serialization and editing:

```
class MyComponent
    : public AZ::Component
{
    // ... AZ_COMPONENT, Activate(), Deactivate(), etc, ...
    
    static void Reflect(AZ::ReflectContext* context);
 
    enum class SomeEnum
    {
        EnumValue1,
        EnumValue2,
    }
    float m_someFloatField;
    AZStd::string m_someStringField;
    SomeEnum m_someEnumField;
    AZStd::vector<SomeClassThatSomeoneHasReflected> m_things;
 
    int m_runtimeStateNoSerialize;
}

void MyComponent::Reflect(AZ::ReflectContext* context)
{
    AZ::SerializeContext* serialize = azrtti_cast<AZ::SerializeContext*>(context);
    if (serialize)
    {
        // Reflect the class fields that you want to serialize.
        // In this example, m_runtimeStateNoSerialize is not reflected for serialization.
        // Base classes with serialized data should be listed as additional template
        // arguments to the Class< T, ... >() function.
        serialize->Class<MyComponent, AZ::Component>()
            ->Version(1)
            ->Field("SomeFloat", &MyComponent::m_someFloatField)
            ->Field("SomeString", &MyComponent::m_someStringField)
            ->Field("Things", &MyComponent::m_things)
            ->Field("SomeEnum", &MyComponent::m_someEnumField)
            ;
 
        AZ::EditContext* edit = serialize->GetEditContext();
        if (edit)
        {
            edit->Class<MyComponent>("My Component", "The World's Most Clever Component")
                ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                      ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game"))
                ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someFloatField, "Some Float", "This is a float that means X.")
                ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someStringField, "Some String", "This is a string that means Y.")
                ->DataElement(AZ::Edit::UIHandlers::ComboBox, &MyComponent::m_someEnumField, "Choose an Enum", "Pick an option among a set of enum values.")
                    ->EnumAttribute(MyComponent::SomeEnum::EnumValue1, "Value 1")
                    ->EnumAttribute(MyComponent::SomeEnum::EnumValue2, "Value 2")
                ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_things, "Bunch of Things", "A list of things for doing Z.")
            ;
        }
    }
}
```

The preceding example adds five data members to `MyComponent`\. The first four data members will be serialized\. The last data member will not be serialized because it contains only the runtime state\. This is typical; components commonly contain some members that are serialized and others that are not\. 

It is common for fields to be reflected for serialization, but not for editing, when using advanced reflection features such as [change callbacks](#component-entity-system-reflect-component-callbacks)\. In these cases, components may conduct complex internal calculations based on user property changes\. The result of these calculations must be serialized but not exposed for editing\. In such a case, you reflect the field to `SerializeContext` but do not add an entry in `EditContext`\. An example follows:

```
serialize->Class<MyComponent>()
    ->Version(1)
    ...
    ->Field("SomeFloat", &MyComponent::m_someFloatField)
    ->Field("MoreData", &MyComponent::m_moreData)
    ...
    ;
 
...
 
AZ::EditContext* edit = serialize->GetEditContext();
if (edit)
{
    edit->Class<MyComponent>("My Component", "The World's Most Clever Component")
        ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
            ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game"))
        ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someFloatField, "Some Float", "This is a float that means X.")
            ->Attribute(AZ::Edit::Attributes::ChangeNotify, &MyComponent::CalculateMoreData)
        // m_moreData is not reflected for editing directly.
        ;
}
```

Lumberyard has reflection contexts for different purposes, including the following:
+ [Serialization Context](component-entity-system-reflection-serialization-context.md) – Contains reflection data for serialization and construction of objects\.
+ [Edit Context](component-entity-system-reflection-edit-context.md) – Contains reflection data for visual editing of objects, as in Lumberyard Editor\.
+ [Behavior Context](component-entity-system-reflection-behavior-context.md) – Contains reflection for runtime manipulation of objects from Lua, [Script Canvas](script-canvas-intro.md), or other external sources\.
+ `NetworkContext` – Contains reflection for networking purposes, including marshaling, quantization, and extrapolation\.

**Note**  
 This topic covers only `SerializeContext` and `EditContext`\. 

All of Lumberyard's reflection API operations are designed to be simple, human readable, and human writable, with no forced dependency on code generation\. 

A component's `Reflect()` function is invoked automatically for all relevant contexts\. 

The following code dynamically casts the anonymous context provided to a serialize context, which is how components discern the type of context that `Reflect()` is being called for\.

```
AZ::SerializeContext* serialize = azrtti_cast<AZ::SerializeContext*>(context);
```

## Serialization<a name="component-entity-system-reflect-component-serialization"></a>

 Reflecting a class for serialization involves a [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern) style markup in C\+\+, as follows:

```
serialize->Class<TestAsset>()
         ->Version(1)
         ->Field("SomeFloat", &MyComponent::m_someFloatField)
         ->Field("SomeString", &MyComponent::m_someStringField)
         ->Field("Things", &MyComponent::m_things)
         ->Field("SomeEnum", &MyComponent::m_someEnumField)
         ;
```

The example specifies that `m_someFloatField`, `m_someStringField`, `m_things`, and `m_someEnumField` should all be serialized with the component\. Field names must be unique and are not user facing\. 

**Tip**  
We recommend that you keep field names simple for future proofing\. If your component undergoes significant changes and you want to write a data converter to maintain backward data compatibility, you must reference the field names directly\.

The preceding example reflects two primitive types—a float, and a string—as well as a container \(vector\) of some structure\. AZ reflection, serialization, and editing natively support a wide variety of types:
+ Primitive types, including integers \(signed and unsigned, all sizes\), floats, and strings
+ Enums
+ `AZStd` containers \(flat and associative\), including `AZStd::vector`, `AZStd::list`, `AZStd::map`, `AZStd::unordered_map`, `AZStd::set`, `AZStd::unordered_set`, `AZStd:pair`, `AZStd::bitset`, `AZStd::array`, fixed C\-style arrays, and others\.
+ Pointers, including `AZStd::smart_ptr`, `AZStd::intrusive_ptr`, and raw native pointers\.
+ Any class or structure that has also been reflected\.

**Note**  
The example omits the reflection code for `SomeClassThatSomeoneHasReflected`\. However, you need only reflect the class\. After that, you can freely reflect members or containers of that class in other classes\.

For C\+\+ API reference documentation on the serialize context, see the [SerializeContext Class Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_serialize_context.html) in the [Amazon Lumberyard C\+\+ API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/)\.

## Editing<a name="component-entity-system-reflect-component-editing"></a>

When you run Lumberyard tools such as Lumberyard Editor, an `EditContext` and a `SerializeContext` are provided\. You can use the robust facilities in these contexts to expose your fields to content creators\. 

The following code demonstrates basic edit context reflection: 

```
AZ::EditContext* edit = serialize->GetEditContext();
if (edit)
{
    edit->Class<TestAsset>("My Component", "The World's Most Clever Component")
        ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
             ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game"))
        ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someFloatField, "Some Float", "This is a float that means X.")
        ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someStringField, "Some String", "This is a string that means Y.")
        ->DataElement(AZ::Edit::UIHandlers::ComboBox, &MyComponent::m_someEnumField, "Choose an Enum", "Pick an option among a set of enum values.")
            ->EnumAttribute(MyComponent::SomeEnum::EnumValue1, "Value 1")
            ->EnumAttribute(MyComponent::SomeEnum::EnumValue2, "Value 2")
        ->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_things, "Bunch of Things", "A list of things for doing Z.")
    ;
}
```

Although this example demonstrates the simplest usage, many features and options are available when you reflect structures \(including components\) to the edit context\. For the fields to be exposed directly to content creators, the example provides a friendly name and a description \(tooltip\) as the third and fourth parameters of `DataElement`\. For three fields, the first parameter of `DataElement` is the default UI handler `AZ::Edit::UIHandlers::Default`\. The property system's architecture supports the ability to add any number of UI handlers, each valid for one or more field types\. A given type can have multiple available handlers, with one handler designated as the default\. For example, floats by default use the `SpinBox` handler, but a `Slider` handler is also available\.

An example of binding a float to a slider follows:

```
->DataElement(AZ::Edit::UIHandlers::Slider, &MyComponent::m_someFloatField, "Some Float", "This is a float that means X.")
      ->Attribute(AZ::Edit::Attributes::Min, 0.f)
      ->Attribute(AZ::Edit::Attributes::Max, 10.f)
      ->Attribute(AZ::Edit::Attributes::Step, 0.1f)
```

The `AZ::Edit::UIHandlers::Slider` UI handler expects `AZ::Edit::Attributes::Min` and `AZ::Edit::Attributes::Max` attributes\. Optionally, you can provide a value for `AZ::Edit::Attributes::Step`\. The example provides incremental increases of `0.1`\. If you do not provide a value for `AZ::Edit::Attributes::Step`, a default stepping of `1.0` is used\.

**Note**  
The property system supports external UI handlers, so you can implement your own UI handlers in your own modules\. You can customize the behavior of the field, the `Qt` control that it uses, and the attributes that it observes\.

For C\+\+ API reference documentation on the edit context, see the [EditContext Class Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_edit_context.html) in the [Amazon Lumberyard C\+\+ API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/)\.

## Attributes<a name="component-entity-system-reflect-component-attributes"></a>

The example also demonstrates the use of attributes\. Attributes are a generic construct on the edit context that allows the binding of literals, or functions that return values, to a named attribute\. UI handlers can retrieve this data and use it to drive their functionality\. 

 Attribute values can be bound to the following: 

Literal values  
`Attribute(AZ::Edit::Attributes::Min, 0.f)`

Static or global variables  
`Attribute(AZ::Edit::Attributes::Min, &g_globalMin)`

Member variables   
`Attribute(AZ::Edit::Attributes::Min, &MyComponent::m_min)`

Static or global functions   
`Attribute(AZ::Edit::Attributes::ChangeNotify, &SomeGlobalFunction)`

Member functions   
`Attribute(AZ::Edit::Attributes::ChangeNotify, &MyComponent::SomeMemberFunction)`

## Change Notification Callbacks<a name="component-entity-system-reflect-component-callbacks"></a>

Another commonly used feature of the edit context is its ability to bind a change notification callback: 

```
->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someStringField, "Some String", "This is a string that means Y.")
    ->Attribute(AZ::Edit::Attributes::ChangeNotify, &MyComponent::OnStringFieldChanged)
```

The example binds a member function to be invoked when this property is changed, which allows the component to conduct other logic\. The `AZ::Edit::Attributes::ChangeNotify` attribute also looks for an optional returned value that tells the property system if it needs to refresh aspects of its state\. For example, if your change callback modifies other internal data that affects the property system, you can request a value refresh\. If your callback modifies data that requires attributes be reevaluated \(and any bound functions be reinvoked\), you can request a refresh of attributes and values\. Finally, if your callback conducts work that requires a full refresh \(this is not typical\), you can refresh the entire state\. 

The following example causes the property grid to refresh values when `m_someStringField `is modified through the property grid\. `AZ::Edit::PropertyRefreshLevels::ValuesOnly` signals the property grid to update the GUI with changes to the underlying data\.

```
->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_someStringField, "Some String", "This is a string that means Y.")
    ->Attribute(AZ::Edit::Attributes::ChangeNotify, &MyComponent::OnStringFieldChanged)
...
AZ::u32 MyComponent::OnStringFieldChanged()
{
    m_someFloatField = 10.0f;
 
    // We've internally changed displayed data, so tell the property grid to refresh values (cheap).
    return AZ::Edit::PropertyRefreshLevels::ValuesOnly;
}
```

`AZ::Edit::PropertyRefreshLevels::ValuesOnly` is one of the following refresh modes that you can use \(`\dev\Code\Framework\AzCore\AzCore\Serialization\EditContextConstants.inl`\):
+ `AttributesAndValues` – Reevaluates attributes of the properties displayed in the UI and refreshes their values\. Because attributes can be bound to data members, member functions, global functions, or static variables, it's sometimes necessary to ask the property grid to reevaluate them\. Doing so might include reinvoking bound functions\.
+  `EntireTree` – Refreshes the entire tree that is displayed in the UI\. 
+  `None` – Specifies that the properties that are displayed in the UI should not be refreshed\.
+ `ValuesOnly` – Refreshes only the values of the properties that are displayed in the UI\. The property grid updates the GUI to reflect changes to underlying data that might have occurred in the change callback\.

The following more complex example binds a list of strings as options for a combo box\. The list of strings is attached to a string field *Property A*\. Suppose you want to modify the options available in the combo box for Property A with the values from another *Property B*\. In that case you can bind the combo box `AZ::Edit::Attributes::StringList` attribute to a member function that computes and returns the list of options\. In the `AZ::Edit::Attributes::ChangeNotify` attribute for Property B, you tell the system to reevaluate attributes, which in turn reinvokes the function that computes the list of options\.

```
...
 
bool m_enableAdvancedOptions;
AZStd::string m_useOption;
 
...
 
->DataElement(AZ::Edit::UIHandlers::Default, &MyComponent::m_enableAdvancedOptions, "Enable Advanced Options", "If set, advanced options will be shown.")
    ->Attribute(AZ::Edit::Attributes::ChangeNotify, AZ::Edit::PropertyRefreshLevels::AttributesAndValues)
->DataElement(AZ::Edit::UIHandlers::ComboBox, &MyComponent::m_useOption, "Options", "Available options.")
    ->Attribute(AZ::Edit::Attributes::StringList, &MyComponent::GetEnabledOptions)
...
 
AZStd::vector<AZStd::string> MyComponent::GetEnabledOptions()
{
    AZStd::vector<AZStd::string> options;
    options.reserve(16);
 
    options.push_back("Basic option");
    options.push_back("Another basic option");
 
    if (m_enableAdvancedOptions)
    {
        options.push_back("Advanced option");
        options.push_back("Another advanced option");
    }
 
    return options;
}
```