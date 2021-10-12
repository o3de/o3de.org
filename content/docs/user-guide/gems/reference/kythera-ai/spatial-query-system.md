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

There are two ways to create a Spatial Query:

*   Directly in C++ using a Domain Specific Language
    
    *   This benefits from C++ type and syntax checking at compile time
        
*   Specified in text files
    
    *   The files are parsed and interpreted at run-time
        
    *   This allows rapid iteration, in particular for high-level agent-based queries, as the files can be reloaded while the game is running
        

## Writing spatial queries

### C++ or data-driven?

Spatial queries can be written in either C++ or a parsed, data-driven format. The two styles use the same underlying systems, use the same syntax, and should have the same functionality and runtime performance. In general, we recommend that users work with **data-driven** spatial queries- these allow for rapid in-editor iteration, as users can modify their query, reload it, and rerun a test scenario to see how it behaves, all without exiting the game and needing to recompile.

You may, however, want to use a C++ spatial query for one of the following reasons:

*   You might be working on a Kythera integration with your custom engine, and do not yet support data-driven queries.
    
*   You might want to use a Spatial Query as part of a C++ system, and do not want to have a dependency on a data asset, and do not want to add this specific query to the global registry. Working in C++ makes this use case easier.
    

In our examples below, we will first show C++ queries, as the examples are applicable cross-engine, and the principles for structuring your query are the same for data-driven queries.

### Query Structure

A query can be constructed and registered in C++ code as follows. It uses the `SimpleGenerator`, which is explained in the Generators section.

```
SpatialQueryPtr SampleQuery() 
{
	return SpatialQueryPtr(new SpatialQuery {
		Name("SampleQuery"),

		Generators {
			SimpleGenerator(
				Origin(Querier),
				MyNumber(1.0f)
			)
		},

		Conditions {
			LessThan(Distance3D(Target), 5.0f)
		},

		Scores {
			Weight(1.0f, Distance3D(Target))
		},

		Fallbacks {
			new SpatialQuery {
				Name("SampleFallback"),
				Generators {},
				Conditions {},
				Scores {}
			}
		}
	});
}

REGISTER_QUERY(SampleQuery);
```

The query contains a name and four blocks - `Generators`, `Conditions`, `Scores` and `Fallbacks`. When the query is executed:

*   The Generators are run in parallel (via time-slicing) and each returns one or more candidate positions or entities (such as cover points) as output
    
*   Once all Generators have completed, this set of candidate positions is passed through each Condition, in order, and any that fail are immediately dropped from further processing
    
*   Each remaining candidate position is now assigned a score by evaluating each Score criterion. These consist of a weight and a criterion that produces a score. Each criterion score is multiplied by its weight; the sum of all these values is the total score assigned to the position.
    
*   The candidate position with the highest score wins and is returned as the chosen position.
    
*   If no position passed all of the conditions, the query will use the Fallbacks in the order they are provided.
    

### Query Syntax Definition

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

### General Concepts

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

Here is a contrived example of a custom generator using the built-in Origin parameter and a custom function called MyNumber. (To learn about how to write your own custom Spatial Query Functions, see [https://kythera.atlassian.net/wiki/pages/resumedraft.action?draftId=1664679944](https://kythera.atlassian.net/wiki/pages/resumedraft.action?draftId=1664679944) .)

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

See the [https://kythera.atlassian.net/wiki/pages/resumedraft.action?draftId=1664679944](https://kythera.atlassian.net/wiki/pages/resumedraft.action?draftId=1664679944) for examples of functions that do and don't defer.

### Fallbacks

Fallback blocks offer alternative queries to try if the first does not find any result that meets all conditions. They will be tried one after the other until one succeeds. Each is a full, self-contained query in its own right - the syntax is just the same as the primary query and each is formed without reference to those before it.

Fallbacks can be used in two ways: to offer prioritized behavior, or to efficiently increase robustness.

Firstly, it may be the case that if the agent cannot find an appropriate position in one way, it should change tactics and try something very different. For example, if there is no way to flank, the agent might retreat instead. While it may be possible to combine this into a single query without fallbacks, that would result in more complex queries which take a long time to tune. Fallbacks are thus better development practice.

Second, you may be able to save significant processing overhead by querying for a cheaper common case and using fallbacks for edge cases. Typically the primary query might generate positions up to a smaller range where - given your level design rules - you would expect to find a suitable position. The fallback would expand that range significantly and may also relax some of the constraints. This gives you robust, graceful degradation in any areas that don't quite meet expectations, without making all of your requests more expensive.

### Data Driven Spatial Queries

_This page documents engine-agnostic details of data driven spatial queries. See_ [Spatial Query System (Lumberyard)](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/1664745521) _or_ [Spatial Query System (UE4)](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/1349910533) _for engine-specific workflows_

In addition to the queries written in C++ as shown above, queries can also be provided in a file. These files will be parsed by the Spatial Query System, and used to construct spatial queries. The syntax for these queries is the same as for C++ queries.

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

The syntax of a Spatial Query File is as follows:

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

*   C++-style `//` comments can be used in the file, including at the end of a line
    
    *   C-style /\* \*/ comments are NOT supported
        
*   Each query is contained in a `SpatialQuery {}` block, and no semi-colons are used
    
*   The only enum that is accepted is `SpatialQueryObject`, which must be used in its fully qualified form
    
    *   Other enums will need to be provided as integers (for now)
        
*   In particular, the "Objects" Querier, Reference, Target, Point are enums and must be qualified, for example, SpatialQueryObject::Querier
    
*   General-purpose functions like `abs`, `floor,` etc cannot be used (for now)

## Spatial query function listing

The following is a listing of all Spatial Query functions available.

### Generators  

#### **TagGenerator**

*   Generates a list of entities around the object, containing the specific tags, up to the given range. 
    
    *   Named parameters:
        
        *   `Range: (float) <= 0 for unlimited range`
            
        *   `Object: (SpatialQueryObject)`
            
        *   `Tag: (StringHash)`
            

#### **CoverPointGenerator**

*   Generates a list of cover points around the object, within the given range.
    
    *   Named parameters:
        
        *   `Range(float)`
            
        *   `Object(SpatialQueryObject)`
            

#### **FreeSpaceGenerator**

*   Generate a grid of points within a given range, spaced out with the given density.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### **FreeSpaceGenerator3D**

*   Generates a grid of points in a sphere around the object.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### **RandomPointGenerator**

*   Generates a number of 'randomly-positioned' points on the navigation mesh around the object, up to the given radius.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `NumPoints(int)`
            

#### **GridPointGenerator**

*   Generates a set of points on the navigation mesh in a grid pattern around the object, up to the given radius and at a given density.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### **RadialPointGenerator**

*   Generates a set of points on the navigation mesh in a radial pattern around the query's origin entity, up to the given radius and at a given density.  
    The Spokes parameter determines the radial pattern layout and by default is 1
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            
        *   `Spokes(int)`
            

#### **CoverRailGenerator**

*   Generates cover rails around the object, up to the given radius and at a given density. Only cover points that match one of the provided coves types are included.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `CoverType(StringHash)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### **SameCoverRailGenerator**

*   Generates cover points along the rail that the given object is occupying, limited by a given radius and using the given density.  
    Only cover points that match one of the provided are included.
    
    *   Named parameters:
        
        *   `Origin(SpatialQueryObject)`
            
        *   `CoverType(StringHash)`
            
        *   `Radius(float)`
            
        *   `Density(float)`
            

#### **CurrentCoverPointGenerator**

*   Returns the querier's current cover point.
    

#### **OctreeRandomNavigableGenerator**

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
            

#### **OctreeGridNavigableGenerator**

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

#### **Direct logical operations**

*   `LessThan(lhs, rhs)`
    
*   `LessThanOrEqualTo(lhs, rhs)`
    
*   `GreaterThan(lhs, rhs)`
    
*   `GreaterThanOrEqualTo(lhs, rhs)`
    
*   `Equal(lhs, rhs)`
    
*   `NotEqual(lhs, rhs)`
    
*   `Not(boolean)`
    

#### **Grouped logical operations**

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
    

#### **Chance(probability)**

*   0 <= `probability` <= 1
    
    *   Returns true if a generated random number in the range of 0-1 is below the given probability value.
        

#### **HasTag(tag)**

*   Returns true if the current point has the given tag.
    

#### **Distance3D(object)**

*   Returns the 3D distance from a point to an object. 
    

#### **DistanceClosestWithRelationship(maxDistance, ESQSRelationship)**

*   Returns the 3D distance from a point to the closest entity with a specified relationship with Querier. 
    

#### **DistanceClosestFriendly(maxDistance)**

*   Returns the 3D distance from a point to the closest entity with a Friendly relationship with Querier. 
    

#### **DistanceClosestHostile(maxDistance)**

*   Returns the 3D distance from a point to the closest entity with a Hostile relationship with Querier. 
    

#### **IsWithinRangeWithRelationship(range, ESQSRelationship)**

*   Returns true if there is any entity within range with the given relationship.
    

#### **IsFriendlyWithinRange(range)**

*   Returns true if there is any friendly entity within range.
    

#### **IsHostileWithinRange(range)**

*   Returns true if there is any hostile entity within range.
    

#### **Raycast(object, desiredResult, sourceOffset, objectOffset)**

*   Performs physics raycast from point to object, with configurable offsets for both the start and endpoint.
    

#### **CanShootTargetHead**

*   Specialization of raycast. Performs raycast from point with offset at Querier eye level, to Target's eye level. Returns true if no hits.
    

#### **CanShootTargetTorso**

*   Specialization of raycast. Performs raycast from point with offset at Querier eye level, to Target's torso level. Returns true if no hits.
    

#### **EnemyLineOfSightBlocked**

*   Specialization of raycast. Performs raycast from point with offset at Querier's torso level, to Target's eye level. Returns true if any hits.
    

#### **IsCurrentlyOwnedBy(slotLabel, object)**

*   Returns true if the current cover point is owned by the given object.
    

#### **CanReachBeforeTarget**

*   Returns true if the distance from a point to Querier is less than the distance from the point to Target.
    

#### **EyeOffset(object)**

*   Returns the offset of the object's eye as a KytVec3.
    

#### **TorsoOffset(object)**

*   Returns the offset of the object's torso as a KytVec3.
    

#### **RelativeDirection(object, ERelativeDirection)**

*   Returns the relative direction (forward, backward, left, right, up, or down) of the object as a KytVec3.
    

#### **DirectionTo(object)**

*   Get a direction vector from the object to the candidate position.
    

#### **DirectionFrom(object)**

*   Get a direction vector from the candidate position to the object.
    

#### **DotProduct(vec1, vec2)**

*   Returns the dot product of the two vectors.
    

#### **Directness**

*   Returns the directness of a given point: (`distanceFromQuerierToTarget` - `distanceFromPointToTarget`) / `distanceFromQuerierToPoint`)
    

#### **NormaliseAndClamp(function, min, max)**

*   Normalises and clamps the float given by Function within the range of \[Min, Max\].
    
    *   Named parameters:
        
        *   function: float
            
        *   min: float
            
        *   max: float
            

#### **Absolute(function)**

*   Returns the absolute value of the result from the input function. 
    

#### **Heading**

*   Returns the cosine of the angle between the querier's forward direction and the direction to the current point.
    

#### **IsCoverOfType(coverType)**

*   Returns true if the current point has the given cover type.
    

#### **NavRaycast(object, desiredResult)**

*   Performs navmesh raycast from point to object. 
    

#### **OctreeRaycast(Object, DesiredResult, ShipRadius)**

*   Performs octree raycast from point to Object.
    

#### **NavDistance(object, maxPathDistance)**

*   Calculates the pathing distance between the current point and the given object. 
    

#### **OctreeSurfaceDistance(Object)**

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

### Debugging Parser Errors

When working with parsed Spatial Queries (either from a .sqs file in Lumberyard, or an SQS Asset in Unreal Engine), you may sometimes make errors when writing your queries. This can lead to errors that cause your spatial query to be unparseable, meaning that Kythera will not be able to use it.

In these situations, we output error logging to the Console:

![SQS errors logged to the console](/images/user-guide/gems/kythera-ai/sqs-console.png)

If you have modified your spatial query and it no longer runs, be sure to check here first.

### Visual Debugging

Visual debugging of the spatial query system is available in Kythera. This is enabled on a per-entity basis from within the Kythera Inspector, by setting **Debugging**→**DebugDraw**→**SpatialQuery**→**Enable** to true for that entity:

![Visual debugging of spatial queries with the Kythera AI Inspector](/images/user-guide/gems/kythera-ai/sqs-visual-debugging)

(Note that global debug draw must also be enabled - either by using the **Enable Debug Draw** button in the Lumberyard Editor, or by setting console variable `kyt_DrawMaster` to 1.)

Once this is enabled, debug visualization will be drawn into your scene. 

![Debug draw of spatial queries](/images/user-guide/gems/kythera-ai/sqs-debug-visualization.png)

*   Points which fail a Condition are drawn as gray circles, and labelled with the name of the condition criterion that they failed.
    
    *   Note that the name printed is the name of the outermost function in a Condition block. Often you will see lots of points labelled with `LessThan`, which can make it hard to determine why a point was rejected! One way to clarify this is by using a Function Alias- the name of your Function Alias will be printed.
        
*   Points which pass all Conditions but do not have the highest calculated Score are drawn as red cylinders, with their height proportional to their Score. They are labelled with their Score.
    
*   The point which has the highest calculated Score is drawn as a green cylinder, and labelled with its Score

## Extending the spatial query system

Kythera provides a fairly comprehensive set of out-of-the-box generators and functions that you can use to construct your queries, but we cannot foresee the requirements of every game. The Spatial Query System has been designed to be user extensible, so that game-specific functionality can be added to the system by creating new Spatial Query Functions in [Userspace](http://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/180387900/High+Level+Structure). These custom functions can have access into your game’s systems, while also being treated as first-class citizens of the Spatial Query System- by [registering your function](#RegisteringSpatialQueryFunctions), you make it available for use in all spatial queries.

**Note:** all function objects that will participate in Spatial Queries must have a name terminating in "Function", as demonstrated in the examples below. This convention is required for the registration macros to function correctly.

### Example custom generator

Here is the implementation of a simple generator, producing a single point based on the value of MyNumber and returning immediately. The implementation of the custom named parameter is also shown.

```
CREATE_NAMED_PARAMETER("MyNumber", float);

struct SimpleGeneratorFunction : public ISpatialQueryGenerator {

	PARAMETERS("Origin", "MyNumber");

    EvaluationResult Evaluate(ISpatialQueryContext* pContext, ISpatialQueryPointContext* pPointContext, EvaluationResult&& result) override
    {
		// Parameters are accessed via a set of helper methods
		SpatialQueryObject origin = result.GetSpatialQueryObject("Origin");
		// All result.GetXXX() functions allow you to specify a default value as the second argument
        float number = result.GetFloat("NyNumber", 0.0f);

		// Generate a point
        KytDynArray<KytPos> points;
        points.Add(KytPos(number, number, number, WorldCoordsAssumed));

		// Store the generated points into the query context
        pContext->AddGeneratedPoints(points);

		// Indicate that we are done with generation
        return EvaluationResult::Completed();
    }
};
```

The parameters to the function are specified via the PARAMETERS macro which takes a sequence of strings representing the parameter names. The order of the parameters in this macro determines the expected order of arguments when calling the function. There are two ways to call a function in a Spatial Query:

1.  Provide values directly
    
    1.  Values are mapped directly to the parameter names in the order they are provided. If too few values are provided, the remaining parameters will assume default values. Providing too many will issue a warning to the console but cause no harm.
        
    2.  This approach is good for functions that have a simple signature and whose purpose and meaning are self-explanatory. For this reason, this is the preferred approach for condition and score functions but not for generators.
        
2.  Use the "named parameters" approach
    
    1.  Each parameter is provided by name, providing high legibility and the ability to specify them in any order. Any omitted parameters will assume default values. Attempting to set a parameter that was not listed in the PARAMETERS macro will result in a warning to the console but cause no harm.
        
    2.  Named parameters are themselves classes and must be created using the CREATE\_NAMED\_PARAMETER macro, as shown above for MyNumber.
        
    3.  This approach is more verbose and self-documenting than using direct values, so consider using it in cases where a function has a complex signature and/or many options to pass in.
        

Here are some examples of calling the above-defined generator, `SimpleGenerator`, using the direct values approach:

```
SimpleGenerator(Querier, 5.0f)		// Good
SimpleGenerator(5.0f, Querier)		// Bad - will compile but the query will issue warnings about type mismatches
SimpleGenerator()					// Good - both parameters will take default values, named Origin=Querier and MyNumber=0.0f
```

And some examples using the named parameters approach:

```
SimpleGenerator(Origin(Querier), MyNumber(3.0f))	// Good
SimpleGenerator(MyNumber(3.0f), Origin(Querier))	// Good
SimpleGenerator(Origin(Querier))					// Good - MyNumber will have the default float value of 0.0f
SimpleGenerator(Invalid(5))							// Bad - unknown parameter supplied
```

Parameter values can accessed via a set of helper methods on the passed-in `EvaluationResult` object, each of which takes a name and (optionally) a default value.

```
bool EvaluationResult::GetBool(name, default = false);
int32 EvaluationResult::GetInt(name, default = 0);
uint32 EvaluationResult::GetUint(name, default = 0);
size_t EvaluationResult::GetSizeT(name, default = 0);
float EvaluationResult::GetFloat(name, default = 0.0f);
SpatialQueryObject EvaluationResult::GetSpatialQueryObject(name, default = SpatialQueryObject::Querier);
StringHash EvaluationResult::GetStringHash(name, default = "");
SpatialQueryStruct::SQSPoint EvaluationResult::GetPoint(name, default = default(SpatialQueryStruct::SQSPoint));
KytPos EvaluationResult::GetPos(name, default = (0, 0, 0));
KytRelVec3 EvaluationResult::GetVec3(name, default = (0, 0, 0));
```

Here `pContext` is a pointer to the query context, providing information that the generator may need and a function for the generator to supply its points. A generator is allowed to defer its processing if it is unable to produce the entire list of positions immediately. It indicates this by returning the following result, optionally providing a value to refer to in the next update cycle. It is important to return the incoming `result` parameter in this way as this will preserve the function parameter values for the iteration.

```
return result.Defer(optionalValue);
```

If the generator failed to produce any points, return like this:

```
return EvaluationResult::Failed();
```

The `SimpleGeneratorFunction` generator would be registered inside the CPP file like this:

```
REGISTER_SQS_FUNCTION(SimpleGenerator);
```

In the header file, you need to use the following macro to enable the generator to be used within queries:

```
CREATE_SQS_FUNCTION(SimpleGenerator);
```

### Example function without deferral

A custom function that returns a float without deferral can be created as follows. The example used here is the `Distance3D` function supplied by Kythera.

```
struct Distance3DFunction : public FloatFunction
{
	PARAMETERS("Object");

protected:
	EvaluationResult DoEvaluate(ISpatialQueryContext* pContext, ISpatialQueryPointContext* pPointContext, EvaluationResult&& result) override
	{
		// This function is only valid when run for a candidate point, not in a generator, so assert that we have a PointContext
		KYT_assert(pPointContext && "A point context is required by this function");

		// Get the position to calculate the distance to - this depends on the value of the "Object" parameter
		KytPos position;
		if (!GetObjectPosition(position, "Object", pContext, result))
			return EvaluationResult::Error();
		
		// Calculate the distance using the candidate point position
		float distance = pPointContext->GetPos().Distance(position);

		// Return the result and indicate completion
		return EvaluationResult::Completed(distance);	
	}
};
```

### Example function with deferral

A custom function that returns a boolean value after deferring and passing some data to its future execution can be created as follows. This is a contrived example to demonstrate deferral with a value being passed to the future execution.

```
struct IsIt3Function : public BooleanFunction
{
	PARAMETERS("Number");

protected:
	EvaluationResult DoEvaluate(ISpatialQueryContext* pContext, ISpatialQueryPointContext* pPointContext, EvaluationResult&& result) override
	{
		if (result.IsDeferred())
		{
			bool isIt3 = (result.GetInt("Number") == result.intResult);
			return EvaluationResult::Completed(isIt3);
		}
		else
		{
			return EvaluationResult::Deferred(3);
		}
	}
};
```

In addition to the `EvaluationResult::intResult` shown above, other result types can be obtained as follows:

*   `EvaluationResult::boolResult`
    
*   `EvaluationResult::intResult`
    
*   `EvaluationResult::uintResult`
    
*   `EvaluationResult::sizeTResult`
    
*   `EvaluationResult::floatResult`
    
*   `EvaluationResult::spatialQueryObjectResult`
    
*   `EvaluationResult::stringHashResult`
    
*   `EvaluationResult:: pointResult`
    
*   `EvaluationResult::vec3Result`
    
*   `If a Kythera ID type was stored (e.g. EntityId), it can be retrieved using the function EvaluationResult::GetId()`
    

### Registering custom functions

In all cases, custom generators and functions must be registered with the Spatial Query System and made available for use in queries by using the two macros shown below, respectively:

```
// Register function, typically done in the CPP file.
REGISTER_SQS_FUNCTION(IsIt3Function);

// Expose the function to queries, typically done in the header file.
CREATE_SQS_FUNCTION(IsIt3Function);
```

### SQS Function Aliases

![SQS function aliases shown in debug draw](/images/user-guide/gems/kythera-ai/sqs-function-aliases.png)

An SQS Function Alias is a custom SQS function that is defined from an aggregation of other existing SQS functions.

Turning a common chunk of SQS logic into an SQS function alias has a couple of advantages:

*   It can simplify and clarify queries, by replacing a large block of nested functions with a single readable statement 
    
*   The name of an alias function will be used by the SQS debug draw, which can make it easier to debug which condition is causing a point to be rejected
    

SQS Function Aliases can currently only be created from C++, but they can be used from either C++ or data-defined queries- they behave like any other Spatial Query Function. They are created by using the `CREATE_SQS_FUNCTION_ALIAS` macro. This example defines a simple function that checks whether a cover point is oriented towards the querier’s target:

```
	CREATE_SQS_FUNCTION_ALIAS(CoverConeOriented, GreaterThan(DotProduct(RelativeDirection(Point, eForward), DirectionTo(Target)), cosf(0.785f)));
	REGISTER_SQS_FUNCTION(CoverConeOriented);
```

