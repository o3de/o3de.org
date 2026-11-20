---
title: "Basic Component"
linkTitle: "Basic Component"
description: "Generate a standard O3DE game component."
weight: 20
---

The standard, general-purpose O3DE game component. Use it for most gameplay components: anything that attaches to a regular game entity.

{{< image-width src="/images/user-guide/editor/class-wizard/templates/basic-template-screen.png" width="450" alt="The wizard with Basic Component selected" >}}

**What you'll fill in:**

| Field | What it does |
|---|---|
| **Add Bus Interface** | On by default. Generates a companion EBus interface header so other components can talk to this one. Turn it off if this component won't need to be called from elsewhere. |
| **Add Editor Comp.** | Only shown if your gem has an Editor module. Generates an `EditorComponent` wrapper so this component shows up and can be edited in the Editor's Entity Inspector. |

Fill in a **Component Name**. Pick the **Gem** you're adding it to. Then select **Create**. This component appears in the **Add Component** menu of the Entity Inspector.

For the full generated file list, process commands, and `template.json` schema, see [Basic Component](/docs/engine-dev/tools/class-wizard/template-descriptor/templates/basic-component/) in the Developer Guide.
