---
description: ' Learn to create create environment props with White Box and slices '
title: 'Tutorial Eight: Create environment props with White Box and slices'
---
# Tutorial Eight: Create environment props with White Box and slices<a name="tutor-ch08-create-props-with-slices"></a>

In this tutorial, you will learn how to make entities that can be instanced with unique properties by using *dynamic slices*\. You will also learn how White Box meshes can be shared across entities\.

**Tip**  
If you like, you can follow this chapter in video \(6:33 minutes\) form:  

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/j-c1HJCXxmQ?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/j-c1HJCXxmQ?rel=0)

Begin this tutorial either with the level you created in [Tutorial Seven: Create terrain](tutor-ch07-create-terrain.md), or by opening `ch07_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you're using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.   
![\[Lumberyard select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Create a new entity for a section of fence\. In **Perspective**, right\-click and select **Create Entity** form the context menu\. 

1.  With the new entity selected, in **Entity Inspector**, set its **Name** property to `fence_section1`\. 

1.  Press the **Z** key to focus on the `fence_section1` entity in **Perspective**\. 

1.  Add a white box component\. With the `fence_section1` entity selected, in **Entity Inspector**, choose **Add Component**\. Begin typing `whi` in the search field, and select **White Box** from the filtered list\. 

1.  Add a collider\. In **Entity Inspector**, choose **Add Component**\. Begin typing `whi` in the search field, and select **White Box Collider** from the filtered list\. 

1.  Press the **2** key or select the **Move** tool from the toolbar to move the entity\. Move the `fence_section1` entity so that it's roughly sitting on the terrain\.   
![\[Lumberyard move fence section entity\]](/images/welcomeguide/ui-wb-fence-section-a-1.26.png)

1.  Create a slice from the `fence_section1` entity\. In **Entity Outliner**, right\-click the `fence_section1` entity and select **Create Slice** from the context menu\.   
![\[Lumberyard create fence section slice\]](/images/welcomeguide/ui-create-fence-section-slice-1.26.png)

1.  Name the slice `fence_section1.slice` and ensure the file browser is in the **Slices** directory, and choose **Save**\. 

1.  In **Asset Browser**, expand the **Slices** directory, right\-click `fence_section1.slice`, and select **Set Dynamic Slice** from the context menu\. 

   Dynamic slices are optimized versions of slices that have their editor dependencies removed and can be instantiated at run\-time\.  
![\[Lumberyard create fence section dynamic slice\]](/images/welcomeguide/ui-create-fence-section-dynamic-slice-1.26.png)

1.  Change the color of the `fence_section1` dynamic slice\. Click the `fence_section1` dynamic slice in **Perspective** to select it\. In **Entity Inspector**, in the **White Box** component, click the color swatch to the right of **Tint**, and use the color picker to change the color of the fence section to blue\.   
![\[Lumberyard white box tint\]](/images/welcomeguide/ui-set-white-box-tint-1.26.png)

1.  Save the mesh created by the **White Box** component to disk\. With the `fence_section1` dynamic slice still selected, in **Entity Inspector**, in the **White Box** component, choose **Save As…​** to save the cube as a white box mesh\. 

1.  In the **Save As Asset…​** dialog, expand the Objects directory, set `fence_section_whitebox.wbm` as the file name, and choose **Save**\. 

   The cube has now been saved to disk as a white box mesh \(`.wbm`\)\. White box meshes can be loaded into **White Box** components and referenced across entities\. Any further edits are automatically saved and propagated to entities that use the white mesh\.

1.  Load the saved mesh in the **White Box** component\. In **Entity Inspector**, in the **White Box** component, set **Default Shape** to `Custom Mesh Asset`\. Choose the **Directory** button to the right of **Mesh Asset** and select the 'fence\_section\_whitebox\.wbm' from the **Objects** directory\. 

1.  In **Entity Outliner**, right\-click the `fence_section1` dynamic slice, choose **Save Slice Overrides** and select `fence_section1.slice` to quick save the changes to the dynamic slice\. 

1.  To demonstrate the capabilities of the white box mesh, create a duplicate of the `fence_section1` dynamic slice\. In **Asset Browser**, locate `fence_section1.slice` in the **Slices** directory\. Click and drag `fence_section1.slice` into **Perspective** and place it near the original fence section\. 

1.  With the new dynamic slice selected, in **Entity Inspector**, set its **Name** property to `fence_section2`\. 

1.  Set a different color for `fence_section2` In **Entity Inspector**, in the **White Box** component of the `fence_section2` slice instance, click the color swatch to the right of **Tint**, and use the color picker to change the color of the fence section to red\.   
![\[Lumberyard duplicate fence slice\]](/images/welcomeguide/ui-fence-section-2-slice-1.26.png)

1.  Create a new slice from `fence_section2`\. In **Entity Outliner**, right\-click `fence_section2` and select **Create Slice**\.   
![\[Lumberyard create fence section slice\]](/images/welcomeguide/ui-create-fence-section-2-slice-1.26.png)

1.  A warning appears in the **Create Slice** dialog because `fence_section2` is an instance of an existing slice\. Choose **Fresh Slice** to create a new slice\.   
![\[Lumberyard create a fresh slice from existing slice\]](/images/welcomeguide/ui-create-fresh-slice-1.26.png)

1.  Name the slice `fence_section2.slice` and ensure the file browser is in the **Slices** directory, and choose **Save**\. 

1.  In **Asset Browser**, expand the **Slices** directory, right\-click `fence_section2.slice`, and select **Set Dynamic Slice** from the context menu\. 

1.  Now edit the mesh of the `fence_section1` dynamic slice\. Click the `fence_section1` slice in **Perspective** to select it\. 

1.  In **Entity Inspector**, in the **White Box** component, choose **Edit** to enter White Box edit mode\. 

1.  Click and drag on the front face of the box, to make the box thinner\. Notice the `fence_section2` slice updates in real time because it is using the same white box mesh\.   
![\[Lumberyard edit a white box mesh\]](/images/welcomeguide/anim-wb-edit-mesh-instance-1.26.gif)

1.  Click and drag on the top and side of the `fence_section1` slice to create a wall that is 3 units high and 5 units long\. The checkerboard texture can be used to size the white box mesh\. Each square in the texture is a half unit\.   
![\[Lumberyard edit a white box mesh\]](/images/welcomeguide/anim-wb-edit-mesh-instance-2-1.26.gif)

**Tip**  
To make more precise modifications, enable the **Snap To Grid** button in the **Lumberyard Editor** and set the snap grid value to 1\.0\. Then enter White Box edit mode and extrude by 1 unit measurements\.

1.  In **Entity Inspector**, in the **White Box** component, choose **Done** to exit White Box edit mode\. 

1.  Select either fence section slice and use the move tool \(**2** key\) and the rotate tool \(**3** key\) to position the fence sections at a slight angle and overlapping each other a bit\.   
![\[Lumberyard use transform tools to arrange fence section slices\]](/images/welcomeguide/ui-arrange-fence-slices-1.26.png)

If you press the **Play** button, or **Control \+ G**, to enter play mode, the chicken will be able to jump over the fence if you press jump repeatedly\. For extra credit, see if you can limit the number of times the player can press jump to prevent the chicken from clearing the fence\. Hint: use the **Get Tick Delta Time** node to create a timer\.

When you're ready, try [Tutorial Nine: Add sound effects and background audio](tutor-ch09-sound-effects-and-background-audio.md)\.