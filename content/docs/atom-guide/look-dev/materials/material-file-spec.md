---
title: "Material File Specification"
description: "Material files (`*.material`) are written in JSON format and contain the following elements."
toc: true
---

{{< preview-new >}}

Material files (`*.material`) are written in JSON format and contain the following elements.

### **parentMaterial** (*optional*)  
The path to the parent material file. If specified, the material inherits the properties of another parent material. The parent material must have the same material type as the material. The path must be relative to the asset root or to the material file. If not specified, the material inherits directly from the materialType. 

### **materialType** (*optional, if `parentMaterial` is specified*)  
The path to the material type. Materials must reference a material type. The path must be relative to the asset root or to the material type file.

This attribute is not required if `parentMaterial` is specified. In that case, the material inherits the parent material's `materialType`. If this attribute specifies a different material type from the parent material's, an error is reported.
