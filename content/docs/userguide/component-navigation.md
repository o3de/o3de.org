# Navigation<a name="component-navigation"></a>

The **Navigation** component provides path\-finding and path\-following functionality for AI movement, typically on a navigation mesh\. 

![\[AI can use navigation to move along a path, typically on a navigation mesh.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-navigation-path.png)

**Topics**
+ [Navigation Component Properties](#component-navigation-properties)
+ [NavigationComponentRequestBus EBus Interface](#component-navigation-ebusrequest)
+ [NavigationComponentNotificationBus EBus Interface](#component-navigation-ebusnotification)
+ [Navigation Pathing Cvars](#component-navigation-cvars)

## Navigation Component Properties<a name="component-navigation-properties"></a>

The **Navigation** component has the following properties:

![\[Navigation component properties\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-navigation-properties.png)

**Agent Type**  
Specifies this AI's entity type for navigation purposes\. Defining the agent type determines which [navigation area](component-nav-area.md) the entity follows in a scenario where there are different navigation meshes for larger vehicles and smaller humanoid bots\. These agent types are defined in the `lumberyard_version\dev\your_project_name\Scripts\AI\Navigation.xml` file\.  
To define an agent type on your navigation area, see the **[Navigation Area](component-nav-area.md)** component\.

**Agent Speed**  
Sets the speed of the agent while navigating when using the Transform or Physics movement methods\.  
Default value: `1`

**Agent Radius**  
Sets the entity radius for navigation purposes\. Independent of physics or other collision concerns, the pathfinder uses this value to move around an area with obstacles while cutting corners\.  
Default value: `4`

**Arrival Distance Threshold**  
Sets the minimum distance from an end point when an entity's movement stops and is considered complete\.  
Default value: `0.25` 

**Repath Threshold**  
Sets the minimum distance from the previously known location before an entity's new path is calculated\.  
Default value: `1`

**Movement Method**  
Sets the movement method to use when following a path\. This can be Transform, Physics, or Custom\.  
Default value: `Transform`  
+ **Transform** – Move the entity that this component is on using the Transform bus\. This method ignores all physics so the object may go through walls and terrain\.
+ **Physics** – Move the entity using physics if the entity has a PhysX Rigid Body, PhysX Character Controller, Rigid Body Physics or Character Physics component\. If the entity does not have one of these valid physics components it will not move\.
+ **Custom** – Provide path updates and let the game logic move the entity however they want\. This method is useful when you want to move an animated entity that uses root motion\. By listening to the `OnTraversalPathUpdate` notification, you can move your entity toward the next point along a path\. Once the entity gets within the arrival distance threshold another `OnTraversalPathUpdate` notification with the next path position will be provided and so on until the end of the path is reached\.

**Allow Vertical Navigation**  
Set to true if you want to to allow the navigation agent to include the vertical velocity when navigating a path, or false if you just want the velocity to be constrained to the X and Y plane \(2D\)\. Vertical navigation can be used for flying entities or entities that move with the Transform method but must move vertically\. Enabling this property can also help prevent "stair stepping" for entities moving down ramps or steep terrain\.  
Default value: `false`

## NavigationComponentRequestBus EBus Interface<a name="component-navigation-ebusrequest"></a>

Use the following request functions with the `NavigationComponentRequestBus` event bus \(EBus\) interface to communicate with other components of your game\.

For more information about using the EBus interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### FindPath<a name="navigation-ebus-findpath"></a>

Finds a requested path configuration\.

**Parameters**  
`request` – Allows the issuer of the request to override one, all, or none of the pathfinding configuration defaults for this entity\.

**Return**  
A unique identifier for this pathfinding request\.

**Scriptable**  
No

### FindPathToEntity<a name="navigation-ebus-findpathtoentity"></a>

Creates a pathfinding request to navigate toward the specified entity\.

**Parameters**  
`EntityId` – ID of the entity toward which you want to navigate\.

**Return**  
A unique identifier for the pathfinding request\.

**Scriptable**  
Yes

### FindPathToPosition<a name="navigation-ebus-findpathtoposition"></a>

Creates a pathfinding request to navigate towards the specified world position\. Note that while this may seem like the obvious simple choice for pathing, it is often more useful to use FindPathToEntity with a dummy entity because then the pathing will automatically update if you move the dummy entity to a new location before pathing is complete\.

**Parameters**  
`Destination` – World position you want to navigate to\.

**Return**  
A unique identifier for the pathfinding request\.

**Scriptable**  
Yes

### Stop<a name="navigation-ebus-stop"></a>

Stops all pathfinding operations for the provided `requestId`\. Use the ID to ensure that the request you want to cancel is the request that is currently processing\. If the specified `requestId` is different from the ID of the current request, then the Stop command is ignored\.

**Parameters**  
`requestId` – ID of the request to cancel\.

**Return**  
None

**Scriptable**  
Yes

### GetAgentSpeed<a name="navigation-ebus-getagentspeed"></a>

Returns the current AI Agent's speed\.

**Parameters**  
None

**Return**  
Returns the current agent's speed as a float\.

**Scriptable**  
Yes

### SetAgentSpeed<a name="navigation-ebus-setagentspeed"></a>

Updates the AI Agent's speed\.

**Parameters**  
`agentSpeed` – Specifies the new agent speed as a float\.

**Return**  
None

**Scriptable**  
Yes

### GetAgentMovementMethod<a name="navigation-ebus-getagentmovementmethod"></a>

Returns the current AI Agent's movement method\.

**Parameters**  
None

**Return**  
Returns the current agent's movement method\.

**Scriptable**  
Yes

### SetAgentMovementMethod<a name="navigation-ebus-setagentmovementmethod"></a>

Updates the AI Agent's movement method\.

**Parameters**  
`movementMethod` – Specifies the new agent movement method \(Transform, Physics or Custom\)\.

**Return**  
None

**Scriptable**  
Yes

## NavigationComponentNotificationBus EBus Interface<a name="component-navigation-ebusnotification"></a>

Use the following notification functions with the `NavigationComponentNotificationBus` event bus \(EBus\) interface to communicate with other components of your game\.

For more information about using the EBus interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### OnSearchingForPath<a name="navigation-ebus-onsearchingforpath"></a>

Indicates that the pathfinding request has been submitted to the navigation system\.

**Parameters**  
`requestId` – ID of the request for which the path is being searched\.

**Return**  
None

**Scriptable**  
Yes

### OnPathFound<a name="navigation-ebus-onpathfound"></a>

Indicates that a path has been found for the indicated request\.

**Parameters**  
`requestID` – ID of the request for which the path has been found\.  
`currentPath` – The path calculated by the pathfinder\.

**Return**  
Returns a boolean value indicating whether this path is to be traversed\.

**Scriptable**  
No

### OnTraversalStarted<a name="navigation-ebus-ontraversalstarted"></a>

Indicates that traversal for the indicated request has started\.

**Parameters**  
`requestId` – ID of the request for which traversal has started\.

**Return**  
None

**Scriptable**  
Yes

### OnTraversalInProgress<a name="navigation-ebus-ontraversalinprogress"></a>

Indicates that traversal for the indicated request is in progress\.

**Parameters**  
`requestId` – ID of the request for which traversal is in progress\.  
`distanceRemaining` – Remaining distance in this path\.

**Return**  
None

**Scriptable**  
Yes

### OnTraversalPathUpdate<a name="navigation-ebus-ontraversalpathupdate"></a>

Indicates that the path for the traversal has updated\. If the `nextPathPosition` and `inflectionPosition` are equal, they represent the end of the path\.

**Parameters**  
`requestId` – ID of the request for which traversal is in progress\.  
`nextPathPosition` – Furthest point on the path we can move to without colliding with anything\.  
`inflectionPosition` – Next point on the path beyond `nextPathPosition` that deviates from a straight\-line path\.

**Return**  
None

**Scriptable**  
Yes

### OnTraversalComplete<a name="navigation-ebus-ontraversalcomplete"></a>

Indicates that traversal for the indicated request completed successfully\.

**Parameters**  
`requestId` – ID of the request for which traversal has completed\.

**Return**  
None

**Scriptable**  
Yes

### OnTraversalCancelled<a name="navigation-ebus-ontraversalcancelled"></a>

Indicates that traversal for the indicated request was canceled before succesful completion\. A path request may be cancelled if no path could be found or if the request was stopped by the game\.

**Parameters**  
`requestId` – ID of the request for which traversal was canceled\.

**Return**  
None

**Scriptable**  
Yes

## Navigation Pathing Cvars<a name="component-navigation-cvars"></a>

**ai\_DrawPathFollower**  
Enables PathFollower debug drawing, displaying agent paths and safe follow target\.  
`0` – Off  
`1` – On