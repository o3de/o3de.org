---
linkTitle: Class Creation Wizard
title: Class Creation Wizard Developer Documentation
description: Documentation for developers extending or contributing to the Class Creation Wizard bundled as part of Open 3D Engine.
---

The **Class Creation Wizard** is a standalone PySide6 tool for scaffolding O3DE C++ classes. It discovers template descriptors and command plugins across the engine, project, and gem directories, then executes a command-driven pipeline to generate source files, update CMakeLists, and register components.

The development source for the Class Creation Wizard can be found here: https://github.com/o3de/o3de/tree/development/Tools/ClassCreationWizard

## Topics

| Name | Description |
|-|-|
| [Architecture](./architecture) | How the wizard discovers templates and commands, how the GUI drives generation, and how the template/command layers fit together. |
| [Template Descriptor Format](./template-descriptor) | Full reference for `template.json` -- structure, variables, conditions, file definitions, cleanup hints, scoped commands -- and, nested under it, the index of every built-in template that implements the schema. |
| [Command System](./commands) | How the command plugin system works, all built-in commands, and how to author new ones. |
| [CLI Reference](./cli) | Complete command-line reference: flags, full command shape, per-template examples, exit codes. |

## Related topics

| Topic | Description |
|-|-|
| [Class Creation Wizard (User Guide)](/docs/user-guide/editor/class-wizard/) | Task-oriented guide to using the wizard from the O3DE Editor -- what each template creates and how to generate a new class through the GUI. |
