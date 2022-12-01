---
linkTitle: Getting Started
title: Getting Started with Test Automation
description: Learn about the automated testing tools provided with Open 3D Engine (O3DE).
toc: true
weight: 500
---

This guide introduces the automated testing tools in **Open 3D Engine (O3DE)** and covers their basic usage. More detailed information on each tool exists on their specific documentation pages, linked in each section below.

## Overview

O3DE uses [CMake](https://cmake.org/cmake/help/latest/), a build system that includes [CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html). CTest is a generic test runner tool which coordinates executing and reporting on tests, used by O3DE to start all automated testing. O3DE projects can also register their own tests through CTest to test their unique game code or engine extensions. By running CTest locally, developers can verify code health before committing changes.

{{< important >}}
All CTest tests are executed in the O3DE Automated Review (AR) pipeline to help prevent bad merges. New code submissions are required to have tests; Changes to existing code must not cause regressions. Make sure to run your tests locally before any code submission to the O3DE project.
{{< /important >}}

The rest of this topic covers registering tests with CTest for testing O3DE code, and how to write these tests for various test runners.

![CMake and CTest workflow](/images/user-guide/testing/getting-started/cmake_ctest_workflow.png)

## CTest

CTest is similar to other test frameworks like GoogleTest, PyTest, JUnit, or NUnit; though it uses a higher-level generic interface. CTest registers each test as a string of command-line arguments, and reports on whether invoking those arguments succeeded (returned `0`) without hanging. CTest can also coordinate running tests in parallel processes. Unlike other test runners, CTest is programming language agnostic by interfacing with the OS shell. However this means a notable feature is absent from CTest: other test frameworks typically provide a lower-level interface which directly invokes functions inside a specific programming language. To provide this function-level execution, O3DE uses CTest to invoke lower-level test runners.

O3DE provides wrapper code to help register tests for frameworks such as GoogleTest and PyTest into CTest. Along with the provided test-tools libraries, these wrappers enable writing tests that can run on any operating system supported by the underlying frameworks. XML files are generated to track the low-level results not reported to CTest, and artifacts are saved such as log output and crash dumps.

![CTest calls other test runners](/images/user-guide/testing/getting-started/ctest_to_runners.png)

In short, all tests in O3DE use CTest as a high-level test coordinator. When executed, CTest calls other lower-level test tools and then reports on their success.

### Starting CTest

CTest expects its working directory to be a CMake build directory, so be sure to first navigate to this directory in a terminal. This build directory should be the same directory configured by CMake. Then, use `-C` to select a build configuration that you've already built:

* **Windows**:
    ```cmd
    cd <local_path_to>\o3de\build\<build_folder>
    ctest -C <build_configuration>
    ```

* **Linux**:
    ```shell
    cd <local_path_to>/o3de/build/<build_folder>
    ctest -C <build_configuration>
    ```

{{< caution >}}
Without a filter the command will run every registered test, and likely result in multiple hours of test execution! If you ever want to stop CTest, send an interrupt signal by selecting the terminal and pressing **Ctrl+C**.
{{< /caution >}}

CTest can also run a subset of labeled test suites with the `-L` argument. These test suites should be contained in parenthesis (`(..)`) and have their names separated with a `|` character. The following examples demonstrate this syntax for running the Main and Smoke suites for a `profile` build on Windows or Linux:

* **Windows**:
    ```cmd
    cd C:\github\o3de\build\windows
    ctest -C profile -L "(SUITE_smoke|SUITE_main)"
    ```

* **Linux**:
    ```shell
    cd user/github/o3de/build/linux
    ctest -C profile -L "(SUITE_smoke|SUITE_main)"
    ```

It's recommended that you verify your tests with the Main and Smoke suite on your local machine. These tests will be executed on any pull request (PR) opened against the `o3de` repository, as part of the Automated Review pipeline in the PR workflow. Both of these suites must execute relatively fast and must not intermittently fail, and are an easy way to prove your change did not break other features.

After running CTest, results save to `.../<build_folder>/Testing/`.  If you prefer to see full output of failures directly in your terminal, add the flag `--output-on-failure`.

For more information on CTest usage, refer to its [online documentation](https://cmake.org/cmake/help/latest/manual/ctest.1.html).

### Adding test modules to CTest

CTest registers entire modules of test code, which typically contain multiple individual tests of the same feature. To add new tests, complete one prerequisite and three steps:

1. **Prerequisite**: Add a build target for the production code that the tests will target.
1. Add a build target for tests that need to be compiled (not required for Python).
1. Register your test module in a `CMakeLists.txt`.
1. Add individual test functions into the test module.

Specific steps vary for different types of tests, discussed in later sections.

## GoogleTest

For many tests, it's easier to write in the same language as the production code that the test targets. Since the majority of O3DE uses C++, the majority of its tests also use C++. O3DE's C++ tests are typically small [unit level](https://softwaretestingfundamentals.com/unit-testing/) tests of specific low-level functionality, which run extremely fast. O3DE uses [GoogleTest](https://github.com/google/googletest/blob/main/docs/index.md) along with utilities named [AzTest](/docs/user-guide/testing/aztest/aztest/). Part of AzTest is an execution wrapper named `AzTestRunner`. CTest calls `AzTestRunner` to load the C++ test library and the target library, and then execute any loaded GoogleTest tests.

C++ production code for an O3DE feature gets built into a library, which is later loaded into an application. When writing C++ tests for this code, the test-code should similarly be built into its own separate library. This test-library then declares a dependency on loading the production library it tests. Building separate test-only libraries has the advantage of keeping production binaries lean and easy to ship, as well as free of extraneous ```#if defined``` blocks for test-only logic. This also ensures that tests target the exact same interfaces that ship with the product.

### Registering new C++ tests

While reading the upcoming steps, refer to the following `CMakeLists.txt` example:

```
# Preexisting module registration from completing the Prerequisite step
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
# This configures CMake to also build a library called `MyModuleName.Tests.so` (.dll on Windows)
# The rest of CMake refers to this new module by its NAME ("MyModuleName.Tests")
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

#### Prerequisite: Add a production build target

Before configuring tests, you must first define the library that you want to test. If your tests target an existing feature, then this step is already completed and you simply need to find the correct file path. Target libraries are defined in a `CMakeLists.txt`, which typically lives in the same directory as the code or in a parent directory. For more information on configuring `CMakeLists.txt` files, please refer to the [Build section](/docs/user-guide/build/). Note that you only need to define the production library that the tests target, not every feature in the production library. You can configure and write tests before you finish the production code.

#### Step 1: Add a test build target

Similar to the production build target, the test target defines a library in a `CMakeLists.txt` configuration file. Start by finding the `CMakeLists.txt` that you created in the prerequisite step.  It should exist at a path similar to `o3de/.../<MyModule>/CMakeLists.txt`.

Modify the `CMakeLists.txt` file to define your new test module with `ly_add_target()`. Similar to the production build target, it's easiest to create another `.cmake` file that lists the C++ files used to compile the test library.

The example above uses `o3de/.../<MyModule>/mymodule_test_files.cmake`, which has content similar to the following:

```
set(FILES
    test/MyModuleTestFile.cpp
    test/MyModuleMathTests.cpp
)
```

#### Step 2: Register the test module

In `CMakeLists.txt`, register the module with CTest by using the helper function `ly_add_googletest()`.

{{< important >}}
GoogleTest modules should avoid using the `TEST_SERIAL` flag, which prevents tests from efficiently executing in parallel with other test modules. If the tests have dependencies which prevent them from executing in parallel, please start a discussion with the Testing Special Interest Group in the [O3DE Discord](https://{{< links/o3de-discord >}}) channel sig-testing!
{{< /important >}}

To verify everything is set up correctly, run the CMake configure command from **CMake CLI** or **CMake GUI** (described in the [Configure and Build](/docs/user-guide/build/configure-and-build/) section). This registers everything you just added, and emits errors if anything is misconfigured.

#### Step 3: Write new tests

Now that you have configured CMake to create a test library and registered it with CTest, you are ready to write new tests. To simplify your module structure, create new test files inside `o3de/.../<MyModule>/tests/`.

Tests are written using standard [GoogleTest](https://github.com/google/googletest/blob/main/docs/index.md) syntax, which helps you write small functions to test your code. To pull in everything from GoogleTest plus a few convenient tools, add the following statement to your C++ test file:

```cpp
#include <AzTest/AzTest.h>
```

To keep test functions legible at a glance, we recommend using the [Osherove Naming Convention](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html) of `UnitOfWork_StateUnderTest_ExpectedBehavior`. This helps when reading a report that includes many individual test case failures. One way to think of this pattern is to summarize the test into `WhatIsExecuted_UniqueSetupStep_MostImportantVerification` so a test failure can be understood based on the name, without always needing to investigate the code inside the test. If you are struggling to summarize the test, this may indicate the test is too complex. Try breaking complex tests into multiple smaller tests. Note that while GoogleTest documentation recommends [not using any underscores](http://google.github.io/googletest/faq.html#why-should-test-suite-names-and-test-names-not-contain-underscore) in test names, tests will function normally as long as test and fixture names never start or end with an underscore (`_`).

A short example of C++ test structure:

```cpp
// The first parameter is a test fixture, which provides shared setup to multiple tests
// The second parameter is the test name
TEST_F(Matrix4x4Tests, MatrixMultiply_InverseMatrix_ReturnIdentityMatrix)
{
    // (Call the functions under test here.)
    
    ASSERT_TRUE(someErrorState);
    EXPECT_TRUE(someResult);
    EXPECT_FALSE(secondaryProperty);
}
```

For more information on writing tests in C++, see [Using AzTest](/docs/user-guide/testing/aztest/aztest/).

## GoogleBenchmark

For performance benchmarks of small pieces of C++ code, O3DE uses [GoogleBenchmark](https://github.com/google/benchmark/blob/main/docs/index.md). GoogleBenchmark is similar to GoogleTest, but the main difference between a test and a benchmark is the definition of _failure_. In most tests a pass/fail status is directly evaluated to a boolean state, creating an objective report of success and failure. Instead, benchmarks create a subjective performance metric. These metrics are most valuable when they are periodically recorded to help detect trends over time and across code changes. The only objective failure during a benchmark occurs when the code fails to run or crashes.

To configure a GoogleBenchmark library, use the [steps above for GoogleTest libraries](#googletest), with the following exceptions:

* Change the include statement in your code to `#include <benchmark/benchmark.h>`.
* Use the following CMake helper function in your `CMakeLists.txt`:
   ```
   ly_add_googlebenchmark(
       NAME MyModule.Benchmarks
   )
   ```

## PyTest

Some tests are easier to write in a scripting language, and for these tests O3DE prefers Python with the [PyTest](https://docs.pytest.org/) library. The scope of these tests are often at the [integration level](https://softwaretestingfundamentals.com/integration-testing/) or higher. These tests help verify system correctness, similar to how an end-user experiences the software. Despite that positive aspect, wide scope tests are typically slow and provide less specific failure information. The number of these tests must be limited. Whenever possible verify functionality with fast unit-scope tests, and write only a few broader integration or system-wide tests. Unit tests should be written in PyTest only when the library under test is written in Python. For fast unit-scope tests of C++ code, use GoogleTest instead of PyTest.

While interpreted languages like Python can have low performance, tests should not perform heavy computation in Python code. Instead, tests should coordinate workflows by signalling events and then verifying a response. Leave heavy operations for the code targeted by the test, and perform simple checks in the Python test-code.

### Multiple Python instances

During execution, tests targeting O3DE can create multiple separate Python interpreter instances, which each load different scripts. Most commonly, there are two instances: the _external interpreter_ and the _Editor interpreter_. The remainder of this section helps determine which environment your test should run in, and how to execute it there.

#### Tests in the external interpreter

The external interpreter runs outside of any active O3DE application. This is the same interpreter that launches when you run `python/python.sh` or `python\python.cmd`, and is best used for tests that involve the following:

* Generic tests that launch applications and send external signals, often with [LyTestTools](/docs/user-guide/testing/lytesttools/).
* Monitoring application crashes.

To target PyTest in the external interpreter, by default your tests filenames should start with `test_`.

#### Tests in the Editor interpreter

The **O3DE Editor** internally manages a Python Interpreter and exposes Editor-specific functionality through a Python bindings library. Although this environment isn't equivalent to launching `python/python.*`, it uses the same version of the Python interpreter. The Editor interpreter is best used for tests that involve the following:

* Target specific functionality within the Editor, using [EditorPythonBindings and EditorTest](/docs/user-guide/testing/parallel-pattern/).
* Rely on external crash-handling (an Editor crash will cause a test script crash).

To integrate with the Editor interpreter, create a test that uses `EditorPythonBindings`. These tests **must not** be in a file starting with `test_` or `tests_`, to avoid accidentally registering as failing tests.

{{< note >}}
PyTest is not used within the Editor interpreter, and as a consequence PyTest functionality is unavailable to tests that run in the Editor interpreter. Avoid dependencies on PyTest fixtures when designing these tests.

EditorTest still uses PyTest to manage tests, and additionally handles external crash monitoring, batching, and parallelism. If this tool does not meet your needs, please reach out with a [feature request](https://github.com/o3de/o3de.org/issues/new/choose) or start a discussion with the Testing Special Interest Group in the [O3DE Discord](https://{{< links/o3de-discord >}}) channel sig-testing!
{{< /note >}}

### Registering a new Python test

Registering a Python-based test is simpler than registering a C++ test. However, it still requires that you define the C++ library that you want to test, which you've likely already completed before designing integration tests. The steps below assume the production library is already defined. You can read more about defining production code in the [Build](/docs/user-guide/build/) section.

#### Step 1: Register a PyTest target

Find the `CMakeLists.txt` that defines the system you are testing. The file should exist at a path similar to `o3de/.../<MyModule>/CMakeLists.txt`. Depending on the test, it may be more appropriate to register the test to a `CMakeLists.txt` file at another location. Reasons include:

* A test for a sub-module should exist at a child directory of its module.
* A broad test integrating across multiple features should exist in a parent directory of the features.
* A test that relies on code or assets in a game project must exist in that game project.
  * This avoids the case where disabling the project breaks the still-registered tests.

When you find the right `CMakeLists.txt` to register the test, add a line similar to the following:

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

To verify everything is set up correctly, run the CMake configure command from **CMake CLI** or **CMake GUI** (described in the [Configure and Build](/docs/user-guide/build/configure-and-build/) section). This registers everything you just added, and emits errors if anything is misconfigured.

#### Step 2: Write new Python tests

Python-based tests use [Python 3](https://docs.python.org/3/) code along with [PyTest](https://docs.pytest.org/). Depending on the feature your test is focused on, the test may include one of two automation libraries provided with O3DE:

* [EditorPythonBindings](/docs/user-guide/testing/parallel-pattern/) for internal tests of the O3DE Editor functionality.
  * These tests always require the `TEST_SERIAL` CTest flag.
* [LyTestTools](/docs/user-guide/testing/lytesttools/) module for external tests at the operating system level.
  * These tests often use the `TEST_SERIAL` flag, unless they create no side-effects and disable heavy secondary features such as rendering.
