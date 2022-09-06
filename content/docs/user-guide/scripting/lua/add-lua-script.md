---
linkTitle: Adding Lua Scripts
description: Use the Lua Script component to add script functionality to your game entities in Open 3D Engine.
title: Adding Lua Scripts to Component Entities
toc: true
weight: 150
---

O3DE makes it easy for you to add script functionality to your game entities by using the **Lua Script** component. The following steps show you how to do this in **O3DE Editor**.

**To add a Lua script to a component entity in O3DE Editor**

1. With the **Entity Outliner** view pane visible, **left-click** the entity that you want to add a Lua script to.

1. Click **Add Component**, in the `Scripting` category of the drop-down menu, select **Lua Script**.

    ![Lua Script component](/images/user-guide/scripting/lua/add-lua-component.png)

1. A **Lua Script** component appears in **Entity Inspector**. Click the {{< icon browse-edit-select-files.svg >}} file select button to select the Lua script from the file hierarchy that you want to use.

    {{< note >}}
You can select either a `.lua` file (a text copy of the original), or a `.luac` file (a precompiled version of the script). The functionality should be the same. The precompiled version is preferable because it loads faster and is usually smaller. However, you can use`.lua` files if you experience any issues.
{{< /note >}}

1. After the script is loaded, click {{< icon "open-in-internal-app.svg" >}} to launch **Lua Editor** and make changes to your script.
