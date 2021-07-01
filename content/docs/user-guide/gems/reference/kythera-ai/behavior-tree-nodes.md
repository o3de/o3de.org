---
linkTitle: BT Editor Nodes
title: Behavior Tree Editor Nodes
description: Reference for all nodes available in the Kythera AI Behavior Tree editor
weight: 800
toc: true
---
This is a reference of all Behavior Tree nodes available in the [BT editor](behavior-tree-editor)

## Leaf action nodes

Nodes with no children

### Ship movement

#### Ship\_Drift

Keep the ship moving at current velocity (and allow it to be affected by external influences)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Look** | EntityId, Position | no  |     | Direction for ship to point in |

**Outputs:** none

* * *

#### Ship\_FlyFlourishSpline

Fly a nav spline as a flourish. That is - copy the spline directly in front of the ship and fly that

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Spline** | EntityId | yes | \-  | The spline to fly |
| **SpeedOverride** | Float | no  | \-1.00 | Speed to fly the spline at. This is read every frame while the spline is being flown. The default of -1 causes the spline to be flown at the usual speed |
| **DisableAvoidance** | Boolean | no  | false | While flying this spline switch off collision avoidance |

**Outputs:** none

* * *

#### Ship\_FlySpline

Fly a nav spline

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Spline** | EntityId | yes | \-  | The spline to fly |
| **StartAtNearest** | Boolean | no  | false | Whether to start at the nearest point on the spline |
| **AttackTargets** | Boolean | no  | true | If true (default), fire on targets that are specified by the spline |
| **AttackUsualTarget** | Boolean | no  | false | If true, face and fire at the target selected by the usual target selector while flying the spline. If spline targets are specified and AttackTargets is true, this option will be overridden while going past those specific points |
| **SpeedOverride** | Float | no  | \-1.00 | Speed to fly the spline at. This is read every frame while the spline is being flown. The default of -1 causes the spline to be flown at the usual speed |
| **ErrorLimit** | Float | no  | \-1.00 | Maximum distance the entity may be away from the spline. If this distance is exceeded then the entity's position is overridden. Negative for no limit (default), otherwise must be >= 1m |
| **TeleportToStart** | Boolean | no  | false | Instead of flying to the start of the spline, immediately teleport the ship there |
| **AvoidanceMode** | StringHash | no  | "Normal" | While flying this spline what type of collision avoidance to do (Options: Off, Normal, Limited) |
| **FailOnJoinFallback** | Boolean | no  | false | Whether to fail this node if joining falls back to use spline based method. This should normally be set to true when splines are picked systemically, to avoid collisions when the path to a systemically picked spline collides with something |

**Outputs:** none

* * *

#### Ship\_GetSplinePoint

Get a point from a spline

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Spline** | EntityId | yes | \-  | The spline to look up from |
| **SplineIndex** | Integer | yes | \-  | Which point to look up |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **PointPos** | Position | yes | Position of spline point |

* * *

#### Ship\_Goto

Go straight to a destination. Destination is re-evaluated each update

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Destination** | EntityId, Position | yes | \-  | Where to go to |
| **AbsoluteSpeed** | Float | no  | 0.00 | The speed to move at in m/s, RelativeSpeed is used if this is set to 0 |
| **RelativeSpeed** | Float | no  | 1.00 | The proportion of maximum speed to move at (0.0 - 1.0) |
| **EndDistance** | Float | no  | 0.00 | The minimum distance from the end point to complete at |
| **AbsoluteSpeedAtDestination** | Float | no  | 0.00 | The absolute speed to be moving at when reaching target position in m/s. Defaults to using RelativeSpeedAtDestination. When going to an entity, this is ignored, instead the entity's current speed is used |
| **RelativeSpeedAtDestination** | Float | no  | 0.00 | The relative speed to be moving at when reaching target position (0.0 - 1.0). Defaults to stop. When going to an entity, this is ignored, instead the entity's current speed is used |
| **LookAtDestination** | Boolean | no  | false | Whether to set the look direction to be looking at the destination |
| **LookTarget** | EntityId, Position | no  |     | Explicit look target (optional) |

**Outputs:** none

* * *

#### Ship\_MaintainVel

Keep the ship moving at current velocity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Velocity** | Velocity | yes | \-  | The velocity for the ship to move at (read every frame) |
| **Look** | EntityId, Position | no  |     | Direction for ship to point in |

**Outputs:** none

* * *

#### Ship\_PathTo

Path to a destination. Destination is re-evaluated each update

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Destination** | EntityId, Position | yes | \-  | Where to go to/path to follow |
| **AbsoluteSpeed** | Float | no  | 0.00 | The speed to move at in m/s, RelativeSpeed is used if this is set to 0 |
| **RelativeSpeed** | Float | no  | 1.00 | The proportion of maximum speed to move at (0.0 - 1.0) |
| **EndDistance** | Float | no  | 0.00 | The minimum distance from the end point to complete at |
| **AbsoluteSpeedAtDestination** | Float | no  | 0.00 | The absolute speed to be moving at when reaching target position in m/s. Defaults to using RelativeSpeedAtDestination. When going to an entity, this is ignored, instead the entity's current speed is used |
| **RelativeSpeedAtDestination** | Float | no  | 0.00 | The relative speed to be moving at when reaching target position (0.0 - 1.0). Defaults to stop. When going to an entity, this is ignored, instead the entity's current speed is used |
| **LookTarget** | EntityId, Position | no  |     | Explicit look target (optional) |

**Outputs:** none

* * *

#### Ship\_Roll

Roll the ship, normally executed in parallel with another movement node. Never completes

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **RollRate** | Float | yes | \-  | Rotation rate in rad/sec |

**Outputs:** none

* * *

#### Ship\_Stop

Bring the entity to a complete stop

**Inputs:** none

**Outputs:** none

* * *

#### Ship\_Track

Attempt to reach and maintain a given distance from a target entity. Target is only evaluated on entry

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Target** | EntityId, Position | yes | \-  | The entity or position to track |
| **MinAbsoluteSpeed** | Float | no  | 0.00 | The minimum speed to move at while tracking in m/s, MinRelativeSpeed is used if this is set to 0 |
| **MinRelativeSpeed** | Float | no  | 0.00 | The minimum proportion of top speed to move at while tracking (0.0 - 1.0) |
| **MaxAbsoluteSpeed** | Float | no  | 0.00 | The maximum speed to move at while tracking in m/s, MaxRelativeSpeed is used if this is set to 0 |
| **MaxRelativeSpeed** | Float | no  | 1.00 | The maximum proportion of top speed to move at while tracking (0.0 - 1.0) |
| **Distance** | Float | yes | \-  | Distance to attempt to stay away from the target |
| **LookAtDestination** | Boolean | no  | false | Whether to set the look direction to be looking at the destination |

**Outputs:** none

* * *

#### Ship\_TurnToTarget

Turn the ship to face a target. Reads target every frame until completes

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Target** | EntityId, Position | yes | \-  | Either a target entity or a position for the ship to point at |
| **MaintainDirection** | Boolean | no  | false | If true, keeps a constant velocity and rotates to point at target. If false, keeps a constant speed but changes direction of velocity to point at target |
| **Tolerance** | Float | no  | 1.00 | Tolerance (in degrees) in the direction that must be reached before the node completes |

**Outputs:** none

* * *

### Character movement

#### Character\_ExactGoto

Move to the given position and direction

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Destination** | Position | yes | \-  | Where the character should go to |
| **Direction** | Vector | yes | \-  | What direction the character should face in at the destination position |
| **Speed** | Float, StringHash | yes | \-  | The speed for the character to move at |

**Outputs:** none

* * *

#### Character\_Goto

Path find and goto destination

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Destination** | EntityId, Position | yes | \-  | Where to go to |
| **Speed** | Float, StringHash | yes | \-  | The speed for the character to move at |
| **EndDistance** | Float | no  | 0.00 | The distance from the end of the path to complete |

**Outputs:** none

* * *

#### Character\_GotoDirectness

Approach the given waypoint at a given directness

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Destination** | EntityId, Position | yes | \-  | Position to approach |
| **Speed** | Float, StringHash | yes | \-  | The speed for the character to move at |
| **EndDistance** | Float | no  | 1.00 | Distance from destination to complete |
| **Directness** | Float | no  | 1.00 | Directness of approach |

**Outputs:** none

* * *

#### Character\_GotoWaypoint

Pathfind to a given input. When nearly complete, redirect to a new waypoint if one has been given

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Waypoint** | EntityId, Position | yes | \-  | The next waypoint to go to |
| **Speed** | Float, StringHash | yes | \-  | The speed for the character to move at |
| **EndTolerance** | Float | no  | 1.00 | At what distance from the current waypoint to read in the next waypoint |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **DistanceToWaypoint** | Float | yes | Distance to the current waypoint |

* * *

#### Character\_IsPointReachableNow

Succeed if there is a valid path from the start point/entity to the end point/entity, fail if not

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Start** | EntityId, Position | no  |     | Position/entity to start test from. Default is current AI position |
| **End** | EntityId, Position | yes | \-  | Position/entity to test to |
| **ClampRadiusXY** | Float | no  | 2.00 | The radius to clamp to on start and end points in XY plane |
| **ClampRadiusZ** | Float | no  | 2.00 | The radius to clamp to on start and end points on Z axis |
| **MaxPathLength** | Float | no  |     | The maximum path length to test. Will default to 2x the distance from start to end positions |

**Outputs:** none

* * *

#### Character\_PathDistance

Get the length of the current path. Fails if there is no current path

**Inputs:** none

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Distance** | Float | yes | The distance from the end of the path to complete |

* * *

#### Character\_SteeringGoto

Let steering handle motion for this entity (from other input)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Speed** | Float, StringHash | yes | \-  | The speed for the character to move at |

**Outputs:** none

* * *

#### Character\_TurnToFace

Makes a character turn to face a direction or position

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Goal** | Vector, EntityId, Position | yes | \-  | The position or direction or entity for the character to face |
| **DirTolerance** | Float | no  | 5.00 | The tolerance (in degrees) of the target direction |
| **TurnRate** | Float | no  | 0.00 | Optionally override the character turn rate, in degrees per second. Ignored if zero (or less) |

**Outputs:** none

* * *

### Character control

#### SetStance

Set the stance of a character

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Stance** | StringHash | no  | "Stand" | The stance to switch to |
| **Strafing** | Boolean | no  | false | Whether to allow strafing or not |

**Outputs:** none

* * *

### Conditional

#### CompareNow

Test a Lua script conditional expression. Can access entity, profile and behavior blackboards

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Condition** | StringHash | yes | \-  | The expression to be evaluated. Must evaluate as a boolean (e.g. it could have multiple expressions with ands and ors, for example) |

**Outputs:** none

* * *

#### EqualsNow

Test whether two inputs are equal (Lhs == Rhs)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Lhs** | Any | yes | \-  | Left hand value to test |
| **Rhs** | Any | yes | \-  | Right hand value to test |

**Outputs:** none

* * *

#### GreaterThanEqualsNow

Test whether one input is greater or equal to another (Lhs >= Rhs)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Lhs** | Integer, Float | yes | \-  | Left hand value to test |
| **Rhs** | Integer, Float | yes | \-  | Right hand value to test |

**Outputs:** none

* * *

#### GreaterThanNow

Test whether one input is greater than another (Lhs > Rhs)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Lhs** | Integer, Float | yes | \-  | Left hand value to test |
| **Rhs** | Integer, Float | yes | \-  | Right hand value to test |

**Outputs:** none

* * *

#### HasTagNow

Checks whether an entity has a particular tag

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Tag** | Tag | yes | \-  | The tag to test |
| **EntityId** | EntityId | yes | \-  | The id of the entity to test on |

**Outputs:** none

* * *

#### HasVariableNow

Checks whether the named variable exists

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Name** | StringHash | yes | \-  | The variable name (or path) to check for |

**Outputs:** none

* * *

#### IsInFrontNow

True if the given entity or position has a dot product with our current direction greater than the minimum specified

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Target** | EntityId, Position | yes | \-  | entity or position to test |
| **MinDotProduct** | Float | no  | 0.00 | Minimum dot product for target to be considered 'in front' |

**Outputs:** none

* * *

#### IsInGroupNow

Checks whether an entity has membership of a particular group

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **EntityId** | EntityId | yes | \-  | The id of the entity to test on |
| **GroupId** | EntityId | yes | \-  | The id of the entity to test on |

**Outputs:** none

* * *

#### IsInRangeNow

True if the distance between two positions is within the given range

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Start** | EntityId, Position | yes | \-  | Entity or position to test from |
| **End** | EntityId, Position | yes | \-  | Entity or position to check distance to |
| **MinRange** | Float | no  | 0.00 | Minimum distance for check to pass (optional) |
| **MaxRange** | Float | no  |     | Maximum distance for check to pass (optional) |

**Outputs:** none

* * *

#### IsValidIDNow

True if the given entity ID is not empty and the entity exists

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **EntityId** | EntityId | yes | \-  | Entity ID |

**Outputs:** none

* * *

#### LessThanEqualsNow

Test whether one input is less or equal to another (Lhs <= Rhs)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Lhs** | Integer, Float | yes | \-  | Left hand value to test |
| **Rhs** | Integer, Float | yes | \-  | Right hand value to test |

**Outputs:** none

* * *

#### LessThanNow

Test whether one input is less than another (Lhs < Rhs)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Lhs** | Integer, Float | yes | \-  | Left hand value to test |
| **Rhs** | Integer, Float | yes | \-  | Right hand value to test |

**Outputs:** none

* * *

#### RandomChanceNow

True with a given probability

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Probability** | Float | yes | \-  | Probability of success (range 0-1) |

**Outputs:** none

* * *

#### SignalHasParameterNow

True if the given signal contains a parameter with the given name

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Signal** | Blackboard | yes | \-  | The signal to query |
| **ParameterName** | String | yes | \-  | Name of the parameter to look for, this may be a path if the signal contains sub-blackboards |

**Outputs:** none

* * *

#### TimeGreaterThanNow

Test whether more than a certain interval of time has passed since a timestamp. False if the timestamp isn't set

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Timestamp** | Timestamp | yes | \-  | The timestamp of an event |
| **Interval** | Float | yes | \-  | Minimum time since the event |

**Outputs:** none

* * *

#### TimeLessThanNow

Test whether less than a certain interval of time has passed since a timestamp. False if the timestamp isn't set

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Invert** | Boolean | no  | false | Check for the opposite of the condition |
| **Timestamp** | Timestamp | yes | \-  | The timestamp of an event |
| **Interval** | Float | yes | \-  | Maximum time since the event |

**Outputs:** none

* * *

### Math

#### Add

Add two inputs together. The inputs must be of types that make sense to be added (int, float, vector)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **InputA** | Integer, Float, Vector, Position, Velocity | yes | \-  | First input of any type |
| **InputB** | Integer, Float, Vector, Position, Velocity | yes | \-  | Second input of the same type as InputA |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Any | yes | InputA + InputB |

* * *

#### Divide

Divide one input by another. The numerator input must be a divisible type (int, float, vector). Denominator must a number (int, float)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **InputA** | Integer, Float, Vector | yes | \-  | InputA - Numerator input |
| **InputB** | Integer, Float | yes | \-  | InputB - Denominator input |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Any | yes | InputA/InputB |

* * *

#### Dot

Calculate the dot product of two vectors

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **InputA** | Vector | yes | \-  | First vector |
| **InputB** | Vector | yes | \-  | Second vector |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Float | yes | InputA . InputB |

* * *

#### Length

Get the length of a vector or velocity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Vector** | Vector, Velocity | yes | \-  | A vector or velocity |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Float | yes | Length of the vector |

* * *

#### Multiply

Multiply two inputs together. The inputs must of types that make sense to be multiplied (int, float, vector)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **InputA** | Integer, Float, Vector, Position, Velocity | yes | \-  | First input number |
| **InputB** | Integer, Float, Vector, Position, Velocity | yes | \-  | Second input number |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Any | yes | InputA \* InputB |

* * *

#### Normalize

Normalize a vector. Return (0,0,0) if the vector has no length

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Vector** | Vector | yes | \-  | A vector |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Vector | yes | A unit length vector in the same direction as Vector |

* * *

#### Subtract

Subtract one input from another. The inputs must be of types that make sense to be subtracted (int, float, vector)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **InputA** | Integer, Float, Vector, Position, Velocity | yes | \-  | First input of any type |
| **InputB** | Integer, Float, Vector, Position, Velocity | yes | \-  | Second input of the same type as InputA |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Any | yes | InputA - InputB |

* * *

### Search

#### Character\_PredictPosition

Predict where an entity will be in x secs assuming they continue to move at constant velocity on the navmesh

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Entity** | EntityId | yes | \-  | The entity to predict |
| **Time** | Float | yes | \-  | How far ahead to predict the position |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Position** | Position | yes | Predicted position |

* * *

#### Character\_RandomPointInRange

Find a random point within a given navigation distance of the agent (or an arbitrary position)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Range** | Float | yes | \-  | Maximum path distance to returned point (approximate) |
| **MinDistance** | Float | no  | 0.00 | Minimum straight line distance to returned point (approximate) |
| **Angle** | Float | no  | 0.00 | Angle of segment to limit search direction in degrees. Ignored if zero (or less) and clamped if greater than 180 |
| **Direction** | Vector | no  |     | Limit search direction to segment about this vector |
| **Center** | EntityId, Position | no  |     | Center the search on this position rather than the agent's current position |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Point** | Position | yes | The generated point |
| **Distance** | Float | no  | Approximate non-string pulled path distance to the point |

* * *

#### Character\_RandomPointWithDirectness

Find a random point closest to a given direction

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Destination** | EntityId, Position | yes | \-  | Target position or entity to calculate directness to |
| **Directness** | Float | yes | \-  | The target directness to generate point for |
| **Range** | Float | yes | \-  | Maximum path distance to returned point (approximate) |
| **MinDistance** | Float | no  | 0.00 | Minimum straight line distance to returned point (approximate). Default = 0.0f |
| **DirectionBias** | Vector | no  |     | Direction to bias when scoring points |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Point** | Position | yes | The generated point |

* * *

#### CountEntitiesWithTags

Search all entities and find the ones that match the specified tags. Returns an array of matching entities. If no entities match then node fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Tag** | Tag | yes | \-  | Tag to search on |
| **ExtraTag** | Tag | no  | ""  | Optional extra tag, if specified this must also be present |
| **ExcludeId** | EntityId | no  |     | Optional entity to exclude |
| **Range** | Float | no  | 0.00 | Max distance from entity's current position to search within |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Count** | Integer | yes | The number of entities found |

* * *

#### FindEntitiesWithTags

Search all entities and find the ones that match the specified tags. Returns an array of matching entities. If no entities match then node fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Tags** | StringHash, BlackboardArray | yes | \-  | Tag or array of tags to search for |
| **ExcludeId** | EntityId | no  |     | Optional entity to exclude |
| **Range** | Float | no  | 0.00 | Max distance from entity's current position to search within |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Results** | BlackboardArray | yes | The id of the selected entity |

* * *

#### FindNearestEntityWithTags

Search all entities within Range and find the ones that match the specified tags. Returns the closest entity from the set. If no entities match then node fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Tag** | Tag | yes | \-  | Tag to search on |
| **ExtraTag** | Tag | no  | ""  | Optional extra tags to also search on |
| **ExcludeId** | EntityId | no  |     | Optional entity to exclude |
| **Range** | Float | no  | 0.00 | Max distance from entity's current position to search within |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **EntityId** | EntityId | yes | The id of the nearest entity |
| **Distance** | Float | no  | The distance to the nearest entity |

* * *

#### FindRandomEntityWithTags

Search all entities and find the ones that match the specified tags. Returns a randomly select entity from the set. If no entities match then node fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Tag** | Tag | yes | \-  | Tag to search on |
| **ExtraTag** | Tag | no  | ""  | Optional extra tags to also search on |
| **ExcludeId** | EntityId | no  |     | Optional entity to exclude |
| **Range** | Float | no  | 0.00 | Max distance from entity's current position to search within. A value of zero means there is no distance limit |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **EntityId** | EntityId | yes | The id of the selected entity |

* * *

#### GetNextNavPoint

Finds the id of the next point on a nav route. Fails if there is no next point

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **CurrentPoint** | EntityId | yes | \-  | The id of the current point |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **NextPoint** | EntityId | yes | The id of the next point |

* * *

#### Ship\_RandomPointInRange

Find a random point in the octree within a given navigation distance of the agent (or an arbitrary position)

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Range** | Float | yes | \-  | Maximum path distance to returned point (approximate) |
| **MinDistance** | Float | no  | 0.00 | Minimum straight line distance to returned point (approximate) |
| **Center** | EntityId, Position | no  |     | Center the search on this position rather than the agent's current position |
| **ClampStartPoint** | Boolean | no  | false | Clamp the origin search to navigable octree |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Point** | Position | yes | The generated point |

* * *

### Utility

#### AddTag

Add a tag to an entity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Tag** | Tag | yes | \-  | The tag to add |
| **EntityId** | EntityId | yes | \-  | The id of the entity to add the tag to |

**Outputs:** none

* * *

#### ArrayBreak

Breaks out of currently iterating array loop, See also BTIterateOverArray

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **BreakResult** | StringHash | yes | \-  | Deems if this breakpoint should be considered successful or a failure |

**Outputs:** none

* * *

#### Character\_AdjustSpeedToTargetDist

Calculate speed based on distance from target

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Start** | EntityId, Position | no  |     | Optional position or id to calculate distance from, defaults to self |
| **End** | EntityId, Position | yes | \-  | The position or id to calculate distance to |
| **FarSpeed** | Float, StringHash | no  |     | Optional name of the speed or a speed value in m/s to use up to far distance, defaults to current speed |
| **FarDistance** | Float | yes | \-  | Distance at which to start interpolating speed towards CloseSpeed |
| **CloseSpeed** | Float, StringHash | no  |     | Optional name of the speed or a speed value in m/s to use within close distance, defaults to current speed |
| **CloseDistance** | Float | yes | \-  | Distance at which to finish interpolating speed towards CloseSpeed |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Float | yes | The calculated speed value |

* * *

#### Character\_Speed

Translate a named speed (e.g. 'Walk', 'Run') into its numerical value for this entity, applying an optional percentage modifier

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Speed** | Float, StringHash | no  |     | Optional name of the speed or a speed value in m/s, defaults to current speed |
| **Stance** | StringHash | no  |     | Optional stance to map against, defaults to current stance |
| **Multiplier** | Float | no  | 1.00 | Optional multiplier to apply to speed (to simplify calculating e.g. 10% faster than walking speed) |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Float | yes | The calculated speed value |

* * *

#### ClaimEntity

Claim ownership an entity and remove its 'Available' tag

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | The id of the entity to claim |
| **ObjectSlot** | StringHash | yes | \-  | Where on the entity ownership blackboard to store the object id. Only one object can be stored in each |

**Outputs:** none

* * *

#### ClearTimestampVariable

Clear the value of a timestamp so that any greater or less than comparisons will always return false

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Name of the timestamp variable to clear |

**Outputs:** none

* * *

#### Compute

Evaluate a Lua script conditional expression. Can access Entity, Profile and Behavior blackboards

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Expression** | StringHash | yes | \-  | The expression to be evaluated |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Any | yes | The result of the expression |

* * *

#### Copy

Copies a value (constant or variable) to a variable

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Input** | Any | yes | \-  | The value |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Output** | Any | yes | A copy of the value |

* * *

#### DistanceBetweenPoints

Get distance between two points, either of which can be specified as a KytPos or an entity ID

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Point1** | EntityId, Position | yes | \-  | The first position or id |
| **Point2** | EntityId, Position | yes | \-  | The second position or id |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Distance** | Float | yes | Distance between points |

* * *

#### DistanceToBoundsEdge

Get distance of an entity to the nearest edge of a bounds object, negative if outside of bounds

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **BoundsId** | EntityId | yes | \-  | The id of the bounds object |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Distance** | Float | yes | Distance to bounds edge, negative if outside of bounds |

* * *

#### EraseTag

Remove a tag from an entity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Tag** | Tag | yes | \-  | The tag to erase |
| **EntityId** | EntityId | yes | \-  | The id of the entity to erase the tag from |
| **IncludeChildren** | Boolean | no  | false | Whether to also erase children of this tag |

**Outputs:** none

* * *

#### EraseVariable

Erases a specified variable

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Name of the variable to erase |

**Outputs:** none

* * *

#### Execute

Execute a Lua script expression. Can access Entity, Profile and Behavior blackboards

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Expression** | StringHash | yes | \-  | The expression to be executed |

**Outputs:** none

* * *

#### Fail

Do nothing; return fail on first update

**Inputs:** none

**Outputs:** none

* * *

#### GenerateRandom2dDirection

Generate a random 2d direction in the x-y plane within +/- degrees of the forward direction

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Forward** | Vector | yes | \-  | The forward direction about which to generate |
| **Angle** | Float | no  | 180.00 | The maximum allow angle (in degrees) either side of the forward direction (allowed range 0 - 180) |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Direction** | Vector | yes | The random direction that is generated |

* * *

#### GenerateRandomDirectionOnPlane

Generate a random direction on a plane given a normal to the plane

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Normal** | Vector | yes | \-  | The plane normal |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Direction** | Vector | yes | The random direction that is generated |

* * *

#### GenerateRandomFloat

Generate a random float value from Min to Max, optionally scaled

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Min** | Float | yes | \-  | The minimum (inclusive) value to be generated |
| **Max** | Float | yes | \-  | The maximum (inclusive) value to be generated |
| **Scale** | Float | no  | 1.00 | Value to scale the randomly generated integer by, e.g. MinVal = 1.0, MaxVal = 4.0, Scale = 2.0: return value is a number from from 2.0 to 8.0 |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Float | yes | The random number that is generated |

* * *

#### GenerateRandomInt

Generate a random integer value from Min to Max, optionally scaled

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Min** | Integer | yes | \-  | The minimum (inclusive) value to be generated |
| **Max** | Integer | yes | \-  | The maximum (inclusive) value to be generated |
| **Scale** | Integer | no  | 1   | Value to scale the randomly generated integer by, e.g. MinVal = 1, MaxVal = 4, Scale = 2: return value is a number from from 2 to 8 |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Integer | yes | The random number that is generated |

* * *

#### GenerateRandomPosition

Generate a random position offsetting from reference pos, within the Min and Max constraints on each axis

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **MinX** | Float | no  | 0.00 | The minimum (inclusive) value to be generated on the X axis |
| **MaxX** | Float | no  | 0.00 | The maximum (inclusive) value to be generated on the X axis |
| **MinY** | Float | no  | 0.00 | The minimum (inclusive) value to be generated on the Y axis |
| **MaxY** | Float | no  | 0.00 | The maximum (inclusive) value to be generated on the Y axis |
| **MinZ** | Float | no  | 0.00 | The minimum (inclusive) value to be generated on the Z axis |
| **MaxZ** | Float | no  | 0.00 | The maximum (inclusive) value to be generated on the Z axis |
| **ReferencePos** | Position | yes | \-  | The position to generate the random offset from |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Position | yes | The random position that is generated |

* * *

#### GetArraySize

Get an Entity's sate tree and gain access to it's blackboards. \[WARNING\] Do not attempt to change values of a blackboard recieved by this node

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Array** | BlackboardArray | yes | \-  | Array to return size of |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **ArraySize** | Integer | yes | Size of the given array |

* * *

#### GetDirection

Get a normalized direction vector between two points, either of which can be specified as a KytPos or an entity ID

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Start** | EntityId, Position | yes | \-  | The first position or id |
| **End** | EntityId, Position | yes | \-  | The second position or id |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Result** | Vector | yes | A unit length vector |

* * *

#### GetEntityDirection

Get direction in world space of entity's specified local axis

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | The id of the entity |
| **Direction** | StringHash | yes | \-  | The name of the desired local direction |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **WorldDirection** | Vector | yes | Unit vector in the relevant direction in world space |

* * *

#### GetEntityPos

Get position of an entity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | The id of the entity |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Position** | Position | yes | The position of the entity |

* * *

#### GetEntityStateTree

Get an Entity's sate tree and gain access to it's blackboards. \[WARNING\] Do not attempt to change values of a blackboard recieved by this node

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | The ID of the Entity |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **StateTree** | Blackboard | yes | Returns the Entity State Tree giving access to it's blackboards |

* * *

#### GetEntityTargetBlackboard

Returns a pointer to entity's target blackboard. Fails if no blackboard exists

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | Id of entity to get blackboard from |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **TargetBB** | Blackboard | yes | Target blackboard to the input entity |

* * *

#### GetSignalParameter

Get the value of a signal parameter

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Signal** | Blackboard | yes | \-  | The signal to query |
| **ParameterName** | StringHash | yes | \-  | Name of the parameter to retrieve from the signal, this may be a path if the signal contains sub-blackboards |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Value** | Any | yes | Value contained by the parameter |

* * *

#### InitializeVariable

Create a behavior variable initialized to the default value

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | The variable name to create |
| **Type** | StringHash | yes | \-  | The type for the behavior variable |

**Outputs:** none

* * *

#### Log

Write a message to a log

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Message** | String | yes | \-  | The message to write to the log |
| **Level** | StringHash | no  | "Normal" | The severity of the message |

**Outputs:** none

* * *

#### Noop

Do nothing until interrupted

**Inputs:** none

**Outputs:** none

* * *

#### OverrideEntityPhysics

Override the physics aspect of an entity for a given frame

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | Entity to override |
| **Position** | Position | no  |     | Override the entity's position (Optional) |
| **Velocity** | Vector, Velocity | no  |     | Override the entity's velocity (Optional) |

**Outputs:** none

* * *

#### PersonalLog

Write a message to an entity's personal log

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Message** | String | yes | \-  | The message to write to the personal log |

**Outputs:** none

* * *

#### PopArrayValue

Pops last value from the end of an array

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Array** | BlackboardArray | yes | \-  | The array to pop a value from |
| **Method** | StringHash | no  | "Last" | Which value to pop from the array |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Value** | Any | yes | The value popped from the array |

* * *

#### PushArrayValue

Pops last value from the end of an array

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Array** | StringHash | yes | \-  | The array push value to |
| **Value** | Any | yes | \-  | The value to push into array |

**Outputs:** none

* * *

#### Raycast

Perform a raycast, succeeds if nothing is hit

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **From** | EntityId, Position | yes | \-  | Entity or position to raycast from |
| **To** | EntityId, Position | yes | \-  | Entity or position to raycast to |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **HitPos** | Position | no  | Hit position (only valid if node fails) |

* * *

#### ReleaseEntity

Release ownership of an object and add 'Available' tag

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **ObjectSlot** | StringHash | yes | \-  | Where on the entity ownership blackboard the object is stored |

**Outputs:** none

* * *

#### ReplaceTag

Replace one tag with another on an entity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **OldTag** | Tag | yes | \-  | The tag to remove |
| **NewTag** | Tag | yes | \-  | The tag to add |
| **EntityId** | EntityId | yes | \-  | The id of the entity on which to change the tags |

**Outputs:** none

* * *

#### SendResponseSignal

Send a response to a signal handled by the Behavior Tree

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Signal** | Blackboard | yes | \-  | The signal to respond to |
| **Result** | StringHash | yes | \-  | The result to return, e.g. Success or Failed |

**Outputs:** none

* * *

#### SendSignal

Send a signal

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | The name of the signal to send |
| **Target** | EntityId | no  |     | The ID of the entity to send the signal to (defaults to self) |
| **Key1** | StringHash | no  | ""  | Optional key for first data parameter on the signal |
| **Value1** | Any | no  |     | Optional value for first data parameter |
| **Key2** | StringHash | no  | ""  | Optional key for second data parameter on the signal |
| **Value2** | Any | no  |     | Optional value for second data parameter |

**Outputs:** none

* * *

#### SendSignalToGroup

Send a signal to all entities in a group

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | The name of the signal to send |
| **Category** | StringHash | yes | \-  | The category of the group to send the signal to |
| **Key1** | StringHash | no  | ""  | Optional key for first data parameter on the signal |
| **Value1** | Any | no  |     | Optional value for first data parameter |
| **Key2** | StringHash | no  | ""  | Optional key for second data parameter on the signal |
| **Value2** | Any | no  |     | Optional value for second data parameter |

**Outputs:** none

* * *

#### SetBranchTag

Remove all tags within a given branch and add new tag instead

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **BranchTag** | Tag | yes | \-  | The branch tag to prune |
| **Tag** | Tag | yes | \-  | The tag to add |
| **EntityId** | EntityId | yes | \-  | The id of the entity to alter tags |

**Outputs:** none

* * *

#### SetTimestampVariable

Set the value of a timestamp to now, create if it doesn't already exist

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Name of the timestamp variable to set to now |

**Outputs:** none

* * *

#### SetVariable

Sets a variable to a particular value

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | The variable name (or path) to write the value to |
| **Value** | Any | yes | \-  | Value to assign to the variable |

**Outputs:** none

* * *

#### Ship\_NavRaycast

Test if there is a straight navigable line between two positions

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **From** | EntityId, Position | yes | \-  | Entity or position to raycast from |
| **To** | EntityId, Position | yes | \-  | Entity or position to raycast to |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **HitPos** | Position | yes | Hit position (only valid if node fails) |

* * *

#### SmoothSpeedToTargetDist

Calculate speed based on distance from target, smoothing over frames for less abrupt changes

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Start** | EntityId, Position | no  |     | Optional position or id to calculate distance from, defaults to self |
| **End** | EntityId, Position | yes | \-  | The position or id to calculate distance to |
| **FarSpeed** | Float, StringHash | no  |     | Optional name of the speed or a speed value in m/s to use up to far distance, defaults to current speed |
| **FarDistance** | Float | yes | \-  | Distance at which to start interpolating speed towards CloseSpeed |
| **CloseSpeed** | Float, StringHash | no  |     | Optional name of the speed or a speed value in m/s to use within close distance, defaults to current speed |
| **CloseDistance** | Float | yes | \-  | Distance at which to finish interpolating speed towards CloseSpeed |
| **LowSpeedClamp** | Float, StringHash | no  | 0.00 | Optional name of the speed or a speed value in m/s below which not to go |
| **SmoothingDecayRate** | Float | no  | 0.10 | Smoothing decay, higher value is more smoothing, e.g. 0.1 is 90% towards target value in 1 second |
| **LastResult** | Float | yes | \-  | Speed calculated in last run, or initial speed value |
| **LastUpdate** | Timestamp | yes | \-  | Timestamp that node was last run, or use now for first run |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **SmoothedSpeed** | Float | yes | The calculated speed value |
| **UpdateTimestamp** | Timestamp | yes | The timestamp for this update (to pass back in next time) |

* * *

#### Success

Do nothing; return success on first update

**Inputs:** none

**Outputs:** none

* * *

#### Wait

Wait and do nothing for specified time

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **WaitTime** | Float | no  | 0.00 | Seconds to wait, zero seconds waits forever |

**Outputs:** none

* * *

#### WaitForSignal

Listen for a signal of a specified name and then keep copy of the signal

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | The name of the type of signals to listen for |
| **FilterKey1** | StringHash | no  | ""  | Optional filter to listen for only signals that contain this key |
| **FilterValue1** | Any | no  |     | Optional filter to listen for only signals that have this value in the FilterKey field |
| **FilterKey2** | StringHash | no  | ""  | Optional filter to listen for only signals that contain this key |
| **FilterValue2** | Any | no  |     | Optional filter to listen for only signals that have this value in the FilterKey field |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Signal** | Blackboard | no  | A copy of the signal received |

* * *

#### WaitRandom

Wait and do nothing for random time length between min and max specified values

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **MinWaitTime** | Float | yes | \-  | Min seconds to wait |
| **MaxWaitTime** | Float | yes | \-  | Max seconds to wait |

**Outputs:** none

* * *

### Groups

#### AddEntityToGroup

Add an entity to a group

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **GroupId** | EntityId | yes | \-  | Id of the group to add entity to |
| **EntityId** | EntityId | yes | \-  | Id of the entity to add |
| **IsLeader** | Boolean | no  | false | Is this node designated as leader of the group. If this entity dies then the group will be disbanded |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Count** | Integer | yes | Number of entities in the group after the entity is added |

* * *

#### CreateGroup

Create a new group entity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Type** | StringHash | yes | \-  | Type of the group |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **GroupId** | EntityId | yes | The id of the group entity that has been created |

* * *

#### EraseGroup

Erase an existing group entity

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | Id of the entity to erase |

**Outputs:** none

* * *

#### GetEntityInGroup

Get the nth Entity in a Group

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **GroupId** | EntityId | yes | \-  | The id of the group that the entity belongs to |
| **Index** | Integer | yes | \-  | 0 based index of entity to get from group |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **EntityId** | EntityId | yes | The id of the entity |

* * *

#### GetGroupCount

Get the count of entities in a group

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **GroupId** | EntityId | yes | \-  | Id of the group to add entity to |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Count** | Integer | yes | Number of entities in the group after the entity is added |

* * *

#### GetGroupFromEntity

Get the group that an entity belongs to

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | yes | \-  | The id of the entity to get the group for |
| **Type** | StringHash | yes | \-  | Type of the group to check membership of |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **GroupId** | EntityId | yes | The id of the group that the entity belongs to |

* * *

#### RemoveEntityFromGroup

Remove an entity from a group

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **GroupId** | EntityId | yes | \-  | Id of the group to add entity to |
| **EntityId** | EntityId | yes | \-  | Id of the entity to add |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Count** | Integer | yes | Number of entities in the group after the entity is removed |

* * *

### Exception handling

#### ThrowException

Throw an exception

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Type** | StringHash | yes | \-  | Type of exception to throw |

**Outputs:** none

* * *

### Debug

#### DD\_DrawLine

Draw a line between two points

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Point1** | EntityId, Position | yes | \-  | The first position or id |
| **Point2** | EntityId, Position | yes | \-  | The second position or id |
| **Color** | StringHash | no  | "White" | The color of the line |

**Outputs:** none

* * *

#### DD\_DrawSphere

Draw a sphere at point with radius

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Center** | EntityId, Position | yes | \-  | Position of center |
| **Radius** | Float | yes | \-  | Radius of sphere |
| **Color** | StringHash | no  | "White" | The color of the line |

**Outputs:** none

* * *

#### HDV2D\_DrawRandomPoints

Generate and render random points on the navmesh

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **NumPoints** | Integer | yes | \-  | The number of points to generate (maximum 10000) |
| **MinRadius** | Float | yes | \-  | The minimum distance points are allowed to be to the centre |
| **MaxRadius** | Float | yes | \-  | The maximum distance points are allowed to be to the centre |

**Outputs:** none

* * *

### SQS

#### SpatialQuerySimple

Run a SQS query with simplest setup

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Query** | StringHash | yes | \-  | Name of SQS query to process |
| **Origin** | EntityId, Position | yes | \-  | Entity or position for the query origin |
| **Reference** | EntityId, Position | no  |     | Entity or position for the query reference |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **SQSPoint** | Position | yes | Position of top point of query |
| **SQSPointId** | EntityId | no  | ID of top point of query |
| **SQSResult** | Blackboard | no  | Blackboard containing more data about result |

* * *

### State Machine

#### SendTransitionSignal

Send a signal to this entity to cause a state transition in a parent State Machine. This node throws an error if the state machine does not transition away from the current state after this node has sent the signal

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | The name of the transition signal |

**Outputs:** none

* * *

## Composite Nodes

Nodes with one or more children

### Basic

#### IfThenElse

Test a Lua condition on entry and if true executes its first child, if false executes second child, if present, otherwise fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Condition** | StringHash | yes | \-  | The Lua expression to be evaluated, must evaluate as a boolean (e.g. it could have multiple tests with ands and ors, for example) |

**Outputs:** none

* * *

#### ParallelUntilAllComplete

Runs all children at the same time all are complete. Returns fail if any failed

**Inputs:** none

**Outputs:** none

* * *

#### ParallelUntilAnyComplete

Runs all children at the same time until one completes

**Inputs:** none

**Outputs:** none

* * *

#### ParallelUntilFailure

Runs all children at the same time until one fails

**Inputs:** none

**Outputs:** none

* * *

#### Selector

Runs children one after another until one succeeds or they all fail

**Inputs:** none

**Outputs:** none

* * *

#### Sequence

Sequence of nodes that is run in succession. Stops and fails as soon as any child fails

**Inputs:** none

**Outputs:** none

* * *

### State Machine

#### StateMachine

A state machine with transitions controlled by signals. This node completes if a child state runs to completion

**Inputs:** none

**Outputs:** none

* * *

### Priority

#### Priority

Controls an ordered set of children each with a boolean condition as to whether to execute. Will continuously evaluate and execute first child with a true condition

**Inputs:** none

**Outputs:** none

* * *

## Decorator Nodes

Nodes with exactly one child

### Flow control

#### RepeatUntilFails

Keeps repeating the child node until it fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Iterations** | Integer | no  | 0   | Number of iterations to run (default infinite) |

**Outputs:** none

* * *

#### RepeatUntilSucceeds

Keeps repeating the child node until it succeeds

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Iterations** | Integer | no  | 0   | Number of iterations to run (default infinite) |

**Outputs:** none

* * *

#### Repeater

Keeps repeating the child node regardless of the outcome

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Iterations** | Integer | no  | 0   | Number of iterations to run (default infinite) |

**Outputs:** none

* * *

#### Timer

Runs child node for up to the specified amount of time

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **RunTime** | Float | yes | \-  | Seconds to run |
| **FailOnTimeout** | Boolean | no  | false | Whether the node should fail if the timer expires before the child node completes |

**Outputs:** none

* * *

### Return code manipulation

#### Failer

Always fails

**Inputs:** none

**Outputs:** none

* * *

#### Inverter

Reverse the return value of the child node

**Inputs:** none

**Outputs:** none

* * *

#### Succeeder

Always succeeds, unless there is an exception

**Inputs:** none

**Outputs:** none

* * *

### Exception handling

#### HandleException

Handle an exception by interrupting the tree and then failing or succeeding

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Result** | StringHash | no  | "Succeed" | What should the node return when it receives an exception |
| **Type** | StringHash | no  | ""  | Type of exception to handle, or unspecified to handle all exceptions |

**Outputs:** none

* * *

#### ThrowOnFail

Throw an exception if the child node fails

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Type** | StringHash | yes | \-  | Type of exception to throw |

**Outputs:** none

* * *

### Utility

#### CallSubtree

Call a registered pluggable BT subtree

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Label** | StringHash | yes | \-  | The name of the subtree to be called |

**Outputs:** none

* * *

#### ClearTimestampVariableOnExit

Clear the value of a timestamp on exit so that any greater or less than comparisons will always return false

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Name of the timestamp variable to clear |

**Outputs:** none

* * *

#### EraseVariableOnExit

Erase a variable when the child node finishes

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Variable name (or path) to erase |

**Outputs:** none

* * *

#### HandleRequestSignal

Manages the sending of signal responses when handling request signals such as task switches or scripted commands

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Signal** | Blackboard | yes | \-  | The signal being responded to |
| **ResponseOnSuccess** | StringHash | no  | "Success" | The response to return when subtree succeeds |
| **ResponseOnFail** | StringHash | no  | "Failed" | The response to return when subtree fails |
| **ResponseOnEnter** | StringHash | no  |     | The optional response to return when entering the subtree |

**Outputs:** none

* * *

#### IterateOverArray

Iterates over elements in an array, See also BTArrayBreak

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Array** | BlackboardArray | yes | \-  | Array to iterator over |
| **OnComplete** | StringHash | no  | "Succeed" | Return value to propogate on reaching end of array |

|     |     |     |     |
| --- | --- | --- | --- |
| Output | Type | Required | Description |
| **Element** | Any | yes | Array element currently iterating |

* * *

#### ReleaseEntityOnExit

Release ownership of a claimed entity on exit

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **ObjectSlot** | StringHash | yes | \-  | Where on the entity ownership blackboard is the object id stored |

**Outputs:** none

* * *

#### SetControlledEntity

Specifies which entity the behavior tree is being applied to. Still keeps the same behavior blackboard

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **EntityId** | EntityId | no  |     | The id of the entity to control (Optional, default current entity) |

**Outputs:** none

* * *

#### SetTimestampVariableOnExit

Set a timestamp variable to a current time on exit

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Name of the timestamp variable to set |

**Outputs:** none

* * *

#### SetVariableOnExit

Set a variable to a particular value when the child node finishes

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Name** | StringHash | yes | \-  | Variable name (or path) to set |
| **Value** | Any | yes | \-  | Value to assign to the variable |

**Outputs:** none

* * *

### Character movement

#### Character\_DisableAvoidanceForEntity

Switch of avoidance against a particular entity. Usually used for your target. Avoidance is re enabled when this node terminates

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Entity** | EntityId | yes | \-  | The entity to no longer avoid |

**Outputs:** none

* * *

#### OverrideObstacleScale

Temporarily changes the scale of the avoidance obstacle until the subtree finishes

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Scale** | Float | yes | \-  | The new scale to use |

**Outputs:** none

* * *

#### Ship\_DisableAvoidanceForEntity

Switch off avoidance against a particular entity. Usually used for your target. Avoidance is re enabled when this node terminates

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Entity** | EntityId | yes | \-  | The entity to no longer avoid |

**Outputs:** none

* * *

#### Ship\_ToggleAvoidance

Switch on or off avoidance. Avoidance is reset when this node terminates

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Input | Type | Required | Default | Description |
| **Avoidance Enabled** | Boolean | yes | \-  | Is avoidance enabled or disabled? |

**Outputs:** none

* * *
