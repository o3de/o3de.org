# Particle Debugging with Console Variables<a name="particle-debugging"></a>

Use the following console variables to monitor and debug particle system issues\. For more information, see [Using the Console Window](console-intro.md)\.


**Particle Console Variables**  

| Console Variable | Description | Valid Values | 
| --- | --- | --- | 
| e\_Particles |  Activates drawing of particles\.  |  `0` = Off `1` = On \(default\)  | 
| e\_ParticlesAllowRuntimeLoad |  Allows loading of dynamic particle effects at runtime\.  |  `0` = Off `1` = On \(default\)  | 
| e\_ParticlesAnimBlend |  Blends between animated texture frames\.   |  `0` = Off `1` = On \(default\) `2` = Force  | 
| e\_ParticlesAudio |  Toggles audio for particles\.  |  `0` = Off `1` = On \(default\)  | 
| e\_ParticlesCullAgainstOcclusionBuffer |  Culls particles against the occlusion buffer\.  |  `0` = Off `1` = On \(default\)  | 
| e\_ParticlesCullAgainstViewFrustum |  Culls particles against the view frustum\.  |  `0` = Off `1` = On \(default\)  | 
| e\_ParticlesDebug |  Displays the particle counts on the screen\.  You can also specify the particle debug flags that you want to add or remove\. To add or remove a particle debug flag, you can use the **Console** command line or the `.cfg` files\. Type the console variable followed by the flag and a \+ or –\.  For example, if you want to use the `m` flag to show memory usage, enter the following command: e\_ParticlesDebug b\+ To remove the `m` flag, enter the following command: e\_ParticlesDebug b\- For more information, see [Using the Console Window](console-intro.md)\.  |  `0` = Hide basic stats\. \(default\) `1` = Show basic stats\. `m` = Show memory usage\. `r` = Show reiteration, rejection, and collision stats\. `b` = Draw bounding boxes and labels and show bounding box stats\. `x` = Show bounding box stats\. `d` = Force dynamic bounds and update for all emitters\. `c` = Disable clipping against water and visible area bounds\. `z` = Freeze the particle system\.  | 
| e\_ParticleDumpMemorAfterMapLoad |  Specify a value of `1` to dump particle memory after map load\.  |  `0` = Off \(default\) `1` = On  | 
| e\_ParticlesGI |  Applies global illumination to appropriate particle effects\.  |  `0` = Off `1` = On \(default\) `2` = Force  | 
| e\_ParticleShadowsNumGSMs |  Number of global shadow maps \(GSM\) used for particle shadows\.  |  Default value: `3`  | 
| e\_ParticlesIndexPoolSize |  Memory size of index pool between particle and render thread\.  |  Default value: `16`  | 
| e\_ParticlesLightMinColorThreshold |  Threshold for minimum particle light color\.  |  Default value: `0`  | 
| e\_ParticlesLightMinRadiusThreshold |  Threshold of minimum particle light radius\.  |  Default value: `0`  | 
| e\_ParticlesLights |  Allows a light source to be attached to every particle\.  |  `0` = Off `1` = Deferred lights  | 
| e\_ParticlesLightsViewDistRatio |  Sets the view distance ratio for particle lights\.  |  Default value: `256`  | 
| e\_ParticlesLod |  Multiplier to particle count\.  |  Default value: `0`  | 
| e\_ParticlesMaxDrawScreen |  Screen size maximum per particle\. Particles that reach this limit fade out, even if the particle does not reach its lifetime\.   | Default value: 256 | 
| e\_ParticlesMaxScreenFill |  Screen size maximum of total particles to draw\.  | Default value: 160 | 
| e\_ParticlesMinDrawAlpha |  Alpha cutoff for rendering particles\.  | Default value: 0\.004 | 
| e\_ParticlesMinDrawPixels |  Pixel size minimum per particle\. Particles that reach this limit fade out, even if the particle does not reach its lifetime\.   | Default value: 1 | 
| e\_ParticlesMotionBlur |  Enables motion blur for particles\.   |  `0` = Off `1` = On \(default\) `2` = Force  | 
| e\_ParticlesObjectCollisions | Enables particle and object collisions for the SimpleCollision parameter\. For more information, see [Collision Attribute](particle-editor-reference-collision.md)\. |  `1` = Against static objects only\. `2` = Against dynamic objects also\. \(default\)  | 
| e\_ParticlesPoolSize |  Particle system pool memory size in KB\.  | Default value: 16384 | 
| e\_ParticlesPreload |  Enables preloading of all particle effects at the beginning\.   | Default value: 0 | 
| e\_ParticlesProfile | Displays particle information on the screen\. |  `0` = Off \(default\) `1` = Always show the statistics about particle pool usage\. `2` = Disable the warning message when running out of pool memory\.  | 
| e\_ParticlesQuality |  Specifies the quality of particle detail\.  | Default value: 4 | 
| e\_ParticlesShadows |  Displays shadows on particles\.   |  `0` = Off `1` = On \(default\) `2` = Force  | 
| e\_ParticlesShowMainThreadUpdates |  Renders a list of containers not updated by a job and provides details why\.  | Default value: 1 | 
| e\_ParticlesSoftIntersect |  Renders appropriate particles with soft intersection\.  |  `0` = Off `1` = On \(default\) `2` = Force  | 
| e\_ParticlesSortQuality |  Minimum sort quality for new particle insertion\.   |  `0` = Basic \(default\) `1` = Better `2` = Best  | 
| e\_ParticlesThread |  Enables particle threading\.   |  `0` = Off `1` = On \(default\)  | 
| e\_ParticlesUseLevelSpecificLibs |  Allows searching for level\-specific version of effects files\.   |  `0` = Off \(default\) `1` = On  | 
| e\_ParticlesVertexPoolSize |  Memory size of vertex pool between particle and render thread\.  | Default value: 256 | 
| e\_SkipParticleOcclusion |  Skips occlusion testing for particles in the occlusion buffer\.   The particles may be too small to return reliable results\.    |  `0` = Off `1` = On \(default\)  | 
| gpu\_particle\_physics |  Enables graphics processing unit \(GPU\) for physics, if available\.   |  `0` = Off \(default\) `1` = On  | 
| g\_breakage\_particles\_limit |  Imposes a limit on particles generated during 2D surfaces breaking\.  | Default value: 160 | 
| mfx\_ParticleImpactThresh |  Impact thread for particle effects\.  | Default value: 2 | 
| r\_GPUParticleDepthCubemapResolution |  Resolution for the cubemaps used by the cubemap depth collision feature for GPU particles\.  | Default value: 256 | 
| r\_ParticlesAmountGI |  Global illumination \(GI\) amount for particles without an assigned material\.  | Default value: 0\.15 | 
| r\_ParticlesDebug |  \(Advanced\) Evaluates what particles on screen may impact performance\. Particles marked in blue are ideal, while particles marked in red or white can impact performance\.  |  `0` = Off \(default\) `1` = Display particle screen coverage\. Blue = Good Red = Bad `2` = Display particle overdraw\.  Blue = Good Red = Bad White = Poor  | 
| r\_ParticlesHalfRes |  Enables or forces the render of particles in a half\-resolution buffer\.   |  `0` = Off \(default\) `1` = On `1` = Force  | 
| r\_ParticlesHalfResAmount |  Specifies the particle half\-resolution buffer to a half or quarter of the screen size\.   |  `0` = Off \(default\) `1` = Half of screen size `1` = Quarter of screen size  | 
| r\_ParticlesHalfResBlendMode |  Specifies which particles can be rendered in half resolution\.   |  `0` = Alpha \(default\) `1` = Additive  | 
| r\_ParticlesInstanceVertices |  Enables instanced\-vertex rendering\.  |  `0` = Off `1` = On \(default\)  | 
| r\_ParticlesRefraction |  Enables refractive particles\.   |  `0` = Off `1` = On \(default\)  | 
| r\_ParticlesSoftIsec |  Enables particle soft intersections\.  |  `0` = Off `1` = On \(default\)  | 
| r\_ParticlesTessellation |  Enables particle tessellation for higher quality lighting \(DX11 only\)\.  |  `0` = Off  `1` = On \(default\)  | 
| r\_ParticlesTessellationTriSize |  Sets the particle tessellation triangle screen space size in pixels \(DX11 only\)\.  | Default value: 16 | 
| r\_ParticlesVerticePoolSize |  Maximum number of particle vertices to support\.  | Default value: 15360 | 
| r\_ShadowParticlesAnimJitterAmount |  Amount of animated jittering for particle shadows\.   |  Default value: `1`  | 
| r\_ShadowsParticlesJitterAmount |  Amount of jittering for particle shadows\.  | Default value: 0\.5 | 
| r\_ShadowsParticlesKernelSize |  Blurs kernel size for particle shadows\. Specify higher values for more blur\.  |  `0` = Hard edge Default value: `1`  | 
| r\_ShadowsParticleNormalEffect |  Shadow taps on particles affected by normal and intensity \(breaks lines and uniformity of shadows\)\.   | Default value: 1 | 
| sys\_spec\_particles |  The console variable group to apply settings for multiple console variables\. Specify a number to switch the group of particle console variables\. You can find the group number, the specified console variables, and their values in the `sys_spec_Particles.cfg` file in the `lumberyard_version\dev\Engine\Config\CVarGroups` directory\. For example, when `sys_spec_particles = 1`, the console variable uses the settings defined in group 1 in the `sys_spec_Particles.cfg` file\.  | N/A | 