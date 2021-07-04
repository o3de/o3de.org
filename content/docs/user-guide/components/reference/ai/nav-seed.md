---
description: ' Use the Navigation Seed component to generate a color-coded markup
  that indicates where your AI can travel in Open 3D Engine. '
title: Navigation Seed
---

{{< preview-migrated >}}

The **Navigation Seed** component marks chunks of the [**Navigation Area**](/docs/user-guide/components/reference/ai/nav-area/) that are accessible to AI agents. Game developers can use this component as a visual aid to determine where AI agents can go.

The **[Navigation Area](/docs/user-guide/components/reference/ai/nav-area/)** component can generate a complex\-looking mesh with disconnected islands. If this happens, it can be difficult to determine the precise places that your AI can reach. In this case, use the **Navigation Seed** component to render a color\-coded map. The blue chunks are accessible to AI and the red chunks are inaccessible.

![\[Example Navigation Seed component with red and blue chunks.\]](/images/user-guide/component/component-navigation-mesh-seed-enabled.png)

For example, [static objects](/docs/user-guide/components/reference/nav-area/#component-nav-area-static-entities), [exclusion areas](/docs/user-guide/components/reference/nav-area/#component-nav-area-exclusion), or terrain features can divide a [navigation area](/docs/user-guide/components/reference/ai/nav-area/) into multiple chunks. The **Navigation Seed** component marks in blue where AI can reach if they are already in that chunk (for example, if they spawned there). You might have multiple navigation areas in one location, such as for different [agent types](/docs/user-guide/components/reference/nav-area/#component-nav-area-properties). In this case, use the **Navigation Seed** component to calculate accessibility for all [agent types](/docs/user-guide/components/reference/navigation/#component-navigation-properties) or a specific agent type in the chunk where you placed the navigation seed.

**To use the Navigation Seed component**

1. [Create a navigation area](/docs/user-guide/components/reference/ai/nav-area/).

1. Divide the navigation area into multiple chunks using [static objects](/docs/user-guide/components/reference/nav-area/#component-nav-area-static-entities), [exclusion areas](/docs/user-guide/components/reference/nav-area/#component-nav-area-exclusion), or terrain.

1. [Add](/docs/userguide/components/working-adding.md) the **Navigation Seed** component to the navigation area entity or to a separate entity.

2. If you want to specify an [agent type](/docs/user-guide/components/reference/navigation/#component-navigation-properties), select it in the **Navigation Seed** component.

3. [Move](/docs/userguide/editor/toolbars) the seed around.

   If you [turned on visualization](/docs/userguide/components/nav-area#render-navigation-mesh), all AI\-accessible areas render blue in the chunk where you placed the navigation seed. Inaccessible areas render red.

**To calculate accessibility for agent types**
+ In the **Navigation Seed** component, do one of the following:

  1. To calculate accessibility for all agent types, leave the **Agent Type** field blank.

  1. To calculate accessibility for a specific agent type, select a type in the **Agent Type** drop\-down list.

By default, the navigation seed visualization system is not enabled. You must use the console to enable some flags.

**To enable Navigation Seed visualization**
+ Enable the following console variables. To do this, set the value to `1`.
  + `ai_MNMDebugAccessibility` (In O3DE Editor, you can also choose **Game**, **AI**, **Visualize Navigation Accessibility**./)
  + `ai_DebugDraw`
  + `ai_DebugDrawNavigation`

  For more information, see [Using the Console Window](/docs/user-guide/editor/console/).

**Note**
The **Navigation Seed** component exists only in O3DE Editor.
