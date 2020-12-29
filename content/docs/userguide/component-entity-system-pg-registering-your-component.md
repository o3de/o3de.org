# Registering Your Component<a name="component-entity-system-pg-registering-your-component"></a>

You register a component during application startup\. You implement the registration in the `AZ::Module class` of the module in which the component is written\.

The following example module creates descriptors for the components that are declared within the module\.

```
//MyModule.cpp 

MyModule::MyModule()
{
    // Create descriptors for components declared within this module.
    m_descriptors.insert(m_descriptors.end(), {
        MyComponent::CreateDescriptor(),
    });
}
```

For more information, see the [The Module Class](az-module-parts.md#az-module-parts-module-class) section of the [Using AZ Modules to Initialize Gems](az-modules-intro.md)\.