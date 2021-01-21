---
description: ' Use the Websockets Gem to add support for the WebSocket protocol to
  your &ALYlong; project. '
title: Websockets &gem;
---
# Websockets Gem {#gem-websockets}

The Websockets Gem provides an easy way to create WebSocket clients for your Lumberyard games and projects\. With this gem, you can connect to WebSocket servers and take advantage of the full\-duplex communication that they provide\.

This gem is designed to work with any platform\-specific library that's needed\. Each platform is divided out and separated, allowing libraries and features to be added quickly and easily, or to exchange existing or outdated tools with new ones\. On Windows and Linux, the gem uses a well\-known WebSocket library, **WebSocket\+\+**, which is included in the gem\.

The gem uses the **WebSocket protocol** to create clients that connect to existing WebSocket servers\. Using the gem bus system, you can create multiple WebSocket connections, and then send and receive messages\.

**Websocket Requests Bus**
The Websocket Request bus provides the primary interface for working with the gem\. The follow functions are available:
+ **CreateClient** - Provides the unique instance connection that will be used with the rest of the buses\. It takes three arguments:

  1. The WebSocket server address\.

  1. A received message handler function \(`OnMessage` function\)\.

  1. A type of connection\. If no type is defined, it defaults to `Secure`\.
+ **IsConnectionOpen** - Used to check if the connection is open\. Since WebSockets connections are always open, there is no need to verify if the connection has timed out, or to wait for a ping\. Connections can be verified immediately\.
+ **SendWebsocketMessage** - Sends strings to the targeted server\.
+ **SendWebsocketMessageBinary** - Sends a binary stream to the targeted server\.
+ **CloseWebsocket** - The expectation for WebSocket connections is that the developer will close the WebSocket before the program is finished, allowing for a clean exit\. This system will handle this automatically if not performed, but it is recommended, especially if there is a case where multiple connections are being setup simultaneously, to avoid having sockets open unnecessarily\.

**Tip**
For an example of the usage of these functions, see the source for the Twitch Chat gem, which can be found in `dev\Gems\TwitchChatPlay\`\.

**IWebsocketClient**
The IWebsocketClient class is an interface that sits at the base of the entire Websockets Gem\. It provides a direct interface to the individual connections to WebSockets for users who wish to avoid the bus system in cases where speed is paramount\. It provides all of the same functionality as the bus system once the connection has been created, with none of the overhead\.

**SecureWebsocketClient vs WebsocketClient**
The Websockets Gem provides a method to create both secure and normal WebSocket clients, with the default being secure WebSockets connections\. Secure WebSocket connections provide OpenSSL \(Transport Layer Security\) for protecting client\-server connections using the standard included in Lumberyard\.

**OnMessage Function**
Every WebSocket connection needs a message handler function to receive incoming messages from the server\. The `OnMessage` function interface provides a simple method for you to provide this handler function\. By providing a function pointer or lambda with the signature `void (AZ::string_view)`, you can have your own custom functions handle responses, as shown in the following example:

```
Websockets::OnMessage messageFunc = [this](const AZStd::string_view message)
    {
        HandleResponses(message);
    };
```

## Known Issues {#gem-websockets-known-issues}

The following are known issues to be aware of when using this gem:

1. Amazon GameLift and the Websockets Gem are not currently compatible\. Both GameLift and the gem use **Websocket\+\+**, but unfortunately, the GameLift version is much older\. In monolithic \(release\) builds, this creates linker issues that will cause a crash when both are active\.

   Until a long\-term fix is provided, you can make a simple change to the gem to fix this\. Modify the **WebSocket\+\+** version within the gem to work with a new namespace\. For example, change the `websocketpp` namespace to `websocketppaz`\.