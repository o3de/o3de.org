---
title: "Troubleshooting Atom Renderer"
description: "Troubleshoot GPU issues in the Atom Renderer."
toc: true
weight: 1000
---

This guide will help you identify and handle crashes that you might encounter in your graphics processing unit (GPU) when running **Atom Renderer**. 

A key indicator of a crash in your GPU is a "device removal" failure, which occurs when a driver exception leaves the GPU in a non-operational state. You can find this failure in an [O3DE log file](/docs/user-guide/appendix/log-files). If you encounter this crash, follow the instructions on this page to report an issue and try several techniques to debug the problem further.


## Reporting an issue

Before reporting an issue, check for similar [existing issues](https://github.com/o3de/o3de/issues). Otherwise, [create an issue](https://github.com/o3de/o3de/issues/new/choose) and provide the following information:

- Steps to reproduce the crash. Keep the information minimal and specific.
  
- GPU vendor and driver version (for example Nvidia, AMD, Intel, Apple, and so on).

- RHI (for example Vulkan, D312, or Metal).


## Testing alternative GPUs or RHI backends

If your machine has multiple GPUs, such as multiple discrete GPUs or an integrated GPU, or multiple RHI backends, such as Vulkan and DirectX, try testing different ones. You can also try different combinations of GPU and RHI backend. 

To prioritize the usage of one GPU over another, use `--forceAdapter=<device>` in the command line interface (CLI). `device` can be any case-insensitive partial match for your selected device's name.

**Example**

```cmd
--forceAdapter="NVIDIA GeForce GTX 1080"
```

To select a non-default RHI backend, use `--rhi=<rhi>` in the CLI. This only applies to Windows computers where `D3D12` is the default selected backend. For example, `--rhi=vulkan` selects the Vulkan RHI.

**Example**

```cmd
--rhi=vulkan
```

{{< note >}}
If you don't know the name of your GPU, you can check the command window or in your log file. RHI prints the names of all the devices to the command window when Atom launches.

For example, this output lists three RHI devices on your machine. 

```cmd
Initializing RHI...
    Enumerated physical device: Intel(R) UHD Graphics 630
    Enumerated physical device: NVIDIA GeForce RTX 2070 with Max-Q
Design
    Enumerated physical device: Microsoft Basic Render Driver
```
{{< /note >}}


## Enable Driver Validation

You can enable validation in your RHI device to output additional debugging information produced at the RHI level. To enable RHI-level validation, use the CLI option  `--rhi-device-validation=` and pass one of the values listed below. For Vulkan, be sure that you have the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) for your machine installed before you enable device validation.

- `--rhi-device-validation="enable"`: Enables basic driver validation.
- `--rhi-device-validation="verbose"`: Enables basic driver validation and additional reporting.
- `--rhi-device-validation="gpu"`: Enables GPU-based validation (GBV). This runs slower, but catches issues that the `enable` and `verbose` modes may not catch. This mode may produce false positives. 
