# Animation Editor File Types<a name="char-animation-editor-file-types"></a>

When you import `.fbx` files from your DCC to Lumberyard Editor, Asset Processor creates files that you use in the **Animation Editor**\. The following example shows how the file types are created and modified\. For more information about processing files for character and animations, see [Working with the FBX Settings Tool](char-fbx-importer.md)\.

![\[See an overview of how Animation Editor files are created and processed in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-asset-processor-files.png)

The following are file types used in the **Animation Editor**:

## Files Types<a name="file-types-created-from-asset-processor"></a>

When you import `.fbx` files into Lumberyard, Asset Processor generates the following file types used for the **Animation Editor**:
+ `.actor` files are created when the `.fbx` file has at least one bone\. You want to use your character's skinned mesh as your `.actor` file\. The `.actor` file is the character that displays the animation\.
+ `.motion` files are created when the `.fbx` file with a bone has at least one keyframe\. If your `.fbx` file has animation keyframes, a `.motion` file is created\. Your `.motion` files contain the animations that are added to your motion set before you build your animation graph\.
+ `.mtl` files are created when the `.fbx` file has at least one material, which is the case for most DCC tools\. If you make changes to the material in the **Material Editor**, the `.mtl` file is no longer a child of the `.fbx` file and the `.mtl` file is a sibling in the source directory of the `.fbx` file\. You can make other changes to the `.mtl` file with a text editor or the **Material Editor**\.

When a `.motion` file is created, an `.actor` file is also created\. The `.actor` file that you want to use in the **Animation Editor** is generally the skinned mesh in the bind pose that you export from your DCC\. Keep track of your skinned mesh that you want to use as your `.actor` file in the **Animation Editor**\. You can go to the **FBX Settings** tool and delete the actor files that you don't need\.

## File Types Required for Animation Graphs<a name="file-types-required-for-animation-graphs"></a>

When you create your animation graph in the **Animation Editor**, the animation graph must have the following files:
+ `.actor`
+ `.motion`
+ `.motionset`
+ `.animgraph`

## Saving Animation Editor Files<a name="saving-animation-editor-files"></a>

Saving your project in the **Animation Editor** creates a `.workspace` file\. The workspace saves the actor, motion, motion set and animation graphs that you are using\. When you open a workspace, the **Animation Editor** loads the files so that you can pick up where you last left off\. 

**To save your workspace**
+ In the **Animation Editor**, choose **File**, and then choose one of the following:
  + **Save Workspace**
  + **Save Workspace As**

When `.actor` and `.motion` files are saved, the **Animation Editor** creates an `.assetinfo` file, alongside the source `.fbx` file\. The `.assetinfo` files stores the configuration and settings for the `.actor` and `.motion` files\.

Settings saved for `.actor` files include the actor name, motion extraction node, excluded bounds, collision mesh setup, and mirror setup\. 

Settings saved for `.motion` files include the motion extraction capture height option and motion events\.

**To save `.actor` and `.motion` files:**
+ In the **Animation Editor**, do one of the following:
  + Click **Save All** to saves any changes made to the `.actor`, `.motion`, `.motionset`, and `.animgraph` files\. A dialog box prompts you to choose which files to save\.
  + Click **Save Workspace** to saves your current workspace\. If you don't have a workspace saved, a dialog box appears so that you can name your workspace and save it to your preferred directory\. 
  + Click **Save Workspace As** to saves your workspace with a different name or to another directory\. 
  + To save motion files individually, click the save icon in the **Motions** pane\.
  + To save actor files individually, click the save icon in the **Actor Manager** pane\.