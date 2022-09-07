---
title: "Material File Specification"
description: "Material files (`*.material`) are written in JSON format and contain the following elements."
toc: true
---

## Elements

Material files (`*.material`) are written in JSON format and contain the following elements.

### **description** (*optional*)  
Provides a description or comment from the material's author.

### **materialType**
The path to the material type. Materials must reference a material type, which provides the list of available properties and the shaders to use for rendering. The path must be relative to the asset root or to the material file.

### **materialTypeVersion** (*optional*)  

Indicates the version number of the material type that was used to create this material. The material type version update feature can use this to support backward compatibility with older versions of the material type. See [`version`](material-type-file-spec/#version) and [`versionUpdates`](material-type-file-spec/#versionupdates) in the Material Type File Specification.


### **parentMaterial** (*optional*)  
The path to the parent material file. If specified, the material inherits the properties of another parent material. The parent material must have the same material type as the material. The path must be relative to the asset root or to the material file. If not specified, the material inherits default values directly from the material type.

### **propertyValues**

Lists the names and values to set for material properties. Any properties that aren't specified here will inherit the value from the parent material if available or from the material type's default value. The JSON data type used for the values should match the property's data type as specified in the `.materialtype` file. However, some data type conversion is supported; for example, "1" can be used to set a float property to "1.0".

Image properties must have a path to the source image file. The path must be relative to the asset root or to the material file.

Enum properties must use one of the available enum values as specified by the property definition in the `.materialtype` file.

All other property types must be specified according to their standard JSON serialization. See [JSON Serialization of O3DE Data Types](/docs/user-guide/programming/serialization/json-data-types).

The following example demonstrates how to set a property of each possible data type.

### **properties** (deprecated)
An older version of the material file format organized properties by group in nested JSON objects. This is replaced by `propertyValues` (shown previously), which uses a flat list of property identifiers. The engine can still load the old format, but new material files must use the new format.

## Example

```json
{
    "description":  "This is an example only. The material type, parent, and properties don't exist.",
    "materialType": "Materials/Types/Example.materialtype",
    "materialTypeVersion": 6,
    "parentMaterial":  "Materials/ExampleParent.material",
    "propertyValues": {
        "example.MyBool": true,
        "example.MyInt": -1,
        "example.MyUInt": 1,
        "example.MyFloat": 1.0,
        "example.MyVector2": [1.0, 1.0],
        "example.MyVector3": [1.0, 1.0, 1.0],
        "example.MyVector4": [1.0, 1.0, 1.0, 1.0],
        "example.MyColor": [1.0, 1.0, 1.0, 1.0],
        "example.MyImage": "Textures/Default/default_basecolor.tif",
        "example.MyEnum": "Basic"
    }
}
```