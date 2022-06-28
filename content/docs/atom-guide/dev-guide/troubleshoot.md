---
linkTitle: Troubleshooting
title: Troubleshooting Atom Renderer
description: Troubleshoot GPU issues in Atom Renderer, the graphics engine integrated into Open 3D Engine (O3DE).
toc: true
weight: 1000
---

This guide can help you identify and handle graphics processing unit (GPU) crashes when running **Atom Renderer**.

A key indicator of your GPU crashing is a "device removal" failure, which occurs when a driver exception leaves the GPU in a non-operational state. You can find this failure in an [O3DE log file](/docs/user-guide/appendix/log-files). If you encounter this crash, follow the instructions on this page to report the issue and try several techniques to debug the problem further.


## Reporting an issue

Before reporting an issue, check for similar [existing issues](https://github.com/o3de/o3de/issues). Otherwise, [create an issue](https://github.com/o3de/o3de/issues/new/choose) and provide the following information:

- Steps to reproduce the crash. Keep the information minimal and specific.
  
- GPU vendor and driver version. For example, NVIDIA, AMD, Intel, Apple, and so on.

- Render Hardware Interface (RHI). For example, Vulkan, Direct3D 12, or Metal.


## Testing alternative GPUs or RHI backends

If your machine has multiple GPUs (for example, multiple discrete GPUs or an integrated GPU) or multiple RHI backends (for example, Vulkan and DirectX), try testing different ones and different combinations of them.

To prioritize the usage of one GPU over another, enter `--forceAdapter=<device>` in the command line interface (CLI). For `<device>` (the device name), you can enter any case-insensitive partial match.

**Example**

```cmd
--forceAdapter="NVIDIA GeForce GTX 1080"
```

To use a non-default RHI backend, enter `--rhi=<rhi>` in the CLI and replace `<rhi>` with `vulkan` or `dx12`. This applies only to Windows computers for which `D3D12` is the default RHI backend.

**Example**

```cmd
--rhi=vulkan
```

{{< note >}}
If you don't know the name of your GPU, you can check the command window output or an [O3DE log file](/docs/user-guide/appendix/log-files). When Atom launches, the RHI prints the names of all the RHI devices to the command window.

For example, this output lists three RHI devices on the machine.

```cmd
Initializing RHI...
    Enumerated physical device: Intel(R) UHD Graphics 630
    Enumerated physical device: NVIDIA GeForce RTX 2070 with Max-Q
Design
    Enumerated physical device: Microsoft Basic Render Driver
```
{{< /note >}}


## Enable driver validation

You can enable validation in your RHI device to output additional debugging information produced at the RHI level. To enable RHI-level validation, enter `--rhi-device-validation=` in the CLI and pass one of the following listed values. For Vulkan, before you enable device validation, be sure that you've installed the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) for your machine.

- `--rhi-device-validation="enable"`: Enables basic driver validation.
- `--rhi-device-validation="verbose"`: Enables basic driver validation and additional reporting.
- `--rhi-device-validation="gpu"`: Enables GPU-based validation (GBV). This validation mode runs slower, but catches issues that the `enable` and `verbose` modes may not catch. Note that this mode may produce false positives.


## DRED logs (Windows DirectX Only)

When a Timeout Detection and Recovery (TDR) crash occurs while using the DirectX12 backend, [Device Removed Extended Data](https://microsoft.github.io/DirectX-Specs/d3d/DeviceRemovedExtendedData.html) (DRED) breadcrumbs
are written to a timestamped log file in `.o3de/Logs/DRED/`. This log contains all of the events, draws, barriers, and dispatches that led up to a crash, as well as commands that failed to complete.
The offending command that likely caused the device removal will be visible after the `===ERROR START===` and before the `===ERROR END===` lines in the log. 

**Example**

An example of a log with DRED breadcrumbs that's displayed in the Windows LogViewer.

<img src="/images/atom-guide/dev-guide/dred_log_sample.png" alt="DRED Log Sample" style="max-width: 800px"/>

The red lines demarcate the region containing the offending command. Depending on how much work was in-flight on the GPU at the time of the crash, the error region may be larger or smaller. In this example, the offending command was a single `DRAWINSTANCED` command, issued within the `FullsceenShadowPass`.

{{< note >}}
The log above contains labeled events with pass names because the engine was compiled with the `-DLY_PIX_ENABLED` CMake configuration flag. For information about integrating [Microsoft's PIX Event Runtime for Windows](https://devblogs.microsoft.com/pix/winpixeventruntime/), please follow the directions in the O3DE Wiki page, [CPU& GPU Debugging and Profiling Tools](https://github.com/o3de/o3de/wiki/CPU-&-GPU-Debugging-and-Profiling-Tools#pix-cpu--gpu-profiling).

For more details about the operation of DRED, consult the DirectX specification on [`WriteBufferImmediate`](https://microsoft.github.io/DirectX-Specs/d3d/D3D12WriteBufferImmediate.html) and [DRED](https://microsoft.github.io/DirectX-Specs/d3d/DeviceRemovedExtendedData.html).
{{< /note >}}