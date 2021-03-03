---
description: ' Use the Python Asset Builder gem to create custom asset builders for
  your Amazon Lumberyard project. '
title: Python Asset Builder gem
---
# Python Asset Builder gem {#python-asset-builder}

With **Python Asset Builder**, you can create Python scripts that process custom assets that are produced from content creation tools such as Maya and Houdini, or any content tool with a known file format\.

For information on using **Python Asset Builder**, see [Process custom assets with Python Asset Builder](/docs/user-guide/features/assets/builder/intro.md)\.

## Enable the Python Asset Builder gem {#enable-gem-python-asset-builder}

To enable the Python Asset Builder gem, do the following:

1. Use [Project Configurator](/docs/userguide/configurator/projects.md) to enable the **Python Asset Builder** gem in your project\.

1. Configure your project\. Use the following command\.

   ```
   lmbr_waf configure
   ```

1. Build your project\. Use the following command\.

   ```
   lmbr_waf build_win_x64_vs2019_profile -p all --progress
   ```

For more information on gems, see the [Gems system documentation](/docs/user-guide/features/gems)\.