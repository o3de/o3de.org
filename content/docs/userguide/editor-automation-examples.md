---
description: ' Some useful examples for the Python Editor Bindings gem, used to automate
  actions in the &ly-editor;. '
slug: editor-automation-examples
title: Python Editor Bindings gem examples
---
# Python Editor Bindings gem examples<a name="editor-automation-examples"></a>

 The Python Editor Bindings are driven by an API that connects through to the Editor's C\+\+ implementation, using the Lumberyard event bus \(Ebus\) to send messages between scripts and the editor\. This reference covers the use of the editor bindings API to perform tasks like interacting with components, entities, and and properties\. 

**Contents**
+ [Level management](#editor-automation-examples-levels)
+ [Editor timing](#editor-automation-examples-timing)
+ [Entitites](#editor-automation-examples-entities)
  + [Entity IDs](#editor-automation-examples-entities-ids)
  + [Entity operations and Ebus interfaces](#editor-automation-examples-entities-ebus)
  + [Entity search](#editor-automation-examples-entities-search)
  + [Entity notifications](#editor-automation-examples-entities-notifications)
+ [Component management](#editor-automation-examples-components)
  + [Component type events](#editor-autiomation-api-reference-components-type)
  + [Component usage events](#editor-atuomation-api-reference-components-usage)
  + [Component control events](#editor-atuomation-api-reference-components-control)
+ [Component property events](#editor-atuomation-api-reference-components-properties)
+ [Editing properties](#editor-automation-examples-properties-editing)
  + [Property containers](#editor-automation-examples-properties-editing-containers)
+ [Asset management](#editor-automation-examples-assets)

## Level management<a name="editor-automation-examples-levels"></a>

Use these functions to load, create, and save levels\. In order to use other editor binding APIs, a level needs to be loaded in the editor\.

```
# opens a level with a user prompt
azlmbr.legacy.general.open_level(strLevelName)  

# opens a level without prompting the user (better for automation)
azlmbr.legacy.general.open_level_no_prompt(strLevelName)   

# creates a level with the parameters of 'levelName', 'resolution', 'unitSize' and 'bUseTerrain'
azlmbr.legacy.general.create_level(levelName, resolution, unitSize,bUseTerrain)

# same as create_level() but no prompts
azlmbr.legacy.general.create_level_no_prompt(levelName, resolution, unitSize,bUseTerrain)

# saves the current level
azlmbr.legacy.general.save_level()
```

## Editor timing<a name="editor-automation-examples-timing"></a>

 Occasionally a script will need to introduce a delay in actions to be performed in the editor while another action completes, such as loading a level\. Rather than use the built\-in Python delay methods, use these editor binding APIs\. 

```
# enables/disables idle processing for the Editor
azlmbr.legacy.general.idle_enable(boolValue)

# Returns whether or not idle processing is enabled for the Editor
azlmbr.legacy.general.is_idle_enabled()

# waits idling for a given seconds
azlmbr.legacy.general.idle_wait(floatSeconds)
```

## Entitites<a name="editor-automation-examples-entities"></a>

 The API allows you to add and remove entities to the root entity of a level, retrieve and compare entity IDs, and search for entities\. 

### Entity IDs<a name="editor-automation-examples-entities-ids"></a>

 The `azlmbr.entity.EntityId` class is used to refer to entity instances, properties, and the entity tree\. 

```
# returnsTrue if the entity ID is valid
entityId.IsValid()

# returns string representation of an entity ID
entityId.ToString()

# returns True if both entity IDs
entityId.Equal(otherEntityId)
```

### Entity operations and Ebus interfaces<a name="editor-automation-examples-entities-ebus"></a>

 There are three main EBus interfaces used to manage Editor entities: 
+  `azlmbr.editor.ToolsApplicationRequestBus`: Used to create and delete Editor entities 
+  `azlmbr.editor.EditorEntityInfoRequestBus`: Used to access Entity values 
+  `azlmbr.editor.EditorEntityAPIBus`: Used to mutate Entity values 

**Example usage**:

```
# Create a new Entity at the root level
rootEntityId = azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'CreateNewEntity', EntityId())

# Create a new Entity parented to the parent Entity
childEntityId = azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'CreateNewEntity', rootEntityId)

# Delete the entity
azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'DeleteEntityById', childEntityId)

# Delete the root Entity we created and all its children
azlmbr.editor.ToolsApplicationRequestBus(azlmbr.bus.Broadcast, 'DeleteEntityAndAllDescendants', rootEntityId)

# Get current name
name = azlmbr.editor.EditorEntityInfoRequestBus(azlmbr.bus.Event, 'GetName', entityId);

# Set a new name
azlmbr.editor.EditorEntityAPIBus(azlmbr.bus.Event, 'SetName', entityId, "MyName")

# get the parent ID of this EntityID
getId = azlmbr.editor.EditorEntityInfoRequestBus(azlmbr.bus.Event, 'GetParent', childId);
```

### Entity search<a name="editor-automation-examples-entities-search"></a>

 The entity search API is based around setting up filters using `azlmbr.entity.SearchFilter` to set up the search parameters, and then conduct the search over the Ebus represented by `azlmbr.entity.SearchBus`\. 

**`azlmbr.entity.SearchFilter` usage**:

```
searchFilter = azlmbr.entity.SearchFilter()
searchFilter.names = [] # List of names (matches if any match); can contain wildcards in the name.
searchFilter.names_case_sensitive = False # Determines if the name matching should be case sensitive.
searchFilter.components = {} # Dictionary keyed on component type IDs (matches if anymatch).
searchFilter.components_match_all = False # Determines if the filter should match all component type ids (AND).
searchFilter.roots = [] # Specifies the entity IDs that act as roots of the search
searchFilter.names_are_root_based = False # Determines if the names are relative to the root or should be searched in children too.
```

**`azlmbr.entity.SearchBus` usage**:

```
# The SearchBus interface
busType = azlmbr.bus.Broadcast

# Iterates through all entities in the current level, and returns a list ofthe ones that match the conditions
entityIdList = azlmbr.entity.SearchBus(busType, 'SearchEntities', searchFilter)

# Returns a list of all editor entities at the root level in the current level
entityIdList = azlmbr.entity.SearchBus(busType, 'GetRootEditorEntities', searchFilter)
```

**Searching with wildcards**:

 Entities are addressable by a 'name path' using strings separated by the pipe character `|` such as `root name|my entity|my child` for a name path\. Entity search also supports the use of `?` and `*` wildcards\. 

**Example usage**:

```
import azlmbr.bus as bus
import azlmbr.entity as entity

searchFilter = entity.SearchFilter()
searchFilter.names = ['TestName']

# Search by name
entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)

# Search by name path (DAG)
searchFilter = entity.SearchFilter()
searchFilter.names = ['TestParent|TestChild']
entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)

# Search using wildcard
searchFilter = azlmbr.entity.SearchFilter()
searchFilter.names = ['Test*|?estChild']
entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
```

**Force search to start from root entities**:

```
import azlmbr.bus as bus
import azlmbr.entity as entity

# Filter with roots
searchFilter = entity.SearchFilter()
searchFilter.names = ["TestChild"]
searchFilter.roots = [rootId]
searchFilter.names_are_root_based = False  # default
entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)

# Filter with roots using the names, only get the kids realtive from the root nodes
searchFilter = entity.SearchFilter()
searchFilter.names = ["TestParent|TestChild"]
searchFilter.roots = [rootId]
searchFilter.names_are_root_based = True # search from roots for these names
entityIdList = entity.SearchBus(bus.Broadcast, 'SearchEntities', searchFilter)
```

### Entity notifications<a name="editor-automation-examples-entities-notifications"></a>

 You can capture editor entity events using the `EditorEntityContextNotificationBus` handler\. Callbacks can be assigned to entity management event names: `OnEditorEntityCreated` and `OnEditorEntityDeleted` where the callback will be called with a tuple of data coming from the events\. 

```
# The events
"OnEditorEntityCreated" # returns when an entity is created in the Editor
"OnEditorEntityDeleted" # returns when an entity is destroyed in the Editor
```

**Example usage**:

```
# assumes a level has been opened or created
import azlmbr.bus as bus
import azlmbr.editor as editor
from azlmbr.entity import EntityId

createdEntityIds = [] # to capture created entites

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
handler.connect() # connects to a Singleton bus handler
handler.add_callback('OnEditorEntityCreated', onEditorEntityCreated)
handler.add_callback('OnEditorEntityDeleted', onEditorEntityDeleted)

# Create new Editor Entity
editor.ToolsApplicationRequestBus(bus.Broadcast, 'CreateNewEntity', EntityId())
```

## Component management<a name="editor-automation-examples-components"></a>

 The component system is used to add and removes components to existing entities with the `azlmbr.editor.EditorComponentAPIBus` bus\. 

**Note**  
 Components are not active when in editing mode\. They only become active when the game is being played within the editor\. 

### Component type events<a name="editor-autiomation-api-reference-components-type"></a>

 The API requires IDs to create, use, or control component instances\. To get a component IDs, use the following Ebus events: 

```
# azlmbr.editor.EditorComponentAPIBus Broadcast events

# Finds the component ids from their type names
# input: list of strings of type names
# output: (list of component type IDs)
'FindComponentTypeIds'

# Finds the component names from their type ids
# input: list of component type IDs
# output: (list of strings) of type names
'FindComponentTypeNames'

# Returns the full list of names for all components that can be created with the EditorComponent API
# input: N/A
# output: (list of strings) of the known component type names
'BuildComponentTypeNameList'
```

**Example usage**:

```
import azlmbr.bus as bus

# Generate list of component type names
componentList = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'BuildComponentTypeNameList')

# Get component types for 'Mesh' and 'Comment'
typeIdList = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeIds', ["Mesh", "Comment"])

# Get component type names from component type IDs
typeNameList = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'FindComponentTypeNames', typeIdsList)
```

### Component usage events<a name="editor-atuomation-api-reference-components-usage"></a>

 The API can add components to an existing entity, test for component existence, counts components by type, and enumerate the components on an entity\. 

```
# azlmbr.editor.EditorComponentAPIBus Broadcast events

# Add Components of the given types to an Entity.
# input: entity ID
# input: list of component type IDs
# output: (Outcome<list of component IDs>)
'AddComponentsOfType'

# Tests a component of type can be found on Entity
# input: component type ID
# output: (bool) True if a Component of type provided can be found on Entity, False otherwise
'HasComponentOfType'

# Count components of type provided on the entity
# input: entity ID
# input: component type ID
# output: (number) of component instances on an entity
'CountComponentsOfType'

# Get Component of type from Entity
# Only returns first component of type if found (early out).
# input: entity ID
# input: component type ID
# output: (Outcome<component ID>)
'GetComponentOfType'

# Get all Components of type from Entity
# Returns list of component IDs, or an empty list if components could not be found
# input: entity ID
# input: component type ID
# output: (Outcome<list of component IDs>)
'GetComponentsOfType'
```

**Example usage:**

```
import azlmbr.bus as bus

# adding a Mesh component
meshComponentOutcome = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast,'AddComponentsOfType', entityId, [meshComponentTypeId])

if (meshComponentOutcome.IsSuccess()):
    print("Mesh component added to entity.")
   
meshComponents = meshComponentOutcome.GetValue()
meshComponent = meshComponents[0]

# test for a mesh component exists on the enity
hasComponent = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'HasComponentOfType', entityId, meshComponentTypeId)

if (hasComponent):
    print("Entity has a Mesh component.")

# find the number of Mesh components on the entity
commentsCount = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'CountComponentsOfType', entityId, meshComponentTypeId)

if(commentsCount == 1):
    print("Entity has one Mesh component")

# returns the first mesh component ID, if any
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

### Component control events<a name="editor-atuomation-api-reference-components-control"></a>

 The API offers events to validate, enable or disable, and remove components\. 

```
# azlmbr.editor.EditorComponentAPIBus Broadcast events

# Verifies a component instance is valid
# input: component type ID
# output: (bool) Returns True if the component is valid
'IsValid'

# Tests if a component is active
# input: component type ID
# output: (bool) Returns True if the component is active
'IsComponentEnabled'

# Enable Components on an Entity using a list of component IDs
# input: list of component type IDs
# output: (bool) Returns True if the operation was successful, False otherwise
'EnableComponents'

# Disable Components on an Entity using a list of component IDs
# input: list of component type IDs
# output: (bool) Returns True if the operation was successful, False otherwise
'DisableComponents'

# Remove components from an Entity using a list of component IDs
# input: list of component type IDs
# output: (bool) Returns True if the operation was successful, False otherwise
'RemoveComponents'
```

**Example usage**:

```
import azlmbr.bus as bus

# test a component is valid
isValid = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'IsValid', meshComponent)
if (isValid is True):
    print("Mesh component is valid.")

# test if the component is enabled
isEnabled = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'IsComponentEnabled', meshComponent)
if (isEnabled is True):
    print("Mesh component is enabled.")

# enable this mesh component
isEnabled = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'EnableComponents', [meshComponent])
if (isEnabled is True):
    print("Mesh component set to enabled.")

# disable this mesh component
didDisable = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'DisableComponents', [meshComponent])
if (didDisable is True):
    print("Mesh component set to disabled.")

# remove only this mesh component
didRemove = azlmbr.editor.EditorComponentAPIBus(bus.Broadcast, 'RemoveComponents', [meshComponent])
if (didRemove is True):
    print("Mesh component has been removed.")
```

## Component property events<a name="editor-atuomation-api-reference-components-properties"></a>

 Component properties can be accessed and modified using a string that indicates a direct path to a property value\. The pipe character `|` is used as the separator between the property path elements\. 

 The `azlmbr.editor.EditorComponentAPIBus` bus is used to access or modify component property values\. 

```
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

```
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

## Editing properties<a name="editor-automation-examples-properties-editing"></a>

To access this API a script needs access to a property tree editor instance\. This object accesses the properties on a component, in the style of the property editing view inside of the editor\. Properties are accessed starting from the root of the component, and follow the chain of labels until a property value is encountered\. 

 A common way to create a property tree editor instance is during content creation when a component is created via the `EditorComponentAPIBus.AddComponentsOfType` event\. 

```
componentOutcome = editor.EditorComponentAPIBus(bus.Broadcast, 'AddComponentsOfType', entityId, typeIdsList)
if (!componentOutcome.IsSuccess()):
    raise Exception('FAILURE FATAL: AddComponentsOfType')

components = componentOutcome.GetValue()
pteObj = editor.EditorComponentAPIBus(bus.Broadcast, 'BuildComponentPropertyTreeEditor', components[0])
if(pteObj.IsSuccess()):
   pte = pteObj.GetValue()
```

`azlmbr.property.PropertyTreeEditor` API:

```
# type: azlmbr.property.PropertyTreeEditor
#  - method: build_paths_list() -> string List
#            Get a complete list of all property paths in the tree.
#  - method: build_paths_list_with_types() -> string List
#            Get a complete list of all property paths in the tree with (typename)s.
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
#  - method: update_container_item(str: path, object key, object value) -&gt; Outcome Boolean
#            Updates an existing the item's value in a container.
#  - method: get_container_item(str: path, object: key) -> Outcome Object
#            Retrieves an item value from a container.
```

### Property containers<a name="editor-automation-examples-properties-editing-containers"></a>

 The Editor automaton API exposes a number of special methods to handle container component property types\. If the property tree editor points to a component that has container properties these methods give access to the items in the container\. 

 To determine if the property is a container type use the `azlmbr.PropertyTreeEditor.is_container()` method\. 

**Example usage**:

```
# the path to the 'Extended Tags' property
tagListPropertyPath = 'm_template|Extended Tags'

# get current item count of the the container
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

## Asset management<a name="editor-automation-examples-assets"></a>

 The editor automation API exposes a few methods to manage assets via the `azlmbr.asset.AssetCatalogRequestBus` bus\. 

```
# type: azlmbr.asset.AssetId
#   - method: IsValid()

# Retrieves an asset-root-relative path by Id.
# input: asset Id (azlmbr.asset.AssetId)
# output: (string) relative file path if it's in the catalog, otherwise an empty string
'GetAssetPathById'

# Retrieves an asset Id given a full or asset-root-relative path.
# input: asset path (string) asset full or asset-root relative path
# input: typeToRegister (azlmbr.math.Uuid) if autoRegisterIfNotFound is setand the asset isn't already registered, it will be registered as this type
# input: autoRegisterIfNotFound (bool) registers the asset if not already in the catalog
# output: (azlmbr.asset.AssetId) valid AssetId if it's in the registry, otherwise an empty AssetId
'GetAssetIdByPath'
```

**Example usage**:

```
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