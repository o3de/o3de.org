---
title: "Class Creation Wizard"
linkTitle: "Class Creation Wizard"
description: ""
weight: 450
---

The **Class Creation Wizard** is a dynamic code generation and project integration tool for O3DE. It discovers your project structure, scans gem sources, identifies CMake build targets, and uses a template descriptor language to generate fully integrated C++ classes -- components, data assets, and any custom types you want to define.

![Class Wizard GUI](images/user-guide/editor/class-wizard/ClassWizardGUI.png)

## What It Does

At its core, the wizard:

1. **Detects your project and gem sources.** On launch, it reads your project's `project.json`, resolves gem paths through the O3DE manifest, and builds a map of every gem available to your project -- including external gems outside the engine directory.

2. **Identifies CMake build targets.** It scans each gem's `CMakeLists.txt` files, parsing `o3de_add_target`, `ly_add_target`, `add_library`, and `add_executable` macros. This lets the wizard know exactly where to register new source files, module descriptors, and dependencies.

3. **Generates classes from templates.** Each template defines the files to create, the variables to substitute, and the post-creation commands to run. The wizard stages files via O3DE's `create-from-template` system, applies variable substitution, evaluates conditional file exclusion with reference cleanup, and merges results into your gem's source tree.

4. **Runs integration commands.** After file generation, the wizard executes a sequence of commands defined by the template: registering files in CMake, adding module descriptors, inserting system component entries, adding gem dependencies, and more. Each command operates directly on your project's build files.

## Default Templates

The wizard ships with templates for the most common O3DE class types:

| Template | What It Creates |
|---|---|
| **Basic Component** | A standard game component (`.h` / `.cpp`) with optional interface header. |
| **Level Component** | A standard level component with optional interface header. |
| **System Component** | An engine-level system component for services that run outside of entity context. |
| **LyShine Component** | A UI component for the [LyShine](content/docs/user-guide/components/reference/ui/_index.md) (UI 2.0) system. |
| **Data Asset** | A custom data asset class with asset handler registration, `.setreg` configuration, and optional file extension mapping. |
| **Attimage** | An image file type used in rendering features across the engine. |

Each template can be extended or overridden by placing custom templates in your project or gem `Templates/` directories.

## Dynamic Variables

Templates define **input variables** -- toggles, text fields, and dropdowns -- that appear in the GUI or map to CLI flags. These variables flow through every part of the system:

- **File names and paths** -- `${Name}`, `${GemName}`, `${ComponentSuffix}`
- **Conditional file inclusion** -- skip interface headers, choose between runtime and editor modules
- **Command arguments** -- pass user-provided values like file extensions, asset groups, or pulse channels directly into post-creation commands
- **In-file text replacement** -- the `replace_text` command substitutes placeholder tokens in generated source files with variable values

This variable system means a single template definition can produce different output depending on user choices, without any code changes to the wizard itself.

## The Bigger Picture

The combination of O3DE's template language, the wizard's descriptor format, and the modular command plugin system creates a layered code generation architecture:

- **O3DE templates** handle raw file scaffolding and variable substitution in source code
- **Template descriptors** (`template.json`) define what the wizard should do with those files -- which commands to run, which variables to collect, which files are conditional
- **Command plugins** execute the actual build integration -- modifying CMake files, module descriptors, and registration code

Together, these layers allow complex and powerful class creation workflows to be defined entirely in JSON and Python, without modifying the wizard core. A gem author can ship a custom template that creates specialized component types, registers them in the correct build targets, adds cross-gem dependencies, and configures asset processing -- all through the template descriptor alone.

## Usage

### GUI Mode

```bash
python ClassWizard.py --engine-path "C:\o3de"
```

Opens the graphical interface. Select your project, choose a template, fill in the fields, and create.

### CLI Mode

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "D:\MyProject" \
    --template default_component --component-name PlayerHealth \
    --namespace MyGem --automatic-register
```

Runs headless. Template-specific flags (like `--skip-interface`) are added dynamically based on the selected template's `input_vars`.

### Listing Templates

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "D:\MyProject" --list-templates
```

### Template Help

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "D:\MyProject" --template-help default_component
```

## Further Reading

| Document | Contents |
|---|---|
| [CLI Reference](CLI.md) | All command-line flags, full command shape, per-template examples, exit codes |
| [Template Index](Templates.md) | All current wizard-enabled templates -- what each creates, inputs, commands, and features |
| [Template Descriptor Language](TemplateDescriptor.md) | Full reference for `template.json` -- structure, variables, conditions, file definitions, cleanup hints |
| [Command Reference](Commands.md) | Every built-in command -- arguments, behavior, examples |
| [Command Authoring Guide](CommandAuthoring.md) | How to create custom command plugins for your project or gem |
