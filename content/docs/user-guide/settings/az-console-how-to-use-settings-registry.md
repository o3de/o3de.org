---
description: Describes how to execute AZ Console Commands using the Settings Registry
title: Using AZ::Conosle to access the Settings Registry
linktitle: Using AZ::Conosle to access the Settings Registry
weight: 400
---

Preamble
========

The AZ::Console has been extended with support for the Settings Registry to allow invoking console commands via setting a JSON value underneath a specific key in the Settings Registry.
The AZ::Console hooks into the Settings Registry Notification System as well as the JSON Patching Reporting system in order to detect changes to Settings Registry keys underneath the JSON object of "/Amazon/AzCore/Runtime/ConsoleCommands" and "/O3DE/Autoexec/ConsoleCommands"
Where to place a console command depends on whether the user desires the console command should be merged to the bootstrap.game.\<config>.\<platform>.setreg file and therefore in the GameLauncher/ServerLauncher



SettingsRegistry ConsoleCommand key differences

`/Amazon/AzCore/Runtime/ConsoleCommands` - ConsoleCommands underneath this object is NOT merged to the bootstrap.game.\<config>.\<platform>.setreg

`/O3DE/Autoexec/ConsoleCommands` - ConsoleCommands underneath this object is merged into the bootstrap.game.\<config>.\<platform>.setreg and therefore will execute in the GameLauncher/ServerLauncher



Running Console Commands from a file
====================================

The AZ::Console supports running console commands from a via the AZ::IConsole::ExecuteConfigFile() function.
That function is able to load console commands from Windows INI Style files(\*.cfg), JSON Merge Patch files which can be authored as normal json files(\*.setreg) and JSON Patch files(\*.setregpatch)

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
```

Settings Registry Merge Patch file with Console Commands(\*.setreg)
-------------------------------------------------------------------

**user.setreg**

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

Ex. Executing Console Commands from a config or Settings Registry file
----------------------------------------------------------------------

Config files as well Settings Registry files with the preceding content be executed using a single ExecuteConfigFile function in the AZ Console

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

Ex. Using the Settings Registry to modify the "t\_scale" CVar
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

The ComponentApplication loads .setreg(patch) files before any Gem Modules are loaded or activated in [ComponentApplication::Create](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Component/ComponentApplication.cpp#L628-L636).
The ComponentApplication also supports executing the "user.cfg" in the asset cache after Gem Modules are loaded, but before they activate. This can be seen in [ComponentApplication::CreateCommon](https://github.com/o3de/o3de/blob/stabilization/2110/Code/Framework/AzCore/AzCore/Component/ComponentApplication.cpp#L692-L702).

Any console commands that can not execute due to the Console Commands not being available due to the gems that define them not being loaded, adds those commands to a [deferred console command queue](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Console/Console.cpp#L612-L628).
When gems are loaded, any "deferred console commands" attempt to be [dispatched again at that point](https://github.com/o3de/o3de/blob/stabilization/2110/Code/Framework/AzCore/AzCore/Module/Module.h#L98-L113). Any commands that succeed are removed from the queue, while failed commands remain in [Console::ExecuteDeferredCommands](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Console/Console.cpp#L177-L186).

This guarantees that any console commands that are invoked before gems that define them are loaded, will be executed when those gems loaded.
Reference: [https://github.com/o3de/o3de/issues/2062](https://github.com/o3de/o3de/issues/2062)

Additional Info
===============

There is a counterpart page that details how to use the AZ::Console to modify values within the Settings Registry located at [Settings Registry How To - Use the Settings Registry with the AZ Console](./settings-registry-how-to-use-az-console.md)
