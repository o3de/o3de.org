# Modular Behavior Tree<a name="ai-scripting-mbt"></a>

Modular behavior tree \(MBT\) is a collection of concepts for authoring behaviors for artificial intelligent \(AI\) agents in your game\. Instead of writing complicated code in C\+\+ or other general purpose programming language, MBT lets you describe AI behaviors at a high level without having to think about mechanics such as pointers, memory, and compilers\. MBT concepts and implementation are optimized for rapid iteration and re\-use\.

## Core Concepts<a name="ai-scripting-mbt-concepts"></a>

Conceptually, MBT is based on two key objects: the *node* and the *tree*\. 

**Node**  
The node is the most fundamental concept; it is a building block that can be combined with others to build behaviors\. A node consists of a block of code that represents a simple task\. All nodes have the same interface: when processed, they carry out a task and either succeed or fail\.   
Nodes can be standalone or may have child nodes, which are processed as part of the parent node processing\. When processed, the success of a parent node often \(but not always\) depends on the success of each child node\.   
Nodes follow several common patterns, such as action, composite, and decorator nodes\. These common node patterns are more fully described in later in this topic\.  
Game developers can create the nodes needed for their game\. In addition, Lumberyard provides a set of standard nodes for general use\. These include nodes for tasks related to AI, animation, flying, and common game activities, as well as generic nodes useful when building behaviors, such as for timeouts and looping tasks\. These provided nodes are documented in the [Modular Behavior Tree Node Reference](ai-scripting-mbt-nodes.md)\.

**Tree**  
Behaviors are constructed by building trees of nodes\. These are a collection of individual tasks that when positioned as a root with branches that extend out into leaves define how an AI agent behaves in response to input\. 

## Common Node Patterns<a name="ai-scripting-mbt-common-node-patterns"></a>

### Action Nodes<a name="ai-scripting-mbt-common-node-patterns-action"></a>

An action node represents some sort of simple action\. Action nodes might cause the AI agent to speak, play an animation, or move to a different location\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai_scripting_mbt_action_node.png)

### Composite Nodes<a name="ai-scripting-mbt-common-node-patterns-composite"></a>

A composite node represents a series of actions to be performed in a certain order\. Composite nodes consist of a parent node and two or more child nodes\. Whether or not a child node is processed \(and in what order\) can depend on the success or failure of previously processed nodes\. Common composite patterns include sequential, selector, and parallel\.

**Sequential node**  
This composite pattern describes child nodes that are processed consecutively in a specified sequence\. All child nodes are processed regardless of whether the previous child node succeeded or failed\. For example, a sequential node might cause an AI monster to point at the player, roar, and then run toward the player\. In this pattern, each child node in the sequence must succeed for the next child node to start processing; if any child node fails, the parent node immediately fails and processing is stopped\.   

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai_scripting_mbt_sequence_node.png)

**Selector node**  
This composite pattern describes child nodes that are processed consecutively and in sequence only until one succeeds\. As soon as one child node succeeds, the parent node succeeds immediately and stops processing child nodes\. If all child nodes are attempted and all fail, the parent node fails\. This pattern is useful for setting up AI agents to try multiple different tactics, or for creating fallback behaviors to handle unexpected outcomes\.  
Imagine, for example, that we want our AI monster to chase the player, but if it can't reach the player it should scream “Come and fight me, you coward\!” To implement this scenario, a selector parent node is set up with two children, one for each possible action\. The parent node first processes the “chase player” child node\. If it succeeds, then the selector node stops there\. However, if the “chase player node fails, then the parent node continues and processes the “taunt player” child node\.   

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai_scripting_mbt_selector_node.png)

**Parallel node**  
This composite pattern describes child nodes that are processed concurrently\. In this scenario, Imagine we want our AI monster to scream and chase the player at the same time rather than one after the other\.   

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai_scripting_mbt_parallel_node.png)

### Decorator Nodes<a name="ai-scripting-mbt-common-node-patterns-decorator"></a>

A decorator node represents some sort of functionality that can be added to another node and behaves regardless of how the other node works or what it does\. Common decorator functionality includes looping and limiting concurrent functionality\.

**Looping**  
Looping functionality can be used to process any other node multiple times\. Rather than creating custom nodes every time you want to repeat a task, you can wrap any node in a parent loop decorator node\. By setting a parameter for the loop node, you can dictate the number of times the child nodes will be processed\. Each time the child node succeeds, the loop node count is updated and the child node is re\-processed\. Once the loop count meets the set parameter, the loop node succeeds\.  

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai_scripting_mbt_loop_node.png)

**Limiting concurrent users**  
This functionality lets you specify how many users should be allowed to concurrently use a specified node\. It is a good way to ensure variations in behavior among a group of AI agents\. A typical scenario illustrating this function is as follows: The player is spotted by a group of three monsters\. You want one monster to sound an alarm while the others chase the player\.  
Limiting concurrent users works with a selector node, which steps through a sequence of child nodes until one succeeds\. By wrapping one of a selector node’s child nodes in a limit decorator node, you can cause the child node to fail due to concurrent users, which in turn causes the selector node to move to the next child\.   
To handle the scenario described, the selector node would have two child nodes, “sound alarm” and “chase player”\. The “sound alarm” node is wrapped in a limit node, with the user limit set to 1\. Monster \#1 flows through the selector node to the limit node; as there is no one currently using the “sound alarm” node, the Monster \#1 takes this action\. The limit node records that one AI agent is processing the child node, so effectively locks the door to it\. Monsters \#2 and \#3 also flow through the selector node to the limit node, but because the limit node has reached its limit of user, it reports a failure\. Consequently, the selector node moves on to the next child node in the sequence, which is “chase player”\. So monsters \#2 and \#3 chase the player\.  

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ai/ai_scripting_mbt_limit_node.png)

## Describing Behavior Trees in XML<a name="ai-scripting-mbt-describing"></a>

Behavior trees are described using XML markup language\. Behavior trees are hot\-loaded every time the user jumps into the game in the editor\.

The following XML example describes the behavior tree for a group of monsters\. In this example, only one monster at a time is allowed to chase the player\. The remaining monsters stand around and taunt the player\. 

```
<BehaviorTree>
    <Root>
        <Selector>
            <LimitConcurrentUsers max=”1”>
                <ChasePlayer />
            </LimitConcurrentUsers>
            <TauntPlayer />
        </Selector>
    </Root>
</BehaviorTree>
```

## C\+\+ Implementation<a name="ai-scripting-mbt-cpp"></a>

You'll find all MBT code encapsulated in the BehaviorTree namespace\.

### Understanding the Memory Model<a name="ai-scripting-mbt-cpp-memory-model"></a>

MBT has a relatively small memory footprint\. It accomplishes this by \(1\) sharing immutable \(read\-only\) data between instances of a tree, and \(2\) only allocating memory for things that are necessary to the current situation\.

Memory is divided into two categories: configuration data and runtime data\. In addition, MBT uses smart pointers\.

#### Configuration data<a name="ai-scripting-mbt-cpp-memory-model-configuration"></a>

When a behavior tree such as the following example is loaded, a behavior tree template is created that holds all the configuration data shown in the example\. This includes a sequence node with four children: two communicate nodes, an animate node, and a wait node\. The configuration data is the animation name, duration, etc\., and this data never changes\. 

```
<Sequence>
    <Communicate name=”Hello” />
    <Animate name=”LookAround” />
    <Wait duration=”2.0” />
    <Communicate name=”WeShouldGetSomeFood” />
</Sequence>
```

Memory for the configuration data is allocated from the level heap\. When running the game through the launcher, this memory is freed on level unload; alternatively, it is freed when the player exits game mode and returns to edit mode in Lumberyard Editor\.

#### Runtime data<a name="ai-scripting-mbt-cpp-memory-model-runtime"></a>

When spawning an AI agent using a behavior tree, a behavior tree Instance is created and associated with the agent\. The instance points to the behavior tree template for the standard configuration data, which means that the instance contains only instance\-specific data such as variables and timestamps\.

When the tree instance is accessed for the AI agent, it begins by executing the Sequence node\. If the core system detects that this is the first time the behavior has been run for this AI agent, it allocates a runtime data object specifically for this node and agent\. This means that every AI agent gets its own runtime data object when executing a behavior tree node\. The runtime data object persists as long as the AI agent is executing a node \(this can be several frames\) but is freed when the AI agent leaves a node\.

Memory for runtime data is allocated from a bucket allocator\. This design minimizes memory fragmentation, which is caused by the fact that runtime data is usually just a few bytes and is frequently allocated and freed\. The bucket allocator is cleaned up on level unload\.

#### Smart pointers<a name="ai-scripting-mbt-cpp-memory-model-smart-pointers"></a>

MBT uses Boost smart pointers to pass around data safely and avoid raw pointers as much as possible\. Memory management is taken care of by the core system\. \(While there are circumstances in which a *unique\_ptr* from C\+\+11 would work well, Lumberyard uses Boost's *shared\_ptr* for compatibility reasons\.\)

### Implementing an MBT Node<a name="ai-scripting-mbt-cpp-implementing-nodes"></a>

To implement a new MBT node in C\+\+, you'll need to do the following tasks: 
+ Create the node
+ Expose the node to the node factory
+ Set up error reporting for the node

#### Creating a node<a name="ai-scripting-mbt-cpp-implementing-nodes-creating"></a>

The following code example illustrates a programmatic way to create a behavior tree node\. When naming new nodes, refer to [Recommended Naming Practices](#ai-scripting-mbt-naming)\.

```
#include <BehaviorTree/Node.h>

class MyNode : public BehaviorTree::Node
{
    typedef BehaviorTree::Node BaseClass; 

    public:
    // Every instance of a node in a tree for an AI agent will have a 
    // runtime data object. This data persists from when the node 
    // is visited until it is left.
    //
    // If this struct is left out, the code won't compile.
    // This would contain variables like 'bestPostureID', 'shotsFired' etc. 
    struct RuntimeData
    {
    };
 
    MyNode() : m_speed(0.0f)
    {
    }
 
    // This is where you'll load the configuration data from the XML file
    // into members of the node. They can only be written to during the loading phase
    // and are conceptually immutable (read-only) once the game is running. 
    virtual LoadResult LoadFromXml(const XmlNodeRef& xml, const LoadContext& context)
    {
        if (BaseClass::LoadFromXml(xml, context) == LoadFailure) 
            return LoadFailure;
        xml->getAttr("speed", m_speed); 
        return LoadSuccess;
    }
 
protected:
    // Called right before the first update
    virtual void OnInitialize(const UpdateContext& context)
    {
        BaseClass::OnInitialize(context);

        // Optional: access runtime data like this
        RuntimeData& runtimeData = GetRuntimeData<RuntimeData>(context);
    }
 
    // Called when the node is terminated
    virtual void OnTerminate(const UpdateContext& context)
    {
        BaseClass::OnTerminate(context);
 
        // Optional: access runtime data like this
        RuntimeData& runtimeData = GetRuntimeData<RuntimeData>(context);
    }
 
    virtual Status Update(const UpdateContext& context)
    {
        // Perform your update code and report back whether the
        // node succeeded, failed or is running and needs more
        // time to carry out its task.
 
        // Optional: access runtime data like this
        RuntimeData& runtimeData = GetRuntimeData<RuntimeData>(context); 
        return Success;
    }
 
    // Handle any incoming events sent to this node
    virtual void HandleEvent(const EventContext& context, const Event& event)
    {
        // Optional: access runtime data like this
        RuntimeData& runtimeData = GetRuntimeData<RuntimeData>(context);
    } 

private:
    // Store any configuration data for the node right here.
    // This would be immutable things like 'maxSpeed', 'duration',
    // 'threshold', 'impulsePower', 'soundName', etc. 
    float m_speed;
};

// Generate an object specialized to create a node of your type upon
// request by the node factory. The macro drops a global variable here. 
GenerateBehaviorTreeNodeCreator(MyNode);
```

#### Exposing a node<a name="ai-scripting-mbt-cpp-implementing-nodes-exposing"></a>

To use the newly created node, you'll need to expose it to the node factory, as shown in the following code snippet\.

```
BehaviorTree::INodeFactory& factory = gEnv->pAISystem->GetIBehaviorTreeManager()->GetNodeFactory();
ExposeBehaviorTreeNodeToFactory(factory, MyNode);
```

#### Setting up error reporting<a name="ai-scripting-mbt-cpp-implementing-nodes-reporting-errors"></a>

Use the class `ErrorReporter` to report errors and warnings in the new node\. It will let you log a printf\-formatted message and automatically include any available information about the node, such as XML line number, tree name, and node type\.

```
ErrorReporter(*this, context).LogError("Failed to compile Lua code '%s'", code.c_str());
```

### Variables<a name="ai-scripting-mbt-cpp-variables"></a>

Variables are statically declared in XML, with information about how they will change in response to signals from AI agents \(named text messages within the AI system\)\. 

The following code snippet illustrates the use of variables to receive input from the AI system\. In this example, the AI agent takes action based on whether or not it can "see" the target\.

```
<BehaviorTree>
    <Variables>
        <Variable name="TargetVisible" />
    </Variables>
    <SignalVariables>
        <Signal name="OnEnemySeen" variable="TargetVisible" value="true" />
        <Signal name="OnLostSightOfTarget" variable="TargetVisible" value="false" />
    </SignalVariables>
    <Root>
        <Selector>
            <IfCondition condition=”TargetVisible”>
                <Move to=”Target” />
            </IfCondition>
            <Animate name=”LookAroundForTarget” />
        </Selector>
    </Root>
</BehaviorTree>
```

### Lua Scripting<a name="ai-scripting-mbt-cpp-lua-scripting"></a>

Lua code can be embedded in a behavior tree and executed along with the tree nodes\. This is useful for running fire\-and\-forget code or for controlling the flow in a tree\. It's useful for prototyping or extending functionality without having to create new nodes\.

The code is compiled once when the level is loaded in pure game to reduce fragmentation\. Only code for behavior trees that are actually used in that level will be compiled\.

All Lua nodes provide access to the *entity* variable\.
+ `ExecuteLua` runs a bit of Lua code\. It always succeeds\.

  ```
  <ExecuteLua code=”DoSomething()” />
  ```
+ `LuaWrapper` inserts a bit of Lua code before and after running child node\. The post\-node code is run regardless of whether the child node succeeded or failed\.

  ```
  <LuaWrapper onEnter=”StartParticleEffect()” onExit=”StopParticleEffect()”>
      <Move to=”Cover” />
  </LuaWrapper>
  ```
+ `LuaGate` uses a bit of Lua code to control whether or not a child node should be run\. If the Lua code returns true, the child node is run and `LuaGate` returns the status of the child node \(success or failure\)\. If the code returns false or fails to execute, the child node is not run, and `LuaGate` returns failure\. 

  ```
  <LuaGate code=”return IsAppleGreen()”>
      <EatApple />
  </LuaGate>
  ```
+ `AssertLua` lets you make a statement\. If the statement is true, the node succeeds; if it's false the node fails\.

  ```
  <Sequence>
      <AssertLua code=”return entity.someCounter == 75” />
      <AssertCondition condition=”TargetVisible” />
      <Move to=”Target” />
  </Sequence>
  ```

### Timestamps<a name="ai-scripting-mbt-cpp-timestamps"></a>

A timestamp identifies a point in time when an event happened\. A lot of AI behavior depends on tracking the timestamp of certain events and measuring the amount of time from those points\. For example, it can be useful to tie behavior to how long it's been since the AI agent was last shot at or hit, when it last saw the player, or how long it's been since moving to the current cover location\. 

Timestamps can be declared as mutually exclusive, that is, both timestamps can't have a value at the same time\. For instance, `TargetSpotted` and `TargetLost` can both have a value because the AI agent can't see a player and at the same time consider them lost\. With exclusive timestamps, when one timestamp has a value written to it, the other timestamp is automatically cleared\. 

The following code snippet illustrates the use of timestamps\.

```
<BehaviorTree>
    <Timestamps>
        <Timestamp name="TargetSpotted" setOnEvent="OnEnemySeen" />
        <Timestamp name="ReceivedDamage" setOnEvent="OnEnemyDamage" />
        <Timestamp name="GroupMemberDied" setOnEvent="GroupMemberDied" />
    </Timestamps>
    <Root>
        <Sequence>
            <WaitUntilTime since=”ReceivedDamage” isMoreThan=”5” orNeverBeenSet=”1” />
            <Selector>
                <IfTime since="GroupMemberDied" isLessThan=”10”>
                    <MoveCautiouslyTowardsTarget />
                </IfTime>
                <MoveConfidentallyTowardsTarget />
            </Selector>
        </Sequence>
    </Root>
</BehaviorTree>
```

### Events<a name="ai-scripting-mbt-cpp-events"></a>

Communication with AI agents is done using AI signals, which essentially are named text messages\. Signals such as OnBulletRain and OnEnemySeen communicate a particular event, which, when broadcast to other AI agents, can be reacted to based on each AI agent's behavior tree\. This design allows AI behavior to remain only loose coupled with AI signals\. AI Signals are picked up and converted to MBT events, then dispatched to the root node, which passes them along down the running nodes in the tree\.

```
<Sequence>
    <WaitForEvent name=”OnEnemySeen” />
    <Communicate name=”ThereHeIs” />
</Sequence>
```

## Debugging and Tree Visualization<a name="ai-scripting-mbt-debugging-tree-visualization"></a>

This section provides help with debugging behavior trees by providing a tree visualization view during debugging\. This view allows you to track an AI agent's progress through the tree as the game progresses\.

### "Slashing" Agents<a name="ai-scripting-mbt-debugging-tree-visualization-slashing"></a>

This feature allows you to view the behavior tree for a specific AI agent in DebugDraw\. To enable this feature:

1. Set ai\_DebugDraw to 0 or 1 \(default is \-1\)\.

1. Select the AI agent you want to view a behavior tree for:
   + Place the selected AI agent in the center of the camera view and press the numpad "/" key\.
   + Call "ai\_DebugAgent closest" to select the agent closest to the camera\.
   + Call "ai\_DebugAgent centerview" to select the agent closest to the center of the camera view \(same as slash\)\.
   + Call "ai\_DebugAgent <AgentName>" to select a specific agent by its name\.
   + Call "ai\_DebugAgent" without a parameter to remove the tree visualization\.

The tree visualization displays the AI agent's name at the top of the screen and identifies the agent on the screen with a small green dot\. Tree nodes are displayed and color coded as follows, with line numbers from the XML file shown on the left\.
+ White – nodes with custom data
+ Blue – leaf nodes, which often carry special weight when debugging
+ Gray – all other nodes

### Adding Custom Debug Text<a name="ai-scripting-mbt-debugging-tree-visualization-text"></a>

Tree visualization supports custom node information\. This allows you to get a more in\-depth view of the currently running parts of a behavior tree\. For example, you can see the name of the event that the `WaitForEvent` node is waiting for, or how much longer `Timeout` is going to run before it times out\.

To use this feature, override `GetDebugTextForVisualizer`, as follows\.

```
#ifdef STORE_INFORMATION_FOR_BEHAVIOR_TREE_VISUALIZER
virtual void GetDebugTextForVisualizer(
        const UpdateContext& updateContext,
        stack_string& debugText) const
{
    debugText.Format("Speed %f", m_speed);
}
#endif
```

### Logging and Tracing<a name="ai-scripting-mbt-debugging-tree-visualization-logging"></a>

Tracing log messages is a critical tool for diagnosing problems\. Lumberyard provides native support for logging, as shown in the following code snippet\. 

```
<Sequence>
    <QueryTPS name="CoverFromTarget" _startLog="Finding cover" _failureLog="Failed to find cover" />
    <Move to="Cover" _startLog="Advancing" _failureLog="Failed to advance" _successLog="Advanced" />
</Sequence>
```

\(The reserved attributes \_startLog, \_successLog, and \_failureLog are automatically read in\.\)

Log messages are routed through an object deriving from the `BehaviorTree::ILogRouter` interface\. This allows you to determine where the logging messages end up\. For example, one option would be to route the info to a personal log and store a short history of log messages for each AI agent; with this approach, log messages can be displayed when debugging as part of an AI agent's tree visualization\.

The AI Recorder also retains all log messages; use this tool to explore sequences of events\.

### Compiling with Debug Information<a name="ai-scripting-mbt-debugging-tree-visualization-compiling"></a>

To compile a game with debug information, you need to define DEBUG\_MODULAR\_BEHAVIOR\_TREE\.

```
#if !defined(_RELEASE) && (defined(WIN32) || defined(WIN64))
# define DEBUG_MODULAR_BEHAVIOR_TREE
#endif
```

### Viewing Completed Trees<a name="ai-scripting-mbt-debugging-tree-visualization-completed-trees"></a>

When a behavior tree finishes executing—either by failing or succeeding all the way through the root node, a notification is displayed in the console window along with a list of recently visited nodes and their line numbers\.

**\[Error\] Modular Behavior Tree: The root node for entity 'HumanSoldier' FAILED\. Rebooting the tree next frame\. \(124\) Move\. \(122\) Selector\. \(121\) Sequence\.**

Note that in the example above the tree will be rebooted in the next frame\. This suggests that the behavior tree was not designed to handle a failure at this point\.

## Recommended Naming Practices<a name="ai-scripting-mbt-naming"></a>

The following suggestions help streamline code clarity and communication in a development team\.

### Naming Nodes<a name="ai-scripting-mbt-naming-nodes"></a>

For action nodes, use names that identify the action the node will perform\. These are usually action verbs\.

**Good**
+ Loop
+ Animate
+ LimitConcurrentUsers
+ ExecuteLua
+ Shoot
+ AdjustCoverStance

**Bad**
+ Fast
+ PathPredictor
+ Banana
+ Script
+ ActivationProcess

### Naming Timestamps<a name="ai-scripting-mbt-naming-timestamps"></a>

Name timestamps based on the event they’re related to\. Because timestamps describe an event that has already happened, use the past tense \(TargetSpotted, not TargetSpots\)\.
+  TargetSpotted
+ ReceivedDamage
+  GroupMemberDied