---
description: ' Use AzTest to write C++ unit tests for O3DE. '
title: Using AzTest
---

## Using AzTest in O3DE

### What is AzTest?

AzTest is designed to be an abstraction around our underlying test frameworks. By using an abstraction instead of the framework itself, we are not locked into having to make changes all over the system if we decide to switch frameworks or if the framework itself changes with updates. AzTest will also provide convenience functions and basic implementations that will make writing tests easier for all modules that use it.

Google Test and Google Mock are fully accessible through AzTest. Including AzTest/AzTest.h in other modules gives developers access to everything Google Test and Google Mock have.

### CTest

CTest is as a test executor tool which is also a part of CMake. Tests are registered and initiated by CTest, which then calls AzTestRunner. AzTestRunner helps start a module of GoogleTest tests inside a library or executable. CTest will run a dll via AzTestRunner in order to perform the tests once they are registered. For more information about using CTest in O3DE, refer to the [O3DE Test Onboarding TODO]() document.

### Features of AzTest

### Test Hooking

AzTest.h provides several macros that can be used for creating a hook that test scanner can use to call tests. These are listed below with examples of use.

AZ_UNIT_TEST_HOOK(...)

This is the unit test version of the hook and can be used whether you have environments to initialize or not.

```C++
#include <AzTest/AzTest.h>

AZ_UNIT_TEST_HOOK()  // Don't have any environments
```

Here is how you would add environments using the same hook.

```C++
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

AZ_TEST_CLASS_ALLOCATOR is required to properly align and manage memory created for the test environment, and prevent conflicts and errors with Cry/Az memory managers.

```C++
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
1. [O3DE Test Onboarding TODO]()
