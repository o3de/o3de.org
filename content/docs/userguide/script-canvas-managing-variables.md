# Managing Script Canvas Variables<a name="script-canvas-managing-variables"></a>

The **Variable Manager** shows the variables that are used in your Script Canvas graph\. These variables represent the custom data required to build game logic\. For example, you can use variables to make counters, store entity references, specify a direction, or define a color\.

**Topics**
+ [Adding and Configuring Variables](#script-canvas-add-and-configure-variable-nodes)
+ [Setting Default Values for Variables](#script-canvas-modify-variable-values)
+ [Creating Get or Set Variable Nodes](#script-canvas-create-get-or-set-nodes)
+ [Creating Value\-Changed Nodes](#script-canvas-create-on-value-changed-nodes)
+ [Deleting Variables](#script-canvas-delete-variable-nodes)
+ [Using Container Types \(Arrays and Maps\)](script-canvas-containers.md)

## Adding and Configuring Variables<a name="script-canvas-add-and-configure-variable-nodes"></a>

You can add variables to your Script Canvas graph to declare and initialize them\.

**To add and configure a variable**

1. In the **Script Canvas** editor, open your Script Canvas graph or create one\.

1. In the **Variable Manager**, click **Create Variable** and then choose your variable type\. You can search to filter the list of variable types\.
**Note**  
Common variable types are pinned to the top of the list by default\. You can customize the pinned list to show the variable types that you use most often\. To do so, click the box to the left of a variable type to pin or unpin it\.   
![\[Choose from variable types in the Script Canvas Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/variable-manager-create-variable-types.png)

1. In the **Node Inspector**, configure the properties for your variable\.  
![\[Configure variable properties in the Script Canvas Node Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/node-inspector-properties-default.png)

   For example, if you add a **Color** variable, you can do the following:
   + For **Name**, enter a name to identify that color variable\. You can also double\-click the name in the **Variable Manager** to rename the variable\.
   + For **Color**, enter an RGB value or use the color picker\.
   + For **Display Order**, enter the relative order in which you want the variable to appear in the Script Canvas editor, or leave the default at \-1\.
   + For **Scope**, select **In** to show the variable property and value under the assigned **[Script Canvas](component-script-canvas.md)** component in the **Entity Inspector**, or leave the default at **Local** to keep the variable private to the graph\.
**Note**  
This setting allows you to use the same Script Canvas graph for more than one entity, but customize part of the graph for a specific entity\. When you change the variable value on a component, that value takes precedence over the default value that is specified in the graph\.  
![\[Example of Color variable properties in the Script Canvas Node Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/node-inspector-scope-in-example.png)

1. In the **Script Canvas** editor, choose **File**, **Save** to save your changes\.

## Setting Default Values for Variables<a name="script-canvas-modify-variable-values"></a>

You can set the default value for variables in the **Node Inspector** or the **Variable Manager**\.

**To set variable values**

1. In the **Variable Manager**, select the variable that you want to update\. You can search to filter the list of variables that are in your graph\.

1. Do one of the following to update the properties for your variable:
   + In the **Node Inspector**, update the variable values as needed\.  
![\[Set the variable default values in the Node Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/node-inspector-modify-variable-values.png)
   + In the **Variable Manager**, update certain variable values\. These values appear in a third column and can be selected or double\-clicked\.  
![\[Set the variable default values in the Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/variable-manager-modify-variable-values.png)

1. In the **Script Canvas** editor, choose **File**, **Save** to save your changes to the graph\.

## Creating Get or Set Variable Nodes<a name="script-canvas-create-get-or-set-nodes"></a>

You can use get and set variable nodes to retrieve or set the variable's value\.

**To create get or set variable nodes**
+ Do one of the following:
  + Drag the variable from the **Variable Manager** to the canvas, and then choose **Get *variable name*** or **Set *variable name***\.
  + Right\-click the variable in the **Variable Manager** and choose **Get *variable name*** or **Set *variable name***\.  
![\[Right-click to create a get or set variable in the Script Canvas Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/variable-manager-create-get-set-variable.png)
  + Use the following keyboard shortcuts:
    + Press **Shift** and drag the variable from the **Variable Manager** to the canvas to create a get variable node\.
    + Press **Alt** and drag the variable from the **Variable Manager** to the canvas to create a set variable node\.

## Creating Value\-Changed Nodes<a name="script-canvas-create-on-value-changed-nodes"></a>

You can use **OnVariableValueChanged** \(value\-changed\) event nodes to react to a change in a variable's value\.

**To create value\-changed nodes**
+ Do one of the following:
  + Drag the variable from the **Variable Manager** to the canvas, and then choose **On *variable name* Changed**\.  
![\[Drag a variable from the Script Canvas Variable Manager to the canvas to create an on-value-changed node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/variable-manager-create-on-value-changed.gif)
  + Create a new **OnVariableValueChanged** event node in your graph and set the **Source** field to a variable using the field's gear button\. For help adding a node to a graph, see [Adding and Connecting Nodes](script-canvas-working-with-nodes-adding-and-connecting.md)\.  
![\[Set the Source field of an OnVariableValueChanged event node using the field's gear button.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/variable-manager-create-on-value-changed-node.png)

## Deleting Variables<a name="script-canvas-delete-variable-nodes"></a>

You can delete variables from the graph or the **Variable Manager**\.

**To delete a variable**
+ Do one of the following:
  + Select the variable node in the canvas and press **Delete**\.
  + Select the variable in the **Variable Manager** and press **Delete**\.
  + Right\-click the variable in the **Variable Manager** and choose **Delete *variable name***\.  
![\[Delete a variable in the Script Canvas Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/variable-manager-delete-variable-node.png)