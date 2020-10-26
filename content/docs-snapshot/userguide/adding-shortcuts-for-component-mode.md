# Step 4: Add Shortcuts for Component Mode<a name="adding-shortcuts-for-component-mode"></a>

In the following procedure, create shortcuts that are specific to the component that you're editing\. For example, if you're editing a **Spline** component and want to add shortcuts for working with vertices, you can create a shortcut such as **Ctrl**\+**D** to duplicate a point or **Delete** to remove it\. When adding shortcuts, note the following changes in your code:
+ `EditorBaseComponentMode` provides an additional function to override in its interface called `PopulateActionsImpl`\.

  ```
  AZStd::vector<AzToolsFramework::ActionOverride> PopulateActionsImpl() override;
  ```
+ The `PopulateActionsImpl` function returns a vector of available actions that you can perform in Component Mode\. By default, you always get the following shortcuts, which you can't change:
  + **Ctrl**\+**S** – Save
  + **Ctrl**\+**Z** – Undo
  + **Ctrl**\+**Shift**\+**Z** – Redo
  + **Esc** – Leave Component Mode

**To create shortcuts for Component Mode**

1. In the `EditorPointLightComponentMode.cpp` file, create an `ActionOverride` struct and use the `Set` chain methods to improve readability\. The most important piece of this change is a unique identifier\. The format is a reverse URL: `com.company.action.component.type`\.

   ```
   static const AZ::Crc32 s_resetPointLight = AZ_CRC("com.amazon.action.pointlight.reset") ;
   ```

1. Specify what shortcut to use and then enter a name and description so that the shortcut appears in the **Edit** menu\. 

   ```
   .SetKeySequence(QKeySequence(Qt::Key_R))
   .SetTitle("Reset")
   .SetTip("Reset all Point Light State")
   .SetEntityComponentIdPair(AZ::EntityComponentIdPair(GetEntityId(), GetComponentId()))
   ```
**Note**  
You must provide the entity and component ID that this action corresponds to and finally the event or callback itself to perform\.

1. To ensure that you can undo this action, create an undo batch and mark the entity as *dirty*\. 

   ```
   // Ensure that we record undo command for reset
   AzToolsFramework::ScopedUndoBatch undoBatch("Reset Point Light");
   AzToolsFramework::ScopedUndoBatch::MarkEntityDirty(entityId);
   ```

1. The current and next states of the entity are compared, and if they don't match, the undo action is recorded\. Follow the `undoBatch` function with a series of calls to reset the state of the component and then refresh and update the position of any manipulators so that they accurately reflect the state of the component\.

   ```
   /// Other set functions to return state to default...
     
   // refresh manipulators
   Refresh();
   
   // ensure property grid values are refreshed
   AzToolsFramework::ToolsApplicationNotificationBus::Broadcast(
       &AzToolsFramework::ToolsApplicationNotificationBus::Events::InvalidatePropertyDisplay,
       AzToolsFramework::Refresh_Values);
   ```

1. Save your file\.

**Example EditorPointLightComponentMode\.cpp**  
You can add additional actions such as a shortcut to reset all properties on the component like the following\.  

```
static const AZ::Crc32 s_resetPointLight = AZ_CRC("com.amazon.action.pointlight.reset") ;
 
AZStd::vector<AzToolsFramework::ActionOverride> EditorPointLightComponentMode::PopulateActionsImpl()
{
   return AZStd::vector<AzToolsFramework::ActionOverride>
   {
       AzToolsFramework::ActionOverride()
        .SetUri(s_resetPointLight)
        .SetKeySequence(QKeySequence(Qt::Key_R))
        .SetTitle("Reset")
        .SetTip("Reset all Point Light State")
        .SetEntityComponentIdPair(AZ::EntityComponentIdPair(GetEntityId(), GetComponentId()))
        .SetCallback([this]()
        {
            const AZ::EntityId entityId = GetEntityId();
  
            // ensure we record undo command for reset
            AzToolsFramework::ScopedUndoBatch undoBatch("Reset Point Light");
            AzToolsFramework::ScopedUndoBatch::MarkEntityDirty(entityId);
  
            EditorLightComponentRequestBus::Event(
                entityId, &EditorLightComponentRequests::SetPointMaxDistance, 1.0f);
  
            /// other set functions to return state to default...
  
            // refresh manipulators
            Refresh();
  
            // ensure property grid values are refreshed
            AzToolsFramework::ToolsApplicationNotificationBus::Broadcast(
                &AzToolsFramework::ToolsApplicationNotificationBus::Events::InvalidatePropertyDisplay,
                AzToolsFramework::Refresh_Values);
        })
   };
}
```