description: ' Configure your &ALYlong; project to compile assets for Android and
  correctly declare which device resources it uses. '
slug: android-configure-project
title: Configure &ALY; projects for Android
---
# Configure Lumberyard projects for Android<a name="android-configure-project"></a>

 In addition to the [system\-wide configuration requirements](android-setting-up-environment.md) to build for Android, Amazon Lumberyard requires some project\-specific settings as well\. These settings not only include things like supplying values to the [Android Manifest](https://developer.android.com/guide/topics/manifest/manifest-intro), they also control the application's ability to connect to the shader compiler and how assets are loaded onto the device\. With the Virtual File System \(VFS\) offered by the Asset Processor, you can even live\-reload assets on the device as they change\. 

 This section covers the basics of configuring your project so that you can work with Android\. For all of the available settings, see [Reference for Android](android-reference.md)\. 

**Important**  
 Because project settings impact how your application communicates with some services on the Asset Processor host and modify the Android manifest, changing any settings for your project will require a rebuild\. 

**Topics**
+ [Handling assets on Android](#android-configure-asset-loading)
+ [Serving assets over the Virtual File System \(VFS\)](#android-vfs)
+ [Custom Android manifests](#custom-manifest-files)

## Handling assets on Android<a name="android-configure-asset-loading"></a>

 Working with Android in Lumberyard can be complicated because of the restrictions of the Android platform, which affects how Android application packages \(APKs\) are built and deployed\. Different asset deployment configurations can greatly affect performance during your development process, so make sure that you select the one that's right for your use case\. This section helps break down what options are available, when they're most appropriate, and how you configure your Lumberyard project in order to support each\. 

 These are the asset modes that are available modes for asset deployment to devices:
+ `configuration_default` — assets are packed according to the build configuration:
  + The **debug** and **profile** configurations use `loose_files` mode\.
  + The **release** and **performance** configurations use the `project_settings` mode to determine how to build assets, the APK, and any OBB files\.
+ `loose_files` and `loose_paks` — assets are *loose*, which means that they are copied to storage media\. For more information about loose files, see [Loose modes](#android-configure-asset-loading-loose)\.
+ `apk_files` and `apk_paks` — assets are *packed*, which means that they are bundled as part of your APK\. For more information about packed files, see [Packed modes](#android-configure-asset-loading-packed)\.
+ `project_settings` — assets are packed according to the configuration\.

 To configure which asset mode your deployments use, open `lumberyard_install_dir\dev\_WAF_\user_settings.options` in a text editor and modify the `[Android Options]` section\. 

```
[Android Options]
android_asset_mode = [ configuration_default | loose_files | loose_paks | apk_files | apk_paks | project_settings ]
```

### Loose modes<a name="android-configure-asset-loading-loose"></a>

 In *loose files* mode \(`loose_files` or `loose_paks`\), none of your assets are included into the APK\. Instead, assets are copied directly to the storage media on the Android device and loaded by the Lumberyard engine at runtime\. When using `loose_paks`, assets are first placed into a `.pak` file and then pushed to the device\. 

 A loose files mode is probably what you want to be using for day\-to\-day development and to rapidly iterate on assets and deploy updates to the device\. 

 When using loose assets, we recommend the `loose_files` mode to make manual inspection of the device's SD card easier and on\-demand asset deployments faster, at the cost of a small performance hit when making the initial asset load\. To configure your deployments to use loose files mode, open `lumberyard_install_dir\dev\_WAF_\user_settings.options` in a text editor and modify the `[Android Options]` section\. 

```
[Android Options]
android_asset_mode = loose_files
```

### Packed modes<a name="android-configure-asset-loading-packed"></a>

 Unlike many Lumberyard scenarios in which packed assets refer to `.pak` files, the *packed assets* \(`apk_files` and `apk_paks`\) modes bundle your assets as part of the deployed APK, with the option of putting them into a `.pak` first\. This APK is sometimes referred to as a *packed APK*, which refers to the fact that assets are packed into the APK and not distributed separately\.

Bundling your assets in an APK allows for deployment of a single artifact, making these modes ideal for building APKs to distribute for testing or previews\. 

When using packed assets, we recommend the `apk_paks` mode, which offers some performance improvements\. To configure your deployments to use packed assets mode, open `lumberyard_install_dir\dev\_WAF_\user_settings.options` in a text editor and modify the `[Android Options]` section\. 

```
[Android Options]
android_asset_mode = apk_paks
```

**Tip**  
 If you want to do large\-scale automated testing across multiple devices, you can build packed APKs and distribute them to [AWS Device Farm](https://docs.aws.amazon.com/devicefarm/latest/developerguide)\. 

## Serving assets over the Virtual File System \(VFS\)<a name="android-vfs"></a>

 During the early stages of development with Lumberyard, and for users rapidly iterating on assets in a way that requires live reloading, you can use the Virtual File System \(VFS\) to stream assets to a device from your development machine\. The VFS uses the Asset Processor as a proxy that your Android device connects to in order to receive updated assets\. Whenever the Asset Processor rebuilds a product asset, that asset is copied to the device and reloaded\. The VFS doesn't do initial asset deployments — your build configuration's asset mode is respected — only reloads\. 

**To turn on VFS**

1. Open the file `lumberyard_install_dir\dev\bootstrap.cfg` in a text editor\.

1. Turn on the Asset Processor VFS support by changing the `remote_filesystem` value to `1`\.

   ```
   remote_filesystem=1
   ```

1.  Configure the connection information for the VFS by changing the values of `remote_ip`, `remote_port`, and `white_list`\. For an Asset Processor running locally, both the remote IP address and allow list should be `127.0.0.1`\. The default port of the Asset Processor is `45643`\. 

   ```
   remote_ip=127.0.0.1
   remote_port=asset_processor_port
   white_list=127.0.0.1
   ```

1. Configure the Lumberyard engine to connect to the VFS and boot without some assets preloaded\.

   ```
   connect_to_remote=1
   wait_for_connect=0
   ```

1.  Configure the connection from the device to the shader compiler\. You can either do this by starting the Shader Compiler yourself, or by passing traffic to the Shader Compiler through the Asset Processor\. 
   +  **Connect directly to shader compiler** – See [Connect to the Shader Compiler](android-build-deploy.md#running-the-shader-compiler-for-android) for instructions\. 
   + **Connect to Asset Processor** – Edit the Android configuration to use the Asset Processor's shader compiler process\.

     1. Open the file `lumberyard_install_dir\dev\system_android_es3.cfg` in a text editor\.

     1. Change the value of `r_AssetProcessorShaderCompiler` to `1`\.

        ```
        r_AssetProcessorShaderCompiler=1
        ```

1. Set up port forwarding from the device to the Asset Processor\.

   ```
   adb reverse tcp:45643 tcp:45643
   ```

1. Rebuild your Lumberyard project for Android and deploy it to the device\.

 Now when you launch your Lumberyard project, it will connect to the Asset Processor host to do live asset reloads over the VFS\. 

## Custom Android manifests<a name="custom-manifest-files"></a>

 As part of each Android application, Google requires a list of activities that will be performed by the application, and which device capabilities are required\. For example, if your project uses live location data on an Android device, you'll need to ensure that your project has the appropriate permissions to collect data at the right intervals and with the appropriate location precision\. Because Lumberyard projects are made up of many components, during the build process, the build tools pick up multiple manifests and merge them together\. 

 If you're using a gem or other component that requires special device access, or that runs its own Android [Activity](https://developer.android.com/reference/android/app/Activity) or [Intent](https://developer.android.com/reference/android/content/Intent), the gem requires an Android manifest file\. This file needs to meet the following criteria to be picked up by the build system: 
+ The file must be named `AndroidManifest.xml` and conform to the [Android manifest format](https://developer.android.com/guide/topics/manifest/manifest-intro#filec)\.
+  The gem or module's `wscript` build file must include `android_manifest_path` as a key in the gem definition that's passed to the build system\. The value of this key should be the **absolute** path to the directory containing the manifest\. 

 For example, the [microphone gem](gems-system-gem-microphone.md) uses an Android manifest to give your project access to the microphone\. Below is a portion of the microphone gem's `wscript` that defines how to locate the Android manifest file\. This snippet sets up the gem to use the manifest at `lumberyard_install_dir\dev\Gems\Microphone\Code\Source\Android\AndroidManifest.xml`\.

```
def build(bld):
    manifest_src_root = bld.path.make_node(os.path.join('Source', 'Android'))

    kw_dict = dict(
        # ...
        android_manifest_path = [ manifest_src_root.abspath() ],
        # ...
    )

    bld.DefineGem(
        **kw_dict
    )
```

To learn more about the gem building system and using `wscript`files, see [Gem Structure](gems-system-structure.md) and [Waf Module Files \(wscript\)](waf-files-module-files-wscript.md)\. For more information on Android manifests, their purpose, and how to structure their contents, see the [official Android documentation](https://developer.android.com/guide/topics/manifest/manifest-intro)\. 