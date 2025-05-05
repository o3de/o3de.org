---
title: CPU Profiling Support for Open 3D Engine (O3DE)
linkTitle: CPU Profiling
description: An overview of Open 3D Engine support for CPU Profiling.
weight: 100
---

A CPU Profiler is used to **monitor the performance of your processor** while it is running the editor or the game. It collects timed events in such a way that you can easily identify the sources of slowdowns in the codebase.

{{< tip >}}
The code behaves differently between debug and release build, so it is very likely that you will want to only profile release build to look at the performance issues of your application
{{< /tip >}}

## Overview

### Quick definition of profiler types

There are multiple ways to capture profiling data, each one with their pros and cons :

- **Instrumentation** : You add Start/End events yourself in the code. It is fast, the result is clean, but it might take a few try until you are able to pinpoint the exact problematic area
- **Sampling** : At specified intervals, data collection is done on your running program to know where the code is currently executed. Depending on the interval it can have a big performance impact. It is great to find right away the problematic area, but the amount of data can make it difficult to navigate
- **Tracing** : Similar to sampling with better precision but also bigger performance impact. It will be refered as "Sampling" from now on as we don't need to differenciate the two for this documentation

### Profiler Gems

O3DE currently support multiple profiling tools as Gems to toggle on and off. These are all very capable tools so choosing between them might come down as personal taste. While you can only have one profiling Gem enabled at a time, it is easy to switch in between them so that it should be straightforward to try them all out.

| Profiler | Description | Type | Platform |
| - | - | - | - |
| Built-in | Provides a quick overview of the CPU and GPU events. It is embedded via the [ImGui tools](https://docs.o3de.org/docs/user-guide/gems/reference/debug/imgui/) | Instrumentation | All |
| [Tracy](https://youtu.be/ghXk3Bk5F2U?si=h2j82B6EDma3rNs7&t=36) | An external free and open-source profiler which combines many features making it an hybrid profiler. [Online demo](https://tracy.nereid.pl/) | Instrumentation (sampling not working as of now) | All |
| [Optick](https://github.com/bombomby/optick) | An external free and open-source profiler widely used in the games industry. The development has halted since the past few years. | Instrumentation (with minor sampling support) | Windows |
| [Superluminal](https://superluminal.eu/) | An external commercial profiler with strong sampling performance and UX. Widely used in the games industry | Sampling (with Instrumentation support) | Windows |

### Adding Instrumentation marker in your code

You have to include `<AzCore/Debug/Profiler.h>` in your C++ file to access the profiling markers. These markers are then forwarded to the currently enabled profiler Gem (we never use a specific profiler API). You can have a look in this file to see what is exposed, but most of your use case can be covered using these two macros :

- **AZ_PROFILE_FUNCTION** : To place at the start of a function, it will automatically grab the name of the function and take the duration of the whole function execution.
- **AZ_PROFILE_SCOPE** : To place at the start of a scope "{}". You have to provide a name, and it will take the duration of the scope it is in (so from the AZ_PROFILE_SCOPE to the next "}").

These two macros take a "Budget" as argument, it is used to group these tags under the same category. You can see the available budgets if you look for `AZ_DEFINE_BUDGET`.

Here is an example of API in action :

```cpp
#include <AzCore/Debug/Profiler.h>

void AssetDataStream::Open(const AZStd::vector<AZ::u8>& data)
{
    AZ_PROFILE_FUNCTION(AzCore);

    // ...
    while (!m_isSuspended)
    {
        AZ_PROFILE_SCOPE(AzCore, "Scheduler main loop.");
        // ...
    }
}
```

While these markers are not required if you use a sampling profiler, it is always nice to have them around for sensitive codepaths as it does make the navigation in the profiler easier (sampling profilers often supports instrumentation tags on top of their sampled data).

## Using the Built-in profiler (All platforms)

![Imgui profiler overview](/images/user-guide/profiling/imgui/overview.png)


## Using Tracy profiler (All platforms)

## Using Optick profiler (Windows-only)

## Using Superluminal profiler (Windows-only)
