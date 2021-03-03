---
description: ' Learn about Lumberyard assets and how to create a player character
  slice from an entity and components. '
title: 'Tutorial Three: Build a player character'
---
# Tutorial Three: Build a player character<a name="tutor-ch03-build-a-player-character"></a>

In this tutorial, you will build a player character from various components and create a slice for your player character\. You will also learn about Lumberyard's asset pipeline\.

**Tip**
If you like, you can follow this chapter in video \(2:48 minutes\) form:

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/uH-XY_R6-FY?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/uH-XY_R6-FY?rel=0)

Begin this tutorial either with the level you created in [Tutorial Two: Create an entity with White Box](tutor-ch02-create-an-entity.md), or by opening `ch02_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you're using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.
![\[Lumberyard select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Create a player character entity\. In **Asset Browser** on the left side of the editor, find `ch03_chicken_start.fbx` in the **Actors** directory\. This asset was created in a third\-party application and saved as a `.fbx` file for import into Lumberyard\.
![\[Lumberyard actor in asset browser\]](/images/welcomeguide/ui-chicken-start-actor-1.25.png)

1.  Click and drag `ch03_chicken_start.fbx` into the **Perspective** pane\. Drop it somewhere in front of the **feed\_locker** entity\. This creates an entity for the chicken player character from the `ch03_chicken_start.actor` asset\.
![\[Lumberyard drag actor to create entity\]](/images/welcomeguide/anim-entity-from-actor-1.25.gif)

1.  Press the **Z** key to focus on the chicken entity, or use the mouse and keyboard navigation controls to get a good view of the chicken asset\.

1.  Modify the FBX Settings for the chicken asset to import her mohawk as a cloth object\. Models, rigged actors, and animations created in third\-party applications are imported into Lumberyard through `.fbx` files\. The chicken `.fbx` file contains a mesh asset for the chicken's mohawk that has not been imported\. You can add the mohawk to the chicken's **Actor group** in **FBX Settings** to import it, and add a modifier that will add cloth data to the mohawk so that it behaves like a cloth object at run\-time\.

   1.  Right\-click `ch03_chicken_start.fbx` in **Asset Browser** and choose **Edit Settings** to view the **FBX Settings** for the chicken\.

       **FBX Settings** should open to the **Actors** tab displaying one **Actor group**\. This group will output one actor asset from the `.fbx`\. The `.actor` asset contains meshes and a skeleton that are selected in the actor group\. The actor group is mostly set up\. You must make a couple of edits to import the chicken's mohawk as a cloth object\.
![\[Lumberyard open FBX Settings\]](/images/welcomeguide/ui-fbx-edit-settings-1.25.png)

   1.  In the `ch03_chicken_start` actor group, choose the **Hierarchy** button to the right of **Select base meshes**\.

   1.  To import the mohawk mesh, in the **Select nodes** window, choose **chicken\_mohawk** from the list to add the mohawk mesh to the mesh group\. Choose the **Select** button to close the window\.
![\[Lumberyard add mesh to actor group\]](/images/welcomeguide/ui-add-mohawk-mesh-1.25.png)

   1.  To add cloth data to the mohawk, in **FBX Settings** choose **Add Modifier** and select **Cloth** from the modifier list\.
![\[Lumberyard add cloth modifier\]](/images/welcomeguide/ui-add-cloth-modifier-1.25.png)

   1.  In the cloth modifier, for **Select Cloth Mesh**, choose `RootNode.chicken.chicken_mohawk` to add the chicken's mohawk as a cloth object\.

   1.  In the cloth modifier, for **Cloth Inverse Masses** choose `Cd` from the list to use chicken\_mohawk's vertex color stream to set the mass values for the cloth object\. The vertex colors applied to the chicken's mohawk were pre\-painted in a 3rd\-party application\. Mass will be generated per vertex on the mohawk based on the red value contained in the `Cd` vertex color stream\. for more information on Cloth, see [Cloth Simulation](/docs/userguide/tutorial-cloth-simulation)\.
![\[Lumberyard cloth modifier settings\]](/images/welcomeguide/ui-cloth-modifier-settings-1.25.png)

   1.  Choose **Update** at the bottom of the **FBX Settings** window\.

   1.  In the **Progress** window, choose **Ok**\. The window closes and the `.fbx` file is quickly processed with the new settings\. The mohawk mesh appears in **Perspective** on the chicken entity\.
![\[Lumberyard cloth mesh mohawk processed\]](/images/welcomeguide/ui-chicken-mohawk-1.25.png)

   1.  Close the **FBX Settings** window\.
**Note**
When you close the **FBX Settings** window, you might see a window stating there are unsaved changes even though the changes have been automatically saved\. This is a known issue\. Choose **Discard** to close the **FBX Settings** tool\.

1.  In **Entity Outliner**, click the `ch03_chicken_start` entity to select it\.

1.  In **Entity Inspector** on the right of the editor, rename the entity\. Click in the field next to **Name** and enter `player_chicken`\.
![\[Lumberyard rename chicken entity\]](/images/welcomeguide/ui-rename-chicken-entity-1.25.png)

1.  The mohawk has been imported and has cloth data applied, but to get the mohawk to simulate as a cloth object at run\-time, you need to add a **Cloth** component to the `player_chicken` entity\. In **Entity Inspector**, choose **Add Component** to open the component list\. Enter `cl` in the search field to filter the list by name and choose **Cloth** from the filtered results to add a **Cloth** component\.
![\[Lumberyard add cloth component\]](/images/welcomeguide/ui-add-cloth-component-1.25.png)

1.  In the **Cloth** component that has been added to the entity, for **Mesh node**, choose `chicken_mohawk` from the list\.
![\[Lumberyard cloth component mesh node\]](/images/welcomeguide/ui-cloth-component-mesh-node-1.25.png)

1.  Click the **Simulate** button in the bottom toolbar of the **Perspective** pane, or press **Control \+ P** to test the cloth simulation\. The chicken's mohawk should flop over like cloth\. Press **Control \+ P** to exit simulation mode\.
![\[Lumberyard simulate mohawk as cloth\]](/images/welcomeguide/anim-cloth-simulate-1.25.gif)

1.  Create a slice from the `player_chicken` entity\. Right\-click the **player\_chicken** entity in **Entity Outliner**, and choose **Create slice…​**\. Save the entity as a `.slice` in the `Slices` directory as `player_chicken.slice`\. Slices are reusable and can be instanced, each instance having unique property settings\. You can create complex slices using collections of simple entities\.
![\[Lumberyard save chicken actor as a slice\]](/images/welcomeguide/ui-save-actor-slice-1.25.png)

For extra credit, play with the settings in the **Cloth** component and test the simulation in **Perspective** to fine\-tune the mohawk behavior\. See the [Cloth](/docs/userguide/components/cloth) component documentation for more info\. Save your changes to the `player_chicken.slice`\.

The cloth simulation requires collision primitives to prevent the mohawk cloth mesh from penetrating the chicken geometry when simulated\. You can see how these colliders are set up in **Animation Editor**\.

1.  Open **Animation Editor** from the **Tools** menu\.

1.  Open the chicken actor from the **File** menu in **Animation Editor**\.

1.  Enable the **Physics** layout from the **Layouts** menu in **Animation Editor**\.

You will see spheres and capsules attached to the chicken's skeleton\. These are the cloth colliders\. You can locate their nodes in the **Skeleton Outliner** by the shirt icon to the right of the node name\. Like the **Cloth** modifier you added in **FBX Settings**, these colliders and their properties are saved in the `.assetinfo` file so that Asset Processor can include them in the runtime asset\.

When you're ready, try [Tutorial Four: Create PhysX colliders](tutor-ch04-create-physx-colliders.md)\.