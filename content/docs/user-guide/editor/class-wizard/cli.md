---
title: "CLI Quick Start"
linkTitle: "CLI"
description: "The four things you'll do most from the command line."
weight: 20
---

Run these from your O3DE engine's `Tools/ClassCreationWizard/` directory.

## To Launch the GUI

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "C:\MyProject"
```

Both flags are required. See [Getting Started](../getting-started/) for the GUI walkthrough.

## Request help

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "C:\MyProject" --list-templates
```

Lists every template the wizard found, from the engine, your project, and your gems.

## Request a template's format

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "C:\MyProject" --template-help default_component
```

Prints that template's full command: every flag it adds, its defaults, and the commands it will run.

The result will look like:

```text
Template: Basic Component
  Class Name:  default_component
  Description: A standard game component with optional interface header and optional editor adapter component.
  Suffix:      Component

  Full Command:
    python ClassWizard.py \
      --engine-path  <engine-path>   (required)
      --project-path <project-path>  (required)
      --template     default_component
      --component-name <Name>         (required)
      --namespace      <GemName>       (required)
      --automatic-register             (optional: register in CMake + modules)
      --keep-comments                  (optional: preserve template comments)
      --default-license                (optional: include license header)
      --add-bus-interface                (optional)
      --include-editor                   (optional, needs hasEditor)

  Template-Specific Arguments:
    --add-bus-interface        Add Bus Interface  default: True
      Create the Interface Bus header file
    --include-editor           Add Editor Comp.  default: False  [show_if: hasEditor]
      Generate an EditorComponent wrapper that appears in the Editor Inspector and exports the runtime component at game-mode

  Commands (6 total):
    register_file_list(component_name=${Name}${ComponentSuffix})
    register_module_descriptor(component_name=${Name}${ComponentSuffix}, module_kind=runtime)
    register_interface_header(component_name=${Name})  [if add_bus_interface]
    register_file_list(component_name=Editor${Name}${ComponentSuffix})  [if include_editor]
    register_module_descriptor(component_name=Editor${Name}${ComponentSuffix}, module_kind=editor)  [if include_editor]
    replace_text(component_name=${Name}${ComponentSuffix}.cpp, text_to_replace=AppearsInAddComponentMenu, AZ_CRC_CE("Game")), replacement=AppearsInAddComponentMenu, AZ_CRC_CE(""))  [if include_editor]
```

Notice that `--add-bus-interface` already defaults to `True`, and `--include-editor` defaults to `False`. This is why the create command below doesn't need to pass either flag. To turn a default-`True` toggle like `add_bus_interface` off, use the GUI instead. See [Template-Specific Flags](/docs/engine-dev/tools/class-wizard/cli/#template-specific-flags) in the Developer Guide.

## Create a Basic Component

```bash
python ClassWizard.py --engine-path "C:\o3de" --project-path "C:\MyProject" \
    --template default_component --component-name PlayerHealth \
    --namespace MyGem --automatic-register
```

---

This covers the basics. For the complete flag reference, exit codes, and a worked example for every template, see the [CLI Reference](/docs/engine-dev/tools/class-wizard/cli/) in the Developer Guide.
