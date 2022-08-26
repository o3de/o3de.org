---
title: Running Open 3D Multiplayer Projects
description: How to run Multiplayer enabled projects and relevant configuration
linkTitle: Running Multiplayer
---

Running projects using the Open 3D Engine Multiplayer Gem requires build steps followed by a variety of options to run the projects.

* Ensure your project is [properly configured](./configuration.md).
* Build your project's `GameLauncher` and `ServerLauncher` targets.
* Run the game either in standalone mode using the ImGui options to host, or via the in editor testing approach.

## Testing in the Editor

Multiplayer projects can be [run in Editor](./test-in-editor.md) using Ctrl-G. See the accompanying documentation for more detail. 

## Running locally using ImGui Options

1. Launch your `ServerLauncher` either from Visual Studios or from your build directory.
2. Press the `HOME` key to enable the debug menu.
3. Select the `Host` option.
4. Select a level to load to begin hosting.
5. Use the `Launch Local Client` option to automatically launch a client connected to the server.

## Running Server and Client launchers in Standalone

### Manual configuration via the application's console 

You can manually launch the executables for Client and Server and configure them using the application's console command line.

1. Launch both `ClientLauncher` and `ServerLauncher`
2. In `ServerLauncher` press `~` to open the command line.
3. Run the command `host` to begin hosting.
4. Run the command `LoadLevel <path to level>` to load a level.
5. In `ClientLauncher` press `~` to open the command line.
6. Run the command `connect <IP Address:Port>` to connect to the server. If running locally, `connect` will default to localhost.

### Using pre-defined config files

You can manually launch the executables for Client and Server and pass a pre-defined configuration file to each for them to execute on launch. Commands in these cfgs files are executed in listed order.

1. In your project directory create `launch_client.cfg` and `launch_server.cfg`.
2. Open `launch_server.cfg` and edit it to look like the following:
```
host
LoadLevel <path to Level>
```
3. Open `launch_client.cfg` and edit it to look like the following:
```
connect <IP Address:Port>
```
You can alternatively do the following for testing against localhost server running on the default port.
```
connect
```
4. Run the server using `MultiplayerSample.ServerLauncher.exe --console-command-file=launch_server.cfg`
5. Run the client using `MultiplayerSample.ClientLauncher.exe --console-command-file=launch_client.cfg`

It is necessary to run the Server first so the Client has a host to connect to. 

The commands above can be run either from command line in your build directory or by setting command line arguments in your preferred execution method.