# Using Fog Volumes<a name="weather-fog-volumes"></a>

Fog volumes are localized 3D areas that define an area where non\-volumetric fog is present\. Fog volumes do not change in dynamic, nonuniform ways like smoke does\. When alpha\-transparent objects are behind fog volumes, each pixel is fogged\. However, this is not the case when objects are inside fog volumes\.

Unlike global \(Time of Day\) fog that has an upward falloff direction, fog volumes can have an arbitrary falloff direction\. Interesting fog shapes and effects can be achieved, including fog patches that vary in size, color, shape, density, and spacing over time, as well as being influenced by wind\.

Observe these best practices when creating fog volumes
+ Do not overlap fog volumes\.
+ Make sure indoor fog volumes don't cover more than one sector or they may be culled when the main sector becomes invisible\.
+ To avoid inaccurate rendering, don't apply nonuniform scaling to fog volumes\.
+ When using shadow maps inside fog volumes, make sure the environment **VolFogShadows** parameter is disabled\.

You can add the **Fog Volume** component to an entity to create fog effects\. For more information, see the **[Fog Volume](component-fog-volume.md)** component\.