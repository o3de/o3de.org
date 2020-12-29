# Creating Comment and Group Presets<a name="script-canvas-comment-and-group-presets"></a>

You can save custom node comment and node group settings as presets that you can conveniently reuse\. In a team setting, these presets can help you create your own coloring and naming conventions to improve clarity and consistency among Script Canvas graphs\.

## Customizing the Look of a Comment or Group<a name="script-canvas-comment-and-group-presets-customizing-the-look-of-a-comment-or-group"></a>

Before you create a preset based on an existing node comment or node group, customize its color and font by using the **Background Color** and **Font Settings** options in **Node Inspector**\.

![\[Using Script Canvas Node Inspector to customize node comments and node groups.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-1.png)

For more information, see [Customizing Groups](script-canvas-node-groups.md#script-canvas-node-groups-customizing)\.

## Creating and Using Presets<a name="script-canvas-comment-and-group-presets-creating-and-using"></a>

You can create a preset in the Script Canvas editor by using an existing node group or node comment\.

**To create a preset from a group or comment**

1. Right\-click the group or comment and choose **Create Preset From**\. The preset that you create saves the font settings and color of the original group or comment\. It does not save the display text\.  
![\[Creating a preset from an existing comment in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-2.png)

1. In the **Set Preset Name** dialog box, enter a name for the preset, and then click **OK**\.  
![\[Naming a comment or group preset in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-3.png)

1. To use the preset that you created, right\-click the canvas, choose **Add Comment** or **Group**, and then choose the preset comment or group that you created\.  
![\[Choosing a preset comment\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-4.png)

## Configuring a Default Preset<a name="script-canvas-comment-and-group-presets-configuring-a-default"></a>

You can define a preset as the default for either a node group or a comment\. The default group or comment is created when you perform one of the following actions:
+ On the Script Canvas editor toolbar, click the new comment ![\[New comment icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-5.png) or new group ![\[New group icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-6.png) icon\.
+ Press **Ctrl\+Alt\+M** to create a comment\.
+ Press **Ctrl\+Shift\+G** to create a group\.

**To configure a default preset**

1. In the Script Canvas editor, choose **Tools**, **Presets Editor**\.

1. For **Construct Type,** choose **Comment** or **Node Group**\.

1. For **Is Default**, select the preset that you want to make the default, and then click **OK**\.  
![\[Setting a preset as the default in the Script Canvas Presets Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-7.png)

## Removing a Preset<a name="script-canvas-comment-and-group-presets-removing"></a>

To remove presets, use the Script Canvas Presets Editor\.

**To remove a preset**

1. In the Script Canvas editor, choose **Tools**, **Presets Editor**\.

1. For **Construct Type,** choose **Comment** or **Node Group**\.

1. Select the preset that you want to delete\.  
![\[Using the Presets Editor in Script Canvas to remove a comment preset.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-comment-and-group-presets-8.png)

1. Click **Remove**, and then click **OK**\.

## Notes<a name="script-canvas-comment-and-group-presets-notes"></a>
+ After you configure a preset, you cannot modify it\. Use the **Presets Editor** to remove the preset\. Then recreate the preset\.
+ If you recreate a preset, the changes that you make do not propagate to comments or groups that you created with the earlier version of the preset\.