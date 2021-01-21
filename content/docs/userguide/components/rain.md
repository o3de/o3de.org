---
description: ' Use the &ALYlong; Rain component to add rain effects to your game. '
title: Rain
---
# Rain {#component-rain}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

You can use the **Rain** component to create rain effects, puddles, and ripples on the terrain\. You can add multiple **Rain** components to your entities in a level, but the level uses only one of the **Rain** components\. The last **Rain** component to activate takes priority and Lumberyard renders that component\.

To enable the **Rain** component, you must enable the Rain gem\. For more information, see [Rain Gem](/docs/userguide/gems/builtin/rain.md)\.

![\[Add the Rain component to your entity to enable rain effects in your level.\]](/images/shared/shared-rain-component-animation-example.gif)

**Note**
If your level has a **[Snow](/docs/userguide/components/snow.md)** and **Rain** component, the component that activates last takes priority; you cannot enable both **Snow** and **Rain** components at the same time\.

**Contents**
- [Rain {#component-rain}](#rain)
  - [Turning Rain On or Off {#component-rain-enabling-disabling}](#turning-rain-on-or-off)
  - [Editing Rain Effects {#component-rain-editing}](#editing-rain-effects)
  - [Rain Component Properties {#component-rain-properties}](#rain-component-properties)
  - [EBus Request Bus Interface {#component-rain-ebus-request}](#ebus-request-bus-interface)
    - [Request Bus Example Script {#rain-ebus-example-script}](#request-bus-example-script)

## Turning Rain On or Off {#component-rain-enabling-disabling}

You can toggle rain on or off in Lumberyard Editor by enabling or disabling **AI/Physics**, or by running or stopping the game\.

**To toggle rain effects on or off in Lumberyard Editor**
+ Do one of the following:
  + On the bottom right of the viewport, click **AI/Physics**\.
  + Choose **Game**, **Enable Physics/AI**\.
  + Press **Ctrl\+P**\.
  + Press **Ctrl\+G** to enter gameplay mode\. Press **Esc** to stop the game\.

## Editing Rain Effects {#component-rain-editing}

You can edit rain effects only when the **AI/Physics** toggle is disabled\.

**To edit rain effects**

1. Disable **AI/Physics**\.

1. Make changes to the **Rain** component properties\.

1. Enable **AI/Physics**\. After you reenable **AI/Physics**, your changes appear in the viewport\.

## Rain Component Properties {#component-rain-properties}

![\[Rain component properties to customize the rain effects in your level.\]](/images/userguide/component/rain-component-properties.png)

The **Rain** component has the following properties:


****

| Property | Description |
| --- | --- |
| Enabled |  Specifies whether rain effects are enabled\. Default value: `True`  |
|  **Use VisArea**  |  Specifies whether rain appears when the player is inside of a visible area\.  For more information, see the **[VisArea](/docs/userguide/components/vis-area.md)** component\. Default value: `False`  |
| Disable Occlusion |  Specifies whether objects will ignore rainfall effects\. You can enable the **Rain occluder** parameter in the **Mesh** component for your objects; rain effects do not affect these objects\.  For more information, see [Mesh Component: Advanced Options](/docs/userguide/components/static-mesh#static-mesh-properties-advanced)\. Default value: `False`  |
| Radius |  Radius of the area where puddles are created\. Rain continues to affect the screen even outside the specified radius\. Default value: `10000` Valid values: `0` to `10000`  |
| Amount |  Amount of rain and other effects that the **Rain** component creates\. Default value: `1` Valid values: `0` to `100`  |
| Diffuse Darkening |  Amount of darkening that is applied to surfaces that the rain affects\. Default value: `0.5` Valid values: `0` to `1`  |
|  The **Rain** component has the following raindrop options\.  |  |
| Amount |  Quantity of raindrops\. Default: `0.5` Valid values: `0` to `100`  |
| Speed |  Speed of the falling raindrops\. Default: `1.0` Valid values: `0` to `100`  |
| Lighting |  Brightness of the raindrops\. Default: `1.0` Valid values: `0` to `100`  |
|  The **Rain** component has the following puddle options\.  |    |
| Amount |  Amount of depth and brightness of rain puddles\. Default: `1.5` Valid values: `0` to `10`  |
| Mask Amount |  Strength of the puddle mask\. A value of `1` creates puddles of rain between patches of land\. Default: `1` Valid values: `0` to `1`  |
| Ripple Amount |  Strength and frequency of the ripples in the rain puddles\. Default: `2` Valid values: `0` to `100`  |
| Splashes Amount |  Strength and frequency of the splashes that the raindrops create\. Default: `1.3` Valid values: `0` to `1000`   |

## EBus Request Bus Interface {#component-rain-ebus-request}

Use the following request functions with the EBus interface to communicate with other components of your game\. You can use this EBus to communicate to an entity with a **Rain** component attached\. The EBus is available at game run time and editing and can be accessed from C\+\+, Lua, and the **Script Canvas** editor\.

When set, the individual setters on this bus update the rain simulation immediately\. This can cause performance implications if you want to change multiple parameters\. To avoid this, you can set multiple parameters at once with [GetRainOptions](#get-rain-options) and [SetRainOptions](#set-rain-options)\.

For more information , see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


****

| Request Name | Description | Parameters | Return | Scriptable |
| --- | --- | --- | --- | --- |
| Enable |  Enables rain effects\.  |  None  | None | Yes |
| Disable |  Disables rain effects\.  | None | None | Yes |
| Toggle |  Toggles whether rain effects are enabled\.  | None | None | Yes |
| IsEnabled |  Returns `true` if rain effects are enabled\.  | None |  Type: Boolean  | Yes |
| SetIgnoreVisAreas |  Specifies whether rain effects ignore visible areas\. If `true`, the rain effects are visible, even inside visible areas\. If `false`, rain does not render in a visible area\.  For more information, see the **[VisArea](/docs/userguide/components/vis-area.md)** component\.  |  Type: Boolean  | None | Yes |
| GetIgnoreVisAreas |  Returns `true` if rain effects ignore visible areas\.  | None |  Type: Boolean  | Yes |
| SetDisableOcclusion |  Specifies whether rain effects affect objects that are marked as occluders\. You can enable the **Rain occluder** parameter in the **Mesh** component for your objects; rain effects do not affect these objects\. For more information, see [Mesh Component: Advanced Options](/docs/userguide/components/static-mesh#static-mesh-properties-advanced)\. If `true`, objects marked as rain occluders are affected by rain effects\. If `false`, objects marked as rain occluders ignore rain effects\.  |  Type: Boolean  | None | Yes |
| GetDisableOcclusion |  Returns `true` if rain effects affect objects that are marked as occluders\.  | None |  Type: Boolean  | Yes |
| SetRadius |  Sets the radius of rain effects\. The **Rain** component creates puddles inside only the specified radius\. Raindrops always render in the level\.  |  Type: Float  | None | Yes |
| GetRadius |  Returns the radius of rain effects\.  | None |  Type: Float  | Yes |
| SetAmount |  Sets the overall amount of rain, puddles, and splashes\.  |  Type: Float  | None | Yes |
| GetAmount |  Returns the overall amount of rain, puddles, and splashes\.  | None |  Type: Float  | Yes |
| SetDiffuseDarkening |  Sets the amount of darkening that is applied to surfaces that the rain affects\.  |  Type: Float  | None | Yes |
| GetDiffuseDarkening |  Returns the amount of darkening that is applied to surfaces that the rain affects\.  | None |  Type: Float  | Yes |
| SetRainDropsAmount |  Sets the amount of raindrops that appear\.  |  Type: Float  | None | Yes |
| GetRainDropsAmount |  Returns the quantity of raindrops that appear\.  | None |  Type: Float  | Yes |
| SetRainDropsSpeed |  Sets the speed of raindrops\.  |  Type: Float  | None |  Yes  |
| GetRainDropsSpeed |  Returns the speed of raindrops\.  | None |  Type: Float  | Yes |
| SetRainDropsLighting |  Sets the brightness of the raindrops\.  |  Type: Float  | None | Yes |
| GetRainDropsLighting |  Returns the brightness of the raindrops\.  | None |  Type: Float  | Yes |
| SetPuddlesAmount |  Sets the amount of depth and brightness of the puddles\.  |  Type: Float  | None | Yes |
| GetPuddlesAmount |  Returns the amount of depth and brightness of the puddles\.  | None |  Type: Float  | Yes |
| SetPuddlesMaskAmount |  Sets the strength of the puddle mask applied to the puddles\.  |  Type: Float  | None | Yes |
| GetPuddlesMaskAmount |  Returns the strength of the puddle mask applied the puddles\.  | None |  Type: Float  | Yes |
| SetPuddlesRippleAmount |  Sets the strength and frequency of the ripples in puddles\.  |  Type: Float  | None | Yes |
| GetPuddlesRippleAmount |  Returns the strength and frequency of the ripples in puddles\.  | None |  Type: Float  | Yes |
| SetSplashesAmount |  Sets the strength of the splash effects that the rain creates\.  |  Type: Float  | None | Yes |
| GetSplashesAmount |  Returns the strength of the splash effects that the rain creates\.  | None | SnowOptions | Yes |
| SetRainOptions |  Sets all options for the **Rain** component\.  | RainOptions | None | Yes |
| GetRainOptions |  Returns a data structure that contains all options for the **Rain** component\.  | None | RainOptions | Yes |
| UpdateRain |  Updates Lumberyard to use this **Rain** component as the base for rain effects\. The **Rain** component that is called last takes priority; Lumberyard uses that component\.  | None | None | Yes |

### Request Bus Example Script {#rain-ebus-example-script}

```
function example:OnActivate()
    RainComponentRequestBus.Event.SetAmount(self.entityId, 5.0)
    RainComponentRequestBus.Event.Toggle(self.entityId)
end
```