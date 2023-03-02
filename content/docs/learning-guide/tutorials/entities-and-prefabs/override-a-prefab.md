---
linktitle: Override a Prefab
title: Override a Prefab
description: Learn how to override a prefab in Open 3D Engine (O3DE).
weight: 300
toc: true
---

When a prefab is open in [Prefab Edit Mode](/docs/learning-guide/tutorials/entities-and-prefabs/entity-and-prefab-basics#edit-a-prefab), changes to its content are automatically propagated to all instances of that prefab. Sometimes it is useful to alter a prefab instance on its own without affecting the other instances. For example, you might have multiple instances of the same car prefab in a level, but you want each car instance to be a different color. Prefab overrrides allow you to change the properties and contents of prefab instances to make them unique.

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| --- | --- | --- | --- |
| Beginner | 10 Minutes | Using prefab overrides to make prefab instances unique. | January 13, 2023 |

## Prerequisites

* Basic knowledge of working with [O3DE Editor](/docs/user-guide/editor).
* A project built from the standard project template or one that contains the Gems in the standard template.

## What are prefab overrides?

Because prefabs instances reference a file, all instances of a prefab are identical by default. Prefab overrides allow the content of prefab instances to be modified on an individual basis.

The following image shows two instances of Car prefab in a level. The Car prefabs are expanded and open for editing:

![Level in Prefab Edit Mode in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/level-prefab-edit.png)

Overrides applied to prefab instances are registered for that individual prefab instance and are stored in the prefab being edited that contains the prefab instances.

In the preceding example, the Car prefab instances are in a level (which is a prefab), so the prefab overrides applied to the Car instances are stored in the level when you save it.

Suppose that the car's four tires are instances of a tire prefab that are nested within the Car prefab. If you apply overrides to each of the tire instances to give them unique appearances, the overrides are stored in the Car prefab when you save it.

{{< note >}}
A level is a prefab, and automatically enters Prefab Edit Mode when it is opened. This is indicated by the blue capsule around the level in **Entity Outliner**.

Overrides are not limited to the level. In fact, any prefab that is open for editing in Prefab Edit Mode is responsible for storing the overrides made to its nested prefabs.
{{< /note >}}

## Enable prefab overrides

To enable prefab overrides in Entity Outliner, create a settings registry file called `editorpreferences.setreg` with the following contents:

```JSON
{
    "O3DE": {
        "Preferences": {
            "Prefabs": {
                "EnableOutlinerOverrideManagement": true
            }
        }
    }
}
```

An example of such file exists as a project-specific override in the AutomatedTesting project: [`AutomatedTesting/Registry/editorpreferences.setreg`](https://github.com/o3de/o3de/blob/development/AutomatedTesting/Registry/editorpreferences.setreg)

{{< note >}}
It is recommended to add your `editorpreferences.setreg` file to the `<project-path>/user/Registry` directory as a user-specific override. Files in the user directory are ignored by git and won't be tracked for changes.
{{< /note >}}

You can apply the following types of overrides to prefabs:

* Edit component properties
* Add or remove components
* Add or remove entities
* Remove nested prefab instances

Overrides are automatically added when you perform the preceding edits on the content of a prefab instance. You must save the prefab being edited to retain the overrides.

## Override a component property

To override a component property of an entity under a prefab instance:

1. In Entity Outliner, expand a prefab instance by clicking the arrow to the left of the instance name.
1. Select an entity under the instance and edit one of its properties in **Entity Inspector**.
1. Notice that a blue circle appears on the entity's icon in Entity Outliner. This indicates that an edit override is applied to the entity.

In the below image, the Body entity in the first Car prefab instance has an override to change the default color of the car from red to blue:

![Overriding a component property.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-property.png)
## Add an entity as an override

To add an entity under a prefab instance as an override:
1. In Entity Outliner, **right-click** on a prefab instance and choose **Create entity** from the context menu.
1. Notice that a blue plus appears on the new entity's icon in Entity Outliner. This indicates that the entity has been added as an override.

In the below image, an Antenna entity has been added to the first Car prefab instance.

![Adding an entity as an override.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-add.png)

## Revert an override

Once an override has been registered, it will exist until explicitly removed. To revert overrides on an entity:

1. In Entity Outliner, **right-click** on an entity with overrides and choose **Revert Overrides** from the context menu.
1. Notice that the entity no longer has any indication of having overrides.

![Reverting overrides on an entity.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-revert.png)

## Conclusion and next steps

Now that you understand the differences between entities, prefabs, and prefab instances, and the basics of creating and working with them, you can put it into practice. Learn to [Spawn and Despawn a Prefab](spawn-a-prefab) in the next tutorial.
