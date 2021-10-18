---
linkTitle: Using Player Input
title: Using Player Input in Open 3D Engine
description: Instructions for configuring player input using Open 3D Engine (O3DE) Asset Editor, along with Script Canvas or Lua.
---

You can create an input bindings asset for an **Input** component and specify input events with **Open 3D Engine (O3DE) Asset Editor**. Use Script Canvas or Lua to map the input events to gameplay logic.

## Creating an input bindings asset

To create an `.inputbindings` file with Asset Editor, follow these steps.

1. In **O3DE Editor**, create an entity.

1. Select the entity in the viewport or **Entity Outliner**.

1. In **Entity Inspector**, click **Add Component**, and then add an Input component.

1. In Entity Inspector, find the Input component, and then click {{< icon "open-in-internal-app.svg" >}} to create a new `.inputbindings` file in Asset Editor.

	![The default Input component](/images/user-guide/interactivity/input/input-component.png)

### Creating input event groups 

You can add input event groups for different actions to the new `.inputbindings` file.

![Adding Input Event Groups](/images/user-guide/interactivity/input/new-inputbindings-asset.png)

1. To create a new input event group, click the {{< icon "add.svg" >}} icon.

1. For **Event Name**, enter a name for the event, such as `Action`.


### Creating event generators

After you create an input event group, you can add event generators to the group. An *event generator* is a handler that generates the named event. For example, a pressed key, a held mouse button, or a series of actions on a game controller results in the named event.

![Adding Event Generators](/images/user-guide/interactivity/input/new-inputbindings-asset-2.png)

1. In the new input event group, click the {{< icon "add.svg" >}} icon next to **Event Generators**.

1. In the **Class to create** dialog box, select `InputEventMap`, and then choose **OK**.

1. Specify changes for the event generator. Each event generator has a set of properties that you can customize.

### Setting event generator properties

The following `.inputbindings` file specifies a keyboard for the **Input Device Type** and the space bar for the **Input Name**.

   ![Input bindings configuration example in Asset Editor.](/images/user-guide/interactivity/input/inputbindings-example.png)

### Saving your input bindings asset

1. In the **Asset Editor**, choose **File, Save**.

1. Enter a name for the `.inputbindings` file, and then choose **Save**.

1. In Entity Inspector, in the Input component, for **Input to event bindings**, click {{< icon "browse-edit-select-files.svg" >}} and select your `.inputbindings` file.

## Mapping input events to gameplay logic

After you create an `.inputbindings` file and specify input events, you can use Script Canvas or Lua to map the input events to gameplay logic. You can create gameplay logic in a visual scripting environment with **Script Canvas Editor** or write your own Lua scripts with **Lua Editor** (Lua IDE).

### Using input in Script Canvas 

You can create a Script Canvas graph that connects to input events. For more information about scripting with Script Canvas, refer to [Creating Gameplay and Other Behaviors with Script Canvas](/docs/user-guide/scripting/script-canvas).

1. In O3DE Editor, select the entity with the Input component in the viewport or **Entity Outliner**.

1. In Entity Inspector, click **Add Component** and add the **Script Canvas** component.

1. In the Script Canvas component, for **Script Canvas Asset**, click {{< icon "open-in-internal-app.svg" >}}, and then create a new Script Canvas graph like the following example.

### Example Script Canvas graph

In the following graph, the **InputHandler** node connects `Action` events to various **Transform** nodes. The Input component sends **Pressed**, **Held**, and **Released** events to the **InputHandler** node When the state of an event generator changes.

![Example Script Canvas graph for the Input component](/images/user-guide/interactivity/input/sc-input-example.png)

### Using input in Lua 

You can also create a Lua script that connects to input events. For more information about scripting with Lua, refer to [Writing Lua Scripts](/docs/user-guide/scripting/lua).

1. In O3DE Editor, select the entity with the Input component in the viewport or **Entity Outliner**.

1. In Entity Inspector, click **Add Component**, and then add the **Lua Script** component.

1. In the Lua Script component, click {{< icon "open-in-internal-app.svg" >}}.

1. In Lua Editor, create a table of the functions `OnPressed`, `OnHeld`, and `OnReleased` for an input event that you want to connect the script to.

1. Create a bus handler by connecting to the `InputEventNotificationBus` with the first parameter set to the table of functions for the input event. The second parameter is an `InputEventNotificationId` for the **Event Name**.

### Example Lua script

The following Lua script connects `Action` events to the individual functions `OnPressed`, `OnHeld`, and `OnReleased`.

```lua
local tutorial_input = {
    Properties = {}
}
function tutorial_input:OnActivate()
    self.ActionInputs = {}

    self.ActionInputs.OnPressed = function(_, value)
        TransformBus.Event.SetLocalUniformScale(self.entityId, 2.0)
    end

    self.ActionInputs.OnHeld = function(_, value)
        TransformBus.Event.RotateAroundLocalZ(self.entityId, 0.01)
    end

    self.ActionInputs.OnReleased = function(_, value)
        TransformBus.Event.SetLocalUniformScale(self.entityId, 1.0)
    end

    self.ActionInputHandler = InputEventNotificationBus.Connect(self.ActionInputs, InputEventNotificationId("Action"))
end

function tutorial_input:OnDeactivate()
    self.ActionInputHandler:Disconnect()
end

return tutorial_input
```

## Testing player input

After you use either Script Canvas or Lua to connect the input event in your `.inputbindings` file to an input handler, you can test player input in **O3DE Editor**.

1. In O3DE Editor, select the entity with the Input and scripting components in the viewport or **Entity Outliner**.

    {{< note >}}
In this example, the entity must have a component that enables visibility in the game, such as the [Mesh component](/docs/user-guide/components/reference/atom/mesh), the [White Box component](/docs/user-guide/components/reference/shape/white-box), or one of the [Shape components](/docs/user-guide/components/reference/shape).
{{< /note >}}

1. In Entity Inspector, click **Add Component**, and then add the **Mesh** component.

1. For **Mesh asset**, specify a mesh asset file. This gives your entity a shape that is visible in game mode.

1. To enter game mode, press **Ctrl+G**.

1. Press **Space bar** so that your entity rotates on the local z-axis. The entity's scale doubles when the event `OnPressed` is received from the input handler that is connected to `Action`. The entity's scale returns to normal when the `OnReleased` event is received.

1.  To exit game mode, press **Esc**.
