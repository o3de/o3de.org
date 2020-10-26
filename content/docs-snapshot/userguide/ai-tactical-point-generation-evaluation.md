# Point Generation and Evaluation<a name="ai-tactical-point-generation-evaluation"></a>

An AI agent makes a TPS point generation query in order to generate a set of points for consideration\. Once generated, each point can be evaluated based on its position and any available metadata\.

## Generating Points<a name="ai-tactical-point-generation"></a>

### Input<a name="ai-tactical-point-generation-input"></a>

The following information are required to generate points:
+ Specific criteria defining the types of points to generate\.
+ A central or focal position around which to generate points\. This might be the current position of the puppet itself, an attention target, or some other given position\.
+ For some queries, the position of a secondary object, such as a target to hide from\.

It is possible to specify multiple sets of point generation criteria\. For example, a query might request point generation around both the puppet and an attention target\. 

### Processing<a name="ai-tactical-point-generation-processing"></a>

Based on the input, TPS begins generating points to evaluate\. All points fall into two main types:
+ Hidepoints\. These are generated based on the following calculations:
  + Hideable objects
  + Generated only if a position to hide from was provided
  + Hidepoints represent final positions, for example calculating positions behind cover
  + Using the object and delaying finding an actual point is a possibility
+ Open points\. These are generated based on query specifications and the following calculations:
  + Usually on terrain, but may be on surfaces, etc\.
  + Resolution/pattern \(such as triangular with 1\-meter spacing\)
  + Potentially may perform more general sampling to find an exact point, but an initial resolution is still required
  + Radial/even distributions

### Output<a name="ai-tactical-point-generation-output"></a>

The result of a point generation query is a list of point objects\. Each point object includes the point's position and available metadata, such as any associated hide objects\. 

## Evaluating Points<a name="ai-tactical-point-evaluation"></a>

Once a generation query generates a set of points, they can be evaluated\. Point evaluation tries to establish the "fitness" of each point, that is, how well the point matches the specified criteria\. The goal is to choose either one good point, or the best *N* number of good points\. 

### Input<a name="ai-tactical-point-evaluation-input"></a>

The following elements are required to evaluate points:
+ List of candidate points from the point generator
+ Point evaluation criteria:
  + Boolean – Condition criteria used to include or exclude a point independently of any other points 
  + Weight – Criteria that, combined, give a measure of fitness relative to other points \(those included by the boolean criteria\)

### Processing<a name="ai-tactical-point-evaluation-processing"></a>

The primary goal is to find an adequately good point as quickly as possible\. Often, "adequately good" also means "the best", but there is a lot of potential for optimization if a specified degree of uncertainty is allowed\.

The order of evaluation has a non\-trivial and crucial impact on query efficiency\. As a result, evaluation uses the following strategy to minimize the number of expensive operations:

1. Cheap booleans, with an expense on the order of one function call or some vector arithmetic\. These allow the system to completely discount many points without significant cost\. For example: *Is this point a primary or secondary hidespot? Is this point less than 5 meters from the target?*

1. Cheap weights, with an expense similar to cheap booleans\. These allow the system to gauge the likelihood that a given point will eventually be the optimal choice; by focussing on points with a high likelihood, the number of expensive tests can be reduced\. For example: *closeness\_to\_player \* 3 \+ leftness \* 2*\.

1. Expensive booleans, approximately 100 times costlier\. These are yes/no questions that will require expensive calculations to answer, but further eliminate points from contention\. For example, the question *Is this point visible by the player?* requires an expensive ray test\.

1. Expensive weights, with an expense similar to expensive booleans\. These help to rank the remaining points\. For example: *nearby\_hidepoint\_density \* 2*

### Algorithmic Details<a name="ai-tactical-point-evaluation-algorithmic"></a>

 It turns out that the system can go further with this by interleaving the final two steps and making evaluation order completely dynamic\. Unlike conditions \(booleans\), weights don't explicitly discount points from further evaluation\. However, by tracking the relative "fitness" of points during evaluation, we can still employ weights to dramatically reduce evaluations by employing two basic principles: 
+ Evaluate points in order of their maximum possible fitness, to fully evaluate the optimal point as quickly as possible\.
+ If, based on the initial weight evaluation, a point can be established as better than any other point, then immediately finish evaluating it against the remaining conditions\. If the point passes all condition criteria, then it is the optimal point and no other points need to be evaluated\. In addition, this point does not need to be evaluated on any remaining weights\. 

This implementation is based on a heap structure that orders points according to their maximum possible fitness and tracks the evaluation progress of each point separately\. Each weight evaluation collapses some of the uncertainty around the point, adjusting both the minimum and maximum possible fitness\. If the weight evaluation scored highly, the maximum will decrease a little and the minimum increase a lot; if it scored badly, the maximum will decrease a lot and the minimum increase a little\. 

In each iteration, the next most expensive evaluation is done on the point at the top of the heap, after which the point is re\-sort into place if necessary\. If all evaluations on a point have been completed and it still has the maximum possible fitness, then it must be the optimal point\. This approach tends towards evaluation of the optimal point with relatively few evaluations on all other points\.

### Output<a name="ai-tactical-point-evaluation-output"></a>

The result of point generation evaluation is a single point or group of *N* number of points, and the opportunity to request all metadata leading to its selection\. As a result, behaviors can adapt their style to reflect the nature the hidepoint received\. 