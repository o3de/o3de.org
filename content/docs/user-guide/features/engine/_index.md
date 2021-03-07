---
description: ' The following topics will guide you through programming with and for
  O3DE. '
title: Engine programmer's reference
weight: 600
---

## Programming with O3DE {#ly-programming-intro}

Learn about the game development APIs and integrations available with O3DE \(and for O3DE\)\. This documentation covers the EBus messaging infrastructure for in\-game communications between game systems, memory management and debugging, extending and customizing the O3DE editor and tools, networking, localization, and Twitch integration\.

These topics are for game developers who have experience with C\+\+ programming and common game design patterns\.


**In this section:**

| Topic Area | Description |
| --- | --- |
| [Systems APIs](/docs/userguide/systems-intro.md) | Learn about the AZ C\+\+ APIs used for console variables, event notifications, and simple pub/sub messaging within your game project\. Note: These systems APIs were introduced with O3DE 1\.24 and focus on a simplified model for in\-game messaging and events\. |
| [Event Bus](/docs/user-guide/features/engine/ebus/_index.md) \(EBus\) | Learn about EBus, the messaging infrastructure for notifications and messaging\.  |
| [AZ Code Generator](/docs/user-guide/features/engine/codegen/intro.md) | Learn about AZ Code Generator, a utility for generating source code \(or any data or text\) from specially tagged source code\. |
| [Input](/docs/user-guide/features/interactivity/input/input-intro.md) | Documentation on incorporating different control devices and configurations for your O3DE game\. |
| [AI](/docs/userguide/ai/intro.md) | Learn how to add AI systems to your game that provide different actor and character behaviors\. |
| [Memory management](/docs/user-guide/features/engine/memory/allocators.md) | Learn how O3DE allocates and manages memory resources for games, as well as memory debugging and overrun detection\. |
| [Profiling, testing, and debugging](/docs/userguide/programming/testing/debugging-intro.md) | Learn about O3DE tools that are used for testing builds, profiling performance, and debugging various issues that may be encountered\. |
|  [UI 2\.0](/docs/userguide/ui20.md) | Learn about extending the O3DE editor and tools user interface with UI 2\.0 and Qt\. Note: This documentation was introduced with O3DE 1\.25, and will be updated with the full set of guidance for the next release\. |
| [Networking](/docs/userguide/networking/intro.md) | Learn about GridMate, O3DE's game networking infrastructure\. Learn about how to synchronize game state across clients, manage bandwidth usage, provide data encryption over the wire, and integrate with Amazon GameLift \(for multiplayer lobbies and matchmaking\)\. |
| [Twitch integration](/docs/userguide/gems/twitch/intro.md) | Learn how to incorporate Twitch into your O3DE game project\. |
| [Cloud connected features](/docs/userguide/gems/cloud-canvas/intro.md) | Learn about Cloud Canvas, a set of gems, scripting features, and resource groups that you can use with AWS Cloud Services and O3DE to create cloud\-enabled games\. |
| [Localization](/docs/userguide/localization/intro.md) | Learn how to create multiple\-language, region\-specific versions of your game using O3DE's localization system\. |