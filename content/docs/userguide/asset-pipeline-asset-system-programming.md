# Programming the Lumberyard AZCore Runtime Asset System<a name="asset-pipeline-asset-system-programming"></a>

The Lumberyard Editor and Lumberyard runtime code use the AZCore runtime asset system to asynchronously stream and activate assets\. This topic describes the workflow of the classes in the asset system and shows how to load already\-built assets into a running instance of the engine\.

**Note**  
For information on compiling and building assets, see [Working with the Asset Pipeline and asset files](asset-pipeline-intro.md)\.

## Asset System Classes<a name="asset-pipeline-asset-system-programming-asset-system-classes"></a>

The Lumberyard asset system includes the following classes and class families:
+ [AZ::Data::AssetData Derived Classes](#asset-pipeline-asset-system-programming-azdataassetdata-derived-classes)
+ [AZ::Data::AssetManager](#asset-pipeline-asset-system-programming-azdataassetmanager)
+ [AzFramework::AssetCatalog](#asset-pipeline-asset-system-programming-azframeworkassetcatalog)
+ [AZ::Data::AssetHandler Derived Classes](#asset-pipeline-asset-system-programming-azdataassethandler-derived-classes)

The following sections describe these classes in detail\. For the source code, see the `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Asset` directory\.

### AZ::Data::AssetData Derived Classes<a name="asset-pipeline-asset-system-programming-azdataassetdata-derived-classes"></a>

An `AssetData` class represents the data of an asset that is loaded in memory\. To describe a particular kind of asset, derive from the `AssetData` base class\. The base class provides an `AssetID` and a reference count member variable for the asset\.

The following Lumberyard classes derive from `AssetData`:


****  

| AssetData Class | Source Code Location | 
| --- | --- | 
| ScriptAsset | lumberyard\_version\\dev\\Code\\FrameworkNoteBeg\\AzCore\\AzCore\\Script\\ScriptAsset\.h | 
| SliceAsset | lumberyard\_version\\dev\\Code\\Framework\\AzCore\\AzCore\\Slice\\SliceAsset\.h | 
| MeshAsset | lumberyard\_version\\dev\\Gems\\LmbrCentral\\Code\\include\\LmbrCentral\\Rendering\\MeshAsset\.h | 
| ParticleAsset | lumberyard\_version\\dev\\Gems\\LmbrCentral\\Code\\include\\LmbrCentral\\Rendering\\ParticleAsset\.h | 

**Note**  
Adding your own asset type to Lumberyard includes the following high\-level steps:  
Derive your type from `AssetData`\.
Declare an `AZ_RTTI` type for the asset to ensure that it has a UUID\.
Add the member fields or structs that store your data in memory at run time\.
For more information, see [Adding an Asset Type to Lumberyard](asset-pipeline-asset-type-adding.md)\.

### AZ::Data::Asset<T> Templated Class<a name="asset-pipeline-asset-system-programming-azdataassett-templated-class"></a>

Typically, components which use assets directly or indirectly do not have a pointer to your `AssetData`\-derived class; instead, they have a member of type `Asset<T>`\. The `AZ::Data::Asset<T>` templated class is a wrapper that is similar to a smart pointer, and the `T` templated type is an `AssetData`\-derived class\.

The use of `Asset<T>` provides the following benefits:
+ Automatic dependency tracking for components that are part of slices\.
+ Automatic reference counting\.
+ Automatic reloading of asset data when the asset changes on disk\.
+ Explicit lifecycle management functions like `IsLoaded()` and `QueueLoad()`\.
+ Reference count tracking to ensure correct behavior for copy operators\.
+ The ability to control how the `Asset<T>` class loads data\. To specify how the asset loads, you pass flags to the constructor of the `Asset<T>` member variable\.

The following options are possible:
+ The class automatically starts loading its data\. The class waits for the data to be ready before it activates the component for which the data is intended\.
+ The class queues the load of your asset data\.
+ The class waits for you to load the data explicitly\.

**Note**  
A loaded asset remains loaded as long as an active `Asset<T>` points to it\. The asset manager does not reference count the asset\. The asset is unloaded when the last system with a reference to the `Asset<T>` drops its reference and the reference count on the asset goes to `0`\. 

#### Integration with UI Property Grids<a name="asset-pipeline-asset-system-programming-integration-with-ui-property-grids"></a>

The `Asset<T>` member fields of your component can appear in UI property grids like those in the Entity Inspector\. To make a component's field available in Lumberyard Editor, make the `Asset<T>` field a member variable and reflect it into the editor\. When you do so, game developers can drag an asset from the **Asset Browser** onto the property field to assign the asset to the component\.

Note the following points:
+ Reflect the `Asset<T>` member variable just as you reflect other member variables of your component\.
+ Lumberyard handles asset IDs for you automatically\. You do not have to handle them explicitly\.
+ `Asset<T>` fields serialize the `AssetId` and other information such as the last known name of that `AssetId`\.
+ After an `AssetId` is assigned to a component, the `AssetId` is saved when the component is saved\. The next time the component loads, the asset is automatically loaded if you specified the appropriate flag in the `Asset<T>` constructor\.

### AZ::Data::AssetManager<a name="asset-pipeline-asset-system-programming-azdataassetmanager"></a>

`AZ::Data::AssetManager` is the central hub for retrieving assets\. If you configure the `Asset<T>` fields of a component to load their assets automatically, you do not need to communicate directly with the asset manager\. The `AssetManager` class performs the following tasks:
+ Maintains a hash table that maps asset IDs to the instances of `Asset<T>` that are currently loaded\.
+ Calls `FindAsset` to see if an asset is already loaded\. If the asset is not currently loaded, `FindAsset` returns a null reference\.
+ Automatically reloads assets as they change on disk\.
+ Notifies listeners about asset lifecycle changes\. Events like asset loading or unloading are signalled on the `AssetBus`\. The callback\-based adapter for this bus is called `AssetBusCallbacks`\. For more information, see the `AssetCommon.h` file\.

  To get an asset, call `GetAsset`\. If the reference count is greater than zero, `GetAsset` returns an `Asset<T>` that is already loaded\. If no `Asset<T>` is currently loaded, `GetAsset` starts loading a new instance of `Asset<T>`\.

#### Example: Loading an Asset Using Asset Manager<a name="asset-pipeline-asset-system-programming-example-loading-an-asset-using-assetmanager"></a>

The following code example uses `AssetManager` to load a script asset\.

```
m_scriptAsset = AZ::Data::AssetManager::Instance().GetAsset<AZ::ScriptAsset>(assetIdToLoad); 
AZ::Data::AssetBus::Handler::BusConnect(m_scriptAsset.GetId());
```

In the example, `m_scriptAsset` is a field of type `Asset<ScriptAsset>`\. 

For related code, see `lumberyard_version\dev\Code\Framework\AzToolsFramework\AzToolsFramework\ToolsComponents\ScriptEditorComponent.cpp`\.

Note the following points:
+ `GetAsset` loads the asset asynchronously\. By assigning the asset to the member `m_scriptAsset`, you ensure that the reference count is at least `1`\.
+ The code connects to the `AssetBus` to receive notifications when the script asset is loaded or becomes ready\.
+ If the asset is already loaded, the `AssetBus` delivers the `OnAssetReady` event as soon as the connection is made to the bus\. Because the connection to the bus triggers a callback about the asset's state, you do not have to write code to check the state\.

#### More About Automatic Reloading<a name="asset-pipeline-asset-system-programming-automatic-reloading-more-about"></a>

An asset can change on disk after the asset has been loaded \(and therefore has a reference count greater than zero\)\. When this occurs, the asset manager creates an instance of the updated asset and loads it in the background\. When the updated asset is finished loading, two `Asset<T>`'s temporarily exist\. One `Asset<T>` points to the old `AssetData` instance in memory, and one to the new\. Both instances have the same `AssetId`\. However, now when you request the asset by `AssetId`, the asset manager returns the new instance and increases the reference count of the new instance\. The asset manager also sends the `OnAssetReloaded(Asset<T>)` event to the `AssetBus`\. This notifies other systems to reload the asset by replacing their current member `Asset<T>` with the new instance\. It also keeps the reference count from reaching zero for the duration of the callback\.

The following code shows a component that has a member variable of type `Asset<T>` that handles live reloading\. First, the component connects to the bus to monitor for asset reloading events\.

```
// Connect to the asset bus at the address of my currently assigned asset. 
// This notifies me when the script reloads.
Data::AssetBus::Handler::BusConnect(m_script.GetId());
```

When the `AssetManager` notifies that a new script has been reloaded, the code for the `OnAssetReloaded` method cleans up old pointers\. The code also assigns the asset, which updates the reference count for the new and old versions of the asset\.

```
void ScriptComponent::OnAssetReloaded(AZ::Data::Asset<AZ::Data::AssetData> asset)
{
    // Clean up any pointers to the old AssetData.
    UnloadScript(); 
    m_script = asset;  // This assignment increments the reference count of the new asset. 
                         // The old asset reference count decrements. 
    // Re-establish state into the new AssetData.
    LoadScript();
}
```

Because `m_script` is of type `Asset<ScriptAsset>`, it can simply use `Asset<T>`'s operator= to drop the reference count on the old `Asset<T>` and replace it with the new `Asset<T>`\.

This way of handling automatic reloading gives components the flexibility to decide how to deal with changes to assets\. For example, components might choose among the following options:

1. Save the new `Asset<T>` on a queue and for later processing\.

1. Discard the new `Asset<T>` and keep the old data\.

1. Swap the references to the old and new versions immediately, as the script component does\.

Note the following points:
+ Because `Asset<T>` instances are reference counted, the internal `AssetData` object that they wrap is not deleted until all classes that have a reference to it clear that reference\.
+ If `OnAssetReloaded` is called and the code does not store the new `Asset<T>`, the reference count becomes zero and the asset is unloaded\. Existing `Asset<T>` instances that point at the old data remain valid until they are dropped\.
+ Because messages like `OnAssetReloaded` are always delivered in the main thread, mutexes are not required\.

### AzFramework::AssetCatalog<a name="asset-pipeline-asset-system-programming-azframeworkassetcatalog"></a>

The asset catalog is a set of lookup tables that notifies the Lumberyard asset system when assets on the file system change\. The asset manager monitors the `AssetCatalogEventBus`\. When the bus delivers the `OnCatalogAssetChanged` event, the asset manager starts upgrading assets\. This is how live reloading is implemented\.

To receive notifications about assets that change on disk, connect to the `AssetCatalogEventBus`\. Then use the `AssetCatalogRequestBus` to make requests to the `AssetCatalog` to resolve assets by ID\. For details, see the `AssetManagerBus.h` file\.

The `AssetCatalogRequestBus` contains other functions that look up asset dependencies, enumerate assets, and perform other low\-level tasks\. In most cases you do not have to use these functions directly\.

**Note**  
You do not have to use the asset catalog directly unless you write low\-level code that performs custom file processing\. If you use the higher level systems like `Asset<T>`, `AssetData`, and `AssetManager`, these classes communicate with the catalog for you\. 

To look up asset file information manually, you can pass an `AssetId` to the `AssetCatalog`\. `AssetCatalog` returns a struct that contains the file's type, size, canonical name, and location\.

### AZ::Data::AssetHandler Derived Classes<a name="asset-pipeline-asset-system-programming-azdataassethandler-derived-classes"></a>

When you [create a new type of asset](asset-pipeline-asset-type-adding.md), you also create an `AssetHandler` for the new asset type\. The role of the asset handler is to create, load, save, and destroy assets when the asset manager requests it\. After your asset handler creates an empty instance of your asset type, it loads serialized data into the in\-memory representation of `AssetData`\.

To create a handler for a specific asset type, derive from the `AssetHandler` class and register an instance of the handler with the asset manager\. Because asset handling functions can be called from multiple threads, the handlers must be thread\-safe\. The handler can block the calling thread while the asset is loading\.

## Asset System Workflow<a name="asset-pipeline-asset-system-programming-asset-system-workflow"></a>

Lumberyard loads assets in the following two ways:
+ **Implicit** – When classes and structs contain `Asset<T>` members\. When a structure deserializes, the serialization system checks whether the structure contains a member of type `Asset<T>`\. If so, the serialization system calls `GetAsset()` to retrieve the asset from `AssetManager`\.
+ **Explicit** – When `AssetManager`::`GetAsset()` or `Asset<T>::QueueLoad` is called explicitly\.

The following steps summarize the workflow of the asset system\.

1. `GetAsset(assetId)` calls `AssetManager` implicitly \(through the serialization system\) or explicitly\.

1. `AssetManager` calls `GetAssetInfoById` to retrieve the information about the asset file\.

1. If the asset is already loaded in the `m_assets` asset map, `AssetManager` returns a new `Asset<T>` instance of the existing asset and increments the reference count\.

1. If the asset is not already loaded, `AssetManager` uses the information returned by `GetAssetInfoById` to look up the `AssetHandler` for the asset type\.

   1. `AssetManager` calls the asset handler's `CreateAsset` function to create a new empty instance for the data\.

   1. `AssetManager` inserts the asset into the empty instance\.

   1. `AssetManager` creates a loading job in a job worker thread pool\. To load the asset data, the thread pool calls the `loadAssetdata` function on the handler in the worker pool\.

   1. If the `AssetManager` was told to block while the asset loads, it stops processing until the asset is loaded\.

   1. `AssetManager` returns the `Asset<T>` member\.

## Conclusion<a name="asset-pipeline-asset-system-programming-conclusion"></a>

While `AssetCatalog`, `AssetHandler`, and `AssetData` are part of the asset system, consumers of an asset deal only with `Asset<T>` and `AssetManager`\.