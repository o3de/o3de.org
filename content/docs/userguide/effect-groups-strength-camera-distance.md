# Setting Effect Strength Based on Camera Distance<a name="effect-groups-strength-camera-distance"></a>

You can use the **fadeDistance** attribute to set the effect strength based on the distance from the camera\.

Example opening XML tag using the **fadeDistance** attribute:

```
<PostEffectGroup priority="1" fadeDistance="20">
```

**fadeDistance** – Indicates how the effects are actualized based on the distance of the camera from the entity\.
+ When the camera is at the position of the entity, the effects are fully overridden\.
+ When the camera is less than fade distance from the entity, the effects are blended\.
+ When the camera is at least fade distance from the entity, the effects are set to the lower priority values\.

## Script Canvas Editor<a name="effect-groups-strength-camera-distance-with-script-canvas"></a>

You need to use a script to apply this effect group at the specified position for each frame\. For more information, see the **[Apply Effect Group At Position](apply-effect-group-at-position-node.md)** node\.

**Example**  
The following script uses the **Get World Translation** to send the entity's position to the **Apply Effect Group At Position** node; this node then applies the effect group to that specified position\.  

![\[Use the Apply Effect Group At Position node in the Script Canvas editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/example-script-apply-effect-group-at-position.png)

## Lua<a name="effect-groups-strength-camera-distance-with-lua"></a>

To enable an effect group using Lua, set the position at which to apply the effect by using the following function:

```
local pos = TransformBus.Event.GetWorldTranslation(EntityId) PostEffects.ApplyEffectGroupAtPosition("example.xml", pos)
```

**Note**  
This function must be called once per frame while the effect group is enabled\. If this function is called multiple times in a single frame, the effect strength increases each time, as if each call applies the effect from a different entity\.