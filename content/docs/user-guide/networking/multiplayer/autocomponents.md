---
linktitle: Auto-components
title: Multiplayer Auto-components
description: A reference for defining Open 3D Engine (O3DE) multiplayer states through auto-components.
weight: 400
---

*Auto-components* provide a convenient way to create **Open 3D Engine (O3DE)** multiplayer components. These components define states that are relevant to network synchronization. Using the [AzAutoGen](/docs/user-guide/programming/autogen) system, you can process auto-component files that are found in your project during a build to automatically generate C++ classes for components and to create controllers that provide network replication and remote function calls. Auto-components also manage [edit](/docs/user-guide/programming/components/reflection/edit-context/) and [behavior](/docs/user-guide/programming/components/reflection/behavior-context/) context bindings so that the bound component shows in **O3DE Editor** and works with O3DE scripting.

To enable auto-component builds for your project, follow the instructions in [Multiplayer: Project Configuration](./configuration).


## File structure

Auto-components are defined in XML files and placed in the `Code\Source\Autogen` directory of the Multiplayer Gem. By naming convention, auto-component filenames must end with the suffix `.AutoComponent.xml`.

## Attributes

A multiplayer component can contain a variety of attributes that define its functionality and interface, such as network properties, RPCs, network inputs, and archetype properties.

### Component

The `Component` tag defines the name, namespace, include path, and C++ override behavior for the multiplayer component. This is required and should be defined only once.

| Property | Description | Type |
|---|---|---|
| Name | The class name of the generated auto-component. The value must be a valid C++ class name. | `string` |
| Namespace | The namespace that the generated auto-component will be placed within. For a given Gem, all defined auto-components must be defined within the same namespace. Mixing namespaces inside a Gem will result in compiler errors. The value must be a valid C++ namespace name. | `string` |
| OverrideComponent | If `true`, the generated component will be a base class and the developer implementing the multiplayer component will be responsible for supplying the final derived component used in the editor and at runtime. | `bool` |
| OverrideController | If `true`, the generated controller will be a base class, and the developer implementing the multiplayer component will be responsible for supplying the final derived controller used in the runtime. | `bool` |
| OverrideInclude | If either `OverrideComponent` or `OverrideController` are `true`, this value is **required** and must be the path (relative to the Gem root) of the header containing the concrete implementations. The developer implementing the final component or controller classes must provide the class header that the final classes are declared within. | `string` |

### ComponentRelation

The `ComponentRelation` tag indicates this component's relationship with other components. Use this to define whether or not this component requires or is incompatible with sibling components on the same entity. For example, the `NetworkCharacterComponent` requires a `NetworkTransformComponent` on the same entity to properly function.

| Property | Description | Type |
|---|---|---|
| Name | The name of the related component. The value must be a valid C++ class name.| `string` |
| Namespace | The namespace that the related component is declared within. The value must be a valid C++ namespace name. | `string` |
| Include | The include path of the related component. | `string` |
| Constraint | The type of relation that the related component has with this component. The allowed values are:<ul><li>**Required**: The related component must be present on the entity. These components are displayed in the Editor as a hard requirement for adding this autocomponent.</li><li>**Weak**: The related component isn't required, but will be activated on the entity (if present) before this auto-component.</li><li>**Incompatible**: The related component isn't compatible with this auto-component. Attempting to place both components on an entity will result in an error.</li></ul> | `Required`, `Weak`, `Incompatible` |
| HasController | If `true`, the related component must have a multiplayer controller associated with it. Setting this value to true causes controller accessors to be generated on the controller. | `bool` |

For components that have a relation constraint of `Required` or `Weak`, accessors are generated on the auto-component with the name `Get<ComponentName>()`. These accessors return a cached pointer to the related component that's created on entity activation.

### Include

The `Include` tag is used to generate the `#include` directives of the C++ code. An `Include` tag contains a path to a single header file. Use additional `Include` tags for each header file that your generated classes will use. 

| Property | Description | Type |
|---|---|---|
| File | The path to a header to add as an `#include` of the generated source. | `string` |


### Network properties

Network properties state information about the component that gets replicated between network endpoints. 
They have two important fields: `ReplicateFrom` and `ReplicateTo`. 
Together, these fields define which role can replicate to another specific role.
You can only replicate property values *from* Authority and Autonomous roles. 
A `ReplicateFrom` Authority relationship creates a server-authority model, which helps to ensure that you don't accidentally replicate from an unprivileged client. 
Properties can be replicated *to* any role, because all participants in the session may need information from any other participant.

The following are four types of networking properties with a valid "from and to" relationship and their possible use cases:

- **Authority-to-Client**: Handles client, or "simulated", properties.

- **Authority-to-Autonomous**: Handles autonomous-only properties.

- **Authority-to-Server**: Handles host migration.

- **Autonomous-to-Authority**: Gathers information about client metrics, such as monitoring the health of clients.

For networking properties that replicate from Authority, a replication hierarchy applies. The replicate-to rules trickle up the hierarchy in the following way: An Authority-to-Client replication also replicates to Autonomous and Server roles. An Authority-to-Autonomous replication also replicates to the Server role. Finally, an Authority-to-Server replication only replicates to the Server. This behavioral hierarchy ensures that if the Authority ever migrates to the other server, then the other server has the right property information.

The `NetworkProperty` tag has the following properties:

| Property | Description | Values |
| - | - | - |
| Name | Name of the network property. | `string` |
| Description | Describes the function of the network property. | `string` |
| Type | The property's type must be a valid C++ type or class name. | `string` |
| Init | The initial value of the property. | `string` |
| ReplicateFrom | Tells the network which role can send information about the changes that were made to this property. | `Authority`, `Autonomous` | 
| ReplicateTo | Tells the network which role can receive information about the changes that were made to this property. | `Server`, `Authority`, `Autonomous`, `Client` | 
| Container | The type of holder object that stores this network property. | `Object`, `Array`, `Vector` |
| Count | The number of elements, when `Container` is `Array` or `Vector`. Must be an integer value or an integer type variable. | `string` |
| IsPublic | If `true`, this property's access modifier is set to `public`, and is accessible from outside of the class.  | `bool` |
| IsRewindable | If `true`, the network simulation records the historic value of this network property for each network time tick. The ability to rewind is needed if the network property plays a crucial role in the network simulation, as it relates to other network entities. For example, the network transform component's network properties are rewindable. This is important because if player A shoots a gun at network time tick 10, then the host must rewind all of the other network entities' transform components back to their position at time tick 10 to check who was hit. | `bool` |
| IsPredictable | If true, the Autonomous player is allowed to edit this property even if **ReplicateFrom** is `Authority` and not `Autonomous`. The autonomous player doesn't have control of this network property, but they may predict and change its value locally. For example, with the Network Transform component, the autonomous player is allowed to alter their player's position locally, even before receiving explicit permission from the server to move. This makes the player's movements feel responsive. | `bool` |
| ExposeToEditor | If `true`, this property is accessible in the O3DE Editor. | `bool` |
| ExposeToScript | If `true`, this property is accessible for runtime scripting via Lua and ScriptCanvas.  | `bool` |
| GenerateEventBindings | If `true`, [AZ::Event](https://www.o3de.org/docs/user-guide/programming/az-event/) callbacks will be triggered whenever the value of this network property is changed. | `bool` |

### Remote procedure calls (RPCs)

RPCs have two important properties: `InvokeFrom` and `HandleOn`. These properties describe which role the RPC is invoked from and which role it's handled on.

The following are four types of RPCs with a valid "invoked from and handled on" relationship and their possible use cases:

- **Authority-to-Autonomous**: In an example use case, it sends corrections about the game state to the user.

- **Authority-to-Client**: Authority sends calls to all clients. For example, it sends a request to play a particle effect on all the clients.

- **Server-to-Authority**: This is required to communicate information between entities. For example, suppose in a multi-server setup, EntityA is owned by ServerA and EntityB is owned by ServerB. If EntityA communicates directly to EntityB, EntityA will be talking to a proxy, not the real EntityB. Server-to-Authority ensures that messages always find the entity with authority. For example, when a player wants to deal damage, Autonomous informs the Server, and the Server sends the DealDamage function to Authority. 

- **Autonomous-to-Authority**: Sends user settings information that affects user input and is used during input-process time rather than input-creation time, such as mouse sensitivity and input controls. 

The `RemoteProcedure` tag has the following properties:

| Property | Description | Values | 
| - | - | - |
| Name | Name of the RPC. | `string` |
| Param | A parameter and value pair that you can send along with the RPCs. You can have none or an infinite amount of parameters. You must specify the parameter's type and name. |  |
| Description | Describes the functionality of the RPC. | `string` |
| InvokeFrom | Tells the network which role invokes this RPC. | `Authority`, `Server`, `Autonomous` | 
| HandleOn | Tells the network which roles handles this RPC. If Authority, the RPC is handled by the server that has authority over that entity. If Autonomous, the RPC is handled only by the relevant player's local client. If Client, the RPC is handled on all clients. | `Authority`, `Autonomous`, `Client` |
| IsPublic | If `true`, this property's access modifier is set to `public`, allowing others to send this RPC across the network. | `bool` |
| IsReliable | If `true`, RPC is reliable and uses a queue to guarantee the delivery of a message. Otherwise, RPC is unreliable and are sent over a "fire and forget" method. Be aware that RPCs can be reliably sent, but are not guaranteed to arrive in any particular order.  | `bool` |
| GenerateEventBindings | If `true`, [AZ::Event](https://www.o3de.org/docs/user-guide/programming/az-event/) callbacks will be triggered whenever the value of this network property is changed. | `bool` |


### Archetype property

The `ArchetypeProperty` tag defines a property that you can configure only at edit time. When a multiplayer component gets generated, its archetype properties become accessible in the O3DE Editor, via the component menu. A multiplayer component may have none or an infinite number of archetype properties.

| Property | Description | Values |
| - | - | - |
| Name | The name of the property. | `string` |
| Type | The property's type must be a valid C++ type or class name. | `string` |
| Init | The initial value of the property. | `string` |
| Container | The type of holder object that stores this property. | `Object`, `Array`, `Vector` |
| Count | The number of elements, when `Container` is `Array` or `Vector`. Must be an integer value or an integer type variable. | `string` |
| ExposeToEditor | If `true`, this is accessible in the O3DE Editor. It's recommended to enable this setting for archetype properties to be useful. Only disable this setting if you don't want users to access this and are supplying a hard-coded value in `Init`.  | `bool` |


### Network inputs

*Network inputs* are used to send input data from the player to the authoritative server. Network inputs are like special [remote procedure calls (RPCs)](/docs/user-guide/networking/multiplayer/overview#remote-procedure-calls-rpcs) that the Multiplayer Gem creates, processes, and records at each frame of the network tick. When the authority receives a network input from the player, it stamps the network input with a frame number. Noting the frame number allows the authority to *rewind*, meaning it returns all of the rewindable network properties to that moment in history. Rewinding before processing the input is crucial to keep the multiplayer simulation in sync.

| Property | Description |
| --- | --- |
| **Name** | The name of the input. This name is used when writing or reading the input in code. |
| **Type** | The data type that the input is stored as. |
| **Init** | The initial value of the data. |

#### Example

```xml
<NetworkInput Type="StickAxis" Name="ForwardAxis" Init="0.0f" />
<NetworkInput Type="bool"      Name="Crouch"      Init="false" />
<NetworkInput Type="uint8_t"   Name="ResetCount"  Init="0" />
```

For a more complete example, refer to [`NetworkPlayerMovementComponent.AutoComponent.xml`](https://github.com/o3de/o3de-multiplayersample/blob/development/Gem/Code/Source/AutoGen/NetworkPlayerMovementComponent.AutoComponent.xml#L21-L28).

#### Using network inputs in game logic

In C++ and scripting, an auto-component with a network input requires that you implement the following multiplayer component controller functions:

- `CreateInput`: Define this function to return a filled-in network input that contains all of the recorded device inputs that occurred since the last tick. The multiplayer system automatically calls CreateInput for the autonomous player at every network tick. This is important because unlike for single player, the multiplayer system cannot act immediately upon receiving device inputs. Instead, the multiplayer system tracks all of the device inputs and stores them in the network input.

- `ProcessInput`: Define and use this function to process all of the network inputs. Prior to calling this function, you should only have recorded device inputs through CreateInput, which doesn't result in any changes to the world yet. When you call ProcessInput, both the server and client-player will process the same network input at the same network tick. This function calls for both the autonomous player and the authority.


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