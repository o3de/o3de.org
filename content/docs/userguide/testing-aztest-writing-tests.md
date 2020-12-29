# Writing Tests for AzTest<a name="testing-aztest-writing-tests"></a>

Automated testing is important for any game project\. To perform automated testing in Lumberyard, you can use AzTest and the AZ test scanner\. This document shows you how to write the tests to build and run\. For information on building and running unit and integration tests, see [Using AZ Test Scanner](testing-aztestscanner.md)\.

Lumberyard and AzTest use the [GoogleTest](https://github.com/google/googletest) and [GoogleMock](https://github.com/google/googletest/blob/master/googlemock/README.md) frameworks for unit and integration tests\. When you write your tests, we recommend that you consult the corresponding documentation\.

Testing code with AzTest has three steps: Configure your module for testing, write the tests, and define global environments\.

## Configuring Your Module for Testing<a name="aztest-writing-tests-configuring-your-module-for-testing"></a>

If you want to add tests to a module or a gem that is included with Lumberyard, the configuration has already been done for you and you can skip this step\. If you want to add tests to non\-Lumberyard modules, projects, or tools, then you must configure them to use AzTest\.

All modules and libraries in Lumberyard must be configured for use with Waf\. If you are unfamiliar with configuring build modules in Waf, see [Adding a Build Module](waf-using-module.md) before continuing\.

**To configure your module for Waf**

1. Create a `.waf_files` content file that lists the files for the test\. A separate `.waf_files` content file for test files keeps the test files from being compiled in normal builds\. Your file name should make it clear that it contains only test files\. Existing Lumberyard modules and gems use the naming convention `<module_name>_test.waf_files`\.

   The following example shows a `.waf_files` file for a HelloWorld module\.

   ```
   {
   "none":
       {
           "Tests":
           [
               "HelloWorldTestMain.cpp"
           ]
       }
   }
   ```

   After you create the file, you must reference it in your module's `wscript`\. To specify that the file is intended only for test builds, you must add `test_all_file_list` to the `wscript` configuration, as in the following example\.

   ```
   # HelloWorld wscript
   def build(bld):
   
       bld.CryEngineModule(
           target    = 'HelloWorld',
           vs_filter = 'Engine',
           file_list = 'helloworld.waf_files',
           use       = ['AzCore'],
   
           # Testing
           test_all_file_list = 'helloworld_test.waf_files'
   ```

1. Create a test hook for AZ Test Scanner\. How you create a test hook depends on whether you want to build a dynamic library or an executable file\. Static libraries are not currently supported for testing\.
   + 

**To create a test hook for a dynamic library**  
Because the tests built into a dynamic library are not exposed, you must expose a separate test function for the AZ test scanner\. To expose the test function, use a convenience macro that AzTest provides in a test\-only `*_test.waf_files` file, as in the following example\.

     ```
     // HelloWorldTestMain.cpp
     
     #include <AzTest/AzTest.h>
     
     AZ_UNIT_TEST_HOOK();  // Runs unit tests
     AZ_INTEG_TEST_HOOK(); // Runs integration tests
     ```

     For differences between unit tests and integration tests, see [Creating Unit Tests and Integration Tests](#aztest-writing-tests-creating-unit-and-integration)\.
   + 

**To create a test hook for an executable file**  
To build an executable file, you must expose a test function and modify the main function of the executable to run tests instead of normal program functions\. The test function informs the AZ test scanner that tests have been included in the executable and that it is safe to continue\.

     The following example shows how to modify your main function:

     ```
     // Main.cpp
     
     #if defined(AZ_TESTS_ENABLED)
     #include <AzTest/AzTest.h>
     DECLARE_AZ_UNIT_TEST_MAIN()
     #endif
     
     int main(int argc, char* argv[])
     {
     #if defined(AZ_TESTS_ENABLED)
         INVOKE_AZ_UNIT_TEST_MAIN();
     #endif
     
     // Rest of your program
     
     }
     ```
**Note**  
Because the `AZ_TESTS_ENABLED` definition is defined only in test builds, it is a convenient definition to use in test\-only code\. 

1. If necessary, use the `use` parameter in the `wscript` file to link AzTest to the module\.
**Note**  
In most cases, you do not have to perform this step\. Waf automatically links AzTest in test builds for almost all build modules, including gems\. The `LumberyardApp` build module is not linked automatically\. If you build a Lumberyard app, you must link it manually\.

   As with the `*_test.waf_files` files, you must use AzTest only in a test build\. To specify this when linking, add `test_all_use` to the `wscript` configuration, as in the following example\.

   ```
   # HelloWorld wscript
   def build(bld):
   
       bld.CryEngineModule(
           target    = 'HelloWorld',
           vs_filter = 'Engine',
           file_list = 'helloworld.waf_files',
           use       = ['AzCore'],
   
           # Testing
           test_all_file_list = 'helloworld_test.waf_files',
           test_all_use       = ['AzTest'],
   ```

After you have performed these three steps, you can create a test build and test it with the AZ test scanner\. Your `HelloWorld` library or executable should appear in the report, although at this point it does not have tests\.

## Creating Tests<a name="aztest-writing-tests-creating"></a>

After your module is configured for testing and visible to the AZ test scanner, you can start writing tests for it\. Detailed information about writing tests is available in the GoogleTest and GoogleMock documentation\. The following information describes characteristics specific to AzTest\.

### Creating a Simple Example Test<a name="aztest-writing-tests-creating-simple-example"></a>

When using AzTest to write tests, include only the `AzTest.h` file in your test files instead of GoogleTest and GoogleMock, as in the following example\.

```
// HelloWorldTests.cpp

#include <AzTest/AzTest.h>
#include "HelloWorld.h"

TEST(HelloWorldTests, HelloWorld_ReturnsHelloWorld)
{
    // Call HelloWorld() and compare it to the expected C-string
    ASSERT_STREQ("Hello World!", HelloWorld());
}
```

### Creating Unit Tests and Integration Tests<a name="aztest-writing-tests-creating-unit-and-integration"></a>

Unit tests are designed to be run in isolation\. Unit tests are expected to pass without requiring Lumberyard's engine systems or other assets\. Integration tests are designed to be run with the game engine and have access to the engine's systems or assets\.

To prevent unexpected failures, the different kinds of tests must be kept separate\. Lumberyard does this by providing different hooks for each kind of test\. Declare the tests as unit or integration, and call the AZ test scanner accordingly\.

For tests that do not require fixtures, simply replace the `TEST` macro with `INTEG_TEST`, as in the following example\.

```
// HelloWorldTests.cpp

#include <AzTest/AzTest.h>
#include "HelloWorld.h"

INTEG_TEST(HelloWorldTests, MessageOfTheDay_ReturnsCurrentMessageOfTheDay)
{
    // Call MessageOfTheDay() and compare it to the expected C-string
    // This is an integration test because MessageOfTheDay is stored in a database
    MessageDatabase messageDatabase = HelloWorld::GetTestMessageDatabase();
    ASSERT_STREQ("This is your message for the day!", messageDatabase.MessageOfTheDay());
}
```

For tests that do use fixtures, add the `Integ_` prefix to the fixture name to indicate that it is to be used only for integration tests, as in the following example\.

```
// HelloWorldTests.cpp

class Integ_MessageDatabaseTests : public ::testing::Test
{
protected:
    void SetUp() override
    {
        m_messageDatabase = HelloWorld::GetTestMessageDatabase();
    }

    MessageDatabase m_messageDatabase;
}

TEST_F(Integ_MessageDatabaseTests, MessageOfTheDay_ReturnsCurrentMessageOfTheDay)
{
    ASSERT_STR("This is your message for the day!", messageDatabase.MessageOfTheDay());
}
```

**Note**  
Fixtures cannot be shared between unit and integration tests\. If you want to use the same fixture for both kinds of tests, create a base fixture and subclass for each type of test\.

## Using Global Environments<a name="aztest-writing-tests-global-environments"></a>

It is often useful to create some global variables or mocks for testing the module\. In Lumberyard, this might mean creating memory allocators or a test system environment\. Because AzTest extends the support that GoogleTest provides, you must use the AzTest environments\.

The following example shows how to define an AzTest global environment:

```
// HelloWorldTestMain.cpp

#include <AzTest/AzTest.h>

class HelloWorldEnvironment : public AZ::Test::ITestEnvironment
{
protected:
    void SetupEnvironment() override
    {
        // Environment setup here
    }
    void TeardownEnvironment() override
    {
        // Environment teardown here
    }
}
```

To initialize the environments, use the test hooks that were mentioned previously\. Because the macros are variadic, you can initialize as many environments as you require\. The following example initializes the environment in the previous example\.

```
// HelloWorldTestMain.cpp

#include <AzTest/AzTest.h>

class HelloWorldEnvironment : public AZ::Test::ITestEnvironment
{
protected:
    void SetupEnvironment() override
    {
        // Environment setup here
    }
    void TeardownEnvironment() override
    {
        // Environment teardown here
    }
}

AZ_UNIT_TEST_HOOK(new HelloWorldEnvironment);
```

**Note**  
You must dynamically allocate environments before you use the macro\. This gives you full control over how environments are created at runtime\.  
The order of environments is also significant\. Environments earlier in the list are initialized earlier and removed later\. This is important if a global environment depends on another environment that already exists\.