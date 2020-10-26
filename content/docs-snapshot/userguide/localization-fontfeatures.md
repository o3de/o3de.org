# Font Features<a name="localization-fontfeatures"></a>

## Language\-Specific Font Assets<a name="localization-fontfeatures-assets"></a>

You can group [Font Family XML](ui-fonts-create-font-families.md) definitions by using a `lang` attribute\. This attribute tells the localization system to load font assets only for the currently actively language\. To see an example, open the **[Samples Project](sample-project-samples.md)** and, in the [**UI Editor**](ui-editor-using.md), open `dev/Gems/LyShineExamples/Assets/UI/Fonts/LyShineExamples/NotoSans/NotoSans.fontfamily`\.

## Unique Characters<a name="localization-fontfeatures-unique"></a>

Some languages feature a large variety of unique characters\. Font XML files contain attributes for adjusting font texture resolution and number of slots for storing unique characters\. For more information, see [Configuring Font Quality](ui-fonts-rendering.md)\.

For an example of unique character support in action, open the **[Samples Project](sample-project-samples.md)**, then load the **UiFeatures** level\. Press **Ctrl\+G** to play the game\. Choose **Language Support**, then choose either **Unique Characters: 32px** or **Unique Characters: 64px**\.