---
title: Setting the Panning Mode
description: Set the audio panning in Open 3D Engine.
---

Two common speaker panning modes can be set in the engine: Speakers and Headphones.

Setting the panning mode to Speakers will set the front L/R panning to be 60 degrees apart.

Setting the panning mode to Headphones will set the front L/R panning to be 180 degrees apart.

These panning angles will change the output mix to work better with the physical arrangement of speakers around the real listener.

To set the speaker panning mode, send a request in C++ to the audio system.

## C++ Example: Request Set Panning Mode

```cpp
using namespace Audio;

PanningMode panningMode = PanningMode::Speakers; // or PanningMode::Headphones

SAudioRequest request;

SAudioManagerRequestData\<eAMRT\_SET\_AUDIO\_PANNING\_MODE\>
requestData(panningMode);

request.nFlags = eARF\_PRIORITY\_NORMAL;

request.pData = &requestData;

AudioSystemRequestBus::Broadcast(&AudioSystemRequestBus::Events::PushRequest,
request);
```
