# Waterfall Shader<a name="shader-ref-waterfall"></a>

The Waterfall shader is used for waterfalls exclusively, and provides layering, tiling, and motion effects\.

## Shader Parameters<a name="shader-ref-waterfall-shader-parameters"></a>

**Alpha blend multiplier**  
Applies a multiplier amount for alpha blending\.  
Default value: 1

**Foam deform**  
Deforms the foam texture with a multiplier, based on the bump map texture\. **Foam** shader generation parameter must be enabled first\.  
Default value: 0\.025

**Foam multiplier**  
Applies a multiplier amount for foam texture\. **Foam** shader generation parameter must be enabled first\.  
Default value: 1

**Fresnel bias**  
The Fresnel bias\.  
Default value: 0\.25

**Layer0 bump scale**  
Scales the bump map texture for the first layer\.  
Default value: 2

**Layer0 speed**  
Controls the texture rolling speed for the first layer\.  
Default value: 1

**Layer0 tiling**  
Sets the texture tiling amount for the first layer\.  
Default value: 1

**Layer1 bump scale**  
Scales the bump map texture for the second layer\.  
Default value: 1

**Layer1 speed**  
Controls the texture rolling speed for the second layer\.  
Default value: 2

**Layer1 tiling**  
Sets the texture tiling amount for the second layer\.  
Default value: 2

**Reflect amount**  
Controls the reflection amount, which comes from the environment map\. **Environment map** shader generation parameter must be enabled first\.  
Default value: 

**Refraction bump scale**  
Scale the refraction effect inherited by the bump map texture\.  
Default value: 0\.01

**Sun multiplier**  
Applies a multiplier amount for sun shading\. **Sun shading** shader generation parameter must be enabled first\.  
Default value: 1

## Shader Generation Parameters<a name="shader-ref-waterfall-shader-generation-parameters"></a>

**Environment map**  
Enables the use of an environment map as a separate texture\.

**Sun shading**  
Enables sunlight shading effects\.

**Foam**  
Enables foam rendering\. Uses diffuse texture\.