---
linktitle: Introduction
title: Introduction
description: Developer documentation that introduces the terrain system.
weight: 100
---

![Example terrain image.](/images/user-guide/visualization/environments/terrain/terrain-example.png)

## What is a "terrain system"?

A "terrain system" is a system that defines the geometry, color, and surface types for a ground surface. More specifically, a terrain system contains:

* Height, color, and surface data mapped to regions of the world
* Authoring tools and workflows that support creating / modifying data and mapping it to regions
* Queryable data that can be used by both simulation and rendering
* Specialized rendering as needed to support efficient, high-quality terrain visualization across the view distance
* One or more physics surfaces that can provide a "physical" simulation of the terrain in the virtual world

## Design tenets

The O3DE terrain system was built with specific design tenets in mind. Enhancements and changes to the system should continue to use these tenets as guiding principles:

| | |
| - | - |
| **Enjoyable** | Content creators and engineers should be delighted to use the terrain system and excited by the power and flexibility the tools provide.|
| **Familiar** | The design should be familiar to content creators that use external terrain authoring tools and should follow similar design patterns to other O3DE workflows.|
| **Fast** | Iteration should be rapid and responsive, and the runtime should be optimized to a production-ready state.|
| **Reusable** | Every aspect of the system should be optional, reusable, and replaceable, and the system should reuse existing functionality in O3DE as much as possible. Content should also be authorable as optional, reusable, and replaceable pieces.|
| **Scalable** | The system should scale to allow for worlds of arbitrary size and density without enforcing any hard limits.|
| **Dynamic** | Portions of the terrain should be dynamically loadable, unloadable, and modifiable at runtime.|

Note that **Simplicity** is _not_ a design tenet.  While we should always strive for simplicity, we also acknowledge that we're accepting an initial learning curve for the sake of the other tenets.

## Design goals

The terrain system adheres to the following design goals:

| | |
| - | - |
| **Workflow parallelization** | Multiple content creators should be able to work on different terrain locations or different aspects of the terrain content at the same time.|
| **System / workflow reuse** | The terrain system should leverage the existing Shape components, Surface Data components, Gradient Signal components, Landscape Canvas system, and the entity/component authoring workflows.|
| **Data flow transparency** | Source data should exist as external assets in common editable formats that hot-reload when changed. The output data used in the game should always be in sync with the inputs and traceable back to them.|
| **Non-destructive editing** | Terrain data should be modifiable either through layered changes or through direct data changes that don't require the original source data to change. |
| **Round-trip data flows** | It should be easy to export terrain data changes to external content tools, modify the data further, and re-import the data. |
| **Reusable data** | The same terrain data should be reusable for multiple different locations in the world. |
