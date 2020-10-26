# Generating and Setting a Twitch Client ID<a name="chatplay-generate-twitch-client-id"></a>

In order to use Twitch ChatPlay and Twitch API features in your Lumberyard project, you need to set the following console variables to the value of your project's assigned App access token\.
+ For access to Twitch ChatPlay, set `chatPlay_ClientID`
+ For access to the Twitch API, set `broadcast_ClientID`

 To register your project as an application using Twitch and generate a Client ID access token, use the [Twitch Developer Console](https://dev.twitch.tv/console/apps)\. For more information, see [Twitch Developer Documentation: Registration](https://dev.twitch.tv/docs/authentication#registration)\. 

**Important**  
 Twitch requires that you set up your own OAuth endpoint to handle user authentication\. For information on setting up this endpoint, see the [Twitch OAuth documentation](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth)\. 

## Get your Twitch Client ID<a name="get-twitch-client-id"></a>

 Get your Twitch client ID from the [Twitch Developer Console](https://dev.twitch.tv/console/apps)\. 

1. From the Twitch Developer Console, select **Manage** for the application you're getting the client ID of\.  
![\[Twitch developer console. On the right side of the row containing the application name is the "Manage" button.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/chatplay/twitch-manage-app.png)

1. Copy the value from the **Client ID** field on the application's page\.

## Set the Client ID in your project<a name="set-twitch-client-id-howto"></a>

Set the Client ID in your Lumberyard project configuration\.

1. Open a console and navigate to `lumberyard_install_dir\dev\project_name`\.

1. Open the `game.cfg` file contained in this directory in a text editor\.

1. Using the Client ID retrieved from Twitch, add the following lines\.

   ```
   chatPlay_ClientID = "Twitch Client ID"
   broadcast_ClientID = "Twitch Client ID"
   ```