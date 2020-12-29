# The TCP Stream Driver<a name="network-tcp"></a>

Starting with Lumberyard version 1\.10, the GridMate library offers a TCP socket driver in addition to its existing UDP driver\. Unlike UDP, the TCP protocol uses direct connections, which require a listening port and established server endpoint that clients can use\. The GridMate library also adds an event bus that detects stream connect and disconnect events for TCP\.

## TCP Socket Driver Classes<a name="network-tcp-tcp-socket-driver-classes"></a>

The TCP socket driver has four public classes in the GridMate namespace that handle TCP packet traffic\.

### GridMate::StreamSocketDriver<a name="network-tcp-socket-driver-classes-gridmatestreamsocketdriver"></a>

This socket driver has methods that handle TCP connections\.


**Stream Socket Methods**  

| Action | Method | 
| --- | --- | 
| Establish a direct connection to a listening server | ResultCode ConnectTo\(const SocketDriverAddressPtr& addr\) | 
| Break an established TCP connection | ResultCode DisconnectFrom\(const SocketDriverAddressPtr& addr\); | 
| Start accepting connections to the server | ResultCode StartListen\(AZ::s32 backlog\); | 
| Stop the server from accepting connections | `ResultCode StopListen();`  This call does not shut down the driver\. You can start monitoring after the call\.  | 
| Poll the number of established connections | AZ::u32 GetNumberOfConnections\(\) const; | 
| Query whether a remote address endpoint is connected | bool IsConnectedTo\(const SocketDriverAddressPtr& to\) const; | 
| Query whether the driver is actively listening for new connections | bool IsListening\(\) const; | 

### GridMate::StreamSocketDriverEventsBus<a name="network-tcp-socket-driver-classes-gridmatestreamsocketdrivereventsbus"></a>

The socket driver event bus has methods that detect connection and disconnection events\.


**Stream Socket Events Bus Methods**  

| Callback that occurs when | Method | 
| --- | --- | 
| The socket driver establishes a connection | virtual void OnConnectionEstablished\(const SocketDriverAddress& address\); | 
| The socket driver detects a removed connection | virtual void OnConnectionDisconnected\(const SocketDriverAddress& address\); | 

### GridMate::StreamSecureSocketDriver<a name="network-tcp-socket-driver-classes-gridmatestreamsecuresocketdriver"></a>

The secure stream socket driver has the following method that initializes cryptographic data for the driver\. It calls the `Initialize()` method before setting up the key and/or certificate\.

```
ResultCode InitializeSecurity(AZ::s32 familyType, const char* address, AZ::u32 port, AZ::u32 receiveBufferSize, AZ::u32 sendBufferSize, StreamSecureSocketDriverDesc& desc); 
```

### GridMate::StreamSecureSocketDriver::StreamSecureSocketDriverDesc<a name="network-tcp-socket-driver-classes-gridmatestreamsecuresocketdriverstreamsecuresocketdriverdesc"></a>

The secure stream socket driver requires a description structure to set up the cryptographic key, certificates, and options\. The description structure has the following members\.


****  

| Member | Description | 
| --- | --- | 
| const char\* m\_privateKeyPEM; | A base64 encoded PEM format private key that is used on the server only\. | 
| const char\* m\_certificatePEM; | A base64 encoded PEM format certificate\. This public certificate encrypts the Transport Layer Security \(TLS\) handshake\. | 
| const char\* m\_certificateAuthorityPEM; | A base64 encoded PEM format CA root certificate\. | 
| bool m\_authenticateClient; | Ensures that both the client and server authenticate the PEM certificate\. This setting is made on the server\. The default is false; only the server is authenticated by default\. | 

## Security<a name="network-tcp-security"></a>

You can optionally use the OpenSSL library with the TCP socket driver to support encryption of all streamed network traffic between server and clients\. In Lumberyard, this security feature is currently available only for the Windows and Linux operating systems\. The TCP socket driver implements these security features in the `GridMate::StreamSecureSocketDriver` class\.

Set up server\-side cryptographic keys and certificates as in the following example\.

```
GridMate::StreamSecureSocketDriver server;
GridMate::StreamSecureSocketDriver::StreamSecureSocketDriverDesc desc;
desc.m_certificatePEM = myCertPEM;
desc.m_privateKeyPEM = myPrivateKeyPEM;
const AZ::u16 port = 5555;
server.InitializeSecurity(GridMate::Driver::BSD_AF_INET, nullptr, port, 1024*64, 1024 * 64, desc);
```

The `InitializeSecurity()` method is used instead of the `Initialize()` method from the stream socket driver\. You can also enable client\-side certificate authentication in the secure driver description\. The default is server side only\.

Client\-side setup is similar to the server side but does not require a private key, as in the following code example\.

```
GridMate::StreamSecureSocketDriver client;
GridMate::StreamSecureSocketDriver::StreamSecureSocketDriverDesc desc;
desc.m_certificateAuthorityPEM = myPublicCertPEM;
client.InitializeSecurity(GridMate::Driver::BSD_AF_INET, nullptr, 0, 1024 * 64, 1024 * 64, desc);
```

For more information about cryptographic key and security certificate options, see [Enabling Encryption](network-encryption-enabling.md)\.

For more information about using the TCP stream driver, see [Using the TCP Stream Driver](network-tcp-using.md)\.