---
linktitle: Extending the Terrain System
title: Extending the Terrain System
description: Information on how to extend the terrain system to accomplish various goals.
weight: 400
---
The terrain system is designed to be highly decoupled and easily extensible at a number of different layers.

## Gradient Components

Gradient components are the underlying data source for height data and surface weight data. New gradient component types can be created as needed to provide data from different sources, such as streaming satellite data, or to modify existing gradient data, such as adding complex erosion filters.

New gradient components need to support the following at a minimum:

* Implement the `GradientRequestBus` to generically return a floating-point output value for an input world position.
* Declare that it implements the `GradientService` in `GetProvidedServices`.
* Support thread safety. Ideally, this will mean using a `shared_mutex` with a `shared_lock` in the query APIs and a `unique_lock` for any places that change the underlying data used in the query API methods. This will let multiple queries run in parallel while safely blocking on data changes.
* Call `DependencyNotificationBus::Events::OnCompositionChanged` or `DependencyNotificationBus::Events::OnCompositionRegionChanged` whenever any data within the gradient changes. This notifies everything "above" the gradient that it will need to refresh itself.

In addition, new gradient components should also support the following:

* Use the **Shape** components to define how the gradient data maps into world space.
* Support the **Gradient Transform Modifier** component for performing arbitrary transforms to the gradient data.
* By convention, all gradients currently listen to `OnEntityVisibilityChanged` and use that to enable or disable the gradient data in the Editor. This makes it easy to turn gradients on and off while authoring, though it's important to recognize that they are still active at runtime regardless of the authoring visibility setting.

## Terrain Components

Each of the terrain components can be replaced with new components that meet the same requirements. For example, a new component that streams down real-world satellite height data can replace the **Terrain Height Gradient List**. It's also possible to combine components together, such as a simplified Terrain Spawner component that implements the functionality of the **Terrain Layer Spawner**, **Terrain Height Gradient List**, and **Terrain Surface Gradient List** in one single component.

Any replacement components need to support the following:

* Implement the request bus that matches the component being replaced. For example, `TerrainSpawnerRequestBus`, `TerrainAreaHeightRequestBus`, or `TerrainAreaSurfaceRequestBus`.
* Declare that it implements each service that matches the component being replaced in `GetProvidedServices`. For example, `TerrainAreaService`, `TerrainHeightProviderService`, or `TerrainSurfaceProviderService`.
* Support thread safety.
* Call `OnCompositionChanged` or `OnCompositionRegionChanged` whenever any data within the component changes.
* Call the appropriate APIs on the `TerrainSystemServiceRequestBus` to register/unregister/refresh a terrain region.

## Terrain physics integration

The terrain physics support is provided through a divided component system. One half is the `TerrainPhysicsCollider`, which knows about the generic `TerrainDataRequestBus` for terrain data and the generic `HeightfieldProvider` buses for physics communication. The other half is the `PhysXHeightfieldCollider`, which knows about PhysX and heightfields, but not about terrain. To integrate terrain with a new physics system, a new `HeightfieldCollider` component needs to be implemented to replace the PhysX version that works with the `HeightfieldProvider` buses and with the new physics system.

## Terrain renderer

The entire terrain renderer can be replaced by creating new rendering level components, rendering entity components, feature processors, and shaders. Replacing the renderer doesn't affect the base terrain system or the terrain physics integrations.

## Terrain system

The underlying terrain system can be replaced entirely as well, as long as it implements the `TerrainDataRequestBus` and `TerrainSystemServiceRequestBus`, and it uses the `TerrainDataNotificationBus` to send change notifications. There's no obvious reason to replace the terrain system itself in isolation though, as it mostly just routes data requests and notifications.
