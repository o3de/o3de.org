---
description: Settings Registry Scripting API with Examples
title: Accessing the Settings Registry via Scripting
linktitle: Accessing the Settings Registry via Scripting
weight: 400
---

1. [Settings Registry Exposed Script Functions](#settings-registry-exposed-script-functions)
1. [Example: Accessing the Settings Registry in Python](#example-accessing-the-settings-registry-in-python)
1. [Example: Accessing the Settings Registry in Lua](#example-accessing-the-settings-registry-in-lua)
1. [Limitations](#limitations)

Settings Registry Exposed Script Functions
===
The Settings Registry is bound to O3DE scripting languages via reflection to the Behavior Context

The following table details the Settings Registry API exposed to scripting languages.
The code that actually performs the reflection to the BehaviorContext can be found in the [SettingsRegistryScriptUtils](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryScriptUtils.cpp#L377-L390)

| API Name | Arguments | Description | Type |
|---|---|---|---|
| g\_SettingsRegistry | None | Global Property which provides access to the Global Settings Registry | Property |
| SettingsRegistryInterface| None | Abstract class which provides access to the Settings Registry \<key, value> setting, querying and removal functions | Class |
SettingsRegistry()| :returns: new SettingsRegistryImpl instance<br>:rtype: SettingsRegistryInterface | Function which creates a new Settings Registry object | Method |
| MergeSetting | :param json\_data: JSON string document to merge to Settings Registry<br>:type json\_data: str<br>:param format: Format of the json file being merged. By default this is Json Merge Patch<br>:type format: enum - (settingsregistry.JsonPatch, settingsregistry.JsonMergePatch\[default\])<br>:returns: bool indicating whether the JSON document was successfully merged<br>:rtype: bool| Merges the JSON document into the Settings Registry<br>Uses [JSON Merge Patch](https://tools.ietf.org/html/rfc7386#section-1) format by default | Method |
| MergeSettingFile | :param file\_path: Path to .setreg file to merge into Settings Registry<br>:type file\_path: str<br>:param json\_root\_key: JSON Pointer where merged json content should be rooted"<br>:type json\_root\_key: str<br>:param format: Format of the json file being merged. By default this is Json Merge Patch<br>:type format: enum - (settingsregistry.JsonPatch, settingsregistry.JsonMergePatch\[default\])<br>:returns: bool indicating whether the setreg was successfully merged<br>:rtype: bool | Merges the supplied .setreg file into the Settings Registry at the specified JSON Pointer<br>Uses the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386#section-1) format by default | Method |
| MergeSettingFolder | :param folder\_path: Directory containing .setreg files to merge into Settings Registry<br>:type folder\_path: str<br>:param specializations: List of tags to filter setreg files.<br>:type specializations: settingsregistry.Specializations<br>:param platform: OS Platform folder name to walk into when locating for \*.setreg files<br>:type str<br>:returns: True if the supplied folder was merged. Whether each specific file was merged successfully is not part of the return result<br>:rtype: bool | Merges Enumerates the .setreg files within the supplied folder and merges them into the Settings Registry<br>Uses the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386#section-1) format<br><br>Specializations are tags that are checked against the text between each pair of \<dots> within the setreg filename.<br>i.e The filename "cmake\_dependencies.automatedtesting.automatedtesting\_gamelauncher.setreg" contains two tags "automatedtesting" and "automatedtesting\_gamelauncher"<br><br>Each tag of the filename must match the tags specified in the specialization list<br>This table illustrates when a .setreg file will be loaded<br><br><table role="grid" resolved=""><thead><tr role="row" ><th data-column="0" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="filename: No sort applied, activate to apply an ascending sort"><div >filename</div></th><th  data-column="1" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Specializations: No sort applied, activate to apply an ascending sort"><div >Specializations</div></th><th data-column="2" tabindex="0" scope="col" role="columnheader" aria-disabled="false" unselectable="on" aria-sort="none" aria-label="Will Be Merged: No sort applied, activate to apply an ascending sort"><div >Will Be Merged</div></th></tr></thead><tbody aria-live="polite" aria-relevant="all"><tr role="row"><td >cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg</td><td ><p>automatedtesting<br>automatedtesting_game_launcher</p></td><td >Yes</td></tr><tr role="row"><td >cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg</td><td >automatedtesting</td><td >No</td></tr><tr role="row"><td >cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg</td><td >automatedtesting_game_launcher</td><td >No</td></tr><tr role="row"><td >cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg</td><td >&lt;None&gt;</td><td >No</td></tr><tr role="row"><td colspan="1" >cmake_dependencies.setreg</td><td colspan="1" >&lt;Any&gt;</td><td colspan="1" >Always</td></tr></tbody></table> | Method |
| DumpSettings |:param json\_pointer: JSON Pointer whose JSON value should be dumped<br>:type json\_pointer: str<br>:param outputString: Output variable which is populated with dumped content if successful<br>:type outputString: str<br>:returns: bool indicating whether the JSON value at the JSON Pointer was dumped successfully<br>:rtype: bool | Dumps the JSON value specified at the JSON Pointer if found within the Settings Registry<br>The result of the dumped value is store in the \`outputString\` argument<br><br>To dump the entire Settings Registry a json\_pointer of empty string("") must be provided | Method |
| GetBool |:param json\_pointer: JSON Pointer to lookup for boolean value<br>:type json\_pointer: str<br>:param boolValue: Output variable which is set with the bool result if successful<br>:type boolValue: bool<br>:returns: bool indicating whether a bool value was found at the JSON Pointer<br>:rtype: bool | Queries the Settings Registry for boolean value at the provided JSON Pointer<br>If a boolean is found its value is stored in the \`boolValue\` argument<br>Return Value ONLY indicates if a bool key was found, not it's value<br><br>The return value of GetBool indicates that the bool key at the specific JSON Pointer was found.<br>If the return value is \`True\`, then the actual value of the boolean is stored in \`boolValue\` | Method |
|SetBool|:param json\_pointer: JSON Pointer to JSON key where boolean value will be set<br>:type json\_pointer str<br>:param boolValue: Boolean value to set at the JSON Pointer<br>:type boolValue: bool<br>:returns: True if the value was successfully set at the JSON pointer<br>:rtype: bool | Sets the JSON Pointer to the boolean value within the Settings Registry | Method |
| GetInt | :param json\_pointer: JSON Pointer to lookup for integer value<br>:type json\_pointer: str<br>:param intValue: Output variable which is set with the int result if successful<br>:type intValue: int<br>:returns: bool indicating whether an int value was found at the JSON Pointer<br>:rtype: bool | Queries the Settings Registry for integer value at the provided JSON Pointer<br>If an integer is found its value is stored in the \`intValue\` argument |Method |
| SetInt | :param json\_pointer: JSON Pointer to JSON key where integer value will be set<br>:type json\_pointer str<br>:param intValue: Integer value to set at the JSON Pointer<br>:type intValue: int<br>:returns: True if the value was successfully set at the JSON pointer<br>:rtype: bool | Sets the JSON Pointer to the integer value within the Settings Registry | Method |
| GetFloat | :param json\_pointer: JSON Pointer to lookup for floating point value<br>:type json\_pointer: str<br>:param floatValue: Output variable which is set with the float result if successful<br>:type floatValue: float<br>:returns: bool indicating whether a floating point value was found at the JSON Pointer<br>:rtype: bool | Queries the Settings Registry for floating point value at the provided JSON Pointer<br>If a float is found its value is stored in the \`floatValue\` argument | Method |
| SetFloat | :param json\_pointer: JSON Pointer to JSON key where floating point value will be set<br>:type json\_pointer str<br>:param floatValue: Floating point value to set at the JSON Pointer<br>:type floatValue: float<br>:returns: True if the value was successfully set at the JSON pointer<br>:rtype: bool | Sets the JSON Pointer to the floating point value within the Settings Registry | Method |
| GetString | :param json\_pointer: JSON Pointer to lookup for string value<br>:type json\_pointer: str<br>:param stringValue: Output variable which is set with the string result if successful<br>:type stringValue: str<br>:returns: bool indicating whether a string value was found at the JSON Pointer<br>:rtype: bool | Queries the Settings Registry for string value at the provided JSON Pointer<br>If a string is found its value is stored in the \`stringValue\` argument | Method |
|SetString| :param json\_pointer: JSON Pointer to JSON key where string value will be set<br>:type json\_pointer str<br>:param stringValue: String value to set at the JSON Pointer<br>:type stringValue: str<br>:returns: True if the value was successfully set at the JSON pointer<br>:rtype: bool | Sets the JSON Pointer to the string value within the Settings Registry | Method |
| RemoveKey | :param json\_pointer: JSON Pointer to JSON key to remove.<br>:type json\_pointer str<br>:returns: True if the value existed within the Settings Registry and was removed<br>:rtype: bool | Removes the JSON key at the provided JSON Pointer if available.<br>This also has the effect of removing associated JSON value | Method |

Example: Accessing the Settings Registry in Python
==================================================

The Settings Registry can be accessed in Python whenever the Editor Python Bindings Gem is enabled.

Sample code of using the Settings Registry is below

**Python - Settings Registry**

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

    # Making a script local settings registry
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
        print("JSON in JSON Patch format has been merged successfully to the local settings registry")

    # Below is how the the MergeSettingsFile and MergeSettingsFolder could be used
    if localSettingsRegistry.MergeSettingsFile(ExampleTestFileSetreg):
        print(f"Successfully merged setreg file '{ExampleTestFileSetreg}' to local settings registry")
        registryVal = localSettingsRegistry.GetString('/AutomatedTesting/ScriptingTestArray/3')
        if registryVal:
        print(f"Settings Registry contains '/AutomatedTesting/ScriptingTestArray/3'='{registryVal.value()}' merged from the {ExampleTestFileSetreg}")

    # Add the 'folder' to the Settings Registry so that only non-specialized .setreg
    # and .setreg files which contains only a 'folder' tag are merged into the Setting Registry
    filetags = SettingsRegistry.Specializations()
    filetags.Append('folder')
    if localSettingsRegistry.MergeSettingsFolder(ExampleTestFolderSetreg, filetags):
        print(f"Successfully merged setreg folder '{ExampleTestFolderSetreg}' to local settings registry")
        registryVal = localSettingsRegistry.GetBool('/AutomatedTesting/Settings/IsFolder')
        if registryVal:
            print(f"Settings Registry contains '/AutomatedTesting/Settings/IsFolder'='{registryVal.value()}' merged from the {ExampleTestFolderSetreg} folder")

# Invoke main function
if __name__ == '__main__':
    test_settings_registry()
```

Example: Accessing the Settings Registry in Lua
===============================================

The settings registry is available in Lua via the Behavior Context bindings.
Below is an example of using the settings registry to access the frame capture settings in lua

**Lua - Settings Registry**

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

Limitations
===========

*   The API to register a notification AZ Event with the Settings Registry isn't exposed in Scripting(This is the SettingsRegistryInterface::RegisterNotifier API)
*   Setting/querying of complex AZ reflected types are not supported(This is the SettingsRegistryInterface::SetObject and SettingsRegistryInterface::GetObject API).

A workaround for accessing AZ reflected types in scripting is to use the DumpSettings and MergeSettings functions
