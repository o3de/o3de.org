# Editing Resource Manager Files<a name="cloud-canvas-ui-rm-text-editing"></a>

The navigation pane in the **Cloud Canvas Resource Manager** dialog contains a number of nodes that represent text files that are stored on disk\. The [resource\-template\.json ](cloud-canvas-ui-rm-json-file-nodes.md#cloud-canvas-ui-rm-resource-template-json) node is one example\. 

The child nodes of template files each represent one section of the parent node template file\. These child nodes can help you locate and edit the resource definition sections of the parent node template file\. 

## Using the Internal Editor<a name="cloud-canvas-ui-rm-text-editing-internal-editor"></a>

When you select a text file node in the navigation pane, the file content and text editing options are shown in the detail pane of **Cloud Canvas Resource Manager**\. You can use the detail pane to view and edit the contents of the file\. Use the **Edit**, **Search** menu item to search for text, and the **Previous** and **Next** buttons to navigate from one match to the next\. After you have modified a file, you can save it by clicking **Save** in the toolbar or by choosing **File**, **Save**\. 

**Note**  
The changes that you make in the template file child nodes are always saved to the parent node template file\. 

## Using an External Editor<a name="cloud-canvas-ui-rm-text-editing-external-editor"></a>

You can use an external script editor instead of the **Cloud Canvas Resource Manager** to edit files\. You can specify which editor to use in Lumberyard Editor\.

**To specify an external script editor**
+ In Lumberyard Editor, click **File**, **Global Preferences**, **Editor Settings**, **General Settings**, **Files**, **External Editors**, **Scripts Editor**\.

**To open a file in an external script editor**
+ Right\-click the file in the navigation pane and choose **Open in script editor**:   
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-text-editing-open-file-external-editor.png)

 To copy the path of the template file to the clipboard, right\-click the file in the navigation pane and choose **Copy path to clipboard**\. 

## Notes<a name="cloud-canvas-ui-rm-text-editing-notes"></a>

Note the following:
+ Opening a child node of a template file in a script editor opens the full \(parent\) file for editing\. 
+  If your project files are under source control, Lumberyard prompts you to check out files before they can be edited\. The source control icon on the toolbar dynamically displays the status of a selected file in source control\. 
+  If the contents of the file change on disk while there are unsaved changes in the editor, Lumberyard prompts you to load the updated contents from disk and replace the modified contents in the editor\. 