---
title: "CLI Reference"
linkTitle: "CLI"
description: ""
weight: 150
---

# CLI Reference

The Class Creation Wizard runs fully headless via command-line. Template-specific flags are
discovered dynamically from each template's `input_vars`, so the exact flag set changes per
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
| `--project-path <path>` | For CLI mode | Path to the O3DE project directory |

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
- **The full runnable command** with every required and optional flag shown
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

Flag names are derived from `var_name` with underscores replaced by hyphens:
`skip_interface` -> `--skip-interface`

Flags marked `show_if` are optional at the CLI level (the condition is simply false when omitted),
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

### GUI mode

```
python ClassWizard.py --engine-path D:\O3DE
```

### List all templates

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject --list-templates
```

### Full help for a template

```
python ClassWizard.py --engine-path D:\O3DE --project-path D:\MyProject \
  --template-help default_component
```

### Basic Component -- files only, no registration

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     default_component \
  --component-name PlayerHealth \
  --namespace      GS_Core
```

### Basic Component -- with registration and editor adapter

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

### Basic Component -- skip interface, keep comments

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     default_component \
  --component-name PlayerHealth \
  --namespace      GS_Core \
  --automatic-register \
  --skip-interface \
  --keep-comments
```

### Manager Component

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     manager_component \
  --component-name TimeManager \
  --namespace      GS_Core \
  --automatic-register
```

### Pulsor Reactor (required text input)

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     Reactor \
  --component-name OnButtonPress \
  --namespace      GS_Interaction \
  --automatic-register \
  --pulse-channel ButtonPressed
```

### Dialogue Effect with custom destination

```
python ClassWizard.py \
  --engine-path  D:\O3DE \
  --project-path D:\MyProject \
  --template     dialogueEffect \
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
| `1` | Argument error, validation failure, or component creation failure |
