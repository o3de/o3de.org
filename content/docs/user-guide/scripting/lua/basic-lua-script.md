---
linkTitle: Basic Structure of a Lua Script
description: Basic Structure of a Lua Script in Open 3D Engine.
title: Basic Structure of a Lua Script
toc: true
weight: 200
---

## Script Table

Scripts to be used as components contain a table (referred to as the **Script Table**), which provides the functionality for the script. In Lua, this table is treated like a class. The script table generally consists of the following:

+ An optional **Properties** table within the script table. The **Properties** table provides an interface that you can use to customize the script behavior from the editor.

+ An `OnActivate()` function that the engine calls when the entity that has the script is activated.

+ An `OnDeactivate()` function called by the engine when the entity that has the script is deactivated.

## Skeleton script

The following example shows a skeleton script.

```lua
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

## Entity Table

For each **Lua Script** component, O3DE creates a table called the **Entity Table**. The Script Table in the referenced script is the metatable for the Entity Table. Because of this relationship, when any method in the script is called, the `self` parameter (implicit in most cases) refers to the Entity Table.

The Entity Table then has the following properties and methods available to it:

+ A **Properties** table, copied from the Script Table's Properties table. Default values are provided where appropriate.

+ An `entityId` property, which contains an object of type **EntityId** that refers to the current entity.
