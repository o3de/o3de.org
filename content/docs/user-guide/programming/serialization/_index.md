---
linktitle: Serialization
title: Object Serialization in O3DE
description: Serialize objects from Open 3D Engine (O3DE) to XML, JSON, and other formats for other tools to process, or to load between runtime sessions.
---

**Open 3D Engine (O3DE)** provides object serialization to persist objects between sessions, transmit them between clients, or work with objects between **O3DE Editor** and the engine. The JSON-based serialization system is designed to be human-readable and -editable, while the XML system is used by many existing O3DE tools. O3DE also offers binary serialization, used internally by **Asset Processor**.

In this section of the documentation, you'll learn how to register classes and enums for serialization, and how to use the JSON serialization system. For more information on reflection using the serialization context, refer to [Serialization Context in O3DE](/docs/user-guide/programming/components/reflection/serialization-context/) and [Reflecting a Component for Serialization and Editing](/docs/user-guide/programming/components/reflection/reflecting-for-serialization).
