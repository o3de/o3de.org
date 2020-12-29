# Dynamic Data Slots<a name="script-canvas-custom-nodes-dynamic-data"></a>

There are cases where a single node can function on multiple different input types \(for example, the **Lerp Between** node can function on numbers and vector objects\)\. To reduce the number of unique nodes, you can use dynamic data slots\. Dynamic data slots enable a single node to handle a variety of data types\. At the same time, they allow restrictions on the data types that can be connected\.

You can use the `ScriptCanvas_DynamicDataSlot` tag to add a `DynamicDataSlot` to any node, as shown in the following example\.

```
ScriptCanvas_DynamicDataSlot(ScriptCanvas::DynamicDataType::Value,
                             ScriptCanvas::ConnectionType::Output,
                             ScriptCanvas_DynamicDataSlot::Name("Step", "The value of the current step of the lerp.")
                             ScriptCanvas_DynamicDataSlot::DynamicGroup("LerpGroup")
                             ScriptCanvas_DynamicDataSlot::RestrictedTypeContractTag({ Data::Type::Number(), Data::Type::Vector2(), Data::Type::Vector3(), Data::Type::Vector4() })
                            )
```

The `ScriptCanvas_DynamicDataSlot` tag includes the following code gen attributes:


****  

| Attribute | Description | 
| --- | --- | 
| DynamicDataType |  Allows the user to specify a macro category of dynamic typing information\. DynamicDataType has the following supported values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/script-canvas-custom-nodes-dynamic-data.html)  | 
| DynamicGroup | Unifies a group of dynamically typed slots\. When one slot has a type, all slots in the group share the same type\. This attribute is useful for ensuring that passthrough values or operands all share a common type\. | 
| RestrictedTypeContractTag | Restricts the data types that the dynamically typed slot accepts\. Takes an argument that is a list of supported data types\. | 

## Important Notes about Groups<a name="script-canvas-custom-nodes-dynamic-data-important-notes-about-groups"></a>

For the purposes of contract restrictions, the grouped slots act as a single unit\. If one slot doesn't allow a particular type, no slots in that group allow that type\. This behavior is because connection types are propagated through every member of a group and every group connected to that group\. This also applies to dynamic data slots that are connected to each other and any dynamic data slots that are connected but ungrouped\.

### Chained Dynamic Types<a name="script-canvas-custom-nodes-dynamic-data-chained-dynamic-types"></a>

When dynamic types are connected, the receiving slot takes on the data type and restrictions of the connecting slot\.

**Example**  

![\[Create a dynamically chained node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-chained-dynamic-types.gif)

Like dynamic groups, any pair of dynamically typed nodes that are linked share the same restrictions\. This includes any restrictions from the node group\. Additionally, the slots are usually in the most unrestricted state as possible\. Unless a display type gives a set of dynamically typed slots a type, the slots remain untyped\.

## Adding Dynamic Data Slots Programmatically<a name="script-canvas-custom-nodes-dynamic-data-adding-dynamic-data-slots-programmatically"></a>

You can also add dynamic slots programmatically\. Use `DynamicDataSlotConfiguration` to define the slot, and then the generic `AddSlot` method to add it, as shown in the following example\.

```
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

For information about `DynamicGroup` and `DynamicDataType`, see the `ScriptCanvas_DynamicDataSlot` attributes table earlier in this topic\.