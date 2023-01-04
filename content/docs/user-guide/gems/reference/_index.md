---
linkTitle: Gem Reference
title: Gem Reference in Open 3D Engine
description: Gems provided by Open 3D Foundation to add code and asset functionality to your Open 3D Engine (O3DE) projects.
weight: 100
toc: true
---

*Gems* are redistributable packages that contain source code and assets that you can include in your **Open 3D Engine (O3DE)** projects to add new functionality. O3DE provides the following Gems:

## Animation

| Gem | Description |
| - | - |
| [EMotion FX Animation](./animation/emotionfx) | The EMotion FX Animation Gem provides Open 3D Engine's animation system for rigged actors and includes Animation Editor, a tool for creating animated behaviors, simulated objects, and colliders for rigged actors. |
| [Maestro Cinematics](./animation/maestro) | The Maestro Cinematics Gem provides Track View, Open 3D Engine's animated sequence and cinematics editor. |

## Artificial Intelligence

| Gem | Description |
| - | - |
| [Kythera AI](./kythera-ai/) | The Kythera AI Gem provides support for Kythera AI features in Open 3D Engine (O3DE), and includes a demo project, levels, and assets that demonstrate the features of Kythera AI. |
| [Recast Navigation](./ai/recast/recast-navigation) | The Recast Navigation Gem provides support for building navigation meshes and calculating walkable paths within those navigation meshes. It uses open source library [Recast Navigation](https://github.com/recastnavigation/recastnavigation). An example of its use can be found in AutomatedTesting project in Navigation Sample level. |


## Assets

| Gem | Description |
| - | - |
| [Asset Validation](./assets/asset-validation) | The Asset Validation Gem provides seed-related commands to ensure assets have valid seeds for asset bundling. |
| [Custom Asset Example](./assets/custom-asset-example) | The Custom Asset Example Gem provides example code for creating a custom asset for Open 3D Engine's asset pipeline. |
| [Dev Textures](./assets/dev-textures) | The Dev Textures Gem provides a collection of general purpose texture assets useful for prototypes and preproduction. |
| [Prefab Builder](./assets/prefab) | The Prefab Builder Gem provides an Asset Processor module for prefabs, which are complex assets built by combining smaller entities. |
| [Primitive Assets](./assets/primitive-assets) | The Primitive Assets Gem provides primitive shape mesh objects with physics enabled. |
| [Scene Processing](./assets/scene-processing) | The Scene Processing Gem provides FBX Settings, a tool you can use to specify the default settings for processing .fbx files for actors, meshes, motions, and PhysX. |
| [Test Asset Builder](./assets/test-asset-builder) | The Test Asset Builder Gem is used to feature test Asset Processor. |

## Audio

| Gem | Description |
| - | - |
| [Audio Engine Wwise](./audio/wwise/audio-engine-wwise) | The Wwise Audio Engine Gem provides support for Audiokinetic Wave Works Interactive Sound Engine (Wwise). |
| [Audio System](./audio/audio-system) | The Audio System Gem provides the Audio Translation Layer (ATL), which adds support for audio in your Open 3D Engine projects. |
| [Microphone](./audio/microphone) | The Microphone Gem provides support for audio input through microphones. |

## AWS

| Gem | Description |
| - | - |
| [AWS Client Auth](./aws/aws-client-auth) | The AWS Client Auth Gem provides solutions for client authentication and AWS authorization. |
| [AWS Core](./aws/aws-core) | The AWS Core Gem provides basic shared AWS functionality such as AWS SDK initialization and client configuration. |
| [AWS Metrics](./aws/aws-metrics) | The AWS Metrics Gem provides a solution for AWS metrics submission and analytics. |
| [AWS GameLift](./aws/aws-gamelift) | The AWS GameLift Gem provides a framework to extend the O3DE networking layer and Multiplayer Gem to work with Amazon GameLift. |

## Core

| Gem | Description |
| - | - |
| [O3DE Core (LmbrCentral)](./o3de-core) | The O3DE Core (LmbrCentral) Gem provides required code and assets for running Open 3D Engine Editor. |

## Debug

| Gem | Description |
| - | - |
| [Crash Reporting](./debug/crash-reporting) | The Crash Reporting Gem provides support for external crash reporting for Open 3D Engine projects. |
| [Debug Draw](./debug/debug-draw) | The Debug Draw Gem provides Editor and runtime debug visualization features for Open 3D Engine. |
| [Immediate Mode GUI (IMGUI)](./debug/imgui) | The Immediate Mode GUI Gem provides the 3rdParty library IMGUI which can be used to create run time immediate mode overlays for debugging and profiling information in Open 3D Engine. |
| [Remote Tools](./debug/remote-tools) | The Remote Tools Gem facilitates connections between Open 3D Engine applications for debugging purposes. |
<!-- | [Automated Launcher Testing](./debug/automated-launcher-testing) | The Automated Launcher Testing Gem manages automated Open 3D Engine (O3DE) launcher tests. | -->

## Design

| Gem | Description |
| - | - |
| [White Box](./design/white-box) | The White Box Gem provides White Box rapid design components for Open 3D Engine. |

## Environment

| Gem | Description |
| - | - |
| [Landscape Canvas](./environment/landscape-canvas) | The Landscape Canvas Gem provides the Landscape Canvas editor; a node-based graph tool for authoring workflows to populate landscape with dynamic vegetation. |
| [Surface Data](./environment/surface-data) | The Surface Data Gem provides functionality to emit signals or tags from surfaces such as meshes and terrain. |
| [Vegetation](./environment/vegetation) | The Vegetation Gem provides tools to place natural-looking vegetation in Open 3D Engine. |
| [Terrain](./environment/terrain) | The Terrain Gem provides a terrain system that maps height, color, and surface data to regions of the world. It also provides gradient-based and shape-based authoring tools and workflows, integrates with physics for physical simulation and efficiently renders terrain. |
<!-- | [Vegetation Gem Assets](./environment/vegetation-gem-assets) | The Vegetation Assets Gem provides vegetation models, textures, and other assets and samples for use with the Vegetation Gem and Landscape Canvas. | -->

## Framework

| Gem | Description |
| - | - |
| [Graph Canvas](./framework/graph-canvas) | The Graph Canvas Gem provides a C++ framework for creating custom graphical node based editors for Open 3D Engine. |
| [Graph Model](./framework/graph-model) | The Graph Model Gem provides a generic node graph data model framework for Open 3D Engine. |

## Gameplay

| Gem | Description |
| - | - |
| [Achievements](./gameplay/achievements) | The Achievements Gem provides a  target platform agnostic interface for retrieving achievement details and unlocking achievements. |
| [Game State](./gameplay/game-state) | The Game State Gem provides functionality to determine and manage game states in Open 3D Engine projects. |
| [Game State Samples](./gameplay/game-state-samples) | The Game State Samples Gem provides a set of sample game states (built on top of the  Game State Gem), including primary user selection, main menu, level loading, level running, and level paused. |
| [Tick Bus Order Viewer](./gameplay/tick-bus-order-viewer) | The Tick Bus Order Console Variable Gem provides a console variable that displays the order of runtime tick events. |

## Input

| Gem | Description |
| - | - |
| [Gestures](./input/gestures) | The Gestures Gem provides detection for common gesture-based input actions. |
| [Local User](./input/local-user) | The Local User Gem provides functionality for mapping local user ids to local player slots and managing local user profiles. |
| [Starting Point Input](./input/starting-point-input) | The Starting Point Input Gem provides functionality to map low-level input events to high-level actions. |
| [Starting Point Movement](./input/starting-point-movement) | The Starting Point Movement Gem provides a series of Lua scripts that listen and respond to input events. |
| [Virtual Gamepad](./input/virtual-gamepad) | The Virtual Gamepad Gem provides controls that emulate a gamepad on touch screen devices. |

## Multiplayer

| Gem | Description |
| - | - |
| [Multiplayer](./multiplayer/multiplayer-gem) | The Multiplayer Gem provides high-level, advanced multiplayer gameplay functionality such as entity replication, local prediction, and server-side backward reconciliation. |
| [Multiplayer Compression](./multiplayer/multiplayer-compression) | The Multiplayer Compression Gem provides an open-source compressor to use with the Multiplayer Gem. |

## Network

| Gem | Description |
| - | - |
| [Certificate Manager](./network/certificate-manager) | The Certificate Manager Gem provides access to authentication files for secure game connections from Amazon S3, files on disk, and other 3rd party sources. |
| [Http Requestor](./network/http-requestor) | The HTTP Requestor Gem provides functionality to make asynchronous HTTP/HTTPS requests and return data through a user-provided call back function. |
| [Metastream](./network/twitch/metastream) | The Metastream Gem provides functionality for an HTTP server that allows broadcasters to customize game streams with overlays of statistics and event data from a game session. |
| [Presence](./network/presence) | The Presence Gem provides a target platform agnostic interface for Presence services. |
| [Twitch](./network/twitch/twitch) | The Twitch Gem provides access to the Twitch API v5 SDK including social functions, channels, and other APIs. |

## Physics

| Gem | Description |
| - | - |
| [NVIDIA Cloth (NvCloth)](./physics/nvidia/nvidia-cloth) | The NVIDIA Cloth (NvCloth) Gem provides functionality to create realistic cloth and fabric simulation. |
| [PhysX](./physics/nvidia/physx) | The PhysX Gem provides physics simulation with NVIDIA PhysX including static and dynamic rigid body simulation, force regions, ragdolls, and dynamic PhysX joints. |
| [PhysX Debug](./physics/nvidia/physx-debug) | The PhysX Debug Gem provides debugging functionality and visualizations for PhysX in Open 3D Engine (O3DE) projects. |
<!--| [NVIDIA Blast](./physics/nvidia/nvidia-blast) | The NVIDIA Blast Gem provides tools to author fractured mesh assets in Houdini, and functionality to create realistic destruction simulations in Open 3D Engine. | Hiding until blast tools are fixed and blast docs are updated.-->

## Rendering

| Gem | Description |
| - | - |
| [Atom Common Features](./rendering/atom/atom) | The Atom Gem provides Atom Renderer and its associated tools (such as Material Editor), utilites, libraries, and interfaces. |
| [Atom Content](./rendering/atom/atom-content) | The Atom Content Gem provides assets including models, textures, and materials, that  can be used to test Atom Renderer in  Open 3D Engine. |
| [Atom O3DE Integration](./rendering/atom/atom-o3de-integration) | The Atom O3DE Integration Gem provides components, libraries, and functionality to support and integrate Atom Renderer in Open 3D Engine. |
| [Atom TressFX](./rendering/amd/atom-tressfx) | The Atom TressFX Gem provides realistic hair and fur simulation and rendering in Atom and Open 3D Engine. |
| [Camera](./rendering/camera) | The Camera Gem provides a basic camera component that defines a frustum for runtime rendering. |
| [Camera Framework](./rendering/camera-framework) | The Camera Framework Gem provides a base for implementing more complex camera systems. |
| [PBR Reference Materials](./rendering/pbr-reference-materials) | The PBR Reference Materials Gem provides physically based reference materials for Open 3D Engine (O3DE) projects. |
| [Stars](./rendering/stars) | The Stars Gem provides physically-based animated resolution-independent distant stars. |
| [Starting Point Camera](./rendering/starting-point-camera) | The Starting Point Camera Gem provides the behaviors used with the Camera Framework Gem to define a camera rig. |
| [Video Playback Framework](./rendering/video-playback-framework) | The Video Playback Framework Gem provides the interface to play back video. |

## Robotics

| Gem | Description |
| - | - |
| [ROS2](./ros2/) | The Gem provides integration with ROS2 and enables design of simulation of robotics systems |

## Script

| Gem | Description |
| - | - |
| [Editor Python Bindings](./script/python/editor-python-bindings) | The Editor Python Bindings Gem provides Python commands for Open 3D Engine  Editor functions. |
| [Expression Evaluation](./script/expression-evaluation) | The Expression Evaluation Gem provides a method for parsing and executing string expressions. |
| [Python Asset Builder](./script/python/python-asset-builder) | The Python Asset Builder Gem provides functionality to implement custom asset builders in Python for Asset Processor. |
| [Script Canvas](./script/script-canvas) | The Script Canvas Gem provides Open 3D Engine's visual scripting environment Script Canvas. |
| [Script Canvas Developer](./script/script-canvas-developer) | The Script Canvas Developer Gem provides a suite of utility features for the development and debugging of Script Canvas systems. |
| [Script Canvas Physics](./script/script-canvas-physics) | The Script Canvas Physics Gem provides Script Canvas nodes for physics scene queries such as raycasts. |
| [Script Canvas Testing](./script/script-canvas-testing) | The Script Canvas Testing Gem provides a framework for testing for and with Script Canvas. |
| [Scripted Entity Tweener](./script/scripted-entity-tweener) | The Scripted Entity Tweener Gem provides a script driven animation system for Open 3D Engine projects. |
| [Script Events](./script/script-events) | The Script Events Gem provides a framework for creating event assets usable from any scripting solution in Open 3D Engine. |
| [Qt for Python](./script/python/qt-for-python) | The Qt for Python Gem provides the PySide2 Python libraries to manage Qt widgets. |

## SDK

| Gem | Description |
| - | - |
| [In-App Purchases](./sdk/in-app-purchases) | The In-App Purchases Gem provides functionality for in app purchases in Open 3D Engine projects. |

## UI

| Gem | Description |
| - | - |
| [LyShine](./ui/lyshine) | The LyShine Gem provides the runtime UI system and creation tools for Open 3D Engine projects. |
| [LyShine Examples](./ui/lyshine-examples) | The LyShine Examples Gem provides example code and assets for LyShine, the runtime UI system and editor for Open 3D Engine projects. |
| [Message Popup](./ui/message-popup) | The Message Popup Gem provides an example implementation of popup messages in an Open 3D Engine project. |
| [UI Basics](./ui/ui-basics) | The UI Basics Gem provides a collection of assets that can be used  with LyShine, the Open 3D Engine runtime User Interface system and editor. |

## Utility

| Gem | Description |
| - | - |
| [Fast Noise](./utility/fast-noise) | The Fast Noise Gradient Gem uses the third-party, open source FastNoise library to provide a variety of high-performance noise generation algorithms. |
| [Gradient Signal](./utility/gradient-signal) | The Gradient Signal Gem provides a number of components for generating, modifying, and mixing gradient signals. |
| [Save Data](./utility/save-data) | The Save Data Gem provides an API to save runtime data in Open 3D Engine projects. |
| [Scene Logging Example](./utility/scene-logging-example) | The Scene Logging Example Gem demonstrates the basics of extending the Open 3D Engine SceneAPI by adding additional logging to the pipeline. |
| [Texture Atlas](./utility/texture-atlas) | The Texture Atlas Gem provides the formatting for texture atlases in Open 3D Engine. |
