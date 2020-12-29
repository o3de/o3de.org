# Animation Editor Concepts and Terms<a name="char-animation-editor-concepts-and-terms"></a>

The following concepts and terms are used in the **Animation Editor**:

**Topics**
+ [About Animation Graphs](#understanding-animation-graphs)
+ [About Parameters](#animation-graph-parameters)
+ [About Motion Sets](#understanding-motion-sets)
+ [About State Machines](#understanding-state-machines)

**Actor**  
A character with at least one bone is called an *actor*\. An actor consists of a set of nodes in a hierarchy\. Each node is a transformation \(position, rotation, and scale\) and can contain a mesh\.  
Instances of actors are called *actor instances*\. For example, one soldier that is instanced 100 times can create an army of the same character\. You can animate actor instances separately, so that each instance behaves differently\. Each actor instance has unique transformations, but shares the same hierarchy as the actor from which it was instanced\.   
Actor files have the `.actor` extension \(for example, `hero.actor`\)\.

**Motions**  
Motions are individual animation clips, such as walk loop, an idle motion, and so on\. Motions contain transformation animation and/or morph target weight animation\. A motion can contain animation data for the skeletal structure and the morph targets\.   
Motion files have the `.motion` extension \(for example, `Walk.motion`\)\.

**Animation graphs**  
Animation networks are called animation graphs\. Animation graphs contain the state machines, transitions, conditions, blend trees, and other nodes\. Animation graphs are hierarchical\.  
Animation graph files have the \.`animgraph` extension \(for example, `Main.animgraph`\)\.

**Motion sets**  
A motion set contains a list of motions, where each motion has a unique string ID \(for example, `walk`, `idle`, and so on\)\. Nodes inside an animation graph can reference motions based on their string ID\.   
Motion sets can be hierarchical\. A child set can override specific motions for a character, while sharing the rest of the motions with the parent set\.   
Motion set files have the `.motionset` extension \(for example, `MainSet.motionset`\)\.

**Motion events**  
Markings at specific time values inside the motion files are called *motion events* \(also called notifiers or notifications\)\. A motion event has a type string \(for example, "SOUND"\) and parameter string \(for example, "Footstep"\)\.   
Motion events can have a fixed time value or range\. Events with a single time value are called *tick events*\. Events with specified start and end times are called *ranged events*\.  
You can specify event presets, which are pre\-setup types of events that you drag and drop into the event tracks\. An *event track* is a group of events that you enable or disable\. For example, you can add all sound effects to an event track specifically for sounds\.   
Motion event data is stored in the motion FBX's `.assetinfo` file\.

**Synchronization**  
You can use *full clip\-base sync* or *sync tracks * to synchronize motion clips to keep a character's motions in sync while blending\. For example, if your character is running, synchronization helps keep the right and left feet in sync\.  
Full clip\-based sync warps the motions so that there is a constant change in playback time of the child motion\.  
Sync tracks use motion events, where the events mark specific moments \(for example, where the right and left feet are on the floor\)\. This system is also known as phase matching and dynamically controls the playback speed\. 

**Floats**  
Floats are numbers with decimals \(for example 1\.35 or 1\.0\.\) Booleans and integers are also floats, so they can be passed as weight float inputs to blending nodes\. If floats are rounded, the **Animation Editor** always rounds them down\. For example, 2\.99 becomes 2\.

**Time**  
All time values and durations are in seconds\. For example, you can set the transition time for 0\.3 or 300 ms\. 

## About Animation Graphs<a name="understanding-animation-graphs"></a>

**Contents**
+ [Animation Graph Nodes](#animation-graph-nodes)

Animation graphs define the animation behavior for your game characters\. Animation graphs contain the states that the character can have and define the transitions between these states\. Each transition can have a set of conditions that define the logic behind the transitions\. 

Animation graphs contain nodes and the connections between them\. These connections define how data is passed between the nodes or how transitions occur between nodes\.

Animation graphs have two main node types: 
+ State machines
+ Blend trees

Because animation graphs are hierarchical, the nodes can be nested\. For example, you can have a state machine inside a state machine inside a blend tree, which contains another blend tree and state machine, and so on\. The number of hierarchy levels is limitless, but as a best practice limit your hierarchy to 20 levels or fewer\. 

Each animation graph has one root node, which is a state machine\. This root node is the default and cannot be deleted\. A simple animation graph can contain one state inside this root state machine\. For example, the single state can be a motion node, which outputs a pose that is applied to the character, such as an idle motion\.

Before you can add nodes to an animation graph, you must create a motion set\. After you create a motion set, you can create an animation graph and then assign the motion sets to the animation graph using the **Resource Management** pane in the **Anim Graph** window\.

### Animation Graph Nodes<a name="animation-graph-nodes"></a>

In a state machine, you can add the following nodes from the **Sources** category:
+ **Blend Tree**
+ **Entry**
+ **Exit Node**
+ **Hub**
+ **Motion**
+ **State Machine**
+ **Bind Pose**

In a blend tree, you can add other nodes from the following six categories

1. **Sources**
   + **Float Constant**
   + **Parameters**
   + **Blend Tree**
   + **Entry**
   + **Motion Frame**
   + **Exit Node**
   + **Motion**
   + **State Machine**
   + **Bind Pose**

1. **Blending**
   + **Pose Subtract**
   + **Morph Target**
   + **Pose Mask**
   + **Blend N**
   + **Blend Two \(Legacy\)** 
   + **Blend Space 2D**
   + **Blend Space 1D**
   + **Blend Two**

1. **Controllers**
   + **Transform**
   + **LookAt**
   + **TwoLink IK**
   + **AccumTransform**

1. **Logic**
   + **Pose Switch**
   + **Float Condition**
   + **Float Switch**
   + **Bool Logic**

1. **Math**
   + **Direction to Weight**
   + **Range Remapper**
   + **Vector3 Compose**
   + **Vector2 Compose**
   + **Vector4 Decompose**
   + **Vector4 Compose**
   + **Vector3 Math1**
   + **Vector3 Decompose**
   + **Smoothing**
   + **Float Math2**
   + **Vector2 Decompose**
   + **Vector3 Math2**
   + **Float Math1**

1. **Misc**
   + **Mirror Pose**

## About Parameters<a name="animation-graph-parameters"></a>

**Contents**
+ [Adding Parameters to an Animation Graph](#adding-parameters-to-an-animation-graph)
+ [Adding a Parameter Node to a Blend Tree](#adding-a-parameter-node-to-your-blend-tree)

When you create your animation graph, you can use parameters to control how your animations transition between different states\.

Each transition can have a set of conditions applied to it\. These conditions define the logical rules for the transition and how animations blend together\.

Each transition condition is controlled by a set of parameters\. Your Lumberyard game setup sends parameter values to the animation graph\. The actor reacts to the incoming parameters\. The game sends the parameter values to the animation graph, which then responds to the changes automatically\. For example, you can specify parameter values such as speed, direction, weapon type, and so on\.

You can set this up in a game level by adding an **Actor** and an **Animation** component to an entity with the **Entity Inspector**\.

For more information, see [Animation Editor Components](char-animation-editor-components.md)\.

### Adding Parameters to an Animation Graph<a name="adding-parameters-to-an-animation-graph"></a>

You can add parameters to an animation graph in the **Parameters** pane\.

**To add a parameter to an animation graph**

1. In Lumberyard Editor, choose **Tools**, **Animation Editor**\.

1. In the **Parameters** pane, click the green **\+** icon\.

1. In the **Create Parameter** dialog box, specify the parameter name, description, and the value type\.

   You can specify the following value types to provide input into animation graph nodes:
   + **Float \(slider\)**
   + **Float \(spin box\)**
   + **Boolean \(checkbox\)**
   + **Tag \(checkbox\)**
   + **Integer \(slider\)**
   + **Integer \(spin box\)**
   + **Vector2**
   + **Vector3**
   + **Vector3 gizmo**
   + **Vector4**
   + **String**
   + **Color**
   + **Rotation**
   + **Group**

You can name parameter types to identify the purpose of the control\. For example, you can name parameters such as `movement_speed`, `movement_direction`, `jumping` and `attacking`\. As an artist and game designer, you can specify the parameters that best control your animation graph\.

![\[Create parameters for an animation graph in the Animation Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-parameters-pane.png)

### Adding a Parameter Node to a Blend Tree<a name="adding-a-parameter-node-to-your-blend-tree"></a>

After you create your parameters in the **Parameter** pane, you can add a parameter node to your blend tree\.

**To add a parameter node to your blend tree**

1. In the **Animation Editor**, right\-click the animation graph grid and choose **Create Node**, **Sources**, **Parameters**\.

1. In the **Attributes** pane, click **select parameter** and specify the parameter that you want\.

![\[Select your parameter in your animation graph in the Animation Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-attributes-pane-02.png)

You can rename parameter nodes and specify them to provide input to other nodes\. In the following example, the **speed\_parameter** node provides input to the blend tree\.

![\[Use parameter nodes in the Animation Editor to specify parameter types and values for your animation graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/actor-animation/animation-editor-blend-tree.png)

## About Motion Sets<a name="understanding-motion-sets"></a>

A motion set is a collection of motions, where each motion refers to a specific motion file and is identified by a string ID, such as *idle\_motion1*\. When you create motion nodes, you specify the string ID for the motion, not the motion file itself\. You can use different motion sets in combination with the same animation graph\. For example, you can create an animation graph to define animation behavior for a controllable human character and apply the same animation graph to a frog\. Because frog movements differ from a human character's, you specify different motion sets for the frog\. You can share animation graphs for your characters; you don't need to create unique animation graphs for each character type\.

A combination of an animation graph with a specified motion set being applied to a given actor instance is called an *animation graph instance*\. Each animation graph instance has a unique set of parameter values\. For example, an army of 100 soldiers is controlled by 100 different animation graph instances, which allows you to animate each soldier independently\. 

Motion sets can also be hierarchical\. Child motion sets can override certain motions from their parents\. When you apply a child motion set to a character, the character uses all the motions shared by the parent except for the motions that are specified for the child motion set\. For example, you can have a character that shares 90% of the same motions of the parent, but has custom motions specific to that character\. 

## About State Machines<a name="understanding-state-machines"></a>

State machines contain a set of states that are linked together by transitions\. A transition goes from one node to another node and has properties, such as the time it takes to make the transition\. A blend between the outputs of both states is performed during the transition, when the animation moves from one state to another\. 

Transition conditions are conditions that are linked a given transition\. For example, they can compare a parameter value against another value to see if the given parameter is bigger than the specified value\. If the condition is met, this signals the trigger for the transition\. For example, if the speed parameter is greater than 0, a character transitions from an idle to a run state\. You can apply multiple conditions to a single transition\. The transition occurs only when all conditions are met\. 