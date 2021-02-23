---
description: ' Use the NVIDIA Blast gem to simulate destruction in your Amazon Lumberyard
  project. '
title: NVIDIA Blast gem
---
# NVIDIA Blast gem {#nvidia-blast}


****

|  |
| --- |
| This feature is an [experimental](/docs/userguide/ly-glos-chap#experimental) release and is subject to change\.  |

The **NVIDIA Blast** gem uses the NVIDIA Blast library to provide fast, high\-fidelity destruction simulation in Amazon Lumberyard\.

**Note**
NVIDIA Blast for Lumberyard requires a SideFX Houdini commercial or indie license to create assets\. The apprentice license is not sufficient\. For more information on Houdini, see [SideFX's home page](https://www.sidefx.com/)\.
The precompiled Houdini plug\-ins supplied with the **NVIDIA Blast** gem require Houdini 18\.0\.

For NVIDIA Blast developer information, see [Simulated destruction with NVIDIA Blast](/docs/user-guide/features/interactivity/physics/nvidia-blast/intro.md)\.

**Contents**
+ [Functionality provided by the NVIDIA Blast gem](#nvidia-blast-functionality)
+ [Enable the NVIDIA Blast gem](#enable-gem-nvidia-blast)

## Functionality provided by the NVIDIA Blast gem {#nvidia-blast-functionality}

The NVIDIA Blast gem provides the following:
+ **Blast Family Mesh Data** component that adds NVIDIA Blast meshes to an entity\.
+ **Blast Family** component that enables NVIDIA Blast simulation for an entity\.
+ **Blast Configuration** editor available in the **Tools** menu in Lumberyard Editor\.
+ **Blast Materials** to set physical properties for NVIDIA Blast assets available in **Asset Editor**\.
+ **Blast Script Canvas** nodes to script destruction simulation\.
+ Plug\-ins and Houdini Digital Assets for SideFX Houdini to fracture geometry and export NVIDIA Blast assets\.
+ A Python Asset Builder to process NVIDIA Blast assets and generate blast slices\.
+ A public C\+\+ API that allows other systems and gems to access NVIDIA Blast simulation functionality\.

## Enable the NVIDIA Blast gem {#enable-gem-nvidia-blast}

To enable the NVIDIA Blast gem, do the following:

1. Use [Project Configurator](/docs/userguide/configurator/projects.md) to add the **NVIDIA Blast** gem to your project\. The **NVIDIA Blast** gem requires the following gems as dependencies:
   + **LmbrCentral**
   + **PhysX**
**Important**
Though not required, we highly recommend that you enable the [Python Asset Builder gem](/docs/user-guide/features/assets/builder/_index.md) with the **NVIDIA Blast** gem\. The **NVIDIA Blast** gem includes a Python asset builder script that automatically processes mesh assets for NVIDIA Blast and creates a blast slice asset\.

1. Configure your project\. Use the following command\.

   ```
   lmbr_waf configure
   ```

1. Build your project\. Use the following command\.

   ```
   lmbr_waf build_win_x64_vs2019_profile -p all --progress
   ```

For more information on gems, see the ADD LINK TO GEMS ROOT PAGE Gems documentation\.