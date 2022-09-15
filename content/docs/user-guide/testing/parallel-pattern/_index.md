---
description: Use parallel patterns to allow tests to be run in parallel in Open 3D Engine (O3DE).
title: Parallel Pattern & Batching Test-Writing
linkTitle: Parallel Tests
---

## How editor automated tests work

**Open 3D Engine (O3DE)** uses [CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html) to drive all testing across the engine. Python is used for automating engine testing.

A Python automated test uses two Python interpreter instances:

* **External Python interpreter**: The test driver for the test suite. The external interpreter is responsible for launching **O3DE Editor** and providing the tests to run in the embedded interpreter. This instance uses the [pytest](https://docs.pytest.org/) framework and LyTestTools for specifying the tests. LyTestTools is a set of Python tools and utilities that have been written around pytest.
* **Embedded editor Python interpreter** : An interpreter instance inside O3DE Editor with bindings to drive editor activities and get feedback. This instance is responsible for performing the actual test and is part of the Editor Python Bindings Gem.

Upon test completion, O3DE Editor will close with an exit code depending on the result of the test, `0` for success and `0xF` for failure. Other return codes will be set by the OS if O3DE Editor crashes during a test.

Both instances use the same Python executable found in `o3de/python/`. 

This is the basic flow of a Python test:
![Python Test Flow](/images/user-guide/testing/parallel-pattern/automated-editor-test.png)

## Test structure

Automated tests are composed of:

* **Test suite**:  A collection of tests, targeting a specific feature. Test classes must inherit from `EditorTestSuite`.

```python
# This file will be used by the external Python interpreter to launch O3DE Editor, specifying what test files will be run.

import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorSingleTest

@pytest.mark.parametrize("launcher_platform", ['windows_editor']) # This test works on Windows version of O3DE Editor
@pytest.mark.parametrize("project", ["AutomatedTesting"]) # Use AutomatedTesting project
class TestAutomation(EditorTestSuite):
    class Check_EnterGameMode_test(EditorSingleTest):
        from .tests import MyFeature_CheckEnterGameMode as test_module
```

* **Individual test**: This is an actual Python test that the editor will run.

```python
from editor_python_test_tools.utils import Report

def MyFeature_CheckEnterGameMode():
    # azlmbr contains everything that has been exposed to o3de Python bindings
    import azlmbr
    import azlmbr.legacy.general as general
    # 1) Open an empty level
    general.open_level_no_prompt("EmptyLevel")
    # 2) Enter game mode
    general.enter_game_mode()
    # 3) Execute a frame and then check that we entered into game mode successfully
    general.idle_wait_frames(1)
    assert general.is_in_game_mode(), "Couldn't enter into game mode"

if __name__ == "__main__":
    Report.start_test(MyFeature_CheckEnterGameMode)
```

* **CMake configuration file**: To add a Python test suite into the CI pipeline, it must be registered with CTest via a `CMakeLists.txt` file.

```
    # PAL_TRAIT_BUILD macros are used by platform detection.
    if(PAL_TRAIT_BUILD_TESTS_SUPPORTED AND PAL_TRAIT_BUILD_HOST_TOOLS)
        ly_add_pytest(
            NAME AutomatedTesting::MyFeature_Main
            TEST_SUITE main
            TEST_SERIAL
            PATH ${CMAKE_CURRENT_LIST_DIR}/TestSuite_Main.py
            RUNTIME_DEPENDENCIES
                Legacy::Editor
                AZ::AssetProcessor
                AutomatedTesting.Assets
            COMPONENT
                MyFeature
        )
    endif()
```

All O3DE tests must be executed using the `AutomatedTesting` project and are located inside of the `Gem/PythonTests/<Feature>` directory.

The recommended structure is the following: 

![Folder Structure](/images/user-guide/testing/parallel-pattern/folder-structure.png)

* **/**  - The root folder of the tests should contain a `CMakeLists.txt` file and the test suites for the feature. A feature must contain one test suite file per type (Smoke, Main, Periodic, and Sandbox). These files will only be run by the external Python interpreter.

* **utils/** (Optional) - A `utils` directory provides utilities common to multiple tests for the `TestSuite` files. Utilities for specific tests should be part of their test files.
  
    {{< note >}}
For tools used across multiple suites, across features, or otherwise shared among the whole test infrastructure, place your utilities in the `Gem/PythonTests/EditorPythonTestTools/editor_test_tools/` directory of the `AutomatedTesting` project.
{{< /note >}}

* **tests/** - The `tests` directory contains the tests themselves that are run with O3DE Editor's Python embedded interpreter. Test names must follow the pattern `<FeatureName>_<TestThatDoesSomething>.py` format. Anything that is not supposed to be a test (like utilities) must follow `UpperCamelCase`, as in the following example.
  
  ![Tests Folder Structure](/images/user-guide/testing/parallel-pattern/tests-folder-structure.png)
  
  Subdirectories can be used to organize tests. These directories must follow `snake_case` format to be picked up by the `AutomatedTesting` project.  

## Writing an automated test

For writing automated tests, it is strongly recommended to use the **editor_test.py** utility offered as part of `LyTestTools`, located at `o3de/Tools/LyTestTools/ly_test_tools/o3de/editor_test.py`.

Using `editor_test.py` to write your tests provides an easy way to write suites with:
* Minimal code and almost "data-oriented" specification of tests
* Crash detection
* Custom setup/teardown
* Return code based test execution
* Automatic **Asset Processor** life management, shared across multiple tests
* Out-of-the-box batching and parallelization of tests

The following example demonstrates the directory structure for an example feature called `MyFeature`:

![MyFeature Folder Structure](/images/user-guide/testing/parallel-pattern/myfeature-folder-structure.png)


### Create a test suite

First, create the test suite. The test suite contains instructions on which tests to run, and their parameters.

![Specify Test Suite](/images/user-guide/testing/parallel-pattern/specify-test-suite.png)

Each test suite requires a main suite class which inherits from `EditorTestSuite`, contained in the `Tools/LyTestTools/ly_test_tools/o3de/editor_test.py` directory. Inside the suite's main class, you declare subclasses inheriting from `EditorSingleTest` and load test modules from the individual tests to run in the embedded interpreter.

```python
import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorSingleTest

@pytest.mark.SUITE_main # Marks the test suite as being part of a Main test suite
@pytest.mark.parametrize("launcher_platform", ['windows_editor']) # This test works on Windows editor
@pytest.mark.parametrize("project", ["AutomatedTesting"]) # Use the AutomatedTesting project
class TestAutomation(EditorTestSuite):
    
    # Declaring a class that extends from EditorSingleTest declares a single test. 
    class MyFeature_EnterGameModeWorks(EditorSingleTest):
        # This sets the class variable test_module to be loaded into a `EnterGameWorks.py` file, run by the Editor as a test.
        from .tests import MyFeature_EnterGameModeWorks as test_module

    # Another single test of another subfeature
    class MyFeature_DeletionWorks(EditorSingleTest):
        from .tests import MyFeature_DeletionWorks as test_module
```

The `EditorTestSuite` also provides configurable parameters for its tests. Override the appropriate method or variable in the test suite class:

```python
class TestAutomation(EditorTestSuite):
    # The tests in this suite must run with a renderer
    use_null_renderer = False # Note: Default is True

    class Lightning_PointLightIlluminatesMesh(EditorSingleTest):
        from .tests import Lightning_PointLightIlluminatesMesh as test_module
```

The following settings are available for `EditorTestSuite`:

| Setting | Description | Default |
|-|-|-|
| `global_extra_cmdline_args` | List of command-line arguments to use for all suite tests. | `["-BatchMode", "-autotest_mode"]` |
| `use_null_renderer` | Whether or not to use a null renderer for the tests. Null renderers are required on machines with no GPU. | `True` |
| `timeout_editor_shared_test` | Maximum time that one O3DE Editor instance can take to run multiple tests, in seconds. | `180` |
| `get_number_parallel_editors()` | Overridable function that returns the maximum number of O3DE Editor instances to run at the same time. | Lambda: `8` |

There are also configurable settings per test. These depend on the type of test, as shared tests do not allow some settings.

```python
class TestAutomation(EditorTestSuite):

    # Only this test will use a renderer
    class Lightning_PointLightIlluminatesMesh(EditorSingleTest):
        use_null_renderer = False # Note: Default is None, which means no override from the suite
        from .tests import Lighting_PointLightIlluminatesMesh as test_module
```


The following settings are available for `EditorSingleTest`:

| Setting | Description | Default |
|-|-|-|
| `test_module` (**required**) | The test file that this test will run. This setting is mandatory and can be set with `from .tests import <MyTest> as test_module`. | `None` |
| `use_null_renderer` | Whether to use null renderer for this specific test. Using a null renderer is a requirement when running a test on a machine with no GPU. | `True` |
| `timeout` | Maximum time in seconds for this test to run, in seconds. | `180` | 
| `attach_debugger` | Prompts for attaching the debugger when starting the test. This happens at the earliest possible moment when the executable launches. | `False` | 
| `wait_for_debugger` | Waits for a debugger for be attached in order to start the execution. | `False` | 
| `setup()` | Custom callback that will be called before O3DE Editor is launched and loads the test. | `None` |
| `teardown()` | Custom callback that will be called after O3DE Editor finishes running the test. | `None` |
| `wrap_run()` | This function wraps the runtime of the test. All the code before yielding will run before launching O3DE Editor, and the code after yielding will run after closing O3DE Editor. | `None` |

`wrap_run` example:
```python
@classmethod
def wrap_run(cls, instance, request, workspace, editor, editor_test_results, launcher_platform):
    print("Before the test")
    yield  # Run Test
    print("After the test")
```
	
### Write individual editor tests

The next step is writing the tests which will run in O3DE Editor. O3DE Editor's internal Python runtime is started and loads a test specified as a command-line argument.

![Write Test Step](/images/user-guide/testing/parallel-pattern/write-test-step.png)

Tests are structured in the following way:

```python
def MyFeature_MyTest():
    # Test content, an exception or assert will make the test to fail
    # This will drive the test. The Report class is also useful to report different steps/results

if __name__ == "__main__":
    from editor_python_test_tools.utils import Report
    Report.start_test(MyFeature_MyTest)
```

A full example of how to structure a test that runs in O3DE Editor:

```python
# Test Case Title : Check that entering into gamemode works

# List of results that we want to check, this is not 100% necessary but its a good
# practice to make it easier to debug tests.
# Here we define a tuple of tests 
class Results():
    enter_game_mode          = ("Entered game mode",        "Failed to enter game mode")

def MyFeature_EnterGameModeWorks():
    # A description of the test is always very helpful.
    # Description: This test checks that entering into gamemode works by openning an empty level
    # and entering into the gamemode. The is in gamemode state should be changed after doing it

    # Import report and test helper utilities
    from editor_python_test_tools.utils import Report
    from editor_python_test_tools.utils import TestHelper as helper
    # All exposed python bindings are in azlmbr
    import azlmbr.legacy.general as general

    # Required for automated tests
    helper.init_idle()

    # Open the level called "Base".
    # This level is an empty level where we can run automated tests to avoid creating one
    helper.open_level(level="Base")

    # Using the exposed Python API from editor in CryEditPy.py we can enter into gamemode this way
    general.enter_game_mode()

    # The script drives the execution of the test, to return the flow back to the editor,
    # we will tick it one time
    general.idle_wait_frames(1)

    # Now we can use the Report.result() to report the state of a result
    # if the second argument is false, it will mark this test as failed, however it will keep going.
    Report.result(Results.enter_game_mode, general.is_in_game_mode())

    # Instead of using Report.result(), you can also use:
    # assert is_in_game_mode, "Didn't enter into gamemode"
    # However this would stop the test at this point and not report anything when it succeeds

    # The test will end at this point, is good practice to exit gamemode or reset any changed stated
    # *DO NOT* close the editor, the editor will close automatically and report the error code
    general.exit_game_mode()

if __name__ == "__main__":
    # This utility starts up the test and sets up the state for knowing what test is currently being run
    from editor_python_test_tools.utils import Report
    Report.start_test(MyFeature_EnterGameModeWorks)
```

## Running tests

To manually run tests, use the following command from the root O3DE directory:

```cmd
python\python.cmd -m pytest --build-directory <directory containing bin/ from build> .\AutomatedTesting\Gem\PythonTests\MyFeature\TestSuite_Main.py
```

If everything works correctly, the test run will show the following results:

```
============================================ test session starts ========================================
platform win32 -- Python 3.10.5, pytest-6.2.5, py-1.11.0, pluggy-0.13.1
rootdir: <O3DE root dir>
plugins: mock-2.0.0, timeout-1.3.4, ly-test-tools-1.0.0
collected 2 items

AutomatedTesting\Gem\PythonTests\MyFeature\TestSuite_Main.py ..                                    [100%]
============================================= 2 passed in 39.97s ========================================
```



If a test fails, an error diagnostic is printed including a traceback of the failing test and the reasons for its failure. For example, the following represents a small failing test:

```python
def MyFeature_EnterGameModeWorks():
    assert False, "Testing failure of test"
if __name__ == "__main__":
    from editor_python_test_tools.utils import Report
    Report.start_test(MyFeature_EnterGameModeWorks)
```

When this test is run, it generates the following error output on failure:

```
           Failed: Test MyFeature_EnterGameModeWorks:
E           Test FAILED
E           ------------
E           |  Output  |
E           ------------
E           Starting test MyFeature_EnterGameModeWorks...
E           Test MyFeature_EnterGameModeWorks finished.
E           Report:
E           EXCEPTION raised:
E             Traceback (most recent call last):
E               File "<O3DE root>\automatedtesting\gem\pythontests\editorpythontesttools\editor_python_test_tools\utils.py", line 166, in start_test
E                 test_function()
E               File "<O3DE root>/AutomatedTesting/Gem/PythonTests/MyFeature/tests/MyFeature_EnterGameModeWorks.py", line 18, in MyFeature_EnterGameModeWorks
E                 assert False, "Testing failure of test"
E             AssertionError: Testing failure of test
E           Test result:  FAILURE
```

## Batch and parallelize tests

The tests which run in O3DE Editor have support for **batched** and **parallel** tests. Batched tests are collections of tests which can run together in a single O3DE Editor instance, and parallel tests launch multiple editors. A test can be both part of a batch, and run in parallel.

### Batched tests

In batched mode, one single O3DE Editor instance runs a batch of tests. Batching tests reduces the time taken to launch and close Editors to run tests.

![Batched Tests](/images/user-guide/testing/parallel-pattern/batched-tests.png)

### Parallel tests

In parallel mode, multiple Editors launch at once to run one test each. You can set the maximum number of allowed editor instances.  If the maximum is reached, when an instance closes, a new O3DE Editor instance is launched.

![Parallel tests](/images/user-guide/testing/parallel-pattern/parallelization.png)

### Parallel batched tests

Tests can also be run in parallel batches, also called **shared tests**. Shared tests should be used when tests can run in the same O3DE Editor instance without relying on effects of any other test (batched mode) and with multiple independent editors running their each individual batch (parallel mode). When possible, tests should be made as shared tests in order to take advantage of the performance improvements offered by maximizing parallelization.

![Parallel And Batch](/images/user-guide/testing/parallel-pattern/parallel-and-batch.png)

{{< note >}}
In this mode, batches are arbitrarily assigned to O3DE Editor instances.
{{< /note >}}

### Mixed test modes

Parallel, batched, and shared tests can be mixed together in the same test suite. Because of this, each group of tests is run sequentially based on their mode:

![Mixing Tests](/images/user-guide/testing/parallel-pattern/mixing-tests.png)

## Enabling batching and parallelization

In order to use any of these modes, the only necessary change is to modify the class that loads and runs each test. Use the `EditorBatchedTest`, `EditorParallelTest`, and `EditorSharedTest` superclasses in place of `EditorSingleTest`.

The following example demonstrates the use of these classes:

```python
import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorBatchedTest, EditorParallelTest, EditorSharedTest

@pytest.mark.SUITE_main
@pytest.mark.parametrize("launcher_platform", ['windows_editor'])
@pytest.mark.parametrize("project", ["AutomatedTesting"])
class TestAutomation(EditorTestSuite):
    
    # This test will be batched in the same editor
    class MyFeature_EnterGameModeWorks(EditorBatchedTest):
        from .tests import MyFeature_EnterGameModeWorks as test_module

    # This test will be batched along with the previous one in the same editor
    class MyFeature_DeletionWorks(EditorBatchedTest):
        from .tests import MyFeature_DeletionWorks as test_module
        
    # The following two tests will be run in individual editor instances at the same time.
    class MyFeature_ParallelTest1(EditorParallelTest):
        from .tests import MyFeature_ParallelTest1 as test_module
    
    class MyFeature_ParallelTest2(EditorParallelTest):
        from .tests import MyFeature_ParallelTest2 as test_module
    
    # This test will be launched along with other shared tests in a parallel fashion,
    # but may run in the same editor as other tests in any order.
    # MyFeature_FeatureToggleWorks(EditorSharedTest):
        from .tests import MyFeature_FeatureToggleWorks as test_module
```

{{< important >}}
`EditorBatchedTest`, `EditorParallelTest`, and `EditorSharedTest` have the same class variables as `EditorSingleTest`, but **don't** offer any method overrides. Batched, parallel, and shared tests cannot use `setup()`, `teardown()`, or `wrap_run()`.
{{< /important >}}

### When to enable batching or parallelization

Be careful when placing a test in a batch, parallel, or shared pool! All tests should be atomic and not modify Editor state in ways which would interfere with _other_ tests that may run in the same Editor. 

Due to the lack of support for setup, teardown, or test wrapping in batch, parallel, and shared tests, avoid placing any tests that rely on this support into a shared pool. 

An example of a test which could be batched, but not run in parallel, is a physics test that makes a modification to the project wide physics configuration at the start and restores to the default setting when finishing. By changing the state of a resource shared between O3DE Editor instances (in disk storage), it could cause parallel tests to fail.

In general, tests that require interacting with I/O may have these problems. As a general rule, it's better to make your test do changes in memory rather than on disk.

### Command-line settings to configure test modes

Certain test modes can be disabled or managed through command-line options:

* `--no-editor-parallel`: Don't run tests in parallel. Parallel tests will become serial tests and shared tests will become batched.
* `--no-editor-batch`: Don't batch tests. All tests run in a single O3DE Editor instance. Shared tests will become parallel, or if parallel tests are also disabled, shared tests become serial.
* `--editor-parallel`: Overrides the number of maximum O3DE Editor instances to run in parallel. Setting this option to `1` is equivalent to `--no-editor-parallel`.

## Best practices

* **Don’t create a level unless necessary**. Use an existing empty level and don’t save the changes when the test is over.
* **Tests should be self-contained**. No external tools should determine if the test has passed or failed. Instead, O3DE Editor should do this work. Use the one of the editor's return codes as result of the test, `0x0` for success and `0xF` for failure.
* **Don’t read the O3DE Editor log file directly**. To read O3DE Editor log information, use the `DebugTraceBus` and `Tracer` utilities. The `DebugTraceBus` is able to capture all logged information, without needing to create an I/O dependency on a file.
    
```python
with Tracer() as section_tracer:
    # Do stuff

# section_tracer now contains all prints,errors and warnings that happened inside the block
if section_tracer.has_errors:
        assert False, "AZ_Errors happened during execution"
```
* **Tests must be deterministic**. The application will run at different framerates and take different amounts of time to load assets. Ensure tests are deterministic under these conditions.
* **Wait on conditions instead of waiting for time.** Some tests require performing an action and waiting for completion. To optimize the amount of time your test runs, and avoid false negatives caused by timeouts, wait on a condition instead of a set time:

```python
### BAD ###
enable_gravity()
# Wait 5 seconds for the entity to fall
idle_wait(5.0)
if entity.position.y >= 0:
        assert False, "Entity didn't fall"

### GOOD ###
enable_gravity()
def has_fallen():
        return entity.position.y < 0
# Wait for the entity to fall, a maximum time of 5 seconds
# has_fallen() will be called in every frame as long it returns False
helper.wait_for_condition(has_fallen, 5.0)
if entity.position.y >= 0:
        assert False, "Entity didn't fall"
```

* **Compare values within ranges.** Using ranges for values rather than equality, especially for float values, makes tests more likely to succeed. Vector and other math constructs have utility functions for detecting values within a specific range.

```python
### BAD ###
if entity.position != azlmbr.math.Vector3(50.0, 50.0, 50.0):
        assert False, "Entity is not in correct position"

### GOOD ###
if not entity.position.IsClose(azlmbr.math.Vector3(50.0, 50.0, 50.0)):
        assert False, "Entity is not in correct position"
```

## Debugging tests

During test development, it can be time-consuming to launch O3DE Editor on a test-by-test basis. Instead, you can launch O3DE Editor normally and then use the `pyRunFile` command from **Console**:

```cmd
pyRunFile ../../Gem/PythonTests/<MyFeature>/tests/<MyFeature>_<TestName>.py
```

To attach a debugger to a running test, use one of the following utilities:

* **Wait for debugger**: Use the command-line argument `--wait-for-debugger` when launching O3DE Editor to run a test. This argument pauses O3DE Editor at the earliest moment of execution and resumes the moment a debugger is attached. This behavior can also be controlled with the  `wait_for_debugger` variable in an editor test specification, or forced by calling `general.wait_for_debugger()`.
* **Attach debugger**: Use the command-line argument `--attach-debugger` to force an immediate prompt to attach a debugger to a test. This behavior can also be controlled with the `attach_debugger` variable in an editor test specification, or forced by calling `general.attach_debugger()`.