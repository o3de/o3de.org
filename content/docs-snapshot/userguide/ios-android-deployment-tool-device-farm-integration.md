# Using AWS Device Farm in Lumberyard Editor<a name="ios-android-deployment-tool-device-farm-integration"></a>

Use [AWS Device Farm ](https://aws.amazon.com/device-farm/)to test your Android or iOS apps on many different types of devices without needing to have any of them present physically\. Device Farm can help you find and resolve compatibility issues on a large number of devices\. For more information about Device Farm, see the [Device Farm Developer Guide](https://docs.aws.amazon.com/devicefarm/latest/developerguide/)\.

Starting in Lumberyard version 1\.20, you can use the Lumberyard Editor [Deployment Tool](building-your-android-game.md) to make Device Farm a deployment target\.

![\[Lumberyardintegration with AWS Device Farm.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-1.png)

## Prerequisites<a name="ios-android-deployment-tool-device-farm-integration-prerequisites"></a>

To use Device Farm in Lumberyard Editor, you need the following requirements:
+ The Cloud Gem Framework gem, enabled for your project in the Project Configurator\.  
![\[The Cloud Gem Framework gem in Project Configurator.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-2.png)

  For information about using Project Configurator to enable gems, see [Enabling Gems](gems-system-using-project-configurator.md)\.
+ A set of Amazon Web Services \(AWS\) credentials and access keys\.
  + If you do not have an AWS account, complete the following steps to create one\.

**To sign up for an AWS account**

    1. Open [https://portal\.aws\.amazon\.com/billing/signup](https://portal.aws.amazon.com/billing/signup)\.

    1. Follow the online instructions\.

       Part of the sign\-up procedure involves receiving a phone call and entering a verification code on the phone keypad\.
  + For more information about access keys, see [How do I create an AWS access key?](https://aws.amazon.com/premiumsupport/knowledge-center/create-access-key/)\. 
  + For information about the AWS Free Tier, see the [AWS Free Tier](https://aws.amazon.com/free/) page\.
+ Device Farm requires that you have a shader compiler running on an Amazon Elastic Compute Cloud \(Amazon EC2\) instance\. For more information, see [Running the Shader Compiler on Amazon EC2](ios-android-running-shader-compiler-amazon-EC2.md)\.

### Creating an AWS Profile in Lumberyard Editor<a name="ios-android-deployment-tool-device-farm-integration-creating-an-aws-profile-in-lumberyard-editor"></a>

After you have a set of AWS credentials, use them to create a profile in Lumberyard Editor\.

**To enter your credentials in Lumberyard Editor**

1. In Lumberyard Editor, choose **AWS**, **Credentials manager**\.  
![\[Open Credentials manager\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-3.png)

1. In the **Credentials Manager** dialog box, click **Add profile**\.  
![\[Click Add profile\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-4.png)

1. In the **Add profile** dialog box, enter the required information\.  
![\[Enter profile information for your AWS account in Lumberyard Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-5.png)
   + For **Profile name**, enter a name for the profile\.
   + For **AWS access key** and **AWS secret key**, enter the access key and secret key\.

   **Important**

   Do not share these credentials with anyone, and do not check them into source control\. These credentials grant control over your AWS account, and a malicious user could incur charges\.

1. Click **Save**\.

1. In **Credentials Manager**, click **OK**\.

You have now created a profile that is associated with your credentials\. It is saved locally on your machine in your AWS credentials file\. This file is usually located in your C:\\Users\\`user_name`\\\.aws\\ directory\.

## Accessing the Device Farm Console from Lumberyard Editor<a name="ios-android-deployment-tool-device-farm-integration-accessing-the-device-farm-console-from-lumberyard-editor"></a>

After the new profile is selected in the **Credentials Manager**, you can use Lumberyard Editor to access the Device Farm console\.

**To access the Device Farm console from Lumberyard Editor**

1. Choose **AWS**, **Credentials Manager** and ensure that a profile is selected\.

1. Choose **AWS**, **Open AWS Console**, **Device Farm**\. This signs you into AWS and creates a new session\.

## Configuring a Deployment for AWS Device Farm<a name="ios-android-deployment-tool-device-farm-integration-configuring-a-deployment-for-aws-device-farm"></a>

After you have selected a valid AWS profile in Lumberyard Editor, you can use the [Deployment Tool](https://docs.aws.amazon.com/lumberyard/latest/userguide/android-game-building.html) to configure a deployment to AWS Device Farm\.

**To configure a deployment for AWS Device Farm\.**

1. Ensure that a valid AWS profile is selected\.

1. In Lumberyard Editor, choose **File**, **Project Settings**, **Deploy to device**\.

1. In **Deployment Tool**, under **Deploy**, click the **AWS Device Farm** tab\.  
![\[AWS Device Farm features in the Deployment Tool.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-6.png)

1. The following options are specific to Device Farm usage\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ios-android-deployment-tool-device-farm-integration.html)

1. Adding a device pool opens the **Device Farm Device Pool** dialog box, which retrieves the latest list of supported devices from Device Farm\.  
![\[Configuring a Device Farm device pool.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-7.png)

1. For **Name**, enter a name for your device pool, and then select the devices that you want to test your application on\.

1. Click **Save**\.

## Building and Deploying an App to AWS Device Farm<a name="ios-android-deployment-tool-device-farm-integration-building-and-deploying-an-app-to-aws-device-farm"></a>

At this point, you are ready to build and deploy your app to Device Farm\.

**To build and deploy an app to AWS Device Farm**

1. Click **Deploy to Device Farm**\. The deployment advances through the following steps:

   1. Process all assets\. This can take a long time if this is the first time assets for the target platform are processed\.

   1. Run the WAF build command using `--deploy-android=False` `--android-asset-mode=apk_files`\.

   1. Run the WAF package command using *\-\-deploy\-android=False \-\-android\-asset\-mode=apk\_files*\.

   1. Upload the app that is created to Device Farm\.

   1. Schedule the test run on Device Farm\.

1. After a test run is scheduled, you can track its status in the **Device Farm Log** section of the Deployment Tool\. Information from Device Farm is refreshed every 10 seconds\.  
![\[Using the Device Farm Log in the Deployment Tool.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios-android-deployment-tool-device-farm-integration-8.png)
**Note**  
The Device Farm test fails on some devices if the device does not respond to input quickly enough\. If this occurs, set `r_ShadersAsyncCompiling=1` in your `system_android_es3.cfg` file so that the main UI thread is blocked by shader loads and continues to respond\.

1. To open a test run in the Device Farm console, right\-click the run, and choose **View details in AWS console**\.

1. To delete a test run, right\-click the run, and choose **Delete**\.