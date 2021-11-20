---
linkTitle: Create a Custom Tool Gem in C++
title: Create a Custom Tool Gem in C++ to Extend Open 3D Engine Editor
description: Learn how to extend the Open 3D Engine (O3DE) Editor by creating a custom tool Gem in C++.
weight: 200
toc: true
---

In this tutorial, you create a custom tool Gem written in C++, called **Shape Example**, that extends the **Open 3D Engine (O3DE) Editor**. The Shape Example tool allows you to create entities with a Shape component and configure their component properties. You'll learn how to use the `CppToolGem` template and practice C++ development with [Qt](https://wiki.qt.io/Main), O3DE Tools UI API, and other O3DE APIs.

This tutorial shows you how to create the **ShapeExample** Gem, which is a sample Gem in the [`o3de/sample-code-gems` repository](https://github.com/o3de/sample-code-gems/tree/main/cpp_gems/ShapeExample). You can reference the ShapeExample Gem sample as you follow along this tutorial.

By the end of this tutorial, you'll be able to extend the Editor by creating your own custom tools written in Python.

The following image is a preview of the Shape Exmple tool that you create in this tutorial.

{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/cpp-shape-example-demo.png" "1080" "An image of the Shape Example tool and some entities created by it." >}}


## Prerequisites

Before you start the tutorial, ensure that you have the following:

- Set up an O3DE development environment. You can build O3DE as a source engine or a pre-built SDK engine. For more information, refer to [Setting up O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github.md).

## Create a Gem from the `CppToolGem` template

To start, create a Gem from the `CppToolGem` template. The `CppToolGem` template contains a basic C++ framework to create a dockable tool (widget) in the Editor.

This tutorial uses the following directory names and locations in the examples.

- **O3DE engine directory**: `C:/o3de`  
    The source directory that contains the engine.

- **`CppToolGem` template**: `C:/o3de/Templates/CppToolGem`  
    The Gem template that your custom Gem is based off of.

- **MyCppShapeExample Gem**: `C:/o3de-gems/MyCppShapeExample`  
    Your custom Gem. You may choose a different folder name and location in your disk.

To create a Gem from the `CppToolGem` template, complete the following steps:

1. Create a Gem by using the **O3DE CLI** (`o3de`) script that's in your engine source directory. Specify the Gem's name (`--gem-name`, `-gn`), the Gem directory path (`--gem-path`, `-gp`), and the Gem template to create from (`--template-name`, `-tn`). This Gem is based off of the `CppToolGem` template. In this example, we'll name the Gem `MyCppShapeExample` and create it in `C:/o3de-gems/MyCppShapeExample`.

    ```cmd
    scripts/o3de create-gem --gem-name MyCppShapeExample --template-name CppToolGem --gem-path C:/o3de-gems/MyCppShapeExample
    ```

   Depending on the Gem path, this command automatically registers the Gem to one of the manifest files: `.o3de/o3de_manifest.json`, `<engine>/engine.json`, and `<project>/project.json`.

2. (Optional) Register the Gem to your project. This step is optional because when you create a Gem using the O3DE CLI in the previous step, it automatically registers the Gem.

    ```cmd
    scripts/o3de register -gp C:/o3de-gems/MyCppShapeExample -espp <project-path>
    ```

3. Add the Gem in your project.

    ```cmd
    scripts/o3de enable-gem -gn MyCppShapeExample -pp <project-path>
    ```

    Or, enable the Gem using the Project Manager (refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems.md)).

4. Build the project by using the O3DE CLI (refer to [Build a project](/docs/user-guide/build/configure-and-build/#build-a-project)). Or, use the Project Manager (refer to the **Build** action in the [Project Manager](/docs/user-guide/project-config/project-manager/)) page.

5. Open Editor for your project.

6. Open the tool by selecting **Tools > Examples > MyCppShapeExample** from the file menu. (See A in the following image.) 

    Or, open the tool directly by clicking on the tool's icon in the **Edit Mode Toolbar**. (See B.)

Now you can access the Shape Example tool! By default, this tool contains a simple user interface (UI). In the next steps, we'll design the tool's UI and code its functionality. (See C.)

{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/cpp-tool-gem-template-in-editor.png" "1080" "Editor with a tool created using the CppToolGem template" >}}


## Code directory

This sections describes your MyCppShapeExample Gem's code structure. It's important to become familiar with your Gem's code structure because this is the entry point where you will program your tool's custom functionality. In this example, your Gem's directory is located at: `C:/o3de-gems/MyCppShapeExample`. This is the path that you specified when you created the Gem. Your Gem's code is located in the subdirectory `Code/Source`, which contains the following classes and frameworks that make up your custom tool.

Example of `Code/Source` directory:

{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/cpp-tool-gem-template-directory.png" "720" "Editor with a tool created using the CppToolGem template." >}}


### Modules and system components

All Gems have modules and system component classes written in C++ that connect the tool to O3DE and allow it to communicate with other systems. The `CppToolGem` template already contains all of the code needed to run the tool in the Editor. You can find these C++ files in `Code/Source`.

For more information on Gem modules and system components, refer to the [C++ Programming for Gem Development](docs/user-guide/gems/development/programming-for-gems.md) page.


### O3DE and Qt frameworks

O3DE extends the **Qt** framework, so you will use [Qt Widgets Module](https://doc.qt.io/qt-5/qtwidgets-index.html) to create a graphical user interface (GUI). You will also use O3DE's EBuses to communicate with other O3DE interfaces, such as entities and components, and connect them to Qt elements.

You will write most of your tool's functionality and UI elements in the `ShapeExample` class that's located in `Code/Source/ShapeExampleWidget.h` and `Code/Source/ShapeExampleWidget.cpp`.


### Qt Resources

The [Qt Resource System](https://doc.qt.io/qt-5/resources.html) allows Gems to store and load image files via a `.qrc` file. This eliminates the need to load image files from absolute paths, making it simpler for you to distribute your Gem. Later, you will store an image file to create an icon for your tool.


## Widgets and layouts

With Qt, you can create *widgets*, which are containers for UI elements, and *layouts* which define how those UI elements are arranged. Your custom tool is a main widget that contains sub-widgets of UI elements. Each widget can have its own layout. The nested widget and layout structure allows you to organize groups of UI elements.

The `ShapeExampleWidget` class inherits from `QWidget`, which creates the main widget. The following instructions walk you through how to set up the main widget's layout. Be aware that some of the instructions may already be done by the `CppToolGem` template.

1. At the top of your constructor, instantiate a `QVBoxLayout` called `mainLayout`.
   
2. Later, you will create various UI elements and add them to `mainLayout`.

3. We recommend that you add a stretch at the bottom of `mainLayout` by using `addStretch()`. This fills any expanded space when you resize the window.
   
4. Finally, set `mainLayout` to be the layout for this widget by using `setLayout(...)`.

```cpp
ShapeExampleWidget::ShapeExampleWidget(QWidget* parent)
    : QWidget(parent)
{

    QVBoxLayout* mainLayout = new QVBoxLayout(this);        // 1

    // ...                                                  // 2
    
    mainLayout->addStretch();                               // 3
        
    setLayout(mainLayout);                                  // 4
}
```

## Input fields and check boxes

In this step, create an input field for the entity's name and a check box for an option to append a suffix---the component's name---to the entity's name. For example, suppose you set the entity's name to "MyEntity" and enable the check box. Then, when you create an entity with a **Box Shape** component and another with a **Sphere Shape** component, they will respectively be named "MyEntity_BoxShape" and "MyEntity_SphereShape".

By the end of this step, your input field and check box should look like this: 
{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/input-field-check-box.png" "500" "Shows UI for an input field and check box" >}}

First, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QGroupBox` called `entityNameWidget` and a `QFormLayout` called `formLayout`.
   
2. Later, you will create the input field and check box and add them to this widget. 

3. Finally, set the layout of `entityNameWidget` to `formLayout`, and add `entityNameWidget` to `mainLayout`. 

```cpp
    QWidget* entityNameWidget = new QWidget(this);  // 1
    QFormLayout* formLayout = new QFormLayout();

    // ...                                          // 2

    entityNameWidget->setLayout(formLayout);        // 3
    mainLayout->addWidget(entityNameWidget);
```

### Create an input field

An input field is a UI element that takes text input from the user. With Qt, you can create an input field by using the `QLineEdit` object.

1. Create an input field by instantiating `QLineEdit`. In this example, we'll name it `m_nameInput`.

2. Set the placeholder text in `m_nameInput` by calling `setPlaceholderText(...)`.

3. Enable a button to clear the text using `setClearButtonEnabled(true)`.


```cpp
    m_nameInput = new QLineEdit(this);
    m_nameInput->setPlaceholderText(QObject::tr("Set custom Entity name here..."));
    m_nameInput->setClearButtonEnabled(true);
```

### Create a check box
A check box is an option button that users can enable or disable to trigger a user-defined behavior. With Qt, you can create an input field by using the `QCheckBox` object. In this example, the check box will control whether or not to append a suffix to the entity's name. At runtime, it will start disabled, and enable when the user enters the entity's name to the input field. You will define this behavior later.

1. Create a check box by instantiating `QCheckBox`. In this example, name it `m_addShapeNameSuffix`.

2. Set the check box to the start in the disabled state by using `setDisabled(true)`.

```cpp
    m_addShapeNameSuffix = new QCheckBox(this);
    m_addShapeNameSuffix->setDisabled(true);
```

### Add a signal listener with a slot handler

Qt uses signals and slots to communicate between objects (refer to [Signals & Slots](https://doc.qt.io/qt-5/signalsandslots.html) in the Qt Documentation). Set up a signal listener such that when the user enters text into the input field at runtime, the check box automatically enables. 

In this example, the signal listener uses a slot handler, which is essentially a C++ function that a signal can connect to. 

1. Declare a slot in `Code/Source/ShapeExampleWidget.h` by using the `Q_SLOTS` macro.

    ```cpp
    private Q_SLOTS:
        void OnNameInputTextChanged(const QString& text);
    ```

2. Call `QObject::connect(...)` to create a connection between the input field (`m_nameInput`) to the signal (`QLineEdit::textChanged`) and slot (ShapeExampleWidget::OnNameInputTextChanged`). Refer to the following line of `ShapeExampleWidget.cpp`.


    ```cpp
        QObject::connect(m_nameInput, &QLineEdit::textChanged, this, &ShapeExampleWidget::OnNameInputTextChanged);
    ```

3. Define `OnNameInputTextChanged(...)` in `ShapeExampleWidget.cpp`. This function checks if `m_nameInput` contains text, and if so, enables `m_addShapeNameSuffix`. 

    ```cpp
    void ShapeExampleWidget::OnNameInputTextChanged(const QString& text)
    {   
        m_addShapeNameSuffix->setEnabled(!text.isEmpty());
    }
    ```

### Add UI elements to layout

After creating the UI elements---an input field and a check box---and connecting a signal listener to them, add them to the layout. To ensure they belong to the sub-widget `entityNameWidget`, add them to the corresponding layout, `formLayout`, by using `addRow(...)`.

```cpp
    formLayout->addRow(QObject::tr("Entity name"), m_nameInput);
    formLayout->addRow(QObject::tr("Add shape name suffix"), m_addShapeNameSuffix);
```

## Combo boxes

In this step, you will create a combo box that contains a list of values that you can use to scale the size of the entity.

By the end of this step, your combo box should look like this: 
{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/combo-box.png" "500" "Shows UI for combo box" >}}

First, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QGroupBox` called `comboBoxGroup` and a `QVBoxLayout` called `comboBoxLayout`.
   
2. Later, you will create a combo box and define a list of scale values.

3. Finally, set the layout of `shapeButtons` to `gridLayout`, and add `shapeButtons` to `mainLayout`. 

```cpp
    QGroupBox* comboBoxGroup = new QGroupBox("Choose your scale (Combo Box)", this);    // 1
    QVBoxLayout* comboBoxLayout = new QVBoxLayout();

    // ...                                                                              // 2
    
    
    comboBoxGroup->setLayout(comboBoxLayout);                                           // 3
    mainLayout->addWidget(comboBoxGroup);
```

### Create a combo box

A combo box allows users to select an item from a pop up list of items. With Qt, you can create an input field by using the `QComboBox` object.

1. Define a list of scale values. In this example, we'll name it `scaleValues`.

2. Create a combo box by instantiating `QComboBox`. In this example, we'll name it `m_scaleInput`. 

3. Allow users to enter a custom option in the combo box by calling `setEditable(true)`. 

4. If a user enters a custom option, validate that the value they entered is a numerical value within a specific range and decimal place by calling `setValidator(...)`. In this example, set the lower bound to `0.0`, the upper bound to `100.0`, and the decimal places to `3`.

5. Add the list of values to the combo box by calling `addItems(...)`.

6. Add the combo box to `comboBoxLayout` by calling `addWidget(...)`.

```cpp
    QStringList scaleValues = {                                                 // 1
        "1.0",
        "1.5",
        "2.0",
        "5.0",
        "10.0"
    };
    m_scaleInput = new QComboBox(this);                                         // 2
    m_scaleInput->setEditable(true);                                            // 3
    m_scaleInput->setValidator(new QDoubleValidator(0.0, 100.0, 3, this));      // 4
    m_scaleInput->addItems(scaleValues);                                        // 5
    comboBoxLayout->addWidget(m_scaleInput);                                    // 6
```


## Buttons

In this step, you will create a collection of buttons that create an entity with different Shape components, such as with a Box Shape, Sphere Shape, Cone Shape, and so on.

By the end of this step, your buttons should look like this: 
{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/buttons.png" "500" "Shows UI for buttons" >}}

First, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QGroupBox` called `shapeButtons` and a `QGridLayout` called `gridLayout`.
   
2. Later, you will query for all types of shape components registered with the engine, add buttons to this widget, and add signal listeners to the buttons.

3. Finally, set the layout of `shapeButtons` to `gridLayout`, and add `shapeButtons` to `mainLayout`. 

```cpp
    QWidget* shapeButtons = new QWidget(this);          // 1
    QGridLayout* gridLayout = new QGridLayout();

    // ...                                              // 2

    shapeButtons->setLayout(gridLayout);                // 3
    mainLayout->addWidget(shapeButtons);
```

### Query Shape components

1. Query the types of Shape components registered with the engine. In O3DE, all components have a list of provided services that you can query from. In this example, you are looking for Shape components, which all provide "ShapeService".

   - Create a `AzToolsFramework::EntityCompositionRequests::ComponentServicesList` called `providedServices` and add "ShapeService".

    - Get a list of component types. Call `AzToolsFramework::EditorComponentAPIBus::BroadcastResult(...)` and dispatch `AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeIdsByService`, which takes a list of services to include (`providedServices`) and services to exclude (an empty list) and stores the component types to `typeIds`.

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


2. Query the names of the components to add to the buttons.

    - Get a list of component names. Call `AzToolsFramework::EditorComponentAPIBus::BroadcastResult(...)` and dispatch `AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeNames`, which takes the list of component types (`typeIds`) and stores the corresponding component names to `componentNames`.

    ```cpp
        AZStd::vector<AZStd::string> componentNames;
        AzToolsFramework::EditorComponentAPIBus::BroadcastResult(
            componentNames,
            &AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeNames,
            typeIds
        );
    ```

{{< note >}}
You can query a list of services that components provide by calling the component's `GetProvidedServices()` method.
{{< /note >}}


### Add buttons

A button is a UI element that the user can click to trigger a user-defined behavior. With Qt, you can create a button by using the `QPushButton` object. In this example, when the user clicks on the button, it will create an entity with a Shape component. You will define this behavior later.

Loop through the list of component names, create buttons, and add them to the `gridLayout`. For each component:

1. Store the component's name and type from the list of component names and types that you queried earlier. In this example, we'll name them `name` and `typeId`. 

2. Create a button by instantiating `QPushButton`. In this example, name it `shapeButton`. Pass in `name` to add the component's name onto the button. 

3. Later, you will connect `shapeButton` to a signal listener. 

4. Split `gridLayout` into three columns, and add the button.

```cpp
    const int maxColumnCount = 3;
    for (int i = 0; i < componentNames.size(); ++i)
    {
    AZStd::string name = componentNames[i];                                                 // 1 
        AZ::TypeId typeId = typeIds[i];

        QPushButton* shapeButton = new QPushButton(QString::fromUtf8(name.c_str()), this);  // 2

        // ...                                                                              // 3

        int row = i / maxColumnCount;                                                       // 4
        int column = i % maxColumnCount;
        gridLayout->addWidget(shapeButton, row, column);
    }
```

### Add a signal listener with a lambda handler

Next, create a signal listener such that when the user clicks the button, an entity will be created in your scene and the corresponding Shape component will be added to that entity.

In this example, the signal listener uses a lambda handler, so you can define the C++ function without defining a slot.

1. Define `CreateEntityWithShapeComponent` as a standard C++ function in `ShapeExampleWidget.h`. This function accepts an `AZ::TypeId&` as a parameter so it can create an entity with the specified component type.

    ```cpp
    private:
        void CreateEntityWithShapeComponent(const AZ::TypeId& typeId);
    ```

2. In the loop that you created earlier, create a connection from the `clicked` signal in the `shapeButton` to the lambda function in `this`. The lambda function calls `CreateEntityWithShapeComponent(...)` and captures the `typeId` for the Shape component being iterated over.

    ```cpp
        QObject::connect(shapeButton, &QPushButton::clicked, this, [this, typeId]() {
            CreateEntityWithShapeComponent(typeId);
        });
    ```


### Communicate with EBuses

Define `CreateEntityWithShapeComponent(...)`, which communicates with O3DE EBuses to create a new entity with a component specified by the `typeId` parameter.

1. Send a request to create a new entity by calling `EditorRequestBus::BroadcastResult(...)`. Dispatch the `EditorRequests::CreateNewEntity` event, which creates a new entity and returns its `AZ::EntityId`. The new entity's `AZ::EntityId` is stored in.

2. If the user entered a name in the input field, update the entity's name. 

   - Get the name of the entity by calling `text()`, and store it in `entityName`.

   - If the user enabled the check box to apply a suffix of the component's name to the entity's name, query the component's name. Call `EditorComponentAPIBus::BroadcastResult(...)` and dispatch the `EditorComponentAPIRequests::FindComponentTypeNames` event, which finds the component names of the provided list and stores them in `componentNames`.  

   - Format the name and suffix, if any.

   - Call `EditorEntityAPIBus::Event(...)` and dispatch `EditorEntityAPIRequests::SetName` to set the name of `newEntityId` to `entityName`.

3. Set the entity's scale.

   - Get the value in the combo box by calling `currentText()`, and store it in `scale`.

   - Set the entity's scale by calling `AZ::TransformBus::Event()`. Dispatch `SetLocalUniformScale` to set the scale of `newEntityId`.

4. Add a Shape component to the entity. Call `EditorComponentAPIBus::Broadcast(...)` and dispatch `EditorComponentAPIRequests::AddComponentsOfType`, which adds the components from the provided list to `newEntityId`.

```cpp
void ShapeExampleWidget::CreateEntityWithShapeComponent(const AZ::TypeId& typeId)
{
    // 1        
    AZ::EntityId newEntityId;
    EditorRequestBus::BroadcastResult(newEntityId, &EditorRequests::CreateNewEntity, AZ::EntityId());

    // 2
    if (!m_nameInput->text().isEmpty())
    {
        QString entityName = m_nameInput->text();

        if (m_addShapeNameSuffix->isChecked())
        {
            AZStd::vector<AZStd::string> componentNames;
            EditorComponentAPIBus::BroadcastResult(
                componentNames,
                &EditorComponentAPIRequests::FindComponentTypeNames,
                AZ::ComponentTypeList{ typeId }
            );

            AZ_Assert(componentNames.size() == 1, "Unable to find component name");

            QString shapeName(componentNames[0].c_str());
            shapeName.replace(" ", "");

            entityName = QString("%1_%2").arg(entityName).arg(shapeName);
        }
        
        EditorEntityAPIBus::Event(newEntityId, &EditorEntityAPIRequests::SetName, entityName.toUtf8().constData());
    }

    // 3
    bool validFloat = false;
    float scale = m_scaleInput->currentText().toFloat(&validFloat);
    if (validFloat)
    {
        AZ::TransformBus::Event(newEntityId, &AZ::TransformInterface::SetLocalUniformScale, scale);
    }

    // 4
    EditorComponentAPIBus::Broadcast(&EditorComponentAPIRequests::AddComponentsOfType, newEntityId, AZ::ComponentTypeList{ typeId });
}
```


## Icon

An icon is an image file that's used to represent your tool in the Editor. The icon appears in the Edit Mode Toolbar in the Editor (see the following image).

{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/icon.png" "500" "Add an icon for your tool in the Editor" >}}


### Add an icon

The following instructions walk you through how to store the icon using the Qt Resource System and load it from your Gem module. Be aware that some of the instructions may already be done by the `PythonToolGem` template.

1. Add an image file to the `Code/Source` directory to use as your icon. In this example, the icon is named `toolbar.svg`. We recommend that your icon adheres to the guidelines in [UI development best practices](https://o3de.org/docs/tools-ui/uidev-component-development-guidelines/#ui-development-best-practices).

2. Add your icon to PyShapeExample Gem's resources by updating `Code/Source/ShapeExample.qrc` with your new icon's file name.
    
    ```xml
    <!DOCTYPE RCC><RCC version="1.0">
        <qresource prefix="/PyShapeExample">
            <file alias="toolbar_icon.svg">toolbar_icon.svg</file>
        </qresource>
    </RCC>
    ```

3. Register ShapeExample Gem's resources to Qt Resource System by adding the following code in `Code/Source/EditorModule.cpp`.

    - Define the function `InitShapeExampleResource()` and call `Q_INIT_RESOURCE(...)` to register the Qt resrouces listed in `ShapeExample.qrc`.

    ```cpp
    void InitShapeExampleResources()
    {
        Q_INIT_RESOURCE(ShapeExample);
    }
    ```

   - Call `InitShapeExampleResource()` in the `EditorModule` class's constructor.

## Build and debug your tool

Build and debug your custom tool using **Visual Studio 2019**.

1. Launch Visual Studio 2019 and open the O3DE solution.

2. Find your Gem in the Solution Explorer. Right-click and select **Build** or **Debug**.

After, you can launch Editor and load the Gem.

Congratulations! You created a custom tool Gem that's written in C++, built it, and loaded it in the Editor. Your Shape Example tool should look something like this:

{{< image-width "/images/learning-guide/tutorials/extend-the-editor/shape-example/cpp-shape-example-ui.png" "500" "An image of the Shape Example tool." >}}

## Download the ShapeExample Gem sample

This tutorial is based off of the **ShapeExample** Gem in [`o3de/sample-code-gems` repository](https://github.com/o3de/sample-code-gems/tree/main/cpp_gems/ShapeExample). You can download this sample and load it in the Editor.

1. Download or clone the repository. The ShapeExample Gem is located in `sample-code-gems/cpp_gems/ShapeExample`.

    ```cmd
    git clone https://github.com/o3de/sample-code-gems.git
    ```

2. Before you can open the Shape Example tool, do the following:

   - Register your Gem.

   - Enable it in your project.

   - Rebuild your project.

   - Open the tool in the Editor.

    These steps are explained earlier in this tutorial (refer to [Create a tool with the `CppToolGem` template](#create-a-tool-with-the-cpptoolgem-template)).