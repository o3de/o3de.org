---
description: ' Use custom state machines to control motions in the Animation Editor
  for Open 3D Engine. '
title: Customizing State Machine Routing with Sparse Motion Sets
---

{{< preview-migrated >}}

You might run into a case where you have different characters that don't have the exact same motions as the character for which you created the animation graph. Instead of duplicating large parts or creating new animation graphs for different characters, you can share the same animation graph for all your characters.

You can allow or deny transitions and routes to motion states in a state machine, based on the existence of the given motion entry.

**Topics**
+ [Sparse Motion Sets](#sparse-motion-sets)
+ [Hierarchical Motion Sets and Overwriting Motion Entries](#hierarchy-motion-sets-and-overwriting-motion-entries)
+ [Customizing State Machines Based on Motion Sets](#customizing-state-machines-based-on-motion-sets)

## Sparse Motion Sets 

A motion set contains a list of motion entries. Each motion entry has a motion ID that you can define. For example, you can name a motion ID, *Walk* or *Jump*. The motion entry maps the custom motion ID like *Walk* to a specific motion file, such as `/SampleProject/Animations/Human_Walk.motion`.

You can add motion entries to a motion set with the **+** icon or the folder icon in the motion set window. The **+** icon creates a new motion entry where you can specify the motion ID, but does not assign it to a motion file. You can click the folder icon to select a motion to add. Based on the motion file name, a default motion ID is generated for you.

A *sparse motion set* is when the motion entries do not have a motion file assigned to them.

When you choose an unassigned motion entry on a motion state in a state machine, the motion shows a red border around the node. If the motion state is activated, the character goes to a bind pose. In the following example, the character's animation graph does not transition from idle to jump because the **Jump** node is using a sparse motion set; no motion file is assigned. The character remains in the **Idle** node.

![\[You can specify an unassigned motion entry to a sparse motion set.\]](/images/user-guide/actor-animation/animation-editor-sparse-motion-sets.png)

## Hierarchical Motion Sets and Overwriting Motion Entries 

A motion set can contain child motion sets that are stored in the same file. Child motion sets inherit all motion entries from the parent.

In the following example, a hierarchical motion set has the **Human** motion at the root level. The **Zombie** motion set is a child, which inherits from the parent **Human** motion set. The **Zombie** motion set does not have a motion entry for `Jump`.

**Example : Hierarchical Motion Set**

**Human \(motion set\)**
+ + Idle - `GenericIdle.motion`
+ + Walk - `GenericWalk.motion`
+ + Jump - `GenericJump.motion`

**Zombie \(motion set\)**
  + + Walk - `ZombieWalk.motion`

Because the parent motion set defines the `Jump` motion entry with a motion file, the child motion set inherits that motion. This means that when the **Zombie** motion set is activated, characters with that motion set play the human `Jump` motion.

If you don't want your zombie characters to jump, you can disable inheritance for that specified motion. In the child motion set, you can create a new motion entry named `Jump` and then mark it as unassigned. This way you can override the motion entry from the parent, by not assigning it for the child motion set.

**Example : Child Motion Set with Unassigned Jump Motion**

**Human \(motion set\)**
+ + Idle - `GenericIdle.motion`
+ + Walk - `GenericWalk.motion`
+ + Jump - `GenericJump.motion`

**Zombie \(motion set\)**
  + + Walk - `ZombieWalk.motion`
  + + Jump - *Unassigned*

The **Zombie** motion set uses the `Idle` motion from the parent motion set, customizes the `Walk` motion, and disables the `Jump` motion.

For hierarchical motion sets, you can create a motion entry and unassign it to disable inheritance from the parent motion set. If you are not using hierarchical motion sets, this is the same as not having a motion entry with the specified motion ID.

## Customizing State Machines Based on Motion Sets 

Animation graphs can be shared across characters. Two different characters that use the same animation graph can operate with two different motion sets. For example, you can have a human character that uses the human motion set, and a zombie character that uses the **Zombie** motion set. Both characters can use the same animation graph.

You can configure the state machine to avoid motion states that are unassigned. In this example, you don't want the zombie to go into the **Jump** state, as this motion was unassigned for the zombie motion set.

**To configure the state machine to avoid motion sets**

1. In the **Anim Graph**, choose the transition line between your motion nodes. For example, you can select the transition line between the **Idle** and **Jump** nodes.

1. On the **Attributes** pane, click **Add Condition** and then select **Motion Condition**.

1. For **Motion**, select the **Jump** state.

1. For **Test Function**, select **Is Motion Assigned?**.
![\[Add motion conditions so that some motion states are unassigned.\]](/images/user-guide/actor-animation/animation-editor-motion-condition.png)

   Because the **Zombie** motion set does not have a motion file assigned for `Jump`, the character can't transition from the idle to jump state. The condition's traffic light appears red and blocks the transition. This lets you control whether a character is allowed to go to specific motion state or not.
![\[Customize state machines based on motion sets.\]](/images/user-guide/actor-animation/animation-editor-sparse-motion-sets-02.png)
