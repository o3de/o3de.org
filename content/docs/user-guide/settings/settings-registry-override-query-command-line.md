---
description: How to access command line arguments using the Settings Registry
title: Accessing Command Line Arguments using the Settings Registry
linktitle: Accessing Command Line Arguments using the Settings Registry
weight: 400
---

1. [Overriding the Settings Registry via the "--regset" option](#overwriting-settings-registry-regset)
    1. [Launch Editor with the AutomatedTesting project](#launch-editor-with-the-automatedtesting-project)
1. [Retrieving the Command Line Parameters used to launch an Application from the Settings Registry](#retrieving-the-command-line-parameters-used-to-launch-an-application-from-the-settings-registry)
    1. [Settings Registry - Command Line Marshaling API](#settings-registry-command-line-marshaling-api)
    1. [Example - Retrieving all command line values stored within the Settings Registry](#example-query-command-line-values)

<a id="overwriting-settings-registry-regset"></a>
Overriding the Settings Registry using the "--regset" option
===

Any value within the Settings Registry can be overridden by specifying the json pointer path and the new value to set by using the "--regset" option.

The following illustrates how to override the Game Project for the Editor using the Settings Registry

[Launch Editor with the AutomatedTesting project](#launch-editor-with-the-automatedtesting-project)
---------------------------------------------------------------------------------------------------

```bash
${CMAKE_BINARY_DIR}/bin/profile/Editor.exe --regset="/Amazon/AzCore/Bootstrap/project-path=AutomatedTesting"
```

Retrieving the Command Line Parameters used to launch an Application from the Settings Registry
===============================================================================================

As part of the ComponentApplication initialization, the command line that was used to launch the application is parsed into optional and positional arguments and then stored within the Settings Registry.  
Positional parameters are arguments without any "option"(or key) associated with them.

Optional parameters have an "option" name associated with them such as "--project-path /path/to/project/root".
The option in this case is "project-path" and the value is "/path/to/project/root".  
There can be multiple values associated with a single option. So all of the values are stored within an array.

Command Line positional parameters are stored underneath the JSON pointer of `"/O3DE/Runtime/CommandLine/MiscValues"`  
Command Line optional parameters are stored underneath the JSON pointer of `"/O3DE/Runtime/CommandLine/Switches"`


<a id="settings-registry-command-line-marshaling-api"></a>
Settings Registry - Command Line Marshaling API
---------------------------------------------------------------------------------------------------

The Setting Registry Merge Utilities provides the functions of StoreCommandLineToRegistry and GetCommandLineFromRegistry. This can be used to query the command line parameters supplied to O3DE application.

```c++
//! Stores the command line settings into the Setting Registry
//! The arguments can be used later anywhere the command line is needed
void StoreCommandLineToRegistry(SettingsRegistryInterface& registry, const AZ::CommandLine& commandLine);

//! Query the command line settings from the Setting Registry and stores them
//! into the AZ::CommandLine instance
bool GetCommandLineFromRegistry(SettingsRegistryInterface& registry, AZ::CommandLine& commandLine);
```

Reference: [SettingsRegistryMergeUtils.h](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L265-L271)


<a id="example-query-command-line-values"></a>
Example - Retrieving all command line values stored within the Settings Registry
--------------------------------------------------------------------------------

An example of retrieving all command line arguments can be seen within the [SettingsRegistryMergeUtilsCommandLineFixture.CommandLineArguments\_MergeToSettingsRegistry\_Success](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/Tests/Settings/SettingsRegistryMergeUtilsTests.cpp#L661-L689) test.
