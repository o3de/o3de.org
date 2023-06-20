---
title: Settings Registry $import Chaining
linkTitle: Settings Registry $import
description: Learn how the Settings Registry can use the $import directive to merge additional settings registry files in Open 3D Engine (O3DE).
weight: 300
---

The Settings Registry supports the ability to merge additional Settings Registry files `*.setreg(patch)` via the [JSON Importer Framework](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Serialization/Json/JsonImporter.h).  
Any field named `$import` within a Settings Registry file cab be used to specify additional `*.setreg`, `*.setregpatch` or any other JSON format files to merge to the Settings Registry.  

When a Settings Registry file is merged using the [Merge API](./developer-api#merge-api), it triggers the logic to look for `$import` directives within the settings file to merge additional JSON files.
The order in which the additional files are merged occur at the point where their `$import` directives are processed.  
Any setting that appears before the `$import` directive can be overridden by the JSON contents of the imported file.  
Any setting that appears after the `$import` directive will override and merge over the JSON contents of the imported file.

# Chain import setreg file using a `$import` directive string

The following shows how to use the `$import` directive to merge another Settings Registry file using a string value.

### test.apple.setreg
```json
{
    "pre_field": { "first": 1, "second": 2 },
    "$import": "test.ios.setreg",
    "post_field": { "1": 11, "2": 12 }
}
```

### test.ios.setreg
```json
{
    "pre_field": { "second": 202 },
    "post_field": { "2": 120 }
}
```

The merging the `test.apple.setreg` file results in the final JSON output that follows.

### Import Result
```json
{
    "pre_field": { "first": 1, "second": 202 },
    "post_field": { "1": 11, "2": 12 }
}
```

Notice that the `"pre_field"` that appear before the `$import` directive has its `"second"` field value (`202`) overridden by the imported `test.ios.setreg` file.  
Contrast the difference with the `"post_field"` that appears after the `$import` directive. The `"2"` field value (`12`) is from the original `test.apple.setreg` file.

# Chain import setreg file using a `$import` directive object

The following shows how to use the `$import` directive to merge another Settings Registry file using a JSON object with a `filename` key.

### test.android.setreg
```json
{
    "$import": {
        "filename": "test.mobile.setreg"
    }
}
```

# Importing multiple setreg file using a `$import` directive.

The following shows how multiple uses of the same `$import` key can be used to merge multiple Settings Registry files.

Given the following two Settings Registry files `number.setreg` and `string.setreg`, how the JSON contents are merged depends on the order they are specifed in the import file

## Example Data

### number.setreg
```json
{
    "1": 7,
    "2": 14
}
```

### string.setreg
```json
{
    "1": "Hello",
    "3": "World"
}
```

## Example 1
Merging the aggregate setreg file with the following contents will merge the `string.setreg` over of the `number.setreg`.

### aggregate.setreg
```json
{
    "$import": "number.setreg",
    "$import": "string.setreg"
}
```

The value of for key `"1"` is from the `string.setreg` file.
### aggregate.setreg (Post Import)
```json
{
    "1": "Hello",
    "2": 14,
    "3": "World"
}
```

## Example 2
Swapping the order of the `$import` directives changes the result of the values within the Settings Registry.

### aggregate2.setreg
```json
{
    "$import": "string.setreg",
    "$import": "number.setreg"
}
```

The value of key `"1"` is from the `number.setreg` file.
### aggregate2.setreg (Post Import)
```json
{
    "1": 7,
    "2": 14,
    "3": "World"
}
```

With the above approach you can merge a chain of files into the Settings Registry via the `MergeSettingsFolder` or `MergeSettingsFile` API.
