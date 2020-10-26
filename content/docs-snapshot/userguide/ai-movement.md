# Movement System<a name="ai-movement"></a>

Key priorities for the AI Movement system include the following features\.
+ Robust and predictable\. Navigation can be very unreliable, with no guarantee that a character will carry out the requested movement and end up at the desired destination\. This is a very organic problem with no clear resolutions\. The AI Movement system solves this by providing more explicit information about failure reasons\.
+ Central, clear ownership and easy debugging\. Rather than having contextual movement information – style, destination, requester, etc\. – tied to a specific goalop and getting lost when a behavior switch occurs, Lumberyard maintains this information in a central location and separated from the goalop\. In practice, a movement request can be sent from anywhere and the movement system handles it centrally\. when the goalop requester is no longer interested, it simply cancels the request\. This doesn't mean the character stops immediately and all information is lost, it just means that interest in the request has expired\. 
+ Planning\. In Lumberyard, logic is handled in blocks for ease of use and organization\. Movement blocks are responsible for their own isolated tasks, such as FollowPath, LeaveCover and UseSmartObject\. A collection of blocks in sequence make up a plan, which is produced by a controller with a string\-pulled path as input\. This types of organization helps clarify a larger picture about what is being processed right now and what is coming up\.

**Note**  
This system is still a work in progress, and it's design was focused on solving some critical problems with an existing code base\. It may not be suitable for all game titles\.

## Using the Movement System<a name="ai-movement-using"></a>

Using the movement system is pretty straightforward\. Create a MovementRequest object with information about the destination, style and a callback\. Queue it in MovementSystem and receive a MovementRequestID\. Use this if you want to cancel the request\. Then wait for MovementSystem to process to your request\. Once your request is processed, you'll be notified via the callback\.

Here's what's happening internally to process your request:

1. Once MovementSystem receives your request, it creates an internal representation of the character, called a MovementActor\. This is a container for all internal states and the proxy to all external states/logic related to a character\. It binds a MovementController to the actor\. Currently there's only one controller available – GenericController, which is the result of what was done before\. \(The term "controller" is also used on the game side for a similar but different entity\. These entities may be merged in the future, and multiple types of controllers added, such as for the Pinger, Scorcher, or BipedCoverUsed\.\)

1. MovementSystem informs the controller that there's a new request to start working on\. GenericController kicks off the path finder\.

1. Once the pathfinding result is in, the GenericController produces a plan that it starts to follow\.

1. When the GenericController finishes the last block in the plan, it informs MovementSystem that the task is finished\.

1. MovementSystem notifies the requester of success, and moves on to the next request\.

## Potential Improvements<a name="ai-movement-improvements"></a>

The following areas of improvement or enhancement are under consideration:
+ Change request processing\. Currently there is a request queue, with movement requests processed one at a time, in FIFO order\. Requests are immutable, so it's impossible to change a request once it's been queued; as a result, the only option is to cancel a request and queue a new one\. These issues could be resolved by removing the request queue and allowing only one request at a time\. If a request comes in while one is already being processed, interrupt the current one and report it\.
+ Validate a pipe user before proceeding with the update\.
+ When a UseSmartObject block detects that the exact positioning system fails to position a character at the start of a smart object, it reports this failure through the agent's bubble and in the log\. It then resolves the problem by teleporting the character to the end of the smart object and proceeds to the next block in the plan\.
+ The GenericController is only allowed to start working on a new request while it is executing a FollowPath block\. It then shaves off all subsequent blocks so that the actor doesn't find itself in the middle of a smart object when planning takes place\. This could be improved by allowing the controller to produce a part of the plan, looking further ahead, and then patch it with the current plan\.
+ The plan isn't removed when a request is canceled\. This is because a subsequent 'stop' or 'move' request should follow the cancellation\. However, until this request has been received, the controller has no way to know what to do\. 
+ The pathfinding request is being channeled through the pipe user, and the result is returned to the pipe user as well as stored in `m_path`\. This path is then extracted by the movement controller\. It would be better if the pathfinder could be employed directly by the movement controller and skip the pipe user as a middle layer\.
+ The movement controller code would fit better on the game side, since that's where the information about the characters should live\. It could be merged with the movement transitions that are handled on the game side\.
+ Being able to pull out a movement request at any time makes the code slightly more complex, because we can't rely on that fact that the controller is always working on a request that still exists\. It may be better to keep the request, flag it as abandoned and clear the callback\.
+ The code could be improved by separating planning and plan execution into two different code paths instead of one\.