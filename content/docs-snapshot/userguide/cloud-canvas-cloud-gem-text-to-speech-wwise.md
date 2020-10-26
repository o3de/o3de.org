# Creating a Wwise Project for Runtime Text\-to\-Speech<a name="cloud-canvas-cloud-gem-text-to-speech-wwise"></a>

You can use the Audiokinetic Wwise audio system in Amazon Lumberyard to implement Text\-to\-Speech Cloud Gem features in your game project\. To use Wwise to integrate sound into your Lumberyard game, you perform the following major steps:

1. [Create a Wwise sound project](#cloud-canvas-cloud-gem-text-to-speech-wwise-create-a-wwise-sound-project)\. 

1. [Create a sound in the Wwise project](#cloud-canvas-cloud-gem-text-to-speech-wwise-create-a-sound)\. 

1. [Create an event to trigger the sound](#cloud-canvas-cloud-gem-text-to-speech-wwise-create-an-event)\. 

1. [Generate the soundbank file and save the Wwise project](#cloud-canvas-cloud-gem-text-to-speech-wwise-generate-soundbank-file-and-save-wwise-project)\. 

1. [Integrate the Wwise project with your game project](#cloud-canvas-cloud-gem-text-to-speech-wwise-integrate-wwise-project-with-game-project)\. 

For the first four steps, you use the Audiokinetic Wwise authoring tool\. For the last step, you use the Audio Controls Editor in Lumberyard Editor\.

## Prerequisites<a name="cloud-canvas-cloud-gem-text-to-speech-wwise-prerequisites"></a>

Audiokinetic Wwise LTX – Audiokinetic Wwise LTX is an exclusive, free version of the Audiokinetic Wwise audio system for PC games that is included with Lumberyard\. For installation information, see [Setting up Wwise LTX](audio-wwise-using.md)\.

## Create a Wwise Sound Project<a name="cloud-canvas-cloud-gem-text-to-speech-wwise-create-a-wwise-sound-project"></a>

To create a Wwise sound project and its associated directories, you use the Wwise authoring tool\.

**To create a Wwise sound project**

1. [Run the Wwise LTX tool](audio-wwise-using.md#audio-setting-wwise-authoring-tool)\.

1. In the **Project Launcher** dialog box, click **New**\.  
![\[Click new\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-1.png)

1. In the **New Project** dialog box, specify the directory for the sound project files\. Lumberyard requires that your sound project files \(`.wproj` file and subdirectories\) be placed in the `dev\game_project\Sounds\wwise_project\` directory\.  
![\[Specify the sound project directory\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-2.png)

1. Click **OK**\. Your project appears in the `wwwise_project` directory that you specified\.

## Create a Sound in the Wwise Project<a name="cloud-canvas-cloud-gem-text-to-speech-wwise-create-a-sound"></a>

To create a sound, you use the **Audio** tab of the Wwise authoring tool\.

**To create a sound in the Wwise project**

1. In the Wwise **Project Explorer** panel, create a directory under **Actor\-Mixer Hierarchy**\. Right\-click **Default Work Unit,** and then choose **New Child**, **Virtual Folder**\.  
![\[Create a virtual directory\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-3.png)

1. Give the directory a name\.  
![\[Name the directory\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-4.png)

1. Create a sound object\. Right\-click the directory that you created, and then choose **New Child**, **Sound SFX**\.

1. Give the sound a name\.  
![\[Create and name a sound object\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-5.png)

## Create an Event to Trigger the Sound<a name="cloud-canvas-cloud-gem-text-to-speech-wwise-create-an-event"></a>

After you create a sound, you create an event with which you can trigger the sound from the context of your game\.

**To create a sound trigger event**

1. Under **Actor\-Mixer Hierarchy**, select your new sound\.

1. In the project view **Contents Editor** pane, click **Add Source**, and then select **Wwise Audio Input**\.  
![\[Add the Wwise audio input source\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-6.png)

1. Right\-click the sound that you created\. Choose **New Event**, **Play** to create an event that can trigger the sound\.  
![\[Create an event\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-7.png)

   A new event is created with the default name of `Play_{sound-name}_{nn}`\. You can specify a different name if you want\. The event ID appears on the upper right\.  
![\[Created sound event\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-8.png)

## Generate the Soundbank File and Save the Wwise Project<a name="cloud-canvas-cloud-gem-text-to-speech-wwise-generate-soundbank-file-and-save-wwise-project"></a>

After you have created an event for the sound, you generate a soundbank file and save the sound project\.

**To generate the soundbank and save the project**

1. In Wwise LTX, click **Generate Soundbank**\.  
![\[Generate soundbank file\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-generate-soundbank-file.png)

   If the **Generate Soundbank** button is not available in the version of Wwise that you are using, perform the following steps:

   1. Open SoundBank Manager\. Choose **Layouts**, **SoundBank**, or press **F7**\.

   1. In the **SoundBanks** pane, select the **Default Work Unit** check box\.

   1. In the **Platforms** pane, select **Windows**\.

   1. In the **Languages** pane, select **English \(US\)**\.

   1. Click **Generate**\.

1. In the **Generating SoundBanks \- Completed** window, click **Close**\.

1. In the Wwise **Project** menu, choose **Save**\.

## Integrate the Wwise Project with Your Game Project<a name="cloud-canvas-cloud-gem-text-to-speech-wwise-integrate-wwise-project-with-game-project"></a>

Now you are ready to use Lumberyard's Audio Controls Editor to integrate your Wwise sound project with your Lumberyard game project\.

**To integrate the Wwise sound project with your Lumberyard game project**

1. In Lumberyard Editor, choose **Tools**, **Other**, **Audio Controls Editor**\. Alternatively, click the headphone ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-9.png) icon\.

1. In the left panel of Audio Controls Editor, create a new directory\. This example creates a directory called `wwise`\.

1. In the **Wwise Controls** middleware pane \(the default location is on the far right\) you should see an item for each event that you created and a `.bnk` file\. The `.bnk` file is the soundbank file that you generated\.  
![\[Generated sound files\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-10.png)

   Drag these items from the **Wwise Controls** pane to the directory that you created on the left\. This step alerts your game to the presence of the Wwise objects\.

1. Click the item on the left that was created from the `.bnk` file\. The **Inspector** panel inspects the object\.

1. If the list under **Preloaded Soundbanks** is empty, drag the `.bnk` file from the **Wwise Controls** panel into the list of preloaded soundbanks\.  
![\[Drag the soundbank file\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-text-to-speech-wwise-11.png)

1. In the **Audio Controls Editor**, choose **File**, **Save All**\.