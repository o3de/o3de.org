---
description: ' Create realistic simulated cloth and fabric in &ALYlong; with NVIDIA
  Cloth. '
slug: nvidia-cloth-intro
title: Simulate cloth with NVIDIA Cloth
---
# Simulate cloth with NVIDIA Cloth<a name="nvidia-cloth-intro"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

 With **NVIDIA Cloth** in Amazon Lumberyard you can create realistic cloth simulations for entities that contain **Actor** or **Mesh** components\. The **NVIDIA Cloth** gem provides a component you can use to simulate cloth on any mesh that has been processed with a **Cloth** modifier applied in **FBX Settings**\. 

To use **NVIDIA Cloth** you must enable the [NVIDIA Cloth gem](nvidia-cloth.md)\. 

## NVIDIA Cloth features<a name="nvidia-cloth-features"></a>

****
+ Apply cloth data to meshes imported from `.fbx` files\. 
+ Add cloth simulation to entities containing **Mesh** and **Actor** components\. 
+ Cloth mesh simplification and static triangle removal allow you to use complex cloth meshes and yield faster cloth simulation\. 
+ Define **Inverse mass**, **Motion constraints**, and **Backstop** per cloth particle with vertex color streams you create\. 
+ Blend between cloth simulation and actor keyframe animation with motion constraints\. 
+ Add cloth colliders to actors with **Animation Editor**\. 
+ Add local wind forces to your cloth simulations or use force regions to simulate wind\. 
+ Simulate cloth in parallel across available CPU cores, or simulate cloth on a discrete GPU that supports NVIDIA CUDA \(Windows 10 only\)\. 
+ **NVIDIA Cloth** gem's public API allows other systems and gems to access cloth simulation functionality\. 
+ Debug cloth simulations and constraints with real\-time cloth debug visualizations\. 

## Using NVIDIA Cloth<a name="nvidia-cloth-topics"></a>

[Cloth component](component-cloth.md) \- Cloth component reference\. 

[Cloth for Mesh components](nvidia-cloth-meshes.md) \- Create cloth for entities containing **Mesh** components\. 

[Cloth for Actor components](nvidia-cloth-actors.md) \- Create cloth for entities containing **Actor** components\. 

[Per vertex properties for cloth](nvidia-cloth-vertex-data.md) \- Use per vertex properties to define the **Inverse mass**, **Motion constraints**, and **Backstop** to create higher quality and more predictable cloth simulations\. 

[Cloth simulation constraints](nvidia-cloth-constraints.md) \- An overview of how **Motion constraints** and **Backstop** work to improve the results of cloth simulations\. 

[Cloth visual debugger](nvidia-cloth-debugging.md) \- Enable the visual debugger for cloth simulations\. 

[GPU cloth simulation with NVIDIA CUDA](nvidia-cloth-gpu.md) \- Install NVIDIA CUDA to enable GPU acceleration for NVIDIA Cloth\. 

## NVIDIA Cloth references<a name="component-cloth-references"></a>

 [NVIDIA Cloth documentation](https://gameworksdocs.nvidia.com/NvCloth/1.1/index.html) at the NVIDIA GAMEWORKS developer portal\. 