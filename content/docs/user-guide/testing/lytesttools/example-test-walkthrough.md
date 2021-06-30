---
description: ' Walk through and explanation of the LyTestTools example test. '
title: LyTestTools Example Test Walkthrough
linktitle: LyTestTools Example Test
---

This section walks through an example test using the LyTestTools (LTT) testing package.

## Prerequisites

* Completed [Getting Started](getting-started.md)
* A properly configured [Open 3D Engine build](/docs/user-guide/build/)
* Open the sample test file (`Tools/LyTestTools/tests/example/test_system_example.py`)
* Basic understanding of the [Pytest](https://pytest.org) module

## Importing Dependencies

Import any desired LTT modules from the package `ly_test_tools`. One example test case uses the `log_monitor` module to verify expected output.

```python
import ly_test_tools.log.log_monitor
```

## Logging

Initialize a logger instance to hook all test logs together.

```python
logger = logging.getLogger(__name__)
```

## LyTestTools Fixtures

LTT contains pre-generated Pytest fixtures for test writing. Initialize the `automatic_process_killer` fixture for class `TestSystemExample` to use on each test function. This fixture automatically kills common Open 3D Engine (O3DE) processes before the test function begins to reduce issues caused by improper test cleanup from sequential tests. All LTT fixtures can be found in `Tools/LyTestTools/ly_test_tools/_internal/pytest_plugin/test_tools_fixtures.py`

```python
@pytest.mark.usefixtures("automatic_process_killer")
class TestSystemExample(object):
```

Assign LTT Fixtures to individual test functions by passing them as parameters. The test function `test_SystemTestExample_WindowsPlatform_LaunchEditor` tests the O3DE Editor, so we use the `editor` fixture.

```python
def test_SystemTestExample_WindowsPlatform_LaunchEditor(self, editor):
```

The test launches the O3DE Editor executable and asserts that the process is alive. The `editor` fixture contains its own teardown function to close the O3DE Editor process after the test ends.

```python
def test_SystemTestExample_WindowsPlatform_LaunchEditor(self, editor):
    """
    Tests launching the O3DE Editor is successful with the current build.
    """
    # Launch the O3DE Editor & verify load is successful:
    with editor.start():
        assert editor.is_alive(), ('Editor failed to launch for the current O3DE build.')
```

## Parameterize LyTestTools Fixtures

We can pass parameters to LTT fixtures to override the default values. Pass the `project` parameter to the `editor` fixture to set AutomatedTesting as the project. Pass the `proccesses_to_kill` parameter to the `automatic_process_killer` fixture to kill only the Editor process. Pass the `launcher_platform` parameter to the `editor` fixture to specify this test should only be executed on the Windows platform. Parameters can be set at the class or function level for different scopes. Note that the `processes_to_kill` and `launcher_platform` fixtures are required to be passed to the test function despite not referencing them in the actual test.

```python
# Shared parameters & fixtures for all test methods inside the TestSystemExample class.
@pytest.mark.usefixtures("automatic_process_killer")
@pytest.mark.parametrize('project', ['AutomatedTesting'])
class TestSystemExample(object):

    @pytest.mark.parametrize('processes_to_kill', ['Editor.exe'])
    @pytest.mark.parametrize("launcher_platform", ['windows_editor'])
    def test_SystemTestExample_WindowsPlatform_LaunchEditor(self, editor, processes_to_kill, launcher_platform):
        """
        Tests launching the O3DE Editor is successful with the current build.
        """
        # Launch the O3DE Editor & verify load is successful:
        with editor.start():
            assert editor.is_alive(), (
                'Editor failed to launch for the current O3DE build.')
```

## Defining Custom Fixtures

The next example test case verifies launching the O3DE game client using the Remote Console package `ly_remote_console`. The `remote_console_commands` module sends console messages to either O3DE game launchers or the O3DE Editor. The following code block creates a custom reusable fixture that instantiates a RemoteConsole object and attaches a teardown function.

```python
import ly_remote_console.remote_console_commands as remote_console_commands
.
.
.
@pytest.fixture
def remote_console(request):
    """
    Creates a RemoteConsole() class instance to send console commands to the O3DE client console.
    :param request: _pytest.fixtures.SubRequest class that handles getting a pytest fixture from a pytest function/fixture.
    :return: ly_remote_console.remote_console_commands.RemoteConsole class instance representing the O3DE Remote Console executable.
    """
    # Initialize the RemoteConsole object to send commands to the O3DE client console.
    console = remote_console_commands.RemoteConsole()

    # Custom teardown method for this remote_console fixture.
    def teardown():
        console.stop()

    # Utilize request.addfinalizer() to add custom teardown() methods.
    request.addfinalizer(teardown)  # This pattern must be used in pytest version

    return console
```

Pass the `remote_console` custom fixture and `launcher` LTT fixture to the next test function.

```python
def test_SystemTestExample_AllSupportedPlatforms_LaunchAutomatedTesting(self, launcher, remote_console):
```

Add the `level` parameter to set the level of our `launcher` game client object and the `load_wait` parameter to override a timeout. The test launches the O3DE game launcher executable and the Remote Console executable. The `remote_console` object reads the game client's standard output to verify that an expected string appears. The `expect_log_line` function returns a boolean to assert on the end of the test.

```python
@pytest.mark.parametrize('level', ['simple_jacklocomotion'])
@pytest.mark.parametrize('load_wait', [120])
def test_SystemTestExample_AllSupportedPlatforms_LaunchAutomatedTesting(self, launcher, remote_console, level, load_wait):
    """
    Tests launching the AutomatedTesting then launches the O3DE client &
    loads the "simple_jacklocomotion" level using the remote console.
    """
    # Launch the O3DE client & remote console test case:
    with launcher.start():
        remote_console.start()
        # Wait for the expected log line to appear
        launcher_load = remote_console.expect_log_line(
            match_string='Level system is loading "simple_jacklocomotion"',
            timeout=load_wait)

    # Assert loading was successful using remote console logs:
    assert launcher_load, ('Launcher failed to load O3DE client with the "{level}" level - waited "{load_wait}" seconds.')
```

## Log Monitor Example

The `LogMonitor` object reads log files to verify expected output. The following example verifies output from the log created by LTT. We obtain the path to the logs using `launcher.workspace.info_log_path`. The `launcher` fixture automatically creates the `workspace` fixture, which is an object that emulates the O3DE workspace. More information on the `workspace` object can be found in `Tools/LyTestTools/ly_test_tools/_internal/managers/workspace.py`.

The test launches the game client executable like the previous example. We use the `monitor_for_log_lines` function to verify our `expected_lines` are read from the log and the `unexpected_lines` do not appear in the log. This function returns a boolean to assert on at the end of the test.

```python
@pytest.mark.parametrize('level', ['simple_jacklocomotion'])
@pytest.mark.parametrize('expected_lines', [['Log Monitoring test 1', 'Log Monitoring test 2']])
@pytest.mark.parametrize('unexpected_lines', [['Unexpected test 1', 'Unexpected test 2']])
def test_SystemTestExample_AllSupportedPlatforms_LogMonitoring(self, level, launcher, expected_lines, unexpected_lines):
    """
    Tests that the logging paths created by LyTestTools can be monitored for results using the log monitor.
    """
    # Launch the O3DE client & initialize the log monitor.
    file_to_monitor = launcher.workspace.info_log_path
    log_monitor = ly_test_tools.log.log_monitor.LogMonitor(launcher=launcher, log_file_path=file_to_monitor)

    # Generate log lines to the info log using logger.
    for expected_line in expected_lines:
        logger.info(expected_line)

    # Start the O3DE client & test that the lines we logged can be viewed by the log monitor.
    with launcher.start():
        log_test = log_monitor.monitor_log_for_lines(
            expected_lines=expected_lines,  # Defaults to None.
            unexpected_lines=unexpected_lines,  # Defaults to None.
            halt_on_unexpected=True,  # Defaults to False.
            timeout=60)  # Defaults to 30

        # Assert the log monitor detected expected lines and did not detect any unexpected lines.
        assert log_test, ('Log monitoring failed. Used expected_lines values: {expected_lines} & unexpected_lines values: {unexpected_lines}')
```
