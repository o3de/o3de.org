---
linkTitle: UI Image
description: Use visual components in Open 3D Engine's UI Editor to add color tints or textures to UI elements.
title: UI Image Component
weight: 100
---

You can use an **Image** component to add a color tint or texture to an element. Use the **Properties** pane of the [UI Editor](/docs/user-guide/interactivity/user-interface/editor) to configure the following settings for the **Image** component.

**Image Settings**

| Name | Description |
| --- | --- |
| SpriteType |  Select one of the following:   |
| Sprite path |  Click the browse (**…**) icon and select a suitable file. Click the open-in (arrow) icon next to **Sprite path** to open the [Sprite Editor](/docs/user-guide/interactivity/user-interface/editor/sprite-editor).  |
| Render target |  Click on the folder icon to select an attachment image asset. |
| Index |  The sprite sheet image index that the component will render.  |
| Color |  Click the color swatch to select a different color.  Displays only if the **SpriteType** is **Sprite/Texture asset** and the image has been configured as a sprite sheet using the [Sprite Editor](/docs/user-guide/interactivity/user-interface/editor/sprite-editor).  |
| Alpha |  Use the slider to choose an alpha value between **0** and **1**.  |
| Image type |  Select one of the following:    |
| Blend Mode |  Select one of the following:    |
| Fill Type |  Select one of the following:    |
| Fill Amount |  The amount of the image to be filled, from `0.00` to `1.00`.  |
| Fill Start Angle |  The start angle for the fill, measured in degrees clockwise from vertical.  |
| Corner Fill Origin |  The starting corner that the image is filled from. Select one of the following:   |
| Edge Fill Origin |  The edge from which the image is filled about (radial corner) or from (linear). Select one of the following:   |
| Fill Clockwise |  If selected, the image is radially filled clockwise about the fill center.  |
| Fill Center |  If selected, the center segment of a slice-resized sprite is visible.  |
