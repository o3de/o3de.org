---
title: "Class Creation Wizard"
linkTitle: "Class Creation Wizard"
description: "A standalone tool for scaffolding O3DE C++ classes through templates and command plugins."
weight: 450
---

The **Class Creation Wizard** is a standalone PySide6 tool for scaffolding O3DE C++ classes. It discovers template descriptors and command plugins across the engine, project, and gem directories, then executes a command-driven pipeline to generate source files, update CMakeLists, and register components.

![Image of Class Wizard GUI](/images/user-guide/editor/class-wizard/class-wizard-gui.png)

## What It Does

At its core, the wizard:

1. **Detects your project and gem sources.** On launch, it reads your project's `project.json`, resolves gem paths through the O3DE manifest, and builds a map of every gem available to your project -- including external gems outside the engine directory.

2. **Identifies CMake build targets.** It scans each gem's `CMakeLists.txt` files, parsing `o3de_add_target`, `ly_add_target`, `add_library`, and `add_executable` macros. This lets the wizard know exactly where to register new source files, module descriptors, and dependencies.

3. **Generates classes from templates.** Each template defines the files to create, the variables to substitute, and the post-creation commands to run. The wizard stages files via O3DE's `create-from-template` system, applies variable substitution, evaluates conditional file exclusion with reference cleanup, and merges results into your gem's source tree.

4. **Runs integration commands.** After file generation, the wizard executes a sequence of commands defined by the template: registering files in CMake, adding module descriptors, inserting system component entries, adding gem dependencies, and more. Each command operates directly on your project's build files.

---

## Template and Command Discovery

### Template Discovery

The `WizardTemplateScanner` scans for `template.json` files under a `Templates/` directory in three locations (priority order):

| Priority | Location | Path Pattern |
|---|---|---|
| 1 (highest) | Engine | `<engine_path>/Templates/*/template.json` |
| 2 | Project | `<project_path>/Templates/*/template.json` |
| 3 | Gems | `<gem_path>/Templates/*/template.json` |

Gem paths are resolved via the O3DE manifest API (`manifest.get_project_enabled_gems()`, `manifest.get_manifest_external_subdirectories()`, `manifest.get_project_external_subdirectories()`).

A `template.json` must contain a `"class_wizard"` block to be recognized. Templates without this block are ignored. Templates are deduplicated by resolved directory path and sorted alphabetically by display name.

### Command Discovery

The `CommandPluginLoader` scans for Python files in `Tools/ClassCreationWizard/Commands/` under the same three locations. Each command file uses `@CommandRegistry.register()` to self-register. Commands are loaded via `importlib` with collision detection -- duplicate command names raise warnings and the first registration wins.

---

## GUI Usage

### Launching

```bash
python ClassWizard.py --engine-path "C:\o3de"
```

Opens the graphical interface. The wizard auto-detects your project if launched from within an O3DE project directory, or you can specify `--project-path` explicitly.

### Workflow

1. **Template Selection.** The top combo box lists all discovered templates, grouped by source (Engine, Project, Gem).

2. **Input Fields.** Dynamic fields are generated from each template's `input_vars` definition:

   | Input Type | GUI Widget |
   |---|---|
   | `string` / `text` | QLineEdit text field |
   | `gem_select` | BoundedComboBox populated from enabled gems |
   | `combo` / `dropdown` | BoundedComboBox with static choices |
   | `toggle` / `bool` | QCheckBox |

3. **Create Button.** Validates all required fields, resolves variables, and runs the command pipeline.

4. **Status Panel.** Shows per-command status as the pipeline executes: pending (grey) to active to success (green) or fail (red).

### GUI Features

- **Fusion theme** with custom QSS stylesheet and SVG arrow icons
- **BoundedComboBox**: QComboBox subclass with MAX_POPUP_HEIGHT (300px), pre-constrains the popup view then resizes
- **Project condition awareness**: Input fields with `show_if` conditions only appear when the selected gem satisfies the condition (e.g., `hasEditor` shows editor-related toggles only for gems with an Editor module)

---

## Default Templates

The wizard ships with templates for the most common O3DE class types:

| Template | What It Creates |
|---|---|
| **[Basic Component](templates/basic-component/)** | A standard game component with optional interface header and editor adapter. |
| **[Level Component](templates/level-component/)** | A component that attaches to the level entity. |
| **[System Component](templates/system-component/)** | An engine-level system component for services that run outside of entity context. |
| **[LyShine Component](templates/lyshine-component/)** | A UI component for the LyShine (UI 2.0) system. |
| **[Data Asset](templates/data-asset/)** | A custom data asset class with asset handler registration and `.setreg` configuration. |
| **[Attimage](templates/attimage/)** | An attachment image asset template for rendering features. |

Each template can be extended or overridden by placing custom templates in your project or gem `Templates/` directories.

---

## Dynamic Variables

Templates define **input variables** -- toggles, text fields, and dropdowns -- that appear in the GUI or map to CLI flags. These variables flow through every part of the system:

- **File names and paths** -- `${Name}`, `${GemName}`, `${ComponentSuffix}`
- **Conditional file inclusion** -- skip interface headers, choose between runtime and editor modules
- **Command arguments** -- pass user-provided values like file extensions, asset groups, or pulse channels directly into post-creation commands
- **In-file text replacement** -- the `replace_text` command substitutes placeholder tokens in generated source files with variable values

### Built-in Variables

| Variable | Source | Example |
|---|---|---|
| `${Name}` | `--component-name` or GUI "Component Name" field | `PlayerHealth` |
| `${GemName}` | Selected gem namespace | `GS_Interaction` |
| `${ComponentSuffix}` | Template's `component_suffix` field | `Component` |
| `${SanitizedCppName}` | O3DE-generated C++-safe version of `${Name}` | `PlayerHealth` |

---

## Architecture

The combination of O3DE's template language, the wizard's descriptor format, and the modular command plugin system creates a layered code generation architecture:

- **O3DE templates** handle raw file scaffolding and variable substitution in source code
- **[Template descriptors](TemplateDescriptor/)** (`template.json`) define what the wizard should do with those files -- which commands to run, which variables to collect, which files are conditional
- **[Command plugins](commands/)** execute the actual build integration -- modifying CMake files, module descriptors, and registration code

Together, these layers allow complex class creation workflows to be defined entirely in JSON and Python, without modifying the wizard core. A gem author can ship a custom template that creates specialized component types, registers them in the correct build targets, adds cross-gem dependencies, and configures asset processing -- all through the template descriptor alone.

---

## Quick Start

### GUI Mode

```bash
python ClassWizard.py --engine-path "C:\o3de"
```

### CLI Mode

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "D:\MyProject" \
    --template default_component --component-name PlayerHealth \
    --namespace MyGem --automatic-register
```

### Listing Templates

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "D:\MyProject" --list-templates
```

### Template Help

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "D:\MyProject" --template-help default_component
```

---

## Further Reading

| Document | Contents |
|---|---|
| [CLI Reference](CLI/) | All command-line flags, full command shape, per-template examples, exit codes |
| [How Templates Work](templates/) | Template system overview, discovery, and index of all templates |
| [Template Descriptor Format](TemplateDescriptor/) | Full reference for `template.json` -- structure, variables, conditions, file definitions, cleanup hints |
| [Command System](commands/) | How commands work, all built-in commands, and how to author new ones |
