# Leaderboard Sample Level Implementation Details<a name="cloud-canvas-cloud-gem-leaderboard-implementation-details"></a>

An entity named `Leaderboard` contains the `CloudGemLeaderboardClientComponent`\.

![\[CloudGemLeaderboardClientComponent\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-client-component.png)

The `CloudGemLeaderboardClientComponent` enables the gem's API to be called from other components on that entity and receives notifications for those calls\.

The `Leaderboard` entity also contains a Lua script component that uses the `leaderboardmainmenu.lua` script\. The script creates the testing user interface and calls the following APIs through the attached client component:
+ `PostScore` \(to submit scores\)
+ `PostLeaderboard` \(to request a leaderboard for a stat\)

The script also implements the notification methods for these API calls:
+ `OnPostScoreRequestSuccess`
+ `OnPostScoreRequestError`
+ `OnPostLeaderboardRequestSuccess`
+ `OnPostLeaderboardRequestError`