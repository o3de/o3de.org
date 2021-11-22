---
linkTitle: Versioning Terminology
title: Open 3D Engine Versioning and Release Terminology
description: Read this topic to understand O3DE's versioning model and release terminology
weight: 200
---

## Open 3D Engine (O3DE) Version Numbering

O3DE source code is versioned using the `XXXX.X` numbering format. Larger numbers indicate later versions.
O3DE binaries are versioned using the `XX.XX` numbering format. The decimal place is moved to the left by 2 values from the original source code version, and any values after 4 are truncated. Larger numbers indicate later versions.

Example:

| Source code version | Binary package version |
|---------------------|------------------------|
| 1000.0              | 10.00                  |
| 1234.5              | 12.34                  |

## O3DE Release Terminology

* **Stable**: This feature is ready for users to actively develop using it. APIs and functionality can be considered stable and any significant new work will be captured in an RFC before changes are made.
* **Preview**: This feature is almost done and is stable. May still go through small changes.
* **Experimental**: This feature is a work-in-progress. Don't depend on it yet; it may go through significant changes.
