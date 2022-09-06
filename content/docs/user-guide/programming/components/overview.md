---
linktitle: Overview
title: Overview of Open 3D Engine Entities and Components
description: Learn how Open 3D Engine (O3DE) components fit into the Entity-Component System.
weight: 100
---

**Open 3D Engine (O3DE)** is an *entity-component system (ECS)* engine. This means that rather than using a polymorphism system where objects derive from one another ("is-a" relationships), it instead uses composition ("has-a" relationships). A common polymorphism example is "a car *is a* vehicle", whereas a composition example is "a car *has the components of a* vehicle". Using composition makes it much easier to extend objects, design for reuse, and keep base implementations as flexible as possible for performance and ease of use.

Entities have no functionality by themselves; rather, they are essentially an ID and a container for components. An entity can contain any number or combination of components. Some components allow only one instance per entity, and some depend on other components to function.

The Gems that come with O3DE include a variety of components that implement core engine functionality. Within **O3DE Editor**, you can find these components in categories such as Animation, Atom, and Gameplay. As an O3DE developer, you can create new components, either to extend the functionality of existing Gems, or to implement the features of your own Gems. This section shows you how to create a component.

### Types of components

All O3DE components derive from the `AZ::Component` class. In addition, O3DE defines a few specialized types of components designed for specific use cases.

#### Standard components

*Standard components* can implement functionality in both editor and runtime environments. In some contexts, they are referred to as "runtime components" or "game components" to help differentiate them from the specialized "editor" and "system" components.

#### Editor components

*Editor components* provide specific functionality to meet the needs of an editor environment. They are active only while you are using an editor in edit mode. They are often paired with a runtime component counterpart that can represent the editor component at runtime, providing related but simpler or leaner functionality in the runtime environment. The editor component class includes a method that you can override to facilitate creating a runtime component from an editor component for the entity it belongs to. For more information about editor components, refer to [Editor Components](editor-components).

#### System components

*System components* are long-lived singletons that control behavior within the engine instead of providing editor or runtime behavior. For this reason, system components are registered with the engine rather than added to an individual entity. For more information about system components, refer to [System Components](system-components).

### Communication between components

In O3DE, you use the **Event Bus (EBus)** messaging system to communicate between components instead of holding references to other entities or their components.

### Component dependencies

Components can depend on services. These services usually have a one-to-one relationship with EBuses. If a component declares that it depends on (requires) a service, any entity that uses the component must also contain a component that provides the required services. Entities are never allowed to be in a state in which one of their component dependencies is missing, even during authoring. In O3DE's editing tools, this means that components whose dependencies are missing are actually removed from the entity and stored in a temporary list. When all of the component's dependencies become available, the component is restored to the entity.

Components are always activated in order of their dependency. For this reason, a component can always assume that the services that it requires are available when the component is activated.

### Component lifecycle

The component lifecycle is straightforward. After initialization, component activation and deactivation follows the owner entity's activation and deactivation lifecycle.

* **`Init()`** -- (Optional) An `Init()` function is called once for each entity that owns the component. It allows a component to initialize its internal state. Although the `Init()` function initializes the component, the component is not active until the system calls the component's `Activate()` function.
* **`Activate()`** -- (Required) When an entity is activated, it calls `Activate()` on all of its components, provided that all services and components that the component depends on are present and active. To learn how to specify these dependencies, refer to [Defining and Using Component Services](services). Typically in the `Activate()` function, a component performs setup procedures, connects to EBuses, and allocates resources or requests assets.
* **`Deactivate()`** -- (Required) When an entity is deactivated, it calls `Deactivate()` on all of its components. In the `Deactivate()` function, a component should release all resources and disconnect from all EBuses. The order of deactivation is the reverse of activation, so your component is deactivated before the components it depends on. Components should be completely dormant after deactivation, and they should be in more or less the same state that they are in after `Init()` is called.

The remaining API operations of a component should be established by the EBus that it implements.
