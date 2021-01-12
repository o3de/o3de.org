---
description: ' Add colliders to actors in &ALYlong; for NVIDIA Cloth simulations. '
title: Add Cloth Colliders to actors
---
# Add Cloth Colliders to actors<a name="char_animation_add_cloth_colliders"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

Applying cloth simulation to actors adds realism and dynamism in their every movement\. Adding cloth colliders greatly enhances the effect\. Cloth colliders can prevent cloth from penetrating into the meshes of the actor\. To add cloth colliders, you must enable the NVIDIA Cloth Gem\. 

For more information, see the [NVIDIA Cloth Gem documentation](nvidia-cloth.md)\. 

## Add Cloth Colliders to an actor<a name="component-cloth-collider-character"></a>

1. In Lumberyard Editor, choose **Tools**, **Animation Editor**\. 

1. In the **Animation Editor**, on the right side of the menu bar, choose **Physics** from the drop\-down list\. This changes the layout\. 

1. Choose **File**, **Open Actor**, and select your actor\. 

1. In the **Skeleton Outliner**, select the joint that you want to add the cloth collider to\. 

1. Right\-click the selected joint, and then choose **Cloth**, **Add collider**\. You can add colliders \(capsules or spheres\)\. You can also copy them from Hit Detection, Ragdolls or Simulated Objects\.   
![\[Add cloth collider to character.\]](/images/userguide/actor-animation/nvidiacloth/ui-cloth-add-collider-1.23.png)

1. The **Cloth Colliders** tab shows you the list of cloth colliders of the selected joint\. 

1. Adjust the dimensions, offset, and rotation of cloth colliders\.   
![\[Adjust cloth collider added to character.\]](/images/userguide/actor-animation/nvidiacloth/ui-cloth-adjust-collider-1.23.png)

1. Choose **File**, **Save Selected Actors**\. 