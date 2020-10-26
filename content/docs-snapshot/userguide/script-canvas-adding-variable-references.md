# Adding Variable References in Script Canvas Nodes<a name="script-canvas-adding-variable-references"></a>

Introduced in v1\.24 of Lumberyard, **variable references** provide a shortcut for getting and setting variable values directly from the Script Canvas nodes that use them\. Any data pin can be converted to a variable reference by dragging a variable from the **Variable Manager** directly onto the pin\.

**To create a variable reference**
+ Drag a variable from the Variable Manager onto a data input pin to create an input reference, or to a data output pin to create an output reference\.  
![\[Create a variable reference by dragging a variable from Variable Manager onto a Script Canvas node's data pin.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-variable-reference-create.gif)

  An input reference performs the same as a **Get** variable node and retrieves the value of the variable at the time of node execution\.

  An output reference performs the same as a **Set** variable node and assigns the output of that slot to the specified variable at the time of node execution\.
**Note**  
Changing the name of the variable is still supported when you have variable references to that variable\. However, you might notice that the display of the new variable name is not immediately reflected in nodes containing the reference\. To refresh the display of the node's variable name references, move over the node with your pointer or close and re\-open Script Canvas\.

**To select a different variable reference**

1. Choose the gear button next to the variable name on the data pin\.

1. Select a different variable from the list\.  
![\[Change the variable in a variable reference by choosing the gear button next to the variable name on the data pin and selecting a different variable from the list.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-variable-reference-change.png)

**To convert a variable reference back to a value or into a variable node**
+ Do one of the following:
  + Double\-click on the data pin name to toggle between a reference and a value\.
  + Right\-click on the data pin and choose **Convert to Value** to restore that data pin as a value\.
  + Right\-click on the data pin and choose **Convert to Variable Node** to create a **Get** variable node from a data input pin, or a **Set** variable node from a data output pin\.  
![\[Convert a variable reference back to a value or to a variable node by right-clicking on the data pin and choosing from the Convert options.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-variable-reference-convert-back.gif)

**To convert a data pin into a variable reference**

1. Do one of the following:
   + Double\-click on the data pin name to toggle between a value and a reference\.
   + Right\-click on the data pin and choose **Convert to Reference**\.  
![\[Convert a data pin to use a variable reference by right-clicking on the pin and choosing Convert to Reference.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-variable-reference-convert-pin.png)

1. Use the gear button next to the variable name field that appears and select a variable to reference\.
**Tip**  
A quicker alternative for creating a variable reference is to drag a variable from the **Variable Manager** onto the data pin\.

**To convert a variable node into a variable reference**
+ Do one of the following:
  + Right\-click on a **Get** variable node and choose **Convert to References**\. This converts the node into a variable reference on the node following it\.
**Note**  
If the data output from the **Get** variable node is not connected to another node, the variable node is deleted\.
  + Right\-click on a **Set** variable node and choose **Convert to References**\. This converts the node into a variable reference on the node preceding it\.
**Note**  
If the data input to the **Set** variable node is not connected to another node, the variable node is deleted\.  
![\[Convert a variable node into a variable reference on a data pin by right-clicking on the variable node and choosing Convert to References.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-variable-reference-convert-variable-node.gif)