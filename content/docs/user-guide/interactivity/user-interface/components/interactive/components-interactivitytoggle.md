---
linkTitle: UI Hierarchy Interactivity Toggle
description: ' Use a Hierarchy Interactivity Toggle to enable and disable interaction in an element and all its children. '
title: UI Hierarchy Interactivity Toggle Component
weight: 250
---

You can use a **Hierarchy Interactivity Toggle** component to make an element and its children interactable or non-interactable. This affects all [interactive components](/docs/user-guide/interactivity/user-interface/components/interactive) on your element, and its children.

![UI Editor Hierarchy Interactivity Toggle component](/images/user-guide/interactivity/user-interface/components/interactive/ui-editor-components-interactivityToggle.png)

To start interactive, or start non-interactive, you can change the **Is Interactable** toggle in the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor) **Properties** pane.

Using the [script node](/docs/user-guide/scripting/script-canvas/get-started/editor-interface): **"Set Interactivity State"**, you can change the interactive components on the element and all its children at once. This allows an easy way to group up interactive elements and enable and disable them collectively. Useful when making UI windows or sections that should all be enabled and disabled at once, for example, when making a pop-up window disable the UI behind it.

**To add a Hierarchy Interactivity Toggle to an element**
+ In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor), **Properties** pane, select **Add Component...**, in the Component list select **"HierarchyInterativityToggle"**.

**To edit a Hierarchy Interactivity Toggle component**

In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor) **Properties** pane, expand **Hierarchy Interactivity Toggle** and do the following, as appropriate:

****Is Interactable****

By toggling it on, your UI Element and it's children will start interactive, like is default.

By toggling it off, your UI Element and it's children will start non-interactive, making all [interactive components](/docs/user-guide/interactivity/user-interface/components/interactive) on the element or children unable to be navigated to with [UI navigation](/docs/user-guide/interactivity/user-interface/components/interactive/properties/navigation/) input, or [clicked with the mouse](/docs/user-guide/interactivity/user-interface/components/interactive/properties/components-interactive-properties-states).

Control the interactivity with scripts to enable and disable interactivity on command.