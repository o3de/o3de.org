# Carrier<a name="network-carrier"></a>

Carrier is GridMate's messaging API\. GridMate's reliable UDP implementation supports both reliable and unreliable messages\. There is no out\-of\-order delivery\. Out\-of\-order messages are queued if sent reliably, or discarded if sent unreliably\. 

The carrier sends messages through channels\. The purpose of channels is to separate unrelated traffic, such as game state and voice chat\. Message ordering is not enforced across channels\. 

The carrier API also provides hooks for congestion control and traffic simulation\. 

## Channels and Message Priorities<a name="network-carrier-channels-and-message-priorities"></a>

Messages can be sent on different channels and have different priorities\. Message ordering is always maintained between messages with the same priority sent on the same channel\. 

Channels provide a way to separate unrelated messages so that their ordering does not affect one other\. When messages arrive out of order, they are either discarded or queued \(and therefore delayed\) depending on their reliability\. Using different channels prevents unrelated messages from being unnecessarily dropped or delayed\. For example, object replication traffic and voice chat traffic can be sent on different channels, so a missing reliable message for object replication would not cause voice chat data to be dropped, and vice versa\. 

## Customizable Classes<a name="network-carrier-customizable-classes"></a>

 You can customize the following classes to implement your own networking features: 
+  **Driver** \- Carrier defers actual network operations to the driver, so different implementations can be provided for different operating systems and devices\. This abstraction makes it possible to use OS or device\-specific protocols from service providers such as Steam\. The default implementation uses UDP and supports IPv4 and IPv6\. 
+  **Simulator** \- If a network simulator is present, the carrier passes all inbound and outbound traffic through it so different network conditions can be simulated\. One simulator instance can be supplied per carrier instance\. The default implementation can simulate different patterns for inbound and/or outbound latency, bandwidth caps, packet loss and packet reordering\. 
+  **Traffic Control** \- The traffic control module has two primary functions: provide network statistics and congestion control\. Whenever messages are sent or received, they are passed along to the traffic control module so it can update its statistics, and also so it can provide feedback to limit the amount of data being sent\. It also decides if messages should be considered lost and resent by the carrier\. 

## CarrierDesc<a name="network-carrier-carrierdesc"></a>

 `CarrierDesc` is the carrier descriptor\. When you create a carrier, you use the `CarrierDesc` structure to specify the parameters for the current session\. 

### CarrierDesc Parameters<a name="network-carrier-carrierdesc-parameters"></a>

 The following parameters can be supplied during carrier initialization: 


****  

| Parameter | Data Type | Description | 
| --- | --- | --- | 
|  m\_address  | const char \* | Specifies the local communication address to which the driver will bind\. A value of 0 specifies any address\. The default is nullptr\. | 
|  m\_connectionEvaluationThreshold  | float | When a disconnection is detected, specifies the threshold at which all other connections are checked using m\_connectionTimeoutMS \* m\_connectionEvaluationThreshold to see if they are also failing because of a network failure\. The default is 0\.5f\. | 
|  m\_connectionTimeoutMS  | unsigned int | Determines the time to allow for a connection attempt\. The default is 5000 milliseconds\. | 
|  m\_disconnectDetectionPacketLossThreshold  | float | Packet loss percentage threshold\. Possible values are from 0\.0 to 1\.0, where 1\.0 is 100 percent\. The connection will be dropped after packet loss exceeds the value specified\. The default is 0\.3f\. | 
|  m\_disconnectDetectionRttThreshold  | float | Specifies the RTT \([round\-trip time](https://en.wikipedia.org/wiki/Round-trip_delay_time)\) threshold in milliseconds\. The connection is dropped when the measured RTT is greater than the value specified\. The default is 500\.0f\. | 
| m\_driver | class Driver \* | Specifies a custom driver implementation\. The default is nullptr\. | 
| m\_driverIsCrossPlatform | bool | Specifies whether the driver maintains cross\-OS and device compatibility\. When true, the default driver drops to the most restrictive MTU \([maximum transmission unit](https://en.wikipedia.org/wiki/Maximum_transmission_unit)\) across all supported operating systems and devices\. The default is false\. | 
| m\_driverIsFullPackets | bool | Specifies whether the driver ignores MTU limits\. This parameter applies only to socket drivers and local area networks\. An internet packet is usually around 1500 bytes\. A value of true enables a maximum packet size of 64 KB\. These big packets fail on the Internet but typically do not on local networks\. The default is false\. | 
| m\_driverReceiveBufferSize | unsigned int | Specifies the size of the internal receive buffer that the driver uses\. A value of 0 specifies the default buffer size\. This parameter can be used only if m\_driver == null\. The default is 0\. | 
| m\_driverSendBufferSize | unsigned int | Specifies the size of the internal send buffer that the driver uses\. A value of 0 specifies the default buffer size\. This parameter can be used only if m\_driver == null\. The default is 0\. | 
| m\_enableDisconnectionDetection | bool |  Specifies whether the carrier drops connections when traffic conditions are bad\. The default is `true`\.   This parameter should be set to `false` only when debugging\.   | 
| m\_familyType | int | Specifies the protocol family that the driver uses\. A value of 0 specifies the default family\. | 
| m\_port | unsigned int | Specifies the local communication port to which the driver binds\. A value of 0 specifies the port assigned by the system\. | 
| m\_securityData | const char \* | Specifies a pointer to a string with security data\. The default is nullptr\. | 
| m\_sendBatchPacketCount | int |  Specifies the number of full maximum transmission size \(MTU\) packets to queue before a send event is triggered\. You can use this parameter to batch small messages into a single packet\.  The default value is `0`, which means no batching\. When `m_sendBatchPacketCount` is set to `0`, all messages immediately trigger a send event on the carrier thread\.  To prevent data transmission from stalling, the carrier thread times out at the time specified by the `m_threadUpdateTimeMS` parameter\. When the carrier thread receives a packet, it also checks the send queue for outgoing messages\.  This parameter is available in Lumberyard 1\.16 and later versions\.   | 
| m\_simulator | class Simulator \* | Optionally specifies a simulator through which all network messages are filtered\. When specified, the carrier passes all inbound and outbound traffic through the specified simulator so that different network conditions can be simulated\. You can specify one simulator instance per carrier instance\. | 
| m\_threadCpuID | int | Restricts the carrier thread to a specific CPU core\. The values that can be specified are operating system and device dependent\. A value of \-1 specifies no restriction\. The default is \-1\. | 
| m\_threadInstantResponse | bool |   Specifies whether I/O events wake up the carrier thread immediately\. The default is `false`\.   Setting this value to `true` typically uses more bandwidth because messages \(especially small messages\) are grouped less efficiently\.    In Lumberyard 1\.16 and later versions, `m_threadInstantResponse` affects only the reception of carrier thread packets\. To send all messages immediately, the `m_sendBatchPacketCount` parameter must be set to `0` \(the default\)\.   | 
| m\_threadPriority | int | Specifies the thread priority for the carrier thread\. The values that can be specified are operating system and device dependent\. A value of \-100000 inherits the priority from calling thread\. The default is \-100000\. | 
| m\_threadUpdateTimeMS | int | Specifies, in milliseconds, how often the carrier thread is updated\. This parameter is ignored if m\_threadInstantResponse is true\. Possible values are from 0 through 100\. In general, the time interval should be higher than 10 milliseconds\. Otherwise, it is more efficient to set m\_threadInstantResponse to true\. The default is 30 milliseconds\. | 
| m\_trafficControl | class TrafficControl \* | Specifies a custom traffic control implementation that controls traffic flow to all connections and that handles issues like network congestion\. | 
| m\_version | VersionType |  Specifies the version of Carrier API that is being used\. Carriers with mismatching version numbers are not allowed to connect to each other\. The default is `1`\.  | 

**Topics**
+ [Channels and Message Priorities](#network-carrier-channels-and-message-priorities)
+ [Customizable Classes](#network-carrier-customizable-classes)
+ [CarrierDesc](#network-carrier-carrierdesc)
+ [Carrier Message Structure](network-carrier-message-structure.md)
+ [The TCP Stream Driver](network-tcp.md)
+ [Using Windows Registered I/O with GridMate](network-carrier-rio.md)