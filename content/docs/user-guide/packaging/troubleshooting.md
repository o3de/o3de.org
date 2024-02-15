---
linktitle: Troubleshooting
title: Troubleshooting Packaging in O3DE
description: Tips, tricks, and advice for troubleshooting issues with packaging Open 3D Engine (O3DE) projects.
weight: 500
---

This guide can help you troubleshoot and resolve some common issues that you might encounter when packaging your **Open 3D Engine (O3DE)** projects. 

Be aware that you might come across situations unique to your project that aren't addressed here. If you don't find your problem covered here, try searching [our forums](https://github.com/o3de/o3de/discussions) or asking in the [O3DE Discord](https://{{< links/o3de-discord >}}).

If you believe your packaging problem is due to a bug in O3DE, check [existing bug reports](https://github.com/o3de/o3de/issues) and [file an issue](https://github.com/o3de/o3de/issues/new/choose) if you can!

Looking for error logs or memory dumps? Refer to [Open 3D Engine Log Files](/docs/user-guide/appendix/log-files) for locations.


## Troubleshooting techniques

The following are techniques you can use to help you debug any issues that you may encounter while building a project for release.


### Compile with optimizations disabled and debug symbols enabled

In Visual Studio, you can compile with optimizations disabled and debug symbols enabled by configuring with the CMake variable `O3DE_BUILD_WITH_DEBUG_SYMBOLS_RELEASE` set to `ON`. This lets Visual Studio's debugging tools produce more helpful information that can help you debug.


### Create a `profile` build

To debug a non-monolithic or monolithic build and its `.pak` files, you can build with the `profile` configuration. The `profile` configuration creates log files that provide information to help you debug. For information on O3DE log files, refer to [Open 3D Engine Log Files](/docs/user-guide/appendix/log-files).

Use CMake to invoke Visual Studio to build your project with the `profile` configuration.

```cmd
cd C:\MyProject
cmake --build <build> --target INSTALL --config profile
```

Replace `<build>` with either of the following:
- `build\windows` -- For non-monolithic builds. 
- `build\windows_mono` -- For monolithic builds.