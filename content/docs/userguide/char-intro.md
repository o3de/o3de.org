---
description: ' Learn to animate characters in &ALYlong; with &emotionfx; &animation-editor;
  . '
title: Create and animate characters
---
# Create and animate characters {#char-intro}

Most game projects require an animated character to move around in the environment\. This may be a character that the player controls, or an AI\-driven entity that interacts with the level\.

Use the **EMotion FX Animation Editor** to animate characters in Amazon Lumberyard\. To build a character, you associate one or more skinned models with an animation skeleton \(built in a digital content creation tool like Maya\)\. You then import the character into the **Animation Editor** and specify the animations that you want your character to have\.

You can then blend animations, so that your character transitions from one animation to another, and specify the conditions when an animation occurs for a character\. For example, you can specify that your character starts in an idle position\. After several seconds, the character starts to walk, run, and then slow down again until the character returns to an idle position\.

In the **Animation Editor**, you can preview the animations and blends between the animations for your characters\.

Lumberyard has the **FBX Settings** tool that converts static `.fbx` meshes, skeletons, skins, animations, and materials into Lumberyard assets\. For more information, see [Customize FBX asset export with FBX Settings](/docs/userguide/fbx/intro.md)\.

**Note**
If you are using Lumberyard 1\.10 or earlier, you can use the legacy animation system \(Geppetto and Mannequin\) to accomplish these tasks\. For more information, see [Animation System](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/char-legacy-intro.html) in the *Amazon Lumberyard Legacy Reference*\.

**Topics**
+ [Animation Editor Concepts and Terms](/docs/userguide/animation/character-editor/concepts-and-terms.md)
+ [Animation Editor User Interface](/docs/userguide/animation/editor/user-interface.md)
+ [Animation Editor File Types](/docs/userguide/animation/character-editor/file-types.md)
+ [Getting Started with the Animation Editor](/docs/userguide/animation/editor/quick-start.md)
+ [Referencing External Anim Graphs](/docs/userguide/referencing-character-animation-editor-anim-graph.md)
+ [Synchronizing Animation Graphs: Example](/docs/userguide/animation/character-editor/sync-graph.md)
+ [Animation Editor Components](/docs/userguide/animation/character-editor/components.md)
+ [Using Morph Targets to Deform Characters](/docs/userguide/animation/editor/using-morph-targets-to-deform-characters.md)
+ [Customizing State Machine Routing with Sparse Motion Sets](/docs/userguide/animation/editor/customizing-state-machines-with-sparse-motion-sets.md)
+ [Animation Editor Nodes](/docs/userguide/animation/editor/node.md)
+ [Using Tags with Animation Graphs](/docs/userguide/animation/editor/using-tags.md)
+ [Customizing EMotion FX Objects](/docs/userguide/animation/editor/customizing-emotionfx-objects.md)
+ [Creating Custom Motion Events and Parameters Using C\+\+](/docs/userguide/animation/character-editor/custom-events-parameters.md)
+ [Creating and Simulating a PhysX Ragdoll](/docs/userguide/animation/editor/creating-and-simulating-physx-ragdoll.md)
+ [Creating Additive Animations](/docs/userguide/fbx/import/motion-additive.md)
+ [Retargeting Motions](/docs/userguide/animation/editor/retargeting-animations.md)
+ [Creating Simulated Objects](/docs/userguide/animation/editor/creating-simulated-objects.md)
+ [Add Cloth Colliders to actors](/docs/userguide/animation/character-editor/cloth-colliders.md)
+ [Best Practices for Working with Skinned Meshes for Animation](/docs/userguide/best-practices-for-working-with-meshes-for-animations.md)