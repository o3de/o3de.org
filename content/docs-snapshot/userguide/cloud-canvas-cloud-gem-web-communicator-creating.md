# Communicating to Clients from a Cloud Gem<a name="cloud-canvas-cloud-gem-web-communicator-creating"></a>

To send messages to the Web Communicator service, your cloud gem can use the default channel that the Web Communicator cloud gem provides or a channel that you define\. Web Communicator can validate the message type and pass the message to AWS IoT for distribution to one or more clients\.

**Note**  
Because the caller of a cross\-gem request cannot be identified, any cloud gem can make a request to broadcast on any valid channel\. For this reason, you should consider the behavior of any gems in your project that implement [cross\-gem communication](https://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-cgf-service-api-cross-gem-communication.html)\.

To have your cloud gem send events through Web Communicator to connected clients, perform the following steps:

[1\. \(Optional\) Define Broadcast and/or Private Channels](#cloud-canvas-cloud-gem-web-communicator-creating-define-broadcast-andor-private-channels)

[2\. Add the Web Communcator Service Interface ID to Your Gem's resource\-template\.json File](#cloud-canvas-cloud-gem-web-communicator-creating-add-the-web-communcator-service-interface-id-to-your-gems-resource-template.json-file)

[3\. Send the Lambda Request from Your Service](#cloud-canvas-cloud-gem-web-communicator-creating-send-the-lambda-request-from-your-service)

[4\. Handle the Response on the Client](#cloud-canvas-cloud-gem-web-communicator-creating-handle-the-response-on-the-client)

## 1\. \(Optional\) Define Broadcast and/or Private Channels<a name="cloud-canvas-cloud-gem-web-communicator-creating-define-broadcast-andor-private-channels"></a>

You can optionally define your own channels in your cloud gem's `lumberyard_version\dev\Gems\gem_name\AWS\resource-group-settings.json` file\. A channel consists of a unique name, a type \(`BROADCAST` or `PRIVATE`\) and an optional `CommunicationChannel`\. To reduce the number of subscriptions required on the server, the communication channel system allows your channel to make use of a base channel by embedding your actual channel name in the message\. When messages are broadcast from other cloud gems as [EBus](ebus-intro.md) events, the channel name is embedded in the message and parsed on the client\.

To declare broadcast and/or private channels, add them to your cloud gem's `resource-group-settings.json` file in the `GemSettings`, `CloudGemWebCommunicator`, `Channels` section\. The following example is from the [Dynamic Content](cloud-canvas-cloud-gem-dc-manager.md) cloud gem\.

```
{
    "GemSettings":
    {
        "CloudGemWebCommunicator":
        {
            "Channels":
            [
                 {
                      "Name": "CloudGemDynamicContent",
                      "Types": ["BROADCAST","PRIVATE"],
                      "CommunicationChannel": "CloudGemWebCommunicator"
                 }
            ]
       }
    }
}
```

The relevant fields are as follows\.


****  

| Property | Description | 
| --- | --- | 
| Name | Specifies the name of the channel\. | 
| Types | The type of channel that you want to enable\. This can be BROADCAST, PRIVATE, or both\. | 
| CommunicationChannel | The name of the base WebCommunicator channel \(for example, CloudGemWebCommunicator\)\. For purposes of efficiency, the channel that actually carries the message is packed into the base channel\. The name of the carried channel \(in this example, CloudGemDynamicContent\) is embedded in the message itself\. Lumberyard unpacks this name transparently on the client side for the EBus handler\. | 

## 2\. Add the Web Communcator Service Interface ID to Your Gem's resource\-template\.json File<a name="cloud-canvas-cloud-gem-web-communicator-creating-add-the-web-communcator-service-interface-id-to-your-gems-resource-template.json-file"></a>

The request API between your cloud gem and the Web Communicator gem is built on the [cross\-gem communication system](cloud-canvas-cgf-service-api-cross-gem-communication.md)\. The interface for the Web Communicator's `broadcast` and `send` API operations are defined in the `lumberyard_version\dev\Gems\CloudGemWebCommunicator\AWS\api-defintion\sendmessage_1_0_0.json` file\.

To make this interface callable from your cloud gem's service Lambda function, you add an `InterfaceID` property to the `lumberyard_version\dev\Gems\gem_name\AWS\resource-template.json` file\.

In the `ServiceLambdaConfiguration` section, under `Properties`, add a `Services` section entry like the following\.

```
"Services": [
    {
        "InterfaceId": "CloudGemWebCommunicator_sendmessage_1_0_0",
        "Optional": "True"
     }
]
```

**Note**  
If you expect the Web Communicator to be continuously available, set the `Optional` property to `False`\.

For more information, see the [Using an Interface](cloud-canvas-cgf-service-api-cross-gem-communication.md#cloud-canvas-cgf-service-api-cross-gem-communication-using-an-interface) section of the cross\-gem communication topic\.

## 3\. Send the Lambda Request from Your Service<a name="cloud-canvas-cloud-gem-web-communicator-creating-send-the-lambda-request-from-your-service"></a>

To send a message from your cloud gem to one or more clients, your cloud gem’s Lambda code makes a call to the Web Communicator\. The call includes the message that you want to either broadcast to multiple clients or send to an individual user\.

First, in the Python module from which you want to make the messaging request, specify the following import statements\.

```
import cgf_lambda_settings
import cgf_service_client
```

### Broadcasting a Message<a name="cloud-canvas-cloud-gem-web-communicator-creating-broadcasting-a-message"></a>

To broadcast a message, use the *\_\_send\_communicator\_broadcast* function and pass the message text in the `message` parameter, as in the following example\.

```
def __send_communicator_broadcast(message):
    interface_url = cgf_lambda_settings.get_service_url("CloudGemWebCommunicator_sendmessage_1_0_0")
    if not interface_url:
        print('Messaging interface not found')
        return

    client = cgf_service_client.for_url(interface_url, verbose=True, session=boto3._get_default_session())
    result = client.navigate('broadcast').POST({"channel": "CloudGemDynamicContent", "message": message})
```

### Sending a Message Directly to a Client<a name="cloud-canvas-cloud-gem-web-communicator-creating-sending-a-message-directly-to-a-client"></a>

To send a message directly to a client, use the *\_\_send\_communicator\_direct* function\. As before, pass the message text in the `message` parameter, but this time specify the ID of a specific client in the `client_id` parameter\.

```
def __send_communicator_direct(message, client_id):
    interface_url = cgf_lambda_settings.get_service_url("CloudGemWebCommunicator_sendmessage_1_0_0")
    if not interface_url:
        print('Messaging interface not found')
        return

    client = cgf_service_client.for_url(interface_url, verbose=True, session=boto3._get_default_session())
    result = client.navigate('send', client_id).POST({"channel": "CloudGemDynamicContent", "message": message})
```

## 4\. Handle the Response on the Client<a name="cloud-canvas-cloud-gem-web-communicator-creating-handle-the-response-on-the-client"></a>

To handle the response on the client, subscribe manually or automatically to messages from Web Communicator, and then create a handler that processes the incoming messages\.

### Requesting a Connection<a name="cloud-canvas-cloud-gem-web-communicator-creating-requesting-a-connection"></a>

To request a connection, use the `RequestConnection` function\.

```
CloudGemWebCommunicatorRequestBus.Broadcast.RequestConnection("connection_type")       
```

For *connection\_type*, specify either `WEBSOCKET` or `OPENSSL`\.

### Requesting a Registration<a name="cloud-canvas-cloud-gem-web-communicator-creating-requesting-a-registration"></a>

To request a registration, use the `RequestRegistration` function\.

```
CloudGemWebCommunicatorRequestBus.Broadcast.RequestRegistration("connection_type")
```

For *connection\_type*, specify either `WEBSOCKET` or `OPENSSL`\.

### Subscribing to Channels<a name="cloud-canvas-cloud-gem-web-communicator-creating-subscribing-to-channels"></a>

You can use the `RequestChannelList` function to request and subscribe to the channels to which the client listens\.

#### Subscribing to All Channels<a name="cloud-canvas-cloud-gem-web-communicator-creating-subscribing-to-all-channels"></a>

To request and subscribe to all the channels that the client requires, use the `RequestChannelList` function\.

```
CloudGemWebCommunicatorRequestBus.Broadcast.RequestChannelList()         
```

You can also subscribe individually to channels, but using the `RequestChannelList` function is more straightforward and should be considered the standard approach\.

#### Subscribing to Individual Channels<a name="cloud-canvas-cloud-gem-web-communicator-creating-subscribing-to-individual-channels"></a>

To subscribe to channels manually, use the `RequestSubscribeChannel` function and specify the name of the channel in the `channelName` parameter, as in the following example\.

```
CloudGemWebCommunicatorRequestBus.Broadcast.RequestSubscribeChannel(channelName)         
```

**Note**  
If you specified the `CommunicationChannel` property in the [channel definitions step](#cloud-canvas-cloud-gem-web-communicator-creating-define-broadcast-andor-private-channels) \(that is, you are using a base channel\), specify that value for the `channelName` parameter\.

#### Unsubscribing from a Channel<a name="cloud-canvas-cloud-gem-web-communicator-creating-unsubscribing-from-a-channel"></a>

To unsubscribe from a channel, use the `RequestUnsubscribeChannel` function and specify the name of the channel in the `channelName` parameter, as in the following example\.

```
CloudGemWebCommunicatorRequestBus.Broadcast.RequestUnsubscribeChannel(channelName)         
```

### Disconnecting<a name="cloud-canvas-cloud-gem-web-communicator-creating-disconnecting"></a>

To disconnect, use the `RequestDisconnect` function\.

```
CloudGemWebCommunicatorRequestBus.Broadcast.RequestDisconnect()       
```

### Create a Message Handler<a name="cloud-canvas-cloud-gem-web-communicator-creating-create-a-message-handler"></a>

After you subscribe the client to one or more channels, create a message handler that processes the messages from Web Communicator\.

#### In Lua<a name="cloud-canvas-cloud-gem-web-communicator-creating-in-lua"></a>

In Lua, in an `OnActivate` call, set up an EBus connection to listen for Web Communicator updates:

```
if CloudGemWebCommunicatorUpdateBus ~= nil then
    Debug.Log("Listening for communicator updates")
    self.communicatorUpdateBus = CloudGemWebCommunicatorUpdateBus.Connect(self, WebCommunicator.ModuleEntity)
else
    Debug.Log("Web Communicator not found")
end
```

Next, declare your message handler, as in the following example\.

```
function DynamicContentTest:MessageReceived(channelName, messageData)
    if self:IsDynamicContentUpdate(channelName) then
        Debug.Log("DynamicContent update received: " .. messageData)
        DynamicContentRequestBus.Event.HandleWebCommunicatorUpdate(DynamicContent.ModuleEntity, messageData)
    end
end
```

For a sample Lua script, see `lumberyard_version\dev\CloudGemSamples\Scripts\CommunicatorSample.lua`\.

#### In C\+\+<a name="cloud-canvas-cloud-gem-web-communicator-creating-in-c"></a>

In C\+\+, declare a component handler class like the following:

```
class SomeHandler :
public CloudGemWebCommunicator::CloudGemWebCommunicatorUpdateBus::Handler
virtual void ConnectionStatusChanged(const AZStd::string& connection) = 0;
virtual void MessageReceived(const AZStd::string& channelName, const AZStd::string& channelMessage) = 0;
virtual void RegistrationStatusChanged(const AZStd::string& registrationStatus) = 0;
virtual void SubscriptionStatusChanged(const AZStd::string& channelName, const AZStd::string& subscriptionStatus) = 0;
Connect:
void SomeHandler::Activate()
{
    CloudGemWebCommunicator::CloudGemWebCommunicatorUpdateBus::Handler::BusConnect();
}
Handle:
void SomeHandler::MessageReceived(const AZStd::string& channelName, const AZStd::string& channelMessage)
{
    DoStuff;
}
```

## Resources<a name="cloud-canvas-cloud-gem-web-communicator-creating-resources"></a>

For more information, see the following:
+ For a sample level, see the [CommunicatorSample](cloud-canvas-cloud-gem-web-communicator-sample-level.md) sample level in the **CloudGemSamples** project\.
+ For more information about cross\-gem communication in Cloud Canvas, see [Cross\-Gem Communication](cloud-canvas-cgf-service-api-cross-gem-communication.md)\.
+ For the Web Communicator cloud gem API, see [Web Communicator Cloud Gem Service API](cloud-canvas-cloud-gem-web-communicator-service-api.md)\.
+ For the Web Communicator cloud gem source code, see the files in the `lumberyard_version\dev\Gems\CloudGemWebCommunicator\Code\` directory and its subdirectories\.