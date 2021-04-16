---
linktitle: "Terminology"
title: "O3DE Documentation Terminology"
description: ' Rules for using Open 3D Engine (O3DE) specific technical terminology. '
date: 2021-03-02T00:23:51-05:00
toc: true
weight: 999
---

{{< preview-new >}}

## Open 3D Engine (O3DE) Terminology

The following terms are specific to O3DE and are defined in the table below. Please use these consistently in your code and documentation.

| Term | Variations | Explanation |
|-|-|-|
| **Animation Editor** | *\<none\>* | Always capitalize both "Animation" and "Editor" and bold the text, as this is a tool name, and a proper noun. |
| **Asset Browser** | *\<none\>* | Always capitalize both "Asset" and "Browser" and bold the text, as this is a tool name, and a proper noun. |
| **Asset Editor** | *\<none\>* | Always capitalize both "Asset" and "Editor" and bold the text, as this is a tool name, and a proper noun. |
| **Anim Graph** | *\<none\>* | An interactive graph of animation flows for actors in the **Animation Editor**. This is a compound of "animation" and "graph". Always capitalize the "A" and the "G" and bold the text, as it is a tool name, and a proper noun. |
| Atom | Atom Renderer | Always capitalize both "Atom" and "Renderer" as it is a proper noun. |
| canvas | | A container and virtual surface for the layout of scripted logic or components. Canvases are used by **Script Canvas**, **Landscape Canvas**, **UI Editor**, and many other tools in O3DE. Because this is an overloaded term, you should reference canvases by their type or extension when referring to files or assets. Only use the generic term "canvas" in tutorials where the context is obvious, in reference to the virtual canvas surface on which nodes are placed. |
| component | *\<none\>* | An element that can be added to an entity to provide specific functionality, Don't capitalize the word component. Limit use of the word "component" to the context of the Component Entity System. |
| Component Entity System | CES | A model for creating complex objects with behaviors wherein components that provide specific functionality are added to reusable *entities*. Always capitalize the words "Component", "Entity", and "System", and each letter in the acronym "CES", when referring to O3DE's implementation of this concept. |
| **Console** | *\<none\>* | Always capitalize "Console" and bold the text, when referring to the O3DE Editor Console, as this is a tool name, and a proper noun. |
| **Console Variables** | *\<none\>* | Always capitalize both "Console" and "Variables" and bold the text, when referring to the tool by name. It's a proper noun. When talking about console variables in general, do not capitalize. The acronym "cvar" can also be used when speaking about console variables in general. |
| cvar | *\<none\>* | An acronym for "console variable". Do not capitalize. |
| entity | *\<none\>* | A collection of components representing some functional object. Limit use of the word "entity" to the context of the Component Entity System. |
| **Entity Inspector** | *\<none\>* | Always capitalize both "Entity" and "Inspector" and bold the text, as this is a tool name, and a proper noun. |
| **Entity Outliner** | *\<none\>* | Always capitalize both "Entity" and "Outliner" and bold the text, as this is a tool name, and a proper noun. |
| Gem | *\<none\>* |  A package that contains O3DE-specific source code, assets, or both, that can be built and integrated into Open 3D Engine. "Gem" is a proper noun and must be capitalized. |
| host platform | *\<none\>* | The platform on which project executables are compiled. Use this term when referring to user development platforms in general, where possible, rather than referring to specific operating systems. |
| **Level Inspector** | *\<none\>* | Always capitalize both "Level" and "Inspector" and bold the text, as this is a tool name, and a proper noun. |
| **Lua Editor** | *\<none\>* | Always capitalize both "Lua" and "Editor" and bold the text, as this is a tool name, and a proper noun. |
| **Material Editor** | *\<none\>* | Always capitalize both "Material" and "Editor" and bold the text, as this is a tool name, and a proper noun. |
| Node | *\<none\>* | An visual representation of a script element such as a variable, constant, or API function. Nodes are placed in a canvas and wired into a network to create scripted functionality for entities. Capitalize this term when referring a specific node or its implementation. When you reference the concept of nodes in general, or write about nodes at a higher level of abstraction, use the lower-case term "node". |
| NVIDIA Blast | *\<none\>* | NVIDIA Blast is a product name and trademark. Each letter of the word "NVIDIA" must be capitalized, and the word "Blast" must be capitalized. Use this term when referring to the product and related technology provided by NVIDIA. |
| NVIDIA Cloth | *\<none\>* | NVIDIA Cloth is a product name and trademark. Each letter of the word "NVIDIA" must be capitalized, and the word "Cloth" must be capitalized. Use this term when referring to the product and related technology provided by NVIDIA. |
| NVIDIA PhysX | *\<none\>* | NVIDIA PhysX is a product name and trademark. Each letter of the word "NVIDIA" must be capitalized, and the letter "P" and the letter "X" in the word "PhysX" must be capitalized. Use this term when referring to the product and related technology provided by NVIDIA. |
| **O3DE Editor** | **Editor** | Always capitalize both "O3DE" and "Editor" and bold the text when referring to the application, as this is a proper noun.
| Open 3D Engine | Abbreviated: O3DE | Always capitalize the "O", the "D", and the "E". Use "Open 3D Engine (O3DE)" for the first reference in a topic, and then use the abbreviated version as you see fit.|
| **Python Console** | *\<none\>* | Always capitalize both "Python" and "Console" and bold the text, as this is a tool name, and a proper noun. |
| **Python Scripts** | *\<none\>* | A browser application for Python script files in **O3DE Editor**. Always capitalize both "Python" and "Scripts" and bold the text when referring to the tool, as this is the tool name, and a proper noun. When referring to Python script files in general, do not bold "Python" and do not capitalize and bold "scripts". |
| **Object Tree** | *\<none\>* | Always capitalize both "Object" and "Tree" and bold the text, as this is a tool name, and a proper noun. |
| prefab | *\<none\>* | A collection of configured entities that is stored in a reusable asset. Prefabs use the ".prefab" file extension. Do not capitalize this term. |
| **Slice Relationship View** | *\<none\>* | Always capitalize "Slice", "Relationship", and "View" and bold the text, as this is a tool name, and a proper noun. |
| spawnable | *\<none\>* | The run-time representation of a prefab, and contains only run-time components. Spawnables use the ".spawnable" file extension. Do not capitalize this term.  |
| target platform | *\<none\>* | The platform on which compiled project executables are run. Prefer this term rather than referring to specific platforms such as Windows PCs or mobile devices. |
| **Track View** | *\<none\>* | Always capitalize both "Track" and "View" and bold the text, as this is a tool name, and a proper noun. |
| TressFX | *\<none\>* | TressFX is a product name and a proper noun. The letters "T", "F", and "X" in the word "TressFX" must be capitalized. Use this term when referring to the product and related technology provided by AMD. |
| **UI Editor** | *\<none\>* | Always capitalize both "UI" and "Editor" and bold the text, as this is a tool name, and a proper noun. |
| **Viewport Camera Selector** | *\<none\>* | Always capitalize "Viewport", "Camera", and "Selector" and bold the text, as this is a tool name, and a proper noun. |

### Terms to avoid and their replacements

* **master** -- Use "main", "controller", or another term that indicates the object's primary role or behavior instead.
* **slave** -- use "subordinate", "secondary", "ancillary", or another term that indicates the object's subordinate behavior instead.
* **whitelist** -- Use "allow list", "approved list", "include list" or other term/phrase that indicates the object's inclusive scope.
* **blacklist** -- Use "allow list", "approved list", "exclude list" or other term/phrase that indicates the object's exclusive scope.
