---
linkTitle: Create a Custom Shape Tool in C++
title: Create a Custom Shape Tool in C++ for Open 3D Engine
description: Learn to create a custom shape tool in C++ to extend Open 3D Engine (O3DE).
weight: 200
toc: true
---

In this tutorial, you'll create a custom tool, **Shape Example**, in C++ that extends **Open 3D Engine (O3DE)**. The **Shape Example** tool allows you to create entities with a Shape component and configure their component properties. You'll learn how to use the `CppToolGem` template and practice C++ development with the Tools UI API and other O3DE APIs. 

By the end of this tutorial, you'll be able to create your own tools that extends O3DE. 


## Create a tool with the `CppToolGem` template

The `CppToolGem` template contains a basic framework to create a dockable widget in O3DE Editor.

1. Create a Gem using the **O3DE CLI (`o3de`)** script in `<engine>/scripts`. Specify the name `ShapeExample` by using the `--gem-name` option and the template `CppToolGem` by using the `--template-name` option. By default, this creates the Gem directory in `<user>/.o3de/Gems` -- or you can specify a location by using the `--gem-path` option. Depending on the location, this automatically registers the Gem to either the `.o3de` registry, engine, or project.

    ```cmd
    scripts/o3de create-gem --gem-name ShapeExample --template-name CppToolGem
    ```

2. Add the Gem in your project by using the `o3de` script. 

    ```cmd
    scripts/o3de enable-gem -gn CppToolGem -pp <project-path>
    ```

    Or, enable the Gem using the Project Manager (refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems.md)).

3. Open your project in the O3DE Editor. 

4. Open the tool by selecting **Tools > Examples**.

Now you can access your new tool from the **O3DE Editor**. By default, this tool contains a simple user interface (UI). In the next steps, we'll design the tool's UI and code its functionality.

## Develop your tool

### Code directory

In the ShapeExample Gem's `Code/Source` directory, you'll find the following files that make up your custom tool.

#### Modules and system components

All Gems have modules and system components that connect the tool to O3DE and allow it to communicate with other systems. The CppToolGem template already contains all of the code needed to run the tool in the O3DE Editor. 

For more information on Gem modules and system components, refer to the [C++ Programming for Gem Development](docs/user-guide/gems/development/programming-for-gems.md) page.


#### Widget

Most of the code for your tool's functionality and UI elements will be in the `ShapeExampleWidget.cpp` file. We can communicate with other O3DE interfaces, such as entities and component, to program the tool's functionality.


#### Qt Resources

The [Qt Resource System](https://doc.qt.io/qt-5/resources.html) allows Gems to store resources, such as image files, via a `.qrc` file. Then, we can load the `.qrc` file in `ShapeExampleEditorModule`.


### Add a text field

`<todo>`

### Add a button

`<todo>`

### Add a combo box

`<todo>`

### Add an icon

1. Add an image file to the `Code/Source` directory. For tool icons, we recommend using an `.svg` file with a resolution of _`[TODO]`_. 
   
2. Add your icon to your Gem's resources by updating `ShapeExample.qrc` with your new icon's file name. 

3. Register your Gem's resources in Qt by adding the following code in `EditorModule.cpp`. 

    - Define the function `InitShapeExampleResource()` and call `Q_INIT_RESOURCE(...)` to register the Qt resrouces listed in `ShapeExample.qrc`.

        ```cpp
        void InitShapeExampleResources()
        {
            Q_INIT_RESOURCE(ShapeExample);
        }
        ```

    - Call `InitShapeExampleResource()` in the class constructor.

Your `ShapeExampleEditorModule.cpp` file should be similar to the one in the [ShapeExample sample](https://github.com/o3de/sample-code-gems/blob/main/cpp_gems/ShapeExample/Code/Source/ShapeExampleEditorModule.cpp) in the `sample-code-gems` repo. 


## Build and debug your tool

`<todo>`