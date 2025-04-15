---
linkTitle: SimulationInterfaces
title: SimulationInterfaces Gem
description: Introduction to the SimulationInterfaces Gem
toc: true
weight: 520
---

## Overview

The `SimulationInterfaces` Gem has been created to integrate O3DE with the ROS 2 [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) package, which is a new standard for simulation usage. The new gem contains the O3DE implementation together with the API based on the EBuses, as well as the ROS 2 interface to allow communication with O3DE via the ROS 2 requests.

## Requirements

The `SimulationInterfaces` Gem requires:
- [ROS2 Gem](https://github.com/o3de/o3de-extras/tree/development/Gems/ROS2) version 3.3.0 or newer
- [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) package built and sourced

## How to add a SimulationInterfaces Gem to the project

To use the `SimulationInterfaces` Gem just add it to the dependency list in the `project.json` file. Since the whole functionality is implemented in the System Components, then everything should work out of the box.

To verify that the gem has been added successfully, check the list of available ROS 2 services and actions after launching the GameLauncher (or running the Game Mode in case of the Editor).

Get available services command:
```
ros2 service list
```

Get available actions command:
```
ros2 action list
```

Output of these commands should contains all services and actions that are described below.

## Supported Features overview

This section presents the detailed description of the currently implemented and supported simulation features.

### GetSimulatorFeatures service

The `GetSimulatorFeatures` service purpose is to allow users to get the list of [simulation_interfaces](https://github.com/ros-simulation/simulation_interfaces) features that are supported by the simulator.

Service definition: [GetEntityState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSimulatorFeatures.srv) \
SimulatorFeatures definition: [SimulatorFeatures](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulatorFeatures.msg) \
Default service name: `/get_simulation_features` \
O3DE EBus: `SimulationInterfaces::SimulationFeaturesAggregatorRequests::GetSimulationFeatures`

The returned list contains numbers that can be mapped to the supported feature. Such a mapping is described in the [SimulatorFeatures](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulatorFeatures.msg) definition.

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
The `GetSpawnables` service purpose is to retrieve a list of all simulated *spawnables* (e.g., models, robots, objects) that are currently available to be spawned into the simulation environment.

Service definition: [GetSpawnables](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSpawnables.srv) \
Individual *spawnables* definition: [Spawnable.msg](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/Spawnable.msg) \
Default service name: `/get_spawnables` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetSpawnables`

### SpawnEntity service

The `SpawnEntity` service purpose is to allow spawning entities previously found with `GetSpawnables` service.

Service definition: [SpawnEntity](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/SpawnEntity.srv) \
Default service name: `/spawn_entity` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::SpawnEntity`

The ROS 2 user who wants to spawn a new object in their simulation has to have a valid URI e.g.,`product_asset:///prefabs/robot/foorobot.spawnable`. `Simulation Entities Manager` will find respective Asset ID based on the URI.

**Note:** Spawning assets from the file system e.g., `spawnable://home/username/robots/FooRobot.spawnables` is not supported.

### GetEntities service

The `GetEntities` service purpose is to provide access to a list of all spawned entities.

Service definition: [GetEntities](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntities.srv) \
EntityFilters definition: [EntityFilters](https://github.com/ros-simulation/simulation_interfaces/blob/main/msg/EntityFilters.msg) \
Default service name: `/get_entities` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntities`

This service works in two ways:
 - returning to the caller whole cache of entities (when no filter in the query)
 - returning results of Overlap Scene Query (when Bounds where set the query)

The intermidiate result is filtered by regular expression (given in filter string) and category.

**Note:** Filtering by tags is not yet supported.

### GetEntitiesStates service

The `GetEntitiesStates` service purpose is to allow users to get the state (speed, location, acceleration) of chosen entities.

Service definition: [GetEntitiesStates.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntitiesStates.srv) \
Individual entity state definition: [EntityState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/EntityState.msg) \
Default service name: `/get_entities_states` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntitiesStates`

**Note:** Acceleration is not supported. Therefore it is not filled in the response.

### SetEntityState service

The `SetEntityState` service purpose is to allow modifying the state of the chosen entity.

Service definition: [SetEntityState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/SetEntityState.srv) \
Individual entity state definition: [EntityState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/EntityState.msg) \
Default service name: `/set_entity_state` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::SetEntityState`

### DeleteEntity service

The `DeleteEntity` service purpose is to allow despawning the previously spawned entities.

Service definition: [DeleteEntity.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/DeleteEntity.srv) \
Default service name: `/delete_entity` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::DeleteEntity`

**Note:** This mechanism allows to delete the entities that are the part of the level prefab (e.g., prefab instantiated in Editor).

### ResetSimulation service

The `ResetSimulation` service purpose is to allow to reset the simulation via ROS 2 interface.

Service definition: [ResetSimulation.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/ResetSimulation.srv) \
Default service name: `/reset_simulation` \
O3DE EBus: Simulation reset is a complex operation that requires calls to more than one EBus. Therefore this section is empty.

| Scope         | Planned API and usage                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| SCOPE_ALL     | `ConsoleRequestBus` and `LoadLevel` command.                                   |
| SCOPE_SPAWNED | Internal API to destroy all spawn tickets using `Simulation Entities manager`.      |
| SCOPE_STATE   | Move all spawned entities to initial poses cached in `Simulation Entities manager`. |
| SCOPE_TIME    | New call using `ROS2Bus`                                                       |

### SetSimulationState service

The `SetSimulationState` service purpose is to allow to set the state of the simulation (*STOPPED*, *PAUSED*, *PLAYING*, *QUITTING*).

Service definition: [SetSimulationState](https://github.com/ros-simulation/simulation_interfaces/blob/main/srv/SetSimulationState.srv) \
SimulationState definition: [SimulationState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulationState.msg) \
Default service name: `/set_simulation_state` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::SetSimulationState`

The transition from *PLAYING* or *PAUSED* to *STOPPED* triggers level reloading.

The transition from *PLAYING* to *PAUSED* asks the default physics scene to be disabled. It stops movement of all PhysX articulations, rigid bodies (both kinematic and simulated), and characters, but some animations are played. The transition from *PAUSED* to *PLAYING* does the opposite.

The transition from *PLAYING*, *PAUSED*, or *STOPPED* to *QUITTING* closes simulator calling `ConsoleRequestBus` with `quit` command.

Transitions from *STOPPED* to *PAUSED* and from *QUITTING* to any other state are forbidden.

### GetSimulationState service

The `GetSimulationState` service purpose is to allow to get the current state of the simulation.

Service definition: [GetSimulationState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetSimulationState.srv) \
SimulationState definition: [SimulationState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/SimulationState.msg) \
Default service name: `/get_simulation_state` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::GetSimulationState`

### GetEntityState service

The `GetEntityState` service purpose is to allow users to get the state (speed, location, acceleration) of a single, chosen entity.

Service definition: [GetEntityState.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/GetEntityState.srv) \
Individual entity state definition: [EntityState](https://github.com/ros-simulation/simulation_interfaces/tree/main/msg/EntityState.msg) \
Default service name: `/get_entity_state` \
O3DE EBus: `SimulationInterfaces::SimulationEntityManagerRequests::GetEntityState`

**Note:** Acceleration is not supported. Therefore it is not filled in the response.

### StepSimulation service

The `StepSimulation` service purpose is to allow users to simulate a finite number of steps.

Service definition: [StepSimulation.srv](https://github.com/ros-simulation/simulation_interfaces/tree/main/srv/StepSimulation.srv) \
Default service name: `/step_simulation` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::StepSimulation`

**Note:** The simulator has to be paused. Otherwise `StepSimulation` request will fail immediately.

### SimulateSteps action

The `SimulateSteps` action purpose is to allow users to simulate a finite number of steps in non-blocking way.

Action definition: [SimulateSteps.action](https://github.com/ros-simulation/simulation_interfaces/blob/main/action/SimulateSteps.action) \
Default action name: `/simulate_steps` \
O3DE EBus: `SimulationInterfaces::SimulationManagerRequests::StepSimulation`

**Note:** The simulator has to be paused. Otherwise `SimulateSteps` goal will be accepted and fail immediately.
