# iOS Debugging and Troubleshooting<a name="ios-debugging-troubleshooting"></a>

Lumberyard provides full access to the source code, which allows you to debug your iOS application using Xcode without additional Lumberyard\-specific steps to follow\. For information about debugging and profiling your iOS application, see [Debugging](https://developer.apple.com/support/debugging/) in the official Apple developer documentation\.

**Unable to see activity in the shader compiler window**  
You must connect to the shader compiler on your PC in order to compile the subset of shaders required by your game, on demand\. To verify that your app has connected correctly and obtained all shaders, you can view the output in the shader compiler window\. If you still do not see any activity in the window, please check your setup by following the instructions on the [Run the Remote Shader Compiler](ios-game-building.md#ios-run-the-remote-shader-compiler) page\.

**Assets appear out of date on iOS devices**  
When you make and save changes to your project in Lumberyard Editor, these changes are automatically reflected on your iOS device the next time you deploy\. Ensure you have set up your `cache` folder to share between your PC and Mac\. If you encounter Xcode errors when deploying to your iOS devices or your assets appear out of date on the iOS devices, you can try cleaning your product from Xcode \(click **Product**, **Clean**\), which clears the `.app` package built to `BinIos` or `BinIos.Debug` \(debug builds\) in the directory where you installed Lumberyard\.

Cleaning the project does not create a full rebuild of the iOS application

Lumberyard uses a custom build step to generate the final executable and temporary C\+\+ object files, which output to the `\BinTemp\ios_debug` or `\BinTemp\ios_profile` directory where you installed Lumberyard\. Unlike a regular Xcode project, in order to create a full rebuild of the iOS application, you must manually delete the contents of the output folder or run one of the following Waf commands from a Terminal window: 
+ To build debug, run the following command: `lmbr_waf.sh clean_ios_debug`
+ To build profile, run the following command: `lmbr_waf.sh clean_ios_profile`
+ To build release, run the following command: `lmbr_waf.sh clean_ios_release`

**Observed frame rate varies greatly**  
While running your iOS application, the observable frame rate can vary depending on the build \(debug or profile\) you are running, whether you are connected to the Xcode debugger, and whether Metal API validation is enabled\. To display the frame rate in the upper right corner of the screen, set the `r_DisplayInfo` configuration variable to **1** or higher\. When your Xcode project is generated, the default build scheme is set up for debugging\. If you want to test or profile your application's speed, we recommend that you [edit your active scheme](https://help.apple.com/xcode/mac/current/#/devcc15e6912) to run a profile build\. Deselect **Debug executable** and disable **Metal API Validation**\. Additionally, set the target resolution using the `r_WidthAndHeightAsFractionOfScreenSize` console variable or the `r_width` and `r_height` console variables in the `system_ios_ios.cfg` file\. The default value is 1; however, you can lower the target render resolution to help improve performance\. If the target render resolution is lower than the default \(native device resolution\), Lumberyard uses an anti\-aliasing algorithm to help maintain the same level of visual quality as the native resolution\.