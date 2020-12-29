# Virtual Reality Samples Project<a name="sample-project-virtual-reality"></a>

The Virtual Reality Samples Project is a template that you can use to build virtual reality \(VR\) applications for any supported device\. The sample is configured with the base set of gems \(HMD Framework, Oculus, and OpenVR\) that you need for VR and demonstrates the following essential VR features:
+ Room\-scale VR setup
+ Tracked controller input system
+ Spatialized audio playback
+ Stereo 360 video playback

![\[Example image from the VR project sample level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/virtual_reality_project_sample.jpg)

**To install the Virtual Reality Samples Project**

1. Download the `vrproject.zip` package at [Lumberyard Downloads](https://aws.amazon.com/lumberyard/downloads/) and extract it in your Lumberyard directory, such as `lumberyard_version\`

1. Open [Lumberyard Setup Assistant](lumberyard-launcher-using.md) and on the **Summary** page, click **Configure project**\.
**Note**  
To ensure that the VR project launches, you must use Lumberyard Setup Assistant to open the Project Configurator\. Lumberyard Setup Assistant copies required SDKs from the `3rdParty` directory into the `dev\VirtualRealityProject` directory\.

1. In the Project Configurator, select **VirtualRealityProject** and then click **Set as default**\.

1. Close the Project Configurator\.

1. Open Lumberyard Setup Assistant\.

1. Download the required SDKs to view video playback for the Virtual Reality Samples Project\. 
**Important**  
The video playback on the TV in the **VR\_TVRoom\_Sample** level must be enabled before you can view video playback\. For instructions on setting up video playback, see [Setting Up Video Playback](component-videoplayback.md#component-videoplayback-setup)\. 

1. Close Lumberyard Setup Assistant\.

1. After completing video playback setup, you must also [build](game-build-intro.md) the virtual reality project\.

1. Start `Editor.exe` from one of the following directories:
   + For Visual Studio 2017, use the `lumberyard_version\dev\Bin64vc141` directory\.
   + For Visual Studio 2019, use the `lumberyard_version\dev\Bin64vc142` directory\.

**Topics**
+ [VR Islands Level](sample-level-vr-islands.md)
+ [VR TV Room Level](sample-level-vr-tv-room.md)
+ [VR Xylophone Level](sample-level-vr-xylophone.md)
+ [VR Box Garden Level](sample-level-vr-box-garden.md)