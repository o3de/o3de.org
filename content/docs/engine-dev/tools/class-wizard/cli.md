---
title: "CLI Reference"
linkTitle: "CLI"
description: "Complete command-line reference for the Class Creation Wizard."
weight: 200
---

The **Class Creation Wizard** runs fully headless from the command line. It discovers template-specific flags dynamically from each template's `input_vars`, so the exact flag set changes per
template. Use `--template-help <template>` to get the complete command for any template.

---

## Base Command

```
python ClassWizard.py [global flags] [mode flags] [template-specific flags]
```

---

## Global Flags

These flags apply to every invocation regardless of mode.

| Flag | Required | Description |
|---|---|---|
| `--engine-path <path>` | Yes | Path to the O3DE engine root |
| `--project-path <path>` | Yes | Path to the O3DE project directory. Required in both GUI and CLI mode -- it's the only way the wizard can correctly resolve and scrub build targets. |

---

## Discovery Flags

Use these to explore available templates before running.

| Flag | Description |
|---|---|
| `--list-templates` | Print all wizard-enabled templates and exit |
| `--template-help <class_name>` | Print the full command, all flags, and command list for a template, then exit |

### Example

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject --list-templates
```

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject --template-help default_component
```

`--template-help` output includes:

- Template identity (class name, suffix, description)
- **The full runnable command** with the global/CLI-mode flags and all of the template's own flags shown (`--target-path` is a valid CLI-mode flag but is not printed in this block -- see [CLI Mode Flags](#cli-mode-flags))
- Per-argument details: default values, required status, `show_if` condition
- The complete list of processing commands that will run and their conditions

---

## CLI Mode Flags

These flags drive component creation when not launching the GUI.

| Flag | Required | Description |
|---|---|---|
| `--template <class_name>` | Yes | Selects the template and activates CLI mode. Must match the `class_name` from `--list-templates`. |
| `--component-name <Name>` | Yes | Base name of the component, e.g. `PlayerHealth`. Becomes `${Name}` in all substitutions. |
| `--namespace <GemName>` | Yes | Gem namespace, e.g. `GS_Interaction`. Becomes `${GemName}`. |
| `--target-path <path>` | No | Destination directory. Defaults to `<project-path>/Gem`. |
| `--automatic-register` | No | Run registration commands (CMake file lists, module descriptors). Omit to generate files only. |
| `--keep-comments` | No | Preserve template comment blocks in generated files. Default: strip comments. |
| `--default-license` | No | Emit the default license header in generated files. |

---

## Template-Specific Flags

Each template adds its own flags from `input_vars`. These are printed by `--template-help`.

**Toggle** inputs become `--flag-name` (store_true, no value needed).

**Text** inputs become `--flag-name <value>`.

**Dropdown** inputs become `--flag-name <choice>` with a fixed set of allowed values.

**Int** and **float** inputs become `--flag-name <number>`.

Flag names are derived from `var_name` with underscores replaced by hyphens:
`add_bus_interface` -> `--add-bus-interface`

A toggle flag is a plain "turn on" switch (`store_true`). If the template's `default_value` for that
toggle is already `true`, as with `add_bus_interface` on every component template, there is no CLI
flag to turn it back off. Passing `--add-bus-interface` is a no-op. There is currently no
`--no-add-bus-interface` equivalent. Toggles that default to `false`, like `include_editor`, work as
expected: omit the flag to leave it off, pass the flag to turn it on.

Flags marked `show_if` are optional at the CLI level (the condition is false when omitted),
but they are only shown in the Editor GUI when the gem satisfies the condition.

---

## Full Command Shape

```
python ClassWizard.py \
  --engine-path  <engine-path> \
  --project-path <project-path> \
  --template     <class_name> \
  --component-name <Name> \
  --namespace      <GemName> \
  [--target-path <path>] \
  [--automatic-register] \
  [--keep-comments] \
  [--default-license] \
  [<template-specific flags>]
```

---

## Examples

### GUI Mode

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject
```

### List All Templates

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject --list-templates
```

### Full Help for a Template

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject \
  --template-help default_component
```

### Basic Component -- Files Only, No Registration

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     default_component \
  --component-name PlayerHealth \
  --namespace      GS_Core
```

### Basic Component -- With Registration and Editor Adapter

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     default_component \
  --component-name PlayerHealth \
  --namespace      GS_Core \
  --automatic-register \
  --include-editor
```

### LyShine Component -- Keep Comments

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     lyshine_component \
  --component-name HealthBar \
  --namespace      GS_Core \
  --automatic-register \
  --keep-comments
```

`add_bus_interface` defaults to `true` on every component template and has no CLI flag to disable it (see [Template-Specific Flags](#template-specific-flags)). There is no CLI-only way to omit the interface header. Use the GUI to turn it off.

### System Component

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     system_component \
  --component-name TimeManager \
  --namespace      GS_Core \
  --automatic-register
```

### Data Asset with Custom Extension

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     data_asset \
  --component-name QuestData \
  --namespace      GS_Quests \
  --automatic-register \
  --file-extension questdata \
  --asset-group Quests
```

`--asset-group` takes free text (default `DataAssets`), not a fixed set of choices -- any asset browser group name is valid.

### Custom Destination Path

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     default_component \
  --component-name FadeToBlack \
  --namespace      GS_Cinematics \
  --target-path    D:\MyProject\Gems\GS_Cinematics\Code \
  --automatic-register
```

---

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Validation failure (invalid component name/namespace, missing `--project-path`, missing destination directory) or component creation failure |
| `2` | Argument parsing error from argparse itself -- missing `--engine-path`, an invalid `--template` choice, or a bad value for a typed flag (e.g. non-numeric `--width`) |
