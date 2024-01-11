---
linktitle: Project and Gem Templates
title: Project and Gem Templates
description: Learn about the project and gem templates available in O3DE
weight: 100
toc: true
---

O3DE includes a template system, which you can use to create new projects, new gems, or new snippets of code for the engine based on those templates.  The default engine from installer or github includes a few basic templates, but more can be downloaded as part of gems or repositories and added to the engine.

You can find all the existing templates in the root of the engine in the `templates` sub-folder.  They operate by copying their template files into a folder of the user's choosing and replacing certain placeholder text in those files, such as project name, with the actual name given by the user.

## Project templates included with the engine
These templates are for entire projects, which can be created using the Project Manager and then opened to work on in the Editor.
For a guide on how to create projects from template, see [Creating Projects Using Project Manager](/docs/welcome-guide/create/creating-projects-using-project-manager). 

### DefaultProject
This is a good all-round starting point for a game project using O3DE.  It comes with a script to export the project into a shippable standalone package.  It has a number of gems active by default, including ones for UI, basic prototyping, Script Canvas and Animation, among others.  Using this template requires a C++ compiler installed and it includes a basic c++ game module that can be used to write core game logic and components.

### ScriptOnlyProject
This has an identical gem selection to DefaultProject, but disables all C++ compiling and linking.  The project is still able to use the Lua and Script Canvas capabilities of the engine, but cannot have custom c++ code embedded or use other gems or modules that are not pre-compiled.  It can be used to get a quick look at the engine and editor without having to compile a project, download 3rd party libraries, or install a compiler or linker.   You can convert a Script Only project to a regular project at a later time. 

See the [Script-only 'Quick Start' Projects](/docs/user-guide/build/script-only-projects.md) documentation for more information about this feature.

### MinimalProject
This has as few gems active as possible, and is a bare-bones starting point.  It is not recommended to use this template as-is, but rather start with it and then activate what gems you might need for your project.   Because it activates as little as possible, and includes as few other gems as possible, it has the quickest startup time and asset compilation time.

## Notable Gem templates included with the engine
These templates are for making your own custom gems that can be used to extend the engine and reused across projects.
To create gems and other components from template, the command line utility must be used, similar to how projects are created using the CLI in [Creating Projects using CLI](/docs/welcome-guide/create/creating-projects-using-cli), but with a different command (`create-gem`) and different argument (`--gem-path`) to supply the output folder.

linux example:
```shell
scripts/o3de.sh create-gem --help
scripts/o3de.sh create-gem --gem-path $HOME/O3DE/Projects/MyProject/Gem/MyGem -tn AssetGem
```

windows example:
```cmd
scripts\o3de create-gem --help
scripts\o3de create-gem --gem-path %USERPROFILE%\O3DE\Projects\MyProject\Gem\MyGem -tn AssetGem
```

### AssetGem
This template can be used to create a gem that contains only assets, no code, and does not require C++ compilation to use.  Ideal for creating buckets of assets you would like to reuse between projects or package and ship without any code attached.  It can still contain Lua scripts, as well as Script Canvas, or Python for tooling.

### CppToolGem
This template can be used to create new C++ tools for the Editor.  It contains a scaffold of C++ code that will cause a component to be registered with the Editor and has place for you to start adding your custom Tool code.

### PythonToolGem
This template can be used to create new tools for the editor written in Python.  Python can be used to access the Engine and Editor APIs, and it can also use Qt For Python to create new panels and UI elements.  It contains a bootstrap script which will automatically be called on startup if the gem is active, as well as an example Qt Dialog written in Python that it registers with the View Pane system of the Editor.

### DefaultGem
This template is meant for use when developing a more comprehensive gem that contains code that runs in the engine in standalone mode, as well as code that runs in the Editor and tooling side.  It contains those two modules, as well as the boilerplate used to register and activate those two modules in the appropriate location. 

### GraphicsGem
This template is meant for use when creating a gem which Atom rendering APIs.  Most suitable when adding a new rendering feature to the engine.  It includes a module which registers itself with the engine and a Feature Processor which hooks into Atom, letting you start writing your rendering feature immediately.

### UnifiedMultiplayerGem
This template contains the scaffolding of a Gem that will plug into the multiplayer system of the engine and support differing behavior between the client and server (including a Unified launcher that has both behaviors). It includes a Tool-side module as well as an Engine-side module and component.  See the [Multiplayer Documentation](/docs/user-guide/networking/multiplayer) for more information.

### PrebuiltGem
This template contains instructions and a starting layout for a gem that can be shipped as a pre-built library (with only header files, no source code).  It shows how to hook into existing static or shared libraries instead of shipping the source, as well as how you might structure the shippable tree of a Gem if you want it to work without compiling on the user's side.  Pre-built gems are the only way to ship gems that work with Script Only Mode.

## Other templates included with the engine
These templates can be used to save time with boilerplate code, and are used by telling the CLI to inject them into existing projects or gems, as they contain a fragment of code or assets and are not functional standalone.  The CLI command `create-from-template` should be used to instantiate the template, with the `-dp` destination path supplied where to put the instantiated template and the `-tn` argument being the name of the template.

linux example:
```shell
scripts/o3de.sh create-from-template --help
scripts/o3de.sh create-from-template -dp $HOME/O3DE/Projects/MyProject/Gem/MyGem/MyComponent -tn DefaultComponent
```

windows example:
```cmd
scripts\o3de create-from-template --help
scripts\o3de create-from-template --gem-path %USERPROFILE%\O3DE\Projects\MyProject\Gem\MyComponent -tn DefaultComponent
```

### DefaultComponent
This template contains a simple component that can be injected into an existing gem or project.  This saves you boilerplate typing when adding new components to an existing code-base. It includes an interface header that allows you to immediately start adding EBus messages to talk to the component.

### GemRepo
This template contains the scaffold of a Gem Repository.  Users can add the URL of a Gem Repository to their Project Manager and the Gems inside that repository will become available for use.  See the [Gem Repository Overview](/docs/user-guide/gems/repositories/overview) for more information.

### RemoteRepo
This template contains the scaffold of a Remote Repository.  See the [Remote Repository](/docs/learning-guide/tutorials/remote-repositories/create-remote-repository) documentation for more information.

### ScriptCanvasNode
This template contains the scaffold of a Script Canvas Node which can be added to an existing codebase to supply new Script Canvas nodes to the engine and editor.  Instantiating this template will result in the XML files as well as code, header, and CMake files required to hook into the Script Canvas system.  See the [Script Canvas Custom Nodes](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/_index.md) documentation for more information.


