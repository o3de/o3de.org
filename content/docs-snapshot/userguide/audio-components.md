# Audio Components<a name="audio-components"></a>

Use the following audio components to add and configure sounds in your level:
+ [**Audio Area Environment**](component-audio-area-environment.md) – Enables entities that are moving around and throughout a shape to have environment effects applied to any sounds that they trigger\. You must also add a shape component to use the audio area environment component\.
+ [**Audio Environment**](component-audio-environment.md) – Provides access to features of the Audio Translation Layer \(ATL\) environments\. Environments are used to apply environmental effects such as reverb or echo\.
+ [**Audio Listener**](component-audio-listener.md) – Places a virtual microphone in the environment\. An audio listener acts as a sink for sound sources in the virtual world, and 3D audio rendering is processed with respect to the listener's world transform\. You can specify the audio listener's position and rotation independently\.
+ [**Audio Preload**](component-audio-preload.md) – Loads and unloads ATL preloads, which contain references to soundbanks\.
+ [**Audio Proxy**](component-audio-proxy.md) Required dependency if you add multiple audio components to an entity\. It acts as a proxy audio object wrapped in a component\. For example, if you have an audio trigger component and an audio rtpc component on the same entity, they communicate to the same audio object using this audio proxy component\.
+ [**Audio RTPC**](component-audio-rtpc.md) Provides basic Real\-Time Parameter Control \(RTPC\) functionality\. An RTPC is a named variable that the audio system can interpret in many different ways\. It allows game developers to set the value from the game at run time to produce real\-time tweaking of sounds\.
+ [**Audio Switch**](component-audio-switch.md) – Provides basic Audio Translation Layer \(ATL\) switch functionality\. With switches \(and switch states\), you can specify the state of an entity\. The audio middleware interprets states, modifies the behavior of sounds, and plays the appropriate sounds\.
+ [**Audio Trigger**](component-audio-trigger.md) – Provides basic play and stop features so that you can set up Audio Translation Layer \(ATL\) play and stop triggers that can be executed on demand\. With an audio trigger, you can also enable the player to run or stop audio triggers by name on entities\.

Related topics:
+ [Microphone Gem](gems-system-gem-microphone.md)
+ [Cloud Canvas Cloud Gems](gems-system-gem-aws-cloud-gems.md)
+ [Text to Speech Cloud Gem \(Using Amazon Polly\)](cloud-canvas-cloud-gem-text-to-speech-intro.md)
+ [Speech Recognition Cloud Gem](cloud-canvas-cloud-gem-speech-recognition-intro.md)