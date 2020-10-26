# Using the Speech Recognition Sample Level<a name="cloud-canvas-cloud-gem-speech-recognition-sample-level"></a>

Before you can use the Speech Recognition Sample Level, you must prepare the necessary Cloud Canvas resources\. The sample level for the Cloud Gem Speech Recognition is located in the Lumberyard `\dev\CloudGemSamples\Levels\SpeechToTextSampleCloudGemSamples` directory\. The name of the sample level is `SpeechToTextSample`\.

## Preparing the Sample Level<a name="cloud-canvas-cloud-gem-speech-recognition-sample-level-preparing-the-sample-level"></a>

To prepare the sample level, you use the Cloud Gem Portal to import the sample Amazon Lex bot that is included with Lumberyard\. For more information about bots, see [ Bots, Intents, Slots, and Elicitations](cloud-canvas-cloud-gem-speech-recognition-intro.md#cloud-canvas-cloud-gem-speech-recognition-intro-bots-intents-slots-and-elicitations)\.

**To prepare the sample Level**

1. In the Lumberyard Project Configurator, select the **CloudGemSamples** project as the default project\. If you want to use a different project, ensure that the **Cloud Gem Speech Recognition** and **Cloud Gem Text\-to\-Speech** gems are selected, and then [build your project](game-build-intro.md)\.

1. In Lumberyard Editor, choose **AWS**, **Cloud Canvas**, **Resource Manager**\.

1. Click **Upload all resources** and follow the prompts to create your project stack, deploy required resources, and create the Cloud Gem Portal in an [Amazon Lex supported AWS region](https://docs.aws.amazon.com/general/latest/gr/rande.html#lex_region)\. The operations might take some time to complete\.

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

1. In the **Launching the Cloud Gem Portal** dialog box, copy your temporary credentials\.

1. In your web browser, use your temporary password to sign in to the Cloud Gem Portal, and then change your password when prompted\.

1. In the Cloud Gem Portal, choose **Speech Recognition**\.  
![\[Choose Speech Recognition\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-1.png)

1. In the Cloud Gem Portal, click **Create Bot**\.  
![\[Click Create Bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-2.png)

   In the preview version of the gem, this feature imports Amazon Lex bot files, which are in `.json` format\.

1. From the file explorer, select the following file from your Lumberyard installation: `dev\CloudGemSamples\Levels\SpeechToTextSample\lex_test.json`\.

   When the import is finished, **LYTestBot** appears in the list of bots\.  
![\[LYTestBot imported\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-3.png)

   The **Status** column shows **BUILDING** and then changes to **READY** when processing is completed\. At this point, the sample level is ready to use\.

   Starting in Lumberyard 1\.13, Cloud Gem Speech Recognition supports microphone input from Windows, iOS, MacOS, and Android operating systems\.

## Trying the Speech Recognition Sample<a name="cloud-canvas-cloud-gem-speech-recognition-sample-level-trying-the-speech-recognition-sample"></a>

The sample level uses a mini map of a simple multiplayer online battle arena \([MOBA](https://en.wikipedia.org/wiki/Multiplayer_online_battle_arena)\) game\. In a MOBA game, a team member might want to ask for help or warn another team member about the presence of an opponent in a particular location\.

The sample level uses the `RequestHelp` and `Ping` intents and the `MapLocation` slot to implement this functionality\. The intents and slot are specified in the `lex_test.json` file that you imported\.

**To try the speech recognition sample level**

1. In Lumberyard Editor, close the resource manager\.

1. Choose **File**, **Open**, **Levels**, **SpeechToTextSample**\.

1. Click **Play Game** or press **Ctrl\+G**\.

   The MOBA mini map appears\.  
![\[MOBA map\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-4.png)

1. Click and hold the **Hold To Talk** icon and ask for help\. Because the sample uses Amazon Lex, your spoken request must include the word "help" but does not have to have any particular phrasing\. Release the mouse button when you are finished speaking\. The built\-in voice conveys your request by saying "I need some help here\."
**Note**  
The preview version of the speech recognition gem does not have a wake word\.

1. Click and hold the **Hold To Talk** icon and say "ping" to warn about a danger in a location on the map\. In your spoken request, include one of the words "top," "middle," or "bottom" to specify a location on the map\. Your phrasing does not have to be exact\. Release the mouse button when you are finished speaking\.  
![\[Hold the button to talk\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-5.png)

   If you said "Ping the middle lane," the map highlights the middle of the map with a target\-like animation, and the voice says "Watch the middle lane\." The box on the upper left contains a transcript of the speech that was input and the intents and slots that were recognized\.

1. Try other locations, including "me" and "myself\." Using natural speech, vary your phrasing to confirm that your wording does not have to be exact\.

1. Press the **Hold To Talk** button again and say "ping" without specifying a location\. You are asked "Where should I ping?" In your follow\-up response, include one of the words "top," "middle," or "bottom\." The level responds with the animation and voice as before\.

1. To test the intents without using a microphone, enter a phrase in the text box on the bottom left and then click **Send Debug Text** or press **Enter**\.  
![\[Send debug text\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-6.png)

   As before, if you type only "ping" without specifying a location, you are prompted for one\.  
![\[Follow-up question\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-sample-level-7.png)

To learn more about the Cloud Gem Speech Recognition Cloud Gem Portal, see [Speech Recognition Cloud Gem Portal \(Preview\)](cloud-canvas-cloud-gem-speech-recognition-cgp.md)\.