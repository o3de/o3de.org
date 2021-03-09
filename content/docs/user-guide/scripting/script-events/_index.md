---
description: ' Use script events to enable entities to communicate with each other in Open 3D Engine. '
title: Script events
---

{{< preview-migrated >}}

Scripting in O3DE is designed around event driven paradigms\. Rather than directly accessing information from a given entity or one of its components, you use events to send and receive information and take action in a decoupled environment\.

Like entities and components, scripts can use events to communicate with each other\. These events are called script events\.

To author script events, use the Asset Editor or Lua\. Script Canvas and Lua can send or receive the events that you create\. In Script Canvas, you can add nodes that send or receive script events\. Events sent from Script Canvas can be handled in Lua\. Likewise, events sent from Lua can be handled in Script Canvas\.

## Prerequisites {#script-events-prerequisites}

To use script events, you must enable the **Script Events** gem in your project\. For information about enabling gems, see [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)\.

**Topics**
+ [Prerequisites](#script-events-prerequisites)
+ [Creating Script Events in Script Canvas](/docs/user-guide/scripting/script-events/creating-in-script-canvas.md)
+ [Using Script Events in Script Canvas](/docs/user-guide/scripting/script-events/using-in-script-canvas.md)
+ [Using Script Events in Lua](/docs/user-guide/scripting/script-events/lua.md)
+ [Script Events Best Practices](/docs/user-guide/scripting/script-events/best-practices.md)
