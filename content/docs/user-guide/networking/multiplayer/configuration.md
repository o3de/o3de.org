---
linkTitle: Project Configuration
title: Adding the Multiplayer Gem to a Project
description: Learn how to add multiplayer support to an Open 3D Engine (O3DE) project or Gem. Includes instructions for creating a placeholder auto-component.
weight: 200
---

When you need multiplayer support in your **Open 3D Engine (O3DE)** project, the easiest way to set it up is to create the project from the O3DE multiplayer template using the instructions that follow.

If your O3DE project is already in development and you want to add multiplayer support to it, the instructions on [Manual project configuration](#manual-project-configuration) will help you add the **Multiplayer Gem** to an existing project.

## Creating a multiplayer project from the multiplayer template {#creating-project-from-template}

To create a multiplayer project from the O3DE multiplayer template, you need O3DE version 22.10 or later. You must first add the template from the [O3DE Extras GitHub repo](https://github.com/o3de/o3de-extras) to your library of O3DE templates using **Project Manager**. Then you will be able to create a new project from the template.

1. In Project Manager, choose **New Project**, then **Create New Project**.

1. Choose **Add remote template**.

1. In the **Add a remote template** dialog box, enter `https://github.com/o3de/o3de-extras.git` as the **Remote URL**. Then choose **Add**. This registers the GitHub repo as a remote source.

1. Select the new template named **Multiplayer**. This selects the template for the new project.

1. Choose **Download Template** (in the bottom right of the New Project window), then choose the location where the template will be downloaded. Choose **Download**.

1. With the template downloaded, you can configure your project with additional Gems. Choose **Create Project** when you're ready to create the new project.

1. Choose **Build Project - Build Now** from the project's icon box to build the project.

1. When the build completes, your project will be ready to use. You can choose **Open Editor** to open it in **O3DE Editor**.

1. The project comes with a `Demo` level which you can open from the Editor and play with using **Ctrl+G**.

### Alternative ways to set up the multiplayer template

To set up the multiplayer template without using Project Manager, you will need to download the template from the [O3DE Extras GitHub repo](https://github.com/o3de/o3de-extras) and then register the template from a command line.

1. When obtaining the template from the O3DE Extras GitHub repo, you can choose to download a tagged release version or use `git clone` to get the latest prerelease code from the `development` branch. Do _one_ of the following:

    a. To download a release version from the repo, open the [O3DE Extras tags page](https://github.com/o3de/o3de-extras/tags). Select a version, then choose the zip file that begins with the name `Template_Multiplayer` to download. Unzip the contents to a directory of your choice.

    b. To download the latest prerelease code from the `development` branch, open a command line window on your computer and use `git clone` to get the contents of the repo:

    ```cmd
    git clone https://github.com/o3de/o3de-extras.git
    ```

1. Open a command line window to your O3DE engine directory and use the `o3de register` command to register the multiplayer template.

    ```cmd
    // Example using downloaded and unzipped release version.
    scripts\o3de.bat register -tp C:/Users/<YourUserName>/Downloads/template_multiplayer

    // Example using cloned o3de-extras repo.
    scripts\o3de.bat register -tp C:/o3de-extras/Templates/Multiplayer
    ```

1. You can now create a project from this template, using either Project Manager or the `o3de create-project` command, as in the following example:

    ```cmd
    scripts\o3de.bat create-project -pp C:/o3de-projects/my-multiplayer-game -tn Multiplayer
    ```

## Manual project configuration

Adding the full functionality of the Multiplayer Gem to an O3DE project requires making edits to the CMake scripts and source code. These changes enable:

* Linking against the correct core libraries and Gems.
* Building [auto-components](./autocomponents).
* Creating multiplayer component descriptors.
* Registering the components with the Multiplayer Gem.

{{< note >}}
Because both O3DE Gems and projects use the same CMake build functions, you can use these instructions to create a new Gem that extends the behavior of the Multiplayer Gem.
{{< /note >}}

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

### Make Module.cpp changes

To use multiplayer functionality, you must make small changes to your project's source code to generate descriptors for multiplayer components.

Make the following changes to your project's `Code/Source/<ProjectName>Module.cpp`:
1. Include `AutoComponentTypes.h` at the top of the file.
    ```cpp
    #include <Source/AutoGen/AutoComponentTypes.h>
    ```

1. Edit the `<ProjectName>Module` constructor to create the component descriptors, which allows multiplayer components to be registered.
    ```cpp
    MultiplayerSampleModule()
        : AZ::Module()
    {
        ...
        CreateComponentDescriptors(m_descriptors); //< Add this line to register your project's multiplayer components
    }
    ```
    {{< important >}}Make sure the call to `CreateComponentDescriptors()` is the *last* line of the constructor.
    {{< /important >}}

### Make SystemComponent.cpp changes

Finally, after adding code to generate descriptors, you must register the multiplayer components with the Multiplayer Gem.

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
        RegisterMultiplayerComponents(); //< Register our project's multiplayer components to assign NetComponentIds
    }
    ```

### Rebuild the project

Configuring and building is always required after editing CMake and C++ files. You can use the [Project Manager](/docs/user-guide/project-config/project-manager/) to rebuild, or configure and build via the [command-line interface (CLI)](/docs/user-guide/build/configure-and-build/).
