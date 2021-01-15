---
description: ' Use the UICanvasManager component to load, unload, and find UI canvases
  in &ALYlong;. '
title: UICanvasManager
---
# UICanvasManager {#lua-scripting-ces-api-ui-uicanvasmanager}

Contains functions for loading, unloading, and finding UI canvases\.

## UiCanvasManagerBus {#lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus}

Services messages for the `UiCanvasManager` component\.

### FindLoadedCanvasByPathName {#lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus-findloadedcanvasbypathname}

Returns the entity ID of the loaded canvas that has the specified canvas pathname\.

**Syntax**

```
AZ::EntityId FindLoadedCanvasByPathName(const AZStd::string& canvasPathname)
```

### LoadCanvas {#lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus-loadcanvas}

Loads a canvas and returns the entity ID of the loaded canvas\.

**Syntax**

```
AZ::EntityId LoadCanvas(const AZStd::string& canvasPathname)
```

### UnloadCanvas {#lua-scripting-ces-api-ui-uicanvasmanager-uicanvasmanagerbus-unloadcanvas}

Unloads a UI canvas\.

**Syntax**

```
void UnloadCanvas(AZ::EntityId canvasEntityId)
```