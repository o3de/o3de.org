# Adding a Build Module<a name="waf-using-module"></a>

You can create a custom build module in the Lumberyard Waf build system\. You can use predefined build modules to add any shared library or plugin into the Lumberyard engine SDK\.

The default Waf system defines modules and methods that will take various keywords into Waf commands to build applications and shared and static libraries as well as serving as a project container for files\. There `cryengine_modules.py` file defines functions that wrap these modules with additional keywords and logic to extend the behavior of standard Waf into a system that supports the requirements of Lumberyard\. In addition to providing standard Waf build functionality, the functions in the various modules add support for precompiled headers \(`pch`\), content file support \(`.waf_files`\), monolithic build capability, uber file support, and Microsoft Visual Studio \(msvs\) generation\.

Creating a module requires the following steps:

1. Create the source folder and script

1. Create a basic wscript module

1. Create the `.waf_files` content file

1. Specify additional include paths and external library linking

1. Add a project dependency

## Creating a New Module<a name="create-new-module"></a>

You can create and add the following types of modules to the Lumberyard Waf build system:


****  

| Build Module | Description | Project Type | 
| --- | --- | --- | 
| CryEngineModule | Modules that are dynamically loaded at runtime as part of the lumberyard engine module system\. For Performance and Release configurations, all projects that are built using these modules are included monolithically to the final build output\. If the libraries are not linked in, the source from these modules is included in the build\. For Debug and Profile configurations, these modules are built as shared libraries\. For the Windows platform, versioning information is injected as defined in the waf\_branch\_spec\.py file located in the root folder\. As such, a Windows resource \(`.rc`\) file as needed as part of the waf\_files content\.  | Shared Library \(Non\-Release\), Static Library Performance \(Performance, Release\) | 
| CryEngineSharedLibrary | Used to define a shared library that any other module can use inside Waf\. Provided they are located in the same directory path as the dependent project, these modules are included as a dependency to other modules by use of the use keyword\. | Shared Library | 
| CryEngineStaticLibrary | Used to define a static library that can be used by any other module inside Waf\. Provided they are located in the same folder path as the dependent project, these modules are included as a dependency to other modules by use of the use keyword\. | Static Library | 
| CryLauncher | Used to define the build definition for launchers, which are created for each game project defined per supported platform\. All supported launchers that can be generated based on availability against the current platform are located in the \\Code\\Launcher subfolder\. If an additional platform is included, a new launcher project would be added in this subfolder and use the CryLauncher build module\. | Executable | 
| CryDedicatedServer | Similar to the CryLauncher module, except used for dedicated server projects\.  | Executable | 
| CryConsoleApplication | Used to build console applications\. On the Windows platform, it builds a console application instead of a Windows application\. | Executable | 
| CryBuildUtility | Used to define build utility projects, such as AZCodeGenerator\. Build utilities are separated into a build\_utilities group that are built before the regular build group\. | Executable | 
| CryFileContainer | Used to set a file container for projects\.  | None | 
| CryEditor | Used by Lumberyard Editor projects\. | Executable | 
| LumberyardApp |  |  | 
| CryEditorUiQt | Used by the CryEditorUI\_QT plugin\. |  | 
| CryPlugin | Used by Lumberyard Editor plugin projects\. It is automatically placed in the \\EditorPlugins subfolder and automatically loaded by Lumberyard Editor at runtime\. | Shared Library | 
| CryStandAlonePlugin | Used by Lumberyard Editor plugin projects\. The difference between this module and CryPlugin is that it does not import any SANDBOX or EDITOR\_COMMON imports, RTTI is enabled, and nodefaultlib:/ is set to libcmt\. | Shared Library | 
| CryPluginModule | Used to define shared libraries that can be used by a Lumberyard Editor plugin\. Plugins that need to link to a Cryengine plugin module use the use feature of Waf\. | Shared Library | 
| CryResourceCompiler | Used by the Resource Compiler to implicitly set the target name to rc and the subfolder to \\rc under the \\configure output folder\. | Executable | 
| CryResourceCompilerModule | Used by the Resource Compiler to implicitly set the target name to rc and the subfolder to rc under the \\configure output folder\. | Shared Library | 
| CryPipelineModule | Used to define pipeline modules such as for the 3ds Max and Maya exporters\. | Custom | 
| CryQtApplication | Used to define Qt 5 applications that can be launched by Lumberyard Editor, such as the Asset Processor\. | Executable | 
| CryQtConsoleApplication | Used to define Qt 5 console applications that can be launched by Lumberyard Editor, such as the Asset Processor batch file\. | Executable | 

In this topic's example you create a CryEngineModule\.

## Build Module Keywords<a name="waf-build-module-keywords"></a>

The following describes the general keywords that are supported by the build modules\. The listed targetable keywords can be specific to a platform or a configuration\. The keyword by itself is used for all supported platforms and configurations, but if you need keywords that are specific to a platform or configuration, you must include the name of the platform or configuration in the name\.

Other things to consider:
+ The general pattern for platform plus configuration\-specific values is *<platform>\_<configuration>\_<keyword>*\. 
+ The general pattern for platform\-specific values is *<platform>\_<keyword>*
+ The general pattern for configuration\-specific values is *<configuration>\_<keyword>*

You can use the following keyword macros to reduce the verboseness of `wscript` files:

***<platform>*\_ndebug\_*<keyword>***  
This macro eliminates the need to repeatedly specify certain non\-debug flags\. Lumberyard has one debug configuration and three non\-debug configurations\.


****  

| Keyword | Description | Targetable? | 
| --- | --- | --- | 
| target | Name of the target project\.  |  | 
| platforms | The list of platforms to restrict this module to\. If not specified, then defaults to all, which assumes all supported target platforms on the current host\.  | No | 
| configurations | The list of configurations to restrict this module to\. If not specified, then defaults to all\. In addition to the standard configurations \(debug, profile, and release\), configurations can be specific to a particular platform\. This is done by appending the platform name with a colon separator in front of the configuration\. For example, if a module supports only debug and profile for the iOS platform, then the configuration list would include the values `ios:debug` and `ios:profile`\.   |  | 
| file\_list | The \.waf\_files JSON file that contains the file list definition for the project\.  | Yes | 
| pch | The name of the precompiled header\. If present, then precompiled headers are enabled\.  |  | 
| use | Additional projects to link as a use dependency\.  | Yes | 
| uselib | Additional libraries to use\.  | Yes | 
| defines | Additional preprocessor defines for the project\. | Yes | 
| includes | Additional include paths\. | Yes | 
| cflags | Additional C flags\. | Yes | 
| cxxflags | Additional C\+\+ flags\. | Yes | 
| lib | Additional libraries to link to\.  | Yes | 
| libpath | Additional library include path\. | Yes | 
| stlib | Boolean flag that indicates a static library module\.  | Yes | 
| stlibpath |  Lib path for static libs \(generally the same for any lib\)\.  | Yes | 
| linkflags | Additional link flags during the linker phase\. | Yes | 
| export\_definitions | Export definition filename \(\.def file\)\.  | Yes | 
| features | Any additional features to tag this project to\.  | Yes | 
| output\_file\_name | An output file name used to override the default output file based on the target\.  | Yes | 
| framework | Additional frameworks \(Darwin\)\.  | No | 
| frameworkpath | Additional framework paths \(darwin\)\.  | No | 
| export\_defines | Additional preprocessor defines that are added to any module that uses the current module as a project dependency\.  | No | 
| export\_includes | Additional library include paths that are added to any module that uses the current module as a project dependency\.  | No | 
| additional\_settings | Additional settings added for specific files\.  | Yes | 
| meta\_includes | Meta includes for WinRT\.  | Yes | 
| files | Another way to pass in files for processing a build project\.  | Yes | 
| winres\_includes | Additional include paths for the winres compiler\.  | No | 
| winres\_defines | Additional defines for the winres compiler\.  | No | 
| enable\_rtti | Flag to enable rtti settings for a project\.  | Yes | 
| rpath | Additional relative library paths \(Darwin\)\.  | No | 

## Creating a Basic Wscript Module<a name="create-basic-wscript-module"></a>

The wscript file specifies the name of the module \(`target`\), `.waf_files` content file \(`file_list`\), Visual Studio filter \(`vs_filter`\), and precompiled headers \(`pch`\)\.

Create a wscript module with the following:

```
def build(bld):
 
    bld.CryEngineModule(
        target      = 'MyEngineModule',
        vs_filter   = 'LyEngine',
        file_list   = 'myenginemodule.waf_files',
        pch         = 'StdAfx.cpp'
    )
```

In order for the Lumberyard Waf build system to pick up the new folder and script, you must add the new folder to the list of subfolders to recurse\. Because you are adding this project under `lumberyard_version/Code/CryEngine/MyEngineModule`, you need to update the wscript located in the parent `lumberyard_version/Code/CryEngine` folder\.

Update the wscript located in the `lumberyard_version/Code/CryEngine` folder with the following:

```
SUBFOLDERS = [
        'CryInput',
        'Cry3DEngine',
        ...
        'MyEngineModule',
    ]
 
def build(bld):
    # Recursive into all sub projects
    bld.recurse(SUBFOLDERS)
```

## Creating the \.waf\_files Content File<a name="create-waf-files-content-file"></a>

In the example wscript, you specified a file called `myenginemodule.waf_files` as the project content file\. The project content file can be one of the following:
+ A single file that defines the source files for the project
+ A list of files that define the source files for the project
+ Platform/configuration, where certain files are included only for a particular platform \(for example, console\-specific files\)

The following `myenginemodule.waf_files` example demonstrates a simple module with six files:

```
{
    "NoUberFile":
    {
        "Root":
        [
            "StdAfx.cpp",
            "StdAfx.h"
        ]
    },
    "myenginemodule_uber_0.cpp":
    {
        "Root":
        [
            "myenginecore.cpp",
            "myenginecore.h",
            "myengineextras.cpp",
            "myengineextras.h"
        ]
    }
}
```

## Specifying Additional Include Paths and External Library Linking<a name="specify-include-paths-library-link"></a>

To configure the module to link to external modules, you need to update the wscript to specify the include path and link related project settings flags such as includes, lib, libpath, and linkflags\.

In this example, you add the following to your module:

1. Google mock libraries for Win x64

1. Preprocessor DEFINE called **USE\_GMOCK** to inject into the compile based on the platform Win x64

1. Link\-time code generation flag to enable instrumentation \(`/LTCG:PGOPTIMIZE`\)

Add the following to your wscript module:

```
def build(bld):
 
    bld.CryEngineModule(
        target          = 'MyEngineModule',
        vs_filter       = 'LyEngine',
        file_list       = 'myenginemodule.waf_files',
        pch             = 'StdAfx.cpp',
 
        win_includes    = [Path('Code/SDKs/GoogleMock/include')],
        win_lib         = ['gmock'],
        win_linkflags   = ['/LTCG:PGOPTIMIZE'],
        win_defines     = ['USE_GMOCK'],
        win_x64_debug_libpath       = [Path('Code/SDKs/GoogleMock/bin/x64/Debug')],
        win_x64_profile_libpath     = [Path('Code/SDKs/GoogleMock/bin/x64/Release')],
        win_x64_performance_libpath = [Path('Code/SDKs/GoogleMock/bin/x64/Release')],
        win_x64_release_libpath     = [Path('Code/SDKs/GoogleMock/bin/x64/Release')]
    )
)
```

**Note**  
The following are duplicated to cover all possible configurations that you specified in the `waf_branch_spec`: `win_x64_profile_libpath`, `win_x64_profile_performance`, and `win_x64_release_libpath`\.

## Adding and Linking to a Project Dependency<a name="add-link-project-dependency"></a>

If you want to link to another module that is built within the system, you can use the `use` parameter for the build\.

Update your wscript module to link to the CryPerforce module:

```
def build(bld):
 
    bld.CryEngineModule(
        target          = 'MyEngineModule',
        vs_filter       = 'LyEngine',
        file_list       = 'myenginemodule.waf_files',
        pch             = 'StdAfx.cpp',
        use             = ['CryPerforce'],
 
        win_includes    = [Path('Code/SDKs/GoogleMock/include')],
        win_lib         = ['gmock'],
        win_defines     = ['USE_GMOCK'],
        win_x64_debug_libpath       = [Path('Code/SDKs/GoogleMock/bin/x64/Debug')],
        win_x64_profile_libpath     = [Path('Code/SDKs/GoogleMock/bin/x64/Release')],
        win_x64_performance_libpath = [Path('Code/SDKs/GoogleMock/bin/x64/Release')],
        win_x64_release_libpath     = [Path('Code/SDKs/GoogleMock/bin/x64/Release')]
    )
)
```