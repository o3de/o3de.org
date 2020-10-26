# TPS Querying with Lua<a name="ai-tactical-point-lua-interface"></a>

In Lua, there are two ways to use the TPS: 
+ Scriptbinds allow you to use TPS queries from a Lua behavior and have the results returned as a table without any side\-effects\. This can be useful for higher\-level environmental reasoning, such as: 
  + Choose behaviors based on suitability of the environment \(for example, only choose a "sneaker" behavior if there's lots of soft cover available\)\.
  + Run final, very specific tests on a short list of points, rather than adding a very obscure query to the TPS system\.
  + Enable greater environmental awareness \(for example, tell me three good hidespots nearby, so I can glance at them all before I hide\)\.
+ With goal pipes, you can use goalops to pick a point and go there, using a predefined TPS table: 
  + Use a "tacticalpos" goalop, which is equivalent to a previous "hide" goalop\.
  + Use fallback queries to avoid lists of branches in goalpipes\.
  + More flexible goalops can be provided to decouple queries from movement\.

Both methods define query specifications using the same table structure, as shown in the following example:

```
Hide_FindSoftNearby =
{
  -- Find nearest soft cover hidespot at distance 5-15 meters,
  -- biasing strongly towards cover density
  {
    Generation= {   hidespots_from_attentionTarget_around_puppet = 15 },
    Conditions= {   coverSoft = true,
            visible_from_player = false,
            max_distance_from_puppet = 15,
            min_distance_from_puppet = 5},
    Weights =   {   distance_from_puppet = -1.0,
    coverDensity = 2.0},
  },
  -- Or extend the range to 30 meters and just accept nearest
  {
    Generation ={   hidespots_from_attentionTarget_around_puppet = 30 },
    Weights =   {   distance_from_puppet = -1.0}
  }
}
AI.RegisterTacticalPointQuery( Hide_FindSoftNearby );
```

**Note**  
Registering a query returns a query ID that then refers to this stored query\.

**Querying with Scriptbind**  
The following script runs a query using an existing specification\. See comments in `Scriptbind_AI.h` for details\.

```
AI.GetTacticalPoints( entityId, tacPointSpec, pointsTable, nPoints )
```

**Querying with Goalops**  
The following script runs an existing query\. Because queries can have fallbacks built in, branching is usually unnecessary \(the branch tests are still supported\)\.

```
AI.PushGoal("tacticalpos",1, Hide_FindSoftNearby);
```