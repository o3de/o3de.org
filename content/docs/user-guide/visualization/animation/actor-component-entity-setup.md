---
linkTitle: Setting Up Actor Entities
description: ' Set up actor entities with multiple or a single FBX file in Open 3D Engine. '
title: Setting Up Actor Entities
---

After you set up your skinned meshes as actors, you can create your actor entities. You then parent the attachments to the main entity and line the attachments up to the primary actor.

**To create actor entities**

1. From the **Asset Browser**, select and drag the main actor file and the attachment actor files into the viewport.

    ![From the Asset Browser, drag the main actor file and its attachment actor files into the viewport.](/images/user-guide/visualization/animation/component-actor-component-entity-setup-1.png)

    O3DE automatically adds each file as its own actor component entity.

    ![Drag each actor file to the viewport results in three separate actor entities in the Entity Outliner.](/images/user-guide/visualization/animation/component-actor-component-entity-setup-2.png)

1. In the **Entity Outliner**, click and drag the attachment entities to the main entity; this parents the attachment actor entities to the main actor entity.

    ![Parent the attachment entities by selecting and dragging them onto the main actor entity in the Entity Outliner.](/images/user-guide/visualization/animation/component-actor-component-entity-setup-2-parented.png)

    {{< note >}}
The attachments entities may not line up with the main entity. You'll fix this in the next step.
{{< /note >}}

    **Example**

    ![View the main actor entity and the attachment entities in the viewport.](/images/user-guide/visualization/animation/component-actor-component-entity-setup-3.png)

1. To align the children with its parent, select a child (attachment) entity and then in the **Entity Inspector**, specify the **Translate** values to `0`. Repeat for any other child entities.

    ![Change the Translate values to 0 on each child entity to line it up with the parent.](/images/user-guide/visualization/animation/component-actor-component-entity-setup-4.png)

    The attachments now line up with the main actor entities.

    ![Attachment entities lined up correctly with the main parent actor entity.](/images/user-guide/visualization/animation/component-actor-component-entity-setup-5.png)

1. For each child entity, do the following:

    1. In the **Actor** component, for **Attachment type**, choose **Skin attachment**.

    1. For **Target entity**, click {{< icon "picker.svg" >}} and then select the primary actor to attach the skinned mesh (for example, the **cowboyactor**).

Your component entity setup is complete. When your primary actor animates, the additional skinned mesh attachments animate with the primary actor skeleton.
