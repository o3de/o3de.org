---
linkTitle: MiniAudio 
title: MiniAudio Gem
description: The MiniAudio Gem provides support for audio playback using MiniAudio in Open 3D Engine (O3DE) projects.
toc: true
---

The MiniAudio Gem provides support for audio playback and positioning using [MiniAudio](https://miniaud.io) in **Open 3D Engine (O3DE)** projects.  Multiple audio formats are supported and sounds can be previewed in the Editor without entering game mode.

For more information on using the components provided by this Gem, refer to the [MiniAudio Playback Component](/docs/user-guide/components/reference/audio/mini-audio-playback.md) and [MiniAudio Playback Component](/docs/user-guide/components/reference/audio/mini-audio-listener.md) documentation.

## Supported Audio Formats
* FLAC
* MP3
* OGG 
* WAV

## Global Volume Control 

The global volume level can be controlled using the `MiniAudioRequestBus` which is currently only accessible from c++.