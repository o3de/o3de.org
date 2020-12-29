# Cached Shadows<a name="rendering-graphics-shadows-cached"></a>

Shadow caching is an effective optimization method to reduce the number of shadow drawcalls and to increase the shadow casting and receiving range\. 

Starting from a defined cascade number, Lumberyard can render subsequent shadow cascades and then keep them in memory\. Once the cached cascade is initialized, no more draw calls are needed for updates\. This enables long\-range distant shadows with almost no performance cost\.

Keep in mind that cached shadows are memory intensive, with the default configuration requiring approximately 130 MB of video memory\.

In addition, ensure that all shaders are compiled before triggering an update or all objects may not be rendered into the cached shadow maps\.

## Placement and Update<a name="rendering-graphics-shadows-cached-placement"></a>

Cached shadow cascades are centered around the rendering camera by default, and automatically recenter and update once the camera gets close to the cascade border\.

You can override this automated placement by using the **Recompute Static Shadows** Script Canvas node, which takes the world space **Min** and **Max** input positions of the bounding area for the first cached cascade\. Bounding boxes for subsequent cached cascades are scaled versions of the preceding cascades and are based on the **NextCascadeScale** input multiplier\. The **Trigger** input causes an update of all cached shadow cascades\.

**Note**  
To keep you informed, a warning message appears in the console each time a cached shadow cascade is updated\.

## Dynamic Distance Shadows<a name="rendering-graphics-shadows-cached-dynamic-distance"></a>

Cached shadows work well with static objects, but dynamic objects don't get their shadows updated while moving\. To overcome this, you can selectively exclude dynamic objects from the cache and render them to the standard cascades\. The performance overhead of enabling this feature for a limited number of entities is generally low\.

**To enable dynamic distance shadows for an object**
+ Select the **DynamicDistanceShadows** check box for the entity\.

## Console Variables<a name="rendering-graphics-shadows-cached-cvars"></a>

When Lumberyard is set to place shadows automatically, the selected resolution combined with the desired world space pixel density, which is derived from the approximate logarithmic split scheme, determines the world space area covered by each shadow cascade\. Lowering the resolution lowers the shadowed range for each cascade while still maintaining shadow quality\. 

When you place shadows manually, the resolution is uniformly stretched across the shadow cascade\. Consequently, lower resolutions result in lower shadow quality at the same world space coverage\.

Use the following console variables to control cached shadows, including setting the placement and resolution for individually cached shadow cascades\.
+ **r\_ShadowsCache** – Caches all sun shadow cascades above the value\. 0 = no cached cascades, 1 = cache first cascade and up, 2 = cache second cascade and up\.
+ **r\_ShadowsCacheResolutions** – The resolution of the cached cascades\. 
+ **r\_ShadowsCacheFormat** – Storage format for cached shadow maps: 0 = D32: 32 bit float, 1 = D16: 16 bit integer\.
+ **e\_ShadowsCacheUpdate** – Triggers updates of cached shadow maps: 0 = no update, 1 = one update, 2 = continuous updates\.
+ **e\_ShadowsCacheObjectLod** – The level of detail \(LOD\) used for rendering objects into the cached shadow maps\. 
+ **e\_ShadowsCascadesDebug** – Enables debug view mode\. 0 = disable, 1 = enable\. 
+ **e\_DynamicDistanceShadows** – Toggles support for having selected objects cast dynamic shadows\. 