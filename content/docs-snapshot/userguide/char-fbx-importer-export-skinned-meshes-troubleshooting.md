# Troubleshooting Skinned Meshes<a name="char-fbx-importer-export-skinned-meshes-troubleshooting"></a>

If your character's skinning appears visually broken in the **Animation Editor**, the following issues could be why:
+ The **Coordinate system change** modifier isn't identical for the `.actor` and `.motion` files
+ You might need to reset the bind pose

**To change the coordinate system modifier**

1. In Lumberyard Editor, in the **Asset Browser**, navigate to your `.fbx` file\.

1. Right\-click the `.fbx` file and choose **Edit Settings**\.

1. In the **FBX Settings** window, for the **Coordinate system change** modifier, set **Facing Direction** to **Do Nothing** or **Rotate 180 degrees around the up axis**\.

1. Ensure your `.actor` and `.motion` files use the same **Coordinate system change** modifier\.

**To reset a bind pose in Maya**

1. Ensure your character is in the bind pose\.

1. In Maya, select the character root bone\.

1. In the **Rigging** menu, click **Skin** and then select the **Go to Bind Pose** check box\.

1. For the **Input** box, choose **Select by name**\.

1. Search for all bind poses by entering **bindPose\*** in the search box\.

1. Press **Enter** to select all of the bind poses and then press **Delete**\.

1. Select the root bone of your character\.

1. In Maya, in the bottom left corner, enter the following to reset the bind pose for your character: `dagPose -bp -save;`