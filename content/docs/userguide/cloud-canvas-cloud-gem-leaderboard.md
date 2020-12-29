# Leaderboard Cloud Gem Portal<a name="cloud-canvas-cloud-gem-leaderboard"></a>

**Topics**
+ [Prerequisites](#cloud-canvas-cloud-gem-leaderboard-prerequisites)
+ [Accessing and Using the Leaderboard Cloud Gem Portal](#cloud-canvas-cloud-gem-leaderboard-accessing-using)
+ [Testing the Leaderboard Sample Level](cloud-canvas-cloud-gem-leaderboard-testing-the-leaderboard-sample-level.md)
+ [Leaderboard Sample Level Implementation Details](cloud-canvas-cloud-gem-leaderboard-implementation-details.md)
+ [Leaderboard Cloud Gem Resources](cloud-canvas-cloud-gem-leaderboard-resources.md)
+ [Leaderboard Cloud Gem Service API](cloud-canvas-cloud-gem-leaderboard-cloud-gem-service-api.md)

You can use the Leaderboard cloud gem portal to create, view, and customize leaderboards by deleting scores, banning players, and removing bans\.

## Prerequisites<a name="cloud-canvas-cloud-gem-leaderboard-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has the Leaderboard Cloud Gem enabled \(in the Project Configurator, select **Cloud Gem Leaderboard**\)\.
+ You have created a project stack in [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\.
+ You have created a deployment stack in Cloud Canvas Resource Manager\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add **Cloud Gem Leaderboard** in the Project Configurator\.

## Accessing and Using the Leaderboard Cloud Gem Portal<a name="cloud-canvas-cloud-gem-leaderboard-accessing-using"></a>

You use Lumberyard Editor to work with the Leaderboard Cloud Gem Portal\.

**To access and use the Leaderboard Cloud Gem Portal**

1. 

**Opening the Cloud Gem Portal**

   In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal** and then choose the **Leaderboard** cloud gem\.

1. 

**Creating a Leaderboard**

   You must create a leaderboard for your game before you can start posting scores to it\. In the Leaderboard Cloud Gem, click **Add Leaderboard** to create a leaderboard so that your game can use it\. If your game tries to send data to a leaderboard that doesn't exist, the data is not be sent or saved anywhere\.  
![\[Add leaderboard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-add.png)

   A leaderboard has the following options:
   + **Leaderboard ID** – This is the identifier for your leaderboard\. The game client uses this ID to send data to the leaderboard\. Currently, this ID does not support spaces\. If you're creating a leaderboard for a particular region or language, it's good to put that information in the ID\. For example, you could designate scores for North America with the ID "scores\-NA" instead of just "scores"\.
   + **Mode** – At launch, leaderboards have two modes: **Overwrite** and **Increment**\. Overwrite mode overwrites a previous score for a player\. Increment mode adds the value passed in from the game client to the previous value to keep a running total of a particular statistic\. For example, you might use increment mode to track career statistics in a game\.
   + **Minimum Reportable Value Allowed** – The minimum value for the leaderboard\. If the game client sends scores below the minimum value allowed, the scores are not recorded\.
   + **Maximum Reportable Value Allowed** – The maximum value for the leaderboard\. If the game client sends scores above the maximum value allowed, the scores are not recorded\.

     **Reservoir Sample Size** – The leaderboard sample reservoir size\. The recommended range is from 200 through 1000\.

1. 

**Editing a Leaderboard**

   To edit all options for a leaderboard \(except for **Leaderboard ID**\), click the settings ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-settings-icon.png) icon on the right side of the leaderboard entry\. If you want to change the value for **Leaderboard ID**, you must delete and recreate the leaderboard\. When you delete a leaderboard, its data is also deleted\.  
![\[Configuring your leaderboard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-configure.png)

1. 

**Viewing Leaderboards**

   To view a leaderboard, click its name\. This shows you a list of players and their scores in the leaderboard\. You can also delete a player's scores or ban a player from all leaderboards\.  
![\[Viewing leaderboards\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-view.png)

1. 

**Deleting Scores**

   To delete a score, click the delete icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-trash-icon.png)on the right of the player's score\. Then click **Delete** in the confirmation window\.

1. 

**Banning a Player**

   To ban a player, click the ban icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-ban-icon.png)on the right side of the player table next to the delete icon\. When you ban a player, the player's scores are removed from all leaderboards, and the player is prevented from posting on other leaderboards\. This is a reversible action; you can remove a ban if done by mistake\.  
![\[Banning a player\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-ban.png)

1. 

**Removing a Ban**

   To remove a ban, click the **Banned Players** tab\. The tab displays a list of banned players in all your leaderboards\. Click the ban icon again, and then click **Save** in the confirmation window\.  
![\[Removing a ban\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-ban-remove.png)