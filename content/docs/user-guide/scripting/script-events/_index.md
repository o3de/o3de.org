---
title: Script Events
description: Use script events to enable entities to communicate with each other in Open 3D Engine.
weight: 200
---

Scripting in O3DE is designed around event-driven paradigms. Rather than directly accessing information from a given entity or one of its components, you use events to send and receive information and take action in a decoupled environment.

Like entities and components, scripts can use events to communicate with each other. These events are called script events.

To author script events, use the Asset Editor or Lua. Script Canvas and Lua can send or receive the events that you create. In Script Canvas, you can add nodes that send or receive script events. Events sent from Script Canvas can be handled in Lua. Likewise, events sent from Lua can be handled in Script Canvas.

## Prerequisites 

To use script events, you must enable the [Script Events Gem](/docs/user-guide/gems/reference/script/script-events) in your project.
