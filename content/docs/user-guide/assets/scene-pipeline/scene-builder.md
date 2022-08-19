---
linkTitle: Scene Builder
title: Scene Builder
description: TBD Scene Builder
weight: 400
toc: true
---

{{< note >}}
Fill out
{{< /note >}}

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
class TheExportingComponent
    : public AZ::SceneAPI::SceneCore::ExportingComponent
{
public:
    AZ_COMPONENT(TheExportingComponent, "{E5E65E21-0BCD-4874-84B8-33E10CCAEE94}", AZ::SceneAPI::SceneCore::ExportingComponent);

    TheExportingComponent();
    ~TheExportingComponent() override = default;

    void Activate() override;
    void Deactivate() override;
    static void Reflect(AZ::ReflectContext* context);

    AZ::SceneAPI::Events::ProcessingResult OnPrepareForExport(AZ::SceneAPI::Events::PreExportEventContext& context);
};
```

This class is setting up to hook into the PrepareForExport event by sub-classing from `AZ::SceneAPI::SceneCore::ExportingComponent` then adding a OnPrepareForExport method that accepts the PreExportEventContext context.

```cpp
TheExportingComponent::TheExportingComponent()
{
    BindToCall(&ExportTrackingProcessor::PrepareForExport);
}
```

The example attaches the PrepareForExport function to the PreExportEventContext so that this context is sent to the CallProcessorBus at the start of every conversion and export process.

The scene conversion and exporting process uses the CallProcessorBus to move data and trigger additional work. The CallProcessorBus operates differently than typical EBuses because it doesn't have a specific set of functions that you can call. Instead, it works like a pseudo-remote procedure call, where the arguments for what would normally be a function are stored in a context. The CallProcessorBus provides a single place to register and trigger the context calls. Based on the type of context, the appropriate functionality is executed. To make it easier to work with, a binding layer called CallProcessorBinder allows binding to a function that takes a context as an argument and performs all the routing. One of the benefits of this approach is that it provides several places to hook custom code into without having to update existing code. 

```cpp
void TheExportingComponent::Reflect(AZ::ReflectContext* context)
{
    AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context);
    if (serializeContext)
    {
        serializeContext->Class<TheExportingComponent, AZ::SceneAPI::SceneCore::ExportingComponent>()->Version(1);
    }
}
```

The class reflects the TheExportingComponent as an ExportingComponent so that the scene pipeline can find the component during the export events.

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
            TheExportingComponent::CreateDescriptor()
        });
    }
};
```

The scene builder components are registered in the AZ::Module class. The SceneBuilderExampleModule is the entry point for gems. To extend the SceneAPI loading, generating, and exporting components must be registered here. The SceneAPI libraries require specialized initialization. As early as possible, be sure to repeat the following two lines for any SceneAPI you want to use. Omitting these calls or making them too late can cause problems such as missing EBus events.

## AZ::SceneAPI::SceneCore::LoadingComponent

The LoadingComponent events are emitted when the scene pipeline is importing a source scene asset file such as `.fbx` or `.stl` files. If the scene builder wants to modify the scene graph, then it should register a LoadingComponent component to hook into the `PreImport`, 'Import', or 'PostImport' events. The SceneGraph is populated during the import events so by PostImport the contents of the SceneGraph are fixed.

The LoadingComponent event contexts:

* PreImportEventContext -- Signals an import of the scene graph is about to happen
* ImportEventContext -- Signals that the scene is ready to import the scene graph from source data; can change the Scene
* PostImportEventContext -- Signals that an import has completed and the data should be ready to use (if there were no errors); the Scene is immutable

## AZ::SceneAPI::SceneCore::GenerationComponent

The the scene is loaded via the LoadingComponent components, the GenerationComponent events are emitted when the scene pipeline wants scene builders to modify node contents or add nodes to the SceneGraph. The mutable Scene object is sent to each GenerationComponent event.

The LoadingComponent event contexts:

* PreGenerateEventContext -- Signals the scene generation step is about to happen
* GenerateEventContext -- Signals that new data such as procedurally generated objects should be added to the Scene
* GenerateLODEventContext -- Signals that new LODs should be added to the Scene
* GenerateAdditionEventContext -- Signals that any new data, such as tangents and bitangents, should be added to the Scene
* GenerateSimplificationEventContext -- Signals that data simplification / complexity reduction should be run
* PostGenerateEventContext -- Signals that the generation step is complete

# AZ::SceneAPI::SceneCore::ExportComponent

During the exporting phase, the scene graph is inspected by various scene builders, and game-ready product assets are written to disk. This is done with ExportingComponent components. All the events that the ExportingComponent components respond to receive an immutable SceneGraph object, so they also cannot modify the SceneGraph. This means that the only place where the graph is writable is during the import events. 

Additionally, the scene is processed via the LoadingComponent components whenever the user wants to edit "Scene Settings" in the Editor, so it would be sub-optimal to always run the mesh optimizer when the user wants to edit settings. To allow for the mesh optimizer to run before the export happens, we'll add a new phase to the export pipeline called "generation". During the generation phase, components can respond to the scene generation event, and apply arbitrary transformations to the Scene graph. Mesh optimization would be one of these. The Mesh Optimizer generation component will identify all meshes selected by a Mesh group in the manifest, add an optimized mesh to the SceneGraph so that other builders can reference it during the new generation phase of asset building. 

This design would make it possible to do other types of processes to modify the scene graph, like mesh splitting, or dynamic animation generation.

The ExportComponent event contexts:

* PreGenerateEventContext -- Signals the scene generation step is about to happen


        namespace Events
        {
            class ExportProductList;

            // Signals an export of the contained scene is about to happen.
            class PreExportEventContext
                : public ICallContext
            {
            public:
                AZ_RTTI(PreExportEventContext, "{6B303E35-8BF0-43DD-9AD7-7D7F24F18F37}", ICallContext);
                ~PreExportEventContext() override = default;
                SCENE_CORE_API PreExportEventContext(ExportProductList& productList, const AZStd::string& outputDirectory, const Containers::Scene& scene, const char* platformIdentifier, bool debug = false);
                SCENE_CORE_API PreExportEventContext(ExportProductList& productList, AZStd::string&& outputDirectory, const Containers::Scene& scene, const char* platformIdentifier, bool debug = false);

                SCENE_CORE_API const AZStd::string& GetOutputDirectory() const;
                SCENE_CORE_API ExportProductList& GetProductList();
                SCENE_CORE_API const ExportProductList& GetProductList() const;
                SCENE_CORE_API const Containers::Scene& GetScene() const;
                SCENE_CORE_API const char* GetPlatformIdentifier() const;
                SCENE_CORE_API bool GetDebug() const;

            private:
                AZStd::string m_outputDirectory;
                ExportProductList& m_productList;
                const Containers::Scene& m_scene;
                
                /**
                * The platform identifier is configured in the AssetProcessorPlatformConfig.ini and is data driven
                * it is generally a value like "pc" or "ios" or such.
                * this const char* points at memory owned by the caller but it will always survive for the duration of the call.
                */
                const char* m_platformIdentifier = nullptr;

                bool m_debug = false;
            };

            // Signals the scene that the contained scene needs to be exported to the specified directory.
            class ExportEventContext
                : public ICallContext
            {
            public:
                AZ_RTTI(ExportEventContext, "{ECE4A3BD-CE48-4B17-9609-6D97F8A887D3}", ICallContext);
                ~ExportEventContext() override = default;

                SCENE_CORE_API ExportEventContext(ExportProductList& productList, const AZStd::string& outputDirectory, const Containers::Scene& scene, const char* platformIdentifier);
                SCENE_CORE_API ExportEventContext(ExportProductList& productList, AZStd::string&& outputDirectory, const Containers::Scene& scene, const char* platformIdentifier);

                SCENE_CORE_API const AZStd::string& GetOutputDirectory() const;
                SCENE_CORE_API ExportProductList& GetProductList();
                SCENE_CORE_API const ExportProductList& GetProductList() const;
                SCENE_CORE_API const Containers::Scene& GetScene() const;
                SCENE_CORE_API const char* GetPlatformIdentifier() const;

            private:
                AZStd::string m_outputDirectory;
                ExportProductList& m_productList;
                const Containers::Scene& m_scene;
                
                /** 
                * The platform identifier is configured in the AssetProcessorPlatformConfig.ini and is data driven
                * it is generally a value like "pc" or "ios" or such.
                * this const char* points at memory owned by the caller but it will always survive for the duration of the call.
                */
                const char* m_platformIdentifier = nullptr;
            };

            // Signals that an export has completed and written (if successful) to the specified directory.
            class PostExportEventContext
                : public ICallContext
            {
            public:
                AZ_RTTI(PostExportEventContext, "{92E0AD59-62CA-45E3-BB73-5659D10FF0DE}", ICallContext);
                ~PostExportEventContext() override = default;

                SCENE_CORE_API PostExportEventContext(ExportProductList& productList, const AZStd::string& outputDirectory, const char* platformIdentifier);
                SCENE_CORE_API PostExportEventContext(ExportProductList& productList, AZStd::string&& outputDirectory, const char* platformIdentifier);

                SCENE_CORE_API const AZStd::string GetOutputDirectory() const;
                SCENE_CORE_API ExportProductList& GetProductList();
                SCENE_CORE_API const ExportProductList& GetProductList() const;
                SCENE_CORE_API const char* GetPlatformIdentifier() const;

            private:
                AZStd::string m_outputDirectory;
                
                /**
                * The platform identifier is configured in the AssetProcessorPlatformConfig.ini and is data driven
                * it is generally a value like "pc" or "ios" or such.
                * this const char* points at memory owned by the caller but it will always survive for the duration of the call.
                */
                const char* m_platformIdentifier = nullptr;
                ExportProductList& m_productList;
            };
        } // namespace Events            

# AZ::SceneAPI::SceneCore::BehaviorComponent

// Behavior components are small logic units that exist as long as the SceneAPI is
//      initialized and active. These components can react to various events that
//      happen to a scene and make appropriate changes, additions or removals. These
//      components are also responsible to register their associated data with the
//      reflect context.

Gems\SceneLoggingExample\Code\Behaviors\LoggingGroupBehavior.cpp

## AZ::SceneAPI::Events::ManifestMetaInfoBus

                //! Fills the given list with all available file extensions, excluding the extension for the manifest.
                virtual void GetSupportedFileExtensions(AZStd::unordered_set<AZStd::string>& extensions);
                //! Gets the file extension for the manifest.
                virtual void GetManifestExtension(AZStd::string& result);
                //! Gets the file extension for the generated manifest.
                virtual void GetGeneratedManifestExtension(AZStd::string& result);

                //! Before asset loading starts this is called to allow for any required initialization.
                virtual ProcessingResult PrepareForAssetLoading(Containers::Scene& scene, RequestingApplication requester);
                //! Starts the loading of the asset at the given path in the given scene. Loading optimizations can be applied based on
                //! the calling application.
                virtual LoadingResult LoadAsset(Containers::Scene& scene, const AZStd::string& path, const Uuid& guid, RequestingApplication requester);
                //! FinalizeAssetLoading can be used to do any work to complete loading, such as complete asynchronous loading
                //! or adjust the loaded content in the the SceneGraph. While manifest changes can be done here as well, it's
                //! recommended to wait for the UpdateManifest call.
                virtual void FinalizeAssetLoading(Containers::Scene& scene, RequestingApplication requester);
                //! After all loading has completed, this call can be used to make adjustments to the manifest. Based on the given
                //! action this can mean constructing a new manifest or updating an existing manifest. This call is intended
                //! to deal with any default behavior of the manifest.
                virtual ProcessingResult UpdateManifest(Containers::Scene& scene, ManifestAction action,
                    RequestingApplication requester);

                // Get scene processing project setting: UseCustomNormal 
                virtual void AreCustomNormalsUsed(bool & value);

                /*!
                    Optional method for reporting source file dependencies that may exist in the scene manifest
                    Paths is a vector of JSON Path strings, relative to the IRule object
                    For example, the following path: /scriptFilename
                    Would match with this manifest:
                
                    {
                        "values": [
                            {
                                "$type": "Test",
                                "scriptFilename": "file.py"
                            }
                        ]
                    }
                 */
                virtual void GetManifestDependencyPaths(AZStd::vector<AZStd::string>& paths);


## AZ::SceneAPI::Events::ManifestMetaInfoBus

                //! Gets a list of all the categories and the class identifiers that are listed for that category.
                virtual void GetCategoryAssignments(CategoryRegistrationList& categories, const Containers::Scene& scene);

                //! Gets the path to the icon associated with the given object.
                virtual void GetIconPath(AZStd::string& iconPath, const DataTypes::IManifestObject& target);

                //! Gets a list of a the modifiers (such as rules for  groups) that the target accepts.
                //! Note that updates to the target may change what modifiers can be accepted. For instance
                //! if a group only accepts a single rule of a particular type, calling this function a second time
                //! will not include the uuid of that rule.
                //! This method is called when the "Add Modifier" button is pressed in the FBX Settings Editor.
                virtual void GetAvailableModifiers(ModifiersList& modifiers, const Containers::Scene& scene,
                    const DataTypes::IManifestObject& target);

                //! Initialized the given manifest object based on the scene. Depending on what other entries have been added
                //! to the manifest, an implementation of this function may decided that certain values should or shouldn't
                //! be added, such as not adding meshes to a group that already belong to another group.
                //! This method is always called each time a Group type of object is created in memory (e.g. When the user
                //! clicks the "Add another Mesh" or "Add another Actor" in the FBX Settings Editor). Overriders of this method
                //! should check the type of the \p target to decide to take action (e.g. add a Modifier) or do nothing.
                virtual void InitializeObject(const Containers::Scene& scene, DataTypes::IManifestObject& target);

                //! Called when an existing object is updated. This is not called when an object is initialized, which is handled,
                //! by InitializeObject, but a parent may still get the update. For instance adding or removing a rule will
                //! have this called for the parent group.
                //! @param scene The scene the object belongs to.
                //! @param target The object that's being updated. If this is null it refers to an update to the entire manifest, for
                //! when a group is deleted for instance.
                //! @param sender An optional argument to keep track of the object that called this function. This can be used if the
                //! same object that sends a message also handles the callback to avoid recursively updating.
                virtual void ObjectUpdated(const Containers::Scene& scene, const DataTypes::IManifestObject* target, void* sender = nullptr);



# Future Topics

* Create new Scene Manifest Groups (Gems\SceneLoggingExample\Code\Groups\LoggingGroup.cpp)
* Create new Scene Manifest Rules

# The Scene Logging Example

The Scene Logging Example demonstrates how to extend the SceneAPI by adding additional logging to the pipeline. The SceneAPI is 
a collection of libraries that handle loading scene files and converting content to data that the Open 3D Engine and its editor can load. 

The following approach is used:
    1. The SceneBuilder and SceneData load and convert the scene file (for example, .fbx) into a graph that is stored in memory. 
    2. SceneCore and SceneData are used to create a manifest with instructions about how to export the file. 
    3. SceneData analyzes the manifest and memory graph and creates defaults.
    4. Scene Settings allows updates to the manifest through a UI.
    5. The ResourceCompilerScene uses the instructions from the manifest and the data in the graph to create assets. These assets are ready for Open 3D Engine to use.

The example gem demonstrates the following key features:
    - Initialization of the SceneAPI libraries.
        (See SceneLoggingExampleModule.cpp)
    - Adding a LoadingComponent to hook into the scene loading and react to loading events.
        (See Processing/LoadingTrackingProcessor)
    - Extension of the Scene Settings UI and ability to set defaults using the BehaviorComponent.
        (See Groups/LoggingGroup and Behaviors/LoggingGroupBehavior)
    - Adding an ExportingComponent to hook into the scene converting and exporting events.
        (See Behaviors/ExportTrackingProcessor)
