---
linkTitle: Project Configuration
title: Adding the Multiplayer Gem to a Project
description: Learn how to add multiplayer support to an Open 3D Engine (O3DE) project or Gem. Includes instructions for creating a placeholder auto-component.
weight: 200
---

Adding the full functionality of the **Multiplayer Gem** to an **Open 3D Engine (O3DE)** project requires making edits to the CMake scripts and source code. These changes enable:

* Linking against the correct core libraries and Gems.
* Building [auto-components](./autocomponents).
* Creating multiplayer component descriptors.
* Registering the components with the Multiplayer Gem.

{{< note >}}
Because both O3DE Gems and projects use the same CMake build functions, you can use these instructions to create a new Gem that extends the behavior of the Multiplayer Gem.
{{< /note >}}

## Build setup

### Enable the Multiplayer Gem

Start by adding and enabling the Multiplayer Gem in your project. For help, refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/).

### Make CMakeList.txt changes

Make sure the `<ProjectName>.Static` target includes the correct dependencies. 
Find the CMake file that defines your project's static target. For example, `<ProjectName>/Gem/Code/CMakeList.txt`. Edit the `<ProjectName>.Static` target as follows:
1. In the `FILES_CMAKE` section, add `<projectname>_autogen_files.cmake`. You create this file in a later step.
    ```cmake
        ly_add_target(
            NAME <ProjectName>.Static STATIC
            ...
            FILES_CMAKE
                ...
                <projectname>_autogen_files.cmake
    ```

1. In the `BUILD_DEPENDENCIES PUBLIC` section, add `AZ::AzNetworking`, `Gem::Multiplayer`, and `AZ::AzFramework`.
   ```cmake
    ly_add_target(
        NAME <ProjectName>.Static STATIC
        ...
        BUILD_DEPENDENCIES
            PUBLIC
                AZ::AzFramework
                AZ::AzNetworking
                Gem::Multiplayer
   ```

    {{< note >}}If `BUILD_DEPENDENCIES` does not contain a `PUBLIC` section, add it as shown in the previous code example.{{< /note >}}
1. In the `BUILD_DEPENDENCIES PRIVATE` section, add `Gem::Multiplayer.Static`.
   ```cmake
    ly_add_target(
        NAME <ProjectName>.Static STATIC
        ...
        BUILD_DEPENDENCIES
            PRIVATE
                ...
                Gem::Multiplayer.Static
   ```
1. Also add the following `AUTOGEN_RULES` section to the `<ProjectName>.Static` target:
   
   ```cmake
    ly_add_target(
        NAME <ProjectName>.Static STATIC
        ...
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
            AZ::AzFramework
            AZ::AzNetworking
            Gem::Multiplayer
        PRIVATE
            ...
            Gem::Multiplayer.Static
    AUTOGEN_RULES
        *.AutoComponent.xml,AutoComponent_Header.jinja,$path/$fileprefix.AutoComponent.h
        *.AutoComponent.xml,AutoComponent_Source.jinja,$path/$fileprefix.AutoComponent.cpp
        *.AutoComponent.xml,AutoComponentTypes_Header.jinja,$path/AutoComponentTypes.h
        *.AutoComponent.xml,AutoComponentTypes_Source.jinja,$path/AutoComponentTypes.cpp
)
```

### Add the AutoGen CMake file

Next, create a new file named `<projectname>_autogen_files.cmake` and place it in the project's code folder. For example: `<ProjectName>/Gem/Code/<projectname>_autogen_files.cmake`. The contents of this file add the source templates for [auto-components](./autocomponents) to the project build.

```cmake
set(FILES
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponent_Common.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponent_Header.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponent_Source.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponentTypes_Header.jinja
    ${LY_ROOT_FOLDER}/Gems/Multiplayer/Code/Include/Multiplayer/AutoGen/AutoComponentTypes_Source.jinja
)
```

### Add a placeholder auto-component

{{< known-issue link="https://github.com/o3de/o3de/issues/4058">}}
If you've enabled multiplayer auto-components but you haven't created any auto-components, you might experience a build failure. As a workaround, follow the steps in this section to create a placeholder auto-component.
{{< /known-issue >}}

1. Under your project's `Code\Source\` directory, create a new folder named `AutoGen`.
    {{< note >}}This AutoGen directory doesn't have to be temporary. All future multiplayer auto-components can live here.{{< /note >}}
1. Under `Code\Source\AutoGen`, create a new, placeholder auto-component file named `MyFirstNetworkComponent.AutoComponent.xml`.
    {{< note >}}This guide uses "MyFirstNetworkComponent" as the name for this multiplayer auto-component. You can specify any name for your component, but be sure to use that name consistently.{{< /note >}}

1. Modify `Code\Source\AutoGen\MyFirstNetworkComponent.AutoComponent.xml` to have the following content:
    ```xml  
    <?xml version="1.0"?>

    <Component
        Name="MyFirstNetworkComponent"
        Namespace="<ProjectName>"
        OverrideComponent="false"
        OverrideController="false"
        OverrideInclude=""
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    </Component>
    ```
    {{< important >}}Replace `<ProjectName>` with your project's name and make sure that the value is wrapped in quotes.
    {{< /important >}}
1. Register the placeholder auto-component with CMake by updating `<projectname_files.cmake>`.
    ```cmake
    set(FILES
        ...
        Source/AutoGen/MyFirstNetworkComponent.AutoComponent.xml
    )
    ```
{{< note >}}After completing the setup steps in this guide, you can delete the placeholder auto-component and create a new auto-component, or use it as a starting point. There must always be at least one auto-component.

To learn more about multiplayer auto-components, refer to [Multiplayer Auto-components](../autocomponents) or follow the introductory [multiplayer tutorial](/docs/learning-guide/tutorials/multiplayer/first-multiplayer-component/).{{< /note >}}

## Module and system component setup

To use multiplayer functionality, you must make small changes to the source code to generate descriptors for multiplayer components. Then, you must register these components with the Multiplayer Gem.

### Module.cpp changes

Make the following changes to your project's `Code/Source/<ProjectName>Module.cpp`:
1. Include `AutoComponentTypes.h` at the top of the file.
    ```cpp
    #include <Source/AutoGen/AutoComponentTypes.h>
    ```

1. Edit the `<ProjectName>Module` constructor to create the component descriptors, which allows Multiplayer components to be registered.
    ```cpp
    MultiplayerSampleModule()
        : AZ::Module()
    {
        ...
        CreateComponentDescriptors(m_descriptors); //< Add this line to register your projects multiplayer components
    }
    ```
    {{< important >}}Make sure the call to `CreateComponentDescriptors()` is the *last* line of the constructor.
    {{< /important >}}

### SystemComponent.cpp changes

Make the following changes to your project's `Code/Source/<ProjectName>SystemComponent.cpp` file.
1. Include `AutoComponentTypes.h` at the top of the file.
    ```cpp
    #include <Source/AutoGen/AutoComponentTypes.h>
    ```
2. Register Multiplayer components with the Gem by updating the `Activate()` function.

    ```cpp
    ...
    void <ProjectName>SystemComponent::Activate()
    {
        ...
        RegisterMultiplayerComponents(); //< Register our gems multiplayer components to assign NetComponentIds
    }
    ```

## Rebuild the project
Configuring and building is always required after editing CMake and C++ files. You can use the [Project Manager](/docs/user-guide/project-config/project-manager/) to rebuild, or configure and build via the [command-line interface (CLI)](/docs/user-guide/build/configure-and-build/).