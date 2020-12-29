# Testing the Message of the Day Sample Level<a name="cloud-canvas-cloud-gem-mod-testing"></a>

A sample level for testing is located in the `\dev\CloudGemSamples\Levels\MsgOfTheDaySample` directory\. The **MsgOfTheDaySample** level contains a one\-button UI for retrieving and displaying successive messages of the day\.

**To test the Message of the Day sample level**

1. Use the Cloud Canvas Resource Manager to upload all the resources that you need to have an updated stack\.

1. Open the Cloud Gem Portal and add some messages that are scheduled for today\. If you set no scheduling information for a message, the message is always current\.

1. To display the messages in a specific order, set the priority field\. `0` signifies highest priority\.

1. Press **Ctrl\+G** to start the level\. The test user interface appears\.  
![\[Get messages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-mod-testing-get-messages.png)

1. Click **Get Messages**\.

With each click, the messages are displayed in succession\.