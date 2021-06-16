---
title: "Testing and optimization"
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

[**Tools Packages**](/docs/user-guide/testing/tools-packages)

Tools packages are collections of useful functions and files to help you write tests quicker, safer, and more consistently. We currently have several tools packages, including: AzTest, EditorPythonTestTools, and LyTestTools.
