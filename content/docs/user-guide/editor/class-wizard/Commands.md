---
title: "Command Reference"
linkTitle: "Commands"
weight: 200
---

# Command Reference

Commands are the actions the Class Creation Wizard executes after generating template files. They handle build system integration -- registering files in CMake, adding module descriptors, inserting dependencies, and modifying generated source.

Commands are invoked from the `process_commands` array in a template's `class_wizard` block. Each entry specifies a command name, its arguments, and an optional condition.

```json
{
    "command": "register_file_list",
    "args": { "component_name": "${Name}${ComponentSuffix}" }
}
```

> **Note -- Conditional file exclusion is automatic.** You do not invoke a command to exclude files. Conditional file exclusion and reference cleanup (EBus scrubbing, editor include removal) is handled automatically before `process_commands` runs, based on the `condition` and `cleanup_hint` fields in each `copyFiles` entry. See the [Template Descriptor Language](TemplateDescriptor.md) for details.

## Registration Commands

Registration commands only run when the `--automatic-register` flag is set (or the GUI checkbox is enabled). They modify CMake and module files to integrate the new class into the build.

---

### register_file_list

Adds the generated `.h` and `.cpp` files to the gem's CMake build target.

| Arg | Type | Description |
|---|---|---|
| `component_name` | string | Base filename (without extension) to register |

**Behavior:** Locates the selected build target's `FILES_CMAKE` list file. Inserts `Source/{component_name}.h` and `Source/{component_name}.cpp` into the `set(FILES ...)` block. If the target uses inline sources instead of a cmake list file, appends a `target_sources(...)` block to `CMakeLists.txt`.

---

### register_module_descriptor

Adds a `CreateDescriptor()` call to the gem's module file so the component is instantiated at startup.

| Arg | Type | Description |
|---|---|---|
| `component_name` | string | Full component class name |
| `module_kind` | string | `"runtime"` (default) or `"editor"` -- selects `{Namespace}Module.cpp` or `{Namespace}EditorModule.cpp` |

**Behavior:** Adds `#include "Source/{component_name}.h"` and inserts `{component_name}::CreateDescriptor()` into the `m_descriptors.insert(...)` block.

---

### register_system_component

Adds the component to the `GetRequiredSystemComponents()` list so it activates automatically.

| Arg | Type | Description |
|---|---|---|
| `component_name` | string | Full component class name |
| `module_kind` | string | `"runtime"` (default) or `"editor"` |

**Behavior:** Adds `#include` and inserts `azrtti_typeid<Namespace::ComponentName>()` into the `return AZ::ComponentTypeList{ ... }` block.

---

### register_interface_header

Registers an interface header (e.g. `PlayerHealthInterface.h`) in the gem's INTERFACE or API build target.

| Arg | Type | Description |
|---|---|---|
| `component_name` | string | Base name (without suffix) -- the wizard looks for `{component_name}Interface.h` |

**Behavior:** Locates the interface header under `Include/{Namespace}/`. Scans CMake targets to find an INTERFACE or API target. Adds the header to that target's file list.

---

## General Commands

These commands run regardless of the `--automatic-register` setting.

---

### add_gem_dependency

Adds a gem dependency to the current build target's `BUILD_DEPENDENCIES` block in CMake.

| Arg | Type | Description |
|---|---|---|
| `dependency` | string | Dependency specifier, e.g. `Gem::GS_Cinematics.API` |

**Behavior:** Finds the `o3de_add_target` / `ly_add_target` block for the current build target. Inserts the dependency under `BUILD_DEPENDENCIES > PRIVATE` if not already present. Includes a **self-dependency guard** -- if the dependency resolves to the same gem as the current namespace, the command is skipped.

---

### copy_file

Copies a file from one location to another within the gem directory.

| Arg | Type | Description |
|---|---|---|
| `source` | string | Source path relative to gem root |
| `dest` | string | Destination path relative to gem root |

---

### copy_setreg

Ensures the `Registry/` directory exists for setreg file placement.

| Arg | Type | Description |
|---|---|---|
| `setreg_name` | string | Name of the `.setreg` file |

**Behavior:** Determines the correct `Registry/` directory based on the gem's directory structure (`Gem/`, `Code/`, or root-level).

---

### register_asset_setreg

Configures the O3DE Asset Processor to recognize a custom data asset file extension.

| Arg | Type | Description |
|---|---|---|
| `asset_name` | string | Asset class name |
| `asset_ext` | string | File extension to register (default: `"mydata"`) |

**Behavior:** Reads the asset class UUID from its C++ header (via `AZ_RTTI` / `AZ_TYPE_INFO` macros). Writes an `RC` entry into the gem's `.setreg` JSON under `Amazon > AssetProcessor > Settings`, mapping the file extension to the asset type GUID.

---

### register_generic_asset

Registers a `GenericAssetHandler` in the gem's `DataAssetSystemComponent`.

| Arg | Type | Description |
|---|---|---|
| `asset_name` | string | Asset class name |
| `asset_ext` | string | File extension (default: `"mydata"`) |
| `asset_group` | string | Asset browser group (default: `"Other"`) |

**Behavior:** Adds `#include` for the asset header, inserts a `GenericAssetHandler` registration block into `Activate()`, and adds a `::Reflect(context)` call in `Reflect()`.

---

### replace_text

Performs find-and-replace on a generated source file. Useful for injecting variable values into template placeholders that are not standard O3DE template variables.

| Arg | Type | Description |
|---|---|---|
| `component_name` | string | Filename to search for in the generated output |
| `text_to_replace` | string | The literal text to find |
| `replacement` | string | Static replacement text (use this **or** `replacement_var`) |
| `replacement_var` | string | Name of an input variable whose value becomes the replacement |

**Example** -- replacing a channel placeholder with a user-provided value:

```json
{
    "command": "replace_text",
    "args": {
        "component_name": "${Name}_Reactor.h",
        "text_to_replace": "${PulseChannel}",
        "replacement_var": "pulse_channel"
    }
}
```

The `pulse_channel` value comes from the template's `input_vars` and is provided by the user at creation time.
