---
description: ' Use the Audio Proxy component in O3DE to provide a method of communication
  between multiple audio components. '
title: Audio Proxy
---
# Audio Proxy {#component-audio-proxy}

The **Audio Proxy** component is a required dependency if you add multiple audio components to an entity\. It acts as a proxy audio object wrapped in a component\. For example, if you have an audio trigger component and an audio rtpc component on the same entity, they communicate to the same audio object using this audio proxy component\.