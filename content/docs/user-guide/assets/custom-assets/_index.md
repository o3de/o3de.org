---
linkTitle: Custom Asset Types
title: Creating Custom Asset Types for your project or gem
description: A guide to the various ways you can create new types of assets and have the engine process and recognize them
weight: 700
toc: true
---

This topic is an overview of how you would create a new custom asset type in O3DE, and have it work with **Asset Browser**,
**Asset Processor**, **Asset Editor**, and the dependency tree.

### Overview of Asset Type registration
In general, the goal of creating a new type of asset should be that the new type of asset...
* ... appears in the Asset Browser for drag and drop, browse, and search operations.
* ... is registered with Asset Processor, and gets compiled/copied into the cache for use by the runtime.
* ... can be loaded by the runtime, streamed-in when necessary.
* ... can be edited and saved using some editor UI, such as the Asset Editor window or a custom UI.
* ... is dependency-aware, so that if an asset refers to another asset, O3DE is aware of the reference, so that
  the appropriate game data can be included in shipped builds or preloaded to optimize streaming.

The above goals are achieved with different parts from O3DE, each of which are customizable. 
The easiest way to get started is to use the [Generic Asset](./generic-assets.md) system to simplify registration and 
building of assets, as it comes with pre-made classes that do all the above for you.
You can then customize the behavior by replacing whichever parts of the pipeline you need to behave differently
from default.

The parts of O3DE that handle the above goals are:

* **The Asset Type** itself.  This is any C++ Class derived from `AZ::Data::AssetData`, and represents the loaded,
  in-memory image of the ready-to-use data.  This is the custom asset itself, and is what you ask the engine
  to load.  It must have a typeid expressed (in the form of a UUID) and that typeid is also the "type of the Asset"
  to the rest of O3DE.
* **Asset Handlers** are classes derived from `AZ::Data::AssetHandler`, and are responsible for loading data from 
  the cache into the `AZ::Data::AssetData`-derived class.  Each AssetHandler is associated with a type of Asset
  it handles.
  O3DE will invoke functions on the Asset Handler to create, destroy, and populate the `AssetData`-derived class
  with data from file stream.  More information about runtime asset usage can be found in [Runtime Asset Handling](/docs/user-guide/assets/runtime.md).
* An **Asset Builder**, registered to "build" that kind of asset, and emit dependencies for it.
  See [Asset Builders](/docs/user-guide/assets/pipeline/asset-builders.md) for more techincal information.
  It is the job of the Asset Builder to take source files and turn them into Assets for the cache.
  For example, the Texture Asset Builder reads source texture files such as JPEG, TIF, EXR, BMP, PNG, and
  compresses and extracts MIPS and transforms them into several optimized Atom Image asset files for 
  the Atom Image Handler to load into Atom Image assets.  Part of building an asset is examining it and
  extracting dependencies.
* Registration with the system via **Asset Busses**, so that O3DE can query the information it needs,
  for example, what file extension it should filter by, what the friendly name of the asset type is, 
  what its typeid is, how to display it on the UI, etc.

Making a new custom asset type involves the following steps:
* Creating your `AssetData`-derived class to hold your loaded data.
* Creating and registering a Handler on startup and associating it with that new type of Asset.
* Creating a builder and registering it to transform whatever your source data type is into the AssetData.
* Connecting to the various **Asset Busses** that will query other aspects, such as friendly display name,
  file extension.

Note that this doesn't cover things like creating a custom editor GUI to edit the source file in some visual way.
You **can create one**  but it is not mandatory for the asset to work in O3DE.  For example, your custom source file 
may be a file that is authored in another program such as a text editor, line art editor, animation tool, 
or a spreadsheet.   Instead of writing an entire spreadsheet editing system inside O3DE,
you would just use the best existing spreadsheet program you already are familiar with, and adapt it to the O3DE
ecosystem by writing the above types (Asset Handler, Asset Builder, Asset Bus handlers) to ingest it.  The Generic
Asset System registers the asset for editing within the existing Asset Editor window, providing a good starting
point for Assets which are essentially a set of properties that can be edited with a property grid.

| Topic Area | Description |
| --- | --- |
| [Generic Assets](generic-assets.md) | Generic Assets are the simplest way to start with custom assets.|
| [Python Asset Builder](builder) | With Python Asset Builder, you can create custom Asset Builders using Python.|

