# Building Shaders for macOS Games<a name="osx-shaders-building"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Lumberyard uses a versatile shader system to achieve high quality, realistic graphics\. Because the shader compilation pipeline depends on the Windows\-specific HLSL optimizer, you must connect to a shader compiler on your PC when running a game on macOS during development\. This compiles the subset of shaders required by your game, on demand\.

**Note**  
You must connect your PC and macOS computer to the same network and configure any firewalls to allow traffic through port 61453\.

When a new shader is compiled, the game waits for the binary shader permutation to compile on your PC and be sent back to your macOS computer\. Once this occurs, the shader is cached locally\. When you are ready to release your game, you must pack up and include all cached binary shaders\.

You can use an allow list to specify the IP addresses that are allowed to connect to your remote shader compiler\. For information, see [Creating an allow list for the Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md#mat-shaders-custom-dev-remote-compiler-allow)\.

**To build the shader compiler \(if not already done\)**

1. On your PC, in a command line window, navigate to the `lumberyard_version\dev` directory\.

1. Enter the build command for your version of Visual Studio: 

   ```
   lmbr_waf build_win_x64_vs2017_profile -p all --targets=CrySCompileServer
   ```

**To run the shader compiler on your PC**

1. Navigate to the `lumberyard_version\dev` directory\.

1. Edit the `system_osx_osx_gx.cfg` file to set the **localhost** for `r_ShaderCompilerServer` to the IP address of the PC on which you will run the shader compiler\.

1. Launch Asset Processor if it is not still running\.

1. Verify that you are sharing the `cache` folder between your PC and Mac by checking the corresponding cache file \(located in the `lumberyard_version\dev\cache\SamplesProject\ios\system_osx_osx_gx.cfg` directory\)\.