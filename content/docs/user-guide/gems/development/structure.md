---
description: Learn how Open 3D Engine gems are structured and the files that you can modify to customize gems for your game. 
title: Gem structure
weight: 50
---

{{< preview-migrated >}}

Each gem package can contain the following:

+ Assets
+ A `gem.json` file
+ An icon file
+ Code

Gems that ship with O3DE are located in the `Gems` directory. For more information, see [Gems Available in O3DE](/docs/userguide/gems/ref.md).

### Topics

+ [Gem Assets](#gem-assets-directory)
+ [Gem Icon File](#gem-icon-file)
+ [Gem JSON File](#gem-json-file)
+ [Gem Code](#gem-code-directory)
+ [Gem List File - gems.json](#gems-system-gem-list-file)
+ [Accessing Gems in Code](#accessing-gems-in-code)
+ [Gem Configuration Examples](/docs/userguide/gem-configuration-examples.md)

## Gem Assets {#gem-assets-directory}

Each gem has an `Assets` directory that contains models, textures, scripts, and animations. Asset files are accessed the same way as they are in a game project. O3DE uses this root directory to find the asset file path. For example, when O3DE looks for the `textures\rain\rainfall_ddn.tif` file, it looks in the `<GemName>\Assets\textures\rain\rainfall_ddn.tif` directory.

## Gem Icon File {#gem-icon-file}

The gem icon is a `.jpg`, `.png`, or `.gif` file. The following example is the icon for the [Lightning Arc Gem](/docs/userguide/gems/builtin/lightning-arc.md).

![\[Icon file for the Lightning Arc gem.\]](/images/userguide/gem-icon-example.png)

## Example Gem JSON File {#gem-json-file}

This example file contains metadata for the gem and the following properties.

```json
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
    "O3DEVersion": ["==1.11.0.0"],                  // Optional
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
The version number that identifies how a gem is built (folder structure and semantics) and determines compatibility with specific versions of O3DE. The version number is set automatically when you create a gem in the Project Configurator. Gems have a default value of `4` for the `GemFormatVersion` field.

**Uuid**
The unique ID that identifies the gem.

**Name**
The name of the gem.

**DisplayName**
The user-facing name appears in the Project Configurator for the gem.

**Summary**
A short description of the gem. 

**Tags**
A list of tags that describe the gem.

**O3DEVersion**
The version of O3DE to specify. The value can be one of the following:

+ An array of strings (for example, `["~>1.2.345.6789", "~>1.1.1", ">= 1.0"]`).
+ A single string that describes the constraint (for example, `"==1.2.3"`).

For more examples of acceptable version specifiers, see the list under [Dependencies](#dependencies).

**Version**
The API version of the gem. The version should follow the [Semantic Versioning](http://semver.org/) specification.

**IconPath**
The path from the gem directory to the display icon. The icon can be a `.jpg`, `.png`, or `.gif` file. The recommended icon size is 160 x 90 px.

**Modules**
The code product that the gem produces. Each module entry can have the following fields:

+ **Type** - The type of module that is defined. See [Module Types](#gem-module-types).
+ **Name** - The name of the module. You use this name when you refer to the module, and in the module's output file name.
+ **Extends** - The module to use as a base. The value can be only `"GameModule"` and you can use this field only for the following module types:
  + `EditorModule`
  + `Builder`

  If the module does not have a name, specify `"GameModule"`.

**Dependencies**   {#dependencies}
The UUIDs and versions of other gems that this gem depends on. Acceptable version specifiers have an operator and a version number.

### Module Types {#gem-module-types}

Following are module types and how to define them. For examples of gems with module types defined, see [Gem Configuration Examples](/docs/userguide/gem-configuration-examples.md).

**GameModule**
The most basic type of module. If you used gems before, your gems produce this type of module by default. These modules are loaded by O3DE Setup Assistant and O3DE Editor.
If a gem has more than one `GameModule` type, you can omit the `Name` field for one `GameModule` type. This allows a gem's product `.dll` file to keep the same name when you upgrade to `GemFormatVersion` 4.

**EditorModule**
Loaded by O3DE Editor. If an `EditorModule` extends a `GameModule`, the `EditorModule` is loaded instead of the `GameModule` in O3DE Editor. This is useful when an `EditorModule` contains the same components as a `GameModule`, along with their editor components.

**StaticLib**
Module type that is useful when your gem requires helper code that is linked to all dependents of your gem, or when your gem provides only statically usable code. All modules in all gems that require this gem have this `StaticLib` linked against it.

**Builder**
Used by Asset Processor for building assets. For more information, see [Creating a Custom Asset Builder](/docs/userguide/asset-builder-custom.md).

## Gem Code {#gem-code-directory}

You can find a gem's code in the `<GemName>\Code` directory. The directory contains the following:

**Include/GemName**
Directory contains headers that define the gem's public API.
Other gems can include this directory. It should not contain implementations nor anything other than virtual function definitions. The gem template provides a default `GemNameBus.h` that contains a `GemNameRequestBus` interface, which defines public functionality.
For more information, see [Working with the Event Bus (EBus) system](/docs/userguide/programming/ebus/intro.md).

**Source**
Directory that contains the following generated files:

+ `StdAfx.h` - Includes frequently required files.
+ `StdAfx.cpp` - Includes the `StdAfx.h` file.
+ `GemNameSystemComponent.h` - Contains the definition of a system component that handles calls to `GemNameRequestBus`.
+ `GemNameSystemComponent.cpp` - Contains the implementation of the `GemNameSystemComponent` class.
+ `GemNameModule.cpp` - Contains the `AZ::Module` class definition, which is used to register components and do additional component reflection.

{{< note >}}
This class can be made to extend `CryHooksModule` (in `IGem.h`) instead to have `gEnv` attached automatically.
{{< /note >}}

## Gem List File - gems.json {#gems-system-gem-list-file}

You can find the `gems.json` list file at the root of each project directory.

### Sample

```json
{
    "GemListFormatVersion": 4,                           // Required
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

## Accessing Gems in Code {#accessing-gems-in-code}

You can access gems through code, as in the following example:

```cpp
>#include <GemName/GemNameBus.h>
//...
EBUS_EVENT(GemName::GemNameRequestBus, MyFunction, withArgs);
```
