---
linktitle: 23.05.0 Release Notes
title: Release Notes for Open 3D Engine 23.05.0
description: Full release notes for Open 3D Engine (O3DE) version 23.05.0.
weight: 895
toc: true
---


**Open 3D Engine (O3DE)** 23.05 release levels up the authoring experience for game creators and robotics simulation developers. This release includes significant improvements to the core engine and the ROS2 Gem which integrates the [Robot Operating System (ROS2)](https://www.ros.org/) into O3DE. The ROS2 Gem provides drivers, state-of-the-art algorithms, and developer tools for developing robotics simulations. Game developers in O3DE now have the [Multiplayer Sample game](https://github.com/o3de/o3de-multiplayersample) available to them - a ready-to-use game that's not only fun to play, but provides developers with example implementations of common game elements to help start their own projects.

## Highlights

Here are some highlights of O3DE 23.05.0, followed by a detailed list of features broken down by Special Interest Group (SIG).

* **Material Canvas** is a new intuitive, easy to use, node based, visual scripting interface that allows users to create new, custom shaders and materials. It is built upon the familiar foundations of Script Canvas and Material Editor. For more information, refer to [sig-graphics-audio#51](https://github.com/o3de/sig-graphics-audio/issues/51).

* O3DE now has a **Material Pipeline**, a layer of abstraction between lighting and materials which utilizes new builders and new features from the asset system to build unique shaders for each render pipeline. This provides modularity and extensibility to the Atom Renderer, allowing easier customization of the render pipeline.

* **O3DE Editor** extensibility is improved with the introduction of a new [Action Manager API](https://www.o3de.org/docs/user-guide/action-manager/) that allows adding menus, hotkeys, and, contextual actions from Gems and Python scripts.

* **PhysX 5.1** is supported and multiple PhysX authoring workflows have been improved.

* The updated **Animation Editor** experience is now more consistent with other O3DE tools. The Animation Asset Import process is now more robust and straightforward, and the Animation Editor AnimGraph now has a performance visualizer to help users profile and optimize their AnimGraphs.

* The **Terrain System** now provides users a paintbrush tool so they may paint inside the viewport to create or modify terrain.

* The new **Multiplayer Sample Game (MPS)** Gem provides a sample networked multiplayer game project. The [o3de-multiplayersample repository](https://github.com/o3de/o3de-multiplayersample) is home to O3DE's newest project, a networked, player versus player versus environment game that supports 1 to 10 players. The game delivers significant examples of integrations with major O3DE systems including: terrain, sky/atmosphere/stars, lighting, multiplayer, audio, scripting and VFX. Additionally, the game makes extensive use of the Atom Renderer's advanced feature set including global illumination, cascade shadows, emissive surfaces, bounce lighting, temporal anti-aliasing and hybrid reflections (screen space & ray tracing) amongst others to achieve its visual goals.

    MPS also delivers a rich set of open source assets for use outside of the game. This project demonstrates O3DE's ability to deliver a compelling, feature rich game, while providing significant opportunities for the O3DE community to expand and contribute to the game. MPS  utilizes all of O3DE's key systems, flushing out bugs and expanding feature sets, so that everything works better together at a scale and visual polish beyond existing sample games.

    For more information, refer to the [Multiplayer Sample Project README](https://github.com/o3de/o3de-multiplayersample#readme).

* A new **Asset Browser** experience provides multiple layout options, file operations, an asset inspector panel, and other operations for asset management.

* **O3DE version support** has been improved. Multiple O3DE versions can be installed on the same drive, and projects are linked to the O3DE version they were created and last used with.

* **Gem platform compatibility** can be specified for each Gem. The Gem Catalog can now be filtered by platform compatibility.

* **OpenXR** Support for stereoscopic rendering has been added.

* **Mobile** device performance has been improved with the addition of half-float support for Atom.
## Feature grid

The feature grid represents the current state of development for each feature in O3DE. Review the [live feature grid](https://o3de.github.io/community/features/form.html) and select a SIG to see their latest feature statuses. 


## Features and bug fixes

### sig-build

* Provided Test Impact Analysis Framework ([#10660](https://github.com/o3de/o3de/issues/10660))
  
  Test Impact Analysis Framework (TIAF) is a system that determines which tests need to run for every source change. It only runs the tests that you need and that your change may impact. The system is now deployed for both Python and native C++ tests. Developers working on O3DE can see an average reduction in the time they have to wait for their tests to run.


### sig-content

* Support for global Python scripts per asset type has been added. This simplifies customization of the scene pipeline.

* Asset Browser has a new user experience that is enabled by default. The new Asset Browser experience includes three new layout modes (table view, thumbnail view, list view), file operations (add, delete, edit, rename, move), asset drag-and-drop support, a URL bar for easy sharing and editing, breadcrumb and navigation bar, new detached Asset Browser inspector panel, filter options to hide unusable Editor or engine assets, and all new asset icons.

	* To disable the new Asset Browser, disable the `ed_useWIPAssetBrowserDesign` console variable from the **Tools** menu.
	* If the new Asset Browser layout is not properly set, restore the default layout from the **View > Layouts** menu option.
	* Search is disabled in the table view while this feature is being developed. Instead, use the thumbnail or list view to search for assets.
	* For additional information, refer to the [Asset Browser project](https://github.com/orgs/o3de/projects/16).

* Gem creators can now specify compatible platforms, which can be filtered in the Gem catalog.

* Users can now edit existing Gems `.json` files with the **Create a Gem** wizard or command line interface (CLI).

* O3DE utility widgets in the AzQtComponents library are now exposed to Python and PySide. This allows Python-based developers of tools and Gems to use or extend AzQtComponents for tools, plugins, or automation.

* Prefab overrides can now be managed and visualized from Entity Outliner. Users can override prefabs by adding or removing entities, nested prefabs, and components, or by changing component properties. For more information, refer to the [Override a Prefab](https://www.o3de.org/docs/learning-guide/tutorials/entities-and-prefabs/override-a-prefab/) topic.

* The new Versioning Framework links the engine to it's version and adds the ability for feature, Gem, template, and project creators to specify engine versions that are supported.

* Multiple O3DE version installations are now supported. Projects are linked to the O3DE engine versions they were created and last used with. UX improvements help communicate engine version information to the user.

* An O3DE Linux Snap package can now be downloaded from the Snap Store and from O3DE.org binaries. Snap packaging improves installation time and reduces or eliminates the need to download dependencies.

* Asset Processor now has an optional mode that improves start-up time when users are only making code changes ([#15716](https://github.com/o3de/o3de/pull/15716)).

* 3D Viewport documentation ([#2062](https://github.com/o3de/o3de.org/pull/2062)) has been overhauled. The new documentation is easier to follow and many new viewport features are now documented.

* Viewport UI Switcher has been improved ([#13108](https://github.com/o3de/o3de/pull/13108) and [#13036](https://github.com/o3de/o3de/pull/13036)).

* Viewport camera behavior has had several improvements ([#12882](https://github.com/o3de/o3de/pull/12882), [#13408](https://github.com/o3de/o3de/pull/13408), [#13433](https://github.com/o3de/o3de/pull/13433), [#13590](https://github.com/o3de/o3de/pull/13590), [#13626](https://github.com/o3de/o3de/pull/13626), [#13628](https://github.com/o3de/o3de/pull/13628), [#13669](https://github.com/o3de/o3de/pull/13669)).

* Several small improvements to viewport camera behavior ([#12882](https://github.com/o3de/o3de/pull/12882), [#13408](https://github.com/o3de/o3de/pull/13408), [#13433](https://github.com/o3de/o3de/pull/13433), [#13590](https://github.com/o3de/o3de/pull/13590), [#13626](https://github.com/o3de/o3de/pull/13626), [#13628](https://github.com/o3de/o3de/pull/13628), [#13669](https://github.com/o3de/o3de/pull/13669))

* Editor extensibility has been improved with the introduction of a new [Action Manager API](https://www.o3de.org/docs/user-guide/action-manager/) that allows adding menus, hotkeys, and, contextual actions from Gems and Python scripts.

### sig-core

* AzCore has a new performance metrics logging API ([#12252](https://github.com/o3de/o3de/pull/12252), [#12476](https://github.com/o3de/o3de/pull/12476), [#12483](https://github.com/o3de/o3de/pull/12483), [#13202](https://github.com/o3de/o3de/pull/13202), [#13596](https://github.com/o3de/o3de/pull/13596)).

* This API provides the following pairs of classes to output JSON recorded metrics: `AZ::Metrics::IEventLogger` and `AZ::Metrics::JsonTraceEventLogger`, and `AZ::Metrics::IEventFactory` and `AZ::Metrics::EventFactoryImpl`.

    * The `AZ::Metrics::JsonTraceEventLogger` implements the `AZ::Metrics::IEventLogger` interface which allows logging metrics to the [Google Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#).
	* The `AZ::Metrics::EventFactoryImpl` implements the `AZ::Metrics::IEventFactory` API and provides a registrar for mapping a numeric identifier to `AZ::Metrics::IEventLogger` implementations.  
	* Metrics files should be output to an active project `<project-root>/user/Metrics` directory.  
	* The metrics are loadable in a chromium-based browser `about::tracing` page or via [chromium's standalone trace viewer application](https://google.github.io/trace-viewer/). For more examples of how to use the performance metrics logging API refer to the examples usages in the [Performances Metrics Gathering API document](https://o3de.org/docs/user-guide/programming/metrics/).

* AZ Allocators have been updated so that they're created on-demand instead of requiring explicit `Create` and `Destroy` calls. This allows `AZStd` containers, which use AZ Allocators, to be used anywhere, including in global static variables. Developers who subclass the `PoolAllocator`, need to change their code to ensure all their construction happens in the constructor instead of in the `Create()` method.

* Scene Settings UX improvements remove points of friction and confusion, with a focus on default prefabs, level-of-detail (LOD), and character-based workflows.

* Open Asset Import Library has been updated to version 5.2.5 to support asset pipeline improvements. This update brings a large number of important bug fixes for compression, out-of-bounds errors, crashes, memory allocation, and import issues.

* Google Benchmark library has been updated ([#13630](https://github.com/o3de/o3de/pull/13630)).

* Fixed Math unit tests on Android and enabled NEON instructions by default ([#13739](https://github.com/o3de/o3de/pull/13739), [#13783](https://github.com/o3de/o3de/pull/13783), [#13792](https://github.com/o3de/o3de/pull/13792)).

### sig-graphics-audio

* DccScriptingInterface Gem has been updated to configure and bootstrap DCC tools like Maya and Blender from the Editor, and to provide workflow utilities like a streamlined "Scene Exporter" to get cleaner content to O3DE projects.

* Added RHI bindless support which allows RHI to manage bindless heap for all image and buffer views across all backends. It caches view descriptors on the GPU memory and provides access to the index in the unbounded array to RPI at runtime. This index can be used by features to indirectly access image or buffer views on the GPU within the shader. Instead of managing your own custom unbounded arrays for buffer and image views, features can now simply use the one managed by RHI. RHI bindless support is now used by Terrain and Ray Tracing.

* Material Canvas has been added ([sig-graphics-audio#51](https://github.com/o3de/sig-graphics-audio/issues/51)).<br>Material Canvas is now available for users to create new, custom shaders and materials. Material Canvas is built upon the combined foundations of script canvas and Material Editor, offering many of the same features and UX. Users are able to visually edit, drag, drop, connect, and configure graphical nodes that are automatically transformed into all of the required source files that would otherwise need to be manually created and managed.

	* Typically, the generated source files include shader configurations, AZSL source, material types, and a default material. As these files are generated, they are automatically recognized and processed by the AP, displayed in the Viewport, and made available for use in the Material Editor, material component, and other aspects of the engine that use shaders and materials.  
	* Approximately 150 nodes are provided out-of-the-box. Most of those represent AZSL intrinsic functions, constant values, input values, output nodes, and other types. Material output nodes are the main nodes for any material graph. They define a template that encapsulates all of the data and dependencies to tell Material Canvas what to generate when it compiles the graph. When a material output node has been added to the graph, users will begin to refer to files generating, assets building, in the viewport updating with subsequent changes.  
	* All current material graph nodes are implemented as simple JSON configuration files, listing all of the input and output slots, data types, default values, snippets of shader code, and other metadata. The new library is fully extensible and customizable by simply adding new JSON files.  
	* Material Canvas can also open and provide tools for creating and editing the material graph node files. These can live in any Gems or projects but they must have a unique UUID in every file. There are several examples for all of the existing nodes in the Material Canvas project.  
	* Like Material Editor, most or all aspects of the tool are also exposed through behavior context reflection for Python automation.  

* CPU performance has been improved. An 8 core CPU with an NVIDIA 2080 can handle 9000 static and 1000 dynamic entities at greater than 30 FPS at 1080p resolution.

* Terrain nodes are now supported in Landscape Canvas. For more information, refer to [Create Terrain from Images](https://www.o3de.org/docs/learning-guide/tutorials/environments/create-terrain-from-images/).

* A paintbrush workflow has been added so that both heights and color can be painted directly in the Editor Viewport for the Terrain System.

  The paint brush workflow also includes runtime scripting support for real-time modifications of the terrain using a painting API. See the following topics for more information:

	* General Paint Brush documentation: https://www.o3de.org/docs/user-guide/components/reference/paintbrush/paintbrush/  
	* Image Gradient Component with Paint Brush support: https://www.o3de.org/docs/user-guide/components/reference/gradients/image-gradient/  
	* Terrain Macro Material Component with Paint Brush support: https://www.o3de.org/docs/user-guide/components/reference/terrain/terrain-macro-material/
  
* The new Terrain Developer Guide explains how developers can use and extend the terrain system: [Terrain Developer Guide](https://www.o3de.org/docs/user-guide/visualization/environments/terrain/terrain-developer-guide/).

* Sphere and disk lights now support shadow caching, which is accessible as a checkbox on the light component. This makes it so that shadows do not re-render when nothing has changed in their field of view. This update can greatly accelerate shadows on mostly static scenes. Models that have vertex animation in the shader can enable the **Always moving** toggle in the mesh component to ensure that they always trigger updates when in the view of a cached shadow.

* Stereoscopic rendering (such as VR support) via OpenXR within O3DE has been added. This support was added through the Vulkan backend, and it has been extensively tested using Quest 2. Link mode (where rendering is done on a PC and viewed on a stereoscopic display) and native device display are supported. An optimized VR pipeline has been added to Atom to help support apps that run natively on the device.

* Texture streaming support has been expanded to the Vulkan backend. Image streaming control which can load or evict texture mips automatically at runtime based on the streaming image pool's budget has been added.

* The Material Pipeline, which is a layer of abstraction between lighting and materials, has been added. This includes updates to the shader library, material system, and builders. It uses new builders and new features from the asset system to build unique shaders for each render pipeline. Material types can provide custom data structures and evaluator functions for vertex, pixel, geometry, and lighting stages. The builder inserts any of the custom include files with overridden data types and functions as it builds all of the combinations of shaders listed in the material pipeline.

	* The result of this is a concrete material type referencing all of the different combinations of shaders for each pipeline, with the customization stitched in. All of this is saved to the intermediate assets folder and processed by the AP to generate Final product material types and shaders. The Material Pipeline also includes a Lua script that is invoked whenever material properties or the active render pipeline changes to enable or disable shaders based on the current state.  
	* All of the physically based rendering materials, as well as other shaders and material types included with Atom have been converted to this system.  
	* All of the Atom Sample Viewer (ASV) samples and tests have also been updated to use this system. ASV also includes different experimental render and material pipelines to demonstrate how existing materials that use this system can be applied to a standard, deferred rendering pipeline.

* Temporal anti-aliasing (TAA) pass has been split into two passes, which allow the TAA's history buffer to be copied and separated from the TAA algorithm itself. This required a change to `PostProcessParent.pass` to reference `TaaParentTemplate` instead of `TaaTemplate`. If your project overrides `PostProcessParent.pass` and uses TAA, then it needs to be updated to point to the new TAA parent pass.

### sig-network

* The [Multiplayer Sample game](https://github.com/o3de/o3de-multiplayersample) that provides a feature rich game experience with UX, audio, VFX, player versus player and player versus environment elements.

* The Simple Network Player Spawner component mitigates the need to write custom spawn logic ([#13871](https://github.com/o3de/o3de/pull/13871))

* New warnings when client and server have differences in networked code or properties have been added to aid debugging of these issues.

* A method for code separation between client and server side code is provided to prevent any exposure of server side logic to clients. A new Unified Launcher target to aid local testing has been provided.

### sig-platform

* New XR and OpenXRVk Gems that add VR support for OpenXR compatible devices have been added ([#12372](https://github.com/o3de/o3de/issues/12372)).

	* Meta Quest 2 support has been added, using a new multi-view render pipeline with simplified render passes for VR devices.
	* O3DE levels run on Meta Quest 2 in two ways: natively on device or from PC transmitting to device via Link cable.  
	* O3DE Editor's game mode runs on Meta Quest 2 (Link cable only), allowing to immediately experience the changes to your levels in VR.  
	* New 'XR Camera Movement' component provides head-tracking camera movement and basic VR controller input to navigate through a level.  
	* OpenXRTest project with test levels (DefaultLevel and XR_Office) ready to run on Meta Quest 2 has been added.
	* Documented how to [build and run OpenXR in O3DE](https://github.com/o3de/o3de-extras/wiki/Build-and-Run-OpenXR-in-O3DE), how to use [profiling tools for Meta Quest 2](https://github.com/o3de/o3de-extras/wiki/Profiling-tools-for-Meta-Quest-2), and how to do [advanced GPU profiling on Meta Quest 2](https://github.com/o3de/o3de-extras/wiki/Advanced-GPU-profiling-tools-for-Meta-Quest-2).

### sig-simulation

* PhysX 5.1 support has been added ([#13624](https://github.com/o3de/o3de/issues/13624)).
	
    * PhysX 5.1 is disabled by default. To enable it, use the command line option  `-DAZ_USE_PHYSX5=ON` when building O3DE.
    * PhysX 5.1 brings a host of performance improvements as well as several new features including a 15% increase in simulation performance when compared with PhysX 4.
	* With PhysX 5.1, mobile assets use the more optimal structure eBVH34.
    * Compliant contact support has been added ([#14852](https://github.com/o3de/o3de/issues/14852) - PhysX 5.1 only). By using compliant contacts, rigid bodies are able to model the way materials compress under collision. This is particularly important in fields such as robotics.

* PhysX UX workflow has been streamlined ([#10668](https://github.com/o3de/o3de/issues/10668)).

	* To upgrade existing projects, refer to steps in ([#10668](https://github.com/o3de/o3de/issues/10668#issuecomment-1476180502)).

	* Several changes clarify various PhysX authoring workflows. These include:

		* Improve the understanding of the difference between static dynamic rigid bodies ([#14418](https://github.com/o3de/o3de/pull/14418)).
		* The Static Rigid Body component makes a clearer distinction between dynamic and static colliders. New terminology also distinguishes between kinematic and simulated dynamic rigid bodies.
		* PhysX collider authoring has been improved ([#14850](https://github.com/o3de/o3de/pull/14850), [#14926](https://github.com/o3de/o3de/pull/14926), [#14907](https://github.com/o3de/o3de/issues/14907), [#14997](https://github.com/o3de/o3de/pull/14997)).
		* The PhysX Collider component has been split into separate PhysX Primitive Collider and PhysX Mesh Collider components. This makes creating simple colliders faster (for example, box, sphere, capsule, and so on) using the PhysX Primitive Collider component. The more complex case that requires a PhysX Mesh Asset (.pxmesh product) created in FBX Settings, uses the PhysX Mesh Collider component.
		* PhysX Mesh Collider component interface shows the collider shape type of the PhysX Mesh Asset.
		* Fixed Asset Scale in PhysX Mesh Collider component when asset used is exported as primitives.
		* Rigid Body component interface UX has been improved ([#14024](https://github.com/o3de/o3de/pull/14024), [#13890](https://github.com/o3de/o3de/pull/13890), [#13557](https://github.com/o3de/o3de/pull/13557)).
		* Several small quality of life improvements make the Rigid Body component card easier to use and understand.
		* Support for the Coordinate System Change modifier has been added to the PhysX tab in Scene Settings. ([#14649](https://github.com/o3de/o3de/issues/14649)).

* Shape offset support has been added ([#12370](https://github.com/o3de/o3de/issues/12370)).
	* This is a significant change to how several shape components (box, capsule and sphere) define their dimensions. A new **Offset** property has been introduced to provide support for asymmetrical editing (for example, moving one side of a box does not also change the other). This dramatically improves the authoring experience of manipulating shapes. Component Modes supporting manipulators and 3D viewport editing have also been added.

* Animation asset import has been improved ([#12387](https://github.com/o3de/o3de/issues/12387)).
	* Several quality of life improvements to the animation import process make the overall experience more robust and straightforward.

* Animation Editor Unified Inspector window has been added ([#10666](https://github.com/o3de/o3de/issues/10666)).
	*  A significant overhaul to the O3DE Animation Editor UI brings it more in line with other O3DE tools. Numerous panels were either combined or removed to improve usability and consistency with other tools.
  
* Animation Editor AnimGraph Performance Visualizer has been added ([#13490](https://github.com/o3de/o3de/pull/13490)).
	* An option to display timing information for nodes in an AnimGraph to give real-time information on how long each node is taking to process has been added. This gives invaluable information when profiling or optimizing an AnimGraph. _A big thank you to our friends at **FragLab** for contributing this feature back to O3DE._

* Several character systems have improved performance ([#13920](https://github.com/o3de/o3de/pull/13920), [#14461](https://github.com/o3de/o3de/pull/14461))
* Improved Physics profiling and performance ([#13169](https://github.com/o3de/o3de/pull/13169), [#13258](https://github.com/o3de/o3de/pull/13258), [#13061](https://github.com/o3de/o3de/pull/13061), [#13021](https://github.com/o3de/o3de/pull/13021), [#14666](https://github.com/o3de/o3de/pull/14666), [#14350](https://github.com/o3de/o3de/pull/14350)).

* Physics Viewport has been improved ([#14199](https://github.com/o3de/o3de/pull/14199)).
	* Physics colliders can now be clicked and selected in the 3D viewport.

* Reduced coordinate articulations are now supported ([#14851](https://github.com/o3de/o3de/issues/14851) - PhysX 5.1 only).
	* Reduced coordinate articulations are incredibly important for both robust and accurate simulation of joints. They are used extensively in robotics simulations when simulating devices such as a robotic arm.
	* This feature is in an early experimental state and must be enabled in the Settings Registry option `/Amazon/Physics/EnableReducedCoordinateArticulations`.

* PhysX simulation is now multithreaded on Linux ([#14075](https://github.com/o3de/o3de/pull/14075)).

* Deprecated Physics and Blast legacy materials have been removed ([#9840](https://github.com/o3de/o3de/issues/9840), [#9839](https://github.com/o3de/o3de/issues/9839)).

* Blast Gem has been moved to the experimental branch in `o3de-extras` ([#13584](https://github.com/o3de/o3de/pull/13584)).

## Known issues

* Levels and prefabs containing Polygon Prism components need to be re-saved when switching from PhysX 4 to PhysX 5.1 and vice versa.
* Material Canvas
  * Load times need to be improved for graphs that contain thousands of nodes.  
  * Undo redo performance needs to be improved for graphs containing thousands of nodes.  
  * Undo redo currently selects all nodes in a graph.  
  * More advanced or artist friendly nodes need to be created to extend the node library.  
  * Previews rely on shader compilation times which also need to be optimized but there are settings in the **Tools** > **Settings** dialog to disable shader compilation for unused platforms.  
  * Some changes do not always immediately refresh the Viewport due to some asset reloading edge cases.
  * The layout of node slots is not cleanly aligned and needs to be improved.
  * Nodes do not always resize so there is a minimum size when making and breaking connections.
  * General material types can include several shader files packaged more compactly. In the meantime, users will have to be mindful of where they save their material graphs since more complicated material templates and output nodes will produce several files.
  * Switching to multi view and XR pipelines causes a crash in Material Editor and Material Canvas.
* Material Pipeline
  * It takes more time to compile shaders for all of the active pipelines.
  * Material Editor and Material Canvas crash switching to Multiview at XR pipelines.
  * The organization of all of the shader and material files needs to be simplified to make it easier to find shader and material files.
  * There are several to do items as a result of these changes that need to be addressed.

