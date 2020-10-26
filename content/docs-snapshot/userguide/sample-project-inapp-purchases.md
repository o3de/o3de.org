# In\-App Purchases Sample<a name="sample-project-inapp-purchases"></a>

The In\-App Purchases sample demonstrates how to use the In\-App Purchases \(IAP\) Gem for a Lumberyard application that runs on a mobile device\. For more information about this gem, see [In\-App Purchases Gem](gems-system-gem-inapp-purchases.md)\.

**Topics**
+ [Prerequisites](#sample-project-inapp-purchases-prerequisites)
+ [Testing the In\-App Purchases Sample on Android](#sample-project-inapp-purchases-android-testing)
+ [Testing the In\-App Purchases Sample on iOS](#sample-project-inapp-purchases-ios-testing)

## Prerequisites<a name="sample-project-inapp-purchases-prerequisites"></a>

To use the In\-App Purchases sample, you must have the following:
+ An understanding of how to build a Lumberyard application and deploy to a mobile device\. For more information, see [Create Android and iOS projects in Lumberyard](mobile-support-intro.md)\.
+ Access to iTunes Connect to properly configure the sample for an iOS device\.
+ Access to the Google Play Developer Console to properly configure the sample for an Android device\.

To load the In\-App Purchases sample, you must edit the `autoexec.cfg` file \(located in the `\dev\SamplesProject` directory\) to include the following: `map Gems_InAppPurchases_Sample`

You must also update the product IDs in the `product_ids.json` file to match the product IDs in iTunes Connect or the Google Play Developer Console\. This file is located in the `\dev\SamplesProject\IAP_ProductIds` directory\.

## Testing the In\-App Purchases Sample on Android<a name="sample-project-inapp-purchases-android-testing"></a>

You can test the In\-App Purchase samples on an Android device\.

**To test the In\-App Purchases sample on an Android device**

1. In a command line window, build the SamplesProject application\.

1. Go to the [Google Play Developer Console](https://play.google.com/apps/publish/)\.

1. In the left pane, click **All Applications**\.

1. In the right pane, click **Create Application**\.

1. Follow the steps to create a new application\. The package name for your application must match the package name under `android_settings` in the `project.json` file\. This file is located in the `\dev\SamplesProject` directory\.

1. Once the application is created, it appears on the **All Applications** tab in the Google Play Developer Console\. Click the application\. In the left pane, navigate to **In\-app Products**\.

1. On the **In\-app Products** page, click **Add new product** to add products that can be purchased through the application\.

1. In the left pane of the application page, click **APK** to upload the APK that you built in step 1\.

1. Create a closed beta test and add test accounts for testing\.

1. Deploy the application to your device\. The in\-app products that you created in the Google Play Developer Console appear when you select **Available Products** in the application\.

You can now buy products, view purchased products, and consume purchased products in the application\.

## Testing the In\-App Purchases Sample on iOS<a name="sample-project-inapp-purchases-ios-testing"></a>

You can test the In\-App Purchases sample on an iOS device\.

**To test the In\-App Purchases sample on an iOS device**

1. Go to [iTunes Connect](https://itunesconnect.apple.com/login)\.

   You must have an admin account to create applications\.

1. Click **My Apps**\.

1. In the top left of the page, click **\+** to create a new application\.

   The bundle identifier must match the bundle identifier for your product in Xcode\. To find the bundle identifier, select your Lumberyard project \(for example, SamplesProject\) in Xcode\. You can also find the bundle identifier in the `Info.plist` file \(located in the `\Code\SamplesProject\Resources\IOSLauncher` directory\)\.

1. On the **My Apps** page, click your newly created application\.

1. In the top pane of the application page, click **Features**\.

1. In the left pane of the **Features** page, click **In\-App Purchases**\.

1. On the **In\-App Purchases** page, click **\+** to add products that can be purchased through the application\.

1. When you finish adding products for in\-app purchases, go to the iTunes Connect home page\.

1. In iTunes Connect, click **Users and Roles**\.

1. On the **Users and Roles** page, click **Sandbox Testers**\.

1. On the **Sandbox Testers** page, click **\+** to add sandbox tester accounts\.
**Important**  
Do not log in using this account on your device\. This will deactivate the sandbox testing account and you'll need to create a new account\.

1. On your device, choose **Settings**, **iTunes**\. Log out of any accounts that are logged in\.

1. Deploy and run the application from Xcode\. When prompted, sign in with your sandbox tester account on the device\.

You can now view available products, buy products, view purchased products, and more\. When you buy a product, a note appears that indicates you are in the sandbox environment and will not be charged for the purchase\.