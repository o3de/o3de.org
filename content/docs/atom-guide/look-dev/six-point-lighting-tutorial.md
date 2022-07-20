---
linkTitle: Custom Lighting Tutorial with Flipbook Animation
title: Custom Lighting Tutorial with Flipbook Animation
description: A tutorial for custom lighting using a flipbook animation with six-point lighting in the Atom renderer of the Open 3D Engine (O3DE).
weight: 300
toc: true
---
In this tutorial, we cover how to make your own material type that uses a custom surface with custom lighting. In this case, we will be using a flipbook animation with 6-point lighting. This material type is especially useful for use on effects such as smoke and clouds, since we want to animate movement while still capturing correct lighting. However, traditional lighting methods would not work because it is a 2D texture. Therefore, to apply the correct lighting, we will need a custom material type that uses custom lighting. We follow [this technique](https://realtimevfx.com/t/smoke-lighting-and-texture-re-usability-in-skull-bones/5339) to use six points (top, bottom, left, right, front, and back) and determine which points of the six should be used to compute a lightmap. 

This tutorial covers the following concepts:
- Edit your own material type
- Toggle property visibility in the **Material Editor** with lua
- Change the UV for animation
- Make a custom surface
- Add custom lighting

## Prerequisites
Ensure you have [installed the engine](../../welcome-guide/setup/), [set up a project](../../welcome-guide/create/), and [launched the editor](../../welcome-guide/tours/editor-tour).

Before starting this tutorial, be sure to complete the [material type tutorial](). Specifically, be familiar with working with material types and editing shaders.

## Get started
Do the following steps to get started on making the six point lighting material type.
1. Download the template files from [here]().
2. Move `SixPointLightingPropertyGroup.json` to `{your-project-path}\Materials\Types\MaterialInputs\`. Create new folders as needed!
3. Move `EvaluateSixPointSurface.azsli` to `{your-project-path}\Materials\Types\MaterialFunctions\`
4. Move the rest of the downloaded files to 
   `{your-project-path}\Materials\Types\`.
5. Open `{your-project-path}\Materials\Types\SixPointLighting.materialtype`. Under `propertyLayout` > `propertyGroups`, you'll see there are many entries with `{your-path-to-o3de}`. Replace `{your-path-to-o3de}` with your appropriate path to the engine.
   - For example, `C:/o3de/Gems/Atom/Feature/Common/Assets/Materials/Types/MaterialInputs/BaseColorPropertyGroup.json`.
   - Currently we cannot import property groups across gems, so we are hard coding the absolute path, even though it is not portable, as a proof of concept. There is a GHI to enable importing across gems at [o3de#10623](https://github.com/o3de/o3de/issues/10623).
6. We also need to download some assets to actually test the animation and lighting! Visit this [this Github repo](), and download the following textures:
   - rightlefttop
   - bottombackfront
   - alpha
7. Move the three assets to `{your-project-path}\Materials`.

These template files have everything set up so that we can get started to create our own custom surface and lighting. They were created by duplicating important parts of the `StandardPBR` files and then modifying them. Most of the changes made were to strip out unnecessary parts from `StandardPBR`'s files. When you create your own material types in the future, you can similarly duplicate `StandardPBR` files and work from there.

These files already include all of the properties that we will need. If you are unsure how to add or use properties, reference [this step](). The properties we will need are:
- `o_sixPointTexturePackMode` - property option to choose which texture pack mode to use
- `m_topLeftRightBottomMap` - property to hold texture defining the top, left, right, bottom light map
- `m_frontBackMap` - property to hold texture defining the front, back light map
- `m_rightLeftTopMap;` - property to hold texture defining the right, left, top light map
- `m_bottomBackFrontMap` - property to hold texture defining the bottom, back, front light map
- `o_enableDepthTexture` - property for whether or not to use a depth texture
- `m_depthMap` - property to hold depth texture map
- `m_depthScale` - property for the scale of the depth texture
- `m_rowCount` - property for number of rows of animation in the flipbook
- `m_columnCount` - property for number of columns animation in the flipbook
- `o_enableDebugFrame` - property to toggle wheter to enable debugging on a single frame of the animation
- `m_debugFrame` - property for the frame number to debug.

Most of these properties are defined in the `MaterialSrg` in `SixPointLighting_Common.azsli`, but the option booleans are defined elsewhere. `o_enableDepthTexture` and `o_enableDebugFrame` are defined at the bottom of `SixPointLighting_Common.azsli` and `o_sixPointTexturePackMode` is defined in the *Material Parameters* of `SixPointLighting_ForwardPass.azsl`. 

Throughout the tutorial, when we use these properties, we will discuss them further, so don't worry if some of these properties don't make sense right now!

## Write lua functor to toggle visibility in the Material Editor
For six point lighting to work, we need textures that use color channels to indicate the illuminated parts of the texture if light came from a corresponding direction. For example, red parts in the texture could indicate that lighting from the left should affect those parts, whereas blue could indicate lighting from the top. Thus, green parts could mean that lighting from both the left and top should be applied.

However, because we are using six points and there are only up to four channels per texture (red, green, blue, alpha), we need to use two textures. The channels used for each texture can be up to the artist, but here we will provide support for two options:
1. TopLeftRightBottom_FrontBack option
   1. First texture:
      - Top : Red 
      - Left : Green
      - Right : Blue
      - Bottom : Alpha
   2. Second texture:
      - Front : Red
      - Back : Green
2. RightLeftTop_BottomBackFront option
   1. First texture:
      - Right : Red 
      - Left : Green
      - Top : Blue
   2. Second texture:
      - Bottom : Red
      - Back : Green
      - Front : Blue

In `SixPointLightingPropertyGroup.json` you'll see that we already have four properties for the set of two textures for both options. They are also already defined in `SixPointLighting_Common.azsli`. However, we want to provide a `.lua` script to our material type so that if you select one option from the dropdown for *Texture Pack Mode*, only the corresponding properties show up.

1. Open `SixPointLighting_TexturePackEnum.lua`. You'll see that there are two functions `GetMaterialPropertyDependencies()` and `ProcessEditor()`. `GetMaterialPropertyDependencies()` is how we get the value of a property of a material. We can then use its value in `ProcessEditor()` to enable and disable visibility of the properties in the **Material Editor** as we want.
2. Following how `sixPointLighting.TLRB`'s visibility is enabled and disabled, enable and disable the other texture options as appropriate:
   ```hlsl
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
In order to see the **Material Editor** changes take place, we need to make a six point lighting material.

## Make a six point lighting material
Let's make a material using our six point lighting material type.
1. Open up the **Material Editor** and make a new material with the six point lighting type.
2. Find the **Six Point Lighting** properties in the **Inspector** on the right.
3. Notice how the default **Texture Pack Mode** is `TpLftRtBt_FrBck`. The two properties below that correspond to this texture pack mode, and the properties for the other texture pack mode are hidden! Select `RtLftTp_BtBckFr` and observe how the properties change. Now, select `rightlefttop` for the **Right Left Top** property, and `bottombackfront` for the **Bottom Back Front** property. 
4. Under **Base Color** > **Texture**, choose `alpha`. Then, disable **Use Texture**.
5. Under **Opacity** > **Opacity Mode**, choose `Blended`. For **Alpha Source**, select `Packed`. This means that the opacity map will use the alpha channel packed into the base color texture. Ensure that both the opacity **Factor** and **Alpha affects specular** is `1.0`.
6. Set **UVs** > **Center** to be `0.0` for both **U** and **V**. 
7. Enable **General Settings** > **Double-sided**. This allows for rendering of the back-side of the material.
8. In the **Editor**, make an entity with **Mesh** and **Material** components. Choose a plane for the **Mesh** and the material you just created for the material.

As of now, it should just display the whole alpha texture with all the frames.

## Add animation
Let's add the animation! Our textures contain all the frames of the animation so we just need to programatically iterate through the frames to have the animation appear.

1. We want to get the position of the correct frame in the texture map accorrding to the time. Open `SixPointLighting_Common.azsli`.
2. At the bottom, add the following function and option booleans:
   ```hlsl
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
3. Let's see the animation in action! Open `SixPointLighting_ForwardPass.azsl`.
   1. Find `ForwardPassPS_Common`. 
   2. Find where our surface is defined: `Surface surface`.
   3. Right below it, you'll see a section for *Alpha & Clip*. The `alpha` value is the first place we want to adjust the pixel shader because we want to use our own opacity map, and we want to use the current frame's UV. Replace the line of code defining `alpha` with
   ```hlsl
   float2 baseColorUv = IN.m_uv[MaterialSrg::m_baseColorMapUvIndex];
   float2 sixPointUv = GetUvForCurrentFrame(baseColorUv);

   float alpha = GetAlphaInputAndClip(MaterialSrg::m_baseColorMap, MaterialSrg::m_opacityMap, sixPointUv, sixPointUv, MaterialSrg::m_sampler, MaterialSrg::m_opacityFactor, o_opacity_source);
   ``` 

Open the **Editor** again and look at the animation! We don't have any custom lighting just yet, so we should just see the animation of the base color with the alpha texture.

## Make a custom surface
For six-point lighting to work, we will need to add a few parameters to make our custom surface. A surface essentially defines the properties of the look and feel of the material and how it interacts with lighting. Two example properties are `metallic` and `albedo`. `metallic` defines how metallic something may look while `albedo` indicates how much this material should reflect light.

For our surface, we need to add properties that define the six directions:
1. Open `SixPointSurface.azsli`.
2. Inside the `Surface` class, under the list of `BasePbrSurfaceData`, add:
   ```hlsl
   float top;
   float left;
   float right;
   float bottom;
   float frontside;
   float backside;
   float3 tangent;
   float3 bitangent;
   ```
   The first six floats define the light value if light came in from that direction on one particular pixel. For example, if we were looking at a pixel at the top of the texture and light came from the top, the `top` float would be around `255.0`, the max value in the RGB scale. Consequently, a pixel at the bottom of the texture that is covered would probably have the `top` float as `0.0` because there shouldn't be any lighting around there. 

   The `tangent` and `bitangent` properties are needed to determine the direction of the lighting.

## Edit the pixel shader
Now let's integrate the surface, initalize the values, and prepare for our custom lighting.

1. Open `EvaluateSixPointSurface.azsli`, which contains the `EvaluateSixPointSurface` function that we call in `SixPointLighting_ForwardPass.azsl`. `EvaluateSixPointSurface` is very similar to `EvaluateStandardSurface`, but many of the properties' definitions are simplified for our case. We have two main changes to make: use the correct UV for our current frame and initialize all the new properties that we added to our six point surface.
2. Find the *Base Color* section. Here we are using the base color's UV to find the base color, but we want to use the current frame's. Replace the initalization for `sampledColor` with a new initialization using `sixPointUv`:
   ```hlsl
   float2 baseColorUv = uv[MaterialSrg::m_baseColorMapUvIndex];
   float2 sixPointUv = GetUvForCurrentFrame(baseColorUv);
   float3 sampledColor = GetBaseColorInput(MaterialSrg::m_baseColorMap, MaterialSrg::m_sampler, sixPointUv, MaterialSrg::m_baseColor.rgb, o_baseColor_useTexture);
   float3 baseColor = BlendBaseColor(sampledColor, MaterialSrg::m_baseColor.rgb, MaterialSrg::m_baseColorFactor, o_baseColorTextureBlendMode, o_baseColor_useTexture);
   ```
3. Find the *Specular* section. This is where we will initialize our new properties we added to our custom surface. 
4. Recall that we had six properties for the six directions of light that we are supporting, but that we have two options for lightmaps. We will need to handle both options and set the properties accordingly:
   ```hlsl
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
5. Initalize the `tangent` and `bitangent` properties that we also defined in our surface right after:
   ```hlsl
   surface.tangent = tangents[0];
   surface.bitangent = bitangents[0];
   ```

## Add custom lighting
Now that we have our surface set up, we can use the new surface properties in our custom lighting. As discussed earlier, the main way we are going to add lighting is to determine the direction of the light, and compute a light map according to the pre-baked textures containing information about lighting from six different directions. 

Let's add our custom lighting:
1. Open `SixPointLighting.azsli`.
2. First, notice how we use `#include` for our six point surface; that's how we can reference our surface in the following functions.
3. Notice the functions `GetDiffuseLighting` and `GetSpecularLighting`. These are the main lighting functions used for StandardPBR. We will want to edit these two achieve our desired effects.
4. Let's start off simply with `GetSpecularLighting`:
   1. Specular lighting simulates the bright spot on a shiny object that most brightly reflects light into the camera. In our case, we do not need any specular lighting because 1) we can't effectively apply specular lighting on our 2D textures and 2) our use cases do not require it, as we are mainly using this technique for clouds and non-shiny objects.
   2. Edit the `GetSpecularLighting` function so we don't have any specular lighting:
      ```hlsl
      float3 GetSpecularLighting(Surface surface, LightingData lightingData, const float3 lightIntensity, const float3 dirToLight)
      {
         return float3(0.0f, 0.0f, 0.0f);
      }
      ```
5. Great, now let's work on `GetDiffuseLighting`:
   1. Diffuse lighting simulates how a directional light lights up an object, making sides that face the light brighter and those that don't darker. Diffuse lighting is what we want to use for six-point lighting, since we want to take the light's direction and apply it to figure out our light map.
   2. Before we edit `GetDiffuseLighting`, let's write a helper function to compute the light map (adapted from [here](https://realtimevfx.com/t/smoke-lighting-and-texture-re-usability-in-skull-bones/5339)):
      ```hlsl
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
   3. Now that we have the helper function, we can use `GetDiffuseLighting` to call the function and apply the results:
      ```hlsl
      float3 GetDiffuseLighting(Surface surface, LightingData lightingData, float3 lightIntensity, float3 dirToLight)
      {
         float lightMap = ComputeLightMap(dirToLight, surface);
         float3 diffuse = lightMap.rrr;
         
         diffuse *= lightIntensity;
         return diffuse;
      }
      ```

Great, now all the custom surface and lighting is now done! In the **Editor**, look at how your material has lighting now. Try moving around the lighting around your material to see the different effects. For example, try moving the light to point to the top of your material and see how the lighting responds accordingly!

## Add depth
While the bulk of the custom lighting is done, the 2D nature of the flipbook only required us to edit the forward pass. However, we can also edit the depth pass to use the optional depth map and edit the outputted depth in the pixel shader.
1. Open `SixPointLighting_DepthPass_WithPS.azsl`. 
2. At the bottom of the `MainPS` function, get the depth offset from the depth map and adjust the depth accordingly:
   ```hlsl
   float2 sixPointUv = GetUvForCurrentFrame(IN.m_uv[0]);
   float alpha = MaterialSrg::m_opacityMap.Sample(MaterialSrg::m_sampler, sixPointUv).r;
   if(o_enableDepthTexture)
   {
      float depthOffset = MaterialSrg::m_depthMap.Sample(MaterialSrg::m_sampler, sixPointUv).r;
      OUT.m_depth += depthOffset;
   }

   return OUT;
   ```

Try applying a depth map and observe the results!

Congratulations, you are now done with this tutorial! 