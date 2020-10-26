# Create Cloth for Characters<a name="tutorial-cloth-characters"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

To use **Cloth**, you must enable the NVIDIA Cloth Gem\. For more information, see the [NVIDIA Cloth Gem documentation](gems-system-gem-nv-physx-cloth.md)\. 

## Cloth Assets for Characters<a name="cloth-character-assets"></a>

You can create character cloth assets in the DCC application of your choice and import them into Lumberyard from an FBX file\. The character asset should have the following: 
+ **Body mesh** 
  + A visual representation of the character, skinned to the skeleton, that doesn't include cloth\. 
+ **Cloth mesh** 
  + This is the cloth mesh that is going to be rendered and simulated in Lumberyard\. 
  + The cloth mesh must be skinned\. The joints don't have to be exclusive for the cloth mesh\. Because the mesh will have a cloth simulation, we recommend that few joints be added to keyframe animate cloth meshes\. 
  + This cloth mesh should have vertex color information, which you can create with a vertex painting tool in your DCC application\. The **Cloth** component will use the **red channel** of the vertex color\. 
    + A zero value in the red channel means the vertex will **not** be affected by cloth simulation\. The vertex will be static\. 
    + Any other value in the red channel represents the invert mass of the vertex, and the vertex will be affected by cloth simulation\. For example, a value of 0\.3 in the red channel means the vertex has a mass value of 3\.33 \(from 1\.0/0\.3\)\. The smaller \(darker\) the value, the greater the mass\. 
+ **Skeleton** 
  + Joints for the character and cloth\. 
  + \(Optional\) Cloth mesh can have its own joints, or use any joints of the skeleton\. 
+ **Animation** 
  + The entire skeleton can be animated, including cloth joints\. 
  + Key framed cloth animation on joints can be blended with simulated cloth animation at runtime\. 

**Note**  
A sample character cloth asset is located in the NVIDIA Cloth Gem directory located at `\dev\Gems\``NvCloth/Assets/Objects/cloth/Chicken/`\. 

## Add Cloth to Character Assets<a name="cloth-character-setup"></a>

Create cloth by adding the **Cloth** component to an entity that has an **Actor** component and setting the properties of the **Cloth** component\. 

1. In Lumberyard Editor, add a new entity to the level\. 

1. Add an **Actor** component and reference the actor asset and material\. 

1. \(Optional\) Add an **Anim Graph** component and reference the actor anim graph asset and motion set\. 

1. Add a **Cloth** component to the entity\. 

1. Set the cloth data of the mesh asset\. 

   1. Click the button beside the **Mesh node** property to open the FBX Settings window\.   
![\[Amazon Lumberyard cloth component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-component-L-1.23.png)

   1. In the FBX Settings window, on the **Actors** tab, choose **Add Modifier**, **Cloth**\. 

   1. In the **Cloth** modifier area: 

      1. Select the cloth mesh from the drop\-down list\. 

      1. Select the vertex color stream that includes the invert masses\. If a vertex color stream is not provided, cloth defaults to invert mass 1\.0 for all vertices\.   
![\[Amazon Lumberyard cloth component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-component-O-1.23.png)

   1. Choose the **Update** button\. Asset Processor then updates the asset and including the cloth data\. For more information, see [Editing the FBX Settings](char-fbx-importer-edit-import-settings.md)\. 

1. Configure the cloth component\. 

   1. Select the cloth mesh node from the drop\-down list\.   
![\[Amazon Lumberyard cloth component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-component-P-1.23.png)

   1. Adjust cloth properties to obtain the desired cloth behavior\. For more information, see [Cloth Component](component-cloth.md)\. 

   1. You can use the property **Animation Blending** to blend between cloth simulation and skinned animation\. 

## Add cloth colliders to an actor<a name="add-char-cloth-colliders"></a>

 You can add cloth colliders to an actor to prevent the cloth form penetrating the actor's mesh during simulation\. Cloth colliders are added to actors in **Animation Editor**\. For information on adding cloth colliders to an actor see [Add Cloth Colliders to actors](char_animation_add_cloth_colliders.md)\. 

## View the Cloth Simulation<a name="view-cloth-simulation"></a>

In Lumberyard Editor, press Ctrl\+G or press the **Play** button to run your project\. 

![\[Amazon Lumberyard cloth simulation with NVIDIA Cloth Gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/anim-nvidia-cloth-char-1.23.gif)