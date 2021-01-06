---
description: ' Use the &project-configurator; to add the Virtual Reality Gem(s) to
  enable support for head-mounted display (HMD) in your project. '
title: Configuring your Project for Virtual Reality
---
# Configuring your Project for Virtual Reality<a name="virtual-reality-configuring"></a>

Add one or more Virtual Reality gems available in Lumberyard Editor to enable virtual reality for supported head\-mounted displays \(HMDs\)\. You can add the gem\(s\) to new or existing projects\. If you add more than one gem, the system automatically detects which HMD is connected, and uses the appropriate gem code to control the specific HMD and any associated virtual reality \(VR\) controllers\. 

Supported HMDs include:
+ **Oculus** – Oculus Rift HMD
+ **OpenVR** – HTC Vive HMD

**Note**  
Use the **NullVR** Gem to run your level through the HMD framework without a connected VR device\. This is useful for VR graphics debugging\. For more information about this Gem, see [NullVR Gem](/docs/userguide/gems/builtin/nullvr.md)\.

**To add the Virtual Reality Gem\(s\)**

1. Use the **Lumberyard Setup Assistant** to open the **Project Configurator**\.

1. Select the project you want to add the Virtual Reality Gem to, or create a new project\. Then click **Set as Default**\.

1. Click **Enable Gems** below the project name\.

1. Type **VR** into the search tool\. Enable the **HMD Framework** Gem and one or more of the Virtual Reality gems:
   + **Oculus**
   + **OpenVR**
   + **NullVR**  
![\[Image NOT FOUND\]](/images/userguide/vr/virtual-reality-add-gems.png)

1. Click **Save**\.

1. After you enable the gem\(s\), you must [build your project](game-build-intro.md) before they are available in Lumberyard Editor\.