# Material File Specification
Material files (`*.material`) are in JSON format. This section goes over the material file's JSON structure. 

## JSON Structure
The material file's JSON structure contains the following content. 

### **description** (*optional*)  
An attribute describing the material for user understanding.

### **parentMaterial** (*optional*)  
An attribute containing a path to the parent material file. Materials may inherit the properties of another parent material.

### **materialType**  
An attribute containing the path to the material type. Materials must reference a material type. 

### **propertyLayoutVersion**  
[TODO] An attribute .. 

### **properties**  
An object containing a list of properties that configure the material's appearance. The list of properties are defined by the material type. If this material has a parent material, it inherits the parent material's property values. 
  
*Note: For attribute values containing file paths, the root directory depends on the application. For BaseViewer, the path is relative to the material file or from the directory, `<root-directory>/dev/BaseViewer/`. For O3DE, the path is relative to the material file or from the directory `<root-directory>/dev/Gems/Atom/Feature/Common/Assets/`.*