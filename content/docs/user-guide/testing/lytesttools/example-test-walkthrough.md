---
description: ' Walk through and explanation of the LyTestTools example test. '
title: LyTestTools Example Test Walkthrough
linktitle: LyTestTools Example Test
---

This section walks through an example test using the LyTestTools (LTT) testing package.

## Prerequisites

* Completed [Getting Started](getting-started.md)
* A properly configured [Open 3D Engine build](/docs/user-guide/build/)
* Open the sample test file (`Tools/LyTestTools/tests/integ/sanity_tests.py`)
* Basic understanding of the [Pytest](https://pytest.org) module

## Importing Dependencies

Import any desired LTT modules from the package `ly_test_tools`. All LTT modules can be viewed at `Tools/LyTestTools/ly_test_tools`. The `launchers.launcher_helper` module helps create Launcher objects which control the Open 3D Engine (O3DE) Editor and game clients. The `builtin.helpers` module helps create the Workspace object, which controls the testing workspace in LTT. The `environment` module contains tools that involve the system's environment such as processes or timed waiters.

```python
import logging
import pytest

import ly_test_tools
import ly_test_tools.launchers.launcher_helper as launcher_helper
import ly_test_tools.builtin.helpers as helpers
import ly_test_tools.environment.process_utils as process_utils
import ly_test_tools.environment.waiter as waiter
```

## Logging

Initialize a logger instance to hook all test logs together. The sub-logger pattern below makes it easy to track which file creates a log line.

```python
logger = logging.getLogger(__name__)
```

## Test Structure

We first define the class `TestAutomatedTestingProject` to group test functions together. The example test contains two test functions: `test_StartGameLauncher_Sanity` and `test_StartEditor_Sanity`.

```python
class TestAutomatedTestingProject(object):

    def test_StartGameLauncher_Sanity(self):
        ...

    def test_StartEditor_Sanity(self):
        ...
```

## Test Parameterization

The example test utilizes Pytest parameterization. The following sets the `project` parameter to `AutomatedTesting` for both test functions. Notice that the Pytest mark is defined at the class level to affect both test functions.

```python
@pytest.mark.parametrize("project", ["AutomatedTesting"])
class TestAutomatedTestingProject(object):

    def test_StartGameLauncher_Sanity(self, project):
        ...

    def test_StartEditor_Sanity(self, project):
        ...
```

## Test Function: test_StartGameLauncher_Sanity

The `test_StartGameLauncher_Sanity` test function verifies that the O3DE game client launches successfully. We start the test by utilizing the `kill_processes_named` function to close any open O3DE proceesses that may interfere with the test. The Workspace object emulates the O3DE package by locating the engine and project directories. The Launcher object controls the O3DE game client and requires a Workspace object for initialization. Add the `-NullRenderer` arg to the executable call to disable GPU rendering. This allows the test to run on instances without a GPU. We launch the game client executable and wait for the process to exist. A try/finally block ensures proper test cleanup if issues occur during the test.

```python
def test_StartGameLauncher_Sanity(self, project):
    process_utils.kill_processes_named(names=process_utils.LY_PROCESS_KILL_LIST, ignore_extensions=True)

    try:
        workspace = helpers.create_builtin_workspace(project=project)

        launcher = launcher_helper.create_launcher(workspace)
        launcher.args.extend(['-NullRenderer'])

        with launcher.start():
            waiter.wait_for(lambda: process_utils.process_exists(f"{project}.GameLauncher.exe", ignore_extensions=True))
    finally:
        process_utils.kill_processes_named(names=process_utils.LY_PROCESS_KILL_LIST, ignore_extensions=True)
```

## Test Function: test_StartEditor_Sanity

The `test_StartEditor_Sanity` test function is similar to the previous example with minor adjustments. A Pytest mark skips the test if the operating system is not Windows. We use the `create_editor` function instead of `create_launcher` to create an Editor type launcher instead of a game client type launcher. The additional `-autotest_mode` arg supresses modal dialogs from interfering with our test. We launch the Editor executable and wait for the process to exist.

```python
@pytest.mark.skipif(not ly_test_tools.WINDOWS, reason="Editor currently only functions on Windows")
def test_StartEditor_Sanity(self, project):
    process_utils.kill_processes_named(names=process_utils.LY_PROCESS_KILL_LIST, ignore_extensions=True)

    try:
        workspace = helpers.create_builtin_workspace(project=project)

        editor = launcher_helper.create_editor(workspace)
        editor.args.extend(['-NullRenderer', '-autotest_mode'])

        with editor.start():
            waiter.wait_for(lambda: process_utils.process_exists("Editor", ignore_extensions=True))
    finally:
        process_utils.kill_processes_named(names=process_utils.LY_PROCESS_KILL_LIST, ignore_extensions=True)
```
