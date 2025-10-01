---
linkTitle: SimulationInterfaces
title: SimulationInterfaces Gem
description: Introduction to the SimulationInterfaces Gem
toc: true
weight: 520
---

## Overview

The `SimulationInterfaces` Gem has been created to integrate O3DE with the ROS 2 [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) package, which is a new standard for simulation usage. The Gem contains the O3DE implementation together with the API based on the EBuses, as well as the ROS 2 interface to allow communication with O3DE via the ROS 2 framework.

## Requirements

The `SimulationInterfaces` Gem requires:
- [ROS2 Gem](https://github.com/o3de/o3de-extras/tree/development/Gems/ROS2) version 4.0.0 or newer
- [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) package installed.

## Adding `SimulationInterfaces` Gem to the project

Add the `SimulationInterfaces` Gem to the dependency list in the `project.json` file to use it within your project. Gem's functionality is implemented as _System Components_, hence making all interfaces available from the start.

To verify that the Gem has been added successfully, check the list of available ROS 2 _services_ and _actions_ after launching the GameLauncher (or running the Game Mode from the Editor).

Get available _services_ command:
```
ros2 service list
```

Get available _actions_ command:
```
ros2 action list
```

The details of the listed interfaces are provided in a later section.

## Motivation 

The `SimulationInterfaces` is ROS 2 API that allows to affect entities in various ways.
It is can be thought as ROS 2 API to talk with :

- [Spawning and despawning](/docs/learning-guide/tutorials/entities-and-prefabs/spawn-a-prefab/),
- setting and getting information about spawned entities,
- getting predefined poses in simulated worlds,
- pausing simulation,
- resetting simulation,
- controlling loaded level.

With `SimulationInterfaces` you can query and modify state of spawned entities and information about them. 
Spawned entity in `SimulationInterfaces` nomenclature is a single prefab spawned by `spawn_entity` service.
There are no strict limitations about spawned prefab structure.

Although there is a recommendation to build your simulation assets in tree like structure where the root is a [Rigid Body Component](docs/user-guide/components/reference/physx/rigid-body/) or [Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) and children are other components (like meshes, lights and others). In such case, mentioned root will be tracked as spawned entity

The correctly designed prefab should has following structure:\
![prefab](/images/user-guide/interactivity/robotics/correct_structure.png)

The `Rack` entity has [Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) and [PhysX Mesh Collider Component](/docs/user-guide/components/reference/physx/mesh-collider/) and is available in `SimulationInterfaces`.
Entities `Boxes`, `Lv0`, `Lv1`, `Lv2` are only decorative. 
However, above-mentioned will follow `Rack`, due to parent-child relation and [Transform Component](/docs/user-guide/components/reference/transform/).
`Simulation Interface` will always set first [simulated body](/docs/user-guide/interactivity/physics/nvidia-physx/simulated-bodies/) as tracked entity if such exist in spawned prefab.

If spawned prefab does not have simulated bodies, prefab root a.k.a `ContainerEntity` will be tracked instead.

{{< note >}}
Object already existing on scene are not added to `SimulationInterfaces` Gem registry. Although, there is a C++ API which allows to add any entity to be maintained by the Gem. 
{{< /note >}}

The `SimulationInterfaces` allows performing bound search. 
You can specify what is you region of interests and ask for Simulated Entities inside.
This feature uses [Overlap Scene Query](/docs/user-guide/interactivity/physics/nvidia-physx/scene-queries/#overlap). 
You need to have collider shapes added to entities to get results from [Overlap Scene Query](/docs/user-guide/interactivity/physics/nvidia-physx/scene-queries/#overlap).

{{< note >}}
The number of results in scene queries is pretty limited by default (32). 
We highly recommend to increase this limit to Overlap Query Buffer Size in [PhysX Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/).
{{< /note >}}

## Supported Features overview

This section presents the detailed description of the currently implemented and supported simulation features.

### Gem configuration

The `SimulationInterfaces` can be configured in your project with following registry keys:

| Registry key                                                | Feature                                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `SimulationInterfaces/PrintStateNameInGui`                  | If set to `true`, the current state is shown in GUI                                                                |
| `SimulationInterfaces/StartInStoppedState`                  | By default, simulation starts in stopped state. Setting to `false` allows starting simulation automatically        |
| `SimulationInterfaces/KeyboardTransitions/StoppedToPlaying` | Set the keyboard key that will change simulation state from Stopped to Playing e.g., `keyboard_key_alphanumeric_R` |
| `SimulationInterfaces/KeyboardTransitions/PausedToPlaying`  | Set the keyboard key that will change simulation state from Paused to Playing e.g., `keyboard_key_alphanumeric_P`  |
| `SimulationInterfaces/KeyboardTransitions/PlayingToPaused`  | Set the keyboard key that will change simulation state from Playing to Paused e.g., `keyboard_key_alphanumeric_P`  |
| `ROS2SimulationInterfaces/<ServiceType>`                    | Change default service name (service is disabled if empty string is passed)                                        |

{{< note >}}
You can assign the same key to multiple `SimulationInterfaces/KeyboardTransitions` registry key.
{{< /note >}}

{{< note >}}
The name of keyboard's key to use (e.g., `keyboard_key_alphanumeric_R`) you can find in header [InputDeviceKeyboard.h](https://github.com/o3de/o3de/blob/d2692fc0b2130ca8d7642c33a181983bca053dd9/Code/Framework/AzFramework/AzFramework/Input/Devices/Keyboard/InputDeviceKeyboard.h#L94)
{{< /note >}}

{{< note >}}
`ServiceType` can be found in [headers defining service handlers](https://github.com/o3de/o3de-extras/tree/development/Gems/SimulationInterfaces/Code/Source/Services) or in further part of this documentation.
{{< /note >}}

{{< note >}}
More on registry in O3DE can be found in [Settings Registry](/docs/user-guide/settings/).
{{< /note >}}

The sample registry file that you can put under directory `<your_project>/Registry/simulationinterface_settings.setreg` is listed below:

```json
{
    "SimulationInterfaces": {
        "PrintStateNameInGui": true,
        "StartInStoppedState": true,
        "KeyboardTransitions":
        {
            "StoppedToPlaying": "keyboard_key_alphanumeric_R",
            "PausedToPlaying": "keyboard_key_alphanumeric_R",
            "PlayingToPaused": "keyboard_key_alphanumeric_P"
        }
    },
    "ROS2SimulationInterfaces": {
        "GetEntities": "custom_get_entities_service",
        "GetSimulatorFeatures": ""
    }
}
```

### GetSimulatorFeatures service

The `GetSimulatorFeatures` _service_ allows users to get the list of [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) features that are supported by the simulator.

ROS 2 _service_ definition: [GetSimulatorFeatures.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSimulatorFeatures.srv) \
SimulatorFeatures definition: [SimulatorFeatures](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulatorFeatures.msg) \
Default _service_ name: `/get_simulator_features` \
O3DE EBus: `SimulationInterfaces::SimulationFeaturesAggregatorRequests::GetSimulationFeatures`

The returned list contains numbers that can be mapped to the supported features. The mapping is defined in the [SimulatorFeatures](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulatorFeatures.msg) message.

The following features are currently supported:

- SPAWNING
- DELETING
- NAMED_POSES
- POSE_BOUNDS
- ENTITY_TAGS
- ENTITY_BOUNDS
- ENTITY_BOUNDS_BOX
- ENTITY_CATEGORIES 
- ENTITY_STATE_GETTING
- ENTITY_STATE_SETTING
- ENTITY_INFO_GETTING
- ENTITY_INFO_SETTING
- SPAWNABLES
- SIMULATION_RESET
- SIMULATION_RESET_TIME
- SIMULATION_RESET_STATE
- SIMULATION_RESET_SPAWNED
- SIMULATION_STATE_GETTING
- SIMULATION_STATE_SETTING
- SIMULATION_STATE_PAUSE
- STEP_SIMULATION_SINGLE
- STEP_SIMULATION_MULTIPLE
- STEP_SIMULATION_ACTION
- WORLD_LOADING
- WORLD_UNLOADING
- WORLD_INFO_GETTING
- AVAILABLE_WORLDS

### SpawnEntity service

The `SpawnEntity` _service_ lets you add simulated _spawnables_ into the simulation environment. List of available _spawnables_ can be obtained with the `GetSpawnables` _service_.

ROS 2 _service_ definition: [SpawnEntity.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/SpawnEntity.srv) \
Default _service_ name: `/spawn_entity` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::SpawnEntity`

If you want to spawn a new object into the simulation environment, you need to know the valid URI of the _spawnable_, e.g.,`product_asset:///prefabs/robot/foorobot.spawnable`. `Simulation Entities Manager` will find corresponding Asset ID based on the URI.

**Note:** Spawning assets from the file system e.g., `spawnable://home/username/robots/FooRobot.spawnables` is not supported.

### DeleteEntity service

The `DeleteEntity` _service_ lets you despawn the previously spawned entities.

ROS 2 _service_ definition: [DeleteEntity.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/DeleteEntity.srv) \
Default _service_ name: `/delete_entity` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::DeleteEntity`

**Note:** This mechanism allows you to delete only entities which were previously spawned with the `SimulationInterfaces` interface.

### GetNamedPoses service

The `GetNamedPoses` _service_ allows you to get named poses defined in simulated world. To define `NamedPose` you need to add entity with `NamedPoseEditorComponent` in Editor and save it in you level prefab.

ROS 2 _service_ definition: [GetNamedPoses.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/GetNamedPoses.srv) \
NamedPose definition: [NamedPose.msg](https://github.com/ros-simulation/simulation_interfaces/blob/main/msg/NamedPose.msg) \
Default _service_ name: `/get_named_poses` \
O3DE Ebus: `SimulationInterfaces::NamedPoseManagerRequests::GetNamedPoses`

### GetNamedPoseBounds service

The `GetNamedPoseBounds` _service_ allows you to get bounds of defined named pose. To define named pose bounds, entity with `NamedPoseEditorComponent` needs to have added collider.

ROS 2 _service_ definition: [GetNamedPoseBounds.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/GetNamedPoseBounds.srv) \
Default _service_ name: `/get_named_pose_bounds` \
O3DE Ebus: `SimulationInterfaces::NamedPoseManagerRequests::GetNamedPoseBounds`

### GetEntities service

The `GetEntities` _service_ outputs a list of all spawned entities.

ROS 2 _service_ definition: [GetEntities](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntities.srv) \
EntityFilters definition: [EntityFilters](https://github.com/ros-simulation/simulation_interfaces/blob/main/msg/EntityFilters.msg) \
Default _service_ name: `/get_entities` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntities`

This service allows to filter entities in the presented in the table below

| Filter Type        | How filter works                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| regular expression | returns only entities with names which matches passed regex                                          |
| categories         | returns entities which belong to given categories, to set category check out `SetEntityInfo` service |
| tags               | returns entities which are correctly tagged, to set entity tags check out `SetEntityInfo` service    |
| bounds             | returns result of `Overlap Scene Query` with simulation entities                                     |

Filters are combined with each other, so resulted entities fulfill all checks. If empty filters were passed, all simulated entities are returned.

### GetEntitiesStates service

The `GetEntitiesStates` _service_ lets you get the state (speed, location, acceleration) of chosen entities.

ROS 2 _service_ definition: [GetEntitiesStates.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntitiesStates.srv) \
Individual _entity state_ ROS 2 _message_ definition: [EntityState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/EntityState.msg) \
Default _service_ name: `/get_entities_states` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntitiesStates`

**Note:** Acceleration is not supported. Therefore, it is not filled in the response.

### SetEntityState service

The `SetEntityState` _service_ lets you modify the state of the chosen entity. This includes the pose and the twist parameters.

ROS 2 _service_ definition: [SetEntityState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/SetEntityState.srv) \
Individual _entity state_ ROS 2 _message_ definition: [EntityState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/EntityState.msg) \
Default _service_ name: `/set_entity_state` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::SetEntityState`

### GetEntityInfo service

The `GetEntityInfo` _service_ allows to get information about entity such as category, description and tags.

ROS 2 _service_ definition [GetEntityInfo.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/GetEntityInfo.srv) \
EntityInfo definition [EntityInfo](https://github.com/ros-simulation/simulation_interfaces/blob/main/msg/EntityInfo.msg) \
Default _service_ name: `/get_entity_info` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntityInfo`

### SetEntityInfo service

The `SetEntityInfo` _service_ allows to set information about entity such as category, description and tags.

ROS 2 _service_ definition [SetEntityInfo.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/SetEntityInfo.srv) \
EntityInfo definition [EntityInfo](https://github.com/ros-simulation/simulation_interfaces/blob/main/msg/EntityInfo.msg) \
Default _service_ name: `/set_entity_info` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::SetEntityInfo`

### GetSpawnables service

The `GetSpawnables` _service_ outputs a list of all simulated _spawnables_ (e.g., models, robots, objects) that can be spawned into the simulation environment.

ROS 2 _service_ definition: [GetSpawnables.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSpawnables.srv) \
Individual _spawnables_ ROS 2 _message_ definition: [Spawnable.msg](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/Spawnable.msg) \
Default _service_ name: `/get_spawnables` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetSpawnables`

### ResetSimulation service

The `ResetSimulation` _service_ lets you reset the simulation via ROS 2 interface.

ROS 2 _service_ definition: [ResetSimulation.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/ResetSimulation.srv) \
Default _service_ name: `/reset_simulation` \
O3DE EBus: There is no additional interface for resetting the scene.

| Scope         | Planned API and usage                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| SCOPE_ALL     | Reloading level using `Level Manager`                                               |
| SCOPE_SPAWNED | Internal API to destroy all spawn tickets using `Simulation Entities manager`.      |
| SCOPE_STATE   | Move all spawned entities to initial poses cached in `Simulation Entities manager`. |
| SCOPE_TIME    | New call using `ROS2Bus`                                                            |

### SetSimulationState service

The `SetSimulationState` _service_ lets you set the state of the simulation (*STOPPED*, *PAUSED*, *PLAYING*, *QUITTING*).

ROS 2 _service_ definition: [SetSimulationState.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/SetSimulationState.srv) \
SimulationState definition: [SimulationState.msg](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulationState.msg) \
Default _service_ name: `/set_simulation_state` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::SetSimulationState`

The transition from *PLAYING* or *PAUSED* to *STOPPED* triggers level reloading.

The transition from *PLAYING* to *PAUSED* asks the default physics scene to be disabled. Hence, it stops movement of all _PhysX_ articulations, rigid bodies (both kinematic and simulated), and characters. Some animations are played. The transition from *PAUSED* to *PLAYING* does the opposite.

The transition from *PLAYING*, *PAUSED*, or *STOPPED* to *QUITTING* closes simulator by calling `quit` command over `ConsoleRequestBus`.

Transitions from *STOPPED* to *PAUSED* and from *QUITTING* to any other state are forbidden.

The transition form *NO_WORLD* to *PAUSED* is triggered by loading level using `/load_world` _service_. Transition goes through *LOADING_WORLD*.

The transition from *PLAYING* or *PAUSED* is triggered by unloading level using `/unload_world` _service_.

The transition from *NO_WORLD* to *PLAYING* is forbidden.

### GetSimulationState service

The `GetSimulationState` _service_ lets you get the current state of the simulation (*PLAYING*, *PAUSED*, or *STOPPED*).

ROS 2 _service_ definition: [GetSimulationState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSimulationState.srv) \
SimulationState definition: [SimulationState.msg](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulationState.msg) \
Default _service_ name: `/get_simulation_state` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::GetSimulationState`

### GetEntityState service

The `GetEntityState` _service_ lets you get the state (speed, location, acceleration) of a single entity.

ROS 2 _service_ definition: [GetEntityState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntityState.srv) \
Individual _entity state_ ROS 2 _message_ definition: [EntityState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/EntityState.msg) \
Default _service_ name: `/get_entity_state` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntityState`

**Note:** Acceleration is not supported. Therefore, it is not filled in the response.

### StepSimulation service

The `StepSimulation` _service_ lets you simulate a finite number of steps.

ROS 2 _service_ definition: [StepSimulation.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/StepSimulation.srv) \
Default _service_ name: `/step_simulation` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::StepSimulation`

**Note:** The simulator has to be paused. Otherwise, `StepSimulation` request will fail immediately.

### SimulateSteps action

The `SimulateSteps` _action_ lets you simulate a finite number of steps in a non-blocking way.

Action definition: [SimulateSteps.action](https://github.com/ros-simulation/simulation_interfaces/blob/main/action/SimulateSteps.action) \
Default _action_ name: `/simulate_steps` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::StepSimulation`

**Note:** The simulator has to be paused before calling this _action_. Otherwise, `SimulateSteps` goal will be accepted and fail immediately.

### LoadWorld service

The `LoadWorld` _service_ loads levels into the simulation. Calling the _service_ with a loaded level unloads it before loading the requested level. 

ROS 2 _service_ definition: [LoadWorld.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/LoadWorld.srv) \
Default _service_ name: `/load_world` \
O3DE EBus: `SimulationInterfaces::LevelManager::LoadWorld`

**Note** The simulator currently doesn't support loading levels from resource string.

### UnloadWorld service

The `UnloadWorld` _service_ unloads the current level from the simulation. 

ROS 2 _service_ definition: [UnloadWorld.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/UnloadWorld.srv) \
Default _service_ name: `/unload_world` \
O3DE EBus: `SimulationInterfaces::LevelManager::UnloadWorld`

### GetCurrentWorld service

The `GetCurrentWorld` _service_ publishes information about the level that is currently loaded into the simulation.

ROS 2 _service_ definition: [GetCurrentWorld.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/GetCurrentWorld.srv) \
Default _service_ name: `/get_current_world` \
O3DE EBus: `SimulationInterfaces::LevelManager::GetCurrentWorld`

### GetAvailableWorlds service

The `GetAvailableWorlds` _service_ lists all available levels.

ROS 2 _service_ definition: [GetAvailableWorlds.srv](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/GetAvailableWorlds.srv) \
Default _service_ name: `/get_available_worlds` \
O3DE EBus: `SimulationInterfaces::LevelManager::GetAvailableWorlds`

**Note** The simulator doesn't support searching for online resources.
