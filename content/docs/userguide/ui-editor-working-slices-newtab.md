# Editing Slices in a New Tab<a name="ui-editor-working-slices-newtab"></a>

When you edit an instance of a UI slice in a UI canvas, you can use the context menu to **Push to Slice**\. This pushes the local changes that you select\. For simplicity, you can instead make changes to the slice in its own context\. To do this, you can create a blank UI canvas and instantiate the slice there to edit\. The **UI Editor** automates this process with the **Edit slice in new tab** feature\.

**To edit a slice in a new tab**

1. In the **Hierarchy** pane, right\-click a slice element\.

1. Choose **Edit slice in new tab** and then choose the slice you want to edit\. Multiple choices appear only if the selected element is an instance of a cascaded slice\.  
![\[Right-click the slice element to display the context menu.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-working-slices-newtab.png)

   The selected slice appears in a new tab labeled **Slice: **slice name****\.

1. Edit the slice in the new tab\.
**Note**  
If you add elements to the slice, the elements must be children of the slice instance\. Any elements outside of the slice instance will not be saved, as this is a temporary canvas for editing the slice\.

1. When finished, choose **File**, **Save Slice** to save your changes to the slice\.