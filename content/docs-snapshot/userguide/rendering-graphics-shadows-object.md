# Object Shadows<a name="rendering-graphics-shadows-object"></a>

With object shadows, you can assign custom shadow maps to selected objects, resulting in increased shadow quality due to higher world space shadow texel \(texture element\) density and reduced depth range\.

The drawbacks of using object shadows are increased memory consumption of the additional shadow maps and increased shadow filtering cost\.

Object shadows only affect sun shadows\. For performance reasons they are not sampled on forward geometry such as particles, hair, and eyes\.

## Using I3DEngine<a name="rendering-graphics-shadows-object-i3dengine"></a>

The following I3DEngine interface functions can be called from anywhere in game code\.
+ **AddPerObjectShadow** – Adds an object shadow\.
+ **RemovePerObjectShadow** – Removes an object shadow\.
+ **GetPerObjectShadow** – Retrieves object shadow settings for a given `RenderNode`\. Do not overwrite the `RenderNode` pointer\. Instead use `AddPerObjectShadow\RemovePerObjectShadow`\.
+ **ShadowMapSize**: Size of the custom shadow map, which is automatically rounded to the next power of two\.

## Console Variables<a name="rendering-graphics-shadows-object-cvars"></a>

You can use the **e\_ShadowsPerObject** console variable with object shadows\. With this variable, 0 = 0ff, 1 = on, and \-1 = don't draw object shadows\.