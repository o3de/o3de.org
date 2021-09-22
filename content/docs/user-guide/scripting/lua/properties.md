---
linkTitle: Properties Table
title: The Lua Script Properties Table
description: Specify the properties of a Lua script component that appear in O3DE Editor in Open 3D Engine.
toc: True
weight: 400
---

The Properties Table configures the **Lua Script** component's user interface in **Entity Inspector** for customizing the behavior of a Lua script. With the Properties Table, you can modify numeric values, select states, and turn flags on and off. The table can even provide a reference to entities that your script can interact with.

The properties inside the Properties Table are exposed to **O3DE Editor**. Properties outside the Properties Table are private and not displayed in the editor.

The following example is a Properties table for a character controller.

```lua
-- Example Properties Table
local CharacterController =
{
    Properties =
    {
        MoveSpeed = { default = 3.0, description = "How fast the character moves (in meters per second).", suffix = " m/s" },
        RotationSpeed = { default = 360.0, description = "How fast (in degrees per second) the character turns.", suffix = " deg/sec"},
        CameraFollowDistance = {default = 5.0, description = "Distance (in meters) from which camera follows character.", suffix = " m"},
        CameraFollowHeight = {default = 1.0, description = "Height (in meters) from which camera follows character.", suffix = " m"},
        CameraLerpSpeed = {default = 5.0, description = "Coefficient for how tightly camera follows character."},
        Camera = { default = EntityId() },
        InitialState = "Idle",
        DebugStateMachine = false,
    },
...
```

The result is the following **Properties** user interface in the Lua Script component:

![Properties in O3DE Editor defined by the Properties table](/images/user-guide/scripting/lua/character-controller.png)

The type that you provide as the default value determines how the property appears in the **Properties** user interface. You can further customize the representation of the property in O3DE Editor by specifying additional attributes in a table format. All property types support a description field that appears when you hover the mouse over the property name in O3DE Editor.

## Supported types 

Properties can have the types described in this section.

### Boolean values (True, False) 

The following examples are boolean values.

```lua
DebugMovement = false,
AllowMovement = { default = true, description = "Allow or restrict movement of the object." },
```

In O3DE Editor, boolean values are represented by a check box.

### Numeric values (integer or floating point numbers) 

The following examples are numeric values.

```lua
Count = 5,
Velocity = { default = 1.0, suffix = "m/s", description = "Initial velocity of the object." },
Distance = { default = 5.0, min = 2.0, max = 10.0, step = 2.0, suffix = "m", description = "The distance an object can travel (in meters)." },
```

In O3DE Editor, numeric values are represented by an edit field with increase/decrease arrows. Numeric values can do the following:
+ Provide a custom suffix to indicate units.
+ Set minimum and maximum values.
+ Provide a step value (how much the value increases or decreases when the user clicks the arrows on the right side of the edit field).

### Strings 

The following examples are strings.

```lua
DebugPrefix = "d_",
Name = { default = "Default Name", description = "The name of the entity" },
StartingState = { "Idle", description = "Specify the starting state. Valid starting states are Idle and Fidget" },
```

In O3DE Editor, string values are represented by a text edit box.

### Reflected classes 

You can use any class that is reflected to both the `BehaviorContext` and the `EditContext` as a property. A good example of this is the `EntityId` type, which references other entities.

```lua
-- Entity Examples
ParentEntity = { default = EntityId(), description = "The Entity that this one will follow"},
Target = EntityId()
```

The editor representation is the default editor for the type reflected. For example, for `EntityId`, it's the entity reference picker. For most reflected types, it is a tree of the type's properties.

```lua
-- Additional reflected types
Properties = {
  Vector2 = { Default = Vector2( 1, 2 ), Min = 0, Max = 5, Step = 0.5 },
  Vector3 = { Default = Vector3( 3, 4, 5 ) },
  Vector4 = { Default = Vector4( 6, 7, 8, 9 ) },
  Color = { Default = Color( 100, 200, 100 ) },
  SurfaceTag = { Default = SurfaceTag() }
}
...
```

![Reflected types as properties](/images/user-guide/scripting/lua/reflected-types.png)

### Arrays 

Properties can contain resizable arrays of any of the types mentioned. To create a simple array, declare the default value as a keyless table of values. For example, the property definitions in the following code produce the properties shown in the image that follows.

```lua
local ArrayExample = {
      Properties = {
          ExampleArray = { default = { 1, 2, 3, 4 } }
      }
}
return ArrayExample
```

![Property array](/images/user-guide/scripting/lua/array-example.png)

In Entity Inspector, you can use the green **+** and red **X** icons to add and remove entries in real time. You can also use `EntityId()` to make the array elements entity references.

## Grouping properties 

The following code example shows how you can use variables within the Properties Table to expose named groupings of properties.

```lua
local PropertyGroups = {
	Properties = {
		Movement = {
			TopSpeed = 4,
			Acceleration = 2,
			TurnSpeed = 12,

		},
		Combat = {
			ProjectileDamage = 50,
			RateOfFire = 3,
			AmmoCapacity = 12,
		},
	}
}
return PropertyGroups
```

When rendered in the user interface, the property groupings and properties are sorted alphabetically irrespective of their order in the code.

![Grouped properties](/images/user-guide/scripting/lua/property-groups.png)

## Attributes 

You can add attributes to a property by placing them alongside the default value in a Properties Table. Attribute keys are not case sensitive. The following common attributes can be added to any property.

### Common attributes

| Attribute | Description |
| --- | --- |
| Description | A string that is the text of the tool tip for the property. |
| UI | Specifies (overrides) the UI handler that the property uses.  |

The following attributes can be added to properties with numeric representations.

### Numeric attributes

| Attribute | Description |
| --- | --- |
| Suffix | A string that denotes the attribute's unit of measurement. |
| Min | The minimum value that the attribute can be set to in the Editor. |
| Max | The maximum value that the attribute can be set to in the Editor. |
| Step | The amount that the attribute's value will be incremented by when changed in the Editor. |
