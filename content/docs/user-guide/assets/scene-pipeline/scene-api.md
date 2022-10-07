---
linkTitle: Scene API
title: SceneAPI
description: The API to execute logic inside the scene pipeline.
weight: 400
toc: true
---

The O3DE scene pipeline has two steps. First, a scene builder reads the content of the scene file and places it into an in-memory graph called the ```SceneGraph```. Then, this graph is used by various parts of the SceneAPI. For instance, read data can be presented to the user through the [Scene Settings](docs/user-guide/assets/scene-settings) interface, or converted to O3DE data. This approach makes it possible to add new formats to the Scene Pipeline while leveraging existing processing tools and code.

### SceneCore

At the heart of the Scene Pipeline is the SceneCore library. SceneCore provides all the base types, interfaces and containers used throughout the pipeline as well as several EBusses that are used to facilitate communication between the various parts that make up the SceneAPI.

SceneCore is the central library for the Asset Importer framework. It provides the storage for a graph (```SceneGraph```) that contains the in-memory representation of the imported data and a dictionary (```SceneManifest```) that contains the groups and rules that guide the exporting process. It also contains various utilities to make it easier to work with the graph and manifest. Lastly it contains a collection of interfaces that provides a common "language" for the import and export process to talk. Some of these interfaces are mandatory, such as the IManifestObject interface, in order for base functionality to be implemented. Others are optional, but advisable to implement as they make code reusable. As an example, if custom mesh data is loaded, it's advisable to have the data container implement the IMesh interface so the UI knows when to present the mesh to the user as a selectable option and for an exporter to know how to interpret the data. Of course, if this isn't desired, not implementing the IMesh interface will disable this functionality, but the new data can still be made available in the graph.

### SceneData

Concrete implementations for many of the interfaces and base types can be found in SceneData. Besides helpful default implementations, SceneData also contains many of the behaviors that control how the Scene Pipeline extracts information from the scene file. To load .fbx files specifically FbxSceneBuilder is used, which is responsible for reading .fbx files and converting to the in-memory ```SceneGraph```. These libraries are used by the SceneBuilderWorker that takes the instructions in the ```SceneManifest``` to convert the ```SceneGraph``` into O3DE assets.

### SceneUI

The editor plugin EditorAssetImporter adds a window to the editor to allow the user to configure the pipeline. Most of the UI elements used in this window are located in the ``SceneUI`` library so they can be shared with other tools.

## Scene builder components

The key functionality of the scene pipeline phases are controlled by a few types of scene builder components.

### Loading

Loading components are created just before loading begins and destroyed once loading has completed. Their purpose can range from loading a scene file to reading a particular field and adding its value to the SceneGraph. If loading components want to inject logic into an existing loader without changing code they can usually hook into a special EBus called the CallProcessor. By connecting to this EBus all events during loading are received but will be filtered to the ones bound to in the component. Binding can be done by calling “BindToCall” and specifying the member function to call. The CallProcessor will look at the argument for the bound function and only call that function if the event’s context matches the type of the argument.

### Generating

To allow for data optimizers to run before the export happens, the generation events are called. During the generation phase, components can respond to the scene generation event, and apply arbitrary transformations to the scene graph. For example, the mesh optimizer generation component identifies all mesh data nodes selected by a mesh group in the manifest, adds an optimized mesh to the scene graph so that other scene builders can reference it.

### Behavior

Unlike the loading and exporting components, behavior components don’t have a limited life cycle, instead they remain alive for as long as the SceneAPI is active. Their responsibilities also vary more greatly with responsibilities like:

* Creating and updating the manifest
* Providing meta-information on the graph and manifest
* React to UI events

If a particular task doesn’t fit in either loading or exporting components, behavior components are usually a good place to put the functionality in.

### Exporting

The exporting components work in a similar way to the loading components, though these only exist during processing and exporting rather than during loading. These components have the dual purpose of converting data in the graph to data types that are understood by the engine and saving the converted data in the appropriate files. When saving files, it’s important to use the paths provided by the Asset Processor to make sure the generated files are correctly monitored and end up in the correct location in the cache.
