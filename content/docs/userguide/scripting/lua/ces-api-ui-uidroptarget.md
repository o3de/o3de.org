---
description: ' Use the UIDropTargetComponent to make UI elements targets for drag
  and drop behavior in Amazon Lumberyard. '
title: UIDropTargetComponent
---
# UIDropTargetComponent {#lua-scripting-ces-api-ui-uidroptarget}

You can use a drop target component to make an element a target for drag\-and\-drop behavior\.

## UiDropTargetBus {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus}

Services messages for the `UiDropTargetComponent`\.

### GetDropState {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-getdropstate}

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

### GetOnDropAction {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-getondropaction}

Returns the action triggered when a draggable component is dropped on this drop target\.

**Syntax**

```
const AZStd::string& GetOnDropAction()
```

### SetDropState {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-setdropstate}

Sets the current drop state of the drop target component\.

**Syntax**

```
Void SetDropState(eUiDropState dragState)
```

For possible values for `eUiDropState`, see [GetDropState](#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-getdropstate)\.

### SetOnDropAction {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetbus-setondropaction}

Sets the action triggered when a draggable component is dropped on this drop target\.

**Syntax**

```
void SetOnDropAction(const AZStd::string& actionName)
```

**Tip**
A more flexible way to be notified when a drop occurs is to use the [UiDropTargetNotificationBus](#lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus)\.

## UiDropTargetNotificationBus {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus}

Services notifications for the `UiDropTargetComponent`\.

### OnDrop {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus-ondrop}

Occurs when a draggable component is dropped on this drop target\. The draggable component is passed in\. Implement the game logic of what should happen on drag and drop here\.

**Syntax**

```
void OnDrop(AZ::EntityId draggable)
```

### OnDropHoverEnd {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus-ondrophoverend}

Occurs when the focus stops being on this drop target during dragging\. The draggable component that is being dragged is passed into this function\.

**Syntax**

```
void OnDropHoverEnd(AZ::EntityId draggable)
```

### OnDropHoverStart {#lua-scripting-ces-api-ui-uidroptarget-uidroptargetnotificationbus-ondrophoverstart}

Occurs when the focus starts to be on this drop target during dragging\. The draggable component that is being dragged is passed into this function\.

**Syntax**

```
void OnDropHoverStart(AZ::EntityId draggable)
```