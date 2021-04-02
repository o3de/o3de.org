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

| Term       | Variations | Explanation                                    |
|------------|------------|------------------------------------------------|
| Open 3D Engine | Abbreviated: O3DE | Always capitalize the "O", the "D", and the "E". Use "Open 3D Engine (O3DE)" for the first reference in a topic, and then use the abbreviated version as you see fit.|
| Animation Editor | _\<none\>_ | Always capitalize both "Animation" and "Editor", as this is a proper noun. |
| AnimGraph | _\<none\>_ | An interactive graph of animation flows for actors in the Animation Editor, as implemented in the Open 3D Engine Editor. This is a portmanteau of "animation" and "graph". It is a proper noun as it is an implementation specific to O3DE, and the "A" and the "G" must be capitalized. |
| Canvas | | Definition: O3DE's visual scripting environment where Nodes are placed and connected to define scripted logic. Always capitalize this term when using it in this specific context. |
| Gem | _\<none\>_ |  Encapsulated O3DE-specific functionality or assets, that is built and integrated into Open 3D Engine. "Gem" is a proper noun and must be capitalized. |
| Node |  _\<none\>_ | A self-contained element of a Script Canvas script. Capitalize this term when specifically referring to a Script Canvas Node or its implementation. If you are referring to the concept of nodes in general, or discussing Script Canvas Nodes at a higher level of abstraction, use the lower-case term "node"/"nodes". |
| prefab | _\<none\>_ | A collection of configured entities that is stored as a single unit in a reusable asset. Prefabs use the ".prefab" file extension. Do not capitalize this term (outside of when it starts an English language sentence) when using it. |
| spawnable | _\<none\>_ | The run-time representation of a prefab, and contains only run-time components. Spawnables use the ".spawnable" file extension. Do not capitalize this term (outside of when it starts an English language sentence) when using it.  |

### Terms to avoid and their replacements

* **master** -- Use "main", "controller", or another term that indicates the object's primary role or behavior instead.
* **slave** -- use "subordinate", "secondary", "ancillary", or another term that indicates the object's subordinate behavior instead.
* **whitelist** -- Use "allow list", "approved list", "include list" or other term/phrase that indicates the object's inclusive scope.
* **blacklist** -- Use "allow list", "approved list", "exclude list" or other term/phrase that indicates the object's exclusive scope.
