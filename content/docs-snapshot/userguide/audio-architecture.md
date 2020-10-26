# Audio System Overview<a name="audio-architecture"></a>

The Lumberyard audio system consists of Gems, components, and content\.

## Gems<a name="audio-architecture-gems"></a>

Lumberyard provides two audio Gems:
+ **AudioSystem**
+ **AudioEngineWwise**

AudioEngineWwise is an audio engine implementation provided by Lumberyard for Audiokinetic Wwise\. An audio engine implementation translates generic Audio Translation Layer \(ATL\) state requests into real calls to the audio middleware API\. It also implements low\-level hooks for file I/O and memory allocation as needed for the audio middleware\.

The AudioEngineWwise Gem depends on the AudioSystem Gem\. It is recommended that you enable both Gems to enable audio, but the AudioSystem Gem has no dependencies and can be enabled by itself\. This leaves open the possibility of other audio middleware Gems to be developed and used instead of AudioEngineWwise\.

Lumberyard audio Gems feature the following modules:


****  

| Module | Description | 
| --- | --- | 
| Audio System |  Part of the Audio System Gem\. Contains the audio translation layer \(ATL\) code and manages the state of the audio system in Lumberyard\. Most of this module runs on the audio thread, but it also synchronizes with the main thread\.  | 
| Audio System Editor |  A Lumberyard Editor plugin, and part of the Audio System Gem\. Contains the **Audio Controls Editor** \(ACE\) to create and manage ATL controls\.  | 
| Audio Engine Wwise |  Part of the Audio Engine Wwise Gem\. Contains the implementation of `AudioSystemImplementation` interfaces for Wwise\. Contains all Audiokinetic APIs\. This is the only module that links with Wwise SDK\. Can be configured to use Wwise LTX or the full version of Wwise\.  | 
| Audio Engine Wwise Editor |  A Lumberyard Editor plugin, and part of the Audio Engine Wwise Gem\. This is an additional module that the **Audio Controls Editor** loads when Lumberyard uses Wwise\.  | 

## Components<a name="audio-architecture-components"></a>

The core audio components are included in Lumberyard Editor\. For more information, see [Audio Components](component-components.md#component-entity-audio)\.

## Content<a name="audio-architecture-content"></a>

Lumberyard audio features the following content:


****  

| Content | Description | 
| --- | --- | 
| Media |  Lumberyard loads soundbanks and loose media at runtime\. The audio middleware authoring tools compiles and generates the media files\.  | 
| Project | The audio middleware authoring tools use a project to manage source audio files, adjust sounds and settings, and generate runtime ready media\. The Audio Controls Editor also uses the project to help map ATL controls to the audio middleware equivalents\. | 
| ATL Libraries |  When the audio system maps ATL controls to their audio middleware equivalents, it creates ATL libraries, which are saved as XML files\. Lumberyard loads these libraries at startup and populates the ATL with runtime data so that the game can control the audio system\.  | 