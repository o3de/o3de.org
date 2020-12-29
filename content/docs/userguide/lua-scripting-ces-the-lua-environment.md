# The Lua Environment \(Advanced\)<a name="lua-scripting-ces-the-lua-environment"></a>

By default, the Lumberyard component entity Lua environment is a single Lua environment \(or `lua_State`\)\. This environment is bound to the `BehaviorContext` that is owned by the `ComponentApplication`\. Because of this, it has access to all API operations that are reflected on startup\.

## Adding Other VMs<a name="lua-scripting-ces-the-lua-environment-adding-vms"></a>

You may add more `ScriptContext` instances using the `ScriptSystemBus` \(either call `AddContextWithId`, or create your own and call `AddContext`\)\. If you want your new context to be available for debugging, you must register it with `ScriptDebugAgentBus::RegisterContext`\.

## Reusing Code<a name="lua-scripting-ces-the-lua-environment-reusing-code"></a>

Lua provides the capability to load and execute scripts from other Lua files using the built\-in Lua [require](https://www.lua.org/pil/8.1.html) function\. It's important to note that this function requires a special path format\. The file path is delimited by periods instead of slashes, has no `.lua` file name extension, and is relative to the Lumberyard assets directory\. For example, if you want to use the `require` function to give your scripts some common functionality from the project's `Scripts` directory, you can use code similar to the following example\.

```
local library = require("Scripts.MyLibraryFile")
```