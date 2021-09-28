---
title: Add the Open 3D Engine Multiplayer Gem to a Project
description: Add Multiplayer support to an Open 3D Engine project or Gem, including the creation of auto-components.
linkTitle: Project configuration
---

Adding the full functionality of the Open 3D Engine Multiplayer Gem to a project requires making edits to the CMake scripts and source code. These changes enable:

* Linking against the correct core libraries and Gems
* Building [auto-components](./autocomponents)
* Creating and registering component information with the Multiplayer Gem on project start

{{< note >}}
Since both O3DE Gems and projects use the same CMake build functions, these instructions can be used to create a *subgem* of the Multiplayer Gem. This allows you to create a new Gem that extends the behavior of the Multiplayer Gem.
{{< /note >}}

## Build setup

The first step of enabling the Multiplayer Gem for a project is to make sure that the `<ProjectName>.Static` target of your project includes the correct dependencies. Make the following edits to the `<ProjectName>.Static` target:

1. In the `BUILD_DEPENDENCIES PUBLIC` section, add `AZ::AzNetworking` and `Gem::Multiplayer`.
1. In the `BUILD_DEPENDENCIES PRIVATE` section, add `Gem::Multiplayer.Static`.
1. Add the following `AUTOGEN_RULES` section to the target:
   
   ```cmake
    AUTOGEN_RULES
        *.AutoComponent.xml,AutoComponent_Header.jinja,$path/$fileprefix.AutoComponent.h
        *.AutoComponent.xml,AutoComponent_Source.jinja,$path/$fileprefix.AutoComponent.cpp
        *.AutoComponent.xml,AutoComponentTypes_Header.jinja,$path/AutoComponentTypes.h
        *.AutoComponent.xml,AutoComponentTypes_Source.jinja,$path/AutoComponentTypes.cpp
   ```

At the end of editing the CMake file, your `<ProjectName>.Static` target should look something like the following:

```cmake
ly_add_target(
    NAME <ProjectName>.Static STATIC
    NAMESPACE Gem
    FILES_CMAKE
        <projectname>_files.cmake
        <projectname>_autogen_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
            .
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PUBLIC
            AZ::AzNetworking
            Gem::Multiplayer
        PRIVATE
            Gem::Multiplayer.Static
    AUTOGEN_RULES
        *.AutoComponent.xml,AutoComponent_Header.jinja,$path/$fileprefix.AutoComponent.h
        *.AutoComponent.xml,AutoComponent_Source.jinja,$path/$fileprefix.AutoComponent.cpp
        *.AutoComponent.xml,AutoComponentTypes_Header.jinja,$path/AutoComponentTypes.h
        *.AutoComponent.xml,AutoComponentTypes_Source.jinja,$path/AutoComponentTypes.cpp
)
```

Next, create the `<projectname>_autogen_files.cmake` file. The contents of this file add the source templates for [autocomponents](./autocomponents) to the project build.

```cmake
set(FILES
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponent_Common.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponent_Header.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponent_Source.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponentTypes_Header.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponentTypes_Source.jinja
)
```

## Module and System component setup

In order to use multiplayer functionality, you need to make small changes to the source code to generate descriptors for multiplayer components and then register these components with the Multiplayer Gem.

### Module.cpp changes

Add the following include and line to your project's `Code/Source/<ProjectName>Module.cpp`:

```cpp
#include <Source/AutoGen/AutoComponentTypes.h>
```

Edit the `<ProjectName>Module` constructor to create the component descriptors, allowing Multiplayer components to be registered.

```cpp
MultiplayerSampleModule()
    : AZ::Module()
{
    <snip...>
    CreateComponentDescriptors(m_descriptors); //< Add this line to register your projects multiplayer components
}
```

{<< important >>}
Make sure that the call to `CreateComponentDescriptors()` is the *last* line of the constructor.
{<< /important >>}

### SystemComponent.cpp changes

As a final step, edit your project's `Code/Source/<ProjectName>SystemComponent.cpp` file to add the following `#include` and function to register Multiplayer components with the Gem.

```cpp
#include <Source/AutoGen/AutoComponentTypes.h>
 
void <ProjectName>SystemComponent::Activate()
{
    RegisterMultiplayerComponents(); //< Register our gems multiplayer components to assign NetComponentIds
}
```
