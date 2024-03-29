---
title: Audio Translation Layer
description: Learn about the Open 3D Engine Audio Translation Layer (ATL).
weight: 300
---

The Audio Translation Layer (ATL) manages the state of the audio system and relays game requests to the underlying audio middleware. The ATL is a generic layer that doesn't contain middleware-specific code, which makes it possible to use different audio middleware implementations. The ATL manages audio objects and their states, as well as any loaded audio files, such as soundbanks.

The **Audio Controls Editor** (ACE) is an O3DE Editor plugin that manages the mappings between the project's ATL controls and their audio middleware equivalents.

The ATL controls support a flexible workflow for a project, such as the following cases:

* You are ready to integrate sounds into your game, but audio middleware content is not yet created. You can first create the ATL controls and integrate them into the game. When audio content is complete, you can then connect the existing ATL controls to the new middleware controls.

* You make changes later in your project to the middleware controls, which breaks the connections to their ATL controls. Instead of finding every instance where you used a sound, you can fix the connection between the ATL and the middleware. This automatically fixes the broken connections.
