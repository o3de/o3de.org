---
linkTitle: MiniAudio Playback 
title: MiniAudio Playback Component
description: Use the MiniAudio Playback component to play audio in your game in O3DE.
toc: true
---

The **MiniAudio Playback** component provides the ability to play audio from a sound file at a specific volume globally or relative to an audio listener.

## Supported Audio Formats
* FLAC
* MP3
* OGG 
* WAV

## MiniAudio Playback Properties

The MiniAudio Playback component has the following properties.

| Name | Description | Default |
|------|-------------|---------|
| **Play Sound** | Plays the current sound in editor. | |
| **Stop Sound** | Stops the current sound in editor. | |
| **Sound Asset** | The path to the audio file that plays when **'play'** is called. | `<Empty>` |
| **Autoplay** | Select this option to play the audio automatically when the entity activates in the Editor or Game. | `False` |
| **Volume** | The linear (not decibel) audio level in the range 0.0 to 10.0. | `1.0` |
| **Auto-follow** | Whether the sound position should move to match the entity's position. | `False` |
| **Loop** | Whether the sound should loop or not. | `False` |
| **Spatialization** | Whether the sound should have a 3D position in the world relative to the current audio listener. | `False` |
| **Attenuation** | The attenuation model to use as the audio listener moves further away from the sound, `Inverse`, `Exponential` or `Linear`. | `Inverse` |
| **Min Distance** | Minimum distance in meters for attenuation. | `3.0` |
| **Max Distance** | Maximum distance in meters for attenuation. | `3.0` |

## EBus Request Bus Interface 

Use the `MiniAudioPlaybackRequestBus` EBus interface to communicate with the MiniAudio Playback component.

For more information about using the Event Bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus).

| Name | Description | Parameters | Return | Scriptable |
|------|-------------|------------|--------|------------|
| Play | Plays the sound if set. | None | None | Yes |
| Stop | Stops the sound if set. | None | None | Yes |
| SetVolume | Set the volume for the sound. | `volume` - The linear (not decibel) volume level in the range 0.0 to 10.0 | None | Yes |
| SetLooping | Sets whether the sound should loop or not. | `loop` - True to loop, or False to not loop | None | Yes |
| IsLooping | Returns whether the sound is set to loop or not. | None | True if looping, False if not looping | Yes |
| SetSoundAsset | Set the sound asset to play. | `soundAsset` - The SoundAssetRef for the sound asset relative to the project or gem asset folder it is in. | None | Yes |
| GetSoundAsset | Get the current sound asset. | None | The current SoundAssetRef | Yes |