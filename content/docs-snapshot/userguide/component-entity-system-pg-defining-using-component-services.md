# Defining and Using Component Services<a name="component-entity-system-pg-defining-using-component-services"></a>

Components can optionally specify a list of services that they provide, are incompatible with, depend on, or require\. When you create a component, you can use this service specification to define relationships between various components\. The component entity system uses this list for the conditional addition and removal of components at both edit time and at run time\. The service specification also defines the order in which components are activated when an entity is activated\. Specifically, components that provide services that another component depends on are activated first\.

The following example shows a service specification\.

```
static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided)
{
      provided.push_back(AZ_CRC("ProvidedService"));
      provided.push_back(AZ_CRC("AnotherProvidedService"));
}

static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
{
      required.push_back(AZ_CRC("RequiredService"));
      required.push_back(AZ_CRC("AnotherRequiredService"));
}

static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible)
{
      incompatible.push_back(AZ_CRC("IncompatibleService"));
}

static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent)
{
      dependent.push_back(AZ_CRC("DependentOnService"));
}
```

**ProvidedService** – Specifies the service that the component provides\. For example, a `TransformComponent` could provide a `TransformService` that in turn provides locational information\.

**RequiredService** – Specifies a service that the component requires\. The components that provide the required services are guaranteed to be present and active before this component is activated\. For example, an audio component might need to know where it is located and therefore require a `TransformService`\. Because of this requirement, the audio component can be added only to entities that have the component that provides the `TransformService`\.

**DependentService** – Specifies a service on which the component depends but does not require\. The component entity system guarantees that the components that provide dependent services are activated before the component itself is activated\. For example, an audio component could depend on the `physics` component\. If the entity has physics, the audio component can query the `physics` component for physical material information\. However, the audio component does not require that physics be present\.

**IncompatibleService** – Specifies a service that cannot work with the component\. Consider these examples:
+ An entity can have only one type of collider\. Therefore, the `PrimitiveColliderService` specifies that the `MeshColliderService` is incompatible with it and vice versa\.
+ The same effect can be achieved if two collider components already provide the `ColliderService` themselves and therefore specify the `ColliderService` as incompatible\. Marking a component as incompatible with `ColliderService` ensures that no other component that has the same service is added to the entity\.
+ The `IncompatibleService` specification is frequently used to specify that multiples of the same component cannot exist on an entity\.