# VolumeObject Shader<a name="shader-ref-volumeobject"></a>

Use Amazon Lumberyard's VolumeObject shader to render volumetric clouds with realistic shading and self\-shadowing effects\.

In addition to the shader parameters, the **Time of Day Editor**'s [**Cloud Shading** parameters](weather-clouds-shading.md) also can affect VolumeObject rendering\. To disable this feature, deselect **Use TOD Settings** in the [Shader Generation Parameters](#shader-ref-volumeobject-shader-generation-parameters)\.

## Shader Parameters<a name="shader-ref-volumeobject-shader-parameters"></a>

Global Density  
Defines how dense the clouds appear\.  
Default value: `1`

## Shader Generation Parameters<a name="shader-ref-volumeobject-shader-generation-parameters"></a>

**Soft Intersections**  
Enhances transparency with opaque scene geometry\. Use this parameter sparingly due to increased pixel shading cost\.

**Back Lighting**  
Enables back lighting of volume objects\. The silhouette slightly glows when viewed against the sun\.

**Jittering**  
Enables jittering on volume objects\.

**Soft Jittering**  
Softens the jittering effect on volume objects\.

**Use TOD Settings**  
Enables time of day \(TOD\) settings\.