---
linktitle: Node Definition Reference
title: Script Canvas Node Definition Reference
description: Reference guide on all the XML elements available when defining node definition files that create Script Canvas nodes using autogen.
weight: 250
---

_Script Canvas Node Definition files_ are XML files that [AzAutoGen](/docs/user-guide/programming/autogen/) uses to generate the necessary C++ code for registering nodes, defining their topology, and reducing the amount of "boilerplate" code that would otherwise be necessary. This reference guide covers all the available XML tags and attributes needed to create Script Canvas nodes.

---

### ScriptCanvas

The __ScriptCanvas__ tag is the top-level description of the node. It is used to produce the C++ class that represents the node and to configure its serialization & editor properties.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------|
| __Include__   | Required |  The name of the Script Canvas Node  | `Include="Include/ScriptCanvas/Internal/Nodeables/BaseTimer.h"` |
| __xmlns:xsi__ | Recommended | Indicates that the elements and data types used in the schema come from the `"http://www.w3.org/2001/XMLSchema"` namespace. It also specifies that the elements and data types that come from it should be prefixed with `xsi:`. | `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"` |

----

### Class

The __Class__ tag is used to define the node's appearance within O3DE. Many of these attributes control the node's serialization..

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------|------------|
| __Name__   | Required |  The name of the Script Canvas Node  | `Name="My Node"` |
| __QualifiedName__  | Required |  Fully qualified name, includes all namespaces. For example, `ScriptCanvas::Nodes::MyNode`. | `QualifiedName="ScriptCanvas::Nodes::MyNode"` |
| __Description__ | Recommended | Describes the node and its functionality, this is displayed as a tooltip on the node | `Description="An example node"` |
| __Category__ | Recommended | Category defines where this node will appear on the Node Palette. You can nest categories by separating with the `/` character. | `Category="Math/Linear Algebra"` |
| __PreferredClassName__ | Optional | In some cases it may be desirable to override the node's class name in the Script Canvas Editor. This field doesn't change the node's functionality, only the class name used in the __EditContext__. | `PreferredClassName="A Different Name"`|
| __Uuid__ | Optional | Allows you to provide a specific Universal Identifier, this is generally generated but in some situations it may be desirable to provide a specific UUID.  | `Uuid="{EE36A690-7C33-445F-B9E8-BD045D6ACC1D}"` |
| __Icon__ | Unused | Currently unused, would provide a path for displaying a custom icon associated with a node | `Icon="Icons/ScriptCanvas/Checkpoint.png"` |
| __Version__ | Optional | As with any serialized class in O3DE, nodes may provide a version, this creates a mechanism for addressing code changes that may invalidate data | `Version="2"` |
| __VersionConverter__ | Optional | If the topography of a node changes, a version converter may be used to provide a migration mechanism | `VersionConverter="ScriptCanvas::ForEachVersionConverter"` |
| __EventHandler__ | Optional | Used by the serialization system, it may sometimes be useful to capture serialization events| `EventHandler="SerializeContextOnWriteEndHandler&lt;EBusEventHandler&gt;"` |
| __Deprecated__ | Optional | Marks this node as deprecated, deprecated nodes will not be displayed in the Node Palette, but may still appear in existing Script Canvas graphs | `Deprecated="This node has been deprecated"`|
| __DeprecationUUID__ | Optional | When specified, this UUID is used to replace this deprecated node with the node of the provided UUID, this allows graphs to be updated automatically | `DeprecationUUID="{D3629902-02E9-AE59-0424-F366D342B433}"` |
| __Base__ | Optional | In some cases it may be desireable to specify the base class, for example when a node derives from a different node | `Base="ScriptCanvas::Nodes::Internal::BaseTimerNode"` |
| __GraphEntryPoint__ | Optional | When enabled, Script Canvas may use this node as the entry point to begin running. | `GraphEntryPoint="True"` |
| __EditAttributes__ | Optional | Provides __EditContext__ attributes in the node's serialization. Use the `@` character to separate the key/value. Separate multiple attributes with a semi colon (`;`). | `EditAttributes="AZ::Script::Attributes::ExcludeFrom@AZ::Script::Attributes::ExcludeFlags::All;` `ScriptCanvas::Attributes::Node::TitlePaletteOverride@StringNodeTitlePalette"` |
| __DynamicSlotOrdering__ | Optional | Enable this when the order of slots may change at edit time. By default, this is disabled. | `DynamicSlotOrdering="True"` |
----

Note: When specifying C++ code you must use the HTML Entity Codes. For example, in the case of __EventHandler__, instead of the C++ code `SerializeContextOnWriteEndHandler<EBusEventHandler>`, specify `SerializeContextOnWriteEndHandler&lt;EBusEventHandler&gt;`


### Examples

```xml
<ScriptCanvas Include="Include/ScriptCanvas/Libraries/Core/Start.h" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Class Name="Start"
        QualifiedName="ScriptCanvas::Nodes::Core::Start"
        PreferredClassName="On Graph Start"
        Uuid="{F200B22A-5903-483A-BF63-5241BC03632B}"
        Category="Timing"
        Version="2"
        GraphEntryPoint="True"
        Description="Starts executing the graph when the entity that owns the graph is fully activated.">
    </Class>
</ScriptCanvas>
```


## Execution slot elements

### Input

The __Input__ tag is used to configure execution entry slots on a node. Visually these would be on the left side of a node in the Script Canvas editor.

### Supported Attributes

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------|------------|
| __Name__ | Required | The name for this input slot | `Name="My Node"` |
| __Description__ | Optional | Describes this input slot, it is displayed as a tooltip in the editor | `Description="Useful node"`|
| __DisplayGroup__ | Optional | Allows slots to be grouped visually | `DisplayGroup="Tests"` |
| __Output__ | Optional | Allows a corresponding output execution slot to be provided | `Output="Done"` |
| __Latent__| Optional | This only applies if the __Output__ attribute is provided, it signals that the __Output__ slot may not execute immediately and may take more than one frame | `Output="Done" Latent="true"` |
----

### Output

The __Output__ tag is used to configure execution exit slots on a node. Visually these would be on the right side of a node in the Script Canvas editor.

### Supported Attributes

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name for this input slot | `Name="My Node"` |
| __Description__ | Optional | Describes this input slot, it is displayed as a tooltip in the editor | `Description="Useful node"`|
| __DisplayGroup__ | Optional | Allows slots to be grouped visually | `DisplayGroup="Tests"` |
| __Latent__| Optional | This only applies if the __Input__ tag's __Output__ attribute is provided. It signals that the __Output__ slot may not execute immediately and may take more than one frame. | `Output="Done" Latent="true"` |
----

### Examples

```xml
<Input Name="Start" Output="Started" Description="Use this to start this operation"/>
<Input Name="Stop " Output="Stopped" Latent="true" Description="Use this to stop this operation"/>

<Output Name="Out" Description="Called immediately after this node is invoked"/>
<Output Name="OperationComplete" Latent="true" Description="Called when this node's operation has finished"/>
```

## Data slot elements

### Parameter

The __Parameter__ tag can be specified within the __Input__ tag, it is used to define data entry points into a node.

### Supported Attributes

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name for this data input slot | `Name="Operand A"` |
| __Type__ | Required | This is the C++ type of the property. It must be a type that's exposed to the O3DE serialization context. If the type contains special characters, you must use the HTML Entity Codes (for example, update `AZStd::vector<int>` to `AZStd::vector&lt;int&gt;`). | `Type="float"` |
| __Description__ | Optional | Describes this data input slot, it is displayed as a tooltip when hovering over the slot | `Description="Result of this mathematical operation"`|

### Examples

```xml
<Input Name="In">
    <Parameter Name="Value 1" Type="float" Description="First Value in the equation"/>
    <Parameter Name="Value 2" Type="float" Description="Second Value in the equation"/>
</Input>
```


### Property

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the property. This is the name that will appear in the slot on the node, and is also the name of the property in C++. The name may be overridden using [PropertyData](#propertydata). | `Name="m_timeUnit"` |
| __Type__ | Required | This is the C++ type of the property. It must be a type that's exposed to the O3DE serialization context. If the type contains special characters, you must use the HTML Entity Codes (for example, update `AZStd::vector<int>` to `AZStd::vector&lt;int&gt;`). | `Type="float"` |
| __DefaultValue__ | Optional | Allows you to provide the default value for the property | `DefaultValue="1000.0"`|
| __UIHandler__ | Optional | Allows the user to override the property's default UI Handler in the Node Inspector | `UIHandler="AZ::Edit::UIHandlers::ComboBox"`|
| __DisplayGroup__ | Optional | Allows slots to be grouped visually | `DisplayGroup="Tests"` |
| __IsInput__ | [Grammar Only](#grammar) | Used to define if this property will be placed as an input data slot on a node. This option is not available for Nodeables | `IsInput="True"` or `IsInput="False"` |
| __IsOutput__ | [Grammar Only](#grammar) | Used to define if this property will be placed as an output data slot on a node. This option is only available for Nodeables | `IsOutput="True"` or `IsOutput="False"` |


### PropertyData

The __PropertyData__ can be provided for elements of __Property__, it provides a mechanism to override certain __EditContext__ parameters of the type's reflection.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the property, this is the name that will of the slot on the node | `Name="Time Unit"` |

### EditAttribute

The __EditAttribute__ element can be provided within __PropertyData__, it allows to provide O3DE serialization attributes to the property.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Key__ | Required | The attribute name to be set | `Key="AZ::Edit::Attributes::GenericValueList"` |
| __Value__ | Required | The value to set on the attribute | `Value="&amp;BaseTimer::GetTimeUnitList"` |

### Examples

```xml
<Property Name="m_timeUnits" Type="int" DefaultValue="0" Serialize="true">
    <PropertyData Name="Units" Description="Units to represent the time in." UIHandler="AZ::Edit::UIHandlers::ComboBox">
        <EditAttribute Key="AZ::Edit::Attributes::GenericValueList" Value="&amp;BaseTimer::GetTimeUnitList"/>
        <EditAttribute Key="AZ::Edit::Attributes::PostChangeNotify" Value="&amp;BaseTimer::OnTimeUnitsChanged"/>
    </PropertyData>
</Property>
```

----


----

### Parameter

__Parameter__ is used by the [Input](#input) and [Output](#output) tags. They represent data slots on the node.
 
| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | | | | 
| __Type__ | Required | This is the C++ type of the property. It must be a type that's exposed to the O3DE serialization context. If the type contains special characters, you must use the HTML Entity Codes (for example, update `AZStd::vector<int>` to `AZStd::vector&lt;int&gt;`). | `Type="float"` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The radius of the circle"`|
| __DefaultValue__ | Optional | Allows you to provide the default value for the property | `DefaultValue="1000.0"`|
| __DisplayGroup__ | Optional | Allows slots to be grouped visually | `DisplayGroup="Tests"` |
----

### Return

__Return__ is used by the [Input](#input) tag, represents an output data slot on the node. You can think of it as the return value in a function, such as the value returned by the following C++ function `int Foo() { return 42; }`.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name will be used as the data output slot's name | `Name="Return Value"` | 
| __Type__ | Required | This is the C++ type of the property. It must be a type that's exposed to the O3DE serialization context. If the type contains special characters, you must use the HTML Entity Codes (for example, update `AZStd::vector<int>` to `AZStd::vector&lt;int&gt;`). | `Type="float"` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The radius of the circle"`|
| __DefaultValue__ | Optional | Allows you to provide the default value for the property | `DefaultValue="1000.0"`|
| __DisplayGroup__ | Optional | Allows slots to be grouped visually | `DisplayGroup="Tests"` |
----

### Examples

```xml
<Input Name="Fibonacci" OutputName="Done">
    <Parameter Name="X" Type="int" Description="The value to calculate Fibonacci for"/>
    <Return Name="Result" Type="int"/>
</Input>
```

### Branch

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | Specifies the name of the branch, in C++ this will create a function with the name `Call<BranchName>` where `<BranchName>` is the specified name. 
----

### Examples

The following example creates a node that will return `Success` and an `Entity Spawn Ticket` or return `Failed`
```xml
<Input Name="Create Ticket" OutputName="Ticket Created">
    <Parameter Name="Prefab" Type="const AzFramework::Scripts::SpawnableScriptAssetRef&amp;" Description="Prefab source asset to spawn"/>
	<Branch Name="Success">
        <Return Name="Entity Spawn Ticket" Type="AzFramework::EntitySpawnTicket"/>
    </Branch>
    <Branch Name="Failed"/>
</Input>
```
The node definition above will generate corresponding calls for each C++ branch in the same way it generates C++ functions for outputs. In this example it will generate `CallSuccess` and `CallFailed`, you can call these functions from within your node's C++ implementation.

```cpp
void CreateSpawnTicketNodeable::CreateTicket(const AzFramework::Scripts::SpawnableScriptAssetRef& prefab)
{
    auto ticket = m_spawnableScriptMediator.CreateSpawnTicket(prefab);
    if (ticket.IsSuccess())
    {
        CallSuccess(ticket.GetValue());
    }
    else
    {
        AZLOG_ERROR("Unable to Create Spawn Ticket - A valid prefab was not provided");
        CallFailed();
    }
}
```
----

## Free function elements

[Script Canvas Free Function Nodes](./custom-free-function-nodes) expose C++ functions directly into the Behavior Context. This provides a quick and easy way to create libraries of functions that are available for use in Script Canvas.

Use the following elements when defining Free Function Nodes:

### Function

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the function | `Name="RandomColor"` |
| __Branch__ | Optional | Specifies that the function be used to evaluate the branching condition | `Branch="IsValidFindPosition"` |
| __BranchWithValue__ | Optional |  | `BranchWithValue="True"` |

Note: functions can use the [Parameter](#parameter) element to specify data inputs.

```xml
<Function Name="RandomColor">
    <Parameter Name="MinValue" DefaultValue="Data::ColorType(0.0f, 0.0f, 0.0f, 1.0f)"/>
    <Parameter Name="MaxValue" DefaultValue="Data::ColorType(1.0f, 1.0f, 1.0f, 1.0f)"/>
</Function>

<Function Name="IsValidFindPosition"> <!-- Used by ContainsString to evaluate the condition to branch -->
    <Parameter Name="Position" Description="The string find position to check against"/>
</Function>

<Function Name="ContainsString" Branch="IsValidFindPosition" BranchWithValue="True">
    <Parameter Name="Source" Description="The string to search in."/>
    <Parameter Name="Pattern" Description="The substring to search for."/>
    <Parameter Name="Search From End" Description="Start the match checking from the end of a string."/>
    <Parameter Name="Case Sensitive" Description="Take into account the case of the string when searching."/>
</Function>

```

### Out

Functions can use the __Out__ element to specify the name for each of the [Branch](#branch) results.

__NOTE:__ There may only be 2 __Out__ elements for branching functions, if more than 2 exist an error will be displayed during compilation.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the function | `<Function Name="Clamp">` |

```xml
<Function Name="BranchExample" Branch="IsPositive" BranchWithValue="True">
    <Out Name="Is Positive"/>
    <Out Name="Is Negative"/>
</Function>
```

### Library

Create a collection of functions using the `Library` element.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Include__ | Required | The relative path to the C++ include file that will contain the library function declarations | `Include="Include/ScriptCanvas/Libraries/Math/Color.h"` |
| __Namespace__ | Required | The namespace that holds the C++ functions in this library | `Namespace="ScriptCanvas::ColorFunctions"` |
| __Category__ | Recommended | Category defines where this node will appear in the Node Palette. You can nest categories by separating with the `/` character. | `Category="Math/Color"` |


```xml
<Library Include="Include/ScriptCanvas/Libraries/Math/MathFunctions.h"
        Namespace="ScriptCanvas::MathRandoms"
        Category="Math/Random">

    <!-- Function Definitions -->

</Library>
```
----

## Grammar

Grammar nodes are nodes that have a direct translation into the backend's execution format, which is Lua. You do not need to create new grammar nodes if the Script Canvas Nodeable format is sufficient. However, in some situations it might be desirable to extend the Script Canvas grammar.

There are many shared elements and attributes between the grammar nodes and the node definitions. This section will cover the differences.

### In

Specifies an execution entry slot

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the execution slot | `<In Name="Start">` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The radius of the circle"`|

### Out

Specifies an execution exit slot

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the execution slot | `<Out Name="Done">` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The radius of the circle"`|

### OutLatent

Specifies a latent execution exit slot, a latent slot may execute several frames or ticks from the moment the node is invoked

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the execution slot | `<OutLatent Name="TimerDone">` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The specified time interval is complete"`|

### SerializedProperty

A C++ member variable that needs to be serialized

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the execution slot | `<SerializedProperty Name="m_numericPrecision"/>` |


### EditProperty

Allows providing __EditContext__ attributes to an existing __Property__ or __SerializedProperty__

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name to replace the field's name, cosmetic only | `<SerializedProperty Name="m_numericPrecision"/>` |
| __FieldName__ | Required | The name of the __Property__ or __SerializedProperty__ | `FieldName="m_numericPrecision"` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The radius of the circle"`|
| __UIHandler__ | Optional | Allows the user to override the property's default UI Handler in the Node Inspector | `UIHandler="AZ::Edit::UIHandlers::ComboBox"`|
| __DisplayGroup__ | Optional | Allows slots to be grouped visually | `DisplayGroup="Tests"` |

```xml
<EditProperty UiHandler="AZ::Edit::UIHandlers::Default" FieldName="m_numericPrecision" Name="Precision" Description="The precision with which to print any numeric values.">
    <EditAttribute Key="AZ::Edit::Attributes::Min" Value="0"/>
    <EditAttribute Key="AZ::Edit::Attributes::Max" Value="24"/>
</EditProperty>
```

### EditAttribute

__EditProperty__ may also use [EditAttribute](#editattribute) data.

### DynamicDataSlot

A Dynamic Data Slot is a slot that does not have a predefined type; the type is acquired by the slot when a connection is made or when a variable reference is created. The type of the slot may be a value, a container, or a general purpose slot that supports 'Any' type.

| __Attribute__   |  __Requirements__  | __Description__ | __Example__ |
| ---------- | ------------| ------------| ------------| 
| __Name__ | Required | The name of the data slot | `Name="Format"` |
| __Description__ | Optional | Displayed as a tooltip when hovering over the slot | `Description="The radius of the circle"`|
| __ConnectionType__ | Required | `ScriptCanvas::ConnectionType::Input` or `ScriptCanvas::ConnectionType::Output` | `ConnectionType="ScriptCanvas::ConnectionType::Input"` |
| __DynamicType__ | Required | `Value`, `Container`, or `Any` | `DynamicType="ScriptCanvas::DynamicDataType::Container"` | 


```xml
<DynamicDataSlot Name="Source"
                 Description="The container to get the size of."
                 ConnectionType="ScriptCanvas::ConnectionType::Input"
                 DynamicType="ScriptCanvas::DynamicDataType::Container" />
```                         