# Material File Specification
Material files (`*.material`) are in JSON format. This section goes over the material file's JSON structure. 

## JSON Structure
The material file's JSON structure contains the following content. 

<!-- ### **description** (*optional*)  
An attribute describing the material for user understanding. 

[DEV NOTE (according to @santorac): This is currently not part of the .material file spec. We do have a field for it in code but it is not hooked up to json. We don't have any tooling support to use this field, but will mayeb add in the future] -->

### **parentMaterial** (*optional*)  
An attribute containing a path to the parent material file. Materials may inherit the properties of another parent material. The parent material must have the same material type as the child material. The path may be relative to the asset root or relative to the material file.

### **materialType**  (*optional, if `parentMaterial` is specified*) 
An attribute containing the path to the material type. Materials must reference a material type. The path may be relative to the asset root or relative to the material file.

 This attribute is not required if `parentMaterial` is specified. If `parentMaterial` is specified and this attribute is left blank, the material inherits the parent material's `materialType`; if this attribute specifies a different material type from the parent material's, an error is reported.

<!-- ### **propertyLayoutVersion**  
[TODO] An attribute .. 

[DEV NOTE (according to @santorac): This is a placeholder for future functionality where we will automatically support backwards compatibility of .material files, when the .materialtype changes to say add, remove, or rename properties. It is not currently hooked up. And will likely rename it to materialTypeVersion] -->

### **properties**  
An object containing a tree structure of properties that configure the material's appearance. The tree of properties are defined by the material type. If this material has a parent material, it inherits the parent material's property values. 
```json
"properties" : {
    "propertyGroupName" : [
        {
            "propertyName": propertyValue,
            ...
        },
        ...
    ]
}
```
