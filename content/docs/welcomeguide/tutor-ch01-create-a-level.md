---
description: ' Learn how to create a simple level with terrain in Open 3D Engine. '
title: 'Tutorial One: Create a level'
---
# Tutorial One: Create a level<a name="tutor-ch01-create-a-level"></a>

In this first tutorial, you will create a simple level with a flat terrain in O3DE\. At the beginning of each of the following tutorials, you will have the option to continue using the level you've been working on, or start fresh with a level that we created using the instructions up to that point\. Each tutorial expects you to have successfully completed all the steps from the previous tutorials, so if you have any difficulty along the way, or wish to use one of our completed levels for any reason, you can locate them in the `Levels` directory of the **WelcomeGuideTutorials** project folder\. The filename begins with a chapter number, and ends with the word `final`\. And if you *do* have trouble completing any steps, we ask that you please leave us feedback using the **Feedback** link on this page, so we can continue to improve these tutorials\.

**Tip**
If you like, you can follow this chapter in video \(4:53 minutes\) form:

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/q3Qlns_xaN8?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/q3Qlns_xaN8?rel=0)

Before you proceed, you should already have completed the following steps:
+ Downloaded and unzip the [WelcomeGuideTutorials](https://d3bqhfbip4ze4a.cloudfront.net/tutorials/WelcomeGuideTutorials-v1.1.zip) project into your O3DE dev folder\.
+ Set the **WelcomeGuideTutorials** project as your default project in **Project Configurator**\.
+ Configure the project using `lmbr_waf configure` from the command line in the `lumberyard\dev` directory\.
+ Build the project using a build command such as `lmbr_waf build_win_x64_vs2019_profile -p game_and_engine` from the command line in the `lumberyard\dev` directory\. Depending on your hardware, the build may take a while to complete\.

**Note**
See [Building O3DE projects](/docs/userguide/game-build-intro) for information on command line configuration and build\. Alternatively, you can configure and build the project from **Project Configurator**\. See [Manage O3DE projects with Project Configurator](wg-project-configurator.md) for details on using **Project Configurator**\.

When the basic project has been built, you are ready to continue\. On to your first level\!

1.  Open **O3DE Editor** by choosing the O3DE Editor icon from your desktop or Start Menu\.

1.  In the **Welcome to O3DE** dialog box, choose **New level…​**\.
![\[O3DE Level dialog\]](/images/welcomeguide/ui-new-level-1.25.png)

1.  In the **New Level** dialog, give your new level a name\. Ensure the base `Levels/` directory is specified for the **Folder** option, and choose **OK**\. This saves the new level in the existing `Levels` directory\.
![\[O3DE New Level dialog\]](/images/welcomeguide/ui-new-level-2-1.25.png)

1.  If the **Generate Terrain Texture** dialog appears, select `2048 x 2048` and choose **OK**\. \(If this dialog does not appear, skip to the next step\.\)
![\[O3DE Generate Terrain Texture dialog\]](/images/welcomeguide/ui-generate-terrain-texture-1.25.png)

   O3DE Editor displays your new level in the **Perspective** pane with a default sky, an infinite ocean, and a flat terrain plane with a default grid texture\.

1.  This tutorial is written for the default **O3DE Editor** layout, so make sure this is the layout that you're using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.
![\[O3DE select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  This tutorial uses **NVIDIA PhysX** to simulate physics interactions\. To enable collision with the terrain, add a **PhysX Terrain** level component\. Choose the **Level Inspector** tab in the upper right of the editor interface, choose **Add Component**, and select **PhysX Terrain** from the list of level components\.
![\[O3DE add PhysX Terrain component\]](/images/welcomeguide/ui-physx-terrain-1.25.png)

1.  The terrain is quite large\. You won't need all this space\. You can resize the terrain to make it a bit more manageable\. From the **Main Menu** bar, select **Game**, **Terrain** and choose **Resize Terrain**\.
![\[O3DE resize terrain\]](/images/welcomeguide/ui-resize-terrain-1.25.png)

1.  Complete the fields in the **Resize Terrain** dialog\. For **Heightmap Resolution**, select `128 x 128`\. For **Meters Per Texel**, select `1` and choose **OK**\.
![\[O3DE resize terrain\]](/images/welcomeguide/ui-resize-terrain-2-1.25.png)

1.  Because the terrain has been resized, the terrain texture must be regenerated\. The **Generate Terrain Texture** dialog automatically opens after the previous step\. Select `2048 x 2048` and choose **OK**\.

1.  The resized terrain might have disappeared in the **Perspective** pane\. You can use the camera controls to find the terrain and bring it back into view\. You can hold the right mouse button and move the mouse to aim the camera, and use the W, A, S, and D keys to fly forward, left, back and right, respectively\. You might want to set the camera speed to `10.0` for this part\. You can change the camera speed in the lower right of **Perspective**, as shown in the following animated GIF\. If you're having trouble moving the camera with the **W**, **A**, **S**, and **D** keys, try clicking anywhere in the viewport, which will deselect any entity you have selected\. For more information, see the [Introduction to the O3DE Editor](wg-editor.md)\.
![\[O3DE navigation\]](/images/welcomeguide/anim-camera-controls-1.25.gif)

   Another method to set your perspective is to focus on a selected entity\. Because the **DefaultLevelSetup** entity was set up before you resized the terrain, you must move the entity to center it in the new terrain size\. Use the following steps to move the entity\.

   1.  In the **Entity Outliner** on the left of the editor, click the **DefaultLevelSetup** entity to select it\.
![\[O3DE DefaultLevelSetup entity\]](/images/welcomeguide/ui-defaultlevelsetup-entity-1.25.png)

   1.  Choose the **Entity Inspector** tab on the right of the editor to view the components of the **DefaultLevelSetup** entity\.

   1.  The **DefaultLevelSetup** entity contains two components, an **Environment Probe**, and a **Transform**\. Every entity has a **Transform** component that defines the position, rotation and scale of the entity in the level\. You can use the **Translate** property of the **Transform** component to center the entity on the resized terrain\.

      The terrain is a 128 x 128 meter plane\. The lower left corner of the terrain is positioned at `0.0` in the X and Y axes in world space, `32.0` meters above the infinite ocean surface \(Z axis\)\. In the the **Transform** component, set the **Translate** X and Y properties to `64.0` \(half the size of the terrain\), and set the **Translate** Z property to `32.0`\. This places the **DefaultLevelSetup** entity at the center of the terrain\.
![\[O3DE DefaultLevelSetup translate\]](/images/welcomeguide/ui-defaultlevelsetup-translate-1.25.png)

   1.  With the **DefaultLevelSetup** entity still selected, press Z to focus the **Perspective** pane on the **DefaultLevelSetup** entity and the surrounding terrain\. You can also use the camera controls that were explained previously to make fine adjustments to the camera position\.
![\[O3DE DefaultLevelSetup translate\]](/images/welcomeguide/ui-press-z-to-focus-1.25.png)

1.  When you have the perspective view set up to your liking, you can bookmark the location by pressing **Control** \+ any **Function** key\. Press **Control \+ F1** to bookmark the view\. You can return to the view at any time by pressing **Shift \+ F1**\.

1.  Save the level\. Press **Control \+ S** or select **Save** from the **File** menu\.

When you're ready, try [Tutorial Two: Create an entity with White Box](tutor-ch02-create-an-entity.md)\.