---
description: ' Use the &ALYlong; Snow component to add snow effects to your game. '
title: Snow
---
# Snow {#component-snow}


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **Snow** component to create snowfall effects and create patches of snow and ice on the terrain\. You can add multiple **Snow** components to your entities in a level, but the level uses only one **Snow** component\. The last **Snow** component to activate takes priority and Lumberyard renders that component\.

To enable the **Snow** component, you must enable the Snow gem\. For more information, see [Snow Gem](/docs/userguide/gems/builtin/snow.md)\.

![\[Add the Snow component to your entity to enable snow effects in your level.\]](/images/userguide/shared-snow-component-animation-example.gif)

**Note**  
If your level has a **Snow** and **[Rain](/docs/userguide/components/rain.md)** component, the component that activates last takes priority; you cannot enable both **Snow** and **Rain** components at the same time\.

**Contents**
+ [Turning Snow On or Off](#component-snow-enabling-disabling)
+ [Editing Snow Effects](#component-snow-editing)
+ [Snow Component Properties](#component-snow-properties)
+ [EBus Request Bus Interface](#component-snow-ebus-request)
  + [Example Snow Component Request Bus](#snow-ebus-example-script)

## Turning Snow On or Off {#component-snow-enabling-disabling}

You can toggle snow on or off in Lumberyard Editor by enabling or disabling **AI/Physics**, or by running or stopping the game\.

**To toggle snow effects on or off in Lumberyard Editor**
+ Do one of the following:
  + On the bottom right of the viewport, click **AI/Physics**\.
  + Choose **Game**, **Enable Physics/AI**\.
  + Press **Ctrl\+P**\.
  + Press **Ctrl\+G** to enter gameplay mode\. Press **Esc** to stop the game\.

## Editing Snow Effects {#component-snow-editing}

You can edit snow effects only when the **AI/Physics** toggle is disabled\.

**To edit snow effects**

1. Disable **AI/Physics**\.

1. Make changes to the **Snow** component properties\.

1. Enable **AI/Physics**\. After you reenable **AI/Physics**, your changes appear in the viewport\.

## Snow Component Properties {#component-snow-properties}

![\[Snow component properties to customize the snow effects in your level.\]](/images/userguide/component/snow-component-properties.png)

The **Snow** component has the following properties:


****  

| Property | Description | 
| --- | --- | 
| Enabled |  Specifies whether snow effects are enabled\. Default value: `True`  | 
| Radius |  Radius of snow on the surface\. Default: `50` Valid values: `0` to `1600`  | 
| Snow Amount |  Amount of snow on the surface\. Default: `10` Valid values: `0` to `100`  | 
| Frost Amount |  Amount of frost on the surface\. Default: `1` Valid values: `0` to `100`  | 
| Surface Freezing |  Intensity of the surface freezing effect\. Default: `1` Valid values: `0` to `100`  | 
| Snowflake Count |  Number of generated snowflakes\. Default: `100` Valid values: `0` to `10000`  | 
| Snowflake Size |  Size of the snowflakes\. Default: `2.5` Valid values: `0` to `100`  | 
| Brightness |  Brightness of the snowflakes\. Default: `3` Valid values: `0` to `100`  | 
| Gravity Scale |  Scale applied to the gravity that affects the snowflakes\. Default: `0.1` Valid values: `0` to `100`  | 
| Wind Scale |  Scale applied to the wind that affects the snowflakes\. Default: `0.1` Valid values: `0` to `100`  | 
| Turbulence |  Turbulence that is applied to the snowflakes\.  Default: `0.1` Valid values: `0` to `100`  | 
| Turbulence Frequency |  Turbulence frequency that is applied to the snowflakes\.  Default: `0.1` Valid values: `0` to `100`  | 

## EBus Request Bus Interface {#component-snow-ebus-request}

Use the following request functions with the EBus interface to communicate with other components of your game\. You can use this EBus to communicate to an entity with a **Snow** component attached\. The EB us is available at game time and editing, and can be accessed from C\+\+, Lua, and the **Script Canvas** editor\.

When set, the individual setters on this bus update the snow simulation immediately; this can cause some performance implications if you want to change multiple parameters\. To avoid this, you can set multiple parameters at once with [GetSnowOptions](#get-snow-options) and [SetSnowOptions](#set-snow-options)\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| Enable |  Enables snow effects\.  | None | None | Yes | 
| Disable |  Disables snow effects\.  | None | None | Yes | 
| Toggle |  Toggles whether snow effects are enabled\.  | None | None | Yes | 
| IsEnabled |  Returns `true` if the snow effects are enabled\.  | None |  Type: Boolean  | Yes | 
| SetRadius |  Sets the radius of the snow surface\.  |  Type: Float  | None |  Yes  | 
| GetRadius |  Returns the radius of the snow surface\.  | None |  Type: Float  | Yes | 
| SetSnowAmount |  Sets the amount of snow on the surface\.  |  Type: Float  | None | Yes | 
| GetSnowAmount |  Returns the amount of snow on the surface\.  | None |  Type: Float  | Yes | 
| SetFrostAmount |  Sets the amount of frost on the surface\.  |  Type: Float  | None | Yes | 
| GetFrostAmount |  Returns the amount of frost on the surface\.  | None |  Type: Float  | Yes | 
| SetSurfaceFreezing |  Sets the intensity of the freezing effect on the surface\.  |  Type: Float  | None | Yes | 
| GetSurfaceFreezing |  Returns the intensity of the freezing effect on the surface\.  | None |  Type: Float  | Yes | 
| SetSnowFlakeCount |  Sets the number of snowflakes that are created\.  |  Type: `AZ::u32`  | None | Yes | 
| GetSnowFlakeCount |  Returns the number of snowflakes that are created\.  | None |  Type: `AZ::u32`  | Yes | 
| SetSnowFlakeSize |  Sets the size of snowflakes that are created\.  |  Type: Float  | None | Yes | 
| GetSnowFlakeSize |  Returns the size of snowflakes that are created\.  | None |  Type: Float  | Yes | 
| SetSnowFlakeBrightness |  Sets the brightness of the snowflakes\.  |  Type: Float  | None | Yes | 
| GetSnowFlakeBrightness |  Returns the brightness of the snowflakes\.  | None |  Type: Float  | Yes | 
| SetSnowFlakeGravityScale |  Sets the scale applied to the gravity that affects the snowflakes\.  |  Type: Float  | None | Yes | 
| GetSnowFlakeGravityScale |  Returns the scale applied to the gravity that affects the snowflakes\.  | None |  Type: Float  | Yes | 
| SetSnowFallWindScale |  Sets the scale applied to the wind that affects the snowflakes\.  |  Type: Float  | None | Yes | 
| GetSnowFallWindScale |  Returns the scale applied to the wind that affects the snowflakes\.  | None |  Type: Float  | Yes | 
| SetSnowFallTurbulence |  Sets the turbulence that is applied to the snowflakes\.  |  Type: Float  | None | Yes | 
| GetSnowFallTurbulence |  Returns the turbulence that is applied to the snowflakes\.  | None |  Type: Float  | Yes | 
| SetSnowFallTurbulenceFreq |  Sets the turbulence frequency that is applied to the snowflakes\.  |  Type: Float  | None | Yes | 
| GetSnowFallTurbulenceFreq |  Returns the turbulence frequency that is applied to the snowflakes\.  | None |  Type: Float  | Yes | 
| SetSnowOptions |  Sets all options for the **Snow** component\.  | SnowOptions | None | Yes | 
| GetSnowOptions |  Returns a data structure that contains all options for the **Snow** component\.  | None | SnowOptions | Yes | 
| UpdateSnow |  Updates Lumberyard to use the **Snow** component as the base for snow effects\. The last **Snow** component that is called last takes priority; Lumberyard uses that component\.  | None | None | Yes | 

### Example Snow Component Request Bus {#snow-ebus-example-script}

```
function example:OnActivate()
    SnowComponentRequestBus.Event.SetFrostAmount(self.entityId, 10)
    SnowComponentRequestBus.Event.Toggle(self.entityId) 
end
```