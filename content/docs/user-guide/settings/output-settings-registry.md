---
title: Output the Settings Registry to a Stream with C++
linkTitle: Output the Settings Registry
description: Learn how to dump an in-memory Settings Registry to stream using C++ in Open 3D Engine (O3DE).
weight: 600
---

You might need to store the Settings Registry or a section of the Settings Registry to disk for later access. Sometimes, you might need to store the Settings Registry in a string within a running application for further processing. This topic provides examples of how to dump portions of the Settings Registry to disk at a specific key while either maintaining the ancestor JSON key hierarchy or excluding any ancestor key hierarchy.

## Use the `DumpSettingsRegistryToStream` function

In this example, the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function is used to store a section of the Settings Registry to a class that implements the `AZ::IO::GenericStream` interface.

```c++
//! Structure for configuring how values should be dumped from the Settings Registry
struct DumperSettings
{
    //! Determines if a PrettyWriter should be used when dumping the Settings Registry
    bool m_prettifyOutput{};
    //! Include filter that is used to indicate which paths of the Settings Registry
    //! should be traversed.
    //! If the include filter is empty, then all paths underneath the JSON pointer path are included
    //! Otherwise, the include filter is invoked, and if it returns true, traversal continues down the path
    AZStd::function<bool(AZStd::string_view path)> m_includeFilter;
};

//! Dumps the supplied Settings Registry at the path specified by key if it exist to the AZ::IO::GenericStream
//! @param key is a JSON pointer path to dumping settings recursively from
//! @param stream is an AZ::IO::GenericStream that supports writing
//! @param dumperSettings are used to determine how to format the dumped output
bool DumpSettingsRegistryToStream(SettingsRegistryInterface& registry, AZStd::string_view key,
    AZ::IO::GenericStream& stream, const DumperSettings& dumperSettings);
```

{{< important >}}
The results of `DumpSettingsRegistryToStream` are dumped relative to the `key` parameter.
{{< /important >}}

To better explain, consider the following sample in-memory Settings Registry instance:

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

Invoking the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function with a key parameter of `"/Amazon/Editor/Preferences"` as follows:

```c++
AZ::SettingsRegistryMergeUtils::DumperSettings dumperSettings;
dumperSettings.m_prettifyOutput = true;

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

This shows that the ancestor objects of "Amazon", "Editor", and "Preferences" don't output to the dumped text data. If you need to write out ancestor JSON objects to the Editor Preference settings, set the `m_jsonPointerPrefix` variable in the `DumperSettings`.

## Storing Editor Preferences using a key and an anchor

The following example invokes the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function with a key parameter of "/Amazon/Editor/Preferences" and sets the JSON pointer prefix parameter in the `DumperSettings` to "/Amazon/Editor/Preferences":

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

The preceding example generates the following result:

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

## Storing Editor Preferences using the root key and a filter

Dumping the entire root of the Settings Registry with an include filter writes the ancestor objects of a setting that is anchored to a specified key. The following example invokes the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function with a key parameter of "" (the root) and includes a filter that maintains any JSON objects that have a JSON pointer with the `"/Amazon/Editor/Preferences"` prefix:

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

The preceding example generates the following result:

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

By using an include filter, the hierarchy of JSON keys on the way to the Editor Preferences section are maintained and dumped into the output string.

## Saving a section of the Settings Registry to a file

The following example shows how to use the `SettingsRegistryMergeUtils::DumpSettingsRegistryToStream` function to save the Editor Preferences to a file the User local registry location (`<project-root>/User/Registry`):

```c++
//! Recurses over the entire Settings Registry to the Editor Preferences settings
//! The dumper settings is supplied an include filter to only the keys on the way to the editor preferences key of "/Amazon/Editor/Preferences"
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
