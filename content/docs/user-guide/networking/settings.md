---
title: Networking And Multiplayer Settings
description: A reference for console variables and other settings that can be used on clients and servers to configure networking and multiplayer.
linktitle: Auto-packets
---

## Overview
This page documents console variables (CVars) and settings for AzNetworking and Multiplayer behaviour.

## Client Settings
| Setting                | Description                                                                                                                                                                            | Default   | Notes |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------|
| cl_clientport          | The port to bind to for game traffic when connecting to a remote host, a value of 0 will select any available port                                                                     | 0         |       |
| cl_serveraddr          | The address of the remote server or host to connect to                                                                                                                                 | LocalHost |       |
| cl_serverport          | The port of the remote host to connect to for game traffic                                                                                                                             | 33450     | 
| cl_InputRateMs         | Rate at which to sample and process client inputs                                                                                                                                      | 33 ms     ||
| cl_MaxRewindHistoryMs  | Maximum number of milliseconds to keep for server correction rewind and replay                                                                                                         | 2000 ms   |
| cl_renderTickBlendBase | The base used for blending between network updates, 0.1 will be quite linear, 0.2 or 0.3 will \ slow down quicker and may be better suited to connections with highly variable latency | 0.15      ||
### Debug Variables
| Setting                        | Description                                                                                      | Default | Notes                   |
|--------------------------------|--------------------------------------------------------------------------------------------------|---------|-------------------------|
| cl_DebugHackTimeMultiplier     | Scalar value used to simulate clock hacking cheats for validating bank time system and anticheat | 1.0     | Non-release builds      |
| cl_EnableDesyncDebugging       | If enabled, debug logs will contain verbose information on detected state desyncs                | True    | Non-release builds      |
| cl_DesyncDebugging_AuditInputs | If true, adds inputs to audit trail                                                              | False   | Non-release builds      |
| cl_PredictiveStateHistorySize  | Controls how many inputs of predictive state should be retained for debugging desyncs            | 120     | Non-release builds only |

## Server Settings
| Setting                 | Description                                                                          | Default | Notes |
|-------------------------|--------------------------------------------------------------------------------------|---------|-------|
| sv_map                  | The map the server should load                                                       | None    |       |
| sv_port                 | The port that this multiplayer gem will bind to for game traffic.                    | 33450   |       |
| sv_portRange            | The range of ports the host will incrementally attempt to bind to when initializing. | 999     |       |
| sv_protocol             | This flag controls whether we use TCP or UDP for game networking                     | Udp     ||
| sv_DedicatedCPUPercent  | Target CPU usage when running as a dedicated server                                  | 0       |       |
| sv_DedicatedCPUVariance | How much the CPU can vary from sv_DedicateCPU                                        | 10      |       |
| sv_DedicatedMaxRate     | Maximum update rate when running as a dedicated server                               | 30      |       |
| sv_isDedicated          | Whether the host command creates an independent or client hosted server              | True    |       |
| sv_isTransient          | Whether a dedicated server shuts down if all existing connections disconnect         | True    ||
 | sv_serverSendRateMs     | Minimum number of milliseconds between each network update                           | 50 ms   || 

### Replication Window Settings
| Setting                            | Description                                                                               | Default | Notes |
|------------------------------------|-------------------------------------------------------------------------------------------|---------|-------|
| sv_ReplicateServerProxies          | Enable sending of ServerProxy entities to clients                                         | true    ||
| sv_MaxEntitiesToTrackReplication   | The default max number of entities to track for replication                               | 512     ||
| sv_MinEntitiesToReplicate          | The default min number of entities to replicate to a client connection                    | 128     ||
| sv_MaxEntitiesToReplicate          | "The default max number of entities to replicate to a client connection"                  | 256     ||
| sv_PacketsToIntegrateQos           | The number of packets to accumulate before updating connection quality of service metrics | 1000    |       |
| sv_BadConnectionThreshold          | The loss percentage beyond which we consider our network bad                              | 0.25    ||
| sv_ClientReplicationWindowUpdateMs | Rate for replication window updates                                                       | 300 ms  ||               
| sv_ClientAwarenessRadius           | The maximum distance entities can be from the client and still be relevant.               | 500.0   ||

### Rewind Settings
| Setting                        | Description                                                                     | Default | Notes |
|--------------------------------|---------------------------------------------------------------------------------|---------|-------|
| sv_RewindVolumeExtrudeDistance | The amount to increase rewind volume checks to account for fast moving entities | 50      |       |

### Editor Server Settings
Settings to control how a server should be launched during the "play-in-editor" mode.

| Setting               | Description                              | Default   | Notes |
|-----------------------|------------------------------------------|-----------|-------|
| editorsv_port         |                                          | 33450     |       | 
| editorsv_serveraddr   | The address of the server to connect to. | LocalHost |       |
| editorsv_process      |                                          | ""        |       |
| editorsv_rhi_override |                                          | ""        | 
| editorsv_enabled      |                                          | False     ||
| editorsv_hidden       |                                          | False     || 
| editorsv_launch       |                                          | True      ||

### Dual Settings
These settings control behaviour on both the client and server.

| Setting                                | Description                                                       | Default | Notes                |
|----------------------------------------|-------------------------------------------------------------------|---------|----------------------|
| bg_RewindDebugDraw                     | If true enables debug draw of rewind operations                   | False   | Requires Multiplayer |
| bg_replicationWindowImmediateAddRemove | Update replication windows immediately on visibility Add/Removes. | True    | Requires Multiplayer |
| bg_multiplayerDebugDraw                | Enables debug draw for the multiplayer gem                        | False   | Requires Multiplayer |

## AzNetwork Settings
These settings control AzNetworking behavior.

| Setting                             | Description                                                                                                                        | Default         | Notes                |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|-----------------|----------------------|
| net_maxPacketTrackTimeMs            | Maximum time to track any particular packetid before giving up                                                                     | 2000            |                      |
| net_rttIncreaseOnPacketLoss         | Scalar amount to increase round trip time estimates by on packet loss                                                              | 1.2             |                      |
| net_TcpCompressor                   | TCP compressor to use. \ WARN: similar to encryption this needs to be set once and only once before creating the network interface | None            |                      |
| net_TcpUseEncryption                | Enable encryption on Tcp based connections                                                                                         | False           |                      |
| net_UseDtlsCookies                  | Enables DTLS cookie exchange during the connection handshake                                                                       | False           |                      |
| net_UdpMaxUnackedPacketCount        | Maximum packets to receive before forcing a heartbeat packet for acking                                                            | 10              |                      |
| net_UdpFragmentTimeoutMs            | Milliseconds to retain chunks of incomplete unreliable fragmented packets before timing them out                                   | 5000 ms         |                      |
| net_UdpCompressor                   | UDP compressor to use. \ WARN: similar to encryption this needs to be set once and only once before creating the network interface | None            |                      |
| net_MinPacketTimeoutMs              | Minimum time to wait before timing out an unacked packet                                                                           | 200 ms          |                      |
| net_UdpDefaultTimeoutMs             | Time in milliseconds before we timeout an idle Udp connection                                                                      | 10 * 1000 ms    |                      |
| net_UdpPacketTimeSliceMs            | The number of milliseconds to allow for packet processing                                                                          | 8 ms            |                      |
| net_UdpTimeoutConnections           | Should code hold timeout Udp connections                                                                                           | True            |                      |
| net_UdpUseEncryption                | Enable encryption on Udp based connections                                                                                         | False           |                      |
| net_RttFudgeScalar                  | Scalar value to multiply computed Rtt by to determine an optimal packet timeout threshold                                          | 2.0             |                      |
| net_MaxTimeoutsPerFrame             | Maximum number of packet timeouts to allow to process in a single frame                                                            | 1000            |                      |
| net_FragmentedHeaderOverhead        | A fudge overhead value to take out of fragmented packet payloads.                                                                  | 32              |                      |
| net_SslInflationOverhead            | A SSL fudge overhead value to take out of fragmented packet payloads                                                               | 32              |                      |
| net_UdpUnackedHeartbeats            | The number of heartbeats to attempt to send to keep a connection alive before giving up                                            | 5               |                      |
| net_UdpMaxReadTimeMs                | The amount of time to allow the reader thread to read data off registered sockets                                                  | 10 ms           |                      |
| net_MaxReliablePacketsInWindow      | The maximum number of reliable packets to allow to be queued up before triggering a disconnect                                     | 16384           |                      |
| net_UdpIgnoreWin10054               | If true, will ignore 10054 socket errors on windows                                                                                | True            |                      |
| net_UdpRecvBufferSize               | Default UDP socket receive buffer size                                                                                             | 1 * 1024 * 1024 |                      |
| net_UdpSendBufferSize               | Default UDP socket send buffer size                                                                                                | 1 * 1024 * 1024 |                      |
| net_EntityReplicatorRecordsMax      | Number of allowed outstanding entity records.                                                                                      | 45              | Requires Multiplayer |
| net_DefaultEntityMigrationTimeoutMs | Time to wait for a new authority to attach to an entity before we delete the entity                                                | 1000 ms         | Requires Multiplayer |


### TLS/DTLS Certificate Settings
| Setting                        | Description                                                                                                         | Default                     | Notes | 
|--------------------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------|-------|
| net_SslCertCiphers             | The cipher suite to use when using cert based key exchange                                                          | ECDHE-RSA-AES256-GCM-SHA384 ||
| net_SslExternalCertificateFile | The filename of the EXTERNAL (server to client) certificate chain in PEM format                                     | ""                          ||
| net_SslExternalContextPassword | The password required for the EXTERNAL (server to client) private certificate                                       | ""                          ||
| net_SslExternalPrivateKeyFile  | The filename of the EXTERNAL (server to client) private key file in PEM format                                      | ""                          ||
| net_SslInternalCertificateFile | The filename of the INTERNAL (server to server only) certificate chain in PEM format                                | ""                          ||
| net_SslInternalContextPassword | "The password required for the INTERNAL (server to server only) private certificate                                 | ""                          ||
| net_SslInternalPrivateKeyFile  | The filename of the INTERNAL (server to server only) private key file in PEM format                                 | ""                          ||
| net_RotateCookieTimer          | Number of milliseconds to wait before generating a new DTLS cookie for handshaking                                  | 50 ms                       ||
| net_SslAllowSelfSigned         | If enabled, self-signed certs will not cause a validation error if they are otherwise considered trusted            | True                        ||
| net_SslEnablePinning           | If enabled, the public certificates on the local and remote endpoints will be compared to ensure they match exactly | True                        ||
| net_SslValidateExpiry          | If enabled, expiration dates on the certificate will be checked for validity                                        | True                        ||
| net_SslMaxCertDepth            | The maximum depth allowed for cert chaining validation                                                              | 3                           ||

### Debug Settings
| Setting                            | Description                                                | Default | Notes                | 
|------------------------------------|------------------------------------------------------------|---------|----------------------|
| net_DebugCheckNetworkEntityManager | Enables extra debug checks inside the NetworkEntityManager | False   | Requires Multiplayer |

### Other Useful Settings
The following settings can be passed as command line arguments to impact server performance

| Setting      | Description                                                                                                             |
|--------------|-------------------------------------------------------------------------------------------------------------------------|
| rhi          | Add `-rhi=null` to the server launcher args to turn on null renderer to avoid rendering costs.                          |
| NullRenderer | Add `-NullRenderer` to the server launcher args to turn off RPI ticking to save on performance when using null renderer |
