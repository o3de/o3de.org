description: ' Learn to animate characters in &ALYlong; with &emotionfx; &animation-editor;
  . '
slug: char-intro
title: Create and animate characters
---
# Create and animate characters<a name="char-intro"></a>

Most game projects require an animated character to move around in the environment\. This may be a character that the player controls, or an AI\-driven entity that interacts with the level\.

Use the **EMotion FX Animation Editor** to animate characters in Amazon Lumberyard\. To build a character, you associate one or more skinned models with an animation skeleton \(built in a digital content creation tool like Maya\)\. You then import the character into the **Animation Editor** and specify the animations that you want your character to have\.

You can then blend animations, so that your character transitions from one animation to another, and specify the conditions when an animation occurs for a character\. For example, you can specify that your character starts in an idle position\. After several seconds, the character starts to walk, run, and then slow down again until the character returns to an idle position\.

In the **Animation Editor**, you can preview the animations and blends between the animations for your characters\. 

Lumberyard has the **FBX Settings** tool that converts static `.fbx` meshes, skeletons, skins, animations, and materials into Lumberyard assets\. For more information, see [Customize FBX asset export with FBX Settings](fbx-intro.md)\.

**Note**  
If you are using Lumberyard 1\.10 or earlier, you can use the legacy animation system \(Geppetto and Mannequin\) to accomplish these tasks\. For more information, see [Animation System](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/char-legacy-intro.html) in the *Amazon Lumberyard Legacy Reference*\.

**Topics**
+ [Animation Editor Concepts and Terms](char-animation-editor-concepts-and-terms.md)
+ [Animation Editor User Interface](animation-editor-user-interface.md)
+ [Animation Editor File Types](char-animation-editor-file-types.md)
+ [Getting Started with the Animation Editor](animation-editor-quick-start.md)
+ [Referencing External Anim Graphs](referencing-character-animation-editor-anim-graph.md)
+ [Synchronizing Animation Graphs: Example](char-animation-editor-sync-graph.md)
+ [Animation Editor Components](char-animation-editor-components.md)
+ [Using Morph Targets to Deform Characters](animation-editor-using-morph-targets-to-deform-characters.md)
+ [Customizing State Machine Routing with Sparse Motion Sets](animation-editor-customizing-state-machines-with-sparse-motion-sets.md)
+ [Animation Editor Nodes](animation-editor-node.md)
+ [Using Tags with Animation Graphs](animation-editor-using-tags.md)
+ [Customizing EMotion FX Objects](animation-editor-customizing-emotionfx-objects.md)
+ [Creating Custom Motion Events and Parameters Using C\+\+](char-animation-editor-custom-events-parameters.md)
+ [Creating and Simulating a PhysX Ragdoll](animation-editor-creating-and-simulating-physx-ragdoll.md)
+ [Creating Additive Animations](char-fbx-importer-motion-additive.md)
+ [Retargeting Motions](animation-editor-retargeting-animations.md)
+ [Creating Simulated Objects](animation-editor-creating-simulated-objects.md)
+ [Add Cloth Colliders to actors](char_animation_add_cloth_colliders.md)
+ [Best Practices for Working with Skinned Meshes for Animation](best-practices-for-working-with-meshes-for-animations.md)