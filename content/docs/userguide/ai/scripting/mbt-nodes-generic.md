---
description: ' See the following generic nodes for the AI system in Amazon Lumberyard. '
title: Generic Nodes
---
# Generic Nodes {#ai-scripting-mbt-nodes-generic}

These nodes provide the basic functionality of MBT\.

## Loop {#ai-scripting-mbt-nodes-generic-loop}

 Executes a single child node a specified number of times or until the child fails its execution\.

### Parameters {#ai-scripting-mbt-nodes-generic-loop-parameters}

**count**
Maximum number of times the child node will be executed\. If left blank, it is assumed to be infinite and the node will continue running until failure\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-loop-success}

The node SUCCEEDS if the maximum number of repetitions is reached\. The node FAILS if execution of the child node FAILS\.

### Example {#ai-scripting-mbt-nodes-generic-loop-example}

```
<Loop count="3">
    <SomeChildNode />
</Loop>
```

## LoopUntilSuccess {#ai-scripting-mbt-nodes-generic-loopuntilsuccess}

Executes a child node a specified number of times or until the child node succeeds its execution\.

### Parameters {#ai-scripting-mbt-nodes-generic-loopuntilsuccess-parameters}

**attemptCount**
Maximum number of times the child node will be executed\. If left blank or set to <=0, it is assumed to be infinite and the node will continue running until success\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-loopuntilsuccess-success}

The node SUCCEEDS if the child SUCCEEDS\. The node FAILS if the maximum amount of allowed attempts is reached\.

### Example {#ai-scripting-mbt-nodes-generic-loopuntilsuccess-example}

```
<LoopUntilSuccess attemptCount="5">
    <SomeChildNode />
</LoopUntilSuccess>
```

## Parallel {#ai-scripting-mbt-nodes-generic-parallel}

Executes its child nodes in parallel\.

**Note**
A maximum number of 32 child nodes is allowed\.
When success and failure limits are reached at the same time, the node will succeed\.

### Parameters {#ai-scripting-mbt-nodes-generic-parallel-parameters}

**failureMode**
Method to use to evaluate when the node fails\. Acceptable values include "any" or "all"\. Default: "any"\.

**successMode**
Method to use to evaluate when the node succeeds\. Acceptable values include "any" or "all"\. Default: "all"\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-parallel-success}

When `successMode` is set to "all", the node SUCCEEDS if all the child nodes SUCCEEDS\.

 When `successMode` is set to "any", the node SUCCEEDS if any of the child nodes SUCCEED\.

 When `failureMode` is set to "any", the node FAILS if any of the child nodes FAILS\.

 When `failureMode` is set to "all", the node FAILS if all of the child nodes FAIL\.

### Example {#ai-scripting-mbt-nodes-generic-parallel-example}

```
<Parallel successMode="any" failureMode="all">
    <SomeChildNode1 />
    <SomeChildNode2 />
    <SomeChildNode3 />
</Parallel>
```

## Selector {#ai-scripting-mbt-nodes-generic-selector}

 Executes its child nodes consecutively, one at a time, stopping at the first one that succeeds\.

### Parameters {#ai-scripting-mbt-nodes-generic-selector-parameters}

None\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-selector-success}

The node executes the child nodes in sequential order and SUCCEEDS as soon as one of the child SUCCEEDS\. Once the node succeeds, the child nodes that follow are not executed\. The node FAILS if all the child nodes FAIL\.

### Example {#ai-scripting-mbt-nodes-generic-selector-example}

```
<Selector>
    <SomeChildNode1 />
    <SomeChildNode2ToExecuteIfSomeChildNode1Fails />
    <SomeChildNode3ToExecuteIfSomeChildNode2Fails />
</Selector>
```

## Sequence {#ai-scripting-mbt-nodes-generic-sequence}

Executes its child nodes one at a time in order\.

**Note**
A maximum of 255 child nodes is allowed\.

### Parameters {#ai-scripting-mbt-nodes-generic-sequence-parameters}

None\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-sequence-success}

The node SUCCEEDS if all the child nodes SUCCEED\. The node FAILS if any of the child nodes FAILS\.

### Example {#ai-scripting-mbt-nodes-generic-sequence-example}

```
<Sequence>
    <SomeChildNode1 />
    <SomeChildNode2 />
    <SomeChildNode3 />
</Sequence>
```

## StateMachine {#ai-scripting-mbt-nodes-generic-statemachine}

Executes child nodes of type `State` one at a time\. The first child node defined is the first to be executed\. The current status of a StateMachine node is the same as that of the child that is currently being executed\.

### Parameters {#ai-scripting-mbt-nodes-generic-statemachine-parameters}

None\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-statemachine-success}

The node SUCCEEDS if the current State child node SUCCEEDS\. The node FAILS if the current State child node FAILS\.

### Example {#ai-scripting-mbt-nodes-generic-statemachine-example}

```
<StateMachine>
    <State />
    <State name="State1" />
    <State name="State2" />
</StateMachine>
```

## State & Transitions {#ai-scripting-mbt-nodes-generic-state}

Executes the content of its BehaviorTree node\. This node can transition to another state \(or itself\)\. If a State node is instructed to transition into itself while running, it will first be terminated, re\-initialized, and then updated again\.

A State node has the following characteristics:
+ Is a basic block of a StateMachine node\.
+ MUST have a BehaviorTree node\.
+ MAY have a Transitions element\.

**Transitions**
Transitions elements are described inside a State node, and can contain the definitions of as many transitions as are needed\. The transitions elements are not MBT nodes\. If a transition specifies a destination state that doesn't exist, an error message will be displayed when parsing the MBT node\.

### Parameters {#ai-scripting-mbt-nodes-generic-state-parameters}

`<State />` elements must include the following parameters:

**name**
Name of the state\. It must be unique within the scope of the StateMachine it is in\.

`<Transition />` elements must include the following parameters:

**onEvent**
Name of the event that may cause the transition to happen\. These events are of type AISignal\.

**to**
Name of the state to transition to\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-state-success}

The node SUCCEEDS if the content of the BehaviorTree node SUCCEEDS\.

The node FAILS if the content of the BehaviorTree node FAILS\.

### Example {#ai-scripting-mbt-nodes-generic-state-example}

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

## SuppressFailure {#ai-scripting-mbt-nodes-generic-suppressfailure}

Owns and executes one child node\. This node will succeed regardless of whether the child node succeeds\.

### Parameters {#ai-scripting-mbt-nodes-generic-suppressfailure-parameters}

None\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-suppressfailure-success}

The node always SUCCEEDS once the child node has been executed\.

### Example {#ai-scripting-mbt-nodes-generic-suppressfailure-example}

```
<SuppressFailure>
    <SomeChildThatCanFail />
</SuppressFailure>
```

## Timeout {#ai-scripting-mbt-nodes-generic-timeout}

Fails once a certain amount of time has passed\.

### Parameters {#ai-scripting-mbt-nodes-generic-timeout-parameters}

**duration**
Amount of time \(in seconds\) before failure occurs\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-timeout-success}

The node FAILS if it runs for more than the amount of time specified in the `duration` parameter\.

### Example {#ai-scripting-mbt-nodes-generic-timeout-example}

```
<Timeout duration=5" />
```

## Wait {#ai-scripting-mbt-nodes-generic-wait}

Succeeds once a certain amount of time has passed\.

### Parameters {#ai-scripting-mbt-nodes-generic-wait-parameters}

**duration**
Amount of time \(in seconds\) before the request succeeds\.

**variation**
Maximum additional amount of time that may be randomly added to the value of `duration`, in the range \[0, `variation`\]\. Setting this value causes the wait time to have random variations between different executions of the node\.

### Success/Failure {#ai-scripting-mbt-nodes-generic-wait-success}

The node SUCCEEDS once it has run the duration specified \(plus random variation\)\.

### Example {#ai-scripting-mbt-nodes-generic-wait-example}

```
<Wait duration="5" variation="1" />
```