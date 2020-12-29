# Infinite Ocean Component Request Bus Interface<a name="infinite-ocean-component-request-bus-interface"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

## Lua Scripting<a name="infinite-ocean-component-request-bus-interface-lua-scripting"></a>

In general, the Lua scripting API for the **Infinite Ocean** component maps directly to the component properties with the **Get\*** and **Set\*** functions\. However, there are some exceptions where there is only a **Get** function, and you can't directly set a value, such as the ocean height\.

**Note**  
You can specify float numbers for most functions, but some require an enumeration and/or a boolean value\.

**Example**  

```
function example:OnActivate()
    OceanEnvironmentRequestBus.Broadcast.SetFogDensity(2)
    OceanEnvironmentRequestBus.Broadcast.GetFogDensity()
end
```

## OceanLevel<a name="infinite-ocean-component-ebus-ocean-level"></a>

Returns the height of the ocean in the world z\-axis\.

**Note**  
There is no function to set the ocean level, since this parameter is attached to the **Transform** component\.

**Parameters**  
None

**Return**  
Type: Float

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.GetOceanLevel()
```

## WaterTessellationAmount<a name="infinite-ocean-component-ebus-water-tessellation-amount"></a>

Sets the amount of geometry tessellation for rendering the ocean surface\. 

**Parameters**  
Type: Int

**Return**  
Type: Int

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetWaterTessellationAmount(int)
OceanEnvironmentRequestBus.Broadcast.GetWaterTessellationAmount()
```

## AnimationWindDirection and AnimationWindSpeed<a name="infinite-ocean-component-ebus-animation-wind-direction-speed"></a>

Sets the direction and speed of the ocean wind\.

**Parameters**  
Type: Float

**Return**  
Type: Float

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetAnimationWindDirection(float)
OceanEnvironmentRequestBus.Broadcast.GetAnimationWindDirection()
OceanEnvironmentRequestBus.Broadcast.SetAnimationWindSpeed(float)
OceanEnvironmentRequestBus.Broadcast.GetAnimationWindSpeed()
```

## AnimationWavesSpeed, AnimationWavesSize, and AnimationWavesAmount<a name="infinite-ocean-component-ebus-animation-waves-speed-size-amount"></a>

Specifies the animation parameters of the ocean waves, such as speed, size, and amount\.

**Parameters**  
Type: Float

**Return**  
Type: Float

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetAnimationWavesSpeed(float)
OceanEnvironmentRequestBus.Broadcast.GetAnimationWavesSpeed()
OceanEnvironmentRequestBus.Broadcast.SetAnimationWavesSize(float)
OceanEnvironmentRequestBus.Broadcast.GetAnimationWavesSize()
OceanEnvironmentRequestBus.Broadcast.SetAnimationWavesAmount(float)
OceanEnvironmentRequestBus.Broadcast.GetAnimationWavesAmount()
```

## ReflectResolutionScale<a name="infinite-ocean-component-ebus-reflect-resolution-scale"></a>

Specifies the scale of the screen resolution to use for rendering ocean reflections\.

**Parameters**  
Type: Float

**Return**  
Type: Float

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetReflectResolutionScale(float)
OceanEnvironmentRequestBus.Broadcast.GetReflectResolutionScale()
```

## ReflectionAnisotropic<a name="infinite-ocean-component-ebus-reflection-anisotropic"></a>

Enables the anisotropic filter for rendered ocean reflections\.

**Parameters**  
Type: Boolean

**Return**  
Type: Boolean

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetReflectionAnisotropic(boolean)
OceanEnvironmentRequestBus.Broadcast.GetReflectionAnisotropic()
```

## ReflectRenderFlag<a name="infinite-ocean-component-ebus-reflect-render-flag"></a>

For each reflection flag, you can specify how the ocean renders reflections\. 

You can specify the following flags:
+ `ReflectionFlags.TerrainDetailMaterials`
+ `ReflectionFlags.StaticObjects`
+ `ReflectionFlags.Particles`
+ `ReflectionFlags.Entities`

**Parameters**  
Type: Enum flag and boolean

**Return**  
Type: Boolean

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetReflectRenderFlag(ReflectionFlags.TerrainDetailMaterials, boolean)
OceanEnvironmentRequestBus.Broadcast.GetReflectRenderFlag(ReflectionFlags.TerrainDetailMaterials))
```

## UseOceanBottom<a name="infinite-ocean-component-ebus-use-ocean-bottom"></a>

Toggles the infinite plane below the ocean\. 

**Parameters**  
Type: Boolean

**Return**  
Type: Boolean

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetUseOceanBottom(boolean)
OceanEnvironmentRequestBus.Broadcast.GetUseOceanBottom()
```

## GodRaysEnabled<a name="infinite-ocean-component-ebus-god-rays-enabled"></a>

Enablesgod rays \(sun beams\) under the ocean\.

**Parameters**  
Type: Boolean

**Return**  
Type: Boolean

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetGodRaysEnabled(boolean)
OceanEnvironmentRequestBus.Broadcast.GetGodRaysEnabled()
```

## UnderwaterDistortion<a name="infinite-ocean-component-ebus-underwater-distortion"></a>

Specifies the amount of the scene that is distorted when it renders while the camera is underwater\.

**Parameters**  
Type: Float

**Return**  
Type: Float

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetUnderwaterDistortion(float)
OceanEnvironmentRequestBus.Broadcast.GetUnderwaterDistortion()
```

## FogColor, FogColorMultiplier, and NearFogColor<a name="infinite-ocean-component-ebus-fog-color-multiplier-near"></a>

Specifies the color for the underwater fog of the ocean\.

You can specify a color value, such as `Color(1.0,2.0,3.0,1.0)`, and then pass it as an argument like the following: `SetFogColor(Color(1.0,2.0,3.0,1.0))`

The `FogColorPremultiplied` function is applied to the ocean's fog color\. You can use the `GetFogColorPremultiplied` function to return the result of **Fog Color** \* **Fog Color Multiplier**\.

**Note**  
Currently, you cannot directly specify values for the `FogColorPremultiplied` function\.

For `SetFogColorMultiplier` and `GetFogColorMultiplier` functions:

**Parameters**  
Type: Float

**Return**  
Type: Float

**Scriptable**  
Yes

For `SetFogColor`, `GetFogColor`, `SetNearFogColor`, and `GetNearFogColor` functions:

**Parameters**  
Type: Color

**Return**  
Type: Color

**Scriptable**  
Yes

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetFogColor(Color)
OceanEnvironmentRequestBus.Broadcast.GetFogColor()
OceanEnvironmentRequestBus.Broadcast.SetFogColorMultiplier(float)
OceanEnvironmentRequestBus.Broadcast.GetFogColorMultiplier()
OceanEnvironmentRequestBus.Broadcast.SetNearFogColor(Color)
OceanEnvironmentRequestBus.Broadcast.GetNearFogColor()
OceanEnvironmentRequestBus.Broadcast.GetFogColorPremultiplied()
```

## CausticsEnabled<a name="infinite-ocean-component-ebus-caustics-enabled"></a>

Applies the caustics effect of the ocean on geometry below the ocean surface\.

**Parameters**  
Type: Boolean

**Return**  
Type: Boolean

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetCausticsEnabled(boolean)
OceanEnvironmentRequestBus.Broadcast.GetCausticsEnabled()
```

## CausticsDepth, CausticsIntensity, CausticsTiling, CausticsDistanceAttenuation<a name="infinite-ocean-component-ebus-caustics-depth-intensity-tiling-distance-attenuation"></a>

Specifies the caustics parameters for the **Infinite Ocean** component\.

**Parameters**  
Type: Float

**Return**  
Type: Float

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetCausticsDepth(float)
OceanEnvironmentRequestBus.Broadcast.GetCausticsDepth()
OceanEnvironmentRequestBus.Broadcast.SetCausticsIntensity(float)
OceanEnvironmentRequestBus.Broadcast.GetCausticsIntensity()
OceanEnvironmentRequestBus.Broadcast.SetCausticsTiling(float)
OceanEnvironmentRequestBus.Broadcast.GetCausticsTiling()
OceanEnvironmentRequestBus.Broadcast.SetCausticsDistanceAttenuation(float)
OceanEnvironmentRequestBus.Broadcast.GetCausticsDistanceAttenuation()
```

## OceanMaterialName<a name="infinite-ocean-component-ebus-material-name"></a>

Renders the ocean with the assigned material\.

You can find the default material in the `lumberyard_version/dev/Engine/EngineAssets/Materials/Water/ocean_default.mtl` directory\.

**Parameters**  
The path to the ocean material file\.  
Type: String

**Return**  
Type: String

**Scriptable**  
Yes  

**Example**  

```
OceanEnvironmentRequestBus.Broadcast.SetOceanMaterialName(string)
OceanEnvironmentRequestBus.Broadcast.GetOceanMaterialName()
```