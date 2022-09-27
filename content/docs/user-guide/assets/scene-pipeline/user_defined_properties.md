---
title: "User Defined Properties"
date: 2022-03-08
slug: scene-api-udp
author: Allen Jackson
---

Artists can store metadata in source scenes to user defined properties (UDP) on scene nodes. This user defined property metadata can be exported into source scene files (i.e. FBX). This metadata is important since it can indicate details about the scene such which mesh nodes to use as level of detail (LOD) and/or physics collision meshes. The best way to store this type of metadata is to use the properties sub-systems used inside the DCC tool then export those user defined properties into file formats that can persist this metadata such as FBX and glTF. This UDP metadata has many uses for engine related pipeline tweaks, but it also has many uses for extending the scene pipeline and generating Editor custom game content.

The O3DE scene pipeline reads in this UDP metadata and added to the scene graph as a node with CustomPropertyData contents. This UDP metadata will do nothing itself since it is meant to be properties that other scene building logic units will access in order to perform build operations and/or modifications.

Inside the CustomPropertyData there is a PropertyMap that stores a dictionary of string-to-value properties for that node. The scene builders will be able to access this metadata using its PropertyMap. The properties can store value types of string, Boolean, unsigned integer 32-bit, signed integer 64-bit, float, and double. The metadata can be used to modify the scene’s rule manifest, parameterize scene product assets, and set scene parameters downstream. Each node can have a PropertyMap where the keys do not repeat. The PropertyMap is read only like the other elements of the scene graph.

The CustomPropertyData can be accessed by scene builders using either the Python or C++ API by handling any event that takes the scene graph as input. The typical method is to handle the Update Manifest event so that the scene builder can modify the scene manifest rules.

## Assigning Materials in Default Procedural Prefab using UDPs

The default procedural prefab scene builder inside the Prefab game has an example of how UDP metadata can be used to customize the scene pipeline. The Prefab gem constructs a default prefab for a scene graph, it looks for the UDP ```o3de_default_material``` in a mesh data node to define an O3DE render material for that mesh group inside the prefab. This allows artists to assign O3DE render materials back in the DCC tool. Each time the source scene file (i.e. FBX) is exported, this reference is maintained through the scene pipeline.

## UDP Access in Scene Pipeline

Scene builders can access user defined properties using either C++ or Python from the Scene Builder API.

### C++ Access

When the C++ event is fired it typically sends the request context as input that contains the scene graph of nodes that might have a CustomPropertyData node. There are number of ways to view the nodes in C++ using the node indices. To access a node contents, the scene graph’s GetNodeContent() method is used to return a smart pointer to a ICustomPropertyData. If the smart pointer is not empty, then the GetPropertyMap() can be used to access the string-to-value property dictionary.

C++ code example:

```c++
const auto customPropertyData = azrtti_cast<const DataTypes::ICustomPropertyData*>(graph.GetNodeContent(propertyDataIndex));
if (!customPropertyData)
{
    return false;
}

const auto propertyMaterialPathIterator = customPropertyData->GetPropertyMap().find("o3de_default_material");
if (propertyMaterialPathIterator == customPropertyData->GetPropertyMap().end())
{
    return false;
}

const AZStd::any& propertyMaterialPath = propertyMaterialPathIterator->second;
if (propertyMaterialPath.empty() || propertyMaterialPath.is<AZStd::string>() == false)
{
    return false;
}

// find asset path via node data
const AZStd::string* materialAssetPath = AZStd::any_cast<AZStd::string>(&propertyMaterialPath);
if (materialAssetPath->empty())
{
    return false;
}
```

### Python Access

Python scripts use callbacks to access the scene graph nodes to find user defined properties. The CustomPropertyData will come back as a Python dictionary for the script to enumerate to find the key-value pairs.

Python code example:

```python
def print_properties(scene):
    scene_graph = scene_api.scene_data.SceneGraph(scene.graph)
    node = scene_graph.get_root()
    children = []

    while node.IsValid():
        if scene_graph.has_node_child(node):
            children.append(scene_graph.get_node_child(node))

        node_name = scene_api.scene_data.SceneGraphName(scene_graph.get_node_name(node))
        node_content = scene_graph.get_node_content(node)
        if node_content.CastWithTypeName('CustomPropertyData'):
            if len(node_name.get_path()):
                print(f'CustomPropertyMap {node_name.get_path()}')
                props = node_content.Invoke('GetPropertyMap', [])
                for index, (key, value) in enumerate(props.items()):
                    print(f'property index:{index} key:{key} value:{value}')

        if scene_graph.has_node_sibling(node):
            node = scene_graph.get_node_sibling(node)
        elif children:
            node = children.pop()
        else:
            node = azlmbr.scene.graph.NodeIndex()
```

### An example of car with LODs and a collision mesh

This is an example of a Car.fbx file that was saved with UDP metadata for LOD and PhsyX metadata. The Asset Processor will request the Scene Builder to process the Car.fbx source scene asset. The Scene Builder (running in the Asset Builder process) imports the scene and builds the scene graph with scene graph nodes with CustomPropertyData content. Later on, the default procedural prefab builder will read in the custom properties in order to build out LOD manifest rules and physics manifest rules. Finally, these manifest rules will turn into LOD models and physic mesh product files.

![Car FBX example with UDPs.](/images/user-guide/assets/pipeline/scene_api_udp.jpg)
