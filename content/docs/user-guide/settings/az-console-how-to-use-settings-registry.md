---
description: Describes how to execute AZ Console Commands using the Settings Registry
title: Using AZ::Console to access the Settings Registry
linktitle: Using AZ::Conosle to access the Settings Registry
weight: 400
---

Preamble
========

The AZ::Console has been extended with support for the Settings Registry to allow invoking console commands via setting a JSON value underneath a specific key in the Settings Registry.  
The AZ::Console hooks into the Settings Registry Notification System as well as the JSON Patch Reporting system in order to detect changes to Settings Registry keys underneath the following objects:
 1. `/O3DE/Autoexec/ConsoleCommands`
 2. `/Amazon/AzCore/Runtime/ConsoleCommands`


## SettingsRegistry Console Command keys differences:

`/O3DE/Autoexec/ConsoleCommands` - Console commands underneath this object are merged into the `bootstrap.game.<config>.setreg` by the SettingsRegistry Builder and are available to run in the Launcher applications.  
`/Amazon/AzCore/Runtime/ConsoleCommands` - Console commands underneath this object are NOT merged to the `bootstrap.game.<config>.setreg` and will not run in the launcher.

### Note: Launcher Settings file loading(GameLauncher/ServerLauncher)
In the launchers the settings registry files can only reliably load only the [bootstrap.game.\<config>.setreg](https://github.com/o3de/o3de/blob/6b62d1131116c074831902cb6e8d30271d673288/Code/Framework/AzGameFramework/AzGameFramework/Application/GameApplication.cpp#L90-L99) file in all build configurations and host platforms combinations.  


Running Console Commands from a file
====================================

The AZ::Console supports running console commands from a via the AZ::IConsole::ExecuteConfigFile() function.
That function is able to load console commands from:
1. Windows INI Style files(\*.cfg)
2. JSON Merge Patch files(\*.setreg) - Can be mostly authored as normal json files
3. JSON Patch files(\*.setregpatch)

Config file with Console Commands(\*.cfg)
-----------------------------------------

**user.cfg**

```ini
testInit = 3
testInit 3
testBool true
testChar Q
testUInt64 18446744073709551615
testFloat 1.0
testDouble 2
testString Stable
ConsoleSettingsRegistryFixture.testClassFunc Foo Bar Baz

LoadLevel path/to/level.spawnable
bg_ConnectToAssetProcessor false
```

Settings Registry Merge Patch file with Console Commands(\*.setreg)
-------------------------------------------------------------------

**user.setreg**

The settings underneath the "/O3DE/Autoexec/ConsoleCommands" object will be added to the aggregate `bootstrap.game.\<config>.setreg` created by the Settings Registry Builder as part of the AssetProcessor.
The `/Amazon/AzCore/Runtime/ConsoleComamnds` settings will not as they are [excluded](https://github.com/o3de/o3de/blob/e878b06166dc4953b8c6c79b745375a1db7c341f/Registry/setregbuilder.assetprocessor.setreg#L22) in AssetProcessor settings.

```json
{
    "Amazon": {
        "AzCore": {
            "Runtime": {
                "ConsoleCommands": {
                    "testInit": 3,
                    "testBool": true,
                    "testChar": "Q",
                    "testUInt64": 18446744073709551615,
                    "testFloat": 1.0,
                    "testDouble": 2,
                    "testString": "Stable",
                    "ConsoleSettingsRegistryFixture.testClassFunc": "Foo Bar Baz"
                }
            }
        }
    },
    "O3DE": {
        "Autoexec": {
            "ConsoleCommands": {
                "LoadLevel": "path/to/level.spawnable",
                "bg_ConnectToAssetProcessor": false
            }
        }
    }
}
```

Settings Registry Patch file with Console Commands(\*.setregpatch)
------------------------------------------------------------------

**user.setregpatch**

```json
[
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testInit", "value": 3 },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testBool", "value": true },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testChar", "value": "Q" },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testUInt64", "value": 18446744073709551615 },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testFloat", "value": 1.0 },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testDouble", "value": 2 },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/testString", "value": "Stable" },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/ConsoleSettingsRegistryFixture.testClassFunc", "value": "Foo Bar Baz" },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/LoadLevel", "value": "levels/levelname/levelname.spawnable" },
    { "op": "add", "path": "/O3DE/Autoexec/ConsoleCommands/bg_ConnectToAssetProcessor", "value": true }
]
```

**Executing Console Commands from a config or Settings Registry file**
----------------------------------------------------------------------

Config files, as well Settings Registry files with the preceding content, can be executed using a single ExecuteConfigFile function in the AZ Console

**Executing Console Commands**


```c++
auto console = AZ::Interface<AZ::IConsole>::Get();
console.ExecuteConfigFile(<path to [user.cfg|user.setreg|user.setregpatch]>);
```

Order in which ConsoleCommands are executed from a single file

Console commands within a specific config or settings registry file are executed in the order they appear in those files from top to bottom.

Here is an example of executing three console commands using the JSON Merge Patch syntax

**Ordering snippet**

```json
{
    "O3DE": {
        "Autoexec": {
            "ConsoleCommands": {
                "testInit": 3,
                "testBool": true,
                "testChar": "Q"
            }
        }
    }
}
```

Those commands would execute in order that were seen in the JSON file(testInit → testBool → testChar)

Running Console Commands via updating a value within the Settings Registry
==========================================================================

Running console commands can also be done via modifying keys within the Settings Registry, that are under the "/O3DE/Autoexec/ConsoleCommands" JSON object

**Using the Settings Registry to modify the `t_scale` CVar**
-------------------------------------------------------------

**CVar Modification**

```c++
//! The AZ::IConsole::ConsoleAutoexecCommandKey variable is set to the Settings Registry Console commands root key:
//! "/O3DE/Autoexec/ConsoleCommands"
using FixedValueString = AZ::SettingsRegistryInterface::FixedValueString;
constexpr auto tScaleCVar = FixedValueString(AZ::IConsole::ConsoleRootCommandKey) + "/t_scale;
auto SettingsRegistry = AZ::SettingsRegistry::Get();
settingsRegistry->Set(tScaleCVar, "0.5");
```

Timing of when Console Commands are invoked
===========================================

The ComponentApplication loads .setreg(patch) files before any Gem Modules are loaded or activated in [ComponentApplication::Create](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Component/ComponentApplication.cpp#L615-L622).  
The ComponentApplication also supports executing the "user.cfg" in the asset cache after Gem Modules are loaded, but before they activate. This can be seen in [ComponentApplication::CreateCommon](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Component/ComponentApplication.cpp#L679-L689).

Any console commands that cannot execute immediately, will be added to a [deferred console command queue](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Console/Console.cpp#L612-L628).  
Later on when gems are loaded, any "deferred console commands" will attempt to be [dispatched again at that point](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Module/Module.h#L113).  
Any commands that succeed are removed from the queue, while failed commands remain in the [queue](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Console/Console.cpp#L177-L186).

This guarantees that console commands that are still invoked even if the gems that define them are loaded afterwards.
Reference: [https://github.com/o3de/o3de/issues/2062](https://github.com/o3de/o3de/issues/2062)

### Info: Console Commands that are deferred might not execute in the same order as it would have in relation to immediate console commands
---
For example if given a cfg file that contains the following console commands.
```ini
immediateCommand1 42
deferredCommand2 35
immediateCommand3 28
```

Due to the  `deferredCommand2` not able to execute immediately, it will ultimately be executed after all the immediate commands including the `immediateCommand3`.



Additional Info
===============

## Console Command Lifecycle
---
While not directly related to the Settings registry being able execute console commands, the following information will explain when the Application can potentially run console commands in relation to other Application lifecycle events
1. Create the Settings Registry.
1. Create the AZ Console.
1. Merge all Settings Registry files(.setreg/.setregpatch) to the registry -> Will attempt to invoke any console commands underneath the monitored Settings Registry Console Command keys at this point.  
   Any commands that cannot execute are added to the AZ Console deferred command queue
1. Load Dynamic Modules(gem modules) -> Sends the "GemsLoaded" lifecycle event.
   For each loaded gem, deferred commands attempt to [execute](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Module/Module.h#L99-L114) and any that succeed are removed from the deferred command queue
1. Attempt to execute console commands in the user.cfg from the Projects asset cache folder(usually `<project-root>/Cache/<platform>`).
1. Execute console commands specified on the command line -> specified using command option notation [`-<console command name> <args>`].  
Such as `-loadlevel <levelname>`.
1. Activate System Components in Gems.


## Accessing the Settings Registry from the AZ Console

There is a counterpart page that details how to use the AZ::Console to modify values within the Settings Registry located at [Settings Registry How To - Use the Settings Registry with the AZ Console](./settings-registry-how-to-use-az-console.md)
