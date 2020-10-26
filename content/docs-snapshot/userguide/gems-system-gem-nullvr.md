# NullVR Gem<a name="gems-system-gem-nullvr"></a>

Use the NullVR gem to run your level through the head\-mounted displays \(HMD\) framework without a connected VR device\. This gem is useful for VR graphics debugging\.

The NullVR Gem has a lower priority than other VR gems and their devices\. That means that if any other VR gem is enabled and its appropriate VR device is connected, then the HMD framework uses that VR gem\. The NullVR Gem is enabled only if no other VR gem is enabled or no VR device is connected\.

When Lumberyard is using the NullVR Gem, the following appears in the console:

```
[HMD][Null] - Null Device
```

## Console Variables<a name="gems-system-gem-nullvr-cvars"></a>

The NullVR Gem, when enabled, makes certain console variables available\. These console variables take effect only if the NullVR Gem is in use; that is, no other VR gems are enabled or no other VR devices are connected\.

**Note**  
The default values in the following list came from Vive at the time of this writing\.

`hmd_null_aspectRatio`  
Aspect ratio of the null VR implementation\.  
Default: 0\.9

`hmd_null_eyeOffsetX`  
Eye X offset \(horizontal distance\)\.  
Default: \-0\.0346999988

`hmd_null_fov`  
The field of view in radians\. Can be updated at runtime\.  
Default: 1\.91986

`hmd_null_fovH`  
The field of view height in radians\. Used on start\.  
Default: 1\.84633982

`hmd_null_fovV`  
The field of view width in radians\. Used on start\.  
Default: 1\.94590104

`hmd_null_frustumPlane_horizontalDistance`  
Frustum plane horizontal distance\.  
Default: \-0\.0701720715

`hmd_null_frustumPlane_verticalDistance`  
Frustum plane vertical distance\.  
Default: \-0\.00206005573

`hmd_null_renderHeight`  
The height of the render texture in pixels\. Set once on start\.  
Default: 1680

`hmd_null_renderWidth`  
The width of the render texture in pixels\. Set once on start\.  
Default: 1512