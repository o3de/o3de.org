---
linkTitle: Architecture
title: Class Creation Wizard Architecture
description: How the Class Creation Wizard discovers templates and commands, and how its layered generation system fits together.
weight: 1
---

{{< note >}}
This information is for developers extending or modifying the **Class Creation Wizard** itself. If you're a user looking to generate a new class, see the [Class Creation Wizard User Guide](/docs/user-guide/editor/class-wizard/).
{{< /note >}}

## What It Does

The Class Creation Wizard builds on O3DE's existing templating system. It uses the same `template.json` format and the same [`copyFiles`](../template-descriptor/#copyfiles) staging mechanism as the `o3de create-from-template` CLI. The wizard doesn't replace that system. It adds a layer of wizard-specific structure on top of it. That layer splits "generate a class" into separate stages, each with its own purpose.

The layer starts with the file list. A `copyFiles` entry can carry wizard-only fields: `condition`, `cleanup_hint`, `isEditor`, `isInterface`, and `excludeFromMerge`. O3DE's own template engine doesn't recognize these fields. It copies them through untouched. The wizard reads and acts on these fields in a separate pass, after O3DE's own staging finishes. This pass decides whether an optional interface header or an EditorComponent variant gets included or dropped. It also scrubs references to dropped files from the files that remain. See [Conditions](../template-descriptor/#conditions) and [Cleanup Hints](../template-descriptor/#cleanup-hints).

Everything else the wizard adds lives in one place: the [`"class_wizard": {}` block](../template-descriptor/#the-class_wizard-block). This block marks a template as wizard-compatible. A `template.json` file without this block is invisible to the wizard, even when `copyFiles` is otherwise well-formed. The block contains two things:

- [**`input_vars`**](../template-descriptor/#input_vars) -- the template's own input fields, beyond the three variables the wizard always provides (`${Name}`, `${GemName}`, `${ComponentSuffix}`). Each one becomes a GUI widget and a CLI flag.
- [**`process_commands`**](../template-descriptor/#process_commands) -- an ordered list of the steps needed to finish the job. This covers everything that has to happen to the generated files and the surrounding gem after they reach disk.

### Execution Order

A single **Create** click, or a single CLI invocation, runs through this sequence:

1. **Discovery.** The wizard scans for every `template.json` with a `class_wizard` block, and every command plugin, across the engine, project, and gems.
2. **Input collection.** You pick a template and a destination. You fill in the template's `input_vars`. The wizard resolves these alongside the three built-in variables.
3. **Staging.** Nothing touches your gem yet. O3DE's own `create-from-template` mechanism copies every `copyFiles` entry into a **temporary staging directory**. It substitutes `${variable}` tokens in paths and content as it copies. Every file the template lists exists here, including files that will never reach your gem.
4. **Conditional exclusion and cleanup, still in staging.** The wizard evaluates each staged file's `condition`. It deletes files that fail the condition from the staging directory. For each deleted file, the wizard also scrubs references to it from the files that remain, based on the file's `cleanup_hint`. This strips `#include` lines, EBus handler inheritance, and `BusConnect`/`BusDisconnect` calls. All of this happens on the temporary copy. None of it reaches your source tree.
5. **Merge.** The wizard copies the files that survived staging into your gem's source tree. `excludeFromMerge` files are the one exception. They stay in the staging directory. A command such as [`copy_file_to`](../commands/built-in-commands/#copy_file_to) can then place them somewhere other than the default location.
6. **Commands, against the real destination.** `process_commands` run in order against your actual gem, not the staging copy. Each command is gated by its own `condition`. [Registration commands](../commands/built-in-commands/#registration-commands) are also gated by `--automatic-register`.

### Commands Are Additive, Not Destructive

A registration command never overwrites existing content, and it never assumes it's starting from nothing. [`register_system_component`](../commands/built-in-commands/#register_system_component) checks whether *this exact component* is already listed in the target module's `GetRequiredSystemComponents()` block. If it is, the command logs that fact and stops. Running the wizard twice is safe. If it isn't, the command locates that block. The block already exists in the module file, from when the gem itself was scaffolded, before this template ran. The command injects one new entry into the block and fixes the trailing comma on the previous last entry. It doesn't recreate the block. It doesn't disturb entries that other templates or other wizard runs already added. [`register_module_descriptor`](../commands/built-in-commands/#register_module_descriptor) follows the same pattern for `CreateDescriptor()` calls.

[Data Asset](../template-descriptor/templates/data-asset/) calls `register_system_component` twice: once for the runtime module, once for the editor module. Both calls find the existing block, add one entry, and leave everything else alone. If you generate a second Data Asset in the same gem later, both calls repeat that process. They add the second asset's entries without touching the first asset's registration.

### A Full-Stack Example

[Data Asset](../template-descriptor/templates/data-asset/) demonstrates this end to end. It has a conditional interface file with cleanup. It has three differently-shaped `input_vars`: a toggle, a required text field, and a free-text field. It has eight `process_commands`: an unconditional gem dependency, two file registrations, a module descriptor, two system component registrations (runtime and editor, both unconditional), a [built-in command](../commands/built-in-commands/) that wires up a `GenericAssetHandler`, and one command gated behind its own `add_bus_interface` toggle. After reading this page, that template reads as a composition of the pieces above. See its [full breakdown](../template-descriptor/templates/data-asset/) for the exact schema.

---

## Template and Command Discovery

This is how the wizard finds every template and command it can offer, before you open it. If you're authoring a template or a command, this is where your files need to live. See the [Template Descriptor Format](../template-descriptor/) for the schema a template needs. See [Command System](../commands/) to add a new command.

### Template Discovery

The `WizardTemplateScanner` scans for `template.json` files under a `Templates/` directory in three locations (priority order):

| Priority | Location | Path Pattern |
|---|---|---|
| 1 (highest) | Engine | `<engine_path>/Templates/*/template.json` |
| 2 | Project | `<project_path>/Templates/*/template.json` |
| 3 | Gems | `<gem_path>/Templates/*/template.json` |

Gem paths are resolved through the O3DE manifest API's `manifest.get_project_enabled_gems()`. If the manifest API is unavailable, the wizard falls back to manually parsing the project's `project.json` and the user's `o3de_manifest.json`.

A `template.json` file must contain a `"class_wizard"` block to be recognized. Templates without this block are ignored. Templates are deduplicated by resolved directory path and sorted alphabetically by display name.

### Command Discovery

The `CommandPluginLoader` scans Python files in three locations, in priority order. First, the engine's `Tools/ClassCreationWizard/commands/` directory. Second, a flat `ClassWizardCommands/` directory under the project. Third, a `ClassWizardCommands/` directory under each gem, in alphabetical order by gem name. Each command file self-registers with `@CommandRegistry.register()`. The wizard loads commands with `importlib` and detects name collisions. If two commands share a name, the first one loaded wins, and the wizard logs a warning.

---

## Dynamic Variables

This is the mechanism for deciding what a template asks the user for. The full field-by-field syntax lives in [Template Descriptor Format > input_vars](../template-descriptor/#input_vars).

Templates define **input variables**: toggles, text fields, dropdowns, and numeric fields. Each one appears in the GUI and maps to a CLI flag. These variables flow through every part of the system:

- **File names and paths** -- `${Name}`, `${GemName}`, `${ComponentSuffix}`
- **Conditional file inclusion** -- optional interface headers, choosing between runtime and editor modules
- **Command arguments** -- user-provided values, such as file extensions, asset groups, or pixel dimensions, passed directly into post-creation commands
- **In-file text replacement** -- the `replace_text` command substitutes placeholder tokens in generated source files with variable values

### Built-in Variables

The wizard's own resolver seeds exactly three base variables:

| Variable | Source | Example |
|---|---|---|
| `${Name}` | `--component-name` or GUI "Component Name" field | `PlayerHealth` |
| `${GemName}` | Selected gem namespace | `GS_Interaction` |
| `${ComponentSuffix}` | Template's `component_suffix` field | `Component` |

`${SanitizedCppName}` and similar variables come from the underlying `o3de create-from-template` staging step, not from the wizard itself.

See the [Template Descriptor Format](../template-descriptor/) for the full variable and condition syntax.

---

## Layered Architecture

This is the mental model for the sections that follow. Pick a layer below, then read its dedicated page:

- **O3DE templates** handle raw file scaffolding and variable substitution in source code
- **[Template descriptors](../template-descriptor/)** (`template.json`) define what the wizard should do with those files -- which commands to run, which variables to collect, which files are conditional
- **[Command plugins](../commands/)** execute the actual build integration -- modifying CMake files, module descriptors, and registration code

Together, these layers let a template author define complex class creation workflows entirely in JSON and Python, without modifying the wizard core.

### A Self-Contained Creation System, Scoped to a Gem

This is the purpose of the layering. A gem's codebase has its own conventions: naming patterns, base classes, EBus wiring, registration idioms. These conventions are specific to that gem. They have no reason to live in the engine. The wizard's three layers let a gem author bind all of this together:

- **The codebase** -- the gem's actual C++ source, its conventions, and the shape of its existing classes.
- **Templating** -- reproduces the extensible, repeatable pieces of that codebase, so a new class matches the gem's existing ones.
- **Commands** -- handle integration work that file-copying alone can't do: wiring a new class into a gem-specific registry, dependency list, or other system that only that gem's code understands.

None of this needs to be generic. None of it needs to live in the engine. A `Templates/` directory and a `ClassWizardCommands/` directory, both scoped inside a single gem module, are enough to build a complete, gem-specific creation system. That system produces classes that match the gem's hand-written code, using commands built to understand that gem's own patterns.

It deploys the same way every other part of a gem does. There's nothing to register and nothing to configure. When a project enables that gem, the wizard [discovers its templates and commands the same way it discovers everything else](#template-and-command-discovery). They become available immediately, the same as templates and commands shipped with the engine. This is the same on-demand, plug-in model O3DE's own gem system uses everywhere else. The wizard extends that model to code generation.

---

## GUI Internals

{{< note >}}
This section is about the implementation of the wizard's own PySide6 GUI application -- widget classes, layout, and how the process launches. It has nothing to do with using the wizard; see the [User Guide](/docs/user-guide/editor/class-wizard/) for that.
{{< /note >}}

### Launching

From the O3DE Editor, open the wizard through **File > New Component**. You can also launch it standalone, from the command line:

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "C:\MyProject"
```

This opens the graphical interface. `--project-path` is required alongside `--engine-path`. Without it, the wizard can't resolve and scrub build targets correctly.

### Generation Flow

1. **Template Selection.** The top combo box lists all discovered templates. "Basic Component" is always pinned first. The rest are sorted alphabetically by display name.

2. **Input Fields.** Dynamic fields are generated from each template's `input_vars` definition:

   | Input Type | GUI Widget |
   |---|---|
   | `text` | QLineEdit text field |
   | `dropdown` | BoundedComboBox with static choices |
   | `toggle` | QCheckBox |
   | `int` | QSpinBox |
   | `float` | QDoubleSpinBox |

3. **Create Button.** Validates all required fields, resolves variables, and runs the command pipeline.

4. **Status Panel.** Shows each command's status as the pipeline runs: pending (grey), active, success (green), or fail (red).

### GUI Features

- **Fusion theme** with custom QSS stylesheet and SVG arrow icons
- **BoundedComboBox**: QComboBox subclass with MAX_POPUP_HEIGHT (400px), pre-constrains the popup view then resizes
- **Project condition awareness**: Input fields with `show_if` conditions only appear when the selected gem satisfies the condition (e.g., `hasEditor` shows editor-related toggles only for gems with an Editor module)
