# Material Type File Specification
Material type files (*.materialtype*) are in written JSON format and contain the following elements.

<!-- ### **description**  
An attribute describing the material for user understanding.

[DEV NOTE (according to @santorac): This field is not currently used by any of our tools, but in the future we may display it to the user. For example, in the Material Editor when creating a new material and browsing the available material types.] -->

### **propertyLayout**  

<!-- * **version**: A number that is used for backwards compatibility with material files via the material's `propertyLayoutVersion` number. 

[DEV NOTE (according to @santorac): Currently not hooked up to anything. In the future, will move into the top-level section of the .materialtype file.] -->

* **groups**: A list of property groups that will appear in the Inspector window of the Material Editor. Each group contains the following:
  * **id**: An identifier for this group that is unique to this material type. The value must be formatted in C-style. 
  * **displayName**: The given name of this group that will appear in the Material Editor. 
  * **description**: The given description of this group that will appear as tooltips in the Material Editor.

  *Note: The `general` group is built-in and always available, even if there is no `general` group defined in the `groups` section. This group is typically used to contain any basic properties of this material type.*

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
An array of references to shader files (*.shader*). Each reference contains the attribute `file`. 

* **file**: The path to the shader file. The path may be relative to the asset root or to the material type file.
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
<!-- [Future work] See [TBD link] for a list of available functor types. -->
* **args**: An object containing key/value pairs of all the arguments to send to this functor. The attributes vary depending on functor type. For 'Lua' functors, there is a single 'file' argument which references the lua file. 
<!-- [Future work] See [TBD link] for a list of available functor types and their expected arguments. -->

<!-- [DEV NOTE (according to @santorac): We need docs on each of our functor types, what they do, and what inputs they expect.] -->

### **uvNameMap** *(optional)*
This array lists default identifiers for mesh UV streams. 
<!-- [Future work] For more information on UV streams, see ___. 
- If the artists uses these names for their UV streams in DCC (e.g. Maya), the engine will automatically connect those buffers to the appropriate UV stream in the shaders. 

- In O3DE, artists can connect the streams in the Material Component. This is necessary if the UV stream names do not match. 
-->