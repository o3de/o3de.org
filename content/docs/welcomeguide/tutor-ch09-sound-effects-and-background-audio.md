---
description: ' Learn how to add sound effects and background audio in Amazon Lumberyard. '
title: 'Tutorial Nine: Add sound effects and background audio'
---
# Tutorial Nine: Add sound effects and background audio<a name="tutor-ch09-sound-effects-and-background-audio"></a>

In this tutorial, you will add a squawking chicken sound effect to the player jump action, and ambient farm noises that will loop in the background\. You will learn how to use **Wwise** to import sound from wav files, create sound events, and generate a soundbank with these events for use in Lumberyard\. Then you will use the **Audio Controls Editor** in Lumberyard to map controls to your sound events\. Finally, you will create audio triggers in **Lumberyard Editor** to play the sounds in response to game events\.

## Prerequisites<a name="tutor-ch09-prerequisites"></a>

Make sure you have completed the following prerequisites before continuing this tutorial:

1.  **Install Wwise\.**

   You can use either Wwise LTX \(free version\) or Wwise \(full version\) to complete this tutorial\. Follow the instructions in [Setting up Wwise LTX](/docs/userguide/audio/wwise-using) to install the free version of Wwise\. Or, if you have a license for the full version of Wwise, use the instructions in [Upgrading Wwise LTX to the full version](/docs/userguide/audio/wwise-upgrade) to upgrade the SDK, tutorial project, and tutorial soundbank to use that version of Wwise with Lumberyard\.

1.  **Download and build WelcomeGuideTutorials\-v1\.1 or later\.**

   This tutorial requires project assets and gem configurations available only in [WelcomeGuideTutorials\-v1\.1](https://d3bqhfbip4ze4a.cloudfront.net/tutorials/WelcomeGuideTutorials-v1.1.zip) or later\. If you began this tutorial series using an earlier version, you must replace it with the new version\. Be sure to download, unzip, configure, and build the new version before you begin this tutorial\. See [Manage Lumberyard projects with Project Configurator](wg-project-configurator.md) for details on using **Project Configurator** to set up and build your default project\.

## Update your soundbank with Wwise<a name="tutor-ch09-update-soundbank"></a>

In the first part of this audio tutorial, you will use the Wwise project that we have already started for you\. Wwise projects are used to:
+ Import, group, and manage your sound assets
+ Set up sound events that can be called from your game
+ Generate a soundbank that can be read by Lumberyard's **Audio Controls Editor**

We're going to begin with a brief introduction to Wwise, where we'll import a new sound asset and create a new sound event for the game\. Then we'll update the soundbank before we head over to the Lumberyard Editor\. If you are already familiar with all of these features in Wwise and want to skip ahead to the next section on adding sound effects to your game, complete the following tasks first:
+ Import `Chicken2.wav` from `WelcomeGuideTutorials\SoundAssets` into the `Chicken_Squawk` container\.
+ Create the `Play_Chicken_Squawk` and `Stop_Chicken_Squawk` events\.
+ Generate the soundbank\.

For detailed instructions on how to perform those tasks, continue with the following steps\.

1.  Open **Wwise** by choosing the Wwise LTX icon from your desktop or Start menu\. If this is the first time that you are running Wwise, you will be prompted to accept a license agreement in order to proceed\.

1.  In the **Project Launcher** dialog box, choose **Open Other…​**\.

1.  Navigate to the `WelcomeGuideTutorials\Sounds\wwise_project` directory in your Lumberyard installation and select the Wwise project file named `WelcomeGuideTutorials.wproj`\.

   You should now have the WelcomeGuideTutorials Wwise project open in the Wwise project editor\.

1.  Choose the **Audio** tab, then open the **Actor\-Mixer Hierarchy** folder, the **Default Work Unit** category, and the **SFX** virtual folder\. You will see two Wwise "random containers": **Chicken\_Squawk** and **Farm\_Background**\. Random containers enable you to group a series of sounds and configure how they are selected randomly upon playback\.

1.  Open the **Farm\_Background** container to see two sounds: **Farm1** and **Farm2**\.
![\[Wwise tutorial audio\]](/images/welcomeguide/wwise-ui-tutorial-audio.png)

   You can listen to these sound effects using the playback controls in the **Transport Control** view at the bottom of the Wwise editor\. To do this, select a container or a specific sound and click the **Play** button\.
![\[Wwise Transport Control view\]](/images/welcomeguide/wwise-ui-transport-control.png)

   You might also want to peruse the settings that define how these ambient background sounds are selected during playback:

   1.  With the **Farm\_Background** selected in the **Project Explorer** view, notice in the **Property Editor** window that **Play Type** is set to **Random** and **Standard**, while the **Avoid repeating last** checkbox is not checked\. This enables either of the two sounds to be chosen at random, without regard to which sound was last chosen\.

   1.  The **Play Mode** is set to **Continuous** with a **Loop** that is set to **Infinite**\. This enables the sounds to loop as we play them in the background, selecting from the two available sounds each time it loops\.

   1.  The **Weight** of a sound in the **Contents Editor** determines the probability of that particular sound getting chosen at random\.

   For more details on all of these settings, use the help provided with Wwise by opening the **Help** menu and choosing **Wwise Help**, or by pressing the **F1** key\.

1.  Right\-click the **Chicken\_Squawk** container so that we can import a new variation of the squawking sound\.

1.  Choose **Import Audio Files…​**\.
![\[Wwise container context menu\]](/images/welcomeguide/wwise-ui-import-audio-files.png)

1.  In the **Audio File Importer** dialog box, choose **Add Files…​**\.

1.  In the file browser dialog box, navigate to the `WelcomeGuideTutorials\SoundAssets` directory, select `Chicken2.wav`, and choose **Open**\.
**Tip**
Another way to choose sound asset files for import is to drag the \.wav files from Windows Explorer and drop them into the Actor\-Mixer Hierarchy\. Doing this will automatically open the **Audio File Importer** dialog box with the files already selected\.

1.  In the **Audio File Importer** dialog box, choose **Import** to add a second sound effect to the **Chicken\_Squawk** container\. You should now have two sound effects in the container: **Chicken1** and **Chicken2**\. Feel free to adjust the weights of each sound in the container using the controls in the **Contents Editor**\.

1.  For Lumberyard to play these sounds, we need to create Wwise sound events\. Typically, you will create two events for each sound effect: *play* and *stop*\.

   1.  Right\-click the **Chicken\_Squawk** container, highlight **New event**, and choose **Play**\.

   1.  Right\-click the **Chicken\_Squawk** container again, highlight **New event**, highlight **Stop**, and choose **Stop**\.

   1.  Choose the **Events** tab\. You should now have a **Play\_Chicken\_Squawk** and a **Stop\_Chicken\_Squawk** event listed under the **Default Work Unit** in this tab\.

      For organizational purposes, feel free to drag and drop these two events to the **SFX** folder if you would like\.
![\[Wwise tutorial sound events\]](/images/welcomeguide/wwise-ui-tutorial-events.png)

   We've imported a new sound and created new sound events for the container\. Now we need to save the project and then regenerate the sound bank so that our Lumberyard game can find them\.

1.  Open the **Project** menu and choose **Save**\.

1.  Generate the soundbank\.
   + To do this in Wwise LTX, choose the **Generate Soundbank** button, just below the menu bar\.
   + To do this in the full version of Wwise, right\-click the **Soundbank** folder and select **Generate Soundbank\(s\) for all platforms**\.

   A window should open where you can observe the progress of the soundbank generation\. Once completed, **Generating SoundBanks \- Completed** should appear in the title of the window\. Review the status displayed in the window to verify that generation was successful\. If soundbank generation was unsuccessful, review the information contained in the log section of the window\. Consult Wwise documentation \(press **F1**\) for help troubleshooting\.

   Soundbank files are generated in the `WelcomeGuideTutorials\Sounds\wwise` directory\.

   You can close or minimize the Wwise application now and continue to the next section of the tutorial\.

## Add sound effects to your game<a name="tutor-ch09-add-sound-effects-to-game"></a>

Begin the Lumberyard part of this tutorial either with the level you created in [Tutorial Eight: Create environment props with White Box and slices](tutor-ch08-create-props-with-slices.md), or by opening `ch08_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you're using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.
![\[Lumberyard select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Open the **Tools** menu, highlight **Other**, and choose the **Audio Controls Editor**\.

   The Audio Controls Editor \(ACE\) maps Audio Translation Layer \(ATL\) controls to sound event controls in your audio engine\. The ACE editor and the ATL specification are modules that are part of the **Audio System** gem, and are designed to be flexible with your choice of audio engine\. To use an audio engine with the ACE, you must have a gem that integrates support for it using the ATL specification\. Support for the Wwise audio engine is included with Lumberyard using the **Wwise Audio Integration** gem\. In this tutorial we have added both the **Audio System** gem and the **Wwise Audio Integration** gem to the project configuration to enable support for Wwise\.

   We have already added control mappings for the background sound, the default events, and the preload of the soundbank that you updated earlier in this tutorial\. Open the folders under **ATL Controls** to see these mappings\.
![\[Audio Controls Editor current mappings\]](/images/welcomeguide/ui-audio-incomplete-atl-mapping-1.27.png)

   You can learn more about the default events and the Wwise soundbank preload in the User Guide section on [Setting up a Wwise project](/docs/userguide/audio/wwise-project-setting-up)\.

1.  To play the chicken squawking sound, you need to add new mappings to the corresponding *play* and *stop* sound events that were defined in Wwise\. To map ATL controls to these events, drag both the **Play\_Chicken\_Squawk** event and the **Stop\_Chicken\_Squawk** event from the **Wwise Controls** column to the **SFX** folder in the **ATL Controls** column\.
![\[Audio Controls Editor completed mappings\]](/images/welcomeguide/ui-audio-completed-atl-mapping-1.27.png)

1.  Open the **File** menu and choose **Save All** to save your updated ATL mappings\. You can also close the Audio Controls Editor, since the remainder of this tutorial will be using the Lumberyard Editor\.

1.  After you first add audio support to your project, or when you update your soundbank in Wwise while the Lumberyard Editor is running, you should referesh the Lumberyard audio system\. Open the **Game** menu in the Lumberyard Editor and choose **Audio**, then **Refresh Audio**\.

1.  Now we are ready to add an audio trigger to the chicken\. We are going to make the chicken squawk when the *jump* key is pressed\. Open **Script Canvas** and open the chicken movement graph that you created in an earlier chapter\. One way to open this graph efficiently is to select the chicken entity, find its **Script Canvas** component in **Entity Inspector**, and then click on the **Open in Script Canvas Editor** button\.

1.  Find the **On Pressed** event in the **Input** node that's responding to the chicken's jump input event\. Click and drag from its **Out** pin and then release to open a menu that will enable you to create another node after this event that will execute when a jump starts\.

1.  Type `play` in the search box of the menu and scroll if needed to find the **Play** node under **Audio \- Audio Trigger**\. Click on the **Play** node to create it\.
![\[Creating a Play audio trigger node in Script Canvas\]](/images/welcomeguide/ui-script-canvas-create-play-audio-node-1.27.gif)

1.  Press **Control \+ S** to save the graph, and close the **Script Canvas** window\.

1.  With the `player_chicken` entity selected, use **Entity Inspector** to add an **Audio Trigger** component and an **Audio Proxy** component to the chicken\.

1.  In the **Audio Trigger** component, click the folder icon by the **Default 'play' Trigger** field to open the **Choose Trigger…​** dialog box\.

1.  Open the **SFX** folder and choose the **Play\_Chicken\_Squawk** control\. Click **OK**\.
![\[Lumberyard audio trigger\]](/images/welcomeguide/ui-audio-trigger-chicken-1.27.png)

1.  Run the game using **Control \+ G** to try it out\! Jump a few times and listen for the two squawk variations\. Press **Esc** to return control to the Editor when you're ready to proceed\.

1.  To create a looping sound track, create a new entity anywhere in your level and call it `ambient_sound`\.

1.  Add an **Audio Trigger** component and an **Audio Proxy** component to the `ambient_sound` entity\.

1.  For the **Default 'play' Trigger**, select the **Play\_Farm\_Background** control\.

1.  For the **Default 'stop' Trigger**, select the **Stop\_Farm\_Background** control\.

1.  Finally, turn the **Plays immediately** switch **on**\.

1.  Run the game again using **Control \+ G** to try it out\! You should hear farm animal noises playing\. If you listen closely for a minute or so, you should also encounter the two variations of this looping sound effect\.