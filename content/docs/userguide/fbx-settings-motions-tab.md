description: null
slug: fbx-settings-motions-tab
title: FBX Settings Motions tab
---
# FBX Settings Motions tab<a name="fbx-settings-motions-tab"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can process animation sequences from a single `.fbx` file as **Motions**\. Each **Motion** produces its own `.motion` file\. The processed runtime assets appear in **Asset Browser** as children of the `.fbx` file\. 

**Important**  
Animation in your `.fbx` should be *baked*, that is, each animated channel should be keyed at every frame\. Third\-party animation applications might use functions and simulations to interpolate between keyframes and the results are not exported from your `.fbx` file unless the animation is baked into the animation channels\. 

For more information, see [Animation Editor File Types](char-animation-editor-file-types.md)\. 

**Contents**
+ [Motions tab properties](#fbx-settings-motions-tab-properties)
+ [Additive motion modifier](#w31aac15b9c11c15c15)
+ [Comment modifier](#w31aac15b9c11c15c17)
+ [Compression Settings modifier](#w31aac15b9c11c15c19)
+ [Coordinate system change modifier](#w31aac15b9c11c15c21)
+ [Motion range modifier](#w31aac15b9c11c15c23)
+ [Scale motion modifier](#w31aac15b9c11c15c25)

## Motions tab properties<a name="fbx-settings-motions-tab-properties"></a>

![\[The FBX Settings Motions tab.\]](/images/fbx/ui-fbx-settings-motions-tab-1.25.png)

****Add another motion****  
Add an animation to export as a `.motion` from the `.fbx` file\.

****Name motion****  
Enter a name for the motion\. This is the name of the `.motion` file that appears in **Asset Browse** as a child of the `.fbx` file\. 

****Select root bone****  
Select the root bone of the animated skeleton hierarchy\. By default the top parent bone of the skeleton is selected as the root bone\.

****Add Modifier****  
Modifiers add specialized options for processing assets\. Choose the **Add Modifier** button to see a list of available modifiers:  
+ **Additive motion**
+ **Comment**
+ **Compression settings**
+ **Coordinate system change**
+ **Motion range**
+ **Scale motion**

## Additive motion modifier<a name="w31aac15b9c11c15c15"></a>

![\[The FBX Settings Motion tab Additive motion modifier.\]](/images/fbx/ui-fbx-settings-motion-modifier-additive-motion-1.25.png)

Export the animation as an additive motion\. Additive motions can be layered on top of base motions without affecting the base motion functionality\. 

****Base Frame****  
Specifies the number of the base frame that contains the reference pose\. 

For more information, see  

## Comment modifier<a name="w31aac15b9c11c15c17"></a>

![\[The FBX Settings Motion tab Comment modifier.\]](/images/fbx/ui-fbx-settings-mesh-modifier-comment-1.25.png)

Add a comment to the file\. You can add a comment about changes made to the `.fbx` file for tracking purposes or notes on export options, for example\. Comments don't affect how files are processed and multiple comment modifiers can be added to a mesh group\. 

## Compression Settings modifier<a name="w31aac15b9c11c15c19"></a>

![\[The FBX Settings Motions tab Compression settings modifier.\]](/images/fbx/ui-fbx-settings-motion-modifier-compression-settings-1.25.png)

Reduce asset size by compressing animation\. The **Compression settings** modifier sets tolerances for keyframe values on each transform type\. If the change in a keyframe's value from the preceding keyframe is smaller than the tolerance value set in this modifier, the keyframe is removed\. 

****Max translation error tolerance****  
Specify the maximum error tolerance allowed in translation\. Valid values range from a minimum of **0** to a maximum of **0\.1**\. 

****Max rotation error tolerance****  
Specify the maximum error tolerance allowed in rotation\. Valid values range from a minimum of **0** to a maximum of **0\.001**\. 

****Max scale error tolerance****  
Specify the maximum error tolerance allowed in scale\. Valid values range from a minimum of **0** to a maximum of **0\.01**\. 

## Coordinate system change modifier<a name="w31aac15b9c11c15c21"></a>

![\[The FBX Settings Motions tab Coordinate system change modifier.\]](/images/fbx/ui-fbx-settings-actor-modifier-coord-sys-change-1.25.png)

Modify the coordinate system of the motion\. Third\-party content creation applications and game engines use varying coordinate systems with content applications often rotating the direction of the forward axis\. The **Facing direction** property can be set to rotate the motion 180 degrees around its up axis to account for this difference\. The rotation is applied when the asset is processed and the `.fbx` file remains unchanged\. 

## Motion range modifier<a name="w31aac15b9c11c15c23"></a>

![\[The FBX Settings Motions tab Motion range modifier.\]](/images/fbx/ui-fbx-settings-motion-modifier-motion-range-1.25.png)

Set the range of the animation to be exported from the `.fbx` file\. 

****Start frame****  
Specify the start keyframe of the animation to export\. 

****End frame****  
Specify the end keyframe of the animation to export\. 

## Scale motion modifier<a name="w31aac15b9c11c15c25"></a>

![\[The FBX Settings Motions tab Scale motion modifier.\]](/images/fbx/ui-fbx-settings-motion-modifier-scale-motion-1.25.png)

The **Scale factor** modifier sets a uniform scale for the **Motion**\. This setting is useful if your assets are created in an application that uses a different base standard unit of measurement than Lumberyard\. 