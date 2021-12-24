---
linktitle: Serialization
title: Object Serialization in Open 3D Engine
description: Serialize objects from the O3DE engine to XML, JSON, and other formats for processing by other tools or to load between runtime sessions.
---

 The O3DE engine offers object serialization to persist objects between sessions, transmit them between clients, or work with objects between the editor and the engine. The JSON-based serialization system is designed to be human-readable and -editable, while the XML system is used by many existing O3DE tools. O3DE also offers binary serialization, used internally by the Asset Processor.

 In this section of the documentation you'll learn how to register classes and enums for serialization, and how to use the JSON Serialization system. For more information on reflection using the serialization context, refer to [Serialization Context](/docs/user-guide/programming/components/reflection/serialization-context/) and [Reflecting a Component for Serialization and Editing](/docs/user-guide/programming/components/reflection/reflecting-for-serialization).
