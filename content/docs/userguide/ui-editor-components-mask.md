# Mask<a name="ui-editor-components-mask"></a>

You can add a **Mask** component to an element to reveal only those parts of the child elements \(for example, image or text\) that are within the mask visual\. In other words, the opaque region of the mask visual defines a shape that acts like a window through which you view the descendant elements\.

**To see in\-game examples of completed canvases with a **Mask** component**

1. [Open the Samples Project](configurator-projects.md#project-configurator-launch-projects)\.

1. When Lumberyard Editor opens, expand the `UI` directory and open the level **UiFeatures**\.

1. Press **Ctrl\+G** to play the game\.

1. Choose **Components**, **Other Components**, **Mask**\.

1. Press **Esc** to exit the game\.

**To view these same canvases in the **UI Editor****
+ Navigate to the `lumberyard_version\dev\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Mask` directory\.

You can open the following canvases:
+ `AlphaMask.uicanvas` – Example of using a texture with alpha as a mask\.
+ `Basic.uicanvas` – Basic mask example\.
+ `ChildMaskElement.uicanvas` – Example of using a child element to draw the mask\.
+ `ImageMode.uicanvas` – Examples of using different image modes on the image used for the mask\.
+ `MaskingInteractables.uicanvas` – Example of how masks interact with components\.
+ `NestedMasks.uicanvas` – Example of nesting masks\.
+ `TextMask.uicanvas` – Example of using text as the visual component of the mask\.

When you add a **Mask** component, the default mask is the visual component on that element, usually an **Image** component\. If you want to use a nonrectangular mask, you must set this **Image** component to use a texture that contains an [alpha channel](ly-glos-chap.md#alpha_channel), which specifies transparent and opaque areas\. The child elements are masked by the mask visual\. This means that the only parts of the child elements that are visible are the parts that are in the mask visual\. In other words, the visible areas of the mask show the child elements, and the transparent areas of the mask visual hide the child elements\. You can use other visual components, such as a **Text** component or **Particle Emitter** component to specify the mask visual\.

You can make the mask movable to use in an animation\. To do so without moving all of its children, you can use a special child element as a mask visual in addition to the visual component on the mask element\. This child mask element can have as many children as you need to draw your mask visual\.

Masks are commonly used with a [ScrollBox prefab element](ui-editor-components-scrollbox.md)\.

**To add simple mask with an Image component as the visual**

1. In the [**UI Editor**](ui-editor-using.md) toolbar, choose **New**, **Empty Element**\. This is the parent element\.

1. In the **Properties** pane, choose **Add Component**, **Image** to add an **Image** component\.

1. Choose **Add Component**, **Mask**\.

1. Right\-click the parent element and then choose **New**, **Empty Element** to add a child element\.

1. Select the child element and add to it an **Image** component\.

1. In the **Properties** pane, click the folder icon next to **Image**, **Sprite Path** to select an image for the child element\.

1. Open an image file in your current project directory\.

1. On the parent element, in the **Properties** pane, click the folder icon next to the **Image**, **Sprite Path** to select the texture or image to use as a mask\.

1. Open an image file in your current project directory\. The image that you use as a mask should have opaque areas \(which shows the content in child elements\) and transparent areas \(which hides the content in child elements\)\.

1. In the **Properties** pane, under **Mask**, select **Use alpha test**\.

**To edit a Mask component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **Mask** and specify the following parameters, as appropriate:    
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-mask.html)