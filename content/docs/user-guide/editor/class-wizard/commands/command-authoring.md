---
title: "Command Authoring Guide"
linkTitle: "Command Authoring"
description: "How to create custom command plugins for the Class Creation Wizard."
weight: 200
---

The Class Creation Wizard uses a modular plugin architecture. Each command is a self-contained Python class that registers itself with the wizard at load time. You can add new commands to the engine, your project, or any gem -- no changes to the wizard core required.

---

## Writing a Command

### 1. Create the File

Place your command file in the appropriate `ClassWizardCommands/` directory:

```
MyGem/
  ClassWizardCommands/
    my_custom_command.py
```

### 2. Define the Command Class

```python
from command_plugin import CommandRegistry, WizardCommand, CommandContext


@CommandRegistry.register("my_custom_command")
class MyCustomCommand(WizardCommand):
    """One-line summary of what this command does."""

    # --- Metadata ---

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

    # Set True if this command should only run with --automatic-register
    is_registration_command = False

    # --- Constructor ---

    def __init__(self, target_file: str, value: str = "default"):
        self.target_file = target_file
        self.value = value

    # --- Execution ---

    def execute(self, ctx: CommandContext) -> bool:
        """
        Perform the command's action.

        Args:
            ctx: CommandContext with dest_root, namespace, component_name,
                 build_target, variables, logger, engine_path

        Returns:
            True on success, False on failure.
        """
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
| `build_target` | `CMakeTarget` | The selected CMake build target (has `name`, `cmake_path`, `files_cmake_list`) |
| `variables` | `dict` | All resolved variables -- base vars (`Name`, `GemName`, `ComponentSuffix`) plus user input values |
| `logger` | `callable` | Logging function -- call `ctx.logger("message")` |
| `engine_path` | `Path` | Path to the O3DE engine root |

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

Constructor parameters map directly to the `args` object in the template JSON. The wizard calls `CommandRegistry.create(name, args)` which instantiates your class with `**args`. So if your template says:

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

To access raw variable values at execution time (e.g. for the `replace_text` pattern), use `ctx.variables`:

```python
channel = ctx.variables.get("pulse_channel", "DefaultChannel")
```

---

## Conditional Execution

Commands can be gated by a `condition` in the template JSON:

```json
{
    "command": "register_interface_header",
    "condition": "!skip_interface",
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
- **Log clearly.** Use `ctx.logger()` throughout -- users see this output in both GUI and CLI modes.
- **Return False on failure.** The wizard reports the failure and continues with remaining commands. Don't raise exceptions unless something is truly unrecoverable.
- **Use `CMakeAnalyzer`** if you need to parse or modify CMake files. It's available from `command_plugin`:
  ```python
  from command_plugin import CMakeAnalyzer
  targets = CMakeAnalyzer.scan_gem_targets(ctx.dest_root)
  ```
- **Test with CLI first.** Run with `--automatic-register` and check the output before using the GUI.
