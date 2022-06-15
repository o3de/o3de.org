---
title: Audio Console Variables
description: Use console variables to control the Open 3D Engine audio system.
weight: 500
---

The following console variables can be used with the O3DE audio system.

| Variable | Description |
| --- | --- |
| **s_ATLMemorySize** | Specifies in KB the size of the memory pool to be used by the audio translation layer (ATL). <br> Default values: PC = `8192`, Mac = `8192`, Linux = `8192`, iOS = `8192`, Android = `4096` |
| **s_AudioEventPoolSize** | Sets the number of preallocated audio events. <br> Default values: PC = `512`, Mac = `512`, iOS = `128`, Android = `128` |
| **s_AudioObjectsDebugFilter** | Filters debug drawing to only audio objects whose name matches a string. <br> Default: "" (all) <br> Example: `s_AudioObjectsDebugFilter=weapon_axe` |
| **s_AudioObjectPoolSize** | Sets the number of preallocated audio objects and corresponding audio proxies. <br> Default values: PC = `1024`, Mac = `2048`, iOS = `256`, Android = `256` |
| **s_AudioProxiesInitType** | Can override on a global scale. If set, it determines whether AudioProxies initialize synchronously or asynchronously. This is a performance variable, as asynchronously initializing AudioProxies has a greatly reduced impact on the calling thread. When set to initialize asynchronously, audio playback is delayed. <br> Values: `0` = AudioProxy-specific initialization; `1` = Initialize synchronously; `2` = Initialize asynchronously <br> Default: `0` (all platforms) |
| **s_AudioTriggersDebugFilter** | Filters debug drawing to only audio triggers that match a string. <br> Default: "" (all) <br> Example: `s_AudioTriggersDebugFilter=impact_hit` |
| **s_DrawAudioDebug** | Draws AudioTranslationLayer related debug data to the screen. Flags can be combined. <br> Values: <br><ul><li>`0`: No audio debug info on the screen</li><li>`a`: Draw spheres around active audio objects</li><li>`b`: Show text labels for active audio objects</li><li>`c`: Show trigger names for active audio objects</li><li>`d`: Show current states for active audio objects</li><li>`e`: Show RTPC values for active audio objects</li><li>`f`: Show Environment amounts for active audio objects</li><li>`g`: Draw occlusion rays</li><li>`h`: Show occlusion ray labels</li><li>`i`: Draw sphere around active audio listener</li><li>`v`: List active Events</li><li>`w`: List active Audio Objects</li><li>`x`: Show FileCache Manager debug info</li><li>`y`: Show memory pool usage info for the audio impl</li></ul> Default: "" (all) <br> Example: `s_DrawAudioDebug abc` |
| **s_EnableRaycasts** | Set to `true`/`false` to globally enable/disable raycasting for audio occlusion & obstruction. <br> Default: `true` |
| **s_FileCacheManagerDebugFilter** | Allows for filtered display of the different AFCM entries such as Globals, Level Specifics, and Volatiles. Flags can be combined. <br> Values: `a` = Globals; `b` = Level Specifics; `c` = Game Hints; `d` = Currently Loaded <br> Default: "" (all)|
| **s_FileCacheManagerMemorySize** | Sets the size in KB that the AFCM allocates on the heap. <br> Default values: PC = `393216`, Mac = `393216`, Linux = `393216`, iOS = `2048`, Android = `73728` |
| **s_IgnoreWindowFocus** | If set to `true`, the sound system continues to play when the Editor or Game window loses focus. <br> Default: `false` (off) |
| **s_PositionUpdateThreshold** | An audio object has to move by at least this amount to issue a position update request to the audio system. <br> Default: `0.1` (10 cm) |
| **s_RaycastCacheTimeMs** | Physics raycast results are given this amount of time before they are considered dirty and need to be recast. <br> Default: `250.0` |
| **s_RaycastMaxDistance** | Raycasts for obstruction/occlusion are not sent for sounds whose distance to the listener is greater than this value. <br> Default: `100.0` |
| **s_RaycastMinDistance** | Raycasts for obstruction/occlusion are not sent for sounds whose distance to the listener is less than this value. <br> Default: `0.5` |
| **s_RaycastSmoothFactor** | How slowly the smoothing of obstruction/occlusion values should smooth to target: `delta / (smoothFactor^2 + 1)`. <br> Low values will smooth faster; high values will smooth slower. <br> Default: `7.0` |
| **s_ShowActiveAudioObjectsOnly** | Determines whether only the active audio objects or all audio objects should be drawn when debug drawing is enabled. <br> Default: `false` (draw all audio objects) |
| **s_VelocityTrackingThreshold** | An audio object has to change its velocity by at least this amount to issue an `object_speed` RTPC update request to the audio system. <br> Default: `0.1` (10 cm/s) |
