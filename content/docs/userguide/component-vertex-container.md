# Vertex Containers<a name="component-vertex-container"></a>

`VertexContainer` is a concrete type and an interface that is used by several Lumberyard component buses\. It is implemented directly by the **[Polygon Prism Shape](component-polygon-prism.md)** component and the **[Spline](component-spline.md)** component and used indirectly by the **[Navigation Area](component-nav-area.md)** component\.

## Vertex Container Interface<a name="component-vertex-container-vertex-container-interface"></a>

A vertex container provides the ability to access, modify, add, and remove vertices\. A vertex container has several interfaces that build upon one another\. 

These include the following interfaces:

**Contents**
+ [FixedVertices Interface](#component-vertex-container-the-fixedvertices-interface)
+ [VariableVertices Interface](#component-vertex-container-the-variablevertices-interface)
+ [VertexContainerInterface](#component-vertex-container-the-vertexcontainerinterface)

### FixedVertices Interface<a name="component-vertex-container-the-fixedvertices-interface"></a>

The simplest interface is `FixedVertices`\. `FixedVertices` supports `GetVertex` and `UpdateVertex` functions for vertices in a container and a `Size` function that returns the number of vertices in the container\.

Because the number of vertices is fixed, vertices cannot be added or removed\. You can implement this interface with an array or `AZStd::fixed_vector`\.

### VariableVertices Interface<a name="component-vertex-container-the-variablevertices-interface"></a>

The `VariableVertices` interface supports all the functionality of `FixedVertices`, but also provides `AddVertex`, `InsertVertex`, and `RemoveVertex` functions\. `VariableVertices` also provides a utility function called `Empty` that checks whether a container has any elements or is empty\. 

To implement the `VariableVertices` interface, you can use either an `AZStd::vector` or a `VertexContainer`\.

### VertexContainerInterface<a name="component-vertex-container-the-vertexcontainerinterface"></a>

The `VertexContainerInterface` provides an interface to all functionality provided by the previous two interfaces and the `VertexContainer` type\. For convenience, the `VertexContainerInterface` also provides `SetVertices` and `ClearVertices` functions that can update all vertices or remove all vertices in one operation\. The `SetVertices` function takes a `vertices` parameter that contains a list of all vertices to be stored\. 

**Note**  
A `VertexContainer` owns the vertices to which it has access; they are not stored elsewhere \(a `VertexContainer` is not a view\)\.

As mentioned, the `VertexContainerInterface` is implemented by the **Spline** component and **Polygon Prism** component EBuses\. The **Navigation Area** component also uses the interface through its dependence on the **Polygon Prism Shape** component\. Each of these components uses the `VertexContainer` type internally to manage its vertices\.

For more information about the interfaces in the `VertexContainerInterface`, see the code and code comments in the `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Math\VertexContainerInterface.h` file\.

For more information about the `VertexContainer` type, see the code and code comments in the `lumberyard_version\dev\Code\Framework\AzCore\AzCore\Math\VertexContainer.h` file\.

**Note**  
The `VertexContainer` can store `Vector2` or `Vector3` types\. The vector type is determined at compile time when the type is created\. This is useful for certain components that do not allow points to be modified on the `Z` \(vertical\) axis and treat points just in two dimensions\. The **Polygon Prism** component uses the `Vector2` type\.

## EBus Request Bus Interface Example<a name="component-vertex-container-ebus-request-bus-interface-example"></a>

The following is an example of a Lua script that uses the `RequestBus` interface\.

```
local firstVertex = <type_with_vertex_container>.vertexContainer[1];
local lastVertex = <type_with_vertex_container>.vertexContainer[spline.vertexContainer:size()];
  
...RequestBus.Event.AddVertex(self.entityId, lastVertex + Vector3(1, 2, 3));
...RequestBus.Event.UpdateVertex(self.entityId, 0, firstVertex + Vector3(1, 2, 3));
...RequestBus.Event.InsertVertex(self.entityId, spline.vertexContainer:size() - 1, lastVertex + Vector3(1, 2, 3));
...RequestBus.Event.ClearVertices(self.entityId);
...RequestBus.Event.RemoveVertex(self.entityId, spline.vertexContainer:size() - 1);
  
-- Note: In Lua, use the member functions of VertexContainer, which start indexing from 1
.vertexContainer:AddVertex(lastVertex + Vector3(1, 2, 3));
.vertexContainer:UpdateVertex(1, firstVertex + Vector3(1, 2, 3));
.vertexContainer:InsertVertex(spline.vertexContainer:size(), lastVertex + Vector3(1, 2, 3));
.vertexContainer:ClearVertices();
.vertexContainer:RemoveVertex(spline.vertexContainer:size());
```