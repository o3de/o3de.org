# Water Shader<a name="shader-ref-water"></a>

The Water shader is a dedicated shader used to render the ocean exclusively, and imparts various reflection, ripple, and foam effects\. For lakes, rivers, and other bodies of water, use the [VolumeObject Shader](shader-ref-volumeobject.md) instead\.

## Shader Parameters<a name="shader-ref-water-shader-parameters"></a>

**Crest Foam Amount**  
Sets amount of foam that appears at the crest of a wave\. Use for FFT\-displaced ocean only on the Very High Spec setting\. **Foam** shader generation parameter must be enabled first\.  
Default value: 1

**Detail Normals scale**  
 Sets normal scale\.  
Default value: 0\.5

**Detail Tiling**  
Sets waves detail bump tiling\.  
Default value: 2\.5

**Fake camera speed**  
Causes the surface of the water to scroll in world\-space\. This parameter gives the impression that a stationary object in the ocean is actually moving through the ocean\. **Fake camera movement** shader generation parameter must be enabled first\.  
Default value: 0

**Foam Amount**  
Multiplier for foam\. **Foam** shader generation parameter must be enabled first\.  
Default value: 1

**Foam soft intersection**  
Very similar to soft intersection, but blends foam on intersection regions\. **Foam** shader generation parameter must be enabled first\.  
Default value: 0\.75

**Foam tiling**  
Sets tiling amount for foam\. **Foam** shader generation parameter must be enabled first\.  
Default value: 12

**Fresnel gloss**  
The gloss of the Fresnel effect\.  
Default value: 0\.9

**Gradient scale**  
Applies a more choppy look to waves\.  
Default value: 0\.1

**Height scale**  
Sets scale for height map, which is used for parallax mapping approximation\.  
Default value: 0\.2

**Normals scale**  
Sets overall scale for normals\.  
Default value: 1\.25

**Rain ripples tiling**  
Sets tiling for rain ripples\.  
Default value: 1

**Reflection bump scale**  
Reflection map bump scale\.  
Default value: 0\.1

**Reflection scale**  
Sets real\-time reflection map multiplier or cube map multiplier for water volumes\.  
Default value: 1

**Ripples normals scale**  
Sets dynamic ripples normals scale\.  
Default value: 1

**Soft intersection factor**  
Sets water soft intersection with geometry\.  
Default value: 1

**SSS scale**  
Sets SSS scale\.  
Default value: 2

**Tiling**  
Sets waves bump tiling\.  
Default value: 10

**Watervol flow speed**  
Default value: 

****  
Sets the flow speed for the water volume flow map\. **Water Volume flow** shader generation parameter must be enabled first\.  
Default value: 10

## Shader Generation Parameters<a name="shader-ref-water-shader-generation-parameters"></a>

**Water Volume flow**  
Enables water flow along UVs\.

**Water Volume**  
Disable this parameter to use the Water shader\. 

**Sunshine**  
Enables sunshine effects on the ocean surface\.

**Fake camera movement**  
Enables fake camera movement for scenes in the ocean\.

**No refraction bump**  
Disables refraction bump\.

**Foam**  
Enables foam on the ocean surface\.