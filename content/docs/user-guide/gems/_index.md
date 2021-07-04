---
title: Gems
description: You can use Gems to add features and assets to your Open 3D Engine game project.
weight: 400
---
## Add modular features and assets with Gems

*Gems* are packages that contain code and assets to augment your game projects. With the Gem system, you can choose the features and assets that you need for your game project without including unnecessary components. For a list of all Gems included in O3DE, see [Open 3D Engine (O3DE) Gem Reference](reference).

O3DE features two types of Gems:

* **Code & Assets** - Contains assets as well as code that performs certain functions upon the assets.
* **Assets Only** - Contains only assets and no code.

All Gems that come bundled with O3DE are located in the `Gems` directory. Enabled Gems are detected and set as dependencies for your project by the O3DE [build system](/docs/user-guide/build).

## Topics

* [Developing Gems](./development)
* [Gems Available in O3DE](./reference)
* [Core O3DE Gems](./core-gems)
