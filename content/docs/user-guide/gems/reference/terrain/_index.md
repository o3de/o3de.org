---
linkTitle: Terrain
title: Terrain Gem
description: Introduction to the Open 3D Engine (O3DE) Terrain Gem.
toc: true
---


The Terrain Gem is an experimental terrain system.  Use the terrain system to create, manipulate, render, and simulate a terrain surface.

## Features

The Terrain Gem has the following key features:

* Maps height, color, and surface data to regions of the world.
* Provides gradient-based and shape-based authoring tools and workflows to create and manipulate the terrain data.
* Exposes a queryable API that is usable by both simulation and rendering.
* Renders an efficient, high-quality terrain visualization across the view distance.
* Integrates with physics to provide a "physical" simulation of the terrain in the virtual world.

## Enabling the Terrain Gem

To enable the Terrain Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the Terrain Gem to your project.
2. Build your project using Project Manager, Visual Studio, or CMake.

## Components

| Component | Description | 
| - | - |
| [Terrain Physics Collider](/docs/user-guide/gems/reference/terrain/terrain_physics_collider.md) | Provides terrain data to a physics collider in the form of a heightfield and surface to material mapping. |