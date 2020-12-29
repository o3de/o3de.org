# Customizing Lumberyard Setup Assistant<a name="lumberyard-launcher-customizing"></a>

You can use the `SetupAssistantConfig.json` configuration file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\) to customize Lumberyard Setup Assistant for your project\. The settings in this file are prioritized above internal default settings\.

For example configuration data that you can copy and paste into your own `.json` file, refer to the `SetupAssistantConfig.json.example` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\)\. 

Save your changes to the `SetupAssistantConfig.json` configuration file in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\. To validate your changes and ensure there are no syntax errors \(such as a missing comma\), run the `SetupAssistantBatch.exe` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup\Win` directory\) from a command line window\. 

## Enabling and Disabling Features<a name="ll-customizing-enable-disable-features"></a>

You can enable or disable software and third\-party SDKs based on your project requirements\. In the `SetupAssistantConfig.ini` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\), uncomment the lines \(delete the semicolon\) to disable specific features\. 

```
;just uncomment the SDKs you want to disable
;By default every SDK, software, and third-party plugin is enabled
[DisabledSDKS]
;boost="disabled"
;python="disabled"
;maya2013="disabled"
;maya2014="disabled"
;maya2015="disabled"
;max2015="disabled"
;photoshop="disabled"
;mysql="disabled"
```

## Adding New Third\-Party SDKs<a name="ll-customizing-adding-new-sdks"></a>

In addition to enabling or disabling software and third\-party SDKs, you can edit the `SetupAssistantConfig.json` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\) to add new, third\-party SDKs to your project configuration\.

When you add third\-party SDKs to the `SetupAssistantConfig.json` file, which is loaded after the internal configuration file, the `.json` file removes and replaces entries in the internal configuration\. This allows you to customize your project configuration without having to recompile\.

**To add new tasks \(capabilities\)**

1. If currently running, close the Lumberyard Setup Assistant\.

1. Navigate to the `\lumberyard_version\dev\Tools\LmbrSetup` directory\.

1. Edit the `SetupAssistantConfig.json` file to do the following:

   1. Add the task\(s\) to the `Capabilities` section\.

   1. Update the third\-party SDKs to include the appropriate tags\.
**Note**  
For an example of how to add configuration data, refer to the `SetupAssistantConfig.json.example` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\)\.

1. Open the Lumberyard Setup Assistant to see your changes\.

**To add third\-party SDKs**

1. If currently running, close the Lumberyard Setup Assistant\.

1. Navigate to the `\lumberyard_version\dev\Tools\LmbrSetup` directory\.

1. Edit the `SetupAssistantConfig.json` file to add information for your third\-party SDKs\. See [SDK Fields](#ll-customizing-adding-new-sdks-fields)\.
**Note**  
For an example of how to add configuration data, refer to the `SetupAssistantConfig.json.example` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\)\.

1. Open the Lumberyard Setup Assistant to see your changes\.

**To remove existing third\-party SDKs**

1. If currently running, close the Lumberyard Setup Assistant\.

1. Navigate to the `\lumberyard_version\dev\Tools\LmbrSetup` directory\.

1. Edit the `SetupAssistantConfig.json` file to create a `remove` entry with the same identifier\.
**Note**  
For an example of how to add configuration data, refer to the `SetupAssistantConfig.json.example` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\)\.

1. Open the Lumberyard Setup Assistant to see your changes\.

**Note**  
When you specify the destination of your code directory, you can use `$CODEFOLDERNAME$` or specify the actual name\. The code directory is the location where third\-party SDKs are expected and is relative to the SDK root\. For example, you can change `CodeFolderName` to `myGame/A/b/c`\.

### SDK Fields<a name="ll-customizing-adding-new-sdks-fields"></a>

You may need to provide information for the following SDK fields\.

**identifier**  
Unique string identifier that refers to the SDK\. The identifier must be one word and use only lowercase letters\.

**remove**  
If true, eliminates an existing entry\. The `remove` and `identifier` fields are required to remove an entry\.

**name**  
Display name of the SDK\. Custom SDKs can use any name without language restrictions\.

**version**  
Version of the SDK\.

**description**  
Brief description of the SDK\. Custom SDKs can use any description\. UTF\-8 is supported\.

**detailedInstructions**  
\(Optional\) Detailed instructions to obtain and install the SDK\. 

**tags**  
Tags to which the SDK applies\. For example, to have the SDK run the game, add the `rungame` tag\.

**symlinks**  
List of symlink dictionaries for all junctions \(symbolic links\) to establish between the `3rdParty` directory and the code base\. Each symlink uses the following form:  
+ `source` – Source directory, relative to the `3rdParty` directory\.
+ `destination` – Destination directory, relative to the SDK root\.
+ `exampleFile` – File that is located in the source and destination folders and that validates the established link\.

## Configuring Advanced Settings<a name="ll-customizing-configuring-advanced-settings"></a>

The `SetupAssistantConfig.json` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\) has the following configuration settings in the root element \(dictionary\):

**CodeFolderName**  
Location of the code directory, relative to the `Lumberyardroot.txt` file\. You can specify relative paths such as `..` and `../..` \(use forward slash marks\) or relative paths with multiple components such as `code/mycode/stuff`\.

**ToolsFolderName**  
Location of the tools directory, relative to the `Lumberyardroot.txt` file\. The default directory is `Tools`, but you can specify relative folders such as `../tools`\.

**RememberLumberyardRootFolder**  
If true, saves the Lumberyard root that the user browsed between sessions\. If false, automatically detects the Lumberyard root based on the executable location\. The default value is false\.

**Remember3rdPartyFolder**  
If true, saves the third\-party directory that the user browsed between sessions\. If false, automatically detects the third\-party directory based on the executable location\. The default value is false\.

## Customizing the Maya Environment<a name="ll-customizing-maya-environment"></a>

The `\Tools\Maya\Plugins` directory includes the Lumberyard Maya plugin, and the `\Tools\Maya\script` directory includes the MEL and Python scripts\. To enable the Maya plugin functionality, Lumberyard Setup Assistant modifies `Maya.ENV` to add the required variables to your Maya configuration\.

If you use your own Maya tools in addition to the exporter and pipeline tools that Lumberyard provides, you can use the `SetupAssistantConfig.json` file to add your project\-specific paths to the `MayaEnvironments` tag\.

For example configuration data, refer to the `SetupAssistantConfig.json.example` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\)\.

In the following example, `$TOOLSFOLDER$` is a macro that is substituted with the appropriate tools directory\. However, you can also use relative paths, relative to the game project’s root directory that includes `Lumberyardroot.txt`:

```
"MayaEnvironments" :
    [
    {
    "comment" : "an example entry showing how you can add a path to MAYA_PLUG_IN_PATH in maya.env",
    "identifier" : "MAYA_PLUG_IN_PATH",
    "paths" :["$TOOLSFOLDER$/maya/plugins"]
    },
    {
    "comment" : "an example entry showing how you can add paths to MAYA_SCRIPT_PATH in maya.env",
    "identifier" : "MAYA_SCRIPT_PATH",
    "paths" :["%DHTECH_SCRIPT_PATH%\\%DHTECH_GAME_PATH%","%DHTECH_SCRIPT_PATH%\\animation"]
    },
    ],
```

## Updating the Code or Tools Location<a name="ll-customizing-updating-code-tools-location"></a>

If your project requires moving the Lumberyard code or tools directory so that it’s no longer located in a subfolder called `Code` or `Tools` relative to the Lumberyard root, you can edit the `SetupAssistantConfig.json` file \(located in the `\lumberyard_version\dev\Tools\LmbrSetup` directory\) to update the directory location\. Ensure the updated directory includes the `Lumberyardroot.txt` file\.