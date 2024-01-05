---
linktitle: Script-Only 'Quick Start' Projects
title: Script-only 'Quick Start' Projects
description: Describes how Script-only 'Quick Start' projects work in O3DE
weight: 100
toc: true
---

Projects in O3DE can be created in a mode which disables all C++ compiling and linking, including the downloading of any libraries that would otherwise be used by those linkers.  In this 'Script-only' mode, the project can only make use of pre-compiled gems and components, from shared libraries, but can still otherwise use Lua and Script Canvas to create game logic, and Python to create editor tooling.

Script-only mode is also known as "Quick Start" mode, because the lack of need to compile anything using C++ or link anything means that the 'build time' for the project is very quick (seconds), and iteration can be much faster.

The down-side of Script-only mode is that no C++ components can be created and used by the game project itself, unless they are pre-built by other means and injected by some other build system, and all existing libraries used must also be pre-built, such as the ones that are included using the installer layout of the engine.

Third party gems and plugins can only be used if they are also pre-built.

Despite these limitations it is a way to quickly get into the editor and start creating immediately, without downloading a compiler and without downloading any additional c++ development libraries such as the Qt SDK.

## Creating a Script-only Project
You can create a new Script-only project by using the ScriptOnlyProject [template](/docs/user-guide/build/templates.md), see the [Creating Projects](/docs/welcome-guide/create) document for more information.

You can also convert an existing project into a Script-only project by modifying the `project.json` file in the root.  The flag that determines whether a project is script-only is the following tag at the root of a `project.json`:
```json
"script_only": true,
```

The default value is false, so projects without this tag are not script-only.
If you do convert an existing project to script only, you may need to remove any C++ modules that already exist in it, or disable them from the build system, or encounter errors.

You may also have to copy the `EngineFinder.cmake` file from an existing script-only project (or the script-only project template in the `templates` folder) into the project's cmake subfolder.

## Converting a Script-only project to a compiled project

To switch back to a 'normal' project, flip the same above flag to false, or remove it from the `project.json`.
You can then start adding C++ components to your project or use the [template](/docs/user-guide/build/templates.md) system to instantiate new c++ components.  You may need to modify the CMake build files to include new subdirectories containing code, just like any project.

## Shipping a Script-only project
Script-only projects do include a script at the root to export the project into a standalone project.  See the [Project Export](content/docs/user-guide/packaging/project-export) documentation for details on how project export functions, as it is the same export system used as regular projects.

## Trade-offs to be aware of

### There is no monolithic build
Because no C++ compiler or linker is involved and no 3rd party libraries are downloaded, packaging and releasing a script-only mode project will ship as a generic dynamically linked game launcher, as opposed to a final release monolithic executable.  This means the final package will be larger and contain Shared Libraries (DLLs on Windows) instead of one giant monolithic executable.  

Making such an executable would require a compiler and linker.  You can always switch it to a regular project or even modify the package script to temporarily do so before building it, by automating the modification of `project.json` by your build pipeline as it calls the export script, if you want to still make use of monolithic builds but leave it as a script-only project.

### All modules and gems you use must already be compiled
Because there is no compiler or linker involved, all gems you activate and all other 3rd party content you need to use must be in a form that lets CMake use them without having to compile them (For example, pre-compiled dll files, as opposed to static libraries with headers).  When using the pre-built engine from an installer (or making your own) this is the case for all gems included with the engine.  Some 3rd Party gems downloaded from other websites may only contain source code, or stub of source that is compiled and linked into the game.  These gems will not function in Script-only mode unless the developer of those gems creates and ships special pre-compiled versions of them, perhaps using the pre-built gem [Template](/docs/user-guide/build/templates.md).

## How it works (Technical description)
When CMake configures O3DE, one of the scripts in the project (`EngineFinder.cmake`) sets a global CMake property `O3DE_SCRIPT_ONLY` to `TRUE`.  This happens before the CMake project command, and thus before CMake auto-selects a compiler.  When this is `TRUE`, the CMake scripts from O3DE which would normally configure compilers, linkers, and other build tools will instead set a null compiler, which is a simple program that always returns success.

CMake is still invoked just like a 'real' project, but all compiling and linking operations are essentially instantaneous and always succeed (without actually emitting any binaries).  But because all binaries are pre-built in an installer (and the Script-Only project contains no custom binaries), this is enough to build and run the editor and game.

Third Party packages are also skipped downloading during CMake configure and instead, the Third Party libraries that would normally be fetched are synthesized just from their shared libraries and other files.  The list of shared libraries and the dynamic linkage information in the dependency tree is gathered when CMake is configuring and building the installer image.  During that process, a script located in `cmake/3rdParty/script-only-mode/PostProcessScriptOnlyMappings.cmake` runs during build time based on information emitted about third party libraries (such as their required extra files or shared libraries) at configure time.  This script essentially generates a CMake file containing fake 'imported' 3rd Party targets to supply the necessary shared libraries and other files that would otherwise come from 3rd Party packages, and points them at their counterparts that ship as part of the installer instead.

Finally, a 'fake' game launcher for the project is declared to CMake which depends on a pre-built generic game launcher executable.  This generic game launcher is built as part of the install image build, and will read project.json to determine the project name and other information instead of relying on data burned into the binary.

Because the compiler and linker are fake, CMake will not actually compile or link this 'fake' target, but will still consider it to have succeeded, and copy the things it depends on (recursively) to the binaries folder, which is how the generic game launcher and all its dependencies end up in the binaries folder.

This means that developers wishing to support Script-only mode for their modules can do so, but would need to ship with pre-built shared libraries which are exposed as `add_library(name SHARED IMPORTED GLOBAL)` in cmake and list their runtime dependencies in that declaration using normal cmake conventions. 
  