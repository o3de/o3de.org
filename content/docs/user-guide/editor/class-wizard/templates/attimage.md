---
title: "Attimage"
linkTitle: "Attimage"
description: "Template for creating attachment image assets used in rendering features."
weight: 70
---

**Template name:** `Attimage`
**CLI:** `--template attimage`
**Suffix:** `Attimage` -- produces `${Name}Attimage`

An attachment image asset template for rendering features across the engine. Attachment images are used in the render pipeline for render targets, depth buffers, and intermediate rendering surfaces.

## Files Generated

| File | Conditional |
|---|---|
| `Source/${Name}Attimage.cpp` | Always |
| `Source/${Name}Attimage.h` | Always |

## Input Variables

This template has no additional input variables beyond the standard `Name` and `GemName`.

## Commands

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |

## Key Differences from Basic Component

- Specialized for rendering pipeline attachment images
- Minimal command set -- file registration and module descriptor only
- No interface header, editor adapter, or system component options
