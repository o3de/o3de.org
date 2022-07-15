---
description: Describes how to dump an in-memory Settings Registry using in C++
title: 'Output Settings Registry to Stream'
linktitle: 'Output Settings Registry to Stream'
weight: 400
---

- [Setting Registry Dump API](#setting-registry-dump-api)
    - [SettingsRegistryMergeUtils DumpSettingsRegistryToStream() function](#settingsregistrymergeutils-dumpsettingsregistrytostream-function)
        - [Example: Storing Editor Preferences using a key of "/Amazon/Editor/Preferences"](#dump-preferences-with-key)
        - [Example: Storing Editor Preferences using a key of "/Amazon/Editor/Preferences" with an Anchor of "Amazon/Editor/Preferences"](#dump-preferences-with-key-and-anchor)
        - [Example: Storing Editor Preferences using a key of "" and an include filter which maintains any JSON objects whose JSON pointer is a prefix of "/Amazon/Editor/Preferences"](#dump-preferences-with-key-and-include-filter)
        - [Example: Saving the Editor Preferences section of the Setting Registry to a file](#saving-preferences-to-file)

Setting Registry Dump API
===

You'll often need to store the Settings Registry or a section of the Settings Registry to disk for later access.
Sometimes, you'll need to store the Settings Registry in a string within a running application for further processing.

This page provides an example of how to dump portions of the Settings Registry to disk at a specific key, while either maintaining the ancestor JSON key hierarchy, or having the saved hierarchy not contain any ancestor key hierarchy.

SettingsRegistryMergeUtils DumpSettingsRegistryToStream function
------------------------------------------------------------------

The SettingsRegistryMergeUtils contains a DumpSettingsRegistryToStream function, which you can use to store a section of the Settings Registry to a class that implements the AZ::IO::GenericStream interface

**Settings Registry Merge Utils Dump API**

```c++
//! Structure for configuring how values should be dumped from the Settings Registry
struct DumperSettings
{
    //! Determines if a PrettyWriter should be used when dumping the Settings Registry
    bool m_prettifyOutput{};
    //! Include filter which is used to indicate which paths of the Settings Registry
    //! should be traversed.
    //! If the include filter is empty then all paths underneath the JSON pointer path are included
    //! otherwise the include filter invoked and if it returns true does it proceed with traversal continues down the path
    AZStd::function<bool(AZStd::string_view path)> m_includeFilter;
};

//! Dumps the supplied settings registry at the path specified by key if it exist to the AZ::IO::GenericStream
//! @param key is a JSON pointer path to dumping settings recursively from
//! @param stream is an AZ::IO::GenericStream that supports writing
//! @param dumperSettings are used to determine how to format the dumped output
bool DumpSettingsRegistryToStream(SettingsRegistryInterface& registry, AZStd::string_view key,
    AZ::IO::GenericStream& stream, const DumperSettings& dumperSettings);
```

Now some important facts to know about using the Settings Registry Merge Utils DumpSettingsRegistryToStream is that the settings are **dumped relative to the "key"** **parameter**.

To better explain, a sample in-memory settings registry instance is provided, as follows:

**Settings Registry View**

```json
{
    "Amazon":
    {
        "Editor":
        {
            "Preferences":
            {
                "EnablePrefabSystemUi": false,
                "QtSearchPaths":
                [
                    "Qt/bin",
                    "/usr/local/Qt/bin",
                    "C:/Program Files/Qt"
                ]
            }
        },
        "Engine":
        {
            "OtherSettings": 16
        }
    }
}
```

<a id="dump-preferences-with-key"></a>
### Example: Storing Editor Preferences using a key of `"/Amazon/Editor/Preferences"`

Invoking the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function with a key parameter of `"/Amazon/Editor/Preferences"` as follows

```c++
AZ::SettingsRegistryMergeUtils::DumperSettings dumperSettings;
dumperSettings.m_prettifyOutput = true;

auto registry = AZ::SettingsRegistry::Get();
AZStd::string stringBuffer;
AZ::IO::ByteContainerStream stringStream(&stringBuffer);
if (!AZ::SettingsRegistryMergeUtils::DumpSettingsRegistryToStream(*registry, "/Amazon/Editor/Preferences", stringStream, dumperSettings))
{
    AZ_Warning("SEditorSettings", false, R"(Unable to dump the Editor Preferences settings to from the settings registry)");
    return;
}

```

Results in:

**Dumping with a key of "/Amazon/Editor/Preferences"**

```json
{
    "EnablePrefabSystemUi": false,
    "QtSearchPaths":
    [
        "Qt/bin",
        "/usr/local/Qt/bin",
        "C:/Program Files/Qt"
    ]
}
```

This shows that the ancestor objects of "Amazon", "Editor", and "Preferences" aren't output to the dumped text data.
If the objective is to write out the ancestor JSON objects to the Editor Preference settings, then set the "m\_jsonPointerPrefix" variable in the DumperSettings.

<a id="dump-preferences-with-key-and-anchor"></a>
### Example: Storing Editor Preferences using a key of `"/Amazon/Editor/Preferences"` and Anchor of `"Amazon/Editor/Preferences"`

Invoking the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function with a key parameter of "/Amazon/Editor/Preferences" As well setting the JSON Pointer Prefix parameter in the DumperSettings to "/Amazon/Editor/Preferences"

```c++
AZ::SettingsRegistryMergeUtils::DumperSettings dumperSettings;
dumperSettings.m_prettifyOutput = true;
dumperSettings.m_jsonPointerPrefix = "/Amazon/Editor/Preferences";

auto registry = AZ::SettingsRegistry::Get();
AZStd::string stringBuffer;
AZ::IO::ByteContainerStream stringStream(&stringBuffer);
if (!AZ::SettingsRegistryMergeUtils::DumpSettingsRegistryToStream(*registry, "/Amazon/Editor/Preferences", stringStream, dumperSettings))
{
    AZ_Warning("SEditorSettings", false, R"(Unable to dump the Editor Preferences settings to from the Settings Registry)");
    return;
}
```

Results in:

**Dumping with a key of "/Amazon/Editor/Preferences" with that same anchor**

```json
{
    "Amazon":
    {
        "Editor":
        {
            "Preferences":
            {
                "EnablePrefabSystemUi": false,
                "QtSearchPaths":
                [
                    "Qt/bin",
                    "/usr/local/Qt/bin",
                    "C:/Program Files/Qt"
                ]
            }
        }
    }
}
```

Another way to write the ancestor objects of a setting that is anchored to a specified key is to dump the entire root of the Settings Registry, and use an include filter to filter out the other objects.

<a id="dump-preferences-with-key-and-include-filter"></a>
### Example: Storing Editor Preferences using a key of `""` and an include filter which maintains any JSON objects whose JSON pointer is a prefix of `"/Amazon/Editor/Preferences"`

Invoking the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function with a key parameter of "" and an include filter as follows

```c++
AZ::SettingsRegistryMergeUtils::DumperSettings dumperSettings;
dumperSettings.m_prettifyOutput = true;
//! Make sure that any JSON paths that are a prefix of the "/Amazon/Editor/Preferences" path are included in the dumped contents
dumperSettings.m_includeFilter = [](AZStd::string_view path)
{
    AZStd::string_view prefixPath("/Amazon/Editor/Preferences");
    return prefixPath.starts_with(path.substr(0, prefixPath.size()));
};

auto registry = AZ::SettingsRegistry::Get();
AZStd::string stringBuffer;
AZ::IO::ByteContainerStream stringStream(&stringBuffer);
if (!AZ::SettingsRegistryMergeUtils::DumpSettingsRegistryToStream(*registry, "", stringStream, dumperSettings))
{
    AZ_Warning("SEditorSettings", false, R"(Unable to dump the Editor Preferences settings to from the Settings Registry)");
    return;
}

```

Results in:

**Dumping with a key of "" and include filter**

```json
{
    "Amazon":
    {
        "Editor":
        {
            "Preferences":
            {
                "EnablePrefabSystemUi": false,
                "QtSearchPaths":
                [
                    "Qt/bin",
                    "/usr/local/Qt/bin",
                    "C:/Program Files/Qt"
                ]
            }
        }
    }
}
```

By using an include filter, the hierarchy of JSON keys on the way to the Editor Preferences section are maintained and dumped into the output string

<a id="saving-preferences-to-file"></a>
### Example: Saving the Editor Preferences section of the Setting Registry to a file

The following example shows how to use the SettingsRegistryMergeUtils DumpSettingsRegistryToStream function to save the Editor Preferences to a file the User local registry location(<project-root>/User/Registry).

**Dumping the Editor Preferences to a file** Expand source

```c++
//! Recurses over the entire Settings Registry to the Editor Preferences settings
//! The dumper settings is supplied an include filter to only they keys on the way to the editor preferences key of "/Amazon/Editor/Preferences"
//! as well as all settings below the"/Amazon/Editor/Preferences"
AZ::SettingsRegistryMergeUtils::DumperSettings dumperSettings;
dumperSettings.m_prettifyOutput = true;
dumperSettings.m_includeFilter = [](AZStd::string_view path)
{
    AZStd::string_view prefixPath("/Amazon/Editor/Preferences");
    return prefixPath.starts_with(path.substr(0, prefixPath.size()));
};
AZStd::string stringBuffer;
if (auto registry = AZ::SettingsRegistry::Get(); registry != nullptr)
{
    AZ::IO::ByteContainerStream stringStream(&stringBuffer);
    if (!AZ::SettingsRegistryMergeUtils::DumpSettingsRegistryToStream(*registry, "", stringStream, dumperSettings))
    {
        AZ_Warning("SEditorSettings", false, R"(Unable to dump the Editor Preferences settings to from the Settings Registry)");
        return;
    }
}

//! Resolve path to editorpreferences.setreg
auto fileIo = AZ::IO::FileIOBase::GetInstance();
AZ::IO::FixedMaxPath editorPreferencesFilePath = "user/Registry/editorpreferences.setreg";
if (fileIo == nullptr || !fileIo->ResolvePath(editorPreferencesFilePath, "@projectroot@/user/Registry/editorpreferences.setreg"))
{
    AZ_Warning("SEditorSettings", false, R"(Unable to resolve path "%s" to the Editor Preferences registry file\n)",
        editorPreferencesFilePath.c_str());
    return;
}

//! Save settings to the file on the editorpreferences.setreg file
bool saved{};
constexpr auto configurationMode = AZ::IO::SystemFile::SF_OPEN_CREATE
    | AZ::IO::SystemFile::SF_OPEN_CREATE_PATH
    | AZ::IO::SystemFile::SF_OPEN_WRITE_ONLY;
if (AZ::IO::SystemFile outputFile; outputFile.Open(editorPreferencesFilePath.c_str(), configurationMode))
{
    saved = outputFile.Write(stringBuffer.data(), stringBuffer.size()) == stringBuffer.size();
}

AZ_Warning("SEditorSettings", saved, R"(Unable to save Editor Preferences registry file to path "%s"\n)",
    editorPreferencesFilePath.c_str());
```
