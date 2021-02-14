---
description: ' Serialize objects from the Lumberyard engine to XML or JSON for processing
  by other tools or to load between runtime sessions. '
title: Object serialization
---
# Object serialization {#serialization-intro}

 The Lumberyard engine offers of object serialization to persist objects between sessions, transmit them between clients, or work with objects between the editor and the engine\. The JSON\-based serialization system is designed to be human\-readable and \-editable, while the XML system is used by many existing Lumberyard tools\. Lumberyard also offers binary serialization, used internally by the Asset Processor\.

 In this section of the documentation you'll learn how to register classes and enums for serialization, and how to work with JSON serializers\. For more information on XML serialization for use with Lumberyard tools, see [Serialization Context](/docs/user-guide/features/engine/serialization/entity-system-reflection-serialization-context.md) and [Reflecting a Component for Serialization and Editing](/docs/user-guide/features/engine/components/reflection.md)\.