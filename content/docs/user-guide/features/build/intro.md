---
title: Open 3D Engine build system
description: >-
    Learn the basics of Open 3D Engine's support for the CMake build system, and get started with
    your first full build of the Open 3D Engine Source and Atom test project.
---

In order to support multiple native build toolchains, Open 3D Engine uses the [CMake build system](https://cmake.org/). While most configurable build systems make
it difficult to work cross-platform, CMake is intentionally designed to take generic configuration files and generate toolchain-specific ones. This is an alternative to other
build systems where compiler toolchains are explicitly called. With CMake, your first build of the O3DE core engine and editor can be as simple as:

{{< tabs >}}
{{< tab name="Windows" codelang="cmd">}}
beep boop
{{< /tab >}}
{{< /tabs >}}

{{< note >}}
While O3DE is in closed preview, you may need to manually set up and configure your 3rd party libraries before building. Reach out to the engineering team for instructions on getting integrated into the 3rdparty distribution system.
{{< /note >}}

For more detailed instructions on using the CMake build tools with O3DE, see [Configure and Build O3DE](./configure-and-build).

## Section topics

| Topic | Description |
| --- | --- |
| [Configure and Build](./configure-and-build.md) | Learn how to configure and build O3DE components and projects. |
| [CMake settings reference](./reference.md) | Reference for user-configurable CMake settings specific to O3DE. |
<!-- | [CMake files for Gems](./gems.md) | How to write a CMake build file to use with a custom gem. | -->
<!-- | [Third-party library distribution](./thirdparty.md) | How to integrate with the third party packaging download system for Gems which depend on other products. | -->
<!-- | [Troubleshooting](./troubleshooting.md) | How to debug and troubleshoot CMake and build problems. | -->
