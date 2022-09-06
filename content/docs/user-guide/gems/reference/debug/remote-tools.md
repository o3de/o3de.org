---
linkTitle: Remote Tools
title: Remote Tools Gem
description: The Remote Tools Gem provides an API for O3DE applications to connect to each other for debugging purposes.
toc: true
---

The **Remote Tools Gem** provides AzNetworking based connectivity features to allow for O3DE applications to connect to each other to enable debugging. An example of this would be O3DE Editor connecting to Lua IDE to debug Lua scripts.

The **Remote Tools Gem** works by implementing the IRemoteTools interface in AzFramework. Because the Gem is intended for debugging purposes, this registration is compiled out for release builds.

{{< note >}}
**Remote Tools Gem** behavior, which includes Lua IDE debugging, is disabled in release builds.
{{< /note >}}

## IRemoteTools API

The IRemoteTools API handles communication between Remote Tools endpoints and related utility functions. Key functions include:

```cpp
//! Registers the application as a client of a Remote Tools service with a pre-defined key, name and target port
//! @param key A Crc32 key used to identify this service
//! @param name The string name of this service
//! @param port The port on which this service connects
virtual void RegisterToolingServiceClient(AZ::Crc32 key, AZ::Name name, uint16_t port) = 0;
```

```cpp
//! Registers the application as a host of a Remote Tools service with a pre-defined key, name and target port
//! @param key A Crc32 key used to identify this service
//! @param name The string name of this service
//! @param port The port on which this service starts listening on registration
virtual void RegisterToolingServiceHost(AZ::Crc32 key, AZ::Name name, uint16_t port) = 0;
```

```cpp
//! Gets pending received messages for a given Remote Tools Service
//! @param key The key of the service to retrieve messages for
//! @return A vector of received messages pending processing for the given service
virtual const ReceivedRemoteToolsMessages* GetReceivedMessages(AZ::Crc32 key) const = 0;
```

```cpp
//! Clears pending received messages for a given Remote Tools Service.
//! Useful for situations in which messages must be processed out of band.
//! @param key Th e key of the service to clear messages for
virtual void ClearReceivedMessages(AZ::Crc32 key) = 0;
```

```cpp
//! Send a message to a remote endpoint
//! @param target The endpoint to send a message to
//! @param msg The message to send
virtual void SendRemoteToolsMessage(const RemoteToolsEndpointInfo& target, const RemoteToolsMessage& msg) = 0;
```