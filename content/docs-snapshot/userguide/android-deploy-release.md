# Releasing Lumberyard projects for Android<a name="android-deploy-release"></a>

 Setting up to release for Android can be a complicated process because of the number of steps involved, and the restrictions that are required for publishing on the Google Play Store\. For the full and up to date list of requirements, see the [official Android documentation](https://developer.android.com/studio/publish#publishing-prepare)\. In this topic you'll walk through additional steps needed for distribution, configure to submit an application larger than 100Mb to the Google Play Store, and build your release binaries\. 

**Topics**
+ [Configure your signing key](#using-your-signing-key)
+ [Create expansion files \(OBBs\)](#android-create-expansion)
+ [Release process](#android-release-process)

## Configure your signing key<a name="using-your-signing-key"></a>

 As part of submission to the Google Play Store, you're required to sign your application\. The [official Android Documentation](https://developer.android.com/studio/publish/app-signing)discusses setting up your key signing in detail, as well as steps involved in uploading your signing key and signed application to Google Play\. As part of building your APK, the Lumberyard build system takes care of doing the signing for you\. 

 In order to set up key signing, you'll need to [generate an upload key](https://developer.android.com/studio/publish/app-signing#generate-key)\. 

1. Open the file `lumberyard_install_dir/dev/_WAF_/android/android_settings.json` in a text editor\.

1. Make the following edits\.

   1. Change the value for `DISTRO_KEYSTORE_ALIAS` to the alias of your distribution keystore\.

   1.  Change the value for `DISTRO_KEYSTORE` to the path to your distribution keystore\. This path **must** be relative to `lumberyard_install_dir/dev`\. 

   1. Change `BUILD_ENVIRONMENT` to **Distribution**\.

   ```
   {
       "DEV_KEYSTORE_ALIAS" : "development_keystore",
       "DEV_KEYSTORE" : "_WAF_/android/dev.keystore",
   
       "DISTRO_KEYSTORE_ALIAS" : "your-keystore-alias",
       "DISTRO_KEYSTORE" : "your-keystore-path",
   
       "BUILD_TOOLS_VER" : "latest",
   
       "SDK_VERSION" : "android-28",
       "NDK_PLATFORM" : "android-21",
   
       "BUILD_ENVIRONMENT" : "Distribution"
   }
   ```

 Now when building your project, you're required to include the `--distro-store-pass` and `--distro-key-pass` arguments\. These are respectively the password to the keystore itself and the password to your upload key for the Google Play Store\. 

 This enables your ability to produce release builds\. In order to switch back to performing development builds, change `BUILD_ENVIRONMENT` back to **Development**\. 

## Create expansion files \(OBBs\)<a name="android-create-expansion"></a>

**Warning**  
 In Lumberyard version v1\.21 and later, the resource compiler job which builds OBB files does not ship with the Lumberyard installer\. [Download the Android\_MakeObb job file](https://d3bqhfbip4ze4a.cloudfront.net/RCJob_Generic_Android_MakeObb.xml) and place it in the `lumberyard_install_dir/dev/Code/Tools/RC/Config/rc` directory before continuing\.   
 The `MakeObb` job uses the old Lumberyard asset management system, where the project\-specific resources you include and exclude from the OBB expansions are defined as part of the job\. 

 The Google Play Store has limitations on how applications can be distributed\. Android application packages \(APKs\) are limited to 100MB in size\. To ship larger applications, you should use either [dynamic content delivery](cloud-canvas-cloud-gem-dc-manager.md) or Android expansion files\. The Lumberyard engine has support for downloading, checking, and extracting expansion files \- all you have to do is create them\. Google Play allows for uploading two separate OBB files, `main` and `patch`, which have a size limit of 2\.0Gb each\. 

 How you package your application is an important part of releasing to the Google Play Store\. Before continuing in this section, we recommend that you read the [Android Developer documentation for APK expansions](https://developer.android.com/google/play/expansion-files)\. 

**Note**  
 It's important to remember that these restrictions apply **only** to the Google Play Store\. If you're shipping your application to another Android storefront or service that will install it, read the appropriate documentation and understand your distribution channel's requirements\. 

 If you've decided that APK expansions are the right way to distribute your application, follow these steps to configure your project to build OBBs and modify the engine code so that your project will prefer to load loose files extracted from the OBB over searching for assets within pak files\. 

1. In Windows Command Prompt or Windows Explorer, navigate to the `lumberyard_install_dir\dev\Code\Tools\RC\Config\rc` folder\.

1. Copy the file `RCJob_Generic_Android_MakeObb.xml` to a new file named `RCJob_project-name_Android_MakeObb.xml`\.

1. Open the file `lumberyard_install_dir\dev\project-name\project.json` in a text editor\.

1. Make the following edits to the file\.

   1. If you haven't, set the value of `app_obfuscator_salt` to a random Base64 string\.

   1. To enable building main OBB files, set `use_main_obb` to `"true"`\.

   1. To enable building patch OBB files, set `use_patch_obb` to `"true"`\.

   1. Set the value of `rc_obb_job` to `RCJob_project-name_Android_MakeObb.xml`\.

   ```
   {
       ...
       "android_settings": {
           "package_name"  : "com.examples.project-name",
           "version_number": 1,
           "version_name"  : "1.0.0",
           "orientation"   : "landscape",
           "app_obfuscator_salt" : "MY_OBFUSCATOR_SALT_BASE_64",
           "use_main_obb" : "(true | false)",
           "use_patch_obb" : "(true | false)",
           "rc_obb_job" : "RCJob_project-name_Android_MakeObb.xml"
       }
   }
   ```

1. Save and close `project.json`\.

1. Open the file `lumberyard_install_dir\dev\Code\Tools\RC\Config\rc\RCJob_project-name_Android_MakeObb.xml` in a text editor\.

1. Edit the file to create the OBBs that you wish to build\.
   +  **If building only a main OBB:** Edit the values of `<Properties>` to properly reference the files that you wish to include and exclude from the main OBB\. The default settings include everything in the cache and exclude everything which is pulled into the main APK to launch the engine\. 
   + **If building only a patch OBB:**

     1.  Edit the `zip` attribute on the `PakAssets` and `PakUnpackedAssets` jobs to change references from `${obb_pak}` to `${obb_patch_pak}`\. 

        ```
        <PakAssets>
            <Job sourceroot="${src_game}" input="${assets_files}" zip="${obb_patch_pak}" exclude="${assets_files_excludes}" />
        </PakAssets>
        
        <PakUnpackedAssets>
            <Job sourceroot="${tmp_folder}" input="*.*" zip="${obb_patch_pak}" exclude="" />
        </PakUnpackedAssets>
        ```

     1.  Edit the values of `<Properties>` to properly reference the files that you wish to include and exclude from the patch OBB\. The default settings include everything in the cache and exclude everything which is pulled into the main APK to launch the engine\. 
   + **If building both patch and main OBBs:**

     1.  Copy the existing `PakAssets` job to a new job, `PakPatchAssets`\. Change the values of this new job's attributes as follows\. 
        + Change the `input` value to `${patch_files}`\.
        + Change the `zip` value to `${obb_patch_pak}`\.
        + Change the `exclude` value to `${patch_files_excludes}`\.

        ```
        <PakPatchAssets>
            <Job sourceroot="${src_game}" input="${patch_files}" zip="${obb_patch_pak}" exclude="${patch_files_excludes}" />
        </PakPatchAssets>
        ```

     1. Add the following new attributes to `<Properties>`\.
        +  `patch_files` – The files to include in the patch OBB\. This **shouldn't** include any files from the APK and should only include files from the main OBB that are being patched\. If you're only patching files in your APK, upload a new version to the Google Play Store and require users to update the main distributable instead\. 

           This value is formatted as a semicolon \(`;`\)\-separated list of file paths relative to the asset cache\. Globbing is supported\. 
        +  `patch_files_excludes` – Everything in the cache you wish to exclude from the patch OBB\. Unless explicitly including assets from the APK or the main OBB in your patch, this value should include the string `${assets_files};${assets_files_excludes}`\. 

           This value is formatted as a semicolon \(`;`\)\-separated list of file paths relative to the asset cache\. Globbing is supported\. 
**Tip**  
 To maintain the default `assets_files_excludes` list, we suggest renaming it to `engine_files_excludes` and including this property as part of both your `patch_files_excludes` and `assets_files_excludes`\. 

        ```
        <!-- Some properties omitted for brevity --> 
        <Properties                
            assets_files="main-obb-assets"
            patch_files="patch-obb-assets"
                                            
            engine_files_excludes="*cmakelists.*;editor\*.*;${levels_pak_excludes};${game_data_pak_excludes};${engine_pak_types};${engine_pak_excludes};${gems_pak_types};${gems_pak_excludes};${pak_files};${pak_files_excludes};${basic_types}"
            assets_files_excludes="assets-not-in-main-obb;${engine_files_excludes}"
            patch_files_excludes="assets-not-in-patch-obb;${engine_files_excludes}"
        />
        ```

 The job to create the APK expansion files is only run when building for the **release** profile\. You can always run **debug** or **profile** builds without creating new OBBs\. 

## Release process<a name="android-release-process"></a>

 Now that you've set up your signing key and configured either for dynamic content delivery or set up your OBBs containing assets, it's time to build your release\! 

1.  Run `lmbr_waf configure` to regenerate your Android Studio project\. This action updates your project's Android configuration information to indicate that it's building a release for public deployment to a store\. You're required to include the `--distro-key-pass` and `--distro-store-pass` arguments, now that your project is in Distribution mode\. 

   ```
   lmbr_waf configure --distro-key-pass=key-password --distro-store-pass=store-password
   ```
**Important**  
 You can safely ignore the following warning during configuration for Distribution mode\. Your project will still be configured to use the appropriate keystores and take required actions to generate a valid APK for upload to the Google Play Store\.   

   ```
   [WARN] The Distribution build environment is not currently supported in Android Studio, falling back to the Development build environment.
   ```

    If you made any manual changes to your imported Android Studio project, review them to make sure that the project regeneration didn't change anything important for your release\. 

1. Disable any remote connections to the Shader Compiler and Asset Processor used in development\.

   1. Open the file `lumberyard_install_dir\dev\system_android_es3.cfg` in a text editor\.

   1. Change the value of `r_AssetProcessorShaderCompiler` to **0**\.

      ```
      r_AssetProcessorShaderCompiler=0
      ```

   1. Open the file `lumberyard_install_dir\dev\bootstrap.cfg` in a text editor\.

   1. Change the value of `remote_filesystem` to **0**\.

      ```
      remote_filesystem=0
      ```

   1. Change the value of `connect_to_remote` to **0**\.

      ```
      connect_to_remote=0
      ```

   1. Save and close the file\.

1.  Make sure that the Shader Compiler is running\. Either check that it's available at the remote endpoint specified in `lumberyard_install_dir\dev\system_android_es3.cfg` as the value of `r_ShaderCompilerServer`, or start the Shader Compiler locally by launching it from `lumberyard_install_dir\Tools\CrySCompileServer\x64\profile\CrySCompileServer.exe`\. 

1.  With everything configured, it's time to build your release\. Build with `lmbr_waf` and supply your distribution key information on the command line\. 

   ```
   lmbr_waf build_android_armv8_clang_release ^
           --distro-store-pass=distribution-keystore-password ^
           --distro-key-pass=distribution-key-password ^
           -p game_and_engine
   ```

 Now your APK and any configured OBBs are ready for testing and upload to the Google Play Store\! Your build products are located in the following places\. 
+ **OBB files:** Located in `lumberyard_install_dir\dev`
+ **APK:** `lumberyard_install_dir\dev\BinAndroidArmv8Clang.Release\project-nameLauncher_w_assets.apk`

 If you inspect the contents of the APK, you'll see that the only assets included are those needed for configuration and launching of the engine\. 