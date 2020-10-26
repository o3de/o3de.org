# Using Script Events in Lua<a name="script-events-lua"></a>

Lua scripts can use script events to communicate with each other\. There are two example scripts that show this communication, both available in the `lumberyard_version\dev\Gems\ScriptEvents\Assets\Scripts\Example` directory\. They are called `ScriptEvents_Addressable.lua` and `ScriptEvents_Broadcast.lua`\. If an EBus is addressed, events are sent to a specific address ID\. Events that are broadcast globally are received at all addresses\. For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

**ScriptEvents\_Addressable\.lua**  
The `ScriptEvents_Addressable.lua` example script implements a handler for a script event that requires an address for a handler to be invoked\. It broadcasts a method, but only handlers connected to the address that match the one specified in the event can invoke it\. 

**Example**  

```
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

**ScriptEvents\_Broadcast\.lua**  
The `ScriptEvents_Broadcast.lua` example script implements a handler for a broadcast script event\. Because broadcast script events do not specify an address type, any handler can connect to them\.

**Example**  

```
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