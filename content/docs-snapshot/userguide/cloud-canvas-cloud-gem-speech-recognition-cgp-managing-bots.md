# Managing Bots<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-managing-bots"></a>

****  
This feature is in preview release and is subject to change\.

You use the **Bots** tab to manage your Amazon Lex bots\.

**To manage bots**

1. Open the Cloud Gem Portal by doing one of the following:
   + In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal**\.
   + If you have been given a shareable link to the Cloud Gem Portal \(for example, by another team member\), open the link in a browser\. Lumberyard does not have to be installed on your computer\.

1. Enter your user name and password at the sign\-in page\.

1. On the **Cloud Gems** page, click **Speech Recognition**\.

1. Click the **Bots** tab\.  
![\[Click Create Bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-bots-tab.png)

This example uses the sample bot located at `\dev\CloudGemSamples\Levels\CloudGemSpeechRecogintionSample\lex_test.json`\.

**Note**  
 The misspelling of 'Recognition' in the path to the sample bot will be fixed in a future release\. 

## Creating a Bot<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-creating-a-bot"></a>

Click **Create Bot** on the Bots tab to create a bot\.

![\[Creating a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-2a.png)

The **Bot name**, **Session timeout**, and **COPPA** settings are required\. 

**Note**  
Although it is easier to create and edit bots with the Cloud Gem Portal, you can also use the Amazon Lex console at [https://console\.aws\.amazon\.com/lex/](https://console.aws.amazon.com/lex/)\. For more information, see [Create an Amazon Lex Bot \(Console\)](https://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html)\. For technical information, see the [aws\-lex\-web\-ui/templates/](https://github.com/awslabs/aws-lex-web-ui/tree/master/templates) page on GitHub\.com\.

## Importing a Bot<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-importing-a-bot"></a>

To import an Amazon Lex bot from a local `.json` file, click **Import Bot** on the **Bots** tab\.

![\[Importing a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-bots-tab-import-bot.png)

Use the file browser to choose the file\. When you do so, Amazon Lex automatically builds a machine learning model for the bot\. The build can take some time to finish\.

## Building a Bot<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-building-a-bot"></a>

To build a bot manually, choose **Build** from the menu for the bot on the **Bots** tab\.

![\[Build a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-build-bot.png)

Amazon Lex builds a machine learning model for the bot\. The build can take some time to finish\.

## Publishing a Bot<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-publishing-a-bot"></a>

Amazon Lex supports publishing versions of bots, intents, and slot types so that you can control the implementation that your client applications use\. To publish a bot, choose **Publish** from the menu for the bot\.

![\[Provide a bot alias\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-4.png)

You must provide an Amazon Lex alias to publish a bot\. An `alias` is a pointer to a specific version of a bot with which you can easily update the version that your client application uses\. For more information about versioning and aliases, see [Versioning and Aliases](https://docs.aws.amazon.com/lex/latest/dg/versioning-aliases.html) in the [Amazon Lex Developer Guide](https://docs.aws.amazon.com/lex/latest/dg/)\.

## Viewing Bot Versions<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-viewing-bot-versions"></a>

To view the versions of a bot, click the arrow to the left of the bot name to expand the version list\.

![\[Viewing bot versions\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-viewing-bot-versions.png)

## Exporting a Bot<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-exporting-a-bot"></a>

To export a bot, use the **Bots** tab\. Choose **Export** from the menu for the bot\. This action downloads a `.json` file that contains the bot definition\.

![\[Exporting a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-export-bot.png)

## Deleting a Bot<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-removing-a-bot"></a>

To delete all versions of a bot, click the delete icon for the bot on the main Speech Recognition page\.

![\[Deleting a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-removing-a-bot.png)