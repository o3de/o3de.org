# Waf Commands and Options<a name="waf-commands"></a>

**Contents**
+ [Waf Configuration](#waf-configuration)
+ [Build Configuration](#build-configuration)
+ [Multiplayer Configuration](#waf-multiplayer-configuration)

Before building a project using Waf, you must run configure from the command line\. The configure command recursively processes all of the wscript configuration files starting from the root directory and generates a Visual Studio solution file for the entire project\. You can set an option to generate a solution file during the configure command\.

**Note**  
The Waf script automatically runs Lumberyard Setup Assistant to ensure the correct third\-party libraries are available and the proper links are created to compile the game code, engine and asset pipeline, and editor and tools\.

## Waf Configuration<a name="waf-configuration"></a>

To run the Waf executable, run the following command at the `lumberyard_version\dev\` directory of your project:

lmbr\_waf configure

This command iterates through all the Waf project configuration files and sets up the project\-specific settings in the Waf cache, which is used in subsequent build commands\. It also uses the host environment to determine which platforms are available to build\.

**Example**  
The following example shows the output of the lmbr\_waf configure command:  

```
[WAF] Executing 'configure'
Running SetupAssistant.exe...
--- Lumberyard Setup Assistant ---
SDK location: d:/lumberyard_engine/dev
Third party location: d:/lumberyard_engine/dev/3rdParty
Capabilities Available, [x] enabled  - [ ] disabled:
[ ] rungame - Run your game project
[ ] runeditor - Run the Lumberyard Editor and tools
[X] compilegame - Compile the game code
[X] compileengine - Compile the engine and asset pipeline
[X] compilesandbox - Compile the Lumberyard Editor and tools
[ ] compileandroid - Compile for Android devices
[ ] compileios - Compile for iOS devices
Successfully executed
[INFO] Configure "win_x64_vs2017 - [debug, profile, performance, release, debug_dedicated, profile_dedicated, performance_dedicated, release_dedicated]"
[INFO] Configure "win_x64_vs2019 - [debug, profile, performance, release, debug_dedicated, profile_dedicated, performance_dedicated, release_dedicated]"

[WAF] 'configure' finished successfully (10.335s)
[WAF] Executing 'generate_uber_files' in 'd:\ws\lyengine\dev\BinTemp'
[WAF] 'generate_uber_files' finished successfully (2.177s)
[WAF] Executing 'msvs' in 'd:\ws\lyengine\dev\BinTemp'
```

The configure command uses the settings defined in the `user_settings.options` file that is located in the `lumberyard_version\dev\_WAF_` subfolder\. You can edit this file in a text editor or enter the following command to use the Lumberyard Waf settings tool:

```
lmbr_waf show_option_dialog
```

By default, whenever the configure command is run, Visual Studio solution and project files are created in the `dev\Solutions` directory\. The name of the solution file includes the version of Visual Studio for which it has been generated, such as `LumberyardSDK_vs2017.sln`\. You can change this behavior, the solution directory, and the solution name in the `user_settings.options` file\.

You can also generate the solution files manually by running the command lmbr\_waf msvs, or the version\-specific lmbr\_waf msvs\_*2017*\.

## Build Configuration<a name="build-configuration"></a>

After configuring Waf, you can run the build command\.

The following example shows the syntax: 

```
lmbr_waf build_platform_configuration -p spec
```

The following commands and options are available:
+ configure – Must be run before any clean or build command\. Loads all modules, configs, and project specs; validates and sets up the working cached build Python file\.
+ build\_\* – Builds the specified project spec for the specified platform and configuration\.
+ package\_\* – Creates a runnable package of the specified project spec for the specified platform and configuration for supported platforms\. Supported operating systems and devices include Android, iOS, and macOS\.
+ deploy\_\* – Deploys the specified project spec for the specified platform and configuration to a remote device for supported platforms\. Supported operating systems and devices include Android\.
+ clean\_\* – Cleans out intermediate and target files that were generated for the particular platform and configuration\.

The following example shows how to build release for Windows x64 with Visual Studio 2017: 

```
lmbr_waf build_win_x64_vs2017_release -p all
```

**Note**  
Combining the clean\_\* and build\_\* commands is the equivalent of performing a rebuild\.


**Configure command options**  
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-commands.html)

You can set the command options at build time\. These options override the values set in the `user_settings.options` file\. For more information, see [Project Configurator](waf-user-options-and-settings.md#waf-files-user-settings)\.

Only modules that support each project configuration are built from the project spec\. If a module is defined in the spec that only can be built in debug or profile, building in performance mode excludes that project from compilation\.<a name="build-parameters"></a>


**Project configurations parameters**  

| Configuration | Asserts | Profiling | Optimization | Logging | Description | 
| --- | --- | --- | --- | --- | --- | 
| debug | Yes | All | Minimum | Yes | Slowest – Focuses on debugging with asserts enabled, all profiling features enabled, and logging enabled\. | 
| profile | No | All | Medium | Yes | Fast – Strikes a balance between debugging and performance with all profiling features and logging enabled\. | 
| performance | No | Few | Maximum | No | Very fast – Performance similar to release but has some profiling features enabled; difficult to debug; no logging\. | 
| release | No | None | Maximum | No | Fastest – Highest performance; most difficult to debug; no profiling features; no logging\. | 


**Build command project spec options**  

| Spec | Platform | Configuration | Description | 
| --- | --- | --- | --- | 
| all | win\_x64\_vs2017, win\_x64\_vs2019, darwin\_x64 | Debug, profile, performance, release | Configuration to build the engine, editor, plugins, and tools | 
| game\_and\_engine | win\_x64\_vs2017, win\_x64\_vs2019, darwin\_x64, linux\_x64 | Debug, profile, performance, release | Configuration to build the engine and game project | 
| dcc\_plugins | win\_x64\_vs2017, win\_x64\_vs2019 | Debug, profile | Configuration to build tools for the asset pipeline | 
| resource\_compiler | win\_x64\_vs2017, win\_x64\_vs2019 | Debug, profile | Configuration to build the Resource Compiler only | 


**Build configuration options**  

| Option | Description | 
| --- | --- | 
| \-\-progress | Shows the build progress and updates in real time\. | 
| \-\-project\-spec | Specifies the project spec to use when cleaning or building the project\. | 
| \-\-show\-includes | Shows the includes for each compiled file\. | 
| \-\-target | Specifies the target to build and its dependencies\. The target must exist in the specified project spec; otherwise, all targets in the project spec are built\. | 


**Command Chaining Options**  

| Command | Option | Description | 
| --- | --- | --- | 
| build\_\* | ‑‑package‑projects‑automatically=\(True\|False\) |  Automatically runs the package command after each successful build command, where available\. The default is `True`\. Supported platforms include Android, iOS, and macOS\. The following example runs only the build command: lmbr\_waf \-p all build\_android\_armv8\_clang\_profile \-\-package\-projects\-automatically=True  | 
|  build\_\* package\_\*  | \-\-deploy\-platform\_root=\(True\|False\) | Automatically sends a deploy command to remove devices after each successful package generated, where available\. Can be combined with \-\-package\-projects\-automatically=True in a build command to chain all three commands\. The default is `True`\.Supported platforms include Android\.*platform\_root* example:android\_armv8\_clang => android \(\-\-deploy\-android\)The following example runs only the package command: lmbr\_waf package\_android\_armv8\_clang\_profile \-\-deploy\-android=False The following command ensures that all three commands \(build, package, and deploy\) run:lmbr\_waf \-p all build\_android\_armv8\_clang\_profile \-\-package\-projects\-automatically=True \-\-deploy\-android=True | 

## Multiplayer Configuration<a name="waf-multiplayer-configuration"></a>

Before you can build multiplayer information, you must build the dedicated server\. This creates a directory called `Bin64.Dedicated` that includes the binaries directory and configuration files for the dedicated server\.

To build the dedicated server, run the following build command for your version of Visual Studio:

```
lmbr_waf build_win_x64_vs2017_profile_dedicated -p dedicated_server
```