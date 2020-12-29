# Setting up Wwise LTX<a name="audio-wwise-using"></a>

Lumberyard includes Audiokinetic Wwise LTX, which is an exclusive, free version of the Audiokinetic Wwise audio middleware\. Sound designers and composers can use Wwise LTX to work independently from the engineering team and author rich soundscapes for your games\.

If your game requires advanced features, you can upgrade to the full version of Wwise\. For more information, see [Upgrading Wwise LTX to the Full Version](audio-wwise-upgrade.md)\.

**Topics**
+ [Installing Wwise LTX Authoring Tool](#audio-installing-wwise)
+ [Running the Wwise LTX Authoring Tool](#audio-setting-wwise-authoring-tool)
+ [Accessing Wwise LTX Documentation](#audio-wwise-using-documentation)

## Installing Wwise LTX Authoring Tool<a name="audio-installing-wwise"></a>

To author sounds with Wwise LTX for your game, you must first install Wwise LTX Authoring Tool\.

**To install Audiokinetic Wwise LTX Authoring Tool**

1. Run [Lumberyard Setup Assistant](lumberyard-launcher-using.md)\.

1. Choose **Install software**\.

1. Locate **Audiokinetic Wwise LTX Authoring Tool** entry under Optional software and choose **Install it**\. This runs the Wwise Launcher\.

1. If prompted to sign in to your Audiokinetic account, provide the requested information and choose **Log in**, or choose **Sign up now** to create an account\.

1. Select the desired installation components and settings for Wwise LTX or accept the default, and then choose **Next**\.
**Note**  
The Wwise LTX SDK is already included in Lumberyard's `3rdParty` directory\. If you prefer a lightweight install, you can clear the SDK component and all the deployment platforms\.

1. Review and update the installation Target Directory as needed, then choose **Install**\.

1. Review the license terms, then choose **Accept** if you wish to proceed with installation\.

1. Once the installation successfully completes, close the **Wwise Launcher** and return to Lumberyard Setup Assistant\. It should now show that Wwise LTX is installed\. You can now close Lumberyard Setup Assistant\.
**Note**  
Lumberyard does not require installation of the new version of Wwise listed in the Wwise Launcher\.

## Running the Wwise LTX Authoring Tool<a name="audio-setting-wwise-authoring-tool"></a>

To run the Wwise LTX Authoring Tool, you must first open or create a project\. The Samples Project and Starter Game both include a Wwise LTX audio project that you can use\.

**To run the Wwise LTX Authoring Tool from Wwise Launcher**

1. Run **Wwise Launcher**\.

1. Choose the **Wwise** tab, locate the LTX installation and choose **Launch Wwise \(64\-bit\)**\. If preferred, choose the wrench icon to open a menu and choose **Create Desktop Shortcut** for quicker launch of the authoring tool next time\.

1. If this is your first time running Wwise LTX, you are prompted again to review and accept the End\-User License Agreement \(EULA\)\. After accepting the EULA, choose **Open Other** in the **Project Launcher** dialog box\. With successive use of the Wwise Launcher, you will be able to select from recently opened Wwise projects and choose **Open Selection**\.

1. Browse to one of the following directories, select the `.wproj` file that you find there, and choose **Open**:
   + `lumberyard_version\dev\SamplesProject\Sounds\wwise_project`
   + `lumberyard_version\dev\StarterGame\Sounds\wwise_project`

1. Alternatively, if you are not using the Samples Project or the Starter Game project, you can choose **New** in the **Project Launcher** dialog box to create a Wwise LTX project\.

   For more information about setting up Wwise for your game project, see [Setting up a Wwise Project](audio-wwise-project-setting-up.md)\.

## Accessing Wwise LTX Documentation<a name="audio-wwise-using-documentation"></a>

You can access the Wwise LTX documentation in the Wwise Authoring Tool\.

**To access Wwise LTX documentation**

1. Run the **Wwise LTX Authoring Tool**\.

1. On the **Help** menu, choose **Wwise Help**\.