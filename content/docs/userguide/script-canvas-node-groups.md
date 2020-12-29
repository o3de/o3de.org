# Grouping Nodes<a name="script-canvas-node-groups"></a>

As your Script Canvas graphs grow in size, you can group nodes to logically organize parts of a script or reduce its visual complexity\. Groups can be nested, named, and color\-coded\.

## Creating and Managing Node Groups<a name="script-canvas-node-groups-creating-and-managing"></a>

**To create a node group from existing nodes and/or node groups**

1. Select the nodes that you want to group\.

1. Right\-click the graph and choose **Group** or **New group**\.

1. Enter a name for the node group, and then press **Enter**\.

**To create an empty group**
+ Right\-click an empty portion of the graph, and then choose **New group**\. You can expand the group's borders and add nodes to it as you would on the main graph\.

**To collapse a group**
+ Do one of the following:
  + Double\-click the group\.
  + Right\-click the group, and choose **Collapse**\.
  + In **Node Inspector**, select the **Collapse Group** option\.

  A collapsed group has a border with a dashed line\.

**To expand a group**
+ Do one of the following:
  + Double\-click the group\.
  + Right\-click the group, and choose **Expand**\.
  + In **Node Inspector**, clear the **Collapse Group** option\.  
![\[Creating a node group in the Script Canvas editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-script-canvas-node-groups-1.gif)

**To edit the name of a group**
+ Do one of the following:
  + Right\-click the title bar of the expanded group, and choose **Edit group title**\.
  + In **Node Inspector**, in the **Group Name** box, edit the name\.

**To resize a group's borders to fit the contents of the group**

1. To reduce empty horizontal space within the group, double\-click the group's left or right border\.

1. To reduce empty vertical space within the group, double\-click the group's top or bottom border\.

**To ungroup a group**
+ Right\-click the group, and choose **Ungroup**\.

**To delete a group**
+ Right\-click the group, and choose **Delete**\.
**Note**  
Deleting a group removes all of the nodes in the group and their connections to other nodes outside of the group\. If you want to remove the group container but keep its nodes and connections, choose **Ungroup**\.

### Enabling Groups as Bookmarks<a name="script-canvas-node-groups-bookmarks"></a>

To quickly navigate through the groups in your graphs, you can enable groups as bookmarks\.

**To bookmark a group**

1. Select the group\.

1. In **Node Inspector**, select **Enable as Bookmark**\.

## Customizing Groups<a name="script-canvas-node-groups-customizing"></a>

You can use the **Node Inspector** to customize the color of a group and to change the font settings of the group title\.

**To change the color of a node group**

1. Select the node group\.

1. In **Node Inspector**, do one of the following:
   + If you know the RGB values that you want to use, enter them in the **Group Color** text box\.
   + Click the **Group Color** icon to use the **Select Color** dialog box\.  
![\[Click the Group Color icon in the Script Canvas Node Inspector to customize the color of a node group.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-node-groups-2.png)

1. In the **Select Color** dialog box, specify the color that you want to use\. You can choose from basic colors, create a custom color, or click **Pick Screen Color** to choose a color on your screen with your pointer\.  
![\[Choose or create a color for a group node in the Script Canvas editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-node-groups-3.png)

1. Click **OK**\.

**To change the font settings for the node group title**

1. In Node Inspector, expand **Font Settings**\.

1. Enter or choose the values that you want to use for the group title font\. The changes that you make are immediately visible\.  
![\[Expand a node group's Font Settings section in the Script Canvas Node Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-node-groups-4.png)  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/script-canvas-node-groups.html)