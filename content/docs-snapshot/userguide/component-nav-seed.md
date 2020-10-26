# Navigation Seed<a name="component-nav-seed"></a>

The **Navigation Seed** component marks chunks of the [**Navigation Area**](component-nav-area.md) that are accessible to AI agents\. Game developers can use this component as a visual aid to determine where AI agents can go\. 

The **[Navigation Area](component-nav-area.md)** component can generate a complex\-looking mesh with disconnected islands\. If this happens, it can be difficult to determine the precise places that your AI can reach\. In this case, use the **Navigation Seed** component**** to render a color\-coded map\. The blue chunks are accessible to AI and the red chunks are inaccessible\.

![\[Example Navigation Seed component with red and blue chunks.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-navigation-mesh-seed-enabled.png)

For example, [static objects](component-nav-area.md#component-nav-area-static-entities), [exclusion areas](component-nav-area.md#component-nav-area-exclusion), or terrain features can divide a [navigation area](component-nav-area.md) into multiple chunks\. The **Navigation Seed** component marks in blue where AI can reach if they are already in that chunk \(for example, if they spawned there\)\. You might have multiple navigation areas in one location, such as for different [agent types](component-navigation.md#component-navigation-properties)\. In this case, use the **Navigation Seed** component to calculate accessibility for all [agent types](component-nav-area.md#component-nav-area-properties-agent-types) or a specific agent type in the chunk where you placed the navigation seed\.

**To use the Navigation Seed component**

1. [Create a navigation area](component-nav-area.md)\.

1. Divide the navigation area into multiple chunks using [static objects](component-nav-area.md#component-nav-area-static-entities), [exclusion areas](component-nav-area.md#component-nav-area-exclusion), or terrain\. 

1. [Add](component-working-adding.md) the **Navigation Seed** component to the navigation area entity or to a separate entity\.

1. If you want to specify an [agent type](component-navigation.md#component-navigation-properties), select it in the **Navigation Seed** component\.

1. [Move](lumberyard-editor-toolbars.md#lumberyard-editor-toolbars-editmode) the seed around\.

   If you [turned on visualization](component-nav-area.md#render-navigation-mesh), all AI\-accessible areas render blue in the chunk where you placed the navigation seed\. Inaccessible areas render red\.

**To calculate accessibility for agent types**
+ In the **Navigation Seed** component, do one of the following:

  1. To calculate accessibility for all agent types, leave the **Agent Type** field blank\.

  1. To calculate accessibility for a specific agent type, select a type in the **Agent Type** drop\-down list\.

By default, the navigation seed visualization system is not enabled\. You must use the console to enable some flags\.

**To enable Navigation Seed visualization**
+ Enable the following console variables\. To do this, set the value to `1`\.
  + `ai_MNMDebugAccessibility` \(In Lumberyard Editor, you can also choose **Game**, **AI**, **Visualize Navigation Accessibility**\./\)
  + `ai_DebugDraw`
  + `ai_DebugDrawNavigation`

  For more information, see [Using the Console Window](console-intro.md)\.

**Note**  
The **Navigation Seed **component exists only in Lumberyard Editor\.