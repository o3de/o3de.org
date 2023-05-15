---
linkTitle: Debugging TIAF Issues
title: Debugging Information
description: Information as to how to debug the TIAF.
---

## How do I configure and install OpenCppCoverage?

The test impact analysis framework (TIAF) uses a fork of [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage) as the instrumentation for native test targets on the Windows platform. 

To build the forked version of OpenCppCoverage:
1. Clone the [fork](https://github.com/jonawals/OpenCppCoverage.git)
2. Checkout the branch `SourceLevelCoverage`. 
3. Follow the build instructions in [OpenCppCoverage Wiki](https://github.com/OpenCppCoverage/OpenCppCoverage/wiki).

## How do I reproduce a TIAF AR run locally?

{{< note >}}
Prior to running TIAF locally, you must [clone and build the OpenCppCoverage fork](./debugging-tiaf/#how-do-i-configure-and-install-opencppcoverage) and [enable the TIAF at the CMake level](./general-information/#how-do-i-turn-the-tiaf-onoff-in-automated-review). 
{{< /note >}}

When you encounter issues related to the TIAF in an automated review (AR) integration, it may be difficult to debug them in AR due to limited tools. Instead, you can debug the TIAF issue by running the TIAF runtime on your local machine and attaching a debugger. These steps help ensure that you run the TIAF runtime using the same environment as the Git commit that failed in the Jenkins AR run. For more information, refer to [Automated Review Integration](/docs/engine-dev/tools/tiaf/architectural-overview/ar-integration) in the TIAF section. 

For these steps, "TIAF script" refers to the AR-integrated TIAF script, [tiaf_driver.py](https://github.com/o3de/o3de/blob/development/scripts/build/TestImpactAnalysis/tiaf_driver.py). "TIAF runtime" refers to the TIAF runtime and front-end binaries that the TIAF script invokes. For more information, refer to [Architectural Overview](/docs/engine-dev/tools/tiaf/architectural-overview) in the TIAF section.

To reproduce an AR run, perform the following steps:

0. Prerequisite: Obtain environment information about the AR run.
1. Recreate the historic data locally.
2. Build and run the commit failing in AR.
3. Run the TIAF runtime with a debugger attached.

### Prerequisite

To reproduce an AR run locally, you must first obtain all of the environmental information about the AR run in Jenkins. 

1. Navigate to the appropriate Jenkins build.

2. Choose either the `test_impact_analysis_profile_native` or `test_impact_analysis_profile_python` stages to retrieve the console output. 

3. At the top of the console output, see the output of the TIAF script prior to the invocation of the appropriate runtime. For example: 

    ```
    ```
    [2023-04-28T22:54:36.872Z] 
    [2023-04-28T22:54:36.886Z] D:\workspace\o3de>python\python.cmd -u scripts\build\ci_build.py --platform Windows --type test_impact_analysis_profile_native 
    [2023-04-28T22:54:36.886Z] [ci_build] Executing "D:\workspace\o3de\scripts\build\Platform/Windows/python_windows.cmd"
    [2023-04-28T22:54:36.886Z]   cwd = D:\workspace\o3de
    [2023-04-28T22:54:36.886Z]   engine_dir = D:\workspace\o3de
    [2023-04-28T22:54:36.886Z]   parameters:
    [2023-04-28T22:54:36.886Z]     OUTPUT_DIRECTORY = build/windows 
    [2023-04-28T22:54:36.886Z]     CONFIGURATION = profile 
    [2023-04-28T22:54:36.886Z]     SCRIPT_PATH = scripts/build/TestImpactAnalysis/tiaf_driver.py 
    [2023-04-28T22:54:36.886Z]     SCRIPT_PARAMETERS = --config="%OUTPUT_DIRECTORY%/bin/TestImpactFramework/profile/Persistent/tiaf.json" --src-branch=%BRANCH_NAME% --dst-branch=%CHANGE_TARGET% --commit=%CHANGE_ID% --s3-bucket=%TEST_IMPACT_S3_BUCKET% --mars-index-prefix=o3de-tiaf --s3-top-level-dir=%REPOSITORY_NAME% --build-number=%BUILD_NUMBER% --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=native --target-output=stdout 
    [2023-04-28T22:54:36.886Z] --------------------------------------------------------------------------------
    [2023-04-28T22:54:36.886Z] [ci_build] python/python.cmd -u scripts/build/TestImpactAnalysis/tiaf_driver.py --config="%OUTPUT_DIRECTORY%/bin/TestImpactFramework/profile/Persistent/tiaf.json" --src-branch=%BRANCH_NAME% --dst-branch=%CHANGE_TARGET% --commit=%CHANGE_ID% --s3-bucket=%TEST_IMPACT_S3_BUCKET% --mars-index-prefix=o3de-tiaf --s3-top-level-dir=%REPOSITORY_NAME% --build-number=%BUILD_NUMBER% --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=native --target-output=stdout
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,153][TIAF][INFO] Attempting to parse configuration file 'build/windows/bin/TestImpactFramework/profile/Persistent/tiaf.json'...
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Runtime binary found at location 'D:\workspace\o3de\build\windows\bin\profile\tiaf_native.exe'
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] The configuration file was parsed successfully.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Source branch: 'PR-15830'.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Destination branch: 'development'.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Source of truth branch: 'development'.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Is source of truth branch: 'False'.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Commit: '85a0bd96daa4bd330d56bd817e8cdaf29d172b63'.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Test impact analysis is enabled.
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,155][TIAF][INFO] Attempting to access persistent storage for the commit '85a0bd96daa4bd330d56bd817e8cdaf29d172b63' for suites 'main-smoke'
    [2023-04-28T22:54:37.450Z] [2023-04-28 22:54:37,307][TIAF][INFO] Attempting to retrieve historic data for branch 'development' at location 'o3de/o3de/native/development/profile/main-smoke/historic_data.json.zip' on bucket 'o3de-tiaf'...
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,445][TIAF][INFO] Historic data found for branch 'development'.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,445][TIAF][INFO] Attempting to decode historic data object...
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,449][TIAF][INFO] Decoding complete.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,455][TIAF][INFO] Last commit hash '4b65521188a2a0beb399eca7b692216d2fe3d209' found.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,455][TIAF][INFO] No prior sequence data found for commit '85a0bd96daa4bd330d56bd817e8cdaf29d172b63', this is the first sequence for this commit.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,455][TIAF][INFO] No previous test run data found.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,456][TIAF][INFO] Writing coverage data to 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Persistent\Native\active\main-smoke\TestImpactData.spartia'.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,464][TIAF][INFO] Writing previous test runs data to 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Persistent\Native\active\main-smoke\PreviousTestRunData.json'.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,464][TIAF][INFO] Historic data found.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,464][TIAF][INFO] Source '4b65521188a2a0beb399eca7b692216d2fe3d209' and destination '85a0bd96daa4bd330d56bd817e8cdaf29d172b63' will be diff'd.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,531][TIAF][INFO] Generated diff between commits '4b65521188a2a0beb399eca7b692216d2fe3d209' and '85a0bd96daa4bd330d56bd817e8cdaf29d172b63': 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\changelist.06011392e5a7456e817cda03f8f8c606.diff'.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Change list constructed successfully: 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\changelist.06011392e5a7456e817cda03f8f8c606.json'.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] 5 created files, 69 updated files and 2 deleted files.
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Sequence type is set to: tianowrite
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Test failure policy is set to: continue
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Test suites is set to: ['main', 'smoke']
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Suite label excludes is set to: ['REQUIRES_gpu']
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Integration failure policy is set to: continue
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Change list is set to: D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\changelist.06011392e5a7456e817cda03f8f8c606.json
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Sequencer report file is set to: D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\Reports\report.06011392e5a7456e817cda03f8f8c606.json
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Test target output capture is set to: stdout
    [2023-04-28T22:54:37.708Z] [2023-04-28 22:54:37,533][TIAF][INFO] Args: --sequence=tianowrite --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --ipolicy=continue --changelist=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\changelist.06011392e5a7456e817cda03f8f8c606.json --report=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\Reports\report.06011392e5a7456e817cda03f8f8c606.json --targetout=stdout
    [2023-04-28T22:54:37.978Z] Constructing in-memory model of source tree and test coverage for test suite main-smoke, this may take a moment...
    [2023-04-28T22:54:38.730Z] [2023-04-28 22:54:38,262][TIAF][ERROR] The test impact analysis runtime returned with error: '3221225477'.
    [2023-04-28T22:54:38.730Z] [2023-04-28 22:54:38,262][TIAF][INFO] Transmitting report to MARS...
    [2023-04-28T22:54:38.730Z] [2023-04-28 22:54:38,262][TIAF][INFO] Connecting to Filebeat on localhost:9000
    [2023-04-28T22:54:38.730Z] [2023-04-28 22:54:38,274][TIAF][INFO] Complete!
    [2023-04-28T22:54:38.736Z] --------------------------------------------------------------------------------
    [2023-04-28T22:54:38.736Z] [ci_build] FAIL: Command D:\workspace\o3de\scripts\build\Platform/Windows/python_windows.cmd returned 4294967295
    script returned exit code -1
    ```

In this instance, the native TIAF runtime is crashing in AR, but not crashing when running locally. This is typically because the issue is related to the historic data and the delta of changes between the last AR run and this failing AR run.

In the log above, you can extract the following information about the AR run and runtime invocation:

- The arguments used to invoke the AR script are as follows:

    ```
    --config="%OUTPUT_DIRECTORY%/bin/TestImpactFramework/profile/Persistent/tiaf.json" --src-branch=%BRANCH_NAME% --dst-branch=%CHANGE_TARGET% --commit=%CHANGE_ID% --s3-bucket=%TEST_IMPACT_S3_BUCKET% --mars-index-prefix=o3de-tiaf --s3-top-level-dir=%REPOSITORY_NAME% --build-number=%BUILD_NUMBER% --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=python --testrunner=live --target-output=stdout
    ```

- The source branch was `PR-15830`.
- The destination branch was `development`, indicating a PR build as opposed to a branch build. A branch build is considered a source of truth for persistent storage.
- The commit built was `85a0bd96daa4bd330d56bd817e8cdaf29d172b63`.
- Test impact analysis had been enabled and thus will attempt to perform selective test runs using the historic coverage data.
- The bucket used for the persistent storage was `o3de-tiaf` and the location of this branch's historic data is `o3de/o3de/python/stabilization/2305/profile/main-smoke/historic_data.json.zip`.
- Historic data was successfully retrieved from the above location.
- The last AR run for this branch was for commit `4b65521188a2a0beb399eca7b692216d2fe3d209`.
- A change list was constructed for the changes between the above two commits, resulting in `5` created files, `69` updated files and `2` deleted files.
- The test failure policy was set to `continue`, and the test suites that tests would be selected from were `main` and `smoke`.
- Any test targets with the label `REQUIRES_gpu` were excluded from test selection.
- The test target output was routed to the Jenkins console output.
- The arguments used to invoke the native runtime were as follows:

    ```
    --sequence=tianowrite --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --ipolicy=continue --changelist=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\changelist.06011392e5a7456e817cda03f8f8c606.json --report=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Native\Reports\report.06011392e5a7456e817cda03f8f8c606.json --targetout=stdout
    ```

To reproduce this particular AR run, perform the following steps:

1. Recreate the historic data locally.
2. Build and run the commit failing in AR.
3. Run the TIAF runtime with a debugger attached.

### Step 1: Recreate the historic data locally

The most reliable way to recreate the historic data locally is from scratch, as it does not require access to the persistent storage used by AR. Alternatively, you can also use the [storage query tool](./storage-query-tool.md) to retrieve the relevant historic data for this run from the server running AR and place the contents in the `<build_path>/bin/TestImpactFramework/debug/Persistent/Native/historic/main-smoke` directory. 

For this set of instructions, you will recreate the historic data locally from scratch.

Checkout and build the commit used by the last run (in this instance `4b65521188a2a0beb399eca7b692216d2fe3d209`). For native runs, it is recommended you build the `debug` configuration to make debugging easier but for Python runs you must build the `profile` configuration as, at the time of writing, Python tests will not execute properly with the `debug` build configuration.

Run the TIAF using the AR scripts to generate the historic data used in the failing AR run locally. To do so, run the [tiaf_driver.py](https://github.com/o3de/o3de/blob/development/scripts/build/TestImpactAnalysis/tiaf_driver.py) script and supply the arguments used in the AR run. For this demonstration, Visual Studio Code will be used. 

The script configuration file used for this step is as follows:

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "justMyCode": true,
            "args": [
                "--config", "C:/dev/o3de/build/windows_vs2019/bin/TestImpactFramework/debug/Persistent/tiaf.json", // Replace with your build path to tiaf.json
                "--src-branch", "development", // src and dst must be same in order to write out historic data
                "--dst-branch", "development", // Note: the src and dst branches can be any name and do not need to refer to real, existing branches
                "--commit", "4b65521188a2a0beb399eca7b692216d2fe3d209",
                "--mars-index-prefix", "o3de-tiaf",
                "--build-number", "001", // The build number can be anything
                "--suites", "smoke", "main", // The suites must match those used in AR
                "--label-excludes", "REQUIRES_gpu", // The label exclude filters must match those used in AR
                "--test-failure-policy", "continue",
                "--target-output", "stdout",
                "--runtime-type", "native" // change to "python" for Python TIAF
            ]
        }
    ]
}
```

When the script has completed execution you will find the same historic data used in AR at the location `<build_path>/bin/TestImpactFramework/debug/Persistent/Native/historic/main-smoke`.

{{< tip >}}
Subsequent runs of CMake will delete the contents of this directory. If you wish to place the historic data in another location to preserve it between runs of CMake, copy the `tiaf.json` file from your build location to somewhere convenient and modify the `root` path in the `historic` section of the appropriate runtime of this file to this new location. Now you can change the path for `config` argument in the `tiaf_driver.py` script to that of the `tiaf.json` configuration file you modified.
{{< /tip >}}

### Step 2: Build and run the commit failing in AR

Checkout the commit that is failing in AR (in this instance `85a0bd96daa4bd330d56bd817e8cdaf29d172b63`) and then run the TIAF using the AR scripts to generate the change list and arguments used by the runtime. It is important to set the `dst-branch` to the same branch used in the previous step but the `src-branch` to something different. This is for two reasons: firstly, it will ensure that we do not overwrite the historic data (as PR builds are not sources of truth and thus do not store their run data in the persistent storage) and secondly, it is required for generating change lists for unrelated previous and current commits (i.e. commits from unrelated branches).


The script configuration file used for this step is as follows:

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Current File",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            "justMyCode": true,
            "args": [
                "--config", "C:/dev/o3de/build/windows_vs2019/bin/TestImpactFramework/debug/Persistent/tiaf.json", // Replace with your build path
                "--src-branch", "PR-15830", // src and dst are different as this is a PR build
                "--dst-branch", "development",
                "--commit", "85a0bd96daa4bd330d56bd817e8cdaf29d172b63",
                "--build-number", "001", // The build number can be anything
                "--suites", "smoke", "main", // The suites must match those used in AR
                "--label-excludes", "REQUIRES_gpu", // The label exclude filters must match those used in AR
                "--test-failure-policy", "continue",
                "--target-output", "stdout",
                "--runtime-type", "native" // change to "python" for Python TIAF
               ]
        }
    ]
}
```

When the script has completed execution you will see the same result as the failing AR run (in this instance, a crash) as well as the change list and arguments for the runtime.

{{< note >}}
This step need only be performed once and the change list and arguments reused as needed.
{{< /note >}}

### Step 3: Run the TIAF runtime with a debugger attached

In the previous step, the TIAF log output states the command line options used by the runtime:

```
[2023-04-30 00:34:45,577][TIAF][INFO] Args: --sequence=tianowrite --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --ipolicy=continue --changelist=C:\dev\o3de\build\windows_vs2019\bin\TestImpactFramework\debug\Temp\Native\changelist.b9ad24eef8544d43a9d3fa75912532d4.json --report=C:\dev\o3de\build\windows_vs2019\bin\TestImpactFramework\debug\Temp\Native\Reports\report.b9ad24eef8544d43a9d3fa75912532d4.json --targetout=stdout
```

Thus, the arguments we need to supply to the runtime in your IDE are as follows:

```
--sequence=tianowrite --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --ipolicy=continue --changelist=C:\dev\o3de\build\windows_vs2019\bin\TestImpactFramework\debug\Temp\Native\changelist.b9ad24eef8544d43a9d3fa75912532d4.json --report=C:\dev\o3de\build\windows_vs2019\bin\TestImpactFramework\debug\Temp\Native\Reports\report.b9ad24eef8544d43a9d3fa75912532d4.json --targetout=stdout
```

In your IDE, find the appropriate console front end project for the AR run (either `TestImpact.Frontend.Console.Native` or `TestImpact.Frontend.Console.Python`) and provide the arguments above. Now run the project with your debugger attached to find and fix the issue causing the AR failure.

For this AR run, the cause of the crash was determined to be a bug due to an edge case where a test target had previously been opted-in to the TIAF (whereupon its coverage data was stored in the `historic_data.json` file used by the run), only for that test target to have been subsequently opted-out at a later date, causing a `nullptr` dereference that was fixed in commit `98dbed226cdae5afa5da25fe4bf84ae6760e4ac4`.

{{< tip >}}
You will save a lot of time by reproducing issues with the TIAF itself locally rather than attempting to debug them in AR with the limited tooling available.
{{< /tip >}}

### Running failing tests

If the cause of the AR failure is a specific test target failing or crashing, find the offending test target in your IDE and run it with your debugger attached.

To manually launch a given test target from the command line as per the method used by TIAF (for example, to inspect the test run and coverage data), open up the `historic_data.json` in the `Persistent` directory and locate the test target's `command_args` field in that file. For example, the (truncated) historic data for the local run in the first step shows the command line arguments needed to invoke the `Gem_Metastream.Tests` test target from your terminal:

    ```json
    "last_commit_hash":"4b65521188a2a0beb399eca7b692216d2fe3d209",
    "historic_sequences":{
        "4b65521188a2a0beb399eca7b692216d2fe3d209":null
    },
    "previous_test_runs":[
        {
            "name":"Gem_Metastream.Tests",
            "command_args":"\"C:\\dev\\OpenCppCoverage\\x64\\Release\\OpenCppCoverage.exe\" --coverage_level source --export_type cobertura:\"C:\\dev\\o3de\\build\\windows_vs2019\\bin\\TestImpactFramework\\debug\\Temp\\Native\\Coverage\\Metastream.Tests.xml\" --modules \"C:\\dev\\o3de\\build\\windows_vs2019\\bin\\debug\" --excluded_modules \"C:\\dev\\o3de\\build\\windows_vs2019\\bin\\debug\\AzTestRunner.exe\" --sources \"C:\\dev\\o3de\" -- \"C:\\dev\\o3de\\build\\windows_vs2019\\bin\\debug\\AzTestRunner.exe\" \"C:\\dev\\o3de\\build\\windows_vs2019\\bin\\debug\\Metastream.Tests.dll\" AzRunUnitTests --gtest_output=xml:\"C:\\dev\\o3de\\build\\windows_vs2019\\Testing\\Gtest\\Gem_Metastream.Tests.xml\" ",
            "start_time":2257721140,
            "end_time":2258136771,
            "duration":415631,
            "result":"all_tests_pass",
            "num_passing_tests":1,
            "num_failing_tests":0,
            "num_disabled_tests":0,
            "tests":[
                {
                "name":"MetastreamTest.ServerStartupShutdownTest_FT",
                "result":"passed"
                }
            ]
        }
    
        // rest of data removed for clarity
    ]
    ```

To run `Gem_Metastream.Tests` test target from your terminal, use the following command, changing the paths to your build of OpenCppCoverage and O3DE accordingly:

```
C:/dev/OpenCppCoverage/x64/Release/OpenCppCoverage.exe --coverage_level source --export_type cobertura:"C:/dev/o3de/build/windows_vs2019/bin/TestImpactFramework/debug/Temp/Native/Coverage/Metastream.Tests.xml" --modules "C:/dev/o3de/build/windows_vs2019/bin/debug" --excluded_modules "C:/dev/o3de/build/windows_vs2019/bin/debug/AzTestRunner.exe" --sources "C:/dev/o3de" -- "C:/dev/o3de/build/windows_vs2019/bin/debug/AzTestRunner.exe" "C:/dev/o3de/build/windows_vs2019/bin/debug/Metastream.Tests.dll" AzRunUnitTests --gtest_output=xml:"C:/dev/o3de/build/windows_vs2019/Testing/Gtest/Gem_Metastream.Tests.xml"
```

## How do I kill a local test run of the TIAF?

Often, when a run of TIAF is aborted by the user, there are still test target processes invoked by TIAF lingering around. In order to terminate all processes, you must terminate both the test runner processes and the instrumentation processes.

To terminate the test runner processes, use the following command:

```
taskkill /f /im AzTestRunner.exe
```

To terminate the instrumentation processes, use the following command:

```
taskkill /f /im OpenCppCoverage.exe
```

## How do I debug a flaky sharded test target?

A flaky sharded test is a test target of which one or more of the target's shards have crashed due to race conditions with other shards. As each shard is its own separate process, the race conditions are not due to memory corruption in the same address space as per typical multithreaded race conditions, but instead are due to one or more of the shard processes attempting to access and mutate a common resource such as a file. Although it's not certain that all shard race conditions are due to conflicting file accesses, most of the race conditions detected and fixed during the sharded test optimization development process were due to this. Thus, if you have a flaky, sharded test target, you should first check for file race conditions.

### Case Study: `AzFramework.Tests` race conditions

In order to demonstrate the best practices for troubleshooting and fixing flaky sharded test targets, we will troubleshoot and fix a real world example of such a flaky test target: `AzFramework.Tests`. As this test target has already been fixed, you can instead checkout commit `66c894f9fe15ce4cc1c1afe5ca9dbac30fde63fa` for reference which definitely does not have the fix in question.

#### Diagnosing the offending test

Prior to resolving the sharding issue, when this test target was opted-in to TIAF and opted-in to test sharding optimization, it frequently crashed due to the sharding. To identify the likely suspect test(s) causing the race conditions, you can search the log for the string `Possible file race condition detected for test target`, whereupon you find the following warning message:

```
Shard:
==================================================================
Shard: Trace::Warning
 C:\dev\o3de-tiaf-feature-python\Code\Tools\TestImpactFramework\Runtime\Native\Code\Source\TestRunner/Native/Shard/TestImpactNativeShardedTestRunnerBase.h(291): 'void __cdecl TestImpact::NativeShardedTestRunnerBase<class TestImpact::NativeRegularTestRunner>::LogSuspectedShardFileRaceCondition(const class TestImpact::Job<class TestImpact::JobInfo<class TestImpact::NativeTestRunJobData<class TestImpact::TestRunJobData> >,class TestImpact::TestRun> &,const class AZStd::unordered_map<unsigned __int64,class TestImpact::ShardedTestJobInfo<class TestImpact::NativeRegularTestRunner> const *,struct AZStd::hash<unsigned __int64>,struct AZStd::equal_to<unsigned __int64>,class AZStd::allocator> &,const class AZStd::unordered_map<class TestImpact::ShardedTestJobInfo<class TestImpact::NativeRegularTestRunner> const *,class TestImpact::ShardedTestJob<class TestImpact::NativeRegularTestRunner>,struct AZStd::hash<class TestImpact::ShardedTestJobInfo<class TestImpact::NativeRegularTestRunner> const *>,struct AZStd::equal_to<class TestImpact::ShardedTestJobInfo<class TestImpact::NativeRegularTestRunner> const *>,class AZStd::allocator> &)'
Shard: Possible file race condition detected for test target 'AzFramework.Tests' on shard '23', backtrace of std out for last 500 characters (check for properly terminated test log output):
ckIsValid/5 (1490 ms)
[ RUN      ] ArchiveCompression/ArchiveCompressionTestFixture.TestArchivePacking_CompressionWithOverridenArchiveData_PackIsValid/5
C:/dev/o3de-tiaf-feature-python/Code/Framework/AzFramework/Tests/ArchiveCompressionTests.cpp(177): error: Expected: (nullptr) != (pArchive), actual: (nullptr) vs 8-byte object <00-00 00-00 00-00 00-00>
C:\dev\o3de-tiaf-feature-python\Code\Framework\AzCore\AzCore/std/smart_ptr/intrusive_ptr.h(189): error: You can't dereference a null pointer

Shard: ==================================================================
```

The above warning prints out the last 500 characters of standard output produced by that shard's process. You can see that the Google Test log ends abruptly with the line `error: You can't dereference a null pointer`, rather than the usual test summary of a Google Test target that terminated gracefully. This is key evidence, as it clearly shows that the crashing test is `ArchiveCompression/ArchiveCompressionTestFixture.TestArchivePacking_CompressionWithOverridenArchiveData_PackIsValid/5`. If you look at the source code for that test and you see anything regarding file access, it's very likely that this is the race condition between the shards causing the crash.

Here is the source code for the crashing test:

```c++
TEST_P(ArchiveCompressionTestFixture, TestArchivePacking_CompressionWithOverridenArchiveData_PackIsValid)
{
    // ---------------- MORE COMPLICATED TEST which involves overwriting elements ----------------
    AZStd::string testArchivePath = "@usercache@/archivetest.pak";
    AZ::IO::IArchive* archive = AZ::Interface<AZ::IO::IArchive>::Get();

    auto openFlags = AZStd::get<0>(GetParam());
    auto compressionMethod = AZStd::get<1>(GetParam());
    auto compressionLevel = AZStd::get<2>(GetParam());
    auto stepSize = AZStd::get<3>(GetParam());
    auto numSteps = AZStd::get<4>(GetParam());
    auto iterations = AZStd::get<5>(GetParam());

    int maxSize = numSteps * stepSize;
    AZStd::vector<uint8_t> checkSums;
    checkSums.resize_no_construct(maxSize);
    for (int pos = 0; pos < maxSize; ++pos)
    {
        checkSums[pos] = static_cast<uint8_t>(pos % 256);
    }

    auto pArchive = archive->OpenArchive(testArchivePath.c_str());
    EXPECT_NE(nullptr, pArchive);

    for (int j = 0; j < iterations; ++j)
    {
        for (int currentSize = maxSize; currentSize >= 0; currentSize -= stepSize)
        {
            auto fnBuffer = AZ::StringFunc::Path::FixedString::format("file-%i-%i.dat", currentSize, j);
            EXPECT_TRUE(pArchive->UpdateFile(fnBuffer, checkSums.data(), currentSize, compressionMethod, compressionLevel) == 0);
        }
    }
```

At the top, notice that this test (and all permutations of this test) read and write to the file `@usercache@/archivetest.pak`. Searching for this string throughout this file, you can find four other tests using this file that will also need to be fixed. The approach to fixing race conditions between processes is different from fixing race conditions between threads. First, you cannot simply wrap the resource in a mutex as the processes do not share the same address space, nor can you use static state to increment a file counter for each test for the same reason. Instead, you must create a unique identifier at runtime for each test without sharing any state between the tests.

#### Implementing a process-safe fix for the race condition

To create a unique file name for each process, you can either use `AZ::Uuid::Create()` as the random component for your filename, or do a simpler fix using `AZ::Test::ScopedAutoTempDirectory`.

To create unique file names using `AZ::Test::ScopedAutoTempDirectory`:
1. Add a member of type `AZ::Test::ScopedAutoTempDirectory` called `m_tempDirectory` to `ArchiveCompressionTestFixture`. 
2. In the constructor body, add the following:

```c++
ArchiveCompressionTestFixture()
    : m_application { AZStd::make_unique<AzFramework::Application>() }
{
    // Create a unique alias to the user cache directory to avoid race conditions between
    // concurrent invocations of this test target running these tests
    AZ::IO::FileIOBase* fileIo = AZ::IO::FileIOBase::GetInstance();
    fileIo->SetAlias("@usercache@", m_tempDirectory.GetDirectory());
}
```

This code aliases `@usercache@` to a folder with a unique name in the OS temp folder that will be cleaned up after the test target has completed. With this fix in place, you can now use `AzFramework.Tests` with the sharding optimization enabled without any further crashes due to file race conditions.

## How do I fix regressions with the TIAF Python unit tests?

If any tests starting with the name `TestTiaf` or as part of `test_tiaf_unit_tests.py` start to fail, you must configure your environment to run the TIAF Python unit tests. Conveniently, this process is similar as running any O3DE Python test, so you can use the following tests to debug any failing Python test that is run in AR.

### Configuring the environment


If you find tests start failing, you must look to the test suite in `scripts/build/TestImpactAnalysis/Testing`:

- `test_tiaf_tools.py` contains the relevant tests for the Storage Query Tool.

- `test_tiaf_unit_tests.py`  contains the relevant tests for the TIAF python scripts.

- `conftest.py` contains the fixtures that are used by both test scripts, and is a good place to start when updating tests with new features and command arguments.


This example config snippet allows you to run TIAF pytests locally in VS Code. Simply copy and paste it into your existing `settings.json` (or create it if needed):

```json
{
    "python.testing.pytestEnabled": true,
    "python.testing.unittestEnabled": false,
    "python.testing.pytestArgs": [
        "scripts/build/TestImpactAnalysis/Testing/",
        "--ignore=AutomatedTesting/Gem/PythonTests/Multiplayer",
        "--continue-on-collection-errors",
        "--build-directory=build/windows_vs2019/bin/profile",
    ]
}
```

## How do I disable a problematic test target from being run by the TIAF?

If you need to disable a problematic test from running in the TIAF (and thus moving it back over to CTest), simply locate the offending test target's registration in CMake and remove the `REQUIRES_tiaf` label.

For example, suppose this test target is enrolled in the TIAF:

```
ly_add_googletest(
    NAME AZ::Fictional.Tests
    LABELS REQUIRES_tiaf
)
```

To opt this test out of the TIAF, remove the pertinent label, like so:

```
ly_add_googletest(
    NAME AZ::Fictional.Tests
)
```