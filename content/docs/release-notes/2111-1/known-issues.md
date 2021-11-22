---
linktitle: Known Issues
title: Release Notes for Open 3D Engine 2111.1 - Known Issues
description: Known issues with Open 3D Engine release 2111.1.
weight: 4
---

* Certain 3rdParty python modules cannot load in the Editor runtime on Linux, which blocks multiple tests using `EditorPythonBindings`.
* MaterialType Default Values Not Initially Applied. When changing a default material property value, materials may continue using the prior default value. ([o3de/o3de#5213](https://github.com/o3de/o3de/issues/5213))
* MaterialType New Property Not Initially Applied. When adding new material properties, the Asset Processing may initially fail for material files, and the AP needs a re-scan or restart. ([o3de/o3de#5215](https://github.com/o3de/o3de/issues/5215))
* Server launchers are manually relocatable. There is currently no automated build or asset layout generation. See the [O3DE AWS GameLift Gem documentation](/docs/user-guide/gems/reference/aws/aws-gamelift) for the manual steps to perform build packaging.
* Monolithic release server builds are currently not supported.
* Network entity hierarchies are limited to hierarchies with max count of 16 entities.
* imgui keyboard not working in server launcher.
* Console is not working on server launcher.
