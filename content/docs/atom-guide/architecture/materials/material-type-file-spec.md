# Material Type File Specification
Material type files (`*.materialtype`) are in JSON format. This section goes over the material type file's schema. 

## JSON Structure
The material type file's JSON structure contains the following content. 

### **description**  
An attribute describing the material for user understanding.

### **propertyLayout**  
An object [TODO] 
* **version**: An attribute [TODO]   
* **groups**: An array of groups in the Inspector window of the Material Editor. Each group contains the following. 
  * **id**: An attribute used to identify this group. The value must be unique to other groups in this array. 
  * **displayName**: An attribute containing this group's name. The name appears in the Material Editor. 
  * **description**: An attribute that describes this group. The description will appear in the Material Editor.
* **properties**: An object defining groups of properties. Each group is defined as a key/value pair, where *key* is the user-given name, and *value* is an array of property definitions.

    In this example of `properties` structure, we define a property group named "general" which contains the properties, "enableDepth" and "enableShadows".   
    ```json
    "properties" : [
        "general" : [
            {
                "id": "enableDepth",
            },
            {
                "id": "enableShadows"
            }
        ]
    ]
    ```

### **shaders**  
An array of references to shader files (`*.shader`). Each reference is a JSON object that contains the attribute `file`. 

* **file**: An attribute that contains a relative path to the shader file. 

In this example, we reference the ShadowMap and DepthPass shaders. 
```JSON
"shaders": [
    {
        "file": "..ShadowMap.shader"
    },
    {
        "file": "..DepthPass.shader"
    }
]
```

### **functor**
An array of objects that contain functor data. Functors are defined in the C++ programming side which the functor data gets sent to. Each object contains the following: 
* **type**: The name of the functor. This name corresponds to the defined functor in the C++ side. 
* **args**: An object containing key/value pairs of all the arguments to send to this functor. 

### **uvNameMap** *(optional)*
[TODO]


## Material Properties
Material types define the material's properties. In the JSON structure, a material's properties are defined in the `properties` object contained in the `propertyLayout` object. Material properties support the following data types: 
- Bool
- Int
- UInt
- Float
- Vector2
- Vector3
- Vector4
- Color
- Image (file path)
- Enum