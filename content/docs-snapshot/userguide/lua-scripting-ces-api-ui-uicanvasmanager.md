# UICanvasManager<a name="lua-scripting-ces-api-ui-uicanvasmanager"></a>

Contains functions for loading, unloading, and finding UI canvases\.

## UiCanvasManagerBus<a name="lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus"></a>

Services messages for the `UiCanvasManager` component\.

### FindLoadedCanvasByPathName<a name="lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus-findloadedcanvasbypathname"></a>

Returns the entity ID of the loaded canvas that has the specified canvas pathname\.

**Syntax**

```
AZ::EntityId FindLoadedCanvasByPathName(const AZStd::string& canvasPathname)
```

### LoadCanvas<a name="lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus-loadcanvas"></a>

Loads a canvas and returns the entity ID of the loaded canvas\.

**Syntax**

```
AZ::EntityId LoadCanvas(const AZStd::string& canvasPathname)
```

### UnloadCanvas<a name="lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus-unloadcanvas"></a>

Unloads a UI canvas\.

**Syntax**

```
void UnloadCanvas(AZ::EntityId canvasEntityId)
```