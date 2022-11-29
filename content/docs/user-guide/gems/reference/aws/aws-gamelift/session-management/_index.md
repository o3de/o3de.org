---
linkTitle: Session Management
title: Session Management
description: Learn how to manage multiplayer sessions in your game using the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 300
---

A game session is defined as the time your server process is available to host players. Typically, a session ends when a game specific condition is met, which may include all players have left the session, player(s) reach a win condition, or a time period has expired. 

For GameLift a session is specifically an instance of your game running on Amazon GameLift that is ready to host players. The session ends when your server notifies GameLift to end the session.

## Topics

| Topic | Description |
| - | - |
| [Session Management Integration](integration/) | Learn the requirements for integrating session management into your game client and dedicated server. |
| [Session Management C++ API](cpp-api/) | Learn how to add session management to your game using the C++ API. |
| [Session Management Scripting](scripting/) | Learn how to add session management to your game using Script Canvas. |
