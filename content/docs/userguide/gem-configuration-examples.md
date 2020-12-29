# Gem Configuration Examples<a name="gem-configuration-examples"></a>

The following are example configurations for gems and their `wscript` files\.

**Contents**
+ [Gem with a GameModule](#gem-with-game-module-only)
+ [Gem with a GameModule and Name](#gem-with-game-module-name)
+ [Gem with a StaticLib and Name](#gem-with-static-library)
+ [Gem with an EditorModule and Name](#gem-with-editor-module)
+ [Gem with an EditorModule that Extends a GameModule](#gem-with-editor-module-extends-game-module)
+ [Gem with a StaticLib and Standalone Module](#gem-with-standalone-module-static)
+ [Gem with a Header Only Library with Unit Testing](#gem-with-header-only-library-with-unit-testing)
+ [Gem with a StaticLib Only and Unit Testing](#gem-with-static-library-unit-testing)

## Gem with a GameModule<a name="gem-with-game-module-only"></a>

The following example gem adds one module type as `GameModule`\.

```
{
    "GemFormatVersion": 4,
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "1.0.0",                         // Required
    "Modules": [                                // Optional
        {
            "Type": "GameModule"                // Required
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
 
    bld.DefineGem(
        # The following are the default settings, and do not need to be specified (unless changes are preferred)
        # target    = ['MyGem'],
        # file_list = ['mygem.waf_files'],
        # vs_filter = ['Gems'],
    )
```

## Gem with a GameModule and Name<a name="gem-with-game-module-name"></a>

The following example gem has one module type as `GameModule` and specifies a name for that module\.

```
{
    "GemFormatVersion": 4,                      // Required
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "1.0.0",                         // Required
    "Modules": [                                // Optional
        {
            "Type": "GameModule",               // Required
            "Name": "Components"                // Required
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
 
    bld.DefineGem(
        Components = dict(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.Components'],
            # file_list = ['mygem_components.waf_files'],
            # vs_filter = ['Gems'],
        ),
    )
```

## Gem with a StaticLib and Name<a name="gem-with-static-library"></a>

The following example gem has one module type as `StaticLib` and specifies a name for that module\.

```
{
    "GemFormatVersion": 4,                      // Required
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "1.0.0",                         // Required
    "Modules": [                                // Optional
        {
            "Type": "StaticLib",                // Required
            "Name": "HelperCode"                // Required
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
 
    bld.DefineGem(
        HelperCode = dict(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.HelperCode'],
            # file_list = ['mygem_helpercode.waf_files'],
            # vs_filter = ['Gems'],
        ),
    )
```

## Gem with an EditorModule and Name<a name="gem-with-editor-module"></a>

The following example gem has one module type as `EditorModule` and specifies a name for the module\.

```
{
    "GemFormatVersion": 4,                      // Required
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "1.0.0",                         // Required
    "Modules": [                                // Optional
        {
            "Type": "EditorModule",             // Required
            "Name": "Editor"                    // Required
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
 
    bld.DefineGem(
        Editor = dict(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.Editor'],
            # file_list = ['mygem_editor.waf_files'],
            # vs_filter = ['Gems'],
            # platforms = ['win', 'darwin'],
            # configurations = ['debug', 'debug_test', 'profile', 'profile_test'],
        ),
    )
```

## Gem with an EditorModule that Extends a GameModule<a name="gem-with-editor-module-extends-game-module"></a>

The following example gem has two module types, `GameModule` and `EditorModule`, specifies a name for both, and then extends the `EditorModule`\.

```
{
    "GemFormatVersion": 4,                      // Required  
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "1.0.0",                         // Required
    "Modules": [                                // Optional
        {
            "Type": "GameModule",               // Required
            "Name": "Components"                // Optional
        },
        {
            "Type": "EditorModule",            // Required
            "Name": "Editor",                  // Required
            "Extends": "Components"            // Optional
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
 
    bld.DefineGem(
        Components = dict(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.Components'],
            # file_list = ['mygem_components.waf_files'],
            # vs_filter = ['Gems'],
            defines     = ['MY_GEM'],
            use         = ['AzCore'],
        ),
        Editor = dict(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.Editor'],
            # file_list = ['mygem_components.waf_files', 'mygem_editor.waf_files'],
            # vs_filter = ['Gems'],
            # platforms = ['win', 'darwin'],
            # configurations = ['debug', 'debug_test', 'profile', 'profile_test'],
            # defines   = ['MY_GEM'], # this is inherited from Components
            use         = ['AzToolsFramework'], # This overrides the Components module's 'use', so only 'AzToolsFramework' is 'use'd
        ),
    )
```

## Gem with a StaticLib and Standalone Module<a name="gem-with-standalone-module-static"></a>

The following example gem has a `StaticLib` module, a `Standalone` module, and specifies a name for both\.

```
{
    "GemFormatVersion": 4,
    "Uuid": "089562a2cbbd41749b359f85fa04f1c9",
    "Name": "CrashReporting",
    "DisplayName": "CrashReporting",
    "Version": "0.1.0",
    "Summary": "Enable external crash reporting for a game project",
    "Tags": ["Untagged"],
    "IconPath": "preview.png",
    "Modules": [
        {
            "Type": "StaticLib",
            "Name": "StaticLibrary"
        },
        {
            "Type": "Standalone",
            "Name": "Uploader"
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
 
    bld.DefineGem(
        StaticLibrary = dict(
            platforms   = ['win'],
 
            includes    = ['.', 'Include'],
            file_list   = ['crashreporting_static.waf_files'],
            win_file_list = ['crashreporting_static_win.waf_files'],
            use         = ['CrashHandler']
        )
    )
 
    uploader_file_list =  ['game_crash_uploader.waf_files']
    platform = bld.env['PLATFORM']
 
    if platform == 'project_generator':
        uploader_file_list.append('game_crash_uploader_win.waf_files')
        uploader_file_list.append('game_crash_uploader_unimplemented.waf_files')
    elif platform in ['win_x64_vs2017', 'win_x64_vs2019']:
        uploader_file_list.append('game_crash_uploader_win.waf_files')
    else:
        uploader_file_list.append('game_crash_uploader_unimplemented.waf_files')
 
    bld.CryQtApplication(
 
        # Settings
        target          = 'CrashReporting.Uploader',
        output_file_name = 'GameCrashUploader',
        file_list       = uploader_file_list,
        vs_filter       = 'Gems',
        includes        = ['Include'],
        platforms       = ['win'],
        configurations  = ['all'],
        use             = ['CrashUploaderSupport', 'AzCore'],
        disable_pch     = True,
        win_lib         = [ 'rpcrt4', 'version', 'powrprof', 'winhttp', 'user32', 'advapi32' ]
    )
```

## Gem with a Header Only Library with Unit Testing<a name="gem-with-header-only-library-with-unit-testing"></a>

The following example gem has a `Standalone` module with unit testing\.

```
{
    "GemFormatVersion": 4,                      // Required
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "1.0.0",                         // Required
    "Modules": [                                // Optional
        {
            "Type": "Standalone",               // Required
            "Name": "Lib"                       // Optional
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
    bld.CryEngineModule(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.Lib'],
            # file_list = ['mygem_lib.waf_files'],
            # vs_filter = ['Gems'],
            test_all_file_list = ['mygem_lib_tests.waf_files'],
            platforms   = ['win', 'darwin'],
            configurations = ['debug_test', 'profile_test'],
    )
```

**Note**  
The gem must exist in the `gems.json` for your project but should be removed from the `game.xml` and `editor.xml` files\.  
In Project Configurator, create the gem and make the changes to the `gem.json` and `wscript` files\.
Do one of the following:  
In a command line window, navigate to the `lmbr.exe` file and enter the following command\.  

      ```
      lmbr projects populate-appdescriptors
      ```
In a text editor, delete the entries for the gem from the `game.xml` and `gem.xml` files\.

## Gem with a StaticLib Only and Unit Testing<a name="gem-with-static-library-unit-testing"></a>

The following example gem has a `StaticLib` module, and a `Standalone` module for unit testing\.

```
{
    "GemFormatVersion": 4,                      // Required
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6", // Required
    "Name": "MyGem",                            // Required
    "Version": "0.1.0",
    "Modules": [
        {
            "Name": "StaticLibrary",
            "Type": "StaticLib"
        },
        {
            "Name": "UnitTestModule",
            "Type": "Standalone",
            "Extends": "StaticLibrary"
        }
    ]
}
```

The following is the `wscript` file for the gem\.

```
def build(bld):
    bld.DefineGem(
        StaticLibrary = dict(
            # The following are the default settings, and do not need to be specified (unless changes are preferred)
            # target    = ['MyGem.Lib'],
            # file_list = ['mygem_lib.waf_files'],
            # vs_filter = ['Gems'],
        )
    )
 
 
    bld.CryEngineModule(
        # The following are the default settings, and do not need to be specified (unless changes are preferred)
        # vs_filter = ['Gems'],
        target          = 'TestGem.UnitTestModule',
        output_file_name = 'TestGemUnitTests',
        file_list = ['mygem_tests.waf_files'],
        platforms   = ['win', 'darwin'],
        configurations = ['debug_test', 'profile_test']
    )
```

**Note**  
The gem must exist in the `gems.json` for your project but should be removed from the `game.xml` and `editor.xml` files\.  
In Project Configurator, create the gem and make the changes to the `gem.json` and `wscript` files\.
Do one of the following:  
In a command line window, navigate to the `lmbr.exe` file and enter the following command\.  

      ```
      lmbr projects populate-appdescriptors
      ```
In a text editor, delete the entries for the gem from the `game.xml` and `gem.xml` files\.