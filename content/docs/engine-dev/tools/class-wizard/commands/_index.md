---
title: "Command System"
linkTitle: "Commands"
description: "How the Class Creation Wizard command system works, and a reference of all built-in commands."
weight: 500
---

Commands are the actions the **Class Creation Wizard** executes after generating template files. They handle build system integration: registering files in CMake, adding module descriptors, inserting dependencies, and modifying generated source.

`process_commands` is optional. The schema allows an empty list for a template that needs nothing beyond staging its files. Most templates instead use the [pool of built-in commands](#built-in-commands) below. When none of them fit, you can [author your own](#writing-custom-commands). The [Command Authoring Guide](command-authoring/) covers exactly what a command needs to implement to be fully compliant with the core system.

---

## How Commands Work

### Anatomy of a Command

Every command is one Python class. Every piece of it has a specific job:

| Piece | Purpose |
|---|---|
| `@CommandRegistry.register("name")` | Self-registers the class the instant it's defined. This isn't a separate step. See below. |
| Subclassing `WizardCommand` | Makes it a command. The required methods and default properties both come from this base class. |
| `name`, `description`, `version`, `author` | Identity and metadata. Only `name` (must match the decorator) and `description` (shown in `--template-help`) matter beyond documentation. |
| `is_registration_command` | The one flag that decides whether `--automatic-register` gates this command. |
| `__init__(...)` | The command's schema. Its parameters are exactly what a template's `args` object can supply. |
| `execute(self, ctx)` | The action itself, run against the shared `CommandContext`. |

The decorator makes the system extensible. It isn't a separate registration step. It runs the instant the class is *defined*. The [`CommandPluginLoader`](#command-discovery) imports a command file, and Python executes the file top to bottom as part of that import. Executing a `class Foo(WizardCommand): ...` statement under `@CommandRegistry.register(...)` is what adds `Foo` to the registry. There's no manifest to update and no list to keep in sync. Drop a correctly-decorated `.py` file into a `commands/` or `ClassWizardCommands/` directory, and the wizard picks it up on its next scan of that directory. Registration and discovery are the same event.

```json
{
    "command": "register_file_list",
    "args": { "component_name": "${Name}${ComponentSuffix}" }
}
```

See the [Command Authoring Guide](command-authoring/#2-define-the-command-class) for what each piece looks like in a real, working example, with every line explained.

### Command Discovery

The `CommandPluginLoader` scans Python files in three locations, loaded in this order:

| Priority | Location | Namespace |
|---|---|---|
| 1 (highest) | `<EngineTools>/ClassCreationWizard/commands/*.py` | `engine` |
| 2 | `<Project>/ClassWizardCommands/*.py` | `project` |
| 3 | `<Gem>/ClassWizardCommands/*.py` | Gem name (alphabetical) |

**First registration wins.** If two plugins register the same command name, the first one loaded takes priority, and the wizard logs a warning. Files prefixed with `_` are skipped.

### Execution, Command by Command

`process_commands` runs in the order written in the template. This order is the templating format's own promise. It lets one command's output become the next command's assumption: register the files, then point a module descriptor at them, then add that to the system component list. Any [scoped command blocks](../template-descriptor/#scoped-commands-advanced) are flattened into that same flat, ordered sequence before anything runs.

Before the first command runs, the wizard builds a single [`CommandContext`](command-authoring/#the-commandcontext). This one shared object, not one per command, carries the destination, the resolved variables, the build target, and the staging paths. For each command, in order, the wizard does the following:

1. If the command is a [registration command](built-in-commands/#registration-commands) and `--automatic-register` wasn't passed, the wizard skips it. It doesn't even construct the command.
2. The wizard evaluates the command's `condition`. If the condition is false, the wizard skips the command and logs why.
3. The wizard resolves the command's `args` (`${variable}` substitution), then `CommandRegistry.create(name, resolved_args)` constructs the command. This call does nothing more than `command_class(**resolved_args)`. A command's `__init__` signature doubles as its schema for this reason. See [Anatomy of a Command](#anatomy-of-a-command) above and [Constructor Arguments](command-authoring/#constructor-arguments) for the authoring side of it.
4. `execute(ctx)` runs against the shared context.

The wizard doesn't check `execute()`'s `True`/`False` return value. A command that returns `False` has told you, through its own logging, that something didn't go as planned. The wizard doesn't stop or roll anything back because of it, and it moves on to the next command. The whole `process_commands` sequence runs inside one try/except block. Only an unhandled exception stops the run. Even then, the wizard deletes the temporary staging directory in a `finally` block, whether the run succeeded or failed.

This is the last stage of the sequence described in [Architecture > Execution Order](/docs/engine-dev/tools/class-wizard/architecture/#execution-order). Everything above happens after your files are already sitting in your gem.

> **Note -- Conditional file exclusion is automatic.** You don't invoke a command to exclude files. The wizard handles conditional file exclusion and reference cleanup (EBus scrubbing, editor include removal) automatically, before `process_commands` runs. This is based on the `condition` and `cleanup_hint` fields in each `copyFiles` entry. See the [Template Descriptor Format](../template-descriptor/) for details.

---

## Built-in Commands

The wizard ships with a pool of ready-made commands: registration commands that run only with `--automatic-register`, and general commands that always run. See the [Built-in Commands reference](built-in-commands/) for the full list, every argument, and what each one does.

---

## Writing Custom Commands

You can extend the command system by writing your own command plugins. See the [Command Authoring Guide](command-authoring/) for a complete walkthrough.
