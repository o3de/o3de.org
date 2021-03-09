---
description: ' Use the Actor component to add an actor file to your entity in Open 3D Engine. '
title: Actor
---

{{< preview-migrated >}}

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

You can use the **Actor** component to create characters for your game\. After you import your character files from your DCC tool into O3DE, you can create an entity and add the **Actor** component to it\. For example, you must use an **Actor** component to create a controllable character for your game\.

For the **Actor** component to work properly, you must also add one of the following:
+ **[Simple Motion](/docs/user-guide/components/simple-motion.md)** component - Uses a single motion for your actor\.
+ **[AnimGraph](/docs/user-guide/components/animgraph.md)** component - Uses an animation graph to control your actor's behavior\.

**Topics**
+ [Actor Component Properties](#component-actor-properties)
+ [Using Multiple Skin Attachments for an Actor](/docs/user-guide/components/actor-multiple-skin.md)
+ [Setting Up Actor Entities](/docs/user-guide/components/actor-component-entity-setup.md)

## Actor Component Properties {#component-actor-properties}

![\[Actor component properties.\]](/images/user-guide/component/actor_component_properties.png)

The **Actor** component has the following properties\.


****

| Property | Description |
| --- | --- |
|  **Actor asset**  |  Specifies the actor file that you want to add to your entity\.   |
|  **LOD Materials**  | Specifies the material that is linked to your actor asset\. |
|  **Attachment type**  |  The **Actor** component has the following attachment types: [\[See the AWS documentation website for more details\]](/docs/userguide/components/actor)  |
| Draw skeleton |  Determines whether character joints are visible\.   |
| Draw character |  Determines whether character mesh is visible\.  |
| Skinning method |  Specifies the skinning method to use for the actor\. You can choose the following options: [\[See the AWS documentation website for more details\]](/docs/userguide/components/actor)  |
