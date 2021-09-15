---
title: Decal component
linktitle: Decal
description: "Open 3D Engine (O3DE) Decal component reference."
toc: true
---

The **Decal** component enables an entity to project a material onto a mesh. A large number of overlapping decals can be applied to a single mesh.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

![decalsPNG](https://user-images.githubusercontent.com/61609885/133477333-26d2e430-1655-45d0-9496-fb3b3c4239b2.PNG)

### Attenuation Angle

This determines how much the decal wraps around an object. Higher values mean the attenuation is higher and there is less wrap.

**Attenuation Angle is set to 0.** Little attenuation means more wrapping.
![attenuation angle 0](https://user-images.githubusercontent.com/61609885/133480353-47022da7-892c-4be7-a4e7-7414fc0259f4.PNG)

**Attenuation Angle is set to 1.** More attenuation means less wrapping.
![attenuation angle 1](https://user-images.githubusercontent.com/61609885/133480342-052f7ad0-b2da-43c5-9671-6b5edad88ae7.PNG)


### Opacity

Determines how transparent the decal is.

### Sort Key

This determines how decals sort with each other. Decals with higher values will be layered overtop decals with lower values. 

In this case, the scorch mark is set to a larger value than the orange dirt decal and thus is on top.
![scorch mark higher value](https://user-images.githubusercontent.com/61609885/133480572-9c8a23f3-d29a-4125-af5f-b0c74a629db9.PNG)


### Material

The material that the decal is set to use.

