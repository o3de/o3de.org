# Working with the Input Component<a name="working-with-the-input-component"></a>

You can create an `.inputbindings` file for an **Input** component and specify the input values and events\.

**Topics**
+ [Creating an Input to Event Binding Asset](#component-input-event-binding-asset)
+ [Creating Input Event Groups](#input-event-groups)
+ [Creating Event Generators](#event-generators)
+ [Mapping Input Events to Gameplay Actions](#mapping-the-input-events-to-gameplay-actions)
+ [Testing Your Input Events](#testing-your-input-events-in-gamemode)

## Creating an Input to Event Binding Asset<a name="component-input-event-binding-asset"></a>

Follow these steps to create an `.inputbindings` file\.

**To create an input to event binding asset**

1. [Create](creating-entity.md) an entity\.

1.  In the **Perspective** viewport, select the entity\. 

1. In the **Entity Inspector**, click **Add Component**, and add the **Input** component\.

1. In the [**Entity Inspector**](component-entity-inspector.md), under **Input**, click the Input Bindings Editor icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-input-edit-icon.png) to open the **Asset Editor**\.  
![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-component-properties-1.png)

1. In the **Asset Editor**, choose **File**, **New**, **Input Bindings**\.

1. Enter a name for the `.inputbindings` file and click **Save**\.

## Creating Input Event Groups<a name="input-event-groups"></a>

After you create your `.inputbindings` file, you can add input event groups for different actions\.

**To add an input event group**

1. In the **Asset Editor**, for your `.inputbindings` file, click the **\+** icon\.  
![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-component-properties-2.png)

1. For **Event Name**, enter a name for your event, such as *Action*\.  
![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-component-properties-3.png)

## Creating Event Generators<a name="event-generators"></a>

After you create your input event group, you can add event generators to the group\. An event generator is a handler that generates the named event\. For example, a pressed key, a held mouse button, or a series of actions on a game controller results in the named event\.

**To add an event generator to your input event group**

1. In the **Asset Editor**, for your input event group, next to **Event Generators**, click the **\+** icon\.

1. In the **Class to create** window, select **Input**, and click **OK**\.

1. Specify your changes for the event generator\. Each event generator has a set of properties that you can customize\.  
**Event Generator Properties**    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/working-with-the-input-component.html)  
**Example**  

   The following `.inputbindings` file specifies a keyboard for the device type and the spacebar for the input name\.  
![\[Input bindings configuration example in the Asset Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-configuration-properties-2.png)

1. Save your `.inputbindings` file\.

1. In the **Entity Inspector**, in the **Input** component, for **Input to event binding**, click the browse \(**…**\) icon and select your `.inputbindings` file\.

## Mapping Input Events to Gameplay Actions<a name="mapping-the-input-events-to-gameplay-actions"></a>

After you create an `.inputbindings` file and specify your input events, you can use a Script Canvas graph or Lua script to map the input events to gameplay actions\. You can create your graph in a visual scripting environment with the **Script Canvas** editor or write your own scripts with the Lua Editor \(Lua IDE\)\.

### Using a Script Canvas Graph for Input<a name="component-script-canvas-input"></a>

You can create a Script Canvas graph that maps to your input events\. For more information, see [Creating Gameplay with Script Canvas](script-canvas-intro.md)\. 

**To use a Script Canvas graph for input**

1. In the **Perspective** viewport, select the entity\. 

1. In the **Entity Inspector**, click **Add Component** and add the **[Script Canvas](component-script-canvas.md)** component\.

1. In the **Script Canvas** component, for **Script Canvas Asset**, specify a Script Canvas graph like the following\.  
**Example Script Canvas Graph**  

   In the following graph, the **Input Handler** node maps the **Event Name** `Action` to the `.inputbindings` file\.  
![\[Example Script Canvas graph for the Input component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-configuration-script-canvas-example.png)

### Using a Lua Script for Input<a name="component-input-lua-script"></a>

You can also create a Lua script that maps to your input events\. For more information about Lua, see [Writing Lua Scripts](lua-scripting-intro.md)\.

**To add a Lua script for input**

1. In the **Perspective** viewport, select the entity\. 

1. In the **Entity Inspector**, click **Add Component**, and add the **[Lua Script](component-lua-script.md)** component\.

1. In the **Lua Script** component, specify a Lua script file like the following\.  
**Example Lua Script**  

   The following Lua script maps the **Event Name** `Action` to the `.inputbindings` file\.

   ```
   local tutorial_input =
   {
   	Properties =
   	{
   	},
   }
   function tutorial_input:OnActivate()
   	self.Inputs = {}
   	
   	self.Inputs.OnPressed = function(_, value) 
   		TransformBus.Event.SetLocalScaleZ(self.entityId, 2.0)
   	end
   
   	self.Inputs.OnHeld = function (_, value) 
   		TransformBus.Event.RotateAroundLocalZ(self.entityId, 0.01)
   	end
   
   	self.Inputs.OnReleased = function (_, value) 
   		TransformBus.Event.SetLocalScaleZ(self.entityId, 1.0)
   	end
   	
   	self.InputNotificationBus = InputEventNotificationBus.Connect(
   		self.Inputs, InputEventNotificationId("Action")
   	)	
   	
   end
   
   function
   tutorial_input:OnDeactivate()
   	self.InputNotificationBus:Disconnect()
   end
   
   return tutorial_input
   ```

## Testing Your Input Events<a name="testing-your-input-events-in-gamemode"></a>

After you specify the Script Canvas graph or Lua script, you can test your input events\.

**To test your input events**

1. In the **Perspective** viewport, select your entity\. 

1. In the **Entity Inspector**, click **Add Component**, and add the **[Mesh](component-static-mesh.md)** component\.

1. For **Mesh asset**, specify a mesh asset file\. This gives your entity a shape\. For example, you can specify the `lumberyard_version\dev\SamplesProject\Objects\Primitives\cube_001.cgf` file\.

1. Press **Ctrl\+G** to enter game mode\.

1. Press the keyboard spacebar so that your entity rotates on the local z\-axis\.  
**Example**    
![\[Input bindings configuration example in the Asset Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-configuration-example-gamemode.gif)

1.  To exit gameplay mode, press **Esc**