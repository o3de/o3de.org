---
linktitle: 2111.2 Release Notes
title: Release Notes for Open 3D Engine 2111.2
description: Find out what was delivered in O3DE 2111.2
weight: 898
toc: true
---

Open 3D Engine release 2111.2 is a maintenance and quality of life improvement release based on 2111.1. This release is bugfix-only and contains no new features.

## Bug fixes

* Duplicate engine detection and help in Project Manager [#6984](https://github.com/o3de/o3de/pull/6984)
* Add MainPipeline to pass hierarchy for when HDR color grading component requests for the lut generation's image attachment. [#6436](https://github.com/o3de/o3de/pull/6436)
* fixes for stability [#6434](https://github.com/o3de/o3de/pull/6434) 
    * Fixed SRG updated related crash
    * Fixed SRG compile issue with metal which leads to multiple gpu crashes inlucde ImGuiPass render crash)
* Atom/qingtao/image builder fixes [#6432](https://github.com/o3de/o3de/pull/6432)
    * Fixed a editor hanging issue when preview texture with astc format (starts multiple job threads inside a job thread)
    * Fixed an issue of changing texture setting didn't trigger image re-process.
    * Fixed an issue with image asset which has texture setting may have dependency with wrong preset
    * Added a EIF_HDR for source image in hdr format.
    * Fixed astc compression issue which may wrongly compress image to HDR astc format
    * Fixed a regression issue with image builder which it can choose proper preset for images with alpha content.
* Ensure StoreTypeName stores the correct type for generic types [#6403](https://github.com/o3de/o3de/pull/6403)
* Force Project Manager to generate VS2019 projects on Windows [#6397](https://github.com/o3de/o3de/pull/6397)
* Change Vulkan RHI CommandList::SetStreamBuffers to not do 2 memory allocation per draw by using fixed_vector [#6393](https://github.com/o3de/o3de/pull/6393)
* Fix for change with axis gizmo labels not appearing ([#6256](https://github.com/o3de/o3de/pull/6256)) [#6387](https://github.com/o3de/o3de/pull/6387)
* Temporary fix for material component losing image overrides with prefabs [#6365](https://github.com/o3de/o3de/pull/6365)
* Fix PhysX Material Initialize issue [#6347](https://github.com/o3de/o3de/pull/6347)
* 51 Script Canvas Editor Fixes [#6345](https://github.com/o3de/o3de/pull/6345)
* Updated Visual Studio requirements text and doc link [#6312](https://github.com/o3de/o3de/pull/6312)
* Improve error messaging when duplicating entities before they are created [#6279](https://github.com/o3de/o3de/pull/6279)
* Fixed critical json property. [#6205](https://github.com/o3de/o3de/pull/6205)
* Fixed pivot offset when performing undo on Transform component [#6150](https://github.com/o3de/o3de/pull/6150)
* (In-progress) Updates to ViewportTitleDlg to better expose grid snapping visualization [#6997](https://github.com/o3de/o3de/pull/6997)
* (In-progress) Fix to allow installer to display correct build number when appended to the version [#6429](https://github.com/o3de/o3de/pull/6429)

## Known issues

* Project compilations fails if you install Open 3D Engine in a location, uninstall from that location, install in new location, uninstall from new location, then install in original location. Compilation will fail because Project Manager thinks the engine is already registered. If you encounter this issue, follow the instructions described at: https://github.com/o3de/o3de/issues/7115 
* Linux only: Closing Editor while Asset Processor is still running will result in a crash upon relaunching the Editor.
* Linux only: Editor crashes upon changing Display Mapper component's type to Reinhard while the Asset Processor is in the middle of processing an asset batch affected by this change. 
