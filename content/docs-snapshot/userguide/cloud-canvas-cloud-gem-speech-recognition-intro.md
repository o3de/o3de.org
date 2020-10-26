# Speech Recognition Cloud Gem<a name="cloud-canvas-cloud-gem-speech-recognition-intro"></a>

You can use the Speech Recognition Cloud Gem to add speech recognition and natural language processing to your Lumberyard game\. The Speech Recognition Cloud Gem uses the [Amazon Lex service](https://aws.amazon.com/lex/), which recognizes the intent of spoken player input so that your game can react accordingly\. Your players can use natural language and do not have to memorize or use specific phrases to initiate commands\.

**Topics**
+ [Bots, Intents, Slots, and Elicitations](#cloud-canvas-cloud-gem-speech-recognition-intro-bots-intents-slots-and-elicitations)
+ [Using the Speech Recognition Sample Level](cloud-canvas-cloud-gem-speech-recognition-sample-level.md)
+ [Speech Recognition Cloud Gem Portal \(Preview\)](cloud-canvas-cloud-gem-speech-recognition-cgp.md)
+ [Speech Recognition Cloud Gem API](cloud-canvas-cloud-gem-speech-recognition-api.md)

## Bots, Intents, Slots, and Elicitations<a name="cloud-canvas-cloud-gem-speech-recognition-intro-bots-intents-slots-and-elicitations"></a>

To use Amazon Lex, you create a `bot`, which is a collection of one or more `intents`\. An intent is an action that a player wants to perform or have performed\. Intents can have conceptual variables called `slots`\. Slots are placeholders for objects of a certain category\. For example, if your game had an intent to switch weapons, the intent would have a slot called `weapon`\. The weapon slot could have values like `pistol`, `shotgun`, or `railgun`\. In your game, the player could say "change weapon to shotgun\." If the player says only "change weapon," the intent is clear but the slot is missing, so Amazon Lex returns an `elicitation` \(follow\-up question\)\. The elicitation might be "Switch to which weapon?", at which point the player can specify a weapon verbally\.

To create, edit, and export bots, you can use the Amazon Lex console at [https://console\.aws\.amazon\.com/lex/](https://console.aws.amazon.com/lex/)\. You can use the Speech Recognition Cloud Gem Portal to create bots and import bots into your game\. Lumberyard includes a sample bot in the Speech Recognition Sample Level\. To try the sample level, see [Using the Speech Recognition Sample Level](cloud-canvas-cloud-gem-speech-recognition-sample-level.md)\.

For information about using the Speech Recognition Cloud Gem Portal, see [Speech Recognition Cloud Gem Portal \(Preview\)](cloud-canvas-cloud-gem-speech-recognition-cgp.md)\.

For information about Amazon Lex, see the [Amazon Lex Developer Guide](https://docs.aws.amazon.com/lex/latest/dg/)\.