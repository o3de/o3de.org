---
description: ' See the following &cryaction; nodes in &ALYlong;. '
title: '&cryaction; Nodes'
---
# CryAction Nodes {#ai-scripting-mbt-nodes-cryaction}

These nodes provide MBT functionality for CryAction features\.

## AnimateFragment {#ai-scripting-mbt-nodes-cryaction-animatefragment}

Plays a Mannequin animation fragment and waits until the animation finishes\.

### Parameters {#ai-scripting-mbt-nodes-cryaction-animatefragment-parameters}

**name**
Name of the animation to play\.

### Success/Failure {#ai-scripting-mbt-nodes-cryaction-animatefragment-success}

The node SUCCEEDS if the animation is correctly played or if no operation was needed\. The node FAILS if an error occurs while trying to queue the animation request\.

### Example {#ai-scripting-mbt-nodes-cryaction-animatefragment-example}

```
<AnimateFragment name="SomeFragmentName" />
```