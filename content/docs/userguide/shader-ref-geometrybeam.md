# GeometryBeam Shader<a name="shader-ref-geometrybeam"></a>

Use the GeometryBeam shader to create volumetric light beams that feature dust and turbulence effects\. 

## Shader Parameters<a name="shader-ref-geometrybeam-shader-parameters"></a>

**Ambience strength**  
Controls the general strength of the beam effect\.  
Default value: 0\.12

**Base UV scale**  
Controls the scale or tiling of the object's base UV mapping\.  
Default value: 1

**Brightness**  
Controls the overall brightness of the beam effect\.  
Default value: 1

**Dust anim speed**  
Controls the animation speed for the dust turbulence effect, as defined by the Specular texture map\.  
This parameter requires that the **Dust Turbulence** shader generation parameter is enabled\.  
Default value: 1

**Dust UV rotation**  
Changes the rotation of the dust turbulence effect, as defined by the Specular texture map\.  
This parameter requires that the **Dust Turbulence** shader generation parameter is enabled\.  
Default value: 0

**Dust UV scale**  
Sets the scale or tiling of the UV mapping for the dust turbulence effect, as defined by the Specular texture map\.  
This parameter requires that the **Dust Turbulence** shader generation parameter is enabled\.  
Default value: 0\.6

**End color**  
Sets the end color for gradient along the U axis\.  
Default value: 255,255,255

**Soft intersection factor**  
Controls softness of surface interaction with other opaque scene geometry\.  
Default value: 1

**Start color**  
Sets the start color for gradient along the U axis\.  
Default value: 255,255,255

**Turbulence tiling**  
Multiplies turbulence, as defined by the **Bumpmap** texture map\.  
This parameter requires that the **Dust Turbulence** shader generation parameter is enabled\.  
Default value: 1

**Turbulence visibility**  
Controls the visibility level of turbulence, as defined by the bump map texture map\.  
This parameter requires that the **Dust Turbulence** shader generation parameter is enabled\.  
Default value: 0\.55

**UV vignetting**  
Applies a vignetting effect to the edges of the UV map\.  
This parameter requires that the **UV Vignetting** shader generation parameter is enabled\.  
Default value: 4

**Vertex alpha fading**  
If you use vertex alpha to fade out the edges, use this slider to control the interpolation curve\.  
Default value: 0\.55

**View dependency factor**  
Determines how beams blend in and out depending on the camera\-facing angle\.  
The higher the value, the longer the beam is visible even when at a nearly 90° angle to camera\. Smaller values cause the beam to begin to vanish\.  
Default value: 2

**Volumetric scale**  
Controls the volumetric features when shadow receiving is enabled\. This also has the effect of changing the soft shadow radius\.  
This parameter requires that the **Receive Shadows** shader generation parameter is enabled\.  
Default value: 0\.7

## Shader Generation Parameters<a name="shader-ref-geometrybeam-shader-generation-parameters"></a>

**Dust Turbulence**  
Enables dust and turbulence overlay\. **Specular** and **Bumpmap** texture map slots also become available under **Texture Maps** to fine\-tune appearance\.

**Receive Shadows**  
Enables sun shadows to be cast on the light beams, creating volumetric shafts\.  
You can use this parameter for an interesting effect, but it might affect your game’s performance\. 

**UV Vignetting**  
Enables vignettes in UV space\.