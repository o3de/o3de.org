# Recording Time Demos<a name="recording-time-demos"></a>

## Overview<a name="recordingtimedemos-overview"></a>

Lumberyard Editor can record and play back player input and camera movement\.

**Note**  
Recording of some player actions such as vehicle movement are not supported\.

To use the feature, you must start game mode in Lumberyard Editor and then record in it\. To start game mode, press **Ctrl\+G** after a level has fully loaded, or load the level in pure\-game mode\.

Output like the following appears both in the console and in the `timedemo.log` file in the directory corresponding to the level used:

```
TimeDemo Run 131 Finished.
Play Time: 3.96s, Average FPS: 50.48
Min FPS: 0.63 at frame 117, Max FPS: 69.84 at frame 189
Average Tri/Sec: 14037316, Tri/Frame: 278071
Recorded/Played Tris ratio: 0.99
```

## Recording Controls<a name="recordingtimedemos-recordingcontrols"></a>


**Optional Title**  

| Command | Keystroke | Console Commands | 
| --- | --- | --- | 
| Start Recording | Ctrl \+ PrintScreen | record | 
| End Recording | Ctrl \+ Break | stoprecording | 
| Start Playback | Shift \+ PrintScreen | demo | 
| Stop Playback | Ctrl \+ Break | stopdemo | 

## Related Console Variables<a name="recordingtimedemos-relatedconsolevariables"></a>
+ `stopdemo` – Stops playing a time demo\.
+ `demo demoname` – Plays the time demo from the specified file\.
+ `demo_fixed_timestep` – Specifies the number of updates per second\.
+ `demo_panoramic` – Uses a panoramic view when playing back the demo\.
+ `demo_restart_level N` – Restarts the level after each loop\. Possible values for *N*: 0 = Off; 1 = use quicksave on first playback; 2 = load level start\.
+ `demo_ai` – Enables or disables AI during the demo\.
+ `demo_savestats` – Saves level stats at the end of the loop\.
+ `demo_max_frames` – Specifies the maximum number of frames to save\.
+ `demo_screenshot_frame N` – Makes a screenshot of the specified frame during demo playback\. If a negative value for *N* is supplied, takes a screenshot every *N* frame\.
+ `demo_quit` – Quits the game after the demo run is finished\.
+ `demo_noinfo` – Disables the information display during the demo playback\.
+ `demo_scroll_pause` – Enables the use of the **ScrollLock** key to pause demo play and record\.
+ `demo_num_runs` – Specifies the number of times to loop the demo\.
+ `demo_profile` – Enables demo profiling\.
+ `demo_file` – Specifies the time demo file name\.