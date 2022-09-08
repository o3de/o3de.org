---
description: ' Simulating a ragdoll in the Open 3D Engine Editor. '
title: Simulating a Ragdoll in the Editor
weight: 300
---

Once you've created your ragdoll and animation graph, you can simulate the ragdoll in game mode in **O3DE Editor**.

**To simulate your ragdoll**

1. In O3DE Editor, right-click the viewport and choose **Create entity**.

1. In the **Entity Inspector**, for **Name**, enter **Ragdoll**.

1. Add an **Actor** component:

   1. Click **Add Component**, **Actor**.

   1. In the **Actor** component, for **Actor asset**, click the browse (**...**) button.

   1. In the **Pick EMotion FX Actor** window, select the actor for which you set up the ragdoll and then click **OK**.

   ![Select the actor for which you set up the ragdoll from the Pick EMotion FX Actor window in the Animation Editor](/images/user-guide/actor-animation/ragdoll-simulation-pick-ragdoll-actor.png)

1. Add an **Anim Graph** component:

   1. Click **Add Component**, **Anim Graph**.

   1. In the **Anim Graph** component, for **Motion set asset**, click the browse (**...**) button.

   1. In the **Pick EMotion FX Motion Set** window, select your motion set and then click **OK**.

      ![Select a motion set from the Pick EMotion FX Motion Set window in the Animation Editor](/images/user-guide/actor-animation/ragdoll-simulation-pick-motion-set.png)

   1. In the **Anim Graph** component, for **Anim graph**, click the browse (**...**) button.

   1. In the **Pick EMotion FX Anim Graph** window, select your animation graph and then click **OK**.

      ![Select an animation graph from the Pick EMotion FX Anim Graph window in the Animation Editor](/images/user-guide/actor-animation/ragdoll-simulation-pick-animation-graph.png)

1. Click **Add Component**, **PhysX Ragdoll**.

1. To start the level and simulate your ragdoll, press **Ctrl+G**.