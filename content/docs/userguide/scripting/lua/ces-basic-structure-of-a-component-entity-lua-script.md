---
description: ' Learn about the structure of Lua scripts that are used as components
  in &ALYlong;. '
slug: lua-scripting-ces-basic-structure-of-a-component-entity-lua-script
title: Basic Structure of a Component Entity Lua Script
---
# Basic Structure of a Component Entity Lua Script<a name="lua-scripting-ces-basic-structure-of-a-component-entity-lua-script"></a>

Scripts to be used as components contain a table \(referred to as the script table\), which provides the functionality for the script\. In Lua, this table is treated like a class\. The script table generally consists of the following:
+ An optional `Properties` table within the script table\. The `Properties` table provides an interface that you can use to customize the script behavior from the editor\.
+ An `OnActivate()` function that the engine calls when the entity that has the script is activated\.
+ An `OnDeactivate()` function called by the engine when the entity that has the script is deactivated\.

The following example shows a skeleton script\.

```
-- ScriptName.lua 

local ScriptName = 
{
    Properties =
    {
        -- Property definitions
    }
}

function ScriptName:OnActivate()
     -- Activation Code
end

function ScriptName:OnDeactivate()
     -- Deactivation Code
end

return ScriptName
```

For each Lua script component, Lumberyard creates a table called the entity table\. The script table in the referenced script is the metatable for the entity table\. Because of this relationship, when any method in the script is called, the self parameter \(implicit in most cases\) refers to the entity table\.

The entity table then has the following properties and methods available to it:
+ A `Properties` table, copied from the script table's `Properties` table\. Default values are provided where appropriate\.
+ An `entityId` property, which contains an object of type `EntityId` that refers to the current entity\.
+ An `IsMaster` function, callable by the script, to check whether the currently executing script is on the primary node or a proxy node\. This function is available only if the script component is network enabled\.

## Built\-in Types and Methods<a name="lua-scripting-ces-built-in-types-and-methods"></a>

The Lumberyard engine provides a number of types and methods that are useful for making games\. Many of the types and methods available are listed in the class view available in Lumberyard's Lua IDE\. For more information on the class view, see [Lua Editor](/docs/userguide/scripting/lua/editor-debugger.md)\.