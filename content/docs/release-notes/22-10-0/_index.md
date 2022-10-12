---
linkTitle: 22.10.0 Release Notes
title: Release Notes for Open 3D Engine 22.10.0
description: Full release notes for Open 3D Engine (O3DE) version 22.10.0.
weight: 897
toc: true
---


**Open 3D Engine (O3DE)** version 22.10.0 consists of Quality of Life Improvements (such as performance, workflows, and usability) and some notable new features. Here are some highlights, followed by a detailed list of features broken down by SIG. You can also see the [feature grid](./feature-state), showing the overall status of each feature.

## Highlights for 22.10.0

- **Onboarding and Collaboration**: Remote projects, templates, and networked asset cache have made it easier to onboard and collaborate with other team members.

- **Multiplayer**: With improvements to the client-server connection, debugging, and network spawning, setting up multiplayer is more straightforward than before.

- **Artist workflow**: Improvements for artists include animation import, root motion extraction, and motion matching (experimental). 

- **Usability**: We've made usability improvements to various features including Viewport Interaction (Viewport entity selection, Prefab edit mode), Gem Creation Wizard, Asset Browser, and hot reloading of assets.

- **Terrain performance**: The new O3DE Terrain system is in preview. For developers who have found O3DE best for working in smaller or more enclosed environments, now you can start working on larger-scale worlds with significant performance improvements for both editing and runtime/rendering. It can now handle 16km x 16km worlds and beyond at high framerates.

- **New features**: Sky Atmosphere and Stars components.


## Features and bug fixes


### sig-build

- Project Manager now utilizes Visual Studio 2022+ for project builds, if it's installed. Going forward, Project Manager will always build on the highest version of Visual Studio that's detected in the user's local environment. [#11449](https://github.com/o3de/o3de/pull/11449)

### sig-content

- Asset Processor now shows the time spent analyzing and processing assets on a per-asset and per-builder basis. These metrics help improve Asset Builder throughput, track performance over time, and identify areas of asset processing that require more focus.

- Asset Processor's new *asset server cache mode* allows teams to share preprocessed assets via network-shared drives. Teams can use this mode to reduce the cost of processing assets on individual machines by sharing processed files across a network.

- Improvements to the underlying hot reload framework that improve the reliability of dynamic asset reloading in O3DE Editor.

- Intermediate assets add a powerful new asset category to the asset pipeline, allowing Asset Builders to chain together. This increases reusability and splits up processing into smaller parts, resulting in reduced reprocessing time.

- 3rd Person Template: A new project template that users can create a project with. The project includes an animating model, a base character controller, a base white-boxed level, base physics interactions, and a camera that follows from a 3rd person perspective. In addition, the project includes custom scripts to show user input management, trigger collider interactions, and use a smooth camera-follow technique. Custom source materials also show how simple materials are built.

- Gem Creation Wizard: Users can create a Gem through a graphical user interface flow. This is a simpler approach to creating Gems. However, users can still manually create Gems by using the command line and manually editing the Gem JSON file.

- Remote Projects: Users can now use the Project Manager to download projects from remote sources by providing a URL to that source.

- Remote templates: Users can now use the Project Manager to download templates from remote sources by providing a URL to that source.

- The Project Manager now displays the engine name and version number for each registered project. The Project Manager also displays the current engine version in the title bar.

- Script Canvas Architecture: The Script Canvas Component now provides a framework to embed Script Canvas functionality in places other than the Entity and Component system. The new architecture introduces a set of classes that handle a small part of the Script Canvas runtime. The highest level class is the `ScriptCanvas::Executor`, which `ScriptCanvas::RuntimeComponent` now uses. The `ScriptCanvas::Executor` is also used by the new `ScriptCanvasEditor::Interpreter`, which is a class that allows developers to embed user access to Script Canvas functionality any where in O3DE Editor.

- Writing C++ Script Canvas nodes is now a lot easier! We have deprecated node generics (a set of C++ macros) in favor of using AzAutoGen to produce libraries of functions or standalone nodes. We have consolidated the autogen semantics for Script Canvas grammar nodes and nodeables. We removed the concept of Script Canvas node libraries. Anytime you write a node, it gets registered automatically. You no longer have to manually reflect or register Script Canvas nodes.

- Prefab Edit Mode Visual Feedback: In O3DE Editor, when you double-click on a prefab and enter prefab edit mode, there is now an option to enable an effect to grey out all entities that are not inside the current prefab.

- The O3DE Editor Viewport now comes with a new feature to show selected entities with an outline effect.

- In the O3DE Editor Viewport, an entity's rotation manipulator now has visual feedback that shows how far the entity is rotated. [#11195](https://github.com/o3de/o3de/pull/11195), [#11550](https://github.com/o3de/o3de/pull/11550)

- The O3DE Editor Viewport has a new *Component Mode Switcher* to quickly switch between the available Component Modes on entities. [#10662](https://github.com/o3de/o3de/issues/10662)

- Asset Browser updates: Previously, Asset Browser was just a view of your asset with no way of interacting with your assets. Now, Asset Browser contains some core features such as duplicate, delete, and open in the associated application (for example, Material Editor if it's a material file or Script canvas if it's a script canvas file). It also allows you to open an asset in third-party apps (for example, Visual Studios or another text editor for JSON files, a digital content creation (DCC) tool for 3D assets, and so on). We also now have a _create new_ workflow for the creation of new assets you want to start in a specific folder or directory.


### sig-core

- Users can dynamically spawn prefabs at runtime using Lua scripting.

- The Settings Registry has two new user-facing features:
  * The *Settings Registry Origin Tracker* tracks which `.setreg/.setregpatch` files that particular settings are loaded from. Users can query that information via the command line by running the command `sr_dump_origin <JSON key path>`. [#11028](https://github.com/o3de/o3de/pull/11028)
  * A *Document Object Model Adapter* helps visualize the Settings Registry fields, their current value, and their file origin. It's currently hooked up to the `DPEDebugViewStandalone` application that can be built by specifying the `DPEDebugViewStandalone` CMake target. [#11404](https://github.com/o3de/o3de/pull/11404)

### sig-docs-community

- Updates to various feature documentation. Refer to the **Docs Link** column in the [22.10.0 Feature Grid](feature-state.md). 

### sig-graphics-audio

- Added a new Shadow Bias flag for parallax materials to deal with shadow acne on parallax surfaces.

- Added minimum and maximum sliders to the Pass Tree Debug tool to support trimming the color output for increased contrast of fine details. [#9292](https://github.com/o3de/o3de/pull/9292)

- Added averages to the CPU Profiler. [#10253](https://github.com/o3de/o3de/pull/10253)

- The ImGui debug tools no longer disable the rest of O3DE Editor.

- Added a TGA image loader to load TGA images, which replaces the use of QImage. It handles more TGA file formats. [#11161](https://github.com/o3de/o3de/pull/11161)

- Switched to use tiled resource for streaming images for DX12 backend. [#10981](https://github.com/o3de/o3de/10981).

- Removed the default image pool budget caps. [#11345](https://github.com/o3de/o3de/pull/11345)

- Added a new Sky Atmosphere component. [#9649](https://github.com/o3de/o3de/pull/9649)

- Added a new Stars component. [#8624](https://github.com/o3de/o3de/pull/8624)

- DiffuseProbeGrid components are now in a separate Gem. [#10899](https://github.com/o3de/o3de/pull/10899).

- RayTracing performance improvements. [8945](https://github.com/o3de/o3de/pull/8945)

- Added **Affects GI** option to lights. [#9379](https://github.com/o3de/o3de/pull/9379)

- Added the Terrain mesh to the RayTracing scene. [#10207](https://github.com/o3de/o3de/pull/10207)

- Added submit range validation to the `RHI::CommandList`. [#10504](https://github.com/o3de/o3de/pull/10504)

- Changed the `FindReflectionProbes` function to use the scene visibility system. [#9174](https://github.com/o3de/o3de/pull/9174)

- Added RHI OpenXR support for Vulkan backend. [#9664](https://github.com/o3de/o3de/pull/10170), [9664](https://github.com/o3de/o3de/pull/9664)

- Added support for a mode that forces the CPU to run in lockstep with GPU. [#10604](https://github.com/o3de/o3de/pull/10604)

- Improved the Material component API for getting and setting properties in Lua and Script Canvas.

- The Material component and instance editor now supports editing multiple selected entities.

- Reflected many RPI and RHI shader-related types to edit and behavior context, to support scripting and creating tools.

- Implemented support to edit shader variant lists, undo, and redo in the Shader Management console.

- Added a settings dialog for configuring common registry settings to the Material Editor, Shader Management Console, and similar tools.

- Implemented an autosave feature in Material Editor, Shader Management Console, and similar tools. Users can enable the autosave feature from the tool's settings dialog. When autosave is enabled and configured, files will save automatically after users make modifications inside Material Editor.

- Updated the asset system, instance database, material component, and thumbnail system, so they better support processing asset changes in the background and hot reloading materials after the materials autosave in the Material Editor.

- Added support for dragging and dropping files into the Material Editor.

- Added support for saving custom window layouts in Material Editor and related tools.

- Enabled the experimental preview of Material Canvas, a node-based, visual editor. It combines features from Material Editor and Script Canvas, allowing users to create new material types and shaders.

- Improved and refactored how raw requests are defined, created, sent, and processed in the AudioSystem Gem. All existing locations that created and sent an audio request directly to the system have been updated to the newer version.

- CMake can now detect the Wwise SDK version and check it against a minimum supported version of the SDK.


### sig-network

- Multiple improvements to the client and server connection experience, including debug text to convey the current step in a connection process, debug text that indicates the connection status in-game, and new ImGUI menu options in the launchers. 

- To aid in debugging networking serialization issues, we added an optional TypeValidatingSerializer, which raises an assert when serialization results in a type or variable name mismatch.

- The Network Target Management Gem adds support for O3DE tools and applications that need a network connection to share information or to support debugging. An example of this is connecting O3DE Editor to Lua IDE to debug Lua scripts.

- Unified Network Spawner Pipeline: Unifies the networking spawning pipeline with the non-network spawnable system. This reduces the complexity of networked entity spawning.

### sig-operations

No callouts for this release.

### sig-platform

- Updated Python from version 3.7.12 to 3.10.5. This extends the time range of Python support and security updates to 2026. In addition, Python Enhancement Proposals [(PEP) 619](https://peps.python.org/pep-0619/) brings in many language and performance improvements over Python 3.7. See [RFC: Python Upgrade to 3.10](https://github.com/o3de/sig-platform/issues/54) for further details.

### sig-security

No callouts for this release.

### sig-simulation

- A series of fixes and improvements to the animation import process. [#10661](https://github.com/o3de/o3de/issues/10661)

- O3DE now supports root motion extraction, making it easier for artists to import models from DCC tools, such as Mixamo, into O3DE. [#10655](https://github.com/o3de/o3de/issues/10655)

- The O3DE Motion Matching Gem is ready for experimental use. See [Motion Matching in O3DE, a Data-Driven Animation Technique](https://www.o3de.org/blog/posts/blog-motionmatching/) for more details. [#10665](https://github.com/o3de/o3de/issues/10665)

- O3DE now ships with support for navigation using the Recast/Detour navigation library. You can now create a navmesh in your scene and see your character's path-find from one point to another. [#10663](https://github.com/o3de/o3de/issues/10663)

- The ragdoll authoring experience has been completely overhauled to make it easier to set up colliders and joint limits. O3DE now provides joint limit auto-fitting and manipulator support for fine-grained adjustments for both colliders and joint limits. [#10654](https://github.com/o3de/o3de/issues/10654)

- Completely updated the way physics material assets are stored and used. We've removed the physics material library asset, and we now support individual physics material assets, much like render materials and other assets in O3DE. This makes physics materials easier to work with and more consistent. [#2897](https://github.com/o3de/o3de/issues/2897)

- The performance of the Terrain system has seen significant performance improvements for both editing and runtime/rendering. It can now handle 16km x 16km worlds and beyond at high framerates. [#1847](https://github.com/o3de/o3de/issues/1847)

### sig-testing

- Material Editor test tools now support [Python-based tests](https://www.o3de.org/docs/user-guide/testing/parallel-pattern/), expanding automated testing to more parts of O3DE. This helps O3DE contributors efficiently verify and improve the behavior of the Material Editor. 

- [GitHub codeowners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) alias hints now output during Python test failure. This helps O3DE contributors immediately know who to contact for support. Customers using O3DE's test framework can also see hints if their repo contains a codeowners file.

### sig-ui-ux

No callouts for this release.


## Known issues

**Graphics**

- Problem displaying UV tiles (UDIMs) [#9448](https://github.com/o3de/o3de/issues/9448)

- Lighting is inconsistent between O3DE Editor and Game Launcher. On AMD (MESA), all objects and terrain are dark in both Game Launcher and Editor. Textures that are linked in the object's material are not displayed. They only appear as the color white if direct lighting shines on it. On NVIDIA, in game mode, this behaves differently. [#7519](https://github.com/o3de/o3de/issues/7519)

- Running the command `./AtomSampleViewerStandalone --runtestsuite scripts/_fulltestsuite_.bv.luac` results in a crash, but all individual samples run correctly. [o3de-atom-sampleviewer#508](https://github.com/o3de/o3de-atom-sampleviewer/issues/508)

**Testing**

- Crash logs are not available on Linux. [#10346](https://github.com/o3de/o3de/issues/10346)

**Build**

- Building O3DE on Visual Studio 2022 experiences slower build times in some situations compared to Visual Studio 2019. [#12257](https://github.com/o3de/o3de/issues/12257)

**Physics**

- Setting the Cylinder Collider component's radius or height to zero causes O3DE Editor to crash. This is a known issue that will be fixed in development. Until it's resolved, avoid setting the radius or height to zero. [#12147](https://github.com/o3de/o3de/issues/12147)

- The physics material library asset has been removed and now supports individual physics material assets. If you work with AutomatedTesting, atom-sampleviewer, multiplayersample or netsoaktest, you don't need to do anything -- all physics material assets are already converted.

  For any other project, one person must convert the assets by following these steps:

  1. Run Editor. Do not open any level; just close the "Welcome to O3DE" screen.
  1. Wait until Asset Processor has finished processing all the assets.
  1. Open Console by clicking **Tools** > **Console**.
  1. Enter the following console command to convert old physics material libraries: `ed_physxConvertMaterialLibrariesIntoIndividualMaterials`
  1. Wait until Asset Processor has finished processing all the assets.
  1. Enter the following console command to fix prefabs and FBX manifests that reference old assets: `ed_physxFixAssetsUsingPhysicsLegacyMaterials`
  1. Wait until Asset Processor has finished processing all the assets.
  1. Commit the source asset changes into Github.

**Viewport**

- The Component Mode Switcher may suffer from instability on Linux. If this occurs you can disable the Switcher in the Settings Registry by adding the following: 

  ```
  {
      "Amazon": {
          "Preferences": {
              "Editor": {
                  "ComponentSwitcherEnabled": false
              }
          }
      }
  }
  ```

**Prefab**

- After creating and deleting prefabs, you must save your level twice.

- After prefab operations, you may encounter warnings that say, "Some of the patches were not successfully applied". 
  - For prefab deletion, it has been fixed in development. [#11756](https://github.com/o3de/o3de/issues/11756)
  - For prefab creation, it will be fixed in development. [#12013](https://github.com/o3de/o3de/issues/12013)

- Deleting or reordering a nested prefab in Prefab Edit Mode disrupts the rest of the outliner view. [#11737](https://github.com/o3de/o3de/issues/11737)

**Editor**

- On Linux, O3DE Editor splash screen displays "Development Build" instead of the version number if development and release are installed together. [#9519](https://github.com/o3de/o3de/issues/9519)

- There's an issue with running Game Launcher in a maximized window when the user presses **Play Game (Maximized)** in O3DE Editor. [#12125](https://github.com/o3de/o3de/pull/12125)

- For projects with all Gems enabled, if a user previously closed O3DE Editor while it was still processing assets, Editor crashes on splash screen when it's reopened. [#11926](https://github.com/o3de/o3de/issues/11926) This issue will be resolved in development: [#12445](https://github.com/o3de/o3de/pull/12445)

- Editor crashes in `AZ::TraskGraphEvent::Signal` occasionally. [#12015](https://github.com/o3de/o3de/issues/12015)

**Script Canvas**

- Saving changes to a script that's incompatible with the interpreter can crash O3DE Editor. [#11747](https://github.com/o3de/o3de/issues/11747)

**Animation**

- Do not include `.` in names for animations in your DCC tool, as this can fail at import time. [#12342](https://github.com/o3de/o3de/issues/12342)

- Some animations crash in the scene settings tool while a level isn't open. Ensure a level is opened before accessing the scene settings tool. [#12414](https://github.com/o3de/o3de/issues/12414)

- On Linux, Animation Editor crashes the Editor inconsistently. [#12536](https://github.com/o3de/o3de/issues/12536)

**UI**

- In UI Editor, Curve Editor is not functional. [#11616](https://github.com/o3de/o3de/issues/11616)

- In UI Editor, modifying keys may crash O3DE Editor. [#12219](https://github.com/o3de/o3de/issues/12219)
