---
linktitle: Auto-components
title: Multiplayer Auto-components
description: A reference for defining Open 3D Engine (O3DE) multiplayer states through auto-components.
weight: 400
---

*Auto-components* provide a convenient way to create **Open 3D Engine (O3DE)** multiplayer components. These components define states that are relevant to network synchronization. Using the [AzAutoGen](/docs/user-guide/programming/autogen) system, you can process auto-component files that are found in your project during a build to automatically generate C++ classes for components and to create controllers that provide network replication and remote function calls. Auto-components also manage [edit](/docs/user-guide/programming/components/reflection/edit-context/) and [behavior](/docs/user-guide/programming/components/reflection/behavior-context/) context bindings so that the bound component shows in **O3DE Editor** and works with O3DE scripting.

To enable auto-component builds for your project, follow the instructions in [Multiplayer: Project Configuration](./configuration).

## Auto-component file structure

Auto-components are defined in XML files and placed in the `Code\Source\Autogen` directory of the Multiplayer Gem. According to naming convention, auto-component filenames must end with the suffix `.AutoComponent.xml`.

### Component attributes

The `Component` tag defines the name, namespace, include path, and override behavior for the multiplayer component that's being described.

| Property | Description | Type |
|---|---|---|
| Name | The class name of the generated auto-component. | `string`: Must be a valid C++ class name. |
| Namespace | The namespace the generated auto-component will be placed within. For a given Gem, all defined auto-components must be defined within the same namespace. Mixing namespaces inside a Gem will result in compiler errors. | `string`: Must be a valid C++ namespace name. |
| OverrideComponent | If `true`, the generated component will be a base class and the developer implementing the multiplayer component will be responsible for supplying the final derived component used in the editor and at runtime. | `bool` |
| OverrideController | If `true`, the generated controller will be a base class, and the developer implementing the multiplayer component will be responsible for supplying the final derived controller used in the runtime. | `bool` |
| OverrideInclude | If either `OverrideComponent` or `OverrideController` are `true`, this value is **required** and must be the path (relative to the Gem root) of the header containing the concrete implementations. | `string`: The developer implementing the final component or controller classes must provide the class header that the final classes are declared within. |

### ComponentRelation

The `ComponentRelation` tag indicates this component's relationship with other components. Use this to define whether or not this component requires or is incompatible with sibling components on the same entity. For example, the `NetworkCharacterComponent` requires a `NetworkTransformComponent` on the same entity to properly function.

| Property | Description | Type |
|---|---|---|
| Name | The name of the related component. | `string`: Must be a valid C++ class name. |
| Namespace | The namespace the related component is declared within. | `string`: Must be a valid C++ namespace. |
| Include | The include path of the related component. | `string` |
| Constraint | The type of relation this entry has with the component being described. The allowed values are: | `Required`, `Weak`, `Incompatible` |
| | **Required**: The related component must be present on the entity. These components are displayed in the Editor as a hard requirement for adding this auto-component. |
| | **Weak**: The related component isn't required, but will be activated on the entity (if present) before this auto-component. | |
| | **Incompatible**: The related component isn't compatible with this auto-component. Attempting to place both components on an entity will result in an error. | |
| HasController | If `true`, the related component must have a multiplayer controller associated with it. Setting this value to true will cause controller accessors to be generated on the controller being described. | `bool` |

For components that have a relation constraint of `Required` or `Weak`, accessors are generated on the auto-component with the name `Get<ComponentName>()`. These accessors return a cached pointer to the related component that's created on entity activation.

### Include

The `Include` tag is used to generate the `#includes` of the C++ code. Use an `Include` tag for each header that your generated classes will use.

| Property | Description | Type |
|---|---|---|
| File | The path to a header to add as an `#include` of the generated source. | `string` |

### Example

[`NetworkWeaponsComponent.AutoComponent.xml`](https://github.com/o3de/o3de-multiplayersample/blob/development/Gem/Code/Source/AutoGen/NetworkWeaponsComponent.AutoComponent.xml) is an example of an auto-component that synchronizes a component that represents weapon state across a multiplayer session.

```xml
<?xml version="1.0"?>

<Component
    Name="NetworkWeaponsComponent"
    Namespace="MultiplayerSample"
    OverrideComponent="true"
    OverrideController="true"
    OverrideInclude="Source/Components/NetworkWeaponsComponent.h"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <ComponentRelation Constraint="Required" HasController="true" Name="NetworkAnimationComponent" Namespace="MultiplayerSample" Include="Source/Components/NetworkAnimationComponent.h" />

    <Include File="Source/Weapons/WeaponTypes.h" />

    <NetworkInput Type="bool" Name="Draw" Init="false" />
    <NetworkInput Type="WeaponActivationBitset" Name="Firing"  Init="" />

    <NetworkProperty Type="AZ::Vector3"  Name="TargetPosition"   Init="AZ::Vector3::CreateZero()" Container="Object"       ReplicateFrom="Authority" ReplicateTo="Client"     IsPublic="false" IsRewindable="false" IsPredictable="false" ExposeToEditor="false" GenerateEventBindings="false" Description="Target position the weapons component is currently aiming at" />
    <NetworkProperty Type="FireParams"   Name="ActivationParams" Init=""  Container="Array" Count="MaxWeaponsPerComponent" ReplicateFrom="Authority" ReplicateTo="Client"     IsPublic="false" IsRewindable="false" IsPredictable="false" ExposeToEditor="false" GenerateEventBindings="false" Description="Parameters for the current weapon activation" />
    <NetworkProperty Type="uint8_t"      Name="ActivationCounts" Init="0" Container="Array" Count="MaxWeaponsPerComponent" ReplicateFrom="Authority" ReplicateTo="Client"     IsPublic="false" IsRewindable="false" IsPredictable="false" ExposeToEditor="false" GenerateEventBindings="false" Description="The number of activations" />
    <NetworkProperty Type="WeaponState"  Name="WeaponStates"     Init=""  Container="Array" Count="MaxWeaponsPerComponent" ReplicateFrom="Authority" ReplicateTo="Autonomous" IsPublic="false" IsRewindable="false" IsPredictable="true"  ExposeToEditor="false" GenerateEventBindings="false" Description="The predictable states of the weapons" />

    <ArchetypeProperty Type="WeaponParams" Name="WeaponParams"  Init=""           Container="Array" Count="MaxWeaponsPerComponent" ExposeToEditor="true" Description="Parameters for the weapons attached to this NetworkWeaponsComponent" />
    <ArchetypeProperty Type="AZ::Name"     Name="FireBoneNames" Init="AZ::Name()" Container="Array" Count="MaxWeaponsPerComponent" ExposeToEditor="true" Description="Name of the bone to attach to for fire events" />

    <RemoteProcedure Name="SendConfirmHit" InvokeFrom="Authority" HandleOn="Client" IsPublic="false" IsReliable="false" GenerateEventBindings="false" Description="Single hit event confirmed by the server" >
        <Param Type="WeaponIndex" Name="WeaponIndex" />
        <Param Type="HitEvent"    Name="HitEvent" />
    </RemoteProcedure>

    <RemoteProcedure Name="SendConfirmProjectileHit" InvokeFrom="Authority" HandleOn="Client" IsPublic="false" IsReliable="false" GenerateEventBindings="false" Description="Fired by projectile entities on confirmed hit" >
        <Param Type="WeaponIndex" Name="WeaponIndex" />
        <Param Type="HitEvent"    Name="HitEvent" />
    </RemoteProcedure>
</Component>
```

## Building auto-components

Auto-components are processed when you compile and build your project. Whenever you update an auto-component XML file, you must reconfigure and recompile O3DE Editor, Game Launcher, and Server Launcher. This is because the XML is used to generate a C++ file, and the C++ file must be compiled. For more information about configuring builds, refer to [Configure and Build](/docs/user-guide/build/configure-and-build).

Like other O3DE components, make sure to add your auto-component files inside your project's CMake file so that they can be built. Similarly, you must reconfigure and recompile after updating any CMake file.

The following example of `<your-project>_files.cmake` lists the auto-component files:

```cmake
set(FILES
    ...
    Source/AutoGen/NetworkTestPlayerComponent.AutoComponent.xml
    Source/AutoGen/MySimpleNetPlayerComponent.AutoComponent.xml    
)    
```

## Network inputs

Multiplayer auto-components can have *network inputs*, which are used to send input data from the player to the authoritative server. Network inputs are like special RPCs that the Multiplayer Gem creates, processes, and records at each frame of the network tick. When the authority receives a network input from the player, it stamps the network input with a frame number. Noting the frame number allows the authority to rewind, meaning it returns all the rewindable network properties to that moment in history, before it processes the input. Rewind is crucial to keep the multiplayer simulation in sync.

### Attributes

| Property | Description |
| --- | --- |
| **Name** | The name of the input. This name is used when writing or reading the input in code. |
| **Type** | The data type that the input is stored as. |
| **Init** | The initial value of the data. |

### Example

```xml
<NetworkInput Type="StickAxis" Name="ForwardAxis" Init="0.0f" />
<NetworkInput Type="bool"      Name="Crouch"      Init="false" />
<NetworkInput Type="uint8_t"   Name="ResetCount"  Init="0" />
```

For a more complete example, refer to [`NetworkPlayerMovementComponent.AutoComponent.xml`](https://github.com/o3de/o3de-multiplayersample/blob/development/Gem/Code/Source/AutoGen/NetworkPlayerMovementComponent.AutoComponent.xml#L21-L28).

### Using network inputs in game logic

In C++ and scripting, an auto-component with a network input requires that you implement the following multiplayer component controller functions:

- `CreateInput`: Define this function to return a filled-in network input that contains all of the recorded device inputs that occurred since the last tick. The multiplayer system automatically calls CreateInput for the autonomous player at every network tick. This is important because unlike for single player, the multiplayer system cannot act immediately upon receiving device inputs. Instead, the multiplayer system tracks all of the device inputs and stores them in the network input.

- `ProcessInput`: Use this function to process all of the network inputs. Prior to calling this function, you should have only recorded device inputs by calling CreateInput, which doesn't result in any changes to the world yet. When you call ProcessInput, both the server and client-player will process the same network input at the same network tick. This function calls for both the autonomous player and the authority.
