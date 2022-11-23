# Multiplayer Version Mismatch

In order to keep the multiplayer simulation in sync, it's important that all the multiplayer endpoints are running the same multiplayer version.

For example, if a server is running an old build which is missing knowledge about particular network input, when the player tries to send that network input to the server, the server won't know what to do with the given input. Servers and clients must be running the same version of all the multiplayer components (components which communicate to each other over the network) since any mismatch could lead to unexpected behavior. The Multiplayer Versioning feature will warn users immediately upon attempting to connect two endpoints if there is a mismatch.

## How to enable the Multiplayer Version Mismatch feature:
Multiplayer version mismatch detection is enabled automatically inside the [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/). If two multiplayer endpoints connect with different versions, the Multiplayer::VersionMismatchEvent [AZ::Event](/docs/user-guide/programming/az-event/) will be triggered, and debug logs containing information about which auto-components are mismatched will be printed to the console.

## Relevant Console Variables (CVars)
**sv_versionMismatch_autoDisconnect**  *true | false* Determines if the server will automatically disconnect a client that has a different multiplayer version. It's recommended to keep this true; even minor differences between the version of a multiplayer component can cause unexpected behavior.

**sv_versionMismatch_sendManifestToClient**  *true | false* Determines if the server will send all its individual multiplayer component version information to the client when there's a mismatch? Upon receiving the information, the client will print the mismatch information to the game log. Provided for debugging during development, but you may want to mark false in release builds.

**bg_viewportConnectionStatus** *true | false* If true, the viewport connection status system will display an on-screen warning whenever a connection was made between two endpoints with differing versions. Warnings will also appear in logs even when this cvar is disabled, however the on-screen display makes the mismatch more apparent, so is helpful during development. 

## How it works behind the scenes:
1. AzAutoGen creates a unique 64-bit hash value for each auto-component xml it digests.
    1. The 64-bit hash will be stored in the ComponentData class that’s passed to the global MultiplayerComponentRegistry
2. During application start up, as all the gems are registering their components with the MultiplayerComponentRegistry, the MultiplayerComponentRegistry will combine each component’s hash to create its own 64-bit system version hash.
3. The MultiplayerComponentRegistry’s version hash is sent from the connector (ie: client) to the acceptor (ie: server) as part of the MultiplayerPackets::Connect packet.
4. Server will compare the client’s version-hash with its own to make sure it matches
    1. If there's a multiplayer system version mismatch then...
        1. A version mismatch packet is exchanged containing the version hash of each individual auto-component in order that the server and client know exactly which components are out-of-date.
        2. Error logs will be reported
        3. An AZ::Event is broadcast (Subscribe to the event via AZ::Interface<IMultiplayer>::Get()->AddVersionMismatchHandler).