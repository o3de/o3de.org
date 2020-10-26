# Web Communicator Cloud Gem Portal<a name="cloud-canvas-cloud-gem-web-communicator-cgp"></a>

In the Web Communicator Cloud Gem Portal, you can manage WebSocket and OpenSSL users, send messages to them, and listen to messages from them\. You can create OpenSSL users directly from the Cloud Gem Portal or register a WebSocket user from the [CommunicatorSample](cloud-canvas-cloud-gem-web-communicator-sample-level.md) level\. The Cloud Gem Portal can broadcast and receive on the channels that are available through WebSocket connections to the AWS IoT service\.

## Prerequisites<a name="cloud-canvas-cloud-gem-web-communicator-cgp-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has **Cloud Gem Web Communicator** enabled\.
+ You have used Lumberyard's Cloud Canvas Resource Manager to create a project stack and a deployment stack in AWS\.
+ You have opened the Cloud Gem Portal \(in Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\)\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add **Cloud Gem Web Communicator** in the Project Configurator\. For information on creating a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

To open the Web Communicator cloud gem, click **Web Communicator** in the Cloud Gem Portal's **Cloud Gems** pane\.

![\[The Web Communicator cloud gem\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-1.png)

The Web Communicator cloud gem includes a **Users** tab for managing users and a **Channel List** tab for working with channels\.

## Managing Users<a name="cloud-canvas-cloud-gem-web-communicator-cgp-managing-users"></a>

The **Users** tab lists all your clients\. On this tab, you can create and manage users and send individual messages to them\.

### Creating an OpenSSL User<a name="cloud-canvas-cloud-gem-web-communicator-cgp-managing-users-create"></a>

**To create an OpenSSL user**

1. On the **Users** tab, click **Create OpenSSL User**\. In the following images, the client IDs and GUIDs have been truncated for privacy\.  
![\[Create an OpenSSL user in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-2.png)

   You are prompted to download the following three credentials files, which are automatically generated:
   + `webcommunicatorkey.pem`
   + `webcommunicatordevice.pem`
   + `deviceInfo.json`

1. Save these files in the user storage directory `@user@\certs\aws` for your application or platform\. For a PC, the directory is `lumberyard_version\dev\Cache\project_name\pc\user\certs\aws`\.

   After the credential files are generated, a new OpenSSL user appears in the list, as in the following image\.   
![\[OpenSSL user created in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-3.png)

### Changing the Status of a Client<a name="cloud-canvas-cloud-gem-web-communicator-cgp-managing-users-change-status"></a>

**To change the status of a client**

1. Click the **Client ID** that you want to change\.

1. From the drop\-down menu for the client, choose **Ban** to ban the user\.  
![\[Choose Ban to ban a user in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-4.png)

1. Choose **Unban** to unban a banned user\.  
![\[Choose Unban to unban a user in Web Communicator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-5.png)

### Sending a Message to a Specific Client<a name="cloud-canvas-cloud-gem-web-communicator-cgp-managing-users-send-message"></a>

**To send a message to a specific client**

1. Select **Send Message** from the drop\-down menu for the client to which you want to send a message\.  
![\[Send a message to a user from the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-5a.png)

1. For **Channel**, choose a cloud gem to which to send the message\.  
![\[Choose a cloud gem for Channel in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-6.png)

1. Enter a message in the **Message** box and then click **Send Message**\.

### Listening to the Messages Sent to a Client<a name="cloud-canvas-cloud-gem-web-communicator-cgp-managing-users-listen"></a>

**To listen to the messages sent to a client**

1. Click the ID of the client whose messages you want to listen to\.

1. From the drop\-down menu for the client, choose **Listen**\.  
![\[Choose Listen to monitor the messages from a client\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-7.png)

### Viewing Current Activity<a name="cloud-canvas-cloud-gem-web-communicator-cgp-managing-users-view-activity"></a>

**To view current activity**

1. On the **Users** tab, click the ID of a client\.

1. On the activity pane, you can send a message, ban the user, or unban the user\.  
![\[Change the status of a user or send messages to the user in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-7a.png)

1. For **Current Activity**, select the channel whose messages you want to see\.  
![\[Select a channel in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-7b.png)

   The messages sent to the client through the selected channel are listed in the activity pane\.

## Working with Channels<a name="cloud-canvas-cloud-gem-web-communicator-cgp-working-with-channels"></a>

On the **Channel List** tab, you can view existing channels, send a message through a channel, and listen to a channel\.

### Viewing Existing Channels<a name="cloud-canvas-cloud-gem-web-communicator-cgp-working-with-channels-view"></a>

**To view existing channels**
+ Click the **Channel List** tab\.  
![\[Click Channel List in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-8.png)

### Sending a Message Through a Channel<a name="cloud-canvas-cloud-gem-web-communicator-cgp-working-with-channels-send-message"></a>

**To send a message through a channel**

1. Choose **Send message** from the drop\-down menu for the channel\.  
![\[Choose Send message to send a message to a channel in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-9.png)

   Broadcast channels can send messages to all clients\. Private channels can send messages only to a specific client\.

1. For **Client ID**, select the client to which to send the message\.  
![\[Select the client to send a message to in the Web Communicator Cloud Gem Portal\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-10.png)

1. Enter a message in the **Message** box and then click **Send Message**\.

### Listening to a Channel<a name="cloud-canvas-cloud-gem-web-communicator-cgp-working-with-channels-listening"></a>

**To listen to a channel**
+ Do one of the following:
  + Click an entry in the channels table\.
  + Select **Listen** from the drop\-down menu for the channel\.

  The messages sent through the channel are listed in the **Activity** pane\.  
![\[View messages in the Activity pane in the Web Communicator Cloud Gem Portal.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-cgp-11.png)

**Note**  
To send a message from the **Activity** pane, click **Send Message**\.