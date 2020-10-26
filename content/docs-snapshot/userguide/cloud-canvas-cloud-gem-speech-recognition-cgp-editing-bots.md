# Editing Bots<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots"></a>

****  
This feature is in preview release and is subject to change\.

You can edit speech\-recognition bots in the Cloud Gem Portal\.

**To edit a bot**

1. Open the Cloud Gem Portal by doing one of the following:
   + In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal**\.
   + If you have been given a shareable link to the Cloud Gem Portal \(for example, by another team member\), open the link in a browser\. Lumberyard does not have to be installed on your computer\.

1. Enter your user name and password at the sign\-in page\.

1. On the **Cloud Gems** page, click **Speech Recogntion**\.

1. Click the bot's entry on the **Bots** tab to open the **Editor** tab\.

![\[Editing a bot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots.png)

**Note**  
 Only the latest version of a bot can be edited\. 

1. **Sample utterances** – Click **Add** to create one or more spoken or typed phrases that invoke your intent\. Use curly braces \{\} to insert slot names in the phrase\. For example, "I want to order a *\{size\}* pizza\."

1. **Lambda initialization and validation** – Use this option to specify a Lambda function that validates input\.

   1. Expand the **Lambda initialization and validation** option\.

   1. Select **Initialization and validation code hook**\.

   1. In the **Lambda function ARN** box, enter the ARN of the Lambda function that you want to perform the validation\.

1. **Slots** – Slots are data that the player must provide so that the player's intent can be fulfilled\. Use this option to add a slot or modify slots\.

   1. For **Name**, enter a name for the slot\.

   1. For **Slot type and version**, choose a slot type and version from the list\. You can create new slot types on the [Slot Types](cloud-canvas-cloud-gem-speech-recognition-cgp-managing-slot-types.md) tab of the **Speech Recognition** page\.

   1. For **Prompt**, enter the text of a question that elicits the information for the slot\. A slot can have multiple prompts\. 

1. **Confirmation prompt** – \(Optional\) Specify confirmation and cancellation messages\. After creation, click each gear icon to configure these settings\. 
**Note**  
 You must specify both the confirmation and cancellation messages, or neither\. You cannot specify one without the other\. 

## Adding an Intent<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-adding-an-intent"></a>

You can use the navigation pane on the left to add an intent to the current bot\.

**To add an intent to the current bot**

1. Click **Add** in the navigation pane\.   
![\[Adding an intent\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-adding-intent.png)

1. In the **Add Intent** window, create an intent or select an existing custom intent or built\-in intent\.   
![\[Add intent\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-add-intent-window.png)

1. Enter a new name for the intent\. You must provide a new name for built\-in intents\.  
![\[Renaming a built-in intent\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-add-intent-rename-built-in.png)

**Note**  
When you use a bot's **Editor** tab to create an intent, the intent is added to the bot automatically\. When you use the **Speech Recognition** [**Intents**](cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents.md) tab to create an intent, the intent must be added to manually to the bots that you want to use it\.

## Choosing an Intent Version<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-intent-version"></a>

You can configure a bot to use any version of an intent\. Use the menu for the intent to choose a version\.

![\[Choosing an intent version\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-intent-version.png)

**Note**  
 Only the latest version of an intent can be edited\.

You can also create and manage intents on the [Intents](cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents.md) tab\.

## Removing an Intent<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-removing-an-intent"></a>

To detach \(remove\) an intent from the bot, pause your pointer on the intent name and click the remove \(X\) icon\.

![\[Removing an intent\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-remove-intent.png)

**Note**  
If you are unable to detach intents from a bot and are using the Firefox browser, you can use the **Editor** tab for the bot on the Amazon Lex console at [https://console\.aws\.amazon\.com/lex/](https://console.aws.amazon.com/lex/)\. 

To delete an intent completely, use the [**Intents**](cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents.md) tab of the Cloud Gem Portal\. You must detach an intent from all bots before the intent can be deleted\.

## Editing Slot Types<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-slot-types"></a>

You can use the bot **Editor** tab to edit the slot types for the intents that have slot types\.

**To edit a slot type**

1. In the left navigate pane, click an intent that has a slot type\. When the intent name is selected, the intent's corresponding slot types appear under **Slot types**\.  
![\[Choosing an intent that has a slot type\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-intent-with-slot.png)

1. In the navigation pane, under **Slot types**, click the name of the slot that you want to edit\. The description and values for the slot appear in the details pane\.  
![\[Slot details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-intent-slot.png)

1. Change the slot description and add, edit, or delete values for the slot\. You can only edit the latest version of the slot type\.

1. To view all the prompts for a slot type, click the gear icon in the **Prompt** column\.   
![\[See all prompts for a slot type\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-slot-gear-icon.png)

   The following image shows sample prompts for the **MapLocation** slot type\.  
![\[Multiple prompts for one slot\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-managing-intents-multiple-slot-prompts.png)

## Error Handling<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-error-handling"></a>

Choose **Error handling** from the left navigation pane to add clarification prompts, specify the number of times to retry questions, or specify a hang\-up phrase\. 

![\[Error handling\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-error-handling.png)

## Bot Settings<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-settings"></a>

You can manage aliases and general information for a bot on the **Settings** tab to the right of the **Editor** tab\. 

**Note**  
The **Settings** tab for general information and aliases is available when the **Editor** tab is active\. The [Settings](cloud-canvas-cloud-gem-speech-recognition-cgp-linking-to-the-amazon-lex-console.md) tab that contains a link to the Amazon Lex console is available when the main **Speech Recognition** page is active\. 

### Aliases<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-settings-aliases"></a>

Use the **Aliases** details pane to view and manage your bot aliases\. As mentioned, an alias is a pointer to a specific version of a bot\. You specify an alias when you publish a bot\. You can use aliases to simplify updating the version of the bot that your client applications use\.

![\[Bot aliases\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-settings-aliases.png)

### General Information<a name="cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-settings-general"></a>

Use the **General** details pane to edit additional settings for your bot\. These include your bot's description, its session timeout, and whether the bot is subject to the Children's Online Privacy Protection Act \(COPPA\)\. For more information about COPPA and Amazon Lex, see the [Data and Security](https://aws.amazon.com/lex/faqs/#data-security) section of the Amazon Lex FAQ\.

![\[General bot settings\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-speech-recognition-cgp-editing-bots-settings-general.png)