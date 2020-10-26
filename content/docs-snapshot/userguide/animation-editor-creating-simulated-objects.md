# Creating Simulated Objects<a name="animation-editor-creating-simulated-objects"></a>

When you animate a character \(actor\), your actor might wear objects that move differently from the primary motion\. For example, if your actor runs and wears a backpack, the backpack might sway back and forth\. To create this dynamic movement, you create a simulated object\. A simulated object acts as a container for the bones on your actor\. In the **Animation Editor**, you can specify how loose objects, such as chains, backpacks, or long hair, move in relation to the actor\.

**Note**  
Simulated objects don't collide with ragdoll colliders or PhysX entities in the level\.

In this procedure, you'll do the following:

1. Create a simulated object that's attached to an actor\.

1. Add colliders to the skeleton so that the object collides with the actor's body\.

1. Adjust your settings so that the animation appears more smooth and realistic\.

1. View the simulation in the render window\.

## Prerequisites<a name="prerequisites-for-creating-simulated-objects"></a>

Before you begin, you must do the following:
+ Using Project Configurator, enable the [Samples Project](sample-project-samples.md)\.
+ In the **Animation Editor**, complete the following:
  + Import your actor, such as the `rinActor.fbx` file
  + Create a motion set
  + Import your motions, such as the `rin_Run.fbx`

For more information, see [Step 1: Creating a Motion Set](animation-editor-quick-start.md#creating-a-motion-set-with-animation-editor)\.

**Topics**
+ [Prerequisites](#prerequisites-for-creating-simulated-objects)
+ [Setting Up a Simulated Object](set-up-a-simulated-object.md)
+ [Setting Up the Simulated Object Anim Graph Node](set-up-simulated-object-anim-graph-node.md)
+ [Setting Up Simulated Object Colliders](set-up-simulated-object-collider.md)
+ [Using Debug Mode to Refine the Simulation](refine-simulationg-using-debug-mode.md)
+ [Using Parameters to Adjust the Animation During Runtime](use-parameters-to-adjust-animation-during-runtime.md)