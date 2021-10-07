---
description: ' Use parallel pattern to allow tests to be run in parallel. '
title: Parallel Pattern & Batching Test-Writing
---

## How editor automated tests work

O3DE uses [CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html) to drive all testing across the engine. Python is used for automating the testing of the engine.

A Python automated test consists of two Python interpreter instances:

* **External Python interpreter**: The test driver for the test suite. It is responsible for launching the Editor and providing the tests to run to the embedded interpreter. This instance uses the [pytest](https://docs.pytest.org/) framework and LyTestTools for specifying the tests. LyTestTools is a set of Python tools and utilities that have been written around pytest.
* **Embedded editor Python interpreter** (Hydra): This is an interpreter instance inside the Editor that is provided with bindings to interact with it. This instance is responsible for performing the actual test and is part of the EditorPythonBindings gem. These bindings are commonly known as Hydra.

Upon test completion, the editor will be closed with an exit code depending on the result of the test (0 for success and 0xF for failure - other return codes will be set by the OS if the editor crashed).

Both instances use the same Python executable found in *o3de/python/*

This is the basic flow of a Python test:
![Python Test Flow](images/user-guide/testing/parallel-pattern/automated-editor-test.png)

## Test Structure

Automated tests are composed of:

* **Test Suite**:  A test suite is a list of tests that belong to a specific feature.

```python
    This file will be used by the external Python interpreter to launch the Editor, specifying what test files will be run.

    import pytest
    from ly_test_tools import LAUNCHERS
    from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorSingleTest

    @pytest.mark.SUITE_main # Marks the test suite to be run as MAIN
    @pytest.mark.parametrize("launcher_platform", ['windows_editor']) # This test works on Windows editor
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

* **CMakeLists.txt**: For adding a Python Test Suite into the CI pipeline, it must be registered with CTest via CMakeLists.txt.

```
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

All the O3DE tests must be executed using the AutomatedTesting project and live inside Gem/PythonTests/{MyFeature}

The recommended structure is the following: 
![Folder Structure](images/user-guide/testing/parallel-pattern/folder-structure.png)

* **/**  - The root folder should contain a CMakeLists.txt file and the TestSuites for the feature. A feature must contain one test suite file per type (Smoke/Main/Periodic/Sandbox). These files will only be run by the external Python interpeter.

* **utils/** - Optionally, a utils folder can provide utilities for the TestSuite files, utilities for the specific tests shouldn't be here.

* **tests/** - The test folder will contain the actual tests, these will be run by the O3DE editor's Python embedded interpreter. Inside, more subfolders can exist if needed. These folders must follow snake_case format. Tests must follow FeatureName_TestThatDoesSomething.py format. Anything that is not supposed to be a test (like utilities) must follow UpperCamelCase:
![Tests Folder Structure](images/user-guide/testing/parallel-pattern/tests-folder-structure.png)

It is also advised for cross-test utilities code to live in *o3de/AutomatedTesting/Gem/PythonTests/EditorPythonTestTools/editor_test_tools/*

## Writing a Test

For writing editor automated tests, it is strongly recommended to use the **editor_test.py** utility in LyTestTools. (Found in: *o3de/Tools/LyTestTools/ly_test_tools/o3de/editor_test.py*)

This provides an easy way to write test suites with:
* Minimal code and almost "data-oriented"  specification of tests
* Crash detection
* Custom setup/teardown
* Return code based test execution
* Automatic asset processor life management, shared across multiple tests
* Out-of-the-box batching and parallelization of tests

For this example, we have created an example feature called "MyFeature" with the following folder structure:

![MyFeature Folder Structure](images/user-guide/testing/parallel-pattern/myfeature-folder-structure.png)


### 1 - Test Suite

First we need to create the test suite. Here we will add which tests will be run and their specifications.

It's the first step in our previous diagram:

![Specify Test Suite](images/user-guide/testing/parallel-pattern/specify-test-suite.png)

For specifying a test suite, it's as easy as creating a class that extends from **EditorTestSuite** (which is in *Tools/LyTestTools/ly_test_tools/o3de/editor_test.py*)

Inside of this class we can specify every test by declaring subclasses inside the suite.

```python
import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorSingleTest

@pytest.mark.SUITE_main # Marks the test suite as being part of the Main suite
@pytest.mark.parametrize("launcher_platform", ['windows_editor']) # This test works on Windows editor
@pytest.mark.parametrize("project", ["AutomatedTesting"]) # Use AutomatedTesting project
class TestAutomation(EditorTestSuite):
    
    # Declaring a class that extends from EditorSingleTest declares a single test. 
    class MyFeature_EnterGameModeWorks(EditorSingleTest):
        # This sets the class variable test_module to a be loaded EnterGameWorks.py file, its the minimum requirement for specifying a test
        from .tests import MyFeature_EnterGameModeWorks as test_module

    # Another single test of another subfeature
    class MyFeature_DeletionWorks(EditorSingleTest):
        from .tests import MyFeature_DeletionWorks as test_module
```

**EditorTestSuite** also has configurable parameters, in order to change the parameters, just override the class method/variable:

```python
class TestAutomation(EditorTestSuite):
    # The tests in this suite must run with a renderer
    use_null_renderer = False # Note: Default is True

    class Lightning_PointLightIlluminatesMesh(EditorSingleTest):
        from .tests import Lightning_PointLightIlluminatesMesh as test_module
```

The following settings are available for EditorTestSuite:
    Setting | Description | Default
    :--| :-----| :--
    global_extra_cmdline_args | List of command-line arguments to use for all the tests | ["-BatchMode", "-autotest_mode"]
    use_null_renderer | Whether to use null renderer for all the tests, this is a requirement when running a test on a machine with no GPU | True
    timeout_editor_shared_test | Maximum time that one editor can take to run multiple tests | 180
    get_number_parallel_editors() | Overridable function that returns the maximum number of editors to run at the same time | returns 8

There are also configurable settings per test. These depend on the type of test, as shared tests do not allow some settings.

```python
class TestAutomation(EditorTestSuite):

    # Only this test will use a renderer
    class Lightning_PointLightIlluminatesMesh(EditorSingleTest):
        use_null_renderer = False # Note: Default is None, which means no override from the suite
        from .tests import Lighting_PointLightIlluminatesMesh as test_module
```

The following settings are available for EditorSingleTest:

    Setting | Description | Default
    test_module (**required**) | The test file that this test will run. This setting is mandatory and can be set with

`from .tests import MyTest as test_module` | None
    use_null_renderer | Whether to use null renderer for this specific test, this is a requirement when running a test on a machine with no GPU | []
    timeout | Maximum time in seconds for this test to run | 180
    attach_debugger | Prompts for attaching the debugger when starting the test. This happens at the earliest possible moment when the executable launches. | False
    wait_for_debugger | Waits for a debugger for be attached in order to start the execution | False
    setup(...) | Custom callback that will be called before the test (and the editor) is run | 
    teardown(...) | Custom callback that will be called after the test (and the editor) is finished |  
    wrap_run(...) | This function wraps the runtime of the test. all the code before yielding will run before launching the editor, and the code after yielding will run after closing the editor. | 

wrap_run example:
```python
    @classmethod
    def wrap_run(cls, instance, request, workspace, editor, editor_test_results, launcher_platform):
        print("Before the test")
        yield  # Run Test
        print("After the test")
```
	
### 2 - Editor test

The next step is writing the actual test that the editor will run, as seen in the previous diagrams:

![Write Test Step](images/user-guide/testing/parallel-pattern/write-test-step.png)

As we have seen, Hydra is part of the EditorPythonBindings gem. It provides an embedded Python interpreter with bindings to the editor.

The external Python interpreter tells the editor to run a specific test via cmdline argument.

In order to write a test, the structure is the following:

```python
def MyFeature_MyTest():
    # Test content, an exception or assert will make the test to fail
    # This will drive the test. The Report class is also useful to report different steps/results

if __name__ == "__main__":
    from editor_python_test_tools.utils import Report
    Report.start_test(MyFeature_MyTest)
```

Full Example:
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

## Running your tests

To manually run the tests, you can use the following cmdline from the root o3de directory:

```
python\python.cmd -m pytest --build-directory build\bin\profile .\AutomatedTesting\Gem\PythonTests\MyFeature\TestSuite_Main.py
```

Replace *build\bin\profile* with the location of your binaries. If everything worked correctly you will see the following output:

```
============================================ test session starts ========================================
platform win32 -- Python 3.7.10, pytest-5.3.2, py-1.9.0, pluggy-0.13.1
rootdir: D:\o3de\branch_automation
plugins: mock-2.0.0, timeout-1.3.4, ly-test-tools-1.0.0
collected 2 items

AutomatedTesting\Gem\PythonTests\MyFeature\TestSuite_Main.py ..                                    [100%]
============================================= 2 passed in 39.97s ========================================
```

We can manually add a failure in a test to see how it would behave:

```python
def MyFeature_EnterGameModeWorks():
    assert False, "Testing failure of test"

if __name__ == "__main__":
    from editor_python_test_tools.utils import Report
    Report.start_test(MyFeature_EnterGameModeWorks)
```

Failure output:

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
E               File "d:\o3de\branch_automation\automatedtesting\gem\pythontests\editorpythontesttools\editor_python_test_tools\utils.py", line 166, in start_test
E                 test_function()
E               File "D:/o3de/branch_automation/AutomatedTesting/Gem/PythonTests/MyFeature/tests/MyFeature_EnterGameModeWorks.py", line 18, in MyFeature_EnterGameModeWorks
E                 assert False, "Testing failure of test"
E             AssertionError: Testing failure of test
E           Test result:  FAILURE

...

================================================ 1 failed, 1 passed in 42.24s =====================================================================
```

## Batching and Parallelizing tests overview

The editor Python tests also have support for batching (running multiple tests in a single editor instance) and/or parallel tests (multiple editors at once).

### Batching

In this mode, one single editor is running a batch of tests in the same editor instance. Reducing the time taken opening and closing the editor.

![Batched Tests](images/user-guide/testing/parallel-pattern/batched-tests.png)

### Parallelization

![Parallelization](images/user-guide/testing/parallel-pattern/parallelization.png)

In this mode, multiple editors are running one test each, thus parallelizing the test execution.

There is a maximum number of editors that will be spawned which can be set by the user, once that limit is reached, the remaining tests will wait until there is a spot available.

### Batching + Parallelization (AKA: Shared tests)
![Parallel And Batch](images/user-guide/testing/parallel-pattern/parallel-and-batch.png)

The result of combining the two previous modes is multiple editors running a batch of tests each. This is the best of both worlds, running tests in parallel and reducing the startup/teardown time.

This is also called a "Shared Test" in the automation framework.

Note that which tests go to which editor is arbitrary.

### Mixing tests

Parallel, Batched or Shared tests can be mixed together in the same test suite. Because of this, each group of tests will be executed sequentially based on their mode:

![Mixing Tests](images/user-guide/testing/parallel-pattern/mixing-tests.png)

## Batching and Parallelizing your tests

In order to use any of these modes, the only needed change in the tests is to modify the parent test class in your test suite.

If we want to make the tests in the previous example batched, we would just replace **EditorSingleTest** with **EditorBatchedTest**:

```python
import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorBatchedTest

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
```

Similarly, we can use **EditorParallelTest** for parallelizing the tests

```python
import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorParallelTest

@pytest.mark.SUITE_main
@pytest.mark.parametrize("launcher_platform", ['windows_editor'])
@pytest.mark.parametrize("project", ["AutomatedTesting"])
class TestAutomation(EditorTestSuite):
    
    # This test will be run in an editor parallel along with other tests
    class MyFeature_EnterGameModeWorks(EditorParallelTest):
        from .tests import MyFeature_EnterGameModeWorks as test_module

    # This test will be run in another editor in parallel
    class MyFeature_DeletionWorks(EditorParallelTest):
        from .tests import MyFeature_DeletionWorks as test_module
```

And **EditorSharedTest** for both parallel and batched:

```python
import pytest
from ly_test_tools import LAUNCHERS
from ly_test_tools.o3de.editor_test import EditorTestSuite, EditorSharedTest

@pytest.mark.SUITE_main
@pytest.mark.parametrize("launcher_platform", ['windows_editor'])
@pytest.mark.parametrize("project", ["AutomatedTesting"])
class TestAutomation(EditorTestSuite):
    
    # This test will be batched and parallelized within the elements in the same suite
    class MyFeature_EnterGameModeWorks(EditorSharedTest):
        from .tests import MyFeature_EnterGameModeWorks as test_module

    # This test will be also be batched and parallelized
    class MyFeature_DeletionWorks(EditorSharedTest):
        from .tests import MyFeature_DeletionWorks as test_module
```

You can now try to run the tests with **EditorSharedTest** and observe the difference in time:
* Single: 42.24s
* Shared: 24.28s

The more tests are together in the same suite, the bigger the opportunity to achieve an overall time saving.

The following class settings are available to be set per test for Parallel, Batched and Shared tests:

    Setting | Description | Default
    test_module (**required**) | Required, test module that this test will execute | ["-BatchMode", "-autotest_mode"]
    timeout | Maximum time that one editor can take to run multiple tests | 180
    attach_debugger | Prompts for attaching the debugger when starting the editor, note that this will attach the debugger at the start the editor instance, even if this not the first test in the batch | False
    wait_for_debugger | Waits for a debugger for be attached in order to start the execution. Same conditions as attach_debugger apply | False

As you can see, these tests do not support custom setup/teardown callbacks.

### Considerations for enabling batching/parallelization

You must careful when choosing any of batch/parallelization options for your tests. Make sure that your test is atomic and that it doesn't modify any shared state in the editor.

If you have tests that require any setup/teardown steps **before starting the editor** or **after closing the edtior** that affects common files, it may not be possible to parallelize or batch.

An example of a test that can be batched, but not parallelized:

* A physics test that makes a modification to the project wide material library at the start and restores to the default setting when finishing.
* Explanation: If there are other physics tests that rely on the material library, if they are run in parallel, they will potentially fail due to different values.

In general, tests that require interacting with I/O may have these problems. As a general rule, it's better to make your test do changes in memory rather than on disk.

### Cmdline settings for batching/parallelization

It's possible to override the parallelization/batching of test behavior via command line arguments passed to pytest:

* --no-editor-parallel: Don't run tests in parallel, this will mean that parallel tests will become serial tests and shared tests will become batched.
* --no-editor-batch: Don't batch tests, this will make all tests run in a single editor. Shared tests will become parallel. Combining both the above cmdline arguments will disable both parallel and batching options for the tests
* --editor-parallel: Overrides the number of maximum editors run in parallel, setting this option to 1 is equivalent to --no-editor-parallel

## Best practices

* **Don’t create a level unless necessary**, use an already existing empty level and don’t save the changes once the test is over.
* The editor test **must be self-contained** when possible. No external tools should determine if the test has passed or failed. Instead, the editor must do this work and/or invoke these tools/scripts. Use the app return code as result of the test (0x0 for success and 0xF for failure).
* **Don’t read the editor log file directly** to know if the test has succeeded or failed. If you need to read console logs, errors, warnings, asserts, or anything else use DebugTraceBus and Tracer utilities instead. This EBus is able to capture any of these, without having to create an I/O dependency on a file.
```python
    with Tracer() as section_tracer:
        # Do stuff

    # section_tracer now contains all prints,errors and warnings that happened inside the block
    if section_tracer.has_errors:
         assert False, “AZ_Errors happened during execution”
```
* Make sure that your **test is always deterministic**. The application will run at different FPS and take different amounts of time time loading assets. When running the test make sure it is deterministic with these conditions.
* **Prefer to wait for a given condition instead of waiting for an arbitrary time**. Sometimes for writing a test, it's required to do an action and wait for a time until the action is finished. For optimizing the amount time that your test will run, wait for a condition instead of arbitrary time:
```python
    ### BAD ###
    enable_gravity()
    # Wait 5 seconds for the entity to fall
    idle_wait(5.0)
    if entity.position.y >= 0:
         assert False, “Entity didn’t fall”


    ### GOOD ###
    enable_gravity()
    def has_fallen():
         return entity.position.y < 0
    # Wait for the entity to fall, a maximum time of 5 seconds
    # has_fallen() will be called in every frame as long it returns False
    helper.wait_for_condition(has_fallen, 5.0)
    if entity.position.y >= 0:
         assert False, “Entity didn’t fall”
```
* **Use thresholds** when doing comparisons, especially for float values. Vector and other math constructs have utility functions for this.
```python
    ### BAD ###
    if entity.position != azlmbr.math.Vector3(50.0, 50.0, 50.0):
         assert False, “Entity is not in correct position”

    ### GOOD ###
    if not entity.position.IsClose(azlmbr.math.Vector3(50.0, 50.0, 50.0)):
         assert False, “Entity is not in correct position”
```

## Debugging tests

When developing a test, it can be time consuming to launch the editor every time to verify the test.

One trick is to open the editor normally and use the following console command to run the Python test:

```powershell
pyRunFile ../../Gem/PythonTests/MyFeature/tests/MyFeature_EnterGameModeWorks.py
```

If you need to attach the debugger when running the test (for example for debugging crashes or code paths) you can use the following utilities:

* **Wait for debugger**: you can make your test use the command line argument `--wait-for-debugger`. This will pause the application at the earliest moment of execution and resume at the moment a debugger is attached. You can also use `wait_for_debugger=True` configuration in your editor test specification or `general.wait_for_debugger()` in your script.
* **Attach debugger**: Similarly you can use the `--attach-debugger` cmdline argument for a prompt to attach the debugger to your test. `attach_debugger=True` is also available for the test specification and `general.attach_debugger()`