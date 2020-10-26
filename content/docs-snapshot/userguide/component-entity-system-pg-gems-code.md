# Adding C\+\+ Code to a Lumberyard Game with Gems<a name="component-entity-system-pg-gems-code"></a>

To add C\+\+ code or assets to your Lumberyard game, use a [gem](gems-system-gems.md)\. This document shows you how to create a gem and the various techniques that you can use to add code to it\.

## Creating and Configuring Gems<a name="component-entity-system-pg-gems-code-create-configure"></a>

Creating a gem is straightforward\. To create or enable a gem for your game project, follow the steps in the [Add modular features and assets with Gems](gems-system-gems.md)\. The gem that you create or enable is located in the `\dev\Gems\<gem name>` directory\. The gem's directory structure is similar to the following example\. Your gem might not have all the directories listed\.

```
\3rdParty
\Assets
\Code
    \Include
    \Source
    \Tests
\External
```
+ `3rdParty` – Contains third\-party definition files that are specific to the gem\.
+ `Assets` – Contains assets to include in the game project that are specific to the gem\.
+ `Code\Include` – An additional header include path to add to a game project that uses the gem\.
+ `Code\Source` – Contains the source code for the gem\.
+ `Code\Tests` – Contains unit testing source code for projects that are built in a test configuration\.
+ `External` – Contains external libraries on which the gem depends that are specific to the gem\.

### Code Directory Contents<a name="component-entity-system-pg-gems-code-create-configure-code-directory-contents"></a>

The `\dev\Gems\<gem name>\Code` subdirectory has the following items that Lumberyard creates by default:


****  

| **Item** | **Location** | 
| --- | --- | 
| An empty [EBus](ebus-intro.md) include file that is named after the gem\. | \\Include\\<gem name>\\<gem name>Bus\.h | 
| The AZ module for the gem | \\Source\\<gem name>Module\.cpp | 
| The default systems component files |  `\Source\<gem name>SystemComponent.h` `\Source\<gem name>SystemComponent.cpp`  | 
| Standard precompiled header files |  `\Source\StdAfx.h` `\Source\StdAfx.cpp`  | 
| Skeleton unit test source file | \\Tests\\<gem name>Test\.cpp | 

Lumberyard also creates certain [Waf](waf-intro.md)–related files in the `\dev\Gems\<gem name>\Code` subdirectory\. These files specify the source code content and how the gem is defined and built\.


****  

| **Item** | **Location** | 
| --- | --- | 
| Manifest file for the Waf build of the gem | <gem name>\.waf\_files | 
| Manifest file that lists additional files to for test configuration builds \(for example, Tests/<gem name>Test\.cpp\) | <gem name>\_tests\.waf\_files | 
| Waf build script file that defines the gem | wscript | 

The manifest file that manages the source code uses the Lumberyard Waf `waf_files` schema to define the source files, their Microsoft Visual Studio filter, and [uber](waf-uber-files.md) file grouping\. The default `<gem name>.waf_files` that the Project Configurator generates looks like the following:

```
{
    "none": {
        "Source": [
            "Source/StdAfx.cpp",
            "Source/StdAfx.h"
        ]
    },
    "auto": {
        "Include": [
            "Include/<gem name>/<gem name>Bus.h"
        ],
        "Source": [
            "Source/<gem name>Module.cpp",
            "Source/<gem name>SystemComponent.cpp",
            "Source/<gem name>SystemComponent.h"
        ]
    }
}
```

The `.waf_files` file contains the following three levels of indentation:
+ The first level contains the uber file mapping for uber file–enabled builds\.
  + `none` specifies files to be excluded from the uber file\. Precompiled headers must be listed here\.
  + `auto` specifies files that are automatically combined into modules that are optimized for compile time by Waf\.
  + You can also specify a fixed uber file name \(for example, `my_gem_uber_0.cpp`\) at this level to specially group a set of files\. All of the files in the grouping are combined into `my_gem_uber_0.cpp`\. This technique is useful to restrict which files are combined, like operating system\-specific code\.
+ The second level represents the Visual Studio filters that determine how the files are organized in the Visual Studio solution that Waf generates\.
  + A special value called `Root` represents the root node of the project explorer in Microsoft Visual Studio \(that is, the file is not placed in any subdirectory\)\.
+ The third level contains paths to the source files relative to the location of the `waf_files` file itself\.

## Updating Gem Code<a name="component-entity-system-pg-gems-code-updating"></a>

To update code in your gem, add a third\-party library, new source code files, system components, or dependencies on other gems or Lumberyard modules\.

### Adding an External Third\-Party Library to a Gem<a name="component-entity-system-pg-gems-code-updating-adding-third-party-library"></a>

A gem can use any Lumberyard third\-party library, including its own private third\-party library\. To register a private third\-party library for a gem, create a third\-party configuration file in the `\3rdParty` directory of the gem\. For more information, see [Adding Third\-Party Libraries](waf-adding-third-party-libraries.md)\.

When you set the configuration file to an external third\-party library, the library can be added as a gem dependency through the Waf dependency mechanism\. For information about third\-party library configuration files, see [Creating Third\-Party Library Configuration Files for Waf](waf-third-party-library-configurations.md)\.

Waf uses two conventions to add dependencies to third\-party libraries: `uselib` and `use`\. The convention `uselib` is a wscript keyword that configures a module to link to a library's include path, library path, and library\. If a gem uses `uselib` to consume its gem\-specific library, then that library is available to the gem only for compiling and linking\.

The convention `use` is similar to the `uselib` keyword, except that the library's dependencies are recursively propagated to the module that adds the dependency\. If a gem uses `use` to consume its gem\-specific library, then the library can be used recursively\. This means that if the gem is enabled, the gem–specific third\-party library is also available to the game project or dependent gems\.

### Adding New Source C\+\+ Files to Gems<a name="component-entity-system-pg-gems-code-updating-adding-code"></a>

To add source code \(for example, C\+\+ or Qt\) to a gem, use the Lumberyard [Using the Waf Build System](waf-intro.md)\. Place internal source files \(that is, files not meant to be exposed outside of the gem\) under the `\Code\Source` directory\. Place header files that can be included in projects or other gems in the `\Code\Include\<gem name>\` directory\. Place additional unit tests in the `\Code\Tests` directory\.

**To add code files to a gem**

1. Add the files to the target location\. For consistency, we recommend that you place the source files somewhere in the `\Code` directory\.

1. Add the source files to the Waf manifest `waf_files` file\. Following the format described earlier, add the source file paths to either the `<gem name>.waf_files` file and/or the `<gem name>_test.waf_files` file\.

1. From a command prompt window, run `lmbr_waf configure` to configure Waf and regenerate the Microsoft Visual Studio solution\.

### Adding System Components<a name="component-entity-system-pg-gems-code-updating-adding-system-components"></a>

New gems come with a default system component called **<gem name>*SystemComponent*\. You can modify this system component according to your requirements\. To communicate with the system component, you can define as many EBuses as required\. If you want to add additional components, you must add the component descriptor to the AZ module for the gem \( `\Code\Source\<gem name>Module.cpp`\)\. For more information, see [System Components](az-module-system-components.md) and [Creating System Components](component-entity-system-pg-creating-system-components.md)\.

### Adding Dependencies to a Gem<a name="component-entity-system-pg-gems-code-adding-dependencies"></a>

In addition to adding dependencies to gem\-specific third\-party libraries, your gem can specify dependencies on Lumberyard Engine modules, other gems, or third\-party libraries for Lumberyard\.

#### Adding a Dependency on a Lumberyard Module<a name="component-entity-system-pg-gems-code-adding-dependencies-lumberyard-module"></a>

Any gem can be configured to depend on any of the following Lumberyard framework modules:
+ `AzCore`
+ `AzFramework`
+ `AzGameFramework`
+ `AzQtComponents`
+ `AzToolsFramework`
+ `GridMate`
+ `GridMateForTools`

To declare a dependency on one of these Lumberyard modules, use the Waf `use` mechanism\. The following example `wscript` file specifies a dependency on `AzFramework`\.

```
def build(bld):
    bld.DefineGem(
        # Add custom build options here
        includes    = [bld.Path('Code/CryEngine/CryAction'),
        use         = ['AzFramework'],
    )
```

#### Adding a Dependency on Another Gem<a name="component-entity-system-pg-gems-code-adding-dependencies-gem"></a>

You can configure gem A to depend on gem B by modifying gem A's `gem.json` and wscript files\. The following example shows how the Twitch gem, included with Lumberyard, declares a dependency on the [HttpRequestor gem](http-requestor-gem.md)\. This `gems.json` file is located in the `lumberyard_installation\dev\Gems\Twitch\` directory\.

```
{
    "GemFormatVersion": 3,
    "Uuid": "b63e64141fab40b791211ba257632e84",
    "Name": "Twitch",
    "DisplayName": "Twitch",
    "Version": "1.0.0",
    "LinkType": "Dynamic",
    "Summary": "Provides access to the Twitch Commerce SDK, social functions, login, chat, and other APIs.",
    "Tags": ["Twitch","Commerce","SDK","Social"],
    "IconPath": "preview.png",
    "Dependencies": [
        {
            "Uuid": "28479e255bde466e91fc34eec808d9c7",
            "VersionConstraints": [ "~>1.0" ],
            "_comment": "HttpRequestor"
        }
    ]
}
```

The Twitch gem specifies the HttpRequestor gem in the `Dependencies` section\. The `Dependencies` section also has a `VersionConstraints` section that you can use to specify versioning requirements\.

The Twitch gem's wscript file uses the `use` keyword to declare a dependency on HttpRequestor:

```
def build(bld):
    import lumberyard_sdks

    file_list = []
    if lumberyard_sdks.does_platform_support_aws_native_sdk(bld):
        file_list.append('twitch.waf_files')
    else:
        file_list.append('lmbraws_unsupported.waf_files')
        
    bld.DefineGem(
        use         =   [   'HttpRequestor',
                            'LmbrAWS'
                        ],
        uselib      =   [   'TWITCHFSDK',
                            'AWS_CPP_SDK_CORE'
                        ],
        includes    =   [],
        
        file_list   = file_list,
        win_file_list = ['twitch_win.waf_files']
    )
```

#### Adding a Dependency on a Third\-Party Library for Lumberyard<a name="component-entity-system-pg-gems-code-adding-dependencies-third-party-library-for-lumberyard"></a>

You can define a gem that uses a third\-party library for Lumberyard that another module is also using\. To do so, use the Waf `uselib` mechanism to add the dependency to the gem, as in the following example `wscript` file\.

```
def build(bld):
    bld.DefineGem(
        # Add custom build options here
        includes    = [bld.Path('Code/CryEngine/CryAction'),
        use         = ['AzFramework'],
        uselib      = ['AWS_CPP_SDK']
 )
```

For more information, see [Adding Third\-Party Libraries](waf-adding-third-party-libraries.md) and [Creating Third\-Party Library Configuration Files for Waf](waf-third-party-library-configurations.md)\.

**Note**  
Because the recursive nature of `use` can lead to linker errors, especially duplicate symbol errors, `uselib` is a better choice\.