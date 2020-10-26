# TPS Query Language Reference<a name="ai-tactical-point-query-language"></a>

There are ways to define a query in both C\+\+ and Lua \(and potentially in XML\), but the same core syntax is used\. This page formally defines the TPS query language, with query components expressed in Generation, Conditions or Weights, and defines and discusses the query language semantics\. 

## Query Syntax<a name="ai-tactical-point-query-syntax"></a>

**Note**  
Non\-terminal symbols are in bold\. Not all of the symbols are implemented, but are shown for illustration\.

```
Generator ::= GenerationQuery '_' 'around' '_' Object
Condition ::= BoolQuery | (Limit '_' RealQuery)
Weight    ::= BoolQuery | (Limit '_' RealQuery) | RealQuery
GenerationQuery ::= ( 'hidespots' '_' Glue '_' Object)
                      | 'grid' | 'indoor'
BoolQuery ::= BoolProperty | (Test '_' Glue '_' Object)
BoolProperty ::= 'coverSoft' | 'coverSuperior' | 'coverInferior' | 'currentlyUsedObject' | 'crossesLineOfFire'
Test ::= 'visible' | 'towards' | 'canReachBefore' | 'reachable'
RealQuery = ::= RealProperty | (Measure '_' Glue '_' Object)
RealProperty ::= 'coverRadius' | 'cameraVisibility' | 'cameraCenter'
Measure ::= 'distance' | 'changeInDistance' | 'distanceInDirection' | 'distanceLeft' | 'directness' | 'dot' | 'objectsDot' | 'hostilesDistance'
Glue ::= 'from' | 'to' | 'at' | 'the'
Limit ::= 'min' | 'max'
Object ::= 'puppet' | 'attentionTarget' | 'referencePoint' | 'player'
        | 'currentFormationRef' | 'leader' | 'lastOp'
```

## Query Semantics<a name="ai-tactical-point-query-semantics"></a>

**Note**  
"Tunable" denotes that the exact values used should be possible to tweak/tune later\.
"Real" means that it returns a float value \(rather than a boolean\)\.

### Objects<a name="ai-tactical-point-query-objects"></a>

**puppet**  
AI agent making a query

**attentionTarget**  
Object that is the target of the AI agent's attention 

**referencePoint**  
AI agent's point of reference, perspective

**player**  
Human player \(chiefly useful for debugging and quick hacks\)

### Glue<a name="ai-tactical-point-query-glue"></a>

**from \| to \| at \| the**  
Glue words used for readability in a query statement\. Each query must have a glue word, but it has not active function and the parser doesn't distinguish between them\. Readability is encouraged to aid in debugging and long\-term maintenance\. 

### Generation<a name="ai-tactical-point-query-generation"></a>

**Hidespot**  
Individual point just behind a potential cover object with respect to a "from" object \(as in "hide from object"\)\. There is typically one point per cover object\. Use of this symbol should generate multiple points behind large cover objects and cope with irregularly shaped and dynamic objects\.

**Around**  
A glue word with special meaning\. This word should be followed by the name of an object around which to center the generation radius\.

### Conditions/Weight Properties \(use no object\)<a name="ai-tactical-point-query-conditions1"></a>

These properties relate to a specified point:

**coverSoft**  
Boolean property, value is true if the specified point is a hidespot using soft cover\.

**coverSuperior**  
Boolean property, value is true if the specified point is a hidespot using superior cover\.

**coverInferior**  
Boolean property, value is true if the specified point is a hidespot using inferior cover\.

**currentlyUsedObject**  
Boolean property, value is true if the specified point is related to an object the puppet is already using \(such as the puppet's current hide object\)\.

**coverRadius**  
Real \(float\) property, representing the approximate radius of the cover object associated with the specified point, if any, or 0\.0 otherwise\. When used for condition tests, returns an absolute value in meters\. When used as a weight, returns a normalized value, mapping the range \[0\.0\-5\.0m\] to \[0\.0\-1\.0\]\. \(Tunable\)

**coverDensity**  
Real property, representing the number of potential hidespots that are close by to the specified point\. When used for condition tests, returns an absolute value representing an estimate of the number of hidespots per square meter using a 5m radius sample\. When used as a weight, returns a normalized value, mapping the range \(0\.0\-1\.0\) to \[0\.0\-1\.0\] \(hidespots per square meter\)\. \(Tunable\)

### Conditions/Weight Test/Measures \(require object\)<a name="ai-tactical-point-query-conditions2"></a>

These properties relate to a specified object, such as distance\_to\_attentionTarget or visible\_from\_referencePoint\.

**distance**  
Real \(float\) measure, representing the straight\-line distance from a point to the specified object\. When used for condition tests, returns an absolute value in meters\. When used as a weight, returns a normalized value, mapping the range \[0\.0\-50\.0m\] to \[0\.0\-1\.0\]\. \(tunable\)

**changeInDistance**  
Real \(float\) measure representing how much closer the puppet will be to the specified object if it moves to a certain point\. Takes the distance to the specified object from the current location and subtracts it from the distance to the object from the proposed new location\. When used for condition tests, returns an absolute value in meters\. When used as a weight, returns a normalized value, mapping the range \[0\.0\-50\.0m\] to \[0\.0\-1\.0\]\. \(tunable\)

**distanceInDirection**  
Real \(float\) measure representing the distance of the point in the direction of the specified object\. Takes the dot product of the vector from the puppet to the point and the normalized vector from the puppet to the object\. When used for tests, returns an absolute value in meters\. When used as a weight, returns a normalized value, mapping the range \[0\.0\-50\.0m\] to \[0\.0\-1\.0\]\. \(tunable\)

**directness**  
Real \(float\) measure representing the degree to which a move to a certain point approaches the specified object\. Takes the difference in distance to the object \(changeInDistance\) and divides it by the distance from the puppet to the point\. Always uses the range \[\-1\.0 to 1\.0\], where 1\.0 is a perfectly direct course and negative values indicate movement further away from the object\.

### Limits<a name="ai-tactical-point-query-limits"></a>

**min \| max**  
Limits can be used to test a real value in order to product a Boolean\. Useful for conditions that can also be used as coarse Weights; for example, the condition MAX\_DISTANCE = 10 can be used to express that a distance of less than 10 is preferable, but without favoring nearer points in a more general way\.

## Failing Queries<a name="ai-tactical-point-query-failing"></a>

There are a few different ways queries can fail, and it's important to understand how each case is handled\.
+ **No points matched the conditions of the query\. **This is a valid result, not a failure; the AI can move to fallback queries or try a different behavior\.
+ **The query does not make sense in the context of an individual point\. **Sometimes a query doesn't make sense for a certain point or at a certain time\. In this case, the query tries to return the "least surprising" results\. For example: a query about a point generated in the open asks "is this soft cover?" The result will be "false", because this isn't any kind of cover\. Query names should be chosen carefully to help avoid potential confusion\.
+ **The query does not make sense in the context of the puppet, at this time and for any point\.** As with the point context issue, the query tries to return the "least surprising" results\. For example: a query about a puppet asks "am I visible to my attention target?" when the puppet doesn't have an attention target\. The query could return false, but it would disqualify every point\. This case will usually indicate a code error\-\-the puppet should have an attention target at this point, but does not\. Note: This situation can cause a similar problem in the point generation phase, with a query like "generate hidespots from my attention target"\. both of these situations are flagged as code errors\. 
+ **The query failed due to a code error\.** You can test for errors in the TPS queries and raise them there also\. For example, a query or combination hasn't been fully implemented yet or is being used as a kind of assert to test variables\.