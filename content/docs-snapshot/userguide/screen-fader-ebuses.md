# ScreenFader EBuses<a name="screen-fader-ebuses"></a>

Provides the Lua scripting equivalent to the **[Screen Fader](screen-fader-node.md)** node in **Script Canvas**\. 

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**Contents**
+ [ScreenFaderRequestBus FadeOut](#screen-fader-request-bus-fade-out)
+ [ScreenFaderRequestBus FadeIn](#screen-fader-request-bus-fade-in)
+ [ScreenFaderRequestBus SetTexture](#screen-fader-request-bus-set-texture)
+ [ScreenFaderRequestBus SetScreenCoordinates](#screen-fader-request-bus-set-screen-coordinates)
+ [ScreenFaderRequestBus GetCurrentColor](#screen-fader-request-bus-get-current-color)
+ [ScreenFaderNotificationBus OnFadeOutComplete](#screen-fader-notification-bus-on-fade-out-complete)
+ [ScreenFaderNotificationBus OnFadeInComplete](#screen-fader-notification-bus-on-fade-in-complete)
+ [ScreenFaderManagementRequestBus GetNumFaderIDs](#screen-fader-management-request-bus-get-num-fader-ids)

## ScreenFaderRequestBus FadeOut<a name="screen-fader-request-bus-fade-out"></a>

Triggers fading out to a solid color\.


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| color | Color |  The color to fade out to\. The use of the **Color** property depends on the value of **Use Current Color**, and whether you are fading in or fading out\.  | 
| duration | Float | Duration of the fade out in seconds\. | 
| useCurrentColor | Boolean | When true, the transition uses the current color for the fade overlay\. When false, the transition begins fully transparent\.**Current Color** is the color that is rendered by the fader, including the alpha channel\. This is generally whatever color is left over from prior fading activity\.The [Color Property Behavior](screen-fader-node.md#color-property-behavior) table shows the color values that are blended to create the fading transition\.  | 
| updateAlways | Boolean |  Continues fading even when the game is paused\.  | 

## ScreenFaderRequestBus FadeIn<a name="screen-fader-request-bus-fade-in"></a>

Triggers fading in to a solid color\.


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| color | Color |  The color to fade through\. Ignored if **Use Current Color** is true\.  | 
| duration | Float | Duration of the fade in seconds\. | 
| useCurrentColor | Boolean |  When true, the transition uses the current color for the fade overlay\. When false, the transition begins from the target color\.  | 
| updateAlways | Boolean | Continues fading even when the game is paused\. | 

## ScreenFaderRequestBus SetTexture<a name="screen-fader-request-bus-set-texture"></a>

Sets a texture for the fade overlay\. 


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| textureName | String |  The name of a texture from or to which to fade\. To clear the texture, specify an empty string\. For more information, see [Finding the Texture Name](finding-texture-by-names.md)\.  | 

## ScreenFaderRequestBus SetScreenCoordinates<a name="screen-fader-request-bus-set-screen-coordinates"></a>

Sets the screen coordinates where the fade overlay is drawn\.


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| screenCoordinates | Vector4 |  Sets the screen coordinates \(left, top, right, and bottom\) where the fade overlay is drawn\.  The default is full screen \(`0`, `0`, `1`, `1`\)\.  | 

## ScreenFaderRequestBus GetCurrentColor<a name="screen-fader-request-bus-get-current-color"></a>

Returns the current color of the fade overlay\.

## ScreenFaderNotificationBus OnFadeOutComplete<a name="screen-fader-notification-bus-on-fade-out-complete"></a>

A callback function that is called when fading out is complete\.

## ScreenFaderNotificationBus OnFadeInComplete<a name="screen-fader-notification-bus-on-fade-in-complete"></a>

A callback function that is called when fading in is complete\.

## ScreenFaderManagementRequestBus GetNumFaderIDs<a name="screen-fader-management-request-bus-get-num-fader-ids"></a>

Returns the number of available fader IDs\. The number returned is not necessarily the number of faders that have been created\.