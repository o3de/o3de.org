# UIDropTargetComponent<a name="lua-scripting-ces-api-ui-uidroptarget"></a>

You can use a drop target component to make an element a target for drag\-and\-drop behavior\.

## UiDropTargetBus<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus"></a>

Services messages for the `UiDropTargetComponent`\.

### GetDropState<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-getdropstate"></a>

Returns the current drop state of the drop target component\.

**Syntax**

```
eUiDropState GetDropState()
```

Following are possible values for `eUiDropState`\.

```
enum eUiDropState
    {
        eUiDropState_Normal,
        eUiDropState_Valid,
        eUiDropState_Invalid
    };
```

### GetOnDropAction<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-getondropaction"></a>

Returns the action triggered when a draggable component is dropped on this drop target\.

**Syntax**

```
const AZStd::string& GetOnDropAction()
```

### SetDropState<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-setdropstate"></a>

Sets the current drop state of the drop target component\.

**Syntax**

```
Void SetDropState(eUiDropState dragState)
```

For possible values for `eUiDropState`, see [GetDropState](#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-getdropstate)\.

### SetOnDropAction<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-setondropaction"></a>

Sets the action triggered when a draggable component is dropped on this drop target\.

**Syntax**

```
void SetOnDropAction(const AZStd::string& actionName)
```

**Tip**  
A more flexible way to be notified when a drop occurs is to use the [UiDropTargetNotificationBus](#lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus)\.

## UiDropTargetNotificationBus<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus"></a>

Services notifications for the `UiDropTargetComponent`\.

### OnDrop<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus-ondrop"></a>

Occurs when a draggable component is dropped on this drop target\. The draggable component is passed in\. Implement the game logic of what should happen on drag and drop here\.

**Syntax**

```
void OnDrop(AZ::EntityId draggable)
```

### OnDropHoverEnd<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus-ondrophoverend"></a>

Occurs when the focus stops being on this drop target during dragging\. The draggable component that is being dragged is passed into this function\.

**Syntax**

```
void OnDropHoverEnd(AZ::EntityId draggable)
```

### OnDropHoverStart<a name="lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus-ondrophoverstart"></a>

Occurs when the focus starts to be on this drop target during dragging\. The draggable component that is being dragged is passed into this function\.

**Syntax**

```
void OnDropHoverStart(AZ::EntityId draggable)
```