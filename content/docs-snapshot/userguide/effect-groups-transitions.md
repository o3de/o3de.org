# Specifying a Blend Curve for Smooth Effect Transitions<a name="effect-groups-transitions"></a>

You can use `BlendIn` and `BlendOut` tags to specify a blend curve that enables smooth transitions between effects\.

An example XML file with added `BlendIn` and `BlendOut` tags:

```
<PostEffectGroup priority="1" hold="1">
    <Effect name="SunShafts">
        <Param name="RaysAmount" floatValue="0.2"/>
    </Effect>
    <BlendIn curve="smooth">
        <Key time="0" value="0"/>
        <Key time="0.5" value="1"/>
    </BlendIn>
    <BlendOut curve="smooth">
        <Key time="0" value="1"/>
        <Key time="0.5" value="0"/>
    </BlendOut>
</PostEffectGroup>
```

**Priority**  
Indicates how much the effects should override the lower priority values\.

**Hold**  
Determines when the `BlendIn` and `BlendOut` curves play and whether the effect group is enabled or disabled\.  
**Valid values**:   
`0` = Plays the `BlendOut` curve immediately after the `BlendIn` curve finishes playing; when the `BlendOut` curve plays, the effect group is disabled  
 `1` = Plays the `BlendIn` curve; when the BlendIn curve plays, the effect group fully overrides lower priority values until the effect group is explicitly disabled

**Curve**  
Available curve types are smooth, linear, and step\. If a curve attribute value is not specified, the curve type defaults to smooth\. You can include as many keyframes in a curve as desired\.  
Default curve value: smooth  
Valid key time values: smooth, linear, step

**Key time**  
Valid values: `0 – 1` \(seconds\)