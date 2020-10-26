# TPS Querying with C\+\+<a name="ai-tactical-point-cpp-interface"></a>

These C\+\+ interfaces allow you to use TPS from other C\+\+ code and within goalops\. Lua queries are translated through it\. 

There are two C\+\+ interfaces:
+ Internal \- For use only within the AI system
  + Uses a CTacticalPointQuery object to build queries
  + Allows you to create or adapt queries on the fly
  + Provides greater access to relevant AI system classes
+ External \- For use from any module
  + Suitable for crossing DLL boundaries
  + Simpler, not object\-oriented, just as powerful
  + Uses stored queries for efficiency

## Internal Interface Syntax<a name="ai-tactical-point-cpp-interface-codesample"></a>

In the example below, some parsing is obviously taking place here\. This is crucial to the generality of the system\.

```
// Check for shooter near cover using TPS
static const char *sQueryName = "CHitMiss::GetAccuracy";
ITacticalPointSystem *pTPS = gEnv->pAISystem->GetTacticalPointSystem();
int iQueryId = pTPS->GetQueryID( sQueryName );
if ( iQueryId == 0 )
{
    // Need to create query
    iQueryId = pTPS->CreateQueryID( sQueryName );
    pTPS->AddToGeneration( iQueryId, "hidespots_from_attentionTarget_around_puppet", 3.0f);
    pTPS->AddToWeights( iQueryId, "distance_from_puppet", -1.0f);
}
pTPS->Query( iQueryId, CastToIPuppetSafe( pShooter->GetAI() ),vHidePos, bIsValidHidePos );
```

## TPS Syntax Examples<a name="ai-tactical-point-cpp-interface-syntax-examples"></a>

The following examples and explanations illustrate the use of TPS query syntax\. For a more detailed discussion of the TPS query language, see the topic on TPS Query Language Syntax and Semantics\. 

**`option.AddToGeneration("hidespots_from_attTarget_around_puppet", 50.0)`**

This query request is expressed as generation criteria and specifies a float to represent distance\. The query is broken up into five words:
+ "hidespots" indicates that generated points should positioned behind known cover as is conventional
+ "from" and "around" are glue words to aid readability
+ "target" specifies the name of the object to hide from
+ "puppet" identifies a center location that points will be generated around 
+ The float value indicates the radial distance, measured from the center location, that defines the area within which points should be generated 

Note that no raycasts are performed at this stage\. We have here considerable flexibility, for example, how we choose to hide from a player: \(1\) somewhere near the player, \(2\) somewhere near us, or \(3\) somewhere near a friend\. We can also specify a completely different target to hide from, such as an imagined player position\. By providing flexibility at the point generation stage, we can support more powerful queries and allow users to focus computations in the right areas\.

**`option2.AddToConditions("visible_from_player",true)`**

This query request is expressed as condition criteria, so we can expect a Boolean result\. The query specifies points that are visible to the player, which is curious but perfectly valid\. The term "visible" specifies a ray test, with "player" specifying what object to raycast to from a generated point\.

**`option2.AddToConditions("max_coverDensity",3.0)`**

This query is expressed as a condition, so we can expect a Boolean result\. The term "Max" specifies that the resulting value must be compared to the given float value\-\-and be lower than\. The term "coverDensity" identifies this as a density query \(measuring the density of things like cover, friendly AI agents, etc\.\) and specifies measurement of covers\.

**`option1.AddToWeights("distance_from_puppet",-1.0)`**

This query is expressed as a weight component; the query result will be a value between zero and one \(normalized as required\)\. Boolean queries are allowed to indicate preference \(such as primary cover over secondary cover\), with return values of 0\.0 for false and 1\.0 for true\.

This query component indicates a preference for points at a certain location relative to an object\. The term "distance" identifies this as a distance query, with the given float values specifying the distance amount\. The term "puppet" identifies the object to measure the distance from\.