# Creating a Cascaded UI Slice<a name="ui-editor-working-slices-cascaded"></a>

A cascaded slice is a slice that contains instances of other slices\. Cascaded slices can store their own overrides for component and entity properties and can also contain their own entities\.

When you create a cascaded slice, the UI system maintains references to the slices that are child entities\. This means, for example, that you can instantiate an image slice as a parent and a text slice as a child\. You can then select them both and make a cascaded slice called `Button`\. If you then create instances of the `Button` slice, they all contain a reference to the image slice and the text slice\. If you then push a font change to the text slice, this affects all instances of the `Button` slice as well as any other instances of the text slice\. 

**To create a cascaded slice**

1. Select the root of a set of elements\. The child entities within that root can be individual elements, slices, or a combination of both\.
**Note**  
If your root is not already in a slice, and you want to maintain child slice references, you must also select the child slices in this step\. If you select only the root, only one option appears: **Make New Slice from Selection**\. This creates a detached UI slice \(flattens child references\)\.

1. Right\-click the selection and then choose **Make Cascaded Slice from Selected Slices & Entities**\.

1. Save the cascaded slice with a descriptive name\.