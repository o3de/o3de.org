---
linkTitle: Gems
title: Gems in Open 3D Engine
description: You can use Gems to add features and assets to your Open 3D Engine game project.
weight: 400
---

*Gems* are packages that contain code and/or assets to augment your **Open 3D Engine (O3DE)** projects. With the Gem system, you can choose the features and assets that you need for your project without including unnecessary components.

O3DE features two types of Gems:

* **Code & Assets** - Contains assets as well as code that performs certain functions upon the assets. 
* **Assets Only** - Contains only assets and no code.

Add modular features and assets to your project by enabling Gems that are available in O3DE or from an external source. Depeneding on your project configuration, your project enables a set of Gems by default. Enabled Gems are detected and set as dependencies for your project by the O3DE build system. For more information, refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/).



## Available Gems

All Gems that come bundled with O3DE are located in the `<engine>/Gems` directory. For a list of all Gems included in **Open 3D Engine (O3DE)**, refer to [Gem Reference](./reference).

## Custom Gems

Create custom Gems that add new features and assets to your project.

The following topics help you create custom Gems: 

- [Create an O3DE Gem](): 
- [Programmer's Guide to Gem Development](): 


## Section topics

| Topic | Description |
| --- | --- |
| [Gem Reference](./reference) | The complete reference to all Gems available in O3DE. |
| [Core O3DE Gems](./core-gems) | Learn about the core Gems that are required for most projects in O3DE. |

## Related topics

| Topic | Description |
| --- | --- |
| [Extend the Editor Tutorials](/docs/learning-guide/tutorials/extend-the-editor/) | Tutorials to extend the **O3DE Editor** by creating a custom tool Gem in C++ or Python. |
