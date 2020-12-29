# Message Of The Day Cloud Gem Portal<a name="cloud-canvas-cloud-gem-message-of-the-day"></a>

**Topics**
+ [Prerequisites](#cloud-canvas-cloud-gem-message-of-the-day-prerequisites)
+ [Accessing and Using the Message of the Day Cloud Cloud Gem](#cloud-canvas-cloud-gem-message-of-the-day-accessing-and-using)
+ [Other Cloud Gems](#cloud-canvas-cloud-gem-message-of-the-day-other-cloud-gems)
+ [Testing the Message of the Day Sample Level](cloud-canvas-cloud-gem-mod-testing.md)
+ [Cloud Gem Message of the Day Implementation Details](cloud-canvas-cloud-gem-mod-details.md)
+ [Cloud Gem Message of the Day API Calls](cloud-gem-mod-api.md)

You can use the Message of the Day Cloud Gem to schedule messages that your game consumes\. You can customize your project's message of the day using the Cloud Gem Portal\.

## Prerequisites<a name="cloud-canvas-cloud-gem-message-of-the-day-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has the Message of the Day Cloud Gem enabled \(in the Project Configurator, select **Cloud Gem Message of the Day**\)\.
+ You have created a project stack in [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\.
+ You have created a deployment stack in resource manager\.
+ You have opened the cloud gem portal\. In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal**\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add **Cloud Gem Message of the Day** in the Project Configurator\. For information on creating a deployment stack and accessing the Cloud Gem Portal, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

## Accessing and Using the Message of the Day Cloud Cloud Gem<a name="cloud-canvas-cloud-gem-message-of-the-day-accessing-and-using"></a>

**To customize the Message of the Day Cloud Gem**

1. In the Cloud Gem Portal, click **Message of the day**\.  
![\[Message of the day\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-mod-2.png)

1. Click **Add Message of the Day** to create a new message\.

1. In the **Add Message** dialog box, provide the following information:
   + For **Message Content**, enter a message that to be displayed to the players of your game\.
   + For **Scheduling**, clear the **No Start** and/or **No End** check boxes and specify the **Start** and/or **End** time during which players see the message\. Currently, all times are in UTC\.** **The message is shown to players that have a game clock that is between –12 hours or \+12 hours of the set UTC time\.
   + To make the message permanent, specify both **No Start** and **No End**\.
   + If you have more than one message, you can use the **Priority** option to specify the priority of each\. By default, 0 is the highest priority\. The game client determines how to use the priority value\. If you have only one active message, the priority has no effect\.  
![\[Add message\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-mod-3.png)

1. Click **Save**\. The portal shows your new message in the **Active** category\.  
![\[Message categories\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-mod-4.png)

   The message of the day dashboard has three categories: **Active Messages**, **Planned Messages**, and **Expired Messages**\.
   + **Active Messages** – The currently active messages that are returned by the game client\.
   + **Planned Messages** – Messages that are not currently active but will be active at the planned start date and time\.
   + **Expired Messages **– Outdated messages, which are stored in the **History** tab so that you can edit and reuse them if you want\.

You can now use the message in your game\.

## Other Cloud Gems<a name="cloud-canvas-cloud-gem-message-of-the-day-other-cloud-gems"></a>

Visit the following links for other cloud gems that might interest you\.
+ Leaderboard Cloud Gem: [Leaderboard Cloud Gem Portal](cloud-canvas-cloud-gem-leaderboard.md)
+ Dynamic Content Cloud Gem: [Using Dynamic Content Manager](cloud-canvas-cloud-gem-dc-manager.md)