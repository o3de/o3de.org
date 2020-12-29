# Web Communicator Cloud Gem Service API<a name="cloud-canvas-cloud-gem-web-communicator-service-api"></a>

The Web Communicator cloud gem service API contains the following general requests, client requests, and portal requests\. These calls are exposed on the client by the code in `lumberyard_version\dev\Gems\CloudGemWebCommunicator\Code\AWS\ServiceApi\CloudGemWebCommunicatorClientComponent.*` and are used by the Cloud Gem Portal\. You do not have to manage these calls directly on the client or portal\. 

 [GET /service/status](#cloud-canvas-cloud-gem-web-communicator-service-api-get-servicestatus) 

[GET /client/channels](#cloud-canvas-cloud-gem-web-communicator-service-api-get-clientchannels) 

[POST /client/channel](#cloud-canvas-cloud-gem-web-communicator-service-api-post-clientchannel) 

[GET /client/registration/`{registration_type}`](#cloud-canvas-cloud-gem-web-communicator-service-api-get-clientregistrationregistration-type) 

[GET /portal/channel](#cloud-canvas-cloud-gem-web-communicator-service-api-get-portalchannel) 

[POST /portal/channel](#cloud-canvas-cloud-gem-web-communicator-service-api-post-portalchannel) 

[GET /portal/users](#cloud-canvas-cloud-gem-web-communicator-service-api-get-portalusers) 

[POST /portal/users](#cloud-canvas-cloud-gem-web-communicator-service-api-post-portalusers) 

## General Requests<a name="cloud-canvas-cloud-gem-web-communicator-service-api-general-requests"></a>

The Web Communicator cloud gem service API contains a request to get service status\.

### GET /service/status<a name="cloud-canvas-cloud-gem-web-communicator-service-api-get-servicestatus"></a>

Returns the service's status\. This request is useful for testing connectivity\.

## Client Requests<a name="cloud-canvas-cloud-gem-web-communicator-service-api-client-requests"></a>

### GET /client/channels<a name="cloud-canvas-cloud-gem-web-communicator-service-api-get-clientchannels"></a>

Requests a list of channels available to the client\. Returns a `ChannelRequestResult` object\.

The `ChannelRequestResult` object contains a `ChannelRequestResultArray` object

The `ChannelRequestResultArray` object contains a `ChannelInfo` object\.


**ChannelInfo Object**  

| Name | Type | Description | 
| --- | --- | --- | 
| ChannelName | String | The name of the channel to which to connect\. | 
| CommunicationChannel | String | The name of the communication channel\. | 
| CommunicationType | String | Can be one of RECEIVE, SEND, or BOTH\. | 
| Subscription | String | The name of the subscription\. | 

### POST /client/channel<a name="cloud-canvas-cloud-gem-web-communicator-service-api-post-clientchannel"></a>

Posts a message to a client channel\.

The request parameter is a `BroadcastRequest` object\.


**BroadcastRequest Object**  

| Name | Type | Description | 
| --- | --- | --- | 
| ChannelName | String | The channel to which to publish\. | 
| Message | String | The message to send\. | 

### GET /client/registration/`{registration_type}`<a name="cloud-canvas-cloud-gem-web-communicator-service-api-get-clientregistrationregistration-type"></a>

Requests the registration of a new client\. Returns a `RegistrationResult` object and a `ChannelRequestResult` object\.


**Request Parameters**  

| Name | Type | Description | 
| --- | --- | --- | 
| registration\_type | String | Type of connection that the client uses\. Specify OPENSSL or WEBSOCKET\. | 


**RegistrationResult Object**  

| Name | Type | Description | 
| --- | --- | --- | 
| ConnectionType | String | Can be OPENSSL or WEBSOCKET\. | 
| DeviceCert | String | For OpenSSL connections, a one time only device certificate\. | 
| Endpoint | String | The AWS IoT connection address\. | 
| EndpointPort | Double | The AWS IoT connection port\. | 
| PrivateKey | String | For OpenSSL connections, a one time only private key\. | 
| Result | String | Can be DENIED or SUCCESS\. | 

The `ChannelRequestResult` object contains a `ChannelRequestResultArray` object\.

The `ChannelRequestResultArray` object contains a `ChannelInfo` object\.

For the contents of the `ChannelInfo` object, see [GET /client/channels](#cloud-canvas-cloud-gem-web-communicator-service-api-get-clientchannels)\.

## Portal Requests<a name="cloud-canvas-cloud-gem-web-communicator-service-api-portal-requests"></a>

### GET /portal/channel<a name="cloud-canvas-cloud-gem-web-communicator-service-api-get-portalchannel"></a>

Lists all requested channels including their `CommunicationChannel` or subscription channel\.

### POST /portal/channel<a name="cloud-canvas-cloud-gem-web-communicator-service-api-post-portalchannel"></a>

Sends a request from the Cloud Gem Portal to broadcast to a channel\. Returns a response from AWS IoT\.

The request parameter is a `BroadcastRequest` object\.

For the contents of the `BroadcastRequest` object, see [POST /client/channel](#cloud-canvas-cloud-gem-web-communicator-service-api-post-clientchannel)\.

### GET /portal/users<a name="cloud-canvas-cloud-gem-web-communicator-service-api-get-portalusers"></a>

Returns the list of users to display in the web portal\. The list of users is returned in a `PortalUserListResults` object\.

The `PortalUserListResults` object contains a `PortalUserListResultArray`\.

The `PortalUserListResultArray` contains a `PortalSetUserStatus` object\.


**PortalSetUserStatus Object**  

| Name | Type | Description | 
| --- | --- | --- | 
| ClientID | String | The Amazon Cognito Identity for each user\. | 
| RegistrationStatus | String | Can be REGISTERED or BANNED\. | 

### POST /portal/users<a name="cloud-canvas-cloud-gem-web-communicator-service-api-post-portalusers"></a>

Request from the portal to update user registration status\. If successful, the request modifies the user's AWS IoT policy to ban or unban the user\. Returns a `PortalSetUserStatus` object that contains the new status for the user\.

The request parameter is a `PortalSetUserStatus` object\.

For the contents of `PortalSetUserStatus` object, see [GET /portal/users](#cloud-canvas-cloud-gem-web-communicator-service-api-get-portalusers)\.