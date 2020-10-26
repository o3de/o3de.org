# Setting up a Wwise Project<a name="audio-wwise-project-setting-up"></a>

The **Audio Controls Editor** looks for Wwise project files in the `lumberyard_version\dev\game_project\Sounds\wwise_project\` directory\.

Lumberyard looks for the Wwise Soundbanks in the `lumberyard_version\dev\game_project\Sounds\wwise\` directory\.

## Creating a Wwise Project<a name="audio-wwise-creating-new-project"></a>

**To create a Wwise project**

1. From the Start menu, open **Wwise Launcher**\.

1. On the **WWISE** tab, click **Launch Wwise \(64\-bit\)**\.
**Note**  
If you have multiple versions of Wwise installed, open the version that you installed for Lumberyard\.

1. In the **Project Launcher** dialog, click **New**\.

1. In the **New Project** dialog, enter a **Name** for the project\.
**Note**  
Wwise uses the name of your project to create a directory with the same name\. However, you later rename the directory `wwise_project`\.

1. For the **Location**, select the `lumberyard_version\dev\game_project\Sounds` directory\. If this directory doesn't exist, create it\.

1. Review and adjust the remainder of the options and then click **OK**\.

1. If you are using the full version of Wwise, the **License Manager** dialog appears\. Paste or import your license key if you have one and click **Save**\. 

   If you don't have your license key, click **Close**\. 

1. Exit Wwise\.

1. In a file explorer, navigate to the `lumberyard_version\dev\game_project\Sounds` directory\.

1. Rename the project directory you created in step 4 to **wwise\_project**\.

1. Create another directory next to `wwise_project` called **wwise**, if it doesn't exist already\. This is where your Wwise soundbanks will be generated\.

1. Open Wwise again\.

1. Click **Open Other**\.

1. Navigate to the `lumberyard_version\dev\game_project\Sounds\wwise_project` directory\.

1.  Select the `.wproj` file and click **Open**\.

## Generating New Soundbanks<a name="audio-wwise-generating-new-soundbanks"></a>

**To generate new soundbanks**

1. If the Wwise project is not currently open, open it\.

1. Choose **Project**, **Project Settings**\.

1. On **SoundBanks** tab, in the **SoundBank Paths** section, edit the **SoundBank Folder** and select the `wwise` directory that you created in [Creating a Wwise Project](#audio-wwise-creating-new-project) and then click **OK**\.

1. If you are using Wwise LTX, click **Generate Soundbank**\.

   If you are using the Wwise full version:

   1. Press **F7** to open the **SoundBank Manager Layout**\.

   1. If no soundbanks exist, you must create one\.

      To create a soundbank, select all **SoundBanks**, **Platforms**, and **Languages**\.

   1. Click **Generate**\.

1. Ensure that the soundbank generation succeeded\. To do this, navigate to the `lumberyard_version\dev\game_project\Sounds\wwise` directory and verify that you have an `Init.bnk` file and other `.bnk` or `.wem` files\.

For information on how to map soundbanks to ATL preloads so that Lumberyard can load them, see [Using the Audio Controls Editor](audio-atl-editor.md)\.

## Creating Wwise Events for the Default ATL Controls<a name="audio-wwise-creating-events-default-atl-controls"></a>

**To create Wwise events for the default ATL controls**

1. If the Wwise project is not currently open, open it\.

1. Select the **Events** tab\.

1. Under the **Default Work Unit**, select or create a directory to contain default ATL controls\.

1. Right\-click the directory to display the context menu and choose **New Child**, **Empty Event**\.

1. Create five empty events named the following:
   + **do\_nothing**
   + **get\_focus**
   + **lose\_focus**
   + **mute\_all**
   + **unmute\_all**
**Note**  
The **get\_focus** and **unmute\_all** events unmute the Master Audio Bus\.
The **lose\_focus** and **mute\_all** events mute the Master Audio Bus\.

1. Save the project\.

1. [Generate soundbanks](#audio-wwise-generating-new-soundbanks)\.

1. In Lumberyard Editor, open the **Audio Controls Editor**\.

1. Map these Wwise events to the default ATL controls\.

1. Click **File**, **Save All**\.