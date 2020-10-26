# Volumetric Fog<a name="rendering-graphics-fog-volumetric"></a>

Volumetric fog uses volume textures as a view\-frustum\-shaped [voxel](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#voxel) buffer to store incoming light and its properties\. Volumetric fog supports regular light and sunlight with dynamic shadows, environment probes, ambient light, as well as variations in fog density\. It also supports the application of volumetric fog with respect to opaque and transparent materials\.

**Example**  
In the following example, volumetric fog is disabled\.  

![\[Volumetric fog disabled\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-volumetric-fog-disabled.png)

**Example**  
In the following example, volumetric fog is enabled\.  

![\[Volumetric fog enabled\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/rendering/rendering-graphics-volumetric-fog-enabled.png)

You can add the **Fog Volume** component to an entity to create fog effects\. For more information, see the **[Fog Volume](component-fog-volume.md)** component\.

You can specify how light components affect volumetric fog\. For more information, see [Light Component Fog Properties](component-fog-volume.md#fog-component-light-property)\.

You can also use the **Particle Editor** to place a particle emitter in your level to add fog density to an area\. For more information, see the **Volume Fog** and **Volume Thickness** parameters for the **Advanced Attribute** in the [Particles Attributes Reference](particle-editor-reference.md)\. 

To add localized nonvolumetric regions of fog, see [Using Fog Volumes](weather-fog-volumes.md)\.

**Topics**
+ [Best Practices for Volumetric Fog](rendering-graphics-fog-volumetric-bp.md)
+ [Setting Global \(Time of Day\) Volumetric Fog](rendering-graphics-fog-volumetric-global.md)
+ [Console Variables for Volumetric Fog](rendering-graphics-fog-volumetric-console-variables.md)