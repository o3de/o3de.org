# Standard MBT Nodes<a name="ai-mbt-nodes-standard"></a>

The following standard Modular Behavior Tree nodes are supported\. These nodes can be found at `Code\CryEngine\CryCommon\BehaviorTree\`\.

## Loop node<a name="ai-mbt-nodes-generic-loop"></a>

The Loop node runs one child multiple times or until the child fails to run\. If the count is not specified, it is considered infinite\.

**Parameters**
+ **count **: The maximum number of times a child of the Loop node is run

**Behavior**
+ **Success**: If the count is reached for the child
+ **Failure**: If the child fails to run

**Example**

```
<Loop count="3">
 <SomeChildNode />
</Loop>
```

## LoopUntilSuccess node<a name="ai-mbt-nodes-generic-loopuntilsuccess"></a>

The LoopUntilSuccess node runs one child until it succeeds\. A maximum number of attempts can be specified\. If no maximum number of attempts is specified or if it's set to less than or equal to 0 then the node will attempt to run the child repeatedly until the child succeeds\.

**Parameters**
+ **attemptCount**: The maximum amount of possible attempts to make the child succeeding\.

**Behavior**
+ **Success**: If the child succeeds
+ **Failure**: If the maximum amount of allowed attempts is reached\.

**Example**

```
<LoopUntilSuccess attemptCount="5">
 <SomeChildNode />
</LoopUntilSuccess>
```

## Parallel node<a name="ai-mbt-nodes-generic-parallel"></a>

The Parallel node run its children in parallel\. A maximum of 32 children are allowed\. If success and failure limits are reached at the same time, the node will succeed\.

**Parameters**
+ **failureMode **: The mode used to evaluate when the node fails\. Accepted values are any or all\. Default value = any\.
+ **successMode**: The mode used to evaluate when the node succeeds\. Accepted values are any or all\. Default value = all\. 

**Behavior**
+ **Success**: If any or all children succeed\.
+ **Failure**: If any or all children fail\.

**Example**

```
<Parallel successMode="any" failureMode="all">
 <SomeChildNode1 />
 <SomeChildNode2 />
 <SomeChildNode3 />
</Parallel>
```

## Selector node<a name="ai-mbt-nodes-generic-selector"></a>

The Selector node runs its children one at a time, stopping at the first one that succeeds\.

**Parameters**

No parameters

**Behavior**
+ **Success**: As soon as one of the children succeed\. The remaining children are not run
+ **Failure**: If all children fail\.

**Example**

```
<Selector>
 <SomeChildNode1 />
 <SomeChildNode2ToExecuteIfSomeChildNode1Fails />
 <SomeChildNode3ToExecuteIfSomeChildNode2Fails />
</Selector>
```

## Sequence node<a name="ai-mbt-nodes-generic-sequence"></a>

The Sequence node runs its children one at a time in order\. A maximum of 255 children are allowed\.

**Parameters**

No parameters

**Behavior**
+ **Success**: If all children succeed\.
+ **Failure**: If any children fail

**Example**

```
<Sequence>
 <SomeChildNode1 />
 <SomeChildNode2 />
 <SomeChildNode3 />
</Sequence>
```

## StateMachine node<a name="ai-mbt-nodes-generic-statemachine"></a>

The StateMachine is a composite node allowed to have one or more children\. The children of a StateMachine node must be of the type State\. 

Only one child at any given time is allowed to be run and the first one defined is the first one to be run\.

The current status of a StateMachine node is the same as that of the child that is currently selected to be run\.

**Parameters**

None

**Behavior**
+ **Success**: If the child State node succeeds 
+ **Failure**: If the child State node fails

**Example**

```
<StateMachine>
 <State />
 <State name="State1" />
 <State name="State2" />
</StateMachine>
```

## StateMachine:State node<a name="ai-mbt-nodes-generic-state"></a>

The State node is the basic block of a StateMachine node\. Each State node must have a BehaviorTree node and may also have a Transitions block\.

A State node runs the content of its BehaviorTree node and can transition to another state \(or itself\) as specified in the Transitions block\.

If a State node transitions into itself while running, it will first be terminated, re\-initialized, and then updated again\.

**Parameters**
+ **name **: The name of the state\. It must be unique for the scope of the StateMachine node\. 

**Behavior**
+ **Success**: If the BehaviorTree node succeeds
+ **Failure**: If the BehaviorTree node fails

**Example**

```
<State name="StateName">
 <Transitions>
  <Transition onEvent="EventOrTransitionSignalName" to="OtherStateName" />
 </Transitions>
 <BehaviorTree>
  <SomeChildNode />
 </BehaviorTree>
</State>
```

The `Transitions` tag must have the following parameters:
+ `onEvent`: Identifies the string name of the event that could cause the transition to happen
+ `to`: Identifies the state name where transitioning to

## SuppressFailure node<a name="ai-mbt-nodes-generic-suppressfailure"></a>

The SuppressFailure node owns and runs one child\. It will succeed irregardless of the result of the child's execution\.

**Parameters**

None

**Behavior**
+ **Success**: As soon as the child finishes\.

**Example**

```
<SuppressFailure>
 <SomeChildThatCanFail />
</SuppressFailure>
```

## Timeout node<a name="ai-mbt-nodes-generic-timeout"></a>

The Timeout node fails after a certain amount of time has passed\.

**Parameters**
+ **duration **: Number of seconds before the failure of the node occurs

**Behavior**
+ **Failure**: if it runs for more than the amount of time specified by the duration parameter

**Example**

```
<Timeout duration=5" />
```

## Wait node<a name="ai-mbt-nodes-generic-wait"></a>

The Wait node succeeds after a certain amount of time has passed\.

**Parameters**
+ **duration **: The amount of seconds before the failure of the node occurs
+ **variation**: The extra amount of time that will be added on top of the specified duration\. This allows random variations between different executions of the node

**Behavior**
+ **Success**: As soon as it runs for more than the amount of time specified by the duration parameter plus the random variation

**Example**

```
<Wait duration="5" variation="1" />
```