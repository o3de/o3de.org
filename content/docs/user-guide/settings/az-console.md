---
title: Access the Settings Registry with Console Commands
linktitle: Console Commands
description: Learn how to access the Settings Registry using AZ Console Commands in Open 3D Engine (O3DE).
weight: 400
---

The Settings Registry registers a list of commands with [AZ::Console](/docs/user-guide/programming/az-console/) that allow you to add, update, or delete a key within the Settings Registry, and dump keys to the Console output window.

## Console command list

Settings Registry Console commands have the prefix `sr_`, which stands for _Settings Registry_.

| <div style="width:150px">Command</div> | Description |
| :-- | :-- |
| `sr_regset` \<key> \<value> | Adds or modifies value at the specified key entry in the Settings Registry with the value argument. Multiple keys and values can be specified. |
| `sr_regremove` \<key> | Removes each key and its value from the Settings Registry. Multiple keys can be specified. |
| `sr_regdump` \<key> | Dumps each key value from the Settings Registry to the console output window. If multiple keys are specified, their values are separated by newlines. |
| `sr_regdumpall` | Dump the entire Settings Registry to the console output window. |
| `sr_regset_file` \<file path> \<anchor path> | Merges the Settings Registry file at the specified anchor path in the Settings Registry. The anchor path parameter merges the loaded settings under a specific settings object, for example, `"/O3DE/Settings"`. |
| `sr_dump_origin` \<key> | Outputs the filepath responsible for the latest modification of each key in the Settings Registry.  If the key was last updated in C++ or Script, then a value of "\<in-memory>" is output.  Multiple keys can be specified.  |

## Examples

### Use `sr_regset` to update or add a value

The following Console command examples update the project root path in the Settings Registry.

| Command | Result |
| --- | --- |
| `sr_regset /Amazon/AzCore/Bootstrap/project_path TestProject` | This example sets the "project_path" field under the "/Amazon/AzCore/Bootstrap" JSON object to "TestProject". |
| `sr_regset /Amazon/AzCore/Bootstrap/project_path ProjectPath With Spaces` | This example sets the "project_path" field under the "/Amazon/AzCore/Bootstrap" JSON object to "ProjectPath With Spaces". |

![](/images/user-guide/settings/update-setting.png)

### Use `sr_regremove` to remove a key value

The following Console command examples remove keys and their values from the Settings Registry.

| Command | Result |
| --- | --- |
| `sr_regremove /Amazon/AzCore/Bootstrap/project_path` | This removes the "project_path" field under the "/Amazon/AzCore/Bootstrap" JSON object. |
| `sr_regremove /Your/Custom/Setting1 /My/Custom/Setting2` | This removes both the "Setting1" field under the "/Your/Custom" JSON object and the "Setting2" field under the "/My/Custom" JSON object. |

![](/images/user-guide/settings/remove-setting.png)

### Use the `sr_regdump` command to output a value

The following Console command examples output the values of specified keys to the Console.

| Command | Result |
| --- | --- |
| `sr_regdump /Amazon/AzCore/Bootstrap/project_path` | This outputs current "project\_path" to the Console. |
| `sr_regdump /Your/Custom/Setting1 /My/Custom/Setting2` | This outputs both the "Setting1" field under the "/Your/Custom" JSON object and the "Setting2" field under the "/My/Custom" JSON object to the Console. |

![](/images/user-guide/settings/dump-setting.png)

### Use the `sr_regdumpall` command to output the entire Settings Registry

The following Console command outputs the entire Settings Registry to the Console.

| Command | Result |
| --- | --- |
| `sr_regdumpall` | This outputs the complete Settings Registry to the Console. |

![](/images/user-guide/settings/dump-all-settings.png)

### Use the `sr_dump_origin` command to output the filepath that last modified a key

The following Console command outputs the filepath responsible for the latest modification of each key to the Console.  The code block shows an example of merging 2 JSON files in order and querying the file origin of `"/Your/Custom/Setting1"`.

**file1.setreg**
```json
{
    "Your": { "Custom": { "Setting1": "initialValue"} }
}
```

**file2.setreg**
```json
{
    "Your": { "Custom": { "Setting1": "overrideValue"} }
}
```

| Command | Result |
| --- | --- |
| `sr_dump_origin /Your/Custom/Setting1` | This outputs the last file which modified "/Your/Custom/Setting1" key to the Console.  The return value is `file2.setreg` |

![](/images/user-guide/settings/dump-file-origin.png)

### Use the `sr_regset_file` command to merge a Settings Registry file

The following Console command merges a Settings Registry file to the Settings Registry from the Console. The file must be JSON formatted. The code block shows an example JSON file named `engine.json` with an example value for the `engine_name` key.

**engine.json**
```json
{
   "engine_name": "o3de"
}
```

| Command | Result |
| --- | --- |
| `sr_regset_file <engine-root>/engine.json` | Merges the `engine.json` file to the Settings Registry anchor to root key of "". |
| `sr_regset_file <engine-root>/engine.json /O3DE/EngineSettings` | Merges the `engine.json` file to the Settings Registry anchored to object of "/O3DE/EngineSettings". |

![](/images/user-guide/settings/merge-regset-file.png)
