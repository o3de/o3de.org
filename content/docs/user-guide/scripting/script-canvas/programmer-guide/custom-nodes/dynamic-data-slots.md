---
linktitle: Dynamic Data Slots
title: Dynamic Data Slots in Script Canvas
description: Use dynamic data slots to enable a single node to process a variety of data types in Script Canvas, which is the visual scripting system in Open 3D Engine (O3DE).
weight: 300
---

There are cases where a single node can function on multiple different input types (for example, the **Lerp Between** node can function on numbers and vector objects). To reduce the number of unique nodes, you can use dynamic data slots. Dynamic data slots enable a single node to handle a variety of data types. At the same time, they allow restrictions on the data types that can be connected.

You can use the `ScriptCanvas_DynamicDataSlot` tag to add a `DynamicDataSlot` to any node, as shown in the following example.

```cpp
ScriptCanvas_DynamicDataSlot(ScriptCanvas::DynamicDataType::Value,
                             ScriptCanvas::ConnectionType::Output,
                             ScriptCanvas_DynamicDataSlot::Name("Step", "The value of the current step of the lerp.")
                             ScriptCanvas_DynamicDataSlot::DynamicGroup("LerpGroup")
                             ScriptCanvas_DynamicDataSlot::RestrictedTypeContractTag({ Data::Type::Number(), Data::Type::Vector2(), Data::Type::Vector3(), Data::Type::Vector4() })
                            )
```

The `ScriptCanvas_DynamicDataSlot` tag includes the following code gen attributes:

| Attribute | Description |
| --- | --- |
| DynamicDataType |  Allows the user to specify a macro category of dynamic typing information. DynamicDataType has the following supported values: <br><ul><li>**Container &ndash;** Maps or arrays of any data type.</li><li>**Value &ndash;** Any non-map or non-array value.</li><li>**Any &ndash;** Any Container or Value type.</li></ul> |
| DynamicGroup | Unifies a group of dynamically typed slots. When one slot has a type, all slots in the group share the same type. This attribute is useful for ensuring that passthrough values or operands all share a common type. |
| RestrictedTypeContractTag | Restricts the data types that the dynamically typed slot accepts. Takes an argument that is a list of supported data types. |

## Important notes about groups

For the purposes of contract restrictions, the grouped slots act as a single unit. If one slot doesn't allow a particular type, no slots in that group allow that type. This behavior is because connection types are propagated through every member of a group and every group connected to that group. This also applies to dynamic data slots that are connected to each other and any dynamic data slots that are connected but ungrouped.

### Chained dynamic types

When dynamic types are connected, the receiving slot takes on the data type and restrictions of the connecting slot.

**Example**

![Create a dynamically chained node.](/images/user-guide/scripting/script-canvas/script-canvas-chained-dynamic-types.gif)

Like dynamic groups, any pair of dynamically typed nodes that are linked share the same restrictions. This includes any restrictions from the node group. Additionally, the slots are usually in the most unrestricted state as possible. Unless a display type gives a set of dynamically typed slots a type, the slots remain untyped.

## Adding dynamic data slots programmatically

You can also add dynamic slots programmatically. Use `DynamicDataSlotConfiguration` to define the slot, and then the generic `AddSlot` method to add it, as shown in the following example.

```cpp
SlotId MyNode::AddDynamicSlot(AZStd::string_view name, AZStd::string_view toolTip, ConnectionType connectionType)
{
    DynamicDataSlotConfiguration slotConfiguration;

    // Generic Slot Configuration
    slotConfiguration.m_name = name;
    slotConfiguration.m_toolTip = toolTip;
    slotConfiguration.SetConnectionType(connectionType);
    slotConfiguration.m_addUniqueSlotByNameAndType = false;

    // Contract Descs provides a list of contracts that must be satisfied for a connection to be accepted to this slot.
    //slotConfiguration.m_contractDescs.push_back(TypeRestriction);

    // DynamicDataSlot Specific Configurations
    slotConfiguration.m_dynamicGroup = "DynamicDataGroup";
    slotConfiguration.m_dynamicDataType = DynamicDataType::Value;
    ////

    return AddSlot(slotConfiguration);
}
```

For information about `DynamicGroup` and `DynamicDataType`, refer to the `ScriptCanvas_DynamicDataSlot` attributes table earlier in this topic.
