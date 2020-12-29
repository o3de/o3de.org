# Object serialization to JSON format<a name="serialization-json-intro"></a>

 Starting with Lumberyard version 1\.25, objects can be serialized out to the [JSON format](http://json.org)\. JSON is a machine\-readable format that's also designed to be easy for humans to read and edit, so that contributors can make small changes to data without requiring specialized tools or a detailed XML schema\. Many programming languages also offer robust and easy to use support for JSON data, making the development of build and design tools for supporting your project outside of the Lumberyard editor easy\. 

 In Lumberyard, using the JSON serialization format also offers the following benefits: 
+  **Minimal serialization** – Only data relevant to the object is serialized\. Default values and information that can be retrieved at runtime aren't stored\. This reduces object size and makes manual editing easier\. 
+  **Best\-effort deserialization** – To complement the minimal serialization, the engine applies as much data as possible when deserializing\. If a field is missing from the JSON input, default values are used\. Fields in the JSON which aren't supported by the object are ignored\. This makes working with JSON less error\-prone than XML, which requires a rigid structure\. 
+  **Forgiving** – Because of the forgiving nature of JSON, serialization and deserialization can proceed even if it finds missing data while emitting a warning \(and optionally reporting an error\.\) This extends to specialized data types used by Lumberyard such as vectors: If a 3D vector contains a 4th coordinate, it's simply ignored and a warning is reported\. This makes manual editing and custom tooling much safer\. 
+  **Easier to use with source control** – Source control systems can have difficulty with merging or generating useful diffs with XML files\. Because of JSON's flexibility and limited format, it's easier to work with JSON files in your source control system as text files\. 

 This section of the documentation covers serialization and deserialization of data in the JSON format, and how Lumberyard data types are mapped to JSON data types\. 

**Topics**
+ [Serialize and deserialize JSON objects](serialization-json-serialize-deserialize.md)
+ [Data types in serialized JSON](serialization-json-data-types.md)