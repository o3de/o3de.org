# Adding a Spec<a name="waf-using-spec"></a>

The Waf spec system provides a template to create Visual Studio solutions and describes a build filter that determines which modules to build for particular platforms and configurations\. The nature of the generic Waf build system is to be all projects that are defined through the wscript system, which acts recursively on the root directory structure\. If no spec is specified when you execute a build or clean command, the Waf build system system attempts to build all modules that are supported by the selected target platform and configuration\. The platform and configuration support is defined in each of the module's wscript definitions\. For more information, see [Adding a Build Module](waf-using-module.md)\.

Project spec files are a collection of modules and definitions for a specific build pipeline\. These files are useful for including existing modules or adding new ones as part of the build dependencies for your game project\.

When you build in debug or profile configurations and their `_dedicated` counterparts, a spec file is not required\. This is because these two configurations build out of Lumberyard as modular shared components\. In performance and release configurations, however, all the modules that are marked as `CryEngineModules` are built monolithically, which means that they are built into a single executable\. This causes problems with similar modules that support the same platform and configuration\. Currently, the spec file is required for this scenario in order to target specific modules to build into the monolithic `.exe` files\.

**Topics**
+ [Creating a New Project Spec JSON File](#add-spec-new-json-file)
+ [Adding the Spec File to the Visual Studio Solution Generator](#add-spec-vs-solution-generator)
+ [Building the Spec](#add-spec-build-spec)

**Topics**
+ [Creating a New Project Spec JSON File](#add-spec-new-json-file)
+ [Adding the Spec File to the Visual Studio Solution Generator](#add-spec-vs-solution-generator)
+ [Building the Spec](#add-spec-build-spec)

## Creating a New Project Spec JSON File<a name="add-spec-new-json-file"></a>

In the following example a spec file called `my_game` includes the game engine modules as a base as well as custom modules for Windows\. The spec file also sets a custom \#define for Windows builds\.

You need to configure the values for the modules that you want to include in the spec file \(and optionally the target platform and configuration\)\. The spec file can isolate `target_platform` modules for multiplatform builds\.

Create a spec file called `my_game.json` with the following:

```
{
    "description"           : "Configuration to build the Woodpecker",
    "visual_studio_name"    : "Woodpecker",
    "comment"               : "This is meant to only compile tools on Windows.",
    "disable_game_projects" : true,
    "platforms" : ["win"],
    "configurations" : ["debug","profile"],

    "modules" :
    [
        "AzCore",
        "AzFramework",        
        "AzToolsFramework",
        "GridMate",
        "LuaIDE",
        "Profiler"
    ]
}
```

The spec files are located in the `lumberyard_version\dev\_WAF_\specs` directory and have the `.json` file extension\. For more information about Waf spec files, see [Waf Spec Files \(\*\.json\)](waf-files-spec-file.md)\.


****  

| Spec | Description | 
| --- | --- | 
| all\.json | Configuration for all targets\. | 
| dedicated\_server\.json | Configuration to build dedicated servers for the enabled projects\. | 
| external\_sdks\.json | Configuration to build externally distributed binary\-only libraries\. | 
| game\_and\_engine\.json | Configuration to build the engine and game projects\. | 
| pipeline\.json | Configuration to build Pipeline Only for building Resource Compiler, and also Maya, 3ds Max, and Photoshop plugins if Visual Studio 2010 and 2012 are installed\. Build only in Profile or Debug mode \(Release mode is only for the 3ds Max plugin\) | 
| resource\_compiler\.json | Configuration to build only the Resource Compiler\. | 
| shadercachegen\.json | Configuration to build only the shadercache generator\. | 
| tools\.json | Configuration to build nonessential tools\. | 

## Adding the Spec File to the Visual Studio Solution Generator<a name="add-spec-vs-solution-generator"></a>

Adding the spec file to the Visual Studio solution is optional\.

**To add the spec file to the Visual Studio solution**

1. In a text editor, edit the `specs_to_include_in_project_generation` value in the `user_settings.options` file to add your spec file to the Visual Studio solution:

   ```
   [Visual Studio Project Generator]
   generate_vs_projects_automatically = True
   visual_studio_solution_name = LumberyardSDK
   visual_studio_solution_folder = Solutions
   specs_to_include_in_project_generation = MySpec1, MySpec2, MySpec3
   ```

1. Enter the following command to regenerate the Visual Studio solution: 

   ```
   lmbr_waf.bat configure
   ```

## Building the Spec<a name="add-spec-build-spec"></a>

After saving the new spec, do one of the following:
+ Build the spec using Visual Studio \(if you followed the steps above to add the spec to Visual Studio\)\.
+ Build the spec from the command line by entering the following command for your version of Visual Studio: 

  ```
  lmbr_waf build_win_x64_vs2017_profile -p MySpec
  ```

The `build` command builds the game project specified in the `user_settings`, even if the module is not defined in the spec\. The exception is if the option `disable_game_projects` is set to **True**\.