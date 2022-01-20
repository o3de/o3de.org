---
linkTitle: Properties Table
title: The Lua Script Properties Table
description: Specify the properties of a Lua script component that appear in O3DE Editor in Open 3D Engine.
toc: True
weight: 400
---

The Properties Table configures the **Lua Script** component's user interface in **Entity Inspector** for customizing the behavior of a Lua script. With the Properties Table, you can modify numeric values, select states, and turn flags on and off. The table can even reference other entities that your script can interact with.

The properties inside the Properties Table are exposed to **O3DE Editor**. Properties outside the Properties Table are private and not displayed in the editor.

The following example is a Properties table for an character controller.

```lua
-- Properties Table Example
Properties = {
    MoveSpeed = {
        default = 3.0,
        suffix = "m/s",
        description = "Character movement speed."
    },
    RotationSpeed = {
        default = 360.0,
        suffix = "deg/sec",
        description = "Character turning speed."
    },
    CameraFollowDistance = {
        default = 5.0,
        suffix = "m",
        description = "Minimum follow-distance between the camera and character."
    },
    CameraFollowHeight = {
        default = 1.0,
        suffix = "m",
        description = "Camera height-offset from the character."
    },
    CameraLerpSpeed = {
        default = 5.0, 
        description = "Coefficient that affects the camera's rate of closure."
    },
    Camera = {
        default = EntityId()
    },
    InitialState = "Idle",
    DebugStateMachine = false
}
```

When rendered in the user interface, properties are sorted alphabetically irrespective of their order in the script.

The result is the following **Properties** user interface in the Lua Script component:

![Properties in O3DE Editor defined by the Properties table](/images/user-guide/scripting/lua/character-controller.png)

The type you provide as the default value determines how the property appears in the **Properties** user interface. You can further customize the representation of the property in O3DE Editor by specifying additional attributes in a table format. All property types support a description field that is displayed when you hover the mouse over the property name.

## Supported types 

Properties can have the types described in this section.

### Boolean values (True, False) 

The following examples are boolean values.

```lua
-- Boolean Examples
Properties = {
    DebugMovement = false,
    AllowMovement = { 
        default = true, 
        description = "Toggles object movement."
    }
}
```

In O3DE Editor, boolean values are represented by a check box.

### Numeric values (integer or floating-point numbers) 

The following examples are numeric values.

```lua
-- Numeric Examples
Properties = {
    Count = 5,
    Velocity = { 
        default = 1.0, 
        suffix = "m/s", 
        description = "Initial velocity of the object."
    },
    Distance = { 
        default = 5.0, 
        suffix = "m", 
        min = 2.0, 
        max = 10.0, 
        step = 2.0, 
        description = "Maximum distance an object can travel."
    }
}
```

In O3DE Editor, numeric values are represented by an edit field with increase/decrease arrows. Additional attributes may be included in numeric property definitions that:
+ Provide a custom suffix to indicate units.
+ Set minimum and maximum values.
+ Provide a step value (how much the value increases or decreases when the user clicks the arrows on the right side of the edit field).

### Strings 

The following examples are strings.

```lua
-- String Examples
Properties = {
    DebugPrefix = "d_",
    StartingState = { 
        default = "Idle", 
        description = "Sets the starting state."
    }
}
```

In O3DE Editor, string values are represented by a text edit box.

### Reflected classes 

You can use any class that is reflected to both the `BehaviorContext` and the `EditContext` as a property. A good example is the `EntityId` type, which references entities.

```lua
-- Entity Examples
Properties = {
    Target = EntityId(),
    ParentEntity = { 
        default = EntityId(), 
        description = "Sets the entity to track."
    }
}
```

The editor representation is the default editor for the type reflected. For example, for `EntityId`, it's the entity reference picker. For most reflected types, it is a tree of the type's properties.

```lua
...
-- Reflected Type Examples
Properties = {
    Vector2 = { 
        default = Vector2(1, 2), 
        min = 0, 
        max = 5, 
        step = 0.5 
    },
    Vector3 = { 
        default = Vector3(3, 4, 5)
    },
    Vector4 = { 
        default = Vector4(6, 7, 8, 9)
    },
    Color = { 
        default = Color(100, 200, 100)
    },
    SurfaceTag = { 
        default = SurfaceTag()
    }
}
```

![Reflected types as properties](/images/user-guide/scripting/lua/reflected-types.png)

### Arrays 

Properties can contain resizable arrays of any of the types mentioned. To create an array, declare the default value as a keyless table of values. For example, the property definitions in the following code produce the properties shown in the image below.

```lua
-- Array Example
Properties = {
    ExampleArray = { 
        default = { 
            1, 2, 3, 4 
        } 
    }
}
```

![Property array](/images/user-guide/scripting/lua/array-example.png)

In Entity Inspector, click {{< icon "add.svg" >}} and {{< icon "delete.svg" >}} to add and remove entries in real-time. You can also use `EntityId()` for an array's values to make the array elements entity references.

## Grouping properties 

The following code example shows how to use variables within the Properties Table to expose named groupings of properties.

```lua
-- Grouped Properties Example
Properties = {
		Movement = {
			  TopSpeed = 4,
			  Acceleration = 2,
			  TurnSpeed = 12
		},
		Combat = {
			  ProjectileDamage = 50,
			  RateOfFire = 3,
			  AmmoCapacity = 12
		}
}
```

![Grouped properties](/images/user-guide/scripting/lua/property-groups.png)

## Attributes 

Add attributes to a property by including them with the default value in a property's definition. Attribute keys are not case-sensitive.

### Common attributes

Common attributes can be added to any property.

| Attribute | Description |
| --- | --- |
| Description | A string that is the text of the tooltip for the property. |
| UI | Specifies (overrides) the UI handler that the property uses.  |

### Numeric attributes

Numeric attributes can only be added to properties with numeric representations.

| Attribute | Description |
| --- | --- |
| Suffix | A string that denotes the attribute's unit of measurement. |
| Min | The minimum value that the attribute can be set to in O3DE Editor. |
| Max | The maximum value that the attribute can be set to in O3DE Editor. |
| Step | The amount that the attribute's value will be incremented by when changed in O3DE Editor. |
