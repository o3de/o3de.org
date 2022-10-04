
# O3DE 22.10.0 Feature List

**Status:** Done

Release 22.10.0 consists of Quality of Life Improvements (performance, workflows, usability) and some notable new features. Here are some highlights, followed by a detailed list of features broken down by SIG.
* Onboarding and Collaboration (Easier to onboard and collaborate with other team members using remote projects, templates, networked asset cache ) 
* Multiplayer is easier to setup (client-server connection, debugging, network spawning ) 
* Artist workflow (animation import, root motion extraction, motion matching now experimental) 
* Usability:  Viewport Interaction Improvements (Viewport entity selection, Prefab edit mode), Gem Creation Wizard, Asset Browser Improvements, hot reloading of assets, 
*  Terrain performance - The new O3DE Terrain system is in preview. For developers who have found O3DE best for working in smaller or more enclosed environments, now you can start working on larger-scale worlds with significant performance improvements for both editing and runtime/rendering.  It can now handle 16km x 16km worlds and beyond at high framerates.
* New features: Sky Atmosphere, Stars 


## sig-build

* The Project Manager will now utilize Visual Studio 2022+ for project builds if it is installed. Going foward, Project Manager will always build on the highest version of Visual Studio detected in the local environment https://github.com/o3de/o3de/pull/11449

## sig-content

* AssetProcessor now shows the time spent analyzing and processing assets on a per-asset and builder basis. These metrics will aid improving AssetBuilder throughput, tracking performance over time, and identify areas of asset processing that require more focus.
* AssetProcessor now supports sharing pre-processed assets via network shared drives in its new asset server cache mode. Teams can use this mode to reduce the cost of processing assets on individual machines by sharing processed files across a network.
* Improvements to the underlying hot reload framework that improve the reliability of dynamic asset reloading in the editor.
* Intermediate assets adds a powerful new asset category to the asset pipeline allowing AssetBuilders to be chained together to increase reusability and break processing into smaller parts for reduced reprocessing time.
* New 3rd Person Template. This template allows a user to start a new project with an animating model, a base character controller, a base white boxed level, camera follow from the 3rd person perspective, and base physics interactions. In addition, custom scripts are included to show user input management, trigger collider interactions, and a smooth camera follow technique. Custom source materials also show how simple materials are built.
* Gem Creation Wizard: A user can now create a gem utilizing a UX flow removing the need to manually edit the gem JSON file. Note: a user can still manually edit the gem JSON file if needed.
* Remote Projects: A user can now utilize the Project Manager to download projects from remote sources by providing a URL to that source.
* Remote Templates: A user can now utilize the Project Manager to download templates from remote sources by providing a URL to that source.
* The Project Manager now displays the engine name and version number each project is registered with. The Project Manager now displays the current engine version in the title bar.
* Script Canvas Architecture update that provides a framework to embed ScriptCanvas functionality in places other than Entity / Component system via the ScriptCanvas Component. The new architecture introduces a set of classes that handle a small part of the ScriptCanvas runtime. The highest level class is the ScriptCanvas::Executor which is now used by the ScriptCanvas::RuntimeComponent. The ScriptCanvas::Executor is also used by the new ScriptCanvasEditor::Interpreter, which is a class that allows developers to embed user access to ScriptCanvas functionality any where in the editor.
* Writing C++ Script Canvas nodes is now a lot easier! We have deprecated node generics (a set of C++ macros) in favor of using AzAutoGen to produce libraries of functions or standalone nodes. We have consolidated the autogen semantics for Script Canvas grammar nodes and nodeables. We removed the concept of Script Canvas node libraries, anytime you write a node it gets registered automatically. It is no longer necessary to manually reflect or register Script Canvas nodes.
* Prefab Edit Mode Visual Feedback: Now when you double-click on a prefab and enter prefab edit mode, there is the option to enable an effect to grey out all entities not inside the current prefab.
* The O3DE editor viewport now comes with a new feature to help show selected entities with an outline effect.
* Improved visualization for the rotation manipulator in the 3D viewport (rotation segment is now displayed). ([Add rotation manipulator segment #11195](https://github.com/o3de/o3de/pull/11195) and [No overlap when drawing rotate gizmo and draw start/end segments #11550](https://github.com/o3de/o3de/pull/11550)).
* The O3DE editor viewport now contains the new Component Mode Switcher to quickly switch between available Component Modes on entities. ([Component Mode Viewport UI Switcher](https://github.com/o3de/o3de/issues/10662)).
* Asset Browser Updates: Previously, Asset Browser was just a view of your asset with no way of interacting with your assets. We have now added in some core features you would expect in most asset browser including, duplicating, deleting, open in associated application (material editor if it's a material file, Script canvas if it's a script canvas file, etc.) We also detect allow you to open up asset in 3rd party apps. JSON to Visual studios (or default coding tool), 3d asset in your associated DCC tool, etc. We also now have a create new workflow for the creation of new assets you want to start in a specific folder or directory.

## sig-core

* New feature that allows users to dynamically spawn prefabs at runtime using Lua scripting.
* The Settings Registry has two new user facing features added to it
  * The first is the Settings Registry Origin Tracker, which tracks which .setreg/.setregpatch files particular settings are loaded from.  That information can be queried via a new console command of "sr_dump_origin <JSON key path>". (https://github.com/o3de/o3de/pull/11028)
  * Second is a Document Object Model Adapter has been added to visualized the Settings Registry fields, current value and the file origin.  It is currently hooked up the DPEDebugViewStandalone application that can be built by specifying the CMake target of "DPEDebugViewStandalone". (https://github.com/o3de/o3de/pull/11404)

## sig-docs-community

## sig-graphics-audio

* Added a new Shadow Bias flag for parallax materials, to deal with shadow acne on parallax surfaces.
* Added min/max sliders to the pass tree debug tool to support trimming the color output for increased contrast of fine details. https://github.com/o3de/o3de/pull/9292.
* Added averages to the CPU Profiler https://github.com/o3de/o3de/pull/10253.
* Made the ImGui debug tools not disable the rest of the Editor.
* Added a Tga image loader instead of using QImage to load tga images. It handles more tga file formats. https://github.com/o3de/o3de/pull/11161.
* Switched to use tile resource for streaming images for DX12 backend. https://github.com/o3de/o3de.
* Removing default image pool budget caps. https://github.com/o3de/o3de/pull/11345.
* Added new Sky Atmosphere Component. https://github.com/o3de/o3de/pull/9649.
* Added new Stars Component. https://github.com/o3de/o3de/pull/8624.
* DiffuseProbeGrid components are now in a Gem. https://github.com/o3de/o3de/pull/10899.
* RayTracing performance improvements. https://github.com/o3de/o3de/pull/8945.
* Added "Affects GI" option to Lights. https://github.com/o3de/o3de/pull/9379.
* Added the Terrain mesh to the RayTracing scene. https://github.com/o3de/o3de/pull/10207.
* Added RHI CommandList submit range validation. https://github.com/o3de/o3de/pull/10504.
* Changed FindReflectionProbes to use the Visibility system. https://github.com/o3de/o3de/pull/9174.
* RHI OpenXr support for Vulkan backend. https://github.com/o3de/o3de/pull/10170, https://github.com/o3de/o3de/pull/9664.
* Added support for a mode that forces cpu to run in lockstep with gpu. https://github.com/o3de/o3de/pull/10604.
* Material component API improvements for getting and setting properties in Lua and script canvas.
* Material component and instance editor support for editing multiple selected entities.
* Reflected many RPI and RHI shader related types to edit and behavior context to support scripting and creating tools.
* Implemented support for editing shader variant lists, undo, and redo in shader management console.
* Added a settings dialog to material editor, shader management console, and similar tools for configuring common registry settings.
* Implemented autosave feature in material editor, shader management console, and similar tools. The autosave feature can be enabled from the tool’s settings dialog. Once autosave is enabled and configured, documents will be saved after users make modifications inside material editor.
* Updated the asset system, instance database, material component, and the thumbnail system to better support processing asset changes in the background and hot reloading materials as the auto saved from the material editor.
* Added support to open files by dragging and dropping into the material editor.
* Added support for saving custom window layouts in material editor and related tools.
* Experimental preview of material canvas, a node based, visual editor, combining features from material editor and script canvas for creating new material types and shaders.

* Improved and refactored how raw requests are defined, created, sent, and processed in the AudioSystem Gem. All existing locations that created and sent an audio request directly to the system have been updated to the newer version.
* CMake can now detect the Wwise SDK version and check it against a minimum supported version of the SDK.

## sig-network

* Multiple improvements to the client and server connection experience, including debug text to convey the current step in connection process, debug connection status messaging in game and new ImGUI menu options in the Launchers. See screenshots at https://github.com/o3de/sig-release/pull/86
* Added an optional TypeValidatingSerializer which will raise an assert when serialization results in a type or variable name mismatch to aid debugging of networking serialization issues.
* The Network TargetManagement Gem adds support for tools and applications in O3DE that need a network connection to share information or to support debugging. An example of this would be the O3DE Editor connecting to Lua IDE to debug Lua scripts.
* Unified Network Spawner Pipeline - unifies the networking spawning pipeline with the non-network spawnable system. This is mostly an under-the-hood improvement but reduces the complexity of networked entity spawning.

## sig-operations

## sig-platform

* Update Python from version 3.7.12 to 3.10.5. This will increase the window for support and security updates for Python to 2026 ([PEP 619](https://peps.python.org/pep-0619/)) as well as brings in many language and performance improvements over Python 3.7. See the [Python Update RFC](https://github.com/o3de/sig-platform/issues/54) for further details.

## sig-security

## sig-simulation

* A series of fixes and improvements to the animation import process. ([Animation Support for Common Third-Party Tools #10661](https://github.com/o3de/o3de/issues/10661)).
* O3DE now supports root motion extraction to make bringing in models from DCC tools such as Mixamo easier than ever before. ([Root Motion Extraction #10655](https://github.com/o3de/o3de/issues/10655)).
* The O3DE Motion Matching Gem is ready for experimental use. See [Motion Matching in O3DE, a Data-Driven Animation Technique](https://www.o3de.org/blog/posts/blog-motionmatching/) for more details. ([Motion Matching #10665](https://github.com/o3de/o3de/issues/10665)).
* O3DE now ships with support for navigation using the excellent Recast/Detour navigation library. You can now create a navmesh in your scene and see your characters path-find from one point to another. ([Navigation Support #10663](https://github.com/o3de/o3de/issues/10663))
* The ragdoll authoring experience has been completely overhauled to make setting up colliders and joint limits a breeze. We now provide joint limit auto-fitting and manipulator support for fine-grained adjustments for both colliders and joint limits. ([Ragdoll Authoring Improvements #10654](https://github.com/o3de/o3de/issues/10654)).
* The way physics material assets are stored and used have been completely updated. The physics material library asset has been removed and we now support individual physics material assets, much like render materials and other assets in O3DE. This makes working with physics materials much easier and more consistent. ([Physics Material System Improvements #2897](https://github.com/o3de/o3de/issues/2897)).
* The performance of the Terrain system has seen significant performance improvements for both editing and runtime/rendering.  It can now handle 16km x 16km worlds and beyond at high framerates. ([Terrain System #1847](https://github.com/o3de/o3de/issues/1847)).

## sig-testing

* Material Editor test tools support for [python-based tests](https://www.o3de.org/docs/user-guide/testing/parallel-pattern/), expanding automated testing to more parts of O3DE. This helps O3DE contributors efficiently verify and improve the behavior of the Material Editor.
* [GitHub codeowners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) alias hints now output during python test failure. This helps O3DE contributors immediately know who to contact for support. Customers using O3DE's test framework will also see hints if their repo contains a codeowners file.

## sig-ui-ux

> Written with [StackEdit](https://stackedit.io/).
