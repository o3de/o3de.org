---
linktitle: 23.05.0 Release Notes
title: Release Notes for Open 3D Engine 23.05.0
description: Full release notes for Open 3D Engine (O3DE) version 23.05.0.
weight: 895
toc: true
---


**Open 3D Engine (O3DE)** 23.05 release levels up the authoring experience for game creators and robotics simulation developers. In addition to improvements to the core engine, robotics users in O3DE now have the ROS2 Gem, a Gem that provides integration with the [Robot Operating System (ROS2)](https://www.ros.org/), which provides drivers, state-of-the-art algorithms, and developer tools for developing robotics simulations. Game developers in O3DE now have the [Multiplayer Sample game](https://github.com/o3de/o3de-multiplayersample) available to them - a ready-to-use game that's not only fun to play, but provides developers with example implementations of common game elements to help start their own projects.

## Highlights

Here are some highlights of O3DE 23.05.0, followed by a detailed list of features broken down by Special Interest Group (SIG).

1.	New and Improved Authoring Experiences:
Material Canvas is a new intuitive, easy to use, node based, visual scripting interface that allows users to create new, custom shaders and materials. It is built upon the combined foundations of Script Canvas and Material Editor that O3DE users are already familiar with. For more information, refer to [sig-graphics-audio#51](https://github.com/o3de/sig-graphics-audio/issues/51).
O3DE now has a Material Pipeline, a layer of abstraction between lighting and materials which utilizes new builders and new features from the asset system to build unique shaders for each render pipeline. This provides modularity and extensibility to the Atom Renderer, allowing easier customization of the render pipeline.
We have improved the Editor extensibility with the introduction of a new [Action Manager API](https://www.o3de.org/docs/user-guide/action-manager/) that allows adding menus, hotkeys, and, contextual actions from Gems and Python scripts.
Physics & animations improvements including support for PhysX 5.1 and improvements in multiple PhysX authoring workflows. Users will notice an update to the Animation Editor experience, which is now more consistent with other O3DE tools. The Animation Asset Import process is now more robust and straightforward, and the Animation Editor AnimGraph now has a Performance Visualizer to help users profiling and optimizing their AnimGraphs.
Finally, our Terrain System now provides users a paintbrush tool so they may paint inside the viewport to create or modify terrain.

2. New Multiplayer Sample Game (MPS): The [`o3de-multiplayersample` repository](https://github.com/o3de/o3de-multiplayersample) is home to O3DE's newest project, a networked, player versus player versus environment game that supports 1 to 10 players. The game delivers significant examples of  integrations with major O3DE systems including: terrain, sky/atmosphere/stars, lighting, multiplayer, audio, scripting and VFX. Additionally, the game makes extensive use of the Atom Renderer's advanced feature set including global illumination, cascade shadows, emissive surfaces, bounce lighting, temporal anti-aliasing and hybrid reflections (screen space & ray tracing) amongst others to achieve its visual goals.

The project also delivers a rich set of open source assets to the community, for use outside of the game. All told this work demonstrates O3DE's ability to deliver a compelling, feature rich game, while providing significant opportunities for the O3DE community to expand and contribute to the game. (MPS  utilizes all of O3DE's key systems, flushing out bugs and expanding feature sets, so everything works better together at a scale and visual polish beyond existing sample games.)

In this game, players compete for the highest score to win. Over a series of rounds, players race around the starbase to collect gems and rack up points. Each player is armed with a laser pistol and protected by a shield. Taking damage from laser blasts or from the environmental hazards depletes the player's shield. When the shield is depleted, the player respawns at the cost of some of their collected gems. Do you risk it all to win? For more information, refer to the [Multiplayer Sample Project README](https://github.com/o3de/o3de-multiplayersample#readme).

3. New Asset Browser: O3DE now has a new Asset Browser experience within the Editor that provides users with multiple layout options, file operations, an asset inspector panel, and other operations to manage their assets.

4. Installation and Gem Improvements: Multiple versions of O3DE can now be installed on the same drive, and projects are aware of which O3DE version they were created in and last used with. In addition, Gems creators can now specify compatible platforms, which can be filtered against in the Gem Catalog.

5. Additional VR/XR support and mobile performance improvements: Support for stereoscopic rendering (such as VR support) via OpenXR within O3DE. Improved performance on mobile devices by adding half-float support for Atom.

## Feature grid

The feature grid represents the current state of development for each feature in O3DE. Review the [live feature grid](https://o3de.github.io/community/features/form.html) and select a SIG to see their latest feature statuses. 


## Features and bug fixes

### sig-build

* Provided Test Impact Analysis Framework ([#10660](https://github.com/o3de/o3de/issues/10660))
  
  Test Impact Analysis Framework (TIAF) is a system that determines which tests need to run for every source change. It only runs the tests that you need and that your change may impact. The system is now deployed for both Python and native C++ tests. Developers working on O3DE can see an average reduction in the time they have to wait for their tests to run.


### sig-content

* Added support for global Python scripts per asset type to simplify customizations in the scene pipeline.
* Added a new Asset Browser experience that is turned on by default. The new Asset Browser experience includes three new layout modes (table view, thumbnail view, list view), file operations (add, delete, edit, rename, move), asset drag-and-drop support, URL bar for easy sharing and editing, breadcrumb and navigation bar, new detached Asset Browser inspector panel, filter options to hide unusable Editor or engine assets, and all new asset icons.
	* To disable the new Asset Browser, disable the `ed_useWIPAssetBrowserDesign` console variable from the **Tools** menu.
	* If the new Asset Browser layout is not properly set, restore the default layout from the **View** -> **Layouts** menu option.
	* Searching is disabled in the table view while this feature is being developed, please use the thumbnail or list view to search for assets.
	* Check out all the work done in the [Asset Browser project](https://github.com/orgs/o3de/projects/16) page.
* Made changes that allows Gem creators can now specify compatible platforms, which can be filtered in the Gem catalog.
* Made changes that allow users to edit existing Gems `.json` files via the **Create a Gem** wizard or command line interface (CLI).
* Exposed O3DE utility widgets in the AzQtComponents library to Python and PySide. This allows Python-based developers of tools and Gems to use or extend AzQtComponents for tools, plugins, or automation.
* Provided the ability to manage and visualize prefab overrides from O3DE Editor's Entity Outliner. Users can now override prefabs by adding or removing entities, nested prefabs, and components or changing component properties. For more information, please refer to the [Override a Prefab](https://www.o3de.org/docs/learning-guide/tutorials/entities-and-prefabs/override-a-prefab/) page.
* Added Versioning Framework, which allows the engine to understand what version it is and adds the ability for feature, Gem, template, and project creators to specify versions that the engine can compare and potentially validate against.
* Added ability to install multiple versions of O3DE on the same drive. Projects are aware of which O3DE version they were created in and last used with. UX adjustments to better communicate engine version to the user.
* Added ability to download an O3DE Linux Snap package from the Snap Store and from O3DE.org binaries. Snap packaging improves installation time and reduces or eliminates the need to download dependencies.
* Added an optional mode to improve Asset Processor (AP) start-up time when users are only making code changes.
* Updated the 3D Viewport documentation ([#2062](https://github.com/o3de/o3de.org/pull/2062))
	* The 3D Viewport documentation has been completely overhauled to make it much easier to follow. Many new viewport features are now also documented.
* Improved Viewport UI Switcher ([#13108](https://github.com/o3de/o3de/pull/13108), [#13036](https://github.com/o3de/o3de/pull/13036))
* Made several small improvements to Viewport camera behavior ([#12882](https://github.com/o3de/o3de/pull/12882), [#13408](https://github.com/o3de/o3de/pull/13408), [#13433](https://github.com/o3de/o3de/pull/13433), [#13590](https://github.com/o3de/o3de/pull/13590), [#13626](https://github.com/o3de/o3de/pull/13626), [#13628](https://github.com/o3de/o3de/pull/13628), [#13669](https://github.com/o3de/o3de/pull/13669))
* Several small improvements to viewport camera behavior ([#12882](https://github.com/o3de/o3de/pull/12882), [#13408](https://github.com/o3de/o3de/pull/13408), [#13433](https://github.com/o3de/o3de/pull/13433), [#13590](https://github.com/o3de/o3de/pull/13590), [#13626](https://github.com/o3de/o3de/pull/13626), [#13628](https://github.com/o3de/o3de/pull/13628), [#13669](https://github.com/o3de/o3de/pull/13669))
* Improved Editor extensibility with the introduction of a new [Action Manager API](https://www.o3de.org/docs/user-guide/action-manager/) that allows adding menus, hotkeys, and, contextual actions from Gems and Python scripts.


### sig-core

* Added a new performance metrics logging API to AzCore. ([#12252](https://github.com/o3de/o3de/pull/12252), [#12476](https://github.com/o3de/o3de/pull/12476), [#12483](https://github.com/o3de/o3de/pull/12483), [#13202](https://github.com/o3de/o3de/pull/13202), [#13596](https://github.com/o3de/o3de/pull/13596))
- The API provides the following pairs of classes to output JSON recorded metrics: `AZ::Metrics::IEventLogger` and `AZ::Metrics::JsonTraceEventLogger`, and `AZ::Metrics::IEventFactory` and `AZ::Metrics::EventFactoryImpl`.
	- The `AZ::Metrics::JsonTraceEventLogger` implements the `AZ::Metrics::IEventLogger` interface which allows logging metrics to the [Google Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#).
	- The `AZ::Metrics::EventFactoryImpl` implements the `AZ::Metrics::IEventFactory` API and provides a registrar for mapping a numeric identifier to `AZ::Metrics::IEventLogger` implementations.  
	- Metrics files should ideally be output to an active projects `<project-root>/user/Metrics` directory.  
	- The metrics are loadable in a chromium-based browser `about::tracing` page or via [chromium's standalone trace viewer application](https://google.github.io/trace-viewer/).  For more examples of how to use the performance metrics logging API refer to the examples usages in the [Performances Metrics Gathering API document](https://o3de.org/docs/user-guide/programming/metrics/). 
* Updated AZ Allocators so they are now created on-demand, instead of requiring explicit `Create` and `Destroy` calls. This allows `AZStd` containers, which use AZ Allocators, to be used anywhere, including in global static variables. Developers who subclass the `PoolAllocator`, would need to change their code to ensure all their construction happens in the constructor instead of in the `Create()` method.
* Improved the Scene Settings UX to remove points of friction and confusion, with a focus on default prefabs, level-of-detail (LOD) and character-based workflows.
* Updated the Open Asset Import Library to version 5.2.5 to support asset pipeline improvements. Brings a large number of important bug fixes for compression, out-of-bounds errors, crashes, memory allocation and import issues.
* Upgraded Google Benchmark library ([#13630](https://github.com/o3de/o3de/pull/13630))
* Fixed Math unit tests on Android and enabled NEON instructions by default ([#13739](https://github.com/o3de/o3de/pull/13739), [#13783](https://github.com/o3de/o3de/pull/13783), [#13792](https://github.com/o3de/o3de/pull/13792))


### sig-graphics-audio

* Updated DccScriptingInterface Gem to configure and bootstrap DCC tools like Maya and Blender from the Editor, and to provide workflow utilities like a streamlined "Scene Exporter" to get cleaner content to O3DE projects.
* Added RHI bindless support which allows RHI to manage bindless heap for all image and buffer views across all backends. It caches view descriptors on the GPU memory and provides access to the index in the unbounded array to RPI at runtime. This index can be used by features to indirectly access image or buffer views on the GPU within the shader. Instead of managing your own custom unbounded arrays for buffer and image views features can now simply use the one managed by RHI. As a result RHI bindless support is now being used by Terrain and Ray Tracing.
* Added Material Canvas ([sig-graphics-audio#51](https://github.com/o3de/sig-graphics-audio/issues/51))<br>Material Canvas is now available for users to create new, custom shaders and materials. Material Canvas is built upon the combined foundations of script canvas and Material Editor, offering most of the same features and UX as both. Users are able to visually edit, drag, drop, connect, and configure graphical nodes that are automatically transformed into all of the required source files that would otherwise need to be hand created and manually managed.
	* Typically, the generated source files include shader configurations, AZSL source, material types, and a default material. As these files are generated, they are automatically recognized and processed by the AP, displayed in the Viewport, and made available for use in the Material Editor, material component, and other aspects of the engine that use shaders and materials.  
	* Approximately 150 nodes are provided out-of-the-box. Most of those represent AZSL intrinsic functions, constant values, input values, output nodes, and other types. Material output nodes are the main notes for any material graph. They define a template that encapsulates all of the data and dependencies to tell Material Canvas what to generate when it compiles the graph. When a material output node has been added to the graph, users will begin to refer to files generating, assets building, in the viewport updating with subsequent changes.  
	* All current material graph nodes are implemented as simple JSON configuration files, listing all of the input and output slots, data types, default values, snippets of shader code, and other metadata. The new library is fully extensible and customizable by simply adding new JSON files.  
	* Material Canvas can also open and provide tools for creating and editing the material graph node files. These can live in any Gems or projects but they must have a unique UUID in every file. There are several examples for all of the existing nodes in the Material Canvas project.  
	* Like Material Editor, most or all aspects of the tool are also exposed through behavior context reflection for Python automation.  
	* Additional testing and documentation are in progress.   
* Improved CPU performance such that an 8 core CPU with an NVIDIA 2080 can handle 9000 static and 1000 dynamic entities at greater than 30fps at 1080p
* Added support for Terrain nodes in Landscape Canvas. For more information, refer to [Create Terrain from Images](https://www.o3de.org/docs/learning-guide/tutorials/environments/create-terrain-from-images/).
* Added a generic paintbrush workflow and implemented the ability to paint both heights and color directly in the Editor Viewport for the Terrain System.
  
  The paint brush workflow also includes runtime scripting support for real-time modifications of the terrain using a painting API.  
	* Generalized Paint Brush documentation: https://www.o3de.org/docs/user-guide/components/reference/paintbrush/paintbrush/  
	* Image Gradient Component with Paint Brush support: https://www.o3de.org/docs/user-guide/components/reference/gradients/image-gradient/  
	* Terrain Macro Material Component with Paint Brush support: https://www.o3de.org/docs/user-guide/components/reference/terrain/terrain-macro-material/  
* Added the Terrain Developer Guide that explains how developers can use and extend the terrain system: [Terrain Developer Guide](https://www.o3de.org/docs/user-guide/visualization/environments/terrain/terrain-developer-guide/).
* Updated Sphere and disk lights to support shadow caching, which is accessible as a checkbox on the light component. This makes it so shadows do not re-render when nothing in their field of view has changed, and can greatly accelerate shadows on mostly static scenes. Models that have vertex animation in the shader can toggle on "Always moving" in the mesh component to ensure that they will always trigger updates when in the view of a cached shadow.
* Added support for stereoscopic rendering (such as VR support) via OpenXR within O3DE. This support was added through the Vulkan backend and it has been extensively tested using Quest 2. As part of this effort we are able to support Link mode where the rendering is done on PC and can be viewed on a stereoscopic display or the app can be run on the device natively. A special optimized VR pipeline has been added to Atom to help support running the app natively on the device.
* Expanded the texture streaming support to Vulkan backend. Now we have image streaming control which can load or evict texture mips automatically at runtime based on the streaming image pool's budget.
* Created the Material Pipeline, a layer of abstraction between lighting and materials. This involves updates to the shader library, material system, and builders. It uses new builders and new features from the asset system to build unique shaders for each render pipeline. Material types can provide custom data structures and evaluator functions for vertex, pixel, geometry, and lighting stages. The builder inserts any of the custom include files with overridden data types and functions as it builds all of the combinations of shaders listed in the material pipeline.  
	* The result of this is a concrete material type referencing all of the different combinations of shaders for each pipeline, with the customization stitched in. All of this is saved to the intermediate assets folder and processed by the AP to generate Final product material types and shaders. The material pipeline also includes a Lua script that will be invoked whatever material properties or the active render pipeline changes to enable or disable shaders based on the current state.  
	* All of the physically based rendering materials, as well as other shaders and material types included with Atom have been converted to the system.  
	* All of the Atom Sample Viewer (ASV) samples and tests have also been updated to use this system. ASV also includes different experimental render and material pipelines to demonstrate how existing materials that use this system can be applied to a standard, deferred rendering pipeline.
* Updated the temporal anti-aliasing (TAA) pass by splitting it into two passes, which allows the TAA's history buffer to be copied and separated from the TAA algorithm itself. This required a change to `PostProcessParent.pass` to reference `TaaParentTemplate` instead of `TaaTemplate`. If your project overrides `PostProcessParent.pass` and uses TAA, then it will need to be updated to point to the new TAA parent pass.


### sig-network

* Made a major update to the [Multiplayer Sample game](https://github.com/o3de/o3de-multiplayersample) that provides a feature rich game experience with UX, audio, VFX, player versus player and player versus environment elements.
* Provided a new simple player spawner component that avoids the needs to write custom spawn logic ([#13871](https://github.com/o3de/o3de/pull/13871))
* Added new warnings when client and server have differences in networked code or properties, to aid debugging of these issues.
* Provided method for code separation between client and server side code to prevent any exposure of server side logic to clients. Provided a new Unified Launcher target to aid local testing.


### sig-platform

* Added new XR and OpenXRVk Gems that add VR support for OpenXR compatible devices. ([#12372](https://github.com/o3de/o3de/issues/12372))
	* Added support for Meta Quest 2 using a new multi-view render pipeline with simplified render passes for VR devices.
	* O3DE levels run on Meta Quest 2 in two ways: natively on device or from PC transmitting to device via Link cable.  
	* O3DE Editor's game mode runs on Meta Quest 2 (Link cable only), allowing to immediately experience in VR the changes done to your levels.  
	* New 'XR Camera Movement' component provides head-tracking camera movement and basic VR controller input to navigate through a level.  
	* Added OpenXRTest project with test levels (DefaultLevel and XR_Office) ready to run on Meta Quest 2.
	* Documented how to [build and run OpenXR in O3DE](https://github.com/o3de/o3de-extras/wiki/Build-and-Run-OpenXR-in-O3DE), how to use [profiling tools for Meta Quest 2](https://github.com/o3de/o3de-extras/wiki/Profiling-tools-for-Meta-Quest-2), and how to do [advanced GPU profiling on Meta Quest 2](https://github.com/o3de/o3de-extras/wiki/Advanced-GPU-profiling-tools-for-Meta-Quest-2).


### sig-simulation

* Added support for PhysX 5.1 ([#13624](https://github.com/o3de/o3de/issues/13624)).
	* O3DE now comes with optional support for PhysX 5.1 (PhysX 5.1 is off by default but may be enabled with `-DAZ_USE_PHYSX5=ON` when building O3DE). PhysX 5.1 brings a host of performance improvements as well as several new features.
	* PhysX 5.1 shows a 15% increase in simulation performance compared with PhysX 4.
	* With PhysX 5.1, mobile assets now use the more optimal structure eBVH34.
* Added support for compliant contacts ([#14852](https://github.com/o3de/o3de/issues/14852) - PhysX 5.1 only)
	* By using compliant contacts rigid bodies are able to model the way materials compress under collision. This is particularly important in fields such as robotics.
* Streamlined PhysX UX workflow ([#10668](https://github.com/o3de/o3de/issues/10668))
	* To upgrade, refer to steps in ([#10668](https://github.com/o3de/o3de/issues/10668#issuecomment-1476180502))
	* Several changes were made to clarify various PhysX authoring workflows. These included:
		* Make it easier for customers to understand the difference between static dynamic rigid bodies ([#14418](https://github.com/o3de/o3de/pull/14418))
			* Introduced a new Static Rigid Body Component to make a clearer distinction between dynamic and static colliders. New terminology was also introduced to distinguish kinematic or simulated dynamic rigid bodies.
		* Make it easier to author PhysX colliders ([#14850](https://github.com/o3de/o3de/pull/14850), [#14926](https://github.com/o3de/o3de/pull/14926), [#14907](https://github.com/o3de/o3de/issues/14907), [#14997](https://github.com/o3de/o3de/pull/14997))
			* Split the existing PhysX Collider in to PhysX Primitive Collider and PhysX Mesh Collider. This made creating simple colliders faster (for example, box, sphere, capsule, and so on) and separated the more complex case that requires a PhysX Mesh Asset (.pxmesh product) to be created in FBX Settings.
			* PhysX Mesh Collider component card shows the collider shape type of the PhysX Mesh Asset.
			* Fixed Asset Scale in PhysX Mesh Collider component when asset used is exported as primitives.
		* Improved UX for rigid body component card ([#14024](https://github.com/o3de/o3de/pull/14024), [#13890](https://github.com/o3de/o3de/pull/13890), [#13557](https://github.com/o3de/o3de/pull/13557))
			* Made several small quality of life improvements to make the rigid body component card easier to use and understand.
		* Added support for 'Coordinate System Change' modifier to PhysX tab in Scene Settings. ([#14649](https://github.com/o3de/o3de/issues/14649))
* Added shape offset support ([#12370](https://github.com/o3de/o3de/issues/12370))
	* A significant change to how several (box, capsule and sphere) shape components define their dimensions. A new 'offset' property has been introduced to provide support for asymmetrical editing (e.g. Moving one side of a box does not also change the other). This dramatically improves the authoring experience of manipulating shapes. Component Modes supporting manipulators and 3D viewport editing have also been added.
* Improved Animation Asset Import ([#12387](https://github.com/o3de/o3de/issues/12387))
	* Made several quality of life improvements to the animation import process to make the overall experience more robust and straightforward.
* Added Animation Editor Unified Inspector Window ([#10666](https://github.com/o3de/o3de/issues/10666))
	*  A significant overhaul was made to the O3DE Animation Editor UI to bring it more inline with other O3DE tools. Numerous panels were either combined or removed to improve usability and consistency.
* Added Animation Editor AnimGraph Performance Visualizer ([#13490](https://github.com/o3de/o3de/pull/13490))
	* Added an option to display timing information for nodes in an AnimGraph to give real-time information on how long each node is taking to process. This gives invaluable information when profiling or optimizing an AnimGraph. _A big thank you to our friends at FragLab for contributing this feature back to O3DE_.
* Improved character performance in several character systems. ([#13920](https://github.com/o3de/o3de/pull/13920), [#14461](https://github.com/o3de/o3de/pull/14461))
* Improved Physics profiling and performance ([#13169](https://github.com/o3de/o3de/pull/13169), [#13258](https://github.com/o3de/o3de/pull/13258), [#13061](https://github.com/o3de/o3de/pull/13061), [#13021](https://github.com/o3de/o3de/pull/13021), [#14666](https://github.com/o3de/o3de/pull/14666), [#14350](https://github.com/o3de/o3de/pull/14350))
* Improved Physics Viewport ([#14199](https://github.com/o3de/o3de/pull/14199))
	* Physics colliders can now be clicked and selected in the 3D viewport
* Added support for reduced coordinate articulations ([#14851](https://github.com/o3de/o3de/issues/14851) - PhysX 5.1 only)
	* Reduced coordinate articulations are incredibly important for both robust and accurate simulation of joints. They are used extensively in robotics simulations when simulating devices such as a robotic arm.
	* This feature is in an early experimental state and must be enabled in the Settings Registry option: `/Amazon/Physics/EnableReducedCoordinateArticulations`
* Updated PhysX simulation to run on multiple threads on Linux. ([#14075](https://github.com/o3de/o3de/pull/14075))
* Removed deprecated Physics and Blast legacy materials. ([#9840](https://github.com/o3de/o3de/issues/9840), [#9839](https://github.com/o3de/o3de/issues/9839))
* Moved Blast Gem to experimental branch in `o3de-extras`. ([#13584](https://github.com/o3de/o3de/pull/13584))


## Known issues

* Levels and prefabs containing Polygon Prism components need to be re-saved when switching from PhysX 4 to PhysX 5.1 and vice versa.
* Material Canvas
  *  Load times need to be improved for graphs that contain thousands of nodes.  
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

