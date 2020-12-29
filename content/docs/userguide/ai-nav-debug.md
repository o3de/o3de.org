# Debugging AI Navigation<a name="ai-nav-debug"></a>

In addition to using the AI Debug Recorder and AI Debug Viewer, you can also use specific console variables to debug AI agent navigation issues\.

## Using Console Variables to Debug AI Navigation<a name="ai-nav-debug-cvars"></a>

There are a number of console variables that can be used for agent navigation mesh \(MNM\) debugging\. Some statistics display at the top\-right corner of the screen\.

When debugging Smart Object navigation, make sure that all entities have the right classes assigned, and that the correct actions are set to execute\.

**ai\_DebugDrawNavigation**  
General variable for AI navigation debugging\.  
Values: `1` =displays mesh and contour \| `2` =also display triangles \| `3` =also display tiles and external links

**ai\_DrawSmartObjects**  
Displays Smart Objects\.  
Values: `0` =hide \| `1` =show

**ai\_debugMNMAgentType**  
Mesh agent type for which debugging information is displayed\.

**ai\_MNMPathFinderQuota**  
Path finding quota per frame\.  
Units: seconds

**ai\_MNMPathFinderDebug**  
Displays pathfinder debugging statistics, including queue size, average and maximum number of A\* search steps, and average and maximum search time\.  
Values: `0` =hide \| `1` =show

**ai\_MNMProfileMemory**  
Displays memory statistics\.  
Values: `0` =hide \| `1` =show

**ai\_DrawPath**  
Draw path\.

**ai\_DrawPathFollower**  
Draw path follower\.

## Debugging the Navigation Mesh<a name="ai-nav-debug-mesh"></a>

Use the following procedure as a start to debug the navigation mesh:

**To debug the navigation mesh**

1. Set the variable **ai\_DebugDrawNavigation** value to 3\.

1. Create and place a TagPoint with the name **MNMDebugLocator** within a tile of the mesh you want to debug\.

1. Press Backspace to switch between the display of the different mesh generation steps\.