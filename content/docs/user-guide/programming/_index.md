---
description: Learn about the core systems of Open 3D Engine (O3DE) and how you can extend those systems by programming.
title: Open 3D Engine Programming Guide
linktitle: Programming
weight: 600
---

The *engine core* encompasses the source code, systems, and modules that underlie **Open 3D Engine (O3DE)** and its tools. All of these tools---**O3DE Editor**, **Asset Processor**, **Script Canvas**, and so on---work together to build an interactive 3D experience that uses modern rendering techniques and gameplay logic. Using these tools, you can take your design from an empty scene to a fully polished project that you can deploy and share. In this section, you'll gain a deeper understanding of each part of the engine core and learn how you can expand O3DE's toolkit.


## Prerequisites

* C++17
* Python 3

The O3DE source code is written in C++, with several supporting tools written in Python. We recommend that you have fundamental knowledge of either C++ or Python programming to extend O3DE.


## Start here

### Core modules

Start by learning about the core modules that drive O3DE and its extended features. The core modules are the entry points to all of the functionality in O3DE. They are located in your engine's directory at `Code\Framework`.

| Module | Description |
| - | - | 
| [`AzCore`](https://o3de.org/docs/api/frameworks/azcore/) | Provides math, serialization, memory management, eventing and pub/sub interfaces, as well as the ability to load plugin modules. It provides the component-entity model and contains an implementation of C++ STL that includes memory alignment aware containers and other guarantees. |
| [`AzFramework`](https://o3de.org/docs/api/frameworks/azframework/) | Provides higher level structures. It contains some additional code that are common to most O3DE applications. |
| [`AzGameFramework`](https://o3de.org/docs/api/frameworks/azgameframework/) | Contains core functions that are only used by runtime applications. It provides loop management, and a bootstrap sequence that's specific to runtime applications. |
| [`AzToolsFramework`](https://o3de.org/docs/api/frameworks/aztoolsframework/) | Contains core functions that are only used by tools. It provides UI components such as object pickers, property editors, source control integrations, and a bootstrap sequence that's specific to tools. |
| [`AzQtComponents`](https://o3de.org/docs/api/frameworks/azqtcomponents/) | Contains common UI widgets (for example scroll bars, buttons, dialogs, and so on) that provide a consistent look and feel between tool applications. |

The following image illustrates the dependency graph for the core modules of O3DE.

![O3DE core module dependency graph](/images/user-guide/programming/o3de-architecture-dependency-graph.svg)

Examples of high-level products that use these frameworks are:

* **Project runtimes**: End products created by developers using O3DE, such as games, dedicated server runtimes, and world simulations.

* **CLI tools**: Tools invoked from the command-line interface (CLI), such as **O3DE CLI**, **AZSL Compiler**, and **Asset Batch Processor**.

* **GUI tools**: Tools with a graphical user experience are used for developing O3DE projects, such as **O3DE Editor**, **Asset Processor**, and **Material Editor**.


### O3DE directories

If you're interested in developing O3DE, creating components and Gems, or programming in your project, it's helpful to be familiar with the following subdirectories in O3DE's source:

  * `cmake`: Contains configuration, download, and build scripts for O3DE.

  * `Code`: Contains the C++ code and headers that are used to build O3DE and provide its APIs. APIs are organized by libraries, each of which consists of a well-defined feature set. Library headers offer virtual interfaces that you can provide implementations of to connect your code to the relevant O3DE system or feature.

  * `Code/Framework`: Contains all of the source code and headers used by O3DE's core modules.

  * `Gems`: Contains the source and build files for Gems that come with the engine. Each Gem has its own subdirectory, and a Gem may contain other Gems. For example, the Atom Gem contains several Gems providing various tools, libraries, interfaces, and utilities for Atom Renderer.

  * `Templates`: Contains the default templates for Gems and projects.

## Learning paths

Depending on the part of the engine that you want to develop, there are different learning tracks that you can follow. While each learning path may be unique to your case, the following topics can help get you started on some common development tasks:


#### Develop a component
  
  - [Component Entity System (CES)](/docs/welcome-guide/key-concepts/#the-component-entity-system)
  
  - [Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/)
  
  - [Programmer's Guide to Component Development](/docs/user-guide/programming/components/)


#### Develop a Gem
  
  - [Gem Module system](/docs/user-guide/programming/gems/overview/)

  - [Create an O3DE Gem](/docs/user-guide/programming/gems/creating/)


#### Develop Atom Renderer features
  
  - [Atom Renderer Developer Guide](/docs/atom-guide/dev-guide/)


## Related topics

| Topic | Description |
| --- | --- |
| [O3DE C++ Coding Standards](https://github.com/o3de/sig-core/blob/main/governance/Coding-Standards-and-Style-Guide.md) | If you're programming features to contribute to [o3de repository](https://{{< links/o3de-source >}}), follow the coding standards used throughout O3DE's C++ codebase. |
