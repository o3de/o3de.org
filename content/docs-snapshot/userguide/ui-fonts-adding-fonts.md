# Adding New Fonts<a name="ui-fonts-adding-fonts"></a>

For each new font to add, you need the following files:
+ A font asset – True Type Font \(`.ttf`\) or Open Type Font \(`.otf`\) file
+ A font `.font` file describing the asset<a name="create-font-xml-file"></a>

**To add a new font to your UI**

1. Save the font asset \(`.ttf` or `.otf` file\) to your game project directory, such as `dev\SamplesProject\Font`\.

1. Copy an existing font `.font` file into your game project `Font` directory\. The following directories \(included in the Lumberyard project\) contain font `.font` files for reference:
   + `dev\Engine\Fonts\`
   + `dev\SamplesProject\Fonts\`

1. Change the `.font` file name \(leave the `.font` extension unchanged\)\. Use any file name that is descriptive and appropriate for your purposes\.

1. Open the `.font` file and edit the following line to point to your font asset file name\.

   ```
   <font path="yourFont.ttf" w="512" h="256"/>
   ```

After the Asset Processor has processed your font assets, you can select your font by [loading the font `.font` file](ui-editor-components-text.md) in the **UI Editor** for any text component\.