# UI World Components<a name="lua-scripting-ces-api-ui-world-components"></a>

Controls the loading and unloading of UI canvases\.

## UiCanvasAssetRefBus<a name="lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus"></a>

Services messages for the `UiCanvasAssetRefComponent`\.

### LoadCanvas<a name="lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-loadcanvas"></a>

Loads the UI canvas using the stored asset reference\. Returns the entity ID of the loaded canvas\.

**Syntax**

```
AZ::EntityId LoadCanvas()
```

### UnloadCanvas<a name="lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-unloadcanvas"></a>

Unloads the UI canvas using the stored asset reference\.

**Syntax**

```
void UnloadCanvas()
```

## UiCanvasAssetRefNotificationBus<a name="lua-scripting-ces-api-ui-world-components-uicanvasassetrefnotificationbus"></a>

Handles events sent by the `UiCanvasAssetRefComponent`\.

### OnCanvasLoadedIntoEntity<a name="lua-scripting-ces-api-ui-world-components-uicanvasassetrefnotificationbus-oncanvasloadedintoentity"></a>

Called when the canvas asset reference loads a UI canvas\.

**Syntax**

```
void OnCanvasLoadedIntoEntity(AZ::EntityId uiCanvasEntity)
```

## UiCanvasProxyRefBus<a name="lua-scripting-ces-api-ui-world-components-uicanvasproxyrefbus"></a>

Services messages for the `UiCanvasProxyRefComponent`\.

### SetCanvasRefEntity<a name="lua-scripting-ces-api-ui-world-components-uicanvasproxyrefbus-setcanvasrefentity"></a>

Sets the entity that manages the UI canvas for this proxy\.

**Syntax**

```
void SetCanvasRefEntity(AZ::EntityId canvasAssetRefEntity)
```

## UiCanvasRefBus<a name="lua-scripting-ces-api-ui-world-components-uicanvasrefbus"></a>

Services messages for the `UiCanvasAssetRefComponent` and `UiCanvasProxyRefComponent`\.

### GetCanvas<a name="lua-scripting-ces-api-ui-world-components-uicanvasrefbus-getcanvas"></a>

Returns the UI canvas associated with this entity

**Syntax**

```
AZ::EntityId GetCanvas()
```

## UiCanvasRefNotificationBus<a name="lua-scripting-ces-api-ui-world-components-uicanvasrefnotificationbus"></a>

Provides notifications of when the UI canvas reference changes\.

### OnCanvasRefChanged<a name="lua-scripting-ces-api-ui-world-components-uicanvasrefnotificationbus-oncanvasrefchanged"></a>

Called when the canvas referenced by a `UiCanvasAssetRefComponent` has changed\. This can happen when [LoadCanvas](#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-loadcanvas), [UnloadCanvas](#lua-scripting-ces-api-ui-world-components-uicanvasassetrefbus-unloadcanvas), or [SetCanvasRefEntity](#lua-scripting-ces-api-ui-world-components-uicanvasproxyrefbus-setcanvasrefentity) is called\.

**Syntax**

```
void OnCanvasRefChanged(AZ::EntityId uiCanvasRefEntity, AZ::EntityId uiCanvasEntity
```