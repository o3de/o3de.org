# Using the Cloud Gem Portal to View Logs<a name="cloud-canvas-cloud-gem-portal-log-tab"></a>


****  

|  | 
| --- |
|  The Cloud Gem Portal \(CGP\) is deprecated and will be removed in a future version of Lumberyard\.  | 

You can view [Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/) for your cloud gems in the **Log** tab of the Cloud Gem Portal\. CloudWatch Logs is an AWS service that monitors log activity related to your application's use of cloud gems\. For example, you can view the [Player Account](cloud-canvas-cloud-gem-player-account.md) cloud gem logs related to a sign up failure\.

CloudWatch Logs arranges logs into log streams and log groups\. A log stream is a sequence of log events that share the same source\. Each separate source of logs into CloudWatch Logs makes up a separate log stream\.

A log group is a group of log streams that share the same retention, monitoring, and access control settings\. You can define log groups and specify which streams to put into each group\. There is no limit on the number of log streams that can belong to one log group\. For more information, see [Working with Log Groups and Log Streams](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html) in the *[Amazon CloudWatch Logs User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/)*\.

You can use the **Log** tab of the Cloud Gem Portal to view log streams and log groups related to your cloud gems\.

## Prerequisites<a name="cloud-canvas-cloud-gem-portal-log-tab-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has the [Leaderboard](cloud-canvas-cloud-gem-leaderboard.md) and [Message of the Day](cloud-canvas-cloud-gem-message-of-the-day.md) cloud gems enabled\.
+ You have used Lumberyard's Cloud Canvas Resource Manager or the [`lmbr_aws`](cloud-canvas-command-line.md) command line tool to create a project stack and a deployment stack in AWS\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add cloud gems to your project\. For information on creating a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

## Viewing Log Information in the Cloud Gem Portal<a name="cloud-canvas-cloud-gem-portal-log-tab-viewing-log-information-in-the-cloud-gem-portal"></a>

You can view log information from CloudWatch Logs in the Cloud Gem Portal\. You can monitor log activity in your AWS account for your cloud gems\. 

**To view cloud gem log information in the Cloud Gem Portal**

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.

1. In the Cloud Gem Portal, choose the cloud gem that has the CloudWatch Logs that you want to see\. This example uses the **Message of the Day** cloud gem\.  
![\[Choose a cloud gem from the Cloud Gems page to view log information.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-1.png)

1. Click the **Log** tab\. You can view summary information for the last 20 minutes of CloudWatch Logs for the cloud gem that you chose\. The most recent logs appear at the top of the list\.  
![\[The Log tab in the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-2.png)

## Viewing Logs in the CloudWatch Logs Console<a name="cloud-canvas-cloud-gem-portal-log-tab-viewing-logs-in-the-amazon-cloudwatch-console"></a>

The **Log** tab of the Cloud Gem Portal provides links to the [CloudWatch Logs console](https://console.aws.amazon.com/cloudwatch/) where you can see more details about your log groups and log streams\.

**To view a log group in the CloudWatch Logs console**

1. On the **Log** tab of the Cloud Gem Portal, click the pop\-out icon next to the name of the log group\.  
![\[Open the CloudWatch Logs console from the Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-3.png)

1. Sign in to the AWS Management Console if you are not already signed in\. The CloudWatch Logs console displays the log group that you chose\.  
![\[View the log group information in the CloudWatch Logs console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-4.png)

**To view a log stream in the CloudWatch Logs console**

1. On the **Log** tab of the Cloud Gem Portal, click a log entry for a specific CloudWatch log stream\.  
![\[Click a log stream in the Cloud Gem Portal to view the information in the CloudWatch Logs console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-5.png)

1. Sign in to the AWS Management Console if you are not already signed in\. The CloudWatch Logs console displays the log stream that you chose\.  
![\[View log stream in the CloudWatch Logs console for your cloud gems.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-6.png)

### Multiple Log Groups<a name="cloud-canvas-cloud-gem-portal-log-tab-multiple-log-groups"></a>

A log group is a group of log streams\. When a cloud gem like Leaderboard contains more than one log group, the log groups are displayed in multiple sections on the same page\.

**To choose a log group to view**

1. Click the **Cloud Watch Groups** drop\-down menu, and then select the log group that you want to see\.  
![\[Choose a log group from CloudWatch Groups\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-7.png)

1. Click **\(Top\)** next to the name of a log group to return to the top of the log groups\.  
![\[Click Top to return to the top of the page.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-portal-log-tab-8.png)