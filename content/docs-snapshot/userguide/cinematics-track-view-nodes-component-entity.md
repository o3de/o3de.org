# Component Entities and Component Nodes<a name="cinematics-track-view-nodes-component-entity"></a>

**Topics**
+ [Naming and Identifying Component Entities](#cinematics-track-view-component-entity-name-components)
+ [Adding or Removing Components from a Component Entity](#cinematics-track-view-component-entity-add-remove-components)
+ [Animating Components on a Component Entity](#cinematics-track-view-animating-components-on-component-entities)

In the Track View, *component entity nodes* function as containers for *component nodes*\. 

When you add an animation using the Track View, the animation track is applied to a component node\. Component entity nodes don't directly have tracks or key properties\. 

**Example**  
The component entity **GameObject** contains **Transform**, **Mesh**, and **Point Light** components\. When you add the **GameObject** component entity to a sequence in the Track View, you can see all the components in the node browser\. The component entity node is a reference to which components are animated in the sequence\.  

![\[Track View and the Entity Inspector with the same component entities.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-component-entities-nodes-track-view-editor-1.png)

Component nodes that can be animated are nested as children under the associated entity node\. You can add animation tracks to any of these component nodes\. 

**To add a track to an animation node**

1. In the Track View, create or select a sequence\.

1. In the node browser, right\-click and choose **Add Track**, then choose the component property\.

Not all components can be animated in the Track View\. For example, you can add the **Visibility** track only for the **Mesh** component\. The **Point Light** component has multiple tracks that you can add to the sequence\. In the following example, the **Color**, **DiffuseMultiplier**, and **Visible** tracks are added to the sequence\.

![\[Add tracks from component entity nodes\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-component-entities-nodes-track-view-editor-2.png)

For more information about adding node support to the Track View, see [Exposing Custom Components to Track View for Animation](component-entity-system-track-view.md)\.

## Naming and Identifying Component Entities<a name="cinematics-track-view-component-entity-name-components"></a>

Lumberyard uses entity IDs to identify component entities, which means that you can name your component entities as you want\. This includes reusing the same name for multiple entities\. In the Track View, if component entity nodes share the same name, a number is appended to the name\. This doesn't change the name of the component entity in the level, but it might be difficult to determine which entity to animate\. 

**Example**  

![\[Duplicate entities in the node browser have numbers appended to the name.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-component-entities-nodes-track-view-editor-3.png)

If you have component entities with the same name \(for example, if they're multiple instances of a slice\), you can determine which entity that you're editing\. For more information, see [Working with Slices and Sequences](working-with-slices-cinematic-sequences.md)\.

## Adding or Removing Components from a Component Entity<a name="cinematics-track-view-component-entity-add-remove-components"></a>

When you add a component to a component entity in Lumberyard Editor, the component is automatically added to any component entity nodes in the Track View\. When you remove a component, the component and any animation data are also removed from the Track View\. 

**Important**  
Be careful when removing components from component entities because it might affect your existing sequence\. For example, if you remove a **Simple Motion** component from an entity that is part of a sequence, the animation no longer references the specified animation\.

## Animating Components on a Component Entity<a name="cinematics-track-view-animating-components-on-component-entities"></a>

Component nodes that can be animated are nested as children under the associated component entity node\. You can add animation tracks to any of these component nodes\. 

**To add an animation track to a component node**

1. In the Track View, select or create a sequence\.

1. In the node browser, right\-click the component node and choose **Add Track**, then choose the track that you want\.

**Note**  
Some components support only a limited number of tracks that can be animated in a sequence\. For more information for component\-specific properties, see the [Component Reference](component-components.md)\.
Not all components can be animated in the Track View\. For more information about adding node support to the Track View, see [Exposing Custom Components to Track View for Animation](component-entity-system-track-view.md)\.

After you add the component entity nodes to the sequence and specify the tracks to animate, you can then add keyframes to the timeline\. In keyframes, you specify where in the timeline you want to animate the property and edit its properties\.

For more information, see [Adding and Removing Animation Keys on Tracks](adding-removing-animation-keys-on-tracks.md)\.