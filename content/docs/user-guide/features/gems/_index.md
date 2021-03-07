---
description: ' You can use gems to add features and assets to your Open 3D Engine game
  project. '
title: Gems
weight: 400
---
## Add modular features and assets with Gems {#gems-system-gems}

Gems are packages that contain code and assets to augment your game projects\. With the [Programming with Gems](/docs/userguide/gems/_index.md), you can choose the features and assets that you need for your game project without including unnecessary components\. For a list of all gems included in O3DE, see [Gems Available in O3DE](/docs/user-guide/features/gems/list.md)\.

O3DE features two types of Gems:
+ **Code & Assets** - Contains assets as well as code that performs certain functions upon the assets\.
+ **Assets Only** - Contains only assets and no code\.

All O3DE gems are located in the following directory:

`lumberyard_version\dev\Gems`

The gems that you enable are automatically detected and built through the integrated [Using the Waf Build System](/docs/userguide/waf/intro.md)\.

**Note**
To enable **Code & Assets** Gems, you must select the **Compile the game code** option in O3DE Setup Assistant\. This option is not required for **Assets Only** gems\. For more information, see [Running O3DE Setup Assistant](/docs/userguide/lumberyard-launcher-using.md)\.

You can enable Gems with the [Project Configurator](/docs/userguide/configurator/projects.md) or the command line \([`Lmbr.exe`](/docs/userguide/lmbr-exe.md)\)\.

**Topics**
+ [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)
+ [Creating a Gem](/docs/user-guide/features/gems/development/creating/intro.md)
+ [Programming with Gems](/docs/userguide/gems/_index.md)
+ [Gems Available in O3DE](/docs/user-guide/features/gems/list.md)