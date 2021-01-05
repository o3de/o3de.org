---
description: ' Use the NVIDIA Cloth component to add cloth simulation to Actor components
  in &ALYlong;. '
slug: nvidia-cloth-actors
title: Cloth for Actor components
---
# Cloth for Actor components<a name="nvidia-cloth-actors"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

To use **Cloth**, you must enable the **NVIDIA Cloth** gem\. For more information, see the [NVIDIA Cloth gem](nvidia-cloth.md) documentation\. 

You can create cloth assets for entities with **Actor** components in the content creation application of your choice and import them into Lumberyard from an `.fbx` file\. The actor asset should have the following: 

**Actor mesh**  
One or more meshes that visually represent the actor, skinned to a skeleton, that will **not** be simulated as cloth\. 

**Cloth mesh**  
One or more meshes that will be simulated and rendered as cloth\.   
+ The cloth mesh must be skinned to bones\. The bones do not have to be exclusive to the cloth mesh\. The bones must be part of the actor's skeletal hierarchy\. Because simulation will drive the cloth mesh, we recommend you use few additional bones for the cloth mesh\. 
+ Cloth data can be added to define per vertex mass and constraint properties using the vertex color tool in your content creation application\. For more information see [Per vertex properties for cloth](nvidia-cloth-vertex-data.md)\. 

**Skeleton**  
A skeleton to drive the actor and cloth meshes\. Cloth meshes may be skinned to their own bones or any bones in the hierarchy\. Bones that drive the cloth meshes must be part of the skeleton's hierarchy\. 

**Animation**  
A **Motion set** and **Anim graph** based on the actor's skeleton\. Keyframe animated cloth can be blended with simulated cloth using **Motion constraints**\. 

**Note**  
Sample **Actor** component cloth assets are located in the **NVIDIA Cloth** gem directory, which is located at `/dev/Gems/NvCloth/Assets/Objects/cloth/Chicken/`\. 

For imformation on exporting actor assets, see [FBX Settings actor export](fbx-actor-export.md)

## Add Cloth to Actor components<a name="cloth-actor-setup"></a>

Create cloth by adding the **Cloth** component to an entity that has an **Actor** component, and then setting the properties of the **Cloth** component\. 

1. In Lumberyard Editor, add a new entity to the level\. 

1. Add an **Actor** component to the entity, and reference the actor asset and material\. 

1. Add an **Anim Graph** component and reference the actor anim graph asset and motion set\. 

1. Add a **Cloth** component to the entity\. 

1. Set the cloth data of the actor asset\. 

   1. Click the button beside the **Mesh node** property to open the **FBX Settings** window\.   
![\[Amazon Lumberyard cloth component mesh node select.\]](/images/userguide/physx/cloth/ui-cloth-mesh-node-select-1.27.png)

   1. In the **FBX Settings** window, on the **Actors** tab, and choose **Add Modifier**, **Cloth**\. 

   1. In the **Cloth** modifier area: 

      1. Select the cloth mesh from the drop\-down list\. 

      1. When applicable, select the vertex color stream and channel that includes the **Inverse Masses** data\. If data is not provided, then cloth defaults to an inverse mass value of 1\.0 for all vertices\. 

      1. When applicable, select the vertex color stream and channel that include the **Motion Constraints** data\. If data is not provided, then cloth defaults to a motion constraint value of 1\.0 for all vertices\. 

      1. When applicable, select the vertex color streams and channels that includes the **Backstop Offset** and **Backstop Radius** data\. If data is not provided, then no backstop constraints will be applied in the simulation\.   
![\[Amazon Lumberyard cloth modifier setup.\]](/images/userguide/physx/cloth/ui-cloth-modifier-actor-setup-1.27.png)

   1. Choose the **Update** button\. **Asset Processor** then updates the asset and includes the cloth data\. 

1. Configure the cloth component\. 

   1. Select the cloth mesh node from the drop\-down list\.   
![\[Amazon Lumberyard cloth component.\]](/images/userguide/physx/cloth/ui-cloth-component-select-actor-1.27.png)

   1. Adjust cloth properties to obtain the desired cloth behavior\. For more information, see [Cloth Component](component-cloth.md)\. 

   1. You can use the **Motion constraints** properties **Max Distance** and **Scale** to blend between cloth simulation and keyframe animation\. 

## Add cloth colliders to an actor<a name="add-char-cloth-colliders"></a>

 You can add cloth colliders to an actor to prevent the cloth form penetrating the actor's mesh during simulation\. Cloth colliders are added to actors in **Animation Editor**\. For information on adding cloth colliders to an actor, see [Add Cloth Colliders to actors](/docs/userguide/animation/character-editor/cloth-colliders.md)\. 

## View the Cloth Simulation<a name="view-cloth-simulation"></a>

In Lumberyard Editor, press Ctrl\+G or press the **Play** button to run your project\. 

![\[Amazon Lumberyard cloth simulation with the NVIDIA Cloth gem.\]](/images/userguide/physx/cloth/anim-actor-cloth.gif)