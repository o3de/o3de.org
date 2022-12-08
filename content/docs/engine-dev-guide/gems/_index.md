---
linkTitle: Gems
title: Open 3D Engine Core Gem Developer Documentation
description: Documentation for developers extending or contributing to the Gems bundled as part of Open 3D Engine.
weight: 300
---

{{< note >}}
This section of the documentation is for developers working on Gems distributed with O3DE, _not_ working on new Gems to add for their project. If you're a user looking to extend the engine through new functionality rather than modifying existing behavior, read the [User Guide - Gem Programming](/docs/user-guide/programming/gems) topic.
{{< /note >}}

In **Open 3D Engine (O3DE)**, **Gems** are the library components that can be added to any project for functionality. As part of the standard O3DE distribution,
multiple Gems needed for standard projects - such as the default rendering Gem, Atom - are provided. These Gems are maintained by the O3DE Project, and this
documentation is for those looking to contribute, modify existing Gems to fit their needs, or build sub-Gems that are extensions of an existing core Gem.

## Topics

{{< todo >}}
This is a stub page intended to serve as an example of guide structure. Information will be filled in and changed as the Engine Developer Guide is published.
{{< /todo >}}

| Name | Description |
|-|-|
| [Script Canvas](./gems/scriptcanvas) | Learn about the internals of the Script Canvas system, including how Script Canvas handles types and generates bindings from C++ source code. |