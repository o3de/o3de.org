# HumanSkin Shader<a name="shader-ref-humanskin"></a>

The HumanSkin shader is used to render skin and its various physical properties including color, oiliness, pores, stubble, and wrinkles\.

## Shader Parameters<a name="shader-ref-humanskin-shader-parameters"></a>

**Detail bump scale**  
Controls the strength of the detail normal map\.  
This parameter requires that the **Detail normal map** shader generation parameter is enabled\.  
Default value: 0

**Displacement bias**  
For information, see Tessellation and Displacement\.  
This parameter requires that the **Displacement mapping** shader generation parameter is enabled\.  
Default value: 0\.5

**Displacement height scale**  
For information, see Tessellation and Displacement\.  
This parameter requires that the **Displacement mapping** shader generation parameter is enabled\.  
Default value: 1

**Indirect bounce color**  
Sets the amount of indirectly bounced color\.  
Default value: 136,136,136

**Melanin**  
Controls the amount of pigmentation in the skin\.  
Default value: 0

**SSS Index**  
Changes the index of subsurface scattering \(SSS\)\.  
Default value: 1\.2

**Tessellation face cull**  
This parameter requires that the **Displacement mapping** shader generation parameter is enabled\.  
Default value: 0\.75

**Tessellation factor**  
This parameter requires that the **Displacement mapping** shader generation parameter is enabled\.  
Default value: 1

**Tessellation factor max**  
This parameter requires that the **Displacement mapping** shader generation parameter is enabled\.  
Default value: 32

**Tessellation factor min**  
This parameter requires that the **Displacement mapping** shader generation parameter is enabled\.  
Default value: 1

**Translucency Multiplier**  
Controls strength of the SSS feature\.  
Default value: 0

**Wrinkles blend**  
Controls strength of the wrinkle map\.  
This parameter requires that the **Wrinkle blending** shader generation parameter is enabled\.  
Default value: 1\.0

## Shader Generation Parameters<a name="shader-ref-humanskin-shader-generation-parameters"></a>

**Decal map**  
Enables the use of a decal map, which is blended on top of the diffuse map\.

**Detail normal map**  
Enables the use of a tiled detailed map for pores and tiny details \(\_ddn\)\.

**Displacement mapping**  
Enables the use of displacement mapping, which requires a height map \(\_displ\)\.

**Phong tessellation**  
Enables the use of rough approximation of smooth surface subdivision\.

**PN triangles tessellation**  
Enables the use of rough approximation of smooth surface subdivision\.

**Subsurface Scattering Mask**  
Enables the use of diffuse map alpha as an SSS amount multiplier\.

**Wrinkle blending**  
Enables the use of subsurface map alpha for wrinkle blending\.