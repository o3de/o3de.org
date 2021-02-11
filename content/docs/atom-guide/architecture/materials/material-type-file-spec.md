# Material Type File Specification
Material type files (`*.materialtype`) are in JSON format. This section goes over the material type file's schema. 

## Material Types in Atom
Atom is built in with common material types you can create materials from. To suit individual needs, new material types can be created and configured by editing properties, shaders, and functors.

The material types in Atom include 
- **StandardPBR**  
    Our standard physically-based shading model. It is suitable for materials with varying metallic, reflectance, and roughness. For more information on StandardPBR material type, see _[TODO]__.   
File location: `<root folder\dev\Gems\Atom\Feature\Common\Assets\Materials\Types\StandardPBR.materialtype`
- **EnhancedPBR**  
An enhanced version of StandardPBR that features anisotropic material response to be used with Global Illumination. 
File location: `<root folder\dev\Gems\Atom\Feature\Common\Assets\Materials\Types\EnhancedPBR.materialtype`
- **MinimalPBR**  
    A simple PBR material type with three common properties: base color, metallic factor, and roughness factor.  
    File location: `<root folder>\dev\Gems\Atom\TestData\TestData\Materials\Types\MinimalPBR.materialtype`
- **AutoBrick**  
    A procedural brick material type that includes settings for color, ambient occlusion, brick (width, height, offset), and grout line(width, depth). This material type is an example of a completely custom material type, expanding from the MinimalPBR material type.  
    File location: `<root folder>\dev\Gems\Atom\TestData\TestData\Materials\Types\AutoBrick.materialtype`
    

## JSON Structure
The material type file's JSON structure contains the following elements. 

<!-- ### **description**  
An attribute describing the material for user understanding.

[DEV NOTE (according to @santorac): This field is not currently used by any of our tools, but in the future we may display it to the user. For example, in the Material Editor when creating a new material and browsing the available material types.] -->

### **propertyLayout**  

<!-- * **version**: A number that is used for backwards compatibility with material files via the material's `propertyLayoutVersion` number. 

[DEV NOTE (according to @santorac): Currently not hooked up to anything. In the future, will move into the top-level section of the .materialtype file.] -->

* **groups**: An array of groups in the Inspector window of the Material Editor. Each group contains the following:
  * **id**: An attribute used to identify this group. The value must be unique to other groups in this array. The value must also be formatted in C-style (start with alpha character, may contain alpha, numeric, and underscore characters). 
  * **displayName**: An attribute containing this group's name. The name appears in the Material Editor. 
  * **description**: An attribute that describes this group and displays in the Material Editor as tooltips.

  A `general` group is always available as a built-in group, even if there is no `general` group defined in the `groups` section. 

* **properties**: An object defining groups of properties. Each group is defined as a key/value pair, where *key* is the `group id`, and *value* is an array of property definitions. 

  For more information on what is included in `properties`, see the **Properties in Material Type files** section. 


### **shaders**  
An array of references to shader files (`*.shader`). Each reference is a JSON object that contains the attribute `file`. 

* **file**: An attribute that contains a relative path to the shader file. The path may be relative to the asset root or relative to the material type file.

In this example, we reference the ShadowMap and DepthPass shaders. 
```JSON
"shaders": [
    {
        "file": "../ShadowMap.shader"
    },
    {
        "file": "../DepthPass.shader"
    }
]
```

### **functor**
An array of objects that contain functor data. Functors are defined in the C++ or Lua programming side which the functor data gets sent to. Each functor data contains the following: 
* **type**: The name of the functor. This name corresponds to the defined functor in the C++ or Lua side. 
* **args**: An object containing key/value pairs of all the arguments to send to this functor. The attributes vary depending on functor type.

<!-- [DEV NOTE (according to @santorac): We need docs on each of our functor types, what they do, and what inputs they expect.] -->

### **uvNameMap** *(optional)*
This array lists default identifiers for mesh UV streams. If the artists uses these names for their UV streams in DCC (e.g. Maya), the engine will automatically connect those buffers to the appropriate UV stream in the shaders. 

In O3DE, artists can connect the streams in the Material Component. This is necessary if the UV stream names do not match. 


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

<!-- ## Properties in Material Type files
[WRITER NOTE: TODO.]
In this example of the `properties` structure, we define a property group named "baseColor" and its associated properties.   

    ```json
    "properties" : {
        "baseColor" : [
            {
                "id": "color",
                "displayName": "Color",
                "description": "Color is displayed as sRGB but the values are stored as linear color.",
                "type": "Color",
                "defaultValue": [ 1.0, 1.0, 1.0 ],
                "connection": {
                    "type": "ShaderInput",
                    "id": "m_baseColor"
                }
            },
            ...
        ]                        
        ...
    }
    ```

    * Property must include a "type" field. 
    * Expand this section to describe other fields -- especially teh "connections" will need an in-depth explanation.  -->