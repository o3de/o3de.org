---
linkTitle: Custom Lighting
title: Custom Lighting Tutorial with Flipbook Animation
description: A tutorial for custom lighting using a flipbook animation with six-point lighting in the Atom renderer of the Open 3D Engine (O3DE).
toc: true
---
This tutorial covers how to make a six-point lighting material type by writing custom shaders to apply lighting to an animated 2D object, creating a cloud/smoke effect.

Volumetric effects such as smoke and clouds can be represented with animated textures. To render these texture effects and approximate a three dimensional volume, you will need a custom material type. The technique in this tutorial approximates how each texture should be lit from any given direction by using six tangent lightmaps that represent the top, bottom, left, right, front, and back of a plume of smoke.

The six-point lighting material type uses textures that color the illuminated parts of the texture if light came from a corresponding direction. For example, the picture below shows a plume of smoke with lighting coming from the left, which corresponds to the green texels in the lightmap. Red texels indicate which texels of the smoke should be lit up by lighting from the right. Thus, yellow (green + red) texels mean that lighting from both the left and right should be applied to those texels. This information can then be used to form the six tangent lightmaps and apply lighting on the material accordingly.

{{< image-width src="/images/learning-guide/tutorials/rendering/six-point-lighting/spl-comparison.png" width="50%" alt="Picture of a frame of a light map on the left with a picture of the cloud on right with lighting coming from the left." >}}

This tutorial covers the following concepts:
* Edit your own material type
* Toggle property visibility in the **Material Editor** with Lua
* Animate materials
* Edit pixel shaders 
   * Add custom surface
   * Add custom lighting

## Make a material type
Follow these steps to make the six-point lighting material type.

1. Download or clone the [`o3de/sample-code-gems`](https://github.com/o3de/sample-code-gems) repository from GitHub.

1.  Move all of the files in `atom_gems/AtomTutorials/Templates/SixPointLighting/` to `{your-project-path}/Materials/Types`. Make the folders as needed. These template files have everything set up for you to get started with creating your own custom surface and lighting.
   
1. Move all the files in `atom_gems/AtomTutorials/Assets/SixPointLighting/Objects/` to `{your-project-path}/Objects`. 
   
   {{< note >}}
   These textures are provided by [peeweek/Unity-URP-SmokeLighting](https://github.com/peeweek/Unity-URP-SmokeLighting/tree/main/Assets/VFX/SmokeLighting/Textures/2D) on GitHub and distributed under the MIT license.
   {{< /note >}}

1. Open `{your-project-path}\Materials\Types\SixPointLighting.materialtype` in a text editor. 

1. Under `propertyLayout` > `propertyGroups`, replace all instances of `{your-path-to-o3de}` with the appropriate path to your engine.
   
   For example, `C:/o3de/Gems/Atom/Feature/Common/Assets/Materials/Types/MaterialInputs/BaseColorPropertyGroup.json`.


### Six-point lighting material type properties
The six-point lighting material type contains the following properties. You will use these properties throughout the tutorial. They are defined in the files `SixPointLighting_Common.azsli` and `SixPointLighting_ForwardPass.azsl`. 
| Property | Description | Type |
| :-- | :-- | :-- |
| `o_sixPointTexturePackMode` | Indicates which texture pack mode to use. | Shader option |
| `m_topLeftRightBottomMap` | Defines the top-left-right-bottom light map. | Texture |
| `m_frontBackMap` | Defines the front-back light map. | Texture |
| `m_rightLeftTopMap` | Defines the right-left-top light map. | Texture |
| `m_bottomBackFrontMap` | Defines the bottom-back-front light map. | Texture |
| `o_enableDepthTexture` | Toggles whether or not to use a depth texture. | Boolean Shader option |
| `m_depthMap` | A depth texture map. | Texture |
| `m_depthScale` | Scales the depth texture. | Float |
| `m_rowCount` | The number of rows in the flipbook animation. | Int |
| `m_columnCount` | The number of columns in the flipbook animation | Int |
| `o_enableDebugFrame` | If enabled, activates debugging on a single frame of the animation. | Boolean Shader option |
| `m_debugFrame` |The frame number to debug, when `o_enabledDebugFrame` is enabled. | Int |

{{< note >}}
Everything involving `depth`, including the depth pass and the three properties, won't be used in this tutorial because we lack a depth map texture. However, `SixPointLighting_DepthPass_WithPS.azsl` in the final files does provide the code for adjusting the depth, so you can take a look at that if you are interested in how we would adjust the depth pixel shader.
{{< /note >}}

## Write Lua functor to toggle visibility in the Material Editor
The six-point lighting material type allows for six tangent lightmaps that correspond to six colors from the textures. However, each texture can only contain up to four channels (red, green, blue, alpha), so the technique requires two textures. The channels used for each texture can be up to the artist, but this material type in this tutorial will provide support for two options for the color-channel-to-direction mapping. The mapping will later be used for determining the appropriate lighting.

* TopLeftRightBottom_FrontBack option
   * First texture:
      * Top : Red 
      * Left : Green
      * Right : Blue
      * Bottom : Alpha
   * Second texture:
      * Front : Red
      * Back : Green
* RightLeftTop_BottomBackFront option
   * First texture:
      * Right : Red 
      * Left : Green
      * Top : Blue
   * Second texture:
      * Bottom : Red
      * Back : Green
      * Front : Blue

In `SixPointLightingPropertyGroup.json`, there is already four properties for the set of two textures for both options. They are also already defined in `SixPointLighting_Common.azsli`. However, you will want to provide a `.lua` script to the material type so that if you select one option from the dropdown for *Texture Pack Mode* in the **Material Editor**, only the corresponding properties show up.

1. Open `SixPointLighting_TexturePackEnum.lua`. Notice the two functions `GetMaterialPropertyDependencies()` and `ProcessEditor()`. `GetMaterialPropertyDependencies()` gets the value of a property of a material. `ProcessEditor()` can then use the property values to enable and disable visibility of the properties in the Material Editor.

1. Following how `sixPointLighting.TLRB`'s visibility is enabled and disabled, enable and disable the other texture options as appropriate:

   ```lua
   if(texturePackMode == TexturePackMode_TpLftRtBt_FrBck) then
      -- TopLeftRightBack is the first texture, FrontBack is the second. Disable RightLeftTop and BottomBackFront.
      context:SetMaterialPropertyVisibility("sixPointLighting.TLRB", MaterialPropertyVisibility_Enabled)
      context:SetMaterialPropertyVisibility("sixPointLighting.FB", MaterialPropertyVisibility_Enabled)
      context:SetMaterialPropertyVisibility("sixPointLighting.RLT", MaterialPropertyVisibility_Hidden)
      context:SetMaterialPropertyVisibility("sixPointLighting.BBF", MaterialPropertyVisibility_Hidden)
   elseif(texturePackMode == TexturePackMode_RtLftTp_BtBckFr) then
      -- RightLeftTop is the first texture, BottomBackFront is the second. Disable TopLeftRightBack and FrontBack.
      context:SetMaterialPropertyVisibility("sixPointLighting.TLRB", MaterialPropertyVisibility_Hidden)
      context:SetMaterialPropertyVisibility("sixPointLighting.FB", MaterialPropertyVisibility_Hidden)
      context:SetMaterialPropertyVisibility("sixPointLighting.RLT", MaterialPropertyVisibility_Enabled)
      context:SetMaterialPropertyVisibility("sixPointLighting.BBF", MaterialPropertyVisibility_Enabled)
   end
   ```

## Make a six-point lighting material
Now that the six-point lighting material type properties are exposed to the Material Editor, you can make a six-point lighting material.

1. Open the **Material Editor**, and make a new material with the six-point lighting material type.
   
1. Find the **Six Point Lighting** properties in the **Inspector**.
   
1. Notice how the default **Texture Pack Mode** is `TpLftRtBt_FrBck`. The two properties below that correspond to this texture pack mode, and the properties for the other texture pack mode are hidden. 

1. Select `RtLftTp_BtBckFr` for the **Texture Pack Mode** and observe how the properties change.

1. Set the following properties accordingly:
    * **Six Point Lighting**
      * **Texture Pack Mode**: `RtLftTp_BtBckFr`
      * **Right Left Top**: `SmokeBall01_6Way_RLT_8x8.png`
      * **Bottom Back Front**: `SmokeBall01_6Way_BBF_8x8.png`
      * **Rows in Flipbook**: `8.0`
      * **Columns in Flipbook**: `8.0`
    * **Base Color**
      * **Texture**: `SmokeBall01_ColorCC_8x8.png`
      * **Use Texture**: Disabled
         {{< note >}}
         You don't want to use the texture as the base color because it will discolor the material. However, setting the base color texture property is necessary to use the texture's alpha channel for the opacity.
         {{< /note >}}
    * **Opacity**
      * **Opacity Mode**: `Blended`
      * **Alpha Source**: `Packed`
         {{< note >}}
         A `Packed` alpha source means the material will use the alpha channel from the base color texture.
         {{< /note >}}
      * **Factor**: `1.0`
      * **Alpha affects specular**: `1.0`
    * **UVs**
      * **Center** > **U**: `0.0`
      * **Center** > **V**: `0.0`
    * **General Settings**
      * **Double-sided**: Enabled
         {{< note >}}
         Enabling this setting allows for rendering of the back side of the material.
         {{< /note >}}
   
1.  In the **Editor**, make an entity with **Mesh** and **Material** components. Choose a plane for the **Mesh** (`o3de/Gems/Atom/Tools/MaterialEditor/Assets/MaterialEditor/ViewportModels/Plane_1x1.fbx`) and the material you just created for the material.

{{< image-width src="/images/learning-guide/tutorials/rendering/six-point-lighting/material.png" width="100%" alt="Material added." >}}

As of now, the entity should just display the whole alpha texture with all the frames.

{{< image-width src="/images/learning-guide/tutorials/rendering/six-point-lighting/all-frames.png" width="100%" alt="All frames of the six-point lighting animation texture." >}}

## Add animation
The next step is to add animation to the material. The textures contain all the frames of the animation so you will programmatically iterate through the frames.

1. Open `SixPointLighting_Common.azsli`.
   
1. At the bottom, add a function to get the position of the correct frame in the texture map according to the time.

   ```glsl
   float2 GetUvForCurrentFrame(float2 baseUv)
   {
      // Fixed frequency of 30hz
      // Get the current frame
      float frame = (float)(((double)SceneSrg::m_time / (33.3333)) * 1000.0) % (MaterialSrg::m_columnCount * MaterialSrg::m_rowCount);

      if(o_enableDebugFrame)
      {
         // The frame input by the material is 1-indexed, so subtract 1 here to make it 0-indexed
         frame = MaterialSrg::m_debugFrame - 1.0f;
      }

      // Get the row/column of the frame
      float frameColumn = floor(frame % MaterialSrg::m_columnCount);
      float frameRow = floor(frame / MaterialSrg::m_columnCount) % MaterialSrg::m_rowCount;
      
      float2 invColumnRowCounts = float2(1.0f, 1.0f) / float2(MaterialSrg::m_columnCount, MaterialSrg::m_rowCount);
      float2 sixPointUv = (baseUv + float2(frameColumn, frameRow)) * invColumnRowCounts;

      return sixPointUv;
   }
   ```

   {{< note >}}
   The condition, `if(o_enableDebugFrame)`, occurs if you enabled debugging for a specific frame, which can be set via the **Material Editor**. If enabled, this function uses the specified frame instead of the current frame. This functionality can help ensure that lighting is correctly applied in a specific frame.  
   {{< /note >}}

1. Open `SixPointLighting_ForwardPass.azsl` to make some final edits to see the animation in action.
   
   1. Find `ForwardPassPS_Common`. 
   
   1. Find where your surface is defined: `Surface surface`.
   
   1. Right below it, find a section for *Alpha & Clip*. Edit the `alpha` value to use the opacity map and use the current frame's UV:
   
   ```glsl
   float2 baseColorUv = IN.m_uv[MaterialSrg::m_baseColorMapUvIndex];
   float2 sixPointUv = GetUvForCurrentFrame(baseColorUv);

   float alpha = GetAlphaInputAndClip(MaterialSrg::m_baseColorMap, MaterialSrg::m_opacityMap, sixPointUv, sixPointUv, MaterialSrg::m_sampler, MaterialSrg::m_opacityFactor, o_opacity_source);
   ``` 

1. Open the **Editor** again and look at the animation! You haven't applied any custom lighting just yet, so you should just see the animation of the base color with the alpha texture.

{{< video src="/images/learning-guide/tutorials/rendering/six-point-lighting/animation.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of the animation of the cloud." >}}

## Make a custom surface
For six-point lighting to work, you must add a few material properties to your custom surface.  A *surface* is made of properties that define the look and feel of the material, and how it interacts with lighting. For example, the `metallic` property defines how metallic something looks, and the `albedo` property indicates how much light the material reflects.

For this custom surface, you must add properties for six directions, tangent, and bitangent.

The six directional floats define the light intensity that each direction of a texel receives. For example, if a texel should reflect most of the light coming from above, then the top float would be around 255.0 (the max value in the RGB scale). Consequently, for a texel that is mostly occluded from light coming from above, the top float should be closer to 0.0. The texel's directional lighting intensity is an artistic choice, and may be based on a pre-calculated evaluation when baking a texture using a digital content creation (DCC) tool.

The `tangent` and `bitangent` properties are needed to transform the world space lighting direction into tangent space before looking up the light contribution from the textures.
   
1. Open `SixPointSurface.azsli`.
   
1. Inside the `Surface` class, under the list of `BasePbrSurfaceData`, define properties for the six directions, `tangent`, and `bitangent`.
   

   ```glsl
   float top;
   float left;
   float right;
   float bottom;
   float frontside;
   float backside;
   float3 tangent;
   float3 bitangent;
   ```

You can initalize and use these properties of your surface later to define the lighting. 

## Edit the pixel shader
Now, in the pixel shader, you will integrate the surface and initalize the values. This prepares the material to allow custom lighting.

1. Open `EvaluateSixPointSurface.azsli`. In the `EvaluateSixPointSurface` function, you will make two main changes: use the correct UV for the current frame, and initialize the new properties that you added to your six-point surface.

  At runtime, this function is called in `SixPointLighting_ForwardPass.azsl`.
   
1. Get the UV for the current frame of the animation.
   
   1. Find the *Base Color* section.
   
   1. Get the current frame's UV by calling the function you wrote earlier, `GetUvForCurrentFrame()`.
   
   1. Replace the `baseColorUv` parameter with `sixPointUv` in the call to `GetBaseColorInput()`.
   ```glsl
   float2 baseColorUv = uv[MaterialSrg::m_baseColorMapUvIndex];
   float2 sixPointUv = GetUvForCurrentFrame(baseColorUv);
   float3 sampledColor = GetBaseColorInput(MaterialSrg::m_baseColorMap, MaterialSrg::m_sampler, sixPointUv, MaterialSrg::m_baseColor.rgb, o_baseColor_useTexture);
   float3 baseColor = BlendBaseColor(sampledColor, MaterialSrg::m_baseColor.rgb, MaterialSrg::m_baseColorFactor, o_baseColorTextureBlendMode, o_baseColor_useTexture);
   ```

1. Initialize the six-point surface properties.
   
   1. Find the *Specular* section.
   
   1. Set the six directional surface properties you added with the material inputs, according to the texture pack mode. You will need to handle both texture pack mode options and set the properties accordingly:
   
   ```glsl
   if(o_sixPointTexturePackMode == SixPointTexturePackMode::TpLftRtBt_FrBck)
   {
      float4 topLeftRightBottom = MaterialSrg::m_topLeftRightBottomMap.Sample(MaterialSrg::m_sampler, sixPointUv);
      float4 frontBack = MaterialSrg::m_frontBackMap.Sample(MaterialSrg::m_sampler, sixPointUv);
      surface.top = topLeftRightBottom.r;
      surface.left = topLeftRightBottom.g;
      surface.right = topLeftRightBottom.b;
      surface.bottom = topLeftRightBottom.a;
      surface.frontside = frontBack.r;
      surface.backside = frontBack.g;
   }
   else
   {
      float4 rightLeftTop = MaterialSrg::m_rightLeftTopMap.Sample(MaterialSrg::m_sampler, sixPointUv);
      float4 bottomBackFront = MaterialSrg::m_bottomBackFrontMap.Sample(MaterialSrg::m_sampler, sixPointUv);
      surface.right = rightLeftTop.r;
      surface.left = rightLeftTop.g;
      surface.top = rightLeftTop.b;
      surface.bottom = bottomBackFront.r;
      surface.backside = bottomBackFront.g;
      surface.frontside = bottomBackFront.b;
   }
   ```

1. Initalize the `tangent` and `bitangent` surface properties right after:
   ```glsl
   surface.tangent = tangents[0];
   surface.bitangent = bitangents[0];
   ```

## Add custom lighting
Now that you have set up the six-point surface, you can use the new surface properties to apply custom lighting. You will make two types of lighting: directional lighting and image-based lighting (IBL). _Directional lighting_ is a light source that comes from a single direction. _IBL_ simulates omni-directional reflective, ambient-like, lighting from the environment around the entity.

### Add custom directional lighting
As discussed earlier, you will make a light map that uses the lighting direction to determine which combination of the six sides to light up. Then, you will use the brightness with the texel's directional lighting intensity to compute the overall lighting on that particular texel.

1. Open `SixPointLighting.azsli`.
   
   1. Notice the `#include <SixPointSurface.azsli>` line at the top. This is how you can reference the surface in the following functions.
   
   1. Notice the `GetSpecularLighting()` function, which returns `float3(0.0f, 0.0f, 0.0f)`. _Specular lighting_ simulates the bright spot on a shiny object that reflects light into the camera. For six-point lighting, you don't need specular lighting because it doesn't effectively apply to 2D textures. Also, smoke and cloud effects are non-shiny objects and don't need specular lighting. 

   1. Notice the function `GetDiffuseLighting()`. You will edit this to achieve the desired effects. 

      The six-point lighting `ForwardPassPS_Common` shader uses the default `ApplyDirectLighting()` function, which will iterate over the lights that apply to this object and invoke these custom `GetDiffuseLighting()` and `GetSpecularLighting()` functions for each light.

1. Edit `GetDiffuseLighting()` and write a helper function. 
   
   Diffuse lighting simulates how light from an incoming direction scatters. Six-point lighting should use diffuse lighting, since the shaders should take light's direction and apply it to figure out the light map.

   1. Write a helper function to compute the light map.
      
      First, convert the direction of the light to tangent space. Then, choose the correct horizontal, vertical, and depth side according to the light direction. Finally, find the overall intensity of the light. 

      ```glsl
      float ComputeLightMap(const float3 dirToLightWS, const Surface surface)
      {
         float3 dirToLightTS = WorldSpaceToTangent(dirToLightWS, surface.normal, surface.tangent, surface.bitangent);
         float hMap = (dirToLightTS.x > 0.0f) ? (surface.right) : (surface.left);   // Picks the correct horizontal side.
         float vMap = (dirToLightTS.y > 0.0f) ? (surface.bottom) : (surface.top);   // Picks the correct vertical side.
         float dMap = (dirToLightTS.z > 0.0f) ? (surface.frontside) : (surface.backside);  // Picks the correct front/back side
         float lightMap = hMap*dirToLightTS.x*dirToLightTS.x + vMap*dirToLightTS.y*dirToLightTS.y + dMap*dirToLightTS.z*dirToLightTS.z; // Pythagoras!
         return lightMap;
      }
      ```

   1. In `GetDiffuseLighting()`, call the `ComputeLightMap()` function and apply the results:
   
      ```glsl
      float3 GetDiffuseLighting(Surface surface, LightingData lightingData, float3 lightIntensity, float3 dirToLight)
      {
         float lightMap = ComputeLightMap(dirToLight, surface);
         float3 diffuse = lightMap.rrr;
         
         diffuse *= lightIntensity;
         return diffuse;
      }
      ```

Great, the directional lighting is done! Your material should now have lighting in the **Editor**. Try adding more entities with a **Directional Light** component around your material to see the different effects. For example, try moving the light to point to the top of your material and see how the lighting responds accordingly! Also, adjust the **Intensity** of the light in the **Directional Light** component as needed to make your cloud look more realistic. Your material will also respond to other light types and multiple lights at the same time.

{{< video src="/images/learning-guide/tutorials/rendering/six-point-lighting/directional-lighting.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of changing direction of the light applied onto the six-point lighting cloud." >}}

### Add image-based lighting
You may notice that the shadows in the cloud are mostly grey, which doesn't reflect the environment well. If you turn off all lighting and rotate the material, the six-point lighting material changes colors unnaturally. Therefore, you will also customize IBL in the six-point lighting material type. 

On 3D objects, IBL works by sending raycasts from the normal at each pixel on the material to the sky box. The raycasts take the color of the sky box and reflect that color on the material. Since the six-point lighting material is a 2D object, you can't use this method; all of the raycasts would send from the normal of the plane. Therefore, instead of using normals, you can use the six directions to approximate the IBL.

{{< note >}}
Note that a proper depth map would give proper normals so the 3D IBL method may work. However, since this tutorial doesn't cover depth, we provide this approximation method via custom IBL. 
{{< /note >}}

 For each pixel, you will perform a raycast in six directions. This gets the colors of the sky box at each direction. Then, you will multiply those colors by the texel's directional lighting intensity, respectively. Finally, add those together to get the overall IBL. 

1. Open `SixPointLighting.azsli`.

1. Find `ApplyIBL`. This function is called in the forward pass to apply IBL. There is no need to edit this function.
   
   {{< note >}}
   Note that there is no specular IBL. Similarly to directional lighting, IBL should not have any specular lighting for the six-point lighting material type.
   {{< /note >}}
   
1. Above `GetIblDiffuse()`, add a helper function (`GetIblSample()`) that converts a `direction` from tangent space to world space and uses the resulting vector to sample the sky box.

   ```glsl
   float3 GetIblSample(Surface surface, float3 direction) 
   {
      float3 irradianceDir = TangentSpaceToWorld(direction, surface.normal, surface.tangent, surface.bitangent);
      irradianceDir = MultiplyVectorQuaternion(irradianceDir, SceneSrg::m_iblOrientation);
      float3 diffuseSample = SceneSrg::m_diffuseEnvMap.Sample(SceneSrg::m_samplerEnv, GetCubemapCoords(irradianceDir)).rgb;

      return diffuseSample;
   }
   ```

1. Delete the code currently in `GetIblDiffuse()` and make calls to your helper function for each of the six directions in tangent space.
   
   ```glsl
   float3 rightSample = GetIblSample(surface, float3(1.0f, 0.0f, 0.0f));
   float3 leftSample = GetIblSample(surface, float3(-1.0f, 0.0f, 0.0f));
   float3 topSample = GetIblSample(surface, float3(0.0f, -1.0f, 0.0f));
   float3 bottomSample = GetIblSample(surface, float3(0.0f, 1.0f, 0.0f));
   float3 frontsideSample = GetIblSample(surface, float3(0.0f, 0.0f, 1.0f));
   float3 backsideSample = GetIblSample(surface, float3(0.0f, 0.0f, -1.0f));
   ```

   {{< note >}}
   `topSample` uses the vector `{0.0, -1.0, 0.0}` because O3DE uses the DirectX convention where, on a 2D plane, the top left vector is `{0.0, 0.0}` and the bottom left vector is `{0.0, 1.0}`. Therefore, the vector `{0.0, -1.0, 0.0}` points towards the top. 
   {{< /note >}}

1. Calculate the overall color by summing together all the sampled colors and returning the appropriate color.

   ```glsl
   float3 GetIblDiffuse(Surface surface, float3 diffuseResponse)
   {
      float3 rightSample = GetIblSample(surface, float3(1.0f, 0.0f, 0.0f));
      float3 leftSample = GetIblSample(surface, float3(-1.0f, 0.0f, 0.0f));
      float3 topSample = GetIblSample(surface, float3(0.0f, -1.0f, 0.0f));
      float3 bottomSample = GetIblSample(surface, float3(0.0f, 1.0f, 0.0f));
      float3 frontsideSample = GetIblSample(surface, float3(0.0f, 0.0f, 1.0f));
      float3 backsideSample = GetIblSample(surface, float3(0.0f, 0.0f, -1.0f));

      float3 totalDiffuseSample = (leftSample * surface.left) 
                                 + (rightSample * surface.right) 
                                 + (topSample * surface.top) 
                                 + (bottomSample * surface.bottom) 
                                 + (frontsideSample * surface.frontside) 
                                 + (backsideSample * surface.backside);

      return diffuseResponse * surface.albedo * totalDiffuseSample;
   }
   ```

   {{< tip >}}
   Multiplying the sampled color by the surface property is the key to making this lighting approximation work. Recall that the surface property gives us the intensity of the light on a texel if light were to come from that respective direction. Therefore, multiplying the sampled color by the intensity scales the color value appropriately.

   For example, consider a texture where the `surface.top` is intense (around `255.0`), and the `surface.bottom` is mild (around `0.0`). As a result, at the top of the texture, the `bottomSample` has no effect on the color. 
   {{< /tip >}}

1. Open the Editor and turn off any lights. You should see the colors on your material reflect those of the skybox (blue at the top and orange at the bottom).

   {{< video src="/images/learning-guide/tutorials/rendering/six-point-lighting/ibl.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of rotating the six-point lighting material to see how IBL affects the " >}}

1. Turn on the lights again and observe how IBL works with the directional lighting!

   {{< video src="/images/learning-guide/tutorials/rendering/six-point-lighting/final.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of changing direction of the light applied onto the six-point lighting cloud." >}}

Awesome, you added custom directional lighting and IBL!

## Download the AtomTutorial Gem sample
Now that you've completed this tutorial, you can compare your results to our working version of six-point lighting in the **AtomTutorials** Gem in the [o3de/sample-code-gems repository](https://github.com/o3de/sample-code-gems). You can either download the final six point lighting files from the repository in [atom_gems/AtomTutorials/Assets/SixPointLighting/](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials/Assets/SixPointLighting) and place them in your project, or you can download the Gem and add it to the engine (see [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/)).

Congratulations, you are now done with this tutorial! 