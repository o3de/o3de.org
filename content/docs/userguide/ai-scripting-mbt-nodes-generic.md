# Generic Nodes<a name="ai-scripting-mbt-nodes-generic"></a>

These nodes provide the basic functionality of MBT\.

## Loop<a name="ai-scripting-mbt-nodes-generic-loop"></a>

 Executes a single child node a specified number of times or until the child fails its execution\. 

### Parameters<a name="ai-scripting-mbt-nodes-generic-loop-parameters"></a>

**count**  
Maximum number of times the child node will be executed\. If left blank, it is assumed to be infinite and the node will continue running until failure\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-loop-success"></a>

The node SUCCEEDS if the maximum number of repetitions is reached\. The node FAILS if execution of the child node FAILS\.

### Example<a name="ai-scripting-mbt-nodes-generic-loop-example"></a>

```
<Loop count="3">
    <SomeChildNode />
</Loop>
```

## LoopUntilSuccess<a name="ai-scripting-mbt-nodes-generic-loopuntilsuccess"></a>

Executes a child node a specified number of times or until the child node succeeds its execution\. 

### Parameters<a name="ai-scripting-mbt-nodes-generic-loopuntilsuccess-parameters"></a>

**attemptCount**  
Maximum number of times the child node will be executed\. If left blank or set to <=0, it is assumed to be infinite and the node will continue running until success\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-loopuntilsuccess-success"></a>

The node SUCCEEDS if the child SUCCEEDS\. The node FAILS if the maximum amount of allowed attempts is reached\.

### Example<a name="ai-scripting-mbt-nodes-generic-loopuntilsuccess-example"></a>

```
<LoopUntilSuccess attemptCount="5">
    <SomeChildNode />
</LoopUntilSuccess>
```

## Parallel<a name="ai-scripting-mbt-nodes-generic-parallel"></a>

Executes its child nodes in parallel\.

**Note**  
A maximum number of 32 child nodes is allowed\.
When success and failure limits are reached at the same time, the node will succeed\.

### Parameters<a name="ai-scripting-mbt-nodes-generic-parallel-parameters"></a>

**failureMode**  
Method to use to evaluate when the node fails\. Acceptable values include "any" or "all"\. Default: "any"\.

**successMode**  
Method to use to evaluate when the node succeeds\. Acceptable values include "any" or "all"\. Default: "all"\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-parallel-success"></a>

When `successMode` is set to "all", the node SUCCEEDS if all the child nodes SUCCEEDS\.

 When `successMode` is set to "any", the node SUCCEEDS if any of the child nodes SUCCEED\.

 When `failureMode` is set to "any", the node FAILS if any of the child nodes FAILS\.

 When `failureMode` is set to "all", the node FAILS if all of the child nodes FAIL\.

### Example<a name="ai-scripting-mbt-nodes-generic-parallel-example"></a>

```
<Parallel successMode="any" failureMode="all">
    <SomeChildNode1 />
    <SomeChildNode2 />
    <SomeChildNode3 />
</Parallel>
```

## Selector<a name="ai-scripting-mbt-nodes-generic-selector"></a>

 Executes its child nodes consecutively, one at a time, stopping at the first one that succeeds\.

### Parameters<a name="ai-scripting-mbt-nodes-generic-selector-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-selector-success"></a>

The node executes the child nodes in sequential order and SUCCEEDS as soon as one of the child SUCCEEDS\. Once the node succeeds, the child nodes that follow are not executed\. The node FAILS if all the child nodes FAIL\.

### Example<a name="ai-scripting-mbt-nodes-generic-selector-example"></a>

```
<Selector>
    <SomeChildNode1 />
    <SomeChildNode2ToExecuteIfSomeChildNode1Fails />
    <SomeChildNode3ToExecuteIfSomeChildNode2Fails />
</Selector>
```

## Sequence<a name="ai-scripting-mbt-nodes-generic-sequence"></a>

Executes its child nodes one at a time in order\.

**Note**  
A maximum of 255 child nodes is allowed\.

### Parameters<a name="ai-scripting-mbt-nodes-generic-sequence-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-sequence-success"></a>

The node SUCCEEDS if all the child nodes SUCCEED\. The node FAILS if any of the child nodes FAILS\.

### Example<a name="ai-scripting-mbt-nodes-generic-sequence-example"></a>

```
<Sequence>
    <SomeChildNode1 />
    <SomeChildNode2 />
    <SomeChildNode3 />
</Sequence>
```

## StateMachine<a name="ai-scripting-mbt-nodes-generic-statemachine"></a>

Executes child nodes of type `State` one at a time\. The first child node defined is the first to be executed\. The current status of a StateMachine node is the same as that of the child that is currently being executed\.

### Parameters<a name="ai-scripting-mbt-nodes-generic-statemachine-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-statemachine-success"></a>

The node SUCCEEDS if the current State child node SUCCEEDS\. The node FAILS if the current State child node FAILS\.

### Example<a name="ai-scripting-mbt-nodes-generic-statemachine-example"></a>

```
<StateMachine>
    <State />
    <State name="State1" />
    <State name="State2" />
</StateMachine>
```

## State & Transitions<a name="ai-scripting-mbt-nodes-generic-state"></a>

Executes the content of its BehaviorTree node\. This node can transition to another state \(or itself\)\. If a State node is instructed to transition into itself while running, it will first be terminated, re\-initialized, and then updated again\.

A State node has the following characteristics:
+ Is a basic block of a StateMachine node\.
+ MUST have a BehaviorTree node\.
+ MAY have a Transitions element\.

**Transitions**  
Transitions elements are described inside a State node, and can contain the definitions of as many transitions as are needed\. The transitions elements are not MBT nodes\. If a transition specifies a destination state that doesn't exist, an error message will be displayed when parsing the MBT node\. 

### Parameters<a name="ai-scripting-mbt-nodes-generic-state-parameters"></a>

`<State />` elements must include the following parameters:

**name**  
Name of the state\. It must be unique within the scope of the StateMachine it is in\.

`<Transition />` elements must include the following parameters:

**onEvent**  
Name of the event that may cause the transition to happen\. These events are of type AISignal\.

**to**  
Name of the state to transition to\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-state-success"></a>

The node SUCCEEDS if the content of the BehaviorTree node SUCCEEDS\. 

The node FAILS if the content of the BehaviorTree node FAILS\.

### Example<a name="ai-scripting-mbt-nodes-generic-state-example"></a>

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

## SuppressFailure<a name="ai-scripting-mbt-nodes-generic-suppressfailure"></a>

Owns and executes one child node\. This node will succeed regardless of whether the child node succeeds\. 

### Parameters<a name="ai-scripting-mbt-nodes-generic-suppressfailure-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-suppressfailure-success"></a>

The node always SUCCEEDS once the child node has been executed\.

### Example<a name="ai-scripting-mbt-nodes-generic-suppressfailure-example"></a>

```
<SuppressFailure>
    <SomeChildThatCanFail />
</SuppressFailure>
```

## Timeout<a name="ai-scripting-mbt-nodes-generic-timeout"></a>

Fails once a certain amount of time has passed\.

### Parameters<a name="ai-scripting-mbt-nodes-generic-timeout-parameters"></a>

**duration**  
Amount of time \(in seconds\) before failure occurs\.

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-timeout-success"></a>

The node FAILS if it runs for more than the amount of time specified in the `duration` parameter\.

### Example<a name="ai-scripting-mbt-nodes-generic-timeout-example"></a>

```
<Timeout duration=5" />
```

## Wait<a name="ai-scripting-mbt-nodes-generic-wait"></a>

Succeeds once a certain amount of time has passed\.

### Parameters<a name="ai-scripting-mbt-nodes-generic-wait-parameters"></a>

**duration**  
Amount of time \(in seconds\) before the request succeeds\.

**variation**  
Maximum additional amount of time that may be randomly added to the value of `duration`, in the range \[0, `variation`\]\. Setting this value causes the wait time to have random variations between different executions of the node\. 

### Success/Failure<a name="ai-scripting-mbt-nodes-generic-wait-success"></a>

The node SUCCEEDS once it has run the duration specified \(plus random variation\)\. 

### Example<a name="ai-scripting-mbt-nodes-generic-wait-example"></a>

```
<Wait duration="5" variation="1" />
```