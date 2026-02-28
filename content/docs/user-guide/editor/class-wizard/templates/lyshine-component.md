---
title: "LyShine Component"
linkTitle: "LyShine Component"
description: "Template for creating UI components using the LyShine/UiCanvas system."
weight: 50
---

**Template name:** `LyShineComponent`
**CLI:** `--template lyshine_component`
**Suffix:** `Component` -- produces `${Name}Component`

A UI component for the LyShine (UI 2.0) system. LyShine components are used to create custom UI elements that work within the UiCanvas framework -- buttons, health bars, inventory slots, and other interactive UI elements.

## Files Generated

| File | Conditional |
|---|---|
| `Source/${Name}Component.cpp` | Always |
| `Source/${Name}Component.h` | Always |

## Input Variables

This template has no additional input variables beyond the standard `Name` and `GemName`.

## Commands

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `add_gem_dependency` | Always | Adds `Gem::LyShine.API` as a build dependency |

## Key Differences from Basic Component

- Integrates with the LyShine/UiCanvas system
- Automatically adds LyShine gem dependency
- No interface header option (LyShine components use LyShine's own bus system)
- No editor adapter option
