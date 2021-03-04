---
description: ' Learn to use the terrain and texture layers tools in O3DE. '
title: 'Tutorial Seven: Create terrain'
---
# Tutorial Seven: Create terrain<a name="tutor-ch07-create-terrain"></a>

In this tutorial, you will use the **Terrain Editor**, **Terrain Tool**, **Texture Layers**, and **Material Editor** to create a grassy island\. You use **Terrain Editor** to create heightmaps that shape the terrain\. In **Texture Layers**, you create layers and assign materials from **Material Editor** that can be blended across the terrain\. Finally, you use **Terrain Tool** to paint materials onto the terrain and generate a terrain texture\.

**Tip**
If you like, you can follow this chapter in video \(6:45 minutes\) form:

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/sQrlDaLbDZ8?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/sQrlDaLbDZ8?rel=0)

Begin this tutorial either with the level you created in [Tutorial Six: Add a camera](tutor-ch06-add-a-camera.md), or by opening `ch06_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in O3DE, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **O3DE Editor** layout, so make sure this is the layout that you're using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.
![\[O3DE select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Open **Terrain Editor** to modify the terrain\. Expand the **Tools** menu and choose **Terrain Editor**\. With **Terrain Editor**, you can paint and modify your terrain's *heightmap*\.

   A heightmap is a grayscale image where each pixel defines the height of one square meter of terrain\. Heightmaps in O3DE are 32\-bit\. Each pixel in the heightmap contains a value between 0\.0 and 1\.0\. Black \(0\.0\) pixels are low areas\. White \(1\.0\) pixels are high areas\. The height in world space of a white pixel is defined by the **Max Height** property\.

1.  Set the terrain's **Max Height**\. In **Terrain Editor**, expand the **Modify** menu and choose **Set Terrain Max Height**\.

1.  You might recall from the first tutorial that the terrain is at 32\.0 on the Z axis in world space\. In the **Set Terrain Max Height** dialog, enter `32.0` and choose **OK**\.
![\[O3DE set terrain max height\]](/images/welcomeguide/ui-terrain-set-max-height-1.26.png)

1.  The infinite ocean is currently at 16\.0 on the Z axis in world space\. Move it closer to the terrain\. In **Terrain Editor**, expand the **Modify** menu and choose **Set Ocean Height**\.

1.  In the **Set Ocean Height** dialog, enter `30.0` to place the ocean 2 meters below the terrain and choose **OK**\.
![\[O3DE set ocean height\]](/images/welcomeguide/ui-terrain-set-ocean-height-1.26.png)

1.  **Terrain Editor** has painting tools that you can use to edit heightmaps in the **Modify Terrain** panel to the right\. **Terrain Editor** can also automatically generate heightmaps as a starting point\. In **Terrain Editor**, expand the **Modify** menu, and choose **Make Isle**\. **Terrain Editor** generates a smooth heightmap leaving the center of the terrain at 32\.0 in Z, and the edges of the terrain gradually fall off beneath the surface of the ocean\.
![\[O3DE make isle in Terrain Editor\]](/images/welcomeguide/ui-terrain-isle-terrain-1.26.png)

1.  To make the terrain more visually interesting, you first must create texture layers for the terrain\. In **Terrain Editor**, expand the **Tools** menu, and choose **Terrain Texture Layers…​**\.

   In **Terrain Texture Layers**, you can create layers for the terrain and assign materials to the layers\. You then use **Terrain Tool** to paint a terrain texture that blends between the layers\. Note there is currently one layer containing the default grid material displayed on the terrain\.

1.  In **Terrain Texture Layers**, add two layers to the terrain by selecting **Add Layer** for the **Layer Tasks** panel on the right\.
![\[O3DE add new terrain texture layers\]](/images/welcomeguide/ui-terrain-new-layers-1.26.png)

1.  Rename the new layers\. Double\-click in the **NewLayer** cell and enter `Mud`\.

1.  Double\-click in the **NewLayer1** cell and enter `Grass`\.
![\[O3DE name terrain texture layers\]](/images/welcomeguide/ui-terrain-layer-names-1.26.png)

1.  Materials are a combination of texture maps, shaders, and properties that create a look for a surface\. Grass and Mud terrain layer materials are provided\. Set a material for the mud layer\. In **Terrain Texture Layers**, click the material name link in the **Material** cell of the `Mud` layer to open **Material Editor**\.

1.  **Material Editor** opens with the default terrain material selected\. In **Material Editor**, in the directory tree on the left, expand the **WelcomeGuideTutorials** directory, expand the **Materials** directory, and click **Mud\.mtl** to select the Mud material\.
![\[O3DE select mud material\]](/images/welcomeguide/ui-material-editor-mud-1.26.png)

1.  With the mud material selected, return to **Terrain Texture Layers**\. In **Terrain Texture Layers**, in the **Layer Tasks** panel, click **Assign Material** to assign Mud\.mtl to the Mud terrain layer\.
![\[O3DE assign mud material\]](/images/welcomeguide/ui-assign-mud-material-layer-1.26.png)

1.  Repeat the preceding two steps, this time assigning Grass\.mtl to the Grass terrain layer\.

1.  Close **Terrain Texture Layers**, **Material Editor**, and **Terrain Editor**\. Return to the O3DE editor\.

1.  In the O3DE editor, expand the **Tools** menu and choose **Terrain Tool**\. The **Terrain Tool** tab hosts tools that contain some of the same functionality as **Terrain Editor**\. In **Terrain Editor** you can paint heightmaps in a 2D view\. With **Terrain Tool**, you can paint terrain maps and sculpt terrain in **Perspective**\.

1.  In **Terrain Tool**, choose **Layer Painter** to access the terrain layer painting tools\.
![\[O3DE layer painter\]](/images/welcomeguide/ui-terrain-tool-layer-painter-1.26.png)

1.  In **Layer Painter**, you can select a terrain layer, and paint the layer in **Perspective**\. The layers you paint are tinted by a vertex color\. In **Layer Painter**, in the lower **Layer** section, click **Mud** to select the mud layer\.
![\[O3DE layer painter select mud layer\]](/images/welcomeguide/ui-layer-painter-select-mud-1.26.png)

1.  Choose a vertex color for the Mud layer\. In **Layer Painter**, click the color swatch next to the **Color** property and set the vertex color to a desaturated orange using these values: **R** `187`, **G** `99`, **B** `48`\.

1.  Fill the terrain with the mud layer by clicking the **Flood** button at the bottom of **Layer Painter**\. You might have to scroll down in **Terrain Tool** to locate the **Flood** button\. The Mud layer is applied to the entirety of the terrain\.
**Important**
The changes that you make in **Layer Painter** are made in memory\. You must save the changes that you make to each layer as you work, and generate a new terrain texture to commit the changes to disk\. Because the changes are stored in memory, **Perspective** might fail to display the most current changes\. To force the changes to update, enter game mode by pressing the **Play** button in the tool bar or **Control \+ G**\.
![\[O3DE mud terrain layer\]](/images/welcomeguide/ui-mud-terrain-1.26.png)

1.  In **Layer Painter**, click the **Save Layer** button to save the changes you made to the Mud layer\.

1.  Paint some grass over the mud layer\. In **Layer Painter**, in the lower **Layer** section, click **Grass** to select the Grass layer\.

1.  Choose a vertex color for the Grass layer\. In **Layer Painter**, click the color swatch next to the **Color** property and set the vertex color to a desaturated green using these values: **R** `35`, **G** `66`, **B** `27`\.

1.  In **Brush Settings**, set **Radius** to 5\.0\. Because the terrain is set to `1` meter per texel, this radius setting creates a circular brush that covers about 10 meters of terrain\.
![\[O3DE grass terrain layer settings\]](/images/welcomeguide/ui-grass-layer-settings-1.26.png)

1.  In **Perspective**, click and drag on the terrain to paint the **Grass** layer over the **Mud** layer\. Leave the **Mud** layer visible around the edges of the island, and leave some mud exposed in patches of grass\.
![\[O3DE painted grass terrain layer\]](/images/welcomeguide/ui-paint-grass-layer-1.26.png)

1.  In **Layer Painter**, click the **Save Layer** button to save the changes you made to the Grass layer\.

1.  Enter play mode by pressing the **Play** button or pressing **Control \+ G**\. Walk around the island and see how the terrain texture layers blend\. Also, notice that you can walk into the ocean\. Press **Escape** to return to the editor\.
![\[O3DE painted grass terrain layer\]](/images/welcomeguide/anim-terrain-layers-1.26.gif)

1.  The terrain texture must be committed to disk\. In the O3DE editor, Expand the **Game** menu, choose the **Terrain** sub\-menu, and select **Generate Terrain Texture**\.

1.  In the **Generate Terrain Texture** dialog, select `4096 x 4096` and choose **OK** to generate a terrain texture to disk\.

1.  You changed the heightmap for the terrain in this tutorial\. For terrain collisions to be properly detected in the stand\-alone version of your game, the **PhysX Terrain** level component must reference the new heightmap\. To make the connection between the heightmap and the **PhysX Terrain** level component, delete the existing **PhysX Terrain** level component and add a new one\. The heightmap will be automatically associated with the new **PhysX Terrain** level component\.

   1.  Choose the **Level Inspector** tab on the right side of the editor\.

   1.  Click the **PhysX Terrain** level component to select it\.

   1.  Press the **Delete** key to delete the **PhysX Terrain** level component\.

   1.  Choose **Add Component**, and select **PhysX Terrain** from the list of level components\.

For extra credit, go to **Layer Painter** and experiment with changing the **Radius**, **Color Opacity**, and **Color** settings\. Try using different vertex colors in the same layer and blending the results\. Remember to save layer changes and regenerate the terrain texture\.

Explore the other tools in **Terrain Tool**\. Try the **Modify** tool and sculpt the terrain in **Perspective**\.

When you're ready, try [Tutorial Eight: Create environment props with White Box and slices](tutor-ch08-create-props-with-slices.md)\.