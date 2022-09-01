---
title: Issue Console Commands from the Settings Registry
linkTitle: Issue Console Commands
description: Learn how to run Console commands using the Settings Registry in Open 3D Engine (O3DE)
weight: 500
---

[AZ::Console](/docs/user-guide/programming/az-console/) allows you to initiate Console commands by setting a JSON value under a specific key in the Settings Registry. The Console hooks into the Settings Registry Notification system and also the JSON Patch reporting system to detect changes to Settings Registry keys underneath the following objects:

* `/O3DE/Autoexec/ConsoleCommands` - Console commands under this object are merged into `bootstrap.game.<config>.setreg` by the Settings Registry builder and are available to run in Launcher applications.
* `/Amazon/AzCore/Runtime/ConsoleCommands` - Console commands under this object are *not* merged to the `bootstrap.game.<config>.setreg` and will *not* run in Launcher applications.

{{< note >}}
In Launcher applications, Settings Registry files can only reliably load the [`bootstrap.game.<config>.setreg`](https://github.com/o3de/o3de/blob/6b62d1131116c074831902cb6e8d30271d673288/Code/Framework/AzGameFramework/AzGameFramework/Application/GameApplication.cpp#L90-L99) file in all build configuration and host platform combinations.
{{< /note >}}

## Run Console commands from a file

You can run Console commands from files by using the `AZ::IConsole::ExecuteConfigFile` function. The function can load Console commands from the following file types:

* Windows INI Style files (`.cfg`)
* JSON Merge Patch files (`.setreg`) - Can be authored as normal JSON files
* JSON Patch files (`.setregpatch`)

### Config file with Console commands(`.cfg`)

The following example demonstrates adding commands to a Windows-style `.cfg` file:

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

### Settings Registry file with Console commands (`.setreg`)

The settings underneath the "/O3DE/Autoexec/ConsoleCommands" object will be added to the aggregate `bootstrap.game.<config>.setreg` created by the Settings Registry builder when **Asset Processor** processes the `user.setreg` file. The `/Amazon/AzCore/Runtime/ConsoleCommands` settings will not be added because they are [excluded](https://github.com/o3de/o3de/blob/e878b06166dc4953b8c6c79b745375a1db7c341f/Registry/setregbuilder.assetprocessor.setreg#L22) in Asset Processor settings.

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
                    "ConsoleSettingsRegistryFixture.testClassFunc": "Argument1 Argument2 Argument3"
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

### Settings Registry Patch file with Console commands(`.setregpatch`)

The following example demonstrates adding commands to a `.setregpatch` file:

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

## Run Console commands from a config or Settings Registry file

You can run config files and Settings Registry files by using a single `ExecuteConfigFile` function in the Console.

```c++
auto console = AZ::Interface<AZ::IConsole>::Get();
console.ExecuteConfigFile(<path to [user.cfg|user.setreg|user.setregpatch]>);
```

Console commands within a specific config or Settings Registry file are run in the order that they appear in those files, from top to bottom.

The following is an example of running three Console commands using the JSON Merge Patch syntax:

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

The preceding commands run in the order that they appear in the JSON file (testInit → testBool → testChar).

## Run Console commands by updating a value in the Settings Registry

You can also run Console commands by modifying keys within the Settings Registry that are under the "/O3DE/Autoexec/ConsoleCommands" JSON object. The following example modifies a console variable (CVar):

**CVar Modification**

```c++
//! The AZ::IConsole::ConsoleAutoexecCommandKey variable is set to the Settings Registry Console commands root key:
//! "/O3DE/Autoexec/ConsoleCommands"
using FixedValueString = AZ::SettingsRegistryInterface::FixedValueString;
constexpr auto tScaleCVar = FixedValueString(AZ::IConsole::ConsoleRootCommandKey) + "/t_scale";
auto SettingsRegistry = AZ::SettingsRegistry::Get();
settingsRegistry->Set(tScaleCVar, "0.5");
```

## Sequencing when Console commands are invoked

`ComponentApplication` loads `.setreg` and `.setregpatch` files before any Gem modules are loaded or activated in [ComponentApplication::Create](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Component/ComponentApplication.cpp#L615-L622). The ComponentApplication also supports running the `user.cfg` in the asset cache after Gem Modules are loaded, but before they activate. You can see this in [ComponentApplication::CreateCommon](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Component/ComponentApplication.cpp#L679-L689).

Any Console commands that cannot run immediately are added to a [deferred Console command queue](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Console/Console.cpp#L612-L628). When Gems are eventually loaded, any deferred Console commands attempt to be [dispatched again](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Module/Module.h#L113). Commands that succeed are removed from the queue, while failed commands remain in the [queue](https://github.com/o3de/o3de/blob/6d5a045386e20bc0d587007a65cf32f5b33baadd/Code/Framework/AzCore/AzCore/Console/Console.cpp#L177-L186).

This guarantees that Console commands are still invoked even if the Gems that define them are loaded later.

{{< note >}}
Console commands that are deferred might not run in the same order as they would have, had they run immediately. For example, if a `.cfg` file contains the following Console commands:

```ini
immediateCommand1 42
deferredCommand2 35
immediateCommand3 28
```

Because the `deferredCommand2` cannot run immediately, it runs after all of the immediate commands, including the `immediateCommand3`.
{{< /note >}}

### Console command lifecycle

While not directly related to the Settings Registry being able to run Console commands, the following information describes when the application can potentially run Console commands in relation to other application lifecycle events.

1. Create the Settings Registry.
1. Create the AZ Console.
1. Merge all Settings Registry files (`.setreg`/`.setregpatch`) to the registry and attempt to invoke any Console commands underneath the monitored Settings Registry Console Command keys. Any commands that cannot run are added to the AZ Console deferred command queue.
1. Load Dynamic Modules (Gem modules). Sends the `GemsLoaded` lifecycle event. For each loaded Gem, deferred commands attempt to [execute](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Module/Module.h#L99-L114). Any that succeed are removed from the deferred command queue.
1. Attempt to run Console commands in the `user.cfg` from the Projects asset cache folder (usually `<project-root>/Cache/<platform>`).
1. Run Console commands specified on the command line. Specified using command option notation `-<console command name> <args>`). For example, `-loadlevel <levelname>`.
1. Activate System Components in Gems.
