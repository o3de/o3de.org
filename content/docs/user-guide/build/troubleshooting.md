---
title: Troubleshooting
description: Tips, tricks, and advice for fixing failing O3DE builds.
draft: true
weight: 400
---

This guide will help you identify, and resolve, some common issues that users encounter with the O3DE build system.
You might encounter situations unique to your project or build - this reference is only for the most frequent build
issues which aren't affected by a bug in the build system. For unique situations you might have more luck searching
our [forums](TBD), asking in the [O3DE discord](TBD), or searching the [O3DE tag on StackOverflow](TBD).

If you believe your build problem is due to a bug in O3DE, [file an issue](TBD).

## `C2027` Errors on Generated Files

**Issue:** If you run out of disk space during a build, there may be empty files generated during the build, most often seen
for Qt. These files may be left behind even after a clean, affecting future builds.

**Remedy:** Delete all folders containing `_autogen` in your build directory.

## CMake Searching for Wrong MSVC During Configure

**Issue:** The CMake tools report a missing MSVC compiler which is known to be from an earlier
version of Visual Studio during project generation. This produces a warning similar to the following:

```cmd
CMake Error at CMakeLists.txt:15 (project):
  The CMAKE_C_COMPILER:
 
    C:/Program Files (x86)/Microsoft Visual Studio/2019/Professional/VC/Tools/MSVC/14.24.28314/bin/Hostx64/x64/cl.exe
 
  is not a full path to an existing compiler tool.
```

**Remedy:** The path of the C and C++ compiler is set at configure-time by the CMake system, using the `CMAKE_C_COMPILER`
and `CMAKE_CXX_COMPILER` values. These values are stored in the CMake cache, and you can clean the cache by:

* Removing the `CMakeCache.txt` file in your CMake build directory.
* Removing the CMake build directory completely.

After cleaning the cache, the correct compiler should be detected during the CMake configuration stage.

## 3rdParty Directory Detection Fails

**Issue:** During configuration, the 3rd party directory isn't correctly detected and the CMake configure task reports
an error similar to the following:

```cmd
cmake -B windows_vs2019 -S . -G "Visual Studio 16 2019" -DLY_3RDPARTY_PATH="C:\o3de\3rdParty\" -DLY_PROJECTS="%LY_GAME_PROJECTS%"
-- Selecting Windows SDK version 10.0.18362.0 to target Windows 10.0.17763.
-- Using Windows target SDK 10.0.18362.0
CMake Error at cmake/3rdParty.cmake:19 (file):
  file FILE([TO_CMAKE_PATH|TO_NATIVE_PATH] path result) must be called with
  exactly three arguments.
Call Stack (most recent call first):
  CMakeLists.txt:43 (include)CMake Error at cmake/3rdParty.cmake:21 (if):
  if given arguments:    "NOT" "EXISTS" "C:/LY/3rdParty\"  Unknown arguments specified
Call Stack (most recent call first):
  CMakeLists.txt:43 (include)-- Configuring incomplete, errors occurred!
```

**Remedy:** This issue is caused when the `LY_3RDPARTY_PATH` value passed to CMake ends in a `\` character. Remove it.
