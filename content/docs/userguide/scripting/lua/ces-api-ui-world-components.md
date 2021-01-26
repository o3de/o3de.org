---
description: ' Use UI world components to control the loading and unloading of canvases
  in Amazon Lumberyard. '
title: UI World Components
---
# UI World Components {#lua-scripting-ces-api-ui-world-components}

Controls the loading and unloading of UI canvases\.

## UiCanvasAssetRefBus {#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus}

Services messages for the `UiCanvasAssetRefComponent`\.

### LoadCanvas {#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-loadcanvas}

Loads the UI canvas using the stored asset reference\. Returns the entity ID of the loaded canvas\.

**Syntax**

```
AZ::EntityId LoadCanvas()
```

### UnloadCanvas {#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-unloadcanvas}

Unloads the UI canvas using the stored asset reference\.

**Syntax**

```
void UnloadCanvas()
```

## UiCanvasAssetRefNotificationBus {#lua-scripting-ces-api-ui-world-components-uicanvasassetrefnotificationbus}

Handles events sent by the `UiCanvasAssetRefComponent`\.

### OnCanvasLoadedIntoEntity {#lua-scripting-ces-api-ui-world-components-uicanvasassetrefnotificationbus-oncanvasloadedintoentity}

Called when the canvas asset reference loads a UI canvas\.

**Syntax**

```
void OnCanvasLoadedIntoEntity(AZ::EntityId uiCanvasEntity)
```

## UiCanvasProxyRefBus {#lua-scripting-ces-api-ui-world-components-uicanvasproxyrefbus}

Services messages for the `UiCanvasProxyRefComponent`\.

### SetCanvasRefEntity {#lua-scripting-ces-api-ui-world-components-uicanvasproxyrefbus-setcanvasrefentity}

Sets the entity that manages the UI canvas for this proxy\.

**Syntax**

```
void SetCanvasRefEntity(AZ::EntityId canvasAssetRefEntity)
```

## UiCanvasRefBus {#lua-scripting-ces-api-ui-world-components-uicanvasrefbus}

Services messages for the `UiCanvasAssetRefComponent` and `UiCanvasProxyRefComponent`\.

### GetCanvas {#lua-scripting-ces-api-ui-world-components-uicanvasrefbus-getcanvas}

Returns the UI canvas associated with this entity

**Syntax**

```
AZ::EntityId GetCanvas()
```

## UiCanvasRefNotificationBus {#lua-scripting-ces-api-ui-world-components-uicanvasrefnotificationbus}

Provides notifications of when the UI canvas reference changes\.

### OnCanvasRefChanged {#lua-scripting-ces-api-ui-world-components-uicanvasrefnotificationbus-oncanvasrefchanged}

Called when the canvas referenced by a `UiCanvasAssetRefComponent` has changed\. This can happen when [LoadCanvas](#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-loadcanvas), [UnloadCanvas](#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-unloadcanvas), or [SetCanvasRefEntity](#lua-scripting-ces-api-ui-world-components-uicanvasproxyrefbus-setcanvasrefentity) is called\.

**Syntax**

```
void OnCanvasRefChanged(AZ::EntityId uiCanvasRefEntity, AZ::EntityId uiCanvasEntity
```