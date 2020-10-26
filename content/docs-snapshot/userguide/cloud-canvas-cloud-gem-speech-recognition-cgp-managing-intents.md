# Managing Intents<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents"></a>

****  
This feature is in preview release and is subject to change\.

Use the **Intents** tab on the **Speech Recognition** page to create and manage intents\. The intents that you create here must be manually added to the bots for which you want to use the intents\.

**To manage intents**

1. Open the Cloud Gem Portal by doing one of the following:
   + In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal**\.
   + If you have been given a shareable link to the Cloud Gem Portal \(for example, by another team member\), open the link in a browser\. Lumberyard does not have to be installed on your computer\.

1. Enter your user name and password at the sign\-in page\.

1. On the **Cloud Gems** page, click **Speech Recognition**\.

1. Click the **Intents** tab\.

![\[Managing intents\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-numbered.png)

1. To create an intent, click **Create Intent**\. You must enter a unique name for the intent\.

1. To choose the type of intent that is shown in the table, click **Custom** or **Built\-in**\.

1. To view the versions of an intent, click the arrow to the left of the intent name to expand the version list\.

1. To edit the intent, click the name of the intent\. For details, see the steps in **To edit an intent** in the next section\. 

1. To see a list of the bots that are using the intent \(intent dependencies\), click **View Bots**\. 

**To edit an intent**

1. In the list of intents, click the name of the intent that you want to edit\.  
![\[Click the name of the intent\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-click-name.png)

   Note the following restrictions:
   + For custom intents, you must provide at least one utterance\.
   + For intents based on built\-in intents, you cannot modify the utterances or slots\. You can use the **Lambda initialization and validation** and **Confirmation prompt** features [as usual](cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots.md)\.

1. A slot can have multiple prompts\. To view all the prompts for a slot, click the gear icon in the **Prompt** column\.   
![\[See all prompts for a slot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-slot-gear-icon.png)

   The following image shows sample prompts for the **MapLocation** slot\.  
![\[Multiple prompts for one slot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-multiple-slot-prompts.png)

1. To set the slot type version, choose the version from the menu in the **Slot type and version** column\.   
![\[Choose slot version\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-slot-version.png)

1. To change the slot priority, click the up or down arrow in the row for the slot\.  
![\[Change slot priority\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-slot-priority.png)

**To add intents to a bot**

1. Select the check boxes for the intents that you want to add to the bot\. Then on the upper right, click **Add to bot**\.  
![\[Adding intents to a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-choosing-intents-for-bot.png)

1. From the list of existing bots, choose the bot for the intents, and then click **Add**\.  
![\[Choose bot for the intents\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-add-to-bot.png)