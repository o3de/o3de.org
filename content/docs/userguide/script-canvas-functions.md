# Script Canvas Functions<a name="script-canvas-functions"></a>

The Script Canvas editor enables you to create reusable graphs, called functions\. A function is available for use as a node in your Script Canvas graphs\. Similar to functions in traditional programming languages, functions in the Script Canvas editor promote code reuse and abstraction\. They help simplify your graphs by replacing a group of nodes that perform a specific task with one function node\. For example, you could move a series of nodes that perform linear interpolation into a function called Interpolate, and move nodes that perform acceleration clamping into a function called ClampAcceleration\. Additionally, if you're using this functionality in multiple graphs, functions make updates easier because you need to make changes only in one place\.

Your function appears alongside all the other Script Canvas nodes in the **Node Palette**, categorized under **Global Functions**\.

When you create a function, you define the input and output variables of that function, and all the nodes in between that produce a result\.

**Topics**
+ [Creating a Script Canvas Function](#script-canvas-creating-functions)
+ [Using a Script Canvas Function in a Graph](#script-canvas-using-functions)
+ [Function Example: Linear Interpolation](#script-canvas-example-linear-interpolation)

## Creating a Script Canvas Function<a name="script-canvas-creating-functions"></a>

Start creating a new function by choosing **File**, **New Function** in the Script Canvas editor\.

![\[Choose File, New Function in the Script Canvas editor to start a new Script Canvas function.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-file-new.png)

Alternatively, you can create a new function using the function create button located in the upper right corner of the editor canvas\.

![\[Use the function create button as an alternate method for creating a new Script Canvas function.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-quick-create.png)

**Function Entry and Exit Points**  
Functions require entry and exit points\. To create these points, right\-click a node's input or output execution slot and select **Expose** in the context menu\. Typically, you create an entry point node from the input execution slot of the first node in your function, and an exit point node from the output execution slot of the last node in your function\.

![\[Create an entry or exit point for a Script Canvas function by right-clicking an execution slot.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-expose-input.gif)

**Note**  
To change the names of the execution slots on the function's node, edit the name field on the entry point or exit point node\.

Optionally, if you're not certain how you want to connect an entry or exit point to the rest of your function, you can create an entry or exit point node using the toolbar buttons: ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-toolbar-buttons.png)\. Connect its execution slot later, when you're ready\.

**Function Data Parameters**  
Functions can also have input and output data parameters\. Input parameters are the values that are passed in to the function\. Output parameters are the values that are returned by the function\. These are both defined as variables in the **Variable Manager**\. A function can also have local variables, which are not exposed on the function's node\.

![\[Create function data parameters with variables in the Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-create-parameter.gif)

The scope of a variable determines if and where the variable will appear on the function node\.


| Scope | Location on Node | Usage | 
| --- | --- | --- | 
| Local | \(None\) | This is a local variable, for use only by the function\. | 
| In | Input slot | This is an input parameter\. A value for this variable is passed in to the function\. | 
| Out | Output slot | This is a result variable\. The function returns its value as a result\. | 
| In / Out | Both sides | This is an input parameter that can be modified by the function and returned as a result\. | 

## Using a Script Canvas Function in a Graph<a name="script-canvas-using-functions"></a>

Once a Script Canvas function has been saved, it automatically shows up in the **Node Palette**, under **Global Functions**\. The default directory for new functions is your project's `scriptcanvas\functions` directory\. If you save them in a subdirectory, or save them under a different project directory, the directory structure is used to categorize the functions within **Global Functions**\.

Using a function is just like using any other node in Script Canvas\. Simply drag and drop the function into a graph\. When it's dropped, a node that represents the function is displayed on the canvas\.

![\[Drag and drop functions from the Node Palette, under the Global Functions category, onto your graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-use-node.gif)

## Function Example: Linear Interpolation<a name="script-canvas-example-linear-interpolation"></a>

In this example, we create a linear interpolation function\. This function is represented by the formula: *Result = Start \+ Time \* \(End \- Start\)*\.

In this example you will learn how to do the following:
+ Create entry and exit points for a function
+ Create input parameter slots
+ Create return values

The final function graph should look like this:

![\[After completing the steps in this example, you should end up with a linear interpolation function.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-linear-interpolation.png)

1. Start a new function using **File**, **New Function** or by using the function create button in the upper right corner of the canvas\.

1. Create the following four variables in **Variable Manager**:
   + **Start**
   + **End**
   + **Time**
   + **Result**

1. Set the **scope** of *Start*, *End*, and *Time* to **In**\. These are now your input parameters\.

1. Set the **scope** of *Result* to **Out**\. This is now your return value\.

1. Place the **Subtract**, **Multiply**, and **Add** nodes onto your graph and connect them as shown in the previous image\.

1. Using [variable references](script-canvas-adding-variable-references.md), do the following:

   1. In the **Subtract** node, reference the *End* and *Start* variables, so that *Start* is subtracted from *End*\.

   1. In the **Multiply** node, use the result of the subtraction and reference the *Time* variable, so that *\(End \- Start\)* is multiplied by *Time*\.

   1. In the **Add** node, use the result of the multiplication and reference the *Start* variable, so that these two values are added together\. Then add a reference to the *Result* variable in the result slot, so that the final value is stored in *Result*\.

1. Create entry and exit points for your function\.

   1. Right\-click on the **Subtract** node's **In** slot and choose **Expose** from the context menu\.

   1. \(Optional\) Rename the entry point node to **In**, if you want to follow the naming convention for node input execution slots\.

   1. Right\-click on the **Add** node's **Out** slot and choose **Expose** from the context menu\.

   1. \(Optional\) Rename the exit point node to **Out**, if you want to follow the naming convention for node output execution slots\.

1. Finally, use **File**, **Save** to save the function and name it **Interpolate**\. The function is now ready to use in a Script Canvas graph:  
![\[When a function is used in a Script Canvas graph, it appears as a node, using the function's filename as the node name.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-function-linear-interpolation-node.png)