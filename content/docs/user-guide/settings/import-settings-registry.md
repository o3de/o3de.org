---
title: Settings Registry $import Chaining
linkTitle: Settings Registry $import
description: Learn how the Settings Registry can use the $import directive to merge additional settings registry files in Open 3D Engine (O3DE).
weight: 300
---

The Settings Registry supports the ability to merge additional Settings Registry files \[.setreg(patch)] via using the [JSON Importer Framework](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Serialization/Json/JsonImporter.h) within the O3DE.  
Any fields withingthe Settings Registry file that has the field name of `$import` can be used to specify additional `.setreg`, `.setregpatch` or any other json format files to merge to the Settings Registry.  
When a Settings Registry file is merged using the [Merge API](./developer-api#merge-api), it triggers the logic to look for `$import` directives within the settings file to gather a list of additional files to merge.
The order in which the additional files are merged are in a post-order traversal.  
The imported files are merged before the current Settings Registry file.  
Therefore the current file settings _overrides_ its `$import` directive settings.

## Chain import setreg file using a `$import` directive string

The following shows how to use the `$import` to merge another Settings Registry file using a string value.

### test.apple.setreg
```json
{
    "$import": "test.ios.setreg"
}
```

## Chain import setreg file using a `$import` directive object

The following shows how to use the `$import` to merge another Settings Registry file using a JSON object with a `filename` key

### test.ios.setreg
```json
{
    "$import": {
        "filename": "test.mobile.setreg"
    }
}
```

With the above approach, a chain of files to merge the Settings Registry can be triggered by merging a file via the `MergeSettingsFolder` or `MergeSettingsFile` API.
