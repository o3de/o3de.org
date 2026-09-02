---
title: "Templates"
linkTitle: "Templates"
description: "How the Class Creation Wizard template system works, and an index of all available templates."
weight: 300
---

Templates are the core of the Class Creation Wizard. Each template defines a set of source files to generate, variables to collect from the user, and commands to run for build integration. This page explains how the template system works and lists every available template.

---

## How Templates Work

A template is a directory containing a `template.json` descriptor and a `Template/` subdirectory with source file scaffolds. When the wizard processes a template, it:

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

See the [Template Descriptor Format](../TemplateDescriptor/) for the full JSON schema.

---

## Template Quick Reference

| Display Name | CLI `--template` Value | Source | Suffix | Key Features |
|---|---|---|---|---|
| [Basic Component](basic-component/) | `default_component` | Engine | `Component` | Optional interface, optional editor adapter |
| [Level Component](level-component/) | `level_component` | Engine | `Component` | Level entity attachment |
| [System Component](system-component/) | `system_component` | Engine | `Component` | System entity, auto-activation |
| [LyShine Component](lyshine-component/) | `lyshine_component` | Engine | `Component` | UI canvas integration |
| [Data Asset](data-asset/) | `data_asset` | Engine | `Asset` | Asset handler, `.setreg` config, custom extension |
| [Attimage](attimage/) | `attimage` | Engine | `Attimage` | Attachment image for rendering |

---

## Variable Substitution

All templates share a common variable substitution system. Variables are substituted in:

- **File paths** -- both source and destination
- **File content** -- when `isTemplated` is true in `copyFiles`
- **Command arguments** -- all string values in `process_commands` args

### Built-in Variables

These are always available regardless of template:

| Variable | Source | Example |
|---|---|---|
| `${Name}` | `--component-name` or GUI name field | `PlayerHealth` |
| `${GemName}` | Selected gem namespace | `GS_Interaction` |
| `${ComponentSuffix}` | Template's `component_suffix` field | `Component` |
| `${SanitizedCppName}` | C++-safe version of `${Name}` | `PlayerHealth` |

### User Variables

Any `var_name` defined in a template's `input_vars` is available as `${var_name}` in file paths, content, and command arguments.

---

## Conditional Files and Cleanup

Templates can mark files as conditional using the `condition` field in `copyFiles`. When a condition evaluates to false, the file is excluded and optional cleanup is performed.

| Cleanup Hint | What Gets Removed |
|---|---|
| `"interface"` | `#include` for the header, `public BusName::Handler` entries, `BusConnect()`/`BusDisconnect()` calls |
| `"editor"` | `#include` lines referencing the excluded file |
| *(omitted)* | File is deleted from staging; no reference cleanup |

See the [Template Descriptor Format](../TemplateDescriptor/) for full details on conditions and cleanup hints.
