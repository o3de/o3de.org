---
linkTitle: PhysX
title: PhysX Gem
description: The PhysX Gem provides physics simulation with NVIDIA PhysX including static and dynamic rigid body simulation, force regions, ragdolls, and dynamic PhysX joints.
toc: true
---

The PhysX Gem provides physics simulation with NVIDIA PhysX. With PhysX, you can create static, dynamic, and kinematic rigid body simulation, force regions, ragdolls, and dynamic PhysX joints. The PhysX Gem also provides functionality for creating trigger volumes, and performing overlap tests, shapecasts, and raycasts.

## Installation

To use PhysX, enable the PhysX Gem in **Project Manager**. The PhysX Gem requires the NVIDIA PhysX SDK package, which is automatically downloaded as part of the configuration and build process. 

## Gem contents

In addtion to providing phyiscs simulation with PhysX, the PhysX Gem provides several components, a configutation tool, scene processing features, and the phyiscs material asset template, so that you can create and tune physics simulations for your projects.

### PhysX components

The components included in the PhysX Gem are used to create static, dynamic, and kinematic colliders, triggers, force regions, dynamic joints, and physical actor behaviors.

| Component | Description |
| - | - |
| [PhysX Collider](/docs/user-guide/components/reference/physx/collider/) | Adds a PhysX collider to an entity so that the entity can be included in PhysX simulation. The collider can be defined by a PhysX mesh you create, automatically generated convex hulls, shapes that have been automatically fit to a decomposed complex mesh, or a simple shape primitve selected in the the component. An entity that has a PhysX Collider component, but does not have a have a PhysX Rigid Body component, is a *static* collider. Adding a PhysX Rigid Body component creates a *dynamic* or a *kinematic* collider. Static colliders don't move because they aren't affected by collisions or forces. Dynamic colliders have simulated movement in response to collisions and forces. Kinematic colliders aren't affected by collisions or forces, but are driven by scripted movement. The PhysX Collider component can also define a trigger area or a force region. |
| [PhysX Shape Collider](/docs/user-guide/components/reference/physx/shape-collider/) | The PhysX Shape Collider component provides the same functionality as the PhysX Collider component except that the collider is defined by an additional [Shape component](/docs/user-guide/components/reference/shape/). Like the PhysX Collider, the PhysX Shape Collider can be static, dynamic, kinematic, or define a trigger area or a force region. |
| [PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body-physics/) | Makes the collider dynamic or kinematic, and specifies properties for dynamic physics simulation behavior such as linear damping, angular damping, and maximum angular velocity. Dynamic rigid bodies respond to collisions and forces and have their movement simulated. Kinematic rigid bodies are not affected by collisions and forces. The motion of kinematic rigid bodies is driven by script. |
| [PhysX Force Region](/docs/user-guide/components/reference/physx/force-region/) | Specifies a region through a PhysX Collider or PhysX Shape Collider that applies a physical force such as wind or gravity. For each physics simulation tick, the PhysX Force Region component applies force to entities that are within the bounds of the region defined by the collider. |
| [PhysX Ball Joint](/docs/user-guide/components/reference/physx/ball-joint) | Creates a dynamic ball joint that constrains an entity to the joint with freedom to rotate around the y-axis and z-axis of the joint. |
| [PhysX Fixed Joint](/docs/user-guide/components/reference/physx/fixed-joint) | Creates a dynamic fixed joint that constrains an entity to the joint with no degree of freedom in any axis. |
| [PhysX Hinge Joint](/docs/user-guide/components/reference/physx/hinge-joint) | Creates a dynamic hinge joint that constrains an entity to the joint with freedom to rotate around the x-axis of the joint. |
| [PhysX Character Controller](/docs/user-guide/components/reference/physx/character-controller/) | Implements basic character interactions with the physical world. For example, the PhysX Character Controller can define interactions with slopes and steps, set minimum movement distance and maximum speed, and prevent characters from walking through walls or passing through terrain. |
| [PhysX Character Gameplay](/docs/user-guide/components/reference/physx/character-gameplay/) | Provides example implementations for character controller behaviors which are likely to require game-specific tweaking, such as detecting whether the character is on the ground, interacting with gravity, and behavior for interacting with kinematic bodies and other character controllers. |
| [PhysX Ragdoll](/docs/user-guide/components/reference/physx/ragdoll/) | Enables physical simulation on rigged actors of behaviors such as hit reactions. The ragdoll is represented by a hierarchy of rigid bodies connected by joints. |

### PhysX Configuration tool

You can access the PhysX Configuration tool through the **Tools** menu. You can set various global properties of PhysX simulation including the default physics material library, simulation time steps, buffer sizes for scene queries such as raycasts, default gravity, and much more. You can also define collision layers and groups, as well as set PhysX Visual Debugger settings in the PhysX configuration tool.

### PhysX scene processing

The PhysX Gem provides PhysX scene processing features so you can export meshes you create, automatically generate convex hulls, or automatically fit shapes to decomposed complex meshes, to define colliders for entities in PhysX simulations.

### Physics materials

The PhysX Gem includes a template for the `.physmaterial` asset which is a library that stores physics materials. Physics materials can be applied to colliders to define their physical properties such as dynamic friction, static friction, and density. These properties determine how the physics objects react during simulation. A global physics material library can be specified in PhysX Configuration, and specific physics libraries and materials can be specified per collider.

## Resources    

For more information, see [Simulating physics behavior with the PhysX system](/docs/user-guide/interactivity/physics/nvidia-physx/).
