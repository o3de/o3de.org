---
title: Using Script Events in Lua
description: Learn how to use script events with Lua in Open 3D Engine (O3DE).
weight: 300
---

Lua scripts can use script events to communicate with each other. There are two example scripts that show this communication, both available in the `Gems\ScriptEvents\Assets\Scripts\Example` directory. They are called `ScriptEvents_Addressable.lua` and `ScriptEvents_Broadcast.lua`. If an EBus is addressed, events are sent to a specific address ID. Events that are broadcast globally are received at all addresses. For more information, see [The Open 3D Engine Event Bus (EBus) System](/docs/user-guide/programming/messaging/ebus/).

The following table shows only some of the available return and input values. It is not complete.

| type | syntax | input | return |
| --- | --- | --- | --- |
| string | typeid("") | yes | yes |
| number | typeid(0) | yes | yes |
| entity id | typeid(EntityId()) | yes | yes |

TIP: If you are struggling with the input and return limitations, consider using a JSON/string serializer/deserializer.

---

### ScriptEvents_Addressable.lua

The `ScriptEvents_Addressable.lua` example script implements a handler for a Script Event that requires an address for a handler to be invoked. It broadcasts a method, but only handlers connected to the address that matches the one specified in the event can invoke it.

**Example 1: one single Lua file with verifications of the results**

```lua
-- ScriptEvents_Addressable.lua
function ScriptTrace(txt)
    Debug.Log(txt)
end

function ScriptExpectTrue(condition, msg)

    if (not condition) then
        ScriptTrace(msg)
    end

end

-- This example shows how to implement a handler for a Script Event that requires an address
-- in order for a handler to be invoked.
luaScriptEventWithId = {

    -- This method will be broadcast, but only handlers connected to the matching address
    -- as the one specified in the event will invoke it.
    MethodWithId0 = function(self, param1, param2)
        ScriptTrace("Handler: " ..  tostring(param1) .. " " .. tostring(param2))

        ScriptExpectTrue(typeid(param1) == typeid(0), "Type of param1 must be "..tostring(typeid(0)))
        ScriptExpectTrue(typeid(param2) == typeid(EntityId()), "Type of param2 must be "..tostring(typeid(EntityId())))
        ScriptExpectTrue(param1 == 1, "The first parameter must be 1")
        ScriptExpectTrue(param2 == EntityId(12345), "The received entity Id must match the one sent")

        ScriptTrace("MethodWithId0 handled")

        return true
    end,

    MethodWithId1 = function(self)
        ScriptTrace("MethodWithId1 handled")
    end
}

-- "Script_Event" will be the name of the callable Script Event. It requires the address type to be a string.
local scriptEventDefinition = ScriptEvent("Script_Event", typeid("")) -- Event address is of string type

-- Define some methods for handlers to implement.
local method0 = scriptEventDefinition:AddMethod("MethodWithId0", typeid(false)) -- Return value is Boolean
method0:AddParameter("Param0", typeid(0))
method0:AddParameter("Param1", typeid(EntityId()))

-- NOTE: Types are specified using the typeid keyword with a VALUE of the type you want. For example, typeid("EntityId")
-- produces the type id for a string, not the EntityId type.

scriptEventDefinition:AddMethod("MethodWithId1") -- No return, no parameters.

-- After the Script Event is defined, call Register to enable it. Typically this should be done within the OnActivate method.
scriptEventDefinition:Register()

-- At this point, the script event is usable. Use the Script_Event.Connect method to connect a handler to it. The following example
-- uses luaScriptEventWithId as the handler that implements the methods defined earlier. Notice that the call connects using
-- the string "ScriptEventAddress" as the address for this event. Methods sent to a different address will not be handled by
-- this handler.
scriptEventHandler = Script_Event.Connect(luaScriptEventWithId, "ScriptEventAddress")

-- Now invoke the event and specify "ScriptEventAddress" as the address. The handler previously
-- connected will be able to handle this event.
local returnValue = Script_Event.Event.MethodWithId0("ScriptEventAddress", 1, EntityId(12345))

-- "Method0" should return true. Verify the result.
ScriptExpectTrue(returnValue, "Method0's return value must be true")

-- Finally, send MethodWithdId1. This method does not require any parameters, but does require the address.
Script_Event.Event.MethodWithId1("ScriptEventAddress")
```

The next example highlights the separation of logic between the definition of the Script Event method/function in one Lua Script; and how to call it in another Lua Script. The Addressable Script Events are a good choice when you need to communicate between two, and only two different Lua Scripts. In other words, one-to-one (1:1) relationship.

**Example 2: Define script event in one Lua script; call it in another Lua script(1:1)**

```lua
-- -- This is the first Lua file. This is where you define the Addressable Script Event and respective method(s)

-- -- just a function/method
function ScriptTrace(txt)
    Debug.Log(txt);
end

-- -- table with the method/function
luaScriptEventWithId =
{
    MethodWithId0 = function(self, param1, param2)
        ScriptTrace("MethodWithId0 handled");
        return true;
    end
}

-- -- When this Lua script is first activated, it will define the Script Event
function OnActivate()

    -- -- Script Event name = "Script_Event"! Address type = string, typeid("")
    local scriptEventDefinition = ScriptEvent("Script_Event", typeid(""));
    
    -- -- Custom method name = "MethodWithId0"! Return value = Boolean, typeid(false)
    local method0 = scriptEventDefinition:AddMethod("MethodWithId0", typeid(false));
    -- -- Input pameter name "Param0" of type number, typeid(0)
    method0:AddParameter("Param0", typeid(0));
    -- -- Input pameter name "Param1" of type Id, typeid(EntityId())
    method0:AddParameter("Param1", typeid(EntityId()));
    
    -- -- Register to enable the Script Event
    scriptEventDefinition:Register();
    
    -- -- Connect using a string address: "ScriptEventAddress"
    scriptEventHandler = Script_Event.Connect(luaScriptEventWithId, "ScriptEventAddress");
end

-- -- Optional. Disconnect when this Lua Script Deactivates
function OnDeactivate()
    -- scriptEventHandler:Disconnect();
end

```

```lua
-- -- This is the second Lua file. This is where you invoke/call/consume/get-return-value
-- -- NOTE: In some UI cases (uicanvas), you should avoid calling the Script Event inside the OnActivate function.

-- -- "ScriptEventAddress" is the address you defined earlier
function FunctionInAnotherLuaFile()
    local returnValue = Script_Event.Event.MethodWithId0("ScriptEventAddress", 1, EntityId(12345));
end

```

---

### ScriptEvents_Broadcast.lua

The `ScriptEvents_Broadcast.lua` example script implements a handler for a broadcast script event. Because broadcast script events do not specify an address type, any handler can connect to them.

**Example 3: one single file with verifications of the results**

```lua
-- ScriptEvents_Broadcast.lua
function ScriptTrace(txt)
    Debug.Log(txt)
end

function ScriptExpectTrue(condition, msg)

    if (not condition) then
        ScriptTrace(msg)
    end

end

-- This example shows how to implement a handler for a broadcast script event.
-- Because broadcast script events do not specify an address type, they can be handled
-- by simply connecting to them.
luaScriptEventBroadcast = {

    -- The following method is called as a result of a broadcast call on the script event.
    BroadcastMethod0 = function(self, param1, param2)
        ScriptTrace("Handler: " ..  tostring(param1) .. " " .. tostring(param2))

        ScriptExpectTrue(typeid(param1) == typeid(0), "Type of param1 must be "..tostring(typeid(0)))
        ScriptExpectTrue(typeid(param2) == typeid(EntityId()), "Type of param2 must be "..tostring(typeid(EntityId())))
        ScriptExpectTrue(param1 == 2, "The first parameter must be 2")
        ScriptExpectTrue(param2 == EntityId(23456), "The received entity Id must match the one sent")

        ScriptTrace("BroadcastMethod0 Called")

        return true
    end,

    BroadcastMethod1 = function(self)
        ScriptTrace("BroadcastMethod1 Called")
    end
}

local scriptEventDefinition = ScriptEvent("Script_Broadcast") -- Script_Broadcast is the name of the callable script event.

-- Define methods for Script_Broadcast
local method0 = scriptEventDefinition:AddMethod("BroadcastMethod0", typeid(false)) -- To add a method, provide a method name and an optional return type.
method0:AddParameter("Param0", typeid(0))
method0:AddParameter("Param1", typeid(EntityId()))

-- NOTE: Types are specified using the typeid keyword with a VALUE of the type you want. For example, typeid("EntityId")
-- produces the type id for a string, not the EntityId type.

scriptEventDefinition:AddMethod("BroadcastMethod1")

-- After the Script Event is defined, call Register to enable it. Typically this should be done within the OnActivate method.
scriptEventDefinition:Register()

-- At this point, the script event is usable. Use the Script_Broadcast.Connect method to connect a handler to it. The following example
-- uses luaScriptEventWithId as the handler that implements the methods defined earlier.
scriptEventHandler = Script_Broadcast.Connect(luaScriptEventBroadcast)

-- To test the event, broadcast BroadcastMethod0. As defined, the method expects two parameters and returns a Boolean value.
local returnValue = Script_Broadcast.Broadcast.BroadcastMethod0(2, EntityId(23456))

-- BroadcastMethod0 should return true. Verify the result.
ScriptExpectTrue(returnValue, "BroadcastMethod0's return value must be true")

-- To broadcast an event without a return or parameters, invoke BroadcastMethod1.
Script_Broadcast.Broadcast.BroadcastMethod1()
```

The next example highlights the separation of logic between the definition of the Script Event method/function in one Lua Script; and how to call it in multiple/different Lua Scripts. The Broadcast Script Events are a good choice when you need to communicate between more than two Lua Scripts. In other words, one-to-many (1:M) relationship.

**Example 4: Define script event in one Lua script; call it in other Lua scripts (1:M)**

```lua
-- -- This is the first Lua file. This is where you define the Broadcast Script Event and respective method(s)

-- -- just a function/method
function ScriptTrace(txt)
    Debug.Log(txt);
end

-- -- table with the method/function
luaScriptEventBroadcast =
{
    BroadcastMethod0 = function(self, param1, param2)
        ScriptTrace("BroadcastMethod0 Called"):
        return true;
    end
}

-- -- When this Lua script is first activated, it will define the Script Event
function OnActivate()

    -- -- Script Event name = "Script_Broadcast"! Note that there is NO ADDRESS
    local scriptEventDefinition = ScriptEvent("Script_Broadcast");
    
    -- -- Custom method name = "BroadcastMethod0"! return value = Boolean, typeid(false)
    local method0 = scriptEventDefinition:AddMethod("BroadcastMethod0", typeid(false));
    -- -- Input parameter name "Param0" of type number, typeid(0)
    method0:AddParameter("Param0", typeid(0));
    -- -- Input parameter name "Param1" of type id, typeid(EntityId())
    method0:AddParameter("Param1", typeid(EntityId()));
    
    -- -- Register to enable the Script Event
    scriptEventDefinition:Register();
    
    -- -- Connect
    scriptEventHandler = Script_Broadcast.Connect(luaScriptEventBroadcast, self.entityId);
    -- scriptEventHandler = Script_Broadcast.Connect(luaScriptEventBroadcast);
end

-- -- Optional. Disconnect when this Lua Script Deactivates
function OnDeactivate()
	  -- scriptEventHandler:Disconnect();
end

```


```lua
-- -- This is a second Lua file. This is one of the files that can invoke/call/consume/get-return-value
-- -- NOTE: In some UI cases (uicanvas), you should avoid calling the Script Event inside the OnActivate function.

-- -- NO ADDRESS needed
function FunctionInAnotherLuaFile2()
    local returnValue = Script_Broadcast.Broadcast.BroadcastMethod0(2, EntityId(23456))
end

```

```lua
-- -- This is the third Lua file. This is another one of the files that can invoke/call/consume/get-return-value
-- -- NOTE: In some UI cases (uicanvas), you should avoid calling the Script Event inside the OnActivate function.

-- -- NO ADDRESS needed
function FunctionInAnotherLuaFile3()
    local returnValue = Script_Broadcast.Broadcast.BroadcastMethod0(3, EntityId(234567))
end

```

