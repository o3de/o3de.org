# Audio Console Variables<a name="audio-console-commands"></a>

The following console variables can be used with the Lumberyard Audio system\.

**s\_ATLPoolSize**  
Specifies in KB the size of the memory pool to be used by the audio translation layer \(ATL\)\.  
Default values: PC = 8192, Mac = 8192, Linux = 8192, iOS = 8192, Android = 4096

**s\_AudioEventPoolSize**  
Sets the number of preallocated audio events\.  
Default values: PC = 512, Mac = 512, iOS = 128, Android = 128

**s\_AudioLoggingOptions**  
Toggles the logging of audio\-related messages\.  
Default values: 0 \(disabled\), a = Errors, b = Warnings, c = Comments

**s\_AudioObjectsDebugFilter**  
Allows for filtered display of audio objects by a search string\.  
Default value: "" \(all\)

**s\_AudioObjectPoolSize**  
Sets the number of preallocated audio objects and corresponding audio proxies\.  
Default values: PC = 2048, Mac = 2048, iOS = 256, Android = 256

**s\_AudioProxiesInitType**  
Can override on a global scale\. If set, it determines whether AudioProxies initialize synchronously or asynchronously\. This is a performance variable, as asynchronously initializing AudioProxies has a greatly reduced impact on the calling thread\. When set to initialize asynchronously, audio playback is delayed\.  
Values: 0 = AudioProxy\-specific initialization; 1 = Initialize synchronously; 2 = Initialize asynchronously\.   
Default value: 0 \(all platforms\)

**s\_AudioTriggersDebugFilter**  
Allows for filtered display of audio triggers by a search string\.   
Default value: "" \(all\)

**s\_DrawAudioDebug**  
Draws AudioTranslationLayer related debug data to the screen\.  
Values:  
+ 0: No audio debug info on the screen
+ a: Draw spheres around active audio objects
+ b: Show text labels for active audio objects
+ c: Show trigger names for active audio objects
+ d: Show current states for active audio objects
+ e: Show RTPC values for active audio objects
+ f: Show Environment amounts for active audio objects
+ g: Draw occlusion rays
+ h: Show occlusion ray labels
+ i: Draw sphere around active audio listener
+ v: List active Events
+ w: List active Audio Objects
+ x: Show FileCache Manager debug info
+ y: Show memory pool usage info for the audio impl

**s\_ExecuteTrigger**  
Executes an Audio Trigger\. The first argument is the name of the audio trigger to be executed, the second argument is an optional audio object ID\. If the second argument is provided, the audio trigger is executed on the audio object with the given ID; otherwise, the audio trigger is executed on the global audio object\.

**s\_FileCacheManagerDebugFilter**  
Allows for filtered display of the different AFCM entries such as Globals, Level Specifics, and Volatiles\.  
Values: Default = 0 \(all\); a = Globals; b = Level Specifics; c = Volatiles

**s\_FileCacheManagerSize**  
Sets the size in KB that the AFCM allocates on the heap\.  
Default values: PC = 393216, Mac = 393216, Linux = 393216, iOS = 2048, Android = 73728

**s\_FullObstructionMaxDistance**  
For sounds whose distance to the listener is greater than this value, the obstruction value is attenuated with distance\.  
Default value: 5 m

**s\_IgnoreWindowFocus**  
If set to 1, the sound system continues to play when the Editor or Game window loses focus\.  
Default value: 0 \(off\)

**s\_OcclusionMaxDistance**  
Obstruction/Occlusion is not calculated for the sounds whose distance to the listener is greater than this value\. Set this value to 0 to disable obstruction/occlusion calculations\.  
Default value: 500 m

**s\_OcclusionMaxSyncDistance**  
Physics rays are processed synchronously for the sounds that are closer to the listener than this value, and asynchronously for the rest \(possible performance optimization\)\.  
Default value: 10 m

**s\_PositionUpdateThreshold**  
An audio object has to move by at least this amount to issue a position update request to the audio system\.   
Default: 0\.1 \(10 cm\)

**s\_SetRtpc**  
Sets an Audio Rtpc value\. The first argument is the name of the audio RTPC, the second argument is the float value to be set, the third argument is an optional audio object ID\. If the third argument is provided, the RTPC is set on the audio object with the given ID\. Otherwise, the RTPC is set on the global audio object\.

**s\_SetSwitchState**  
Sets an audio switch to a provided state\. The first argument is the name of the audio switch, the second argument is the name of the switch state to be set, the third argument is an optional audio object ID\. If the third argument is provided, the audio switch is set on the audio object with the given ID; otherwise, the audio switch is set on the global audio object\.

**s\_ShowActiveAudioObjectsOnly **  
When drawing audio object names on the screen, this variable is used to choose between all registered audio objects or only those that reference active audio triggers\.  
Default value: 1 \(active only\)

**s\_StopTrigger**  
Stops an audio trigger\. The first argument is the name of the audio trigger to be stopped, the second argument is an optional audio object ID\. If the second argument is provided, the audio trigger is stopped on the audio object with the given ID; otherwise, the audio trigger is stopped on the global audio object\.

**s\_VelocityTrackingThreshold**  
An audio object has to change its velocity by at least this amount to issue an `object_speed` RTPC update request to the audio system\.  
Default value: 0\.1 \(10 cm/s\)