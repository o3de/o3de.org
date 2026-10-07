---
title: "Templates"
linkTitle: "Templates"
description: "How the wizard processes a template, and the index of every built-in template that implements the Template Descriptor Format."
weight: 300
---

{{< note >}}
This page assumes you've read the [Template Descriptor Format](/docs/engine-dev/tools/class-wizard/template-descriptor/). It shows how that schema is applied across every built-in template -- then links to a full breakdown of each one.
{{< /note >}}

Each template defines a set of source files to generate, variables to collect from the user, and commands to run for build integration.

---

## How Templates Work

A template is a directory containing a `template.json` descriptor and a `Template/` subdirectory with source file scaffolds. When the wizard processes a template, it does the following:

1. **Reads the descriptor** to determine what input variables to collect and what commands to run.
2. **Collects user input** via the GUI or CLI flags, resolving all `${Variable}` tokens.
3. **Stages source files** from the `Template/` subdirectory, applying variable substitution to file names and content.
4. **Evaluates conditions** to include or exclude optional files (e.g., interface headers, editor adapters).
5. **Runs cleanup** when conditional files are excluded -- scrubbing references like `#include` lines and EBus wiring from remaining files.
6. **Executes commands** from the `process_commands` array to integrate the generated files into the build system.

### Template Directory Structure

```
Templates/
  MyTemplate/
    template.json          -- Descriptor file (must contain a "class_wizard" block)
    Template/              -- Source files for o3de create-from-template
      Source/
        ${Name}MyType.cpp
        ${Name}MyType.h
      Include/
        ${GemName}/
          ${Name}Interface.h
    preview.png            -- Optional icon for GUI display
```

### Template Discovery

The `WizardTemplateScanner` scans for `template.json` files in three locations:

| Priority | Source | Path Pattern |
|---|---|---|
| 1 (highest) | Engine | `<engine_path>/Templates/*/template.json` |
| 2 | Project | `<project_path>/Templates/*/template.json` |
| 3 | Gems | `<gem_path>/Templates/*/template.json` |

Only templates containing a `class_wizard` block are recognized. Templates are deduplicated by resolved directory path and sorted alphabetically by display name.

Gem paths are resolved via the O3DE manifest API.

### Creating Custom Templates

You can create custom templates by placing a properly structured template directory in any of the three discovery locations. A minimal template needs:

1. A `Templates/<YourTemplate>/template.json` with a `class_wizard` block
2. A `Templates/<YourTemplate>/Template/` directory with your source files
3. `${Variable}` tokens in file names and content for substitution

See the [Template Descriptor Format](../) for the full JSON schema.

---

## Template Quick Reference

| Display Name | CLI `--template` Value | Source | Suffix | Key Features |
|---|---|---|---|---|
| [Basic Component](basic-component/) | `default_component` | Engine | `Component` | Optional interface, optional editor adapter |
| [Level Component](level-component/) | `level_component` | Engine | `LevelComponent` | Level entity attachment, optional interface/editor adapter |
| [System Component](system-component/) | `system_component` | Engine | `SystemComponent` | System entity, registered in both runtime and editor modules |
| [LyShine Component](lyshine-component/) | `lyshine_component` | Engine | `Component` | UI canvas integration, `Gem::LyShine` dependency |
| [Data Asset](data-asset/) (also known as Generic Asset) | `data_asset` | Engine | `Asset` | `GenericAssetHandler` registration, dedicated system component |
| [Attimage](attimage/) | `attimage` | Engine | *(none)* | Attachment image data file, no CMake/module registration |

Each row links to a full breakdown of that template's input variables, generated files, and commands. All of them follow the schema described in the [Template Descriptor Format](/docs/engine-dev/tools/class-wizard/template-descriptor/), including its [Variables](/docs/engine-dev/tools/class-wizard/template-descriptor/#variables) and [Cleanup Hints](/docs/engine-dev/tools/class-wizard/template-descriptor/#cleanup-hints) sections.
