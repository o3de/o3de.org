---
linkTitle: Gems
title: Gems in Open 3D Engine
description: You can use Gems to add features and assets to your Open 3D Engine game project.
weight: 400
---


*Gems* are packages that contain code and/or assets to augment your **Open 3D Engine (O3DE)** projects. With the Gem system, you can choose the features and assets that you need for your project without including unnecessary components. You can also create custom Gems to contain a collection of assets, extend the Editor, or develop features and gameplay logic for your project.

O3DE features two types of Gems:

- **Code Gem**: Contains assets as well as code that performs certain functions upon the assets.

- **Assets Gem**: Contains only assets and no code.

Gems come from three different sources:

- **Standard O3DE Gems**: Gems that are considered as part of the core O3DE. All standard O3DE Gems are available in O3DE.

- **Third-party Gems**: Gems that are provided by third-party developers. Third-party Gems are provided by external sources.
  
- **Custom Gems**: Gems that your team creates. Custom Gems are provided by external sources.

O3DE comes bundled with standard O3DE Gems. Their source code is located in the `<engine>/Gems` directory. For a list of all Gems included in O3DE, refer to [Gem Reference](./reference).


## Section topics

| Topic | Description |
| --- | --- |
| [Gem Reference](./reference/) | The complete reference to all Gems available in O3DE. |
| [Gem Repositories](/docs/user-guide/remote-content/) | Learn how to share Gems by creating and hosting a Gem repository. |
| [Core O3DE Gems](./core-gems) | Learn about the core Gems that are required for most projects in O3DE. |
| [Gem Versioning](./gem-versioning) | Learn about Gem versioning and compatibility. |


## Related topics

| Topic | Description |
| --- | --- |
| [Extend the Editor Tutorials](/docs/learning-guide/tutorials/extend-the-editor/) | Tutorials to extend the **O3DE Editor** by creating a custom tool Gem in C++ or Python. |


## Common workflows

### Adding Gems to a project

Gems provide modular features and assets to your project. You can add standard O3DE Gems, third-party Gems, or custom Gems.

Depending on your project configuration, your project enables a set of Gems by default. The O3DE build system detects enabled Gems and sets them as dependencies for your project. You can find the list of Gems enabled in your project in the `enabled_gems.cmake` file in the `<project>/Code/` directory. 

The following is a high-level overview for adding a Gem to a project: 

1. Register the Gem, if it's not already. Standard Gems that are bundled with O3DE are already registered. However, you must register Gems that you obtain from an external source. Refer to [Register Gems to a Project](/docs/user-guide/project-config/register-gems/).

1. Add and remove Gems. You can add and remove registered Gems in your project. Refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/).

### Creating custom Gems

You can create an asset Gem or a code Gem. An asset Gem contains only a collection of assets. A code Gem contains code and assets to extend the Editor or develop features and gameplay logic for your project.

The following recommended topics help you create an asset Gem or a code Gem:

1. [Gem Module System in O3DE](/docs/user-guide/programming/gems/overview/): In this section, learn about Gem Modules, the Module Manager, and how O3DE loads and initializes Gems.

1. [Create an O3DE Gem](/docs/user-guide/programming/gems/creating/): Both asset and code Gems have the same directory structure and you can create them in the same way. This topic demonstrates how to create a Gem and what contents are contained in a Gem's directory structure.

1. [Code Gem Specifications](/docs/user-guide/programming/gems/code-gems/): Learn how to create a code Gem and gain an understanding of its critical components.
