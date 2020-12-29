# Commenting Nodes<a name="script-canvas-block-commenting"></a>

You can add comments to your script to describe how it works\. 

**Contents**
+ [Adding Comment Nodes](#adding-comment-nodes)
+ [Adding Block Comment Nodes](#adding-block-comment-nodes)
+ [Changing Comment Node Font Settings](#change-font-settings-for-comments)

## Adding Comment Nodes<a name="adding-comment-nodes"></a>

A **Comment** node is a floating block of text that you can move in the **Script Canvas** editor canvas\.

**To add a Comment node to your script**

1. In the **Script Canvas** editor, do one of the following:
   + In the **Node Palette**, click **Utilities** and then click and drag the **Comment** node to your script\.
   + Right\-click your script and choose **Add Comment**\.

1. Double\-click the node and then enter a description\.  
![\[Use the Comment node to add useful notes about your script.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/comment-node.png)

1. To delete a **Comment** node, do one of the following:
   + Select the node and press **Delete**\.
   + Right\-click the node and choose **Delete Node**\.

## Adding Block Comment Nodes<a name="adding-block-comment-nodes"></a>

The **Block Comment** node is similar to the **Comment** node, except that you can also use block comments to contain other nodes and organize your script into sections\. You can add other nodes to the **Block Comment** node to tag a specific region or add colors to organize the different parts of your script\.

**To add a Block Comment node to your script**

1. In the **Script Canvas** editor, do one of the following:
   + In the **Node Palette**, click **Utilities** and then drag the **Block Comment** node to your script\.
   + Right\-click the canvas and choose **Create Block Comment**\.
   + If you have a group of nodes together, right\-click the canvas and choose **Create Block Comment for Selection**\. 

1. For the **Block Comment** node, double\-click the header, and then enter a description\.

1. Drag the corners of the node to resize it\. 

1. Drag your nodes into the **Block Comment** node or expand the **Block Comment** node to contain them\.  
**Example**  

   The following **Block Comment** node contains other nodes as a group\.  
![\[Use the Block Comment node to organize the nodes in your script.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/block-comment-node.png)

1. To move your nodes together, drag the **Block Comment** node header\. All nodes inside the **Block Comment** node move together\.

1. To delete the node, do one of the following:
   + Select the **Block Comment** node header and press **Delete**\.
   + Right\-click the header for the **Block Comment** node and choose **Delete Node**\.
**Note**  
Nodes inside the **Block Comment** node are not deleted\.

## Changing Comment Node Font Settings<a name="change-font-settings-for-comments"></a>

You can change the font settings in comment nodes to label and organize your script\. Font settings apply to the entire comment; you cannot specify individual sections of the comment\.

**To change the font settings for comment nodes**

1. In the **Script Canvas** editor, choose **View**, **Node Inspector**\.

1. Do one of the following: 
   + For a **Comment** node, select the node\.
   + For a **Block Comment** node, select the header\. 

1. In the **Node Inspector**, you can make the following changes:  
![\[Use the Node Inspector to change font settings for comment nodes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/block-comment-nodes-font-settings.png)
   + **Comment** – Type the comment for the node\.
   + **Font Color** – Type a value or use the **Color Picker** to select a color\.
   + **Font Family** – Type a font family name, such as Arial\.
   + **Pixel Size** – Specify the font size\.
   + **Weight** – Specify the font weight, such as bold\.
   + **Style** – Specify the font style, such as italics\.
   + **Vertical Alignment** – Specify the vertical alignment of the comment, such as bottom\.
   + **Horizontal Alignment** – Specify the horizontal alignment of the comment, such as center\.
   + **For Block Comment Frame** – Type a value or use the **Color Picker** to select a color\.