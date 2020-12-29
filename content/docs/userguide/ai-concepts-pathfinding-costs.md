# Pathfinding Costs<a name="ai-concepts-pathfinding-costs"></a>

For agents to behave in a believable way, they need to find paths that are appropriate for their current state\. Sometimes these paths will take the most direct route; other times they will be longer paths to maximize use of roads, cover, or other properties of the environment\. The current system needs to be extended to support this\. The pathfinding system uses A\* to find minimal\-cost paths\. 

The cost of a path is given by the sum of the costs of the links that make up that path\. Currently the cost traversing a link in the navigation graph is normally simply the physical \(3D\) length of that link\. However, the A\* implementation makes it easy for the requester to modify these distance\-based costs with simple code changes to extend the current system \. For example, the cost of traveling between two road nodes can be scaled by a factor of 0\.1 so that road\-traveling agents have a strong preference for finding road\-based paths\.

The cost of a path link connecting two graph nodes should be determined by two sets of properties: 
+ Link properties, including the path's length\.
+ Pathfinding agent properties in relation to link properties\. For example, a stealthy agent might evaluate a link passing through trees as a lower cost\-per\-unit\-length than one passing along a road\. However, the same agent might reach a different conclusion when leading a convoy containing vehicles\.

In general, the cost of a link is determined by the product of these two factors: the link\-length multiplied by a relative cost\-per\-unit\-length\. The latter is what needs to be determined\.

## Problem: Calculating Costs at Run Time<a name="ai-concepts-pathfinding-costs-problem"></a>

We want to use the same navigation graph for different kinds of agents\. This means that link cost should be calculated at run time by combining the inherent link properties with the agent properties\.

### Link properties<a name="ai-concepts-pathfinding-costs-problem-links"></a>

Associate these properties with each link:

**Link\.Length**  
Length of the link \(in meters\)\.

**Link\.Resistance**  
The link's resistance to traversal\. A road would be close to 0, off\-road would be larger, water deep enough to require swimming might be close to 1\.

**Link\.Exposure**  
How exposed the link is\. Trees and dense vegetation would be close to 0, low vegetation would be larger, and a road/open space would be close to 1\.

**Link\.DeepWaterFraction**  
Fraction of the link that contains deep water \(e\.g\., > 1\.5m\)\.

**Link\.DestinationDanger**  
Additional "danger value" associated with the destination node\. A dead body might be 1\. This value can be stored in the destination node itself to save memory\.

### Agent properties<a name="ai-concepts-pathfinding-costs-problem-agents"></a>

Associate these properties with each agent \(normally set when the agent is created\):

**Agent\.CanTraverseTriangular**  
True/false indicator determining if the agent can traverse triangular nodes\.

**Agent\.CanTraverseWaypoint**  
True/false indicator determining if the agent can traverse waypoint nodes\.

Associate these properties with an agent if relevant for the link type:

**Agent\.CanSwim**  
True/false indicator determining if the agent can swim\.

### Pathfinder request properties<a name="ai-concepts-pathfinding-costs-problem-path-request"></a>

Associate these properties with each agent pathfinder request: 

**Agent\.TriangularResistanceFactor**  
Extra link cost factor when the link is of type Triangular and its resistance is 1\.

**Agent\.WaypointResistanceFactor**  
Extra link cost factor when the link is of type Waypoint and its resistance is 1\.

**Agent\.RoadResistanceFactor**  
Extra link cost factor when the link is of type Road and its resistance is 1\.

Associate these properties with an agent pathfinder request if relevant for the link type \(note: if a path link has different start/end node types, the result is obtained by averaging\):

**Agent\.SwimResistanceFactor**  
Extra link cost factor when the link deep water fraction is 1\.

**Agent\.ExposureFactor**  
Extra link cost factor when the link's exposure is 1\.

**Agent\.DangerCost**  
Extra link cost when the link danger value is 1\.

All link properties, except for Link\.DestinationDanger, are calculated when the triangulation is generated\. Link\.DestinationDanger is initially set to 0 and then calculated as the game runs\. For example, whenever a character dies, each link going into the death node will have its DestinationdangerCost incremented by 1\. This will cause an agent with Agent\.DangerCost = 100 to prefer paths up to 100m longer \(assuming no other path cost differences\) in order to avoid this death node\. These link modifications need to be serialized to support load/save\. 

In addition, extra costs can be calculated at run time\. For example, an extra cost associated with exposure could be added when an agent wishes to find a path that avoids the player; this can be done by using raycasts in the A\* callback that calculates costs\.

When determining pathfinding costs, there are two problems that need to be solved: 
+ How should the link properties be calculated?
+ How should the link and agent properties be combined to give a numerical cost for traversing each graph link?

Keep in mind that link properties represent the average nature of the environment over the length of the link\. If the region has not been triangulated reasonably finely, this may negatively impact the quality of pathfinding results\. If the impact is significant, it may be necessary to add additional triangulation points\.

An additional issue to consider: should pathfinding differentiate between variable visibility conditions, such as night vs\. day or fog vs\. clear weather? This would involve splitting the link exposure into terms derived from physical cover and shadow cover\. Given the number of links involved, adding too much information of this type to each link should be considered carefully\. A simpler solution might be to have stealthy agents be less likely to request a stealthy path in these conditions, or to set the agent's ExposureFactor lower\. 

## Solution<a name="ai-concepts-pathfinding-costs-solution"></a>

### Calculating link properties<a name="ai-concepts-pathfinding-costs-solution-calculate-link-properties"></a>

Because link resistance is only dependant on the actual type of nodes involved in the link, it can be stored in a lookup table\. Here's an example set of resistance values for each node type: 


****  

| Node type | Resistance | 
| --- | --- | 
| Triangular\-no\-water  | 0\.5  | 
| Triangular\-water  | 1\.0  | 
| Waypoint | 0\.6 | 
| Road | 0 | 
| Flight/Volume | 0  | 

**Note**  
Consider adding a separate resistance for Flight/Volume in underwater terrain\.
For links between nodes of different types, the resistance values can be averaged\.

The Link\.Exposure value, which is stored in the link, is determined by the environment properties sampled over the length of the link\. For triangular, waypoint and volume navigation regions, this can be done by firing rays from points along the link\. \(This is done by using IPhysicalWorld::RayWorldIntersection and checking for HIT\_COVER \| HIT\_SOFT\_COVER with COVER\_OBJECT\_TYPES\.\) It does not make sense to try to get a really accurate value, because in practice the beautified path will not follow the link directly\.

### Combining link and agent properties<a name="ai-concepts-pathfinding-costs-solution-combining-link-properties"></a>

Link cost must account for intersections between link properties and agent properties\. For example: if a link is marked as containing deep water and the agent cannot swim, the link should be treated as impassable\.

A factor representing the extra costs associated with travel resistance and exposure will be calculated, and the total link cost should be set as follows: 

```
Cost = Link.DestinationDanger * Agent.DangerCost + (1 + Factor) * Link.Length 
```

where 

```
Factor = Agent.[link-type]ResistanceFactor * Link. [link-type]Resistance + Agent.ExposureFactor * Link.Exposure
```

Consider this scenario: with no exposure/destination costs, and assuming that road links have Link\.Resistance \{\{0\}\} while off\-road links have Link\.Resistance \{\{0\.5\}\}, then in order to make road travel ten times more attractive than off\-road \(such as if the agent is a car\), the agent could have Agent\.TriangularResistanceFactor set to \{\{\(10\-1\)/0\.5\}\} \(or 18\) and Agent\.RoadResistanceFactor set to 0\. 

If the agent is a human character that always moves at about the same speed whether or not it is on or off a road, then it could have both Agent\.TriangularResistanceFactor and Agent\.RoadResistanceFactor set to 0\. 

Assuming the agent can traverse deep water or is not affected by water \(such as a hovercraft\), Agent\.SwimResistanceFactor could be set to 0\. For a human agent, this factor might be set to a value as high as 3\.0, so that the agent will take significant detours to avoid swimming across a river\.