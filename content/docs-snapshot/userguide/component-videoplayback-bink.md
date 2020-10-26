# Video Playback Bink<a name="component-videoplayback-bink"></a>

You can use the **Video Playback Bink** component to play a video on an entity in your Lumberyard level\. For example, you can use a flat or plane entity to simulate a movie screen\. You add the video playback component to the entity and specify a Bink video file to display\.

You can also play a video on a level loading screen\. For more information, see [Defining Game and Level Load Screens](ui-editor-load-screens.md)\.

You can use Script Canvas or Lua scripting to trigger the video to play, pause, or stop, depending on player actions\.

## Prerequisites<a name="prerequisites-videoplayback-bink-component"></a>

To use the **Video Playback Bink** component, you must do the following:
+ Obtain a Bink license\. Contact [RAD Game Tools](http://www.radgametools.com/bnkmain.htm) for information on how to license Bink\.
+ Install the **Video Playback Bink** gem and the Bink libraries into the gem\.
**Note**  
A Bink license is needed to gain access to this gem\. Installation instructions are provided with the gem\.
+ Enable the **Video Playback Bink** gem for your game project\. See [Enabling Gems](gems-system-using-project-configurator.md)\.
+ Rebuild your game project\.

**Topics**
+ [Prerequisites](#prerequisites-videoplayback-bink-component)
+ [Using the Video Playback Bink Component](#component-videoplayback-bink-instructions)
+ [Lua Bindings for Video Playback Bink](#component-videoplayback-bink-lua)

## Using the Video Playback Bink Component<a name="component-videoplayback-bink-instructions"></a>

 After you complete the [Prerequisites](#prerequisites-videoplayback-bink-component), you can use the **Video Playback Bink** component\.

Video playback supports the `.bk2` format and the Bink codec\.

The basic setup for the **Video Playback Bink** component includes the following:
+ Add a **Camera** component
+ Add a **Mesh** and **Video Playback Bink** component
+ Configure your material

**To use the Video Playback Bink component**

1. If you don't yet have a camera in your scene, place a **[Camera](component-camera.md)** component where your video playback is to be placed\. 

   You can use the camera to view your video playback\. Ensure that the camera is facing the direction where you place your video playback component\.

1. Create an entity\. For more information, see [Creating an Entity](creating-entity.md)\.

1. Use the [Entity Inspector](component-entity-inspector.md) to add a **[Mesh](component-static-mesh.md)** component to your entity\.

1. For the **Mesh** component, select a **Mesh asset**\. This is the asset that your video renders on\. A cube or plane is a good test mesh\.  
![\[Mesh component properties in Lumberyard Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-mesh-component-properties.png)

1. Add the **Video Playback Bink** component to the same entity\. 

1.  In the **Video Playback Bink** component, for **Video**, select the video to display\. 

1. For **Texture name**, enter dollar sign \($\) and a name for your texture\. You can enter any name, but it must begin with a $ character to indicate that it's a render target\. For example, **$videotest** is a valid name, but **videotest** isn't\.   
![\[Video Playback Bink component properties in Lumberyard Editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-videoplayback-bink-videoname.png)

1. For **Frame queue ahead count**, set the number of frames to buffer\.

   We recommend that you use a value from `1` to `3`\.

   Queueing too many frames to buffer \(for example, a value of **100** frames\) can use too much memory and cause performance issues\.

1. Open the [Material Editor](mat-intro.md)\.

1. To create a material\. click the**Add New Item** icon\. Enter a descriptive name, such as **myvideomaterial**\.  
![\[Video Playback component material.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-videoplayback-material.png)

1. Under **Texture Maps**, on the **Diffuse** line, enter the name of your video component's **Texture name** field\. You must include the $ character\.  
![\[Diffuse property for the texture name.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-videoplayback-diffuse.png)

1. Close the **Material Editor** and return to the [Entity Inspector](component-entity-inspector.md)\. In the **Mesh** component, for the **Material override** property, select the material that you created\.  
![\[Select the material override in the Mesh component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-videoplayback-override.png)

 You can trigger the video to play at the start of your game using Lua scripting\.

## Lua Bindings for Video Playback Bink<a name="component-videoplayback-bink-lua"></a>

You can use Lua bindings to interact programmatically with video playback components that you’ve placed in your scene\. Lua provides a way to establish complex logic for playing, pausing, and stopping videos\. 

### Global Functions<a name="component-videoplayback-bink-lua-global"></a>

The following functions provide programming interfaces for the video playback systems\.

#### VideoPlaybackRequestBusSender<a name="VideoPlaybackBinkRequestBusSender"></a>

**Parameters**  
`EntityID`

**Return**  
Returns the `VideoPlaybackRequestBusSender` object that is connected to the specified entity\. For more information, see [VideoPlaybackRequestBusSender Object](#component-videoplayback-bink-videoplaybackrequestbussender)\.

#### VideoPlaybackNotificationBusHandler<a name="VideoPlaybackBinkNotificationBusHandler"></a>

Exposes callbacks to your Lua script that are triggered by events during video playback\.

For more information, see [VideoPlaybackNotificationBusHandler Object](#component-videoplayback-bink-videoplaybacknotificationbushandler)\. 

**Parameters**  
`Table` – The Lua table to which you want to expose the callback functions\. Pass `self` to expose the callbacks to the current Lua script\.  
`EntityId` – 

**Return**  
Returns the `VideoPlaybackRequestBusSender` object that is connected to the specified entity\. For more information, see [VideoPlaybackRequestBusSender Object](#component-videoplayback-bink-videoplaybackrequestbussender)\.

### VideoPlaybackRequestBusSender Object<a name="component-videoplayback-bink-videoplaybackrequestbussender"></a>

The `VideoPlaybackRequestBusSender` object contains functions with which you can send requests to the video playback component\.

`Bool IsPlaying()`  
Returns `true` if the video is playing\. If the video is paused or stopped, returns `false`\.

`Void Play()`  
Plays the video\. If no video is selected or the video is already playing, this has no effect\.

`Void Pause()`  
Pauses the video\. If the video is already paused, this has no effect\. 

`Void Stop()`  
Stops the video and remains on the last frame\. When the video plays again, it begins at the first frame of the video\. If the video is already stopped, this has no effect\. If the video is playing or paused, the video stops\.

`Void EnableLooping(Bool)`  
Sets whether this video automatically restarts from the beginning once the end of the video is reached\. Pass `true` to enable looping or `false` to disable looping\. Looping is disabled by default\.

`Void SetPlaybackSpeed(Float)`  
Sets how fast the video plays\. For example, **1\.0** is normal speed, **0\.5** is half speed, **2\.0** is double speed, and so on\.  
Caution is advised when setting the video speed\. Setting a speed that is too high can result in choppy playback\.

### VideoPlaybackNotificationBusHandler Object<a name="component-videoplayback-bink-videoplaybacknotificationbushandler"></a>

The `VideoPlaybackNotificationBusHandler` object exposes callback functions to your Lua script that are triggered by events that happen during video playback\. 

`Void OnPlaybackStarted()`  
Called when video playback begins\.

`Void OnPlaybackPaused()`  
Called when video playback pauses\. Not called when video stops\. 

`Void OnPlaybackStopped()`  
Called when video playback is stopped by the user\. If the video reaches the end and is not set to loop, this function is not called\. 

`Void OnPlaybackFinished()`  
Called when all frames in the video are played\. This is not called if the user manually stops video playback\. If looping is enabled, this function is called every time the video loops\. 