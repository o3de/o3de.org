---
linkTitle: Create a Custom Shape Tool in Python
title: Create a Custom Shape Tool in Python for Open 3D Engine
description: Learn to create a custom shape tool in Python to extend Open 3D Engine (O3DE).
weight: 300
toc: true
---

In this tutorial, you'll create a custom tool, **Shape Example**, in Python that extends **Open 3D Engine (O3DE) Editor** . The Shape Example tool allows you to create entities with a Shape component and configure their component properties. You'll learn how to use the `PythonToolGem` template and practice Python development with O3DE's Tools UI API and other O3DE APIs.

This tutorial is based off of the **PyShapeExample** Gem in [`o3de/sample-code-gems` repository](https://github.com/o3de/sample-code-gems/tree/main/py_gems/PyShapeExample). You can reference the PyShapeExample Gem sample as you follow along this tutorial.

By the end of this tutorial, you'll be able to create your own tools that extends O3DE Editor.


## Create a tool with the `PythonToolGem` template

The `PythonToolGem` template contains a basic Python framework to create a dockable widget in O3DE Editor.

1. Create a Gem using the **O3DE CLI (`o3de`)** script in `<engine>/scripts`. Specify the name `PyShapeExample` by using the `--gem-name` option and the template `PythonToolGem` by using the `--template-name` option. By default, this creates the Gem directory in `<user>/.o3de/Gems` -- or you can specify a location by using the `--gem-path` option. Depending on the location, this automatically registers the Gem to either the `.o3de` registry, engine, or project.

    ```cmd
    scripts/o3de create-gem --gem-name ShapeExample --template-name PyToolGem
    ```
2. Add the Gem in your project by using the `o3de` script.

    ```cmd
    scripts/o3de enable-gem -gn PythonToolGem -pp <project-path>
    ```
    Or, enable the Gem using the Project Manager (refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems.md)).

3. Build the project by using the `o3de` script (refer to [Build a project](https://o3de.org/docs/user-guide/build/configure-and-build/#build-a-project)). Or, use the Project Manager (refer to the **Build** action in the [Project Manager](https://o3de.org/docs/user-guide/project-config/project-manager/)) page.

4. Open O3DE Editor for your project.

5. Open the tool by selecting **Tools > Examples** from the file menu.

Now you can access your new tool from O3DE Editor. By default, this tool contains a simple user interface (UI). In the next steps, we'll design the tool's UI and code its functionality.

## Code directory

In the ShapeExample Gem's `Code/Source` and `Editor/Scripts` directories, you'll find the following classes and frameworks that make up your custom tool.

### Modules and system components

All Gems have modules and system component classes written in C++ that connect the tool to O3DE and allow it to communicate with other systems. The `PythonToolGem` template already contains all of the code needed to run the tool in the O3DE Editor. You can find these C++ files in `Code/Source`.

For more information on Gem modules and system components, refer to the [C++ Programming for Gem Development](docs/user-guide/gems/development/programming-for-gems.md) page.

### O3DE and Qt frameworks

O3DE extends the **Qt** framework, so you will use [PySide2](https://pypi.org/project/PySide2/)---a Python module based on [Qt for Python](https://doc.qt.io/qtforpython/)---to create a graphical user interface (GUI). You will also use O3DE's EBuses to communicate with other O3DE interfaces, such as entities and components, and connect them to Qt elements.

You will write most of your tool's functionality and UI elements in the`PyShapeExampleDialog` class that's located in `Editor/Scripts/pyshapeexample_dialog.py`.

### Qt Resources

The [Qt Resource System](https://doc.qt.io/qt-5/resources.html) allows Gems to store and load image files via a `.qrc` file. This eliminates the need to load image files from absolute paths, making it simpler for you to distribute your Gem. Later, you will store an image file to create an icon for your tool.



### Dialogs, Widgets, and layouts

With Qt for Python, you can create a dialogs which are top-level windows. 

Qt for Python creates a top-level window called a *dialog*. Within a dialog are *widgets*, which are containers for UI elements, and *layouts*, which define how those UI elements are arranged. (In comparison, Qt in C++ creates a main widget instead of a dialog.) Each widget can have its own layout and additional sub-widgets. This nested widget and layout structure allows you to organize groups of UI elements.

The `PyShapeExampleDialog` class inherits from `QDialog`, which creates the dialog window. The following instructions walk you through how to set up your dialog's layout. Be aware that some of the instructions may already be done by the `PythonToolGem` template.

1. At the top of your constructor, instantiate a `QVBoxLayout` called `main_layout`.

2. Later, you will create various UI elements and add them to `main_layout`.

3. (Optional) You can add spacing to `main_layout` by using `setSpacing(...)`.

4. We recommend that you add a stretch at the bottom of `main_layout` by using `addStretch()` to fill any expanded space when you resize the window.

5. Finally, set `main_layout` to be the layout for this dialog by using `self.setLayout(...)`.

```py
class PyShapeExampleDialog(QDialog):
    
    def __init__(self, parent=None):

        main_layout = QVBoxLayout()
        main_layout.setSpacing(20)

        // Add various UI elements to main_layout

        main_layout.addStretch()

        self.setLayout(main_layout)
```


## Input fields and check boxes

In this step, create an input field for the entity's name and a check box to append a suffix that contains the component's name. For example, suppose you set the entity's name to "MyEntity" and enable the suffix check box. When you create Shape components of type Box and Sphere, they will respectively be named "MyEntity_BoxShape" and "MyEntity_SphereShape".

First, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QGroupBox` called `entityNameWidget` and a `QFormLayout` called `formLayout`.
   
2. Later, you will create the input field and check box and add them to this widget. 

3. Finally, set the layout of `entityNameWidget` to `formLayout`, and add `entityNameWidget` to `main_layout`. 


```py
        entity_name_widget = QGroupBox("Name your entity (Line Edit)", self)

        form_layout = QFormLayout()

        #

        entity_name_widget.setLayout(form_layout)
        main_layout.addWidget(entity_name_widget)
```

### Create an input field

An input field takes text input from the user. With Qt, you can create an input field by using the `QLineEdit` object. In this example, the input field is used to name the generated entity. You will define this behavior later. 

1. Create an input field by instantiating `QLineEdit`. In this example, name it `name_input`.

2. (Optional) Set the placeholder text in `name_input` by calling `setPlaceholderText(...)`.

3. (Optional) Enable a button to clear the text using `setClearButtonEnabled(True)`.

```py
        # Line edit to (optionally) rename the entity that gets created
        self.name_input = QLineEdit(self)
        self.name_input.setPlaceholderText("Optional")
        self.name_input.setClearButtonEnabled(True)
```

### Create a check box

A check box is an option button that users can enable or disable to trigger a user-defined behavior. With Qt, you can create an input field by using the `QCheckBox` object. In this example, the check box will control whether or not to append a suffix to the entity's name. At runtime, it will start disabled, and enable when the user enters the entity's name to the input field. You will define this behavior later.

1. Create a check box by instantiating `QCheckBox`. In this example, name it `add_shape_name_suffix`.

2. Set the check box to the start in the disabled state by using `setDisabled(True)`.

```py
        self.add_shape_name_suffix = QCheckBox(self)
        self.add_shape_name_suffix.setDisabled(True)
        self.add_shape_name_suffix.setToolTip("e.g. Entity2_BoxShape")

```

### Add a signal listener with a slot handler

Qt uses signals and slots to communicate between objects (refer to [Signals & Slots](https://doc.qt.io/qtforpython/overviews/signalsandslots.html) in Qt Documentation). You will set up a signal listener such that when the user enters text into the input field at runtime, the check box automatically enables. 

In this example, the signal listener uses a slot handler, which is essentially a Python function that a signal can connect to.

1. Call `connect(...)` to create a connection between the input field (`name_input`) to the signal (`textChanged`) and slot (`on_name_input_text_changed`).
   
    ```py
            self.name_input.textChanged.connect(self.on_name_input_text_changed)
    ```

2. Outside of the constructor, define a slot as you would for a standard Python function. In this example, name the slot `on_name_input_text_changed`.

    ```py
        def on_name_input_text_changed(self, text):

            self.add_shape_name_suffix.setEnabled(len(text))
            
    ```


### Add UI elements to layout
After creating the UI elements -- an input field and a check box -- and connecting a signal listener to them, add them to the layout. To ensure they belong to the sub-widget `entityNameWidget`, add them to the corresponding layout, `formLayout`, by using `addRow(...)`. 


```py
        form_layout.addRow("Entity name", self.name_input)
        form_layout.addRow("Add shape name suffix", self.add_shape_name_suffix)
```

## Buttons

In this step, you will create a collection of buttons that create an entity of different shape types, such as a box, sphere, cone, and so on. 

Again, wrap these UI elements in their own sub-widget, set the layout, and add it to the main widget. 

1. To start, instantiate a `QGroupBox` called `shape_buttons` and a `QGridLayout` called `grid_layout`.

2. Later, you will query for all types of shape components registered with the engine, add buttons to this widget, and add signal listeners to the buttons.

3. Finally, set the layout of `shape_buttons` to `grid_layout`, and add `shape_buttons` to `main_layout`.

```py
        # 1
        shape_buttons = QGroupBox("Choose your shape (Button)", self)
        grid_layout = QGridLayout()

        # 2

        # 3
        shape_buttons.setLayout(grid_layout)
        main_layout.addWidget(shape_buttons)

```

### Query Shape components

1. Query the types of Shape components that're registered with the engine. In O3DE, all components have a list of provided services that you can query from. In this example, you are looking for Shape components, which all provide "ShapeService".

   - Create a component service list called `providedServices` and add "ShapeService". 

   - Get a list of component types that provide "ShapeService". Use `editor.EditorComponentAPIBus(...)` to call `bus.Broadcast` and dispatch `FindComponentTypeIdsByService`, which takes a list of services to include (`provided_services`) and services to exclude (an empty list) and stores the component types to `typeIds`.

   ```py   

           shape_service = math.Crc32_CreateCrc32("ShapeService")
           provided_services = [shape_service.value]
           type_ids = editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeIdsByService', provided_services, [])
   ```

2. Query the names of the Shape components. Later, you will add these name to the buttons.

    - Get a list of component names. Use `editor.EditorComponentAPIBus(...)` to call `bus.Broadcast` and dispatch `FindComponentTypeNames`, takes the list of component types (`typeIds`) and stores the corresponsing component names to `component_names`.

    ```py
            component_names = editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeNames', type_ids)
    ```

    {{ note }}
    You can query a list of services that components provide by calling the component's `GetProvidedServices()` method.
    {{ /note }}

### Add buttons

An input field is a UI element that takes text input from the user. With Qt, you can create an input field by using the `QLineEdit` object.

1. Create an input field by instantiating `QLineEdit`. In this example, name it `name_input`.

A button is a UI element that the user can click to trigger a user-defined behavior. With Qt, you can create an input field by using the `QPushButton` object. In this example, when the user clicks on the button, it will create an entity with a Shape component. You will define this behavior later.

Next, loop through the list of component names, create buttons, and add them to the `grid_layout`.

For each component:

1. Create a button by instantiateing `QPushButton`. In this example, name it `name_input`. Pass in `name` to add the component's name onto the button.

2. Later, you will connect `shape_button` to a signal listener.

4. Split `grid_layout` into three columns, and add the button.

```py
        max_column_count = 3
        for i, name in enumerate(component_names):
            type_id = type_ids[i]

            shape_button = QPushButton(name, self)

            # Connect

            row = i / max_column_count
            column = i % max_column_count
            grid_layout.addWidget(shape_button, row, column)
```

### Add a signal listener with a lambda handler

Next, create a signal listener such that when the user clicks the button, an entity will be created in your scene and the corresponding Shape component will be added to that entity.

In this example, the signal listener uses a lambda handler, so you can define the function without defining a slot.

1. Declare a function `create_entity_with_shape_component` to connect to the signal listener. This function communicates with O3DE's EBuses, which you will define later.

    ```py
        def create_entity_with_shape_component(self, type_id):
    ```

2. In the loop that you created earlier, create a connection from the `clicked` signal in the `shape_button` to a lambda function. The lambda function calls `create_entity_with_shape_component(...)` and passes in the `type_id`.

    ```py
            shape_button.clicked.connect(lambda checked=False, type_id=type_id: self.create_entity_with_shape_component(type_id))
    ```

 ### Communicate with EBusses

Define `CreateEntityWithShapeComponent(...)`, which communicates with O3DE EBuses to create a new entity with a component specified by the `typeId` parameter.

1. Send a request to create a new entity by using `editor.ToolsApplicationRequestBus` to call `bus.Broadcast` and dispatch `CreateNewEntity`, which creates a new entity and returns its `AZ::EntityId`. The new entity's `AZ::EntityId` is stored in `new_entity_id`.

2. If the user entered a name in the input field, update the entity's name.

   - Get the name of the entity by calling `text()`, and store it in `entity_name`.

   - If the user enabled the check box to apply a suffix of the component's name to the entity's name, query the component's name. Use `editor.EditorComponentAPIBus` to call `bus.Broadcast` and dispatch the `FindComponentTypeNames` event, which finds the component names of the provided list and stores them in `component_names`.  

   - Format the name and suffix, if any.

   - Use `editor.EditorEntityAPIBus` to call `bus.Event`  and dispatch `"SetName"` to set the name of `new_entity_id` to `entity_name`.

3. Set the entity's scale.
   
   - Get the value in the combo box by calling `currentText()`, and store it in `scale_text`.

   - Set the entity's scale by using `components.TransformBus` to call `bus.Event` and dispatch `"SetLocalUniformScale"`, which sets the scale of `new_entity_id`. Be aware that you must convert `scale_text` to a float.

4. Add a Shape component to the entity. Use `editor.EditorComponentAPIBus` to call `bus.Broadcast` and dispatch `"AddComponentsOfType"`, which adds the components from the provided list to `new_entity_id`.

```py
     def create_entity_with_shape_component(self, type_id):
        
        # 1 
        new_entity_id = editor.ToolsApplicationRequestBus(bus.Broadcast, 'CreateNewEntity', entity.EntityId())

        # 2
        if self.name_input.text():
            entity_name = self.name_input.text()

            if self.add_shape_name_suffix.isChecked():
                component_names = editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeNames', [type_id])

                shape_name = component_names[0]
                shape_name = shape_name.replace(" ", "")

                entity_name = f"{entity_name}_{shape_name}"

            editor.EditorEntityAPIBus(bus.Event, "SetName", new_entity_id, entity_name)

        # 3
        try:
            scale_text = self.scale_combobox.currentText()
            components.TransformBus(bus.Event, "SetLocalUniformScale", new_entity_id, float(scale_text))
        except:
            pass

        # 4
        editor.EditorComponentAPIBus(bus.Broadcast, "AddComponentsOfType", new_entity_id, [type_id])
```

## Icon

An icon is an image file that's used to represent your tool in the O3DE Editor. The following instructions walk you through how to store the icon using the Qt Resource System and load it from your Gem module. Be aware that some of the instructions may already be done by the `PythonToolGem` template.
 
We recommend that your icon adheres to the guidelines in [UI development best practices](https://o3de.org/docs/tools-ui/uidev-component-development-guidelines/#ui-development-best-practices).

### Add an icon

1. Add an image file to the `Code/Source` directory to use as your icon. In this example, the icon is named `toolbar.svg`.

2. Add your icon to PyShapeExample Gem's resources by updating `Code/Source/ShapeExample.qrc` with your new icon's file name.

    ```xml
    <!DOCTYPE RCC><RCC version="1.0">
        <qresource prefix="/PyShapeExample">
            <file alias="toolbar_icon.svg">toolbar_icon.svg</file>
        </qresource>
    </RCC>
    ```

3. Register PyShapeExample Gem's resources to Qt Resource System by adding the following code in `Code/Source/EditorModule.cpp`. 

    - Define the function `InitShapeExampleResource()` and call `Q_INIT_RESOURCE(...)` to register the Qt resrouces listed in `ShapeExample.qrc`.

        ```cpp
        void InitShapeExampleResources()
        {
            Q_INIT_RESOURCE(ShapeExample);
        }
        ```

    - Call `InitShapeExampleResource()` in the `EditorModule` class's constructor.

## Build and debug your tool

[todo]

## Download the ShapeExample Gem sample

This tutorial is based off of the PyShapeExample Gem in [`o3de/sample-code-gems` repository](https://github.com/o3de/sample-code-gems/tree/main/py_gems/PyShapeExample). You can download this sample and load it in the O3DE Editor.

1. Download or clone the repository. The PyShapeExample Gem is located in `sample-code-gems/py_gems/PyShapeExample`.

    ```cmd
    git clone https://github.com/o3de/sample-code-gems.git
    ```

2. Register your Gem, enable it in your project, rebuild your project, and open the tool from the O3DE Editor. These steps are explained earlier in this tutorial (refer to [Create a tool with the `PythonToolGem` template](#create-a-tool-with-the-pythontoolgem-template)).