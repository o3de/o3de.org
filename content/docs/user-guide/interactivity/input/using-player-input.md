---
linkTitle: Using Player Input
description: ' Using player input in Open 3D Engine. '
title: Using Player Input in Open 3D Engine.
---

You can create an input bindings asset for an **Input** component and specify Input Events with **Open 3D Engine (O3DE) Asset Editor**.  You can use Script Canvas or Lua to map the Input Events to gameplay logic.

## Creating an input bindings asset

Follow these steps to create an `.inputbindings` file with Asset Editor.

1. Create an entity.

1.  Select the entity in **Perspective** or **Entity Outliner**.

1. In **Entity Inspector**, click **Add Component**, and add an Input component.

1. In Entity Inspector, find the Input component and click the **Open in Asset Editor** icon to create a new `.inputbindings` file in Asset Editor.

	![The default Input component](/images/user-guide/interactivity/input/input-component.png)

### Creating Input Event Groups 

You can add Input Event Groups for different actions to the new `.inputbindings` file.

![Adding Input Event Groups](/images/user-guide/interactivity/input/new-inputbindings-asset.png)

1. Click the {{< icon "add.svg" >}} icon to create a new Input Event Group.

1. For **Event Name**, enter a name for the event, such as `Action`.


### Creating Event Generators 

After you create an Input Event Group, you can add Event Generators to the group. An Event Generator is a handler that generates the named event. For example, a pressed key, a held mouse button, or a series of actions on a game controller results in the named event.

![Adding Event Generators](/images/user-guide/interactivity/input/new-inputbindings-asset-2.png)

1. In the new Input Event Group, click the {{< icon "add.svg" >}} icon next to **Event Generators**.

1. In the **Class to create** dialog box, select `InputEventMap`, and choose **OK**.

1. Specify changes for the Event Generator. Each Event Generator has a set of properties that you can customize.

### Event Generator properties

The following `.inputbindings` file specifies a keyboard for the device type and the **Spacebar** for the input **Event Name**.

   ![Input bindings configuration example in Asset Editor.](/images/user-guide/interactivity/input/inputbindings-example.png)

1. Save your `.inputbindings` file. 

1. In Entity Inspector, in the Input component, for **Input to event binding**, click the **Browse Directory** icon and select your `.inputbindings` file.

## Mapping Input Events to gameplay logic

After you create an `.inputbindings` file and specify Input Events, you can use Script Canvas or Lua to map the Input Events to gameplay logic. You can create gameplay logic in a visual scripting environment with **Script Canvas Editor** or write your own Lua scripts with **Lua Editor (Lua IDE)**.

### Using input in Script Canvas 

You can create a Script Canvas graph that connects to Input Events. For more information about scripting with Script Canvas, refer to [Creating Gameplay with Script Canvas](/docs/user-guide/scripting/script-canvas).

1. In Perspective, select the entity.

1. In Entity Inspector, click **Add Component** and add the **Script Canvas** component.

1. In the Script Canvas component, for **Script Canvas Asset**, specify a Script Canvas graph like the following.

### Example Script Canvas graph

In the following graph, the **Input Handler** node connects `Action` events to various **Transform** nodes.  The **Pressed**, **Held**, and **Released** outputs are triggered when the state of an Event Generator changes.

![Example Script Canvas graph for the Input component](/images/user-guide/interactivity/input/sc-input-example.png)

### Using input in Lua 

You can also create a Lua script that connects to Input Events. For more information about scripting with Lua, refer to [Writing Lua Scripts](/docs/user-guide/scripting/lua).

1. In Perspective, select the entity.

1. In Entity Inspector, click **Add Component**, and add the **Lua Script** component.

1. In the Lua Script component, create a table of the functions `OnPressed`, `OnHeld`, and `OnReleased` for an Input Event you would like to connect the script to.

1. Create a bus handler by connecting to the `InputEventNotificationBus` with the first parameter set to the table of functions for the Input Event, and the second parameter set to create an InputEventNotificationId for the **Event Name**.

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

After you use either Script Canvas or Lua to connect to an Input Handler for the Input Event in your `.inputbindings` file, you can test player input in **O3DE Editor**.

1. In Perspective, select your entity.

    {{< note >}}
In this example, the entity must have a component that enables visibility in the game, such as the [Mesh component](/docs/user-guide/components/reference/atom/mesh), the [White Box component](/docs/user-guide/components/reference/shape/white-box), or one of the [Shape components](/docs/user-guide/components/reference/shape).
{{< /note >}}

1. In Entity Inspector, click **Add Component**, and add the **Mesh** component.

1. For **Mesh asset**, specify a mesh asset file. This gives your entity a shape that is visible in game mode.

1. Press **Ctrl+G** to enter game mode.

1. Press the keyboard **Spacebar** so that your entity rotates on the local z-axis. The entity's scale doubles when the event `OnPressed` is received from the Input Handler that is connected to `Action`.  The entity's scale returns to normal when the `OnReleased` event is received.

1.  To exit gameplay mode, press **Esc**.
