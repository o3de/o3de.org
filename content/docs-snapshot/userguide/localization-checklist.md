# Localization Checklist<a name="localization-checklist"></a>

To use localization in your game, verify that you have done the following:

1. Created a [tag definition XML](localization-intro.md#localization-configuring-tagxml) and placed it within your game project directory\.

1. Created [localized text XML](localization-intro.md#localization-configuring-localizedxml) assets for at least one language, also located within your game project directory\.

1. Configured the `g_language` and `sys_localization_folder` [console variables](localization-initialization.md#localization-initialization-cvars) appropriately\.
   + `g_language` defaults to English\.
   + `sys_localization_folder` must point to a game project sub\-directory where you store your localized text XML assets in language\-specific sub\-directories\.

1. Initialized the [Localization Manager](localization-initialization.md#localization-initialization-manager) in your game's startup code\.

After completing these steps, you can start localizing text by passing in the localized key string to the localization manager\. Note that some Lumberyard systems, such as the [UI System](localization-ui.md), already [attempt to localize text for you](localization-initialization.md#localization-initialization-text)\.