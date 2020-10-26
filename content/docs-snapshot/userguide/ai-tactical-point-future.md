# Future Plans and Possibilities<a name="ai-tactical-point-future"></a>

The following topics represent potential areas of development for TPS\.

**Higher\-level environmental reasoning**

One possible application of TPS: rather than simply using TPS to choose a point and move to it, there is the potential for some nice environmental deductions based on results\. 

For example: The player runs around a corner, followed by an AI puppet\. When the AI puppet turns the corner, the player is no longer visible\. The puppet queries TPS for places it would choose to hide from itself, with the following possible results\.
+ TPS returns that 1 hidepoint is much better than any other\. This is because there's a single large box in the middle of an empty room\. The AI puppet assumes the player is there and charges straight at the box, firing\.
+ TPS returns that there are several good hiding places\. This is because there's a stand of good cover trees\. All the hidepoints are stored in a group blackboard, and the AI puppet \(or a group\) can approach each spot in turn to discover the player\.

This scenario is workable with some extra code, and much easier when built upon TPS\.

**Sampling methods**

When generating points in the open, generate points in a grid or radially around objects and treat each point individually\. This supports a basic sampling method\. Where an area must be sampled, some kind of coherency in the evaluation functions can be assumed, and so could use some adaptive sampling approaches instead\.

**Dynamic cost evaluation**

A crucial aspect of optimizing TPS involves adjusting the relative expense function of queries\. The costs of evaluations will vary across operating systems, levels, and even locations within levels, and will change over time as the code changes\. It is critical to make sure that the evaluation order is correct, to prevent more expensive evaluations from being favored over cheaper ones\. The need to profile the evaluation function in all these difference circumstances suggests an automatic profiling solution at runtime\. 

In addition, the relative weighting of weight criteria should also be considered; a cheap query may not be worth doing first if it only contributes 10% of the final fitness value, while an expensive query that contributes 90% may actually save many other evaluations\.

**Relaxing the optimality constraint**

When evaluating points the maximum and minimum potential fitness is always known at every stage; this provides the error bounds, or a relative measure of uncertainty about the point\.

It may make sense to relax the optimality constraint and accept a point when it becomes clear that no other point could be significantly better\. For example, the minimum potential fitness of a point may be less than 5% lower than the maximum potential fitness of the next best point\. This information could be used to stop evaluation early and yield a further performance saving\.