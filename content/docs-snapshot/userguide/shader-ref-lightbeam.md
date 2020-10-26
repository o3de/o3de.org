# LightBeam Shader<a name="shader-ref-lightbeam"></a>

The LightBeam shader creates various fog\-like volumetric and atmospheric effects for light beams\. The shader can only be applied to light entities\. To use the LightBeam shader, create a Projector Light component and assign the shader to the material slot\.

## Shader Parameters<a name="shader-ref-lightbeam-shader-parameters"></a>

**Fade Distance**  
Defines the distance at which the effect should fade in/out\.  
This parameter requires that the **Use Falloff** shader generation parameter is enabled\.  
Default value: 200

**Fade Scale**  
Scales how much the fading effect occurs at defined distance\.  
This parameter requires that the **Use Falloff** shader generation parameter is enabled\.  
Default value: 100

**Global Density**  
Controls how dense or thick the fog effect is\.  
Default value: 1

**Jitter Scale**  
Controls shadow jitter amount\. Use to soften shadow artifacts at the cost of shadow accuracy\.  
Default value: 10

**Noise Contrast**  
Defines the contrast level of the noise effect\.  
This parameter requires that the **Noise map** shader generation parameter be enabled\.  
Default value: 1

**Noise Coord Scale**  
Scales noise\. Applies to shadow and projector UVs\.  
This parameter requires that the **Noise map** shader generation parameter be enabled\.  
Default value: 0\.005

**Noise Dir X**  
Defines noise travel along the x\-axis\.  
This parameter requires that the **Noise map** shader generation parameter be enabled\.  
Default value: 1

**Noise Dir Y**  
Defines noise travel along the y\-axis\.  
This parameter requires that the **Noise map** shader generation parameter be enabled\.  
Default value: 0

**Noise Dir Z**  
Defines noise travel along the z\-axis\.  
This parameter requires that the **Noise map** shader generation parameter be enabled\.  
Default value: 0

**Noise Speed**  
Controls the speed at which noise travels\.  
This parameter requires that the **Noise map** shader generation parameter be enabled\.  
Default value: 5

## Shader Generation Parameters<a name="shader-ref-lightbeam-shader-generation-parameters"></a>

**Noise map**  
Enables the use of a 3D, procedurally\-generated noise map\.

**Use Falloff**  
Activates the **Fade**\-type shader parameters to tweak visual fall\-off settings\.

**Extra Sampling**  
Reduces aliasing for slightly more expensive rendering\.