# Programmer's Guide to Entities and Components<a name="component-entity-system-pg-intro"></a>

This guide provides engine and game programmers with examples and best practices for creating and reflecting custom Lumberyard components in C\+\+\. 

For information on using the component entity system in Lumberyard Editor, see [Working with component entities](component-intro.md)\. 

For C\+\+ API reference documentation on the component entity system, see the [Amazon Lumberyard C\+\+ API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/)\.

Lumberyard uses a lightweight entity/component model called the component entity system for both game objects and systems\. Lumberyard entities are simply an ID and a container of components\. They have no functionality associated with them\. Lumberyard's component model is granular: It expects each component to provide independent functionality\. It expects game objects to be made up of one or more entities with many components attached to each entity\. Lumberyard components communicate with each other using a messaging system called EBuses\. Lumberyard expects you to use EBuses instead of holding references to other entities or their components\.

Lumberyard’s components have a simple lifecycle\. When an entity is activated, it calls `Activate()` on all of its components\. When the entity is deactivated, it calls `Deactivate()` on all of its components\. In the `Activate()` function a component sets itself up, connects to EBuses, and allocates resources or requests assets\. In the `Deactivate()` function, a component should release all resources and disconnect from all EBuses\. Components should be completely dormant after deactivation, and they should be in more or less the same state that they are in after `Init()` is called\. The `Init()` function is only called once and allows a component to initialize its internal state\. 

**Note**  
A component can be activated and deactivated many times before it is deleted\. For example, it might be deactivated temporarily while it is being streamed out\.

The remaining API operations of a component should be established by the EBus that it implements\.

Components can depend on services\. Such services usually have a one\-to\-one relationship with EBuses\. If a component declares that it depends on \(requires\) a service, any entity that uses the component must also contain a component that provides the required services\.

Components are always activated in order of their dependency\. For this reason, a component can always assume that the services that it requires are available when the component is activated\.

Entities are never allowed to be in a state in which one of their component dependencies is missing, even during authoring\. In Lumberyard's editing tools, this means that components whose dependencies are missing are actually removed from the entity and stored in a temporary list\. When all of the component's dependencies become available, the component is restored to the entity\.

**Topics**
+ [Creating a Component](component-entity-system-create-component.md)
+ [Registering Your Component](component-entity-system-pg-registering-your-component.md)
+ [Reflecting a Component for Serialization and Editing](component-entity-system-reflect-component.md)
+ [Defining and Using Component Services](component-entity-system-pg-defining-using-component-services.md)
+ [Editor Components](component-entity-system-pg-editor-components.md)
+ [Creating System Components](component-entity-system-pg-creating-system-components.md)
+ [Programmer's Guide to Component Mode](working-with-component-mode-programmatically.md)
+ [Components and EBuses](component-entity-system-pg-components-and-ebuses.md)
+ [Tick Bus and Components](component-entity-system-pg-tick-bus.md)
+ [Exposing Custom Components to Track View for Animation](component-entity-system-track-view.md)
+ [Components and EBuses: Best Practices](component-entity-system-pg-components-ebuses-best-practices.md)