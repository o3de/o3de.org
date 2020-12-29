# Working with Blend Layers<a name="mat-maps-blend"></a>

Blend layers can be thought of as a layered material\. You can create one material with a second set of per\-pixel functions, including texture maps, UV tiling and offset, rotation and oscillation animation, second UV set, diffuse and specular color tinting, smoothness, and blend masking\.

Integrate blend layers in the Illum and Vegetation shaders and activate them by setting the blend layer shader generation parameters\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-blend-layer-example.png)

**Topics**
+ [Shader Generation Parameters](#mat-maps-blend-shader-generation-parameters)
+ [Blend Layer Textures](#mat-maps-blend-layer-textures)
+ [Blend Layer Parameters](#mat-maps-blend-layer-parameters)

## Shader Generation Parameters<a name="mat-maps-blend-shader-generation-parameters"></a>

You can set the following parameters for generating shaders\.

**Blend layer**  
Activate the texture inputs and parameters for the blend layer\.

**Use UV set 2 for blend layers maps**  
Use a second UV channel, if available, for the second layer\.

## Blend Layer Textures<a name="mat-maps-blend-layer-textures"></a>

You can set the following parameters for your blend layer textures\.

**Second Height Map**  
Displacement map for the blend layer \(grayscale\)

**Second Diffuse Map**  
Diffuse map for the blend layer \(RGB\)

**Second Normal Map**  
Normal map for the blend layer; the second layer gloss map is contained in the alpha \(RGBA\)

**Second Specular Map**  
Specular map for the blend layer \(RGB\)

**Blend Map**  
Blending map to blend between the first and second layers \(grayscale\)

## Blend Layer Parameters<a name="mat-maps-blend-layer-parameters"></a>

You can set the following parameters for your blend layer\.

**Blend Factor**  
Control visibility of the blend layer, with a bias toward black or white  
Valid values: 0 – 16

**Blend Falloff**  
Control the fall off of the blend range  
Valid values: 0\.1 – 128

**Blend Layer 2 Tiling**  
Control tiling of the second blend layer  
Valid values: 0 – 20  
Default: 1

**Blend Layer 2 Diffuse \(Tint\)**  
Base color tint for the second layer \(RGB\)  
Valid values: 0 – 255

**Blend Layer 2 Smoothness**  
Sharpness of specular reflection for the second layer  
Valid values: 0 – 255  
Default: 10

**Blend Layer 2 Specular**  
Reflective brightness and color for the second layer \(RGB\)  
Valid values: 0 – 255

**Blend Mask Tiling**  
Control tiling of the blend map  
Valid values: 0\.05 – 20  
Default: 1