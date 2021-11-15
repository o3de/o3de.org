---
linkTitle: Configuring Font Properties
description: Configure font properties such as asset path and effects for your game UI in Open 3D Engine.
title: Configuring Font Properties
weight: 400
---

You can define the appearance of your UI font by configuring various properties that affect the font's appearance and usage.

You define your font's properties in the `.font` file, which is an XML file. The following example shows the default UI font XML file, located in `Engine/Fonts/default-ui.font`.

```
<fontshader>
    <font path="Vera.ttf" fontsize="32"/>
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

The default UI font XML uses the Vera font. It defines a font texture that can hold 128 unique character or glyphs that are 32x32 pixels. The font includes two representations that are defined with the effect tags `default` and `drop_shadow`. For the `default` effect, the font is rendered as is. For the `drop_shadow` effect, the font is first rendered as is. A second render pass produces the font in black with a 1-pixel offset from the first pass. This creates a basic shadowing effect of the characters.

{{< note >}}
Fonts can be part of a font family \(with a `.fontfamily` extension\), though you can use a standalone font that isn't in a font family. For more information on font families, see [Creating Font Families](/docs/user-guide/interactivity/user-interface/fonts//create-font-families).
{{< /note >}}

Use the following tags, attributes, and values to define key features of your font.

| Tag | Description | Attributes |
| --- | --- | --- |
| **font** | Contains critical attributes that define the path to the asset, size, and other font qualities. | See [Font Tag Attributes](#font-tag-attributes). |
| **effect** | Acts as a parent tag to pass children tags. Groups the pass tags that comprises the effect. | **name** -- Name of the effect. |
| **effectfile** | Specifies the path to an XML file that contains effect tags. | **path** -- String that specifies the path to an XML file containing effect tags. |
| **pass** |  A child tag of an **effect** tag. You can add multiple **pass** tags as the children of a single **effect** tag. Defines a render pass of the text with various parameters that affect the text's rendering. The **pass** tags can be layered on top of each other, giving the effect a unique look.   | Doesn't have attributes. Parents the following child tags that define text effects: <li>**color**</li><li> **pos** or **offset**</li><li> **blend** or **blending**</li> |
| **color** | A text effect that is a child tag of the pass tag. Defines the text color.  |  Uses the following attributes to define the effect's intensity with float point values: <li>Minimum: `0.0`</li><li> Maximum: `1.0f`</li><li> **r** -- Red </li><li> **g** -- Green</li><li> **b** -- Blue</li><li> **a** -- Alpha (`0` is transparent. `1.0f` is opaque)</li>|
| **pos** or **offset** | A text effect that is a child tag of the pass tag. Sets the position of the text. |  Uses the following attributes to set text position with integer values: <li> **x** -- Offsets text along X axis relative to the position of the text</li><li> **y** -- Offsets text along Y axis relative to the position of the text</li> |
| **blend** or **blending** | A text effect that is a child tag of the pass tag. Defines alpha blending behavior of the text. | Uses the following attributes to define the text's alpha blending behavior: <li>**src** -- Source color value for the text's alpha blending</li><li> **dst** -- Destination color value for the text's alpha blending</li><li> **type** -- Alpha blending behavior with preconfigured settings determined by value</li> Uses the following values for the **src** and **dst** attributes: <li>`zero`</li><li> `one`</li><li> `srcalpha` or `src_alpha`</li><li> `invsrcalpha` or `inv_src_alpha`</li><li> `dstalpha` or `dst_alpha`</li><li> `invdstalpha` or `inv_dst_alpha`</li><li> `dstcolor` or `dst_color`</li><li> `srccolor` or `src_color`</li><li> `invdstcolor` or `inv_dst_color`</li><li> `invsrccolor` or `inv_src_color`</li> Uses the following values for the **type** attribute: <li>`modulate-src_alpha` and `inv_src_alpha` (one minus source alpha) blending</li><li>`additive-src_alpha` and `one` (for destination) blending</li>  |

## Font Tag Attributes 
**Font** tag attributes define critical attributes for a font, such as the path to the TTF/OTF asset used to display the font, and other attributes affecting font render quality.

{{< note >}}
Most of these attributes have a direct impact on font rendering quality. For more information, see [Configuring Font Rendering Quality](/docs/user-guide/interactivity/user-interface/fonts/rendering).
{{< /note >}}

| Attribute | Example | Description |
| --- | --- | --- |
| **path** |  <pre><font path="Vera.ttf" ... /></pre>  | <li>Type: `String`</li><li>Path to TTF or OTF font file asset.</li>  |
| **fontsize** |  <pre>< ... fontsize="32"/></pre>  | <li>Type: `Integer`</li><li>Defines in pixels the square size of the slots used to store glyphs (characters) in the font texture. For pixel-perfect render quality, this size should match the size specified when rendering the font.</li>   |
| **w** |  <pre>< ... w="512" h="256" /></pre>  | <li>Type: `Integer`</li><li>Defines in pixels the width of the font texture.</li> |
| **h** |  <pre>< ... w="512" h="256" /></pre>  | <li>Type: `Integer`</li><li>Defines in pixels the width of the font texture.</li> |
| **widthslots** |  <pre> ... widthslots="8" heightslots="8" /></pre>  | <li>Type: `Integer`</li><li>Default: `16`</li><li>Defines the number of character or glyph slots along the X axis of the font texture.</li><li>In the example, the font texture is `512x512`. The **widthslots** and **heightslots** are set to `8`. This gives a space of `64x64` for each character.</li> |
| **heightslots** |  <pre>< ... widthslots="8" heightslots="8" /></pre>  | <li>Type: `Integer`</li><li>Default: `8`</li><li>Defines the number of character or glyph slots along the y-axis of the font texture.</li> |
| **sizeratio** |  <pre>< ... sizeratio="0.6" /></pre>  | <li>Type: `Float`</li><li>Default: `0.8`</li><li>Applies uniform scaling to characters or glyphs when rendered into the font texture.</li><li>The default scaling is usually ideal. You can adjust this value for fonts with unusual proportions, such as very long or wide fonts.</li> |
| **sizebehavior** |  <pre>< ... sizebehavior="rerender" /></pre>  | <li>Type: `String`</li><li>Value: `rerender`</li><li>Renders text again at its new size. Improves font appearance quality when the text's rendered size differs from the font texture's glyph slot size.</li><li>When text size changes, a simple transformation scale is applied. Quality degrades noticeably when text becomes larger or smaller.</li><li>Rerendered text can improve that quality, depending on the font. Because rerendering takes time, it's not ideal for some cases, such as for animated text that changes sizes often.</li> |
| **hintbehavior** |  <pre>< ... hintbehavior="nohinting" /></pre>  | <li>Type: `String`</li><li>Configures hinting properties for the font. Possible values:</li><li> `default` -- Hinting behavior as provided by the font. You can also omit the **hintbehavior** tag to use the default hinting.</li><li>`nohinting` -- Disable hinting.</li><li>`autohint` -- Hinting behavior procedurally derived from the font.</li> |
| **hintstyle** |  <pre>< ... hintstyle="light" /></pre>  | <li>Type: `String`</li><li>Configures hinted text's appearance. Possible values:</li><li>`normal` -- Appearance as provided by the font. You can also omit the **hintsytle** tag to use the default hinting.</li><li>`light` -- Fuzzier appearance that might more accurately represent the shape of glyphs in the font.</li> |
| **smooth** |  <pre>< ... smooth="blur" smooth_amount="3" /></pre>  | <li>Type: `String`</li><li>Configures smoothing applied to the font. The amount of smoothing applied is defined by the **smooth_amount** attribute. Possible values:</li><li>`blur` -- Applies a simple burring effect to characters or glyphs stored in the font texture. Use **smooth_amount** to set the number of iterations to use for blurring.</li><li>`supersample` -- Super samples characters or glyphs in the font texture by **smooth_amount**: `1` for 2x, and `2` for 4x.</li><li>`none` -- Default. No smoothing applied.</li> |
| **smooth\_amount** |  <pre>< ... smooth="supersample" smooth_amount="1" /></pre>  | <li>Type: `Integer`</li><li>Defines the amount of smoothing applied to the font. The type of smoothing applied is defined by the **smooth** attribute.</li> |
