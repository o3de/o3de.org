---
description: ' Learn about the AI Modular Behavior Tree (MBT) in &ALYlong;. '
slug: ai-mbt-intro
title: AI Modular Behavior Tree
---
# AI Modular Behavior Tree<a name="ai-mbt-intro"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The Modular Behavior Tree \(MBT\) is a collection of XML\-based nodes that describe rules, behaviors, and tasks for AI agents to follow\. 

AI signals are sent either from the MBT itself using the Signal node or from code\. A signal sets a tree variable to true or false when it is triggered\. Tree variables can then be used to make decisions in the tree\. Timestamps are set when an AI signal comes in, and can be used to check how long ago something happened\.

An example tree structure is shown here:

```
<BehaviorTree>
    <Root>
        <Sequence>
            <Log message="Test" />
            <WaitForEvent name="OnEnemySeen" />
            <Move to="Target" speed="Walk" stance="Stand" fireMode="BurstWhileMoving" />
            <Halt />
        </Sequence>
    </Root>
</BehaviorTree>
```

Each node can have parameters to configure the behavior of its execution\. When passing an unacceptable value the parsing of the node could fail and an error message could be found inside the `Editor.log` or `Game.log` files\.

**Topics**
+ [Standard MBT Nodes](ai-mbt-nodes-standard.md)
+ [Common AI MBT Nodes](ai-mbt-nodes-common.md)
+ [Game AI Modular Behavior Tree \(MBT\) Nodes](ai-mbt-nodes-game.md)
+ [Helicopter AI MBT Nodes](ai-mbt-nodes-flying.md)