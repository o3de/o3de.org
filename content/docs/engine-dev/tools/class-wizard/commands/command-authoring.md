---
title: "Command Authoring Guide"
linkTitle: "Command Authoring"
description: "How to create custom command plugins for the Class Creation Wizard."
weight: 200
---

The **Class Creation Wizard** uses a modular plugin architecture. Each command is a self-contained Python class that registers itself with the wizard at load time. You can add new commands to the engine, your project, or any gem. None of this requires changes to the wizard core.

## Writing a Command

### 1. Create the File

Place your command file in the appropriate `ClassWizardCommands/` directory:

```
MyGem/
  ClassWizardCommands/
    my_custom_command.py
```

The engine's own `commands/` directory is just the first location the wizard checks. It isn't the only place to create a command. A gem can carry its own `ClassWizardCommands/` folder, the same way a project can. The wizard picks up any correctly named and placed file automatically: a `.py` file, not prefixed with `_`, directly inside that `ClassWizardCommands/` directory.

This matters most when a command is tightly coupled to a specific gem's own codebase. See [Architecture > A Self-Contained Creation System, Scoped to a Gem](/docs/engine-dev/tools/class-wizard/architecture/#a-self-contained-creation-system-scoped-to-a-gem) for why gem-level pluggability is the point of this design. See [Command Discovery](/docs/engine-dev/tools/class-wizard/commands/#command-discovery) for the full scan order and priority across the engine, your project, and every gem.

### 2. Define the Command Class

Every command follows the same shape. This section explains what each piece does.

**Register and subclass.**

```python
from command_plugin import CommandRegistry, WizardCommand, CommandContext

@CommandRegistry.register("my_custom_command")
class MyCustomCommand(WizardCommand):
    """One-line summary of what this command does."""
```

The decorator's argument, `"my_custom_command"`, is the exact string a template's `process_commands` entries use in their `"command"` field. This string is independent of the class name. Nothing checks that the two stay in sync with the `name` property below. Subclassing [`WizardCommand`](#the-wizardcommand-interface) makes this a command. The abstract methods you must implement, and the default property values you get for free, both come from that base class.

**Metadata.**

```python
    @property
    def name(self) -> str:
        return "my_custom_command"

    @property
    def description(self) -> str:
        return "Brief description shown in --template-help output"

    @property
    def version(self) -> str:
        return "1.0.0"

    @property
    def author(self) -> str:
        return "Your Name"
```

`name` is the one property here that matters beyond documentation. Keep it identical to the decorator's argument. Letting the two drift apart is a silent bug, not an error. `description` is the only property a user actually sees, in `--template-help` output. `version` and `author` are bookkeeping. Set them if you maintain a command across multiple gems. Otherwise, leave both at their defaults.

**The registration flag.**

```python
    # Set True if this command should only run with --automatic-register
    is_registration_command = False
```

This single flag decides whether `--automatic-register` gates your command. Leave it `False`, the default, for anything that doesn't modify CMake or module files. `replace_text`, `add_gem_dependency`, and every asset-copying command in the [built-in set](../built-in-commands/) leave it unset for that reason.

**The constructor.**

```python
    def __init__(self, target_file: str, value: str = "default"):
        self.target_file = target_file
        self.value = value
```

This signature *is* your command's schema. See [Constructor Arguments](#constructor-arguments) below. Every parameter here is a key a template author can pass in `args`. Give optional parameters a default value. Leave required parameters without one, so a template that omits them fails at construction, loudly, instead of failing confusingly later.

**The action.**

```python
    def execute(self, ctx: CommandContext) -> bool:
        ctx.logger(f"Running my_custom_command on {self.target_file}")

        # Access the gem's source directory
        target = ctx.dest_root / "Source" / self.target_file
        if not target.exists():
            ctx.logger(f"File not found: {target}")
            return False

        # Do your work here
        content = target.read_text(encoding="utf-8")
        content = content.replace("PLACEHOLDER", self.value)
        target.write_text(content, encoding="utf-8")

        ctx.logger(f"Replaced PLACEHOLDER with {self.value}")
        return True
```

This is the one method every command must implement. It receives the single [`CommandContext`](#the-commandcontext) shared by every command in the run. It does whatever the command promises: here, a find-and-replace on a generated file. The `True`/`False` return is informational, not a control signal. Nothing in the wizard branches on it. `ctx.logger()` is what actually surfaces success or failure, in both the GUI status panel and the CLI's console output. Log clearly, especially on the failure path.

These five pieces make up the whole class:

```python
from command_plugin import CommandRegistry, WizardCommand, CommandContext


@CommandRegistry.register("my_custom_command")
class MyCustomCommand(WizardCommand):
    """One-line summary of what this command does."""

    @property
    def name(self) -> str:
        return "my_custom_command"

    @property
    def description(self) -> str:
        return "Brief description shown in --template-help output"

    @property
    def version(self) -> str:
        return "1.0.0"

    @property
    def author(self) -> str:
        return "Your Name"

    is_registration_command = False

    def __init__(self, target_file: str, value: str = "default"):
        self.target_file = target_file
        self.value = value

    def execute(self, ctx: CommandContext) -> bool:
        ctx.logger(f"Running my_custom_command on {self.target_file}")

        target = ctx.dest_root / "Source" / self.target_file
        if not target.exists():
            ctx.logger(f"File not found: {target}")
            return False

        content = target.read_text(encoding="utf-8")
        content = content.replace("PLACEHOLDER", self.value)
        target.write_text(content, encoding="utf-8")

        ctx.logger(f"Replaced PLACEHOLDER with {self.value}")
        return True
```

### 3. Use It in a Template

```json
{
    "command": "my_custom_command",
    "args": {
        "target_file": "${Name}Component.cpp",
        "value": "${SomeInputVar}"
    }
}
```

---

## The CommandContext

Every command receives a `CommandContext` with these fields:

| Field | Type | Description |
|---|---|---|
| `dest_root` | `Path` | Root directory of the target gem (e.g. `D:\Project\Gem`) |
| `namespace` | `str` | Gem namespace / name (e.g. `"GS_Interaction"`) |
| `component_name` | `str` | Name of the component being created |
| `build_target` | `CMakeTarget` or `None` | The selected CMake build target -- has `name`, `raw_name`, `kind`, `file` (the `Path` to its `CMakeLists.txt`), and `files_cmake_list`. Every built-in command that reads this guards against `None`. |
| `variables` | `dict` | All resolved variables -- base vars (`Name`, `GemName`, `ComponentSuffix`) plus user input values |
| `logger` | `callable` | Logging function -- call `ctx.logger("message")` |
| `engine_path` | `Path` | Path to the O3DE engine root |
| `copy_files` | `list` | `(resolved_path, CopyFileDef)` pairs for every condition-passing file from `copyFiles`. Commands that need a generated file's actual path (rather than assuming `Source/`) read this. |
| `template_path` | `Path` or `None` | Path to the source template directory (containing `template.json` and `Template/`). Used by commands that read template-side files outside the normal staging pipeline, e.g. `copy_asset_files`. |
| `stage_dir` | `Path` or `None` | Path to the live staging directory, valid only during the `process_commands` phase. Files marked `excludeFromMerge: true` are still present here. `copy_file_to` and `copy_glob_to` read from this. |

---

## The WizardCommand Interface

All commands extend the `WizardCommand` abstract base class:

```python
class WizardCommand(ABC):
    @abstractmethod
    def execute(self, ctx: CommandContext) -> bool:
        """Run the command. Return True on success."""
        ...

    @property
    @abstractmethod
    def name(self) -> str:
        """The registered command name."""
        ...

    @property
    def is_registration_command(self) -> bool:
        """If True, only runs when --automatic-register is set."""
        return False

    @property
    def description(self) -> str:
        """Brief description for help output."""
        return ""

    @property
    def version(self) -> str:
        return "1.0.0"

    @property
    def author(self) -> str:
        return ""
```

You can also set `is_registration_command` as a class attribute instead of a property:

```python
@CommandRegistry.register("my_registration_cmd")
class MyRegistrationCmd(WizardCommand):
    is_registration_command = True
    # ...
```

---

## Constructor Arguments

Constructor parameters map directly to the `args` object in the template JSON. The wizard calls `CommandRegistry.create(name, args)`, which instantiates your class with `**args`. If your template says:

```json
{
    "command": "my_command",
    "args": { "target_file": "Foo.cpp", "value": "bar" }
}
```

Your class must accept those as `__init__` parameters:

```python
def __init__(self, target_file: str, value: str = "default"):
```

Use default values for optional arguments.

---

## Variable Resolution

All string values in `args` are resolved **before** your constructor is called. `${Name}`, `${GemName}`, `${ComponentSuffix}`, and any template `input_vars` are substituted automatically. Your command receives final, resolved strings.

To access raw variable values at execution time, for example to implement the `replace_text` pattern, use `ctx.variables`:

```python
channel = ctx.variables.get("pulse_channel", "DefaultChannel")
```

---

## Conditional Execution

Commands can be gated by a `condition` in the template JSON:

```json
{
    "command": "register_interface_header",
    "condition": "add_bus_interface",
    "args": { "component_name": "${Name}" }
}
```

Condition syntax:

| Pattern | Meaning |
|---|---|
| *(empty or omitted)* | Always runs |
| `"var_name"` | Runs if the variable is truthy |
| `"!var_name"` | Runs if the variable is falsy |
| `"${var} == 'value'"` | Equality check |
| `"${var} != 'value'"` | Inequality check |

---

## Tips

- **Keep commands focused.** One command should do one thing. Compose complex workflows by chaining multiple commands in the template's `process_commands` array.
- **Log clearly.** Use `ctx.logger()` throughout. Users see this output in both GUI and CLI modes.
- **Return False on failure.** The wizard doesn't inspect this value. It never stops or reports on it for you, and it always moves on to the next command. `ctx.logger()` is the only thing that tells anyone a command failed, so log the failure yourself before returning `False`. Don't raise exceptions unless something is truly unrecoverable.
- **Use `CMakeAnalyzer`** if you need to parse or modify CMake files. It's available from `command_plugin`:
  ```python
  from command_plugin import CMakeAnalyzer
  targets = CMakeAnalyzer.scan_targets(ctx.build_target.file.parent, ctx.namespace)
  ```
  `scan_targets(gem_path, gem_name)` takes the directory to search and the gem name used to resolve `${GemName}`-style tokens in target names. It returns a `List[CMakeTarget]`, not a single target.
- **Test with CLI first.** Run with `--automatic-register` and check the output before using the GUI.

---

## Blank Command Template

A complete, minimal, fully working command. It takes no required arguments and does nothing but log and succeed. Copy it into a new `.py` file in a `ClassWizardCommands/` directory, rename `my_command` / `MyCommand` throughout, and build out `execute()` from there.

```python
from command_plugin import CommandRegistry, WizardCommand, CommandContext


@CommandRegistry.register("my_command")
class MyCommand(WizardCommand):
    """One-line summary of what this command does."""

    @property
    def name(self) -> str:
        return "my_command"

    @property
    def description(self) -> str:
        return "Shown in --template-help output"

    @property
    def version(self) -> str:
        return "1.0.0"

    @property
    def author(self) -> str:
        return "Your Name"

    # Set True only if this command should be gated behind --automatic-register.
    is_registration_command = False

    def execute(self, ctx: CommandContext) -> bool:
        ctx.logger("my_command executed")
        return True
```

This is usable immediately, with no `args` at all:

```json
{
    "command": "my_command"
}
```

Add an `__init__(self, ...)` when the command needs input from the template. See [Constructor Arguments](#constructor-arguments). Replace the body of `execute()` with whatever the command needs to do, using `ctx` to reach the destination gem, the resolved variables, and the logger.
