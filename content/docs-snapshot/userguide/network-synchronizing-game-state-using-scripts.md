# Synchronizing Game State Using Scripts<a name="network-synchronizing-game-state-using-scripts"></a>

You can synchronize game state by using the Lua `ScriptComponent`\. The initial steps of synchronizing game state using the Lua `ScriptComponent` are similar to any other component\. There are two main steps:

1. You must add a `NetBindingComponent` to the definition of the entity that contains the script and the `ScriptComponent` and whose state you want to synchronize\.

1. Inside the script, any properties that need to be synchronized must be tagged accordingly\. For more information, see [Network Binding Properties](lua-script-networking-binding.md) in the [Writing Lua Scripts](lua-scripting-intro.md) topic\.

When these steps are completed, your game state data should synchronize correctly\.