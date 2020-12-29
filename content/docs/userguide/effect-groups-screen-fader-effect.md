# Using the Screen Fader Effect<a name="effect-groups-screen-fader-effect"></a>

You can use the screen fader effect to control all screen fade properties, including duration of the fade effect and the color or texture to use for the fade\.

You can stack multiple screen fader effects; multiple screen faders are rendered concurrently and in order of post effect group priority\. Screen fader effects do not blend the parameters between layers\.

The following example demonstrates how to use the screen fader effect in an `.xml` file:

```
<PostEffectGroup priority="2" hold="1">
    <Effect name="ScreenFader">
        <Param name="Enable" floatValue="1.0"/>
        <Param name="FadeInTime" floatValue="2.5"/>
        <Param name="FadeOutTime" floatValue="1.0"/>
        <Param name="ScreenCoordinates" vec4Value="0.0,0.0,1.0,1.0"/>
        <Param name="FadeColor" vec4Value="0.2,0.7,0.7,0.5"/>
        <Param name="TextureName" stringValue="textures/StyleTown/_dev_Blue_Light.tif"/>
    </Effect>
</PostEffectGroup>
```

## Parameters<a name="effect-groups-screen-fader-effect-parameters"></a>

You can set the following parameters:

**Enable**  
Determines whether or not the ScreenFader is active for the post\-processing effect group\.  
Valid values: `0` = Disable \| `1` = Enable

**FadeInTime**  
Time, in seconds, for the screen fader to fade in, once enabled\.

**FadeOutTime**  
Time, in seconds, for the screen fader to fade out, once disabled\.

**ScreenCoordinates**  
Determines the rectangle where the screen fader is rendered\. Specify the coordinates in the format \(Left, Top, Right, Bottom\)\. For example, a fullscreen quad is specified as `(0.0, 0.0, 1.0, 1.0)` and a quad that fills half of the screen is specified as `(0.0, 0.0, 0.5, 1.0)`\.  
Valid values: `0.0 - 1.0`

**FadeColor**  
Sets the quad color by multiplying the color by the specified texture\. If no texture is specified, the quad will be a solid color\.

**TextureName**  
Path of the texture to use for the screen fader\.