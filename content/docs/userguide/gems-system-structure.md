# Gem Structure<a name="gems-system-structure"></a>

Each gem package can contain the following: 
+ Assets
+ A `gem.json` file
+ An icon file
+ Code

**To locate Lumberyard Gems**
+ Navigate to the `lumberyard_version\dev\Gems` directory\. For more information, see [Gems Available in Lumberyard](gems-system-ref.md)\. 

**Topics**
+ [Gem Assets](#gem-assets-directory)
+ [Gem Icon File](#gem-icon-file)
+ [Gem JSON File](#gem-json-file)
+ [Gem Code](#gem-code-directory)
+ [Gem List File – gems\.json](#gems-system-gem-list-file)
+ [Accessing Gems in Code](#accessing-gems-in-code)
+ [Gem Configuration Examples](gem-configuration-examples.md)

## Gem Assets<a name="gem-assets-directory"></a>

Each gem has an `Assets` directory that contains models, textures, scripts, and animations\. Asset files are accessed the same way as they are in a game project\. Lumberyard uses this root directory to find the asset file path\. For example, when Lumberyard looks for the `textures\rain\rainfall_ddn.tif` file, it looks in the `<GemName>\Assets\textures\rain\rainfall_ddn.tif` directory\.

## Gem Icon File<a name="gem-icon-file"></a>

The gem icon is a `.jpg`, `.png`, or `.gif` file\. The following example is the icon for the [Lightning Arc Gem](gems-system-gem-lightning-arc.md)\.

![\[Icon file for the Lightning Arc gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gem-icon-example.png)

## Gem JSON File<a name="gem-json-file"></a>

**Example**  
This example file contains metadata for the gem and the following properties\.  

```
{
    "GemFormatVersion": 4,                                 // Required
    "Uuid": "e5f049ad7f534847a89c27b7339cf6a6",            // Required
    "Name": "ExampleGem",                                  // Required
    "DisplayName": "Environment Gem",                      // Optional, defaults to the [Name] field
    "Summary": "Gem description.",                         // Optional, defaults to ""
    "Tags": [                                              // Optional, defaults to []
        "Weather",
        "Weather Effects",
        "Sky"
    ],
    "EditorTargets": ["RainEditorPlugin"],                // Optional, defaults to [ ]
    "LumberyardVersion": ["==1.11.0.0"],                  // Optional
    "Version": "1.0.0",                                   // Required
    "IconPath": "path\preview.png",                       // Optional, defaults to ""
    "Modules": [                                          // Optional
        {
            "Type": "ModuleType",                         // Required
            "Name": "ModuleName",                         // Required
            "Extends": "GameModule"                       // Optional
        }                        
            
    ],                                                      
    "Dependencies": [                                     // Optional, defaults to []
        {                                    
            "Uuid": "d378b5a7b47747d0a7aa741945df58f3",   // Required
            "VersionConstraints": ["~>1.0"],              // Required, must not be empty
            "_comment": "other_gem_name"                  // Optional, useful comment
        }
    ]
}
```

**GemFormatVersion**  
Version number that identifies how a gem is built \(folder structure and semantics\) and determines compatibility with specific versions of Lumberyard\. The version number is set automatically when you create a gem in the Project Configurator\.  
+ Lumberyard 1\.11 and later – Gems have a default value of `4` for the `GemFormatVersion` field\.
+ Lumberyard 1\.5 to 1\.10 – Gems have a default value of `3` for the `GemFormatVersion` field\. The gems that are included with Lumberyard are AZ modules\.
+ Lumberyard 1\.4 and earlier – Gems have a default value of `2` for the `GemFormatVersion` field\.

**Uuid**  
Unique ID that identifies the gem\.

**Name**  
Name of the gem\.

**DisplayName**  
Friendly name of the gem that appears in the Project Configurator\.

**Summary**  
Short description of the gem\.

**Tags**  
List of tags that describe the gem\.

**EditorTargets**  
List of additional Waf targets to build\. This is useful for targets defined in the `wscript`such as adding editor plugins that accompany gems\.

**LumberyardVersion**  
Version of Lumberyard to specify\. The value can be one of the following:  
+ An array of strings \(for example, `["~>1.2.345.6789", "~>1.1.1", ">= 1.0"]`\)\.
+ A single string that describes the constraint \(for example, `"==1.2.3"`\)\.

  For more examples of acceptable version specifiers, see the list under [Dependencies](#dependencies)\.

**Version**  
API version of the gem\. The version should follow the [Semantic Versioning](http://semver.org/) specification\.

**IconPath**  
Path from the gem directory to the display icon\. The icon can be a `.jpg`, `.png`, or `.gif` file\. The recommended icon size is 160 x 90 px\.

**Modules**  
Code product that the gem produces\. Each module entry can have the following fields:  
+ **Type** – Type of module that is defined\. See [Module Types](#gem-module-types)\.
+ **Name** – Name of the module\. You use this name when you refer to the module, and in the module's output file name\.
+ **Extends** – Module to use as a base\. The value can be only `"GameModule"` and you can use this field only for the following module types: 
  + `EditorModule`
  + `Builder`

  If the module does not have a name, specify `"GameModule"`\. 

  By default, this module takes the following fields from the extended module's build settings\. If you specify any of the following values, they override the parent module\. 
  + `file_list` 
  + `platforms`
  + `configurations`
  + `defines`
  + `includes`
  + `features`
  + `lib`
  + `libpath`
  + `use`
  + `uselib`

**Dependencies**  <a name="dependencies"></a>
UUIDs and versions of other gems to which the gem depends\. Acceptable version specifiers have an operator and a version number\. Consider these examples:      
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-structure.html)

The following fields apply to `GemFormatVersion` 3 and earlier:

**EditorModule**  
Defines whether the gem produces a module that is loaded by Lumberyard Editor\.

**LinkType**  
Defines how other gems and game projects should link to this gem:  
+ `Static` – Does not produce a `.dll` file and does not link\.
+ `Dynamic` – Produces a `.dll` file and links all dependent projects against the `.dll` file using an import library\.
+ `NoCode` – Does not produce a `.dll` or `.lib` file\. The gem contains assets but not code\. You can add a gem with the `NoCode` value to a game project without rebuilding\.

### Module Types<a name="gem-module-types"></a>

Following are module types and how to define them\. For examples of gems with module types defined, see [Gem Configuration Examples](gem-configuration-examples.md)\.

**GameModule**  
The most basic type of module\. If you used gems before, your gems produce this type of module by default\. These modules are loaded by Lumberyard Setup Assistant and Lumberyard Editor\.  
If a gem has more than one `GameModule` type, you can omit the `Name` field for one `GameModule` type\. This allows a gem's product `.dll` file to keep the same name when you upgrade to `GemFormatVersion` 4\.

**EditorModule**  
Loaded by Lumberyard Editor\. If an `EditorModule` extends a `GameModule`, the `EditorModule` is loaded instead of the `GameModule` in Lumberyard Editor\. This is useful when an `EditorModule` contains the same components as a `GameModule`, along with their editor components\.

**StaticLib**  
Module type that is useful when your gem requires helper code that is linked to all dependents of your gem, or when your gem provides only statically usable code\. All modules in all gems that require this gem have this `StaticLib` linked against it\.

**Builder**  
Used by Asset Processor for building assets\. For more information, see [Creating a Custom Asset Builder](asset-builder-custom.md)\.

## Gem Code<a name="gem-code-directory"></a>

You can find a gem's code in the `<GemName>\Code` directory\. The directory contains the following:

**wscript **  
Waf build script that is generated by the template\. The script contains all build configuration options, including target name, included paths, required libs, defines, and so on\. In most cases, this script does not need to be changed\.  
For more information, see [Wscript and Modules](#wscript-and-modules)\.

**gemname\.waf\_files**  
JSON list of all files that are included in the game project\. The root object contains properties for each uber file, and a special `NoUberFile` object\. Each child object contains a named array of files, where the name is the filter that is used in generated projects\. The gem template provides a default `.waf_files` list\. All new files for your game project should be added to this file\.

**gemname\_tests\.waf\_files**  
JSON list of all test files for a gem, in the same format as `gemname.waf_files`\.

**Include/GemName**  
Directory contains headers that define the gem's public API\.  
Other gems can include this directory\. It should not contain implementations nor anything other than virtual function definitions\. The gem template provides a default `GemNameBus.h` that contains a `GemNameRequestBus` interface, which defines public functionality\.   
For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**Source**  
Directory that contains the following generated files:  
+ `StdAfx.h` – Includes frequently required files\.
+ `StdAfx.cpp` – Includes the `StdAfx.h` file\.
+ `GemNameSystemComponent.h` – Contains the definition of a system component that handles calls to `GemNameRequestBus`\. 
+ `GemNameSystemComponent.cpp` – Contains the implementation of the `GemNameSystemComponent` class\. 
+ `GemNameModule.cpp` – Contains the `AZ::Module` class definition, which is used to register components and do additional component reflection\. 
**Note**  
This class can be made to extend `CryHooksModule` \(in `IGem.h`\) instead to have `gEnv` attached automatically\. 

**Tests **  
Directory that contains unit tests for your gem\. Add all files in this directory to the `gemname_tests.waf_files`\.   
`GemNameTest.cpp` – Contains an example for writing gtests for your gem, which are unit test files for your gem\.

### Wscript and Modules<a name="wscript-and-modules"></a>

The gem's `wscript` must call `bld.DefineGem(...)` in order for the gem to build properly\. The `DefineGem` function expects keyword arguments, mapping from a module's name to a data type dictionary of the build settings for the module\. If the module does not have a name, its build settings may be placed directly in the call to `DefineGem()`\. 

For each module, the following default settings are applied:
+ `target`: `gem_name_module_name`

  If the module does not have a name, the default value is `gem_name`\.
+ `file_list`: `gem_name_module_name.waf_files`

  If the module does not have a name, the default value is `gem_name.waf_files`
+ `test file_list`: `gem_name_module_name_tests.waf_files` 

  If this file exists, it is automatically added to the `file_list` when building tests\.
+ `vs_filter`: `"Gems"`
+ `output_file_name`: `Gem.gem_name.module_name.gem_uuid.gem_version`

  If the module does not have a name, the default value is `Gem.gem_name.gem_uuid.gem_version`\.
+ `platforms`: `all` 

  For `Builder` and `EditorModule` module types, the default value is: `['win', 'darwin']`\. 

  For more information, see [Module Types](#gem-module-types)\.
**Note**  
Overriding this value is not recommended\.
+ `configurations`: `all`

  For `Builder` and `EditorModule` module types, the default value is: `['debug_all', 'profile_all']`\.
**Note**  
Overriding this value is not recommended\.
+ `includes`: `['Include', 'Source']`

  This also contains the include path of all dependencies\.
+ `pch`: 'StdAfx\.cpp'
+ `use`: All modules that require linking from all dependencies\.

For more information about `waf` and `wscript` files, see [Using the Waf Build System](waf-intro.md)\.

## Gem List File – gems\.json<a name="gems-system-gem-list-file"></a>

You can find the `gems.json` list file at the root of each project directory\. For example, for the Samples Project, the `gems.json` file is located in the `lumberyard_version\dev\SamplesProject` directory\. This example file lists all gems used in the game project\. 

**Example**  

```
{
    "GemListFormatVersion": 2,                           // Required
    "Gems": [
        {
            "Path": "Gems/Rain",                         // Required
            "Uuid": "e5f049ad7f534847a89c27b7339cf6a6",  // Required
            "Version": "0.1.0",                          // Required
            "_comment": "Rain"                           // Optional, useful comment
        }
    ]
}
```

## Accessing Gems in Code<a name="accessing-gems-in-code"></a>

You can access gems through code, as in the following example:

```
>#include <GemName/GemNameBus.h>
//...
EBUS_EVENT(GemName::GemNameRequestBus, MyFunction, withArgs);
```