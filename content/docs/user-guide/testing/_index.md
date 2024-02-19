---
title: "Testing"
date: 2021-03-02T00:23:56-05:00
weight: 1300
---

Test automation is the process of writing small snippets of code (tests) to verify the desired functionality of Open 3D Engine extensions and tools that you create.

{{< important >}}
Contributors to the O3DE Project are required to write tests for their features, following the standards set by the [Open 3D Foundation Testing Special Interest Group](https://github.com/o3de/sig-testing). If you plan to contribute, make sure that you're familiar with project test standards as well as the frameworks.
{{< /important >}} 

## Test Runners

O3DE uses standard test runners to collect, execute, and gather results. The officially supported test runners are:

* [GoogleTest](https://github.com/google/googletest)
* [GoogleBenchmark](https://github.com/google/benchmark)
* [PyTest](https://docs.pytest.org)

## Test Tools Packages

**Open 3D Engine (O3DE)** offers several tools packages to make writing tests quicker, safer, and more consistent. Before you write tests, take time to familiarize yourself with the tools.

### AzTest

[AzTest](/docs/api/frameworks/aztest/) is a collection of abstractions, functions, and wrappers to make writing C++ tests easier.

### EditorPythonTestTools

EditorPythonTestTools are a collection of test tools focused around accessing Editor functionality. These tools should be used whenever you want to automate tasks which would occur in the Editor. 

### LyTestTools

The [LyTestTools](/docs/user-guide/testing/lytesttools/) are testing productivity tools for writing and debugging tests that across different environments. This includes (but isn't limited to) environment manipulation, creating/collecting images and logs, and starting project launchers.
