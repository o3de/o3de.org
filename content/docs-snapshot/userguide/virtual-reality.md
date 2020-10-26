# Create virtual reality projects in Lumberyard<a name="virtual-reality"></a>

Lumberyard's [virtual reality](ly-glos-chap.md#virtual_reality) system integrates the use of the OculusRift and HTC Vive head\-mounted displays \(HMD\) on PC gaming systems\. Before using these head\-mounted displays, read each manufacturer's safety guide:
+ [Oculus Rift Health and Safety Warning](http://www.oculus.com/warnings)
+ [HTC Vive Safety and Regulatory Guide](http://dl4.htc.com/web_materials/Safety_Guide/Vive/Vive_safety_and_regulatory_guide_ENG-FRC-ESM.pdf)

To activate Lumberyard's virtual reality support, add the appropriate [Virtual Reality Gem\(s\)](virtual-reality-configuring.md) in the Project Configurator and then [build your project](game-build-intro.md)\. By enabling the appropriate Virtual Reality Gem\(s\), your project becomes capable of working with the supported virtual reality device\(s\), after some additional configuration\.

Use [console variables \(CVARs\)](virtual-reality-cvars.md) to activate and modify configurable features of the virtual reality system, such as resolution and performance specifications\. 

You can use Script Canvas for gameplay scripting of the HMD device\.

For information on Lua scripting functions for VR, see [VR Lua Functions](lua-scripting-ref-vr.md)\.

**Topics**
+ [Configuring your Project for Virtual Reality](virtual-reality-configuring.md)
+ [Configuring Required Console Variables](virtual-reality-cvars.md)
+ [Using the InstantVR Slice](virtual-reality-instant-vr.md)
+ [Previewing your Virtual Reality Project](virtual-reality-preview.md)
+ [Debugging your Virtual Reality Project](virtual-reality-debug.md)
+ [Using EBus Request Bus Interface for Virtual Reality](virtual-reality-ebus.md)
+ [VR Lua Functions](lua-scripting-ref-vr.md)