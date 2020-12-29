# Best Practices for Volumetric Fog<a name="rendering-graphics-fog-volumetric-bp"></a>

See the following best practices for working with volumetric fog\.
+ Attach a **[Fog Volume](component-fog-volume.md)** and a **[Box Shape](component-shapes.md)** component to the entity\.
+ Set the `r_DeferredShadingTiled` console variable to a value greater than 0\. The recommended value is `1` to `2`\. This is required to use volumetric fog\. For more information, see [Using the Console Window](console-intro.md)\.
+ To avoid performance problems, use the default values for the **Ramp Start** and **Ramp End** parameters located in the **Time of Day** editor\. For more information, see [Setting Global \(Time of Day\) Volumetric Fog](rendering-graphics-fog-volumetric-global.md)\. 
+ In the **Time of Day Editor**, large values for the **Range** parameter can cause fog flicker and light leaking behind walls\. 

  To correct this effect, you can adjust the value for the `r_VolumetricFogTexDepth` console variable accordingly\.  
**Example**  

  The default value for the `r_VolumetricFogTexDepth` console variable is `32` and the default value for **Range** is `64`\. If you want to use a larger range such as **Range**=`256` and maintain the same visual quality, you need to set `r_VolumetricFogTexDepth` to `64`\. 

  When **Range** is `1024`, set `r_VolumetricFogTexDepth` to `128`\.