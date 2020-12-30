---
description: null
slug: waf-user-options-and-settings
title: Waf User Options and Settings
---
# Waf User Options and Settings<a name="waf-user-options-and-settings"></a>

In Lumberyard, the Waf options for configure and build time operations in are determined primarily by the following files in the `lumberyard_version\dev\_WAF_` subdirectory:
+ **default\_settings\.json** – Declares most of the configurable settings that control how Lumberyard and its game projects are built, including the default values\. 
+ **Platform\-specific settings** – Settings and defaults declared in the `settings` sections of `.json` files in the `lumberyard_version\dev\_WAF_\settings\platforms` subdirectory, including the following:
  + `common.android.json` – Options for Android\.
  + `platform.darwin_x64.json` – Options for macOS\.
  + `platform.ios.json` – Options for iOS\.
  + `common.win_msvc.json` – Windows options for Microsoft Visual Studio\.
  + `platform.win_x64_vs2017.json` – Windows options for Microsoft Visual Studio 2017\.
  + `platform.win_x64_vs2019.json` – Windows options for Microsoft Visual Studio 2019\.
+ **user\_settings\.options** – Use this file to override default values defined in the `default_settings.json` file and platform\-specific settings files\.

**Topics**
+ [default\_settings\.json](#waf-user-options-and-settings-default-settings-json-file)
+ [user\_settings\.options](#waf-user-options-and-settings-user-settings-options-file)
+ [Waf User Settings \(user\_settings\.options\)](#waf-files-user-settings)

## default\_settings\.json<a name="waf-user-options-and-settings-default-settings-json-file"></a>

The `default_settings.json` file and the `settings` sections of platform\-specific `.json` files use the following format to organize related settings into groups:

```
"Group Name":[
    {
            "long_form": "Command line form",
            "short_form": "Optional short form of the command line option",
            "attribute": "Waf option attribute",
            "default_value": "Default value",
            "description": "Brief description of the setting"
      },...
],
...
```

Each option can have the following attributes:
+ **long\_form** – The long form of the command line argument that Waf accepts as a command\-line override to the setting\. This overrides both the default value and any override value in the `user_settings.options` file\. The long form is usually preceded with a double hyphen \(for example, `--enable-my-option`\)\.
+ **short\_form** – \(Optional\) The short form of the command argument override option \(for example, `-s`\)\.
+ **attribute** – The name of the attribute for configure and builds\. The attribute is set to the Options WAF module object\. This form of the attribute name is used in the `user_settings.options` override file\.
+ **default\_value** – The default value if the setting is not overridden in the `user_settings.options` file or by the related command line argument\.
+ **description** – A brief description of the option\.

The following example shows the `enabled_game_projects` attribute in the `Game Projects` section of the `default_settings.json` file\.

```
...  
"Game Projects": [
        {
            "long_form": "--enabled-game-projects", 
            "attribute": "enabled_game_projects", 
            "default_value": "StarterGame,CloudGemSamples", 
            "description": "Comma-separated list of game projects to enable for compiling"
        }
    ],
...
```

## user\_settings\.options<a name="waf-user-options-and-settings-user-settings-options-file"></a>

Use the `user_settings.options` file to override the default values specified in `default_settings.json` and platform\-specific settings `.json` files\. This configuration file is in a standard `.cfg` file format \(not `.json`\) with section names in brackets, as in the following example:

```
[Game Projects]
;enabled_game_projects = StarterGame,CloudGemSamples
```

The groupings are defined in the `default_settings.json` file and in the platform\-specific settings `.json` files\. The `user_settings.options` file uses the form of the attribute for each setting as it is defined in the corresponding `.json` file\.

### Overriding Default Values<a name="waf-user-options-and-settings-user-settings-options-file-overriding-default-values"></a>

The default values are commented out with a semi\-colon ';' comment token at the beginning of each line in the `user_settings.options` file\. To override a value, remove the semicolon from the beginning of the line and set the attribute to the value that you want\. For example, the option to use IncrediBuild is off \(`False`\) by default\. If you want to set it to `True`, modify the corresponding section of the `user_settings.options` file to resemble the following:

```
[Incredibuild Options]
use_incredibuild = True
;incredibuild_max_cores = 128
;auto_update_incredibuild_settings = False
;incredibuild_profile = Tools/build/waf-1.7.13/profile.xml
```

### Overriding user\_settings\.options Changes<a name="waf-user-options-and-settings-user-settings-options-file-overriding"></a>

If you use the the `user_settings.options` file to override a default value like `use_incredibuild`, you can override the change temporarily by using the command line argument defined for the setting, as shown in the following example:

```
lmbr_waf build_win_x64_vs2017_profile -p all --use-incredibuild=False
```

**Note**  
Using the `lmbr_waf` command to override a value does not update the value in the `user_settings.options` file\.

## Waf User Settings \(user\_settings\.options\)<a name="waf-files-user-settings"></a>

Global Waf build system settings are specified in the `user_settings.options` file located in the `lumberyard_version\dev\_WAF_` subdirectory\. If the `user_settings.options` file does not exist, Lumberyard uses the `default_settings.json` and platform\-specific `.json` files to create a new one automatically\. Every build that runs refers to this file to get the option values specific to the build\. 

The settings listed can be modified in the file directly, or through the **Lumberyard WAF** settings dialog box\. To invoke the settings dialog box, enter `show_option_dialog` command into Waf as follows:

```
lmbr_waf show_option_dialog
```

![\[Waf settings dialog box.\]](/images/userguide/waf/waf-settings-dialog.png)

The tables in the following sections describe the options available for override in the `user_settings.options` file\. To override any setting, you can use the **Override Parameter** for the attribute\. For more information, see [Overriding user\_settings\.options Changes](#waf-user-options-and-settings-user-settings-options-file-overriding)\.

**Topics**
+ [default\_settings\.json Options](#waf-files-user-settings-default-settings-json-file-options)
+ [Output Folder Options](#waf-files-user-settings-output-folder-options)
+ [Platform\-Specific Options](#waf-files-user-settings-platform-specific-options)

### default\_settings\.json Options<a name="waf-files-user-settings-default-settings-json-file-options"></a>

The following tables describe the options defined in the `default_settings.json` file\.


**Build Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| copy\_3rd\_party\_pdbs | \-\-copy\-3rd\-party\-pdbs |  Copies `.pdb` files from third party libraries for debugging\.  This option increases the memory usage of your Visual Studio development environment\.   | True | 
| crash\_handler\_token | \-\-crash\-handler\-token | Token that you use to submit crash reports\. |  | 
| crash\_handler\_url | \-\-crash\-handler\-url | Endpoint where you submit crash reports\. |  | 
| enable\_dynamic\_file\_globbing | \-\-enable\-dynamic\-file\-globbing |  Enables globbing of files during all build operations, globbing only once during configure\.  Excessive usage of file globbing negatively impacts build performance\.   | False | 
| enable\_link\_time\_optimization | \-\-enable\-link\-time\-optimization | If true, link time optimizations and code generation are enabled in the performance and release configurations\. | False | 
| enable\_memory\_tracking | \-\-enable\-memory\-tracking |  Enable the `AZCORE_ENABLE_MEMORY_TRACKING` define, which allows the Memory Driller to run and track all allocations\.  This option severely impacts code execution times\.   | False | 
| enable\_msvc\_timings | \-\-enable\-msvc\-timings | Enable output timing information for msvc compile and link operations\. | False | 
| enable\_whole\_program\_optimization | \-\-enable\-whole\-program\-optimization | If set to True, whole program optimizations are enabled for performance and release builds\. | False | 
| external\_crash\_reporting | \-\-external\-crash\-reporting | Zip and upload symbols and build client with external crash reporting enabled\. The value set is an additional build tag that is passed to the crash reporter system\. |  | 
| gems\_optional | \-\-gems\-optional | Allows building of projects without gems\.json files\. | False | 
| generate\_debug\_info | \-\-generate\-debug\-info | Option to generate debug symbols and \.pdb files for the build\. | True | 
| generate\_map\_file | \-\-generate\-map\-file | Generate a map file during linking if the platform supports it\. | False | 
| generate\_sig\_debug\_output |  \-\-sig\-delta \-s  | Generate debug output showing signature differences that caused a task to rerun\. | False | 
| layout\_binaries\_only | \-\-layout\-binaries\-only | Update only the binaries in a current layout\. This supports programmer rapid iteration mode\. | False | 
| layout\_hard\_linking | \-\-layout\-hard\-linking | If true, layouts are hard links, not full copies of files\. | True | 
| layout\_include\_pdbs | \-\-layout\-include\-pdbs | When adding the binaries to the layout, include the \.pdb files\. | False | 
| max\_parallel\_link | \-\-max\-parallel\-link | Controls the number of C\+\+ linking operations that happen in parallel\. | 2 | 
| packaged\_build\_time | \-\-packaged\-build\-time | A float value indicating the time that the build was packaged\. |  | 
| product\_sku | \-product\-sku | Enables a project wide define PRODUCT\_SKU\_value\. The specified value alters where \.pak files are built to and read from and determines which platform resources are used in the gem\\resources\\ directory\. For example, for a demo version of the game, you could set product\_sku = demo\. After PRODUCT\_SKU\_demo is defined, you can disable systems based on its value\. | default | 
| symbol\_token | \-\-symbol\-token | Specify the token used for uploading symbols\. |  | 
| uber\_file\_size | \-\-uber\-file\-size | Maximum content size of auto\-generated uber files\. | 307200 | 
| upload\_symbol\_list | \-\-upload\-symbol\-list | Specify the list of symbol patterns to upload for crash reporting\. |  | 
| use\_crcfix | \-\-use\-crcfix | Use the crcfix tool to precompute CRCs in AZ\_CRC macros\. | True | 
| use\_debug\_code\_generator  | \-\-use\_debug\_code\_generator | Uses the version of the code generator located in the \\Bin64xxxx\.Debug directory instead of the \\Bin64xxxx directory\. | False | 
| use\_precompiled\_header | \-\-use\-precompiled\-header | Use a precompiled header for compilation where applicable\. | True | 
| use\_uber\_files | \-\-use\-uber\-files | Use uber files for compilation\. | False | 
| version | \-\-force\-version | The version of the game project to embed in the game launchers\. | 0\.0\.0\.0 | 
| win\_build\_renderer | \-\-win\-build\-renderer | Specifies the type of renderer for a monolithic build\. Possible values are DX11 or DX12\. | DX11 | 


**Deployment Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| deploy\_projects\_automatically | \-\-deploy\-projects\-automatically | Automatically runs the deploy command after each build\. | True | 


**Game Projects**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| enabled\_game\_projects | \-\-enabled\-game\-projects | Comma\-separated list of game projects to enable for compiling\. By default, the possible values are: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/waf-user-options-and-settings.html) | CloudGemSamples, StarterGame | 


**IncrediBuild Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| auto\_update\_incredibuild\_settings | \-\-auto\-update\-incredibuild\-settings | Automatically attempts to update the registry for IncrediBuild, if needed\. These registry updates are required to configure IncrediBuild to work properly with the Waf build system\. | False | 
| incredibuild\_max\_cores | \-\-incredibuild\-max\-cores | Control the number of processes spawned by IncrediBuild\. | 128 | 
| incredibuild\_profile | \-\-incredibuild\-profile | The IncrediBuild configuration value to load for IncrediBuild builds\. If left blank, this value is generated automatically\. |  | 
| use\_incredibuild |  \-i \-\-use\-incredibuild  |  Use IncrediBuild if available\.  Windows PC builds require at a minimum the Make and Build tools package\. Android builds additionally require the Dev Tools Acceleration package\.  | False | 


**Misc Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| bootstrap\_third\_party\_override | \-\-3rdpartypath | Optional parameter to pass the location of the \\3rdParty directory as part of the bootstrap process\. |  | 
| bootstrap\_tool\_param | \-\-bootstrap\-tool\-param |  Value set by Lumberyard Setup Assistant to inform Waf which platforms should be enabled\.  This setting is automatically configured through Lumberyard Setup Assistant and should not be updated manually\.   |  | 
| has\_server\_configs | \-\-has\-server\-configs | Optional parameter to enable the \_dedicated\_server configurations\. | True | 
| has\_test\_configs | \-\-has\-test\-configs | Optional parameter to enable the \_test configurations\. | True | 
| max\_cores | \-\-max\-cores | Number of parallel processes for local builds\. To limit the number of cores used, set a specific value\. A value less than or equal to 0 indicates that as many cores as needed will be used based on available hardware\.  | 0 | 


**Packaging Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| copy\_assets | \-\-always\-copy\-assets | An option specific to iOS and macOS\. When running the packaging command, always copy any assets that are specified to the package, even for debug or profile builds\. | False | 
| package\_projects\_automatically | \-\-package\-projects\-automatically | Automatically run the packaging command after each build, where available\. This option is supported on Android, iOS, and macOS\. | True | 
| run\_xcode\_for\_packaging | \-\-runxcode\-for\-packaging | An option specific to iOS and macOS\. When running the packaging command, run xcode\_\* from the command line to generate the app bundle resources for iOS and macOS platforms\. | True | 


**Visual Studio Project Generator**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| default\_project | \-\-visual\-studio\-solution\-default\-project | The Visual Studio default project if not set in the solution user options \(\.suo \) file\. | Editor | 
| msvs\_version | \-\-msvs\-version | Version of the Visual Studio solution to generate when creating a new project with Project Configurator\. | 15 | 
| specs\_to\_include\_in\_project\_generation | \-\-specs\-to\-include\-in\-project\-generation | List of Waf [spec files](waf-files-spec-file.md) to include in the Visual Studio solution generation\. | all, game, game\_and\_engine | 
| visual\_studio\_solution\_folder | \-\-visual\-studio\-solution\-folder | Name of the directory in which the generated Visual Studio solution should be stored\. | Solutions | 

### Output Folder Options<a name="waf-files-user-settings-output-folder-options"></a>

Output folder options determine build output paths and folder name extensions for specific types of builds and environments\.

The output path attributes in the Output Folder table can have configuration\-based extensions from the Output Folder Name Extensions table\. The output path attributes are autogenerated by Waf from the enabled platforms\. The default values are defined by the `default_folder_name` attribute in each target's `lumberyard_version\dev\_WAF_\settings\platforms\platform.target.json\` file\.


**Output Folder**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| out\_folder\_android\_armv8\_clang | \-\-output\-folder\-android\-armv8\-clang | The base output folder name for the android\_armv8\_clang platform\. | BinAndroidArmv8Clang | 
| out\_folder\_ios | \-\-output\-folder\-ios | Absolute or relative iOS target platform build output path\.  | BinIos | 
| output\_folder\_darwin\_x64 | \-\-output\-darwin\-x64 | Absolute or relative macOS \(Darwin\) target platform build output path\. | BinMac64 | 
| out\_folder\_win\_x64\_vs2017 | \-\-output\-folder\-win64\-vs2017 | The base output folder name for the win\_x64\_vs2017 platform\. | Bin64vc141 | 
| out\_folder\_win\_x64\_vs2019 | \-\-output\-folder\-win64\-vs2019 | The base output folder name for the win\_x64\_vs2019 platform\. | Bin64vc142 | 

The following name extensions are appended to the output folder based on the target platform builds\. These configuration extension options are autogenerated by Waf\. The default values are defined by the `default_output_ext` attribute for each configuration in the `lumberyard_version\dev\_WAF_\settings\build_configurations.json` file\.


**Output Folder Name Extensions**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| output\_folder\_ext\_debug | \-\-output\-folder\-ext\-debug | The output folder name extension for debug builds\. | Debug | 
| output\_folder\_ext\_performance | \-\-output\-folder\-ext\-performance | The output folder name extension for performance builds\. | Performance | 
| output\_folder\_ext\_profile | \-\-output\-folder\-ext\-profile | The output folder name extension for profile builds\. |  | 
| output\_folder\_ext\_release | \-\-output\-folder\-ext\-release | The output folder name extension for release builds\. | Release | 

### Platform\-Specific Options<a name="waf-files-user-settings-platform-specific-options"></a>

Specific settings for Android, iOS, macOS, and Windows are defined in files located in the `lumberyard_version\dev\_WAF_\settings\platforms\` directory as noted\.

#### All Platforms<a name="waf-files-user-settings-platform-specific-options-platforms"></a>

The following settings define whether or not a platform is enabled to build\. The default value comes from the value of the `enabled` key found in each platform\-specific file in the `lumberyard_version\dev\_WAF_\settings\platforms\` directory\.


**Enable Platform**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| enable\_android\_armv8\_clang | \-\-enable\-android\-armv8\-clang | Enable the android\_armv8\_clang platform to build\. | True | 
| enable\_win\_x64\_vs2017 | \-\-enable\-win64\-vs2017 | Enable the win\_x64\_vs2017 platform to build\. | True | 
| enable\_win\_x64\_vs2019 | \-\-enable\-win64\-vs2019 | Enable the win\_x64\_vs2019 platform to build\. | True | 

#### Android<a name="waf-files-user-settings-platform-specific-options-android"></a>

 This section has been relocated to another part of the Lumberyard documentation, and is now part of the [Reference for Android](android-reference.md)\. See [Waf settings](android-reference.md#android-waf-settings)\. 

#### iOS<a name="waf-files-user-settings-platform-specific-options-ios"></a>

The following settings for iOS are defined in the `lumberyard_version\dev\_WAF_\settings\platforms\platform.ios.json` file\.


**iOS Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| ios\_paks | \-\-ios\-paks | Forces \.pak files to be built in non\-release builds\. | False | 


**iOS Project Generator**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| generate\_ios\_projects\_automatically | \-\-generate\-ios\-projects\-automatically | Automatically generate an Xcode project for iOS\. | True | 
| ios\_project\_name | \-\-ios\-project\-name | Name of the generated iOS project\. | LumberyardiOSSDK | 
| ios\_project\_folder | \-\-ios\-project\-folder | Name of the directory in which the generated iOS projects should be stored\. | Solutions | 

#### macOS<a name="waf-files-user-settings-platform-specific-options-macos"></a>

The following settings for macOS are defined in the `lumberyard_version\dev\_WAF_\settings\platforms\platfrom.darwin_x64.json` file\.


**Mac Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| mac\_build\_monolithic | \-\-mac\-build\-monolithic | Boolean flag to generate a monolithic or a non\-monolithic build for macOS\. | False | 
| darwin\_paks | \-\-darwin\-paks | Forces \.pak files to be built in non\-release builds\. | False | 


**Mac Project Generator**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| generate\_mac\_projects\_automatically | \-\-generate\-mac\-projects\-automatically | Automatically generate Xcode projects for macOS\. | True | 
| mac\_project\_name | \-\-mac\-project\-name | Name of the generated project\. | LumberyardSDK  | 
| mac\_project\_folder | \-\-mac\-project\-folder | Name of the directory in which the generated macOS projects should be stored\. | Solutions | 

#### Windows<a name="waf-files-user-settings-platform-specific-options-windows"></a>

The following settings for Visual Studio are defined in the `lumberyard_version\dev\_WAF_\settings\platforms\common.win_msvc.json` file\.


**Visual Studio Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| generate\_vs\_solution\_automatically | \-\-generate\-vs\-solution\-automatically | Automatically generate Visual Studio solutions during every configure\. | True | 

The following settings for Visual Studio 2017 are defined in the `lumberyard_version\dev\_WAF_\settings\platforms\platform.win_x64_vs2017.json` file\.


**Visual Studio 2017 Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| generate\_vs2017\_projects\_automatically | \-\-generate\-vs2017\-projects\-automatically | Automatically generate Visual Studio 2017 projects and solutions during every configure if the Windows VS2017 platform is enabled\. | True | 
| vs2017\_solution\_name | \-\-vs2017\-solution\-name | The name of the generated Visual Studio 2017 solution\. | LumberyardSDK\_vs2017 | 
| win\_vs2017\_vcvarsall\_args | \-\-win\-vs2017\-vcvarsall\-args | Additional arguments to pass to the vcvarsall\.bat file\. |  | 
| win\_vs2017\_vswhere\_args | \-\-win\-vs2017\-vswhere\-args | The arguments to pass to vswhere when locating Visual Studio 2017 executables\. The default maximum is up to but not including the next major version of Visual Studio\. The default minimum is the last known ABI incompatibility for Lumberyard builds\. | \-version \[15\.9\.28307\.770,16\.0\) | 
| win\_vs2017\_winkit | \-\-win\-vs2017\-winkit | The windows kit that Visual Studio 2017 builds Windows targets against\. |  | 

The following settings for Visual Studio 2019 are defined in the `lumberyard_version\dev\_WAF_\settings\platforms\platform.win_x64_vs2019.json` file\.


**Visual Studio 2019 Options**  

| Attribute | Override Parameter | Description | Default | 
| --- | --- | --- | --- | 
| generate\_vs2019\_projects\_automatically | \-\-generate\-vs2019\-projects\-automatically | Automatically generate Visual Studio 2019 projects and solutions during every configure if the Windows VS2019 platform is enabled\. | True | 
| vs2019\_solution\_name | \-\-vs2019\-solution\-name | The name of the generated Visual Studio 2019 solution\. | LumberyardSDK\_vs2019 | 
| win\_vs2019\_vcvarsall\_args | \-\-win\-vs2019\-vcvarsall\-args | Additional arguments to pass to the vcvarsall\.bat file\. |  | 
| win\_vs2019\_vswhere\_args | \-\-win\-vs2019\-vswhere\-args | The arguments to pass to vswhere when locating Visual Studio 2019 executables\. The default maximum is up to but not including the next major version of Visual Studio\. The default minimum is the last known ABI incompatibility for Lumberyard builds\. | \-version \[16\.2\.29230\.47,17\.0\) | 
| win\_vs2019\_winkit | \-\-win\-vs2019\-winkit | The windows kit that Visual Studio 2019 builds Windows targets against\. |  | 