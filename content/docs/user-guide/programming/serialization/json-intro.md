---
title: JSON Object Serialization System
description: Serialize objects from Open 3D Engine (O3DE) to JSON for other tools to process, or to load between runtime sessions.
weight: 200
---

Objects can be serialized out to [JSON](http://json.org), a machine-readable format that's designed to be easy for humans to read and edit. With JSON, contributors can make small changes to data without requiring specialized tools or a detailed XML schema. Many programming languages also offer robust, easy-to-use support for JSON data, simplifying the development of build and design tools for supporting your project outside of **O3DE Editor**.

In **Open 3D Engine (O3DE)**, using the JSON serialization format also offers the following benefits:

* **Minimal serialization** -- Only data relevant to the object is serialized. Default values and information that can be retrieved at runtime aren't stored. This reduces object size and makes manual editing easier.
* **Best-effort deserialization** -- To complement the minimal serialization, the engine applies as much data as possible when deserializing. If a field is missing from the JSON input, default values are used. Fields in the JSON that the object doesn't support are ignored. This makes working with JSON less error-prone than XML, which requires a rigid structure.
* **Forgiveness** -- Because of the forgiving nature of JSON, O3DE can proceed with serialization and deserialization, even if it finds missing data, while emitting a warning (and optionally reporting an error). This extends to specialized data types that O3DE uses, such as vectors. (For example, if a 3D vector contains a 4th coordinate, O3DE simply ignores it and reports a warning.) This makes manual editing and custom tooling much safer.
* **Easier source control** -- Source control systems can have difficulty with merging or generating useful diffs with XML files. Because of JSON's flexibility and limited format, it's easier to work with JSON files as text files in your source control system.

 This section of the documentation covers serialization and deserialization of data in the JSON format, and how O3DE data types are mapped to JSON data types.

## Related topics

* [Serialize and Deserialize JSON Objects](json-serialize-deserialize)
* [JSON Serialization of O3DE Data Types](json-data-types)
