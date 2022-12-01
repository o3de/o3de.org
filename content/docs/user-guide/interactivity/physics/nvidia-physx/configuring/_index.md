---
linkTitle: PhysX Configuration
title: Configuring the PhysX System
description: 'Configure settings for the PhysX system in Open 3D Engine. '
weight: 100
---

The PhysX system can be configured for each project. With the **PhysX Configuration** tool, you can do the following:

* Set the global frequency of PhysX simulations.
* Set the global PhysX gravity constant.
* Enable continuous collision detection (CCD) to improve collision results.
* Set the minimum bounce threshold for collisions.
* Configure debug draw visualization properties.
* Set tags for global and local wind forces.
* Create collision layers and groups.
* Configure the visual debugger.

In O3DE Editor, from the **Tools** menu, choose **PhysX Configuration** to open the PhysX Configuration tool. Changes made to the PhysX configuration settings are automatically saved in your project's `<project_name>\Registry\physxsystemconfiguration.setreg` file. If you are using source control, be sure to include this file.

The topics in this section provide information on the settings available in the PhysX Configuration tool.

| Topic | Description |
| - | - |
| [Global Configuration](configuration-global) | Learn about global PhysX settings including simulation frequency, collision settings, debug visualization options, and wind tags. |
| [Collision Layers](configuration-collision-layers) | Create collision layers to organize PhysX entities into categories. |
| [Collision Groups](configuration-collision-groups) | Create collision groups to define which collision layers interact with each other. |
| [Create Layers and Groups in Code](configuration-collision-layer-and-group-programming) | Create and access collision groups and layers programmatically. |
| [Debugger Configuration](configuration-debugger) | Configure the PhysX Visual Debugger (PVD). |
| [PhysX World Programming Notes](configuration-physx-world-programming-notes) | Use *PhysX worlds* for simultaneous discrete simulations that create the illusion of a single large simulation. |
