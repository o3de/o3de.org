# Script Canvas Editor Shortcuts<a name="script-canvas-shortcuts"></a>

The following table shows the keyboard shortcuts that you can use in the Script Canvas editor\.


****  

| Key Combination | Action | Description | 
| --- | --- | --- | 
| Arrow Keys | Scroll graph | Scrolls the graph left, right, up, or down\. | 
| Ctrl\+C | Copy | Copies the selected nodes and their connections to the clipboard\. | 
| Ctrl\+V | Paste | Pastes copied nodes and their connections from the clipboard into the active graph\. | 
| Ctrl\+D | Duplicate | Duplicates the selected nodes in the active graph\. This is the equivalent of using Ctrl\+C and Ctrl\+V\. | 
| Ctrl\+Left Arrow | Select inputs | Selects all nodes that are connected to the input pins of the currently selected node\. | 
| Ctrl\+Right Arrow | Select outputs | Selects all nodes that are connected to the output pins of the currently selected node\. | 
| Ctrl\+Up Arrow | Select connected nodes | Selects all nodes that are connected to the currently selected node\. | 
| ESC | Clear selection | Deselects any selected nodes\. | 
| Ctrl\+Shift\+P | Screenshot | Creates an image of the area around all selected nodes and adds it to the clipboard\. If no nodes are selected, an image of the entire active graph is added to the clipboard\. | 
| Shift\+Left Arrow | Align left | Aligns all the selected nodes along a left edge\. | 
| Shift\+Right Arrow | Align right | Aligns all the selected nodes along a right edge\. | 
| Shift\+Up Arrow | Align top | Aligns all the selected nodes along a top edge\. | 
| Shift\+Down Arrow | Align bottom | Aligns all the selected nodes along a bottom edge\. | 
| Ctrl\+Alt\+M | Add comment | Adds a new comment using the properties from the default comment preset\. For information about presets, see [Creating Comment and Group Presets](script-canvas-comment-and-group-presets.md)\. Note: NVIDIA's GeForce Experience overlay uses a default setting for turning on/off the microphone that interferes with this hotkey\. | 
| Ctrl\+Shift\+G | Group selection | Groups the selected nodes on the graph using the properties from the default node group preset\. For information about presets, see [Creating Comment and Group Presets](script-canvas-comment-and-group-presets.md)\. | 
| Ctrl\+Shift\+H | Ungroup | Ungroups the currently selected group\. | 
| Ctrl\+Number\_Key | Create bookmark | Creates a bookmark out of the current view and assigns it to the specified number key\. If you choose a number that is already assigned to a bookmark or a bookmark\-enabled group, you are prompted to reassign the existing bookmark\. For more information about bookmarks, see [Adding Bookmarks for Script Canvas](script-canvas-bookmarks.md)\. For information about enabling groups as bookmarks, see [Grouping Nodes](script-canvas-node-groups.md)\. | 
| Number\_Key | Jump to bookmark | Jumps to the bookmark location associated with the key that is pressed\. | 
| Ctrl\+Plus Sign \(\+\) | Zoom in | Zooms the graph in\. | 
| Ctrl\+Minus Sign \(\-\) | Zoom out | Zooms the graph out\. | 
| Ctrl\+Shift\+Up Arrow | Zoom to selection | Centers the view on the nodes that are currently selected\. | 
| Ctrl\+Shift\+Down Arrow | Show entire graph | Centers the entire graph into the current display\. Zooms out as much as possible to display all nodes\. | 
| Ctrl\+Shift\+Left Arrow | Show start of chain | Centers the view on the nodes that do not have any input connections, and are connected to the selected node through their output connections\. | 
| Ctrl\+Shift\+Right Arrow | Show end of chain | Centers the view on the nodes that do not have any output connections, and are connected to the selected node through their input connections\. | 
| Ctrl\+K, Ctrl\+C | Comment out selected nodes | Comments out the current selection of nodes and turns them gray\. Commented out nodes are not run at runtime, but still exist at edit time\. | 
| Ctrl\+K, Ctrl\+U | Uncomment selected nodes | Uncomments the selected nodes\. | 

**Note**  
If a keyboard shortcut doesn't appear to work for you, another process running in the background might have bound that key combination\. Consider searching the [forums](https://forums.awsgametech.com/) to see if others have encountered this issue\.

## Mouse Shortcuts<a name="script-canvas-shortcuts-mouse-shortcuts"></a>

The following shortcuts use the mouse or keyboard and mouse\.


****  

| **User Action** | **Result** | **Description** | 
| --- | --- | --- | 
| Alt\+Left Click node | Disconnect and delete a single node or group | Disconnects and deletes the node or group clicked\. | 
| Alt\+Left Click connection | Delete a connection | Deletes the connection clicked from the active graph\. | 
| Alt\+Left Click slot | Delete connections |  Deletes any connections to the slot from the active graph\.  Ensure that the connections that you want to delete are highlighted before pressing **Alt\+Left Click**\. Otherwise, you might delete the node instead\.   | 
| Middle Mouse Button \(Scroll Wheel\) Click graph tab | Close graph | Closes the open graph that corresponds to the tab that you clicked\. If the graph has changed and has not been saved, you're prompted to save it first\. | 
| Scroll mouse wheel | Zoom the graph | Zooms the graph in or out\. | 