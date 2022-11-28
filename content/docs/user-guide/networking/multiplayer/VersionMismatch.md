---
linkTitle: Version Mismatch
title: Multiplayer Version Mismatch
description: Learn how to detect multiplayer version mismatch in Open 3D Engine (O3DE).
weight: 900
---

In order to keep the multiplayer simulation in sync, it's important that all connected multiplayer endpoints are running the same multiplayer version.

For example, consider a server that is running a particular build of a multiplayer game. If an updated client connects with changes to its network components, the server may not know how to handle the updated network properties, or how to serialize network packets correctly.

Servers and clients must be running the same version of all the multiplayer components (components which communicate to each other over the network); any difference may lead to unexpected behavior. 

**Open 3D Engine (O3DE)** networking provides multiplayer version checks to identify and guard against this unexpected behavior.

## How to enable the Multiplayer Version Mismatch feature:
Multiplayer version mismatch detection is enabled automatically inside the [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/). If two multiplayer endpoints connect with different versions, a `Multiplayer::VersionMismatchEvent` [AZ::Event](/docs/user-guide/programming/az-event/) will be triggered. In addition, information about which auto-components are mismatched will be printed to the console and written to logs to aid debugging.

## Relevant console variables (CVARs)
| Setting                            | Description                                                 | Default |                    | 
|------------------------------------|-------------------------------------------------------------|---------|--------------------------|
| sv_versionMismatch_autoDisconnect    | Determines if a mismatched connection will automatically terminate. It's recommended to keep this true; even minor differences between the version of a multiplayer component can cause unexpected behavior. | True |
| sv_versionMismatch_sendManifestToClient | Determines if the server will send all its individual multiplayer component version information to the client when there's a mismatch. Upon receiving the information, the client will print which components are different to the console. It's recommended to set to false for release builds. This is to prevent clients having knowledge to any multiplayer component information that should be kept private (component names and version hashes). | True |
| bg_viewportConnectionStatus|  If true, the viewport connection status system will display on-screen warnings whenever important multiplayer events occur; this includes version mismatches. | True ||

## How it works behind the scenes:
1. AzAutoGen creates a unique 64-bit hash value for each auto-component XML file that it digests.
    1. The 64-bit hash will be stored in the `ComponentData` class that’s passed to the global `MultiplayerComponentRegistry`.
2. During application start up, as all the gems are registering their components with the `MultiplayerComponentRegistry`, the `MultiplayerComponentRegistry` will combine each component’s hash to create its own 64-bit system version hash.
3. On a connection event the `MultiplayerComponentRegistry’s` version hash is sent from the connector (typically the client) to the acceptor (the server) as part of the `MultiplayerPackets::Connect` packet.
4. Server will compare the client’s version hash with its own to make sure it matches.
    1. If there's a multiplayer system version mismatch then:
        1. A version mismatch packet is exchanged containing the version hash of each individual auto-component in order for the server and client to know exactly which components are out-of-date.
        2. Error logs are reported.
        3. An [AZ::Event](/docs/user-guide/programming/az-event/) is broadcast using `AZ::Interface<IMultiplayer>::Get()->AddVersionMismatchHandler)`.
        4. The connection is terminated (if `sv_versionMismatch_autoDisconnect` is enabled). 
