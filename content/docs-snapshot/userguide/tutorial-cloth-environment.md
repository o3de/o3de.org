# Create Cloth for Environments<a name="tutorial-cloth-environment"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

To use **Cloth**, you must enable the NVIDIA Cloth Gem\. For more information, see the [NVIDIA Cloth Gem documentation](gems-system-gem-nv-physx-cloth.md)\. 

## Cloth Assets for Environments<a name="cloth-environment-assets"></a>

You can create environment cloth assets in the DCC application of your choice and import them into Lumberyard from an FBX file\. The environment asset should have the following: 
+ A cloth mesh that will be rendered and simulated in Lumberyard\. 
  + This cloth mesh should have vertex color information, which you can create with a vertex painting tool in your DCC application\. The **Cloth** component will use the **red channel** of the vertex color\.
    + A zero value in the red channel means the vertex will **not** be affected by cloth simulation\. The vertex will be static\. 
    + Any other value in the red channel represents the invert mass of the vertex, and the vertex will be affected by cloth simulation\. For example, a value of 0\.3 in the red channel means the vertex has a mass value of 3\.33 \(from 1\.0/0\.3\)\. The smaller \(darker\) the value, the greater the mass\. 
+ \(Optional\) Any other static mesh\. For example, if you create a flag to be simulated as cloth, you can include a mesh for the flag pole

**Note**  
Sample environment cloth assets are located in the NVIDIA Cloth Gem directory, which is located at `\dev\Gems\``NvCloth/Assets/Objects/cloth/Environment/`\. 

## Add Cloth to Environment Assets<a name="cloth-environment-setup"></a>

Create cloth by adding the **Cloth** component to an entity that has a **Mesh** component, and setting the properties of the **Cloth** component\. 

1. In Lumberyard Editor, add a new entity to the level\. 

1. Add a **Mesh** component and reference the mesh asset and material\. 

1. Add a **Cloth** component to the entity\. 

1. Set the cloth data of the mesh asset\. 

   1. Click the button beside the **Mesh node** property to open the FBX Settings window\.   
![\[Amazon Lumberyard cloth component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-component-L-1.23.png)

   1. In the FBX Settings window, on the **Meshes** tab, and choose **Add Modifier**, **Cloth**\. 

   1. In the **Cloth** modifier area: 

      1. Select the cloth mesh from the drop\-down list\. 

      1. Select the vertex color stream that includes the invert masses\. If a vertex color stream is not provided, cloth defaults to invert mass 1\.0 for all vertices\.   
![\[Amazon Lumberyard cloth component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-component-M-1.23.png)

   1. Choose the **Update** button\. Asset Processor then updates the asset and including the cloth data\. For more information see [Editing the FBX Settings](char-fbx-importer-edit-import-settings.md)\. 

1. Configure the cloth component\. 

   1. Select the cloth mesh node from the drop\-down list\.   
![\[Amazon Lumberyard cloth component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/ui-cloth-component-N-1.23.png)

   1. Adjust cloth properties to obtain the desired cloth behavior\. For more information, see [Cloth Component](component-cloth.md)\. 

## View the Cloth Simulation<a name="view-cloth-simulation"></a>

In Lumberyard Editor, press Ctrl\+G or press the **Play** button to run your project\. 

![\[Amazon Lumberyard cloth simulation with NVIDIA Cloth Gem.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/nvidiacloth/anim-nvidia-cloth-env-1.23.gif)