---
title: Deep Dive into Replication
linktitle: Replication Behind The Scenes
description: An insider look into one of the core system of Multiplayer Gem - Replicaiton.
---

## Introduction

This guide will take a look at the key replication concepts and logic behind the scenes in Multiplayer Gem.
Our starting base will be O3DE MultiplayerSample project. You can find the instructions on how to build and run it here: https://github.com/o3de/o3de-multiplayersample/blob/development/README.md

{{<note>}}
Snippets of code and code-generated files in this guide are meant to be taken as example. The actual code may differ over time as O3DE Multiplayer Gem develops.
{{</note>}}

## Network Entity

In order for an entity to be replicated from a server down to clients, that entity needs to have two components on it:

* Network Binding Component
* Network Transform Component

We will start by looking at what happens when a new prefab spawns on the server and how it gets replicated down to a client.

### Topic: How Does A Server Find Out about a newly spawned prefab?

```c++
Multiplayer.dll!Multiplayer::ServerToClientReplicationWindow::OnEntityActivated(AZ::Entity * entity) Line 220 C++
Multiplayer.dll!AZStd::Internal::function_util::get_invoker<void __cdecl(AZ::Entity *),AZStd::Internal::function_util::function_obj_tag,AZStd::allocator>::call<<lambda_bfc0d0adf3d4bfe496a5db4663bc93f1>>(AZStd::Internal::function_util::function_buffer & function_obj_ptr, AZ::Entity * && <args_0>) Line 179 C++
[Inline Frame] MultiplayerSample.ServerLauncher.exe!AZStd::function_intermediate<void,AZ::Entity *>::operator()(AZ::Entity * &&) Line 610 C++
[Inline Frame] MultiplayerSample.ServerLauncher.exe!AZStd::function<void __cdecl(AZ::Entity *)>::operator()(AZ::Entity * <args_0>) Line 690 C++
MultiplayerSample.ServerLauncher.exe!AZ::Event<AZ::Entity *>::Signal(AZ::Entity * const & <params_0>) Line 253 C++
MultiplayerSample.ServerLauncher.exe!AZ::ComponentApplication::SignalEntityActivated(AZ::Entity * entity) Line 1042 C++
MultiplayerSample.ServerLauncher.exe!AZ::Entity::Activate() Line 228 C++
MultiplayerSample.ServerLauncher.exe!AzFramework::GameEntityContextComponent::OnContextEntitiesAdded(const AZStd::vector<AZ::Entity *,AZStd::allocator> & entities) Line 232 C++
MultiplayerSample.ServerLauncher.exe!AzFramework::EntityContext::HandleEntitiesAdded(const AZStd::vector<AZ::Entity *,AZStd::allocator> & entities) Line 184 C++
MultiplayerSample.ServerLauncher.exe!AzFramework::SliceEntityOwnershipService::AddEntity(AZ::Entity * entity) Line 122 C++
```


## Network Transform Component

We will start with a very typical and common network component - a network transform component. 

### Auto Component XML

Let's start by looking at the source of a network component: it's XML based structure that is the basis for the codegen that produces multiplayer code for you.
Here is the content of `Gems\Multiplayer\Code\Source\AutoGen\NetworkTransformComponent.AutoComponent.xml`

```xml
<?xml version="1.0"?>

<Component
    Name="NetworkTransformComponent"
    Namespace="Multiplayer"
    OverrideComponent="true"
    OverrideController="true"
    OverrideInclude="Multiplayer/Components/NetworkTransformComponent.h"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <ComponentRelation Constraint="Weak" HasController="false" Name="TransformComponent" Namespace="AzFramework" Include="AzFramework/Components/TransformComponent.h" />

    <Include File="Multiplayer/MultiplayerTypes.h"/>

    <NetworkProperty Type="AZ::Quaternion" Name="rotation" Init="AZ::Quaternion::CreateIdentity()" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="AZ::Vector3" Name="translation" Init="AZ::Vector3::CreateZero()" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="float" Name="scale" Init="1.0f" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="uint8_t"     Name="resetCount" Init="0" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="false" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="NetEntityId" Name="parentEntityId" Init="InvalidNetEntityId" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
    <NetworkProperty Type="int32_t"     Name="parentAttachmentBoneId" Init="-1" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />

</Component>
```

Stripping away the non-essentials, the key elements are those of `NetworkProperty`. Here is what is going on here. This xml defines a C++ component with a set fo network properties. One of these properties is `translation`, which in this context means a world position.

#### Network Property

```xml
<NetworkProperty Type="AZ::Vector3" Name="translation" ReplicateFrom="Authority" ReplicateTo="Client"... />
```

`Type="AZ::Vector3"` must reference a valid C++ type. In this case it's using C++ type from `Code\Framework\AzCore\AzCore\Math\Vector3.h`. `translation` is the user chosen name for the property. `ReplicateFrom` and `ReplicateTo` defines the direction of the replication. In general, there are two main directions: from a server to clients, and from a client to a server. (There is also server to server direction but it will not be discussed here.) But there are some details here to be aware of. 

There are four supported replication directions:

* `Authority` (Server) to `Client` - This is the direction of an authoritative server sending data to clients. This is the most common and simplest case. Xml defition for this direction would be: `ReplicateFrom="Authority" ReplicateTo="Client"`

* `Authority` (Server) to `Autonomous` (Client) - This one is the case of an authoritative server sending data to an autonomous client, which means a client object that is capable of controlling and locally predicting itself, such as a network player character controller. Xml defition for this direction would be: `ReplicateFrom="Authority" ReplicateTo="Autonomous"`

* `Autonomous` (Client) to `Authority` (Server) - This is the opposite direction, where a locally controlled client object sends data back to the authoritative server. Xml defition for this direction would be: `ReplicateFrom="Autonomous" ReplicateTo="Authority"`

* `Authority` (Server) to `Server` - This direction only applies in multi-server setupsand will not be covered in this guide. Xml defition for this direction would be: `ReplicateFrom="Authority" ReplicateTo="Server"`


#### Generated Code of Network Property

So for a network property `translation` of `NetworkTransformComponent` defined as:

```xml
<NetworkProperty Type="AZ::Vector3" Name="translation" Init="AZ::Vector3::CreateZero()" ReplicateFrom="Authority" ReplicateTo="Client" IsRewindable="true" IsPredictable="true" IsPublic="true" Container="Object" ExposeToEditor="false" ExposeToScript="false" GenerateEventBindings="true" />
```

Its generated member variable definition would be in a code-generated file inside your build folder, for example at `<build-location>\External\Multiplayer-80a10118\Code\Azcg\Generated\Source\AutoGen\NetworkTransformComponent.AutoComponent.h`.

```c++
Multiplayer::RewindableObject<AZ::Vector3, Multiplayer::RewindHistorySize> m_translation = AZ::Vector3::CreateZero();
```

{{<note>}}
Most of the time, one should not be concerned with the generated code but it can be useful to be aware of where the code and what is generated from the Auto XML definitions.
{{</note>}}

