# Creating a UI Slice<a name="ui-editor-working-slices-creating"></a>

A slice can contain any number of UI elements\. However, all UI elements in a slice must be contained within one parent element\.

You don't need to select all of the elements to go into the new slice\. If you just select one element, all of its child elements are included in the slice\.

**To create a UI slice**

1. In the **UI Editor**, in the **Hierarchy** pane or in the viewport, select the top\-level parent entity to include in the slice\.

1. Right\-click the parent entity and choose **Make New Slice from Selection**\.

1. Save the slice with a descriptive name\.
**Tip**  
Because you can create many slices for different purposes, we recommend that you name your slices meaningfully and organize them purposefully into directories and subdirectories\.

If you want the slice to appear in the slice library **New**, **Element** menu, you must save it within the `UI/Slices/Library` directory\. This directory is either in the project root or within any enabled gems asset root\. Adding a slice to the slice library menu makes it easy and convenient to use as a common building block for your UI canvases\.

Slices that you create in the **UI Editor** use the same `.slice` extension as the slices that you create in the main Lumberyard Editor\. However, you can't instantiate slices within the **UI Editor** that you created using the main Lumberyard Editor\. If you attempt to do so, Lumberyard displays a warning\. For workflow ease, save your UI slices in a different directory than your main Lumberyard Editor slices\.