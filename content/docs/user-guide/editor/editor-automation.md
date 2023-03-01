---
linkTitle: Automating Editor
title: Automating the O3DE Editor with the Python Editor Bindings Gem
description: Use the features of the Python Editor Bindings Gem to automate actions and tasks inside of the O3DE Editor.
weight: 600
---

 Some tasks in the O3DE Editor are tedious or could easily be automated, and to support that, O3DE has support for scripting the editor through Python bindings to the underlying editor implementation. These bindings are enabled with the **PythonEditorBindings** gem, and interacted with through a Python 3 library embedded within the editor. You can access a Python REPL through an in-editor console, or launch the editor with an argument that loads and runs a Python script on boot.

## Enable editor automation 

 Editor automation is enabled by selecting the **PythonEditorBindings** gem for your project, and then rebuilding the editor. No specific configuration (debug, profile, release) is required to enable the Python bindings. Because the bindings are enabled through a gem that you select for your project, you'll need to make sure that this gem is enabled for *all* projects that you intend to use automation with.

## Use editor automation 

 The easiest way to get started with editor automation is to use the REPL that's available from within the O3DE Editor and try out some commands. Open this REPL by selecting **Tools** > **Other** > **Python Console**. The Python console opens in a new editor view, which gives you access to a console that displays output from Python, the REPL input, and a full reference of available commands. To get access to the reference, select the **?** icon in the lower-right corner of the console.

 You can also access a set of available scripts, including some samples for common tasks in the editor, by selecting **Tools** > **Other** > **Python Scripts**. These scripts are stored in a directory depending on their scope. Scripts only for your project are stored in the `Editor\Scripts` directory, and scripts meant to be used along with a gem are stored at `Gems\<name>\Editor\Scripts`.

 Editor automation is driven primarily through the event bus (EBus) system. Before working with the editor bindings, you should become familiar with the basics of EBus from [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/). To learn about some of the specific buses used by the editor automation system, take a look at the [Python Editor Bindings Gem examples](#python-editor-bindings-gem-examples).

## Python Editor Bindings Gem Examples

 The Python Editor Bindings Gem provides an API that defines a connection to the Editor's C++ implementation, using the O3DE event bus (Ebus) to send messages between Python scripts and the Editor. This reference covers the use of the bindings API to perform tasks like interacting with components, entities, and properties.
 
 ## Level management
 
 Use these functions to load, create, and save levels. In order to use other binding APIs, a level needs to be loaded in O3DE Editor.
 
 ```python
 # opens a level with a user prompt
 azlmbr.legacy.general.open_level(strLevelName)
 
 # opens a level without prompting the user (better for automation)
 azlmbr.legacy.general.open_level_no_prompt(strLevelName)
 
 # creates a level with the parameters of 'levelName', 'resolution', 'unitSize' and 'bUseTerrain'
 azlmbr.legacy.general.create_level(levelName, resolution, unitSize, bUseTerrain)
 
 # same as create_level() but no prompts
 azlmbr.legacy.general.create_level_no_prompt(levelName, resolution, unitSize, bUseTerrain)
 
 # saves the current level
 azlmbr.legacy.general.save_level()
 ```
 
 ## Editor timing
 
 Occasionally a script will need to introduce a delay in actions to be performed in the Editor while another action completes, such as loading a level. Rather than use the built-in Python delay methods, use these Editor binding APIs.
 
 ```python
 # enables/disables idle processing for the Editor
 azlmbr.legacy.general.idle_enable(boolValue)
 
 # Returns whether or not idle processing is enabled for the Editor
 azlmbr.legacy.general.is_idle_enabled()
 
 # idles for specified number of seconds
 azlmbr.legacy.general.idle_wait(floatSeconds)
 ```
 
 ## Entitites
 
 The API enables you to add and remove entities to the root entity of a level, retrieve and compare entity IDs, and search for entities.
 
 ### Entity IDs
 
 Use the `azlmbr.entity.EntityId` class to refer to entity instances, properties, and the entity tree.
 
 ```python
 # returns True if the entity ID is valid
 entityId.IsValid()
 
 # returns string representation of an entity ID
 entityId.ToString()
 
 # returns True if both entity IDs
 entityId.Equal(otherEntityId)
 ```
 
 ### Entity operations and Ebus interfaces
 
 There are three main EBus interfaces used to manage Editor entities:
 +  `azlmbr.editor.ToolsApplicationRequestBus`: Used to create and delete Editor entities
 +  `azlmbr.editor.EditorEntityInfoRequestBus`: Used to access entity values
 +  `azlmbr.editor.EditorEntityAPIBus`: Used to mutate entity values
 
 **Example usage**:
 
 ```python
 # Create a new entity at the root level
 rootEntityId = azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'CreateNewEntity', EntityId())
 
 # Create a new entity parented to the parent entity
 childEntityId = azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'CreateNewEntity', rootEntityId)
 
 # Delete the entity
 azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'DeleteEntityById', childEntityId)
 
 # Delete the root entity we created and all its children
 azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'DeleteEntityAndAllDescendants', rootEntityId)
 
 # Get current name
 name = azlmbr.editor.EditorEntityInfoRequestBus(azlmbr.bus.Event, 'GetName', entityId);
 
 # Set a new name
 azlmbr.editor.EditorEntityAPIBus(azlmbr.bus.Event, 'SetName', entityId, "MyName")
 
 # Get the parent ID of this entity ID
 getId = azlmbr.editor.EditorEntityInfoRequestBus(azlmbr.bus.Event, 'GetParent', childId);
 ```
 
 ### Entity search
 
 The entity search API is based around setting up filters using `azlmbr.entity.SearchFilter` to set up the search parameters, and then conduct the search over the Ebus represented by `azlmbr.entity.SearchBus`.
 
 **`azlmbr.entity.SearchFilter` usage**:
 
 ```python
 searchFilter = azlmbr.entity.SearchFilter()
 searchFilter.names = [] # List of names (matches if any match); can contain wildcards in the name
 searchFilter.names_case_sensitive = False # Determines if the name matching should be case-sensitive
 searchFilter.components = {} # Dictionary keyed on component type IDs (matches if any match)
 searchFilter.components_match_all = False # Determines if the filter should match all component type IDs
 searchFilter.roots = [] # Specifies the entity IDs that act as roots of the search
 searchFilter.names_are_root_based = False # Determines if the names are relative to the root or should be searched in children too
 ```
 
 **`azlmbr.entity.SearchBus` usage**:
 
 ```python
 # The SearchBus interface
 busType = azlmbr.bus.Broadcast
 
 # Iterates through all entities in the current level, and returns a list of the ones that match the conditions
 entityIdList = azlmbr.entity.SearchBus(busType, 'SearchEntities', searchFilter)
 
 # Returns a list of all Editor entities at the root level in the current level
 entityIdList = azlmbr.entity.SearchBus(busType, 'GetRootEditorEntities', searchFilter)
 ```
 
 **Searching with wildcards**:
 
 Entities are addressable by a 'name path' using strings separated by the pipe character `|` such as `root name|my entity|my child` for a name path. Entity search also supports the use of `?` and `*` wildcards.
 
 **Example usage**:
 
 ```python
 import azlmbr.bus as bus
 import azlmbr.entity as entity
 
 searchFilter = entity.SearchFilter()
 searchFilter.names = ['TestName']
 
 # Search by name
 entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
 
 # Search by name path (a directed acyclic graph (DAG))
 searchFilter = entity.SearchFilter()
 searchFilter.names = ['TestParent|TestChild']
 entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
 
 # Search using wildcard
 searchFilter = azlmbr.entity.SearchFilter()
 searchFilter.names = ['Test*|?estChild']
 entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
 ```
 
 **Force search to start from root entities**:
 
 ```python
 import azlmbr.bus as bus
 import azlmbr.entity as entity
 
 # Filter with roots
 searchFilter = entity.SearchFilter()
 searchFilter.names = ["TestChild"]
 searchFilter.roots = [rootId]
 searchFilter.names_are_root_based = False  # default
 entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
 
 # Filter with roots using the names, only get the children relative from the root nodes
 searchFilter = entity.SearchFilter()
 searchFilter.names = ["TestParent|TestChild"]
 searchFilter.roots = [rootId]
 searchFilter.names_are_root_based = True # Search from roots for these names
 entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
 ```
 
 ### Entity notifications
 
 You can capture Editor entity events using the `EditorEntityContextNotificationBus` handler. Callbacks can be assigned to entity management event names: `OnEditorEntityCreated` and `OnEditorEntityDeleted` where the callback will be called with a tuple of data coming from the events.
 
 ```python
 # The events
 "OnEditorEntityCreated" # returns when an entity is created in the Editor
 "OnEditorEntityDeleted" # returns when an entity is destroyed in the Editor
 ```
 
 **Example usage**:
 
 ```python
 # assumes a level has been opened or created
 import azlmbr.bus as bus
 import azlmbr.editor as editor
 from azlmbr.entity import EntityId
 
 createdEntityIds = [] # to capture created entities
 
 def onEditorEntityCreated(parameters):
    global createdEntityIds
    entityId = parameters[0]
    createdEntityIds.append(entityId)
 
 def onEditorEntityDeleted(parameters):
    global createdEntityIds
    deletedEntityId = parameters[0]
    for entityId in createdEntityIds:
        if (entityId.Equal(deletedEntityId)):
            createdEntityIds.remove(entityId)
            break
 
 # Listen for notifications when entities are created/deleted
 handler = editor.EditorEntityContextNotificationBusHandler()
 handler.connect() # connects to a singleton bus handler
 handler.add_callback('OnEditorEntityCreated', onEditorEntityCreated)
 handler.add_callback('OnEditorEntityDeleted', onEditorEntityDeleted)
 
 # Create new Editor entity
 editor.ToolsApplicationRequestBus(bus.Broadcast, 'CreateNewEntity', EntityId())
 ```
 
 ## Component management
 
 Use the component system to add and remove components to existing entities with the `azlmbr.editor.EditorComponentAPIBus` bus.
 
 {{< note >}}
 Components are not active when in editing mode. They only become active when the game is being played within the Editor.
 {{< /note >}}
 
 ### Component type events
 
 The API requires IDs to create, use, or control component instances. To get a component IDs, use the following Ebus events:
 
 ```python
 # azlmbr.editor.EditorComponentAPIBus Broadcast events
 
 # Finds the component IDs from their type names
 # input: list of strings of type names
 # output: (list of component type IDs)
 'FindComponentTypeIds'
 
 # Finds the component names from their type IDs
 # input: list of component type IDs
 # output: (list of strings) of type names
 'FindComponentTypeNames'
 
 # Returns the full list of names for all game components that can be created with the EditorComponent API
 # input: entity.EntityType().Game
 # output: (list of strings) of the known component type names
 'BuildComponentTypeNameListByEntityType'

 # Returns the full list of names for all level components that can be created with the EditorComponent API
 # input: entity.EntityType().Level
 # output: (list of strings) of the known component type names
 'BuildComponentTypeNameListByEntityType'
 ```
 
 **Example usage**:
 
 ```python
 import azlmbr.bus as bus
 
 # Generate list of game component type names
 componentList = editor.EditorComponentAPIBus(bus.Broadcast, 'BuildComponentTypeNameListByEntityType', entity.EntityType().Game)
 
 # Generate list of level component type names
 componentList = editor.EditorComponentAPIBus(bus.Broadcast, 'BuildComponentTypeNameListByEntityType', entity.EntityType().Level)

 # Get component types for 'Mesh' and 'Comment'
 typeIdList = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeIds', ["Mesh", "Comment"])
 
 # Get component type names from component type IDs
 typeNameList = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeNames', typeIdsList)
 ```
 
 ### Component usage events
 
 The API can add components to an existing entity, test for component existence, counts components by type, and enumerate the components on an entity.
 
 ```python
 # azlmbr.editor.EditorComponentAPIBus Broadcast events
 
 # Add components of the given types to an entity.
 # input: entity ID
 # input: list of component type IDs
 # output: (Outcome<list of component IDs>)
 'AddComponentsOfType'
 
 # Tests a component of type can be found on entity
 # input: component type ID
 # output: (bool) True if a component of type provided can be found on entity, False otherwise
 'HasComponentOfType'
 
 # Count components of type provided on the entity
 # input: entity ID
 # input: component type ID
 # output: (number) of component instances on an entity
 'CountComponentsOfType'
 
 # Get component of type from entity
 # Only returns first component of type if found (early out).
 # input: entity ID
 # input: component type ID
 # output: (Outcome<component ID>)
 'GetComponentOfType'
 
 # Get all components of type from entity
 # Returns list of component IDs, or an empty list if components could not be found
 # input: entity ID
 # input: component type ID
 # output: (Outcome<list of component IDs>)
 'GetComponentsOfType'
 ```
 
 **Example usage:**
 
 ```python
 import azlmbr.bus as bus
 
 # adding a Mesh component
 meshComponentOutcome = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast,'AddComponentsOfType', entityId, [meshComponentTypeId])
 
 if (meshComponentOutcome.IsSuccess()):
    print("Mesh component added to entity.")
 
 meshComponents = meshComponentOutcome.GetValue()
 meshComponent = meshComponents[0]
 
 # test for a Mesh component exists on the enity
 hasComponent = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'HasComponentOfType', entityId, meshComponentTypeId)
 
 if (hasComponent):
    print("Entity has a Mesh component.")
 
 # find the number of Mesh components on the entity
 commentsCount = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'CountComponentsOfType', entityId, meshComponentTypeId)
 
 if(commentsCount == 1):
    print("Entity has one Mesh component")
 
 # returns the first Mesh component ID, if any
 meshSingleComponentOutcome = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'GetComponentOfType', entityId, meshComponentTypeId)
 
 if (meshSingleComponentOutcome.IsSuccess()):
    print("GetComponentOfType mesh works.")
 
 firstMeshComponentId = meshSingleComponentOutcome.GetValue()
 
 # returns a list of component IDs for a component type
 meshMultipleComponentOutcome = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'GetComponentsOfType', entityId, meshComponentTypeId)
 
 if (meshMultipleComponentOutcome.IsSuccess()):
    print("GetComponentsOfType mesh works.")
 
 firstMeshComponentId = meshMultipleComponentOutcome.GetValue()[0]
 ```
 
 ### Component control events
 
 The API offers events to validate, enable or disable, and remove components.
 
 ```python
 # azlmbr.editor.EditorComponentAPIBus Broadcast events
 
 # Verifies a component instance is valid
 # input: component type ID
 # output: (bool) Returns True if the component is valid
 'IsValid'
 
 # Tests if a component is active
 # input: component type ID
 # output: (bool) Returns True if the component is active
 'IsComponentEnabled'
 
 # Enable Components on an entity using a list of component IDs
 # input: list of component type IDs
 # output: (bool) Returns True if the operation was successful, False otherwise
 'EnableComponents'
 
 # Disable Components on an entity using a list of component IDs
 # input: list of component type IDs
 # output: (bool) Returns True if the operation was successful, False otherwise
 'DisableComponents'
 
 # Remove components from an entity using a list of component IDs
 # input: list of component type IDs
 # output: (bool) Returns True if the operation was successful, False otherwise
 'RemoveComponents'
 ```
 
 **Example usage**:
 
 ```python
 import azlmbr.bus as bus
 
 # test a component is valid
 isValid = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'IsValid', meshComponent)
 if (isValid is True):
    print("Mesh component is valid.")
 
 # test if the component is enabled
 isEnabled = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'IsComponentEnabled', meshComponent)
 if (isEnabled is True):
    print("Mesh component is enabled.")
 
 # enable this Mesh component
 isEnabled = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'EnableComponents', [meshComponent])
 if (isEnabled is True):
    print("Mesh component set to enabled.")
 
 # disable this Mesh component
 didDisable = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'DisableComponents', [meshComponent])
 if (didDisable is True):
    print("Mesh component set to disabled.")
 
 # remove only this Mesh component
 didRemove = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'RemoveComponents', [meshComponent])
 if (didRemove is True):
    print("Mesh component has been removed.")
 ```
 
 ## Component property events
 
 Component properties can be accessed and modified using a string that indicates a direct path to a property value. The pipe character `|` is used as the separator between the property path elements.
 
 The `azlmbr.editor.EditorComponentAPIBus` bus is used to access or modify component property values.
 
 ```python
 # azlmbr.editor.EditorComponentAPIBus Broadcast events
 
 # Get value of a property on a component
 # input: component ID
 # input: property path
 # output: (Outcome<object>) the current value of the property
 'GetComponentProperty'
 
 # Set value of a property on a component
 # input: component ID
 # input: property path
 # input: object value
 # output: (Outcome<object>) the new value of the property
 'SetComponentProperty'
 
 # Get a full list of properties in a component
 # input: component ID
 # output: (list of strings) property paths
 'BuildComponentPropertyList'
 ```
 
 **Example usage:**
 
 ```python
 import azlmbr.bus as bus
 
 # Get current value of the mesh asset property of the MeshComponentRenderNode
 propertyPath =  "MeshComponentRenderNode|Mesh asset"
 valueOutcome = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'GetComponentProperty', componentId, propertyPath)
 
 if (valueOutcome.IsSuccess()):
    meshAssetId = valueOutcome.GetValue()
    print ('Old mesh asset is {}'.format(meshAssetId))
 
 # Set the mesh asset
 outcome = None
 if (meshAssetId is not None):
    outcome = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'SetComponentProperty', componentId, propertyPath, meshAssetId)
 
 if(outcome.IsSuccess()):
    result = outcome.GetValue()
    print ('New mesh asset is {}'.format(result))
 
 # Read the properties of this MeshComponentRenderNode
 propertyPaths = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'BuildComponentPropertyList', componentId)
 
 for path in propertyPaths:
    print ('ComponentId path has {}'.format(path))
 ```
 
 ## Editing properties
 
 To access this API a script needs access to a property tree editor instance. This object accesses the properties on a component, in the style of the property editing view inside of the Editor. Properties are accessed starting from the root of the component, and follow the chain of labels until a property value is encountered.
 
 A common way to create a property tree editor instance is during content creation when a component is created via the `EditorComponentAPIBus.AddComponentsOfType` event.
 
 ```python
 componentOutcome = editor.EditorComponentAPIBus(bus.Broadcast, 'AddComponentsOfType', entityId, typeIdsList)
 if (!componentOutcome.IsSuccess()):
    raise Exception('FAILURE FATAL: AddComponentsOfType')
 
 components = componentOutcome.GetValue()
 pteObj = editor.EditorComponentAPIBus(bus.Broadcast, 'BuildComponentPropertyTreeEditor', components[0])
 if(pteObj.IsSuccess()):
   pte = pteObj.GetValue()
 ```
 
 `azlmbr.property.PropertyTreeEditor` API:
 
 ```python
 # type: azlmbr.property.PropertyTreeEditor
 #  - method: build_paths_list() -> string List
 #            Get a complete list of all property paths in the tree.
 #  - method: build_paths_list_with_types() -> string List
 #            Get a complete list of all property paths in the tree with (typenames).
 #  - method: set_visible_enforcement() -> string List
 #            Limits the properties using the visibility flags such as ShowChildrenOnly.
 #  - method: has_attribute(str: path, str: attribute) -> bool
 #            Detects if a property has an attribute.
 #  - method: get_value(str: path) -> Object
 #            Gets a property value.
 #  - method: set_value(str: path, object: value)
 #            Sets a property value.
 #  - method: compare_value(str: path, object: value) -> Boolean
 #            Compares a property value.
 #  - method: is_container(str: path) -> Boolean
 #            True if property path points to a container.
 #  - method: get_container_count(str: path) -> Outcome Integer
 #            Returns the size of the container.
 #  - method: reset_container(str: path) -> Outcome Boolean
 #            Clears the items in a container.
 #  - method: add_container_item(str: path, object key, object value) -> Outcome Boolean
 #            Add an item in a container.
 #  - method: append_container_item(str: path, object value) -> Outcome Boolean
 #            Appends an item in an non-associative container.
 #  - method: remove_container_item(str: path, object key) -> Outcome Boolean
 #            Removes a single item from a container.
 #  - method: update_container_item(str: path, object key, object value) -> Outcome Boolean
 #            Updates an existing the item's value in a container.
 #  - method: get_container_item(str: path, object: key) -> Outcome Object
 #            Retrieves an item value from a container.
 ```
 
 ### Property containers
 
 The Editor automation API exposes a number of special methods to handle container component property types. If the property tree editor points to a component that has container properties these methods give access to the items in the container.
 
 To determine if the property is a container type use the `azlmbr.PropertyTreeEditor.is_container()` method.
 
 **Example usage**:
 
 ```python
 # the path to the 'Extended Tags' property
 tagListPropertyPath = 'm_template|Extended Tags'
 
 # get current item count of the container
 outcome = pte.get_container_count(path)
 if(outcome.IsSuccess()):
   count = outcome.GetValue()
 
 # clear the container
 outcome = pte.reset_container(path)
 if(outcome.IsSuccess()):
   print('cleared item')
 
 # if this is a Dictionary type make sure to have a valid key
 key = 0
 value = 'tag_1'
 outcome = pte.add_container_item(path, key, value)
 if(outcome.IsSuccess()):
   print('added item')
 
 # an update needs a key such as an index or a Dictionary key
 value = 'tag_2'
 outcome = pte.update_container_item(path, key, value)
 if(outcome.IsSuccess()):
   print('updated an item')
 
 # the 'append' can be used for properties that are Lists
 value = 'tag_3'
 outcome = pte.append_container_item(path, value)
 if(outcome.IsSuccess()):
   print('appended an item')
 
 # get an item using a key such as an index or a Dictionary key
 key = 0
 outcome = pte.get_container_item(path, key)
 if(outcome.IsSuccess()):
   print('got the value {} from index 0'.format(outcome.GetValue()))
 
 # remove an item using a key,
 # even in List types give an index for the key
 key = 0
 outcome = pte.remove_container_item(path, key)
 if(outcome.IsSuccess()):
   print('removed an item')
 ```
 
 ## Asset management
 
 The Editor automation API exposes a few methods to manage assets via the `azlmbr.asset.AssetCatalogRequestBus` bus.
 
 ```python
 # type: azlmbr.asset.AssetId
 #   - method: IsValid()
 
 # Retrieves an asset-root-relative path by ID.
 # input: asset ID (azlmbr.asset.AssetId)
 # output: (string) relative file path if it's in the catalog, otherwise an empty string
 'GetAssetPathById'
 
 # Retrieves an asset ID given a full or asset root-relative path.
 # input: asset path (string) asset full or asset root-relative path
 # input: typeToRegister (azlmbr.math.Uuid) if autoRegisterIfNotFound is set and the asset isn't already registered, it will be registered as this type
 # input: autoRegisterIfNotFound (bool) registers the asset if not already in the catalog
 # output: (azlmbr.asset.AssetId) valid asset ID if it's in the registry, otherwise an empty AssetId
 'GetAssetIdByPath'
 ```
 
 **Example usage**:
 
 ```python
 import azlmbr.bus as bus
 import azlmbr.math
 
 emptyTypeId = azlmbr.math.Uuid()
 
 # get the cube asset ID
 bRegisterType = False
 cubeAssetId =  azlmbr.asset.AssetCatalogRequestBus(bus.Broadcast, 'GetAssetIdByPath', 'objects/default/primitive_cube.cgf', emptyTypeId, bRegisterType)
 print ('cube asset ID validity is {}'.format(cubeAssetId.IsValid()))
 
 # get the cube path name (relative in project)
 cubePath =  azlmbr.asset.AssetCatalogRequestBus(bus.Broadcast, 'GetAssetPathById', cubeAssetId)
 print ('cube asset path is {}'.format(cubePath))
 ```
