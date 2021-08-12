---
title: Vertex Container type
linktitle: Vertex Container
description: ' Use vertex containers in Open 3D Engine (O3DE) to access, update, and remove vertices. '
weight: 500
---

{{< preview-migrated >}}

`VertexContainer` is a concrete type and an interface that is used by several O3DE component buses. It is implemented directly by the [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) component and the [Spline](/docs/user-guide/components/reference/shape/spline/) component, and used indirectly by the [Navigation Area](/docs/user-guide/components/reference/ai/nav-area) component.

## Vertex Container Interface ##

A vertex container provides the ability to access, modify, add, and remove vertices. A vertex container has several interfaces that build upon one another, including the following:

### FixedVertices Interface ###

`FixedVertices` supports `GetVertex` and `UpdateVertex` functions for vertices in a container and a `Size` function that returns the number of vertices in the container.

Because the number of vertices is fixed, vertices cannot be added or removed. You can implement this interface with an array or `AZStd::fixed_vector`.

### VariableVertices Interface ###

The `VariableVertices` interface supports all the functionality of `FixedVertices`, but also provides `AddVertex`, `InsertVertex`, and `RemoveVertex` functions. `VariableVertices` also provides a utility function called `Empty` that checks whether a container has any elements or is empty.

To implement the `VariableVertices` interface, you can use either an `AZStd::vector` or a `VertexContainer`.

### VertexContainerInterface ###

The `VertexContainerInterface` provides an interface to all functionality provided by the previous two interfaces and the `VertexContainer` type. For convenience, the `VertexContainerInterface` also provides `SetVertices` and `ClearVertices` functions that can update all vertices or remove all vertices in one operation. The `SetVertices` function takes a `vertices` parameter that contains a list of all vertices to be stored.

> **Note:** A `VertexContainer` owns the vertices to which it has access; they are not stored elsewhere (a `VertexContainer` is not a view).

For more information about the interfaces in the `VertexContainerInterface`, see the code and code comments in the `o3de\Code\Framework\AzCore\AzCore\Math\VertexContainerInterface.h` file.

For more information about the `VertexContainer` type, see the code and code comments in the `o3de\Code\Framework\AzCore\AzCore\Math\VertexContainer.h` file.

> **Note:** The `VertexContainer` can store `Vector2` or `Vector3` types. The vector type is determined at compile time when the type is created. This is useful for certain components that do not allow points to be modified on the Z (vertical) axis and treat points just in two dimensions. The Polygon Prism Shape component requires the `Vector2` type.
