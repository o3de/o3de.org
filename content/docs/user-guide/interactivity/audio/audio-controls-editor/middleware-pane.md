---
title: Middleware Controls Pane
title: Audio Engine Middleware Controls Pane
description: Use the Audio Controls Editor's audio engine middleware controls pane to filter and select a middleware-specific control to assign to an ATL control in Open 3D Engine.
weight: 300
toc: true
---

**Wwise** is shown here as an example of an audio engine middleware's controls pane.

## To filter displayed controls

* In the **Audio Controls Editor**, in the audio engine middleware controls pane, enter your search term into the **Search** bar.

## To hide controls that are already assigned

* Select **Hide Assigned**. The unassigned controls appear in orange text.

## To create connections between ATL controls and middleware-specific controls

* In the audio engine middleware controls pane, select and drag a control to the **Connected Controls** area of the **Inspector** pane.

![Drag the selected control to the Connected Controls area of the Inspector pane](/images/user-guide/audio/audio-atl-editor-connected.png)

## To create a control

1. In the audio engine middleware controls pane, select and drag a control to the **ATL Controls** pane.

  ![Drag a middleware control directly into the ATL Controls pane to create a new control.](/images/user-guide/audio/audio-atl-editor-new.png)

  This creates a new control, which shares the same name of the middleware control. The middleware control and the ATL control are also automatically connected.

1. To preview the control, choose **File**, **Save All**.
