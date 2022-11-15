---
linktitle: UDP Encryption
title: UDP with Datagram Transport Layer Security (DTLS)
description: Learn about the encryption capabilities of the Open 3D Engine (O3DE) `AzNetworking` framework and how to use them in your project.
weight: 300
---

To provide encryption to secure UDP packets, **Open 3D Engine (O3DE)** uses [OpenSSL](https://www.openssl.org/) to implement *Datagram Transport Layer Security (DTLS)*. The O3DE `AzNetworking` framework provides the [DtlsSocket](/docs/api/frameworks/aznetworking/class_az_networking_1_1_dtls_socket.html) and [DtlsEndpoint](/docs/api/frameworks/aznetworking/class_az_networking_1_1_dtls_endpoint.html) classes to enable DTLS over UDP. When encryption is enabled and configured in the O3DE networking system, the transport layer automatically uses `DtlsSocket` objects rather than `UdpSocket`. The role of `DtlsEndpoint` is to capture the connection target and handle SSL operations.

## Handshake

One reason to be wary of using DTLS is that the handshake process for establishing a connection is an expensive operation. The following image[^1] shows the process by which the client and server negotiate before data transmission.

![DTLS handshake diagram. 'Hello' is exchanged and verified, certificates are sent to the client, the server verifies the request, the server establishes the cipher, and data transmission begins.](/images/user-guide/networking/dtls-handshake.png)

The O3DE Network Transport Layer takes the approach of simply repeating the handshake process until the underlying OpenSSL library says that the connection is established. By using this approach, O3DE can enable and store cookies without having to any additional configuration past the handshake.

The packet types used to complete the handshake operation are:

* `InitiateConnectionPacket` - Signals intent to perform the unencrypted connection. After the connection is established, sends the request to enable SSL, initiating the DTLS handshake.
* `ConnectionHandshakePacket` - Transmits handshake data from the underlying OpenSSL handshake calls.
* `FragmentedPacket` - Fragmented packets used by `ConnectionHandshakePacket` to allow the SSL data exchanged in handshake to exceed MTU.

To ensure only these types transmit, all other packets are queued to be sent after authentication. This occurs prior to any packet fragmentation so the only `FragmentedPackets` generated are of `ConnectionHandshakePacket`.

{{< note >}}
These classes have no API reference as they're generated during the Open 3D Engine build by [AzAutoGen](/docs/user-guide/programming/autogen/) from the contents of `Code/Framework/AzNetworking/AzNetworking/AutoGen`.
{{< /note >}}

Once one side of the handshake has confirmed initialization of SSL, it immediately begins transmitting encrypted traffic. If the other side of the handshake process hasn't yet completed its SSL initialization, this presents a problem where encrypted traffic needs to be blocked while the handshake completes. In order to handle this issue, an encrypted socket will drop data it believes to be garbage **only** while connecting. Once the handshake has completed, receiving garbage data will lead to a disconnect.

## Application Data Transmission

Once authenticated, encryption is the last step performed when sending a packet. This is largely due to the assumption that any packet received by an authenticated endpoint is already encrypted. As long as the `DtlsEndpoint` is viewed as connected, all packets are encrypted.

Encryption can often increase the payload size of a packet. In order to ensure this tax doesn't increase packet size over the MTU, O3DE subtracts an amount of available data for the application to accommodate the encryption size. The result is that packets close to MTU prior to encryption can end up being preemptively fragmented with encryption enabled.

## References

[^1]: [DTLS performance in duty-cycled networks - Scientific Figure on ResearchGate](https://www.researchgate.net/figure/Message-exchange-during-a-DTLS-handshake-Messages-in-parentheses-are-not-sent-for_fig1_308815075) \[accessed 31 May, 2021\]