# Working with camera screen effects<a name="rendering-graphics-cameras"></a>

You can use rendering cameras to define custom views within your level\. You can trigger them using the Track View or the **Enable Depth Of Field** Script Canvas node\. Rendering cameras are used frequently for animated sequences\.

For more information about how to add and use rendering cameras, see [Camera Entity](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/entities-entity-camera.html)\.

## Depth of Field<a name="rendering-graphics-cameras-dof"></a>

Lumberyard uses an efficient gather\-based depth of field \(DOF\) implementation\. Depth of field is used to enhance the realism of a scene by simulating the way a real\-world camera works\. Use a broad depth of field to focus on all or nearly all of a scene\. Use a narrow depth of field to focus on objects that are within a certain distance from the camera\.

![\[Depth of Field\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-dof.gif)

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-dof-disabled.png)

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-dof-enabled.png)

You can enable depth of field by using the `r_depthOfFieldMode` console variable\. To control depth of field use the Track View or the **Enable Depth Of Field** Script Canvas node\.

## Motion Blur<a name="rendering-graphics-cameras-motion-blur"></a>

Lumberyard uses a sample\-weighted motion blur implementation whose settings mirror real\-world camera shutter speed settings\.