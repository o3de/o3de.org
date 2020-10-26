# Hair Shader<a name="shader-ref-hair"></a>

The Hair shader is a dedicated shader for rendering hair and fur, imparting different color, stranding, and animation effects\. Hair rendering is a relatively difficult task to achieve in real\-time with high\-quality results due to the very fine geometry and specific lighting behavior\. Depending on the hairstyle, either a simple scalp plane or a more complex shape that defines the volume of the hairstyle is needed\. In some cases, breaking up a hairstyle into multiple large patches makes more sense\. 

## Shader Parameters<a name="shader-ref-hair-shader-parameters"></a>

**Alpha Blend Multiplier**  
Multiplies the alpha map with the result that grayscale values are increased\. Useful for the **Thin Hair** shader generation parameter\.  
Default value: 1

**Diffuse Wrap**  
Allows light to pass through the hair, thus illuminating a wider area\.  
A tightly woven braid would have a lower **Diffuse Wrap** value \(the hair being very dense\), whereas sparse, loose hair would have a high **Diffuse Wrap** value\.  
Default value: 0\.5

**Indirect bounce color**  
Sets the amount of indirectly bounced color\.  
Default value: 136,136,136

**Secondary Color**  
Sets color and intensity of the secondary specular highlight\.  
Primary highlight color depends on the diffuse color, whereas the secondary highlight usually has a more neutral color\.  
Default value: 217,217,217

**Secondary Shift**  
Allows the secondary highlight to be shifted over the surface of the hair mesh\. Make sure it works with the primary highlight, the position of which can’t be shifted\.  
Default value: 0\.1

**Secondary Width**  
Sets the width of the secondary specular highlight\.  
Default value: 1\.5

**Shift Variation**  
Adds variation to the shift of the secondary highlight\.  
Default value: 0

**Soft Intersection**  
Controls the alpha blending of the hair against skin or scalp\.  
Default value: 0

**Strand Width**  
Controls the width of the view aligned hair strands\. The mesh you exported utilizing this feature from DCC tools is rather thin\. The value functions as a multiplier relative to the meshes V coordinate \(width\) in UV space, which can be used to control strand thickness\. For example, you might want thinner strands around the border areas\.  
This parameter requires that the **View aligned strands** shader generation parameter is enabled\.  
Default value: 0\.01

**Thin Hair Threshold**  
Determines how alpha blending works for screen space effects such as DOF and motion blur\. Lower values make the blending harder but can cause artifacts\. Higher values soften the blending, but in some cases the hair turns into a blurry mess\.  
For most gameplay situations, the rather low default value works fine, but in cinematics, manual tweaking might be needed\. The value must then be animated throughout the scene\.  
This parameter requires that the **Thin Hair** shader generation parameter is enabled\.  
Default value: 0\.05

**Wind frequency**  
Sets the speed at which the vertices are deformed\.  
This parameter requires that the **Wind bending** shader generation parameter is enabled\.  
Default value: 0

**Wind phase**  
Sets hair animation phase and randomizes the deformation\.  
This parameter requires that the **Wind bending** shader generation parameter is enabled\.  
Default value: 1

**Wind wave0 amp**  
Sets the amount or amplitude at which the vertices are deformed\.  
This parameter requires that the **Wind bending** shader generation parameter is enabled\.  
Default value: 0

**Wind wave2 amp**  
Sets the amount or amplitude at which the vertices are deformed on a different curve\.  
This parameter requires that the **Wind bending** shader generation parameter is enabled\.  
Default value: 0

## Shader Generation Parameters<a name="shader-ref-hair-shader-generation-parameters"></a>

**Vertex Colors**  
Enables vertex colors\.

**View Aligned Strands**  
Enables the hair strands to self\-align to the camera\.   
Because this is a global setting for the material, using view\-aligned strands requires an extra draw call\. For more information, see the **Strand Width** shader parameter\.

**Thin Hair**  
For information, see the **Thin Hair Threshold** shader parameter\.

**Ambient Cubemap**  
Enables the use of the nearest cube map specified in environment map slot for ambient lighting\. Leave this enabled\. 

**Enforce Tiled Shading**  
Forces hair to be fully affected by tile shading\. This effect works as an override for the global tiled shading settings\.  
With tiled shading off, improper lighting of a scene can cause hair to turn very dark\.  
Use this effect carefully, as tiled shading for hair is generally quite expensive\.

**Wind bending**  
Simulates wind effects\. If enabled, various frequency, phase, and amplitude wind options appear under **Shader Parameters**\.