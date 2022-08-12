---
linkTitle: Billboard Component
title: Billboard Component Tutorial
description: A tutorial for creating a billboard component in the Open 3D Engine (O3DE).
toc: true
---
This tutorial covers how to create a *billboard* component in the **Open 3D Engine** (O3DE). You'll add a component where, when applied to an entity in the **Editor**, a plane mesh is rendered with a material that'll rotate to always face the camera.

This tutorial covers the following concepts:
* Component development brief overview
* Mesh Feature Processor
* EBus Handlers

{{< note >}}
There is also a **Look-At** component in O3DE. This component differs because it orients the rendered image of the entity, as opposed to the entity itself. 
{{< /note >}}

## Add template files
Currently, the **AtomTutorials** Gem uses the completed functioning billboard component files. You will replace them with the template files to follow along with the tutorial.

1. If you haven't already, download or clone the [`o3de/sample-code-gems`](https://github.com/o3de/sample-code-gems) repository from GitHub.

1. Replace the files in `atom_gems/AtomTutorials/Code/Source/Billboard/` with the files from `atom_gems/AtomTutorials/Templates/Billboard/Source/`.

1. Replace the files in `atom_gems/AtomTutorials/Code/Include/AtomTutorials/Billboard/` with the files from `atom_gems/AtomTutorials/Templates/Billboard/Include/`.

1. Build your project and ensure that the billboard component shows up in the Editor and can be added to an entity.

## Component files overview
Components require many files and functions to connect to the **Editor** and to make the desired changes to an entity. 

The [component development documentation](/docs/user-guide/programming/components/) goes in depth with information on making components in O3DE, but here is a description of each of the necessary files for the billboard component in `AtomTutorials`.

Take some time to review what the goal of each file is, and to open them up and dive into the code and connections to understand how all the files work together to make the component.

* `CMakeLists.txt` - This file adds `Code` as a subdirectory to tell the compiler to read the `CMakeLists` file in that folder.
  
* `Code/CMakeLists.txt` - This file adds the necessary *targets* to properly compile the billboard component.
  
  {{< note >}}
  If you're unfamiliar with targets and how CMake works, check out [the CMake documentation](https://cmake.org/documentation/). What's most important to know here is that targets tell the compiler to run certain files with dependencies on other targets.
  {{< /note >}}

* `Code/atomtutorials_*_files.cmake` - These set of CMake files include the files for their respective targets, as specified in `Code/CMakeLists.txt`.
  
* `Code/Source/Clients/AtomTutorialsModule.cpp` - This file is where you can insert the billboard component so that it is integrated into the engine. 

  {{< tip >}}
  The `#ifdef` preprocessor directive used here checks whether `ATOMTUTORIALS_EDITOR` is defined. In `Code/CMakeLists.txt`, `ATOMTUTORIALS_EDITOR` is set if the target `AtomTutorials.Editor.Private.Object` compiles.
  {{< /tip >}}

* `Code/Source/Billboard/BillboardComponent.h` & `BillboardComponent.cpp` - This file contains the base `BillboardComponent` class and connects to the `BillboardComponentController`.

* `Code/Source/Billboard/BillboardComponentConfig.cpp` & `Code/Include/AtomTutorials/Billboard/BillboardComponentConfig.h` - These files include the properties of the component and uses the [serialization context](/docs/user-guide/programming/components/reflection/serialization-context/) to associate a string with the address to a field (to make the properties persistent).

* `Code/Source/Billboard/BillboardComponentController.h` & `BillboardComponentController.cpp` - You can think of these files as doing all of the "heavy-lifting" for the billboard component. They `BillboardComponentController` class serves as [EBus Handlers](/docs/user-guide/programming/components/ebus-integration/#components-as-ebus-handlers), define the compatible and incompatible services, and houses the main billboard code that you will be writing.

* `Code/Source/Billboard/EditorBillboardComponent.h` & `EditorBillboardComponent.cpp` - The files that define the [editor version](/docs/user-guide/programming/components/editor-components/) of the billboard component, and uses [`EditContext`](/docs/user-guide/programming/components/reflection/edit-context/) to expose parameters for editing in the Editor. 

* `Code/Include/AtomTutorials/Billboard/BillboardComponentBus.h` - This bus provides the [request bus and notification bus](/docs/user-guide/programming/components/ebus-integration/) classes for the billboard component.

* `Code/Include/AtomTutorials/Billboard/BillboardComponentConstants.h` - Provides UUIDs for the billboard component and Editor billboard component.

## Billboard effect
After understanding how the files work, you will edit the component to add the billboard effect.

### EBus Handlers
The `BillboardComponentController` is an EBus handler for the `BillboardComponentRequestBus` and the `SceneNotificationBus`. You will need to connect and disconnect to these buses as appropriate. 

EBus handlers generally will also have functions to override and implement that are called when events occur. For example, implementing the `SceneNotificationBus` requires `OnBeginPrepareRender()` to be implemented. These functions are already included in the template files, but you will edit them later to achieve the billboard effect.

The `SceneNotificationBus` is necessary because, at each tick, the component should update the orientation in case the camera moved.

1. Open `BillboardComponentController.cpp`, and keep `BillboardComponentController.h` open as a reference.

2. Connect and disconnect to/from the EBuses appropriately. 
   
   1. Find the `Activate()` function, and look at the example for how to connect to the `BillboardComponentRequestBus`.
   
   2. Connect to the `SceneNotificationBus` above the connection to the `BillboardComponentRequestBus`.
   
      1. Get the scene the entity is in.
  
      2. If the scene exists, connect to the `SceneNotificationBus`.
   
        ```cpp
        RPI::Scene* scene = RPI::Scene::GetSceneForEntityId(entityId);
        if (scene)
        {
            AZ::RPI::SceneNotificationBus::Handler::BusConnect(scene->GetId());
        }
        ```

   3. Find the `Deactivate()` function, and look at the example for how to disconnect from the `BillboardComponentRequestBus`.
   
   4. Disconnect from the `SceneNotificationBus` above the disconnection from `BillboardComponentRequestBus`.
      ```cpp
      AZ::RPI::SceneNotificationBus::Handler::BusDisconnect();
      ```
  
Awesome, you connected and disconnected from the buses! This will allow the billboard component to listen for events and take action if needed.

### Mesh and material
To render a mesh with a material in the billboard component, you will use the [**Mesh Feature Processor**](https://www.o3de.org/docs/api/gems/atom/class_a_z_1_1_render_1_1_mesh_feature_processor). The mesh feature processor will take a mesh and a material and render it appropriately. It also provides a `SetTransform()` function which you will use to render the entity in the desired billboard orientation.

1. Open `BillboardComponentController.cpp`.

2. Find the `Activate()` function. You will initialize the instance variables `m_meshFeatureProcessor`, `m_material`, `m_modelAsset`, and `m_meshHandle` under the connection to the `SceneNotificationBus`.
   
   1. Get the mesh feature processor using the handy `RPI::Scene::GetFeatureProcessorForEntity<{Type}>()` function.
   
   2. Write an assert to ensure the mesh feature processor is available.
   
   3. Load the material asset using `AZ::RPI::AssetUtils::LoadAssetByProductPath<AZ::RPI::MaterialAsset>()`.
   
   4. Create the material using `AZ::RPI::Material::FindOrCreate()`.
   
   5. Get the model asset using `AZ::RPI::AssetUtils::GetAssetByProductPath<AZ::RPI::ModelAsset>()`.
   
   6. Get the mesh handle and acquire a model using `AcquireMesh()`.
   
   7. Get the entity's transform using the `AZ::TransformBus::EventResult()`. `EventResult()` gets the result of the passed-in function from a handler of the `TransformBus`.
   
   8. Set the initial transform of the model using the mesh feature processor's `SetTransform()` method.
   
   ```cpp
   m_meshFeatureProcessor = RPI::Scene::GetFeatureProcessorForEntity<Render::MeshFeatureProcessorInterface>(entityId);
   AZ_Assert(m_meshFeatureProcessor, "MeshFeatureProcessor not available.");

   AZ::Data::Asset<AZ::RPI::MaterialAsset> materialAsset = AZ::RPI::AssetUtils::LoadAssetByProductPath<AZ::RPI::MaterialAsset>("materials/presets/pbr/metal_gold.azmaterial", AZ::RPI::AssetUtils::TraceLevel::Error);
   m_material = AZ::RPI::Material::FindOrCreate(materialAsset);
   m_modelAsset = AZ::RPI::AssetUtils::GetAssetByProductPath<AZ::RPI::ModelAsset>("materialeditor/viewportmodels/plane_1x1.azmodel", AZ::RPI::AssetUtils::TraceLevel::Assert);

   auto meshDescriptor = AZ::Render::MeshHandleDescriptor{ m_modelAsset };
   m_meshHandle = m_meshFeatureProcessor->AcquireMesh(meshDescriptor, m_material);

   m_meshFeatureProcessor->SetTransform(m_meshHandle, AZ::Transform::CreateIdentity());
   ```

   {{< note >}}
   This example uses `materials/presets/pbr/metal_gold.azmaterial`, but you can use any material in the engine and put the path here.
   {{< /note >}}

3. Find the `Deactivate()` function. You will release the model asset and the mesh handle under the disconnection from the EBuses.
   
   1. If the mesh feature processor exists and the mesh handle is valid, release the mesh handle.
   
   2. Set the mesh feature processor to be a `nullptr`.
   
   3. Release the model asset.
   
   ```cpp
   if (m_meshFeatureProcessor && m_meshHandle.IsValid())
   {
      m_meshFeatureProcessor->ReleaseMesh(m_meshHandle);
   }

   m_meshFeatureProcessor = nullptr;
   m_modelAsset.Release();
   ```

### Billboard transform update
You will edit `OnBeginPrepareRender()`, the functions from the notification buses. On each tick, the entity should re-compute and apply the billboard transform because how the model should be oriented changes.

Therefore, you will write the bulk of the billboard component code in a helper function, `SetBillboardTransform()`, and call that function from `OnBeginPrepareRender()`.

You will get the camera position and the entity position to determine the appropriate transform for the entity to "look at" the camera.

1. Open `BillboardComponentController.cpp` and find `SetBillboardTransform()`.

   1. Update the mesh feature processor and check if it's available; otherwise, return.

   2. Get the `EntityId` of the currently active camera. 

   3. Similarly to what you did before with getting the entity's transform, get the world position of the camera.
   
   5. Get the entity's world position.
   
   6. Use `AZ::Transform::CreateLookAt()` to get the transform for the entity to look at the camera.

   7. Set the transform of the model.
   
   8. Announce an event for the `BillboardComponentNotificationBus` that the billboard transformed.
   
    ```cpp
    void BillboardComponentController::SetBillboardTransform()
    {
        m_meshFeatureProcessor = RPI::Scene::GetFeatureProcessorForEntity<Render::MeshFeatureProcessorInterface>(m_entityComponentIdPair.GetEntityId());
        if (!m_meshFeatureProcessor) {
            return;
        }

        EntityId cameraId;
        Camera::CameraSystemRequestBus::BroadcastResult(cameraId, &Camera::CameraSystemRequests::GetActiveCamera);
        AZ::Vector3 cameraWorldPosition;
        AZ::TransformBus::EventResult(cameraWorldPosition, cameraId, &AZ::TransformBus::Events::GetWorldTranslation);

        AZ::Vector3 entityWorldPosition;
        AZ::TransformBus::EventResult(entityWorldPosition, m_entityComponentIdPair.GetEntityId(), &AZ::TransformBus::Events::GetWorldTranslation);

        // From mesh POV, the forward axis is Z positive, even though O3DE's default is Y positive for forward axis
        AZ::Transform transform = AZ::Transform::CreateLookAt(entityWorldPosition, cameraWorldPosition, AZ::Transform::Axis::ZPositive);
        m_meshFeatureProcessor->SetTransform(m_meshHandle, transform);

        BillboardComponentNotificationBus::Event(m_entityComponentIdPair.GetEntityId(), &BillboardComponentNotificationBus::Events::OnBillboardTransformed);
    }
    ```

2. Call the helper function in `OnBeginPrepareRender()`.
   
   ```cpp
   void BillboardComponentController::OnBeginPrepareRender()
   {
       SetBillboardTransform();
   }
   ```

3. Open the Editor and enter Game mode. Look at the entity with the billboard component and observe how it always orients itself to "look at" you!

{{< video src="/images/learning-guide/tutorials/rendering/billboard/final.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of the animation of the cloud." >}}

Congratulations, you are now done with this tutorial! 
