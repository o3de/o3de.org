# Web Communicator Cloud Gem<a name="cloud-canvas-cloud-gem-web-communicator"></a>

You can use the Web Communicator cloud gem to inform your game's connected clients, editors, or servers of events from other cloud gems\. Your game clients, editors, or servers can use this information to take action \(such as updating themselves\) without restarting or polling AWS services for updates\.

The following diagram shows how the Web Communicator cloud gem connects cloud gems like Dynamic Content to the receivers of the events\. 

![\[Web Communicator connects cloud gems to game clients, editors, or servers\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-web-communicator-1.png)

Cloud gems like Dynamic Content send events through Lumberyard's [cross\-gem communication system](cloud-canvas-cgf-service-api-cross-gem-communication.md) to the Web Communicator cloud gem\. The Web Communicator cloud gem sends the event to the client through [AWS IoT](https://aws.amazon.com/iot-core), which maintains a persistent socket connection with the client\. Your game can use this channel of communication to notify the client that new content is available\. The client can then download the new content or update itself as needed\.

**Note**  
You can publish and receive from your game client, editor, or server\. However, to reduce potential expenses, the default implementation on all channels is receive only\.

## Publishing Messages<a name="cloud-canvas-cloud-gem-web-communicator-publishing-messages"></a>

You can publish messages directly through AWS IoT or send them through the Web Communicator API first for validation\. Each method is useful for the following applications:
+ **Directly through AWS IoT** – For communication between trusted parties \(for example, from editor to editor\)\.
+ **Web Communicator API** – For game client messages that require validation before publishing\.

## User ID and Status Table<a name="cloud-canvas-cloud-gem-web-communicator-user-id-and-status-table"></a>

The Web Communicator cloud gem supports a simple DynamoDB table that records the Amazon Cognito Identity and status of registered users\. The Web Communicator cloud gem handles portal requests to list uses and modify their status\. Setting a user's status to "banned" revokes the user's AWS IoT policy and prevents the user from connecting or receiving further messages\.

## Connection Types<a name="cloud-canvas-cloud-gem-web-communicator-connection-types"></a>

The Web Communicator cloud gem can use [WebSocket](https://en.wikipedia.org/wiki/WebSocket) or [OpenSSL](https://en.wikipedia.org/wiki/OpenSSL) connections\.

### WebSocket Connections<a name="cloud-canvas-cloud-gem-web-communicator-websocket-connections"></a>

Web Communicator uses WebSocket connections and [Amazon Cognito](https://aws.amazon.com/cognito/) identities by default\. WebSocket connections, which use [Message Queuing Telemetry Transport \(MQTT\)](https://en.wikipedia.org/wiki/MQTT) clients and AWS Signature Version 4, attach the AWS IoT policy to the Amazon Cognito Identity of the user\. AWS Signature Version 4 is a protocol for authenticating inbound API requests to AWS services over WebSocket connections\. For more information, see [Authenticating Requests \(AWS Signature Version 4\)](https://docs.aws.amazon.com/general/latest/gr/sig-v4-authenticating-requests.html) in the *AWS General Reference*\.

For samples of Amazon Cognito and AWS IoT policies that Web Communicator creates, see [Web Communicator Cloud Gem Authentication and AWS Policies](cloud-canvas-cloud-gem-web-communicator-policies.md)\.

### OpenSSL Connections<a name="cloud-canvas-cloud-gem-web-communicator-openssl-connections"></a>

OpenSSL connections, which are commonly used for embedded devices, use the MQTT protocol and certificate authentication\. In OpenSSL connections, each device has a certificate and a private key that are used for encrypted communications\. 

You can use the [Web Communicator Cloud Gem Portal](cloud-canvas-cloud-gem-web-communicator-cgp.md) to generate the certificates and keys that OpenSSL requires\. The client can connect through OpenSSL after the certificates and keys are installed in the `@user@\certs\aws` directory\. The Web Communicator service attaches the appropriate policy to the certificate\. The certificate and private key are returned to the client and cached on the client\.

**Note**  
By default, only WebSocket connections can be registered directly from the client\. This behavior can be changed in the `client_request.py` `request_registration` call\.

## AWS IoT Pricing<a name="cloud-canvas-cloud-gem-web-communicator-aws-iot-pricing"></a>

AWS IoT prices connectivity per million minutes of connection or per device per each year\. Message pricing is per million messages and decreases with volume pricing\. For more information, see [AWS IoT Core Pricing](https://aws.amazon.com/iot-core/pricing/)\.

**Topics**
+ [Publishing Messages](#cloud-canvas-cloud-gem-web-communicator-publishing-messages)
+ [User ID and Status Table](#cloud-canvas-cloud-gem-web-communicator-user-id-and-status-table)
+ [Connection Types](#cloud-canvas-cloud-gem-web-communicator-connection-types)
+ [AWS IoT Pricing](#cloud-canvas-cloud-gem-web-communicator-aws-iot-pricing)
+ [Web Communicator Cloud Gem Portal](cloud-canvas-cloud-gem-web-communicator-cgp.md)
+ [Testing the Web Communicator Cloud Gem](cloud-canvas-cloud-gem-web-communicator-sample-level.md)
+ [Communicating to Clients from a Cloud Gem](cloud-canvas-cloud-gem-web-communicator-creating.md)
+ [Web Communicator Cloud Gem Authentication and AWS Policies](cloud-canvas-cloud-gem-web-communicator-policies.md)
+ [Web Communicator Cloud Gem Service API](cloud-canvas-cloud-gem-web-communicator-service-api.md)