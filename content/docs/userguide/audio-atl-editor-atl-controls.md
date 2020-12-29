# ATL Controls Pane<a name="audio-atl-editor-atl-controls"></a>

The **ATL Control** pane has the following control types\. The associated icon designates the type of control\. You can customize the name of the control\.


**Audio Controls**  

| Audio Control Type | Icon | Description | 
| --- | --- | --- | 
| Trigger | ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio_atl_trigger.png) |  Containers that connects to events in the audio middleware\. You can author events to complete actions such as play or stop sounds, mute or unmute buses, and so on\.  To preview a trigger, right\-click and choose **Execute Trigger**, or press the spacebar\.  | 
| RTPC | ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio_atl_rtpc.png) | Real\-Time Parameter Control \(RTPC\) is a floating\-point variable that is updated over time by the game logic\. RTPCs connect to parameters in the audio middleware that drive and modulate sound characteristics\. | 
| Switch | ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio_atl_switch.png) | A variable that can be in one of several states, called switch states, that the game logic can set\. For example, a SurfaceType switch can have values of Rock, Sand, or Grass\. | 
| Environment | ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio_atl_environment.png) | Environments can be set on audio objects, which control the amount of environmental effect, such as reverb and echo\. | 
| Preload | ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio_atl_preload.png) | Preloads are connected to sound banks, which are audio files that include packaged audio data\. This audio data contains both signal content and metadata\. | 

**To display a limited subset of control types**

1. In the **Audio Controls Editor**, click **Filters**\.

1. Select or clear control types\.  
![\[Select or clear the control types.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio-atl-editor-filter.png)

**To add a new control**

1. Click **Add**\.

1. Select the type of control that you want to add\.  
![\[Select the type of control you want to add.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/audio/audio-atl-editor-add.png)