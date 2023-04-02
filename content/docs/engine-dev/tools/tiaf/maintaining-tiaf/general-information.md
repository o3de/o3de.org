---
linkTitle: General Information
title: General Maintenance Information
description: General information as to how to maintain the TIAF.
---

# How do I turn the TIAF on/off in Automated Review?

## Method 1: Using the TIAF CMake Switches

This method will switch off TIAF at the CMake option level, leaving all tests currently opted-in to TIAF to be run by CTest. This method is the least intrusive and thus only if this method fails should the following method be used.

When using this method, the TIAF Cmake function `o3de_test_impact_apply_test_labels` will remove the label `REQUIRES_tiaf` from any native or Python test target that has been disabled with the `O3DE_TEST_IMPACT_NATIVE_TEST_TARGETS_ENABLED` or `O3DE_TEST_IMPACT_PYTHON_TEST_TARGETS_ENABLED` CMake variables. As such, it requires no further modification at either the CMake or Jenkins level to gracefully pass the burden of test running back over to CTest.

1. Navigate to `scripts\build\Platform\Windows\build_config.json`.
2. Locate `test_cpu_profile` under `CMAKE_OPTIONS` set `O3DE_TEST_IMPACT_NATIVE_TEST_TARGETS_ENABLED` (for native C++ tests) and/or `O3DE_TEST_IMPACT_PYTHON_TEST_TARGETS_ENABLED` (for Python tests) to `FALSE`.

## Method 2: Removing the TIAF Stages from AR

This method will remove TIAF completely from AR. It should be used as a method of last resort as it requires intrusive edits to the AR Jenkins configuration.

1. Navigate to `scripts\build\Platform\Windows\build_config.json`.
2. Locate `profile_pipe` and under steps remove `test_impact_analysis_profile_native` and `test_impact_analysis_profile_python`.
3. Locate `test_cpu_profile` and under `CTEST_OPTIONS` change `(REQUIRES_gpu|REQUIRES_tiaf)` to `(REQUIRES_gpu)`.

# How to I enrol a test into TIAF?

All tests enrolled into the TIAF are run by the appropriate TIAF runtime (`native` for native C++ tests, `python` for Python tests) instead of CTest. Likewise, all tests *not* enrolled into the TIAF are run instead by CTest. In order to enrol a test target into TIAF, simply add the `REQUIRES_tiaf` label when registering the test, like so:

```
ly_add_googletest(
    NAME AZ::MyExample.Tests
    LABELS REQUIRES_tiaf
)
```

{{< caution >}}
It is advised that you place your `LABELS` after the test target name and before any other custom attributes.
{{< /caution >}}

# How to I enrol a native test for test sharding optimization?

Test sharding is an optional optimization that can greatly boost the speed at which test targets are run (see XXX for more information). As the question implies, the test sharding optimization is only available for native tests. In order to opt a test target into test sharding, simply add either  `TIAF_shard_test` or `TIAF_shard_fixture` label when registering the test, like so:

```
ly_add_googletest(
    NAME AZ::MyExample.Tests
    LABELS REQUIRES_tiaf;TIAF_shard_test
)

```

When using the `TIAF_shard_test` label, each individual test will be interleaved across the available shards. This delivers the greatest performance boost but increases the brittleness of the sharded test target as resource race conditions for badly behaving tests are more likely to manifest. On the contrary, `TIAF_shard_fixture` interleaves each individual fixture across the available shards, delivering less performance than `TIAF_shard_test` but less brittleness. Always test your targets when enrolling them into test sharding optimization to ensure that they behave well when running as shards.

{{< note >}}
The test target must be enrolled into native TIAF in order to benefit from test sharding, else the test target will not be run by TIAF.
{{< /note >}}

# What are the command line options for the TIAF runtimes?

The following table details the command line options common to both the native and Python runtimes:

|Option|Flag|Default|Description|
|:----|:----|:----|:----|
|Configuration File|-config=<filename>|<tiaf binay build dir>.<tiaf binary build type>.json|Path to the configuration file for the TIAF runtime.|
|Test Impact Data File|-testimpactdatafile=<filename>|None|Optional path to a test impact data file that will used instead of that specified in the config file.|
|Previous Test Runs File|-previousrundatafile=<filename>|None|Optional path to a test impact data file that will used instead of that specified in the config file.|
|Change List File|-changelist=<filename>|None|Path to the JSON of source file changes to perform test impact analysis on.|
|Global Timeout|-gtimeout=<seconds>|No timeout|Global timeout value to terminate the entire test sequence should it be exceeded.|
|Test Target Timeout|-ttimeout=<seconds>|No timeout|Timeout value to terminate individual test targets should it be exceeded.|
|Sequence Type|-sequence=<none, seed, regular, tia, tianowrite, tiaorseed>|None|The type of test sequence to perform, where: <br /><br />`none` runs no tests and will report a all tests successful.<br /><br />`seed` removes any prior coverage data and runs all test targets with instrumentation to reseed the data from scratch<br /> `regular` runs all of the test targets without any instrumentation to generate coverage data (any prior coverage data is left intact).<br /><br />`tia` uses any prior coverage data to run the instrumented subset of selected tests (if no prior coverage data a regular run is performed instead).<br /><br />`tianowrite` uses any prior coverage data to run the uninstrumented subset of selected tests (if no prior coverage data a regular run is performed instead) but the coverage data is not updated with the subset of selected tests.<br /><br />`tiaorseed` uses any prior coverage data to run the instrumented subset of selected tests (if no prior coverage data a seed run is performed instead).|
|Safe Mode|-safemode=<on,off>|Off|Flag to specify a safe mode for tia and tiaorseed sequences where the set of unselected tests is run without instrumentation after the set of selected instrumented tests is run (this has the effect of ensuring all tests are run regardless).|
|Draft Failing Tests|-draftfailingtests=<on,off>|Off|If enabled, will attempt to read the previous test runs data as specified in the config file and draft in any failing tests into tiaf and tiafnowrite sequences to be run in conjunction with the selected tests.|
|Shard Tests|-shard=<on,off>|No sharding|Break any test targets with a sharding policy into the number of shards according to the maximum concurrency value.|
|Capture Test Output|-targetout=<stdout, file>|None|Capture of individual test run stdout, where:<br /><br />`stdout` will capture each individual test target's stdout and output each one to stdout.<br /><br />`file` will capture each individual test target's stdout and output each one individually to a file.|
|Failed Test Coverage Policy|-cpolicy=<discard, keep>|Keep|Policy for handling the coverage data of failing tests, where:<br /><br />`discard` will discard the coverage data produced by the failing tests, causing them to be drafted into future test runs.<br /><br />`keep` will keep any existing coverage data and update the coverage data for failed tests that produce coverage.|
|Execution Failure Policy|-epolicy=<abort, continue, ignore>|Continue|Policy for handling test execution failure (test targets could not be launched due to the binary not being built, incorrect paths, etc.), where:<br /><br />`abort` will abort the entire test sequence upon the first test target execution failure and report a failure (along with the return code of the test target that failed to launch).<br /><br />`continue` will continue with the test sequence in the event of test target execution failures and treat the test targets that failed to launch as as test failures (along with the return codes of the test targets that failed to launch).<br /><br />`ignore` will continue with the test sequence in the event of test target execution failures and treat the test targets that failed to launch as as test passes (along with the return codes of the test targets that failed to launch).|
|Test Failure Policy|-fpolicy=<abort, continue>|Abort|Policy for handling test failures (test targets report failing tests), where:<br /><br />`abort` will abort the entire test sequence upon the first test failure and report a failure.<br /><br />`continue` will continue with the test sequence in the event of test failures and report the test failures.|
|Integrity Failure Policy|-ipolicy=<abort, continue>|Abort|Policy for handling coverage data integrity failures, where:<br /><br />`abort` will abort the test sequence and report a failure.<br /><br />`continue` will continue with the test sequence and write out any coverage data where applicable (caution is advised when using this option).|
|Test Prioritization Policy|-ppolicy=<none, locality>|None|Policy for prioritizing selected test targets, where:<br /><br />`none` will not attempt any test target prioritization.<br /><br />`locality` will attempt to prioritize test targets according to the locality of their covering production targets in the dependency graph (if no dependency graph data available, no prioritization will occur).|
|Test Suites|-suites=<...>|None|The comma-separated test suites to select from for this test sequence.|
|Sequence Report File|-report=<filename>|None|Path to where the sequence report file will be written (if this option is not present, no report will be written).|
|Suite Label Excludes|-labelexcludes=<...>|None|The list of labels that will exclude any tests with any of these labels in their suite.|

The native runtime has the following additional options:

|Option|Flag|Default|Description|
|:----|:----|:----|:----|
|Max Concurrency|-maxconcurrency=<number>|Max hardware concurrency|The maximum number of concurrent test targets/shards to be in flight at any given moment (a value of 0 signifies to use the architecture's maximum hardware concurrency).|

# What are the command line options for the TIAF AR scripts?

The following table details the command line options common to both the native and Python AR scripts:

|Option|Flag|Required|Default|Description|
|:----|:----|:----|:----|:----|
|Runtime Type|runtime-type=\<native, python>|Yes|None|The runtime TIAF should run tests for.|
|Runtime Sequence Override|sequence-override=\<tianowrite, seed, tia, regular>|No|None|Manually override the sequence to run with the specified type.|
|Configuration File|config|Yes|\<tiaf binay build dir>.\<tiaf binary build type>.json|The path to the configuration file for the TIAF runtime.|
|Source Branch|src-branch|Yes|None|The branch that is being built.|
|Destination Branch|dst-branch|No|None|For PR builds, the destination branch to be merged to, otherwise empty.|
|Commit Hash|commit|Yes|None|The commit that is being built.|
|Build Number|build-number|Yes|None|The build number this run of TIAF corresponds to.|
|Test Suites|suites|Yes|None|The test suites to select test targets from.|
|Test Label Excludes|label-excludes|No|None|The CTest labels to exclude test targets from selection if matched.|
|Test Failure Policy|test-failure-policy|Yes|None|The test failure policy for regular and test impact sequences (ignored when seeding).|
|Safe Mode|safe-mode|No|None|Run impact analysis tests in safe mode (ignored when seeding).|
|Test Timeout|test-timeout|No|None|The maximum run time (in seconds) of any test target before being terminated.|
|Global Timeout|global-timeout|No|None|The maximum run time (in seconds) of the sequence before being terminated.|
|Test Target Exclusion File|exclude-file|No|None|The path to file containing tests to exclude from this run.|
|Test Target Output Routing|target-output=\<stdout>|No|None|The test target std/error output routing (if not specified, no test target output will be routed to the console).|
|S3 Bucket Name|s3-bucket|No|None|The location of S3 bucket to use for persistent storage, otherwise local disk storage will be used.|
|S3 Bucket Name Top Level Directory|s3-top-level-dir|No|None|The top level directory to use in the S3 bucket.|
|MARS Index Prefix|mars-index-prefix|No|None|The index prefix to use for MARS, otherwise no data will be transmitted to MARS.|