# PAK Files<a name="pak-files-for-android"></a>

PAK files are zip files\. You can inspect them with tools like 7Zip or WinRAR\. Your Lumberyard apps use PAK files for assets and shaders in any build but are required for a release APK\. While the build system generates the PAK files for you, you can also manually do this step\.

**Topics**
+ [Packing Shaders](#packing-shaders-for-android)
+ [Packing Assets](#packing-assets-for-android)
+ [Running Your Own Project](#running-your-own-android-project)

## Packing Shaders<a name="packing-shaders-for-android"></a>

The Lumberyard build system takes care of packing shaders for your app\. The following is an overview of what happens in the backend in case developers want to make changes\. 

Before shaders can be packed into your APK, the Remote Shader Compiler must generate them so the build tools can extract them\. 

**To pack shaders**

1. Run your application in profile, or debug mode, and ensure that you view every surface on every level\. Lumberyard supports both OpenGL ES 3\.0 and OpenGL ES 3\.1 and generates shaders on the latest version that a given device can support\. 

   If you run your game on two devices, one device can support only OpenGL ES 3\.0 and the other can support OpenGL ES 3\.1\.

1. After the run completes, and your devices are still connected, enter the following from the command line in your `lumberyard_version/dev` directory\.   
**Example PC**  

   ```
   BuildShaderPak_ES3.bat SamplesProject
   ```  
**Example macOS**  

   ```
   sh BuildShaderPak_ES3.sh SamplesProject
   ```

When the batch file finishes building the shader PAK file for your game project, the following files appear in the `lumberyard_version/dev/Build/es3/Game_Project_Name/` directory\.
+ `ShaderCache.pak` – Contains all compiled shaders that are only used when the shader can't be found in the current level's shader cache\.
+ `ShaderCacheStartup.pak` – Contains a subset of compiled shaders used to accelerate the startup time of the engine\.

## Packing Assets<a name="packing-assets-for-android"></a>

To pack assets for your apps, copy and edit the example scripts that come with Lumberyard\. 

**To pack assets**

1. Navigate to the `lumberyard_version/dev` directory\.

1. Copy the `BuildGame_Project_Paks_PC.bat` file and rename it, such as `BuildSamplesProject_Paks_ES3.bat`\.

1. In a text editor, for line 20, specify the game project and platform\.

   ```
   .\%BINFOLDER%\AssetProcessorBatch.exe /gamefolder=SamplesProject /platforms=es3
   ```

1. For line 25, make the following changes\.

   ```
   .\%BINFOLDER%\rc\rc.exe /job=%BINFOLDER%\rc\RCJob_Generic_MakePaks.xml /p=es3 /game=samplesproject
   ```
**Note**  
For `/p`, specify `es3` for Android\. If you're building a game project other than SamplesProject, change the `game` parameter\.

1. Save the file\.

1. After you make the changes, run the script and wait for it to finish building the PAK files\.

## Running Your Own Project<a name="running-your-own-android-project"></a>

If you create your own project, you must do the following\.
+ To ensure that you export every level, open them in Lumberyard Editor and press **Ctrl\+E**\. 
+ To set your startup level, edit or create a file named `autoexec.cfg` in the root of your game project directory\. For example, see `lumberyard_version/dev/SamplesProject/autoexec.cfg`\.
+ In a text editor, open the `autoexec.cfg` file, type in `map` followed by the name of the first level to load\.   
**Example**  

  ```
  map Camera_Sample
  ```