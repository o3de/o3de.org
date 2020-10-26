# Debugging your Virtual Reality Project<a name="virtual-reality-debug"></a>

You can debug your virtual reality project either through a running instance of the game or through Lumberyard Editor\. The head\-mounted displays that Lumberyard supports outputs debugging information when debugging is enabled\.

**To enable debugging**
+ Enable one or both of the following [console variable](virtual-reality-cvars.md)s:
  + Set **hmd\_debug\_info** to **1** \(enabled\) – Enables display of debug information provided by the associated HMD SDK\.
  + Set **hmd\_debug\_camera** to **1** \(enabled\) – Tests an editor\-style debug camera at runtime\. With this setting, players can use WASD keys to control the camera relative to the camera's facing direction, including the HMD\. In regular \(non\-VR\) mode, hold down the right mouse button to manipulate the camera's rotation\.

When in debug mode, motion controllers appear as white crosshairs\. That is, if you assigned an object or entity to represent the motion controller in the gameplay world, you will see it rendered with white crosshairs\. The following picture shows two controllers, one with render geometry assigned, and the other without\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vr/virtual-reality-crosshairs.png)