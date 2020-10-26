# Creating Additive Animations<a name="char-fbx-importer-motion-additive"></a>

Additive animations are animations that you can add as layers on top of a base animation\. They are commonly used to add a partial\-body animation to a full\-body animation\. Because additive animations do not interfere with base animation functionality, you can reuse the same base to create many variations in motion\. Reusing the base also has the advantage of greatly reducing the overall asset count\.

Because additive animations preserve the underlying animation's style, they are useful for adding poses and animations to a character's upper body\. For example, you can use additive animations to make a character breathe, look around, flinch, or change posture\. This adds variety to the animations and avoids what might otherwise be a monotonous look\.

You can create additive animations in two ways:
+ At runtime, use the **Blend Two Additive** and **Pose Subtract** nodes\. For more information, see [Blend Two Additive Node](animation-editor-blending-blendtwoadditive.md) and [Pose Subtract Node](animation-editor-blending-posesubtract.md)\.
+ At asset processing time, use the **Asset Browser** and FBX settings motion additive modifier to convert an existing animation into an additive animation\. This approach removes the generation of additive animations from runtime processing and improves runtime performance\. See the following procedure\. 

**To convert a motion into an additive animation**

1. From Lumberyard Editor, choose **Tools**, **Asset Browser**\.

1. In the **Asset Browser**, locate the FBX animation file that you want to convert into an additive animation\.

1. Right\-click the FBX animation file and choose **Edit Settings**\.

1. In the **FBX Settings** dialog box, on the **Motions** tab, click **Add Modifier**, and then choose **Additive Motion**\.

1. In the **Motion additive** section, for **Base frame**, specify the number of the frame that contains the reference pose that you want to subtract\.

   For example, if you're creating an additive animation for the idle state, the base frame can be the first frame of your idle motion\. If you're creating an additive aim blendspace, the base frame can be the frame that contains the center aim\.
**Note**  
The reference pose that you want to subtract must be in the FBX file that you selected\.