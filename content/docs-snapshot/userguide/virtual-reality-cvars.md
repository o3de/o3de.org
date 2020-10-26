# Configuring Required Console Variables<a name="virtual-reality-cvars"></a>

Console variables – Console variables \(CVARs\) are a type of variable that you can manipulate in Lumberyard's console interface\. For more information, see [Using the Console Window](console-intro.md)\.

You must set the following console variable to enable your project's capability to support the head\-mounted display\.

**output\_to\_hmd = 1**  
Enables output to head\-mounted display \(HMD\)\. Allows users to toggle stereoscopic output while playing the game\. With this variable enabled, the height and width resolution for the connected headset is detected and set automatically\.

Set the following console variables to 0 in order to turn them off\. These features are either unnecessary for virtual reality or too resource\-intensive for a virtual reality environment\.

**r\_DepthOfField = 0**  
Disables the depth of field setting\. 0 = disabled; 1 = enabled; 2 = hdr time of day enabled\.

**r\_MotionBlur = 0**  
Disables the motion blur setting\. 0 = no motion blur; 1 = camera and object motion blur; 2 = debug mode\.

**r\_ResolutionScale**  
Float value\. Scales the resolution for better performance\. For example, set to **0\.5** to scale the resolution by 50% in width and height \(retains the aspect ratio\)\.

**e\_gi = 0**  
Disables the global illumination setting\. 0 = disabled; 1 = enabled\.

## Optional Console Variables<a name="vr-optional-cvars"></a>

The following console variables are optional but strongly recommended\. Disabling the following rendering features ensures better performance in a virtual reality environment\. If you need certain rendering features that are explicitly disabled by these example variables, you may turn them back on at the cost of performance\.

**sys\_spec = 2**  
Sets the system configuration specification to medium\. 0 = custom; 1 = low; 2 = medium; 3 = high; 4 = very high\.

**r\_ssdoHalfRes = 3**  
Applies [screen space directional occlusion \(SSDO\)](ly-glos-chap.md#ssdo) bandwidth optimizations to half resolution output\. 0 = full resolution; 1 = lower resolution; 2 = low res depth \(except for small camera field of views\) to avoid artifacts; 3 = half resolution output\.

**r\_Refraction = 0**  
Disables refraction\. 0 = disabled; 1 = enabled\.

**r\_CBufferUseNativeDepth = 0**  
Disables use of the depth buffer as the coverage buffer\. 0 = disabled; 1 = enabled\.

**r\_DeferredShadingTiled = 0**  
Disables tiled shading\. 0 = disabled; 1 = tiled forward shading for transparent objects; 2 = tiled deferred and forward shading; 3 = tiled deferred and forward shading with debug info; 4 = light coverage visualization\.

**r\_SSReflections = 0**  
Disables glossy screen space reflections\. 0 = disabled; 1 = enabled\.

## Known Issue<a name="virtual-reality-cvars-known-issue"></a>

There is a known issue in the VR system where having the console variable `e_CheckOcclusion` set to `1` \(which is its default\) can cause occasional flickering of the Entity geometry\.

The `e_CheckOcclusion` console variable performs a visible check in check occlusion job\. 

The VR sample levels have been updated with `e_CheckOcclusion = 0` to prevent the flickering issue\. We recommend you set this console variable to `0` in other projects as well\.