---
description: ' Use script events to enable entities to communicate with each other
  in &ALYlong;. '
title: Using Script Events
---
# Using Script Events<a name="script-events"></a>

Scripting in Lumberyard is designed around event driven paradigms\. Rather than directly accessing information from a given entity or one of its components, you use events to send and receive information and take action in a decoupled environment\.

Like entities and components, scripts can use events to communicate with each other\. These events are called script events\.

To author script events, use the Asset Editor or Lua\. Script Canvas and Lua can send or receive the events that you create\. In Script Canvas, you can add nodes that send or receive script events\. Events sent from Script Canvas can be handled in Lua\. Likewise, events sent from Lua can be handled in Script Canvas\.

## Prerequisites<a name="script-events-prerequisites"></a>

To use script events, you must enable the **Script Events** gem in your project\. For information about enabling gems, see [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)\.

**Topics**
+ [Prerequisites](#script-events-prerequisites)
+ [Creating Script Events in Script Canvas](/docs/userguide/scripting/events/creating-in-script-canvas.md)
+ [Using Script Events in Script Canvas](/docs/userguide/scripting/events/using-in-script-canvas.md)
+ [Using Script Events in Lua](/docs/userguide/scripting/events/lua.md)
+ [Script Events Best Practices](/docs/userguide/scripting/events/best-practices.md)