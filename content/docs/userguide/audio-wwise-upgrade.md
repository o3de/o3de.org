# Upgrading Wwise LTX to the Full Version<a name="audio-wwise-upgrade"></a>

To upgrade Wwise LTX to the full version of Wwise, follow the procedures in this topic\.

**Topics**
+ [Upgrading the SDK](#audio-wwise-upgrading-sdk)
+ [Upgrading Your Project](#audio-wwise-upgrading-project)
+ [Upgrading Your Soundbanks](#audio-wwise-upgrading-soundbanks)

After you upgrade the SDK, project, and soundbanks, you can open your game in Lumberyard to test your sounds\. 

## Upgrading the SDK<a name="audio-wwise-upgrading-sdk"></a>

**To upgrade the SDK**

1. Open **Wwise Launcher**\. If you don't have it, install it from [https://www.audiokinetic.com/download](https://www.audiokinetic.com/download)\.

1. On the **WWISE** tab, under **Install New Version**, click the dropdown menu, and select **Wwise 2018\.1\.4\.6807**, which is the version supported by Lumberyard\.

1. Click **Install**\.

1. For **Packages**, select **SDK \(C\+\+\)**\.

1. For **Deployment Platforms**, select the platforms required for your project\.

   Some platform components are available only after you purchase them from Audiokinetic\. For more information about licensing, see [https://www.audiokinetic.com/pricing](https://www.audiokinetic.com/pricing)\.

1. Enter the installation directory and click **Next**\.

1. Select the plugins to install, and click **Install**\.

1. After installation completes, navigate to the `lumberyard_version\3rdParty\Wwise` directory\.

1. Create a directory named **`2018.1.4.6807`**\.

1. Navigate to the Wwise installation directory that you specified in step 6, and copy the `SDK` directory into the `lumberyard_version\3rdParty\Wwise\2018.1.4.6807` directory\.

1. To verify that Lumberyard recognizes the Wwise installation and configuration:

   1. Run Lumberyard Setup Assistant\.

   1. On the **Install optional SDKs** page, verify that a green checkmark appears next to **Audiokinetic Wwise**\.

1. Navigate to the `lumberyard_version\dev\Gems\AudioEngineWwise\Code` directory\. 

1. In a text editor, open the `wscript` file\.

1. Edit the `wwise_flavor` parameter from `WWISELTX` to **WWISE** and save the file\.

   This instructs the WAF build system to use Wwise instead of Wwise LTX\.

1. Configure WAF and build the project\. For more information, see [Building Lumberyard projects](game-build-intro.md)\.

## Upgrading Your Project<a name="audio-wwise-upgrading-project"></a>

After you successfully configure and build Lumberyard, you can upgrade the content in your project\. This assumes that you already have a Wwise LTX project set up for your game project\.

Follow this procedure to upgrade an existing Wwise LTX project to use the full version of Wwise\.

**Prerequisites**  
If your Wwise LTX project and soundbanks are under source control, you must check them out\. Check out the entire `lumberyard_version\dev\game_project\Sounds` directory\. After you upgrade your project, select the files that were created, and then revert any unmodified files before you submit them\.

**Important**  
During the upgrade process, read each message that Wwise displays\.

**To upgrade your project**

1. Open **Wwise Launcher**\.

1. On the **WWISE** tab, in the **Versions Installed** list, find **2018\.1\.4\.6807**\. Verify that the full revision is listed\.

1. Click **Launch Wwise \(64\-bit\)**\.

1. If this is the first time running Wwise Authoring Tool for this version, an End\-User License Agreement \(EULA\) dialog appears\. Review and accept the EULA\.

1. In the **Project Launcher** dialog, click **Open Other**, and open the `file_name.wproj` file for your game project\. 

   You can find this file in the `lumberyard_version\dev\game_project\Sounds\wwise_project` directory\.
   + If a message appears stating that you are upgrading from an earlier version of Wwise, you must upgrade the Wwise project XML schema\. The message lists the files to be updated and highlights any files that are read\-only\.
   + The message also states that this action is a one\-way project upgrade\. This means that the upgraded project no longer loads with Wwise LTX\. You can back up of your Wwise LTX project before you click **Yes** in this message\.
   + The **Project Load Log** message displays all the changes made\. You might see information about default work units that were missing and created when you upgraded\. 
   + If your Wwise project is under source control, ensure that you add these `.wwu` files to your depot\. 

1. Close the message and save the Wwise project\. 

Wwise LTX uses a single generic platform\. After upgrading to Wwise, you can edit the platforms for your project\.

## Upgrading Your Soundbanks<a name="audio-wwise-upgrading-soundbanks"></a>

After you upgrade the SDK and your project, you can rebuild your soundbanks\.

**Note**  
Wwise LTX uses a single **Generic** platform\. You can edit the platforms by going to **Project**, **Platform Manager**\. If you change the platforms, you must reopen your project\.

**To upgrade your soundbanks**

1. Open your project in Wwise\.

1. Click **Project**, **License Manager**\.

1. Choose to either import your license or paste it from the clipboard\.

1. Click **Save**\.

1. Navigate to **Project**\. Click **Project Settings** or press **Shift\+K**, and select the **SoundBanks** tab\.

1. For each platform in your project, click the ellipsis to open the **Post\-Generation Step** editor\.

   1. In the **Post\-Generation Step** editor, click **Load**, **From Last Location**\.

   1. Navigate to the `lumberyard_version\dev\Tools\WwiseAuthoringScripts` directory, select the `ly_copy_output_and_generate_metadata.wcmdline` file, and click **Open**\.

   1. Click **OK** in the **Post\-Generation Step** editor\.

1. Click **OK** in the **Project Settings** window\.

1. Open the **SoundBank Layout**\. Press **F7** or click **Layouts**, **Soundbank**\.

1. Select all **SoundBanks**, **Platforms**, and **Languages**\.

1. Click **Generate**\. The **Generating SoundBanks** dialog displays the progress\.

   The most common errors encountered during the generate process are caused by read\-only files or by not having a license applied to the project\.

Lumberyard is now using the full version of Wwise\. You can now run Lumberyard Editor and your game to test your sounds\.