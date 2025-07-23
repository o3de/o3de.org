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
- [ROS2 Gem](https://github.com/o3de/o3de-extras/tree/development/Gems/ROS2) version 3.3.0 or newer
- [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) package installed.

## Adding SimulationInterfaces Gem to the project

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

The `SimulationInterfaces` is ROS 2 API that allows to affect simulated entities in various ways.
It is can be thought as ROS 2 API to talk with :
- [Simulated Bodies](/docs/user-guide/interactivity/physics/nvidia-physx/simulated-bodies/),
- [Spawning and despawning](/docs/learning-guide/tutorials/entities-and-prefabs/spawn-a-prefab/),
- pausing simulation,
- resetting simulation.

With `SimulationInterfaces` you can query and modify state of simulated bodies. 
Those are entities with components such as [Rigid Body Component](docs/user-guide/components/reference/physx/rigid-body/) or [Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) and others.

{{< note >}}
Entities that has no physics, will not be available by `SimulationInterfaces`
{{< /note >}}

There is recommendation to build your simulation assets in tree like structure where the trunk is a [Rigid Body Component](docs/user-guide/components/reference/physx/rigid-body/) or [Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) and children are other components (like meshes, lights and others).

The correctly designed prefab should has following structure:\
![prefab](/images/user-guide/interactivity/robotics/correct_structure.png)

The `Rack` entity has [Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) and [PhysX Mesh Collider Component](/docs/user-guide/components/reference/physx/mesh-collider/) and is available in `SimulationInterfaces`.
Entities `Boxes`, `Lv0`, `Lv1`, `Lv2` are only decorative. 
However, above-mentioned will follow `Rack`, due to parent-child relation and [Transform Component](/docs/user-guide/components/reference/transform/).

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

{{< note >}}
You can assign the same key to multiple `SimulationInterfaces/KeyboardTransitions` registry key.
{{< /note >}}

{{< note >}}
The name of keyboard's key to use (e.g., `keyboard_key_alphanumeric_R`) you can find in header [InputDeviceKeyboard.h](https://github.com/o3de/o3de/blob/d2692fc0b2130ca8d7642c33a181983bca053dd9/Code/Framework/AzFramework/AzFramework/Input/Devices/Keyboard/InputDeviceKeyboard.h#L94)
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
    }
}
```

### GetSimulatorFeatures service

The `GetSimulatorFeatures` _service_ allows users to get the list of [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) features that are supported by the simulator.

ROS 2 _service_ definition: [GetEntityState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSimulatorFeatures.srv) \
SimulatorFeatures definition: [SimulatorFeatures](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulatorFeatures.msg) \
Default _service_ name: `/get_simulation_features` \
O3DE EBus: `SimulationInterfaces::SimulationFeaturesAggregatorRequests::GetSimulationFeatures`

The returned list contains numbers that can be mapped to the supported features. The mapping is defined in the [SimulatorFeatures](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulatorFeatures.msg) message.

The following features are currently supported:

- SPAWNING
- DELETING
- ENTITY_BOUNDS_BOX
- ENTITY_STATE_GETTING
- ENTITY_STATE_SETTING
- SPAWNABLES
- SIMULATION_RESET
- SIMULATION_RESET_TIME
- SIMULATION_RESET_SPAWNED
- SIMULATION_STATE_GETTING
- SIMULATION_STATE_SETTING
- SIMULATION_STATE_PAUSE
- STEP_SIMULATION_SINGLE
- STEP_SIMULATION_MULTIPLE
- STEP_SIMULATION_ACTION

### GetSpawnables service
The `GetSpawnables` _service_ outputs a list of all simulated _spawnables_ (e.g., models, robots, objects) that can be spawned into the simulation environment.

ROS 2 _service_ definition: [GetSpawnables](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSpawnables.srv) \
Individual _spawnables_ ROS 2 _message_ definition: [Spawnable.msg](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/Spawnable.msg) \
Default _service_ name: `/get_spawnables` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetSpawnables`

### SpawnEntity service

The `SpawnEntity` _service_ lets you add simulated _spawnables_ into the simulation environment. As explained earlier, you can get the available _spawnables_ with the `GetSpawnables` _service_.

ROS 2 _service_ definition: [SpawnEntity](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/SpawnEntity.srv) \
Default _service_ name: `/spawn_entity` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::SpawnEntity`

If you want to spawn a new object into the simulation environment, you need to know the valid URI of the _spawnable_, e.g.,`product_asset:///prefabs/robot/foorobot.spawnable`. `Simulation Entities Manager` will find corresponding Asset ID based on the URI.

**Note:** Spawning assets from the file system e.g., `spawnable://home/username/robots/FooRobot.spawnables` is not supported.

### GetEntities service

The `GetEntities` _service_ outputs a list of all spawned entities.

ROS 2 _service_ definition: [GetEntities](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntities.srv) \
EntityFilters definition: [EntityFilters](https://github.com/ros-simulation/simulation_interfaces/blob/main/msg/EntityFilters.msg) \
Default _service_ name: `/get_entities` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntities`

This service works in two ways:
 - returning to the caller whole cache of entities (when no filter in the query)
 - returning results of Overlap Scene Query (when Bounds where set the query)

The intermediate result is filtered by the regular expression parameter (given in filter string) and the category.

**Note:** Filtering by tags is not yet supported.

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

### DeleteEntity service

The `DeleteEntity` _service_ lets you despawn the previously spawned entities.

ROS 2 _service_ definition: [DeleteEntity.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/DeleteEntity.srv) \
Default _service_ name: `/delete_entity` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::DeleteEntity`

**Note:** This mechanism allows you to delete the entities that are a part of the level prefab (e.g., prefab instantiated in Editor).

### ResetSimulation service

The `ResetSimulation` _service_ lets you reset the simulation via ROS 2 interface.

ROS 2 _service_ definition: [ResetSimulation.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/ResetSimulation.srv) \
Default _service_ name: `/reset_simulation` \
O3DE EBus: There is no additional interface for resetting the scene.

| Scope         | Planned API and usage                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| SCOPE_ALL     | `ConsoleRequestBus` and `LoadLevel` command.                                        |
| SCOPE_SPAWNED | Internal API to destroy all spawn tickets using `Simulation Entities manager`.      |
| SCOPE_STATE   | Move all spawned entities to initial poses cached in `Simulation Entities manager`. |
| SCOPE_TIME    | New call using `ROS2Bus`                                                            |

### SetSimulationState service

The `SetSimulationState` _service_ lets you set the state of the simulation (*STOPPED*, *PAUSED*, *PLAYING*, *QUITTING*).

ROS 2 _service_ definition: [SetSimulationState](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/SetSimulationState.srv) \
SimulationState definition: [SimulationState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulationState.msg) \
Default _service_ name: `/set_simulation_state` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::SetSimulationState`

The transition from *PLAYING* or *PAUSED* to *STOPPED* triggers level reloading.

The transition from *PLAYING* to *PAUSED* asks the default physics scene to be disabled. Hence, it stops movement of all _PhysX_ articulations, rigid bodies (both kinematic and simulated), and characters. Some animations are played. The transition from *PAUSED* to *PLAYING* does the opposite.

The transition from *PLAYING*, *PAUSED*, or *STOPPED* to *QUITTING* closes simulator by calling `quit` command over `ConsoleRequestBus`.

Transitions from *STOPPED* to *PAUSED* and from *QUITTING* to any other state are forbidden.

### GetSimulationState service

The `GetSimulationState` _service_ lets you get the current state of the simulation (*PLAYING*, *PAUSED*, or *STOPPED*).

ROS 2 _service_ definition: [GetSimulationState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSimulationState.srv) \
SimulationState definition: [SimulationState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulationState.msg) \
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
