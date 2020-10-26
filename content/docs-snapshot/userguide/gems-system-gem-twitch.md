# Twitch Gem<a name="gems-system-gem-twitch"></a>

Install the Twitch gem into your Lumberyard project to access Twitch features\. This gem makes it simple to engage broadcasters, support the Twitch Game Commerce platform, and leverage existing Twitch functionality for your game\.

The Twitch gem supports the following features:
+ Twitch Friends – With the Twitch gem installed, you can take advantage of Twitch Friends from within your product\. Gamers can use this feature to stay connected and communicate with one another, whether they are in\-game or on the web watching their favorite broadcaster\. 
+ Activity Sharing \(rich presence\) – This technology creates presence awareness, where Twitch users can see what channels their friends are watching, whether their friends are broadcasting, and what games their friends are playing\. This can help you design and build a more connected gaming experience while expanding your product’s visibility across the Twitch platform\. 
+ [Channels](https://dev.twitch.tv/docs/v5/reference/channels/) – Currently available in the released Twitch API\.
+ Commerce – With the Twitch gem installed, your users can purchase items from your games catalog through the Twitch desktop app\.

## Prerequisites<a name="gems-system-gem-twitch-prerequisites"></a>

To use the Twitch gem, you must:
+ Be authorized as a Twitch development partner\. To register, visit the Twitch Developer Portal at [https://dev\.twitch\.tv/](https://dev.twitch.tv/)\.
+ Obtain and extract the Twitch Commerce SDK from Twitch\. See [Installing the Twitch Commerce SDK and Twitch Gem](#gems-system-gem-twitch-install-sdk-gem) below\.
+ Extract and enable the Twitch gem from Lumberyard\. See [Installing the Twitch Commerce SDK and Twitch Gem](#gems-system-gem-twitch-install-sdk-gem) below\.

## Installing the Twitch Commerce SDK and Twitch Gem<a name="gems-system-gem-twitch-install-sdk-gem"></a>

You must receive approval from Twitch for the launcher application to use your application\.

**To install the Twitch Commerce SDK and Twitch gem**

1. After you are authorized as a Twitch development partner, register your application and generate a client ID:

   1. Visit [https://dev\.twitch\.tv/](https://dev.twitch.tv/) and log in to your account\.

   1. Click **Dashboard** in the top navigation bar\.

   1. Under **Dashboard**, click **Apps**\.

   1. Under **Developer Applications**, click **Register Your Application**\.

   1. On the **Register Your Application** page, provide your application name, redirect URI, and application category\.

   1. Click **Register**\.

1. To receive access to the Twitch API operations and Twitch Commerce SDK, contact Twitch Developer Success at integrationsuccess@twitch\.tv and provide your application's client ID\. Twitch will send you the Twitch Commerce SDK\.

1. Extract the Twitch Commerce SDK `.zip` file to the following directory: `\lumberyard_version\3rdParty\Twitch\FUEL\Twitch_Commerce_sdk_version`\.

1. Run the **Lumberyard Setup Assistant** to verify that the Twitch Commerce SDK is correctly detected\. For more information, see [Running Lumberyard Setup Assistant](lumberyard-launcher-using.md)\.

1. After you have the Twitch Commerce SDK, use the **Project Configurator** to enable the Twitch gem for your project\. The HttpRequestor gem is a dependency for the Twitch Commerce SDK and will be enabled automatically\. For more information, see [Add modular features and assets with Gems](gems-system-gems.md)\.

1. Run the **Lumberyard Setup Assistant** again to verify that the Twitch Commerce SDK and Twitch gem are correctly detected\. For more information, see [Running Lumberyard Setup Assistant](lumberyard-launcher-using.md)\.