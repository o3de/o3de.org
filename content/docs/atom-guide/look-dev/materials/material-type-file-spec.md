---
title: "Material Type File Specification"
description: "Material type files (`*.materialtype`) are in written JSON format."
toc: true
---

{{< preview-new >}}

Material type files (`*.materialtype`) are in written JSON format and contain the following elements.

### **propertyLayout**  
* **groups**: A list of property groups that appear in the **Inspector** window of the Material Editor. Each group contains the following:
  * **id**: An identifier for this group that is unique to this material type. The value must be formatted in C-style. 
  * **displayName**: The given name of this group that will appear in the Material Editor. 
  * **description**: The given description of this group that will appear as tooltips in the Material Editor.

{{< note >}}
  The `general` group is built-in and always available, even if there is no `general` group defined in the `groups` section. This group is typically used to contain any basic properties of this material type.
{{< /note >}}

* **properties**: Defines the groups of properties that can be configured in a material file. Each group is defined as a key/value pair, where *key* is the `group id`, and *value* is an array of property definitions. 

    Material properties support the following data types: 
    - Bool
    - Int
    - UInt
    - Float
    - Vector2
    - Vector3
    - Vector4
    - Color
    - Image
    - Enum


### **shaders**  
An array of references to shader files (*.shader*). Each reference contains the following values. 

* **file**: The path to the shader file. The path must be relative to the asset root or to the material type file.
* **tag**: A unique name for this shader item that can be used to reference the shader from other places in the material type definition. It must be a C-Style identifier.

In this example, we reference the ShadowMap and DepthPass shaders. 
```JSON
"shaders": [
    {
        "file": "../ShadowMap.shader",
        "tag": "shadowmap"
    },
    {
        "file": "../DepthPass.shader",
        "tag": "depth"
    }
]
```

### **functor**
An array of material functors. Each one reads material property values, performs some logic or calculations, and sets shader inputs accordingly. These can be defined in Lua or C++. Each functor data contains the following:

* **type**: The name of the functor type. This will be "Lua" for custom Lua script functors, or the name of specialized functor type (defined in C++).

* **args**: An object containing key/value pairs of all the arguments to send to this functor. The attributes vary depending on functor type. For 'Lua' functors, there is a single 'file' argument that references the Lua file. 

{{< todo >}}
Need a list of available functor types and their expected arguments. 
{{< /todo >}}

### **uvNameMap** *(optional)*
This array lists default identifiers for mesh UV streams. 

{{< todo >}}
Need a document about UV streams. 
{{< /todo >}}
