---
linktitle: Interpreter
title: Script Canvas Interpreter
description: Learn how to use the Script Canvas Interpreter in embedded in the Script Canvas Editor in the Open 3D Engine (O3DE).
weight: 100
---

Script Canvas offers an interpreter interface that can be placed almost in almost any situation in the engine or the editor. The Script Canvas Editor itself makes use of it in the tools window.

![Script Canvas Interpreter Widget](/images/user-guide/scripting/script-canvas/script-canvas-interpreter-widget.png)

The Interpreter take a Scripts Canvas source file and allows the user to configure and execute it immediately. If the source file produces more than a single thread of execution that starts and stops immediately after "On Graph Start", the script will continue to execute indefinitely. The user can press the stop button or close the window to stop the widget from executing.

![Script Canvas Interpreter Widget](/images/user-guide/scripting/script-canvas/script-canvas-interpreter-widget-opened.png)

Note that many of the nodes, and much of the functionality available for Entities during the simulation, will not apply when the Interpreter executes. When references to 'Self' are detected, the interpreter will not run the graph.

