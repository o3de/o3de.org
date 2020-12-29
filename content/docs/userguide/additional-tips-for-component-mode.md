# Tips for Working with Component Mode<a name="additional-tips-for-component-mode"></a>

See the following tips for adding a Component Mode to your component\.

## Additional Input Handling<a name="input-handling"></a>

If you want to handle mouse events in a specific way \(for example, outside of using manipulators\), you can override `HandleMouseInteraction`, which is part of the `EditorBaseComponentMode` class that is defined in the `ComponentModeRequestBus`\.

This `HandleMouseInteraction` function is called whenever a mouse event happens\. The `MouseInteractionEvent`, which is passed as an argument to the function, contains information such as the mouse pick ray, position in screen space, and buttons and modifier keys that are pressed\.

```
// EditorBaseComponentMode
void Refresh() override;
bool HandleMouseInteraction(
    const AzToolsFramework::ViewportInteraction::MouseInteractionEvent& mouseInteraction) override;
```

## Additional Drawing<a name="additonal-drawing"></a>

If you want to add additional debug drawing while in Component Mode, you can implement the `AzFramework::EntityDebugDisplayEventBus` and then override `DisplayEntityViewport`\. Remember to connect the `EntityDebugDisplayEventBus` in the Component Mode constructor and disconnect in the destructor\.

This can be useful for additional drawing for an entity and its components\.

**Note**  
The `EntityDebugDisplayEventBus` is only addressed by `EntityId`\. You might encounter issues when working with multiple components of the same type on a given entity\.

See the following example for the `.h` file\.

```
// EditorPointLightComponentMode.h
// AzFramework::EntityDebugDisplayEventBus
void DisplayEntityViewport(
    const AzFramework::ViewportInfo& viewportInfo,
    AzFramework::DebugDisplayRequests& debugDisplay) override;
```

See the following example for the implementation `.cpp` file\.

```
// EditorPointLightComponentMode.cpp
EditorPointLightComponentMode::EditorPointLightComponentMode(
    const AZ::EntityComponentIdPair& entityComponentIdPair, AZ::Uuid componentType)
    : EditorBaseComponentMode(entityComponentIdPair, componentType)
{
    ...
    AzFramework::EntityDebugDisplayEventBus::Handler::BusConnect(GetEntityId());
}

    EditorPointLightComponentMode::~EditorPointLightComponentMode()
{
    AzFramework::EntityDebugDisplayEventBus::Handler::BusDisconnect();
    ...
}

void EditorPointLightComponentMode::DisplayEntityViewport(
    const AzFramework::ViewportInfo& /*viewportInfo*/,
    AzFramework::DebugDisplayRequests& debugDisplay)
{
    ...
}
```