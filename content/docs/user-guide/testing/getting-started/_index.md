---
linkTitle: Getting Started
title: Getting Started with Test Automation
description: Learn about the automated testing tools provided with Open 3D Engine (O3DE).
toc: true
weight: 500
---

This guide introduces the automated testing tools in **Open 3D Engine (O3DE)** and covers their basic usage. More detailed information on each tool exists on their specific documentation pages.

## Overview

O3DE uses [CMake](https://cmake.org/cmake/help/latest/), a build system that includes [CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html). CTest is a generic test runner tool which coordinates executing and reporting on tests. O3DE uses CTest to start all automated tests of the engine and tools. New projects using O3DE can also register and run their own tests through CTest, to test their unique game code or engine extensions. CTest can be executed on a developer's local machine to verify code health. It also gets executed in the O3DE Automated Review (AR) pipeline to help prevent bad merges. The sections below introduce the primary way of starting CTest, and describes how to register tests.

![CMake and CTest workflow](/images/user-guide/testing/getting-started/cmake_ctest_workflow.png)

## CTest

[CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html) is similar to other test frameworks like GoogleTest, PyTest, or JUnit; though it uses a higher-level generic interface. CTest registers each test as a string of commandline arguments, and reports on whether invoking those arguments succeeded (returned zero) without hanging. CTest can also coordinate running tests in parallel processes. Unlike other test runners, CTest is programming language agnostic by interfacing with the OS shell. However this means a notable feature is absent from CTest: other test frameworks typically provide a lower-level interface which directly invokes functions inside a specific programming language. To provide this feature, CTest is used to invoke lower-level test runners.

To simplify using function-level test reporting, O3DE provides wrapper code to register tests for frameworks such as GoogleTest and PyTest into CTest. These wrappers enable writing tests which run on any operating system. XML files are generated to track the low-level results not reported in CTest, as well as artifacts such as log output and crash dumps.

In short, all tests in O3DE use CTest as a high level test coordinator. When executed, CTest calls other lower-level test tools and then reports on their success.

![CTest calls other test runners](/images/user-guide/testing/getting-started/ctest_to_runners.png)

### Starting CTest

CTest expects its working directory to be a CMake build directory, so be sure to first navigate to this directory:

```shell
cd <local_path_to>/o3de/build/<build_folder>
ctest -C <build_configuration>
```

You may not want to run the commands above without also filtering the set of tests which run. Without a filter the command will kick off every test, and likely result in multiple hours of test execution! If you ever want to stop CTest, send an interrupt signal by selecting the terminal and pressing `CTRL + C` . The most commonly used suites are Smoke and Main, which are required to run quickly. The following ctest command filters to only tests in these two suites:

```shell
cd <local_path_to>/o3de/build/<build_folder>
ctest -C <build_configuration> -L "(SUITE_smoke|SUITE_main)"
```

The build configuration should be one you have already built locally. Running the Smoke and Main suites for the `profile` build configuration on a Linux machine should look like:

```shell
cd user/github/o3de/build/linux
ctest -C profile -L "(SUITE_smoke|SUITE_main)"
```

After running CTest, it will save test results to `.../<build_folder>/Testing/`.  If you prefer to see a summary of failures in your terminal, add the flag `--output-on-failure`

For more information on CTest usage, refer to its [online documentation](https://cmake.org/cmake/help/latest/manual/ctest.1.html).

### Adding test modules to CTest

CTest registers entire modules of test code. These modules typically contain multiple individual tests of the same feature. Adding new tests has three major steps, with a prerequisite:

0. Add a build target for the production code which tests will target
1. Add a build target for tests which need to be compiled (not required for Python)
2. Register your test module in a CMakeLists.txt
3. Add individual test functions into the test module

Specific steps vary for different types of tests, discussed in later sections.

## GoogleTest

Many tests are easiest to write in the same language as the production code they target. Since the majority of O3DE uses C++, the majority of its tests also use C++. O3DE's C++ tests are typically small [unit level](https://softwaretestingfundamentals.com/unit-testing/) tests of specific low-level functionality, which run extremely fast. O3DE uses [GoogleTest](https://github.com/google/googletest/blob/main/docs/index.md) to coordinate these tests, with an execution wrapper named AzTestRunner. CTest will call AzTestRunner to load the test library and the target library, and then execute any loaded GoogleTest tests.

When building production C++ code for O3DE features, that code gets built into a library to later load into the engine. When writing C++ tests for this code, the test-code should be built into a separate library with a dependency on the production library. Building separate test libraries has the advantage of keeping production binaries lean and easy to ship, free of extraneous ```#if defined``` blocks for test code, and ensures we test the exact same interfaces that we ship.

### Registering new C++ tests

While reading the upcoming steps, refer to the following CMakeLists.txt example:

```
# Preexisting module registration from Step 0
ly_add_target(
    NAME MyModuleName
    NAMESPACE Gem
    FILES_CMAKE
        mymodule_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            Legacy::CryCommon
    COMPONENT
        MyModuleComponent
)

# New test module registration from Step 1
# this configures CMake to also build a library called MyModuleName.Tests.so (.dll on Windows)
# the rest of CMake will refer to this freshly created module by its NAME ("MyModuleName.Tests")
if(PAL_TRAIT_BUILD_SUPPORTS_TESTS)  # only create these test modules if the target platform supports testing

    ly_add_target(
        NAME MyModuleName.Tests SHARED
        NAMESPACE Gem
        FILES_CMAKE
            mymodule_test_files.cmake
        INCLUDE_DIRECTORIES
            PRIVATE
                Tests
                Source
        BUILD_DEPENDENCIES
            PRIVATE
                AZ::AzTest
                Legacy::CryCommon
                Gem::MyModuleName
        COMPONENT
            MyModuleComponent
    )

    # Register new test module from Step 2
    ly_add_googletest(
        NAME MyModuleName.Tests
    )

endif()
```

#### Step 0: Add a production build target

Before configuring tests, you should first define the library which gets tested. This is defined in a CMakeLists.txt, which typically lives in the same directory as the code or in a parent directory. For more information on configuring this, please read more about adding library targets at [Getting Started with the CMake Build System](/docs/user-guide/build/). Note that you only need to define a library that will be built, and can start configuring and writing tests before you finish writing the production code.

#### Step 1: Add a test build target

Similar to the production target, the test target defines a library in a CMakeLists.txt configuration file. Start by finding the CMakeLists.txt for your module, which should already be created from Step 0. It should exist at a path similar to `o3de/.../<MyModule>/CMakeLists.txt`

Modify the CMakeLists.txt file to define your new test module, using the helper function `ly_add_target()`. Similar to the production build target, it is easiest to create another file which lists the C++ files used to compile the test library. The example above uses `dev/.../<MyModule>/mymodule_test_files.cmake`, which would have content similar to:

```
set(FILES
    test/MyModuleTestFile.cpp
    test/MyModuleMathTests.cpp
)
```

#### Step 2: Register the test module

The final CMakeLists.txt step is to register the module with CTest. For this, use helper function `ly_add_googletest()`

To verify everything is set up correctly, run the [CMake configure command](/docs/user-guide/build/configure-and-build/) from the CMake CLI or CMake GUI. This will register everything you just added, and emit errors if anything was misconfigured.

#### Step 3: Write new tests

Now that you have configured CMake to create a library from your tests, and registered this library with CTest, you are ready to write new tests. To simplify your module structure, create new test files inside `o3de/.../<MyModule>/tests/`

Tests are written using standard [GoogleTest](https://github.com/google/googletest/blob/main/docs/index.md) syntax, which helps you write small functions to test your code. To pull in everything from GoogleTest plus a few convienient tools, add the following statement to your file:

```cpp
#include <AzTest/AzTest.h>
```

To keep test functions legible at a glance, we recommend using the [Osherove Naming Convention](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html) of `UnitOfWork_StateUnderTest_ExpectedBehavior`. This can be especially helpful when reading a report with many individual test case failures. In a short a C++ example:

```cpp
TEST_F(Matrix4x4Tests, MatrixMultiply_InverseMatrix_ReturnIdentityMatrix)
{
    // (function under test would be called here)
    ASSERT_TRUE(someErrorState);
    EXPECT_TRUE(someResult);
    EXPECT_FALSE(secondaryProperty);
}
```

For more information on writing tests in C++, see [Using AzTest](/docs/user-guide/testing/aztest/aztest/).

## GoogleBenchmark

For performance benchmarks of small pieces of C++ code O3DE uses [GoogleBenchmark](https://github.com/google/benchmark/blob/main/docs/index.md), which is quite similar to GoogleTest. However how failure is defined is a major difference between a normal test and a benchmark. In most tests, pass/fail status is directly evaluated into a boolean state. Benchmarks instead create a subjective performance metric. These metrics are most valuable when periodically recorded, to help detect trends. The only objective failure during a benchmark occurs when the code fails to run or crashes.

The steps for configuring a GoogleBenchmark library are identical to the [steps above for GoogleTest libraries](#googletest), with a couple exceptions. The include statement is `#include <benchmark/benchmark.h>` and the cmake helper function is:

```
ly_add_googlebenchmark(
    NAME MyModule.Benchmarks
)
```

## PyTest

Certain tests are easier to write in a scripting language like Python. The scope of these tests are typically at the [integration level](https://softwaretestingfundamentals.com/integration-testing/), verifying mid-to-high level functionality of workflows and overall system sanity. Additionally, any Python-based tools will prefer unit tests written in Python. For these tests O3DE uses [PyTest](https://docs.pytest.org/).

While interpreted languages like Python can have low performance, these tests should not perform heavy computation in Python. Tests should instead focus on coordinating workflows: signalling events and then verifying a response. Leave heavy operations to the code targeted by a test.

There are often two Python interpreter instances used during O3DE tests. This can complicate determining which will execute your code, so pay close attention to how the test is defined:

- #1 Exists outside of the O3DE Editor
  - Use in generic tests which launch applications and send external signals
  - Helps and monitor for application crashes
  - Test file names should start with `test_`
  - Same Python interpreter that launches when you run `o3de/python/python.sh` or `o3de\python\python.cmd`

- #2 Embedded inside the O3DE Editor
  - Use in "EditorPythonBindings" tests which target workflows inside the editor
  - Helps expose editor functionality to a test script
  - Test file names should ***not*** include affixes such as `test_` or `_tests`
  - PyTest is still initiated by the external python, to handle editor crashes

### Registering a new Python Test

Registering a Python-based test is simpler than registering a C++ test. However, it also requires you define the library that will be tested. The steps below assume you have already defined a production library. You can read more about defining production code in [Getting Started with the CMake Build System](/docs/user-guide/build/).

#### Step 1: Register a PyTest Target

Find the `CMakeLists.txt` that defines the system you are testing. It should exist at a path similar to `o3de/.../<MyModule>/CMakeLists.txt`. Note that it may be appropriate to register broader tests in a parent directory's CMakeLists.txt instead. If you are creating a test that is specific to a game project, you should register it in a `CMakeLists.txt` in that game project. When you find the right place for the test to be registered, add a line similar to:

```
ly_add_pytest(
    NAME myPythonTest 
    PATH ${CMAKE_CURRENT_LIST_DIR}/Tests/test_MyFile.py
    TEST_SERIAL # many larger-than-unit tests can interfere with one another in parallel
    RUNTIME_DEPENDENCIES # helps the test build-and-run from an IDE
        Legacy::Editor
        AZ::AssetProcessor
        AutomatedTesting.Assets
)
```

To verify everything is set up correctly, run the [CMake configure command](/docs/user-guide/build/configure-and-build/) from the CMake CLI or CMake GUI. This will register everything you just added, and emit errors if anything was misconfigured.

#### Step 2: Write new Python tests

These tests primarily use standard [Python](https://docs.python.org/3/) code along with [PyTest](https://docs.pytest.org/). Depending on where your test is focused, it likely wants to include one of two automation libraries:

Internal tests of the O3DE Editor functionality should use [EditorPythonBindings](/docs/user-guide/testing/parallel-pattern/). This helps expose C++ interfaces of the Editor to Python. These tests almost always require the `TEST_SERIAL` flag.

External tests at the Operating System level often use the [LyTestTools](/docs/user-guide/testing/lytesttools/) module, which simplifies interacting with O3DE applications. Tests using these tools are discussed more at . These tests often use the `TEST_SERIAL` flag.
