---
description: ' Understand font features for &ALYlong;''s localization system. '
title: Font Features
---
# Font Features {#localization-fontfeatures}



## Language\-Specific Font Assets {#localization-fontfeatures-assets}

You can group [Font Family XML](/docs/userguide/ui/fonts/create-font-families.md) definitions by using a `lang` attribute\. This attribute tells the localization system to load font assets only for the currently actively language\. To see an example, open the **[Samples Project](/docs/userguide/samples/projects/samples.md)** and, in the [**UI Editor**](/docs/userguide/ui/editor/using.md), open `dev/Gems/LyShineExamples/Assets/UI/Fonts/LyShineExamples/NotoSans/NotoSans.fontfamily`\.

## Unique Characters {#localization-fontfeatures-unique}

Some languages feature a large variety of unique characters\. Font XML files contain attributes for adjusting font texture resolution and number of slots for storing unique characters\. For more information, see [Configuring Font Quality](/docs/userguide/ui/fonts/rendering.md)\.

For an example of unique character support in action, open the **[Samples Project](/docs/userguide/samples/projects/samples.md)**, then load the **UiFeatures** level\. Press **Ctrl\+G** to play the game\. Choose **Language Support**, then choose either **Unique Characters: 32px** or **Unique Characters: 64px**\.
