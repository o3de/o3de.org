---
description: ' Add a custom asset type to Open 3D Engine. '
title: Adding an Asset Type to O3DE
---

{{< preview-migrated >}}

When you develop a game, you might need to add a new kind of asset to O3DE. The new asset could be a configuration file, a game\-specific data asset, or structured data for which you created an editor. This topic guides you through the process of adding a custom asset type to O3DE.

For an overview of the O3DE asset system, see [Programming the O3DE AZCore Runtime Asset System](/docs/user-guide/assets/asset-system-programming.md).

**Topics**
+ [Overview](#asset-pipeline-asset-type-adding-overview-of-steps)
+ [A. Registering Your Asset with the Asset Pipeline](#asset-pipeline-asset-type-adding-registering-your-asset-with-the-asset-pipeline)
+ [B. Enabling the Engine to Load and Stream the Asset](#asset-pipeline-asset-type-adding-enabling-the-engine-to-load-and-stream-the-asset)
+ [C. Customizing UI Interaction](#asset-pipeline-asset-type-adding-customizing-ui-interaction)

## Overview 

At a high level, adding an asset type to O3DE involves three steps:

1. Registering the asset with the asset pipeline.

1. Enabling the O3DE engine to load and stream the asset.

1. Optionally customizing your asset's interaction with the O3DE Editor UI and the **Asset Browser**.

After this overview, each step is covered in more detail. Not all of the steps are required. The steps are arranged in order of increasing integration with the O3DE asset pipeline and editor.

### A. Register the Asset with the Asset Pipeline 

You register your asset with the asset pipeline for common operations like building, processing, copying, and deploying. This registration assigns an appropriate type ID to the asset type and enables the asset to be added to the cache and the asset database. Depending on your asset file type, you can register it by creating a copy rule or writing code.

#### Registering by Copying 

You can deploy your asset file by copying if the following are true:
+ The processed or compiled version of your asset is the same across all operating systems and devices.
+ The asset declares no dependencies on other assets.
+ The asset doesn't need to be rebuilt when other source files change.

#### Registering by Creating a Builder 

If your asset requires processing, compiling, or optimizing at run time, you can do one of the following:
+ Create a [BuilderSDK builder](/docs/user-guide/tutorials/assets/custom-builder.md) to transform your source asset into its compiled form.
+ If your asset is extracted from a scene file like FBX and you want to integrate with its corresponding pipeline, create a scene pipeline plug\-in.

#### Copying Versus Creating a Builder 

It might be inefficient to use your source assets in your game under the following circumstances:
+ You have extraneous tool data inside your asset that is not necessary to ship for each operating system or device.
+ You want to do verify or error check your files.
+ You want to optimize your data.

In these cases, consider writing a [BuilderSDK builder](/docs/user-guide/tutorials/assets/custom-builder.md) instead of just copying your raw assets, even if it only compresses or converts the assets into binary format.

### B. Enable the Engine to Load and Stream the Asset 

After you register your asset with the asset pipeline, you must enable the O3DE engine to load your asset type at run time and stream it asynchronously.

Enabling your asset for loading and streaming involves the following steps:

1. **Create an asset data type** - Create a class derived from `AZ::Data::AssetData` that represents your loaded asset data. This class must be registered with `AZ_RTTI`. The UUID of the class is also the UUID of your asset in the Asset Processor database.

1. **Create an asset handler** - Create a singleton class that derives from `AZ::Data::AssetHandler` that loads, saves, and reads your data from buffer.

1. **Register your asset type handler with the asset system** - To do this, implement a `RegisterHandler` function inside your handler.

1. **Use your custom asset** - Inside components, use `Asset<T>` members, which are reflected to the editor and for serialization, to refer to your asset.

### C. Customize UI Interaction 

Optionally, you can describe your asset to the UI (and other systems) and customize your asset's interaction with it, including with the **Asset Browser**.

1. **Describe your asset type to the UI** - Use the `AssetTypeInfoBus` to provide integration with UI features like the **Asset Browser**.

1. **Customize drag\-and\-drop behavior** - If you have components, you can add reflection to them to enable custom behavior. For example, when a game developer drags your asset to the viewport, you can make your component be the default component that is spawned.

1. **Customize the context menu** - You can add context menu actions to interact with your asset.

1. **Customize file open behavior** - Customize file open operations to create custom behaviors when interaction occurs with your asset. For example, you can make your asset type open in a custom editor or create custom entities.

In addition, you can use the thumbnail API to generate thumbnails for your asset for use in the **Asset Browser** and other UI contexts. Although not described here, the related source code is located in the `Code\Framework\AzToolsFramework\AzToolsFramework\Thumbnails` directory.

## A. Registering Your Asset with the Asset Pipeline 

When you register your asset with the asset pipeline, you define your asset to the asset system and asset processor. Depending on your asset file type, you can register it by creating a copy rule or by writing a [BuilderSDK builder](/docs/user-guide/tutorials/assets/custom-builder.md).

### Copying Assets 

To copy assets, you typically create a copy rule in a configuration file. The configuration file that you use depends on your implementation goals.
+ To copy assets as\-is into the cache, add a copy rule to your `AssetProcessorPlatformConfig.ini` file.
+ If the asset type is specific to a gem, add it to your gem's root directory \(the directory with the `gem.json` file\) instead of to the `AssetProcessorGemConfig.ini`. This overrides the platform configuration file but is overridden by the game configuration file.
+ If the asset type is specific to the game project, add it to your game directory's `AssetProcessorGamePlatformConfig.ini` file instead of to the `AssetProcessorPlatformConfig.ini` file.

A copied asset uses a copy rule entry similar to the following example. Rule names must be unique. In the example, the `dba` copy rule copies `*.dba` files and uses a UUID to register their type. The asset shows in the catalog as the type that you designate. The type maps the asset to the `AssetHandler` that you create. This enables the handler to load the asset.

```
[RC dba]
glob=*.dba
params=copy
productAssetType={511562BE-65A5-4538-A5F1-AC685366243E}
version=1
```

For more information, see [Configuring the Asset Pipeline](/docs/user-guide/assets/configuring.md).

### Custom\-Built Assets 

For custom\-built assets, you can write a BuilderSDK builder or a Scene API plug\-in. If your asset is extracted from an `.fbx` file, you can write a Scene API plug\-in. With either approach, you do not need to edit `.ini` files as you do when copying assets.

#### Writing a BuilderSDK Builder 

When you write a BuilderSDK builder to create the asset, it should fill in the product info `struct` for each asset that it creates. The product info `struct` includes the following fields:


****

| Field | Description |
| --- | --- |
| Filename | The name of the asset file. |
| Asset type | The UUID of the class that you derived from Az::AssetData. |
| SubID | Any u32 integer that disambiguates different outputs from the same source. If your source files produce only one product, you can use 0. |
| Legacy SubIDs | SubIDs for backward compatibility. |

For more information and examples, see the [Asset Builder API](/docs/user-guide/tutorials/assets/custom-builder.md).

#### Writing a Scene API Plug\-in 

The Scene API provides boilerplate code so that you only have to write a few code hooks to create a plug\-in. For an example Scene API plug\-in, see the `SceneLoggingExample` Gem, which adds a scene plug\-in that outputs logs for each node in the file. The gem is a good starting point for your own code. You can replace the log outputs with the data collection and/or compiling functions that you want.

### Registration Versus Integration 

After you register the asset with the asset system, you can use the `AssetCatalogRequestBus` to find the asset in the catalog by its ID or other attributes. The result of the lookup gives you the asset's path, size, and other information. You can use [standard file handling](/docs/user-guide/engine/file-io.md) to load the asset.

While simple registration of an asset can be useful in some circumstances, full integration with the O3DE asset system offers many advantages, including the following:
+ Automatic live reloading
+ Automatic asynchronous streaming
+ Automatic drag\-and\-drop support in the **Asset Browser**
+ Thumbnails

## B. Enabling the Engine to Load and Stream the Asset 

The following sections describe the steps required for integration with O3DE's asset system.

### 1. Create an AssetData Type 

To represent an image that is usable in\-memory for your asset, derive a class from `AZ::Data::AssetData`. You do not load the asset from the `AssetData`\-derived class. Instead, the class actually represents your asset in memory, and the game uses it directly for processing. When you request the asset from `AssetManager`, the asset manager reference counts it, and the asset class is shared by any consumer of the asset. When you create an asset class, keep in mind the following:
+ You can place `AssetData`\-derived classes in gems.
+ Your asset class must have an AZ\_RTTI declaration, including a UUID for the class's type. The UUID that you use for this type is actually the asset type that it represents. The UUID matches the type that you use in your asset builder or your copy rule.
+ While an `AssetData`\-derived class typically contains asset data that it stores in memory and that you use at run time, this is not a requirement. If you have special requirements (like third\-party considerations), your class can simply provide a handle to a foreign system that contains the asset data.
+ For an example class that derives from `Az::Data::AssetData`, see the `ScriptCanvasAsset` class in the O3DE code at `Gems\ScriptCanvas\Code\Editor\Include\ScriptCanvas\Assets\ScriptCanvasAsset.h`.

#### Asset Instances and Asset Data 

It is important to understand the difference between asset `instances` and asset `data`.

An `AssetData`\-derived class contains the asset data that is shared among instances that use that data. Data that is specific to an instance should live in the instance itself. For example, an animation asset usually contains actual animation curves and samples. Only one such asset is loaded even if many characters use the animation. However, each character instance has an additional block of data that keeps track of the frame that the animation is on for the instance.

`AssetData` objects are not immutable, and often change over time. For example, textures can load higher level of detail (LOD) objects, and procedural meshes or textures can change over time. However, all instances that use an asset get the same pointer to the asset and therefore change when the asset changes. This is also true when instances have a pointer to an asset in a foreign system.

### 2. Create an Asset Handler 

You write an asset handler to read assets from buffer and convert them into your `AssetData` type. Only one such handler generally exists for each type of asset. The asset handler class is your asset factory for that type of asset because it can create and destroy your `AssetData`\-derived class. The `AssetHandler` is a singleton instance whose functions are called in asynchronous job threads.

**Note**
You can place asset handlers in gems. For information on adding code to gems, see [Using Gems to Add C++ Code to a O3DE Game](/docs/userguide/components/entity-system-pg-gems-code.md).

#### Using the Generic Asset Handler for Structured Data 

If your asset is a serialized `AZ::Reflected` `ObjectStream`, you can use `GenericAssetHandler`, located in the `Code\Framework\AzFramework\AzFramework\Asset\GenericAssetHandler.h` file. `GenericAssetHandler` calls the usual `Serialize` and `Deserialize` functions in its callbacks that load assets and registers your types for you.

Because assets like classes, lists, vectors, and properties are structured data, they are suitable for handling by `GenericAssetHandler`.

#### Writing a Handler for Custom Assets 

If you have a custom asset (like bytes or custom formats), you must write your own `AssetHandler`. To do so, implement the `CreateAsset`, `LoadAssetData`, and other functions in the following code:

```
// AZ::Data::AssetHandler
// CreateAsset is almost always implemented in the form:
// return aznew (your assetData class type)(id)
AZ::Data::AssetPtr CreateAsset(const AZ::Data::AssetId& id, const AZ::Data::AssetType& type) override;

// LoadAssetData is the main loading function. The stream that you are given is
// already attached to the file and ready to read into the 'asset' variable.
bool LoadAssetData(const AZ::Data::Asset<AZ::Data::AssetData>& asset, AZ::IO::GenericStream* stream, const AZ::Data::AssetFilterCB& assetLoadFilterCB) override;

// The following functions are for legacy compatibility. Most implementations of the functions
// simply wrap the file in a GenericStream and pass it to the LoadAssetData function above.
bool LoadAssetData(const AZ::Data::Asset<AZ::Data::AssetData>& asset, const char* assetPath, const AZ::Data::AssetFilterCB& assetLoadFilterCB) override;

// Destroy your asset in case you need to do cleanup. DestroyAsset usually just calls delete.
void DestroyAsset(AZ::Data::AssetPtr ptr) override;

// The AZ_RTTI type UUID(s) of your AssetData-derived classes.
void GetHandledAssetTypes(AZStd::vector<AZ::Data::AssetType>& assetTypes) override;

// CanHandleAsset usually returns true. Only useful if more than one handler is present for a single type.
bool CanHandleAsset(const AZ::Data::AssetId& id) const override;
```

After you create your handler, install the class that you derived from `AssetHandler`.

**To install your asset handler with the asset system**

1. Create an instance of the handler class in your component.

1. Call `RegisterHandler` on the asset manager instance. For an example, see the `Code\Framework\AzCore\AzCore\Script\ScriptSystemComponent.*` files.
**Note**
Your component does not have to be a system component, but the component must exist to handle load request calls.

#### Example Asset Handlers 

For example asset handlers, see `MeshAssetHandler`, `ParticleAssetHandler`, and `ScriptAssetHandler` in the following locations:

`Gems\LmbrCentral\Code\Source\Rendering\MeshAssetHandler.*`

`Gems\LmbrCentral\Code\Source\Rendering\ParticleAssetHandler.*`

`Gems\ScriptCanvas\Code\Editor\Include\ScriptCanvas\Assets\ScriptCanvasAssetHandler.h`

### 3. Register Your Asset Type and Handler with the Asset System 

In this step, register your handler to handle a specific asset type, which is the UUID of your asset data.

Typically, you implement the registration code inside your handler in a `RegisterHandler` function. You call the `RegisterHandler` function during initialization, as in the following example. The example code registers an `<AssetType>` \(that is, the UUID of the `AssetData` class type\) with the asset catalog.

```
AZ::Data::AssetCatalogRequestBus::Broadcast(&AZ::Data::AssetCatalogRequests::EnableCatalogForAsset, AZ::AzTypeInfo<AssetType>::Uuid());

AZ::Data::AssetCatalogRequestBus::Broadcast(&AZ::Data::AssetCatalogRequests::AddExtension, m_extension.c_str()); // The extension of your type.

// Register your handler.
AZ_Assert(AZ::Data::AssetManager::IsReady(), "AssetManager isn't ready!");
AZ::Data::AssetManager::Instance().RegisterHandler(this, AZ::AzTypeInfo<AssetType>::Uuid());
```

After you describe your asset type to the O3DE engine in this way, your custom asset becomes available in the **Asset Browser** for dragging and dropping. The asset displays its information and automatically updates.

### 4. Use Your Custom Asset in the Editor and Engine 

At this point, you can use your custom assets in your structures and components.

**To create components in the component editor**

1. Add fields of type `AZ::Data::Asset<T>` to your components. To do so, use the following syntax. In the following example, `MyAsset` is the class that you derived from `AssetData`.

   ```
   Az::Data::Asset<MyAsset> m_myAsset;
   ```

1. Reflect the fields that you added by using editor reflection. For more information, see [Reflecting a Component for Serialization and Editing](/docs/user-guide/engine/components/reflection.md).

1. (Optional) In the constructor of your class, override the `m_myAsset` constructor to implement the serializer's behavior. For more information, see `m_script` in the `Code\Framework\AzFramework\AzFramework\Script\scriptcomponent.cpp` file.

After you perform these steps, your component appears in the component editor. The component has a field to which you can drag and drop the asset from the **Asset Browser**. When the asset is dragged on the socket, the component accepts it. At this point, runtime or editor code can call functions like `QueueLoad` on the asset.

## C. Customizing UI Interaction 

(Optional) You can describe your asset type to the UI and then use [EBus listeners](/docs/user-guide/engine/ebus/_index.md) to customize your asset's interaction with the **Asset Browser**.

### 1. Describing Your Asset Type to the UI 

In addition to deriving your asset handler from `Az::Data::AssetHandler`, you can derive it from `AZ::AssetTypeInfoBus::Handler` for user interface purposes. `AssetTypeInfoBus` tells O3DE the friendly name of your asset type, enables it to appear in the **Asset Browser**, gives it icons, and provides other UI-related features.

```
// AZ::AssetTypeInfoBus::Handler
// Return the AZ_RTTI typeid of your AssetData.
AZ::Data::AssetType GetAssetType() const override;

// Get a friendly display name for the Asset Browser and GUI.
const char* GetAssetTypeDisplayName() const override;

// Get a friendly group name ("textures", "Meshes"...) for Asset Browser filtering.
const char* GetGroup() const override;

// Get the name of the icon image file to use in the Asset Browser.
// For example, "Editor\Icons\Components\StaticMesh.png".
const char* GetBrowserIcon() const override;

// Specify the AZ_RTTI type of an editor component for GetComponentTypeId.
// After doing so, dragging this asset type to the viewport will:
// 1) Spawn an entity with the component
// 2) Assign the asset to the component for you.
AZ::Uuid GetComponentTypeId() const override;
void GetAssetTypeExtensions(AZStd::vector<AZStd::string>& extensions) override;
```

#### Use EBus Listeners to Implement Custom Behavior 

To customize how your asset type interacts with the **Asset Browser** and viewport, use EBus listeners to override or supplement behaviors like the following:

1. Default drag\-and\-drop behavior for viewport operations.

1. Default context menu (right\-click) behavior for the **Asset Browser**.

1. Default file open behavior.

**Note**
Because a double\-click is a request to open a file, when you override file open behavior, you also override double\-click behavior.

### 2. Customizing Drag\-and\-Drop Behavior 

To customize the default drag\-and\-drop behavior, you can edit the existing code in the `AzAssetBrowserRequestHandler.cpp` file. A more modular approach is to add a handler with higher priority to your gem.

To customize the default drag\-and\-drop behavior, create code that listens on the `DragAndDropEventsBus`, as in the following example.

```
AzQtComponents::DragAndDropEventsBus::Handler::BusConnect(AzQtComponents::DragAndDropContexts::EditorViewport);
```

Your component now recieves the `DragEnter`, `DragMove`, `DragLeave`, and `Drop` events shown in the following code.

```
DragEnter(QDragEnterEvent* event, AzQtComponents::DragAndDropContextBase& context)
DragMove(QDragMoveEvent* event, AzQtComponents::DragAndDropContextBase& context)
DragLeave(QDragLeaveEvent* event)
Drop(QDropEvent* event, AzQtComponents::DragAndDropContextBase& context)
```

The events are described in the following table.


****

| Event | Description |
| --- | --- |
| DragEnter | Called when your item is dragged over the viewport. |
| DragMove | Called repeatedly after your item accepts the event. |
| DragLeave | Called when the item leaves the viewport, provided DragEnter accepted the event earlier. |
| Drop | Called if the game developer drops the item into the viewport. |

For more information, see `Code\Framework\AzQtComponents\AzQtComponents\Buses\DragAndDrop.h` and `Code\Sandbox\Editor\AzAssetBrowser\AzAssetBrowserRequestHandler.h`.

#### Priority of Handling 

Bus handlers on the `DragAndDropEventsBus` are sorted by the return value of `GetPriority()`. Because the first handler to accept the event gets priority, you can override the default behavior by positioning your component before others.

When assets from the **Asset Browser** are dragged, the `MimeData` function in the drag event contains one or more `AssetBrowserEntry` pointers.

Several utility functions make it easier to implement your drag handlers. The following example is from `Code\Sandbox\Editor\AzAssetBrowser\AzAssetBrowserRequestHandler.cpp`:

```
AssetBrowserEntry::ForEachEntryInMimeData<ProductAssetBrowserEntry>(event->mimeData(),
        [&](const ProductAssetBrowserEntry* product)
        {
            SpawnEntityAtPoint(product, viewportDragContext, spawnedEntities, spawnTicket);
        });
```

`ForEachEntryInMimeData<T>` takes one of the types of `AssetBrowser` entries \(`SourceAssetBrowserEntry`, `ProductAssetBrowserEntry`, `FolderAssetBrowserEntry`, `RootAssetBrowserEntry`\) and calls your callback for each of the entries found. You can use these callbacks to detect events and react to them appropriately.

#### Checking Event Ownership 

It is important to note that **Asset Browser** elements are not the only objects that go through this drag operations pipeline. Files and other objects of drag operations can produce drag events. For this reason, it is important to verify that a drag event that you received corresponds to your object before you take any action. Your code should not assume that your object is the one being dragged.

To perform the check, examine the event's `isAccepted()` Boolean property. If the event has already been accepted, do not take action. You can also check the status of the event by examining the `mimeData` attached in `event->mimeData()` to decide whether to accept it.

The following related code is from `AzAssetBrowserRequestHandler.cpp`:

```
// If a listener with a higher priority has already claimed the event, do not touch it.
ViewportDragContext* viewportDragContext = azrtti_cast<ViewportDragContext*>(&context);
if ((!event) || (!event->mimeData()) || (event->isAccepted()) || (!viewportDragContext))
 {
    return false;
 }
```

The O3DE drag\-and\-drop system uses the same semantics as the Qt drag and drop system. For more information, see [Drag and Drop](http://doc.qt.io/qt-5/dnd.html) in the Qt documentation.

### 3. Customizing the Context Menu 

Whenever the context menu is requested, an EBus is invoked that listeners can use to register additional actions to it. To add items to the context menu, monitor the `AssetBrowserInteractionNotificationsBus::Handler` and implement `AddContextMenuActions`, as in the following example.

```
// A notification that a context menu is about to be shown provides an opportunity to add actions to it.
virtual void AddContextMenuActions(QWidget* /*caller*/, QMenu* /*menu*/, const AZStd::vector<AssetBrowserEntry*>& /*entries*/) {};
```

### 4. Customizing File Open Behavior 

Right or double\-clicking an asset in the **Asset Browser** or elsewhere in the UI triggers the file open behavior. The default behavior passes the asset file to the operating system.

You can override this behavior by deriving from the `AssetBrowserInteractionNotificationsBus::Handler` and implementing `AddSourceFileOpeners`, as in the following code.

```
virtual void AddSourceFileOpeners(const char* /*fullSourceFileName*/, const AZ::Uuid& /*sourceUUID*/, SourceFileOpenerList& /*openers*/) {}
```

A source file opener provides the **Open with...** feature in the UI. You can return multiple source file openers if you have more than one.

The following code shows how to add source file openers.

```
void AssetBrowserContextProvider::AddSourceFileOpeners(const char* fullSourceFileName, const AZ::Uuid& sourceUUID, AzToolsFramework::AssetBrowser::SourceFileOpenerList& openers)
    {
        using namespace AzToolsFramework;
        // Get the details of the source file based on its UUID.
        if (const SourceAssetBrowserEntry* source = SourceAssetBrowserEntry::GetSourceByAssetId(sourceUUID))
        {
            // Specify actions to take when the source file is not handled.
            if (!HandlesSource(source))
            {
                return;
            }
        }
        // Create as many openers as you want. For each opener, specify a unique
        // identifier, an icon, and a Lambda function to call.
        openers.push_back({ "O3DE_FBX_Settings_Edit", "Edit Settings...", QIcon(), [this](const char* fullSourceFileNameInCallback, const AZ::Uuid& /*sourceUUID*/)
        {
            // sourceName must be an AZStd::string.
            AZStd::string sourceName(fullSourceFileNameInCallback);
            AssetImporterPlugin::GetInstance()->EditImportSettings(sourceName);
        } });
    }
```

If you implement an opener in this way, double\-clicks and other file open gestures call your opener instead of the operating system.

#### Preventing the OS from Opening a Custom File 

You can prevent a source file from being opened by the operating system even if you do not provide a file opener to replace it. For example, you might want to prevent the operating system from opening a file that is in a custom format that the OS cannot handle. To implement this, create an opener for the corresponding asset that has a `nullptr` for the callback.
