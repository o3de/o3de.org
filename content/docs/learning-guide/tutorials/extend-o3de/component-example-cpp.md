---
linkTitle: Create a Custom Component in C++
title: Create a Custom Component in C++ to Extend Open 3D Engine
description: Learn how to extend Open 3D Engine (O3DE) by creating a custom Component in C++.
weight: 100
toc: true
---

In this document, I create a set of c++ components step by step, and integrate it with O3DE, as a tutorial for others to follow and learn.

This document is not just to give the TLDR bare minimum steps to follow without understanding anything, but instead to guide the person following along with it, with an understanding of how it actually works so that they can make choices for their game and plugins that make sense.

Table of contents
- [End Goal](#end-goal)
- [Background Info: Gems, Components, Modules](#background-info-gems-components-modules)
- [Exercise 1 - Create a new project for this walk-through, and inspect it](#exercise-1---create-a-new-project-for-this-walk-through-and-inspect-it)
  - [End-of-exercise summary](#end-of-exercise-summary)
- [Exercise 2 - 'Architect' your new component](#exercise-2---architect-your-new-component)
- [Exercise 3 - Create the component C++ scaffolding and hook it into the project](#exercise-3---create-the-component-c-scaffolding-and-hook-it-into-the-project)
  - [Adding the files to the build system](#adding-the-files-to-the-build-system)
  - [What does the above do?](#what-does-the-above-do)
  - [Compile and run](#compile-and-run)
- [Exercise 4 - Writing the functionality in the new component](#exercise-4---writing-the-functionality-in-the-new-component)
  - [Add a dependency in your component on the Material component.](#add-a-dependency-in-your-component-on-the-material-component)
- [Exercise 4 - make it actually do something](#exercise-4---make-it-actually-do-something)
  - [Add component properties to the component class](#add-component-properties-to-the-component-class)
  - [Add the "DoFlash" API](#add-the-doflash-api)
  - [Make it actually flash when triggered](#make-it-actually-flash-when-triggered)
- [Exercise 5 - Editor components](#exercise-5---editor-components)
  - [CMake Changes](#cmake-changes)

## End Goal
* A C++ component which is 'full featured' enough to give someone the basics of common interaction with the engine and tools
* Somewhat useful component if possible, not a hello world
* Exposed to scripting, ebus, etc.
* Tools and Game component, so that it does something in the editor when not in "Run in editor" CTRL+G mode.

## Background Info: Gems, Components, Modules

You can skip this section if you understand how O3DE Gems relate to O3DE projects, and how the CMakeLists.txt files work in a Gem.  Just create a project to follow along with, and skip straight to `Step 2`.

Components are the primary way to add new functionality to O3DE.  It doesn't matter if what you're making is a new always-on system (Such as an audio backend or service that is globally available) or a single piece of functionality you want to put on a single entity somewhere in a single level, that functionality ends up being in a component, or at least the life cycle of the system is managed by a component.

The O3DE documentation does go over this here: https://www.docs.o3de.org/docs/user-guide/programming/gems/overview/ but I will try to simplify and summarize:

* O3DE's calls its plugins "Gems".  
* A Gem is defined literally as any folder containing a valid `gem.json` and `CMakeLists.txt` at its root.
  * The `gem.json` file gives it simple properties like its `gem_name`, simple description, author, license, etc.
  * The `CMakeLists.txt` file tells the build system how to use it.  Most of the time, this file recurses into additional `CMakeLists.txt` in subfolders.  It does not have to contain build system instructions to build binaries.  
     * For example, a Gem that only contains art assets and no C++ code might have a very simple `CMakeLists.txt` that just notifies the Asset system that the assets in the gem should be made available to the asset system, and no build system instructions related to compiling C++.
     * On the other hand, a really complicated Gem's `CMakeLists.txt` might specify several static libraries, dynamic libraries (.so or .dll), and even standalone executables, and also how and when the O3DE ecosystem of applications should load them, and which ones should be loaded where.  The architecture of the internals of the Gem and what it contains is up to the author of the Gem.

* To make a project in O3DE you must create a game project using the Project Manager application, or its CLI.
* To O3DE, a game project is any folder containing a valid `project.json` and a `CMakeLists.txt` at its root.
  * The `project.json` file gives it simple properties like its `name`, simple description, author, license, etc.
  * `project.json` also includes a list *by name* of which Gems should be active for this project.
  * `project.json` also includes a list *by relative path* of folders containing additional Gems that are project-specific.

* When you tell a project to build, the build system will search for any matching gems that the project wants, in all the known folders where gems are found, including any that are listed in `project.json`.  When it finds a match, it executes that Gem's `CMakeLists.txt` build script as part of building the project.
* The Gem's `CMakeLists.txt` describes which c++ files (if any) are to be compiled into which libraries (`.dll`, `.so` files), and which libraries should be loaded into which programs that are part of O3DE.  
  * For example, a 'Weather' gem might inform the build system that `Weather.dll` must load into the game runtime, but `Weather.Tools.dll` must load into the Editor and Material Editor instead.

Given the Background Information above, you can understand how this works via the below exercise which is the first step in this walk through:

## Exercise 1 - Create a new project for this walk-through, and inspect it

You can skip this the first step below if you already have an example project you have created using the Project Manager. 
1. create a project based on the Default Template.  You don't have to build it to follow the next steps, it is enough to just create it.
2. look at that project's `project.json` file.

I will call this project ExampleFlash but you don't have to.

(example below, with `...` ellipsis to skip parts we don't currently care about)

```json
{
    "project_name": "ExampleFlash",
    "version": "1.0.0",
    ...
    "external_subdirectories": [
        "Gem"
    ],
    ...
    "gem_names": [
        "ExampleFlash",
        "Atom",
        "AudioSystem",
        "CameraFramework",
        ...
    ],
    ...
}
```

3. Notice that `project.json` will have a gem in its `gem_names` list **named the same** as the project, `ExampleFlash` in the above snippet.
4. Notice that `project.json` will have a subfolder called 'Gem' listed in `external_subdirectories` - this is the extra folders for the build system to scan for gems that are project specific.  These paths are relative to the project, so `"Gem"` means its talking about the `project folder/Gem` subdirectory.
5. Notice that the project does indeed have a `Gem` subfolder.  That folder has a `gem.json` and a `CMakeLists.txt` in it, which means its a valid Gem.
6. Notice that the `gem.json` in the Gem subfolder gives the gem the same name as the project.

```json
{
    "gem_name": "ExampleFlash",
    ...
}
```

This all means that when building the project, o3de will read `project.json` and add the `Gem` subfolder of the project to the list of all the places it looks for gems.  It will then step through the list of Gems active for the project (`gem_names` property) and try to find each one by name, in all the places it looks for gems.   It will find a Gem with the matching name as expected, so it will activate the `CMakeLists.txt` in that folder as part of the build process.

Note that this gem could have been called anything.  It did not have to be named the same as the project, and it did not have to be in a folder called `Gem`.  

Projects can also contain more than one gem, or even zero gems.

7. Now let's look at the `CMakeLists.txt` for the gem for curiosity's sake.  The important lines are where it declares `targets`.  Targets are how CMake declares things like executables, `dll` or `so` files, or `lib` or `.a` static libraries.  Even if you're not familiar with CMake, this is a pattern you can follow by copy and paste.

```cmake
...
ly_add_target(
    NAME ${gem_name}.Private.Object STATIC
    NAMESPACE Gem
    FILES_CMAKE
        exampleflash_files.cmake
        ${pal_dir}/exampleflash_${PAL_PLATFORM_NAME_LOWERCASE}_files.cmake
    INCLUDE_DIRECTORIES
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            AZ::AzGameFramework
            Gem::Atom_AtomBridge.Static
)
```

To ease understanding, I'm going to use the example of the Gem I called `ExampleFlash`, so `${Gem_Name}` will resolve to `ExampleFlash` 

The above section declares a `STATIC` library.  On windows this will result in `ExampleFlash.Private.Object.lib`.  On others operating systems, it may end with the `.a` extension instead of `.lib`.  In CMake, things generally avoid mentioning their operating specific file names and prefer to refer to each other by their target name.

In this case, it puts it in the `Gem` namespace so this target will be referred to elsewhere (things that depend on it) by its full name `Gem::ExampleFlash.Private.Object`, even though under the hood, on Windows, this will generate a `ExampleFlash.Private.Object.lib` file in the build folder.

The `FILES_CMAKE` section contains `exampleflash_files.cmake` which it will read to get the list of c++ files to compile into this library.
This file is just a simple list of cpp/h files to compile into that static library.

```cmake
set(FILES
    Include/ExampleFlash/ExampleFlashBus.h
    Include/ExampleFlash/ExampleFlashTypeIds.h
    Source/ExampleFlashSystemComponent.cpp
    Source/ExampleFlashSystemComponent.h
)
```

Note that it lists one cpp file to be compiled - `Source/ExampleFlashSystemComponent.cpp` - the rest of them are headers.  For the purpose of compiling things, the header files don't need to be listed here.  But since this is also used to generate Visual Studio or other projects, the header files are included so that they can show up in the project explorer of the IDE for easy access.  Only the CPP file is actually compiled.

There is also a file list for `${pal_dir}/exampleflash_${PAL_PLATFORM_NAME_LOWERCASE}_files.cmake`.  O3DE has a PAL (Platform Abstraction Layer) which allows you to put different code for different platforms in your gem.  Platform names are like "Linux", "Windows", "Mac", "Android" and so on, and the "Pal_dir" will be a directory called `Platform/...` in your gem.  This is only necessary if you need to write platform-specific code, which is not the case most of the time.
 
The `INCLUDE_DIRECTORIES` section lists what include directories are to be declared for this static library while it is being compiled.  They are relative to the `CMakeLists.txt` file.  So it specifying just the string `Include` really refers to the folder `Include` in the same folder that the CMakeLists.txt file is in.

The `BUILD_DEPENDENCIES` section lists what other targets to depend on, by the target name.   So this one will depend on `AZ::AzGameFramework` which is a target declared by the engine itself, as well as `Gem::Atom_AtomBridge.Static` which is a target inside the Atom gem from the engine folder.  When you specify build dependencies to CMake, the build system figures out what needs to be done to support the build dependency, based on what that target declares itself as.  You merely need to list the dependency by name.

`INCLUDE_DIRECTORIES` and `BUILD_DEPENDENCIES` as well as some other properties that are available declare the visibility (PRIVATE, INTERFACE, or PUBLIC) of the include directory or dependency.  `PRIVATE` means that it applies only to this target being compiled.  `PUBLIC` means that it applies to this target, and also, anything else that depends on this target too (recursively applied).  `INTERFACE` means it only applies to things which use this target, but not the target itself.  In this case, its saying that the `Include` directory is `PUBLIC` and the `BUILD_DEPENDENCIES` are `PRIVATE`.  There can be a mixture.

The next target the Gem's `CMakeLists.txt` declares:

```cmake
...
ly_add_target(
    NAME ${gem_name} ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        exampleflash_shared_files.cmake
        ${pal_dir}/exampleflash_shared_${PAL_PLATFORM_NAME_LOWERCASE}_files.cmake
    INCLUDE_DIRECTORIES
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            Gem::${gem_name}.Private.Object
            AZ::AzCore
)
...
```

Dissecting this, it is declaring a module (`dll`) called the same name as the gem (so in my example, it would result in `ExampleFlash.dll`).  

Instead of using the keyword `STATIC` or `SHARED`, it declares it using the special variable `${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}` which results in a shared library (so a `.dll` module) on platforms and configurations that support dynamic linking, and a static library when linking in static 'monolithic' mode or when the platform being built for does not support dynamic linking.  Most of the time, this just results in a `.dll` on windows, as the variable will resolve to `SHARED`, which to CMake, means generate a shared library, aka, a dynamic library, aka `.dll` file.

As before, it has a `FILES_CMAKE` that are file lists, containing which files are part of the compile for this particular `ExampleFlash.dll`.  In this case, its `exampleflash_shared_files.cmake` which looks like this:

```cmake

set(FILES
    Source/ExampleFlashModule.cpp
)
```
Just one file, the Module file.  All dynamic binaries loaded by any O3DE executables must contain exactly one Module, as it serves as the entry point into the system and registers everything else.

Of note, it also specifies the `Include` folder, but since it `DEPENDS` on the previous target we looked at (`Gem::${gem_name}.Private.Object`), and that target exports `Include` as a `PUBLIC` include directory, this is redundant as it will inherit that anyway.

The only other section of interest here, is the section that tells the engine what modules from the gem should be loaded into what programs.  Its this section:

```cmake
ly_create_alias(NAME ${gem_name}.Builders NAMESPACE Gem TARGETS Gem::${gem_name})
ly_create_alias(NAME ${gem_name}.Tools    NAMESPACE Gem TARGETS Gem::${gem_name})
ly_create_alias(NAME ${gem_name}.Clients  NAMESPACE Gem TARGETS Gem::${gem_name})
ly_create_alias(NAME ${gem_name}.Servers  NAMESPACE Gem TARGETS Gem::${gem_name})
ly_create_alias(NAME ${gem_name}.Unified  NAMESPACE Gem TARGETS Gem::${gem_name})
```

To explain this section, this is how this gem communicates to O3DE and tells it which targets it declared above in its `CMakeLists.txt` file should be loaded into what programs inside O3DE. 

O3DE doesn't actually care about what targets, static libraries, dlls, whatever a gem author includes in their Gem.  It only cares about which modules must be loaded into which of its application.   O3DE classifies all of its applications into one of these 5 buckets:
 * `Clients` are the game runtime, or things like the game runtime, which run the simulation standalone, not in the editor
 * `Tools` are any user-facing tool - so the Editor and Material Editor are `Tools`.
 * `Builders` are the asset compression pipeline, so AssetProcessor and its related AssetBuilder systems
 * `Servers` are standalone dedicated servers that don't have client functionality ("headless" servers)
 * `Unified` are applications which can be standalone game clients as well as servers.  For P2P games, for example.

Those 5 category are reserved names and are the only thing O3DE actually cares about.

Essentially, when a Gem with name `ExampleFlash` is active, any O3DE Tools like the Editor will load anything declared here `ExampleFlash.Tools`.  If there is no `ExampleFlash.Tools` it will not load anything into the editor for that Gem. 

So the above block is *aliasing* `ExampleFlash.Tools` to the one `ExampleFlash.dll` that it produces (It uses target name, not file name, so that its platform independent - this is why it aliases the `TARGETS` `Gem::ExampleFlash`).  It is also aliasing that same `ExampleFlash.dll` target to the `ExampleFlash.Clients` name, and `ExampleFlash.Servers` and so on meaning that game runtime clients will *also* load `ExampleFlash.dll`, and so will servers, and in fact, all the different executables.

This section is vital, as it is the section that allows the creation of Editor-specific, or Server- or Client- specific dlls containing C++ code just for those executables.  Using Aliases in this manner is also what allows you to re-use the same target (as in, the same `.dll`) for multiple different cases.  In this default project case, it only produces one module, and thus re-uses it for every application.  It is also a `TARGETS` list (so it can list multiple targets, in case the gem splits its functionality into a set of smaller DLLs and they don't all apply in all circumstances.

### End-of-exercise summary

The default gem we generate when we create a default project:
* Contains 2 targets
* One is a static library considered PRIVATE to the gem, and no other gem should ever interact with it.
* One is a public dynamic library, and that's the one that is aliased in such a will cause the editor to load it.
* It specifies that the dynamic library should be loaded into all executables in the O3DE ecosystem (including the editor).

## Exercise 2 - 'Architect' your new component
Specifying the basics what you need for your component before you begin can help plan it out.

In our case, I went with a simple component that is theoretically useful and reusable but not particularly complicated - something which has an API, and when triggered, will cause the attached entity to 'flash'.  To be more specific, it will animate a material parameter of the attached entity, when triggered by an EBUS event.

To find out how it will flash and to do it as simply as possible for the purposes of this tutorial the best way to do it would be to open the editor and mess around, so I create a new level based on the default (with the shader ball) and then open the material editor to play around with material properties to see if I can make one that flashes or overrides the color. 

In the end, there are many ways to do this - writing a custom shader, using material canvas to make a new shader with an extra "additive" color channel on top, etc.  But in the interest of the least possible complexity here, I'm going to go with using the `emissive` channel on a material, and using the material editor, you can test it out by clicking sliders and stuff.  Looks like I'm going to need a way to toggle emissive on, and change color and intensity.  

![image](https://github.com/user-attachments/assets/e3992fdc-05ab-48ad-84f7-38ed8d0bc713)

Hovering over properties, even gives the "script name" of the property:

![image](https://github.com/user-attachments/assets/d8c15cb9-5497-4948-8b8a-d3aa05a9fb0d)

I'll plan for it to take the following parameters
* Color
* Intensity
* Duration (In Milliseconds)

In order to keep this simple I'm not going to offer options like pulsing/repeating/etc but it would not be hard to do that.

When its activated, I'll need to 
* set Material Param `emissive.enable` to True
* set Material Param `emissive.color` to the color
* set Material Param `emissive.intensity` to intensity (fading over time)

`MaterialColorFlash` seems like a good name for it.

If that was the only effect I wanted, I would not need an editor component.  It doesn't technically need to do anything in the editor to function, except offer the above properties.  It can flash in game when triggered by EBUS which can be script driven too.

But, for the purposes of this walkthrough, and for easy tweaking, I want to add a "preview it" option that makes it actually show its effect in the editor.

## Exercise 3 - Create the component C++ scaffolding and hook it into the project

We could type it all manually, but o3de comes with a template system (Not C++ templates in this case, but example files that it can copy into your project and find n' replace tokens in them to skip boilerplate work.)  

See https://www.docs.o3de.org/docs/user-guide/build/templates/ for information about what templates are available.

In this case I'll be using DefaultComponent template ( https://www.docs.o3de.org/docs/user-guide/build/templates/#defaultcomponent )

All that using o3de's template system actually does is copy files out of the Templates folder into the target folder and do a find and replace operation.  You can browse the templates in the engine's install folder in the Templates subfolder.

To use it, we open a command prompt from the o3de engine folder (wherever you cloned or installed the engine) and use the CLI.

If we take a look at the template before using it, we can see what its going to do:
![image](https://github.com/user-attachments/assets/425c5d51-66e7-4e30-b044-eedfd2daee77)

Its going to add a file called `Include\${GemName}\${Name}Interface.h`
Its going to add a file called `Source\${Name}Component.cpp`
Its going to add a file called `Source\${Name}Component.h`

If we look at our current game project it has
`Gem\Include\GemName`
and 
`Gem\Source` folders already.  So it seems that we'd want the destination of this template to be that `Gem` folder.
We also want it to substitute `${GemName}` for `ExampleFlash` (the name of our gem) so the include paths line up.
For `${Name}` we probably want the name of our component, so `MaterialColorFlash`  should be `${Name}`

So we go into the engine folder and we instantiate the template

```
scripts\o3de.cmd create-from-template -dp C:\o3de-projects\ExampleFlash\Gem -tn DefaultComponent -r "${GemName}" ExampleFlash -dn MaterialColorFlash --force
```

you can always add `--help` to the command line of o3de.cmd or o3de.sh (linux) to see your options.  
Things of note:
 * `${Name}` is special, we are telling it to replace `${Name}` with `MaterialColorFlash` using the `-dn` (Destination Name) option.
 * `${GemName}` is being explicitly replaced using `-r "${GemName}" ExampleFlash`.  The other templates are for projects or gems, and would infer that value from the -gp or --gem-path command line option.  But since this template is not for an entire gem, just a piece of one, we need to specify it.

The result is the following added files in our project
 * (ProjectRoot)
   * Gem
     * Include
       * ExampleFlash (the gem name)
          * MaterialColorFlashInterface.h
     * Source
       * MaterialColorFlashComponent.cpp
       * MaterialColorFlashComponent.h

Now we need to actually hook those new files into our CMake system so they compile, and we need to register this component with the engine

### Adding the files to the build system
If we think back to the first exercise, we are going to have a static private library that contains all our components, and then a shared (dll) that just has the entry point and is there to register things.

This means that
* The interface (header) should go into some sort of API library for other systems to use it and represents your public API
* The cpp and h from Source are private, and should go into the private static library.

The DefaultProject's gem isn't really meant for sharing with others though, its `Gem` therefore doesn't have a declared API library for public API.  So for now, we'll put all of the files in the same place, the private static object.

First, let's take care of the cpp and h.  If you open the CMakeLists.txt file in (Project)/Gem you can find it  declare
```cmake
ly_add_target(
    NAME ${gem_name}.Private.Object STATIC
```
And its using `(gemname)_files.cmake` as the list of cpp/h to include in that static library.
So add the file to that `_files` file:

Modified `Gem/exampleflash_files.cmake`
```cmake

set(FILES
    Include/ExampleFlash/ExampleFlashBus.h
    Include/ExampleFlash/ExampleFlashTypeIds.h
    Source/ExampleFlashSystemComponent.cpp
    Source/ExampleFlashSystemComponent.h
    Include/ExampleFlash/MaterialColorFlashInterface.h   # new file added here
    Source/MaterialColorFlashComponent.h        # New file added here
    Source/MaterialColorFlashComponent.cpp      # new file added here
)
```

The only thing left is to 'register' the component on startup.  This prevents it from being deadstripped in the static library since nothing refers to it.
Open up (GemName)Module.cpp (for example, `ExampleFlashModule.cpp`) which is the one cpp file in the `gemname_shared_files.cmake` (the files that go into the shared library, the module DLL file).

Theres a special section in this file `// Push results of [MyComponent]::CreateDescriptor() into m_descriptors here.`
Follow the pattern:
```cpp
 // Push results of [MyComponent]::CreateDescriptor() into m_descriptors here.
            m_descriptors.insert(m_descriptors.end(), {
                ExampleFlashSystemComponent::CreateDescriptor(),
                MaterialColorFlashComponent::CreateDescriptor(),  // <--- add this new line
            });
```

You will also have to put
```cpp
#include "MaterialColorFlashComponent.h"
```
near the top of the file so that the `MaterialColorFlashComponent` class is in the current compile unit scope for you to be able to call CreateDescriptor on.

### What does the above do?
We now have a CPP file that represents the private code internals of the new component (`MaterialColorFlashComponent.cpp`) and a corresponding header file (`MaterialColorFlashComponent.h`).  This is a standard c++ header and implementation pair.  The header is not strictly necessary, since everything in both is considered private.  The only reason the header even exists is so that the module.cpp can include it and call CreateDescriptor.    You could in fact use `extern` to forward declare a function that returns descriptor and implement it in your cpp and not have to have a header at all.

We also have an interface header, which is what everything else will actually talk to the component using, it is basically your API header.  IF you were shipping a gem for others to use, the gem would contain this api header in a `GemName.API` target in the CMake file, and that API target would be the only thing that other gems would see and would use to talk to your component.  In this case, we are just using this internally for now, so we just add it to the rest.  It is this API header that we'll bind to the script context, etc, not the component itself.

Then we have hooked it up into the module.cpp.  If you think back to [Exercise 1](#exercise-1---create-a-new-project-for-this-walk-through-and-inspect-it) (optional if you already have a project), O3DE dynamically loads gems by loading their module dll during startup.  Diving a bit deeper into this, it specifically 
1. Loads the module dll file dynamically
2. Searches for an dll-exported entry point declared by the `AZ_DECLARE_MODULE_CLASS` macro, which you will find at the bottom of your module.cpp
3. Invokes that entry point function, which essentially just invokes `return new YourModuleClass` (where YourModuleClass is the class in that cpp file derived from AZ::Module).   That calls the constructor for the module class, which adds all the descriptors of the components to the `m_descriptors` member of the module class.
4. Loops over all of the `ComponentDescriptor` classes added to `m_descriptors` and uses that information to register them in the system so the engine knows about them.

A `Module Descriptor` is a class that is generated from the `AZ_COMPONENT_IMPL` / `AZ_COMPONENT_DECL` macros in your component.  (Or just `AZ_COMPONENT` if you manually wrote it and only want the one macro).  That macro makes a class called `${ComponentName}Descriptor` which knows how to 
 * Create new instances of the component (usually just `return new X`)
 * Destroy them (`delete X`)
 * Invoke some static functions on the component class to do with what services they provide and require
 * Invoke the static reflect function on the component class so it can declare itself to the serialization / edit systems
 * Provide some misc functions that for example, return a string name of the component, or a UUID of its type, and so on.

So having its component descriptor in the list allows O3DE to basically know about it, initialize it, etc.

### Compile and run

You can at this point compile and run the code, it will update and the new component will appear in the Add/Remove components menu on an entity in the editor.  CTRL+G will cause it to call its Activate() function, and ESC in ctrl+G mode will cause it to Deactivate()

## Exercise 4 - Writing the functionality in the new component

For our component to work, its going to need to have a Material component on it that it can talk to, so that it can apply that flash of color to some property on it.

Components can require other components be present for them to function correctly.  If you declare this in your component, it automatically makes the user add such a component to the entity with your component before the component activates.  It means you can *assume* that the other component is present and it also causes the editor to sort the component activation order such that the one you depend on will be activated before yours.  You don't have to do this, but if you don't you will have to make sure to check for the other component before using it, or write your code defensively so that it doesn't cause problems if the other component is missing.

### Add a dependency in your component on the Material component.

The way components define what components they depend on is

Component A declares that it "provides a service" and gives that service an arbitrary name.  
Component B declares that it "requires a service" and uses that same arbitrary name in its list of required service.

Note that the service names are arbitrary - any component can list any number of services it provides with arbitrary names. "I provide foo".   And another component says "I need any component which provides foo".   This is how you can have multiple different components that are compatible with one that needs a specific service.  An example of this is a component that needs some sort of defined volume to operate on can accept a SphereShape component, but also a AABBShape component, BoxShapeComponent, etc.  Those all "provide" a named service.  

To declare that you need a service, you overload your `GetRequiredServices` function, in your component, and then specify the name of a service that some other component returns in its overridden `GetProvidedServices` function. 

You need to know what the name of the services are, and this usually requires the source code, since its not clearly documented.   You can browse the o3de source code, but you'll find it in this case, in `Gems\AtomLyIntegration\CommonFeatures\Code\Source\Material\MaterialComponentController.cpp` 
```cpp
 void MaterialComponentController::GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided)
        {
            provided.push_back(AZ_CRC_CE("MaterialProviderService"));
        }
```

The "Material Component" (which derives from the MaterialComponentController, overrides `GetProvidedServices` function and returns the name `AZ_CRC_CE("MaterialProviderService")`

So we update our MaterialColorFlashComponent's `GetRequiredServices` function in its cpp file:

```cpp
void MaterialColorFlashComponent::GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
    {
        required.push_back(AZ_CRC_CE("MaterialProviderService"));
    }
```

Now if we run the editor and add this component to an entity, it shows up as disabled, until we add something which provides this service.  It even includes a helpful button that lets us browse all the components that provide it:  

![image](https://github.com/user-attachments/assets/30a615b5-5f43-4cef-84b4-4bb2f5e0fd24)  

![image](https://github.com/user-attachments/assets/feeeeb61-468e-4a0d-aad0-34b0c7ad54d6)

## Exercise 4 - make it actually do something

We need to fill out the code in the component so it actually makes a material flash when its told to and has the properties it needs for the user to interact with.

### Add component properties to the component class

First, let's add the properties to the component header (MaterialColorFlashComponent.h).  
In the `private:` section, we add
```cpp
// Properties displayed in the editor.
AZ::Color m_color = { 1.0f, 1.0f, 1.0f, 1.0f };
float m_intensity = 5.0f;
float m_durationMilliseconds = 1000.0f;
bool m_activateImmediately = false;

// properties not serialized or displayed in the editor since they track immediate state
float m_tickTimeRemaining = 0.0f;

I've added "m_activateImmediately" just so that if we want to test this thing right now, we can see it without having to trigger it via script or anything.
The above uses AZ::Color, so add `#include <AzCore/Math/Color.h>` at the top of the file.

### Register the properties with the engine/editor

Registration involves at least 2 parts
 * Telling the engine how to serialize the value (and that it should be serialized)
 * Telling the editor how to display the value (and that it should be displayed).

Not declaring a specific variable for serialize means it won't save it - this is okay if its a state variable that should not be saved.
Similarly, not declaring a variable for edit means it won't show up in the property editor (even if it is serialized).  This is also okay, if you want a hidden variable or something.

To register it, it goes in the `Reflect` function of its component - if you used a Template, this function is already started for you, and you can just add onto it.  

```cpp
    void MaterialColorFlashComponent::Reflect(AZ::ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serializeContext->Class<MaterialColorFlashComponent, AZ::Component>()
                ->Version(1)
                ->Field("Color", &MaterialColorFlashComponent::m_color)
                ->Field("Intensity", &MaterialColorFlashComponent::m_intensity)
                ->Field("DurationMS", &MaterialColorFlashComponent::m_durationMilliseconds)
                ->Field("ActivateImmediately", &MaterialColorFlashComponent::m_activateImmediately)
                ;

            if (AZ::EditContext* editContext = serializeContext->GetEditContext())
            {
                 editContext->Class<MaterialColorFlashComponent>("MaterialColorFlashComponent", "[Description of functionality provided by this component]")
                    ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                        ->Attribute(AZ::Edit::Attributes::Category, "ComponentCategory")
                        ->Attribute(AZ::Edit::Attributes::Icon, "Icons/Components/Component_Placeholder.svg")
                        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC_CE("Game"))
                    ->DataElement(AZ::Edit::UIHandlers::Color, &MaterialColorFlashComponent::m_color, "Color", "What color to apply to the material property")
                    ->DataElement(AZ::Edit::UIHandlers::SpinBox, &MaterialColorFlashComponent::m_durationMilliseconds, "Duration (ms)", "How long the effect fades out over.")
                        ->Attribute(AZ::Edit::Attributes::Min, 50.0f)
                        ->Attribute(AZ::Edit::Attributes::Max, 10000.0f)
                        ->Attribute(AZ::Edit::Attributes::Step, 50.0f)
                        ->Attribute(AZ::Edit::Attributes::Suffix, "ms")
                    ->DataElement(AZ::Edit::UIHandlers::SpinBox, &MaterialColorFlashComponent::m_intensity, "Intensity", "Light emissive intensity")
                        ->Attribute(AZ::Edit::Attributes::Min, 0.1f)
                        ->Attribute(AZ::Edit::Attributes::Max, 100.0f)
                        ->Attribute(AZ::Edit::Attributes::Step, 0.25f)
                    ->DataElement(AZ::Edit::UIHandlers::Default, &MaterialColorFlashComponent::m_activateImmediately, "Immediately Activate on start", "If checked, it will start on activate");
            }
        }
```

Lets go through this function to explain it more. The general shape of this function looks like this

```cpp
if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
{
    // register the class with the engine and teach it how to serialize it
    
    if (AZ::EditContext* editContext = serializeContext->GetEditContext())
    {
        // register the class with the editor and teach it how to edit it (depends on serialize)
    }
}

if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
   // bind it to scripting (Lua, Script Canvas, Python...)
}      
```

It works this way because during startup, the engine calls this function repeatedly - once with `context` being a Serialize context, once with `context` being a BehaviorContext.  During serialize, it also has a `editContext` active in situations where the editor exists - like, in the editor - but its `nullptr` in the runtime.  So always check.

```cpp
serializeContext->Class<MaterialColorFlashComponent, AZ::Component>()
                ->Version(1)
```

This is telling the engine serializer "There is a class, and it is called `MaterialColorFlashComponent` and it is derived from `AZ::Component` and it is version 1". 
Increment the version as you add or remove fields, so that the engine is okay with extra cruft in old files.  You can also plug in a version converter here, but that's out of scope for now.

```cpp
                ->Field("Color", &MaterialColorFlashComponent::m_color)
                ->Field("Intensity", &MaterialColorFlashComponent::m_intensity)
                ->Field("DurationMS", &MaterialColorFlashComponent::m_durationMilliseconds)
                ->Field("ActivateImmediately", &MaterialColorFlashComponent::m_activateImmediately)
```

Declares the fields to serialize.  These will be saved into the level *if they are different from default* so make sure you set defaults either in the header or the constructor!

```cpp
         editContext->Class<MaterialColorFlashComponent>("MaterialColorFlashComponent", "When triggered, flashes the emissive material property")
                    ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                        ->Attribute(AZ::Edit::Attributes::Category, "Rendering")
                        ->Attribute(AZ::Edit::Attributes::Icon, "Icons/Components/Component_Placeholder.svg")
                        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC_CE("Game"))
                    
```
This tells the editor, "Editor, there is a class called MaterialColorFlashComponent and it should show up with the friendly display name of MaterialColorFlashComponent,
and have that description in the tooltip."

It also lists class-specific editor data (applied to the entire class) follows, such as what icon to use, what category to put it in the dropdown.

Of special significance is the line `->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC_CE("Game"))`.  You can add arbitrary attributes to a class and the editor uses them for various reasons, but this one, when added to the EditorData, causes this one to show up in the browse for components menu to add to entities.

```
                    ->DataElement(AZ::Edit::UIHandlers::Color, &MaterialColorFlashComponent::m_color, "Color", "What color to apply to the material property")
                    ->DataElement(AZ::Edit::UIHandlers::SpinBox, &MaterialColorFlashComponent::m_durationMilliseconds, "Duration (ms)", "How long the effect fades out over.")
                        ->Attribute(AZ::Edit::Attributes::Min, 50.0f)
                        ->Attribute(AZ::Edit::Attributes::Max, 10000.0f)
                        ->Attribute(AZ::Edit::Attributes::Step, 50.0f)
                        ->Attribute(AZ::Edit::Attributes::Suffix, "ms")
                    ->DataElement(AZ::Edit::UIHandlers::SpinBox, &MaterialColorFlashComponent::m_intensity, "Intensity", "Light emissive intensity")
                        ->Attribute(AZ::Edit::Attributes::Min, 0.1f)
                        ->Attribute(AZ::Edit::Attributes::Max, 100.0f)
                        ->Attribute(AZ::Edit::Attributes::Step, 0.25f)
                    ->DataElement(AZ::Edit::UIHandlers::Default, &MaterialColorFlashComponent::m_activateImmediately, "Immediately Activate on start", "If checked, it will start on activate");
            
```

These just register each property you'd like to see in the editor.  They are "data elements" instead of "class elements".  Attributes following a Data Element apply only to that prior data element.  

Attributes are optional - but there is a large number of attributes available, notably things like being able to hook a change notify, for real-time editing, which we'll get to later.  Attributes can also be lambda functions, or functions bound to the current class (the one in the <template params>) if you want to make some things dynamic.  There are attributes for 'read only' and 'hidden' and this is how some classes change what options they show, when you change values or booleans on them.  There are also attributes for grouping. 

The first parameter of a DataElement is the preferred UI to use, you can leave it default in most cases, even for Color, its not really necessary as it will pick a color UI element for Color data types.  Its more useful when there are multiple options for the same data type, like choosing between a Slider and a SpinBox for a `float`.

With this, its enough that if you run the editor, you see these options, and they are persisted in the data of the entity.

### Add the "DoFlash" API

We want this component to have a scriptable message that triggers it called DoFlash().  This would thus go in our API - in the Interface.h file, in `include` folder.  If you examine that file, its an empty interface currently - it has no virtual functions.  This is the public API of our component.  Let's add the DoFlash API:

```cpp
 class MaterialColorFlashRequests
        : public AZ::ComponentBus
    {
    public:
        AZ_RTTI(ExampleFlash::MaterialColorFlashRequests, "{C8F5C496-4702-49CC-86F7-D68C092CB724}");

        virtual void DoFlash() = 0;  // this new line was added
    };
```

### Make it actually flash when triggered

In order to make the flash last multiple frames, and to make sure the user sees the first frame, let's do it like this.

* When triggered via DoFlash(),
   * Set the remaining duration to the starting duration
   * Start ticking.  If this is the first time, then also capture the old state so you can restore it.

* When it ticks
   * Calculate the current material parameters based on the remaining duration
   * Set the material parameters
   * Subtract the amount of time passed from the remaining duration
   * if its elapsed to zero or below, reset it and stop ticking.

Our Component already derives from its API Interface (See the header, it derives form xxxxxxRequestBus, which is the API you added `DoFlash()` to.

So let's make sure to override that interface and supply the body.  
We add the following to our component header:

```cpp
// implement MaterialColorFlashRequests interface:
void DoFlash() override;
```


Components do not tick in O3DE unless they need to, to save CPU.  For a component to tick, it needs to connect to the TickBus when it needs to start getting tick events - this is a bus that gets an event posted to it (to everyone connected to it) once per game tick.  There are actually two such busses, TickBus, and SystemTickBus.  The latter ticks even if the game is paused and is not based on game time.  In our case, we want this to be something that freezes when we pause the game, so we will use the TickBus.  It should also disconnect when it no longer needs events to save CPU time.

To connect to a bus, we must derive from that bus `handler` so in your component header, add
```cpp
#include <AzCore/Component/TickBus.h>
```
and in the class declaration
```cpp
    class MaterialColorFlashComponent
        : public AZ::Component
        , public MaterialColorFlashRequestBus::Handler
        , public AZ::TickBus::Handler                      // added this line
    {
```

If we go look at the declaration for Tickbus in TickBus.h, we can see what the definition of its callbacks look like:
```cpp
 ...
   /**
 * Signals that the application has issued a tick.
 * @param deltaTime The delta (in seconds) from the previous tick and the current time.
 * @param time The current time.
 */
virtual void    OnTick(float deltaTime, ScriptTimePoint time) = 0;
...
```

Since we derive from TickBus, we can implement this, so we add this to our component header:
```cpp
 // Implents TickBus::Handler
 void OnTick(float deltaTime, AZ::ScriptTimePoint time) override;  // we will implement this in the cpp
```

Let's switch to the CPP implementation now, and while we're at it, lets make the instant activation feature:

```cpp
void MaterialColorFlashComponent::Activate()
    {
        MaterialColorFlashRequestBus::Handler::BusConnect(GetEntityId());  // this code was already here.

        if (m_activateImmediately)
        {
            DoFlash();
        }
    }
```

To talk to the material component to change colors and material properties, we use its bus API which happens to be in an include file - so add
```cpp
#include <AtomLyIntegration/CommonFeatures/Material/MaterialComponentBus.h>
```
to the top of your cpp file.  You can open that file to find out what kind of functions it provides.
In our case, we are most interested in the `SetMaterialProperty` and `GetMaterialProperty` apis:
```cpp
virtual void SetPropertyValue(const MaterialAssignmentId& materialAssignmentId, const AZStd::string& propertyName, const AZStd::any& value) = 0;
virtual AZStd::any GetPropertyValue(const MaterialAssignmentId& materialAssignmentId, const AZStd::string& propertyName) const = 0;
```

Notably, it works with `AZStd::any` because a property could be any kind of object.  This means that we need to add the following to our header to save/restore state:
```cpp
#include <AzCore/std/any.h>
```
... then, inside the class definition private area:

```cpp
// capture the original state so you can restore it:
AZStd::any m_initialEmissiveEnabled;
AZStd::any m_initialEmissiveColor;
AZStd::any m_initialEmissiveIntensity;
```

So to implement doFlash, which connects to the tickbus so it starts ticking.  
While we do that, we can also capture the initial states to restore later:

```cpp
    void MaterialColorFlashComponent::DoFlash()
    {
        AZ_Warning("Components", m_durationMilliseconds > 0.0f,
            "MaterialColorFlashComponent on %s has a tick time of zero or less milliseconds, it will not work!",
            GetEntity()->GetName().c_str());

        if (!AZ::TickBus::Handler::BusIsConnected())
        {
            // we are not already ticking, so connect to the tick bus to start getting OnTick()
            AZ::TickBus::Handler::BusConnect();
            // Capture the prior properties before we start.
            using MaterialBus = AZ::Render::MaterialComponentRequestBus; // this is a convenient way to avoid typing this constantly.
            MaterialBus::EventResult(m_initialEmissiveEnabled, GetEntityId(), &MaterialBus::Events::GetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.enabled");
            MaterialBus::EventResult(m_initialEmissiveIntensity, GetEntityId(), &MaterialBus::Events::GetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.intensity");
            MaterialBus::EventResult(m_initialEmissiveColor, GetEntityId(), &MaterialBus::Events::GetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.color");

            // Only the Intensity animates over time, so set them all up here:
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.enabled", AZStd::any(true));
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.intensity", AZStd::any(m_intensity));
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.color", AZStd::any(m_color));
        }

        m_tickTimeRemaining = m_durationMilliseconds;
    }
```

And finally, let's implement the tick function:
```cpp
void MaterialColorFlashComponent::OnTick(float deltaTime, [[maybe_unused]] AZ::ScriptTimePoint time)
    {
        using MaterialBus = AZ::Render::MaterialComponentRequestBus;

        float ratioBeforeTicking = 0.0f;
        if (m_durationMilliseconds > 0.0f) // avoid divide by zero 
        {
            ratioBeforeTicking = m_tickTimeRemaining / m_durationMilliseconds;  
        }

        m_tickTimeRemaining = m_tickTimeRemaining - (deltaTime / 1000.0f); // deltatime is in seconds according to tickbus.h
    
        if (ratioBeforeTicking > 0.0f)
        {
            AZ::Color finalColor = m_color.Lerp(AZ::Color::CreateFromRgba(0, 0, 0, 255), ratioBeforeTicking);
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId, "emissive.intensity", AZStd::any(m_intensity));
        }
        else
        {
            // we are done, so disconnect from the tick bus and set the material back to normal
            m_tickTimeRemaining = 0.0f;
            AZ::TickBus::Handler::BusDisconnect();
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId,"emissive.enabled", m_initialEmissiveEnabled);
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId,"emissive.intensity", m_initialEmissiveIntensity);
            MaterialBus::Event(GetEntityId(), &MaterialBus::Events::SetPropertyValue, AZ::Render::DefaultMaterialAssignmentId,"emissive.color", m_initialEmissiveColor);
        }
    }
```

## Exercise 5 - Editor components

So now we can use this component in game to do things, and it activates when you press CTRL+G (or hit the play button), and it deactivates in the editor when you return to edit mode.  In addition, if you were to save a level with this in and run the standalone launcher, it would activate and run in the game.   For a lot of components, this is enough, as most of what they do, they do when the game is running.

But what if you want to do things when the game is not running?  

"Game Components" like we created above are activated when the game starts, deactivated when the game stops.

We need an "Editor" component that is active when the game is not running.

The major differences between Editor and Game components are:
* Editor components live in a dll module that is only loaded by tools, not the standalone game runtime, since they link to and use editor-only code that should not be shipped as part of your actual game runtime you ship to your game players.  This helps avoid any exploits and also keeps your shipped code as small as possible.
* Editor components derive from EditorComponentBase (which itself derives from AZ::Component)
* Editor components are activated as soon as they are added to the level in any way in the editor (loaded from a level, manually added, instantiated by some other means...)
* Editor components deactivate when you enter game mode, and reactivate when you leave it.
* Editor components are responsible for implementing a virtual function called `BuildGameEntity`.  This transforms any editor data into game-ready data, including adding any component(s) you want to that entity for runtime.  

So to make an editor component we need to
* Create a CMake target in our gem that builds an editor-only module so that the editor component can live there
* Make sure that the CMake target specifies that it should be loaded by `Tools` like the editor
* Add a component (let's call it `EditorMaterialColorFlashComponent`) which derives from `EditorComponentBase` to this module, that represents the functionality of this component but during edit time
* override `BuildGameEntity` for that component that creates a `MaterialColorFlashComponent` (The game runtime version of the component).
* Implement editor functionality such as being able to preview the flash during edit time.

### CMake Changes

(WIP)