# Localization Initialization<a name="localization-initialization"></a>

Initializing the localization system requires the following:
+ C\+\+ call to initialize the Localization Manager at game startup
+ Tag Definition XML
+ Localized text XML

## Localization Manager<a name="localization-initialization-manager"></a>

At game startup, you must initialize the **Localization Manager** \(`ILocalizationManager`\) with the tag definition XML\.

For example, the following code snippet is from `dev/SamplesProject/Gem/Code/Source/Core/GameplaySampleGame.cpp` within the Samples Project:

```
void LoadLocalizationData()
    {
        ILocalizationManager* pLocMan = GetISystem()->GetLocalizationManager();
        if (pLocMan)
        {            
            AZStd::string localizationXml("libs/localization/localization.xml");
            if (pLocMan->InitLocalizationData(localizationXml.c_str()))
            {
                const bool initLocSuccess = pLocMan->LoadLocalizationDataByTag("init");
                AZ_Error("Localization", initLocSuccess, "LoadLocalizationData() failed to load localization file=%s", localizationXml.c_str());
            }
        }
    }
```

The code sample above does the following:
+ Initializes the localization manager with the tag definition XML\.
+ Loads all the localized text XML for the current language that is grouped by the `init` tag within the tag definition XML\.

## Console Variables<a name="localization-initialization-cvars"></a>

The following two console variables, or CVars, affect the localization system:

`g_language`  
The name of the current language that the game uses\. Is set to **English** by default\.

`sys_localization_folder`  
The directory used for finding localization assets\. This directory contains either language PAK files or 'loose' localized text XML files\.

For example, in the Samples Project, the game config file, `/dev/SamplesProject/game.cfg`, sets `sys_localization_folder` to `Localization`\. In the game directory structure, this defines the location as `dev/SamplesProject/Localization`\.

## Localizing Text<a name="localization-initialization-text"></a>

After you properly initialize the localization manager, you can localize text to the current language\. To do this, you pass in the localization key that you want to localize\.

For example:

```
string locText;
gEnv->pSystem->GetLocalizationManager()->LocalizeString("@ui_Hello", locText);
```

Assuming the key `@ui_Hello` is localized for the current language, the contents of `locText` will contain the Unicode \(UTF8\) encoding for the localized value contained within the localized text XML\.

### UiTextComponent<a name="localization-initialization-text-uitextcomponent"></a>

Lumberyard's [UI System](ui-editor-intro.md), contained in the LyShine Gem and installed by default, features a [text](ui-editor-components-text.md) component with built\-in support for automatically localizing text for you\. When you enter a valid localized text key \(such as `@ui_Hello` as shown in the [previous example](#localization-initialization-text)\), the engine replaces the contents of the rendered string with the localized text\. That key must be localized for the current language\.

To see the source code for examples of calls to the localization manager, open `ui/Gems/LyShine/Code/Source/UiTextComponent.cpp`\.