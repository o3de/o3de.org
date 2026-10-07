---
title: "System Component"
linkTitle: "System Component"
description: "Generate a global system component that activates automatically."
weight: 40
---

An engine-level system component that lives on the system entity rather than a game entity. Use it for global services that run outside of entity context: input managers, network systems, resource registries, and similar singletons. It registers itself to activate automatically at startup, in both the runtime and the Editor.

{{< image-width src="/images/user-guide/editor/class-wizard/templates/system-template-screen.png" width="450" alt="The wizard with System Component selected" >}}

**What you'll fill in:**

| Field | What it does |
|---|---|
| **Add Bus Interface** | On by default. Generates a companion EBus interface header so other components can talk to this one. |
| **Add Editor Comp.** | Only shown if your gem has an Editor module. Generates a separate `EditorComponent` wrapper variant of this system component. |

Fill in a **Component Name**. Pick the **Gem** you're adding it to. Then select **Create**. This component is a system component. It exposes global functionality through its reflected EBus. It doesn't appear in any **Add Component** menu.

For the full generated file list, process commands, and `template.json` schema, see [System Component](/docs/engine-dev/tools/class-wizard/template-descriptor/templates/system-component/) in the Developer Guide.
