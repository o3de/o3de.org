# Extendable Nodes<a name="script-canvas-custom-nodes-extendable"></a>

Certain nodes, such as the math operators, can function on an arbitrarily long list of parameters\. To maintain this feature without creating a needlessly large node, extendable slots let users add as many slots as they require to a node\.

The following code example shows an extendable node interface\.

```
// Returns whether or not the specified SlotId should be allowed to be removed from the given node.
// This should return false, unless the slot was added dynamically through the extender system.
virtual bool CanDeleteSlot(const SlotId& slotId) const;
 
virtual bool IsNodeExtendable() const;
virtual int GetNumberOfExtensions() const;
 
 
// At display time, the extendable configuration will be enumerated on for display purposes within GraphCanvas.
// This should return the configuration that provides details about the information necessary to display and operate
// the ExtenderSlot from graph canvas.
virtual ExtendableSlotConfiguration GetExtensionConfiguration(int extensionCount) const;
 
// Signals to the node to add a slot for the specific extension. Should return the SlotId of that slot that was added
// for the specific ExtensionId.
virtual SlotId HandleExtension(AZ::Crc32 extensionId);
```

The following code example shows how to configure an extendable slot\.

```
struct ExtendableSlotConfiguration
{
public:
    AZ_TYPE_INFO(ExtendableSlotConfiguration, "{3EA2D6DB-1B8F-451B-A6CE-D5779E56F4A8}");
    AZ_CLASS_ALLOCATOR(ExtendableSlotConfiguration, AZ::SystemAllocator, 0);
 
    ExtendableSlotConfiguration() = default;
    ~ExtendableSlotConfiguration() = default;
 
    // The name and tooltip to appear on the corresponding GraphCanvas ExtenderSlot.
    AZStd::string m_name;
    AZStd::string m_tooltip;
 
    // How to group the ExtenderSlot visually on the node.
    AZStd::string m_displayGroup;
 
    // The ExtensionId used to identifier the individual ExtenderSlots on a node from one another in the case of
    // multiple ExtenderIds.
    AZ::Crc32     m_identifier;
     
    // Controls whether the GraphCanvas ExtenderSlot appears as an input pin or an output pin.
    ConnectionType m_connectionType = ConnectionType::Unknown;
};
```