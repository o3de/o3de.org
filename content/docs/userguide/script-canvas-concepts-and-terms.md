# Script Canvas Concepts and Terms<a name="script-canvas-concepts-and-terms"></a>

The following concepts and terms are used in **Script Canvas**:

**Script**  
A script is a collection of nodes, node properties, and node connections that, when combined, create a visual script\.

**Node**  
Nodes represent the data, events, and actions that you use to create logic and behaviors in **Script Canvas**\.

See the following node types:

*Event nodes*  
Event nodes subscribe to event bus \(EBus\) handlers to listen for events to occur\. Examples include entering a trigger area, colliding with an object, turning off a light, and when the game ticks\.  
For more information about using the EBus interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

*Action nodes*  
Action nodes are used to get or send data across an EBus\. Examples of action nodes include getting the mass of an entity, turning on a light, setting the text of a UI element, and playing an animation\.  
For more information about using the EBus interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

*Variable and data nodes*  
Variable and data nodes represents the custom data that can be required to build game logic\. You can use these nodes to make counters, store entity references, specify a direction, define a color, and so on\. Variable nodes are added to a script to declare and initialize them\. Use get and set nodes to retrieve or set the variable’s value\.  
The following are the commonly used data types in **Script Canvas**:  
+ Boolean
+ Color
+ Entity
+ Number
+ String
+ Transform
+ Vector 2/3/4

*Logic*  
Logic nodes include comparison and timing operations\. You can use logic nodes to check whether two values are equal, control the execution of nodes, delay the execution of a node for a specific amount of time, and more\.

*Math*  
Math nodes enable math operations, such as arithmetic, geometry, algebra, calculus and so on\.

*Debugging*  
Debugging nodes verify whether a script is functioning as expected\. You can use debugging nodes to print data to the console or viewport and check for errors\. These nodes pass logic flow, but do not execute in release builds\.

*User defined*  
You can build your own nodes for your project’s specific needs\. For more information, see [Creating Custom Nodes in Script Canvas](script-canvas-custom-nodes.md)\.

**Node Palette**  <a name="script-canvas-introduction-node-palette-display"></a>
The **Node Palette** contains a searchable list of nodes\. By default, the palette is docked to the left of the **Script Canvas** editor\.  

**To display the Node Palette**

1. From Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Script Canvas** window, do one of the following:
   + Choose **Tools**, **Node Palette**\.
   + Press **Ctrl\+Shift\+L**\. 
**Note**  
If you have an existing script open, you can right\-click the canvas for the menu to appear\.

**Node Inspector**  
The **Node Inspector** shows the properties of the node\. You can edit each property in the inspector or directly in the node\. By default, this window doesn't appear in the editor\.   

**To display the Node Inspector**

1. Open [**Script Canvas**](script-canvas-editor-interface.md)\.

1. Do one of the following:
   + Click **Tools**, **Node Inspector**\.
   + Press **Ctrl\+Shift\+I**\.