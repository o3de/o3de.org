---
description: ' Use Lua script to configure network binding of properties in &ALYlong;. '
slug: lua-script-networking-binding
title: Network Binding Properties
---
# Network Binding Properties<a name="lua-script-networking-binding"></a>

For network binding features to function, you must have a [Creating a NetBindable Component](network-replicas-binding.md)\.

## Properties<a name="lua-script-networking-binding-properties"></a>

You can configure networking binding for properties by adding the `netSynched` table to the description of the variable inside of the `Properties` table\.

```
local ExampleScript = {
    Properties = {
        Speed = {
            default = 0,   -- Supports numbers, strings, booleans, and nils for net bindings.
            min = 0,
            max = 100,
            step = 1,
            description = "Speed in m/s for the ...",
 
            -- If this table is missing, it is assumed the value is not networked.
            netSynched =
            {
                -- Optional fields
                OnNewValue = <function> -- OnNewValue is called whenever the property has a
                                        -- new value. OnNewValue accepts one parameter,which
                                        -- is the entity table for the instance that changed.
 
                -- The following flags are mainly here for debugging and profiling convenience.
                Enabled = true          -- Controls whether the field is network enabled. If 
                                        -- missing, assumes true.
                ForceIndex = [1..32]    -- Profiling helper tool to force a property to use a
                                        -- specific DataSet to make understanding what data is 
                                        -- being used where easier.
            }``
        }
    }
}
return ExampleScript
```

After you add networking to a property, any changes to the property are reflected across the network\.

## RPCs<a name="lua-script-networking-binding-rpcs"></a>

Exposing RPCs to scripts involves creating a new table inside of the component table, but outside of the properties table, as shown in the following example\.

```
local ExampleScript = {
    Properties = {
        -- ...
    },
  
    -- Table of remote procedure calls (RPCs) that the script wants to implement.
    NetRPCs =
    {
        RPCNoParam = {
            OnMaster = <function> -- The function to be called on the Primary Script.
                                  -- The function should return a bool value that 
                                  -- indicates whether or not proxy components can 
                                  -- execute the RPC on themselves. Required.
            OnProxy = <function>  -- The function to be called on the Proxy Script. 
                                  -- This function is optional and can be excluded if 
                                  -- the master never allows proxies to execute the function call.
        }
    }
}
 
return ExampleScript
```

You can invoke the RPC just like any other function\. There is no need to specify the `OnMaster/OnProxy` from the calling script\. For example, you can call RPCs as in the following example\.

```
self.NetRPCs.RPCNoParam()
self.NetRPCs.RPCParam(1.0)
```