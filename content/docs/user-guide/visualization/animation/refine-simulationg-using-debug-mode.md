---
description: ' Use debug mode to refine the simulated object''s movement in Open 3D Engine. '
title: 'Using Debug Mode to Refine the Simulation '
---

In the following procedure, use the debug mode to refine the simulated object's movement.

**To use debug mode for the simulation**

1. In the **Anim Graph** panel, click the play icon to run the anim graph.

    Use the speed slider to reduce the speed of the animation. Note that the tassel moves through the neck and arm of the actor.

    ![Slow down the animation to see how the simulated object moves with the actor.](/images/user-guide/actor-animation/simulated-objects-21.gif)

1. In the **SimulatedObject0** node, click the right-corner box. This enables debug rendering for the node.

    ![Enable debug mode for the simulated object in the anim graph.](/images/user-guide/actor-animation/simulated-objects-19.gif)

1. In debug mode, you can do the following.

    1. To turn off the simulated object colliders, click the ![Image NOT FOUND](/images/user-guide/actor-animation/simulated-objects-20.png) icon.

    1. To turn off joint collision radius, click the ![Image NOT FOUND](/images/user-guide/actor-animation/simulated-objects-5.png) icon.

    In debug mode, the following appear in the render window:

    + Simulated object colliders - The colliders that the simulated object collides with. The colliders appear in light gray.

    + Joint angle limit cones - The angle of a joint that simulates. The cones appear in light pink.

    + Joint collision radius - The size of the collision radius on a joint. The radius appears in dark gray.

    In the render window, you can click the first icon to toggle the actor geometry and see only simulated objects.

    ![Use the render window to preview how the a tassel moves and collides with the joint colliders.](/images/user-guide/actor-animation/simulated-objects-22.gif)

1. To fix the simulated object (tassel) movement, do the following.

    1. In the **Simulated Object** panel, select `L_tassle_02_JNT`.

    1. In the **Simulated Object Inspector**, select Pinned`. This pins the second part of the tassel and prevents it from moving.

    1. For **Joint angle limit**, enter `80` to increase the swing of the joint.

    1. In the **Simulated Object** panel, select `L_tassle_03_JNT`.

    1. In the **Simulated Object Inspector**, for **Radius**, enter `0.065`.

1. To fix the simulated joint colliders (chest and arm of the actor), do the following.

    1. In the **Skeleton Outliner** panel, select the `C_spine_04_JNT` where you added the simulated joint collider.

    1. In the **Simulated Object Inspector**, for **Radius**, enter `0.172`.

    1. In the **Skeleton Outliner** panel, select the `L_arm_JNT` where you added the simulated joint collider.

    1. In the **Simulated Object Inspector**, for **Radius**, enter `0.101`.

1. If you're satisfied with the results, save the actor.

1. To disable debugging mode, click the upper-right box again on the **SimulatedObject0** node.

    The following animation is the finished debugged version of the actor running. Note that the tassel no longer passes through the actor's body.

    ![View the final animation of the actor and the simulated object.](/images/shared/simulated-objects-23.gif)
    