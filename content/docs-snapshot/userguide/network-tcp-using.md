# Using the TCP Stream Driver<a name="network-tcp-using"></a>

To use the TCP stream socket driver, you specify connection parameters for internal buffers, a listening port, and the maximum number of connections\.

After you construct the new stream driver, you can use the socket driver for server or client work\. For server work, the driver can monitor for connections\. For client work, the driver can connect to a server’s endpoint address and port\.

To start accepting new connections on the server, call the `StartListen()` method\. When new clients connect or disconnect, the socket driver sends events through the event bus\.

During the setup for the carrier instance, call the `StartListen()` method for servers and the `ConnectTo()` method for clients\. You can do this before you assign the `m_driver` member of the `CarrierDesc` structure\.

## Stream Connection Setup<a name="network-tcp-using-stream-connection-setup"></a>

To construct a stream socket driver, specify the maximum number of connections \(1 for clients\), the maximum packet size, and the byte sizes for the internal buffers for inbound and outbound traffic\.

To prepare the socket driver, use the `Initialize()` method with a socket family\. IPv4 and IPv6 are supported\. Specify binding parameters and socket buffer sizes\. The driver uses internal buffers to spool streamed traffic during the `Update()` call\. GridMate processes the `Update()` call when it is using the carrier instance\.

### Constructing the TCP Socket Driver<a name="network-tcp-using-constructing-the-tcp-socket-driver"></a>

The following code example shows how to construct the TCP socket driver\.

```
// Specify the maximum number of connections that the server accepts.
const AZ::u32 maxConnections = 32;

// Specify the largest packet to be sent.
const AZ::u32 maxPacketSize = 1024 * 64;

// Specify the size of the internal byte buffer that stores incoming bytes from the socket.
const AZ::u32 inboundBufferSize = 1024 * 64;

// Specify the size of the internal byte buffer that stores outbound bytes to the socket.
const AZ::u32 outboundBufferSize = 1024 * 64;
GridMate::StreamSocketDriver server(maxConnections, maxPacketSize, inboundBufferSize, outboundBufferSize);
```

Note the following:
+ The sizes are specified in bytes\.
+ The maximum packet size should be less than or equal to the outbound buffer size\.
+ Both buffer sizes are stored in application memory\.

### Initializing the Socket Driver<a name="network-tcp-using-initializing-the-socket-driver"></a>

The following code example shows how to initialize the TCP socket driver\.

```
// For IPv4, specify driver BSD_AF_INET. For IPv6, specify BSD_AF_INET6.
const AZ::s32 familyType = GridMate::Driver::BSD_AF_INET;

// Specify the address of the Ethernet card to bind to.
const char* address = "127.0.0.1";

// Specify the port for the server to monitor.
const AZ::u32 serverPort = 2017;

// Specify that TCP sockets cannot send broadcast packets.
const bool isBroadcast = false;

// Set the receive buffer size for each new socket.
const AZ::u32 receiveBufferSize = 1024 * 256;

// Set the send buffer size for each new socket.
const AZ::u32 sendBufferSize = 1024 * 64;
server.Initialize(familyType, address, serverPort, isBroadcast, receiveBufferSize, sendBufferSize);
```

Note the following:
+ Both server and client have to use the same socket family `AF_*` type\.
+ The address can be `nullptr`, which means bind to all the available network interfaces\.
+ The `isBroadcast` flag is always set to `false`, since a TCP socket is not able to send broadcast packets\.
+ The receive and send buffer size are specified in bytes and refer to the TCP stack’s buffer size for the socket\.

## Setting Up a Stream Socket Event Bus Handler<a name="network-tcp-using-setting-up-a-stream-socket-event-bus-handler"></a>

An event bus handler instance monitors connection events from GridMate’s stream socket driver\. The following code shows a simple stream socket event handler\.

```
struct ConnectionHandler : public GridMate::StreamSocketDriverEventsBus::Handler
{
    ConnectionHandler(GridMate::IGridMate* gridMate)
    {
        m_ConnectionCount = 0;
        GridMate::StreamSocketDriverEventsBus::Handler::BusConnect(gridMate);
    }
    ~ConnectionHandler()
    {
        m_ConnectionCount = -1;
        GridMate::StreamSocketDriverEventsBus::Handler::BusDisconnect();
    }
    void OnConnectionEstablished(const SocketDriverAddress& address) override
    {
        m_ConnectionCount++;
    }
    void OnConnectionDisconnected(const SocketDriverAddress& address) override
    {
        m_ConnectionCount--;
    }
    bool DidConnect()
    {
        return m_ConnectionCount > 0;
    }
    AZ::s32 m_ConnectionCount;};
```

## Processing a Server<a name="network-tcp-using-processing-a-server"></a>

After you construct and initialize the stream socket driver, use the `StartListen()` method to instruct the server to accept clients\. The `StartListen()` method takes a `backlog` parameter that specifies the incoming connection request limit\. The driver emits successful connections to its event bus\.

When you are finished with the server process, but before you shut down GridMate, call the `StopListen()` method\. To disconnect a client, you can use the `DisconnectFrom()` method on the server’s driver instance\.

## Processing a Client<a name="network-tcp-using-processing-a-client"></a>

To connect a client to a server, create a socket driver address\. To start the connection process, use the `ConnectTo()` method\. When the stream socket driver establishes a connection to the server, it sends a connect event\.

To disconnect from the server, the client code uses the `DisconnectFrom()` method\. The driver sends a disconnect event when the server gracefully disconnects from the client\.

## Sending and Receiving Data from the Stream Driver<a name="network-tcp-using-sending-and-receiving-data-from-the-stream-driver"></a>

To send and receive data from the stream driver, you use the `Send()` and `Receive()` methods just as you do with the UDP driver\.

For both sending and receiving, the `data` and `data size` values should be equal to or greater than the maximum packet size\. If the `Send()` method does not return `GridMate::Driver::EC_OK`, then the connection to the remote endpoint has been closed\.

The `Receive()` method returns the number of bytes written to the data buffer\. If it returns zero \(0\) bytes and returns a result code of `GridMate::Driver::EC_OK`, then no more packets are ready to be read\.