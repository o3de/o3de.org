---
title: "System Component"
linkTitle: "System Component"
description: "Template for creating global system components on the system entity."
weight: 40
---

**Template name:** `SystemComponent`
**CLI:** `--template system_component`
**Suffix:** `Component` -- produces `${Name}Component`

An engine-level system component that lives on the system entity. System components provide global services that run outside of entity context -- input managers, network systems, resource registries, and similar singletons.

## Files Generated

| File | Conditional |
|---|---|
| `Source/${Name}Component.cpp` | Always |
| `Source/${Name}Component.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `skip_interface` is false |

The interface header carries `cleanup_hint: "interface"` -- if skipped, all EBus wiring is removed from remaining files.

## Input Variables

| Var Name | Type | Default | show_if | Description |
|---|---|---|---|---|
| `skip_interface` | toggle | false | -- | Omit `${Name}Interface.h` and all EBus wiring |

## Commands

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `register_system_component` | Always | Adds to `GetRequiredSystemComponents()` for auto-activation |
| `register_interface_header` | `!skip_interface` | Registers interface header in API/INTERFACE target |

## Key Differences from Basic Component

- Lives on the system entity, not game entities
- Automatically registered in `GetRequiredSystemComponents()` so it activates at engine startup
- No editor adapter option (system components operate globally)
