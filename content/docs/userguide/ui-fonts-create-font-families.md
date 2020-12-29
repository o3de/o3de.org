# Creating Font Families<a name="ui-fonts-create-font-families"></a>

You can combine multiple font assets into a single font family group\.

The following is an example of a `.fontfamily` file\.

```
<fontfamily name="MyFontFamily">
    <font>
        <file path="myfontfamily-regular.xml" />
        <file path="myfontfamily-bold.xml" tags="b" />
        <file path="myfontfamily-italic.xml" tags="i" />
        <file path="myfontfamily-bolditalic.xml" tags="b,i" />
    </font>
</fontfamily>
```

The UI system uses the font family definitions to determine which font asset to apply when styling text\. You can combine the following types of assets:
+ **Unstyled** – Font representing text with no styling applied\. In the preceding example, this is `myfontfamily-regular.xml`\.
+ **Bold** – Font representing text with bold styling\.
+ **Italic** – Font representing text with italic styling\.
+ **Bold\-Italic** – Font representing text with both bold and italic styling\.

## Font Family File XML<a name="ui-fonts-fontfamily-xml"></a>

To create a new font family file, you can create a new, empty plain text file and enter the contents, or you can modify an existing font family file\.

**To add a new font family file to your UI**

1. To create a new font family file, do one of the following:
   + Open Notepad \(or similar program\) and save an empty text file with a `.fontfamily` file extension\.
   + Copy an existing `.fontfamily` file into your game project's `Fonts` directory\. 

1. Name your `.fontfamily` file appropriately \(leave the `.fontfamily` extension\)\.

1. Open your `.fontfamily` file and edit the contents to configure the font family\.

   For example:

   ```
   <fontfamily name="MyFontFamily">
       <font>
           <file path="myfontfamily-regular.xml" />
           <file path="myfontfamily-bold.xml" tags="b" />
           <file path="myfontfamily-italic.xml" tags="i" />
           <file path="myfontfamily-bolditalic.xml" tags="b,i" />
       </font>
   </fontfamily>
   ```

After the Asset Processor has processed your font assets, you can select your font family by selecting the `*.fontfamily` file in the **UI Editor** as the font for any text component\. To apply custom styling to text using the font family, see [Text Styling Markup](ui-editor-components-text.md#ui-editor-component-text-styling-markup)\.

The `.fontfamily` file uses XML\. The UI system supports the following tags and attributes for the `.fontfamily` file:

Tag: `fontfamily`  
**Attribute**: `name`  
The unique name of the font family\. Each font family name in a project must be unique, and only one `fontfamily` tag may be specified per `.fontfamily` file\. You can, however, reuse the same font XML files \(defined by the file tag\) in multiple font families\.

Tag: `font`  
Container tag for the `file` tag\.  
**Attribute**: `lang`  
The language that the font files should be associated with\. The font files are loaded only if the listed language is being used\. This enables a single font family to use different fonts and styling depending on the language being used\.

Tag: `file`  
**Attribute**: `path`  
The path to the font XML, a TTF or OTF file\. The path is relative to the font family file\. The same font asset can be referenced multiple times for a given font family and across multiple font families\.  
**Attribute**: `tags`  
This tag is optional\. If omitted, this font file is used when no styling is applied\.  
Values:  
+ **b** – indicates <b> bold tag
+ **i** – indicates <i> italic tag
+ **b,i** – indicates when both <b> bold and <i> italic tags are applied