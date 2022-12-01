---
title: Settings Registry Script API
linkTitle: Script API
description: Learn how the Settings Registry Script API exposes the Settings Registry to Lua, Python, and Script Canvas in Open 3D Engine (O3DE).
weight: 300
---

The Settings Registry is bound to Open 3D Engine (O3DE) script languages via reflection to the Behavior Context. The code that performs the reflection to the Behavior Context is found in [SettingsRegistryScriptUtils](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryScriptUtils.cpp#L377-L390).

## API details

The following tables detail the Settings Registry API classes, properties, and methods exposed to script languages.

| Name | <div style="width:300px">Description</div> | Type | Arguments | Return |
| :-- | :-- | :-- | :-- | :-- |
| `SettingsRegistryInterface` | Abstract class that provides access to the Settings Registry `<key, value>` setting, querying, and removal functions. | Class | NA | NA |
| `g_SettingsRegistry` | Global Property that provides access to the Global Settings Registry. | Property | NA | NA |
| `SettingsRegistry` | Function that creates a new Settings Registry object. | Method | None | SettingsRegistryInterface |
| `MergeSetting` | Merges the supplied JSON document into the Settings Registry. Uses the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386#section-1) format by default. | Method | <ul><li>String `json_data` - JSON string document to merge to Settings Registry.</li><li>Enum `format` - Format of the JSON file being merged, by default, this is JsonMergePatch. Specify `settingsregistry.JsonPatch` or `settingsregistry.JsonMergePatch`(default).</li></ul> | Boolean |
| `MergeSettingFile` | Merges the supplied `.setreg` file into the Settings Registry at the specified JSON Pointer. Uses the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386#section-1) format by default. | Method | <ul><li>String `file_path` - Path to `.setreg` file to merge into Settings Registry.</li><li>String `json_root_key` - JSON Pointer where merged JSON content should be rooted.</li><li>Enum `format` - Format of the JSON file being merged, by default, this is JsonMergePatch. Specify `settingsregistry.JsonPatch` or `settingsregistry.JsonMergePatch`(default).</li></ul> | Boolean |
| `MergeSettingFolder` | Enumerates the `.setreg` files within the specified directory and merges them into the Settings Registry. Uses the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386#section-1) format.<br><br>Specializations are tags that are checked against the text between each pair of dots(*.*) within the `.setreg` filename. For example, the filename `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg` contains two tags *automatedtesting* and *automatedtesting_gamelauncher*. Each tag of the filename must match the tags specified in the specialization list.<br><br>Check the [MergeSettingFolder specialization table](#mergesettingfolder-specialization-table) below for more information.<br><br>Returns `True` if the supplied folder was merged. Whether each specific file was merged successfully is not part of the return result. | Method | <ul><li>String `folder_path` - Directory containing `.setreg` files to merge into Settings Registry.</li><li>List `specializations` - List of tags to filter `.setreg` files.</li><li>String `platform` - OS Platform folder name to walk when searching for `.setreg` files.</li></ul> | Boolean |
| `DumpSettings` | Dumps the JSON value specified at the JSON Pointer if found within the Settings Registry. The result of the dumped value is stored in the `outputString` argument.<br><br>To dump the entire Settings Registry, a `json_pointer` with an empty string ("") must be provided.<br><br>Returns `True` if the JSON value at the JSON Pointer was dumped successfully. | Method | <ul><li>String `json_pointer` - JSON Pointer whose JSON value should be dumped.</li><li>String `outputString` - Output variable that is populated with dumped JSON value content if successful.</li></ul> | Boolean |
| `GetBool` | Queries the Settings Registry for a boolean value at the provided JSON Pointer. If a boolean is found its value is stored in the `boolValue` argument.<br><br>The return value of `GetBool` indicates that a boolean key at the specific JSON Pointer was found. If the return value is `True`, then the actual value of the boolean is stored in `boolValue`. | Method | <ul><li>String `json_pointer` - JSON Pointer to lookup for the boolean value.</li><li>Boolean `boolValue` - Output variable which is set with the boolean result if successful.</li></ul> | Boolean |
| `SetBool` | Sets the JSON Pointer in the Settings Registry to the specified boolean value. | Method | <ul><li>String `json_pointer` - JSON Pointer to JSON key where the boolean value will be set.</li><li>Boolean `boolValue` - Boolean value to set at the JSON Pointer.</li></ul> | Boolean |
| `GetInt` | Queries the Settings Registry for an integer value at the provided JSON Pointer. If an integer is found, its value is stored in the `intValue` argument. | Method | <ul><li>String `json_pointer` - JSON Pointer to lookup for integer value.</li><li>Integer `intValue` - Output variable which is set with the integer result if successful.</li></ul> | Boolean |
| `SetInt` | Sets the JSON Pointer in the Settings Registry to the specified integer value. | Method | <ul><li>String `json_pointer` - JSON Pointer to JSON key where the integer value will be set.</li><li>Integer `intValue` - Integer value to set at the JSON Pointer.</li></ul> | Boolean |
| `GetFloat` | Queries the Settings Registry for a floating point value at the provided JSON Pointer. If a floating point value is found, its value is stored in the `floatValue` argument. | Method | <ul><li>String `json_pointer` - JSON Pointer to lookup for floating point value.</li><li>Float `floatValue` - Output variable which is set with the floating point result if successful.</li></ul> | Boolean |
| `SetFloat` | Sets the JSON Pointer in the Settings Registry to the specified floating point value. | Method | <ul><li>String `json_pointer` - JSON Pointer to JSON key where the floating point value will be set.</li><li>Float `floatValue` - Floating point value to set at the JSON Pointer.</li></ul> | Boolean |
| `GetString` | Queries the Settings Registry for a string value at the provided JSON Pointer. If a string is found, its value is stored in the `stringValue` argument. | Method | <ul><li>String `json_pointer` - JSON Pointer to lookup for the string value.</li><li>String `stringValue` - Output variable which is set with the string value result if successful.</li></ul> | Boolean |
| `SetString` | Sets the JSON Pointer in the Settings Registry to the specified string value. | Method | <ul><li>String `json_pointer` - JSON Pointer to the JSON key where the string value will be set.</li><li>String `stringValue` - String value to set at the JSON Pointer.</li></ul> | Boolean |
| `RemoveKey` | Removes the JSON key and value at the provided JSON Pointer if it exists. | Method | <ul><li>String `json_pointer` - JSON Pointer to JSON key to remove.</li></ul> | Boolean |

### `MergeSettingFolder` specialization table

The following table illustrates when a `.setreg` file will be merged by the `MergeSettingFolder` method.

| Filename | Specializations | Will be merged |
| :-- | :-- | :-- |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg` | automatedtesting<br>automatedtesting_game_launcher | Yes |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg` | automatedtesting | No |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg` | automatedtesting_game_launcher | No |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg` | <None> | No |
| `cmake_dependencies.setreg` | <Any> | Always |

## Examples

The Settings Registry can be accessed through O3DE's supported script languages, Lua and Python.

### Python example

To access the Settings Registry in Python, ensure the **Editor Python Bindings** Gem is enabled in your project. The following sample code demonstrates using Settings Registry API.

```python
import azlmbr.settingsregistry as SettingsRegistry
import os

ExampleTestFileSetreg = 'AutomatedTesting/Editor/Scripts/SettingsRegistry/example.file.setreg'
ExampleTestFolderSetreg = 'AutomatedTesting/Editor/Scripts/SettingsRegistry'

def test_settings_registry():
    # Access the Global Settings Registry and dump it to a string
    if SettingsRegistry.g_SettingsRegistry.IsValid():
        dumpedSettings = SettingsRegistry.g_SettingsRegistry.DumpSettings("")
        if dumpedSettings:
            print("Full Settings Registry dumped successfully\n{}", dumpedSettings.value())

    # Making a script local Settings Registry
    localSettingsRegistry = SettingsRegistry.SettingsRegistry()
    localSettingsRegistry.MergeSettings('''
    {
        "TestObject": {
            "boolValue": false,
            "intValue": 17,
            "floatValue": 32.0,
            "stringValue": "Hello World"
        }
    }''')

    registryVal = localSettingsRegistry.GetBool('/TestObject/boolValue')
    if registryVal:
        print(f"Bool value '{registryVal.value()}' found")
        registryVal = localSettingsRegistry.GetInt('/TestObject/intValue')

    if registryVal:
        print(f"Int value '{registryVal.value()}' found")
        registryVal = localSettingsRegistry.GetFloat('/TestObject/floatValue')

    if registryVal:
        print(f"Float value '{registryVal.value()}' found")

    registryVal = localSettingsRegistry.GetString('/TestObject/stringValue')
    if registryVal:
        print(f"String value '{registryVal.value()}' found")

    if localSettingsRegistry.SetBool('/TestObject/boolValue', True):
        registryVal = localSettingsRegistry.GetBool('/TestObject/boolValue')
        print(f"Bool value '{registryVal.value()}' set")

    if localSettingsRegistry.SetInt('/TestObject/intValue', 22):
        registryVal = localSettingsRegistry.GetInt('/TestObject/intValue')
        print(f"Int value '{registryVal.value()}' set")

    if localSettingsRegistry.SetFloat('/TestObject/floatValue', 16.0):
        registryVal = localSettingsRegistry.GetFloat('/TestObject/floatValue')
        print(f"Float value '{registryVal.value()}' set")

    if localSettingsRegistry.SetString('/TestObject/stringValue', 'Goodbye World'):
        registryVal = localSettingsRegistry.GetString('/TestObject/stringValue')
        print(f"String value '{registryVal.value()}' found")

    if localSettingsRegistry.RemoveKey('/TestObject/stringValue'):
        print("Key '/TestObject/stringValue' has been successfully removed")

    # Merge a Settings File using the JsonPatch format
    jsonPatchMerged = localSettingsRegistry.MergeSettings('''
        [
            { "op": "add", "path": "/TestObject", "value": {} },
            { "op": "add", "path": "/TestObject/boolValue", "value": false },
            { "op": "add", "path": "/TestObject/intValue", "value": 17 },
            { "op": "add", "path": "/TestObject/floatValue", "value": 32.0 },
            { "op": "add", "path": "/TestObject/stringValue", "value": "Hello World" },
            { "op": "add", "path": "/TestArray", "value": [] },
            { "op": "add", "path": "/TestArray/0", "value": { "intIndex": 3 } },
            { "op": "add", "path": "/TestArray/1", "value": { "intIndex": -55 } }
        ]''', SettingsRegistry.JsonPatch)

    if jsonPatchMerged:
        print("JSON in JSON Patch format has been merged successfully to the local Settings Registry")

    # Example usage of `MergeSettingsFile` and `MergeSettingsFolder`
    if localSettingsRegistry.MergeSettingsFile(ExampleTestFileSetreg):
        print(f"Successfully merged setreg file '{ExampleTestFileSetreg}' to local Settings Registry")
        registryVal = localSettingsRegistry.GetString('/AutomatedTesting/ScriptingTestArray/3')
        if registryVal:
            print(f"Settings Registry contains '/AutomatedTesting/ScriptingTestArray/3'='{registryVal.value()}' merged from the {ExampleTestFileSetreg}")

    # Add the 'folder' to the Settings Registry so that only non-specialized .setreg
    # and .setreg files that only contain a 'folder' tag are merged into the Setting Registry
    filetags = SettingsRegistry.Specializations()
    filetags.Append('folder')
    if localSettingsRegistry.MergeSettingsFolder(ExampleTestFolderSetreg, filetags):
        print(f"Successfully merged setreg folder '{ExampleTestFolderSetreg}' to local Settings Registry")
        registryVal = localSettingsRegistry.GetBool('/AutomatedTesting/Settings/IsFolder')
        if registryVal:
            print(f"Settings Registry contains '/AutomatedTesting/Settings/IsFolder'='{registryVal.value()}' merged from the {ExampleTestFolderSetreg} folder")

# Invoke main function
if __name__ == '__main__':
    test_settings_registry()
```

### Lua example

The Settings Registry is available in Lua via the Behavior Context bindings. The following example uses the Settings Registry to access the frame capture settings through Lua.

```lua
local OutputProfileData =
{
    Properties =
    {
        FrameDelayCount = 100,
        FrameCaptureCount = 100,
        ProfileName = "LevelFrameTiming",
        QuitOnComplete = true,
    },
    frameCount = 0,
    frameDelayCount = 0,
    frameCaptureCount = 0,
    captureCount = 0,
    quitOnComplete = false,
    profileName = "UninitializedName",
    outputFolder = "UninitializedPath",
    cpuTimingsOutputPath = "UninitializedPath",
    captureInProgress = false,
    active = false,
};

local FrameTimeRecordingActiveRegistryKey <const> = "/O3DE/Performance/FrameTimeRecording/Activate"
local FrameDelayCountRegistryKey <const> = "/O3DE/Performance/FrameTimeRecording/DelayCount"
local FrameCaptureCountRegistryKey <const> = "/O3DE/Performance/FrameTimeRecording/CaptureCount"
local ProfileNameRegistryKey <const> = "/O3DE/Performance/FrameTimeRecording/ProfileName"
local QuitOnCompleteRegistryKey <const> = "/O3DE/Performance/FrameTimeRecording/QuitOnComplete"
local SourceProjectUserPathRegistryKey <const> = "/O3DE/Runtime/FilePaths/SourceProjectUserPath"
local ConsoleCommandQuitRegistryKey <const> = "/Amazon/AzCore/Runtime/ConsoleCommands/quit"


function OutputProfileData:TryQuitOnComplete()
    if (self.quitOnComplete) then
        g_SettingsRegistry:SetString(ConsoleCommandQuitRegistryKey, "")
    end
end



function OutputProfileData:OnActivate()
    if (g_SettingsRegistry:IsValid()) then
        local quitOnCompleteValue = g_SettingsRegistry:GetBool(QuitOnCompleteRegistryKey)
        self.quitOnComplete = quitOnCompleteValue:value_or(self.Properties.QuitOnComplete)

        local frameTimeRecordingActivateValue = g_SettingsRegistry:GetBool(FrameTimeRecordingActiveRegistryKey)
        if (not frameTimeRecordingActivateValue:has_value() or not frameTimeRecordingActivateValue:value()) then
            Debug:Log("OutputProfileData:OnActivate - Missing registry setting to activate frame time recording, aborting data collection")
            self:TryQuitOnComplete()
            return
        end

        -- get path to user folder
        local pathToUserFolder = "InvalidPath/"
        local settingsRegistryResult =  g_SettingsRegistry:GetString(SourceProjectUserPathRegistryKey)
        if (settingsRegistryResult:has_value()) then
            pathToUserFolder = settingsRegistryResult:value()
        else
            Debug:Log("OutputProfileData:OnActivate - Unable to resolve the SourceProjectUserPath, aborting data collection")
            self:TryQuitOnComplete()
            return
        end

        -- get any registry property overrides
        local frameDelayCountValue = g_SettingsRegistry:GetUInt(FrameDelayCountRegistryKey)
        self.frameDelayCount = frameDelayCountValue:value_or(self.Properties.FrameDelayCount)
        local frameCaptureCountValue = g_SettingsRegistry:GetUInt(FrameCaptureCountRegistryKey)
        self.frameCaptureCount = frameCaptureCountValue:value_or(self.Properties.FrameCaptureCount)
        local profileNameValue = g_SettingsRegistry:GetString(ProfileNameRegistryKey)
        self.profileName = profileNameValue:value_or(self.Properties.ProfileName)
    end
end


function OutputProfileData:OnDeactivate()
end

return OutputProfileData
```

## Limitations

* The API to register a notification AZ Event with the Settings Registry isn't exposed in script (this is the `SettingsRegistryInterface::RegisterNotifier` API).
* Setting/querying of complex AZ reflected types is not supported (this is the `SettingsRegistryInterface::SetObject` and `SettingsRegistryInterface::GetObject` API).

A workaround for accessing AZ reflected types in script is to use the `DumpSettings` and `MergeSettings` functions.
