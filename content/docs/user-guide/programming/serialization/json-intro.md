---
title: JSON Object Serialization System
description: Serialize objects from the O3DE engine to JSON for processing by other tools or to load between runtime sessions.
weight: 200
---

Objects can be serialized out to [JSON](http://json.org), a machine-readable format that's designed to be easy for humans to read and edit. With JSON, contributors can make small changes to data without requiring specialized tools or a detailed XML schema. Many programming languages also offer robust, easy-to-use support for JSON data, simplifying the development of build and design tools for supporting your project outside of **O3DE Editor**.

 In O3DE, using the JSON serialization format also offers the following benefits:
+  **Minimal serialization** - Only data relevant to the object is serialized. Default values and information that can be retrieved at runtime aren't stored. This reduces object size and makes manual editing easier.
+  **Best-effort deserialization** - To complement the minimal serialization, the engine applies as much data as possible when deserializing. If a field is missing from the JSON input, default values are used. Fields in the JSON which aren't supported by the object are ignored. This makes working with JSON less error-prone than XML, which requires a rigid structure.
+  **Forgiving** - Because of the forgiving nature of JSON, serialization and deserialization can proceed even if it finds missing data while emitting a warning (and optionally reporting an error.) This extends to specialized data types used by O3DE such as vectors: If a 3D vector contains a 4th coordinate, it's simply ignored and a warning is reported. This makes manual editing and custom tooling much safer.
+  **Easier to use with source control** - Source control systems can have difficulty with merging or generating useful diffs with XML files. Because of JSON's flexibility and limited format, it's easier to work with JSON files in your source control system as text files.

 This section of the documentation covers serialization and deserialization of data in the JSON format, and how O3DE data types are mapped to JSON data types.

**Topics**
+ [Serialize and Deserialize JSON Objects](json-serialize-deserialize)
+ [JSON Serialization of O3DE Data Types](json-data-types)
