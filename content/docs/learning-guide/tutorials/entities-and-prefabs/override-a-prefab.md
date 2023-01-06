---
linktitle: Override a Prefab
title: Override a Prefab
description: Learn how to override a prefab in Open 3D Engine (O3DE).
weight: 200
toc: true
---

We learned in the previous tutorial that when a prefab is open in [Prefab Edit Mode](/docs/learning-guide/tutorials/entities-and-prefabs/entity-and-prefab-basics#edit-a-prefab), changes to its content are automatically propagated to all instances linked to that prefab. Sometimes though, it is useful to alter a prefab instance on its own without affecting the other instances. For example, a level may have multiple instances of the same Car prefab, but each car can be a different color.

The editor provides an **Override UX** mode that allows the content of prefab instances under the prefab that's open for editing to be exposed.

In the below image, the Level is in Prefab Edit Mode while the content of the Car prefab instances is expanded and accessible for editing:

![Level in Prefab Edit Mode in Entity Outliner.](/images/learning-guide/tutorials/entities-and-prefabs/level-prefab-edit.png)

Now when a change is made to a Car prefab instance, it will be registered as an override and isolated to that single instance. The level itself is responsible for storing the override information of its nested prefabs.

{{< note >}}
A level is actually a prefab, and automatically enters Prefab Edit Mode when it is opened. This is indicated by the blue capsule around the level in the Entity Outliner.
{{< /note >}}

{{< note >}}
Overrides are not limited to the level. In fact, any prefab that is open for editing in Prefab Edit Mode is responsible for storing the overrides made to its nested prefabs.
{{< /note >}}

## Enable Override UX Mode

To enable **Override UX** mode, create a settings registry file called `editorpreferences.setreg` with the following contents:

```JSON
{
    "O3DE": {
        "Preferences": {
            "Prefabs": {
                "EnableOverridesUx": true
            }
        }
    }
}
```

An example of such file exists as a project-specific override in the AutomatedTesting project: [`AutomatedTesting/Registry/editorpreferences.setreg`](https://github.com/o3de/o3de/blob/development/AutomatedTesting/Registry/editorpreferences.setreg)

{{< note >}}
It is recommended to add your `editorpreferences.setreg` file to the {project-path}/user/Registry folder as a user-specific override since any files under the user folder are git ignored and won't accidentally be committed.
{{< /note >}}

You can create different kinds of overrides on a prefab:
* Component property edit
* Component addition/removal
* Entity addition/removal
* Nested instance removal

In **Override UX** mode, overrides are automatically added when you perform editing actions on the content of a prefab instance.

## Override a component property

To override a component property of an entity under a prefab instance:

1. In the Entity Outliner, expand a prefab instance by clicking the arrow to the left of the instance name.
1. Select an entity under the instance and edit one of its properties in the Entity Inspector.
1. Notice that a blue circle appears on the entity's icon in the Entity Outliner. This indicates that an edit override is applied to the entity.

In the below image, the Body entity in the first Car prefab instance has an override to change the default color of the car from red to blue:

![Overriding a component property.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-property.png)
## Add an entity as an override

To add an entity under a prefab instance as an override:
1. In the Entity Outliner, **right-click** on a prefab instance and choose **Create entity** from the context menu.
1. Notice that a blue plus appears on the new entity's icon in the Entity Outliner. This indicates that the entity has been added as an override.

In the below image, an Antenna entity has been added to the first Car prefab instance.

![Adding an entity as an override.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-add.png)

## Revert an override

Once an override has been registered, it will exist until explicitly removed. To revert overrides on an entity:

1. In the Entity Outliner, **right-click** on an entity with overrides and choose **Revert Overrides** from the context menu.
1. Notice that the entity no longer has any indication of having overrides.

![Reverting overrides on an entity.](/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-revert.png)

## Conclusion and next steps

Now that you understand the differences between entities, prefabs, and prefab instances, and the basics of creating and working with them, you can put it into practice. Learn to [Spawn and Despawn a Prefab](spawn-a-prefab) in the next tutorial.
