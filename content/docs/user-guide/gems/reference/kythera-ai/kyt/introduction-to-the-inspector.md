---
linkTitle: The Inspector
title: Introduction the the Kythera AI Inspector
description: Overview of the browser-based debugger and behavior tree authoring tool, the Kythera AI Inspector
weight: 700
---

**The Inspector** is the primary tool for configuring and debugging Kythera AI. It allows you to configure aspects of Kythera and monitor the state of the AIs as the game is running.

To use the Inspector:

*   Start the editor, launcher or server
*   Point your web browser (we recommend Chrome) at [http://localhost:8081/](http://localhost:8081/)

Live View
=========

The **Live** tab allows you to look at the state of currently running AI. It has two subtabs, one for examining the contents of the AI blackboards and the other for viewing individual AI behavior trees as they are executing.

Blackboards
-----------

In the **Blackboards** subtab you can examine the entity state tree for any AI currently active. If you open up the tree for a particular AI (e.g. KytheraTest1), you are looking at the **Entity State Tree** for that AI, which is the blackboard tree representing its current state. Some specific sub-blackboards of interest:

*   Debugging blackboard allows for various debugging options to be turned on specifically for this entity
*   Go into BehaviorState to see any values that have been written to the behavior blackboard for this behavior since it started running

  
![](/images/user-guide/gems/kythera-ai/introduction-to-inspector-live-view.png)

Behavior Tree Debugger
----------------------

In the **Behavior Trees** subtab, you can view the currently running behavior tree of any AI and see its current state updated live in Inspector. Choose the desired AI from the dropdown list. If you press the Live button, you will see the tree updated in real time. Press again to stop.  
![](/images/user-guide/gems/kythera-ai/introduction-to-inspector-debugger.png)

BT Editor
=========

The other major tool that is part of the Inspector is the [Behavior Tree editor](Behavior-Tree-Editor.md). Using this tool you can create new BTs and quickly and easily edit existing ones.
