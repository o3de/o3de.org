---
linkTitle: Engine Developer Guide
menuTitle: Engine Developer Guide
title: Open 3D Engine (O3DE) Engine Developer Guide
description: |
    Learn about the inner workings of O3DE architecture, frameworks, and Gems to perform custom modifications to O3DE and contribute back to source code.
weight: 700
toc: true
menu_uuid: engine
guide_img: "/images/engine-dev-guide/guide_img.png"
primary: true
---

Welcome to the **Open 3D Engine (O3DE) Engine Developer's Guide**. This guide is for advanced users who are looking for information on the internal
architecture of O3DE for the purposes of custom engine modifications or contributions back to the O3DE project. For users looking for information on how to
_extend_ the engine, see the [Programming for O3DE](/docs/user-guide/programming) documentation.

## Architecture

O3DE is a complicated suite of tools and libraries. In this section of the Engine Developer Guide, you'll discover information about the overall architecture of O3DE, design principles, and execution flow.

{{< todo >}}
This section is currently incomplete, with a stub example for application bootstrapping. As documentation is added for developers, this section will expand.
{{< /todo >}}

| Name | Description |
|-|-|
| [Project bootstrapping](./architecture/bootstrap) | Learn about the execution flow of project launchers and how O3DE loads libraries at project runtime. |


## O3DE Frameworks

The core of O3DE is distributed as a series of _frameworks_, required libraries that estabish the necessary elements for bootstrapping and running an O3DE project. Frameworks range from core functionality (`AzCore`) all the way to specialized subsystems such as the networking stack (`AzNetworking`). For developers who want to directly modify the internals of O3DE or connect custom Gems to these low-level frameworks, this information will help you.

{{< todo >}}
This section is currently incomplete, with a stub example for AzCore. As documentation is added for developers, this section will expand.
{{< /todo >}}

| Name | Description |
|-|-|
| [AzCore](./frameworks/azcore) | Learn about the core internals of Open 3D Engine such as memory management and the custom RTTI system. |

## Included Gems

Functionality common to many O3DE projects needed at runtime (such as rendering and scripting) is loaded through _Gems_, external libraries linked and loaded as part of an O3DE project. Gems are often use-case or technology-specific, and this section will help you understand how to contribute directly back to included Gems in O3DE or create
your own Gem as an extension that takes advantage of available functionality.

{{< todo >}}
This section is currently incomplete, with a stub example for the ScriptCanvas Gem. As documentation is added for developers, this section will expand.
{{< /todo >}}

| Name | Description |
|-|-|
| [Script Canvas](./gems/scriptcanvas) | Learn about the internals of the Script Canvas system, including how Script Canvas handles types and generates bindings from C++ source code. |
