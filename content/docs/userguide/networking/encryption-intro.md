---
description: ' Encrypt traffic among clients and servers in a GridMate session in
  Amazon Lumberyard. '
title: Using Encryption
---
# Using Encryption {#network-encryption-intro}

GridMate uses the [OpenSSL](https://www.openssl.org/) implementation of [Datagram Transport Layer Security](https://tools.ietf.org/html/rfc6347) \(DTLS\) to support encryption of all UDP traffic sent between clients and servers\.

## Limitations {#network-encryption-intro-limitations}

GridMate's implementation of encryption has the following limitations:
+  Only 64\-bit Windows is supported\.
+  Only client\-server topologies are supported\.

## Implementation Support {#network-encryption-intro-implementation-support}

GridMate supports encryption for the following implementations:
+  Server and client authentication
+  Self\-signed certificates
+  A single strong OpenSSL cipher

## Cipher {#network-encryption-intro-cipher}

GridMate uses the following single OpenSSL cipher for all encrypted connections: `ECDHE-RSA-AES256-GCM-SHA384`\.

 This cipher uses the technologies listed in the following table:


**Cipher Technologies in GridMate**

|  **Technology**  |  ** Role**  |  ** Description**  |
| --- | --- | --- |
|  ECDHE  |  Key exchange  | [Ephemeral Elliptic Curve Diffie\-Hellman](https://en.wikipedia.org/wiki/Elliptic_curve_Diffie-Hellman) anonymous key agreement protocol |
|  RSA  |  Peer authentication  | [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) algorithm used to authenticate client and server  |
|  AES256  |  Symmetric encryption cipher |  [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) that uses a 256\-bit key |
|  GCM  |  [Block cipher mode of operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation)  | [Galois/Counter Mode](https://en.wikipedia.org/wiki/Galois/Counter_Mode) authenticated encryption algorithm |
|  SHA384  |  Hashing algorithm  | [SHA\-2](https://en.wikipedia.org/wiki/SHA-2) with a 384\-bit digest size |

**Topics**
+ [Limitations](#network-encryption-intro-limitations)
+ [Implementation Support](#network-encryption-intro-implementation-support)
+ [Cipher](#network-encryption-intro-cipher)
+ [Building with Encryption](/docs/userguide/networking/encryption-building.md)
+ [Enabling Encryption](/docs/userguide/networking/encryption-enabling.md)