---
description: ' Add virtual reality to your &ALY; project to simulate a user''s presence
  in the gaming environment. '
title: Create virtual reality projects in &ALY;
---
# Create virtual reality projects in Lumberyard {#virtual-reality}

Lumberyard's [virtual reality](/docs/userguide/ly-glos-chap#virtual_reality) system integrates the use of the OculusRift and HTC Vive head\-mounted displays \(HMD\) on PC gaming systems\. Before using these head\-mounted displays, read each manufacturer's safety guide:
+ [Oculus Rift Health and Safety Warning](http://www.oculus.com/warnings)
+ [HTC Vive Safety and Regulatory Guide](http://dl4.htc.com/web_materials/Safety_Guide/Vive/Vive_safety_and_regulatory_guide_ENG-FRC-ESM.pdf)

To activate Lumberyard's virtual reality support, add the appropriate [Virtual Reality Gem\(s\)](/docs/userguide/vr/configuring.md) in the Project Configurator and then [build your project](/docs/userguide/game-build-intro.md)\. By enabling the appropriate Virtual Reality Gem\(s\), your project becomes capable of working with the supported virtual reality device\(s\), after some additional configuration\.

Use [console variables \(CVARs\)](/docs/userguide/vr/cvars.md) to activate and modify configurable features of the virtual reality system, such as resolution and performance specifications\.

You can use Script Canvas for gameplay scripting of the HMD device\.

For information on Lua scripting functions for VR, see [VR Lua Functions](/docs/userguide/scripting/lua/ref-vr.md)\.

**Topics**
+ [Configuring your Project for Virtual Reality](/docs/userguide/vr/configuring.md)
+ [Configuring Required Console Variables](/docs/userguide/vr/cvars.md)
+ [Using the InstantVR Slice](/docs/userguide/vr/instant-vr.md)
+ [Previewing your Virtual Reality Project](/docs/userguide/vr/preview.md)
+ [Debugging your Virtual Reality Project](/docs/userguide/vr/debug.md)
+ [Using EBus Request Bus Interface for Virtual Reality](/docs/userguide/vr/ebus.md)
+ [VR Lua Functions](/docs/userguide/scripting/lua/ref-vr.md)
