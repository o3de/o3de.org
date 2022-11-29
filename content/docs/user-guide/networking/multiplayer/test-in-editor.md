---
linktitle: Testing in Editor
title: Testing Multiplayer Projects in O3DE Editor
description: Learn how to use O3DE Editor to test and edit synchronized multiplayer game projects in Open 3D Engine (O3DE).
weight: 500
---

An important part of multiplayer simulation is getting a feel for how your client looks and performs when connected to a server. To help with that, **Open 3D Engine (O3DE)** lets you automatically connect a client to a server. In **O3DE Editor**, if your networked entities are on the scene and you have a current server launcher, you can enter Play Mode (**Ctrl+G**) to locally launch your server. As part of this process, the Editor performs a one-time send of all entities on the scene to your server so that it can then load them. The Editor then connects to the server as a client.

The nature of this feature has the Editor authoritating world state to the Server before ceding control to the server. Because this process is inherently risky, this feature is compiled out for Release builds.

### Advanced configuration

The **Multiplayer Gem** exposes a variety of cvars to help you configure how to launch a server when the Editor enters Play Mode.

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
