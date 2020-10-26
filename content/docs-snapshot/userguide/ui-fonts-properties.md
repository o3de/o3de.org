# Configuring Font Properties<a name="ui-fonts-properties"></a>

You can define the appearance of your UI font by configuring various properties that affect the font's appearance and usage\.

You define your font's properties in the `.font` file, which is an XML file\. The following example shows the default UI font XML file, located in `Engine/Fonts/default-ui.font`\.

```
<fontshader>
    <font path="Vera.ttf" fontsize=“32“/>    
    <effect name="default">
        <pass>
        </pass>
    </effect>
    <effect name="drop_shadow">
        <pass>
        </pass>
        <pass>
            <color r="0" g="0" b="0" a="1"/>
            <pos x="1" y="1"/>
        </pass>
</effect>
</fontshader>
```

The default UI font XML uses the Vera font\. It defines a font texture that can hold 128 unique character or glyphs that are 32x32 pixels\. The font includes two representations that are defined with the effect tags `default` and `drop_shadow`\. For the `default` effect, the font is rendered as is\. For the `drop_shadow` effect, the font is first rendered as is\. A second render pass produces the font in black with a 1\-pixel offset from the first pass\. This creates a basic shadowing effect of the characters\.

**Note**  
Fonts can be part of a font family \(with a `.fontfamily` extension\), though you can use a standalone font that isn't in a font family\. For more information on font families, see [Creating Font Families](ui-fonts-create-font-families.md)\.

Use the following tags, attributes, and values to define key features of your font\.


****  

| Tag | Description | Attributes | 
| --- | --- | --- | 
| font | Contains critical attributes that define the path to the asset, size, and other font qualities\. | See [Font Tag Attributes](#tag-font-attributes)\. | 
| effect | Acts as a parent tag to pass children tags\. Groups the pass tags that comprises the effect\. | name – Name of the effect\. | 
| effectfile | Specifies the path to an XML file that contains effect tags\. | path – String that specifies the path to an XML file containing effect tags\. | 
| pass |  A child tag of an `effect` tag\. You can add multiple `pass` tags as the children of a single `effect` tag\. Defines a render pass of the text with various parameters that affect the text's rendering\. The `pass` tags can be layered on top of each other, giving the effect a unique look\.   | Doesn't have attributes\. Parents the following child tags that define text effects\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) | 
| color | A text effect that is a child tag of the pass tag\. Defines the text color\.  |  Uses the following attributes to define the effect's intensity with float point values\. Minimum: `0.0` Maximum: `1.0f` [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) | 
| pos or offset | A text effect that is a child tag of the pass tag\. Sets the position of the text\. |  Uses the following attributes to set text position with integer values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html)  | 
| blend or blending | A text effect that is a child tag of the pass tag\. Defines alpha blending behavior of the text\. | Uses the following attributes to define the text's alpha blending behavior: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) Uses the following values for the `src` and `dst` attributes: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) Uses the following values for the `type` attribute: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html)  | 

## Font Tag Attributes<a name="tag-font-attributes"></a>

`Font` tag attributes define critical attributes for a font, such as the path to the TTF/OTF asset used to display the font, and other attributes affecting font render quality\.

**Note**  
Most of these attributes have a direct impact on font rendering quality\. For more information, see [Configuring Font Rendering Quality](ui-fonts-rendering.md)\.


****  

| Attribute | Example | Description | 
| --- | --- | --- | 
| path |  <pre><font path="Vera.ttf" ... /></pre>  | Type: String Path to TTF or OTF font file asset\.  | 
| fontsize |  <pre>< ... fontsize="32"/></pre>  | Type: Integer Defines in pixels the square size of the slots used to store glyphs \(characters\) in the font texture\. For pixel\-perfect render quality, this size should match the size specified when rendering the font\.   | 
| w |  <pre>< ... w="512" h="256" /></pre>  | Type: Integer Defines in pixels the width of the font texture\. | 
| h |  <pre>< ... w="512" h="256" /></pre>  | Type: Integer Defines in pixels the width of the font texture\. | 
| widthslots |  <pre><font path="Vera.ttf" w="512" h="512" widthslots="8" heightslots="8" /></pre>  | Type: Integer Default: 16 Defines the number of character or glyph slots along the X axis of the font texture\. In the example, the font texture is 512x512\. The width and height slots are set to 8\. This gives a space of 64x64 for each character\. | 
| heightslots |  <pre>< ... widthslots="8" heightslots="8" /></pre>  | Type: Integer Default: 8 Defines the number of character or glyph slots along the y\-axis of the font texture\. | 
| sizeratio |  <pre>< ... sizeratio="0.6" /></pre>  | Type: Float Default: 0\.8 Applies uniform scaling to characters or glyphs when rendered into the font texture\. The default scaling is usually ideal\. You can adjust this value for fonts with unusual proportions, such as very long or wide fonts\. | 
| sizebehavior |  <pre>< ... sizebehavior="rerender" /></pre>  | Type: String Value: rerender Renders text again at its new size\. Improves font appearance quality when the text's rendered size differs from the font texture's glyph slot size\. When text size changes, a simple transformation scale is applied\. Quality degrades noticeably when text becomes larger or smaller\. Rerendered text can improve that quality, depending on the font\. Because rerendering takes time, it's not ideal for some cases, such as for animated text that changes sizes often\. | 
| hintbehavior |  <pre>< ... hintbehavior="nohinting" /></pre>  | Type: String Configures hinting properties for the font\. Possible values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) | 
| hintstyle |  <pre>< ... hintstyle="light" /></pre>  | Type: String Configures hinted text's appearance\. Possible values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) | 
| smooth |  <pre>< ... smooth="blur" smooth_amount="3" /></pre>  | Type: String Configures smoothing applied to the font\. The amount of smoothing applied is defined by the `smooth_amount` attribute\. Possible values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-fonts-properties.html) | 
| smooth\_amount |  <pre>< ... smooth="supersample" smooth_amount="1" /></pre>  | Type: Integer Defines the amount of smoothing applied to the font\. The type of smoothing applied is defined by the `smooth` attribute\. | 