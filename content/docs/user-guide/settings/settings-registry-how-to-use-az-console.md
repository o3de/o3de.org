---
description: Describes how to access the Settings Registry using AZ Console Commands
title: Execute Console Commands through the Settings Registry
linktitle: Execute Console Commands through the Settings Registry
weight: 400
---

The Settings Registry Console Commands
======================================

The Settings Registry registers with the AZ Console a list of commands that allows adding, updating or deleting a key within the Settings Registry as well as dumping keys to the console output window.

All Settings Registry Console commands are prefixed with `sr_`, which stands for "Settings Registry". This provides easy discovery of settings registry commands

| Command List | Description |
| --- | --- |
| `sr_regset` \<key> \<value>+ | Adds or Modifies value at the specified \<key> entry with the value arguments in the global settings registry |
| `sr_regremove` \<key>+ | Removes each \<key> along with its value from the global settings registry |
| `sr\_regdump` \<key>+ | Dumps each \<key> value from the global settings registry to console output window. Multiple keys have there values separated by newlines |
| `sr_regdumpall` | Dump the entire settings registry to the console output window.<br>4KiB Console Output Limit<br>This might result in a large amount(> 4KiB) of output being sent to the output window depending on many entries are in the Setting Registry<br>The Console Output window has limit of 4096 characters that can be output from any single entry.<br>The full output will be sent to stdout though. |
| `sr_regset_file` \<file path> \[\<anchor path>\] | Merges the settings registry file at the specified path into the global settings registry.<br>The anchor path parameter can be specified to "anchor" the loaded settings under a specific settings object.<br>Ex. "/O3DE/Settings" |

Ex. Using the `sr_regset` command to updated or add a value
------------------------------------------------------------

By running the following console command, the game folder path can be updated within the Editor

| command | Result |
| --- | --- |
| `sr_regset /Amazon/AzCore/Bootstrap/project_path TestProject` | This sets the "project\_path" field under the "/Amazon/AzCore/Bootstrap" json object to "TestProject" |
| `sr_regset /Amazon/AzCore/Bootstrap/project_path ProjectPath With Spaces` | This sets the "project\_path" field under the "/Amazon/AzCore/Bootstrap" json object to "ProjectPath With Spaces" |

![](/images/user-guide/settings/settings-registry-how-to-console-regset.png)

Ex. Using the `sr_regremove` command to remove a key value
-----------------------------------------------------------

By running the following console command, the game folder path can be remove setting registry

| command | Result |
| --- | --- |
| `sr_regremove /Amazon/AzCore/Bootstrap/project_path` | This removes the "project\_path" field under the "/Amazon/AzCore/Bootstrap" json object |
| `sr_regremove /Your/Custom/Setting1 /My/Custom/Setting2` | This removes both the "Setting1" field under the "/Your/Custom" json object and the "Setting2" field under the "/My/Custom" json object |

![](/images/user-guide/settings/settings-registry-how-to-console-regremove.png)

Ex. Using the `sr_regdump` command to output a value to the console
--------------------------------------------------------------------

By running the following console command, the game folder path is dumped to the console output window

| Command | Result |
| --- | --- |
| `sr_regdump /Amazon/AzCore/Bootstrap/project_path` | This outputs current project\_path to the console |
| `sr_regdump /Your/Custom/Setting1 /My/Custom/Setting2` | This dumps to the console both the "Setting1" field under the "/Your/Custom" json object and the "Setting2" field under the "/My/Custom" json object |

![](/images/user-guide/settings/settings-registry-how-to-console-regdump.png)

Ex. Using the `sr_regdumpall` command to output the entire settings registry
-----------------------------------------------------------------------------

By running the following console command, the entire settings registry is dumped to the console

| Command | Result |
| --- | --- |
| `sr_regdumpall` | Outputs the complete settings registry to the console |

![](/images/user-guide/settings/settings-registry-how-to-console-regdumpall.png)

Ex. Using the `sr_regset_file` command to merge a Settings Registry file
--------------------------------------------------------------------------

By running the following console command, a settings register file can be merged to the Settings Registry from the command line. The file only needs to be JSON formatted.

Ex. Merging the engine.json file to the Settings Registry

[engine.json](#enginejson)
--------------------------

```json
{
   "engine_name": "o3de"
}
```

| Command | Result |
| --- | --- |
| `sr_regset_file <engine-root>/engine.json` | Merges the engine.json file to the settings registry anchor to root key of "" |
| `sr_regset_file <engine-root>/engine.json /O3DE/EngineSettings` | Merges the engine.json file to the settings registry anchored to object of "/O3DE/EngineSettings" |
