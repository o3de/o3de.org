---
linkTitle: Debugging with Lua Editor
title: Debugging with Lua Editor
description: Use Lua Editor to debug Lua scripts in Open 3D Engine (O3DE).
toc: true
weight: 900
---

**Open 3D Engine (O3DE)** **Lua Editor** (Lua IDE) offers an intuitive integrated development environment (IDE) that makes it easy to author, debug, and edit Lua scripts when you create or extend your game. Lua Editor is a standalone application, but you can open it directly in **O3DE Editor** from the Tools menu.

This tutorial shows you how to use O3DE Lua Editor to perform debugging operations on a sample script.

## Add sample Lua Script to an entity

1. Open Lua Editor from the **Tools** menu.  

1. Select **New** from the **File** menu to create a new Lua script.

1. **Copy** and **Paste** the following code into the new script.

    ```lua
    -- ConstantRotation.lua
    
    local ConstantRotation =
    {
        Properties =
            {
            Rotation = { default = Vector3(0, 0, 90), description = "Constant rotation (in degrees) to apply over time." },
            },
    }

    function ConstantRotation:OnActivate()
        self.rotationRadians = self.Properties.Rotation;
        self.rotationRadians.x = Math.DegToRad(self.rotationRadians.x);
        self.rotationRadians.y = Math.DegToRad(self.rotationRadians.y);
        self.rotationRadians.z = Math.DegToRad(self.rotationRadians.z);
        self.tickBusHandler = TickBus.Connect(self)
    end

    function ConstantRotation:OnTick(deltaTime, timePoint)
        TransformBus.Event.RotateAroundLocalX(self.entityId, self.rotationRadians.x * deltaTime);
        TransformBus.Event.RotateAroundLocalY(self.entityId, self.rotationRadians.y * deltaTime);
        TransformBus.Event.RotateAroundLocalZ(self.entityId, self.rotationRadians.z * deltaTime);
    end

    function ConstantRotation:OnDeactivate()
        self.tickBusHandler:Disconnect()
    end

    return ConstantRotation
    ```
    
1. **Save** the script as `ConstantRotation.lua` in your project's directory.

1. **Close** Lua Editor.

1. In **Entity Outliner**, choose an entity to add a **Lua Script** component to.

1. In **Entity Inspector**, choose **Add Component**, and then choose **Scripting**, **Lua Script**.

1. In **Entity Inspector**, locate the **Lua Script** component, and then click {{< icon "browse-edit-select-files.svg" >}} to open a file browser.

1. In the **Pick Lua Script** window, select `ConstantRotation.lua` and choose **OK**.

1. In the **Lua Script** component, click {{< icon "open-in-internal-app.svg" >}} to launch Lua Editor.

    ![Launch Lua Editor from Lua Script component in O3DE Editor](/images/user-guide/scripting/lua/lua-component-open-in-lua-editor.png)
    
## Connect to O3DE Editor

The [**Remote Tools Gem**](docs/user-guide/gems/reference/debug/remote-tools) facilitates local connections between O3DE applications. 

{{< note >}}
The **Remote Tools Gem** must be [enabled in your project](/docs/user-guide/project-config/add-remove-gems/#enabling-or-disabling-gems) for debugging to work.

**Remote Tools Gem** behavior is disabled in release builds.
{{< /note >}}

The Remote Tools Gem starts automatically when Lua Editor is started and must be running in the background for Lua Editor to find targets it can connect to.  Because the debugging functionality is enabled through network sockets, you must connect Lua Editor to the target that is running the script before you can debug. In this tutorial, you connect to O3DE Editor.

1. In the Lua Editor toolbar, choose **Target: None**, and then choose **Editor(*ID*)** to connect to O3DE Editor.

    ![Target selector](/images/user-guide/scripting/lua/lua-editor-debugger-target-editor.png)
    
    {{< note >}}
You may need to expand the Lua Editor window to see the buttons on the Lua Editor toolbar for the next few steps.
{{< /note >}}

1. In the Lua Editor toolbar, leave **Context** setting at **Default** for the debugging context. The default setting is good for debugging component entity scripts such as the one in this tutorial.

    ![Context selector](/images/user-guide/scripting/lua/lua-editor-debugger-context-choose.png)

1. The **Debugging** icon turns green to show that Lua Editor and O3DE Editor are connected:

    ![Lua Editor connected to O3DE Editor](/images/user-guide/scripting/lua/lua-editor-debugger-connected-icon.png)

    Click **Classes** in the **Class Reference** to show the available Lua libraries. You can do the same for **EBuses** and **Globals**.
    
    ![Classes Reference](/images/user-guide/scripting/lua/lua-editor-debugger-class-reference-pane.png)
    
    ![Classes](/images/user-guide/scripting/lua/lua-editor-debugger-class-reference-pane-open.png)
    
    {{< note >}}
The class reference feature is active only for the default context and component entity scripts.
{{< /note >}}

## Setting breakpoints

After you connect, you can pause a script by setting breakpoints.

1. In the Lua Editor toolbar, click the **Breakpoints** icon ![Breakpoints Icon](/images/user-guide/scripting/lua/lua-editor-debugger-breakpoints-icon.png) to show the **Breakpoints** window.

1. In Lua Editor, click one or more line numbers in the `constantrotation.lua` script to set one or more breakpoints. As you add breakpoints, the line number and script path for each are added to the **Breakpoints** window.

1. In O3DE Editor, press **Ctrl+G** to run the game, or click the **Simulate** icon at the bottom of the viewport to enable game simulation and run scripts. Lua Editor opens with a yellow marker stopped on the first breakpoint that it encounters.

    ![Debugger stopped on breakpoint](/images/user-guide/scripting/lua/lua-editor-debugger-stopped-on-breakpoint.png)

    When execution is halted at a breakpoint, more information becomes available in the **Lua Locals**, **Stack**, and **Watched Variables** panes.

1. Click the **Stack** icon ![Stack Icon](/images/user-guide/scripting/lua/lua-editor-debugger-stack-icon.png) to show the **Stack** window.

1. Click the **Lua Locals** icon ![Lua Locals Icon](/images/user-guide/scripting/lua/lua-editor-debugger-lua-locals-icon.png) to show local Lua variables.

1. Click **Watched Variables** icon ![Watched Variables Icon](/images/user-guide/scripting/lua/lua-editor-debugger-watched-variables-icon.png) to open the **Watched Variables** window, where you can specify variables to watch.

1. Press **F11** a few times to step through the code. Note how the contents of the **Stack**, **Lua Locals**, and **Watched Variables** windows change.

    {{< tip >}}
For greater convenience, you can float or dock these windows.
    {{< /tip >}}

1. To detach from debugging, click **Debugging**.

    ![Click to detach from debugging](/images/user-guide/scripting/lua/lua-editor-debugger-detach-icon.png)

1. In O3DE Editor, Press **Esc** to stop the game.

## Options available while debugging 

The following table summarizes common options available while debugging.

| **Icon** | **Action** | **Keyboard Shortcut** | **Description** |
| --- | --- | --- | --- |
| ![Run in Editor Icon](/images/user-guide/scripting/lua/lua-editor-debugger-run-in-editor.png) | Run in Editor | **Alt+F5** | Run in O3DE Editor. |
| ![Run on Target Icon](/images/user-guide/scripting/lua/lua-editor-debugger-run-on-target.png) | Run on Target | **Ctrl+F5** | Send script to the connected target and run it. |
| ![Run/Continue Icon](/images/user-guide/scripting/lua/lua-editor-debugger-run-continue.png) | Run/Continue | **F5** | Run or continue running the current script. |
| ![Step Into Icon](/images/user-guide/scripting/lua/lua-editor-debugger-step-into.png) | Step Into | **F11** | Step into the function called on the current line. |
| ![Step Out Icon](/images/user-guide/scripting/lua/lua-editor-debugger-step-out.png) | Step Out | **Shift+F11** | Step out of the called function. |
| ![Step Over Icon](/images/user-guide/scripting/lua/lua-editor-debugger-step-over.png) | Step Over | **F10** | Step over the function called on the current line. |
| ![Toggle Breakpoint Icon](/images/user-guide/scripting/lua/lua-editor-debugger-toggle-breakpoint.png) | Toggle Breakpoint | **F9** | Enable or disable a breakpoint on the current line. |
