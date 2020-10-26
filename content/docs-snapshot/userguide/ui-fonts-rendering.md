# Configuring Font Rendering Quality<a name="ui-fonts-rendering"></a>

Lumberyard's built\-in UI system, `LyShine`, renders text using font textures\. The quality of the on\-screen text is affected by the font texture size, the number of character slots in the font texture, and the size of the text itself when rendered on the screen\.

Use the procedures in this section to configure font size and texture to achieve quality text rendering\.

## Font Texture Width and Height Attributes<a name="ui-fonts-texture-attributes"></a>

Fonts are defined in XML by `*.font` files\. The XML in a `.font` file defines various parameters, such as the path to the source TTF/OTF asset and important rendering properties\. The font file `Engine/Fonts/default-ui.font` included in the Lumberyard project has the following content\.

```
<fontshader>
    <font path="Vera.ttf" w="512" h="256"/>    
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

The font texture resolution is controlled by the following line\.

```
<font path="Vera.ttf" w="512" h="256"/>
```

In this example, the font texture has a resolution of 512x256\. This resolution size \(along with the number of character slots\) is an important value for determining font rendering quality\.

## Character Slots<a name="ui-fonts-character-slots"></a>

In Lumberyard, a font texture is logically divided into equally sized slots\. In each slot, there is a uniform amount of space for each character \(glyph\)\. By default \(without additional configuration\), there are 128 unique characters \(16 rows \* 8 columns\)\.

If you support a language with many unique characters, such as Chinese, Japanese, or Korean, the default number of slots \(128\) might not be adequate for your needs, requiring further configuration\. Otherwise, 128 unique characters might be adequate for most languages\. The following information about character slots describes in further detail the font rendering pipeline in Lumberyard\.

When rendering a string of characters, the number of *unique* characters in a string is different from the number of characters in a string \(its length\)\. The number of character slots in a font texture imposes a limitation only on the number of unique characters that can be rendered in a single frame\.

For example, the following is a font definition which defines a font texture with `1 (1x1)` texture slot\.

```
<font path="Vera.ttf" w="512" h="512" widthslots="1" heightslots="1"/>
```

The default values for `widthslots` and `heightslots` is *16* and *8*, respectively\. However, as shown in the previous example, you can configure the number of character slots \(`1`\)\. This font can render a single unique character to the screen, any number of times, such as the following string\.

AAAA

The number of unique characters in `AAAA` is 1, and the length of the string is 4\. This font texture configuration can render this character an unlimited number of times \(that is, a string of variable length\) as long as the string contains only a single character\. However, this font can't render the following string\.

AABB

Because only one character slot exists in the texture, it can't store both the glyphs for upper\-case ‘A’ and upper\-case ‘B’ and render them both in a frame\. To render this string, you need to increase the number of slots using the `widthslots` and `heightslots` parameters\.

Here is another example\.

```
<font path="NotoSansSC-Regular.otf" w="4096" h="4096" widthslots="128" heightslots="128"/>
```

In this example, the font texture size is `4096x4096`, and there are a total number of `128x128` \(16,384\) character slots\. To determine the available size for each character, divide the texture size \(4096x4096\) by the number of slots \(128x128\) to yield a 32x32 pixel space per character\. This configuration enables you to render over 16,000 unique characters at a 32\-pixel size in a single frame\.

## Font Size<a name="ui-fonts-size"></a>

Because a font texture is divided into a logical grid, a simple calculation determines how much real estate each character in the font can use:
+ Font texture width / `widthslots` = slot width
+ Font texture height / `heightslots` = slot height

Where `widthslots` is the number of character slots across the width \(x\-axis\) of the font texture and `heightslots` is the number of character slots across the height \(y\-axis\) of the font texture\.

In the `default-ui.font` example in the previous section, the font texture size was 512x256\. Assuming the character slots are at their default values \(16x8\):
+ 512 / 16 = 32 \(slot width\)
+ 256 / 8 = 32 \(slot height\)

For a 512x256 sized font texture, you can render pixel\-perfect characters at 32x32 pixels\.

Knowing these calculations helps you determine the right font texture size for the purposes of your game UI\.

**To determine the right font texture size for your game UI**

1. [Create the font `.font` file](ui-fonts-adding-fonts.md#create-font-xml-file) for the font to use\.

1. Choose an arbitrary font texture size to start with, such as 512x256 as used in the previous example\.

1. Use the **UI Editor** to mock up a canvas with elements that have text components that use your font `.font` file\.

1. In the **UI Editor**'s **Properties** pane, under **Text** and then **Font Size**, experiment with the font size to find the ideal size for your use case\.

1. After you have determined the appropriate font size for your purposes, use the following formula to determine the font texture width and height:
   + Texture width = Font size \* `widthslots`
   + Texture height = Font size \* `heightslots`
**Note**  
The default value for `widthslots` and `heightslots` is *16* and *8*, respectively, which gives 128 total character slots\. If you need to render more than 128 unique characters to the screen in a single frame—for example, if your game supports Chinese, Japanese, or Korean text— adjust these values accordingly\.

1. Edit your font `.font` to use the calculated font texture size\.

**Note**  
Font texture sizes don't necessarily need to be a power of 2: 128, 256, 512, 1024, 2048, and so on\. However, the width must be a multiple of `widthslots` \(the default value is 16\), and the height must be a multiple of `heightslots` \(the default value is 8\)\.
You can have multiple font `.font` files that reference the same TTF/OTF file but have different font texture sizes\.  
For example, you might have some caption text that needs to appear only at a small font size, but you have other screens \(perhaps a menu screen\) where you want the same look and feel by using the same font\. However, it needs to be larger and therefore needs a higher resolution font texture\. You can achieve this with separate `.font` files for each use case, with font texture settings adjusted for ideal rendering quality\.