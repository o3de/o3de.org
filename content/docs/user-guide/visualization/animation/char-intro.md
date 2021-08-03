---
description: ' Learn to animate characters in Open 3D Engine with EMotionFX Animation Editor. '
title: Create and animate characters
---

{{< preview-migrated >}}

Most game projects require an animated character to move around in the environment. This may be a character that the player controls, or an AI-driven entity that interacts with the level.

Use the **EMotion FX Animation Editor** to animate characters in Open 3D Engine. To build a character, you associate one or more skinned models with an animation skeleton (built in a digital content creation tool like Maya). You then import the character into the **Animation Editor** and specify the animations that you want your character to have.

You can then blend animations, so that your character transitions from one animation to another, and specify the conditions when an animation occurs for a character. For example, you can specify that your character starts in an idle position. After several seconds, the character starts to walk, run, and then slow down again until the character returns to an idle position.

In the **Animation Editor**, you can preview the animations and blends between the animations for your characters.

O3DE has the **FBX Settings** tool that converts static `.fbx` meshes, skeletons, skins, animations, and materials into O3DE assets. For more information, see [Customize FBX asset export with FBX Settings](/docs/user-guide/assets/fbx-settings/).

**Topics**
+ [Animation Editor Concepts and Terms](/docs/user-guide/visualization/animation/character-editor/concepts-and-terms.md)
+ [Animation Editor User Interface](/docs/user-guide/visualization/animation/animation-editor/user-interface.md)
+ [Animation Editor File Types](/docs/user-guide/visualization/animation/character-editor/file-types.md)
+ [Getting Started with the Animation Editor](/docs/user-guide/visualization/animation/animation-editor/quick-start.md)
+ [Referencing External Anim Graphs](/docs/user-guide/visualization/animation/referencing-character-animation-editor-anim-graph.md)
+ [Synchronizing Animation Graphs: Example](/docs/user-guide/visualization/animation/character-editor/sync-graph.md)
+ [Animation Editor Components](/docs/user-guide/visualization/animation/character-editor/components.md)
+ [Using Morph Targets to Deform Characters](/docs/user-guide/visualization/animation/animation-editor/using-morph-targets-to-deform-characters.md)
+ [Customizing State Machine Routing with Sparse Motion Sets](/docs/user-guide/visualization/animation/animation-editor/customizing-state-machines-with-sparse-motion-sets.md)
+ [Animation Editor Nodes](/docs/user-guide/visualization/animation/animation-editor/node.md)
+ [Using Tags with Animation Graphs](/docs/user-guide/visualization/animation/animation-editor/using-tags.md)
+ [Customizing EMotion FX Objects](/docs/user-guide/visualization/animation/animation-editor/customizing-emotionfx-objects.md)
+ [Creating Custom Motion Events and Parameters Using C++](/docs/user-guide/visualization/animation/character-editor/custom-events-parameters.md)
+ [Creating and Simulating a PhysX Ragdoll](/docs/user-guide/visualization/animation/animation-editor/creating-and-simulating-physx-ragdoll.md)
+ [Creating Additive Animations](/docs/user-guide/assets/fbx-settings/import/motion-additive.md)
+ [Retargeting Motions](/docs/user-guide/visualization/animation/animation-editor/retargeting-animations.md)
+ [Creating Simulated Objects](/docs/user-guide/visualization/animation/animation-editor/creating-simulated-objects.md)
+ [Add Cloth Colliders to actors](/docs/user-guide/visualization/animation/character-editor/cloth-colliders.md)
+ [Best Practices for Working with Skinned Meshes for Animation](/docs/userguide/best-practices-for-working-with-meshes-for-animations.md)
