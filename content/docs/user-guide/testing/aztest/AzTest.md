---
description: ' Write C++ unit tests for Open 3D Engine with the AzTest framework. '
title: Using AzTest
---

AzTest is designed to be an abstraction around test frameworks used by Open 3D Engine. By using an abstraction instead of the framework itself, O3DE isn't locked into having to make changes all over the system if frameworks change. AzTest also provides convenience functions and basic implementations that make writing tests easier for all modules that use it.

The Google Test and Google Mock frameworks are fully accessible through AzTest. Including `AzTest/AzTest.h` in custom tests gives developers access to everything Google Test and Google Mock have.

## CTest

CTest is as a test executor tool which is also a part of CMake. Tests are registered and initiated by CTest, which then calls AzTestRunner. AzTestRunner helps start a module of GoogleTest tests inside a library or executable. CTest will run a dll via AzTestRunner in order to perform the tests once they are registered. For more information about using CTest in O3DE, refer to [O3DE Test Onboarding](/docs/user-guide/testing/getting-started/).

## Test Hooks

*AzTest.h* provides several macros that can be used for creating a hook that test scanner can use to call tests. These are listed below with examples of use.

### `AZ_UNIT_TEST_HOOK(...)`

`AZ_UNIT_TEST_HOOK(...)` is used for unit tests, and can be used whether you have environments to initialize or not.

```cpp
#include <AzTest/AzTest.h>

AZ_UNIT_TEST_HOOK()  // Don't have any environments
```

Here is how you would add environments using the same hook.

```cpp
#include <AzTest/AzTest.h>

// Environments subclass from AZ::Test::ITestEnvironment
class ExampleTestEnvironment : public AZ::Test::ITestEnvironment
{
public:
    AZ_TEST_CLASS_ALLOCATOR(ExampleTestEnvironment);
    virtual ~ExampleTestEnvironment() {}

protected:
    // There are two pure-virtual functions to implement, setup and teardown
    void SetupEnvironment() override
    {
        // Setup code
    }

    void TeardownEnvironment() override
    {
        // Teardown code
    }

private:
    // Put members that need to be maintained throughout testing lifecycle here
    // Don't declare them in the setup/teardown functions!
}

// IMPORTANT! Declare your environment dynamically BEFORE using the macro
// The framework will perform the appropriate deletes when done
AZ_UNIT_TEST_HOOK(new ExampleTestEnvironment)
```

Use of the `AZ_TEST_CLASS_ALLOCATOR(...)` macro in a test class definition is required to properly align and manage memory created for the test environment, and prevent conflicts and errors with memory managers.

```cpp
#include <AzTest/AzTest.h>
#include "SharedTestEnvironment.h"

// In this case we have a shared environment, so we only need specific setup here
class ModuleSpecificTestEnvironment : public AZ::Test::ITestEnvironment
{
    AZ_TEST_CLASS_ALLOCATOR(ModuleSpecificTestEnvironment);
    // See above for environment example
}

// This macro is variadic, so you can list the environments you want without declaring
// a container.
// IMPORTANT! Environments are setup in given order and torn down in reverse order,
// so if one environment needs to be setup before another, make sure it comes first
// in the list!
AZ_UNIT_TEST_HOOK(new SharedTestEnvironment, new ModuleSpecificTestEnvironment)
```

### Links

1. [GoogleTest Documentation](https://github.com/google/googletest)
1. [Official CTest Documentation](https://cmake.org/cmake/help/latest/manual/ctest.1.html)
1. [O3DE Test Onboarding](/docs/user-guide/testing/getting-started)
