---
linkTitle: Scene Builder
title: Scene Builder
description: Specialized asset builder to interact with the scene pipeline.
weight: 400
toc: true
---

Scene building logic is stored in gems by creating `AZ::SceneAPI::SceneCore::LoadingComponent`, `AZ::SceneAPI::SceneCore::GenerationComponent`, `AZ::SceneAPI::SceneCore::BehaviorComponent`, and `AZ::SceneAPI::SceneCore::ExportingComponent` components. These gems are considered to be scene builder gems.

The SceneAPI processes source scene assets in three main phases: loading, generating, and exporting. During the loading phase, the scene graph is populated, usually from some source file like an FBX. This is done with LoadingComponent components. The LoadingComponent components have three different events where they can do work: PreImport, Import, and PostImport. The SceneGraph is populated during the Import event, but the PostImport event receives an immutable SceneGraph object, so by PostImport, the contents of the SceneGraph are fixed.

During the exporting phase, the scene graph is inspected by various scene builders, and game-ready product assets are written to disk. This is done with ExportingComponent components. All the events that the ExportingComponent components respond to receive an immutable SceneGraph object, so they also cannot modify the SceneGraph. This means that the only place where the graph is writable is during the import events.

Additionally, the scene is processed via the LoadingComponent components whenever the user wants to edit "Scene Settings" in the Editor, so it would be sub-optimal to always run the mesh optimizer when the user wants to edit settings. To allow for the mesh optimizer to run before the export happens, the generation events are called. During the generation phase, components can respond to the scene generation event, and apply arbitrary transformations to the Scene graph. The Mesh Optimizer generation component identifies all meshes selected by a Mesh group in the manifest, adds an optimized mesh to the SceneGraph so that other scene builders can reference it.

This design would make it possible to do other types of processes to modify the scene graph, like mesh splitting, or dynamic animation generation.

## Creating a scene builder gem

The scene builder framework is used in tool gems called Builder gems. The gem adds classes that derive from the scene building components base classes:  `AZ::SceneAPI::SceneCore::LoadingComponent`, `AZ::SceneAPI::SceneCore::GenerationComponent`, `AZ::SceneAPI::SceneCore::BehaviorComponent`, or `AZ::SceneAPI::SceneCore::ExportingComponent`. The new components use the `BindToCall' method to hook into the desired scene build events. Finally, the class descriptors are added to the gem module description.

### Example scene building class

All scene building components derive from one of the base scene building classes.

```cpp
class TheLoadingComponent
    : public AZ::SceneAPI::SceneCore::LoadingComponent
{
public:
    AZ_COMPONENT(TheLoadingComponent, "{E5E65E21-0BCD-4874-84B8-33E10CCAEE94}", AZ::SceneAPI::SceneCore::LoadingComponent);

    TheLoadingComponent();
    ~TheLoadingComponent() override = default;

    void Activate() override;
    void Deactivate() override;
    static void Reflect(AZ::ReflectContext* context);

    AZ::SceneAPI::Events::ProcessingResult OnPostImportEventContext(AZ::SceneAPI::Events::PostImportEventContext& context);
};
```

This class is setting up to hook into the PostImportEventContext event by sub-classing from `AZ::SceneAPI::SceneCore::LoadingComponent` then adding a OnPostImportEventContext method that accepts the PreExportEventContext context.

```cpp
TheLoadingComponent::TheLoadingComponent()
{
    BindToCall(&TheLoadingComponent::OnPostImportEventContext);
}
```

The example attaches the OnPostImportEventContext function to the OnPostImportEventContext so that this context is sent to the CallProcessorBus at the start of every conversion and import process.

The scene importing, converting, and exporting processes uses the CallProcessorBus to move data and trigger additional work. The CallProcessorBus operates differently than typical EBuses because it doesn't have a specific set of functions that you can call. Instead, it works like a pseudo-remote procedure call, where the arguments for what would normally be a function are stored in a context. The CallProcessorBus provides a single place to register and trigger the context calls. Based on the type of context, the appropriate functionality is executed. To make it easier to work with, a binding layer called CallProcessorBinder allows binding to a function that takes a context as an argument and performs all the routing. One of the benefits of this approach is that it provides several places to hook custom code into without having to update existing code.

```cpp
void TheLoadingComponent::Reflect(AZ::ReflectContext* context)
{
    AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context);
    if (serializeContext)
    {
        serializeContext->Class<TheLoadingComponent, AZ::SceneAPI::SceneCore::LoadingComponent>()->Version(1);
    }
}
```

The class reflects the TheLoadingComponent as a LoadingComponent so that the scene pipeline can find the component during the export events.

```cpp
class SceneBuilderExampleModule
    : public AZ::Module
{
public:
    AZ_RTTI(SceneBuilderExampleModule, "{36AA9C0F-7976-40C7-AF54-C382AC5B16F6}", AZ::Module);

    SceneBuilderExampleModule()
        : AZ::Module()
    {
        m_descriptors.insert(m_descriptors.end(), 
        {
            TheLoadingComponent::CreateDescriptor()
        });
    }
};
```

The scene builder components are registered in the ```AZ::Module``` class. The SceneBuilderExampleModule is the entry point for gems. To extend the SceneAPI loading, generating, and exporting components must be registered here. The SceneAPI libraries require specialized initialization. As early as possible, be sure to repeat the following two lines for any SceneAPI you want to use. Omitting these calls or making them too late can cause problems such as missing EBus events.

## LoadingComponent

The LoadingComponent events are emitted when the scene pipeline is importing a source scene asset file such as `.fbx` or `.stl` files. If the scene builder wants to modify the scene graph, then it should register a LoadingComponent component to hook into the `PreImport`, 'Import', or 'PostImport' events. The SceneGraph is populated during the import events so by PostImport the contents of the SceneGraph are fixed.

The AZ::SceneAPI::SceneCore::LoadingComponent event contexts:

* PreImportEventContext -- Signals an import of the scene graph is about to happen
* ImportEventContext -- Signals that the scene is ready to import the scene graph from source data; can change the Scene
* PostImportEventContext -- Signals that an import has completed and the data should be ready to use (if there were no errors); the Scene is immutable

## GenerationComponent

The scene is loaded via the LoadingComponent components. The GenerationComponent events are emitted when the scene pipeline wants scene builders to modify node contents or add nodes to the SceneGraph. The mutable Scene object is sent to each GenerationComponent event.

The AZ::SceneAPI::SceneCore::GenerationComponent event contexts:

* PreGenerateEventContext -- Signals the scene generation step is about to happen
* GenerateEventContext -- Signals that new data such as procedurally generated objects should be added to the Scene
* GenerateLODEventContext -- Signals that new LODs should be added to the Scene
* GenerateAdditionEventContext -- Signals that any new data, such as tangents and bitangents, should be added to the Scene
* GenerateSimplificationEventContext -- Signals that data simplification / complexity reduction should be run
* PostGenerateEventContext -- Signals that the generation step is complete

## ExportComponent

During the exporting phase, the scene graph is inspected by various scene builders, and game-ready product assets are written to disk. This is done with ExportingComponent components. All the events that the ExportingComponent components respond to receive an immutable SceneGraph object, so they also cannot modify the SceneGraph. This means that the only place where the graph is writable is during the import and generation events.

The `AZ::SceneAPI::SceneCore::ExportComponent` event contexts:

* `PreExportEventContext` - Signals an export of the contained scene is about to happen.
* `ExportEventContext` - Signals the scene that the contained scene needs to be exported to the specified directory.
* `PostExportEventContext` - Signals that an export has completed and written (if successful) to the specified directory.

## BehaviorComponent

`AZ::SceneAPI::SceneCore::BehaviorComponent` components are small logic units that exist as long as the scene pipeline is initialized and active. These components can react to various events that happen to a scene and make appropriate changes, additions or removals. The main use of the behavior components is to modify the rules and groups in the scene manifest so that export components can be modified, indirectly.

The BehaviorComponent is handled a bit different than the other scene pipeline component types since it does not use the BindCall() method and participates in both the Editor and the Asset Processor. The behavior component is designed to activate the ManifestMetaInfoBus and/or the ManifestMetaInfoBus depending on the scene product asset uses.

## AssetImportRequestBus

This bus handles the scene pipeline events that modify the scene manifest. 

The `AZ::SceneAPI::Events::AssetImportRequestBus` events:

* `GetGeneratedManifestExtension` - Gets the file extension for the generated manifest
* `PrepareForAssetLoading` - Before asset loading starts this is called to allow for any required initialization
* `LoadAsset` - Starts the loading of the asset at the given path in the given scene
* `FinalizeAssetLoading` - Can be used to do any work to complete loading such as adjusting the loaded content in the SceneGraph
* `UpdateManifest` - After all loading has completed, this call can be used to adjust the manifest.

The ``RequestingApplication`` input argument refers to the type of application that sent the event such as the O3DE Editor or the O3DE Asset Processor.

The ``ManifestAction`` input argument refers to the behavior type the application is requesting from the component. The ``ConstructDefault`` value is typically used in the O3DE Editor to generate default scene manifest entries for a source scene. The ``Update`` value is used to indicate the behavior component should generate scene manifest groups and rules based on the existing scene graph.

## ManifestMetaInfoBus

The ManifestMetaInfoBus is used to gather and manage UX elements in the scene manifest for a source asset scene file. For example, it used in the Editor to fetch the names of the tabs of the group types and the rules the group can manage for the Scene Settings dialog.

The `AZ::SceneAPI::Events::ManifestMetaInfoBus` events:

* `GetCategoryAssignments` - Gets a list of all the categories and the class identifiers that are listed for that category.
* `GetIconPath` - Gets the path to the icon associated with the given group or rule.
* `GetAvailableModifiers` - Gets a list of modifiers (such as rules for groups) that the target accepts.
* `InitializeObject` - Initialized the given manifest group or rule based on the scene.
* `ObjectUpdated` - Called when an existing group or rule is updated.

## The scene logging example

[Scene logging example gem](https://github.com/o3de/o3de/tree/development/Gems/SceneLoggingExample)

The Scene Logging Example demonstrates how to extend the SceneAPI by adding additional logging to the pipeline. The SceneAPI is a collection of libraries that handle loading scene files and converting content to data that the Open 3D Engine and its editor can load.

The following approach is used:

1. The SceneBuilder and SceneData load and convert the scene file (for example, .fbx) into a graph that is stored in memory.
2. SceneCore and SceneData are used to create a manifest with instructions about how to export the file.
3. SceneData analyzes the manifest and memory graph and creates defaults.
4. Scene Settings allows updates to the manifest through a UI.
5. The ResourceCompilerScene uses the instructions from the manifest and the data in the graph to create assets. These assets are ready for Open 3D Engine to use.

The example gem demonstrates the following key features:

* Initialization of the SceneAPI libraries. (See SceneLoggingExampleModule.cpp)
* Adding a LoadingComponent to hook into the scene loading and react to loading events. (See Processing/LoadingTrackingProcessor)
* Extension of the Scene Settings UI and ability to set defaults using the BehaviorComponent. (See Groups/LoggingGroup and Behaviors/LoggingGroupBehavior)
* Adding an ExportingComponent to hook into the scene converting and exporting events. (See Behaviors/ExportTrackingProcessor)
