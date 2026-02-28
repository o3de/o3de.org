---
title: "Level Component"
linkTitle: "Level Component"
description: "Template for creating components that attach to the level entity."
weight: 30
---

**Template name:** `LevelComponent`
**CLI:** `--template level_component`
**Suffix:** `Component` -- produces `${Name}Component`

A component that attaches to the level entity rather than individual game entities. Level components are useful for per-level services like weather systems, lighting controllers, or level-wide game logic.

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
| `register_interface_header` | `!skip_interface` | Registers interface header in API/INTERFACE target |

## Key Differences from Basic Component

- Targets the level entity instead of game entities
- No editor adapter option (level components typically don't need one)
- Component `Activate()` / `Deactivate()` is tied to level load / unload
