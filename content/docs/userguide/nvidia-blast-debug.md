description: ' Use visual debugging on destruction simulations in &ALYlong; with NVIDIA
  Blast. '
slug: nvidia-blast-debug
title: NVIDIA Blast visual debugger
---
# NVIDIA Blast visual debugger<a name="nvidia-blast-debug"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

 To use the visual debugger for NVIDIA Blast, enable the `BLAST_DEBUG` console variable\. 

**To enable the variable**

1. In the editor console, enter **BLAST\_DEBUG 1**\. 

1. Click in **Perspective** to make the viewport active\. 

1. Press the **F3** key to set the view to wireframe\. 

1. Press **Control \+ P** to run the simulation and view the debugger\.

1. Press **Control \+ P** to exit the simulation\.

In the below example, as the rabbit drops, the bonds between the fractured chunks are shown as green lines\. On impact, the bonds change to orange as they weaken and red when they break\. 

![\[Debug visualization for NVIDIA Blast.\]](/images/physx/blast/anim-nvidia-blast-debug.gif)