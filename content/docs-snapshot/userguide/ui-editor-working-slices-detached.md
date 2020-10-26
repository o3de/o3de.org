# Creating a Detached UI Slice<a name="ui-editor-working-slices-detached"></a>

You can create a detached UI slice from an existing UI slice instance\. When you create a detached UI slice, the UI system removes, or flattens, all references to child slices\. Using the button example from the previous section, let's say you saved the image slice instance and its child text slice instance as a detached slice and called it `Button2`\. The detached `Button2` would not reference any other slices; it is a slice that contains two entities\. If you pushed a change to the text slice, it would not affect the text within any instances of the `Button2` slice\.

**To create a detached UI slice**

1. Select the root of a set of elements, or a root and one or more child entities\. The child entities within that root can be individual elements, slices, or a combination of both\.

1. Right\-click the selection and choose **Make Detached Slice from Selected Entities**\.
**Note**  
If the any of the elements that you selected are slice instances, two options appear: **Make Detached Slice from Selected Entities** and **Make Cascaded Slice from Selected Slices & Entities**\. 

1. Save the slice with a descriptive name\.