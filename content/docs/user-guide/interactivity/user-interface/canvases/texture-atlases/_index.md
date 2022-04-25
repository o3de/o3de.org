---
linkTitle: Texture Atlases
title: Using Texture Atlases
description: ' Use texture atlases on UI canvases for quicker rendering of textures in Open 3D Engine. '
toc: true
weight: 600
---

To reduce draw calls, you can add individual textures to a texture atlas and then add one or more texture atlases to a UI canvas.

## Characteristics 

UI canvases and texture atlases have the following characteristics:
+ Each UI canvas contains a list of texture atlases to be loaded.
+ Texture atlases are loaded when the UI canvas loads. They're unloaded when the UI canvas unloads.
+ If multiple UI canvases load the same texture atlas, the texture atlas is loaded only once.
+ UI elements that render textures preferentially use textures from a loaded texture atlas, if available.
+ The texture atlas is only unloaded when all UI canvases that loaded it are unloaded.

## Advantages 

The principle advantages of texture atlases are the following:
+ Draw calls are significantly reduced.
+ Enhanced compression. Although source textures whose dimensions aren't multiples of four aren't compressed, texture atlases are always compressed.
+ Forced preloading of texture groups. When the canvas loads, it also loads its texture atlases.
