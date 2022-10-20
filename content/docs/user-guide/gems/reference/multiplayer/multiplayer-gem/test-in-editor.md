---
title: Test Multiplayer Games in the O3DE Editor
linktitle: Test in Editor
description: Use the Editor of Open 3D Engine to test and edit synchronized multiplayer game projects.
---

An important part of Multiplayer simulation is getting a feel for how your client looks and performs when connected to a server. In order to help with that, Open 3D Engine offers the ability to automatically connect a client to a server. When in the **O3DE Editor**, as long as networked entities are on the scene and you have a current server launcher, entering Play Mode **(Ctrl+G)** will locally launch your server for you. As part of this process, the Editor will perform a one time send of all entities on your scene to the server so it can then load them. The Editor will then connect to the server as a client.

The nature of this feature has the Editor authoritating world state to the Server before ceding control to the server. This process is inherently risky and as such, this feature is compiled out for Release builds.

### Advanced Configuration

The Multiplayer Gem exposes a variety of cvars to help configure launching a server when the Editor enters Play Mode.

| CVar name | Type | Description |
|--|--|--|
| `editorsv_enabled` | `bool` | Enable or disable support for launching a local server when Play Mode starts. |
| `editorsv_launch` | `bool` | Whether the Editor should launch a server when the server address is `localhost`. This is useful to have off if you'd like to launch your server from an IDE with a debugger attached. |
| `editorsv_process` | `string` | The full path of the server executable that should be run. Empty to use the current project's ServerLauncher. |
| `editorsv_serveraddr` | `string` | The address of the server to connect to. Change this if you have a running server you want the connect to when entering Play Mode. The value is `127.0.0.1` by default. |
| `editorsv_port` | `uint16_t` | The port that the multiplayer Gem binds to for traffic. |
| `editorsv_isDedicated` | `bool` | Whether a Server should start up as a host. This setting is used by the Editor to tell the local server it launches to immediately start hosting its Editor connection so the Editor can connect. |
| `editorsv_rhi_override` | `string` | Override the default rendering hardware interface (rhi) when launching the Editor server. For example, you may be running an Editor using 'dx12', but want to launch a headless server using 'null'. If empty, the server will launch using the same rhi as the Editor. |

Using these features, you can configure the Editor to connect to a compatible remote host if you wanted or a specific server executable. For example, you could configure your profile Editor to connect to a debug server.

#### Configuring Editor in Client-Server Mode

You can also configure your Editor to act as both the server and a client at the same time. This allows for an immediate start of game mode when pressing CTRL-G. (On the other hand, it takes a few seconds to enter the game mode with the dedicated server as configured above.) This mode requires two CVars to be set to true: `editorsv_enabled` and `editor_clientserver`.

| CVar name | Type | Description |
|--|--|--|
| `editor_clientserver` | `bool` | Whether the Editor should act as a server and a client at the same time, without launching a dedicated server process. This is useful for quick iterative work that does not require testing client-only logic. |

You can tell which multiplayer editor game mode are you in by looking at the debug text in the bottom right of the viewport.

![The Editor with editor_clientserver set to true](/images/user-guide/multiplayer/editor_clientserver_mode.png)
