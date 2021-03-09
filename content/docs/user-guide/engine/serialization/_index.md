---
description: ' Serialize objects from the O3DE engine to XML or JSON for processing
  by other tools or to load between runtime sessions. '
linktitle: Serialization
title: Object serialization
---

{{< preview-migrated >}}

 The O3DE engine offers of object serialization to persist objects between sessions, transmit them between clients, or work with objects between the editor and the engine\. The JSON\-based serialization system is designed to be human\-readable and \-editable, while the XML system is used by many existing O3DE tools\. O3DE also offers binary serialization, used internally by the Asset Processor\.

 In this section of the documentation you'll learn how to register classes and enums for serialization, and how to work with JSON serializers\. For more information on XML serialization for use with O3DE tools, see [Serialization Context](/docs/user-guide/features/engine/serialization/entity-system-reflection-serialization-context.md) and [Reflecting a Component for Serialization and Editing](/docs/user-guide/features/engine/components/reflection.md)\.