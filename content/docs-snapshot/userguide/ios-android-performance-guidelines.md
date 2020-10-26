# Lumberyard Performance Tuning Guidelines for Mobile Devices<a name="ios-android-performance-guidelines"></a>

See the following guidelines for generating art assets for mobile games with Lumberyard and how to tune Lumberyard performance for mobile devices\.

**Topics**
+ [Art Guidelines](#ios-android-performance-art-guidelines)
+ [Engineering Guidelines](#ios-android-performance-engineering-guidelines)
+ [GPU Memory \(GMEM\)](#ios-android-performance-using-gpu-memory-gmem)
+ [Memory and App Size](#ios-android-performance-memory-app-size-guidelines)
+ [Particle Rendering Features and Performance](#ios-android-performance-particle-rendering-guidelines)

## Art Guidelines<a name="ios-android-performance-art-guidelines"></a>

This section provides guidelines for geometry, lighting, cascade shadow maps, and materials\.

### Geometry Guidelines<a name="ios-android-performance-art-guidelines-geometry"></a>

Follow these guidelines when creating geometry for your mobile game:
+ Use fewer individual objects to significantly reduce the draw calls\. We recommend 750 or less draw calls on mobile devices\.
+ Use instances where appropriate\. To do so, create a slice in Lumberyard Editor and then instantiate multiple instances of that slice in the level\.
+ Add support for geometry level of detail \([LOD](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#lod)\)\. Each LOD should be a 50% reduction of geometry\.
  + Group the high resolution LOD model under `_lod0_objectname`\.
  + Group the next LOD model under `_lod1_objectname_group`\.
  + Name the shadow proxy model as `shadowproxy`\.
  + Export the shadow proxy model with the shadow proxy material\.
  + Group the shadow proxy model under the last LOD group\.  
**Example**  

    The following is an LOD setup in Maya\.  
![\[Example level of detail (LOD) setup in Maya.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/geometry-level-of-detail-setup-example-maya.png)
  + Do the following to tune the LOD:

    1. In Lumberyard Editor, select an entity in your level that has a **[Mesh](component-static-mesh.md)** component\.

    1. In the **Entity Inspector**, in the **Mesh** component, under **Options**, adjust the slider for **LOD distance ratio**\. The slider adjusts the distance at which the LOD pops in\.

    1. Tune each asset to see only the high resolution asset when needed\.
+ Restrict your poly count as follows for each camera view in the game:
  + For low\-end devices, use 300k or below\.
  + For higher\-end devices, use 700k or below if the CPU is the bottleneck\.
**Note**  
To determine the poly count, set **r\_DisplayInfo** to **1** in the Lumberyard Editor console\. The debug data on the top right of the screen will display the poly number for each frame of the scene\.
+ In the **Console** pane in Lumberyard Editor, set the console variable `r_stats` to **1** to print the number of draw calls and polygons that the current camera renders\.

### Lighting Guidelines<a name="ios-android-performance-art-guidelines-lighting"></a>

Follow these guidelines when adding lighting to your mobile game:
+ Carefully consider the amount of lights in your scene that cast shadows\.
+ Do the following to tune the lights:

  1. In Lumberyard Editor, select an entity in your level that has a **Mesh** component\.

  1. In the **Entity Inspector**, in the **Mesh** component, under **Options**, adjust the value for **View distance multiplier**\. Specify a lower value to fade out the light and stop drawing sooner\. This setting is important for performance\.
+ Add area and projector lights only if needed\. Lighting pass is expensive\.
+ Reduce the light area if possible\. Be frugal\.
+ Avoid overlapping light areas\.
+ Avoid overlapping environment probe areas\.
+ Avoid covering large areas with environment probes, which can introduce artifacts on the edge of the large areas\. For example, 1,000 x 1,000 is too large for an environment probe to cover\. We recommend dividing an area that size into four smaller areas\.
+ Simulate bounced lighting with lights that don't cast shadows\. Global illumination cannot be used on mobile devices\.  
**Example**  

  The following scene uses non\-shadow casting lights to simulate global illumination \(GI\) bounce\.  
![\[Example scene that uses non-shadow casting lights to simulate global illumination (GI) bounce.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/lighting-global-illumination-simulation-example.png)

### Cascade Shadow Map Guidelines<a name="ios-android-performance-art-guidelines-cascade-shadow-maps"></a>

Lumberyard uses console variables to specify how to generate cascade shadow maps and to improve performance for the shadow pass\. You can also set these variables to impact the engine globally or per level\. Edit the `level.cfg` file to set the variables for a specific level\. For more information, see [Using the Console Window](console-intro.md)\.
+ `e_ShadowsCascadesDebug` – Enables the debug view for the cascade shadow maps\. Each cascade in the world renders with a different color to provide visual feedback of the area that is covered by a cascade shadow map\.

**Example**  
The following global shadow map \(GSM\) has the `e_ShadowsCascadesDebug` console variable set to **1**\.  

![\[Example of a global shadow map (GSM) with the e_ShadowsCascadesDebug console variable set to 1.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/global-shadow-map-example.png)

Use the following console variables to specify the size and how to generate shadow cascades:
+ `e_GsmLodsNum` – Specifies the number of shadow cascades to use\. The default value is `5`\.
+ `e_GsmRange` – Specifies the size of the first shadow cascade in square world units\. The default value is `3`, which covers three square units in the world\. In the previous example, the first shadow cascade is drawn in red\.
+ `e_GsmRangeStep` – Specifies the multiplier to use to calculate the size of the next shadow cascade\. The default value is `3`\.

  For example, if you set `e_GsmRange` to **3**, the first shadow cascade covers three square units in the world\. To calculate the next shadow cascade size, Lumberyard multiplies the first shadow cascade and the value for `e_GsmRangeStep`\. If the value for `e_GsmRangeStep` is the default value of `3`, the next shadow cascade would cover nine square units in the world\. The next shadow cascade would cover 27 square units in the world, and so on\.

When you set console variables, try to balance reducing the size and number of cascade shadow maps and maintaining the visual quality of your game\. You can set `e_shadows` to **0** to turn off shadows, which may be necessary for low\-end devices\.

The following images demonstrate how the global shadow map \(GSM\) console variables affect the shadow cascade size and coverage distance\.


****  

| 
| 
| **Example images for GSM impact on shadow cascade size and coverage distance** | 
| --- |
| Set the e\_GsmRange console variable to 1 to reduce the size of the shadow cascade\. | Set the e\_GsmRangeStep console variable to 1\.5 to reduce the area that each consecutive cascade covers\. | Set the e\_GsmNodLods console variable to 3 to reduce the number of shadow cascades that Lumberyard uses\. | 
|  ![\[Set the e_GsmRange console variable to 1 to reduce the size of the shadow cascade.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/global-shadow-map-e_GsmRange.png)  |  ![\[Set the e_GsmRangeStep console variable to 1.5 to reduce the area that each consecutive cascade covers.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/global-shadow-map-e_GsmRangeStep.png)  |  ![\[Set the e_GsmNodLods console variable to 3 to reduce the number of shadow cascades that Lumberyard uses.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/global-shadow-map-e_GsmNodLods.png)  | 

### Material Guidelines<a name="ios-android-performance-art-guidelines-materials"></a>

Follow these guidelines when creating materials for your mobile game:
+ Use fewer individual objects and materials to significantly reduce the draw calls\.
+ Use texture atlases to reduce the number of materials or submaterials needed, reduce the draw calls, and increase performance\.
+ Reduce the texture size to 1024 x 1024 or less\.

## Engineering Guidelines<a name="ios-android-performance-engineering-guidelines"></a>

Lumberyard provides four levels of configuration files to support enabling and disabling features and functionality based on performance characteristics of the mobile devices\. You can find the following files in the `lumberyard_version/dev/Engine/Config/spec` directory:
+ `ios_low.cfg`
+ `ios_medium.cfg`
+ `ios_high.cfg`
+ `ios_veryhigh.cfg`
+ `android_low.cfg`
+ `android_medium.cfg`
+ `android_high.cfg`
+ `android_veryhigh.cfg`

Each file includes a set of console variables in which you can enable or disable engine features\.

You can also edit the configuration files in the **Graphics Settings** window in Lumberyard Editor\.

**To edit configuration files in Lumberyard Editor**

1. In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Graphics Settings**\.

1. In the **Graphics Settings** window, do the following:

   1. For **Platform**, select your device such as **iOS**\.

   1. For the preferred configuration file, adjust the values for the various console variables\. For example, if you select **iOS**, console variables and values for each configuration file appear \(`ios_low.cfg`, `ios_medium.cfg`, `ios_high.cfg`, and `ios_veryhigh.cfg`\)\.

   When you edit the console variables for the configuration file, the renderer displays onscreen how the level may look on a mobile device\.  
![\[Example of the Graphics Settings window in Lumberyard Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/graphics-settings-window-ios-example.png)

### Using android\_models\.xml and ios\_models\.xml Files<a name="ios-android-performance-engineering-guidelines-models-xml-files"></a>

Lumberyard uses two `.xml` files to determine which mobile devices use the low, medium, high, or very high configuration settings files\. You can find the `android_models.xml` and `ios_models.xml` files in the `/lumberyard_version/dev/Engine/Config/gpu` directory\.

**Example android\_models\.xml file**  
The Samsung Galaxy S5 line shows that Lumberyard supports the use of regular expressions when you specify the device model number\. If a device model is listed more than once, the last instance is read and used with the corresponding configuration file\.  

```
<DeviceList>
    <Config file="android_low.cfg">
        <Device model="KFTHWI"/> <!-- Amazon Kindle Fire HDX -->
        <Device model="Nexus 7"/> <!-- Nexus 7 -->
        <Device model="Nexus 5"/> <!-- Nexus 5 -->
        <Device model="SM-N910H"/> <!-- Samsung Galaxy Note 4  (Asia-Pacific)-->
        <Device model=“SM-G900\w{1,2}“/> <!-- Samsung Galaxy S5 -->
   </Config>
    <Config file="android_medium.cfg">
        <Device model="SM-T217S"/> <!-- Samsung Galaxy Tab 3 -->
        <Device model="SM-N920C"/> <!-- Samsung Note 5 -->
    </Config>
    <Config file="android_high.cfg">
        <Device model="Nexus 6"/> <!-- Motorola Nexus 6 -->
        <Device model="Pixel"/> <!-- Google Pixel -->
    </Config>
    <Config file="android_veryhigh.cfg">
    </Config>
</DeviceList>
```

## GPU Memory \(GMEM\)<a name="ios-android-performance-using-gpu-memory-gmem"></a>

GPU memory \(GMEM\) is a class of optimizations that uses local memory on the GPU to reduce the transfer of large textures between the CPU and GPU\. GMEM can operate in the following modes, depending on what the mobile device can support:
+ 256 bit mode – The engine can store three GBuffer render targets and depth or stencil in the local GPU pixel memory, while doing the preliminary Z pass, generating the GBuffer, deferring decals, and deferring rain and snow passes\. This mode also stores the diffuse and specular light accumulation textures in the local GPU pixel memory during the deferred shading passes of the renderer\.
+ 128 bit mode – This mode stores the diffuse and specular light accumulation textures in the local GPU pixel memory during the deferred shading passes of the renderer\. Compared to the 256 bit mode, the 128 bit mode provides less of a performance boost\. However, with the 128 bit mode you can enable certain rendering features that are not available if you use the 256 bit mode\.
+ Disabled – This mode means that GMEM is not supported or has been disabled in the configuration files\.

The renderer uses two OpenGL extensions to determine which GMEM mode is supported for Android devices:
+ Framebuffer fetch \(256 bit mode\)
+ Pixel Local Storage \(128 bit mode\)

For the iOS devices that Lumberyard supports, both GMEM 256 bit mode and 128 bit mode are supported\.

### Setting the GMEM Mode<a name="gpu-memory-setting-gmem-mode"></a>

You can enable or disable GMEM with the `r_EnableGMEMPath` console variable\.
+ **0** = Disables GMEM in the renderer\.
+ **1** = Enables the renderer to use GMEM in 256 bit mode\. If the mobile device doesn't support 256 bit mode, the renderer will use 128 bit mode\. If the mobile device doesn’t support 128 bit mode, the renderer will disable GMEM\.
+ **2** = Enables the renderer to use GMEM in 128 bit mode\.

You can only enable or disable GMEM during engine startup\. You must add the `r_EnableGMEMPath` console variable to one of the following files:
+ `android_low.cfg`
+ `android_medium.cfg`
+ `android_high.cfg`
+ `android_veryhigh.cfg`
+ `ios_low.cfg`
+ `ios_medium.cfg`
+ `ios_high.cfg`
+ `ios_veryhigh.cfg`
+ `system_android_es3.cfg`
+ `system_ios_ios.cfg`

**Note**  
To prevent visual artifacts and performance issues, do not change the value of the `r_EnableGMEMPath` console variable during runtime\.

### Rendering Features and GMEM<a name="gpu-memory-setting-gmem-and-rendering-features"></a>

GMEM offers the flexibility of setting the mode and rendering features to meet the visual quality and performance for a range of mobile devices\. More powerful mobile devices may be able to use GMEM 128 bit mode and still meet the necessary performance requirements\. You can use the configuration files for your mobile device as well as the `android_models.xml` or `ios_models.xml` files to set your requirements\.

If you enable GMEM 256 bit mode, you cannot use the following features:
+ Motion blur
+ Temporal antialiasing
+ Screen space reflections
+ Screen space directional occlusion
+ Fur
+ Deferred subsurface scattering
+ Volumetric fog
+ Deferred rain or snow occlusion

If you enable GMEM 128 bit mode, you cannot use the following features:
+ Fur
+ Deferred subsurface scattering
+ Volumetric fog
+ Deferred rain or snow occlusion

If you want to use a rendering feature that GMEM 128 bit mode supports but not GMEM 256 bit mode, the renderer automatically sets the mode to 128\. This is true even if the mode is set to 256 in the configuration files\.

To use all available rendering features, disable GMEM\.

## Memory and App Size<a name="ios-android-performance-memory-app-size-guidelines"></a>

Because mobile devices have a limited amount of memory, you should take the necessary steps to reduce the size of your app and the amount of memory it requires\. Follow these guidelines:
+ Include only the resources that your game uses\.
  + Enable only the gems that are required for your game\. This will prevent unnecessary code and assets from being bundled into your app\.
+ Include only the assets that your game uses\.
  + Check the `Cache` directory for your game project to see which assets the build process will pack into the app bundle\.
  + On Windows, use WinDirStat to identify which assets use the most resources, and determine whether to include the assets in the app bundle or host the assets online as a separate download\.
  + Remove editor\-only assets, which Asset Processor adds to the `Cache` directory\. This will reduce the size of the final app bundle\.
  + Remove assets in the engine directory\. These assets may significantly increase the size of your final app bundle, even if your game doesn't use them\. The `defaulttextures.xml` file contains a list of textures that certain game projects might not use\. You can find this file in the `/lumberyard_version/dev/Engine/EngineAssets` directory\.
+ Avoid using static allocations\. This will reduce the size of your executable code and allow for safer memory management at runtime\.
+ Provide downloads for region\-specific assets\. If your app uses localized content and you plan to deploy to multiple regions, consider dividing up your app and hosting the data for each region on Amazon S3\. You can then use the dynamic content system to download region\-specific assets\.

**Android**  
If you want to reduce the size of a large app, you can use the tools that are included with the Android NDK to examine your executable\. For example, you can use objdump or nm\. The nm tool can disassemble your binary files and show the size of each code segment\. The nm tool can also list symbols and detect if code is unexpectedly linked to your binary\.

## Particle Rendering Features and Performance<a name="ios-android-performance-particle-rendering-guidelines"></a>

Particles use sun and light volumes to determine how they should be lit in the scene\. Because light volumes are expensive on mobile devices, we do not recommend using this feature on medium to low\-end devices\. To specify how particles are lit, you can use the `e_LightVolumes` console variable with the following values:
+ `0` = Particles are not affected by the sun or light volume lights\.
+ `1` = Particles are affected by the sun and light volume lights\.
+ `2` = Particles are affected only by the sun light\.