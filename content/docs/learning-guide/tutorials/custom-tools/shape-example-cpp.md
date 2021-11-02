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


## Code directory

In the ShapeExample Gem's `Code/Source` directory, you'll find the following files that make up your custom tool.

### Modules and system components

All Gems have modules and system components that connect the tool to O3DE and allow it to communicate with other systems. The CppToolGem template already contains all of the code needed to run the tool in the O3DE Editor. 

For more information on Gem modules and system components, refer to the [C++ Programming for Gem Development](docs/user-guide/gems/development/programming-for-gems.md) page.


### Widget

Most of the code for your tool's functionality and UI elements will be in the `ShapeExampleWidget.cpp` file. We can communicate with other O3DE interfaces, such as entities and component, to program the tool's functionality.


### Qt Resources

The [Qt Resource System](https://doc.qt.io/qt-5/resources.html) allows Gems to store resources, such as image files, via a `.qrc` file. Then, we can load the `.qrc` file in `ShapeExampleEditorModule`.


## Widgets and layouts 

Widgets are containers for UI elements and layouts define how those UI elements are formatted. Your custom shape tool is essentially a main widget that contains sub-widgets of UI elements within it. Each widget can have its own layout. This nested widget and layout structure alllows you to organize groups of UI elements.

The `ShapeExampleWidget.cpp` file already inherits from `QWidget`, which creates the main widget. Next, you must create a layout for the main widget. Refer to the snippet below for the following instructions: 

1. At the top of your constructor, instantiate a `QVBoxLayout` called `mainLayout`.
   
2. In the instructions below, you will create various UI elements and add them to the `mainLayout`. 

3. We recommend that you add a stretch at the bottom of `mainLayout` using `addStretch()` to fill any expanded space when you resize the window. 

4. Finally, set `mainLayout` to be the layout for this widget using `setLayout()`. 

```cpp
    ShapeExampleWidget::ShapeExampleWidget(QWidget* parent)
        : QWidget(parent)
    {
        setWindowTitle(QObject::tr("ShapeExample"));

        QVBoxLayout* mainLayout = new QVBoxLayout(this);


        // Add various UI elements to mainLayout


        mainLayout->addStretch();

        setLayout(mainLayout);
```

## Input fields and check boxes

In this step, you will create an input field for the entity's name and a check box to apply a suffix to additional entity's with the same name. For example, if you set the entity's name to "my_box" and  enable the suffix, then when you create three entities, they will be named "my_box_1", "my_box_2", "my_box_3". 

You will wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QWidget` called `entityNameWidget` and a `QFormLayout` called `formLayout`.
   
2. Later, you will create the input field and check box and add them to this widget. 

3. Finally, set the layout of `entityNameWidget` to `formLayout`, and add `entityNameWidget` to `mainLayout`. 

    ```cpp
        QWidget* entityNameWidget = new QWidget(this);
        QFormLayout* formLayout = new QFormLayout();

        // ...

        entityNameWidget->setLayout(formLayout);
        mainLayout->addWidget(entityNameWidget);
    ```

### Add an input field

Next, create an input field using the `QLineEdit` object called `m_nameInput`. You can set the placeholder text in the input field using `setPlaceholderText(...)` and [todo - what does  `setClearButtonEnabled(...)` do?]. 


```cpp
        m_nameInput = new QLineEdit(this);
        m_nameInput->setPlaceholderText(QObject::tr("Set custom Entity name here..."));
        m_nameInput->setClearButtonEnabled(true);
```

### Add a check box

Then, create a check box using the `QCheckBox` object called `m_addShapeNameSuffix`. You can enable or disable the check box by default using `setDisabled(...)`.

```cpp
        m_addShapeNameSuffix = new QCheckBox(this);
        m_addShapeNameSuffix->setDisabled(true);
```

### Add a signal listener with a slot handler

A signal listener waits for a specific signal to happen and responds to it in the specified way. You will set up a signal listener such that when the user updates the input field, the check box automatically enables. 

[todo - what is a "slot" handler?]

As shown in the following snippet, you can connect `m_nameInput` to a signal listener using `QObject::connect`. Then, set the signal to listen to as `QLineEdit::textChanged`. When the user edits the input field, `OnNameInputTextChanged()` (which you will define) is called.
```cpp
QObject::connect(m_nameInput, &QLineEdit::textChanged, this, &ShapeExampleWidget::OnNameInputTextChanged);
```

You can define OnNameInputTextChanged(...) as follows. This function checks if `m_nameInput` contains text, and if so, enables `m_addShapeNameSuffix`. 

```cpp
    void ShapeExampleWidget::OnNameInputTextChanged(const QString& text)
    {
        // We will only enable the checkbox if the user has typed in
        // a custom name for the entity that will be created
        m_addShapeNameSuffix->setEnabled(!text.isEmpty());
    }
```


### Buttons

In this step, you will create a collection of buttons that create an entity of different shape types, such as a box, sphere, cone, and so on. 

Again, you will wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QWidget` called `shapeButtons` and a `QGridLayout` called `gridLayout`.
   
2. Later, you will create the buttons and add them to this widget.

3. Finally, set the layout of `shapeButtons` to `gridLayout`, and add `shapeButtons` to `mainLayout`. 

    ```cpp
        QWidget* shapeButtons = new QWidget(this);
        QGridLayout* gridLayout = new QGridLayout();

        // ...

        shapeButtons->setLayout(gridLayout);
        mainLayout->addWidget(shapeButtons);
    ```

### Query types of Shape components

[todo]

```cpp
AzToolsFramework::EntityCompositionRequests::ComponentServicesList providedServices;
providedServices.push_back(AZ_CRC_CE("ShapeService"));

AZ::ComponentTypeList typeIds;
AzToolsFramework::EditorComponentAPIBus::BroadcastResult(
    typeIds,
    &AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeIdsByService,
    providedServices,
    AzToolsFramework::EntityCompositionRequests::ComponentServicesList()
);
```

```cpp
AZStd::vector<AZStd::string> componentNames;
AzToolsFramework::EditorComponentAPIBus::BroadcastResult(
    componentNames,
    &AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeNames,
    typeIds
);
```

### Add buttons

Next, you will add the buttons onto `gridLayout`. The size of the grid is based on the total count of types of Shape components. 

[todo]

```cpp
const int maxColumnCount = 3;
        for (int i = 0; i < componentNames.size(); ++i)
        {
            AZStd::string name = componentNames[i];
            AZ::TypeId typeId = typeIds[i];

            // Find the icon registered for this component by its type id
            AZStd::string editorIconPath;
            AzToolsFramework::EditorRequestBus::BroadcastResult(editorIconPath, &AzToolsFramework::EditorRequests::GetComponentTypeEditorIcon, typeId);
            QString iconPath = QString::fromUtf8(editorIconPath.c_str());

            // Create a button with the shape components name and icon
            QPushButton* shapeButton = new QPushButton(QIcon(iconPath), QString::fromUtf8(name.c_str()), this);
            shapeButton->setMinimumHeight(40);

            // Example of listening to signals using a lambda as the handler
            QObject::connect(shapeButton, &QPushButton::clicked, this, [this, typeId]() {
                CreateEntityWithShapeComponent(typeId);
            });

            // Place our shape button in the grid layout
            int row = i / maxColumnCount;
            int column = i % maxColumnCount;
            gridLayout->addWidget(shapeButton, row, column);
        }

```

### Combo boxes

`<todo>`

### Icon

An icon is an image file that's used to represent your tool in the O3DE Editor. You will store the icon using the Qt Resource System and load it from your Gem module. 

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