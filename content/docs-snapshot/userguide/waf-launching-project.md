# Launching the Game Project<a name="waf-launching-project"></a>

Building your game project produces an `.exe` file in Lumberyard's file system\.

To launch your project, open the executable file\. The directory and file name are named according to the following conventions:

**`/dev/Bin64compiler.build mode/executable name.exe`**

Where:
+ `compiler`
  + `vc141` – Visual Studio 2017\.
  + `vc142` – Visual Studio 2019\.
+ [ `build mode`](game-build-intro.md)
  + `Debug` – Built in debug mode\.
  + \(None\) – Built in profile mode\.
  + `Performance` – Built in performance mode\.
  + `Release` – Built in release mode\.
+ `executable name` – The `executable_name` specified in your [`project.json`](waf-files-projects-file.md) file\. The file name typically mirrors the project name\.

For example, if your project was configured with the following:
+ Compiler: Visual Studio 2017
+ Build mode: `debug`
+ Executable name: `SampleProjectLauncher`

Then your directory and file name would be the following:
+ `lumberyard_version/dev/Bin64vc141.Debug/SampleProjectLauncher.exe`