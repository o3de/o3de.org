---
linkTitle: Entity Inspector
title: Entity Inspector
description: Use Entity Inspector to add components to entities and modify their properties in Open 3D Engine (O3DE).
weight: 300
---

The **Entity Inspector** manages all the components for each entity. Select an entity in the **Entity Outliner** or the viewport to see the attached components in the **Entity Inspector**.

Use the **Entity Inspector** to do the following:

- Add components to entities
- Modify component properties
- Remove, copy, cut, and paste components
- Set the entity status
- Customize the entity icon
- Pin an entity's inspector
- Create your own help topic for your custom component

{{< note >}}
For a list and descriptions of available components, see [Component Reference](/docs/user-guide/components/reference). You can also click the **Help** icon in the header of each component to open a help topic.
{{< /note >}}

## Opening Entity Inspector

**To open the Entity Inspector**

1. In O3DE Editor, choose **Tools**, **Entity Inspector**.

1. Select an entity in the viewport or the **Entity Outliner**.

1. In the **Entity Inspector**, you can see the following:

  * **Name** - Name of the entity. You can enter a different name for the entity.
  * **Entity Icon** - Customizable icon to help you recognize entities in the viewport.
  * **Status** - Active status of the entity. When the level starts, the entity can be active, inactive, or active but only in editor mode.
  * **Entity ID** - If this entity ID is called out in messages, errors, or asserts, you can find the entity by searching for it in the **Entity Outliner**.
  * Components attached to the entity appear below.

![Find entities and its attached components in the Entity Inspector.](/images/user-guide/component/entity_system/component-entity-inspector.png)

## Setting entity status

By default, an entity starts as active in a level. When you create a game, you can specify that an entity remain inactive until activated through some mechanism such as a script or player action. You can also set an entity as editor only if you want to disable an entity during gameplay mode or you want to create test entities or visual comments for users working in your game.

**To set an entity's status**

1. In the **Entity Outliner** or the viewport, select an entity.

1. In the **Entity Inspector**, choose the **Status** drop-down menu, and select one of the following options:
      - **Start active** - Entity is active when the level starts.
      - **Start inactive** - Entity is inactive when the level starts.
      - **Editor only** - Entity is only active in editor mode.

      ![Specify whether component is active, inactive, or active in editor mode only.](/images/shared/shared-component-entity-inspector-startactive.png)

1. When you set an entity as **Start Inactive** or **Editor only**, select the entity to view its status in the **Entity Outliner** and the viewport.

    **Example Start Inactive**

    Inactive entities have a strikethrough icon and inactive text appears in the viewport.

    ![Specify whether component is active, inactive, or active in editor mode only.](/images/shared/shared-component-entity-inspector-inactive-example.png)
    
    **Example Editor only**

    Editor only entities have an icon that is not shaded and editor only text appears in the viewport.

    ![Specify whether component is active, inactive, or active in editor mode only.](/images/shared/shared-component-entity-inspector-editor-only-example.png)
   
## Pinning an Entity Inspector

You can pin an entity's inspector to keep it open and visible even when you select another entity. You can pin inspectors for multiple entities, and also pin multiple inspector instances of the same entity. This helps you compare the entities and their components to each other.

A pinned inspector has the following features:
- Always shows the pinned entity even when you select a different entity.
- Functions like the main **Entity Inspector** window.
- Closes when you open a different level or exit O3DE.
- If you convert a loose entity to a slice, the pinned inspector points to the new slice entity that corresponds to the previously loose entity.
- Persists when entering and exiting game mode.
- Updates all pinned inspectors for a particular entity when you modify that entity.

You can pin an inspector from the **Entity Outliner** or the **Entity Inspector**.

**To pin an inspector**

1. Select an entity.

1. Do one of the following:

     1. In the **Entity Outliner**, right-click the entity and then choose **Open pinned Inspector**.

         ![In the Entity Outliner, choose Open pinned Inspector to pin an inspector for that entity.](/images/user-guide/component/entity_system/component-entity-inspector-pin-1.png)

     1. In the **Entity Inspector**, click the pin icon.

         ![In the Entity Inspector, click the pin icon to pin an inspector for the entity.](/images/user-guide/component/entity_system/component-entity-inspector-pin-2.png)

1. In O3DE Editor, you can view the pinned entity inspectors.

    **Example**

    ![Multiple pinned inspectors open in a level.](/images/user-guide/component/entity_system/component-entity-inspector-pin.png)

## Customizing entity icons

The default icon for an entity without any added components is the **Transform** ( ![Transform Component Icon](/images/user-guide/component/entity_system/entity-inspector-transform-icon.png)) component's icon. When you add another component, the icon changes to the first component that you add to that entity.

You can also specify your own icon.

**To customize an entity icon**

1. In the **Entity Inspector**, click the icon image at the top.

1. Choose **Set custom icon**.

     !['Set custom icon' menu item](/images/user-guide/component/entity_system/component-working-customize.png)

1. Select an icon from your game project directory.