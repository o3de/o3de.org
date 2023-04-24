---
linkTitle: Runtime Asset System
title: Asset Runtime Asset System
description: Covers the use and working of the Open 3D Engine (O3DE) runtime asset system.
weight: 700
toc: true
---

The runtime asset system is responsible for loading and managing assets in the editor/launcher of O3DE.  An asset corresponds to a single file that has been proccessed by the Asset Processor into a Product Asset.  Each asset is given a unique ID called an AssetId which is composed of the UUID of the Source Asset along with the SubId of the Product Asset.

## Asset References

The [AZ::Data::Asset](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Asset/AssetCommon.h#L293) class is used to reference an `AssetData` object (an asset) and is essentially a smart pointer.  When all references to a given asset are released, the asset is unloaded.  When an `Asset<T>` type is saved to disk, it is saved as an AssetId that can be used to load the asset again later.


## Loading Assets at Runtime

The [AZ::Data::AssetManager](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Asset/AssetManager.h#L136) system is responsible for loading and managing assets at runtime.


`GetAsset` is the primary API used to load an existing asset.  It returns an `Asset<T>` reference.  Only one copy of an asset is loaded in memory at a time, so if an asset is already loaded or currently loading, no new load requests will be made; the `Asset<T>` returned will point to the same `AssetData` and will be ready when the load is finished (if it hasn't already finished).  `GetAsset` is a non-blocking asychronous API, meaning the asset data may not be available immediately after the call completes.

There are two ways to handle waiting for an asset load to complete: the blocking way is to call [BlockUntilLoadComplete](https://github.com/o3de/o3de/blob/18205539abf1b1d2eb3959c0a1c42a3eea16a455/Code/Framework/AzCore/AzCore/Asset/AssetCommon.h#L387) on the `Asset<T>` reference.  This will block the current thread until loading of the asset is completed.  The other (and recommended) option is to connect to the [AssetBus](https://github.com/o3de/o3de/blob/18205539abf1b1d2eb3959c0a1c42a3eea16a455/Code/Framework/AzCore/AzCore/Asset/AssetCommon.h#L527) and handle the `OnAssetReady`/`OnAssetReloaded` events for your asset.

Note that the engine does not currently support load cancelling (cancelling a load request before completion), making it possible to call `GetAsset` and then discard the result while waiting for `OnAssetReady` to be called.  It is best to avoid relying on this as it is not an intended feature.  Asset references should always be stored for as long as the asset is expected to be loaded (generally when the asset is in use).


### Dependency Loading

By default, the `AssetManager` will load all the dependencies of an asset before signalling an asset has completed loading.  Asset dependencies are recorded in the `AssetCatalog` and are determined by the Product Dependencies emitted by each builder.  There are 3 different load settings possible for dependencies (`AssetLoadBehavior`):
1. Preload - The dependency will complete loading before the parent asset is signalled ready.
2. QueueLoad - The dependency will start loading when the parent asset starts but will not be required to complete before the parent asset has been signalled ready.
3. NoLoad - The dependency will not be requested to load.  If the dependency is already loaded anyway, any references will still point to the already-loaded asset.

Keep in mind that regardless of the settings, AssetManager makes no guarantees on the order assets complete loading.

### Hot-Reloading

The Asset System provides support for hot-reloading, which is the updating of loaded, in-memory assets when the on-disk asset changes.  Hot-reloading allows content creators to quickly iterate on assets and see the changes update live without needing to restart the engine.  When the Asset Processor finishes processing an asset, a notification is sent out to the engine; if the asset in question is already loaded or loading, a reload request is queued and the Asset Manager starts loading the newly updated asset.  Each system utilizing the Asset System must implement support for this individually by handling the [OnAssetReloaded](https://github.com/o3de/o3de/blob/18205539abf1b1d2eb3959c0a1c42a3eea16a455/Code/Framework/AzCore/AzCore/Asset/AssetCommon.h#L603) event.

Often, projects copy data out of loaded assets to perform additional processing. A common error around asset reloading is to not refresh any copied data. For example, if your project is a game that uses an XML file to define the player's movement speed, and when this XML file is loaded, the information is copied to a component on the player entity, then when a reload event occurs, it's important to also re-copy the information over to the player entity. Otherwise, the player will continue to move at the old movement speed, even if the XML file is updated to change it.

## Asset Processing Prioritization

The following are generally only relevant during project development, when assets aren't always processed ahead of time before running the engine.  In a release project where all assets have been compiled and bundled, these concepts do not apply.

### Critical Assets

Critical assets are assets which are required to start the engine and must be processed by the Asset Processor before start-up can complete.  Critical assets are prioritized by Asset Processor before any other type of asset.  They are declared by Asset Builders as part of the [Job Descriptor](https://github.com/o3de/o3de/blob/18205539abf1b1d2eb3959c0a1c42a3eea16a455/Code/Tools/AssetProcessor/AssetBuilderSDK/AssetBuilderSDK/AssetBuilderSDK.h#L446).  The exception to this is if a critical asset has a Job Dependency on a non-critical asset, the non-critical asset will be processed first.  It is recommended to keep these type of assets to a minimum as they can considerably impact the time taken to start the engine.

### Asset Job Escalation

As an alternative to critical assets, the Asset Processor supports Job Escalation, which can be used to make Asset Processor prioritize the processing of a given asset before other assets.  The `AssetSystemBus` offers a set of [CompileAssetSync](https://github.com/o3de/o3de/blob/18205539abf1b1d2eb3959c0a1c42a3eea16a455/Code/Framework/AzFramework/AzFramework/Asset/AssetSystemBus.h#L199) APIs which can be used to request the Asset Processor escalate the compiling of an asset and blocks until compilation is complete.

For a non-blocking escalation request, see the [EscalateAsset](https://github.com/o3de/o3de/blob/18205539abf1b1d2eb3959c0a1c42a3eea16a455/Code/Framework/AzFramework/AzFramework/Asset/AssetSystemBus.h#L248) APIs.