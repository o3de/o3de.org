---
description: ' Learn how to register a component during application startup in &ALYlong;. '
title: Registering Your Component
---
# Registering Your Component {#component-entity-system-pg-registering-your-component}

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

For more information, see the [The Module Class](/docs/userguide/modules/parts#az-module-parts-module-class) section of the [Using AZ Modules to Initialize Gems](/docs/userguide/modules/s-intro.md)\.
