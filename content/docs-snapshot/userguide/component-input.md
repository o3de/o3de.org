# Input<a name="component-input"></a>

You can use the **Input** component to bind raw input to events in your game\. The **Input** component references an `.inputbindings` file, which binds a set of inputs \(such as from a mouse, keyboard, game controller, and so on\) to an event\. 

For example, you can add the **Input** component to an entity and specify in the `.inputbindings` file that when you press the keyboard spacebar, the entity rotates\. 

**Note**  
To work with inputs, you must enable the [Input Management Framework](gems-system-gem-input.md) and the [Starting Point Input](gems-system-starting-point-input.md) gems\. For more information, see [Add modular features and assets with Gems](gems-system-gems.md)\.

**Topics**
+ [Input Properties](#component-input-configuration-properties)
+ [Working with the Input Component](working-with-the-input-component.md)
+ [Input Component EBus Interface](component-input-event-bus-interface.md)

## Input Properties<a name="component-input-configuration-properties"></a>

![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/input-component-properties.png)

The **Input** component has the following properties\.


****  

| Name | Description | 
| --- | --- | 
| Input to event bindings |  References an `.inputbindings` file that defines the bindings of raw input to events\.   | 
| Input contexts |  A string to specify valid context\(s\) for the `.inputbindings` file\.  An empty string `""` is the default context\. This context is active whenever it's explicitly pushed to the top of the input context stack, or when the input context stack is empty\.  You can use this parameter to specify what context asset binding is available for the component\. This is useful if you want the component to switch between different input events\. For an example of working with contexts, see [Input Request Bus](component-input-event-bus-interface.md#component-input-request-bus)\.  Input event bus \(EBus\) messages aren't generated while the **Console** window is open\.   | 