---
description: ' Follow these steps to write your first test in LyTestTools. '
title: My First Test
---

This guide will walk you through writing your first test with LyTestTools.

## Prerequisites ##

+ [Getting Started](/docs/user-guide/testing/lytesttools/getting-started)

## Example Test Code ##

We will be using an example test file to help familiarize you with the code, how its written, and how to utilize LyTestTools in writing test cases. Most of this guide will be driven by the provided example test and explore extra configuration options and setups for your tests. This example test file is located located in the following directory as part of your Open 3D Engine build:

```shell
~/Tools/LyTestTools/tests/example/tests/test_system_example.py
```

Helper functions and other useful code that you will see referenced can be found in the test_lib folder. You should also review these here:

```shell
~/Tools/LyTestTools/tests/example/test_lib/
```

If everything was built correctly, run the example test using the following command inside of your development path. Remember, we want to target Windows for our test even though it could support any platform:

```shell
Tools\Python\python3.cmd -m pytest Tools\LyTestTools\tests\example\tests\test_system_example.py --build-directory [path_to_build_output]
```

## Breakdown of test_system_example.py ##

Each test has specific goals that it will try and accomplish.

The goal of the provided test_system_example.py test will be to:

 1. Support tests for any platform that the current system supports.
 2. Target the Windows platform using the "–platform" CLI argument when using the test command.
 3. Target the specific test:  test_SystemTestExample_AllSupportedPlatforms_LaunchSamplesProject
 4. The command to target the specific test using the correct platform will look similar to this:

```shell
    Tools\Python\python3.cmd -m pytest Tools\LyTestTools\tests\example\tests\test_system_example.py --build-directory [path_to_build_output]
```

 5. The test will then configure, launch the "SamplesProject", and load the "simple_jacklocomotion" map. The result will look similiar to the output below when it runs successfully:

```shell
    E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev>lmbr_test pytest Tools\LyTestTools\tests\example\tests --platform win_x64_vs2017 -k test_SystemTestExample_AllSupportedPlatforms_LaunchSamplesProject
    [WAF] Engine Root: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\
    110.000133514 - INFO - [MainThread] - aztest.plugins.pytest_plugin.pytest_runner - Setting results folder to TestResults\2019-10-15T13_17_03_644000\pytest_results
    111.000061035 - INFO - [MainThread] - aztest.plugins.pytest_plugin.pytest_runner - Invoking pytest with a timeout of 3600 seconds
    111.000061035 - INFO - [MainThread] - aztest.plugins.pytest_plugin.pytest_runner - ['E:\\P4\\rmajs\\lyengine\\branches\\testtech\\features\\ptt\\dev\\Tools\\Python\\2.7.12\\windows\\python.exe', '-B', '-m', 'pytest', '--cache-clear', '-c', 'lmbr_test_pytest.ini', '--junitxml=TestResults\\2019-10-15T13_17_03_644000\\pytest_results\\pytest_results.xml', '--logs_path=TestResults\\2019-10-15T13_17_03_644000\\pytest_results', 'Tools\\LyTestTools\\tests\\example\\tests', '--platform', 'win_x64_vs2017', '-k', 'test_SystemTestExample_AllSupportedPlatforms_LaunchSamplesProject']
    ============================= test session starts =============================
    platform win32 -- Python 2.7.12, pytest-3.5.1, py-1.5.3, pluggy-0.6.0
    rootdir: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\Tools\LyTestTools\tests\example\tests, inifile: lmbr_test_pytest.ini
    plugins: timeout-1.2.1, mock-1.10.0, ly-test-tools-1.0.0
    collected 8 items / 7 deselected
     
    Tools\LyTestTools\tests\example\tests\test_system_example.py
```

 6. The verification process of the test will ensure the configuration and launch were successful. If the test was successful it will pass the test, failing it otherwise. You will see the Asset Processor launch followed by the SamplesProject Lumberyard client opening, and then the test waits for a level to load successfully. If the test passes, it will look similar to the following output:

```shell
============================= test session starts =============================
    platform win32 -- Python 2.7.12, pytest-3.5.1, py-1.5.3, pluggy-0.6.0
    rootdir: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\Tools\LyTestTools\tests\example\tests, inifile: lmbr_test_pytest.ini
    plugins: timeout-1.2.1, mock-1.10.0, ly-test-tools-1.0.0
    collected 9 items / 8 deselected
     
    Tools\LyTestTools\tests\example\tests\test_system_example.py .                 [100%]
     
     generated xml file: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\TestResults\2019-09-27T13_56_22_617000\pytest_results\pytest_results.xml
    =================== 1 passed, 8 deselected in 69.25 seconds ===================
```

 7. After the verification step, the test will run then ensure that Editor.exe can launch. You will see it open, check for the process running, and quickly close.

 8. Now target the Windows platform using the "–platform" CLI argument to target this test method: test_SystemTestExample_AllSupportedPlatforms_LaunchEditor
    The command will look similar to the following:

```shell
    Tools\Python\python3.cmd -m pytest Tools\LyTestTools\tests\example\tests\test_system_example.py --build-directory [path_to_build_output]
```

 9. If the test passes, it will look similar to the following output:

```shell
    ============================= test session starts =============================
    platform win32 -- Python 2.7.12, pytest-3.5.1, py-1.5.3, pluggy-0.6.0
    rootdir: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\Tools\LyTestTools\tests\example\tests, inifile: lmbr_test_pytest.ini
    plugins: timeout-1.2.1, mock-1.10.0, ly-test-tools-1.0.0
    collected 8 items / 7 deselected
     
    Tools\LyTestTools\tests\example\tests\test_system_example.py .           [100%]
     
     generated xml file: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\TestResults\2019-10-15T13_34_37_517000\pytest_results\pytest_results.xml
    =================== 1 passed, 7 deselected in 11.29 seconds ===================
```

 10. You can run both tests above, instead of targeting a specific test, by using the following command:
 
```shell
    Tools\Python\python3.cmd -m pytest Tools\LyTestTools\tests\example\tests\ --build-directory [path_to_build_output]
```

 11. You will get an output similiar to the following:

```shell
    [WAF] Engine Root: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\
    105.999946594 - INFO - [MainThread] - aztest.plugins.pytest_plugin.pytest_runner - Setting results folder to TestResults\2019-10-15T13_38_42_855000\pytest_results
    105.999946594 - INFO - [MainThread] - aztest.plugins.pytest_plugin.pytest_runner - Invoking pytest with a timeout of 3600 seconds
    107.000112534 - INFO - [MainThread] - aztest.plugins.pytest_plugin.pytest_runner - ['E:\\P4\\rmajs\\lyengine\\branches\\testtech\\features\\ptt\\dev\\Tools\\Python\\2.7.12\\windows\\python.exe', '-B', '-m', 'pytest', '--cache-clear', '-c', 'lmbr_test_pytest.ini', '--junitxml=TestResults\\2019-10-15T13_38_42_855000\\pytest_results\\pytest_results.xml', '--logs_path=TestResults\\2019-10-15T13_38_42_855000\\pytest_results', 'Tools\\LyTestTools\\tests\\example\\tests', '--platform', 'win_x64_vs2017']
    ============================= test session starts =============================
    platform win32 -- Python 2.7.12, pytest-3.5.1, py-1.5.3, pluggy-0.6.0
    rootdir: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\Tools\LyTestTools\tests\example\tests, inifile: lmbr_test_pytest.ini
    plugins: timeout-1.2.1, mock-1.10.0, ly-test-tools-1.0.0
    collected 8 items / 6 deselected
     
    Tools\LyTestTools\tests\example\tests\test_system_example.py ..          [100%]
     
     generated xml file: E:\P4\rmajs\lyengine\branches\testtech\features\ptt\dev\TestResults\2019-10-15T13_38_42_855000\pytest_results\pytest_results.xml
    =================== 2 passed, 6 deselected in 21.67 seconds ===================
```

## Further Reading ##

* https://automatetheboringstuff.com/ - This site is great for learning when to apply test automation and when not to.