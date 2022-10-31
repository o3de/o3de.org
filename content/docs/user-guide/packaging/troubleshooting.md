---
linktitle: Troubleshooting
title: Troubleshooting Packaging in O3DE
description: Tips, tricks, and advice for troubleshooting issues with packaging Open 3D Engine (O3DE) projects.
weight: 1000
---

This guide can help you troubleshoot and resolve some common issues that you might encounter when packaging your **Open 3D Engine (O3DE)** projects. 

Be aware that you might come across situations unique to your project that aren't addressed here. If you don't find your problem covered here, try searching [our forums](https://github.com/o3de/o3de/discussions) or asking in the [O3DE Discord](https://{{< links/o3de-discord >}}).

If you believe your packaging problem is due to a bug in O3DE, check [existing bug reports](https://github.com/o3de/o3de/issues) and [file an issue](https://github.com/o3de/o3de/issues/new/choose) if you can!

Looking for error logs or memory dumps? Refer to [Open 3D Engine Log Files](/docs/user-guide/appendix/log-files) for locations.


## Troubleshooting techniques

The following are techniques you can use to help you debug any issues that you may encounter while building a project for release.


### Compile with optimizations disabled and debug symbols enabled

In Visual Studio, you can compile with optimizations disabled and debug symbols enabled. This lets Visual Studio's debugging tools produce more helpful information that can help you debug.

Make the following modifications to the `Configurations_msvc.cmake` file in the `<engine>\cmake\Platform\Common\MSVC` directory. In `ly_append_configurations_options`, under `COMPILATION _RELEASE`:
 - Change `/Od` to `/Ox`.
 - Add `/Zi`.

After making those modifications, `ly_append_configurations_options` should look like this:

```
ly_append_configurations_options(

    # ...

    COMPILATION_RELEASE
        /Od             # Enable debug symbols
        /Ob2            # Inline any suitable function
        /Ot             # Favor fast code over small code
        /Oi             # Use Intrinsic Functions
        /Oy             # Omit the frame pointer
        /Zi             # Generate debugging information (no Edit/Continue)
    
    # ... 
```

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