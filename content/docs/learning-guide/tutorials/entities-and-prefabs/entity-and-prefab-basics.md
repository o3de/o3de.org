---
linktitle: Entity and Prefab Basics
title: Entity and Prefab Basics
description: Learn the basics of creating and working with entities and prefabs in Open 3D Engine (O3DE).
weight: 200
toc: true
---

Entities and prefabs provide the foundation for building projects in **Open 3D Engine (O3DE)**. An entity is a collection of any combination of components that define an object. The only required component for an entity is a **Transform** component that places the entity in the level. An entity is an abstract concept, though, and only exists within the context of a level or a prefab. Saving an entity to disk requires saving the level that contains it, or creating a prefab from the entity.

A prefab is a container that can have one or more child entities or prefab instances. Prefabs are files saved to disk that are instantiated during edit-time or spawned at runtime. It's important to understand, that prefabs that exist in a level are *instances* of a prefab. Changes made to a prefab that has been opened in **O3DE Editor** automatically propagate to the instances of that prefab.

The entities and prefab instances placed in a level are shown in **Entity Outliner**. Entities are indicated by a {{< icon "entity.svg" >}} white cube icon. Prefab instances are indicated by a {{< icon "prefab.svg" >}} blue container icon. Prefab instances also display the prefab file name in parentheses.

![An entity and a prefab in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/entity-outliner.png)

The sections in this topic demonstrate the basics of working with entities, prefabs, and prefab instances.

## Create an entity

You can create an entity with either of the following methods:

* In Entity Outliner or the viewport, **right-click** and choose **Create entity** from the context menu.
* With Entity Outliner focused, press **CTRL+ALT+N**.

![Creating a new entity in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/create-entity.png)

To create an entity with an asset as its basis, **drag** an asset such as a `.azmodel` or a `.actor` from **Asset Browser** into Entity Outliner or the viewport. In the following video, a `.azmodel` is dragged into the viewport from Asset Browser, and a new entity with a **Mesh** component is created in the level.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/create-entity.mp4" info="Drag and drop to create an entity." autoplay="true" loop="true" width="900" >}}

## Create a prefab

Prefabs are saved to disk and allow you to easily reuse objects by instantiating them in a level or spawning them at runtime. Prefabs are created from entities with the following steps:

1. In Entity Outliner, **right-click** on an entity and choose **Create Prefab...** from the context menu.
1. In the **Save As…** window, choose a directory in your project, such as the `Prefabs` directory, supply a name for the prefab, and choose **Save**.

![Creating a prefab from an entity in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/create-prefab.png)

The prefab file is saved to disk and an instance of the prefab replaces the entity in **O3DE Editor**. The prefab instance displays the name of the instance on the left next to the {{< icon "prefab.svg" >}} prefab icon. The name of the prefab file is displayed on the right in parenthesis. In the following image, notice that the level itself is a prefab.

![A new prefab instance in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-instanced.png)

### Create a prefab from a collection of entities and prefab instances

Complex prefabs might require multiple entities and prefab instances. You can create a prefab from a combination of entities and prefab instances with the following steps:

1. Select the entities and prefab instances you want included in the new prefab. You can select multiple entities and prefab instances by holding **SHIFT** and clicking on each entity and prefab instance. Alternatively, you can **drag** a selection box around a group of entities and prefab instances in Entity Outliner or in the viewport.
1. In Entity Outliner, **right-click** one of the selected entities or prefab instances and choose **Create Prefab...** from the context menu.
1. In the **Save As…** window, choose a directory in your project, such as the `Prefabs` directory, supply a name for the prefab, and choose **Save**.

In the following video, a prefab instance and an entity with a hierarchy are selected for a new prefab. When the new prefab instance is opened in [Focus Mode](#edit-a-prefab), it displays that the hierarchy is maintained in the new prefab.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/multiple-entity-prefab.mp4" info="Creating a prefab from a collection of entities and prefabs." autoplay="true" loop="true" width="450" >}}

## Instantiate a prefab

Prefabs can be added to a level or another prefab as a prefab instance. To instantiate a prefab, do the following:

1. **Right-click** in Entity Outliner or the viewport and choose **Instantiate Prefab...** from the context menu.
1. In the **Pick Prefab** window, navigate to the prefab file you want to instantiate and select it. Choose **OK**.

![Instantiate a prefab in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/instantiate-prefab.png)

Alternatively, you can **drag** a `.prefab` from Asset Browser into Entity Outliner or the viewport to instantiate it, as demonstrated in the following video.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-instance.mp4" info="Drag and drop to instantiate a prefab." autoplay="true" loop="true" width="900" >}}

## Naming entities and prefab instances

The name of a prefab instance is derived from the prefab file name. However, each prefab instance can have a unique name. You can edit the name of a selected  entity or prefab instance with any of the following methods:

* **Click** the name of the entity or prefab instance in Entity Outliner to edit it.
* Press **F2** to edit the name.
* In Entity Outliner, **right-click** on the entity or prefab instance and choose **Rename** from the context menu.
* In **Entity Inspector**, edit the name field.

![Renaming a prefab.](/images/learning-guide/tutorials/entities-and-prefabs/rename-prefab.png)

{{< note >}}
Entities and prefab instances aren't required to have unique names. When you instantiate a prefab, or duplicate an entity or a prefab instance, the name of the instance or duplicate is the same as the source. Each entity and prefab instance has a unique Entity ID that is used by O3DE to identify them.
{{< /note >}}

## Saving entities and prefabs

To save an entity, you must save the level that contains the entity (choose **Save** from the file menu or press **CTRL+S**). Alternatively, you can [create a prefab](#creating-entities-and-prefabs) from the entity.

To save a prefab, in Entity Outliner or in the viewport, **right-click** on the prefab instance and choose **Save Prefab to file** from the context menu.

![Saving a prefab.](/images/learning-guide/tutorials/entities-and-prefabs/save-prefab.png)

{{< note >}}
The **Save Prefab to file** option appears in the context menu only when the prefab instance has unsaved changes. When a prefab instance has unsaved changes, it displays an **\*** to the right of the prefab file name in Entity Outliner. If you attempt to save or close a level containing prefab instances that have been edited, a window appears warning of unsaved prefabs. The warning lists the unsaved prefabs and provides an opportunity to save them.
{{< /note >}}

## View an entity or prefab instance

To focus the viewport on a particular entity or prefab instance, use either of the following methods:

* **Right-click** the entity or prefab instance, and choose **Find in viewport** from the context menu.
* With an entity or prefab instance selected, press **Z**.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/find-in-viewport.mp4" info="Focus the viewport on a prefab instance." autoplay="true" loop="true" width="900" >}}

## Create entity and prefab hierarchies

Entities and prefabs can have nested hierarchies. To create a hierarchy beneath an entity or within a prefab, **drag** an entity or prefab instance onto the root entity or prefab instance in Entity Outliner. As you drag a prefab or entity, a pale blue highlight marks where it will be placed in the hierarchy.

{{< note >}}
Editing the hierarchy of a prefab requires that the prefab is open for edit in [Focus Mode](#edit-a-prefab).
{{< /note >}}

In the following video, an entity and a prefab instance are added as children of an entity.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/nested-entities.mp4" info="Nesting entities." autoplay="true" loop="true" width="450" >}}

Entities and prefabs can have multiple levels of nesting. You can drag and drop the nested entities and prefabs to change the hierarchy as demonstrated in the following video. 

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/multiple-nested.mp4" info="Rearranging a nested entity hierarchy." autoplay="true" loop="true" width="450" >}}


## Edit an entity

A basic entity has a collection of components that define an object. You can add components to a selected entity by choosing **Add Component** in Entity Inspector and selecting a component from the list. In the following video, a **Material** component is added to an entity that contains a **Mesh** component.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/basic-entity.mp4" info="Adding a component to an entity." autoplay="true" loop="true" width="450" >}}

## Edit a prefab

To make changes to a prefab it must be open for editing by entering **Focus Mode**.

### Enter Focus Mode

Use any of the following methods to enter Focus Mode:

* **Double-click** the prefab instance in Entity Outliner or in the viewport.
* **Right-click** the prefab instance in Entity Outliner or in the viewport and choose **Open/Edit Prefab** from the context menu.
* With the prefab instance selected, press **+**.

![Edit a prefab in focus mode.](/images/learning-guide/tutorials/entities-and-prefabs/edit-prefab.png)

When Focus mode is active, the prefab's contents are exposed in Entity Outliner within a blue frame. The viewport also displays a blue frame. When you select an entity contained in the prefab, the entity's components are displayed in Entity Inspector.

{{< image-width "/images/learning-guide/tutorials/entities-and-prefabs/prefab-focus-mode.png" "900" "A prefab opened for editing in focus mode" >}}

### Edit a prefab in Focus Mode

When Focus Mode is active, you can use any entity and prefab editing actions within the context of the prefab. You can create, duplicate, remove, and rename entities and prefab instances, edit entities, create and instantiate prefabs, and create hierarchies of entities and prefab instances using the methods described in this topic. The results of any modifications happen within the context of the prefab that is in Focus Mode.

In the following video example, an `.azmodel` is dragged from Asset Browser into the viewport while an prefab is in focus mode. A new entity is created for the `.azmodel` within the prefab.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/create-entity-focus-mode.mp4" info="Creating an entity within a prefab in focus mode." autoplay="true" loop="true" width="900" >}}

When a prefab has unsaved changes, an **\*** appears next to the prefab file name. [Save the prefab](#saving-entities-and-prefabs) to write the changes to disk.

### Exit Focus Mode

Use any of the following methods to exit Focus Mode:

* **Double-click** the prefab in Entity Outliner.
* **Right-click** the prefab in Entity Outliner and choose **Close Prefab** from the context menu.
* Press **-**.
* **Click** the **X** icon in the upper-right corner of the blue Focus Mode frame that surrounds the viewport.

### Focus Mode and nested prefabs

You can edit a nested prefab by opening the nested prefab in Focus Mode. In the following video, the nested prefab becomes the focus and a new entity is created within the context of the nested prefab.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/nested-focus-mode.mp4" info="Open a nested prefab for edit in focus mode." autoplay="true" loop="true" width="450" >}}

## Detach a prefab instance

When a prefab instance is detached, its link to the prefab file is broken and the prefab instance is converted to an entity. The hierarchy of the prefab is maintained by the new entity. To detach a prefab instance, **right-click** the prefab instance and select **Detach Prefab...** from the context menu, as demonstrated in the following video.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/detach-prefab.mp4" info="Detach a prefab instance." autoplay="true" loop="true" width="450" >}}

{{< note >}}
A prefab instance cannot be detached when it is in Focus Mode.
{{< /note >}}

## Duplicate an entity or a prefab instance

Selected entities and prefab instances can be duplicated with either of the following methods:

* **Right-click** a selected entity or prefab instance and choose **Duplicate** from the context menu.
* With an entity or prefab instance selected, press **CTRL+D**.

The duplicate appears below the source entity or prefab instance with a name that is identical to the source entity or prefab instance. Examining the duplicate in Entity Inspector shows the duplicate has a unique Entity ID.

When multiple entities and prefabs are selected, they all are duplicated along with their hierarchies, as demonstrated in the following video.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/multiple-duplicates.mp4" info="Duplicating multiple entities and prefab instances." autoplay="true" loop="true" width="450" >}}

In the following video, nested entities and prefab instances are duplicated in place within the hierarchy.

{{< video src="/images/learning-guide/tutorials/entities-and-prefabs/nested-duplicate.mp4" info="Duplicating nested entities and prefab instances." autoplay="true" loop="true" width="450" >}}

## Delete entities and prefab instances

You can delete selected entities and prefab instances with either of the following methods:

* **Right-click** a selected entity or prefab instance and choose **Delete** from the context menu.
* With an entity or prefab instance selected, press **DEL**.

{{< note >}}
When an entity or a prefab instance is deleted from a level, you must save the level (press **CTRL+S**) to commit the change.

When an entity or prefab instance is deleted from a prefab, you must [save the prefab](#saving-entities-and-prefabs) to commit the change.

Deleting a prefab instance has no effect on the prefab file that has been used to create the prefab instance. The prefab instance is removed, but the `.prefab` file on disk is not changed. 
{{< /note >}}

## Conclusion and next steps

Now that you understand the differences between an entities, prefabs, and prefab instances, and the basics of creating and working with them, you can put it into practice. Learn to [Spawn and Despawn a Prefab](spawn-a-prefab) in the next tutorial. 
