---
title: "Working with the Scene and Render Pipeline"
description: "Working with the Scene and Render Pipeline in the Atom Renderer"
date: 2021-03-04
toc: false
weight: 300
---

The Atom RPI can handle complex rendering use cases (for example, applications with many viewports) by using scenes and render pipelines. A **scene** in RPI contains feature processors, which handle the data to be rendered. A **render pipeline** defines how the scene is rendered. As a starting point, you need at least one scene and one render pipeline to begin rendering data. Additional scenes and render pipelines can be added for more complex rendering. 

Each scene is independent of other scenes. A scene can have one or many render pipelines. When a render pipeline is added to a scene, it defines one way to render the scene. Additional render pipelines can be added to define more ways to render the scene. 

This tutorial covers the following concepts:
- How to create a scene
- How to create a render pipeline
- How to use them for common use cases

The required source code can be found in the RPI Public module: `Gems/Atom/RPI/Code/Source/RPI.Public/`

## Create an RPI Scene
Scenes are created by instantiating an instance of `RPI::Scene`. You must also decide what graphics features you want in this scene. Feature processors are set at the time of object construction, but can be enabled or disabled afterwards. Another way to enable feature processors is to call `RPI::Scene::EnableAllFeatureProcessors()` immediately after the scene is created. This enables all available feature processors for the scene. 

<!-- @VickyAtAZ Are any features enabled by default? Or must we always specify whether we want to enable a feature? -->

After a scene is created and feature processors are enabled, you must activate and register to the RPISystem by calling `Activate` and `RegisterScene`. This is necessary to update and render the scene properly. 

<!-- (Feature processors are made available after being registered.) 
[NOTE FOR DEVS: How are feature processors registered?] -->
```cpp
// Create a scene with all available feature processors
RPI::SceneDescriptor sceneDesc;
m_scene = RPI::Scene::CreateScene(sceneDesc);
m_scene->EnableAllFeatureProcessors();
m_scene->Activate();
RPI::RPISystemInterface::Get()->RegisterScene(m_scene);
         
// Create a scene with only DynamicDraw and AuxGeom features enabled
RPI::SceneDescriptor sceneDesc2;
sceneDesc2.m_featureProcessorNames.push_back("DynamicDrawFeatureProcessor");
sceneDesc2.m_featureProcessorNames.push_back("AuxGeomFeatureProcessor");
m_scene2 = RPI::Scene::CreateScene(sceneDesc);
m_scene2->Activate();
RPI::RPISystemInterface::Get()->RegisterScene(m_scene2);
```

{{< note >}}
 Atom's built-in feature processors are included in the Atom Gem. Their source files (.cpp) can be found in the folder Gems/Atom/Feature/Common/Code/Source/\<feature-processor>/.
{{< /note >}}

{{< note >}}
 The name of the feature processor is the name associated with the AZ_RTTI declared in the feature processor's class. The AZ_RTTI can be found in the feature processor's header file which is located in Gems/Atom/Feature/Common/Code/Include/Atom/Feature/\<feature-processor>/.

For example, the name of the DynamicDrawFeatureProcessor is "AZ::Render::DynamicDrawFeatureProcessor" and its class's AZ_RTTI is defined as such:  
`AZ_RTTI(DynamicDrawFeatureProcessor, "{51075139-CB74-4BED-8B6A-8440B53A9EAA}", AZ::RPI::FeatureProcessor)`.
{{< /note >}} 

## Set up the scene's shader resource group (SRG)
If any shaders in your project use shader constants from SceneSrg, then you must set up the constant values for your scene's shader resource group (SRG). This is done by adding a callback function to the scene. You only need to update constants in the SceneSrg if they are used by any shaders. 

In the following example, your SceneSrg contains a constant, `m_time`, which needs to be updated every frame. 

```cpp
// Define the call back function 
RPI::ShaderResourceGroupCallback callback = [this](RPI::ShaderResourceGroup* srg)
    {
        if (srg == nullptr)
        {
            return;
        }
        bool needCompile = false;
        RHI::ShaderInputConstantIndex timeIndex = srg->FindShaderInputConstantIndex(Name{ "m_time" });
        if (timeIndex.IsValid())
        {
            srg->SetConstant(timeIndex, (float)m_simulateTime);
            needCompile = true;
        }
 
        if (needCompile)
        {
            srg->Compile();
        }
    };
 
// Set the callback function to the scene
m_scene->SetShaderResourceGroupCallback(callback);
```

<!-- For more information on SceneSRGs, see  -->

## Associate an AzFramework Scene with an RPI Scene 
In Open 3D Engine, a level is made up of entities that need to be rendered. To specify how a set of entities are rendered, associate them with an AzFramework scene (`AzFramework::Scene`). The AzFramework scene has a one-to-one relationship with an RPI scene. Through this association, the entities can be rendered according to the RPI scene's render pipeline. 

As shown in the following example, you can get the default level in your project and associate it with an AzFramework scene. 
```cpp
AZ::RPI::ScenePtr m_scene;
 
// Get all created AzFramework::Scenes
AZStd::vector<AzFramework::Scene*> scenes;
AzFramework::SceneSystemRequestBus::BroadcastResult(scenes, &AzFramework::SceneSystemRequests::GetAllScenes);
AZ_Assert(scenes.size() > 0, "Error: Scenes missing during system component initialization"); // This should never happen unless scene creation has changed.
// Add RPI::Scene as a sub system for the default AzFramework Scene
const uint32_t DefaultAzSceneIndex = 0;
scenes[DefaultAzSceneIndex]->SetSubsystem(m_scene.get());
```

In some cases, you might want to render sets of entities in different ways. This can be done by creating separate AzFramework scenes for the different rendering contexts. For example, a preview window to view a material in the Editor needs an AzFramework scene that is separate from the level window's. The preview window is independent of the level window, so it will have its own RPI pipeline with different lighting and post effects. 

To create an AzFramework scene for a particular context, you must first create an AzFramework entity context (`AzFramework::EntityContext`). The AzFramework entity context is linked to the AzFramework scene by calling `SetSceneForEntityContextId`. Any entity created with this entity context belongs to this scene. 

## Create and Add Render Pipelines to a Scene
A single render pipeline defines one way of rendering a scene. To render a scene in multiple ways, you can add more render pipelines to the scene. A render pipeline can be created directly from a RenderPipelineDescriptor, or it can link to a RenderPipelineDescriptor through an asset file (*.azasset*).

A common case for a scene with multiple render pipelines is a level editor that has multiple viewports, showing a level from multiple perspectives. 

The following example shows two methods for setting up multiple render pipelines and adding them to the same scene. Each render pipeline renders to a different window. 

```cpp
AZStd::m_defaultPipelineAssetPath; // The azasset's path in cache
AZ::RPI::WindowContext* m_windowContext1; // The window context for a native window 1
AZ::RPI::WindowContext* m_windowContext2; // The window context for a native window 2
 
// Create a render pipeline from an asset
Data::Asset<RPI::AnyAsset> pipelineAsset = RPI::AssetUtils::LoadAssetByProductPath<RPI::AnyAsset>(m_defaultPipelineAssetPath.c_str(), RPI::AssetUtils::TraceLevel::Error);
RPI::RenderPipelinePtr renderPipeline1 = RPI::RenderPipeline::CreateRenderPipelineForWindow(pipelineAsset, *m_windowContext1);
m_scene->AddRenderPipeline(renderPipeline);
 
 
// Create a render pipeline from a descriptor
RPI::RenderPipelineDescriptor pipelineDesc;
pipelineDesc.m_mainViewTagName = "MainCamera";          //Surface shaders render to the "MainCamera" tag
pipelineDesc.m_name = "SecondPipeline";                 //Sets the unique name for this pipeline
pipelineDesc.m_rootPassTemplate = "ComplexPipeline";    //References a template in %Project%\Passes\PassTemplates.azasset
RPI::RenderPipelinePtr renderPipeline2 = RPI::RenderPipeline::CreateRenderPipelineForWindow(pipelineDesc, *m_windowContext2);
m_scene->AddRenderPipeline(m_pipeline2)
```

A render pipeline does not have to render to a window; it can also render to a texture. There are a couple of common cases:
- When the application starts, the render pipeline uses a brdf function to render a brdf lookup texture. This render pipeline only needs to render for one frame, which can be done by setting `RenderPipelineDescriptor::m_executeOnce` to `true`.
- When generating the material preview icon, the render pipeline renders the material preview to a texture, reads it back to the CPU, and converts it to a QImage. 
- To bake texture for environment probes, the render pipeline for an environment probe is added to the current level scene when the bake is triggered.

## Example: Switching Render Pipelines for a Viewport
In some cases, you might need a function to render your scene in different ways at runtime. This can be done by switching the render pipeline for a viewport. 

To switch render pipelines, you must remove the old render pipeline from the scene and add the new render pipeline. You can also save the newly created render pipelines and switch between them freely. This keeps you from needing to recreate render pipelines repeatedly. Render pipelines in the same scene must have unique names. 

In the following example, the original render pipeline is saved and removed from the scene. A new render pipeline is created and set to the scene. 

```cpp
// save original render pipeline first and remove it from the scene
AZ::RPI::ScenePtr defaultScene = AZ::RPI::RPISystemInterface::Get()->GetDefaultScene();
m_originalPipeline = defaultScene->GetDefaultRenderPipeline();
defaultScene->RemoveRenderPipeline(m_originalPipeline->GetId());
m_originalPipeline->SetEnabled(false);
 
// add the checker board pipeline
AZ::RPI::RenderPipelineDescriptor pipelineDesc;
pipelineDesc.m_mainViewTagName = "MainCamera";
pipelineDesc.m_name = "Checkerboard";
pipelineDesc.m_rootPassTemplate = "CheckerboardPipeline";
m_cbPipeline = AZ::RPI::RenderPipeline::CreateRenderPipelineForWindow(pipelineDesc, *m_windowContext);
defaultScene->AddRenderPipeline(m_cbPipeline);
m_cbPipeline->SetDefaultView(m_originalPipeline->GetDefaultView());
```
