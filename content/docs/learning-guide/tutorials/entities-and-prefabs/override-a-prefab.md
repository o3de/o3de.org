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
| Beginner | 15 Minutes | Using prefab overrides to make prefab instances unique. | October 22, 2023 |

## Prerequisites

* Basic knowledge of working with [O3DE Editor](/docs/user-guide/editor).
* A project built from the standard project template or one that contains the Gems in the standard template.

## What are prefab overrides?

Because prefabs instances reference a file, all instances of a prefab are identical by default. Prefab overrides allow the content of prefab instances to be modified on an individual basis.

The following image shows two instances of Car prefab in a level. The Car prefabs are expanded and open for editing:

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/level-prefab-edit.png" width="300" alt="Level in Prefab Edit Mode in Entity Outliner." >}}

Overrides applied to prefab instances are registered for that individual prefab instance and are stored in the prefab being edited that contains the prefab instances.

In the preceding example, the Car prefab instances are in a level (which is a prefab), so the prefab overrides applied to the Car instances are stored in the level when you save it.

Suppose that the car's four tires are instances of a tire prefab that are nested within the Car prefab. If you apply overrides to each of the tire instances to give them unique appearances, the overrides are stored in the Car prefab when you save it.

{{< note >}}
A level is a prefab, and automatically enters Prefab Edit Mode when it is opened. This is indicated by the blue capsule around the level in **Entity Outliner**.

Overrides are not limited to the level. In fact, any prefab that is open for editing in Prefab Edit Mode is responsible for storing the overrides made to its nested prefabs.
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

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-property.png" width="750" alt="Overriding a component property." >}}

## Add an entity as an override

To add an entity under a prefab instance as an override:
1. In Entity Outliner, **right-click** on a prefab instance and choose **Create entity** from the context menu.
1. Notice that a blue plus appears on the new entity's icon in Entity Outliner. This indicates that the entity has been added as an override.

In the below image, an Antenna entity has been added to the first Car prefab instance.

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-add.png" width="750" alt="Adding an entity as an override." >}}

## Delete an entity or a nested prefab as an override

To delete an entity or a nested prefab instance as an override:
1. In Entity Outliner, **right-click** on an entity or a nested prefab instance and choose **Delete** from the context menu.
1. Notice that a blue circle appears on the parent entity's icon in Entity Outliner. This indicates that a child has been deleted as an override.

{{< note >}}
In Entity Outliner, there is no visual indication of an entity or a prefab instance being deleted as an override at this time. The only way of getting rid of that type of overrides is through manual edit in `.prefab` file of the prefab instance being edited.
{{< /note >}}

Alternatively, You can revert a deletion by pressing CTRL+Z to go back to a previous state where you delete that object/entity. One important note, however. This undo will only work if the editor has not been closed and reopened.
After closing the editor, your undo stack has been cleared, and you can no longer undo in this manner.

{{< note >}}
You cannot revert the deletion by reverting overrides on the parent entity. See the GitHub issue [#13437](https://github.com/o3de/o3de/issues/13437) for more details.
{{< /note >}}

## Deleting the original prefab instance (template)
It is important to note that deleting or undoing a prefab original instance will not actually delete the actual prefab from the hard drive, which is the same when removing a prefab from your Outliner. This doesn't actually delete the prefab original instance, because prefabs live as separate files on the hard drive.
To remove a prefab permanently, you must delete the prefab file from the Asset Browser or your OS folder operation. We recommend not doing this unless you are sure that prefab does not exist in other levels or other projects that reference it.

## Revert an override

Once an override has been registered, it will exist until explicitly removed. To revert overrides on an entity:

1. In Entity Outliner, **right-click** on an entity with overrides and choose **Revert Overrides** from the context menu.
1. Notice that the entity no longer has any indication of having overrides.

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-revert.png" width="300" alt="Reverting overrides on an entity." >}}

* Reverting an override can take place on 3 different levels of a prefab.
    * Level 1 - on the actual property itself.
    * Level 2 - on the entire component level -- this will revert all multiple properties on one component of the entity.
    * Level 3 - on the entire entity -- this affects all component cards and their individual properties.

## Prefab overrides in Entity Inspector

The above sections describe how you can manage prefab overrides in Entity Outliner, however the visualization support is limited to the entity level. This section further demonstrates prefab override functionality in Entity Inspector.

Prefab override management in Entity Inspector is developed based on the new *[Document Property Editor (DPE)](https://github.com/o3de/sig-content/issues/11)*, which aims to replace the old *Reflected Property Editor (RPE)*.

### Override visualization

When you make an override edit in the inspector, you will notice that a blue circle appears before the property label and the label text is bolded. In the component header, a blue circle is also shown near the text, which indicates that an owning property value has been overridden.

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-component-property.png" width="450" alt="Overriding a component property." >}}

If a component is added as an override, a different blue circle with a plus sign appears next to the component name instead.

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-add-component-override.png" width="450" alt="Adding a component as an override." >}}

### Revert property overrides

With the inspector override support, you can now revert overridden property values respectively. Unlike reverting overrides on an entity, you can selectively revert the property you want:

1. In Entity Inspector, **right-click** on the property label or the blue circle and choose **Revert override** from the context menu.
1. Notice that the property no longer has any indication of having an override.

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-revert-component-property-override.png" width="450" alt="Reverting a component property override." >}}

{{< note >}}
Once a property value is overridden to non-default value, the override edit can only be removed by doing a revert. In other words, setting the value back to default does not remove the override edit.
{{< /note >}}

In addition, you are able to revert all property overrides that are owned by a component:

1. In Entity Inspector, **right-click** on the blue circle in the component header and choose **Revert Overrides** from the context menu.
1. Notice that all the properties no longer have any indication of having an override.

{{< image-width src="/images/learning-guide/tutorials/entities-and-prefabs/prefab-override-revert-component-override.png" width="450" alt="Reverting a component added as an override." >}}

For a component added as an override, you can revert the addition in the same way mentioned above. Alternatively, you can delete the component with either of the following methods:

1. In Entity Inspector, **right-click** a component and choose **Delete component** from the context menu.
1. With a component selected, press **DEL**.

For a component deleted as an override, you can revert the deletion by reverting all overrides on the selected entity. However, be aware that this would remove other overrides if they are present.

## Disabling prefab overrides

Prefab overrides are a new feature, and it's possible that you may want to ignore them entirely, or encounter a blocking issue with them. If you wish to disable prefab override creation and editing tools in the O3DE Editor, create a settings registry file with the following contents:

```json
{
    "O3DE": {
        "Autoexec": {
            "ConsoleCommands": {
                "ed_enableDPEInspector": false,
                "ed_enableInspectorOverrideManagement": false,
                "ed_enableOutlinerOverrideManagement": false
            }
        }
    }
}
```

An example of such file exists as a project-specific override in the AutomatedTesting project: [`AutomatedTesting/Registry/editorpreferences.setreg`](https://github.com/o3de/o3de/blob/c8f19bbe664a89ad92007fb7674cb8c6aa165bd9/AutomatedTesting/Registry/editorpreferences.setreg)

{{< note >}}
It is recommended to add your settings registry file to the `<project-path>/user/Registry` directory as a user-specific override. Files in the user directory are ignored by git and won't be tracked for changes.
{{< /note >}}

{{< note >}}
Starting in 23.10.1 release, prefab override management is enabled by default.
{{< /note >}}

## Conclusion and next steps

Now that you understand the differences between entities, prefabs, and prefab instances, and the basics of creating and working with them, you can put it into practice. Learn to [Spawn and Despawn a Prefab](spawn-a-prefab) in the next tutorial.
