---
description: ' Use the NVIDIA Cloth gem to add cloth simulation to your &ALYlong;
  project. '
slug: nvidia-cloth
title: NVIDIA Cloth gem
---
# NVIDIA Cloth gem<a name="nvidia-cloth"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Physical cloth simulations can create more immersive environments and characters\. The **NVIDIA Cloth** gem uses the NVIDIA Cloth library to provide fast, robust cloth simulation in Amazon Lumberyard\.

For information on using **NVIDIA Cloth**, see [Simulate cloth with NVIDIA Cloth](nvidia-cloth-intro.md)\. 

## Functionality provided by the NVIDIA Cloth gem<a name="nvidia-cloth-functionality"></a>

The NVIDIA Cloth gem provides the following:
+ **Cloth** modifier for Mesh and Actor import in **FBX Settings**\. 
+ **Cloth** component for entities that contain a **Mesh** or **Actor** component\. 
+ Cloth colliders that can be added to actors in **Animation Editor**\. 
+ Mesh and Actor example assets and slices located in: *lumberyard\_version*\\dev\\Gems\\NvCloth\\Assets\\ 
+ A public C\+\+ API that allows other systems and gems to access cloth simulation functionality\. 

## Enable the NVIDIA Cloth gem<a name="enable-gem-nvidia-cloth"></a>

To enable the NVIDIA Cloth gem, do the following: 

**Note**  
By default, NVIDIA Cloth simulation is performed on the CPU\. To enable GPU accelerated simulation for NVIDIA Cloth, follow the installation instructions here: [GPU cloth simulation with NVIDIA CUDA](nvidia-cloth-gpu.md) 

1. Use [Project Configurator](configurator-projects.md) to add the **NVIDIA Cloth** gem to your project\. The **NVIDIA Cloth** gem requires the following gems as dependencies: 
   + **LmbrCentral** 
   + **Emotion FX Animation** 

1. Configure your project\. Use the following command\.

   ```
   lmbr_waf configure
   ```

1. Build your project\. Use the following command\.

   ```
   lmbr_waf build_win_x64_vs2019_profile -p all --progress
   ```

For more information on gems, see the [Gems system documentation](gems-system-gems.md)\. 