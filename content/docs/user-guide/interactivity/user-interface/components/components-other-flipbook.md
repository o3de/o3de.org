---
linkTitle: UI Flipbook Animation
description: ' Add the Flipbook Animation component to an element to create simple image-based animations in Open 3D Engine. '
title: UI Flipbook Animation Component
---

You can use the **FlipbookAnimation** component to create simple image-based animations by animating the frames or cells of a [sprite sheet](/docs/user-guide/interactivity/user-interface/editor/sprite-editor/sprite-sheets).

**To view a canvas in the UI Editor**

1. Navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Flipbook` directory.

1. Open `Flipbook.uicanvas`.

You can add the **FlipbookAnimation** component to elements that also have an [**Image**](../visual/components-image) component. You must also set that **Image** component to use a sprite file that has been configured as a [sprite sheet](/docs/user-guide/interactivity/user-interface/editor/sprite-editor/sprite-sheets).

![FlipbookAnimation component and Image component set as sprite/texture asset](/images/user-guide/interactivity/user-interface/components/other/ui-editor-components-other-flipbook-1.png)

**To add and configure a FlipbookAnimation component**

1. If you have not already done so, create a [sprite sheet](/docs/user-guide/interactivity/user-interface/editor/sprite-editor/sprite-sheets) for your animation image.

1. Add an [**Image**](../visual/components-image) component.

   For the **SpriteType**, choose **Sprite/Texture asset**.

   In the **Sprite path**, click **Browse** (…) and navigate to the directory that contains the sprite sheet asset that you created. Select the sprite sheet.

1. Add a **FlipbookAnimation** component.

1. Configure the **FlipbookAnimation** properties:

* **Start Frame**

    The index of the sprite sheet cell that is to be the first frame in the animation. The value must be equal to or less than the **End Frame** value.

* **End Frame**

    The index of the sprite sheet cell that is to be the last frame in the animation. The value must be equal to or greater than the **Start Frame** value.

* **Loop start frame**

    The index of the sprite sheet cell that is to be the first frame in the looped portion of an animation. This value must be equal to or greater than **Start Frame** value and less than **End Frame** value. This setting has no effect if **Loop Type** is set to **None**.

    {{< tip >}}
To loop the entire animation, specify a value that is equal to the **Start Frame** value. To create an intro sequence that appears before the looping animation, specify a value greater than the **Start Frame**.
    {{< /tip >}}

* **Loop Type**

    Includes the following options:

   * **None** - No looping behavior. The animation starts between the **Start Frame** and **End Frame** and then stops.
   * **Linear** - When the animation reaches **End Frame**, it loops by next playing the **Start Frame** and continues until the **End Frame**. This continues until the player stops it manually.
   * **PingPong** - Reverses the direction of the animation. After animation reaches the **End Frame** or the **Start Frame**, it reverses direction. The loop goes back and forth between the two frames until the player stops it.

* **Frame delay**

    Number of seconds to delay before displaying the next frame.

* **Auto Play**

    If enabled, automatically starts playing the flipbook animation when the canvas is loaded.
