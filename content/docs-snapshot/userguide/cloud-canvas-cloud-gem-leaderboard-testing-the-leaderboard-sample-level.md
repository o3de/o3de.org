# Testing the Leaderboard Sample Level<a name="cloud-canvas-cloud-gem-leaderboard-testing-the-leaderboard-sample-level"></a>

The `CloudGemLeaderboard` Cloud Gem is included in the LeaderboardSample level, which is located in the `dev\CloudGemSamples\Levels\LeaderboardSample` directory\. The LeaderboardSample level contains a UI canvas with multiple buttons that you can use to test the Leaderboard system\.

**Note**  
By default, the Lambda function that processes score records is on a 10\-minute timer\. This timer avoids possible consistency issues and costs that might occur because of reduced throughput capacity\. The configuration for the timer is located in the `resource-template.json` file for the gem\. When you test the gem, you might want to reduce the timer value in the template file\. Alternatively, you can use the AWS Lambda console to disable the timer trigger, and then trigger it manually by using the **Test** button\.

**To test the Leaderboard using the sample level**

1. Using the **Cloud Canvas Resource Manager**, upload all resources to ensure that you have an updated stack\.

1. Open the Cloud Gem Portal \(CGP\) and add a statistic to the leaderboard\. This creates a description of a statistic to track \(if no definitions exist, you cannot submit a score\)\. The default properties in the test level expect a statistic called `score`\.

1. Press **Ctrl\+G** to start the level\. The test user interface appears\.  
![\[Leaderboard sample\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-gem-leaderboard-testing-ui.png)

1. Click **Submit Batch** to populate the leaderboard with data\. You can click the button multiple times to simulate a larger population\. Messages in the editor logs show whether the submissions were successful\.

1. Click **Get Leaderboard** to see the top five scores in the sample\.

1. Click **User Score 10** to submit a score for **LocalPlayer**\.

1. To verify the submission, click the leaderboard in the Cloud Gem Portal\. A score with the value of **10** should appear under the name **LocalPlayer**\.

1. Click **User Score 50** to submit another score for **LocalPlayer**\. Because the new score is higher, it should overwrite the earlier score\. To verify the submission, click the leaderboard in the Cloud Gem Portal again\.

**Note**  
There is a caching mechanism on the backend, so the scores might not be updated immediately\. On the Cloud Gem Portal **Settings** tab, you can click **Process Now** to process the leaderboard queue manually during development\. This feature should not be used in a production environment because it can lead to duplicate entries\.