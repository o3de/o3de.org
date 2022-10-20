---
linktitle: Supported Platforms
title: Supported Platforms in Open 3D Engine
description: Get a list of host platforms and target platforms supported by Open 3D Engine (O3DE).
weight: 250
toc: true
---

**Open 3D Engine (O3DE)** supports several _host platforms_ for creating and developing games and simulations, and _target platforms_ on which these projects can run.

### Host platforms

| Host Platform | Platform-specific Documentation |
| --- | --- |
| Microsoft Windows | <ul><li>[Windows prerequisites and configuration](requirements/#microsoft-windows)</li><li>[Installing O3DE for Windows](setup/installing-windows)</li><li>[Creating projects from the CLI on Windows](create/creating-projects-using-cli/creating-windows/)<sup>1</sup></li><li>[Building O3DE from source on Windows](setup/setup-from-github/building-windows/)</li></ul> |
| Linux | <ul><li>[Linux prerequisites and configuration](requirements/#linux)</li><li>[Installing O3DE for Linux](setup/installing-linux)</li><li>[Creating projects from the CLI on Linux](create/creating-projects-using-cli/creating-linux/)<sup>1</sup></li><li>[Building O3DE from source on Linux](setup/setup-from-github/building-linux/)</li></ul> |
| macOS | Support for developing on macOS is in an experimental stage. Refer to the [macOS section](requirements/#macos) of the System Requirements page for the basic requirements that you will need to get started. Ask on [Discord](https://{{< links/o3de-discord >}}) in #sig-platform for the latest setup instructions and additional help. |

<sup>1</sup> Platform-independent documentation on creating projects using **Project Manager** can be found [here](create/creating-projects-using-project-manager).

For minimum hardware requirements for development on host platforms, refer to [System Requirements](requirements).

### Target platforms

| Target Platform | Platform-specific Documentation |
| --- | --- |
| Microsoft Windows | <ul><li>[Creating a release layout for Windows](/docs/user-guide/packaging/windows-release-builds/)</li></ul> |
| Linux | <ul><li>[Platform development support for Linux](/docs/user-guide/platforms/linux/)</li></ul> |
| Android | <ul><li>[Platform development support for Android](/docs/user-guide/platforms/android/)</li></ul> |
| macOS | Support for macOS as a target platform is in an experimental stage. Ask on [Discord](https://{{< links/o3de-discord >}}) in #sig-platform for development support. |
| iOS | Support for iOS as a target platform is in an experimental stage. Ask on [Discord](https://{{< links/o3de-discord >}}) in #sig-platform for development support. |

{{< tip >}}
For information on the state of a feature for a platform, search for the feature in the snapshot of the *feature grid* for the version of O3DE that you have installed. The feature grid snapshot can be found in a subtopic of the Release Notes. (For example: [22.10.0 Feature Grid](/docs/release-notes/22-10-0/feature-state).)
{{< /tip >}}
