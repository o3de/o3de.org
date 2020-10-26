# Screen Fader<a name="screen-fader-node"></a>

Controls fading the screen to a color and/or a texture\. You can use this node to script cinematic transitions, such as fading to black or fading to a loading screen texture\. The fade is a screen overlay that is rendered on top of the scene\. The size and position of this overlay can be adjusted to a different size than full screen\. This is useful if you want to draw letter boxes at the top and bottom of the screen\. If you use custom positioning with a texture, you can use this node as a quick way to draw decorative borders around the frame\.

To use the **Screen Fader** node in the Track View, see [Screen Fader Node](cinematics-track-view-nodes-screen-fader.md)\.

**Topics**
+ [Inputs](#screen-fader-input)
+ [Outputs](#screen-fader-output)
+ [ScreenFader EBuses](screen-fader-ebuses.md)

![\[screenfader, screenfadernode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-screen-fader-node.png)

**Example**  
In the following script, the screen first fades in, out, and then fades in again\.  

![\[Use the Screen Fader node to fade the screen in and out to black.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-effect-color-correction-example-script.png)

**Example**  
See the following screen fading in a game\.  

![\[Use the Screen Fader node to fade the screen.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/screen-fader-node-example.gif)

## Inputs<a name="screen-fader-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
|  Fade Out  | Event |  Triggers fading out to a color or texture\.  | 
|  Fade In  |  Event  |  Triggers fading back in from a color or texture\.  | 
|  Fader Id  | Number |  Specifies which fader to use\. This lets you maintain separate settings and/or layer fades on top of each other\.  | 
|  Fade In Time  | Number | Number of seconds when fading in\. | 
|  Fade Out Time  | Number | Number of seconds when fading out\. | 
| Color | Color | The color to fade to and from\. The alpha channel is ignored\.The use of this property depends on the value of Use Current Color, and whether you are fading in or fading out\. | 
|  Use Current Color  | Boolean |  Specify true to continue to use the current color for the fade overlay\. The use of the **Color** property depends on the value of **Use Current Color**, and whether you are fading in or fading out\. **Current Color** is the color that is rendered by the fader, including the alpha channel\. This is generally whatever color is left over from prior fading activity\. The [Color Property Behavior](#color-property-behavior) table in the next section shows the color values that are blended to create the fading transition\.  | 
| Texture Name | String |  \(Optional\) The name of a texture from or to which to fade\. To use only solid colors for fading, leave this value empty\.  For more information, see [Finding the Texture Name](finding-texture-by-names.md)\.  | 
| Update Always | Boolean |  Continues fading even when the game is paused\.  | 
| Screen Coordinates | Vector4 |  Sets the screen coordinates \(left, top, right, and bottom\) where the fade overlay is drawn\. The default is full screen \(`0`, `0`, `1`, `1`\)\.  | 

### Color Property Behavior<a name="color-property-behavior"></a>

The following table shows the actual color values that are blended to cause the fading transition\.
+ **Fading** – Refers to whether a fade\-in or fade\-out effect was triggered\.
+ **Use Current Color** – The node's **Use Current Color** input setting\.
+ **Start Color** – The color used to render the overlay at the beginning of the transition\.
+ **Final Color** – The color used at the end of the transition\.
+ **Color** – The node's **Color** input setting\.
+ **Current Color** – The color that the fader actively renders, including the alpha channel\. This is generally whatever color is left over from prior fading activity\.


| Fading | Use Current Color Input | Start Color | Final Color | 
| --- | --- | --- | --- | 
| In | true |  **Current Color**  | Current Color with Alpha=0 | 
| In | false |  **Color** input with Alpha=1  | Color input with Alpha=0 | 
| Out | true |  **Current Color**  | Current Color with Alpha=1 | 
| Out | false |  **Color** input with Alpha=0  | Color input with Alpha=1 | 

## Outputs<a name="screen-fader-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Fade Out Complete | Event | Sent when fade out is complete\. | 
| Fade In Complete | Event | Sent when fade in is complete\. | 
| Current Color | Color | Outputs the current value for the fade overlay color\. | 

**Note**  
Most **Script Canvas** graphics features are available in Lua\. However, **ScreenFader** is a single node in **Script Canvas**, and an EBus in Lua\. For more information, see the [ScreenFader EBuses](screen-fader-ebuses.md)\.