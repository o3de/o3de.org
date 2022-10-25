---
title: "O3DE Visual Studio 2022 Support!"
date: 2022-11-09
slug: o3de-vs2022-initial-support
author: lumberyard-employee-dm
blog_img: "/images/blog/announcement_thumbnail.jpg"
full_img: ""
---
With the 22.10.0 release of the **Open 3D Engine(O3DE)** Visual Studio 2022(VS2022) is now fully supported within the O3DE.

## Background

When we say that **O3DE** "fully supports" Visual Studio 2022, we are referring to building O3DE projects using Visual Studio 2022 [v143 toolset](https://learn.microsoft.com/en-us/cpp/build/how-to-modify-the-target-framework-and-platform-toolset?view=msvc-170#platform-toolset).  
![Visual Studio 2022 v143 toolset](/images/blog/vs2022/vs2022-installer-v143-toolset.png)

Because O3DE uses [CMake](https://www.o3de.org/docs/user-guide/build/configure-and-build/) as its build system generator, it has been possible since the release of [CMake 3.21](https://cmake.org/cmake/help/v3.21/release/3.21.html#generators) to configure and *attempt* to build using the Visual Studio 2022.  By *attempt*, we mean that building O3DE using Visual Studio 2022 could occur, but would have most likely failed due to stricter compiler warnings which were triggering using the newer v143 toolset.  
The backend build server infrastructure for validating new commits to O3DE via the Automated Review(AR) pipeline wasn't setup to build against the v143 toolset.  
Before the 22.10.0 release, continuous integration builds on Windows only installed the Visual Studio 2019(VS2019) Build Tools. The [v142 toolset](https://learn.microsoft.com/en-us/cpp/build/how-to-modify-the-target-framework-and-platform-toolset?view=msvc-170#platform-toolset) was the only Microsoft Visual C++(MSVC) toolset validated at the time and therefore build breakages of O3DE building against the Visual Studio 2022 v143 toolset were common and took days to discover.

## What's new

### Build Server Updates
Between the time of the 22.05.0(May 2022) release the 22.10.0(October 2022) release the Jenkins build servers have been updated with Visual Studio 2022 17.3 Build Tools and the latest v143 toolset. 
Furthermore all O3DE build warnings and errors using the the v143 toolset were fixed and future VS2022 compile failures are protected against via the Automated Review pipeline validating each Pull Request that goes into O3DE repo [development](https://github.com/o3de/o3de) branch.  


### Project Manager Updates
The 22.10.0 release also included a feature update to the [Project Manager](https://www.o3de.org/docs/user-guide/project-config/project-manager/#projects) application. The requirement building against the Visual Studio 2019 application has been removed.  
The Project Manager application will use the build toolset of latest version of Visual Studio installed on the user's machine for configuring and building O3DE Projects.  If the user only has Visual Studio 2019 installed with the v142 toolset, that will be used for compiling O3DE. If the user only has Visual Studio 2022 installed with the v143 toolset that will be used for compilation. Finally if the user has both Visual Studio 2019 and 2022 installed then Visual Studio 2022 v143 toolset will be used.
![Project Manager Project Options](/images/blog/vs2022/project-manager-build-options.png)
![Project Manager Building](/images/blog/vs2022/project-manager-building.png)


## VS2022 vs VS2019 O3DE differences

The are several differences to using Visual Studio 2022 to build O3DE versus Visual Studio 2019.  

### VS2022(v143) uses more memory than VS2019(v142)

The most notable is that Visual Studio 2022 uses more memory when compiling O3DE than Visual Studio 2019.  

{{< note >}} If the Windows OS becomes unresponsive or build times start to expand to over several hours, this is indication that build is memory limited and users should check how much RAM they have available when building.
A good way to mitigate build memory issues with the build using Visual Studio 2022 is to adjust the compilation parameters for compiling multiple projects in parallel(`/m:<N>` or `/maxcpucount:<N>`) and multiple cl.exe processes per project(`/p:CL_MPCount=<N>`).
{{< /note >}}  

When building from the command line on a machine with 64 logical cores and 64 GiB of ram, the parameters of `/maxcpucount` and `/p:CL_MPCount` can be supplied to CMake build wrapper command(`cmake --build`) to control the number of cl.exe processes that get launched.
The following command restricts msbuild to build no more than 8 Visual Studio C++ Projects(.vcxproj) in parallel at a given time and no more than 16 `cl.exe` process per .vcxproj at once.
```
cmake --build build/windows --target Editor --config profile -- /maxcpucount:8 /p:CL_MPCount=16
```

The equivalent options in the Visual Studio 2022 IDE can be set via following IDE options
* Setting the maximum number of parallel project builds value in the `Tools -> Options -> Projects and Solutions -> Build and Run` menu.  
![Build and Run](/images/blog/vs2022/vs2022-parallel-project-builds-8.png)
* Setting the maximum concurrent C++ compilations option in the `Tools -> Options -> Projects and Solutions -> VC++ Project Settings` menu.  
![VC++ Project Settings](/images/blog/vs2022/vs2022-concurrent-compiliations-16.png)

This can to help alliviate any memory pressure that is caused by building the O3DE.

### VS2022(v143) is stricter at triggering warnings than VS2019(v142)
The second notable differences is that Visual Studio 2022 is better at triggering compiler warnings than VS2019.  
So occasionally code that would compile successfully in VS2019, may fail with a compiler warning in VS2022.  
The triggered warnings are generally around [unsigned/signed](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-3-c4018?view=msvc-170) comparison mismatches and [usused variables](https://learn.microsoft.com/en-us/cpp/error-messages/compiler-warnings/compiler-warning-level-4-c4189?view=msvc-170).



## Useful build tips

### Building against the VS2022 v142 toolset using VS2022

One lesser known trick to build against multiple Microsoft build tools toolsets(v143, v142, etc...) without the need to have multiple versions of Visual Studio installed involves specifying the toolset option for Visual Studio on the command line when configuring with CMake.  

First the user should make sure they have the latest `MSVC v142 - VS 2019 C++ x64/x86 build tools` component installed via the Visual Studio Installer.  
![Visual Studio Installer Individual Components](/images/blog/vs2022/vs2022-installer-v142-toolset.png)

Once it is verified that latest `MSVC v142` toolset is installed, the user can configure the toolset using either the CMake GUI or the CMake CLI via the `-T<toolset>` option which is documented on the CMake website as part of the [CMAKE_GENERATOR_TOOLSET](https://cmake.org/cmake/help/v3.23/variable/CMAKE_GENERATOR_TOOLSET.html#visual-studio-toolset-selection) variable documentation.  
To use the the latest v142 toolset which is 14.29 at this time, the following value for the `-T` option should be supplied:
```
-Tv142
```


#### Configuring the CMake Gui to use the v142 toolset using VS 2022

Using the CMake GUI to build against the VS2019 v142 toolset is as simple as specifying v142 to the toolset parameter
![CMake GUI Visual Studio Toolset](/images/blog/vs2022/cmake-gui-14-29-toolset.png)


#### Configure the CMake CLI to use the v142 toolset using VS2022

Building using the v142 toolset using the CLI only involves adding the `-Tv142` option.  
This uses the 19.29 build tools.  
```powershell
PS C:\code\o3de> cmake -B build/windows_vs142_cli -S . -Tv142
-- Building for: Visual Studio 17 2022
-- Selecting Windows SDK version 10.0.19041.0 to target Windows 10.0.19044.
-- The C compiler identification is MSVC 19.29.30146.0
-- The CXX compiler identification is MSVC 19.29.30146.0
```

This is juxaposed against not specifying the `-T` option at all.  
When not specified it uses the latest v143 toolset, which at the time is 19.33.  
```powershell
PS C:\code\o3de> cmake -B build/windows_vs143_cli -S .
-- Building for: Visual Studio 17 2022
-- Selecting Windows SDK version 10.0.19041.0 to target Windows 10.0.19044.
-- The C compiler identification is MSVC 19.33.31630.0
-- The CXX compiler identification is MSVC 19.33.31630.0
```

### Using O3DE CMake Presets (CMake 3.23+)
O3DE provides a [CMakePresets.json](https://github.com/o3de/o3de/blob/main/CMakePresets.json) in the repo root, which leverages the [CMakePresets](https://cmake.org/cmake/help/v3.23/manual/cmake-presets.7.html) feature which is way to shared configuration, build and test settings with other users.  
{{< note >}} This feature requires using CMake 3.23 or above installed on the user's machine {{< /note >}}

The list of available CMake presets for the current host platform can be seen in the CMake GUI or the via the `cmake --list-presets` command
![O3DE CMake Presets](/images/blog/vs2022/cmake-presets-gui.png)
```
C:\code\o3de> cmake --list-presets
Available configure presets:

  "windows-automated-testing"        - Windows + Automated Testing project
  "windows-automated-testing-vs2019" - Windows + Automated Testing project + VS2019
  "android-automated-testing"        - Android + Automated Testing project
  "android-default"                  - Android
  "android-mono-default"             - Android Monolithic with Unity and Ninja
  "android-unity"                    - Android Unity
  "android-no-unity"                 - Android without Unity
  "android-non-monolithic"           - Android Non-Monolithic
  "android-monolithic"               - Android Monolithic
  "android-ninja"                    - Android Ninja
  "android-ninja-unity"              - Android Ninja Unity
  "android-ninja-no-unity"           - Android Ninja without Unity
  "windows-default"                  - Windows
  "windows-mono-default"             - Windows Monolithic with Unity and Visual Studio
  "windows-unity"                    - Windows Unity
  "windows-no-unity"                 - Windows without Unity
  "windows-non-monolithic"           - Windows Non-Monolithic
  "windows-monolithic"               - Windows Monolithic
  "windows-vs"                       - Windows Visual Studio
  "windows-vs-unity"                 - Windows Visual Studio Unity
  "windows-vs-no-unity"              - Windows Visual Studio without Unity
  "windows-vs2019"                   - Windows Visual Studio 2019
  "windows-vs2022"                   - Windows Visual Studio 2022
  "windows-ninja"                    - Windows Ninja
```

Presets are an easy way to configure O3DE for building for a particular platform without the need to specify a myriad of O3DE CMake Cache Variable options(https://www.o3de.org/docs/user-guide/build/reference/) on the command line such as LY_UNITY_BUILD, LY_MONOLITHIC_GAME, etc...

Using a cmake presets is as simple as selecting it from the CMake GUI or specifying it to the --preset option to the cmake CLI. Documentation for the CMake CLI can be found on the CMake website at https://cmake.org/cmake/help/v3.23/manual/cmake.1.html#options.
```
PS C:\code\o3de> cmake --preset windows-default
Preset CMake variables:

  LY_UNITY_BUILD:BOOL="ON"

-- Building for: Visual Studio 17 2022
-- Selecting Windows SDK version 10.0.19041.0 to target Windows 10.0.19044.
-- The C compiler identification is MSVC 19.33.31630.0
-- The CXX compiler identification is MSVC 19.33.31630.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: C:/Program Files/Microsoft Visual Studio/2022/Professional/VC/Tools/MSVC/14.33.31629/bin/Hostx64/x64/cl.exe - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: C:/Program Files/Microsoft Visual Studio/2022/Professional/VC/Tools/MSVC/14.33.31629/bin/Hostx64/x64/cl.exe - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
...
```

Furthermore CMake Presets can be extended on a per user basis by adding to the O3DE root CMakeUsersPresets.json project.  

Here is an example of my `CMakeUserPresets.json` that is located in my local o3de-atom-sampleviewer project directory at `D:/o3de-atom-sampleviewer` and extends the o3de engine preset files located in my local o3de repo at `D:/o3de`

#### `D:/o3de-atom-sampleviewer/CMakeUserPresets.json`
```json
{
    "version": 4,
    "cmakeMinimumRequired": {
        "major": 3,
        "minor": 23,
        "patch": 0
    },
    "include": [
        "D:/o3de/cmake/Platform/Android/CMakePresets.json",
        "D:/o3de/cmake/Platform/iOS/CMakePresets.json",
        "D:/o3de/cmake/Platform/Linux/CMakePresets.json",
        "D:/o3de/cmake/Platform/Mac/CMakePresets.json",
        "D:/o3de/cmake/Platform/Windows/CMakePresets.json"
    ],
    "configurePresets": [
        {
            "name": "windows-atom-sample-viewer",
            "displayName": "Windows + AtomSampleViewer project",
            "description": "Configure Windows with a project-centric for the AtomSampleViewer project",
            "inherits": [
                "windows-default"
            ],
            "cacheVariables": {
                "LY_UNITY_BUILD": {
                    "type": "BOOL",
                    "value": "OFF"
                }
            },
            "condition": {
                "type": "equals",
                "lhs": "${hostSystemName}",
                "rhs": "Windows"
            }
        },
        {
            "name": "windows-atom-sample-viewer-vs2019",
            "displayName": "Windows + AtomSampleViewer project + VS2019",
            "description": "Configure Windows with a project-centric workflow for the AtomSampleViewer project",
            "inherits": [
                "windows-vs2019",
                "windows-atom-sample-viewer"
            ],
            "condition": {
                "type": "equals",
                "lhs": "${hostSystemName}",
                "rhs": "Windows"
            }
        },
         {
            "name": "android-atom-sample-viewer",
            "displayName": "Android + AtomSampleViewer project",
            "description": "Configure Android in engine-centric with LY_PROJECTS set to the AtomSampleViewer project directory",
            "inherits": [
                "android-default"
            ],
            "cacheVariables": {
                "LY_UNITY_BUILD": {
                    "type": "BOOL",
                    "value": "OFF"
                },
                "LY_NDK_DIR": {
                    "type": "FILEPATH",
                    "value": "$env{USERPROFILE}/AppData/Local/Android/Sdk/ndk/25.1.8937393"
                }
            },
            "condition": {
                "type": "equals",
                "lhs": "${hostSystemName}",
                "rhs": "Windows"
            }
        }
    ],
    "buildPresets": [
        {
            "name": "windows-atom-sample-viewer-launchers",
            "displayName": "Windows + AtomSampleViewer project",
            "description": "Builds launcher targets for the AtomSampleViewer project on Windows",
            "configurePreset": "windows-default",
            "inherits": [
                "profile"
            ],
            "targets": [
                "AtomSampleViewer.GameLauncher",
                "AtomSampleViewer.ServerLauncher"
            ],
            "condition": {
                "type": "equals",
                "lhs": "${hostSystemName}",
                "rhs": "Windows"
            }
        }
    ]
}
```

I use this preset file to configure the "Atom Sample Viewer" project in a project-centric workflow against the latest version of Visual Studio by only specifying the preset nameto the CMake CLI as follows.  
```powershell
PS D:\o3de-atom-sampleviewer> cmake --build windows-atom-sample-viewer
```
