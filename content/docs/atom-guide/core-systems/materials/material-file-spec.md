---
title: "Material File Specification"
description: "Material files (`*.material`) are written in JSON format and contain the following elements."
date: 2021-03-04
toc: false
---

{{< preview-new >}}

Material files (`*.material`) are written in JSON format and contain the following elements.

<!-- ### **description** (*optional*)  
An attribute describing the material for user understanding. 

[DEV NOTE (according to @santorac): This is currently not part of the .material file spec. We do have a field for it in code but it is not hooked up to json. We don't have any tooling support to use this field, but will mayeb add in the future] -->

### **parentMaterial** (*optional*)  
The path to the parent material file. If specified, the material inherits the properties of another parent material. The parent material must have the same material type as the material. The path must be relative to the asset root or to the material file. If not specified, the material inherits directly from the materialType. 

### **materialType** (*optional, if `parentMaterial` is specified*)  
The path to the material type. Materials must reference a material type. The path must be relative to the asset root or to the material type file.

This attribute is not required if `parentMaterial` is specified. In that case, the material inherits the parent material's `materialType`. If this attribute specifies a different material type from the parent material's, an error is reported.

<!-- ### 
- **propertyLayoutVersion**  
    [TODO] An attribute .. 

[DEV NOTE (according to @santorac): This is a placeholder for future functionality where we will automatically support backwards compatibility of .material files, when the .materialtype changes to say add, remove, or rename properties. It is not currently hooked up. And will likely rename it to materialTypeVersion] -->