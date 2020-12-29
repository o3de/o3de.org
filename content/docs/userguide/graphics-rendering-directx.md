# Building DirectX 12 Supported Applications<a name="graphics-rendering-directx"></a>

Lumberyard includes a preview of DirectX 12, which provides the framework for you to build DirectX 12 supported applications and develop features\. DirectX 12 provides the following benefits for developing applications:
+ Slightly faster overall GPU performance on NVIDIA cards\.
+ Slight increase in frame rate for scenes that are GPU\-bound\.
+ Supported features from DirectX 12 and DirectX 11\.3 that include the following:
  + Rasterizer\-ordered view with order independent transparency\.
  + Tiled resources that allow you to develop textures virtually that you can then use on terrain\.
  + Optimized texture streaming\.
  + Conservative rasterization helps you develop and optimize ray tracing or voxel rendering, which you can use to develop certain rendering techniques such as global illumination \(GI\)\.

Based on your scene, you may discover faster or slower performance across DirectX 11 and DirectX 12\. For example, if you enable DirectX 12 you may see a slight performance degradation with CPU\-bound scenes\. Scenes with high draw calls may also see slower performance depending on the size of the scene and view distance\.

**To enable DirectX 12 rendering in Lumberyard**

1. On Windows 10, install the latest [Windows 10 SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)\.
**Note**  
Copy the Windows 10 SDK version\. In Windows, you can find this value in **Programs and Features**\.

1. In a text editor, open the `system_windows_pc.cfg` file and add the following parameter:

   ```
   r_Driver = DX12
   ```

1. Configure your Lumberyard project by doing one of the following:
   + With a text editor, open the `user_settings.options` file in the `lumberyard_version\dev\_WAF_` directory and edit the following parameters, removing any leading semicolons to uncomment the line:
     + Under the `[Build Options]` section, set `win_build_renderer` to **DX12**\.
     + Under the `[Windows Options]` section, set `win_vs2017_winkit` to your version of the Windows 10 SDK \(for example, **10\.1\.17134\.12**\)\.

     Navigate to the `lumberyard_version\dev` directory and, in a command line window, enter the following:

     ```
     lmbr_waf configure
     ```
   + Or, with a command line window, navigate to the `lumberyard_version\dev` directory and enter the following: 

     ```
     lmbr_waf configure --win-build-renderer=DX12 --win-vs2017-winkit=10.1.17134.12
     ```

1. In a command line window, build your project with the following command:

   ```
   lmbr_waf build_win_x64_vs2017_profile -p game_and_engine
   ```

1. Start your game with the launcher\. You can verify that your game has enabled DX12 in the top\-right of the viewport\.  
![\[You can find the DirectX 12 setting in information level on the top-right of the game.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/starter-game-example-directx-12.png)
**Note**  
If the DirectX version doesn't appear in the viewport, verify that the `r_DisplayInfo` console variable is set to `1` or `2`\. For more information, see [Using the Console Window](console-intro.md)\.
Currently, Lumberyard Editor does not support DirectX 12\. If you open the game in the editor, the editor defaults to DirectX 11\. 

For more information about DirectX 12, see [Taking Advantage of DirectX 11\.2 Tiled Resources](https://developer.nvidia.com/content/taking-advantage-directx112-tiled-resources) and [Don't Be Conservative with Conservative Rasterization](https://developer.nvidia.com/content/dont-be-conservative-conservative-rasterization)\.