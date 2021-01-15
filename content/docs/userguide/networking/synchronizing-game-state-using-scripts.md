---
description: ' Learn about using scripts in &ALYlong; to synchronize game state. '
title: Synchronizing Game State Using Scripts
---
# Synchronizing Game State Using Scripts {#network-synchronizing-game-state-using-scripts}

You can synchronize game state by using the Lua `ScriptComponent`\. The initial steps of synchronizing game state using the Lua `ScriptComponent` are similar to any other component\. There are two main steps:

1. You must add a `NetBindingComponent` to the definition of the entity that contains the script and the `ScriptComponent` and whose state you want to synchronize\.

1. Inside the script, any properties that need to be synchronized must be tagged accordingly\. For more information, see [Network Binding Properties](/docs/userguide/scripting/lua/script-networking-binding.md) in the [Writing Lua Scripts](/docs/userguide/scripting/lua/intro.md) topic\.

When these steps are completed, your game state data should synchronize correctly\.