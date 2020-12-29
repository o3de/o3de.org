# Temporal Antialiasing and Supersampling<a name="graphics-rendering-anti-aliasing"></a>

Supersampling is a method of antialiasing that attempts to reduce jagged, pixelated edges \(aliasing\) in images\. It works by sampling a higher resolution version of the image to get the average color of a pixel before reducing it to the intended size\. The averaged color values create smoother transitions along an edge of colors, reducing the jagged look\.

Because supersampling is memory intensive, Lumberyard uses temporal antialiasing \(TAA\) to approximate supersampling\. While supersampling analyzes pixels spatially, TAA analyzes frames over time, even when the camera is static\. The current frame is projected onto the previous frame and samples are blended into an accumulation buffer\. This technique reduces ghosting artifacts in motion and gives you control over the amount of antialiasing needed for your graphics\. You can create sharp images or softer, blurred images\. You can also use supersampling for very high quality rendering\.

TAA is useful for reducing aliasing from the following:
+ Specular highlights and bright pixels, especially when combined with convolution filters such as **Depth of Field** or **Bloom**\.
+ Geometric and alpha\-tested edges\.

You can configure TAA by setting the `r_AntialiasingMode` console variable, editing the platform configuration file, or creating a level configuration file with this setting\.

## Controlling Antialiasing<a name="graphics-rendering-anti-aliasing-antialias"></a>

The following table lists the antialiasing modes that are available in Lumberyard when you use the `r_AntialiasingMode` console variable\.


****  

| Mode | Console Variable Value | Description | 
| --- | --- | --- | 
| No antialiasing | 0 | Disables postprocessing\-based antialiasing\. This is useful for debugging or when the technique is unnecessary\. You may also use a higher resolution if you prefer not to spend system resources on antialiasing\. | 
| FXAA | 1 | Enables fast approximate antialiasing \(FXAA\), which filters edges using a postprocessing edge detection technique\. | 
| SMAA \(1TX\) | 2 | Enables subpixel morphological antialiasing \(SMAA\), which uses an advanced postprocessing technique to detect edges in order to filter edges\. This mode includes a basic temporal antialiasing component but does not address subpixel jitter\. | 
| TAA | 3 | Enables temporal antialiasing \(TAA\)\. This is the default mode\. | 

The following table lists the additional console variables that you can configure for temporal antialiasing\.


****  

| Console Variable | Description | 
| --- | --- | 
| r\_AntialiasingModeEditor | Specifies whether to use subpixel jitter in the editor\. This can eliminate jittering artifacts on helper objects at the expense of losing antialiasing on static scenes\.Valid values: 0 = disables this mode \| 1 = enables this mode | 
| r\_AntialiasingTAAClampingFactor | Controls the clamping factor in standard deviations\. Set the value at which to limit the TAA response\. Higher values create a more stable scene with less flickering but more ghosting\. Lower values create a scene with less ghosting but more aliasing and flickering\.Valid values: 0\.75 – 2\.0 | 
| r\_AntialiasingTAAJitterPattern | Specifies the sampling pattern for temporal antialiasing\.Valid values: 0 = no subsamples \| 1 = 2x \| 2 = 3x \| 3 = 4x \| 4 = 8x \| 5 = sparse grid, 8x8 \| 6 = random \| 7 = Halton 8x \(default\) \| 8 = Halton random | 
| r\_AntialiasingTAALuminanceMax | Clamps the input luminance before temporal filtering to help with image stability\. Extra bright pixels can ghost and cause bloom artifacts\.Default value: 100\.0 | 
| r\_AntialiasingTAAMotionDifferenceMax | Specifies the maximum difference of speed between the current pixel and its history pixel at which the current pixel is considered fully disoccluded\. Lower values create a scene with less ghosting but more aliasing on disoccluded pixels\. | 
| r\_AntialiasingTAAMotionDifferenceMaxWeight | Specifies the blend weight for the current frame at the maximum speed difference \(defined by the r\_AntialiasingTAAMotionDifferenceMax console variable\)\.Valid values: 0 = 100% of the history pixel \| 1 = 100% of the current pixelDefault value: 0\.5 | 
| r\_AntialiasingTAANewFrameFalloff | Represents the amount of time, in seconds, for the history signal to reach 63% of the source signal\. Lower values create faster convergence, which can reduce ghosting but introduce some aliasing\. Higher values create slower convergence\. Because higher values may not improve stability, you should adjust the color clamping factor before adjusting this value\.Default value: 0\.15 | 
| r\_AntialiasingTAASharpening | Controls the sharpening filter to help retain sharpness\. This is useful when temporal antialiasing introduces blur to a scene during motion\.Default value: 0\.2 | 
| r\_AntialiasingTAAUseAntiFlickerFilter | Reduces jitter\-based flickering in certain scenarios\.Valid values: 0 = disables this mode \| 1 = enables this mode | 
| r\_AntialiasingTAAUseJitterMipBias | Enables mipmap biasing on textures when jitter is enabled\. This creates a scene with decreased blur but more flickering\.Valid values: 0 = disables this mode \| 1 = enables this modeDefault value: 1 | 
| r\_AntialiasingTAAUseVarianceClamping | Enables variance color clamping to help reduce ghosting\. This may increase flickering in the scene\. The r\_AntialiasingTAAClampingFactor console variable affects only this mode\.Valid values: 0 = disables this mode \| 1 = enables this modeDefault value: 0 | 

The following images illustrate the range of graphics quality that you can achieve depending on which antialiasing setting you use\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-bistro-bar-example.gif)

## Temporal Antialiasing Limitations<a name="graphics-rendering-anti-aliasing-limitations"></a>

Temporal antialiasing \(TAA\) is an inexpensive solution that reduces aliasing from all sources and works well with most content\. Because it relies on screen\-space information from previous frames, TAA has limitations in the following scenarios:
+ Objects occlude other objects while in motion\. In this scenario, the newly visible areas in the current frame don't have a history value to blend with and can manifest as ghosting\.
+ Motion vectors are not present for objects in motion, which can result in subtle smearing artifacts\. Motion vectors are not generated for merged vegetation, non\-CGF\-based particles, or transparent materials\. In certain high\-frequency signal scenarios, the most apparent artifact is flickering caused by subpixel jittering that alternates between bright and dark pixels\.
+ The content has a lot of subpixel triangles and normals\. In this scenario, the subpixel detail can cause flickering artifacts with temporal subpixel jittering\. When a bright edge that is surrounded by dark pixels becomes smaller, the neighborhood clamping heuristic causes the pixels to flicker between light and dark\.
+ Transparency does not write depth\. In this scenario, certain transparent content can exhibit subtle smearing artifacts\.

In these cases, you may prefer to use subpixel morphological antialiasing \(SMAA\) or fast approximate antialiasing \(FXAA\)\.

## Temporal Antialiasing Best Practices<a name="graphics-rendering-anti-aliasing-best-practices"></a>

We recommend following these best practices when using temporal antialiasing \(TAA\)\.
+ Build content to alias as little as possible\.
+ Use level of detail \(LOD\) to reduce subpixel detail for objects that are far away\.
+ Use the anti\-flicker filter to help with flickering\. The `r_AntialiasingTAAUseAntiFlickerFilter` console variable is enabled by default\.

## Controlling Supersampling<a name="graphics-rendering-anti-aliasing-supersampling"></a>

In addition to antialiasing, Lumberyard supports supersampling for very high quality rendering\. Supersampling renders the scene at a higher resolution and downscales the image to obtain smooth and stable edges\. Due to the high internal rendering resolution, supersampling is performance heavy and only suitable for games intended to be played on high\-end computers\.