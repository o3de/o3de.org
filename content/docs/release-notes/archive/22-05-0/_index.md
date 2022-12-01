---
linkTitle: 22.05.0 Release Notes
title: Release Notes for Open 3D Engine 22.05.0
description: Full release notes for Open 3D Engine (O3DE) version 22.05.0.
weight: 897
toc: true
---

**Open 3D Engine (O3DE)** version 22.05.0 represents the project's first major release of 2022. This release has seen 1,469 code submissions that contain bug fixes, quality of life improvements, and feature additions. Starting with this release, our release notes will include a [feature grid](./feature-state/) representing the current state of development for each feature in O3DE.

## Highlights for 22.05.0

First of all: Open 3D Engine has a new logo!

This release also sees the introduction of User Defined Properties (UDP), a way to read metadata from source assets into the Asset Processor. UDP can be assigned in content creation tools to store custom properties about hierarchy nodes such as mesh, light, animation nodes, etc., to power asset generation workflows for O3DE. For more information, read our [blog post on UDP](https://o3de.org/blog/posts/blog-udp/).

We've also included an experimental Gem in this release for motion matching. Motion matching is a data-driven animation technique that synthesizes motions based on existing animation data and the current actor and input contexts. The example Gem includes a character prefab, controllable using a gamepad. Find more details on the supported features and how things work internally in the [Motion Matching Gem code](https://github.com/o3de/o3de/tree/development/Gems/MotionMatching) in our GitHub repository.

Atom has received some improvements too! Gems now have the capability to inject custom passes to the rendering pipeline at runtime! Previously, it was cumbersome for a Gem to introduce new passes to the render pipeline. Project developers would have to modify existing assets or copy-and-paste an entire rendering pipeline. In 22.05.0, a new set of APIs is now available to facilitate customization of the render pipeline. This technology is already being used in the TressFX, Terrain, and LyShine Gems. For more information on the API, read the [O3DE wiki documentation on developing passes in Gems](https://github.com/o3de/o3de/wiki/Work-With-Passes-In-Gems).

And to further reduce copy-and-paste, material types are now more reusable with Atom. Material JSON files can now reference another file to load base properties from, and then override any values that need to be customized for sub-materials. For information on this feature, read the [Remixable Material Types RFC](https://github.com/o3de/sig-graphics-audio/issues/16).

Our last major feature callout is that the Multiplayer Gem now includes support for player-entity spawners. This gives project developers the ability to set locations where user-controlled entities will appear when joining a session, and changes the ownership of spawned network prefabs to the project code using the Multiplayer Gem. Because this is an important change to memory ownership for any project using the Multiplayer Gem, we recommend that developers refer to the examples of spawner logic used in the [O3DE Multiplayer Sample](https://github.com/o3de/o3de-multiplayersample).

## Features and bug fixes

The following is a list of other features and fixes of note included in 22.05.0.

* **Audio**
  * Improved Audio Controls Editor: Adds new connection properties for audio engines. ([6480](https://github.com/o3de/o3de/pull/6480), [6303](https://github.com/o3de/o3de/pull/6303))
* **Asset Pipeline**
  * Prefabs as product of scene processing: Adds a new way to create prefabs by generating them during the Asset Pipeline's scene builder. 
  * Default prefab generation for scene files: The Prefab gem will automatically create a default procedural prefab for each source scene asset (such as an STL or FBX file) if no scene manifest is discovered.
  * O3DE's AssImp integration now matches other 3rd party libraries for O3DE. ([3p-package-source/75](https://github.com/o3de/3p-package-source/pull/75))
  * Full scan time for Automated Testing is down from ~2.5 minutes to ~40 seconds. ([6619](https://github.com/o3de/o3de/pull/6619))
  * Job Dependencies on products: Allows Asset Builders to provide a list of products they specifically depend on to better schedule and control CreateJobs flow in Asset Processor. ([RFC](https://github.com/o3de/sig-core/issues/28))
* **Character**
  * Atom Render Viewport: Animation Editor now uses Atom. This improves performance significantly, the rendering in Animation Editor is now comparable to what one would expect in-game, and Animation Editor Viewport is now consistent with other O3DE viewports. The legacy OpenGL render viewport for Animation Editor is now deprecated.
* **Editor**
  * Generic DOM: Core framework update to support Document Property Editor.
* **Entities & Prefabs**
  * Improved Script Canvas support for spawning: Previously, it was only possible to spawn entities using Script Canvas with `SpawnAllEntities`. This feature expands spawnable API functionality for Script Canvas. It provides more fine-grained control over the spawning workflow and spawnable lifecycle as well as better support for handling multiple prefabs.
  * Slice deprecation in AutomatedTesting: The AutomatedTesting project has been converted to use prefabs for all tests (previously, there were many that used the former system, Slices). ([7006](https://github.com/o3de/o3de/issues/7006))
* **Physics**
  * Remove legacy timing/tick system: The legacy tick/timer system has been completely removed, and a new timer for O3DE has been added. All systems have been updated to use the new timer. This serves as the foundation for future tick system updates and improvements. The previous smoothing logic was also removed.
  * Upgrade Physics automated tests: All physics automated tests have been updated to use Prefabs instead of Slices (including PhysX, Cloth, and Blast). In most cases, tests are using the new test framework. Several are also now running in parallel.
* **Installer**
  * Installer validation tests: These tests verify that an installer build is valid. The automated tests verify that: key binaries exist, o3de.exe registers the engine, project creation succeeds, project compilation succeeds, Asset Processor batch processing succeeds, Editor runs, the game launcher runs, uninstall succeeds, and o3de.exe unregisters the engine. Currently run nightly for O3DE, though the tests are designed so anyone can plug them into their quality verification process. ([7834](https://github.com/o3de/o3de/pull/7834))
* **Script Canvas**
  * Script Canvas now has a "mini map" feature that helps visualize and navigate graphs. ([6263](https://github.com/o3de/o3de/pull/6263))
* **Templates**
  * Default component template: A new template is available to help you create components. Use the `o3de` CLI script and the `create-from-template` command to create a new runtime component from the **DefaultComponent** template. For detailed instructions refer to [Creating a Component in O3DE](/docs/user-guide/programming/components/create-component/). ([8462](https://github.com/o3de/o3de/pull/8462))
* **Viewport**
  * Camera Editor View Bookmarks: *View Bookmarks* add the ability to store local view transforms with level prefabs. They have been designed as a solid foundation to expand on for all prefabs in the scene. The View Bookmark system aims to allow the user to store different view bookmarks for a root (level) prefab. These bookmarks can be stored locally (currently in the Settings Registry). In the future, they will be able to be shared in any prefab. Bookmarks can be set with **Ctrl-&lt;Function Key&gt;** and restored with **Shift-&lt;Function Key&gt;**. Currently, a maximum of 12 can be set per level. ([7855](https://github.com/o3de/o3de/pull/7855), [8400](https://github.com/o3de/o3de/pull/8400))
  * Experimental Editor Mode Visual Feedback: To make the experience of using the Viewport more intuitive, additional rendering functionality is being investigated to improve feedback and usability. Editor Mode Visual Feedback is at a very early stage and can be toggled on in the Settings Registry (`--regset=/Amazon/Preferences/EnableEditorModeFeedback=true`). ([8235](https://github.com/o3de/o3de/pull/8235), [3458](https://github.com/o3de/o3de/issues/3458))
  * Prefabs Focus Mode improvements: A number of fixes and quality of life improvements have been added to Focus Mode prefab editing. Now **Ctrl-S** will save the focused prefab, not the entire scene. Focus Mode breadcrumbs now have icons, the right-click context menu grouping has been improved, and it has received several other small fixes and updates.
  * Cursor wrap mode for manipulators: The cursor can now be set to wrap around the Viewport during Editor navigation. This feature is off by default and can be turned on in the settings registry with `--regset=/Amazon/Preferences/Editor/Manipulator/ManipulatorMouseWrapSetting=true`. ([5155](https://github.com/o3de/o3de/pull/5155))
* **Atom**
  * New Debug Rendering level component: There's a new level component that allows users to visualize and debug various aspects of the rendering. It can display normals, render only the diffuse or specular lighting, override specific properties for all materials in the scene, and more. 
  * Pipeline Global Pass attachment reference: Users writing `.pass` files for rendering can now declare and reference attachments in a way that is global to the pipeline.
  * Usability and performance improvements for DiffuseProbeGrid:
    * DiffuseProbeGrid visualization: Displays individual probes and their raw irradiance values as spheres in the appropriate position in the level.
    * Scrolling DiffuseProbeGrid:  Allows a DiffuseProbeGrid to be attached to the camera to apply diffuse GI wherever the camera is located.
    * DiffuseProbeGrid `NumberOfRaysPerProbe` setting: The number of rays cast by each probe in the grid can now be adjusted in the DiffuseProbeGrid properties.  This value can be set differently per grid.
    * DiffuseProbeGrid Irradiance query: Query the diffuse GI at any position and direction in the level. Improved DiffuseProbeGrid blending when multiple grids overlap and around the edges of a grid to blend with the global IBL cubemap.
  * New **CubeMapCapture** component: Captures a diffuse or specular convolved cubemap at any location in the level.
  * The MSAA state can now be changed in the `MainRenderPipeline.azasset` file by setting the `MultisampleState/samples` parameter.  Setting the samples to `1` will disable MSAA.
  * Several improvements to Diffuse GI and ReflectionProbe visual quality.
* **White box**
  * White box is now supported on Linux! ([5075](https://github.com/o3de/o3de/pull/5075))
 
## Deprecations
 
* **Physics**
    * `TransformUniformScale` ([7573](https://github.com/o3de/o3de/issues/7573))
    * `BoxManipulatorRequestBus` ([7572](https://github.com/o3de/o3de/issues/7572))
* **EMFX (Character)**
    * OpenGL Render Plugin is now deprecated and replaced by EMFX Atom Viewport.
 
## Known issues
 
* **EMFX (Character)**
    * If you have saved a layout in the old viewport, it will load the old OpenGL viewport. A workaround is to delete the OpenGL widget and add a new Atom viewport widget, then save the layout.  Alternatively, you can recreate the same layout from the default layout.
 
* **Atom (Graphics)**
    * [Linux] Editor crashes when pressing the **Activate LUT** button right after generating LUT in the HDR Color Grading component. ([9157](https://github.com/o3de/o3de/issues/9157))
 
* **Asset Processor**
    * [Linux]: Closing Editor while Asset Processor is still running will result in a crash upon relaunching Editor.

* **Linux Ubuntu 20.04.4 LTS**

    In rare situations, on Linux Ubuntu 20.04.4 LTS, it might not be possible to launch O3DE Editor, Project Manager, Asset Processor, or other executables from the file explorer, and an error is displayed.

    Workaround: Use the command line to launch the executable from its directory, for example `sudo ./o3de`. Refer to this [FOSTips article](https://fostips.com/double-click-run-elf-ubuntu/) for other possible solutions.
    
    Refer to [issue 9502](https://github.com/o3de/o3de/issues/9502) for more information.

* **Networking**
    * Network entity hierarchies are limited to hierarchies with a maximum of 16 entities.
    * GameLift server launchers are manually relocatable. There is currently no automated build or asset layout generation.
    * Monolithic release server builds are currently not supported.
    * ImGui keyboard is not working in the server launcher.
    * If you experience unexpected client disconnect issues with Multiplayer, set `sv_isTransient=False` to check if server auto termination logic is causing an issue. Refer to [User Guide: Network Settings](https://www.o3de.org/docs/user-guide/networking/settings/) for additional settings. ([9328](https://github.com/o3de/o3de/issues/9328))
    * All CDK samples in the AWS Gems are for CDK v1 (https://docs.aws.amazon.com/cdk/v1/guide/home.html). CDK applications are not currently compatible with CDK v2.
