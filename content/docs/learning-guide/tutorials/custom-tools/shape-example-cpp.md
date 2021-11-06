---
linkTitle: Create a Custom Shape Tool in C++
title: Create a Custom Shape Tool in C++ for Open 3D Engine
description: Learn to create a custom shape tool in C++ to extend Open 3D Engine (O3DE).
weight: 200
toc: true
---

In this tutorial, you'll create a custom tool, **Shape Example**, in C++ that extends **Open 3D Engine (O3DE)**. The **Shape Example** tool allows you to create entities with a Shape component and configure their component properties. You'll learn how to use the `CppToolGem` template and practice C++ development with the Tools UI API and other O3DE APIs.

This tutorial is based off of the **ShapeExample** Gem in [`o3de/sample-code-gems` repository](https://github.com/o3de/sample-code-gems/tree/main/cpp_gems/ShapeExample). You can reference the ShapeExample Gem sample as you follow along this tutorial.

By the end of this tutorial, you'll be able to create your own tools that extends **O3DE Editor**.


## Create a tool with the `CppToolGem` template

The `CppToolGem` template contains a basic framework to create a dockable widget in O3DE Editor. 

1. Create a Gem by using the **O3DE CLI (`o3de`)** script that's in your engine source directory. Specify the name `ShapeExample` by using the `--gem-name` option and the template `CppToolGem` by using the `--template-name` option. By default, this creates the Gem directory in `<user>/.o3de/Gems` -- or you can specify a location by using the `--gem-path` option. Depending on the location, this automatically registers the Gem to either the `.o3de` registry, engine, or project.

    ```cmd
    scripts/o3de create-gem --gem-name ShapeExample --template-name CppToolGem
    ```

2. Register the Gem to your project.

    ```cmd
    <engine>/scripts/o3de register -gp <gem-path> -espp <project-path>
    ```

3. Add the Gem in your project.

    ```cmd
    scripts/o3de enable-gem -gn CppToolGem -pp <project-path>
    ```

    Or, enable the Gem using the Project Manager (refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems.md)).

4. Build the project by using the O3DE CLI (refer to [Build a project](https://o3de.org/docs/user-guide/build/configure-and-build/#build-a-project)). Or, use the Project Manager (refer to the **Build** action in the [Project Manager](https://o3de.org/docs/user-guide/project-config/project-manager/)) page.

5. Open O3DE Editor for your project.

6. Open the tool by selecting **Tools > Examples**.

Now you can access your new tool from O3DE Editor. By default, this tool contains a simple user interface (UI). In the next steps, we'll design the tool's UI and code its functionality.


## Code directory

In the ShapeExample Gem's `Code/Source` directory, you'll find the following files that make up your custom tool.

### Modules and system components

All Gems have modules and system components that connect the tool to O3DE and allow it to communicate with other systems. The CppToolGem template already contains all of the code needed to run the tool in the O3DE Editor. 

For more information on Gem modules and system components, refer to the [C++ Programming for Gem Development](docs/user-guide/gems/development/programming-for-gems.md) page.


### Widget

Most of the code for your tool's functionality and UI elements will be in the `ShapeExampleWidget.h` and `ShapeExampleWidget.cpp` file. O3DE builds off the Qt framework, so you will use [Qt Widgets Module](https://doc.qt.io/qt-5/qtwidgets-index.html) to create a graphical user interface (GUI). You will also use EBusses to communicate with other O3DE interfaces, such as entities and components, to program the tool's functionality.


### Qt Resources

The [Qt Resource System](https://doc.qt.io/qt-5/resources.html), which allows Gems to store and load image files via a `.qrc` file. This eliminates the need to load image files from absolute paths, making it simpler for you to distribute your Gem. Later, you will store an image file to create an icon for your tool.


## Widgets and layouts 

Widgets are containers for UI elements and layouts define how those UI elements are formatted. Your custom shape tool is essentially a main widget that contains sub-widgets of UI elements within it. Each widget can have its own layout. This nested widget and layout structure alllows you to organize groups of UI elements.

The `ShapeExampleWidget.cpp` file already inherits from `QWidget`, which creates the main widget. Next, you must create a layout for the main widget. Refer to the snippet below for the following instructions: 

1. At the top of your constructor, instantiate a `QVBoxLayout` called `mainLayout`.
   
2. Later, you will create various UI elements and add them to the `mainLayout`. 

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
}
```

## Input fields and check boxes

In this step, you will create an input field for the entity's name and a check box to append a suffix that contains the component's name. For example, suppose you set the entity's name to "MyEntity" and enable the suffix check box. When you create Shape components of type Box and Sphere, they will respectively be named "MyEntity_BoxShape" and "MyEntity_SphereShape".

First, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QWidget` called `entityNameWidget` and a `QFormLayout` called `formLayout`.
   
2. Later, you will create the input field and check box and add them to this widget. 

3. Finally, set the layout of `entityNameWidget` to `formLayout`, and add `entityNameWidget` to `mainLayout`. 

```cpp
QWidget* entityNameWidget = new QWidget(this);
QFormLayout* formLayout = new QFormLayout();

// Create an input field and check box

entityNameWidget->setLayout(formLayout);
mainLayout->addWidget(entityNameWidget);
```

### Add an input field

Next, create an input field using the `QLineEdit` object called `m_nameInput`. Set the placeholder text in the input field using `setPlaceholderText(...)` and toggle a button to clear the text using `setClearButtonEnabled(...)`.


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

Qt uses signals and slots to communicate between objects (refer to [Signals & Slots](https://doc.qt.io/qt-5/signalsandslots.html) in Qt Documentation). You will set up a signal listener such that when the user updates the input field, the check box automatically enables. 

In this example, the signal listener uses a slot handler, which is essentially a C++ function that a signal can connect to. 

1. Define a slot by using the `Q_SLOTS` macro as shown in the following line of `ShapeExampleWidget.h`:

    ```cpp
    private Q_SLOTS:
        void OnNameInputTextChanged(const QString& text);
    ```

2. Call `QObject::connect(...)` to create a connection between the input field (`m_nameInput`) to the signal (`QLineEdit::TextChanged`) and slot (ShapeExampleWidget::OnNameINputTextChanged`). Refer to the following line of `ShapeExampleWidget.cpp`.


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


## Buttons

In this step, you will create a collection of buttons that create an entity of different shape types, such as a box, sphere, cone, and so on. 

Again, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QWidget` called `shapeButtons` and a `QGridLayout` called `gridLayout`.
   
2. Later, you will query types of shape components, add buttons to this widget, and add signal listeners to the buttons.

3. Finally, set the layout of `shapeButtons` to `gridLayout`, and add `shapeButtons` to `mainLayout`. 

```cpp
// 1
QWidget* shapeButtons = new QWidget(this);
QGridLayout* gridLayout = new QGridLayout();

// 2

// 3
shapeButtons->setLayout(gridLayout);
mainLayout->addWidget(shapeButtons);
```

### Query types of Shape components

First, query the types of shape components by specifying a list of provided services. In O3DE, all components have a list of provided services, that you can query from. In this example, Shape components provide the "ShapeService". 

1. Create a `AzToolsFramework::EntityCompositionRequests::ComponentServicesList` called `providedServices` and add "ShapeService". 

2. Get a list of component types. Call `AzToolsFramework::EditorComponentAPIBus::BroadcastResult(...)` and dispatch `AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeIdsByService`, which takes a list of services to include (`providedServices`) and services to exclude (an empty list) and stores the component types to `typeIds`.

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


Next, get the names of the components to add to the buttons. 

1. Get a list of component names. Call `AzToolsFramework::EditorComponentAPIBus::BroadcastResult(...)` and dispatch `AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeNames`, which takes the list of component types (`typeIds`) and stores the associated of component names to `componentNames`.

```cpp
AZStd::vector<AZStd::string> componentNames;
AzToolsFramework::EditorComponentAPIBus::BroadcastResult(
    componentNames,
    &AzToolsFramework::EditorComponentAPIRequests::FindComponentTypeNames,
    typeIds
);
```

{{ note }}
You can query a list of services that components provide by calling the component's `GetProvidedServices()` method.
{{ /note }}

### Add buttons

Next, you will loop through the list of components, create buttons, and add them to the `gridLayout`. Refer to the following snippet in `ShapeEXampleQWidget.cpp`.

For each component:

1. Store the component's name and type from the list of component names and types that you queried earlier.

2. Create a button using the QButton object called `shapeButton`. 
   - Pass in `name` to add the component's name onto the button. 
   - Set the button minimum height to `40` by using `setMinimumHeight(...)`. 

3. Later, you will connect `shapeButton` to a signal listener. 

4. Add the button to `gridLayout`, which is split into three columns. 

```cpp
const int maxColumnCount = 3;
for (int i = 0; i < componentNames.size(); ++i)
{
    AZStd::string name = componentNames[i];
    AZ::TypeId typeId = typeIds[i];

    QPushButton* shapeButton = new QPushButton(QString::fromUtf8(name.c_str()), this);
    shapeButton->setMinimumHeight(40);

    // Connect 

    int row = i / maxColumnCount;
    int column = i % maxColumnCount;
    gridLayout->addWidget(shapeButton, row, column);
}

```

### Add a signal listener with a lambda handler

Next, you will create a signal listener such that when the user clicks a button, an entity with the corresponding Shape component will spawn in your scene. 

In this example, the signal listener uses a lambda handler, so you can define the C++ function without defining a slot.

1. Define `CreateEntityWithShapeComponent` as a standard C++ function in `ShapeExampleWidget.h`. This function accepts an `AZ::TypeId&` as a parameter so it can create an entity with the specified component type.

    ```cpp
    private:
        void CreateEntityWithShapeComponent(const AZ::TypeId& typeId);
    ```

2. In the for loop that you created earlier, create a connection from the `clicked` signal in the `shapeButton` to the lambda function in `this`. The lambda function calls `CreateEntityWithShapeComponent(...)` and passes in the `typeId`. 

    ```cpp
    QObject::connect(shapeButton, &QPushButton::clicked, this, [this, typeId]() {
        CreateEntityWithShapeComponent(typeId);
    });
    ```



### Communicate with EBusses

Now, you will define `CreateEntityWithShapeComponent(...)`, which uses communicates with O3DE EBusses to create a new entity with a component specified by the `typeId` parameter.

1. Use the namespace `AzToolsFramework`. This namespace provides APIs to the necessary Editor EBusses. 

2. Send a request to create a new entity by calling `EditorRequestBus::BroadcastResult(...)`. Dispatch the `EditorRequests::CreateNewEntity` event, which instantiates an `AZ::EntityId` and stores it in `newEntityId`. 

3. If the user entered a name in the input field, update the entity's name. 

   - Get the name of the entity by calling `m_nameInput->text()` and store it in `entityName`.

   - If the user enabled the check box to apply a suffix of the component's name to the entity's name, query the component's name. Call `EditorComponentAPIBus::BroadcastResult(...)` and dispatch the `EditorComponentAPIRequests::FindComponentTypeNames` event, which finds the component names of the provided list and stores them in `componentNames`.  

   - Format the name and suffix, if any.

    - Call `EditorEntityAPIBus::Event(...)` and dispatch `EditorEntityAPIRequests::SetName` to set the name of `newEntityId` to `entityName`. 

4. Add a Shape component to the entity. Call `EditorComponentAPIBus::Broadcast(...)` and dispatch `EditorComponentAPIRequests::AddComponentsOfType`, which adds the components from the provided list to `newEntityId`.

```cpp
    void ShapeExampleWidget::CreateEntityWithShapeComponent(const AZ::TypeId& typeId)
    {
        // 1
        using namespace AzToolsFramework;

        // 2
        AZ::EntityId newEntityId;
        EditorRequestBus::BroadcastResult(newEntityId, &EditorRequests::CreateNewEntity, AZ::EntityId());

        // 3
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

        // 4
        EditorComponentAPIBus::Broadcast(&EditorComponentAPIRequests::AddComponentsOfType, newEntityId, AZ::ComponentTypeList{ typeId });
    }
```


## Icon

An icon is an image file that's used to represent your tool in the O3DE Editor. You will store the icon using the Qt Resource System and load it from your Gem module. We recommend that your icon adheres to the guidelines in [UI development best practices](https://o3de.org/docs/tools-ui/uidev-component-development-guidelines/#ui-development-best-practices).

### Add an icon

1. Add an image file to the `Code/Source` directory to use as your icon.
   
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

## Build and debug your tool

Build and debug your custom shape tool using **Visual Studio 2019**.

1. Launch Visual Studio 2019 and open the O3DE solution.
2. Find your Gem in the Solution Explorer. Right-click and select **Build** or **Debug**.

After, you can launch O3DE Editor and load the Gem.

Congratualations! You've created a custom Shape tool, built it, and loaded it in the O3DE Editor.

## Download the ShapeExample Gem sample

This tutorial is based off of the **ShapeExample** Gem in [`o3de/sample-code-gems` repository](https://github.com/o3de/sample-code-gems/tree/main/cpp_gems/ShapeExample). You can download this sample and load it in the O3DE Editor.

1. Download or clone the repository. The ShapeExample Gem is located in `sample-code-gems/cpp_gems/ShapeExample`. 

    ```cmd
    git clone https://github.com/o3de/sample-code-gems.git
    ```

2. Register your Gem, enable it in your project, rebuild your project, and open the tool from the O3DE Editor. These steps are explained earlier in this tutorial (refer to [Create a tool with the `CppToolGem` template](#create-a-tool-with-the-cpptoolgem-template)). 