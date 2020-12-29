# Properties Table<a name="lua-scripting-ces-properties"></a>

The `Properties` table configures the editor interface for customizing the behavior of a script\. With the properties table, you can modify numeric values, select states, and turn flags on and off\. The table can even provide a reference to entities that your script can interact with\.

The properties inside the `Properties` table are exposed to the editor\. Properties outside the `Properties` table are private and not displayed in the editor\.

The following example is a properties table from the **Controllable Chicken** sample level\.

```
-- Example Properties Table 
local ChickenMannequinControllerSM =
{
    Properties =
    {
        MoveSpeed = { default = 3.0, description = "How fast the chicken moves.", suffix = " m/s" },
        RotationSpeed = { default = 360.0, description = "How fast (in degrees per second) the chicken can turn.", suffix = " deg/sec"},
        CameraFollowDistance = {default = 5.0, description = "Distance (in meters) from which camera follows character."},
        CameraFollowHeight = {default = 1.0, description = "Height (in meters) from which camera follows character."},
        CameraLerpSpeed = {default = 5.0, description = "Coefficient for how tightly camera follows character."},
        Camera = { default = EntityId() },
        InitialState = "Idle",
        DebugStateMachine = false,
    },
...
```

The result is the following **Properties** user interface in Lumberyard Editor:

![\[Properties in Lumberyard Editor defined by the Properties table\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/lua/lua-scripting-ces-4.png)

The type that you provide as the default value determines how the property is appears in the editor user interface\. You can further customize the representation of the property in the editor by specifying additional attributes in a table format\. All property types support a description field that appears when you pause your mouse on the property name in the editor\.

## Supported Types<a name="lua-scripting-ces-properties-types"></a>

Properties can have the types described in this section\.

### Boolean Values \(True, False\)<a name="lua-scripting-ces-properties-types-boolean"></a>

The following examples are Boolean values\.

```
DebugMovement = false,
AllowMovement = { default = true, description = "Allow or restrict movement of the object." },
```

In Lumberyard Editor, Boolean values are represented by a check box\.

### Numeric Values \(Integer or Floating Point Numbers\)<a name="lua-scripting-ces-properties-types-numeric"></a>

The following examples are numeric values\.

```
Count = 5,
Velocity = { default = 1.0, suffix = "m/s", description = "Initial Velocity Of The Object" },
Distance = { default = 5.0, min = 2.0, max = 10.0, step = 2.0, suffix = "m", description = "The Distance An Object Can Travel In Meters" },
```

In Lumberyard Editor, numeric values are represented by an edit field with increase/decrease arrows\. Numeric values can do the following:
+ Provide a custom suffix to indicate units\.
+ Set minimum and maximum values\.
+ Provide a step value \(how much the value increases or decreases when the user clicks the arrows on the right side of the edit field\)\.

### Strings<a name="lua-scripting-ces-properties-types-strings"></a>

The following examples are strings\.

```
DebugPrefix = "d_",
Name = { default = "Default Name", description = "The name of the entity" },
StartingState = { "Idle", description = "Specify the starting state. Valid starting states are Idle and Fidget" },
```

In Lumberyard Editor, string values are represented by a text edit box\.

### Reflected Classes<a name="lua-scripting-ces-properties-types-reflected-classes"></a>

You can use any class that is reflected to both the `BehaviorContext` and the `EditContext` as a property\. A good example of this is the `EntityId` type, which references other entities\.

```
-- Entity Examples
ParentEntity = { default = EntityId(), description = "The Entity that this one will follow"},
Target = EntityId()
```

The editor representation is the default editor for the type reflected\. For example, for `EntityId`, it's the entity reference picker\. For most reflected types, it is a tree of the type's properties\.

### Arrays<a name="lua-scripting-ces-properties-types-arrays"></a>

Properties can contain resizable arrays of any of the types mentioned\. To create a simple array, declare the default value as a keyless table of values\. For example, the property definitions in the following code produce the properties shown in the image that follows\.

```
local ExampleScript = {
      Properties = {
          Speed = 4,
          ExampleArray = { default = { 1, 2, 3, 4 } },
      }
}
return ExampleScript
```

![\[Property array\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/lua/lua-scripting-ces-properties-types-arrays.png)

In the Entity Inspector, you can use the green **\+** and red **X** icons to add and remove entries in real time\. You can also use `EntityId()` to make the array elements entity references, as in the following example from the `lumberyard_version\dev\Gems\LyShineExamples\Assets\UI\Scripts\LyShineExamples\Image\ImageFillTypes.lua` file\.

```
local ImageFillTypes = 
{
	Properties = 
	{
		FilledImages = { default = { EntityId(), EntityId(), EntityId(), EntityId() } },
		Dropdowns = { default = { EntityId(), EntityId(), EntityId(), EntityId() } },
		RadialStartAngleSlider = { default = EntityId() },
		SpriteRadioButtonGroup = { default = EntityId() },
	},
}
...
```

## Grouping Properties<a name="lua-scripting-ces-properties-grouping"></a>

The following code example shows how you can use variables within the `Properties` table to expose named groupings of properties\.

```
local Test = {
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
return Test
```

When rendered in the UI, the property groupings and properties are sorted alphabetically irrespective of their order in the code\.

![\[Grouped properties\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/lua/lua-scripting-ces-properties-types-arrays-grouped.png)

## Attributes<a name="lua-scripting-ces-properties-attributes"></a>

You can add attributes to a property by placing them alongside the default value in a property table\. Attribute keys are not case sensitive\. The following common attributes can be added to any property\.


**Common Attributes**  

| Attribute | Description | 
| --- | --- | 
| Description | A string that is the text of the tool tip for the property\. | 
| UI | Specifies \(overrides\) the UI handler that the property uses\.  | 