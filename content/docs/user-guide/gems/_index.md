---
description: ' You can use gems to add features and assets to your Open 3D Engine game
  project. '
title: Gems
weight: 400
---
## Add modular features and assets with Gems {#gems-system-gems}

{{< preview-migrated >}}

Gems are packages that contain code and assets to augment your game projects\. With the [Programming with Gems](/docs/userguide/gems/_index.md), you can choose the features and assets that you need for your game project without including unnecessary components\. For a list of all gems included in O3DE, see [Gems Available in O3DE](/docs/user-guide/gems/list.md)\.

O3DE features two types of Gems:
+ **Code & Assets** - Contains assets as well as code that performs certain functions upon the assets\.
+ **Assets Only** - Contains only assets and no code\.

All gems that come bundled with O3DE are located in the `Gems` directory. Enabled Gems are detected and set as dependencies for your project by
the O3DE [build system](/docs/user-guide/build).

**Topics**
+ [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)
+ [Creating a Gem](/docs/user-guide/gems/development/creating/intro.md)
+ [Programming with Gems](/docs/userguide/gems/_index.md)
+ [Gems Available in O3DE](/docs/user-guide/gems/list.md)
