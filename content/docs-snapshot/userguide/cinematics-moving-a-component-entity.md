# Moving a Component Entity in a Sequence<a name="cinematics-moving-a-component-entity"></a>

Each component entity has a **Transform** component\. By default, when you add a component entity to a sequence, the **Position** and **Rotation** tracks appear automatically\. You can manipulate the **Position** and **Rotation** properties for the component entity in a sequence\. You can also add the **Scale** track if you want to manipulate the overall size of the component entity\.

 Each of the tracks has a subtrack for **XYZ** properties so that you can animate each axis\.

![\[Transform properties in a sequence.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-track-view-editor-moving-component-entity-1.png)

You can add any number of keys for each track as needed, and adjust the transitions with the ****Curve Editor****\. 

For more information, see [Using Animation Curves](cinematics-track-view-editor-animation-curves.md)\.

When moving component entities, we recommend the following workflows:
+ Manipulate the component entity in the level and then manually add your animation keys\. 

  For more information, see [Adding and Removing Animation Keys on Tracks](adding-removing-animation-keys-on-tracks.md)
+ Use record mode to set your keys\. For more information, see [Using Record Mode](cinematics-using-record-mode.md)\.

**To set transform keys with record mode**

1. In the Track View, create or select sequence and add a component entity\. See [Adding Component Entities](cinematics-adding-component-entities.md)\.

1. By default, the **Transform** component attached to the entity automatically adds the **Position** and **Rotation** tracks to the sequence\.  
![\[Position and Rotation properties in the timeline for a sequence.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-track-view-editor-using-record-mode-1.png)

1. To maintain the current position and rotation of the game object, add an animation key for both tracks at `0` on the timeline\.

1. Select and drag the playhead to a different position on the timeline\.

1. Move the Track View window to the side or dock it so that it's still open, but not blocking the viewport for the currently open level\.

1. Click the **Start Animation Recording** icon to enter record mode\.

1. In the viewport or the **Entity Outliner**, select the component entity\.

1. Use the translation tool to move the entity farther back into the level\. You can also enter values in the **Transform** component properties\.

1. View the timeline for the sequence\. New keys appear on the **Position** track at the `1` second position\.  
![\[View the newly added key in the timeline for a sequence.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cinematics/cinematics-track-view-editor-using-record-mode-3.png)

1. Move the playhead to where you want to set another animation key and then adjust the property values again\.

1. When finished, click the **Start Animation Recording** icon again to exit record mode\.