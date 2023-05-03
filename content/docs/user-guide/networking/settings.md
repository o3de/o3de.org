---
linktitle: Network and Multiplayer Settings
title: AzNetworking and Multiplayer Gem Settings
description: A reference for console variables and other settings that you can use on clients and servers to configure `AzNetworking` and the Multiplayer Gem.
weight: 300
---

## Overview

This page documents [console variables (CVARs)](/docs/user-guide/appendix/cvars/) and other settings that can control Networking and Multiplayer behavior in **Open 3D Engine (O3DE)**.

## Networking commands

Use the following [console functor (cfunc)](/docs/user-guide/programming/az-console/#console-functors-cfuncs) commands to control the connection of clients to servers for networked games or simulations. 

| Setting                | Description                                                                                                                                | Parameters                                                                       | Notes                                                                                     |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| host                   | Opens a multiplayer connection as a host for other clients to connect to.                                                                  |                                                                                  |                                                                                           |
| connect                | Opens a multiplayer connection to a host.                                                                                                  | *(Optional)* IP address and port, separated by ':'. For example, `0.0.0.0:1234`. | Defaults to `cl_serveraddr`:`cl_serverport`.                                              |
| disconnect             | Disconnects any open multiplayer connections.                                                                                              |                                                                                  |                                                                                           |
| LoadLevel              | Unloads the current level and loads a new one with the given asset name. <br> Used to setup the initial level for the game or simiulation. | *(Required)* Path to a level file.                                               | Command is not specific to network or multiplayer but used for all games and simulations. | 
| sv_launch_local_client | Launches a local client and connects to this host server.                                                                                  |                                                                                  | Only works if currently hosting.                                                          |

These console commands can be executed dynamically via the [console command line](/docs/user-guide/editor/console/) or placed within a console command configuration file, usually with the `.cfg` suffix. Commands will be executed in the order written.

For a networked game or simulation, a typical server configuration file should contain:

```
host
LoadLevel <path to Level>
```

And the client's configuration file should contain:

```
connect
```

Console commands in configuration files can be passed to client and server launchers using the `console-command-file` option, for example `MultiplayerSample.ServerLauncher.exe --console-command-file=launch_server.cfg`.

## Client settings
The `cl` CVARs control client behavior.

| Setting                | Description                                                                                                                                                                             | Default   | Notes |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------|
| cl_clientport          | The port to bind to for game traffic when connecting to a remote host, a value of 0 will select any available port.                                                                     | 0         |       |
| cl_serveraddr          | The address of the remote server or host to connect to.                                                                                                                                 | LocalHost |       |
| cl_serverport          | The port of the remote host to connect to for game traffic.                                                                                                                             | 33450     | 
| cl_InputRateMs         | Rate at which to sample and process client inputs.                                                                                                                                      | 33 ms     ||
| cl_MaxRewindHistoryMs  | Maximum number of milliseconds to keep for server correction rewind and replay.                                                                                                         | 2000 ms   |
| cl_renderTickBlendBase | The base used for blending between network updates, 0.1 will be quite linear, 0.2 or 0.3 will slow down quicker and may be better suited to connections with highly variable latency. | 0.15      ||

### Client to server connection settings
| Setting                                        | Description                                                                                                                                     | Default    | Notes |
|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|------------|-------|
| cl_ClientEntityReplicatorPendingRemovalTimeMs  | How long to wait prior to removing an entity for the client through a change in the replication window, entity deletes are still immediate. | 10000 ms   |       |
| cl_DefaultNetworkEntityActivationTimeSliceMs   | Max Ms to use to activate entities coming from the network, 0 means instantiate everything.                                                     | 0 ms       ||
| cl_ClientMaxRemoteEntitiesPendingCreationCount | Maximum number of entities that we have sent to the client, but have not had a confirmation back from the client.                               | 4294967295 ||

### Debug settings
| Setting                        | Description                                                                                       | Default | Notes                   |
|--------------------------------|---------------------------------------------------------------------------------------------------|---------|-------------------------|
| cl_DebugHackTimeMultiplier     | Scalar value used to simulate clock hacking cheats for validating bank time system and anticheat. | 1.0     | Non-release builds      |
| cl_EnableDesyncDebugging       | If enabled, debug logs will contain verbose information on detected state desyncs.                | True    | Non-release builds      |
| cl_DesyncDebugging_AuditInputs | If true, adds inputs to audit trail.                                                              | False   | Non-release builds      |
| cl_PredictiveStateHistorySize  | Controls how many inputs of predictive state should be retained for debugging desyncs.            | 120     | Non-release builds only |


## Server settings

The `sv` CVARs control server behavior.

| Setting                 | Description                                                                     | Default | Notes                |
|-------------------------|---------------------------------------------------------------------------------|---------|----------------------|
| sv_map                  | The map the server should load.                                                 | None    |                      |
| sv_port                 | The port that Multiplayer Gem will bind to for game traffic.                    | 33450   |                      |
| sv_portRange            | The range of ports the host will incrementally attempt to bind to when initializing. | 999     |                      |
| sv_protocol             | This flag controls whether we use TCP or UDP for game networking.               | Udp     ||
| sv_DedicatedCPUPercent  | Target CPU usage when running as a dedicated server.                            | 0       | Disabled by default. |
| sv_DedicatedCPUVariance | How much the CPU can vary from `sv_DedicatedCPUPercent`.                        | 10      |                      |
| sv_DedicatedMaxRate     | Maximum update rate when running as a dedicated server.                         | 30      |                      |
| sv_isDedicated          | Whether the host command creates an independent or client hosted server.        | True    |                      |
| sv_isTransient          | Whether a dedicated server shuts down if all existing connections disconnect.   | True    ||
| sv_serverSendRateMs     | Minimum number of milliseconds between each network update.                     | 50 ms   || 

### Server to client connection settings
| Setting                                                | Description                                                                                                                                     | Default    | Notes |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|------------|-------|
| sv_ClientEntityReplicatorPendingRemovalTimeMs          | How long to wait prior to removing an entity for the client through a change in the replication window, entity deletes are still immediate. | 10000 ms   ||
| sv_ClientMaxRemoteEntitiesPendingCreationCount         | Maximum number of entities that we have sent to the client, but have not had a confirmation back from the client.                               | 4294967295 ||
| sv_ClientMaxRemoteEntitiesPendingCreationCountPostInit | Maximum number of entities that we will send to clients after gameplay has begun.                                                               | 4294967295 ||

### Replication window settings
| Setting                            | Description                                                                                | Default | Notes |
|------------------------------------|--------------------------------------------------------------------------------------------|---------|-------|
| sv_ReplicateServerProxies          | Enable sending of ServerProxy entities to clients.                                         | True    ||
| sv_MaxEntitiesToTrackReplication   | The default max number of entities to track for replication.                               | 512     ||
| sv_MinEntitiesToReplicate          | The default min number of entities to replicate to a client connection.                    | 128     ||
| sv_MaxEntitiesToReplicate          | The default max number of entities to replicate to a client connection.                    | 256     ||
| sv_PacketsToIntegrateQos           | The number of packets to accumulate before updating connection quality of service metrics. | 1000    |       |
| sv_BadConnectionThreshold          | The loss percentage beyond which we consider our network bad.                              | 0.25    ||
| sv_ClientReplicationWindowUpdateMs | Rate for replication window updates.                                                       | 300 ms  ||               
| sv_ClientAwarenessRadius           | The maximum distance entities can be from the client and still be relevant.                | 500.0   ||

### Rewind settings
| Setting                        | Description                                                                      | Default | Notes |
|--------------------------------|----------------------------------------------------------------------------------|---------|-------|
| sv_RewindVolumeExtrudeDistance | The amount to increase rewind volume checks to account for fast moving entities. | 50      |       |

### Editor server settings
The `editorsv` settings control how a server will be launched during the "play-in-editor" (CTRL+G) mode.

| Setting                            | Description                                                                                                                                                                                                                                                                                                              | Default   | Notes                                                                                                                                            |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| editorsv_isDedicated               | Whether to init as a server expecting data from an Editor. Do not modify unless you're sure of what you're doing.                                                                                                                                                                                                        | False     ||
| editorsv_port                      | The server port the Editor will connect to when entering play-mode.                                                                                                                                                                                                                                                      | 33450     | Only valid when `editorsv_enabled` is true.                                                                                                      | 
| editorsv_serveraddr                | The address of the server the Editor will connect to when entering play-mode.                                                                                                                                                                                                                                            | LocalHost | Only valid when `editorsv_enabled` is true.                                                                                                      |
| editorsv_process                   | The file path to your project's ServerLauncher. If `editorsv_enabled` and `editorsv_launch` is true, the Editor will attempt to launch its own server when entering game mode. By default it looks for the ServerLauncher executable inside the same folder where Editor lives; `editorsv_process` overrides that path. | ""        |                                                                                                                                                  |
| editorsv_rhi_override              | If `editorsv_launch` is true, the server will use the same render hardware interface (rhi) that the editor is using. For example, if the editor is using DX12, then the new server will be launched using DX12. `editorsv_rhi_override` can be used to override the rhi.                                                 | ""        | If you don't need to see the launched server's graphics then set `editorsv_rhi_override=null`, the null renderer.                                |
| editorsv_enabled                   | If true the Editor will attempt to connect to a Multiplayer server upon entering game mode.                                                                                                                                                                                                                              | False     ||
| editorsv_hidden                    | If true the Editor will automatically launch a server upon entering game mode. Set `editorsv_hidden` to true if you want the launched server to be started as a background process without any visible window.                                                                                                           | False     |                                                                                                                                                  |  
| editorsv_launch                    | If true the Editor will automatically launch its own server upon entering game mode.                                                                                                                                                                                                                                     | True      | Only applies if `editorsv_enabled` is also true. If starting your own editor-server remember to set `editorsv_isDedicated` to true on the server |
| editorsv_connectionMessageFontSize |                                                                                                                                                                                                                                                                                                                          | 0.7       |                                                                                                                                                  |


### Dual client server settings
The `bg` settings control behavior on both the client and server.

| Setting                                             | Description                                                                             | Default | Notes |
|-----------------------------------------------------|-----------------------------------------------------------------------------------------|---------|-------|
| bg_RewindDebugDraw                                  | If true enables debug draw of rewind operations.                                        | False   |       |
| bg_replicationWindowImmediateAddRemove              | Update replication windows immediately on visibility Add/Removes.                       | True    |       |
| bg_multiplayerDebugDraw                             | Enables debug draw for the Multiplayer Gem.                                             | False   |       |
| bg_replicationWindowImmediateAddRemove              | Update replication windows immediately on visibility Add/Removes.                       | True    |       |
| bg_RewindPositionTolerance                          | Don't sync the NVIDIA PhysX entity if the square of delta position is less than this value.    | 0.001  ||
| bg_AssertNetBindOnDeactivationWithoutMarkForRemoval |                                                                                         | False   ||
| bg_hierarchyEntityMaxLimit                          |                                                                                         | 16      || 
| bg_DrawArticulatedHitVolumes                        | Enables debug draw of articulated hit volumes.                                          | False   ||
| bg_DrawDebugHitVolumeLifetime                       | The lifetime for hit volume draw-debug shapes.                                          | 0.0     ||
| bg_RewindOrientationTolerance                       | Don't sync the NVIDIA PhysX entity if the square of delta orientation is less than this value. | 0.001   ||


## Networking settings
The `net` settings control networking behavior.

### AzNetworking layer
| Setting                             | Description                                                                                                                         | Default         | Notes                |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------|----------------------|
| net_maxPacketTrackTimeMs            | Maximum time to track any particular packet ID before giving up.                                                                     | 2000            |                      |
| net_rttIncreaseOnPacketLoss         | Scalar amount to increase round trip time estimates by on packet loss.                                                              | 1.2             |                      |
| net_TcpCompressor                   | TCP compressor to use. WARNING: Similar to encryption this needs to be set once and only once before creating the network interface.  | None            |                      |
| net_TcpUseEncryption                | Enable encryption on TCP-based connections.                                                                                         | False           |                      |
| net_UseDtlsCookies                  | Enables DTLS cookie exchange during the connection handshake.                                                                       | False           |                      |
| net_UdpMaxUnackedPacketCount        | Maximum packets to receive before forcing a heartbeat packet for acking.                                                            | 10              |                      |
| net_UdpFragmentTimeoutMs            | Milliseconds to retain chunks of incomplete unreliable fragmented packets before timing them out.                                   | 5000 ms         |                      |
| net_UdpCompressor                   | UDP compressor to use. WARNING: Similar to encryption this needs to be set once and only once before creating the network interface. | None            |                      |
| net_MinPacketTimeoutMs              | Minimum time to wait before timing out an unacked packet.                                                                           | 200 ms          |                      |
| net_UdpDefaultTimeoutMs             | Time in milliseconds before we timeout an idle UDP connection.                                                                      | 10 * 1000 ms    |                      |
| net_UdpPacketTimeSliceMs            | The number of milliseconds to allow for packet processing.                                                                          | 8 ms            |                      |
| net_UdpTimeoutConnections           | Should code hold timeout UDP connections.                                                                                           | True            |                      |
| net_UdpUseEncryption                | Enable encryption on UDP-based connections.                                                                                         | False           |                      |
| net_RttFudgeScalar                  | Scalar value to multiply computed RTT by to determine an optimal packet timeout threshold.                                          | 2.0             |                      |
| net_MaxTimeoutsPerFrame             | Maximum number of packet timeouts to allow to process in a single frame.                                                            | 1000            |                      |
| net_FragmentedHeaderOverhead        | A fudge overhead value to take out of fragmented packet payloads.                                                                   | 32              |                      |
| net_SslInflationOverhead            | A SSL fudge overhead value to take out of fragmented packet payloads.                                                               | 32              |                      |
| net_UdpUnackedHeartbeats            | The number of heartbeats to attempt to send to keep a connection alive before giving up.                                            | 5               |                      |
| net_UdpMaxReadTimeMs                | The amount of time to allow the reader thread to read data off registered sockets.                                                  | 10 ms           |                      |
| net_MaxReliablePacketsInWindow      | The maximum number of reliable packets to allow to be queued up before triggering a disconnect.                                     | 16384           |                      |
| net_UdpIgnoreWin10054               | If true, will ignore 10054 socket errors on windows.                                                                                | True            |                      |
| net_UdpRecvBufferSize               | Default UDP socket receive buffer size.                                                                                             | 1 * 1024 * 1024 |                      |
| net_UdpSendBufferSize               | Default UDP socket send buffer size.                                                                                                | 1 * 1024 * 1024 |                      |
| net_validateSerializedTypes         | Causes an Assert when an attempt at `TypeValidatingSerializer` serialization results in a type or variable name mismatch. | False   | Increases bandwidth utilization to support mismatch detection.   |

### Multiplayer layer
| Setting                             | Description                                                                          | Default | Notes                    |
|-------------------------------------|--------------------------------------------------------------------------------------|---------|--------------------------|
| net_EntityReplicatorRecordsMax      | Number of allowed outstanding entity records.                                        | 45      | Requires Multiplayer Gem |
| net_DefaultEntityMigrationTimeoutMs | Time to wait for a new authority to attach to an entity before we delete the entity. | 1000 ms | Requires Multiplayer Gem |
| net_EntityReplicatorRecordsMax      | Number of allowed outstanding entity records.                                        | 45      | Requires Multiplayer Gem |
| net_DebugEntities_ShowBandwidth     | Display bandwidth information.                                                       | False   ||
| net_DebutAuditTrail_HistorySize     | Size of audit history.                                                               | 20      ||
| net_DebugEntities_WarnAboveKbps     |                                                                                      | 10.f    ||
| net_DebugEntities_BelowWarningColor |                                                                                      | Grey    ||
| net_DebugEntities_WarningColor      |                                                                                      | Red     ||
| net_DebugEntities_ShowAboveKbps     |                                                                                      | 1.f     ||



### TLS/DTLS certificate settings
| Setting                        | Description                                                                                                          | Default                     | Notes | 
|--------------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------|-------|
| net_SslCertCiphers             | The cipher suite to use when using cert based key exchange.                                                          | ECDHE-RSA-AES256-GCM-SHA384 ||
| net_SslExternalCertificateFile | The filename of the EXTERNAL (server to client) certificate chain in PEM format.                                     | ""                          ||
| net_SslExternalContextPassword | The password required for the EXTERNAL (server to client) private certificate.                                       | ""                          ||
| net_SslExternalPrivateKeyFile  | The filename of the EXTERNAL (server to client) private key file in PEM format.                                      | ""                          ||
| net_SslInternalCertificateFile | The filename of the INTERNAL (server to server only) certificate chain in PEM format.                                | ""                          ||
| net_SslInternalContextPassword | The password required for the INTERNAL (server to server only) private certificate.                                 | ""                          ||
| net_SslInternalPrivateKeyFile  | The filename of the INTERNAL (server to server only) private key file in PEM format.                                 | ""                          ||
| net_RotateCookieTimer          | Number of milliseconds to wait before generating a new DTLS cookie for handshaking.                                  | 50 ms                       ||
| net_SslAllowSelfSigned         | If enabled, self-signed certs will not cause a validation error if they are otherwise considered trusted.            | True                        ||
| net_SslEnablePinning           | If enabled, the public certificates on the local and remote endpoints will be compared to ensure they match exactly. | True                        ||
| net_SslValidateExpiry          | If enabled, expiration dates on the certificate will be checked for validity.                                        | True                        ||
| net_SslMaxCertDepth            | The maximum depth allowed for cert chaining validation.                                                              | 3                           ||

### Debug settings
| Setting                            | Description                                                 | Default | Notes                    | 
|------------------------------------|-------------------------------------------------------------|---------|--------------------------|
| net_DebugCheckNetworkEntityManager | Enables extra debug checks inside the NetworkEntityManager. | False   | Requires Multiplayer Gem |

### Other useful settings
The following settings can be passed as command line arguments to control server performance.

| Setting      | Description                                                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------------------------|
| rhi          | Add `-rhi=null` to the server launcher args to turn on null renderer to avoid rendering costs.                           |
| NullRenderer | Add `-NullRenderer` to the server launcher args to turn off RPI ticking to save on performance when using null renderer. |
