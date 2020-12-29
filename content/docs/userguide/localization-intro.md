# Localizing Game Projects<a name="localization-intro"></a>

You can create multiple\-language, region\-specific versions of your game using Lumberyard's localization system\. 

The localization system supports Unicode keyboard input support and language\-specific loading of font assets\.

With this system, you can do the following:
+ Easily modify localization assets and definitions\. These are stored in XML files\.
+ Load and unload localized text assets as you need them\. Localized text assets are grouped with tags that you choose\.
+ Reference localized text using the UI system's text component\.
+ Use the UI Editor to rapidly preview your UI in multiple languages\.
+ Customize the font texture configuration\. This makes it possible for the engine to render a large number of unique characters or glyphs\.

## Configuring and Loading Localization Data<a name="localization-configuring"></a>

Lumberyard has two main types of localization XML assets:
+ [Tag definition XML](#localization-configuring-tagxml)
+ [Localized text XML](#localization-configuring-localizedxml)

After you prepare your assets and place them in the preferred location, see the [Localization System](localization-initialization.md) documentation to ensure that your game is ready to use your assets\.

English is the default language for a game project\. To change languages, see [Console Variables](localization-initialization.md#localization-initialization-cvars)\.

### Tag Definition XML<a name="localization-configuring-tagxml"></a>

The **Tag Definition XML** file groups localized text XML files by tag name\. It must be [loaded in C\+\+ at runtime](localization-initialization.md#localization-initialization-manager), typically at startup\.

The following is an example of how the tag definition XML file appears:

```
<localization> 
	<init> 
		<entry>text_ui_menus.xml</entry>
	</init> 
    <singleplayer> 
        <entry>text_ui_sp_dialog.xml</entry>
	</singleplayer> 
	<multiplayer> 
        <entry>text_ui_mp_dialog.xml</entry>
	</multiplayer>
</localization>
```

This file should reside within your game project directory\. For example, in the Samples Project, this file is located at `dev/SamplesProject/libs/Localization/localization.xml`\. However, its specific location is inconsequential as long as the localization manager can load it at runtime\. For more information, see [Localization Initialization](localization-initialization.md)\.

### Localized text XML<a name="localization-configuring-localizedxml"></a>

**Localized text XML** files contain the text resources for a specific language\. This way, your game project can reference the localization keys\. This causes the localization system to return the corresponding value for the currently configured language\. For more information, see [Localizing Text](localization-initialization.md#localization-initialization-text)\.

You can edit these files manually, in Microsoft Excel, or in most industry\-standard CAT tools\.

For an example of an English localized text XML, open `dev/SamplesProject/Localization/English_xml/text_ui_menus.xml`\.

For an example of the same localized text XML in Korean, open `dev/SamplesProject/Localization/Korean_xml/text_ui_menus.xml`\.