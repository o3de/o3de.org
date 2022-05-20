---
linktitle: Adding Comments
title: Adding Comments in Script Canvas
description: Add comments to describe how your Script Canvas graphs work in Open 3D Engine (O3DE).
weight: 200
---

You can add comments to your script to describe how it works.

## Adding comments

A **Comment** node in Script Canvas is a floating block of text that you can position in your graph canvas.

**To add a Comment node to your script**

1. In the Script Canvas Editor, **right-click** in the canvas and choose **Add Comment**, **Note**.

1. Type your comment and press **Enter**.

    ![Use the comment feature to add useful notes about your script.](/images/user-guide/scripting/script-canvas/nodes-commenting.png)

**To edit a Comment node**

1. Double-click the Comment node.

1. Update the description and press **Enter**.

**To delete a Comment node**

1. To delete a Comment node, do one of the following:
    + Select the node and press **Delete**.
    + **Right-click** the node and choose **Delete**.

{{< tip >}}
Script Canvas includes a preset Comment node style called "Note". To create new presets that use different colors or font characteristics, refer to [Creating Comment and Group Presets](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/creating-comment-and-group-presets).
{{< /tip >}}

## Customizing comments

You can change the color and font settings on Comment nodes. Font settings apply to the entire text in the Comment.

**To change the font setting for an individual Comment node**

1. Select the Comment node.

1. In the **Node Inspector**, you can make the following changes:

    ![Use the Node Inspector to change font settings for comment nodes.](/images/user-guide/scripting/script-canvas/nodes-commenting-settings.png)

    + **Comment** - Type the comment for the node.
    + **Background Color** - Type an RGB value or use the **Color Picker** to select a background color for the node.
    + **Font Color** - Type an RGB value or use the **Color Picker** to select a color for the text in the node.
    + **Font Family** - Type a font family name that is installed on your system, such as Arial. To use the default font family, type `default`.
    + **Pixel Size** - Specify the font size. The default is `16`.
    + **Weight** - Choose a font weight, such as bold. The default is `Normal`.
    + **Style** - Choose a font style, such as italics. The default is `Normal`.
    + **Vertical Alignment** - Specify the vertical alignment of the text in the Comment, such as bottom. The default is `Top`.
    + **Horizontal Alignment** - Specify the horizontal alignment of the text in the Comment, such as center. The default is `Left`.
