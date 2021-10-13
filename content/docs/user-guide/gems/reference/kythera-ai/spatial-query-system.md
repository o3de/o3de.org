---
linkTitle: Spatial Query System
title: Spatial Query System
description: Overview of the Kythera AI Spatial Query System
weight: 1000
toc: true
---

![Spatial queries as shown by debug draw](/images/user-guide/gems/kythera-ai/spatial-query-system.png)

Finding positions in a game world is a common requirement. Usually these are positions for agents to move to; there are many other purposes, including spawning and choosing points to attack. During development, the requirements for choosing these positions can become complex, making performance crucial. Kythera's Spatial Query System (SQS) is a powerful, general-purpose API for describing and efficiently processing these location-based queries.

            

When an agent needs to choose a position to move to, it can do so by executing a Spatial Query which will return the best position for a given set of criteria. The query itself is described in a specialized query language, comprising:

*   **Generators**, which produce a set of positions to consider
    
*   **Conditions**, which test each position and exclude inappropriate ones
    
*   **Scores**, which weight and rank the appropriate positions in order to find the best candidate
    

A query is constructed once, then executed any number of times by the Spatial Query System. The system handles queuing, time-slicing and asynchronous processing of multiple queries over a number of frames. When a query is completed, it uses the Kythera signal mechanism to communicate the result back to the original caller.

Spatial queries are specified in text files, which are parsed and interpreted at run-time. This allows rapid iteration, in particular for high-level agent-based queries, as the files can be reloaded while the game is running.
        

## Writing spatial queries

Each level in a game can include a file called `SpatialQueries.sqs` which defines a collection of Spatial Queries. Queries common to multiple levels can be placed in the global Scripts folder. Whenever a level is loaded, all queries are first unloaded and then the global queries are loaded in. The level-specific queries come next and will overwrite any global queries with the same name.

There is a console command, `kyt_ReloadSpatialQueries`, which will reload the queries in the file on-demand, allowing rapid iteration during development.
In addition to the queries written in C++ as shown above, queries can also be provided in a file. These files will be parsed by the Spatial Query System, and used to construct spatial queries. The syntax for these queries is the same as for C++ queries.


### Query structure

A spatial query consists of four blocks - `Generators`, `Conditions`, `Scores` and `Fallbacks`. When the query is executed:

*   The Generators are run in parallel (via time-slicing) and each returns one or more candidate positions or entities (such as cover points) as output
    
*   Once all Generators have completed, this set of candidate positions is passed through each Condition, in order, and any that fail are immediately dropped from further processing
    
*   Each remaining candidate position is now assigned a score by evaluating each Score criterion. These consist of a weight and a criterion that produces a score. Each criterion score is multiplied by its weight; the sum of all these values is the total score assigned to the position.
    
*   The candidate position with the highest score wins and is returned as the chosen position.
    
*   If no position passed all of the conditions, the query will use the Fallbacks in the order they are provided.
    

### Query syntax definition

Spatial query syntax has been designed to be intuitive and legible. The syntax of the query definition itself is given below in Backus–Naur Form.

```
<spatial-query>     ::= "{" <name-function> "," <generators-block> "," <conditions-block> "," <weights-block> "}"
<name-function>     ::= "Name(" <string> ")"

<generators-block>  ::= "Generators {" <generator-list> "}"
<generator-list>    ::= <generator> | <generator> "," <generator-list>
<generator>         ::= <function-name> "(" <generator-args> ")"
<generator-args>    ::= <args-list> | <named-args-list>

<conditions-block>  ::= "Conditions {" <condition-list> "}"
<condition-list>    ::= <condition> | <condition> "," <condition-list>
<condition>         ::= <function-name> "(" <condition-args> ")"
<condition-args>    ::= <args-list> | <condition-list>

<scores-block>      ::= "Scores {" <score-list> "}"
<score-list>        ::= <score> | <score> "," <score-list>
<score>             ::= "Weight(" <weight-multiplier> "," <condition> ")"
<weight-multiplier> ::= <float>

<args-list>         ::= <arg> | <arg> "," <args-list>
<named-args-list>   ::= <named-arg> | <named-arg> "," <named-args-list>
<named-arg>         ::= <argument-name> "(" <arg> ")"

Unspecified symbols:
  <arg>             Any C++ value that is a valid argument to the function
  <argument-name>   Any C++ symbol that the generator recognizes
  <float>           A C++ floating point number
```

### General concepts

*   `SpatialQueryConstruction` namespace
    
    *   The types referred to in this document are all declared within this namespace, so you'll either need a `using` declaration or to scope them appropriately.
        
*    Objects
    
    *   In several places, a query requires you to specify an object. This is used for things like the object around which to generate points, doing a raycast from and to specific objects, calculating distance to some object and so on. Possible values are:
        
        *   Querier: Refers to the agent running the query and is the default value.
            
        *   Target: Refers to the querier's current target entity. 
            
        *   Reference: If a reference object (entity or position) is provided to the query, this allows you to use it in a function. This is useful for taking additional information into account, such as finding cover near some reference point while avoiding line-of-sight to the target.
            
        *   Point: Refers to the current point under consideration while calculating conditions and weights, and is not valid in a generator.
            
*   Context
    
    *   A query has a general context object that is available to criteria as they execute. This is used to track progress through the query execution and provides access to general data such as the agent that requested the query.
        
    *   Each candidate position also has a context of its own, which is made directly available to the criteria as they process the position. The context tracks progress through condition and weight expressions and can be used to store data between updates.
        
*   Function structure
    
    *   All spatial query functions are given and must return an `EvaluationResult` object. This object tells the function whether it's running for the first time (in a given context), or again after having previously deferred. If it was deferred, any value returned from the previous execution is provided within this object.
        
    *   All parameters of a function are evaluated before running the function itself and the results are provided in the `EvaluationResult` object. This enables a function to assume that all parameter values are present and ready to use, even if individual parameters may defer their processing or rely on other functions in turn.
        
    *   One or two contexts are provided to the function, depending on the context. If it is a generator, it will be given the overall query context but the point context will be null. For all other functions, both contexts are provided.
        
*   `EvaluationResult`
    
    *   `Complete(value)`
        
        *   This indicates that the function has completed all processing and has a value to return.
            
    *   `Deferred(value)`
        
        *   If a function needs to wait for something else to complete first (usually due to asynchronous processing), it can defer to the next update.
            
        *   A value can be stored here to allow the function to continue where it left off. 
            
    *   `Failed`
        
        *   Indicates that there was no valid result to return.
            
        *   A generator can fail to produce any points, in which case it should return this result.
            
        *   This result is also used to indicate that the entire query failed to find a valid candidate point. This shouldn't be considered an error, though it might indicate that the level setup or query needs to be changed.
            
    *   `Error`
        
        *   This return type is for unexpected processing errors or invalid query construction that make the query invalid. As soon as any function returns an Error state, the query is aborted.
            

### Generators

A generator produces a list of positions (`KytPos`) or entities (`KytEntityId`), based on a set of parameters provided. If the generator produces entities (such as cover points) then each entity will implicitly provide a position via its `position` aspect. 

Here is a contrived example of a custom generator using the built-in Origin parameter and a custom function called MyNumber.

```
Generators {
    SimpleGenerator(
        Origin(Querier),
        MyNumber(1.0f)
    )
}
```

### Conditions

A condition criterion is a combination of functions that ultimately results in a boolean value. If the criterion returns true, the candidate position is passed to the next criterion (if there is one) or considered a valid position for the query. If false, the candidate position is immediately rejected and no further criteria are executed for it. 

Any combination of functions can be used, so long as the final result is a boolean.

Condition criteria are grouped into a block as follows:

```
Conditions {
    LessThan(Distance3D(Target), 5.0f),
    AnyOf {
        IsOnNavMesh(),
        HasLineOfSight(Target)
    }
}
```

Any function used in a criterion is able to defer its processing at any time. If a function defers, every parent function all the way up the hierarchy will defer as well. These breadcrumbs allow the Spatial Query System to continue the execution at the precise point that it left off the previous frame.

See the section on Creating Custom Functionality for examples of functions that do and don't defer.

### Scores

Scores are composed of the same set of function as conditions, but ultimately result in a float value. A score begins with a `Weight` function that specifies a multiplier and a function expression. The multiplier is typically 1 or -1 but there is no limit on the range, so that weights can be balanced, or one can be given clear priority with an order of magnitude higher value. If the function expression results in a boolean value, the final score value will be the multiplier (if true) or zero (if false). If the expression results in a float, the score is the product of that float and the multiplier. All score values are summed and assigned to the candidate point.

The candidate point with the highest value of summed scores will be taken as the winner and the corresponding position returned as the final result of the query.

Score criteria are grouped into a block as follows:

```
Scores {
    Weight(1.0f, Distance3D(Target)),
	Weight(-1.0f, Distance3D(Querier))
}

```

### Fallbacks

Fallback blocks offer alternative queries to try if the first does not find any result that meets all conditions. They will be tried one after the other until one succeeds. Each is a full, self-contained query in its own right - the syntax is just the same as the primary query and each is formed without reference to those before it.

Fallbacks can be used in two ways: to offer prioritized behavior, or to efficiently increase robustness.

Firstly, it may be the case that if the agent cannot find an appropriate position in one way, it should change tactics and try something very different. For example, if there is no way to flank, the agent might retreat instead. While it may be possible to combine this into a single query without fallbacks, that would result in more complex queries which take a long time to tune. Fallbacks are thus better development practice.

Second, you may be able to save significant processing overhead by querying for a cheaper common case and using fallbacks for edge cases. Typically the primary query might generate positions up to a smaller range where - given your level design rules - you would expect to find a suitable position. The fallback would expand that range significantly and may also relax some of the constraints. This gives you robust, graceful degradation in any areas that don't quite meet expectations, without making all of your requests more expensive.

### Spatial query file syntax

The simplest valid non-empty SQS file is as follows. It creates one named SpatialQuery but does nothing useful, so it will produce a Warning.

```
SpatialQuery {
	Name("GiveItAName"),
	Generators{
	},
	Conditions {
	},
	Scores {
	}
}
```

The syntax of a Spatial Query file is as follows:

```
// Use C++-style comments (not C-style comments)
SpatialQuery {
	Name("SampleQuery"),
	Generators {
		SimpleGenerator(SpatialQueryObject::Querier, 3.0f),						// Direct values approach
		SimpleGenerator(Origin(SpatialQueryObject::Querier), MyNumber(3.5))		// Named parameters approach
	},
	Conditions {
		AnyOf(
			HasTag("Kyt:Ownership:Available"),
			CurrentCover()
		)
	},
	Scores {
		Weight(-0.25f, Chance(0.5f)),
		Weight(1.0f, Distance3D(SpatialQueryObject::Querier))
	}
}

SpatialQuery
{
	Name("Second one"),
	Generators {},
	Conditions {},
	Scores {}
}

```

There are a few points to take note of here:

*   C++-style (`//`) comments can be used in the file, including at the end of a line of code
    
    *   C-style `/* */` comments are NOT supported
        
*   Each query is contained in a `SpatialQuery {}` block, and no semi-colons are used
    
*   The only `enum` that is accepted is `SpatialQueryObject`, which must be used in its fully qualified form
    
    *   Other enums will need to be provided as integers
        
*   In particular, the "Objects" Querier, Reference, Target, Point are enums and must be qualified, for example, `SpatialQueryObject::Querier`
    
*   General-purpose functions (`abs`, `floor,` etc) cannot be used at present

## Spatial query function listing

The following is a listing of all Spatial Query functions available.

### Generators  

#### `TagGenerator`

*   Generates a list of entities around the object, containing the specific tags, up to the given range. 
    
    *   Named parameters:
        
        *   `Range: (float) <= 0 for unlimited range`
            
        *   `Object: (SpatialQueryObject)`
            
        *   `Tag: (StringHash)`
            

#### `CoverPointGenerator`

*   Generates a list of cover points around the object, within the given range.
    
    *   Named parameters:
        
        *   `Range(float)`
            
        *   `Object(SpatialQueryObject)`
            

#### `FreeSpaceGenerator`

*   Generate a grid of points within a given range, spaced out with the given density.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### `FreeSpaceGenerator3D`

*   Generates a grid of points in a sphere around the object.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### `RandomPointGenerator`

*   Generates a number of 'randomly-positioned' points on the navigation mesh around the object, up to the given radius.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `NumPoints(int)`
            

#### `GridPointGenerator`

*   Generates a set of points on the navigation mesh in a grid pattern around the object, up to the given radius and at a given density.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### `RadialPointGenerator`

*   Generates a set of points on the navigation mesh in a radial pattern around the query's origin entity, up to the given radius and at a given density.  
    The Spokes parameter determines the radial pattern layout and by default is 1
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            
        *   `Spokes(int)`
            

#### `CoverRailGenerator`

*   Generates cover rails around the object, up to the given radius and at a given density. Only cover points that match one of the provided coves types are included.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `CoverType(StringHash)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### `SameCoverRailGenerator`

*   Generates cover points along the rail that the given object is occupying, limited by a given radius and using the given density.  
    Only cover points that match one of the provided are included.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `CoverType(StringHash)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### `CurrentCoverPointGenerator`

*   Returns the querier's current cover point.
    

#### `OctreeRandomNavigableGenerator`

*   Generates random points within a sphere, spherical shell, or cone which are navigable according to the octree
    
    *   Named parameters:
        
        *   Origin: Querier, Reference or Target
            
        *   MinRadius: float (default 3.0)
            
        *   MaxRadius: float (default 4.0)
            
        *   ShipRadius: float (default 0.0) special value -1.0 means "Use querier's radius"
            
        *   NumPoints: int (default 25) Number of points to try and return
            
        *   PathDistanceRatio: float (default 1.5) This times MaxRadius is used as maxPathDistance
            
        *   ConeAngle: float (default 0.0) Width of cone to limit results. 0.0 special value means whole sphere
            
        *   ConeDirection: Vec3 (default 0,0,0) Direction of centre of cone, if ConeAngle is non-zero
            
        *   AvoidDynamicObstacles: bool (default false)
            
        *   OpenAreasOnly: bool (default false) True can speed up results but skips points close to unnavigable regions
            
        *   PointRadius: float (default 0.0) Causes points too close to each other to be removed
            

#### `OctreeGridNavigableGenerator`

*   Generates points in a grid within a sphere, spherical shell, or a cone which are navigable according to the octree
    
    *   Named parameters:
        
        *   Origin: Querier, Reference or Target
            
        *   MinRadius: float (default 3.0)
            
        *   MaxRadius: float (default 4.0)
            
        *   ShipRadius: float (default 0.0) special value -1.0 means "Use querier's radius"
            
        *   Density: float (default 1.0) - spacing of grid
            
        *   PathDistanceRatio: float (default 1.5) This times MaxRadius is used as maxPathDistance
            
        *   ConeAngle: float (default 0.0) Width of cone to limit results. 0.0 special value means whole sphere
            
        *   ConeDirection: Vec3 (default 0,0,0) Direction of centre of cone, if ConeAngle is non-zero
            
        *   AvoidDynamicObstacles: bool (default false)
            
        *   OpenAreasOnly: bool (default false) True can speed up results but skips points close to unnavigable regions
            
        *   PointRadius: float (default 0.0) Causes points too close to each other to be removed
            

* * *

### Logical functions  

#### Direct logical operations

*   `LessThan(lhs, rhs)`
    
*   `LessThanOrEqualTo(lhs, rhs)`
    
*   `GreaterThan(lhs, rhs)`
    
*   `GreaterThanOrEqualTo(lhs, rhs)`
    
*   `Equal(lhs, rhs)`
    
*   `NotEqual(lhs, rhs)`
    
*   `Not(boolean)`
    

#### Grouped logical operations

*   `AllOf(expressions...)`
    
    *   Returns true if every expression is true. Will return early if any expression returns false.
        
*   `AnyOf(expressions...)`
    
    *   Returns true if any single expression returns true. Will return early if any expression returns true.
        
*   `NoneOf(expressions...)`
    
    *   Returns true if none of the expressions return true. Will return early if any expression returns true.
        

* * *

### Operation functions

#### **Weight(multiplier, function)**

*    The weight multiplier parameter must be either a float or a boolean. 
    

#### `Chance(probability)`

*   0 <= `probability` <= 1
    
    *   Returns true if a generated random number in the range of 0-1 is below the given probability value.
        

#### `HasTag(tag)`

*   Returns true if the current point has the given tag.
    

#### `Distance3D(object)`

*   Returns the 3D distance from a point to an object. 
    

#### **DistanceClosestWithRelationship(maxDistance, ESQSRelationship)**

*   Returns the 3D distance from a point to the closest entity with a specified relationship with Querier. 
    

#### `DistanceClosestFriendly(maxDistance)`

*   Returns the 3D distance from a point to the closest entity with a Friendly relationship with Querier. 
    

#### `DistanceClosestHostile(maxDistance)`

*   Returns the 3D distance from a point to the closest entity with a Hostile relationship with Querier. 
    

#### **IsWithinRangeWithRelationship(range, ESQSRelationship)**

*   Returns true if there is any entity within range with the given relationship.
    

#### `IsFriendlyWithinRange(range)`

*   Returns true if there is any friendly entity within range.
    

#### `IsHostileWithinRange(range)`

*   Returns true if there is any hostile entity within range.
    

#### **Raycast(object, desiredResult, sourceOffset, objectOffset)**

*   Performs physics raycast from point to object, with configurable offsets for both the start and endpoint.
    

#### `CanShootTargetHead`

*   Specialization of raycast. Performs raycast from point with offset at Querier eye level, to Target's eye level. Returns true if no hits.
    

#### `CanShootTargetTorso`

*   Specialization of raycast. Performs raycast from point with offset at Querier eye level, to Target's torso level. Returns true if no hits.
    

#### `EnemyLineOfSightBlocked`

*   Specialization of raycast. Performs raycast from point with offset at Querier's torso level, to Target's eye level. Returns true if any hits.
    

#### **IsCurrentlyOwnedBy(slotLabel, object)**

*   Returns true if the current cover point is owned by the given object.
    

#### `CanReachBeforeTarget`

*   Returns true if the distance from a point to Querier is less than the distance from the point to Target.
    

#### `EyeOffset(object)`

*   Returns the offset of the object's eye as a KytVec3.
    

#### `TorsoOffset(object)`

*   Returns the offset of the object's torso as a KytVec3.
    

#### **RelativeDirection(object, ERelativeDirection)**

*   Returns the relative direction (forward, backward, left, right, up, or down) of the object as a KytVec3.
    

#### `DirectionTo(object)`

*   Get a direction vector from the object to the candidate position.
    

#### `DirectionFrom(object)`

*   Get a direction vector from the candidate position to the object.
    

#### **DotProduct(vec1, vec2)**

*   Returns the dot product of the two vectors.
    

#### `Directness`

*   Returns the directness of a given point: (`distanceFromQuerierToTarget` - `distanceFromPointToTarget`) / `distanceFromQuerierToPoint`)
    

#### **NormaliseAndClamp(function, min, max)**

*   Normalises and clamps the float given by Function within the range of \[Min, Max\].
    
    *   Named parameters:
        
        *   function: float
            
        *   min: float
            
        *   max: float
            

#### `Absolute(function)`

*   Returns the absolute value of the result from the input function. 
    

#### `Heading`

*   Returns the cosine of the angle between the querier's forward direction and the direction to the current point.
    

#### `IsCoverOfType(coverType)`

*   Returns true if the current point has the given cover type.
    

#### **NavRaycast(object, desiredResult)**

*   Performs navmesh raycast from point to object. 
    

#### **OctreeRaycast(Object, DesiredResult, ShipRadius)**

*   Performs octree raycast from point to Object.
    

#### **NavDistance(object, maxPathDistance)**

*   Calculates the pathing distance between the current point and the given object. 
    

#### `OctreeSurfaceDistance(Object)`

*   Calculates the approximate distance between the current point and the nearest octree surface
    
    *   Octree parameter "MaxRadius" needs to be high for this to be useful some distance from octree surfaces
        
    *   Object parameter should be Querier (it is only used to obtain the octree)
        

#### **GetBlackboard\[\*\]**

*   Returns a value of specified type dependant on the function listed below, from the entity blackboard under the specified key.
    
    *   Named Parameters: 
        
        *    `Key (StringHash)`
            
    *   Available function types:
        
        *   _**GetBlackboardFloat**_(`Key`)
            
        *   _**GetBlackboardInt**(_`Key`)
            
        *   _**GetBlackboardBool**_(`Key`)
            
        *   _**GetBlackboardStringHash**_(`Key`)
            
        *   _**GetBlackboardPos**_(`Key`)
            
        *   _**GetBlackboardVec3**_(`Key`)

## Debugging spatial queries

### Debugging parser errors

When working with parsed Spatial Queries (either from a .sqs file in Lumberyard, or an SQS Asset in Unreal Engine), you may sometimes make errors when writing your queries. This can lead to errors that cause your spatial query to be unparseable, meaning that Kythera will not be able to use it.

In these situations, we output error logging to the Console:

![SQS errors logged to the console](/images/user-guide/gems/kythera-ai/sqs-console.png)

If you have modified your spatial query and it no longer runs, be sure to check here first.

### Visual debugging

Visual debugging of the spatial query system is available in Kythera. This is enabled on a per-entity basis from within the Kythera Inspector, by setting **Debugging**→**DebugDraw**→**SpatialQuery**→**Enable** to true for that entity:

![Visual debugging of spatial queries with the Kythera AI Inspector](/images/user-guide/gems/kythera-ai/sqs-visual-debugging)

(Note that global debug draw must also be enabled - either by using the **Enable Debug Draw** button in the Lumberyard Editor, or by setting console variable `kyt_DrawMaster` to 1.)

Once this is enabled, debug visualization will be drawn into your scene. 

![Debug draw of spatial queries](/images/user-guide/gems/kythera-ai/sqs-debug-visualization.png)

*   Points which fail a Condition are drawn as gray circles, and labelled with the name of the condition criterion that they failed.
    
    *   Note that the name printed is the name of the outermost function in a Condition block. Often you will see lots of points labelled with `LessThan`, which can make it hard to determine why a point was rejected! One way to clarify this is by using a Function Alias- the name of your Function Alias will be printed.
        
*   Points which pass all Conditions but do not have the highest calculated Score are drawn as red cylinders, with their height proportional to their Score. They are labelled with their Score.
    
*   The point which has the highest calculated Score is drawn as a green cylinder, and labelled with its Score

