---
linkTitle: Debugging TIAF Issues
title: Debugging Information
description: Information as to how to debug the TIAF.
---

# How do I configure and install OpenCppCoverage?

The TIAF uses a fork of [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage) as the instrumentation for native test targets on the Windows platform. In order to build the forked version of OpenCppCoverage, clone the [fork](https://github.com/jonawals/OpenCppCoverage.git) and checkout the branch `SourceLevelCoverage`. From here, you can follow the [standard instructions](https://github.com/OpenCppCoverage/OpenCppCoverage/wiki) for building OpenCppCoverage.

# How do I reproduce a TIAF AR run locally?

{{< note >}}
Prior to running TIAF locally, you must [clone and build the OpenCppCoverage fork](./debuffing-tiaf/#how-do-i-configure-and-install-opencppcoverage) and [enable the TIAF at the CMake level](./general-information/#how-do-i-turn-the-tiaf-onoff-in-automated-review). 
{{< /note >}}

In order to reproduce a TIAF run locally we must first obtain all of the environmental information about the run. We can do this by navigating to the appropriate Jenkins build and clicking on either the `test_impact_analysis_profile_native` or `test_impact_analysis_profile_python` stages to retrieve the console output. At the very top of the console output, we will see the output of the TIAF AR scripts prior to the invocation of the appropriate runtime, like so:

```
[2023-03-30T09:42:22.809Z] D:\workspace\o3de>python\python.cmd -u scripts\build\ci_build.py --platform Windows --type test_impact_analysis_profile_python 
[2023-03-30T09:42:22.809Z] [ci_build] Executing "D:\workspace\o3de\scripts\build\Platform/Windows/python_windows.cmd"
[2023-03-30T09:42:22.809Z]   cwd = D:\workspace\o3de
[2023-03-30T09:42:22.809Z]   engine_dir = D:\workspace\o3de
[2023-03-30T09:42:22.809Z]   parameters:
[2023-03-30T09:42:22.809Z]     OUTPUT_DIRECTORY = build/windows 
[2023-03-30T09:42:22.809Z]     CONFIGURATION = profile 
[2023-03-30T09:42:22.809Z]     SCRIPT_PATH = scripts/build/TestImpactAnalysis/tiaf_driver.py 
[2023-03-30T09:42:22.809Z]     SCRIPT_PARAMETERS = --config="%OUTPUT_DIRECTORY%/bin/TestImpactFramework/profile/Persistent/tiaf.json" --src-branch=%BRANCH_NAME% --dst-branch=%CHANGE_TARGET% --commit=%CHANGE_ID% --s3-bucket=%TEST_IMPACT_S3_BUCKET% --mars-index-prefix=o3de-tiaf --s3-top-level-dir=%REPOSITORY_NAME% --build-number=%BUILD_NUMBER% --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=python --testrunner=live --target-output=stdout 
[2023-03-30T09:42:22.809Z] --------------------------------------------------------------------------------
[2023-03-30T09:42:22.809Z] [ci_build] python/python.cmd -u scripts/build/TestImpactAnalysis/tiaf_driver.py --config="%OUTPUT_DIRECTORY%/bin/TestImpactFramework/profile/Persistent/tiaf.json" --src-branch=%BRANCH_NAME% --dst-branch=%CHANGE_TARGET% --commit=%CHANGE_ID% --s3-bucket=%TEST_IMPACT_S3_BUCKET% --mars-index-prefix=o3de-tiaf --s3-top-level-dir=%REPOSITORY_NAME% --build-number=%BUILD_NUMBER% --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=python --testrunner=live --target-output=stdout
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,981][TIAF][INFO] Attempting to parse configuration file 'build/windows/bin/TestImpactFramework/profile/Persistent/tiaf.json'...
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,983][TIAF][INFO] Runtime binary found at location 'D:\workspace\o3de\build\windows\bin\profile\tiaf_python.exe'
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] The configuration file was parsed successfully.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Source branch: 'stabilization/2305'.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Destination branch: ''.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Source of truth branch: 'stabilization/2305'.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Is source of truth branch: 'True'.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Commit: '59e24a62859ce8a932e338f36432e3228621c1ec'.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Test impact analysis is enabled.
[2023-03-30T09:42:23.067Z] [2023-03-30 09:42:22,984][TIAF][INFO] Attempting to access persistent storage for the commit '59e24a62859ce8a932e338f36432e3228621c1ec' for suites 'main-smoke'
[2023-03-30T09:42:23.630Z] [2023-03-30 09:42:23,591][TIAF][INFO] Attempting to retrieve historic data for branch 'stabilization/2305' at location 'o3de/o3de/python/stabilization/2305/profile/main-smoke/historic_data.json.zip' on bucket 'o3de-tiaf'...
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,748][TIAF][INFO] Historic data found for branch 'stabilization/2305'.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,749][TIAF][INFO] Attempting to decode historic data object...
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,752][TIAF][INFO] Decoding complete.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,757][TIAF][INFO] Last commit hash '26273c22ff71950eb68d137fed25125ebbaa12d6' found.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,757][TIAF][INFO] No prior sequence data found for commit '59e24a62859ce8a932e338f36432e3228621c1ec', this is the first sequence for this commit.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,757][TIAF][INFO] Previous test run data for a sequence of '18' test targets found.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,758][TIAF][INFO] Writing coverage data to 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Persistent\Python\active\main-smoke\TestImpactData.spartia'.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,764][TIAF][INFO] Writing previous test runs data to 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Persistent\Python\active\main-smoke\PreviousTestRunData.json'.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,766][TIAF][INFO] Historic data found.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,859][TIAF][INFO] The distance between '26273c22ff71950eb68d137fed25125ebbaa12d6' and '59e24a62859ce8a932e338f36432e3228621c1ec' commits is '1' commits.
[2023-03-30T09:42:23.888Z] [2023-03-30 09:42:23,860][TIAF][INFO] Source '26273c22ff71950eb68d137fed25125ebbaa12d6' and destination '59e24a62859ce8a932e338f36432e3228621c1ec' will be diff'd.
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,905][TIAF][INFO] Generated diff between commits '26273c22ff71950eb68d137fed25125ebbaa12d6' and '59e24a62859ce8a932e338f36432e3228621c1ec': 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\Changelists\changelist.76aeff41529f498297bf8194d38d5414.diff'.
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Change list constructed successfully: 'D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\changelist.76aeff41529f498297bf8194d38d5414.json'.
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] 0 created files, 4 updated files and 0 deleted files.
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Sequence type is set to: tia
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Test failure policy is set to: continue
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Test suites is set to: ['main', 'smoke']
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Suite label excludes is set to: ['REQUIRES_gpu']
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Change list is set to: D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\changelist.76aeff41529f498297bf8194d38d5414.json
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Sequencer report file is set to: D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\Reports\report.76aeff41529f498297bf8194d38d5414.json
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Test target output capture is set to: stdout
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Test runner policy is set to: live
[2023-03-30T09:42:24.147Z] [2023-03-30 09:42:23,906][TIAF][INFO] Args: --sequence=tia --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --changelist=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\changelist.76aeff41529f498297bf8194d38d5414.json --report=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\Reports\report.76aeff41529f498297bf8194d38d5414.json --targetout=stdout --testrunner=live
```

In the log above, you can extract the following information about the AR run and runtime invocation:

- The arguments used to invoke the AR script are as follows:

    ```
    --config="%OUTPUT_DIRECTORY%/bin/TestImpactFramework/profile/Persistent/tiaf.json" --src-branch=%BRANCH_NAME% --dst-branch=%CHANGE_TARGET% --commit=%CHANGE_ID% --s3-bucket=%TEST_IMPACT_S3_BUCKET% --mars-index-prefix=o3de-tiaf --s3-top-level-dir=%REPOSITORY_NAME% --build-number=%BUILD_NUMBER% --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=python --testrunner=live --target-output=stdout
    ```

- The source branch was `stabilization/2305`.
- The destination branch was empty, indicating a branch build as opposed to a PR build. A branch build is considered a source of truth for persistent storage.
- The commit built was `59e24a62859ce8a932e338f36432e3228621c1ec`.
- Test impact analysis had been enabled and thus will attempt to perform selective test runs using the historic coverage data.
- The bucket used for the persistent storage was `o3de-tiaf` and the location of this branch's historic data is `o3de/o3de/python/stabilization/2305/profile/main-smoke/historic_data.json.zip`.
- Historic data was successfully retrieved from the above location.
- The last AR run for this branch was for commit `26273c22ff71950eb68d137fed25125ebbaa12d6`, which is 1 commit prior from the commit built, `59e24a62859ce8a932e338f36432e3228621c1ec`.
- A change list was constructed for the changes between the above two commits, resulting in `0` created files, `4` updated files and `0` deleted files.
- The test failure policy was set to `continue`, and the test suites that tests would be selected from were `main` and `smoke`.
- Any test targets with the label `REQUIRES_gpu` were excluded from test selection.
- The test target output was routed to the Jenkins console output.
- The live Python test runner was used (this feature is deprecated).
- The arguments used to invoke the Python runtime were as follows:

    ```
    --sequence=tia --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --changelist=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\changelist.76aeff41529f498297bf8194d38d5414.json --report=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\Reports\report.76aeff41529f498297bf8194d38d5414.json --targetout=stdout --testrunner=live
    ```

To reproduce this particular AR run, perform the following steps:

1. Check out the commit `59e24a62859ce8a932e338f36432e3228621c1ec`.
2. Use the [storage query tool](./storage-query-tool.md) to retrieve the relevant historic data for this run.
3. Build the commit.
4. Place the historic data in the local historic data folder (see the historic workspace entry in any of the `tiaf.json` files in the TestImpactFramework folder in your build directory).
5. Run the TIAF AR script with the the following arguments (omitting the S3 bucket so that local persistent storage is used):

  ```
  --config=<path to your config file> --src-branch=stabilization/2305 --dst-branch= --commit=59e24a62859ce8a932e338f36432e3228621c1ec --mars-index-prefix=o3de-tiaf --build-number=<pick any number> --suites smoke main --label-excludes REQUIRES_gpu --test-failure-policy=continue --runtime-type=python --testrunner=live --target-output=stdout
  ```

Alternatively, you can explicitly invoke the runtime itself (and a debugger attached) using the following steps:

1. Check out the commit `59e24a62859ce8a932e338f36432e3228621c1ec`.
2. Use the [storage query tool](./storage-query-tool.md) to retrieve the relevant historic data for this run.
3. Build the commit.
4. Place the historic data in the local historic data folder (see the historic workspace entry in any of the tiaf.json files in the TestImpactFramework folder in your build directory).
5. Run the Python runtime with the same arguments as the TIAF run that failed:

  ```
  --sequence=tia --fpolicy=continue --suites=main,smoke --labelexcludes=REQUIRES_gpu --changelist=<path to your build folder>\bin\TestImpactFramework\profile\Temp\Python\changelist.76aeff41529f498297bf8194d38d5414.json --report=D:\workspace\o3de\build\windows\bin\TestImpactFramework\profile\Temp\Python\Reports\report.76aeff41529f498297bf8194d38d5414.json --targetout=stdout --testrunner=live
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

At the top of the test we can see this test (and all permutations of this test) reading and writing to the file `@usercache@/archivetest.pak`. Searching for this string throughout this file we can find four other tests using this file that will also need to be fixed. The approach to fixing race conditions between processes is different from fixing race conditions between threads. Firstly, we cannot simply wrap the resource in a mutex as the processes do not share the same address space, nor can we use static state to increment a file counter for each test for the same reason. Instead, we must create a unique identifier at runtime for each test without sharing any state between the tests.

### Implementing a process-safe fix for the race condition

To create a unique file name for each process, you can either use `AZ::Uuid::Create()` as the random component for your filename, or do a simpler fix using `AZ::Test::ScopedAutoTempDirectory`.

Firstly, we add a member of type `AZ::Test::ScopedAutoTempDirectory` called `m_tempDirectory` to `ArchiveCompressionTestFixture`. Then, in the constructor body, we add the following:

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

What this does is alias `@usercache@` to a folder with a unique name in the OS temp folder that will be cleaned up after the test target has completed. With this fix in place, we can now use `AzFramework.Tests` with the sharding optimization enabled without any further crashes due to file race conditions.

# How do I fix regressions with the TIAF Python unit tests?

If any tests starting with the name `TestTiaf` or as part of `test_tiaf_unit_tests.py` start failing you will need to configure your environment to run the TIAF Python unit tests. Conveniently, this process is largely the same as running any O3DE Python test so you can use the following tests to debug any failing Python test that is run in AR.

### Configuring the environment

----

If you find tests start failing, you must look to the test suite in `scripts/build/TestImpactAnalysis/Testing`:

`test_tiaf_tools.py` contains the relevant tests for the Storage Query Tool.

`test_tiaf_unit_tests.py`  contains the relevant tests for the TIAF python scripts.

`conftest.py` contains the fixtures that are used by both test scripts, and is a good place to start when updating tests with new features and command arguments.


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