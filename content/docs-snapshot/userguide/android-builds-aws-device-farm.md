# Using the AWS Device Farm for Android Builds<a name="android-builds-aws-device-farm"></a>

You can use the AWS Device Farm to test your Lumberyard game across a range of devices\. This topic demonstrates how to run an Android build created with Lumberyard on the AWS Device Farm\.

**Topics**
+ [Prerequisites](#android-builds-aws-device-farm-prerequisites)
+ [Creating the Build](#android-builds-aws-device-farm-creating-build)
+ [Deploying to the AWS Device Farm](#android-builds-deploying-aws-device-farm)

## Prerequisites<a name="android-builds-aws-device-farm-prerequisites"></a>

To run a Lumberyard game build on the AWS Device Farm, you must have the following:
+ AWS account
+ Familiarity with the [AWS Management Console](https://console.aws.amazon.com/)
+ Understanding of [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/Instances.html), [VNC](https://www.realvnc.com/docs/), security groups, and the Lumberyard tool chain

If you prefer not to use your PC on a public IP address, you can use Amazon Elastic Compute Cloud \(Amazon EC2\) to run the Lumberyard shader compiler for mobile development\.

## Creating the Build<a name="android-builds-aws-device-farm-creating-build"></a>

Use the following steps to create your build to deploy to the AWS Device Farm\.

1. Navigate to the `\dev` directory for your game project\. For example, the SamplesProject directory is `\dev\SamplesProject`\.

1. Edit the game's `project.json` file to set `place_assets_in_apk` \(under `android_settings`\) to **1**\.

1. Navigate to the `lumberyard_version\dev` directory\.

1. Edit the `system_android_es3.cfg` file to set the IP address for the remote shader compiler to point to the Amazon EC2 instance or your computer's public IP address\.

1. Build the game\.

## Deploying to the AWS Device Farm<a name="android-builds-deploying-aws-device-farm"></a>

Use the following steps to deploy your build to the AWS Device Farm\.

1. Open the AWS Management Console\.

1. On the **Device Farm** tab, do the following:

   1. Click **Create a new project** and enter a name for your project\.

   1. Click **Create a new run** and then click the button with the Android and iOS logo\.

   1. Click **Upload** and select the `.apk` file that you created previously\.

   1. When the upload completes, enter a name for the run\.

   1. On the **Configure a test** page, click **Built\-in Fuzz**\.

   1. Allow the test to run for 10\-15 minutes by setting the **Event count** to **600** and **Event throttle** to **1000**\.

   1. For the device pool, click **Create a new device pool**\.

   1. Search for and select **Samsung Galaxy S7**\. Type the name and description for the pool, and save it\.

   1. Click through the remaining confirmation screens\.

1. When the tests are complete, open the **Screenshots** tab to see your deployed content\.