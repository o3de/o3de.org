---
description: ' Use visual debugging on destruction simulations in Open 3D Engine with NVIDIA
  Blast. '
title: NVIDIA Blast visual debugger
weight: 700
draft: true
---


 To use the visual debugger for NVIDIA Blast, enable the `BLAST_DEBUG` console variable.

**To enable the variable**

1. In the editor console, enter **BLAST\_DEBUG 1**.

1. Click in **Perspective** to make the viewport active.

1. Press the **F3** key to set the view to wireframe.

1. Press **Ctrl+P** to run the simulation and view the debugger.

1. Press **Ctrl+P** to exit the simulation.

In the below example, as the rabbit drops, the bonds between the fractured chunks are shown as green lines. On impact, the bonds change to orange as they weaken and red when they break.

![Debug visualization for NVIDIA Blast.](/images/user-guide/physx/blast/anim-nvidia-blast-debug.gif)
