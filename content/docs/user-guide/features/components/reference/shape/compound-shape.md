---
description: ' Open 3D Engine (O3DE) Compound Shape component reference. '
title: Compound Shape component
date: 2021-03-05
---

{{< preview-migrated >}}

The **Compound Shape** component is a container for complex shapes. An entity can contain only one Shape component. To build complex shapes, the Compound Shape component can reference any number of entities, each with their own Shape component. The Compound Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/features/components/reference/shape/_index.md).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/features/gems/reference/lmbr-central.md)

## Dependencies ##

One or more entities containing Shape components.

## Properties ##

![Compound Shape component properties](/images/user-guide/features/components/reference/shape/compound-shape-component-ui-01.png)

The Compound Shape component contains a **Child Shape Entities** list of referenced entities containing Shape components.

* To add an item to the **Child Shape Entities** list, choose the **+** button at the top of the list.
* To remove an item from the list, choose the **Trashcan** button to the right of the item.
* To clear the list, choose the **Trashcan** button at the top right of the component interface.
* To assign an entity containing a shape component to a slot in the list, choose the **Target** button to enter pick mode, and then select an entity by clicking it in Perspective view or Entity Outliner.

The entities referenced by the Compound Shape component are not required to be children of the entity in the scene hierarchy that has the Compound Shape. However, if the shapes should move together, making the shape entities children of the Compound Shape entity in the scene hierarchy is recommended.

The dimensions of shapes that make up the Compound Shape should be set in the individual Child Shape Entity components to ensure accurate collision and overlap detection. Using the Scale properties in the Transform component of an entity to change the dimensions of a shape or compound shape might lead to unpredictable results.

For EBus (event bus) requests, Compound Shapes service the full shape component bus. However, each individual shape in the list increases the cost of requests such as testing for collision or overlap.

## CompoundShapeComponentRequestBus ##

Use the following request functions with the `CompoundShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCompoundShapeConfiguration` | Returns the configuration of the compound shape. | None | `CompoundShapeConfiguration` object that contains the configuration for the compound shape. | Yes |
