---
description: ' Use the GeomCache or geometry cache component to render mesh data and
  play vertex-based animation in &ALYlong;. '
title: Geom Cache
---
# Geom Cache {#component-geom-cache}


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

The **Geometry Cache** component renders mesh data and can play vertex\-based animations from [Alembic](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/char-export-maya-lumberyard-tools-alembic-cache.html) files\. With this, you can simulate highly complex geometry effects that might otherwise be unachievable\.

![\[Example of a Geom Cache component.\]](/images/shared/shared-geom-cache-example-animation.gif)

## Geom Cache Parameters {#component-geom-cache-params}

Use the following parameters to customize your geometry cache\.




**Geom Cache Parameters**  

| Parameter | Description | 
| --- | --- | 
| Cast Shadows | When selected, the geometry cache casts shadows\. | 
| Visible | When selected, the geometry cache is visible\. | 
| Use Vis Areas | When selected, the geometry cache can be obscured by vis areas and portals\. | 
| Play on Start | When selected, the geometry cache animation plays in the editor and plays when the component initializes\. | 
| Loop | When selected, the geometry cache animation loops indefinitely\. | 
| View Distance Multiplier | This value is multiplied by the Max View Distance parameter to get the true maximum viewing distance\. | 
| LOD Distance Ratio | This affects how LODs are chosen\. A lower value means that less detailed LODs are used at shorter view distances\. | 
| Start Time | The time in seconds into the animation that the component start playing at\. For example, use 0\.0 to start at the beginning\. Use 1\.0 to start 1 second into the animation\. | 
| Min Spec | The minimum engine spec that this Geometry Cache renders at\. To render at all specs, select Low\. | 
| Max View Distance | The maximum distance from which this geometry cache can be seen\. This value is multiplied by the View Distance Multiplier to get the true maximum view distance\. | 
| Geometry Cache Asset | The geometry cache asset to render\. | 
| Stand\-in | The entity to render \(instead of the geometry cache\) when the current camera is farther away than the Stand\-in Distance\. The given entity must have a mesh component attached\. | 
| Last Frame Stand\-in | The entity to render \(instead of the geometry cache\) when the animation is on the last frame\. The given entity must have a mesh component attached\. | 
| First Frame Stand\-in | The entity to render \(instead of the geometry cache\) when the animation is on the first frame\. The given entity must have a mesh component attached\. | 
| Stand\-in Distance | Defines how far away the current camera must be from the geometry cache's center before the Stand\-in takes its place\. | 
| Stream In Distance | Defines how close the camera has to be for the geometry cache to start streaming in animation data to prepare for animation\. | 
| Material Override | An override material to use instead of the one given by the geometry cache asset\. | 

## GeometryCacheComponentRequests Interface {#component-geom-cache-requestbus}

This EBus is used to communicate to an entity with a **Geometry Cache** component\. This is available at runtime and at edit time and can be accessed from C\+\+, Lua and ScriptCanvas\. Some functionality may be restricted to C\+\+ exclusively\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


**GeometryCacheComponentRequests**  

| Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| Play | Begins playing the geometry cache's animation\. If the animation is already playing, this does nothing\. From here the animation can be paused with Pause or stopped with Stop\. | None | None | Yes | 
| Pause | Pauses the geometry cache's animation\. From here the animation can be resumed by calling Play\. | None | None | Yes | 
| Stop | Stops the geometry cache's animation\. The animation is brought back to the First Frame where the First Frame Stand\-in can be used\. From here the animation can be restarted with Play\. | None | None | Yes | 
| GetTimeRemaining | Returns how much time remains in the animation\. If the animation is paused or stopped this returns \-1\.0\. | None | float | Yes | 
| GetCurrentStandinType |  Returns which `Stand-in` is currently visible\. Note that in Lua and Script Canvas this is returned as a number, rather than as an Enum as in C\+\+\. 0: No Stand\-in 1: `First Frame` stand\-in 2: `Last Frame` stand\-in 3: `Distance-based` stand\-in  | None | Stand\-in type | Yes | 
| SetGeomCacheAsset | Sets the given geometry cache asset\. You can also use this to dynamically change which geometry cache is rendered on the fly\. | AZ::Data::AssetId | None | No | 
| GetGeomCacheAsset | Gets the geometry cache asset currently in use\. If no geometry cache is in use it returns an invalid asset\. | None | `AZ::Data::Asset<AZ::Data::AssetData>` | No | 
| SetVisible |  Sets whether or not the geometry cache is to be processed for rendering\. If visibility is turned off, all stand\-ins for this geometry cache are also turned off\.  | bool | None | Yes | 
| GetVisible | Gets whether or not the geometry cache is to be processed for rendering\. If visibility is turned off, all stand\-ins for this geometry cache are also turned off\. Note that if this returns true, that doesn't mean that the geometry cache is currently in view, just that it will be processed by the rendering engine\. The geometry cache can still be out of view and not be currently on screen\. | None | bool | Yes | 
| SetLoop | Sets whether or not the geometry cache animation loops\. The Last Frame Stand\-in will never be visible as long as this remains true\. | bool | None | Yes | 
| GetLoop | Gets whether or not the geometry cache animation is set to loop\. | None | bool | Yes | 
| SetStartTime |  Sets the time point \(in seconds\) that the geometry cache animation should start at\. Changing the start time of the animation restarts the animation\.  | float | None | Yes | 
| GetStartTime | Gets the current start time point \(in seconds\) for the geometry cache animation\. | None | float | Yes | 
| SetStreamInDistance | Sets the distance threshold that controls geometry cache streaming\. When the distance between the center of the geometry cache and the current camera is greater than this value, the geometry cache's animation begins to stream into memory\. | float | None | Yes | 
| GetStreamInDistance | Gets the distance threshold that controls when the geometry cache streams to memory\. | None | float | Yes | 
| SetFirstFrameStandIn |  Sets the entity to be used for the `First Frame Stand-in`\. It's assumed that the entity id points to an entity that has a mesh component attached\. The stand\-in is controlled by the visibility parameter of the mesh component\. In the editor interface, setting a first frame stand\-in automatically parents the new stand\-in and un\-parents the old stand\-in; this behavior does not exist on these bus calls\. Invalid entity ids are ignored\. This stand\-in is used until the geometry cache animation starts playing\.  | AZ::EntityId | None | Yes | 
| GetFirstFrameStandIn | Gets the entity that is used as the First Frame Stand\-in\. | None | AZ::EntityId | Yes | 
| SetLastFrameStandIn |  Sets the entity to be used for the `Last Frame Stand-in`\. It's assumed that the entity id points to an entity that has a mesh component attached\. The stand\-in is controlled by the visibility parameter of the mesh component\. In the editor interface, setting a last frame stand\-in automatically parents the new stand\-in and un\-parents the old stand\-in; this behavior does not exist on these bus calls\. Invalid entity ids are ignored\. This entity is never used as long as the `Loop` parameter remains true\. This stand\-in is not used until the geometry cache animation ends\.  | AZ::EntityId | None | Yes | 
| GetLastFrameStandIn | Gets the entity that is used as the Last Frame Stand\-in\. | None | AZ::EntityId | Yes | 
| SetStandIn |  Sets the entity to be used for the distance\-based stand\-in\. It's assumed that the entity id points to an entity that has a mesh component attached\. The stand\-in is controlled by the visibility parameter of the mesh component\. In the editor interface, setting a stand\-in automatically parents the new stand\-in and un\-parents the old stand\-in; this behavior does not exist on these bus calls\. Invalid entity ids are ignored\. This Stand\-in is used as long as the distance between the geometry cache's center and the current camera's position is larger than the `Stand-in Distance` parameter\.  | AZ::EntityId | None | Yes | 
| GetStandIn | Gets the entity that is used as the distance\-based Stand\-in\. | None | AZ::EntityId | Yes | 
| SetStandInDistance | Sets the distance threshold that controls the visibility of the stand\-in\. | float | None | Yes | 
| GetStandInDistance | Gets the distance threshold that controls the visibility of the stand\-in\. | None | float | Yes | 

## GeometryCacheComponentNotifications Interface {#component-geom-cache-notificationbus}

This EBus is used to react to events that take place in the **Geometry Cache** component\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


**GeometryCacheComponentNotifications**  

| Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| OnPlaybackStart | Event that triggers when geometry cache playback starts\. | None | None | Yes | 
| OnPlaybackPause | Event that triggers when geometry cache playback pauses\. | None | None | Yes | 
| OnPlaybackStop | Event that triggers when geometry cache playback stops\. | None | None | Yes | 
| OnStandinChanged |  Event that triggers when the geometry cache changes which stand\-in is in use\. This **does** trigger if a stand\-in is turned off and the Geometry Cache becomes active instead\. The parameter includes which StandinType the Geometry Cache has changed to\.  | StandinType | None | Yes | 

The following is a notification bus sample script\.

```
function example:OnActivate()
    self.geometryCacheNotificationHandler = GeomCacheComponentNotificationBus.Connect(self, self.entityId);
end
 
function example:OnPlaybackStart()
    Debug.Log("Playback Started");
end
 
function example:OnDeactivate()
    self.geometryCacheNotificationHandler:Disconnect();
end
```

The following is a more complete example script of how to use the geometry cache from Lua\. See the inline comments for descriptions of what the script is performing at that point\.

```
--Load helpers for handling input events from Lua.
local inputMultiHandler = require('Scripts.Utils.Components.InputUtils')
 
local geomcachetest =
{
    Properties =
    {
        --Specify an existing entity to swap with an existing stand-in
        replacementStandin = {default = EntityId()}
    },
}
 
function geomcachetest:OnActivate()
    --Subscribe to geometry cache notifications on this entity
    self.geometryCacheNotificationHandler = GeomCacheComponentNotificationBus.Connect(self, self.entityId);
 
    --Subscribe to some input events
    --Here it is assumed that 4 events are hooked up to input
    self.inputHandlers = inputMultiHandler.ConnectMultiHandlers{
        [InputEventNotificationId("PlayAnimation")] = {
            OnPressed = function(floatValue) self:PlayAnimation(floatValue) end,
        },
        [InputEventNotificationId("PauseAnimation")] = {
            OnPressed = function(floatValue) self:PauseAnimation(floatValue) end,
        },
        [InputEventNotificationId("StopAnimation")] = {
            OnPressed = function(floatValue) self:StopAnimation(floatValue) end,
        },
        [InputEventNotificationId("ChangeStandin")] = {
            OnPressed = function(floatValue) self:ChangeStandin(floatValue) end,
        },
    }
 
    --An identifier for the stand-in that is currently in use
    --0 indicates no stand-in. See :OnStandinChanged
    self.currentStandin = 0;
end
 
function geomcachetest:OnDeactivate()
    self.geometryCacheNotificationHandler:Disconnect();
end
 
--These events trigger when input is selected
--The first three are simple playback controls. Last one swaps out the stand-in mesh
function geomcachetest:PlayAnimation(value)
     GeometryCacheComponentRequestBus.Event.Play(self.entityId);
end
function geomcachetest:PauseAnimation(value)
     GeometryCacheComponentRequestBus.Event.Pause(self.entityId);
end
function geomcachetest:StopAnimation(value)
     GeometryCacheComponentRequestBus.Event.Stop(self.entityId);
end
 
function geomcachetest:ChangeStandin(value)
     GeometryCacheComponentRequestBus.Event.SetStandIn(self.entityId, self.Properties.replacementStandin);
end
 
--These are the geometry cache notifications
--Emits a simple debug log when events happen
 
function geomcachetest:OnPlaybackStart()
    Debug.Log("GeometryCache: Playback Started");
end
 
function geomcachetest:OnPlaybackPause()
    Debug.Log("GeometryCache: Playback Paused");
end
 
function geomcachetest:OnPlaybackStop()
    Debug.Log("GeometryCache: Playback Stopped");
end
 
function geomcachetest:OnStandinChanged(standinType)
    Debug.Log(string.format("GeometryCache: Changed standin from %d to %d", self.currentStandin, standinType));
    self.currentStandin = standinType;
end
 
return geomcachetest
```