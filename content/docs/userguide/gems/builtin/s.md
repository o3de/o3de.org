---
description: ' You can use gems to add features and assets to your &ALYlong; game
  project. '
title: Add modular features and assets with &gems;
---
# Add modular features and assets with Gems<a name="gems-system-gems"></a>

Gems are packages that contain code and assets to augment your game projects\. With the [Programming with Gems](/docs/userguide/gems/_index.md), you can choose the features and assets that you need for your game project without including unnecessary components\. For a list of all gems included in Lumberyard, see [Gems Available in Lumberyard](/docs/userguide/gems/ref.md)\.

Lumberyard features two types of Gems:
+ **Code & Assets** – Contains assets as well as code that performs certain functions upon the assets\.
+ **Assets Only** – Contains only assets and no code\.

All Lumberyard gems are located in the following directory: 

`lumberyard_version\dev\Gems`

The gems that you enable are automatically detected and built through the integrated [Using the Waf Build System](/docs/userguide/waf/intro.md)\.

**Note**  
To enable **Code & Assets** Gems, you must select the **Compile the game code** option in Lumberyard Setup Assistant\. This option is not required for **Assets Only** gems\. For more information, see [Running Lumberyard Setup Assistant](/docs/userguide/lumberyard-launcher-using.md)\.

You can enable Gems with the [Project Configurator](/docs/userguide/configurator/projects.md) or the command line \([`Lmbr.exe`](/docs/userguide/lmbr-exe.md)\)\.

**Topics**
+ [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)
+ [Creating a Gem](/docs/userguide/gems/builtin/s-creating.md)
+ [Programming with Gems](/docs/userguide/gems/_index.md)
+ [Gems Available in Lumberyard](/docs/userguide/gems/ref.md)