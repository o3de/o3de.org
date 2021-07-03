---
description: ' Learn how to use tags with animation graphs (AnimGraphs) in the O3DE
  Animation Editor. '
title: Using Tags with Animation Graphs
---

{{< preview-migrated >}}

In the **Animation Editor**, you use tags to describe the current state of your character and control the transition between different states\. Tags are Boolean flags that are either active \(enabled\) or inactive \(disabled\)\. Some examples of tags are Happy, Holding Sword, and Left Leg Injured\.

## Adding Tags 

Tags are represented by animation graph parameters\. When you define a parameter, you can specify a different value for each entity that uses the same animation graph and parameter\. For example, you can specify a different value for the **Speed** parameter for each entity that uses the animation graph\. Similarly, you can assign a different tag to each entity\. For example, one entity has the Holding Sword tag active and another entity has the Happy tag active\. For more information about parameters, see [About Parameters](/docs/user-guide/visualization/animation/character-editor/concepts-and-terms/#animation-graph-parameters)\.

**To create a tag**

1. In O3DE Editor, choose **Tools**, **Animation Editor**\.

1. In the **Animation Editor**, in the **Parameters** pane, click the **\+** button\.
![\[Image NOT FOUND\]](/images/user-guide/actor-animation/anim-graph-parameters-pane.png)

1. In the **Create Parameter** dialog box, do the following:

   1. For **Value type**, select **Tag**\.

   1. For **Name**, enter a name for your tag\.

   1. For **Description**, enter an optional description for your tag\.

   1. For **Default**, select the check box to enable the tag\.
![\[Image NOT FOUND\]](/images/user-guide/actor-animation/anim-graph-create-parameter-dialog-box.png)

1. Click **Create**\.

## Adding Conditions to Tags 

Use tag conditions to enable the state machine to change the active state\. For example, you can choose a specific jump animation based on the active tag\. To transition to Awesome Jump, you would enable the Freaky, Awesome, and Happy tags\.

![\[Image NOT FOUND\]](/images/user-guide/actor-animation/anim-graph-tag-conditions-example.png)

You can also use tags in combination with wildcard transitions to choose a specific state that other states can access\. Wildcard transitions are transitions that can originate from any node\. In the preceding example, the arrow to the left of **Idle** represents the wildcard transition\. This means you can transition from any state to the **Idle** state, as long as the condition for the wildcard transition is met\.

Tag conditions have two attributes: test function and tags\.

![\[Image NOT FOUND\]](/images/user-guide/actor-animation/anim-graph-tag-conditions-attributes.png)

**Test Function**
Specifies the tag status to pass the condition\.

You can choose from the following options:
+ **All tags active** - All tags must be active or the condition blocks the change\.
+ **One or more tags inactive** - At least one tag must be inactive or the condition blocks the change\.
+ **One or more tags active** - At least one tag must be active or the condition blocks the change\.
+ **No tag active** - All tags must be inactive or the condition blocks the change\.

**Tags**
Specifies the tags that the condition checks for\.

To add a tag to a condition, select the transition line between your nodes\. In the **Attributes** pane, select the values that you want to use\.

![\[Image NOT FOUND\]](/images/user-guide/actor-animation/anim-graph-tag-conditions-values.png)

**Note**
You can only choose from tags that are available in the **Parameters** pane\. For more information, see [Adding Tags](#animation-editor-adding-tags)\.
