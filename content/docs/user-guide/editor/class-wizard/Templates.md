---
title: "Template Index"
linkTitle: "Templates"
weight: 250
---

# Template Index

This page lists every Class Creation Wizard-enabled template bundled with the engine. Use it to quickly evaluate which template to select and understand what each one produces before running the wizard.

## Quick Reference

| Display Name | CLI `--template` Value | Source | Suffix | Interface | Editor Adapter | Input Vars |
|---|---|---|---|---|---|---|
| [Basic Component](#basic-component) | `default_component` | Engine | `Component` | Yes (optional) | Yes (hasEditor) | Skip Interface, Include Editor Component |

---

## Engine Templates

### Basic Component

**Template name:** `DefaultComponent`
**CLI:** `--template default_component`
**Suffix:** `Component` -- produces `${Name}Component`

The standard O3DE game component. Optionally generates an EBus interface header and an EditorComponent wrapper for editor-side representation.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}Component.cpp` | Always |
| `Source/${Name}Component.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `skip_interface` is false |
| `Source/Editor${Name}Component.h` | Only when `include_editor` is true |
| `Source/Editor${Name}Component.cpp` | Only when `include_editor` is true |

The interface header carries `cleanup_hint: "interface"` -- if skipped, all EBus wiring is removed from remaining files.
The editor files carry `cleanup_hint: "editor"` -- if excluded, their `#include` lines are stripped from siblings.

**Input variables:**

| Var Name | Type | Default | show_if | Description |
|---|---|---|---|---|
| `skip_interface` | toggle | false | -- | Omit `${Name}Interface.h` and all EBus wiring |
| `include_editor` | toggle | false | `hasEditor` | Generate `Editor${Name}Component` for editor-side representation; only shown when gem has an Editor module |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds runtime `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `register_interface_header` | `!skip_interface` | Registers interface header in API/INTERFACE target |
| `register_file_list` | `include_editor` | Adds editor `.h` / `.cpp` to CMake |
| `register_module_descriptor` (`module_kind: "editor"`) | `include_editor` | Registers EditorComponent in editor module |
| `replace_text` | `include_editor` | Strips `AppearsInAddComponentMenu` from runtime `.cpp` so only the EditorComponent appears in the editor menu |

**Notable features:** Only template with both conditional interface cleanup and conditional editor adapter. The `include_editor` toggle is hidden on gems without an Editor module (`show_if: "hasEditor"`).
