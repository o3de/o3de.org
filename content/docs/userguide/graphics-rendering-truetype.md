# TrueType Fonts<a name="graphics-rendering-truetype"></a>

CryFont is used to generate font textures that are required to render text on the screen\. The various features of font rendering can be seen by using the `r_DebugFontRendering` console variable\. For more information, see [Configuring Console Variables](console-intro.md#configuring-console-variables-cvars)\.

The output is not only to test the functionality but also to document how the features can be used\.

## Supported Features<a name="graphics-rendering-truetype-supported-features"></a>

CryFont supports the following features:
+  Font shaders – Used to configure the appearance of fonts\. Multiple passes with configurable offset and color are supported to enable generation of shadows or outlines\. A sample font shader is shown in the following XML example\. 

  ```
  <fontshader>
    <font path="VeraMono.ttf" w="288" h="416"/>
    <effect name="default">
      <pass>
        <color r="0" g="0" b="0" a="1"/>
        <pos x="1" y="1"/>
      </pass>
    </effect>
    <effect name="console">
      <pass>
        <color r="0" g="0" b="0" a="0.5"/>
        <pos x="2" y="2"/>
      </pass>
    </effect>
  </fontshader>
  ```

  The attributes *w* and *h* of the XML font element specify the width and height of the font texture\. The order of the passes in XML defines the order in which the passes are rendered\. A `<pass>` element without child elements means that the pass is rendered with the default settings\. The `<pos>` tag is used to offset the font, while the `<color>` tag is used to set font color and define the transparency \(with the alpha channel *a*\)\.
+ Unicode – The default font used does not support all Unicode characters \(to save memory\), but other fonts can be used\.
+ TrueType fonts as source – Cached in a small texture\. Common characters are pre\-cached, but runtime updates are possible and supported\.
+ Colored text rendering
+ Adjustable transparency
+ Color variations within a string – Use a value of **$0\.\.9** to set one of the 10 available colors\. Use **$$** to print the $ symbol, and **$o** to switch off the feature\.
+ Returns and tabs within a string
+ Text alignment 
+ Computation of a string's width and height – Used internally to handle center and right alignment\.
+ Font size variations – Bilinear filtering allows some blurring, but no mipmaps are used so this feature has limitations in minification\. 
+ Proportional and monospace fonts
+ Pixel\-perfect rendering with exact texel\-to\-pixel mapping for best quality\.

## Useful Console Commands<a name="graphics-rendering-truetype-cli"></a>

The following console commands provide information about font rendering\. For more information, see [Configuring Console Variables](console-intro.md#configuring-console-variables-cvars)\.

**r\_DebugFontRendering**  
Provides information on various font rendering features, useful for verifying function and documenting usage\.   
+ 0=off
+ 1=display

**r\_DumpFontNames**  
Logs a list of fonts currently loaded\.

**r\_DumpFontTexture**  
Dumps the texture of a specified font to a bitmap file\. You can use `r_DumpFontTexture` to get the loaded font names\.