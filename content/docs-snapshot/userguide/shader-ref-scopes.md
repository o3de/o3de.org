# Scopes Shader<a name="shader-ref-scopes"></a>

The Scopes shader is used to render various optical effects for binoculars, telescopes, and weapon sight scopes\.

## Shader Parameters<a name="shader-ref-scopes-shader-parameters"></a>

**Fake glow amount**  
Sets the amount of fake glow\.  
This parameter requires that the **Reflex sight new** shader generation parameter is enabled\.  
Default value: 0\.25

**Fresnel Bias**  
Sets the amount of fresnel bias\.  
This parameter requires that the **Scope zoomed refraction** shader generation parameter is enabled\.  
Default value: 1

**Fresnel Scale**  
Sets the fresnel scaling amount\.  
This parameter requires that the **Scope zoomed refraction** shader generation parameter is enabled\.  
Default value: 1

**Hologram depth**  
Sets the depth of the hologram\.  
This parameter requires that the **Use halo sight depth** shader generation parameter is enabled\.  
Default value: 2

**Holographic noise scale**  
Sets the holographic noise scale\.  
This parameter requires that the **Reflex sight new** shader generation parameter is enabled\.  
Default value: 0

**Noise bias**  
Sets noise bias\.  
This parameter requires that the **Reflex sight new** shader generation parameter is enabled\.  
Default value: 1

**Noise scale**  
Sets noise scale\.  
Default value: 0\.75

**Object space UV usage**  
Sets the amount of usage of object space\.  
Default value: 0

**Refraction Bump Scale**  
Sets the amount of scaling for refraction bumpiness\.  
Default value: 0

**Scope color multiplier**  
Sets the scope color multiplier\.  
Default value: 160

**Scope scale**  
Sets scope scale\.  
Default value: 4

## Shader Generation Parameters<a name="shader-ref-scopes-shader-generation-parameters"></a>

**Reflex sight**  
Use for reflex\-style weapon sights\. When enabled, the **Diffuse** texture map slot under **Texture Maps** also becomes available\.

**Reflex sight new**  
Use for the newer version reflex\-style weapon sights\. When enabled, the **Diffuse** texture map slot under **Texture Maps** also becomes available\.

**Scope zoomed refraction**  
Use to produce light refraction effects for zoomed\-in scopes\.

**Use halo sight depth**  
Used for holographic\-style weapon sights with a depth\-field modifier\.

**Thermal vision scope**  
Use to produce thermal color effects for night\-use scopes\.