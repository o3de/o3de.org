---
linkTitle: Scene API
title: Scene Pipeline SceneAPI
description: The API to execute logic inside the scene pipeline.
weight: 400
toc: true
---

Rather than traditional approaches that load a scene file and directly take all data from it for conversion, the O3DE scene pipeline takes a two-step approach. In the first step a scene builder reads the content of the scene file and places it into an in-memory graph called the ```SceneGraph```. This graph is then used by various parts of the SceneAPI, to for instance read data for converting to O3DE data or to present to the user through the Scene Settings. This approach makes it possible to add different formats to the Scene Pipeline without having to write code that deals with processing and UI and conversely allows for adding settings and processing steps that will work for any scene format.

### SceneCore

At the heart of the Scene Pipeline is the SceneCore library. SceneCore provides all the base types, interfaces and containers used throughout the pipeline as well as several EBusses that are used to facilitate communication between the various parts that make up the SceneAPI. 

SceneCore is the central library for the Asset Importer framework. It provides the storage for a graph (```SceneGraph```) that contains the in-memory representation of the imported data and a dictionary (```SceneManifest```) that contains the groups and rules that guide the exporting process. It also contains various utilities to make it easier to work with the graph and manifest. Lastly it contains a collection of interfaces that provide the a common "language" for the import and export process to talk. Some of these interfaces are mandatory, such as the IManifestObject, in order for base functionality to be implemented. Others are optional, but advisable to implement as they make code reusable. As an example, if custom mesh data is loaded, it's advisable to have the data container implement the IMesh interface so the UI knows when to present the mesh to the user as a selectable option and for an exporter to know how to interpret the data. Of course, if this isn't desired, not implementing the IMesh interface will disable this functionality, but the new data can still be made available in the graph.

### SceneData

Concrete implementations for many of the interfaces and base types can be found in SceneData. Besides helpful default implementations, SceneData also contains many of the behaviors that control how the Scene Pipeline extracts information from the scene file. To load .fbx files specifically FbxSceneBuilder is used, which is responsible for reading .fbx files and converting to the in-memory ```SceneGraph```. These three libraries are used by the ResourceCompilerScene, a plugin for the Asset Processor, that takes the instructions in the ```SceneManifest``` to convert the ```SceneGraph``` into O3DE assets. Finally, the editor plugin EditorAssetImporter adds a window to the editor to allow the user to configure the pipeline. Most of the UI elements used in this window are located in the SceneUI library so they can be shared with other tools.
