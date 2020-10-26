# Shader Cache and Generation<a name="mat-shaders-custom-dev-cache-intro"></a>

This section discusses the shader cache and how to generate shader cache `.pak` files\.

## Shader Cache<a name="mat-shaders-custom-dev-cache"></a>

The shader cache stores a collection of parsed and precompiled shaders\. Since the shader code is written with multiple definitions, Lumberyard can generate an enormous number of different shaders\. Compiling shaders on demand at run time is only possible on the PC\. On\-demand shader compiling can cause freezes during the game play and uses extra memory\. To reduce this overhead, all required shader combinations for a game are parsed, compiled, and stored in the shader cache\.

The shader cache generally refers to the following files:
+ `Shaders.pak` – Contains the shader source files, which is everything inside the `lumberyard_version\dev\Engine\Shaders\` directory, excluding `EngineAssets`\. 
**Note**  
The actual shader source code \(`*.cfi` and `*.cfx`\) can be removed from this file for the final released version, and is not required anymore when the binary shaders are valid and available\.
+ `ShadersBin.pak` – Contains the binary\-parsed shader information of the shader source code\.
+ `ShaderCache.pak` – Contains compiled shaders for all possible combinations that have been submitted to the remote shader compiler\. 
+ `ShaderCacheStartup.pak` – Contains a small subset of the shader cache that is used during game start\. This file is loaded into memory for quicker start times, but is not required\. This cache is often used to hold the minimum required set of shaders to show a loading screen so that the rest of the loading can occur\.

## ShaderCache\.pak File Generation<a name="mat-shaders-custom-dev-cache-generation"></a>

Creating a `ShaderCache.pak` file consists of running the `lmbr_pak_shaders.bat` batch script, which in turn runs `ShaderCacheGen.exe` to ensure the local cache directory contains all the shaders that are listed in the `ShaderList.txt` file\. The `lmbr_pak_shaders.bat` script packs the contents of the cache directory, creates a `ShaderCache.zip` file, and then renames the file to `ShaderCache.pak`\.

You can find the `ShaderList_platform.txt` file either from the remote shader compiler server or from the Lumberyard Editor directory\. This file contains the list of all shaders which `ShaderCacheGen.exe` uses to produce the shader combinations for your game\.

When running Lumberyard Editor, individual shaders are created as you view them\. As such, you do not strictly need a remote shader compiler server to test game release mode or test shader pack generation\. You just need access to the `ShaderList_platform.txt` file that is created in the `lumberyard_version\dev\cache\game_name\platform\user\cache\shaders` directory when running Lumberyard Editor\. 

However, only the shaders you have viewed on your local computer while running Lumberyard Editor will be listed in the `ShaderList_platform.txt` file\. For this reason, it is recommended that you use a remote shader compiler server if possible\.

**Note**  
During development time, when you run the game or Lumberyard Editor, and before the shaders are packed into shader cache `.pak` files, loose shader files are created in the following directory: `lumberyard_version\Dev\Cache\your_game\platform\user\cache`

The following sections detail the steps used to generate `ShaderCache.pak` files:

### ShaderCacheGen\.exe<a name="mat-shaders-custom-dev-cache-generation-1"></a>

Lumberyard ships with `ShaderCacheGen.exe`, which is located in the `lumberyard_version\dev\Bin64` directory\. For macOS, the file is located in the `\BinMac64` directory\. `ShaderCacheGen.exe` is a stripped\-down version of the Lumberyard game launcher without the render viewport, and is used to populate the local shader cache directory with all the shaders contained in the `ShaderList.txt` file\.

Running the `ShaderCacheGen.exe` will load the `ShaderCacheGen.cfg` file\. This configuration file includes the IP address and other settings for the remote shader compiler that generates the shaders\. The `ShaderCacheGen.exe` must connect to the remote shader compiler that's specified in the configuration file\. The `ShaderCacheGen.exe` will not use the IP address and other settings that are specified in the system configuration files\.

If you customized Lumberyard in any way, you must build Lumberyard and your game using the `all` profile\. This argument builds both `ShaderCacheGen.exe` \(and ensures that it is up\-to\-date\) and the game `.dll` files that are required\. 

Enter the following command for your version of Visual Studio\.

```
lmbr_waf build_win_x64_vs2017_profile -p all --targets=CrySCompileServer
```

If you don’t want to \(or can't\) build using the `all` profile, you can alternatively just build the `game_and_engine` spec and the `shadercachegen` spec\.

Enter the following command for your version of Visual Studio\.

```
lmbr_waf build_win_x64_vs2017_profile -p game_and_engine
lmbr_waf build_win_x64_vs2017_profile -p shadercachegen
```

### Packing the Shader Cache as Part of the Release Build<a name="packing-shader-cache-as-part-of-release-build"></a>

The `ShaderCache.pak` files are generated for release builds as part of the build process\. To generate the files, the `ShaderCacheGen.exe` must be connected to the Remote Shader Compiler\. This must be the same Remote Shader Compiler that you used to generate the shaders for your game\. As long as this instance of the shader compiler is running, the release build process can generate the necessary `.pak` files for your release build\. If the shader compiler isn't running or reachable for some reason, the release build process fails\. 

### Packing the Shader Cache Using a Batch File<a name="mat-shaders-custom-dev-cache-generation-4"></a>

The `lmbr_pak_shaders.bat` file generates the `ShaderCache.pak` files, which are saved to the `lumberyard_version\dev\build\platform\your_game` directory\. The batch file first calls the `ShaderCacheGen.exe` and then calls `Tools\PakShaders\pak_shaders.py`\.

From a command line, navigate to the `lumberyard_version\dev` directory, and run the `lmbr_pak_shaders.bat`, and specify the location to the `ShaderList_platform.txt` file\. 

**Example**  

```
F:\lumberyard_version\dev\lmbr_pak_shaders.bat game_project_name D3D11 pc C:\shader_compiler_server\ShaderList_DX11.txt
```

Once the shader `.pak` files are created, you can move them as needed\. For example, if you already built a release version of your game, you can place them with the rest of the `.pak` files\.

### Packing the Shader Cache Manually<a name="mat-shaders-custom-dev-cache-generation-manual"></a>

If you want to use more complex build pipelines, you can pack the shader cache manually\. 

**To pack the shader cache manually**

1. Run `ShaderCacheGen.exe` to generate the shader cache so you can pack it later\.

1. Zip all the shaders into a `ShaderCache.zip` file, then rename the file to `ShaderCache.pak`\.

Each platform has different `.pak` files\. See the following directory mapping for the PC platforms:

The PC platform should copy data from the following directory:

```
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\D3D11\
```

into the following destination directory:

```
shaders\cache\D3D11\
```

`ShaderCache.pak` should contain everything from the previously listed subfolders\.

`ShadersBin.pak` should contain only the `*.cfxb` and `*.cfib` files\.

`ShaderCacheStartup.pak` should contain the following files:

```
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\lookupdata.bin -> Shadercache\<platform>\lookupdata.bin
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\CGPShader\FixedPipelineEmu* -> Shadercache\<platform>\CGPShader\FixedPipelineEmu*
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\CGPShader\Scaleform* -> Shadercache\<platform>\CGPShader\Scaleform*
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\CGPShader\Stereo* -> Shadercache\<platform>\CGPShader\Stereo*
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\CGVShader\FixedPipelineEmu* -> Shadercache\<platform>\CGVShader\FixedPipelineEmu*
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\CGVShader\Scaleform* -> Shadercache\<platform>\CGVShader\Scaleform*
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\CGVShader\Stereo* -> Shadercache\<platform>\CGVShader\Stereo*
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\lookupdata.bin -> Shaders\Cache\<platform>\lookupdata.bin
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\Common.cfib -> Shaders\Cache\<platform>\Common.cfib
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\fallback.cfxb -> Shaders\Cache\<platform>\fallback.cfxb
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\fixedpipelineemu.cfxb -> Shaders\Cache\<platform>\fixedpipelineemu.cfxb
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\FXConstantDefs.cfib -> Shaders\Cache\<platform>\FXConstantDefs.cfib
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\FXSamplerDefs.cfib -> Shaders\Cache\<platform>\FXSamplerDefs.cfib
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\FXSetupEnvVars.cfib -> Shaders\Cache\<platform>\FXSetupEnvVars.cfib
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\FXStreamDefs.cfib -> Shaders\Cache\<platform>\FXStreamDefs.cfib
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\scaleform.cfxb -> Shaders\Cache\<platform>\scaleform.cfxb
lumberyard_version\dev\cache\your_game\platform\user\shaders\cache\<platform>\stereo.cfxb -> Shaders\Cache\<platform>\stereo.cfxb
```

### Build Platforms<a name="mat-shaders-custom-dev-cache-generation-platforms"></a>

You can find the build platform subfolders listed in the following table in the `lumberyard_version\dev\Cache\your_game\platform\user\cache\shaders\` directory\.


****  

| Build Platform | Build Platform Subfolder | 
| --- | --- | 
| PC, DirectX 11 | \\D3D11 | 