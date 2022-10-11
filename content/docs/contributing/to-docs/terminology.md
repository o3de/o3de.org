---
linkTitle: Terminology
title: O3DE Documentation Terminology and Usage
description: Rules for using Open 3D Engine (O3DE) specific technical terminology.
toc: true
weight: 550
---

**Open 3D Engine (O3DE)** has many unique and specialized terms. This topic explains these terms and how documentation contributors should use them.

## General terminology guidance

* Always capitalize the proper names of tools, Gems, and components.
* Use **Bold** text for the first on-page reference of a tool, Gem, or component proper name.
* Use regular text for subsequent references to a tool, Gem, or component proper name.
* Introduce acronyms in their expanded form followed by the acronym in parentheses. For example, "console variable (cvar)".
* Use the acronym for subsequent on-page references.
* Be consistent in the use of O3DE terms. For example, use "level" rather than "scene".

## O3DE specific terms

O3DE specific terms are defined in the table below, with guidance for documentation contributors. Use these terms and styles consistently throughout the O3DE documentation.

| Term | Variations | Explanation and Usage |
|-|-|-|
| actor | *\<none\>* | A specialized type of entity that has an **Actor** component. Actors can use key-frame animation and/or are capable of receiving input. Do not capitalize this term when referring to actor entity types in general. When referring to the named component, capitalize the term "Actor" and use bold text for the first on-page reference. |
| AMD TressFX | *\<none\>* | A set of tools and an SDK for creating simulated realistic hair and fur. AMD TressFX is a product name and trademark. Each letter of the word "AMD" must be capitalized, and the letters "T", "F", and "X" in "TressFX" must be capitalized. Use the complete term "AMD TressFX" when referring to the product and related technology provided by AMD and the GPUOpen project. |
| **Animation Editor** | *\<none\>* | A tool for creating **Anim Graphs**, specialized collision, and physics simulations for actor entities. Always capitalize both "Animation" and "Editor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Asset Browser** | *\<none\>* | A tool for browsing O3DE assets in directories that are monitored by **Asset Processor**. Always capitalize both "Asset" and "Browser", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Asset Editor** | *\<none\>* | A tool for creating O3DE specific assets such as `.physicsmaterials` and `.inputbingings`. Always capitalize both "Asset" and "Editor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Asset Processor** | *\<none\>* | A tool that automatically monitors and converts source assets, from various formats, to run-time assets. Always capitalize both "Asset" and "Processor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Anim Graph** | *\<none\>* | An interactive graph of animated behavior for actors in the **Animation Editor**. This is a compound of "animation" and "graph". Always capitalize "Anim" and "Graph", as it is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| animation graph | anim graph| The product asset (`.animgraph`) of the Anim Graph tool; a flow graph that switches and blends animation states based on inputs and other events. Do not capitalize the terms "animation graph" or "anim graph" in this context. |
| **Atom Renderer** | Atom | O3DE's renderer. Always capitalize both "Atom" and "Renderer" as it is a proper noun. Use "**Atom Renderer**" in bold text for the first on-page reference. Use "Atom" in regular text for subsequent references. |
| canvas | | A container and virtual surface for the layout of scripted logic, components, or UI widgets. Canvases are used by **Script Canvas**, **Landscape Canvas**, **UI Editor**, and many other tools in O3DE. Because this is an overloaded term, you should reference canvases by their type or extension when referring to files or assets. Only use the generic term "canvas" in tutorials where the context is obvious, in reference to the virtual canvas surface on which nodes are placed. Don’t capitalize the term "canvas" in this context. |
| component | *\<none\>* | An element that can be added to an entity to provide specific functionality. Don't capitalize the term "component". Limit use of the term "component" to the context of the Component Entity System. |
| Component Entity System | CES | A model for creating complex objects with behaviors wherein components that provide specific functionality are added to reusable entities. Always capitalize the words "Component", "Entity", and "System", and each letter in the acronym "CES", when referring to O3DE's implementation of this concept. Use "**Component Entity System (CES)**" in bold for the first on-page reference. Use "CES" in regular text for subsequent references. |
| **Console** | *\<none\>* | A tool for setting console variables, entering commands, and executing scripts. Always capitalize "Console", when referring to the O3DE Editor Console, as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Console Variables** | *\<none\>* | A tool for globally setting and managing console variables (cvars). Always capitalize both "Console" and "Variables", when referring to the tool by name. It's a proper noun. Use bold text for the first on-page reference. Do not capitalize the term when talking about "console variables" in general. |
| console variable | cvar | A general term for variables that set states for the O3DE environment and run-time executables. Console variables (cvars) can specify render settings, set paths, enable debug output, and more. Do not capitalize this term. Use this acronym in lower-case, regular text, when referring to console variables in general (cvars), or when referring to a specific console variable (the `sys_maxfps` cvar). |
| **Event Bus** | EBus | O3DE's system for dispatching and handling messages between components and systems. Always capitalize both "Event" and "Bus". Always capitalize the "E" and "B" in EBus. Use "**Event Bus (Ebus)**" in bold for the first on-page reference. Use "EBus" in regular text for subsequent references. Use "EBuses" for pluralization. |
| entity | *\<none\>* | A collection of components representing some functional object. Do not capitalize this term. Limit use of the term "entity" to the context of the Component Entity System. |
| **Entity Inspector** | *\<none\>* | A tool for editing the components and properties of an entity. Always capitalize both "Entity" and "Inspector", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Entity Outliner** | *\<none\>* | A tool for organizing and locating the entities contained in a level. Always capitalize both "Entity" and "Outliner", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| Gem | *\<none\>* |  A package that contains source code, assets, or both, that are specific to O3DE. "Gem" is a proper noun and must be capitalized. |
| host platform | *\<none\>* | The platform on which project executables are compiled. Use this term when referring to user development platforms in general, where possible, rather than referring to specific operating systems. For example, in a Windows environment, your host platform uses Visual Studio for projects and the x64 toolchain to build O3DE. |
| level | *\<none\>* | A container of entities, scripts, assets, and more, that represents a streamable, playable, section of a project. A "level" does not necessarily contain terrain. Do not capitalize this term. Contributors may be inclined to use the term "scene" interchangeably with "level" based on experience with other content creation applications. Use only the term "level" for consistency. |
| **Level Inspector** | *\<none\>* | A tool for editing the components and properties of a level. Always capitalize both "Level" and "Inspector", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Lua Editor** | *\<none\>* | An editor for Lua scripts. Always capitalize both "Lua" and "Editor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference.  |
| **Material Editor** | *\<none\>* | A tool for creating materials and setting their properties. Always capitalize both "Material" and "Editor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| Module | *\<none\>* | The code component of a Gem, in reference to either the final compiled library or the `Az::Module` class which defines the entry point to this library. Where there may be confusion, use Module or "Module library" to refer to the library artifact and "Module instance" or "Module implementation" to refer to the class. "Module" is a proper noun in the context of the Gem system and must be capitalized. |
| Node | *\<none\>* | A visual representation of a script element such as a variable, constant, or API function. Nodes are placed in a canvas and wired into a network to create scripted functionality for entities. Capitalize this term when referring to a specific node or its implementation. When you reference the concept of nodes in general, or write about nodes at a higher level of abstraction, use the lower-case term "node". |
| NVIDIA Blast | *\<none\>* | A set of tools and an SDK for creating simulated destruction. NVIDIA Blast is a product name and trademark. Each letter of the word "NVIDIA" must be capitalized, and the word "Blast" must be capitalized. Use the complete term "NVIDIA Blast" when referring to the product and related technology provided by NVIDIA. |
| NVIDIA Cloth | *\<none\>* | A set of tools and an SDK for creating simulated fabric and cloth. NVIDIA Cloth is a product name and trademark. Each letter of the word "NVIDIA" must be capitalized, and the word "Cloth" must be capitalized. Use the complete term "NVIDIA Cloth" when referring to the product and related technology provided by NVIDIA. |
| NVIDIA PhysX | *\<none\>* | A set of tools and an SDK for creating physics simulations. NVIDIA PhysX is a product name and trademark. Each letter of the word "NVIDIA" must be capitalized, and the letter "P" and the letter "X" in the word "PhysX" must be capitalized. Use the complete term "NVIDIA PhysX" when referring to the product and related technology provided by NVIDIA. |
| **O3DE CLI** | `o3de` Python script | A Python script for project configuration using the command line interface (CLI). Always capitalize "O3DE" and "CLI", as these are acronyms. Use either "**O3DE CLI**" in bold, or "**O3DE CLI** (`o3de`)" in bold and with the name of the Python script formatted as inline code for the first on-page reference. If you use the latter, use "`o3de` Python script" for subsequent references. Otherwise, use "O3DE CLI" without bold. |
| **O3DE Editor** | Editor | O3DE's content creation environment. Always capitalize both "O3DE" and "Editor", as this is a tool name and a proper noun. Use "**O3DE Editor**" in bold for the first on-page reference. Use "Editor" in regular text for subsequent references. |
| **Object Tree** | *\<none\>* | A viewer of active UI objects. Always capitalize both "Object" and "Tree", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| Open 3D Engine | O3DE | Always capitalize the "O", the "D", and the "E". Use "Open 3D Engine (O3DE)" in bold for the first on-page reference. Use "O3DE" in regular text for subsequent references.|
| project | *\<none\>* | A named container and directory hierarchy for all the files, preferences, assets, levels, scripts, code, and so on, that will be compiled into a run-time executable for a target platform, or packaged as a Gem. Do not capitalize this term. Use the term "project" rather than "game". |
| **Python Console** | *\<none\>* | A tool for running Python scripts in O3DE Editor. Always capitalize both "Python" and "Console", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Python Scripts** | *\<none\>* | A browser application for Python script files. Always capitalize both "Python" and "Scripts" when referring to the tool, as this is the tool name, and a proper noun. Use bold text for the first on-page reference. When referring to Python script files in general, use "Python scripts" - do not bold "Python" and neither capitalize nor bold "scripts". |
| prefab | *\<none\>* | A collection of configured entities that is stored in a reusable asset. Prefabs use the ".prefab" file extension. Do not capitalize this term. |
| **Script Canvas Editor** | *\<none\>* | A general purpose, visual scripting tool. When the tool is referenced, always capitalize both "Script Canvas" and "Editor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| spawnable | *\<none\>* | The run-time representation of a prefab, which contains only run-time components. Spawnables use the ".spawnable" file extension. Do not capitalize this term.  |
| target platform | *\<none\>* | The platform on which compiled project executables are run. Prefer this term over specific platforms such as Windows PCs or mobile devices. For example, if your O3DE project is being built for Linux - even in a cross-compiler environment - it will use the Clang compiler tools to generate elf_x64 binaries. |
| **Track View** | *\<none\>* | O3DE's cinematics editor. Always capitalize both "Track" and "View", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| viewport | *\<none\>* | The level view in O3DE Editor. |
| **UI Editor** | *\<none\>* | A tool for constructing run-time user interfaces. Always capitalize both "UI" and "Editor", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |
| **Viewport Camera Selector** | *\<none\>* | A tool for selecting the active Perspective camera. Always capitalize "Viewport", "Camera", and "Selector", as this is a tool name, and a proper noun. Use bold text for the first on-page reference. |

## Standard domain and industry terminology

Use standard and common domain and industry terminology. If there's ambiguity, then use context to make sure the reader understands the meaning.


## Terms to avoid and their alternatives

* **master** -- Use "main", "controller", or another term that indicates the object's primary role or behavior instead.
* **slave** -- use "subordinate", "secondary", "ancillary", or another term that indicates the object's subordinate behavior instead.
* **whitelist** -- Use "allow list", "approved list", "include list" or other term/phrase that indicates the object's inclusive scope.
* **blacklist** -- Use "allow list", "approved list", "exclude list" or other term/phrase that indicates the object's exclusive scope.
