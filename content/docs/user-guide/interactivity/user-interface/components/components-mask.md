---
linkTitle: UI Mask
description: ' Add the Mask component to an element to reveal parts of the child element in Open 3D Engine. '
title: UI Mask Component
---

You can add a **Mask** component to an element to reveal only those parts of the child elements (for example, image or text) that are within the mask visual. In other words, the opaque region of the mask visual defines a shape that acts like a window through which you view the descendant elements.


When you add a **Mask** component, the default mask is the visual component on that element, usually an **Image** component. If you want to use a nonrectangular mask, you must set this **Image** component to use a texture that contains an [alpha channel](/docs/user-guide/appendix/glossary#alpha-channel), which specifies transparent and opaque areas. The child elements are masked by the mask visual. This means that the only parts of the child elements that are visible are the parts that are in the mask visual. In other words, the visible areas of the mask show the child elements, and the transparent areas of the mask visual hide the child elements. You can use other visual components, such as a **Text** component or **Particle Emitter** component to specify the mask visual.

You can make the mask movable to use in an animation. To do so without moving all of its children, you can use a special child element as a mask visual in addition to the visual component on the mask element. This child mask element can have as many children as you need to draw your mask visual.

Masks are commonly used with a [ScrollBox prefab element](../interactive/components-scrollbox).

**To add simple mask with an Image component as the visual**

1. In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor) toolbar, choose **New**, **Empty Element**. This is the parent element.

1. In the **Properties** pane, choose **Add Component**, **Image** to add an **Image** component.

1. Choose **Add Component**, **Mask**.

1. Right-click the parent element and then choose **New**, **Empty Element** to add a child element.

1. Select the child element and add to it an **Image** component.

1. In the **Properties** pane, click the folder icon next to **Image**, **Sprite Path** to select an image for the child element.

1. Open an image file in your current project directory.

1. On the parent element, in the **Properties** pane, click the folder icon next to the **Image**, **Sprite Path** to select the texture or image to use as a mask.

1. Open an image file in your current project directory. The image that you use as a mask should have opaque areas (which shows the content in child elements) and transparent areas (which hides the content in child elements) and a Texture Setting of AlbedoWithGenricAlpha.

1. In the **Properties** pane, under **Mask**, select **Use alpha test**.

**To edit a Mask component**

In the **Properties** pane of the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor), expand **Mask** and specify the following parameters, as appropriate:

| Name | Description |
| --- | --- |
| **Enable Masking** | If set, only the parts of the child elements that are revealed by the mask are visible. This parameter is enabled by default. |
| **Draw behind** | Draws the mask visual behind the child elements.  This is useful for debugging. |
| **Draw in front** | Draws the mask visual in front of the child elements.  This is useful for debugging. |
| **Use alpha test** | Uses the alpha channel in the masks visual's texture to define the mask.  You must enable this parameter for masks that are anything other than a rectangle. |
| **Mask interaction** | Prevents input events from being set to the elements that are outside of the mask. |
| **Child Mask Element** | Specifies one of the child elements as a special element that is drawn as part of the mask visual.  This parameter helps mask the remaining children. |
