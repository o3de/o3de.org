# Testing the Web Communicator Cloud Gem<a name="cloud-canvas-cloud-gem-web-communicator-sample-level"></a>

To perform a simple test of the Web Communicator cloud gem, you can use the CommunicatorSample level that is included with Lumberyard\.

## Prerequisites<a name="cloud-canvas-cloud-gem-web-communicator-sample-level-prerequisites"></a>

This tutorial assumes the following:
+ Your Lumberyard project has the Web Communicator and Player Account cloud gems enabled \(in the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html), choose **Cloud Gem Web Communicator** and **Cloud Gem Player Account**\)\.
+ You used the [Cloud Canvas Resource Manager](https://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-ui-rm-overview.html) or the [lmbr\_aws command line tool](cloud-canvas-command-line.md) to create the following: 
  + A [*project stack*](cloud-canvas-ui-rm-project-stack.md) for your project\.
  + A [*deployment*](cloud-canvas-ui-rm-deployments.md) for your project that includes the **CloudGemWebCommunicator** and **CloudGemPlayerAccount** resource groups\.
+ You have an email account for testing\.

## Test Workflow Summary<a name="cloud-canvas-cloud-gem-web-communicator-sample-level-test-workflow-summary"></a>

The test workflow uses the PlayerAccountSample level, the CommunicatorSample level, and the AWS IoT management console in the following ways:

1. **PlayerAccountSample** – To create an player account \(authenticated identity\) for testing\. Web Communicator uses authenticated identities by default\.

1. **CommunicatorSample** – To register a WebSocket, connect the WebSocket, and request a channel list\.

1. **AWS IoT management console** – To publish a test message that appears in the CommunicatorSample level\.

## Test Workflow Steps<a name="cloud-canvas-cloud-gem-web-communicator-sample-level-test-workflow-steps"></a>

The following sections describe each of the workflow steps in detail\.

### A\. Using PlayerAccountSample to Create a Player Account<a name="cloud-canvas-cloud-gem-web-communicator-sample-level-playeraccountsample"></a>

In this step, you use the PlayerAccountSample level to create a player account and sign in with it\.

**To create a player account for the test**

1. Follow [Testing the Player Account Cloud Gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cloud-gem-player-account-testing.html) \(steps 1\-11\) to create a player account\. To verify the account, submit the verification code that is emailed to you\.

1. With the PlayerAccountSample level still running, sign in to the PlayerAccountSample level with the credentials that you created \(Testing the Player Account Cloud Gem step 12\)\.

1. Press **ESC** to exit the level\.

### B\. Using CommunicatorSample to Register and Connect a Websocket<a name="cloud-canvas-cloud-gem-web-communicator-sample-level-communicatorsample"></a>

In this step, register and connect a Websocket that can receive messages from AWS IoT\.

**To register and connect a Websocket**

1. In Lumberyard Editor, choose **File**, **Open**\.

1. In the **Open a Level** dialog box, choose **CommunicatorSample**, and then click **Open**\. If you are using a launcher and need to restart, your authenticated identity should be found on startup\.

1. Press **Ctrl\+G** to start the level\. The sample level looks similar to the following image\.  
![\[The CommunicatorSample level\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-1.png)

1. Click **Register WebSocket**\.  
![\[Registering a WebSocket\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-2.png)

   The status changes to **Registered**\.  
![\[Registered WebSocket\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-3.png)

1. Click **Connect WebSocket**\.  
![\[Connecting a WebSocket\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-4.png)

   The status changes to **Connected**\.  
![\[Connected WebSocket\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-5.png)

1. Click **Request List**\.  
![\[Request channel list\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-6.png)

   Your test channels are listed in the sample level user interface\.  
![\[The list of communication channels\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-7.png)

1. Leave the CommunicatorSample level running\.

Now that you have registered and connected a WebSocket, you are ready to test it\.

### C\. Using the AWS IoT Management Console to Publish a Test Message<a name="cloud-canvas-cloud-gem-web-communicator-sample-level-aws-iot-management-console"></a>

In this step, you send a test from the message AWS IoT console to the CommunicatorSample level\.

**To send a test message to the CommunicatorSample level**

1. Do one of the following:
   + Press **Alt\+Tab** to change to your browser\.
   + Open a browser on another computer that has internet access\.

1. In your browser, sign in to the [AWS Management Console](https://console.aws.amazon.com/) with the AWS credentials that you used to create your project stack and deployment\.

1. Choose **Services**, **Internet of Things**, **IoT Core** to open the [AWS IoT](https://console.aws.amazon.com/iot/) console\.

1. In the left navigation pane of AWS IoT console, choose **Test**\.  
![\[Choose Test in the AWS IoT console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-8.png)

1. Navigate to the **Publish** section at the bottom of the page\.  
![\[Publishing a test message in the AWS IoT console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-9.png)

1. In the **Publish** section, enter the following information:

   1. For **Specify a topic**, specify your channel as `project_name/deployment_name/CloudGemWebCommunicator` \(for example, `cgs624803/dep/CloudGemWebCommunicator`\)\.

   1. For **Message**, add a message that uses the following syntax:

   ```
   {
   "Channel":"CloudGemWebCommunicator",
   "Message":"This is a test"
   }
   ```

1. Choose **Publish to topic**\.

1. Return to the CommunicatorSample level to see the results\. If you are on the same computer, press **Alt\+Tab** to return to Lumberyard Editor\.

   The sample level shows the message that you sent from AWS IoT\.  
![\[Test message received in the CommunicatorSample level that is sent from the AWS IoT console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-sample-level-10.png)