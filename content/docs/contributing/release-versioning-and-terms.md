---
linkTitle: Versioning Terminology
title: Open 3D Engine Versioning and Release Terminology
description: Read this topic to understand O3DE's versioning model and release terminology
weight: 500
---

## Open 3D Engine (O3DE) Version Numbering

O3DE source code is versioned using the `XXXX.X` numbering format. Larger numbers indicate later versions.
O3DE binaries are versioned using the `XX.XX` numbering format. The decimal place is moved to the left by 2 values from the original source code version, and any values after 4 are truncated. Larger numbers indicate later versions.

Example:

| Source code version | Binary package version |
|---------------------|------------------------|
| 1000.0              | 10.00                  |
| 1234.5              | 12.34                  |

{{< note >}}
Given that we are a new open source community, this version numbering is subject to change for future releases pending discussions and alignment between SIG-Release, the marketing committee, and the technical steering committee. We are also considering the introduction of a friendly name schema for major versions of the engine. We invite any and all feedback and contributions from the community to help define a strategy for release terminology and friendly names for future iterations of O3DE [here](https://github.com/o3de/sig-release/issues/20).
{{< /note >}}

## O3DE Release Terminology

* **Stable**: This feature is ready for users to actively develop using it. APIs and functionality can be considered stable and any significant new work will be captured in an RFC before changes are made.
* **Preview**: This feature is almost done and is stable. May still go through small changes.
* **Experimental**: This feature is a work-in-progress. Don't depend on it yet; it may go through significant changes.
