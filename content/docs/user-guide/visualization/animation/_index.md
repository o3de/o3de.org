---
linkTitle: Animation
description: ' Learn to animate characters in Open 3D Engine with EMotionFX Animation Editor. '
title: Animation Overview
---

Most game projects require an animated character to move around in the environment. This may be a character that the player controls, or an AI-driven entity that interacts with the level.

Use the **EMotion FX Animation Editor** to animate characters in Open 3D Engine. To build a character, you associate one or more skinned models with an animation skeleton (built in a digital content creation tool like Maya). You then import the character into the **Animation Editor** and specify the animations that you want your character to have.

You can then blend animations, so that your character transitions from one animation to another, and specify the conditions when an animation occurs for a character. For example, you can specify that your character starts in an idle position. After several seconds, the character starts to walk, run, and then slow down again until the character returns to an idle position.

In the **Animation Editor**, you can preview the animations and blends between the animations for your characters.

O3DE has the **FBX Settings** tool that converts static `.fbx` meshes, skeletons, skins, animations, and materials into O3DE assets. For more information, see [Customize FBX asset export with FBX Settings](/docs/user-guide/assets/scene-settings/).

**Topics**
+ [Setting up actor entities](actor-component-entity-setup)
+ [Using multiple skin attachments for an actor](actor-multiple-skin)
+ [Animation Editor Concepts and Terms](/docs/user-guide/visualization/animation/character-editor/concepts-and-terms/)
+ [Animation Editor User Interface](/docs/user-guide/visualization/animation/animation-editor/user-interface/)
+ [Animation Editor File Types](/docs/user-guide/visualization/animation/character-editor/file-types/)
+ [Getting Started with the Animation Editor](/docs/user-guide/visualization/animation/animation-editor/quick-start/)
+ [Referencing External Anim Graphs](/docs/user-guide/visualization/animation/referencing-character-animation-editor-anim-graph/)
+ [Synchronizing Animation Graphs: Example](/docs/user-guide/visualization/animation/character-editor/sync-graph/)
+ [Animation Editor Components](/docs/user-guide/visualization/animation/character-editor/components/)
+ [Using Morph Targets to Deform Characters](/docs/user-guide/visualization/animation/animation-editor/using-morph-targets-to-deform-characters/)
+ [Customizing State Machine Routing with Sparse Motion Sets](/docs/user-guide/visualization/animation/animation-editor/customizing-state-machines-with-sparse-motion-sets/)
+ [Animation Editor Nodes](/docs/user-guide/visualization/animation/animation-editor/node/)
+ [Using Tags with Animation Graphs](/docs/user-guide/visualization/animation/animation-editor/using-tags/)
+ [Customizing EMotion FX Objects](/docs/user-guide/visualization/animation/animation-editor/customizing-emotionfx-objects/)
+ [Creating Custom Motion Events and Parameters Using C++](/docs/user-guide/visualization/animation/character-editor/custom-events-parameters/)
+ [Creating and Simulating a PhysX Ragdoll](/docs/user-guide/visualization/animation/animation-editor/ragdoll/)
+ [Retargeting Motions](/docs/user-guide/visualization/animation/animation-editor/retargeting-animations/)
+ [Creating Simulated Objects](/docs/user-guide/visualization/animation/animation-editor/creating-simulated-objects/)
+ [Add Cloth Colliders to actors](/docs/user-guide/visualization/animation/character-editor/cloth-colliders/)
